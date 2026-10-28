// =====================================================
// VERSÃO DE TESTE
// O mesmo código publicado em jrmedprescricao.com.br/teste/ funciona como
// versão de teste: faixa vermelha, selo "TESTE" no cabeçalho e acesso só
// para administradores (a checagem é feita em js/firebase.js, após o login).
// =====================================================
const MODO_TESTE = /\/teste\//.test(location.pathname);

if (MODO_TESTE) {
    document.title = "🧪 TESTE · " + document.title;
    let faixa = document.createElement('div');
    faixa.className = 'faixa-teste';
    faixa.innerHTML = '🧪 <strong>VERSÃO DE TESTE</strong> — só administradores. Remédios da equipe e fichas editados aqui valem também no site oficial. <a href="/">Ir para o site oficial</a>';
    document.getElementById('aplicativo-principal').prepend(faixa);
    let titulo = document.querySelector('.brand-title');
    if (titulo) titulo.insertAdjacentHTML('beforeend', ' <span class="selo-teste">TESTE</span>');
}

// Chamado por js/firebase.js quando quem entrou na versão de teste não é administrador.
function mostrarBloqueioTeste(email) {
    document.getElementById('aplicativo-principal').style.display = 'none';
    let tela = document.getElementById('tela-login');
    tela.style.display = 'flex';
    tela.innerHTML = `
        <div class="login-box">
            <div class="logo-futurista logo-login">JR</div>
            <h2 style="margin: 0 0 8px 0; font-size: 20px;">🧪 Versão de teste</h2>
            <p style="font-size: 14px; color: #475569; margin: 0 0 18px 0;">Acesso restrito ao administrador.<br>Você entrou como <strong>${escaparHtml(email || '')}</strong>.</p>
            <a href="/" class="login-btn" style="display:block; text-decoration:none; text-align:center; padding: 12px; background:#0284c7; color:#fff; border-radius:8px; font-weight:700;">Ir para o site oficial</a>
        </div>`;
}

// ===== Visual do app (css/temas-teste.css) =====
// O visual A · Hospitalar é o PADRÃO (liberado pelo Dr. Jonas em 10/2026), no oficial e no teste.
// No modo escuro ele sai, e fica o tema escuro normal (o A foi feito para o modo claro).
// No teste, Menu → 🎨 Visual (teste) ainda deixa comparar com os outros (salvo neste aparelho).
const VISUAIS_TESTE = { a: "A · Hospitalar (padrão)", atual: "Antigo", b: "B · Plantão noturno", c: "C · Apple Saúde" };
function lerVisualTeste() { try { return localStorage.getItem('jrmed_visual_teste') || 'a'; } catch (e) { return 'a'; } }
function sincronizarVisual() {
    let html = document.documentElement;
    let v = MODO_TESTE ? lerVisualTeste() : 'a';
    if (!VISUAIS_TESTE[v]) v = 'a';
    let escuro = html.getAttribute('data-theme') === 'dark';
    html.classList.remove('visual-a', 'visual-b', 'visual-c');
    if (v !== 'atual' && !(escuro && v === 'a')) html.classList.add('visual-' + v);
}
function aplicarVisualTeste(v) {
    if (!VISUAIS_TESTE[v]) v = 'a';
    try { localStorage.setItem('jrmed_visual_teste', v); } catch (e) { }
    sincronizarVisual();
    document.querySelectorAll('.visual-teste-btn').forEach(b => b.classList.toggle('ativo', b.dataset.v === v));
}
function criarSecaoVisualTeste() {
    let aparencia = [...document.querySelectorAll('.config-secao')].find(s => /Aparência/.test(s.textContent));
    if (!aparencia || document.getElementById('cfgVisualTeste')) return;
    let atual = lerVisualTeste();
    aparencia.insertAdjacentHTML('afterend', `<div class="config-secao" id="cfgVisualTeste">
        <div class="config-secao-titulo">🎨 Visual (teste)</div>
        <div class="visual-teste-opcoes">${Object.entries(VISUAIS_TESTE).map(([k, t]) =>
            `<button type="button" class="visual-teste-btn${k === atual ? ' ativo' : ''}" data-v="${k}" onclick="aplicarVisualTeste('${k}')">${t}</button>`).join('')}</div>
        <small class="visual-teste-dica">Só neste aparelho e só na versão de teste. O oficial usa o A · Hospitalar (no modo escuro, o tema escuro).</small>
    </div>`);
}
sincronizarVisual();
new MutationObserver(sincronizarVisual).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
if (MODO_TESTE) criarSecaoVisualTeste();
