// Janelas (modais): cadastro de medicamento da equipe, categorias e ficha completa;
// e a inicialização do app (ao final).

// ===================================================== 
// MODAIS                                                    
// ===================================================== 
let medEditandoId = null; // null = cadastrando novo; senão, é o id do que está sendo editado

function abrirModal(id) {
    if (id === 'modalAddMed' && medEditandoId === null) {
        limparFormMed();
        popularFormCategoria();
    }
    if (id === 'modalCategorias') {
        abrirModalCategorias();
        return; // abrirModalCategorias já adiciona a classe 'aberto'
    }
    document.getElementById(id).classList.add('aberto');
}
function fecharModal(id) {
    document.getElementById(id).classList.remove('aberto');
    if (id === 'modalAddMed') medEditandoId = null; // fechou sem salvar: não fica "preso" em modo edição
    if (id === 'modalFicha') fichaEditandoId = null;
}

function limparFormMed() {
    document.querySelectorAll('#modalAddMed input[type="text"], #modalAddMed input[type="number"], #modalAddMed textarea').forEach(el => el.value = "");
    document.getElementById('fVia').selectedIndex = 0;
    document.getElementById('fTipoDose').value = 'peso';
    document.getElementById('fArredondamento').value = '1casa';
    document.getElementById('fTipoItem').value = 'medicamento';
    document.getElementById('erroFormMed').innerText = "";
    document.getElementById('btnSalvarMed').innerText = "Salvar para a equipe";
    document.getElementById('btnSalvarMed').disabled = false;
    atualizarTipoDoseForm();
    atualizarTipoItemForm();
}

function atualizarTipoDoseForm() {
    let tipo = document.getElementById('fTipoDose').value;
    document.getElementById('campoDoseFixa').classList.toggle('ativo', tipo === 'fixo');
    document.getElementById('campoDosePeso').classList.toggle('ativo', tipo === 'peso');
}

function atualizarTipoItemForm() {
    let ehOrientacao = document.getElementById('fTipoItem').value === 'orientacao';
    document.getElementById('camposMedicamento').classList.toggle('ativo', !ehOrientacao);
    document.getElementById('camposOrientacao').classList.toggle('ativo', ehOrientacao);
    document.getElementById('labelFNome').innerText = ehOrientacao ? "Título (ex: Sinais de Alarme — Bronquiolite)" : "Nome do medicamento";
    document.getElementById('labelFObservacoes').innerText = ehOrientacao ? "Descrição curta (aparece no card)" : "Observações / posologia (aparece no card)";
}

// Preenche o seletor de "Categoria" só com o que já existe (categorias fixas do
// app + as que a equipe já criou na tela "🗂️ Categorias"). Criar categoria nova
// não acontece mais aqui — é só na tela dedicada.
// selecionarCategoriaId/selecionarSubcategoria: usados ao editar, para deixar
// os selects já apontando para o valor atual do medicamento.
function popularFormCategoria(selecionarCategoriaId, selecionarSubcategoria) {
    let select = document.getElementById('fCategoria');
    let opcoes = categorias.map(c => `<option value="${c.id}">${escaparHtml(c.titulo)}</option>`);
    let customs = obterCategoriasCustomizadas();
    if (customs.length > 0) {
        opcoes.push(`<option disabled>──────────</option>`);
        customs.forEach(c => opcoes.push(`<option value="${escaparHtml(c.id)}">${escaparHtml(c.icone || "📁")} ${escaparHtml(c.titulo)}</option>`));
    }
    select.innerHTML = opcoes.join("");
    if (selecionarCategoriaId && [...select.options].some(o => o.value === selecionarCategoriaId)) {
        select.value = selecionarCategoriaId;
    }
    atualizarCategoriaForm(selecionarSubcategoria);
}

function atualizarCategoriaForm(selecionarSubcategoria) {
    let categoriaId = document.getElementById('fCategoria').value;
    let selectSub = document.getElementById('fSubcategoria');
    let nomes = obterSubcategoriasDe(categoriaId);
    if (nomes.length === 0) {
        selectSub.innerHTML = `<option value="">Nenhuma subcategoria — crie em "🗂️ Categorias"</option>`;
        selectSub.disabled = true;
    } else {
        selectSub.disabled = false;
        selectSub.innerHTML = nomes.map(n => `<option value="${escaparHtml(n)}">${escaparHtml(n)}</option>`).join("");
        if (selecionarSubcategoria && nomes.some(n => n === selecionarSubcategoria)) {
            selectSub.value = selecionarSubcategoria;
        }
    }
}

