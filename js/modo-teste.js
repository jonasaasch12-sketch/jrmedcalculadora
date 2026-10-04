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
