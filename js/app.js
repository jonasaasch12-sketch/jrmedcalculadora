// Tela principal: renderização dos cards, busca, cálculo, carrinho, tema e fonte.

// ===================================================== 
// MEDICAMENTOS ADICIONADOS PELA EQUIPE (via Firestore)  
// ===================================================== 
// Preenchido pelo listener do Firestore (script de autenticação, mais abaixo).
// Chave = id do documento no Firestore. Valor = objeto no mesmo formato de farmaciaJR.
let medsCustomizados = {};

// Categorias criadas pela equipe na tela "🗂️ Categorias" (nome, emoji, cor, subcategorias).
// Chave = id do documento no Firestore. Valor = { titulo, icone, cor, subcategorias }.
let categoriasCustomizadas = {};

// "Ficha completa" de cada medicamento (contraindicações, interações, ajuste
// renal/hepático) — vale tanto pra remédio fixo do app quanto pra remédio
// criado pela equipe. Chave = o próprio ID do medicamento (ex: "amox" ou o
// ID do documento no Firestore de um remédio customizado).
let fichasMedicamentos = {};

function escaparHtml(str) {
    return (str || "").toString()
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function buscarMed(idRemedio) {
    return farmaciaJR[idRemedio] || medsCustomizados[idRemedio] || null;
}

// Motor de cálculo genérico para os medicamentos cadastrados pela equipe.
// Propositalmente NÃO executamos código JavaScript vindo do banco de dados
// (isso seria um risco de segurança sério). Em vez disso, guardamos uma
// "regra" simples (fator × peso, arredondamento, dose máxima) e interpretamos
// aqui, do mesmo jeito para todo mundo.
function arredondarConforme(valor, modo) {
    if (modo === "inteiro") return Math.round(valor);
    if (modo === "0.5") return Math.round(valor * 2) / 2;
    if (modo === "nenhum") return valor;
    return Math.round(valor * 10) / 10; // "1casa" (padrão)
}

function calcularDoseCustomizada(regra, p) {
    if (regra.tipoDose === "fixo") {
        return regra.textoFixo || "—";
    }
    let bruto = (parseFloat(p) || 0) * (parseFloat(regra.fator) || 0);
    let valor = arredondarConforme(bruto, regra.arredondamento);
    if (regra.doseMaxima) valor = Math.min(valor, parseFloat(regra.doseMaxima));
    return `${valor} ${regra.unidade || ""}`.trim();
}

function montarMedCustomizado(id, regra) {
    let base = {
        custom: true,
        criadoPor: regra.criadoPor || "",
        nome: regra.nome,
        recLabel: "Texto para selecionar e copiar:",
        categoriaId: regra.categoriaId || "cat-equipe",
        categoriaTitulo: regra.categoriaTitulo || "Adicionados pela Equipe", // apenas fallback; a fonte "de verdade" é categoriasCustomizadas
        subcategoriaTitulo: regra.subcategoriaTitulo || "Cadastrados dentro do app",
        _regra: regra // guardado para reabrir no formulário quando for editar
    };

    if (regra.tipoItem === "orientacao") {
        return {
            ...base,
            apres: regra.apresentacaoOrientacao || "Orientação",
            kw: normalizar(`${regra.nome} ${regra.apresentacaoOrientacao || ""} ${regra.observacoes || ""} ${regra.textoOrientacao || ""}`),
            info: `<strong>Descrição:</strong> ${escaparHtml(regra.observacoes || "Orientação / texto padrão.")}`,
            badgeSt: "static-blue", badge: "Orientações",
            ignoraPeso: true,
            calc: () => ({ v: "Orientações", r: regra.textoOrientacao || "" })
        };
    }

    return {
        ...base,
        apres: regra.apresentacao,
        kw: normalizar(`${regra.nome} ${regra.apresentacao} ${regra.observacoes || ""}`),
        info: `<strong>Posologia:</strong> ${escaparHtml(regra.observacoes || "Ver campos de dose.")}`,
        badge: "",
        ignoraPeso: regra.tipoDose === "fixo",
        calc: (p) => {
            let valorTxt = calcularDoseCustomizada(regra, p);
            let linha2 = regra.duracao ? `, ${regra.duracao}` : "";
            let texto = `${regra.nome.toUpperCase()} ${regra.apresentacao ? "(" + regra.apresentacao + ")" : ""} --- 1 UNID\nDAR ${valorTxt}, VIA ${regra.via || "ORAL"}, DE ${regra.intervalo || "CONFORME ORIENTAÇÃO"}${linha2}.`;
            return { v: valorTxt, r: texto };
        }
    };
}

// Chamado pelo listener do Firestore (script de autenticação) sempre que a
// lista de medicamentos da equipe mudar — inclusive em tempo real, quando um
// colega logado em outro aparelho adiciona ou remove algo.
window.atualizarMedicamentosCustomizados = function(lista) {
    medsCustomizados = {};
    lista.forEach(item => {
        medsCustomizados[item.id] = montarMedCustomizado(item.id, item.dados);
    });
    inicializarApp();
};

// Chamado pelo listener do Firestore sempre que a lista de categorias da
// equipe mudar (criação, edição de cor/emoji/subcategorias, ou exclusão).
window.atualizarCategoriasCustomizadas = function(lista) {
    categoriasCustomizadas = {};
    lista.forEach(item => { categoriasCustomizadas[item.id] = item.dados; });
    inicializarApp();
};

// Chamado pelo listener do Firestore sempre que alguma "ficha completa"
// (contraindicação/interação/ajuste renal ou hepático) mudar.
window.atualizarFichasMedicamentos = function(lista) {
    fichasMedicamentos = {};
    lista.forEach(item => { fichasMedicamentos[item.id] = item.dados; });
    inicializarApp();
};

// Monta o bloco "📋 Ficha completa" de um card: mostra os campos preenchidos
// (se houver) e, pro admin, sempre mostra um jeito de criar/editar a ficha —
// vale tanto pra remédio fixo do app quanto pra remédio da equipe, e não
// exige nenhuma alteração na lógica de cálculo de dose.
// Mostra a ficha padronizada (Indicação, Dose, Atenção) quando o
// remédio está em "detalhesMedicacoes"; senão, mantém o texto antigo do "info".
function renderizarInfoMed(idRemedio, med) {
    let d = !med.custom && detalhesMedicacoes[idRemedio];
    if (!d) return `<div class="med-info-row">${med.info}</div>`;
    // Se o remédio já tem ficha completa com dose (da equipe ou padrão), a dose fica só lá, para não poluir o card.
    let ficha = fichasMedicamentos[idRemedio] || fichasPadrao[idRemedio];
    let dose = (ficha && ficha.dose) ? "Ver 📋 Ficha completa, abaixo." : escaparHtml(d.dose);
    return `<dl class="med-detalhes">
                <dt>Indicação</dt><dd>${escaparHtml(d.indicacao)}</dd>
                <dt>Dose</dt><dd>${dose}</dd>
                <dt class="det-atencao">⚠️ Atenção</dt><dd class="det-atencao">${escaparHtml(d.atencao)}</dd>
            </dl>`;
}

function renderizarBlocoFicha(idRemedio, instanceId) {
    let ficha = fichasMedicamentos[idRemedio] || fichasPadrao[idRemedio]; // a da equipe (Firestore) tem prioridade sobre a padrão
    let temConteudo = !!(ficha && (ficha.indicacoes || ficha.dose || ficha.doseMaxima || ficha.apresentacoes || ficha.via || ficha.intervalo || ficha.contraindicacoes || ficha.alertasPediatricos || ficha.efeitosAdversos || ficha.interacoes || ficha.ajusteRenal || ficha.ajusteHepatico || ficha.fonteRevisao || ficha.diluicao || ficha.reconstituicao || ficha.infusao || ficha.conservacao));
    let ehAdmin = !!window.usuarioEhAdmin;

    if (!temConteudo && !ehAdmin) return ""; // ninguém cadastrou ainda, e quem está vendo não pode cadastrar

    let botaoEditar = ehAdmin
        ? `<button class="btn-editar-ficha" onclick="abrirModalFicha('${idRemedio}')">✏️ ${temConteudo ? "Editar" : "Adicionar"} ficha completa</button>`
        : "";

    if (!temConteudo) {
        return `<div class="ficha-completa-area">${botaoEditar}</div>`;
    }

    // Ordem da ficha: Apresentação > Indicação > Dose (uma indicação por linha) > Dose máxima > Via > Diluição > Infusão > Alertas > ... > Fonte (sempre por último).
    let campo = (rotulo, valor) => valor ? `<div class="ficha-campo"><strong>${rotulo}:</strong> ${escaparHtml(valor)}</div>` : "";
    let linhasDose = ficha.dose ? String(ficha.dose).split("\n").map(l => l.trim()).filter(Boolean) : [];
    let blocoDose = linhasDose.length > 1
        ? `<div class="ficha-campo"><strong>Dose:</strong><ul class="ficha-lista">${linhasDose.map(l => `<li>${escaparHtml(l)}</li>`).join("")}</ul></div>`
        : campo("Dose", linhasDose[0]);
    let linhas = campo("Apresentações/Concentrações", ficha.apresentacoes)
        + campo("Indicações", ficha.indicacoes)
        + blocoDose
        + campo("Dose máxima", ficha.doseMaxima)
        + campo("Via", ficha.via)
        + campo("Intervalo", ficha.intervalo)
        + campo("Reconstituição", ficha.reconstituicao)
        + campo("Diluição", ficha.diluicao)
        + campo("Infusão", ficha.infusao)
        + campo("Alertas pediátricos", ficha.alertasPediatricos)
        + campo("Contraindicações", ficha.contraindicacoes)
        + campo("Efeitos adversos importantes", ficha.efeitosAdversos)
        + campo("Interações importantes", ficha.interacoes)
        + campo("Ajuste na insuficiência renal", ficha.ajusteRenal)
        + campo("Ajuste na insuficiência hepática", ficha.ajusteHepatico)
        + campo("Conservação", ficha.conservacao)
        + campo("Fonte / Data de revisão", ficha.fonteRevisao);

    return `
                <div class="ficha-completa-area">
                    <button class="btn-toggle-ficha" onclick="alternarFicha('${instanceId}')">📋 Ficha completa <span id="seta-${instanceId}">▾</span></button>
                    <div id="ficha-conteudo-${instanceId}" class="ficha-conteudo" style="display:none;">${linhas}</div>
                    ${botaoEditar}
                </div>`;
}

function alternarFicha(instanceId) {
    let conteudo = document.getElementById('ficha-conteudo-' + instanceId);
    let seta = document.getElementById('seta-' + instanceId);
    if (!conteudo) return;
    let estavaAberta = conteudo.style.display !== 'none';
    conteudo.style.display = estavaAberta ? 'none' : 'block';
    if (seta) seta.innerText = estavaAberta ? '▾' : '▴';
}

// Junta as categorias fixas do app + as categorias que a equipe criou na tela
// "🗂️ Categorias" (mesmo as que ainda não têm nenhum medicamento) + encaixa
// cada medicamento/orientação customizado na categoria/subcategoria certa.
function construirCategoriasComCustom() {
    // Clonagem rasa para nunca alterar o array original "categorias" na memória.
    let todas = categorias.map(cat => ({
        ...cat,
        patologias: cat.patologias.map(pat => ({ ...pat, remedios: pat.remedios.slice() }))
    }));
    let categoriasNovas = {}; // categoriaId -> objeto de categoria (criadas pela equipe)

    function garantirCategoriaNova(categoriaId) {
        if (todas.some(c => c.id === categoriaId)) return null; // é uma categoria fixa, nada a fazer
        if (!categoriasNovas[categoriaId]) {
            let fonte = categoriasCustomizadas[categoriaId]; // fonte "de verdade", se o documento ainda existir
            let titulo = fonte ? fonte.titulo : "(Categoria removida)";
            let icone = fonte ? (fonte.icone || "📁") : "⚠️";
            categoriasNovas[categoriaId] = {
                id: categoriaId,
                titulo: titulo,
                dotClass: "dot-personalizada",
                cor: "tarja-personalizada",
                corHex: fonte ? fonte.cor : null,
                nome: titulo,
                icone: `${icone} ${titulo}`,
                patologias: (fonte && Array.isArray(fonte.subcategorias)) ? fonte.subcategorias.map(s => ({ nome: s, remedios: [] })) : []
            };
        }
        return categoriasNovas[categoriaId];
    }

    // Primeiro, garante que TODA categoria criada pela equipe apareça (mesmo vazia,
    // sem nenhum medicamento ainda), para o admin ver que já está pronta pra usar.
    Object.keys(categoriasCustomizadas).forEach(garantirCategoriaNova);

    // Depois, encaixa cada medicamento/orientação customizado na categoria certa.
    Object.entries(medsCustomizados).forEach(([idRemedio, med]) => {
        let catAlvo = todas.find(c => c.id === med.categoriaId) || garantirCategoriaNova(med.categoriaId);
        if (!catAlvo) return; // segurança, não deveria acontecer

        let patAlvo = catAlvo.patologias.find(p => normalizar(p.nome) === normalizar(med.subcategoriaTitulo));
        if (!patAlvo) {
            patAlvo = { nome: med.subcategoriaTitulo, remedios: [] };
            catAlvo.patologias.push(patAlvo);
        }
        patAlvo.remedios.push(idRemedio);
    });

    return todas.concat(Object.values(categoriasNovas));
}

// Usado pelo formulário de cadastro para listar as subcategorias já existentes
// (fixas do app OU cadastradas pela equipe na tela de Categorias) dentro da
// categoria escolhida.
function obterSubcategoriasDe(categoriaId) {
    let nomes = [];
    let catFixa = categorias.find(c => c.id === categoriaId);
    if (catFixa) nomes.push(...catFixa.patologias.map(p => p.nome));
    let catCustom = categoriasCustomizadas[categoriaId];
    if (catCustom && Array.isArray(catCustom.subcategorias)) {
        catCustom.subcategorias.forEach(s => {
            if (!nomes.some(n => normalizar(n) === normalizar(s))) nomes.push(s);
        });
    }
    // Segurança: inclui também subcategorias já usadas por medicamentos antigos,
    // mesmo que não estejam (ou não estejam mais) na lista oficial da categoria.
    Object.values(medsCustomizados).forEach(med => {
        if (med.categoriaId === categoriaId && !nomes.some(n => normalizar(n) === normalizar(med.subcategoriaTitulo))) {
            nomes.push(med.subcategoriaTitulo);
        }
    });
    return nomes;
}

// Categorias criadas pela equipe (fora das fixas do app), para listar no formulário.
function obterCategoriasCustomizadas() {
    return Object.entries(categoriasCustomizadas).map(([id, c]) => ({ id, titulo: c.titulo, icone: c.icone, cor: c.cor }));
}

// ===================================================== 
// BUSCA TOLERANTE A ACENTO E PEQUENOS ERROS DE DIGITAÇÃO 
// ===================================================== 
function normalizar(str) {
    return (str || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function distanciaLevenshtein(a, b) {
    if (a === b) return 0;
    let m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    let dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            let custo = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + custo);
        }
    }
    return dp[m][n];
}

