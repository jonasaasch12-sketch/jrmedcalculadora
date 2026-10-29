// =====================================================
// ÁREA "📖 CONDUTAS"
// Cada doença fica no seu próprio arquivo (condutas/<doenca>.js)
// e se registra com registrarConduta({...}). As medicações são
// os mesmos cards da prescrição (farmaciaJR): a dose é calculada
// com o peso/idade digitados no topo, nunca repetida aqui.
// =====================================================
// Enquanto for false, a aba 📖 Condutas só aparece na versão de teste (/teste/).
// Para liberar as condutas para toda a equipe, trocar para true.
const CONDUTAS_LIBERADAS = false;

const condutasJR = {};
let modoAtual = "prescricao";
let condutaAberta = null;

function registrarConduta(c) { condutasJR[c.id] = c; }

function escCond(t) { return String(t).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch])); }

function montarEstruturaCondutas() {
    let painel = document.querySelector('#aplicativo-principal .control-panel');
    let layout = document.querySelector('#aplicativo-principal .app-layout');
    if (!painel || !layout || document.getElementById('abasModo')) return;
    if (!CONDUTAS_LIBERADAS && !MODO_TESTE) return; // site oficial: só a Prescrição
    document.body.classList.add('condutas-on'); // mostra os links "Conduta passo a passo" das tarjas

    let abas = document.createElement('div');
    abas.id = 'abasModo';
    abas.className = 'abas-modo';
    abas.innerHTML = `
        <button type="button" data-modo="prescricao" class="aba-modo ativa">💊 Prescrição</button>
        <button type="button" data-modo="condutas" class="aba-modo">📖 Condutas</button>`;
    let slot = document.getElementById('slotAbas'); // Layout B: abas no cabeçalho
    if (slot) slot.appendChild(abas); else painel.insertBefore(abas, painel.firstChild);
    abas.querySelectorAll('.aba-modo').forEach(b => b.addEventListener('click', () => trocarModo(b.dataset.modo)));

    let area = document.createElement('div');
    area.id = 'area-condutas';
    area.style.display = 'none';
    layout.parentNode.insertBefore(area, layout.nextSibling);

    // Peso/idade mudaram → recalcula as doses mostradas na conduta aberta
    ['pesoInput', 'idadeInput'].forEach(id => document.getElementById(id)?.addEventListener('input', () => {
        if (modoAtual === 'condutas' && condutaAberta) atualizarDosesConduta();
    }));
    // A busca do topo filtra a lista de doenças quando estamos em Condutas
    document.getElementById('searchInput')?.addEventListener('input', () => {
        if (modoAtual === 'condutas' && !condutaAberta) renderizarListaCondutas();
    });
}

// Botão "voltar" do celular/navegador (pedido do Dr. Jonas): cada troca de aba e cada conduta aberta
// viram um passo no histórico. Voltar: conduta → lista de condutas → aba anterior, em vez de sair do app.
let restaurandoHistorico = false;
function empurrarHistorico(estado) {
    if (restaurandoHistorico) return;
    let atual = history.state || {};
    if (atual.modo === estado.modo && (atual.cond || null) === (estado.cond || null)) return;
    try { history.pushState(estado, '', location.href); } catch (e) { }
}
window.addEventListener('popstate', (ev) => {
    if (!document.getElementById('area-condutas')) return;
    let e = ev.state || { modo: 'prescricao' };
    restaurandoHistorico = true;
    try {
        if (e.modo === 'condutas') {
            condutaAberta = e.cond || null;
            trocarModo('condutas');
        } else if (modoAtual !== 'prescricao') {
            trocarModo('prescricao');
        }
    } finally { restaurandoHistorico = false; }
});

