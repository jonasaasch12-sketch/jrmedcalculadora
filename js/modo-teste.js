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

// ===== Visuais em teste (css/temas-teste.css): o Dr. Jonas testa A, B e C no teste e escolhe um. =====
// Só na versão de teste. Fica salvo neste aparelho (localStorage); o site oficial não muda.
const VISUAIS_TESTE = { atual: "Atual", a: "A · Hospitalar", b: "B · Plantão noturno", c: "C · Apple Saúde" };
function lerVisualTeste() { try { return localStorage.getItem('jrmed_visual_teste') || 'atual'; } catch (e) { return 'atual'; } }
function aplicarVisualTeste(v) {
    if (!VISUAIS_TESTE[v]) v = 'atual';
    let html = document.documentElement;
    html.classList.remove('visual-a', 'visual-b', 'visual-c');
    if (v !== 'atual') html.classList.add('visual-' + v);
    try { localStorage.setItem('jrmed_visual_teste', v); } catch (e) { }
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
        <small class="visual-teste-dica">Só neste aparelho e só na versão de teste. Use com o modo escuro desligado.</small>
    </div>`);
}
if (MODO_TESTE) { aplicarVisualTeste(lerVisualTeste()); criarSecaoVisualTeste(); }