// Abre o formulário já preenchido com os dados atuais do medicamento, para edição.
function abrirModalEdicao(idRemedio) {
    let med = medsCustomizados[idRemedio];
    if (!med) return;
    let regra = med._regra;
    let tipoItem = regra.tipoItem || "medicamento"; // itens antigos (antes de existir esse campo) são tratados como medicamento

    medEditandoId = idRemedio;
    limparFormMed();
    popularFormCategoria(regra.categoriaId, regra.subcategoriaTitulo);

    document.getElementById('fTipoItem').value = tipoItem;
    document.getElementById('fNome').value = regra.nome || "";
    document.getElementById('fObservacoes').value = regra.observacoes || "";

    if (tipoItem === 'orientacao') {
        document.getElementById('fApresentacaoOrientacao').value = regra.apresentacaoOrientacao || "";
        document.getElementById('fTextoOrientacao').value = regra.textoOrientacao || "";
    } else {
        document.getElementById('fApresentacao').value = regra.apresentacao || "";
        document.getElementById('fVia').value = regra.via || "ORAL";
        document.getElementById('fTipoDose').value = regra.tipoDose || "peso";
        document.getElementById('fIntervalo').value = regra.intervalo || "";
        document.getElementById('fDuracao').value = regra.duracao || "";
        if (regra.tipoDose === 'fixo') {
            document.getElementById('fTextoFixo').value = regra.textoFixo || "";
        } else {
            document.getElementById('fFator').value = regra.fator ?? "";
            document.getElementById('fUnidade').value = regra.unidade || "";
            document.getElementById('fArredondamento').value = regra.arredondamento || "1casa";
            document.getElementById('fDoseMaxima').value = regra.doseMaxima ?? "";
        }
        atualizarTipoDoseForm();
    }
    atualizarTipoItemForm();
    document.getElementById('btnSalvarMed').innerText = "Salvar alterações";
    document.getElementById('modalAddMed').classList.add('aberto');
}

// Corre uma promessa contra um cronômetro: se a promessa não responder a tempo,
// mostra um erro claro em vez de deixar o botão preso em "Salvando..." para sempre.
function comLimiteDeTempo(promessa, segundos, mensagemTimeout) {
    return Promise.race([
        promessa,
        new Promise((_, reject) => setTimeout(() => reject(new Error(mensagemTimeout)), segundos * 1000))
    ]);
}

// ===================================================== 
// TELA DEDICADA: GERENCIAR CATEGORIAS E SUBCATEGORIAS      
// ===================================================== 
let categoriaEditandoId = null; // null = criando nova categoria; senão, id do documento sendo editado
let subcategoriasTemp = [];     // lista de subcategorias em edição, só vai para o Firestore ao Salvar

function abrirModalCategorias() {
    categoriaEditandoId = null;
    subcategoriasTemp = [];
    document.getElementById('erroFormCategoria').innerText = "";
    popularSelectGerenciarCategorias();
    document.getElementById('modalCategorias').classList.add('aberto');
}

function popularSelectGerenciarCategorias() {
    let select = document.getElementById('gCategoriaSelect');
    let opcoes = [`<option value="__nova__">➕ Nova categoria</option>`];
    Object.entries(categoriasCustomizadas).forEach(([id, c]) => {
        opcoes.push(`<option value="${escaparHtml(id)}">${escaparHtml(c.icone || "📁")} ${escaparHtml(c.titulo)}</option>`);
    });
    select.innerHTML = opcoes.join("");
    select.value = "__nova__";
    selecionarCategoriaParaGerenciar();
}

function selecionarCategoriaParaGerenciar() {
    let id = document.getElementById('gCategoriaSelect').value;
    document.getElementById('erroFormCategoria').innerText = "";
    if (id === '__nova__') {
        categoriaEditandoId = null;
        subcategoriasTemp = [];
        document.getElementById('gNome').value = "";
        document.getElementById('gIcone').value = "";
        document.getElementById('gCor').value = "#0284c7";
        document.getElementById('btnExcluirCategoria').style.display = "none";
        document.getElementById('btnSalvarCategoria').innerText = "Salvar categoria";
    } else {
        let c = categoriasCustomizadas[id];
        if (!c) return;
        categoriaEditandoId = id;
        subcategoriasTemp = (c.subcategorias || []).slice();
        document.getElementById('gNome').value = c.titulo || "";
        document.getElementById('gIcone').value = c.icone || "";
        document.getElementById('gCor').value = c.cor || "#0284c7";
        document.getElementById('btnExcluirCategoria').style.display = "block";
        document.getElementById('btnSalvarCategoria').innerText = "Salvar alterações";
    }
    renderizarChipsSubcategorias();
}