function trocarModo(modo) {
    if (modo !== modoAtual) empurrarHistorico(modo === 'condutas' ? { modo, cond: condutaAberta || null } : { modo });
    modoAtual = modo;
    document.querySelectorAll('.aba-modo, .tab-b[data-modo]').forEach(b => b.classList.toggle('ativa', b.dataset.modo === modo));
    document.body.classList.toggle('modo-condutas', modo === 'condutas');
    document.querySelector('#aplicativo-principal .app-layout').style.display = modo === 'condutas' ? 'none' : '';
    document.getElementById('area-condutas').style.display = modo === 'condutas' ? 'block' : 'none';
    let busca = document.getElementById('searchInput');
    busca.placeholder = modo === 'condutas'
        ? "Buscar doença ou conduta (bronquiolite, asma, crupe...)"
        : "Buscar medicamento, indicação, sintoma, RSI, asma, sarna...";
    if (modo === 'condutas') { condutaAberta ? abrirConduta(condutaAberta) : renderizarListaCondutas(); }
    if (typeof atualizarAlturaTopo === 'function') atualizarAlturaTopo();
    window.scrollTo(0, 0);
}

// "← Todas as condutas": se a conduta entrou no histórico, volta por ele (igual ao botão do celular).
function voltarListaCondutas() {
    if (history.state && history.state.cond) { history.back(); return; }
    renderizarListaCondutas(); window.scrollTo(0, 0);
}

function renderizarListaCondutas() {
    condutaAberta = null;
    let termo = (typeof normalizar === 'function' ? normalizar : s => s.toLowerCase())(document.getElementById('searchInput').value || '');
    let lista = Object.values(condutasJR).filter(c => !termo ||
        (typeof normalizar === 'function' ? normalizar : s => s.toLowerCase())(c.nome + ' ' + c.kw + ' ' + c.categoria).includes(termo));
    let porCat = {};
    lista.forEach(c => (porCat[c.categoria] = porCat[c.categoria] || []).push(c));

    let html = `<div class="cond-intro">📖 <strong>Condutas</strong> — protocolos das doenças mais prevalentes. As medicações de cada conduta usam o peso e a idade digitados acima.</div>`;
    if (!lista.length) html += `<div class="cond-vazio">Nenhuma conduta encontrada.</div>`;
    Object.keys(porCat).forEach(cat => {
        html += `<div class="cond-cat-titulo">${escCond(cat)}</div><div class="cond-grade">`;
        porCat[cat].forEach(c => {
            html += `<button type="button" class="cond-item" style="--cor-cat:${c.cor}" onclick="abrirConduta('${c.id}')">
                <span class="cond-item-nome">${escCond(c.nome)}</span>
                <span class="cond-item-resumo">${escCond(c.resumo || '')}</span>
                <span class="cond-item-seta">›</span></button>`;
        });
        html += `</div>`;
    });
    document.getElementById('area-condutas').innerHTML = html;
}