function cardCorrespondeABusca(keywordsNormalizadas, queryNormalizada) {
    if (queryNormalizada === "") return true;
    if (keywordsNormalizadas.includes(queryNormalizada)) return true;
    // Tolerância a erro de digitação: cada palavra da busca (>=4 letras)
    // pode ter até 1 letra diferente de alguma palavra das keywords.
    let palavrasBusca = queryNormalizada.split(/\s+/).filter(w => w.length >= 4);
    if (palavrasBusca.length === 0) return false;
    let tokensCard = keywordsNormalizadas.split(/\s+/);
    return palavrasBusca.every(pb => tokensCard.some(tc => distanciaLevenshtein(pb, tc) <= 1));
}

function filtrarMedicas() {
    let q = normalizar(document.getElementById('searchInput').value.trim());
    document.querySelectorAll('.category-group').forEach(cat => {
        let catHasVisible = false;
        cat.querySelectorAll('.subtype-group').forEach(sub => {
            let subHasVisible = false;
            sub.querySelectorAll('.med-card').forEach(card => {
                let kwNorm = normalizar(card.getAttribute('data-keywords') || "");
                let isMatch = cardCorrespondeABusca(kwNorm, q);
                card.style.display = isMatch ? "flex" : "none";
                if (isMatch) { subHasVisible = true; catHasVisible = true; }
            });
            sub.style.display = subHasVisible ? "block" : "none";
        });
        cat.style.display = catHasVisible ? "block" : "none";
    });
}