function renderizarChipsSubcategorias() {
    let box = document.getElementById('gListaSubcategorias');
    if (subcategoriasTemp.length === 0) {
        box.innerHTML = `<span class="form-hint">Nenhuma subcategoria ainda — adicione abaixo.</span>`;
        return;
    }
    box.innerHTML = subcategoriasTemp.map((s, idx) =>
        `<span class="chip-subcategoria">${escaparHtml(s)} <span class="remover" onclick="removerSubcategoriaTemp(${idx})">✕</span></span>`
    ).join("");
}

function adicionarSubcategoriaTemp() {
    let input = document.getElementById('gNovaSubcategoria');
    let nome = input.value.trim();
    if (!nome) return;
    if (subcategoriasTemp.some(s => normalizar(s) === normalizar(nome))) { input.value = ""; return; }
    subcategoriasTemp.push(nome);
    input.value = "";
    renderizarChipsSubcategorias();
}

function removerSubcategoriaTemp(idx) {
    subcategoriasTemp.splice(idx, 1);
    renderizarChipsSubcategorias();
}

async function salvarCategoriaEquipe() {
    let erroBox = document.getElementById('erroFormCategoria');
    erroBox.innerText = "";
    let titulo = document.getElementById('gNome').value.trim();
    if (!titulo) { erroBox.innerText = "Informe o nome da categoria."; return; }
    let icone = document.getElementById('gIcone').value.trim() || "📁";
    let cor = document.getElementById('gCor').value || "#0284c7";
    let dados = { titulo, icone, cor, subcategorias: subcategoriasTemp.slice() };

    let btn = document.getElementById('btnSalvarCategoria');
    btn.disabled = true; btn.innerText = "Salvando...";
    try {
        const TIMEOUT_MSG = "Tempo esgotado esperando o banco de dados responder. Confira se o Firestore Database foi criado e as regras publicadas.";
        if (categoriaEditandoId) {
            await comLimiteDeTempo(window.JRFirestore.editarCategoria(categoriaEditandoId, dados), 15, TIMEOUT_MSG);
        } else {
            await comLimiteDeTempo(window.JRFirestore.salvarCategoria(dados), 15, TIMEOUT_MSG);
        }
        fecharModal('modalCategorias');
    } catch (e) {
        erroBox.innerText = "Erro ao salvar: " + e.message;
    } finally {
        btn.disabled = false;
        btn.innerText = categoriaEditandoId ? "Salvar alterações" : "Salvar categoria";
    }
}

async function excluirCategoriaEquipe() {
    if (!categoriaEditandoId) return;
    if (!confirm('Excluir esta categoria? Medicamentos/orientações que já estão nela continuam existindo, só ficam marcados como "(Categoria removida)" até você editá-los para outra categoria.')) return;
    try {
        await comLimiteDeTempo(window.JRFirestore.excluirCategoria(categoriaEditandoId), 15, "Tempo esgotado esperando o banco de dados.");
        fecharModal('modalCategorias');
    } catch (e) {
        alert("Erro ao excluir: " + e.message);
    }
}

// ===================================================== 
// FICHA COMPLETA DO MEDICAMENTO (CONTRAINDICAÇÃO, INTERAÇÃO, AJUSTE RENAL/HEPÁTICO)
// ===================================================== 
let fichaEditandoId = null; // id do medicamento (fixo do app ou da equipe) cuja ficha está aberta no modal