// Um item da lista. Padrão de texto (pedido do Dr. Jonas): ver "Padrão de escrita" no CLAUDE.md.
//   "texto"                          item simples (negrito só no rótulo do início, "<strong>Rótulo:</strong> ...")
//   { texto, sub: ["...", "..."] }    item que abre uma lista: os subitens vêm recuados, com marcador ›
//   { alerta: "..." }                 ponto de atenção (caixa amarela com ⚠️), no lugar de negrito no meio da frase
function htmlItemConduta(t) {
    if (t && typeof t === 'object') {
        if (t.alerta) return `<li class="cond-item-alerta"><span aria-hidden="true">⚠️</span> <strong>Atenção:</strong> ${t.alerta}</li>`;
        return `<li>${t.texto || ''}${t.sub ? `<ul class="cond-sub">${t.sub.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}</li>`;
    }
    return `<li>${t}</li>`;
}

// Monta o conteúdo de uma seção ou de um grupo: lista, tabelas, nota e medicações.
function htmlBlocoConduta(b) {
    let html = '';
    if (b.itens) html += `<ul${b.lista === 'passos' ? ' class="cond-lista-passos"' : ''}>${b.itens.map(htmlItemConduta).join('')}</ul>`;
    [b.tabela, ...(b.tabelas || [])].filter(Boolean).forEach(t => {
        if (t.titulo) html += `<div class="cond-tabela-titulo">${t.titulo}</div>`;
        html += `<div class="cond-tabela-wrap"><table class="cond-tabela${t.gravidade ? ' cond-tabela-gravidade' : ''}"><thead><tr>${t.colunas.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>`;
        t.linhas.forEach(l => { html += `<tr>${l.map((c, j) => j === 0 ? `<th>${c}</th>` : `<td>${c}</td>`).join('')}</tr>`; });
        html += `</tbody></table></div>`;
        if (t.nota) html += `<div class="cond-nota">${t.nota}</div>`;
    });
    // Ferramenta própria de uma conduta (ex.: boneco clicável dos queimados): nome de uma função global que devolve o HTML.
    if (b.ferramenta && typeof window[b.ferramenta] === 'function') html += window[b.ferramenta]();
    if (b.escore) html += htmlEscore(b.escore);
    if (b.remedios && b.remedios.length) {
        html += `<div class="cond-meds-titulo">💊 Medicações desta etapa</div><div class="cond-meds">`;
        b.remedios.forEach(rid => { html += htmlMedConduta(rid); });
        html += `</div>`;
    }
    (b.grupos || []).forEach(g => {
        html += `<div class="cond-grupo"><div class="cond-grupo-nome">${g.nome}</div>${htmlBlocoConduta(g)}</div>`;
    });
    if (b.nota) html += `<div class="cond-nota">${b.nota}</div>`;
    return html;
}

// Uma conduta pode ter "blocos" (ex.: Diagnóstico · Emergência · Ambulatório),
// cada um com suas seções; ou só "secoes" (um bloco sem título).
// As seções abrem e fecham com um toque. Todas começam fechadas (pedido do Dr. Jonas); "aberta" é ignorado.
function abrirConduta(id) {
    let c = condutasJR[id];
    if (!c) return;
    condutaAberta = id;
    empurrarHistorico({ modo: 'condutas', cond: id });
    let blocos = c.blocos || [{ secoes: c.secoes }];
    let n = 0;
    let indice = blocos.filter(b => b.titulo).map((b, bi) =>
        `<a href="#cond-bloco-${bi}" class="cond-indice-bloco" style="--cor-bloco:${b.cor || c.cor}" onclick="document.getElementById('cond-bloco-${bi}').scrollIntoView({behavior:'smooth'});return false;">${b.icone || ''} ${escCond(b.titulo)}</a>`).join('');
    let html = `
        <div class="cond-barra"><button type="button" class="cond-voltar" onclick="voltarListaCondutas()">← Todas as condutas</button><span class="cond-caminho">Condutas › <b>${escCond(c.nome)}</b></span></div>
        <div class="cond-cabecalho" style="--cor-cat:${c.cor}">
            <div class="cond-cabecalho-cat">${escCond(c.categoria)}</div>
            <h2>${escCond(c.nome)}</h2>
            <div class="cond-cabecalho-resumo">${escCond(c.resumo || '')}</div>
        </div>
        ${c.legenda ? `<div class="cond-legenda">${c.legenda}</div>` : ''}
        ${indice ? `<nav class="cond-indice cond-indice-blocos">${indice}</nav>` : ''}
        <div class="cond-acoes"><button type="button" onclick="abrirTodasSecoes(true)">⊕ Abrir tudo</button><button type="button" onclick="abrirTodasSecoes(false)">⊖ Fechar tudo</button></div>`;

    blocos.forEach((b, bi) => {
        if (b.titulo) html += `<div class="cond-bloco" id="cond-bloco-${bi}" style="--cor-bloco:${b.cor || c.cor}"><span>${b.icone || ''} ${escCond(b.titulo)}</span>${b.subtitulo ? `<small>${b.subtitulo}</small>` : ''}</div>`;
        b.secoes.forEach(s => {
            let i = n++;
            html += `<details class="cond-secao${s.alerta ? ' cond-alerta' : ''}" id="cond-sec-${i}" style="--cor-cat:${c.cor}">
                <summary><h3>${s.passo ? `<span class="cond-passo">${s.passo}</span>` : (s.icone || '')} ${escCond(s.titulo)}</h3>${s.resumo ? `<div class="cond-secao-resumo">${s.resumo}</div>` : ''}</summary>
                <div class="cond-secao-corpo">${htmlBlocoConduta(s)}</div>
            </details>`;
        });
    });
    html += `<div class="cond-fonte" id="cond-fontes"><strong>Fontes:</strong><ol>${c.fontes.map((f, k) => `<li id="cond-fonte-${k}"><span class="cond-fonte-txt">${escCond(f)}</span><button type="button" class="cond-fonte-voltar" onclick="voltarDaFonte()">↩ voltar ao texto</button></li>`).join('')}</ol><strong>Revisão:</strong> ${escCond(c.revisao)}</div>`;
    let area = document.getElementById('area-condutas');
    area.innerHTML = html;
    area.classList.toggle('cond-padrao', !!c.padraoTexto); /* conduta já reescrita no padrão de escrita (rótulo azul) */
    linkarCitacoes(area, c);
    atualizarDosesConduta();
    window.scrollTo(0, 0);
}

// ===== Citações no texto → fonte numerada no fim =====
// Cada conduta pode ter citacoes: { "SPP": 0, "IMIP": 1, "AAP": [0, 1] } (sigla ou trecho → índice(s) em fontes).
// O texto que cita vira um link com o número; o clique rola até a fonte e a destaca.
// Não mexe no texto das receitas (cards), nas ferramentas, nos botões e nos campos.
let citacaoOrigem = null;
function linkarCitacoes(area, c) {
    let mapa = c.citacoes;
    if (!mapa || !c.fontes) return;
    let chaves = Object.keys(mapa).sort((x, y) => y.length - x.length);
    if (!chaves.length) return;
    let esc = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let re = new RegExp('(?<![\\wÀ-ú])(' + chaves.map(esc).join('|') + ')(?![\\wÀ-ú])', 'g');
    let pular = 'a, button, input, select, textarea, label, script, .cond-fonte, .cond-med, .cond-indice, .cond-voltar, .cond-barra, .cond-acoes, .cadh, .cadg, .sy, .tr, .qm, .exg, [data-texto], [data-dose]';
    let walker = document.createTreeWalker(area, NodeFilter.SHOW_TEXT, {
        acceptNode: n => (!n.nodeValue.trim() || n.parentElement.closest(pular)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    let nos = [];
    while (walker.nextNode()) nos.push(walker.currentNode);
    nos.forEach(no => {
        let txt = no.nodeValue;
        re.lastIndex = 0;
        if (!re.test(txt)) return;
        re.lastIndex = 0;
        let frag = document.createDocumentFragment(), ult = 0, m;
        while ((m = re.exec(txt))) {
            let idx = [].concat(mapa[m[1]]).filter(k => c.fontes[k] !== undefined);
            if (!idx.length) continue;
            frag.appendChild(document.createTextNode(txt.slice(ult, m.index)));
            let a = document.createElement('a');
            a.href = '#cond-fontes';
            a.className = 'cond-cit';
            a.dataset.fonte = idx.join(',');
            a.title = idx.map(k => c.fontes[k]).join(' | ');
            a.innerHTML = `${escCond(m[1])}<sup>${idx.map(k => k + 1).join(',')}</sup>`;
            a.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); irParaFonte(a); });
            frag.appendChild(a);
            ult = m.index + m[1].length;
        }
        frag.appendChild(document.createTextNode(txt.slice(ult)));
        no.parentNode.replaceChild(frag, no);
    });
}
function irParaFonte(link) {
    citacaoOrigem = link;
    document.querySelectorAll('#cond-fontes li.destacada').forEach(li => li.classList.remove('destacada'));
    let alvos = link.dataset.fonte.split(',').map(k => document.getElementById('cond-fonte-' + k)).filter(Boolean);
    alvos.forEach(li => { li.classList.remove('destacada'); void li.offsetWidth; li.classList.add('destacada'); });
    if (alvos[0]) alvos[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function voltarDaFonte() {
    document.querySelectorAll('#cond-fontes li.destacada').forEach(li => li.classList.remove('destacada'));
    if (citacaoOrigem && citacaoOrigem.isConnected) {
        citacaoOrigem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        citacaoOrigem.classList.add('piscando');
        let el = citacaoOrigem; setTimeout(() => el.classList.remove('piscando'), 1600);
    }
}

function abrirTodasSecoes(abrir) {
    document.querySelectorAll('#area-condutas details.cond-secao').forEach(d => d.open = abrir);
}

// Atalho do índice: abre a seção (se estiver recolhida) e rola até ela.
// Vem da Prescrição (link na tarja da categoria): abre a conduta já no bloco pedido
// (ex.: 'condução' = primeiro bloco cujo título tem "condução": emergência/hospital).
function irParaConduta(id, bloco) {
    if (!condutasJR[id] || !document.getElementById('area-condutas')) return;
    condutaAberta = id;
    trocarModo('condutas');
    let blocos = condutasJR[id].blocos || [];
    let bi = bloco ? blocos.findIndex(b => (b.titulo || '').toLowerCase().includes(bloco)) : -1;
    let alvo = bi >= 0 ? document.getElementById('cond-bloco-' + bi) : null;
    if (alvo) setTimeout(() => alvo.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function abrirSecaoConduta(i) {
    let sec = document.getElementById('cond-sec-' + i);
    if (!sec) return;
    sec.open = true;
    sec.scrollIntoView({ behavior: 'smooth' });
}

function htmlMedConduta(rid) {
    let med = (typeof buscarMed === 'function') ? buscarMed(rid) : null;
    if (!med) return '';
    let seringa = (typeof ehInjetavel === 'function' && ehInjetavel(med) && typeof ICONE_SERINGA !== 'undefined') ? ICONE_SERINGA : '';
    return `<div class="cond-med" data-med="${rid}">
        <div class="cond-med-topo">
            <div><div class="cond-med-nome">${seringa}${escCond(med.nome)}</div><div class="cond-med-apres">${escCond(med.apres || '')}</div></div>
            <div class="cond-med-dose" data-dose>—</div>
        </div>
        <div class="cond-med-texto" data-texto></div>
        <div class="cond-med-botoes">
            <button type="button" class="cond-btn-receita" onclick="addCondutaReceita('${rid}', this)">＋ Receita</button>
            <button type="button" class="cond-btn-copiar" onclick="copiarCondutaMed(this)">📋 Copiar</button>
        </div>
    </div>`;
}

function calcCondutaMed(med) {
    let pRaw = document.getElementById('pesoInput').value;
    let p = parseFloat(pRaw);
    let iRaw = document.getElementById('idadeInput').value;
    if ((isNaN(p) || p <= 0) && !med.ignoraPeso) return { v: "—", r: "Insira o peso ou digite a idade acima." };
    try { return med.calc(p, iRaw); } catch (e) { return { v: "Erro", r: "Erro de cálculo." }; }
}

function atualizarDosesConduta() {
    document.querySelectorAll('#area-condutas .cond-med').forEach(box => {
        let med = buscarMed(box.dataset.med);
        if (!med) return;
        let c = calcCondutaMed(med);
        box.querySelector('[data-dose]').innerText = med.badgeSt ? (med.badge || c.v) : c.v;
        box.querySelector('[data-texto]').innerText = c.r;
        box.classList.toggle('sem-peso', c.v === '—');
    });
}

function viaDoTextoConduta(texto, med) {
    let primeira = texto.split('\n')[0].trim();
    let up = primeira.toUpperCase();
    if (up.startsWith("USO") || up.startsWith("VIA") || up.includes("NEBULIZAÇÃO") || up.includes("VENÓCLISE") ||
        up.includes("DISPOSITIVOS") || up.includes("ORIENTAÇÕES")) return primeira;
    if (med.custom && med._regra && med._regra.via) return `USO ${med._regra.via.toUpperCase()}`;
    return "USO ORAL";
}

function addCondutaReceita(rid, botao) {
    let med = buscarMed(rid);
    let box = botao.closest('.cond-med');
    let texto = box.querySelector('[data-texto]').innerText.trim();
    if (box.classList.contains('sem-peso')) { alert("Digite o peso (ou a idade) do paciente no topo antes de adicionar à receita."); return; }
    carrinhoPrescricao.push({ nome: med.nome, apres: med.apres, texto, via: viaDoTextoConduta(texto, med) });
    atualizarCarrinhoUI();
    let original = botao.innerHTML;
    botao.innerHTML = "✓ Na receita";
    botao.classList.add('adicionado');
    setTimeout(() => { botao.innerHTML = original; botao.classList.remove('adicionado'); }, 1200);
}

function copiarCondutaMed(botao) {
    let texto = botao.closest('.cond-med').querySelector('[data-texto]').innerText;
    navigator.clipboard?.writeText(texto);
    let original = botao.innerHTML;
    botao.innerHTML = "✓ Copiado";
    setTimeout(() => { botao.innerHTML = original; }, 1200);
}

// =====================================================
// ESCORES CLICÁVEIS (ex.: Wood-Downes-Ferrés)
// Cada item tem opções [pontos, texto]; a soma e a classificação são automáticas.
// =====================================================
const escoresConduta = {};   // definição, por id
const escoresMarcados = {};  // { idEscore: { indiceItem: pontos } }

function htmlEscore(e) {
    escoresConduta[e.id] = e;
    escoresMarcados[e.id] = escoresMarcados[e.id] || {};
    let html = `<div class="escore" id="escore-${e.id}">`;
    if (e.instrucao) html += `<div class="escore-instrucao">👆 ${e.instrucao}</div>`;
    e.itens.forEach((item, i) => {
        html += `<div class="escore-item">${item.nome ? `<div class="escore-item-nome">${item.nome}</div>` : ''}<div class="escore-opcoes">`;
        item.opcoes.forEach(([pts, txt, selo]) => {
            let marcado = escoresMarcados[e.id][i] === pts ? ' marcado' : '';
            html += `<button type="button" class="escore-opcao${marcado}" onclick="marcarEscore('${e.id}', ${i}, ${pts})"><span class="escore-pts">${selo !== undefined ? selo : pts}</span>${txt}</button>`;
        });
        html += `</div></div>`;
    });
    html += `<div class="escore-resultado" id="escore-res-${e.id}"></div></div>`;
    if (e.nota) html += `<div class="cond-nota">${e.nota}</div>`;
    setTimeout(() => atualizarEscore(e.id), 0);
    return html;
}

function marcarEscore(id, item, pts) {
    let m = escoresMarcados[id];
    if (m[item] === pts) delete m[item]; else m[item] = pts;   // tocar de novo desmarca
    let caixa = document.getElementById('escore-' + id);
    caixa.querySelectorAll('.escore-item').forEach((el, i) => {
        el.querySelectorAll('.escore-opcao').forEach((b, j) => {
            b.classList.toggle('marcado', m[i] === escoresConduta[id].itens[i].opcoes[j][0]);
        });
    });
    atualizarEscore(id);
}

function limparEscore(id) {
    escoresMarcados[id] = {};
    document.querySelectorAll(`#escore-${id} .escore-opcao.marcado`).forEach(b => b.classList.remove('marcado'));
    atualizarEscore(id);
}

function atualizarEscore(id) {
    let e = escoresConduta[id], m = escoresMarcados[id] || {};
    let res = document.getElementById('escore-res-' + id);
    if (!e || !res) return;
    let feitos = Object.keys(m).length, total = Object.values(m).reduce((a, b) => a + b, 0);
    let faixa;
    if (e.classificar) {
        // Regra própria (ex.: Plano A/B/C da desidratação): devolve { num, rotulo, cor, texto }
        let r = e.classificar(Object.values(m), m, e.itens.length); // m: { índice do item: valor }
        total = r.num; faixa = r;
    } else {
        faixa = e.faixas.find(f => total >= f.min && total <= f.max);
    }
    // checklist: só se marca o que está presente; o resultado sai já com o 1º item marcado
    let completo = e.checklist ? feitos > 0 : feitos === e.itens.length;
    let cor = faixa && completo ? faixa.cor : '#64748b';
    res.style.setProperty('--cor-escore', cor);
    res.innerHTML = `
        <div class="escore-total"><span class="escore-total-num">${total}</span><span class="escore-total-de">${e.unidade || "pontos"}</span></div>
        <div class="escore-classe">
            <strong>${!feitos ? 'Marque os itens acima' : !completo ? `Parcial: ${feitos} de ${e.itens.length} itens` : faixa ? faixa.rotulo : 'Sem pontuação'}</strong>
            ${completo && faixa ? (faixa.texto ? `<span>${faixa.texto}</span>` : '') : feitos ? `<span>${faixa && faixa.rotulo ? 'até agora: ' + faixa.rotulo : ''}</span>` : ''}
        </div>
        ${feitos ? `<button type="button" class="escore-limpar" onclick="limparEscore('${id}')">Limpar</button>` : ''}`;
}

montarEstruturaCondutas();
// "Novo Paciente" também zera os escores marcados
document.getElementById('btnNovoPaciente')?.addEventListener('click', () => {
    setTimeout(() => { if (!carrinhoPrescricao.length) Object.keys(escoresMarcados).forEach(limparEscore); }, 0);
});
