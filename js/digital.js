// Desbloqueio com digital (ou rosto) no celular, pelo leitor do próprio aparelho (WebAuthn).
// O celular continua logado; ao abrir o app (ou voltar a ele depois de 5 min em segundo plano),
// pede a digital antes de mostrar o conteúdo. A digital nunca sai do aparelho: o app só guarda
// o identificador da chave criada pelo celular (localStorage), ligado ao usuário (uid).
// Usado por js/firebase.js: digitalAtivadaPara(), exigirDigital(), atualizarBotaoDigital().

const CHAVE_DIGITAL = 'jrmed_digital';
const DIGITAL_RELOCK_MS = 5 * 60 * 1000; // voltar ao app depois de 5 min em segundo plano pede a digital de novo
const EH_CELULAR_DIGITAL = window.matchMedia('(pointer: coarse)').matches;

function bufParaB64(buf) { return btoa(String.fromCharCode(...new Uint8Array(buf))); }
function b64ParaBuf(b64) { return Uint8Array.from(atob(b64), c => c.charCodeAt(0)); }
function bytesAleatorios(n) { let b = new Uint8Array(n); crypto.getRandomValues(b); return b; }

function lerDigital() { try { return JSON.parse(localStorage.getItem(CHAVE_DIGITAL) || 'null'); } catch (e) { return null; } }
function digitalAtivadaPara(uid) { let d = lerDigital(); return !!(d && d.uid === uid && d.id); }

// Só no celular com leitor biométrico (ou reconhecimento facial) disponível.
async function digitalDisponivel() {
    if (!EH_CELULAR_DIGITAL || !window.PublicKeyCredential || !window.isSecureContext) return false;
    try { return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(); } catch (e) { return false; }
}

async function ativarDigital(u) {
    let cred = await navigator.credentials.create({
        publicKey: {
            rp: { name: "JR MED" },
            user: { id: new TextEncoder().encode(u.uid).slice(0, 64), name: u.email, displayName: u.nome || u.email },
            challenge: bytesAleatorios(32),
            pubKeyCredParams: [{ type: "public-key", alg: -7 }, { type: "public-key", alg: -257 }],
            authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required", residentKey: "discouraged" },
            timeout: 60000
        }
    });
    localStorage.setItem(CHAVE_DIGITAL, JSON.stringify({ uid: u.uid, id: bufParaB64(cred.rawId) }));
}

function desativarDigital() { try { localStorage.removeItem(CHAVE_DIGITAL); } catch (e) { } }

async function conferirDigital() {
    let d = lerDigital();
    await navigator.credentials.get({
        publicKey: {
            challenge: bytesAleatorios(32),
            allowCredentials: [{ type: "public-key", id: b64ParaBuf(d.id), transports: ["internal"] }],
            userVerification: "required",
            timeout: 60000
        }
    });
}

// Mostra a tela de bloqueio e resolve true (digital ok) ou false (escolheu entrar com e-mail e senha).
let bloqueioAtivo = null;
function exigirDigital() {
    if (bloqueioAtivo) return bloqueioAtivo;
    let tela = document.getElementById('tela-bloqueio');
    let msg = document.getElementById('bloqueioMsg');
    tela.style.display = 'flex';
    document.body.classList.add('bloqueado-digital');
    bloqueioAtivo = new Promise(resolve => {
        let terminar = ok => { tela.style.display = 'none'; document.body.classList.remove('bloqueado-digital'); bloqueioAtivo = null; resolve(ok); };
        let tentar = async () => {
            msg.innerText = "";
            try { await conferirDigital(); terminar(true); }
            catch (e) { msg.innerText = "Digital não confirmada. Toque em \"Desbloquear\" para tentar de novo."; }
        };
        document.getElementById('btnDesbloquear').onclick = tentar;
        document.getElementById('btnBloqueioSenha').onclick = () => terminar(false);
        tentar();
    });
    return bloqueioAtivo;
}

// Botão "Entrar com digital" no menu de configurações.
async function atualizarBotaoDigital() {
    let linha = document.getElementById('linhaDigital'), btn = document.getElementById('btnDigital');
    if (!linha || !btn) return;
    let u = window.__usuarioAtual;
    if (!u || !(await digitalDisponivel())) { linha.style.display = 'none'; return; }
    linha.style.display = 'block';
    let ligado = digitalAtivadaPara(u.uid);
    btn.classList.toggle('ligado', ligado);
    btn.setAttribute('aria-pressed', ligado ? 'true' : 'false');
}

async function alternarDigital() {
    let u = window.__usuarioAtual, aviso = document.getElementById('digitalAviso');
    if (!u) return;
    if (digitalAtivadaPara(u.uid)) { desativarDigital(); aviso.innerText = "Digital desativada neste celular."; }
    else {
        try { await ativarDigital(u); aviso.innerText = "Pronto! Ao abrir o app, ele vai pedir a sua digital."; }
        catch (e) { aviso.innerText = "Não foi possível cadastrar a digital (" + (e.name || "erro") + "). Confira se o celular tem digital ou rosto cadastrado."; }
    }
    atualizarBotaoDigital();
}

// Voltou ao app depois de um tempo em segundo plano: pede a digital de novo.
let saiuDoAppEm = 0;
document.addEventListener('visibilitychange', async () => {
    let u = window.__usuarioAtual;
    if (document.visibilityState === 'hidden') { saiuDoAppEm = Date.now(); return; }
    if (!u || !digitalAtivadaPara(u.uid) || !saiuDoAppEm || Date.now() - saiuDoAppEm < DIGITAL_RELOCK_MS) return;
    saiuDoAppEm = 0;
    if (!(await exigirDigital()) && window.sairDaConta) window.sairDaConta();
});