function abrirModalFicha(idRemedio) {
    let med = buscarMed(idRemedio);
    if (!med) return;
    fichaEditandoId = idRemedio;
    // Abre com a ficha salva pela equipe ou, se não houver, com a ficha padrão do app.
    let ficha = fichasMedicamentos[idRemedio] || fichasPadrao[idRemedio] || {};
    document.getElementById('fichaMedNome').innerText = med.nome;
    // Preenche TODOS os campos, para que salvar não apague o que já estava escrito.
    [["hIndicacoes", "indicacoes"], ["hDose", "dose"], ["hDoseMaxima", "doseMaxima"], ["hApresentacoes", "apresentacoes"],
     ["hVia", "via"], ["hIntervalo", "intervalo"], ["hContraindicacoes", "contraindicacoes"], ["hAlertasPediatricos", "alertasPediatricos"],
     ["hEfeitosAdversos", "efeitosAdversos"], ["hInteracoes", "interacoes"], ["hAjusteRenal", "ajusteRenal"], ["hAjusteHepatico", "ajusteHepatico"],
     ["hFonteRevisao", "fonteRevisao"], ["hDiluicao", "diluicao"], ["hReconstituicao", "reconstituicao"], ["hInfusao", "infusao"],
     ["hConservacao", "conservacao"]].forEach(([campo, chave]) => { document.getElementById(campo).value = ficha[chave] || ""; });
    document.getElementById('erroFormFicha').innerText = "";
    document.getElementById('modalFicha').classList.add('aberto');
}

async function salvarFichaEquipe() {
    if (!fichaEditandoId) return;
    let erroBox = document.getElementById('erroFormFicha');
    erroBox.innerText = "";
    let dados = {
        indicacoes: document.getElementById('hIndicacoes').value.trim(),
        dose: document.getElementById('hDose').value.trim(),
        doseMaxima: document.getElementById('hDoseMaxima').value.trim(),
        apresentacoes: document.getElementById('hApresentacoes').value.trim(),
        via: document.getElementById('hVia').value.trim(),
        intervalo: document.getElementById('hIntervalo').value.trim(),
        contraindicacoes: document.getElementById('hContraindicacoes').value.trim(),
        alertasPediatricos: document.getElementById('hAlertasPediatricos').value.trim(),
        efeitosAdversos: document.getElementById('hEfeitosAdversos').value.trim(),
        interacoes: document.getElementById('hInteracoes').value.trim(),
        ajusteRenal: document.getElementById('hAjusteRenal').value.trim(),
        ajusteHepatico: document.getElementById('hAjusteHepatico').value.trim(),
        fonteRevisao: document.getElementById('hFonteRevisao').value.trim(),
        diluicao: document.getElementById('hDiluicao').value.trim(),
        reconstituicao: document.getElementById('hReconstituicao').value.trim(),
        infusao: document.getElementById('hInfusao').value.trim(),
        conservacao: document.getElementById('hConservacao').value.trim()
    };

    let btn = document.getElementById('btnSalvarFicha');
    btn.disabled = true; btn.innerText = "Salvando...";
    try {
        const TIMEOUT_MSG = "Tempo esgotado esperando o banco de dados responder. Confira se o Firestore Database foi criado e as regras publicadas.";
        await comLimiteDeTempo(window.JRFirestore.salvarFicha(fichaEditandoId, dados), 15, TIMEOUT_MSG);
        fecharModal('modalFicha');
    } catch (e) {
        erroBox.innerText = "Erro ao salvar: " + e.message;
    } finally {
        btn.disabled = false;
        btn.innerText = "Salvar ficha";
    }
}