// ===================================================== 
// ALERGIAS: destaca visualmente cards de risco             
// ===================================================== 
function medPodeConflitarComAlergia(med, termosAlergia) {
    if (termosAlergia.length === 0) return false;
    let alvo = normalizar(`${med.nome} ${med.kw}`);
    return termosAlergia.some(termo => termo.length >= 3 && alvo.includes(termo));
}

// ===================================================== 
// ALERTA DE PESO INCOMPATÍVEL COM A IDADE (heurística)     
// ===================================================== 
// Faixas aproximadas (não são fórmula clínica exata — só uma checagem de
// plausibilidade para pegar erro de digitação, ex: trocar 3,5 kg por 35 kg).
function pesoEsperadoParaIdade(idadeAnos) {
    if (idadeAnos < 1) return (idadeAnos * 12 / 2) + 4;      // meses/2 + 4
    if (idadeAnos <= 5) return (idadeAnos * 2) + 8;
    if (idadeAnos <= 12) return (idadeAnos * 3) + 7;
    return null; // acima de 12 anos, faixa é grande demais para uma heurística simples
}

function atualizarAvisoPesoIdade(p, iRaw) {
    let avisoBox = document.getElementById('avisoPesoIdade');
    if (iRaw === "" || isNaN(p) || p <= 0) { avisoBox.classList.remove('visivel'); return; }
    let idade = parseFloat(iRaw);
    let esperado = pesoEsperadoParaIdade(idade);
    if (esperado === null) { avisoBox.classList.remove('visivel'); return; }
    let desvio = Math.abs(p - esperado) / esperado;
    if (desvio > 0.5) {
        avisoBox.innerText = `⚠️ Peso informado (${p} kg) foge bastante do esperado para ${idade} ano(s) (≈ ${esperado.toFixed(1)} kg). Confira se peso e idade foram digitados corretamente antes de prescrever.`;
        avisoBox.classList.add('visivel');
    } else {
        avisoBox.classList.remove('visivel');
    }
}

