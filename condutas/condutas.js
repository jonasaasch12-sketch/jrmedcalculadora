// =====================================================
// ÁREA "📖 CONDUTAS"
// Cada doença fica no seu próprio arquivo (condutas/<doenca>.js)
// e se registra com registrarConduta({...}). As medicações são
// os mesmos cards da prescrição (farmaciaJR): a dose é calculada
// com o peso/idade digitados no topo, nunca repetida aqui.
// =====================================================
const condutasJR = {};
let modoAtual = "prescricao";
let condutaAberta = null;

function registrarConduta(c) { condutasJR[c.id] = c; }

function escCond(t) { return String(t).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch])); }

function montarEstruturaCondutas() {
    let painel = document.querySelector('#aplicativo-principal .control-panel');
    let layout = document.querySelector('#aplicativo-principal .app-layout');
    if (!painel || !layout || document.getElementById('abasModo')) return;

    let abas = document.createElement('div');
    abas.id = 'abasModo';
    abas.className = 'abas-modo';
    abas.innerHTML = `
        <button type="button" data-modo="prescricao" class="aba-modo ativa">💊 Prescrição</button>
        <button type="button" data-modo="condutas" class="aba-modo">📖 Condutas</button>`;
    painel.insertBefore(abas, painel.firstChild);
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

function trocarModo(modo) {
    modoAtual = modo;
    document.querySelectorAll('.aba-modo').forEach(b => b.classList.toggle('ativa', b.dataset.modo === modo));
    document.querySelector('#aplicativo-principal .app-layout').style.display = modo === 'condutas' ? 'none' : '';
    document.getElementById('area-condutas').style.display = modo === 'condutas' ? 'block' : 'none';
    let busca = document.getElementById('searchInput');
    busca.placeholder = modo === 'condutas'
        ? "🔍 Buscar doença ou conduta (bronquiolite, asma, crupe...)"
        : "🔍 Buscar medicamento, indicação, sintoma, RSI, asma, sarna...";
    if (modo === 'condutas') { condutaAberta ? abrirConduta(condutaAberta) : renderizarListaCondutas(); }
    if (typeof atualizarAlturaTopo === 'function') atualizarAlturaTopo();
    window.scrollTo(0, 0);
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

// Monta o conteúdo de uma seção ou de um grupo: lista, tabelas, nota e medicações.
function htmlBlocoConduta(b) {
    let html = '';
    if (b.itens) html += `<ul>${b.itens.map(t => `<li>${t}</li>`).join('')}</ul>`;
    [b.tabela, ...(b.tabelas || [])].filter(Boolean).forEach(t => {
        if (t.titulo) html += `<div class="cond-tabela-titulo">${t.titulo}</div>`;
        html += `<div class="cond-tabela-wrap"><table class="cond-tabela${t.gravidade ? ' cond-tabela-gravidade' : ''}"><thead><tr>${t.colunas.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>`;
        t.linhas.forEach(l => { html += `<tr>${l.map((c, j) => j === 0 ? `<th>${c}</th>` : `<td>${c}</td>`).join('')}</tr>`; });
        html += `</tbody></table></div>`;
        if (t.nota) html += `<div class="cond-nota">${t.nota}</div>`;
    });
    if (b.nota) html += `<div class="cond-nota">${b.nota}</div>`;
    if (b.remedios && b.remedios.length) {
        html += `<div class="cond-meds-titulo">💊 Medicações desta etapa</div><div class="cond-meds">`;
        b.remedios.forEach(rid => { html += htmlMedConduta(rid); });
        html += `</div>`;
    }
    (b.grupos || []).forEach(g => {
        html += `<div class="cond-grupo"><div class="cond-grupo-nome">${g.nome}</div>${htmlBlocoConduta(g)}</div>`;
    });
    return html;
}

function abrirConduta(id) {
    let c = condutasJR[id];
    if (!c) return;
    condutaAberta = id;
    let html = `
        <button type="button" class="cond-voltar" onclick="renderizarListaCondutas(); window.scrollTo(0,0);">← Todas as condutas</button>
        <div class="cond-cabecalho" style="--cor-cat:${c.cor}">
            <div class="cond-cabecalho-cat">${escCond(c.categoria)}</div>
            <h2>${escCond(c.nome)}</h2>
            <div class="cond-cabecalho-resumo">${escCond(c.resumo || '')}</div>
        </div>
        ${c.legenda ? `<div class="cond-legenda">${c.legenda}</div>` : ''}
        <nav class="cond-indice">${c.secoes.map((s, i) => `<a href="#cond-sec-${i}" onclick="abrirSecaoConduta(${i});return false;">${s.icone || ''} ${escCond(s.titulo)}</a>`).join('')}</nav>`;

    c.secoes.forEach((s, i) => {
        let titulo = `<h3>${s.icone || ''} ${escCond(s.titulo)}</h3>`;
        let corpo = htmlBlocoConduta(s);
        html += `<section class="cond-secao${s.alerta ? ' cond-alerta' : ''}" id="cond-sec-${i}" style="--cor-cat:${c.cor}">`
            + (s.recolhida ? `<details><summary>${titulo}</summary>${corpo}</details>` : titulo + corpo)
            + `</section>`;
    });
    html += `<div class="cond-fonte"><strong>Fontes:</strong><ul>${c.fontes.map(f => `<li>${escCond(f)}</li>`).join('')}</ul><strong>Revisão:</strong> ${escCond(c.revisao)}</div>`;
    document.getElementById('area-condutas').innerHTML = html;
    atualizarDosesConduta();
    window.scrollTo(0, 0);
}

// Atalho do índice: abre a seção (se estiver recolhida) e rola até ela.
function abrirSecaoConduta(i) {
    let sec = document.getElementById('cond-sec-' + i);
    if (!sec) return;
    let det = sec.querySelector('details');
    if (det) det.open = true;
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

montarEstruturaCondutas();