async function salvarNovoMedicamento() {
    let erroBox = document.getElementById('erroFormMed');
    erroBox.innerText = "";

    let categoriaId = document.getElementById('fCategoria').value;
    if (!categoriaId) { erroBox.innerText = 'Escolha uma categoria (ou crie uma em "🗂️ Categorias" primeiro).'; return; }
    let catExistente = categorias.find(c => c.id === categoriaId) || obterCategoriasCustomizadas().find(c => c.id === categoriaId);
    let categoriaTitulo = catExistente ? catExistente.titulo : categoriaId;

    let subcategoriaTitulo = document.getElementById('fSubcategoria').value;
    if (!subcategoriaTitulo) { erroBox.innerText = 'Escolha uma subcategoria (ou crie uma em "🗂️ Categorias" primeiro).'; return; }

    let nome = document.getElementById('fNome').value.trim();
    let observacoes = document.getElementById('fObservacoes').value.trim();
    let tipoItem = document.getElementById('fTipoItem').value;

    if (!nome) { erroBox.innerText = tipoItem === 'orientacao' ? "Informe o título." : "Informe o nome do medicamento."; return; }

    let regra = {
        categoriaId, categoriaTitulo, subcategoriaTitulo,
        nome, observacoes, tipoItem
    };

    if (tipoItem === 'orientacao') {
        regra.apresentacaoOrientacao = document.getElementById('fApresentacaoOrientacao').value.trim();
        regra.textoOrientacao = document.getElementById('fTextoOrientacao').value.trim();
        if (!regra.textoOrientacao) { erroBox.innerText = "Informe o texto completo da orientação."; return; }
    } else {
        regra.apresentacao = document.getElementById('fApresentacao').value.trim();
        regra.via = document.getElementById('fVia').value;
        regra.tipoDose = document.getElementById('fTipoDose').value;
        regra.intervalo = document.getElementById('fIntervalo').value.trim();
        regra.duracao = document.getElementById('fDuracao').value.trim();

        if (regra.tipoDose === 'fixo') {
            regra.textoFixo = document.getElementById('fTextoFixo').value.trim();
            if (!regra.textoFixo) { erroBox.innerText = "Informe o texto da dose fixa."; return; }
        } else {
            let fator = parseFloat(document.getElementById('fFator').value);
            if (isNaN(fator) || fator <= 0) { erroBox.innerText = "Informe um fator numérico válido (dose ÷ peso)."; return; }
            regra.fator = fator;
            regra.unidade = document.getElementById('fUnidade').value.trim() || "mL";
            regra.arredondamento = document.getElementById('fArredondamento').value;
            let doseMax = document.getElementById('fDoseMaxima').value;
            regra.doseMaxima = doseMax ? parseFloat(doseMax) : null;
        }
    }

    let btn = document.getElementById('btnSalvarMed');
    btn.disabled = true; btn.innerText = medEditandoId ? "Salvando alterações..." : "Salvando...";
    try {
        const TIMEOUT_MSG = "Tempo esgotado esperando o banco de dados responder. Confira se o Firestore Database foi criado no console do Firebase e se as regras (firestore.rules) foram publicadas.";
        if (medEditandoId) {
            await comLimiteDeTempo(window.JRFirestore.editarMedicamento(medEditandoId, regra), 15, TIMEOUT_MSG);
        } else {
            await comLimiteDeTempo(window.JRFirestore.salvarMedicamento(regra), 15, TIMEOUT_MSG);
        }
        medEditandoId = null;
        limparFormMed();
        fecharModal('modalAddMed');
    } catch (e) {
        erroBox.innerText = "Erro ao salvar: " + e.message;
    } finally {
        btn.disabled = false;
        btn.innerText = medEditandoId ? "Salvar alterações" : "Salvar para a equipe";
    }
}

async function excluirMedicamentoCustom(idRemedio) {
    if (!confirm("Remover este medicamento para toda a equipe?")) return;
    try {
        await comLimiteDeTempo(window.JRFirestore.excluirMedicamento(idRemedio), 15, "Tempo esgotado esperando o banco de dados. Confira se o Firestore Database foi criado e as regras publicadas.");
    } catch (e) {
        alert("Erro ao remover: " + e.message);
    }
}

// Chamado pelo script do Firebase assim que sabemos se o usuário é admin,
// para redesenhar os cards já exibindo (ou escondendo) o botão "Remover".
window.atualizarVisibilidadeAdmin = function() { inicializarApp(); };

// Registra o Service Worker para funcionar melhor com internet instável no plantão.
// Só funciona quando hospedado via https:// (ex: Firebase Hosting) — em file://
// local o navegador ignora isso silenciosamente, sem quebrar o resto do app.
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {
        console.warn('[JR MED] Service worker não pôde ser registrado (modo offline não estará disponível).');
    });
}

inicializarApp();
aplicarTemaSalvo();
aplicarFonteSalva();

document.getElementById('btnNovoPaciente').addEventListener('click', novoPaciente);
document.getElementById('btnTema').addEventListener('click', alternarTema);
document.getElementById('btnFontPlus').addEventListener('click', () => ajustarFonte(0.1));
document.getElementById('btnFontMinus').addEventListener('click', () => ajustarFonte(-0.1));
document.getElementById('btnAddMed').addEventListener('click', () => abrirModal('modalAddMed'));
document.getElementById('btnCategorias').addEventListener('click', () => abrirModal('modalCategorias'));
document.getElementById('btnAbrirCarrinho').addEventListener('click', () => abrirModal('modalCarrinho'));
atualizarCarrinhoUI();