// ===================================================== 
// RENDERIZAÇÃO PRINCIPAL                                   
// ===================================================== 
let instanciasRenderizadas = [];

function inicializarApp() {
    let container = document.getElementById('app-container');
    let sidebarMenu = document.getElementById('sidebar-menu');
    let bottomMenu = document.getElementById('bottom-menu');

    instanciasRenderizadas = [];
    let contadorPorRemedio = {};

    let htmlFinal = "";
    let htmlMenuSidebar = `<div class="nav-category-title">NAVEGAÇÃO</div>`;
    let htmlMenuBottom = "";

    let todasCategorias = construirCategoriasComCustom();

    todasCategorias.forEach(cat => {
        let estiloCor = cat.corHex ? ` style="background-color:${escaparHtml(cat.corHex)};"` : "";
        htmlMenuSidebar += `
                    <button class="sidebar-link" onclick="document.getElementById('${cat.id}').scrollIntoView({behavior: 'smooth', block: 'start'})">
                        <span class="dot ${cat.dotClass || ''}"${estiloCor}></span> ${escaparHtml(cat.nome)}
                    </button>
                `;
        htmlMenuBottom += `<button class="nav-btn ${cat.cor || ''}"${estiloCor} onclick="document.getElementById('${cat.id}').scrollIntoView({behavior: 'smooth', block: 'start'})">${escaparHtml(cat.icone)}</button>`;

        // Categoria ou seção com conduta (conduta: "<id>" no menu.js): botão que abre a conduta já na
        // condução (emergência/hospital). Só aparece onde a aba Condutas existe (body.condutas-on).
        let corCat = cat.corHex || CORES_CATEGORIA[cat.cor] || "#0284c7";
        let botaoConduta = (item) => item.conduta
            ? `<button type="button" class="link-conduta" style="--cor-link:${escaparHtml(corCat)}" onclick="event.stopPropagation(); irParaConduta('${item.conduta}', 'condução')">📖 ${escaparHtml(item.condutaNome || 'Conduta passo a passo')} ›</button>` : '';
        let linkConduta = botaoConduta(cat);
        htmlFinal += `<div id="${cat.id}" class="category-group"><div class="section-header ${cat.cor || ''}${linkConduta ? ' com-link-conduta' : ''}"${estiloCor}><span>${escaparHtml(cat.titulo)}</span>${linkConduta}</div>`;

        cat.patologias.forEach(pat => {
            // Seções de uso hospitalar ganham o símbolo do hospital no início e no fim do título.
            let ehHosp = /hospitalar/i.test(pat.nome) || SECOES_HOSPITALARES.includes(pat.nome);
            let tituloPat = ehHosp ? `🏥 ${escaparHtml(pat.nome)} 🏥` : pat.nome;
            let linkPat = botaoConduta(pat), comLink = linkPat ? ' com-link-conduta' : '';
            htmlFinal += ehHosp
                ? `<div class="subtype-group"><div class="sub-type-title sub-type-hosp${comLink}" style="--cor-cat:${escaparHtml(corCat)}"><span>${tituloPat}</span>${linkPat}</div>`
                : `<div class="subtype-group"><div class="sub-type-title${comLink}"><span>${tituloPat}</span>${linkPat}</div>`;

            pat.remedios.forEach(idRemedio => {
                let med = buscarMed(idRemedio);
                if (!med) {
                    console.warn(`[JR MED] Aviso: "${idRemedio}" está referenciado numa categoria mas não existe em farmaciaJR nem nos medicamentos da equipe. O card não será exibido.`);
                    return;
                }

                // Gera um sufixo -2, -3... apenas quando o mesmo remédio se repete.
                contadorPorRemedio[idRemedio] = (contadorPorRemedio[idRemedio] || 0) + 1;
                let ocorrencia = contadorPorRemedio[idRemedio];
                let instanceId = ocorrencia === 1 ? idRemedio : `${idRemedio}--${ocorrencia}`;
                instanciasRenderizadas.push({ instanceId, medKey: idRemedio });

                let badgeHtml = "";
                if (med.badge) {
                    let bClass = med.badgeSt ? `result-box ${med.badgeSt}` : "badge-teto";
                    badgeHtml = `<div class="${bClass}">${med.badge}</div>`;
                }

                let btnCopiarId = "btn-copy-" + instanceId;
                let btnCarrinhoId = "btn-cart-" + instanceId;

                let btnExcluir = (med.custom && window.usuarioEhAdmin)
                    ? `<button class="btn-excluir-custom" onclick="abrirModalEdicao('${idRemedio}')">✏️ Editar</button> <button class="btn-excluir-custom" onclick="excluirMedicamentoCustom('${idRemedio}')">🗑️ Remover</button>`
                    : "";

                let blocoFicha = renderizarBlocoFicha(idRemedio, instanceId);

                htmlFinal += `
                        <div id="card-${instanceId}" class="med-card" data-keywords="${escaparHtml(med.kw)}" data-nome="${escaparHtml(normalizar(med.nome))}">
                            <div class="med-header">
                                <div><span class="med-name">${ehInjetavel(med) ? ICONE_SERINGA : ""}${escaparHtml(med.nome)}</span><span class="med-presentation">${escaparHtml(med.apres)}</span></div>
                                <div id="res-${instanceId}" class="result-box">—</div>
                            </div>
                            ${renderizarInfoMed(idRemedio, med)}
                            ${badgeHtml}
                            <div id="alerta-alergia-${instanceId}" style="display:none;" class="tarja-alergia">⚠️ Paciente referiu alergia compatível — confira antes de prescrever</div>
                            <div class="prescription-header-row">
                                <div class="prescription-label">${med.recLabel}</div>
                                <div class="card-actions-row">
                                    <button id="${btnCarrinhoId}" class="btn-add-carrinho" onclick="adicionarAoCarrinho('${instanceId}', '${btnCarrinhoId}')">➕ Receita</button>
                                    <button id="${btnCopiarId}" class="btn-copiar" onclick="copiarTexto('${btnCopiarId}', '${instanceId}')">📋 Copiar</button>
                                </div>
                            </div>
                            <div id="rec-${instanceId}" class="prescription-text-box">Insira o peso ou digite a idade acima.</div>
                            ${blocoFicha}
                            ${btnExcluir}
                        </div>`;
            });
            htmlFinal += `</div>`;
        });
        htmlFinal += `</div>`;
    });

    container.innerHTML = htmlFinal;
    sidebarMenu.innerHTML = htmlMenuSidebar;
    bottomMenu.innerHTML = htmlMenuBottom;
    calcularTudo();
    filtrarMedicas();
}

// Mede a altura real do cabeçalho e do painel fixo (que muda com A-/A+, com o aviso de peso
// e com a largura da tela) e guarda em variáveis CSS usadas pelo menu lateral e pela rolagem.
function atualizarAlturaTopo() {
    let header = document.querySelector('.header-banner');
    let painel = document.querySelector('.control-panel');
    if (!header || !painel) return;
    let hHeader = header.getBoundingClientRect().height;
    let hPainel = painel.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--altura-header', hHeader + 'px');
    document.documentElement.style.setProperty('--altura-topo', (hHeader + hPainel) + 'px');
}
window.addEventListener('resize', atualizarAlturaTopo);
window.addEventListener('load', atualizarAlturaTopo);
if (window.ResizeObserver) {
    let observadorTopo = new ResizeObserver(atualizarAlturaTopo);
    document.addEventListener('DOMContentLoaded', () => {
        ['.header-banner', '.control-panel'].forEach(sel => { let el = document.querySelector(sel); if (el) observadorTopo.observe(el); });
        atualizarAlturaTopo();
    });
}

// Medicação injetável (EV, IM, IV/IO, infusão em BIC, hemoderivados): detectada pelo texto da receita
// de um paciente de exemplo. Nebulizações e inalatórios não entram.
function ehInjetavel(med) {
    if (med._injetavel !== undefined) return med._injetavel;
    let texto = "";
    try { texto = String((med.calc && med.calc(20, "5").r) || ""); } catch (e) {}
    let t = texto.toUpperCase();
    med._injetavel = !/^(NEBULIZA|VIA INALAT|USO INALAT|ORIENTA)/.test(t.trim())
        && /ENDOVENOS|INTRAMUSCULAR|\bIV\b|\bEV\b|\bIM\b|INFUS|INFUND|\bBIC\b|HEMOTRANSFUS|VEN[ÓO]CLISE/.test(t);
    return med._injetavel;
}

// Seringa com líquido vermelho (desenho próprio, igual em qualquer aparelho) para medicações injetáveis.
const ICONE_SERINGA = '<span class="icone-injetavel" title="Medicação injetável"><svg viewBox="0 0 24 24" aria-hidden="true"><g transform="rotate(45 12 12)"><rect x="10.6" y="0.5" width="2.8" height="2.2" rx="0.6" fill="#475569"/><rect x="11.4" y="2.6" width="1.2" height="3" fill="#64748b"/><rect x="8" y="5.4" width="8" height="1.6" rx="0.6" fill="#475569"/><rect x="9" y="7" width="6" height="11" rx="1" fill="#f8fafc" stroke="#475569" stroke-width="1.1"/><rect x="9.6" y="10" width="4.8" height="7.4" rx="0.4" fill="#dc2626"/><path d="M10 9.4h1.4M10 12h1.4M10 14.6h1.4" stroke="#475569" stroke-width="0.7"/><rect x="11.2" y="18" width="1.6" height="1.6" fill="#475569"/><rect x="11.75" y="19.6" width="0.5" height="4" fill="#94a3b8"/></g></svg></span> ';

// Seções de uso hospitalar cujo título não tem a palavra "Hospitalar" (também ganham o 🏥 e o destaque).
const SECOES_HOSPITALARES = [
    "Escolha de Material e Dispositivos", "Pré-medicação e Indução em Bólus", "Manutenção por Infusão Contínua", // RSI
    "Parada e Arritmias", // PALS
    "Crise Convulsiva Aguda", // Neuro
    "Hidratação IV e Hidroeletrolíticos (Choque/Manutenção)", "Correção de Potássio e Sódio", // TGI
    "Expansão, Hidratação e Potássio", "Insulina EV e Transição para SC", "Complicações: Edema Cerebral, Acidose Grave e Hipoglicemia" // CAD
];

// Cor de cada categoria (a mesma da tarja), usada nos títulos de uso hospitalar.
const CORES_CATEGORIA = {
    "tarja-exame": "#0d9488", "tarja-sintomaticos": "#dc2626", "tarja-respiratorio": "#0284c7",
    "tarja-antibioticos": "#16a34a", "tarja-rsi": "#4f46e5", "tarja-urinario": "#d97706",
    "tarja-diarreia": "#0891b2", "tarja-pele": "#db2777", "tarja-neuro": "#7c3aed",
    "tarja-alergias": "#c026d3", "tarja-especialidades": "#0d9488", "tarja-cad": "#be123c", "tarja-personalizada": "#334155"
};

function calcularTudo() {
    let pRaw = document.getElementById('pesoInput').value;
    let p = parseFloat(pRaw);
    let iRaw = document.getElementById('idadeInput').value;
    let invalido = isNaN(p) || p <= 0 || pRaw === "";

    atualizarAvisoPesoIdade(p, iRaw);

    let termosAlergia = normalizar(document.getElementById('alergiaInput').value)
        .split(",").map(t => t.trim()).filter(t => t.length > 0);

    instanciasRenderizadas.forEach(({ instanceId, medKey }) => {
        let med = buscarMed(medKey);
        let resBox = document.getElementById('res-' + instanceId);
        let recBox = document.getElementById('rec-' + instanceId);
        let cardBox = document.getElementById('card-' + instanceId);
        let alertaBox = document.getElementById('alerta-alergia-' + instanceId);
        if (!med || !resBox || !recBox) return;

        if (alertaBox && cardBox) {
            let conflita = medPodeConflitarComAlergia(med, termosAlergia);
            alertaBox.style.display = conflita ? "inline-block" : "none";
            cardBox.classList.toggle('alerta-alergia', conflita);
        }

        if (invalido && !med.ignoraPeso) {
            if (!med.badgeSt) resBox.innerText = "—";
            recBox.innerText = "Insira o peso ou digite a idade acima.";
            return;
        }

        try {
            let calc = med.calc(p, iRaw);
            if (!med.badgeSt) resBox.innerText = calc.v;
            recBox.innerText = calc.r;
        } catch (e) {
            resBox.innerText = "Erro";
            recBox.innerText = "Erro de cálculo.";
        }
    });
}

// ===================================================== 
// NOVO PACIENTE                                            
// ===================================================== 
function novoPaciente() {
    if (carrinhoPrescricao.length > 0 && !confirm("Isso vai limpar peso, idade, alergias e a receita em construção. Continuar?")) return;
    document.getElementById('pesoInput').value = "";
    document.getElementById('idadeInput').value = "";
    document.getElementById('alergiaInput').value = "";
    document.getElementById('searchInput').value = "";
    carrinhoPrescricao = [];
    atualizarCarrinhoUI();
    filtrarMedicas();
    calcularTudo();
}

// ===================================================== 
// CARRINHO DE PRESCRIÇÃO                                   
// ===================================================== 
let carrinhoPrescricao = []; // { nome, apres, texto }

        function adicionarAoCarrinho(instanceId, btnId) {
    let med = buscarMed(instanciasRenderizadas.find(i => i.instanceId === instanceId)?.medKey);
    let recBox = document.getElementById('rec-' + instanceId);
    if (!med || !recBox) return;

    // Extrai o texto gerado
    let textoCompleto = recBox.innerText.trim();
    // A "Via" será identificada automaticamente pela 1ª linha do texto do card
    let primeiraLinha = textoCompleto.split('\n')[0].trim();
    let primeiraLinhaUpper = primeiraLinha.toUpperCase();
    
    let cabecalhoVia = "USO ORAL"; // Padrão de segurança
    
    // Se a primeira linha indicar a rota (USO, VIA, etc), usamos ela como cabeçalho
    if (primeiraLinhaUpper.startsWith("USO") || 
        primeiraLinhaUpper.startsWith("VIA") || 
        primeiraLinhaUpper.includes("NEBULIZAÇÃO") || 
        primeiraLinhaUpper.includes("VENÓCLISE") || 
        primeiraLinhaUpper.includes("DISPOSITIVOS") ||
        primeiraLinhaUpper.includes("ORIENTAÇÕES")) {
        cabecalhoVia = primeiraLinha;
    } else if (med.custom && med._regra && med._regra.via) {
        // Caso seja um remédio da equipe cadastrado manualmente sem cabeçalho
        cabecalhoVia = `USO ${med._regra.via.toUpperCase()}`;
    }

    carrinhoPrescricao.push({ nome: med.nome, apres: med.apres, texto: textoCompleto, via: cabecalhoVia });

    let botao = document.getElementById(btnId);
    let original = botao.innerHTML;
    botao.innerHTML = "✓ Na receita";
    botao.classList.add("adicionado");
    setTimeout(() => { botao.innerHTML = original; botao.classList.remove("adicionado"); }, 1200);

    atualizarCarrinhoUI();
}

function removerDoCarrinho(index) {
    carrinhoPrescricao.splice(index, 1);
    atualizarCarrinhoUI();
}

function limparCarrinho() {
    carrinhoPrescricao = [];
    atualizarCarrinhoUI();
}

function atualizarCarrinhoUI() {
    let fab = document.getElementById('btnAbrirCarrinho');
    let badge = document.getElementById('cartBadgeCount');
    badge.innerText = carrinhoPrescricao.length;
    fab.classList.toggle('visivel', carrinhoPrescricao.length > 0);

    let lista = document.getElementById('listaCarrinho');
    if (carrinhoPrescricao.length === 0) {
        lista.innerHTML = `<div class="carrinho-vazio">Nenhum item ainda. Toque em "➕ Receita" em algum medicamento para começar a montar a prescrição.</div>`;
        return;
    }
    let html = "";
    carrinhoPrescricao.forEach((item, idx) => {
        html += `
                <div class="cart-item">
                    <div class="cart-item-header">
                        <span class="cart-item-nome">${idx + 1}. ${item.nome}</span>
                        <button class="btn-remover-item" onclick="removerDoCarrinho(${idx})">Remover</button>
                    </div>
                    <div class="cart-item-texto">${item.texto}</div>
                </div>`;
    });
    html += `<button class="btn-copiar-receita-completa" onclick="copiarReceitaCompleta()">📋 Copiar Receita Completa (${carrinhoPrescricao.length} itens)</button>`;
    html += `<button class="btn-limpar-carrinho" onclick="limparCarrinho()">Limpar tudo</button>`;
    lista.innerHTML = html;
}

        function copiarReceitaCompleta() {
    // Agrupar itens pela via exata que capturamos
    let porVia = {};
    carrinhoPrescricao.forEach(item => {
        let via = item.via || "USO ORAL";
        if (!porVia[via]) porVia[via] = [];
        porVia[via].push(item.texto);
    });

    // Montar receita agrupada
    // Ordena alfabeticamente, mas as orientações vão sempre por último (depois das medicações)
    let ehOrientacao = v => v.toUpperCase().includes("ORIENTAÇÕES");
    let vias = Object.keys(porVia).sort((a, b) => (ehOrientacao(a) - ehOrientacao(b)) || a.localeCompare(b));
    let texto = vias.map(via => {
        let items = porVia[via];
        let linhas = [via]; // O cabeçalho (ex: USO TÓPICO, VIA ENDOVENOSA)

        items.forEach((itemTexto, idx) => {
            let linhasItem = itemTexto.trim().split('\n');
            
            // Removemos a 1ª linha do texto do remédio se for igual ao cabeçalho da via (para não duplicar)
            let primeira = linhasItem[0].trim().toUpperCase();
            if (primeira === via.toUpperCase() || primeira.startsWith("USO ") || primeira.startsWith("VIA ") || primeira.includes("NEBULIZAÇÃO")) {
                linhasItem.shift(); 
            }
            
            // Remove linhas em branco que sobraram no começo
            while(linhasItem.length > 0 && linhasItem[0].trim() === "") {
                linhasItem.shift();
            }

            let textoLimpo = linhasItem.join('\n').trim();
            
            // Remove a numeração antiga ("1) ", "2) ", etc)
            textoLimpo = textoLimpo.replace(/^\d+\)\s*/, '');

            // Adiciona a nova numeração (1, 2, 3...) reiniciando dentro de cada grupo
            linhas.push(`${idx + 1}) ${textoLimpo}`);
        });

        return linhas.join('\n\n'); // Espaçamento duplo entre as medicações de um grupo
    }).join('\n\n'); // Entre vias diferentes: só uma linha em branco, sem traço

    navigator.clipboard.writeText(texto).then(() => {
        let btn = document.querySelector('.btn-copiar-receita-completa');
        if(btn) {
            let original = btn.innerText;
            btn.innerText = "✓ Copiado!";
            setTimeout(() => btn.innerText = original, 1500);
        }
    }).catch(() => alert("Erro ao copiar."));
}

// ===================================================== 
// MODO ESCURO E TAMANHO DA FONTE (preferência por aparelho)
// ===================================================== 
function aplicarTemaSalvo() {
    let tema = localStorage.getItem('jrmed_tema') || 'claro';
    document.documentElement.setAttribute('data-theme', tema === 'escuro' ? 'dark' : 'light');
    document.getElementById('btnTema').innerText = tema === 'escuro' ? '☀️' : '🌙';
}
function alternarTema() {
    let atual = localStorage.getItem('jrmed_tema') || 'claro';
    localStorage.setItem('jrmed_tema', atual === 'claro' ? 'escuro' : 'claro');
    aplicarTemaSalvo();
}

function aplicarFonteSalva() {
    let nivel = parseFloat(localStorage.getItem('jrmed_fonte') || "1");
    document.body.style.zoom = nivel; // suportado por Chrome/Edge/Safari mobile, base do público-alvo deste app
}
function ajustarFonte(delta) {
    let nivel = parseFloat(localStorage.getItem('jrmed_fonte') || "1");
    nivel = Math.min(1.3, Math.max(0.85, nivel + delta));
    localStorage.setItem('jrmed_fonte', nivel);
    aplicarFonteSalva();
}
