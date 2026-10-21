// Login (Firebase Auth) e sincronização da equipe (Firestore). Carregado como módulo.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged, signOut, sendPasswordResetEmail,
    deleteUser, EmailAuthProvider, reauthenticateWithCredential
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {
    getFirestore, collection, addDoc, updateDoc, deleteDoc, setDoc, doc, onSnapshot, serverTimestamp, query, orderBy, getDocs, getDoc, increment
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBefBlxbyk2-Gr48Q7uRyVrKe898y7NHtM",
    authDomain: "jrmed-calculadora.firebaseapp.com",
    projectId: "jrmed-calculadora",
    storageBucket: "jrmed-calculadora.appspot.com",
    messagingSenderId: "426237516523",
    appId: "1:426237516523:web:83d50572ee92c7fbc43cae",
    measurementId: "G-5W8ERR26HP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'pt-BR'; // e-mails do Firebase (confirmação e nova senha) em português
const db = getFirestore(app);

// ⚠️ IMPORTANTE — EDITE ESTA LISTA ⚠️
// Coloque aqui o(s) e-mail(s) que podem administrar medicamentos
// (adicionar/editar/remover). Todos os outros e-mails cadastrados
// conseguem USAR o app normalmente, mas NÃO verão o botão de
// administração. Isso é reforçado também no arquivo firestore.rules
// (o navegador do usuário não decide sozinho quem é admin — o
// banco de dados também confere).
const EMAILS_ADMIN = ["jonasaasch12@gmail.com"];

// Coleção compartilhada: TODOS os usuários autenticados deste projeto Firebase
// (ou seja, toda a sua equipe) leem e escrevem na mesma lista de medicamentos.
const COLECAO_MEDICAMENTOS = "medicamentos_equipe";
let paradaListenerMedicamentos = null;

// Categorias/subcategorias criadas pela equipe na tela "🗂️ Categorias".
const COLECAO_CATEGORIAS = "categorias_equipe";
let paradaListenerCategorias = null;

// "Ficha completa" (contraindicações, interações, ajuste renal/hepático) de
// qualquer medicamento — fixo do app OU criado pela equipe. Uma coleção à
// parte porque precisa valer tanto pra remédio fixo (que não tem documento
// próprio no Firestore) quanto pra remédio customizado.
const COLECAO_FICHAS = "fichas_medicamentos";
let paradaListenerFichas = null;

const telaLogin = document.getElementById('tela-login');
const appPrincipal = document.getElementById('aplicativo-principal');
const emailInput = document.getElementById('emailInput');
const senhaInput = document.getElementById('senhaInput');
const btnEntrar = document.getElementById('btnEntrar');
const btnCadastrar = document.getElementById('btnCadastrar');
const btnSair = document.getElementById('btnSair');
const msgErro = document.getElementById('mensagemErro');

// Criar conta: o 1º toque abre o formulário profissional; o 2º valida e cria a conta.
let modoCadastro = false;
function trocarModoCadastro(ligar) {
    modoCadastro = ligar;
    let extra = document.getElementById('cadastroExtra');
    // E-mail digitado 2 vezes: sem e-mail de confirmação, é o que garante que o "Esqueci minha senha" chegue à pessoa.
    if (ligar && !extra.innerHTML) extra.innerHTML = `<label class="login-label" for="cadEmail2">Confirme o e-mail</label>
        <div class="login-input-group"><input type="email" id="cadEmail2" class="login-input" placeholder="Digite o e-mail de novo" autocomplete="off" autocapitalize="off" spellcheck="false"></div>
        <p class="perfil-dica">É para este e-mail que enviamos o link de "Esqueci minha senha". Confira se está certo.</p>` + htmlFormPerfil('cad');
    extra.style.display = ligar ? 'block' : 'none';
    btnEntrar.style.display = ligar ? 'none' : 'block';
    document.getElementById('btnEsqueciSenha').style.display = ligar ? 'none' : 'block';
    document.getElementById('btnVoltarLogin').style.display = ligar ? 'block' : 'none';
    btnCadastrar.innerText = ligar ? "Criar minha conta" : "Criar conta";
    btnCadastrar.classList.toggle('btn-login', ligar);
    btnCadastrar.classList.toggle('btn-register', !ligar);
    senhaInput.setAttribute('autocomplete', ligar ? 'new-password' : 'current-password');
    msgErro.innerText = "";
}
document.getElementById('btnVoltarLogin').addEventListener('click', () => trocarModoCadastro(false));

btnCadastrar.addEventListener('click', () => {
    if (!modoCadastro) { trocarModoCadastro(true); document.getElementById('cadNome')?.focus(); return; }
    let lido = lerFormPerfil('cad');
    if (lido.erro) {
        msgErro.style.color = "#dc2626";
        msgErro.innerText = lido.erro;
        document.getElementById('cad' + lido.campo)?.focus();
        return;
    }
    let email = emailInput.value.trim(), senha = senhaInput.value;
    let email2 = (document.getElementById('cadEmail2')?.value || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msgErro.style.color = "#dc2626"; msgErro.innerText = "Digite um e-mail válido no campo E-mail, lá em cima."; emailInput.focus(); return; }
    if (email.toLowerCase() !== email2.toLowerCase()) { msgErro.style.color = "#dc2626"; msgErro.innerText = "Os dois e-mails não estão iguais. Confira: é por ele que você recupera a senha."; document.getElementById('cadEmail2')?.focus(); return; }
    if (criandoConta) return; // evita o 2º toque (ou Enter) criar de novo e mostrar "já está em uso"
    criandoConta = true;
    btnCadastrar.disabled = true;
    perfilDoCadastro = { email: email.toLowerCase(), perfil: lido.perfil };
    entrouComSenha = true;
    msgErro.style.color = "#0f172a";
    msgErro.innerText = "Criando conta e validando acesso...";
    createUserWithEmailAndPassword(auth, email, senha)
        .then(async (cred) => {
            // Sem e-mail de confirmação (suspenso a pedido do Dr. Jonas: não chegava): a conta já entra.
            // O perfil fica guardado no aparelho também, para a entrada não pedir o cadastro de novo.
            guardarPerfilLocal(cred.user.uid, lido.perfil);
            try {
                await setDoc(doc(db, COLECAO_USUARIOS, cred.user.uid), {
                    email: cred.user.email, perfil: lido.perfil,
                    cadastroEm: cred.user.metadata?.creationTime || new Date().toUTCString()
                }, { merge: true });
            } catch (e) { console.warn("Perfil não gravado no cadastro:", e.code || e.message); }
            trocarModoCadastro(false);
            msgErro.style.color = "#16a34a";
            msgErro.innerText = "Conta criada! Entrando...";
        })
        .catch(async (error) => {
            msgErro.style.color = "#dc2626";
            if (error.code !== 'auth/email-already-in-use') perfilDoCadastro = null;
            if (error.code === 'auth/email-already-in-use') {
                await tratarEmailJaCadastrado(email, senha, lido.perfil);
            } else if (error.code === 'auth/weak-password') {
                msgErro.innerText = "A senha deve ter pelo menos 6 caracteres.";
            } else {
                msgErro.innerText = mensagemDeErro(error);
            }
        })
        .finally(() => { criandoConta = false; btnCadastrar.disabled = false; });
});
let criandoConta = false;
// Perfil recém-preenchido em "Criar conta": o app pode abrir antes de o Firebase terminar de gravar,
// então a entrada usa esta cópia em vez de pedir o cadastro de novo.
let perfilDoCadastro = null;

// E-mail já cadastrado: em geral é um cadastro começado antes e não confirmado.
// Tenta entrar com a mesma senha: se a conta não foi confirmada, completa o cadastro e reenvia o e-mail.
async function tratarEmailJaCadastrado(email, senha, perfil) {
    try {
        entrouComSenha = true;
        let cred = await signInWithEmailAndPassword(auth, email, senha);
        // Senha certa: cadastro começado antes (quando o e-mail de confirmação não chegava). Grava os dados e entra.
        guardarPerfilLocal(cred.user.uid, perfil);
        try { await setDoc(doc(db, COLECAO_USUARIOS, cred.user.uid), { email: cred.user.email, perfil }, { merge: true }); } catch (e) { }
        trocarModoCadastro(false);
        msgErro.style.color = "#16a34a";
        msgErro.innerText = "Você já tinha cadastro com este e-mail. Entrando...";
    } catch (e) {
        perfilDoCadastro = null;
        trocarModoCadastro(false);
        emailInput.value = email;
        senhaInput.value = "";
        msgErro.style.color = "#dc2626";
        msgErro.innerText = e.code === 'auth/too-many-requests'
            ? mensagemDeErro(e)
            : "Este e-mail já tem cadastro no JR MED. Entre com a sua senha. Se não lembrar, toque em \"Esqueci minha senha\" para criar uma nova.";
    }
}

function mensagemDeErro(error) {
    switch (error.code) {
        case 'auth/too-many-requests':
            return "O Firebase bloqueou temporariamente por excesso de tentativas seguidas. Aguarde 5-10 minutos e tente de novo (isso NÃO significa que a senha está errada).";
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
            return "E-mail ou senha incorretos.";
        case 'auth/user-not-found':
            return "Não existe conta com esse e-mail. Toque em \"Criar Conta\".";
        case 'auth/network-request-failed':
            return "Falha de conexão com a internet. Verifique o wifi/dados e tente de novo.";
        case 'auth/invalid-email':
            return "Esse e-mail não parece válido. Confira se digitou certo.";
        default:
            return `Erro (${error.code || 'desconhecido'}): ${error.message}`;
    }
}

let entrouComSenha = false; // acabou de digitar a senha: não pede a digital logo em seguida
btnEntrar.addEventListener('click', () => {
    marcarAtividade();
    entrouComSenha = true;
    msgErro.style.color = "#0f172a";
    msgErro.innerText = "Verificando credenciais...";
    signInWithEmailAndPassword(auth, emailInput.value, senhaInput.value)
        .catch((error) => {
            msgErro.style.color = "#dc2626";
            msgErro.innerText = mensagemDeErro(error);
        });
});

// "Esqueci minha senha": o Firebase envia um link para a pessoa criar uma senha nova.
document.getElementById('btnEsqueciSenha').addEventListener('click', () => {
    let email = emailInput.value.trim();
    if (!email) {
        msgErro.style.color = "#dc2626";
        msgErro.innerText = "Digite seu e-mail no campo acima e toque de novo em \"Esqueci minha senha\".";
        emailInput.focus();
        return;
    }
    msgErro.style.color = "#0f172a";
    msgErro.innerText = "Enviando o link para criar uma nova senha...";
    enviarNovaSenha(email)
        .then(() => {
            msgErro.style.color = "#16a34a";
            msgErro.innerText = `Enviamos o link para criar uma nova senha para ${email} (se esse e-mail tiver conta no JR MED). Procure na caixa de entrada e no spam o e-mail de noreply@jrmed-calculadora.firebaseapp.com. O link vale por 1 hora.`;
        })
        .catch((error) => {
            msgErro.style.color = "#dc2626";
            msgErro.innerText = mensagemDeErro(error);
        });
});

// Tecla Enter no login: no e-mail passa para a senha (ou entra, se já preenchida); na senha, entra.
emailInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (senhaInput.value && !modoCadastro) btnEntrar.click(); else senhaInput.focus();
});
senhaInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    (modoCadastro ? btnCadastrar : btnEntrar).click();
});

// ===== Sessão: sai sozinho depois de um tempo sem uso =====
// Computador (muitas vezes compartilhado no hospital): 1 h. Celular: sem limite (pedido do Dr. Jonas);
// no celular a proteção é a digital (js/digital.js). null = sem limite.
// A última atividade fica no aparelho (localStorage) e vale para todas as abas abertas.
const LIMITE_INATIVIDADE_COMPUTADOR_H = 1;
const LIMITE_INATIVIDADE_CELULAR_H = null;
const CHAVE_ATIVIDADE = 'jrmed_ultimaAtividade';
const EH_CELULAR = window.matchMedia('(pointer: coarse)').matches;
const LIMITE_HORAS = EH_CELULAR ? LIMITE_INATIVIDADE_CELULAR_H : LIMITE_INATIVIDADE_COMPUTADOR_H;
const LIMITE_MS = LIMITE_HORAS ? LIMITE_HORAS * 3600 * 1000 : null;
let sessaoExpirada = false, ultimaGravacao = 0;

function lerAtividade() { try { return +localStorage.getItem(CHAVE_ATIVIDADE) || 0; } catch (e) { return 0; } }
function marcarAtividade() { try { localStorage.setItem(CHAVE_ATIVIDADE, String(Date.now())); } catch (e) { } }
function limparAtividade() { try { localStorage.removeItem(CHAVE_ATIVIDADE); } catch (e) { } }

function aoUsarApp() {
    if (!auth.currentUser) return;
    let agora = Date.now();
    if (agora - ultimaGravacao > 30000) { ultimaGravacao = agora; marcarAtividade(); }
}
['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(ev => window.addEventListener(ev, aoUsarApp, { passive: true, capture: true }));

// true = passou do limite e a sessão foi encerrada.
function conferirInatividade() {
    if (!auth.currentUser || !LIMITE_MS) return false;
    let ultima = lerAtividade();
    if (ultima && Date.now() - ultima > LIMITE_MS) {
        sessaoExpirada = true;
        limparAtividade();
        signOut(auth);
        return true;
    }
    return false;
}
setInterval(conferirInatividade, 60 * 1000);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') conferirInatividade(); });
const infoSessao = document.getElementById('infoSessao');
if (infoSessao) infoSessao.innerText = LIMITE_MS
    ? `Por segurança, a sessão se encerra após ${LIMITE_HORAS} h sem uso neste computador.`
    : "No celular a sessão fica aberta. Para proteger, ative a digital acima.";
window.sairDaConta = () => { limparAtividade(); signOut(auth); };

btnSair.addEventListener('click', async () => {
    let u = window.__usuarioAtual;
    if (u && window.digitalAtivadaPara && digitalAtivadaPara(u.uid)) {
        if (window.fecharConfig) fecharConfig();
        if (!(await exigirDigital())) window.sairDaConta();
        return;
    }
    limparAtividade();
    signOut(auth);
});

function iniciarListenerMedicamentos() {
    if (paradaListenerMedicamentos) return; // já está ouvindo
    const q = query(collection(db, COLECAO_MEDICAMENTOS), orderBy("criadoEm", "desc"));
    paradaListenerMedicamentos = onSnapshot(q, (snapshot) => {
        let lista = snapshot.docs.map(d => ({ id: d.id, dados: d.data() }));
        if (window.atualizarMedicamentosCustomizados) {
            window.atualizarMedicamentosCustomizados(lista);
        }
    }, (erro) => {
        console.error("[JR MED] Não foi possível carregar os medicamentos da equipe:", erro);
    });
}

function pararListenerMedicamentos() {
    if (paradaListenerMedicamentos) { paradaListenerMedicamentos(); paradaListenerMedicamentos = null; }
}

function iniciarListenerCategorias() {
    if (paradaListenerCategorias) return;
    paradaListenerCategorias = onSnapshot(collection(db, COLECAO_CATEGORIAS), (snapshot) => {
        let lista = snapshot.docs.map(d => ({ id: d.id, dados: d.data() }));
        if (window.atualizarCategoriasCustomizadas) {
            window.atualizarCategoriasCustomizadas(lista);
        }
    }, (erro) => {
        console.error("[JR MED] Não foi possível carregar as categorias da equipe:", erro);
    });
}

function pararListenerCategorias() {
    if (paradaListenerCategorias) { paradaListenerCategorias(); paradaListenerCategorias = null; }
}

function iniciarListenerFichas() {
    if (paradaListenerFichas) return;
    paradaListenerFichas = onSnapshot(collection(db, COLECAO_FICHAS), (snapshot) => {
        let lista = snapshot.docs.map(d => ({ id: d.id, dados: d.data() }));
        if (window.atualizarFichasMedicamentos) {
            window.atualizarFichasMedicamentos(lista);
        }
    }, (erro) => {
        console.error("[JR MED] Não foi possível carregar as fichas completas:", erro);
    });
}

function pararListenerFichas() {
    if (paradaListenerFichas) { paradaListenerFichas(); paradaListenerFichas = null; }
}

// Exposto para o script principal do app (não-módulo) poder salvar/excluir.
window.JRFirestore = {
    salvarMedicamento: async (regra) => {
        if (!auth.currentUser) throw new Error("Sessão expirada. Faça login novamente.");
        if (!EMAILS_ADMIN.includes(auth.currentUser.email)) throw new Error("Apenas o administrador pode adicionar medicamentos.");
        regra.criadoPor = auth.currentUser.email;
        regra.criadoEm = serverTimestamp();
        await addDoc(collection(db, COLECAO_MEDICAMENTOS), regra);
    },
    editarMedicamento: async (idDocumento, regra) => {
        if (!auth.currentUser) throw new Error("Sessão expirada. Faça login novamente.");
        if (!EMAILS_ADMIN.includes(auth.currentUser.email)) throw new Error("Apenas o administrador pode editar medicamentos.");
        regra.editadoPor = auth.currentUser.email;
        regra.editadoEm = serverTimestamp();
        await updateDoc(doc(db, COLECAO_MEDICAMENTOS, idDocumento), regra);
    },
    excluirMedicamento: async (idDocumento) => {
        if (!auth.currentUser) throw new Error("Sessão expirada. Faça login novamente.");
        if (!EMAILS_ADMIN.includes(auth.currentUser.email)) throw new Error("Apenas o administrador pode remover medicamentos.");
        await deleteDoc(doc(db, COLECAO_MEDICAMENTOS, idDocumento));
    },
    salvarCategoria: async (dados) => {
        if (!auth.currentUser) throw new Error("Sessão expirada. Faça login novamente.");
        if (!EMAILS_ADMIN.includes(auth.currentUser.email)) throw new Error("Apenas o administrador pode criar categorias.");
        dados.criadoPor = auth.currentUser.email;
        dados.criadoEm = serverTimestamp();
        await addDoc(collection(db, COLECAO_CATEGORIAS), dados);
    },
    editarCategoria: async (idDocumento, dados) => {
        if (!auth.currentUser) throw new Error("Sessão expirada. Faça login novamente.");
        if (!EMAILS_ADMIN.includes(auth.currentUser.email)) throw new Error("Apenas o administrador pode editar categorias.");
        dados.editadoPor = auth.currentUser.email;
        dados.editadoEm = serverTimestamp();
        await updateDoc(doc(db, COLECAO_CATEGORIAS, idDocumento), dados);
    },
    excluirCategoria: async (idDocumento) => {
        if (!auth.currentUser) throw new Error("Sessão expirada. Faça login novamente.");
        if (!EMAILS_ADMIN.includes(auth.currentUser.email)) throw new Error("Apenas o administrador pode remover categorias.");
        await deleteDoc(doc(db, COLECAO_CATEGORIAS, idDocumento));
    },
    salvarFicha: async (idMedicamento, dados) => {
        if (!auth.currentUser) throw new Error("Sessão expirada. Faça login novamente.");
        if (!EMAILS_ADMIN.includes(auth.currentUser.email)) throw new Error("Apenas o administrador pode editar a ficha completa.");
        dados.atualizadoPor = auth.currentUser.email;
        dados.atualizadoEm = serverTimestamp();
        // Documento com ID = o próprio ID do medicamento, pra funcionar tanto com
        // remédio fixo do app quanto com remédio criado pela equipe.
        await setDoc(doc(db, COLECAO_FICHAS, idMedicamento), dados, { merge: true });
    }
};

// ===== Usuários cadastrados (tela só do administrador) =====
// O navegador não consegue listar as contas do Firebase Authentication. Por isso,
// a cada acesso com e-mail confirmado, o app grava/atualiza um documento do próprio
// usuário em "usuarios" (id = uid). Só o administrador lê a coleção (regra no Firestore).
const COLECAO_USUARIOS = "usuarios";
let usuariosCarregados = [];

async function registrarAcesso(user) {
    try {
        await setDoc(doc(db, COLECAO_USUARIOS, user.uid), {
            email: user.email,
            cadastroEm: user.metadata?.creationTime || null,
            ultimoAcesso: serverTimestamp(),
            acessos: increment(1),
            versao: MODO_TESTE ? "teste" : "oficial"
        }, { merge: true });
    } catch (e) {
        // Sem a regra do Firestore, o registro é recusado: o app segue normalmente.
        console.warn("Registro de acesso não gravado:", e.code || e.message);
    }
}

function dataBR(d, comHora) {
    if (!d || isNaN(d)) return "—";
    let txt = d.toLocaleDateString('pt-BR');
    return comHora ? txt + " " + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : txt;
}

window.renderizarUsuarios = function () {
    let caixa = document.getElementById('listaUsuarios');
    if (!caixa) return;
    let termo = (document.getElementById('buscaUsuarios')?.value || "").trim().toLowerCase();
    let lista = usuariosCarregados.filter(u => [u.email, u.perfil?.nome, u.perfil?.registro, resumoPerfil(u.perfil)].join(' ').toLowerCase().includes(termo));
    let seteDias = Date.now() - 7 * 864e5;
    let recentes = usuariosCarregados.filter(u => u.ultimo && u.ultimo.getTime() >= seteDias).length;
    let esc = t => String(t).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
    let limiteInativo = Date.now() - PRAZO_INATIVO_MS;
    let nInativos = usuariosCarregados.filter(u => u.ultimo && u.ultimo.getTime() < limiteInativo && !EMAILS_ADMIN.includes(u.email)).length;
    caixa.innerHTML = `<div class="usu-resumo"><strong>${usuariosCarregados.length}</strong> usuário(s) no total · ${recentes} acessaram nos últimos 7 dias</div>` +
        (nInativos ? `<div class="usu-erro">${nInativos} cadastro(s) sem acesso há mais de 5 anos devem ser excluídos (Política de Privacidade). <button type="button" class="usu-csv" onclick="excluirInativos()">Excluir agora</button></div>` : '') +
        (lista.length ? lista.map(u => `<div class="usu-item">
            <div class="usu-avatar">${esc((u.email || "?").charAt(0).toUpperCase())}</div>
            <div class="usu-dados">
                <div class="usu-email">${esc(u.perfil?.nome || u.email || "(sem e-mail)")}${EMAILS_ADMIN.includes(u.email) ? ' <span class="usu-tag">admin</span>' : ''}${pendenciaPerfil(u.perfil) ? ' <span class="usu-tag usu-tag-pend">cadastro incompleto</span>' : ''}</div>
                ${u.perfil?.nome ? `<div class="usu-info">${esc(u.email)}</div>` : ''}
                ${u.perfil ? `<div class="usu-perfil">${esc(resumoPerfil(u.perfil))}${u.perfil.celular ? ' · ' + esc(u.perfil.celular) : ''}</div>` : ''}
                <div class="usu-info">Cadastro: ${dataBR(u.cadastro)} · Último acesso: ${dataBR(u.ultimo, true)}${u.versao === 'teste' ? ' (teste)' : ''} · ${u.acessos || 1} acesso(s)</div>
            </div>
        </div>`).join('') : '<p class="form-hint">Nenhum usuário encontrado.</p>');
};

// ===== Meus dados (LGPD, art. 18): ver, corrigir, baixar e excluir a própria conta =====
const PRAZO_INATIVO_MS = 5 * 365.25 * 864e5; // contas sem acesso por 5 anos são excluídas (Política de Privacidade)
function baixarArquivo(nome, conteudo, tipo) {
    let a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([conteudo], { type: tipo }));
    a.download = nome;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function msgMeusDados(txt, cor) { let m = document.getElementById('mdMsg'); m.style.color = cor || "#0f172a"; m.innerText = txt; }

document.getElementById('btnMeusDados').addEventListener('click', () => {
    if (window.fecharConfig) fecharConfig();
    let u = auth.currentUser;
    if (!u) return;
    document.getElementById('mdEmail').innerText = u.email;
    document.getElementById('meusDadosForm').innerHTML = htmlFormPerfil('md', window.__perfilAtual || lerPerfilLocal(u.uid) || {});
    document.getElementById('mdSenhaExcluir').value = "";
    msgMeusDados("");
    abrirModal('modalMeusDados');
});

document.getElementById('btnSalvarMeusDados').addEventListener('click', async () => {
    let u = auth.currentUser, lido = lerFormPerfil('md');
    if (!u) return;
    if (lido.erro) { msgMeusDados(lido.erro, "#dc2626"); document.getElementById('md' + lido.campo)?.focus(); return; }
    msgMeusDados("Salvando...");
    try {
        await setDoc(doc(db, COLECAO_USUARIOS, u.uid), { email: u.email, perfil: lido.perfil }, { merge: true });
        guardarPerfilLocal(u.uid, lido.perfil);
        window.__perfilAtual = lido.perfil;
        let tag = document.getElementById('userEmailTag');
        if (tag) tag.innerText = lido.perfil.nome + " · " + u.email + (EMAILS_ADMIN.includes(u.email) ? " (admin)" : "");
        msgMeusDados("✅ Dados atualizados.", "#16a34a");
    } catch (e) { msgMeusDados("Não foi possível salvar (" + (e.code || e.message) + ").", "#dc2626"); }
});

document.getElementById('btnBaixarMeusDados').addEventListener('click', async () => {
    let u = auth.currentUser;
    if (!u) return;
    let dados = { email: u.email, cadastroEm: u.metadata?.creationTime || null, ultimoLogin: u.metadata?.lastSignInTime || null };
    try {
        let snap = await getDoc(doc(db, COLECAO_USUARIOS, u.uid));
        if (snap.exists()) {
            let x = snap.data();
            Object.assign(dados, { perfil: x.perfil || null, acessos: x.acessos || null, ultimoAcesso: x.ultimoAcesso?.toDate ? x.ultimoAcesso.toDate().toISOString() : null });
        }
    } catch (e) { dados.perfil = window.__perfilAtual || null; }
    baixarArquivo("meus-dados-jrmed.json", JSON.stringify(dados, null, 2), "application/json");
    msgMeusDados("Arquivo \"meus-dados-jrmed.json\" baixado.", "#16a34a");
});

document.getElementById('btnExcluirConta').addEventListener('click', async () => {
    let u = auth.currentUser, senha = document.getElementById('mdSenhaExcluir').value;
    if (!u) return;
    if (!senha) { msgMeusDados("Digite a sua senha para confirmar a exclusão.", "#dc2626"); return; }
    if (!confirm("Excluir a sua conta do JR MED? O login e o cadastro serão apagados e isso não pode ser desfeito.")) return;
    msgMeusDados("Excluindo...");
    try {
        await reauthenticateWithCredential(u, EmailAuthProvider.credential(u.email, senha));
        await deleteDoc(doc(db, COLECAO_USUARIOS, u.uid));
        ['jrmed_perfil', 'jrmed_digital', CHAVE_ATIVIDADE].forEach(k => { try { localStorage.removeItem(k); } catch (e) { } });
        await deleteUser(u);
        fecharModal('modalMeusDados');
        msgErro.style.color = "#16a34a";
        msgErro.innerText = "Sua conta foi excluída. Obrigado por ter usado o JR MED.";
    } catch (e) {
        msgMeusDados(e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential' ? "Senha incorreta." : mensagemDeErro(e), "#dc2626");
    }
});

// Administrador: excluir os cadastros sem acesso há mais de 5 anos.
window.excluirInativos = async function () {
    let limite = Date.now() - PRAZO_INATIVO_MS;
    let inativos = usuariosCarregados.filter(u => u.ultimo && u.ultimo.getTime() < limite && !EMAILS_ADMIN.includes(u.email));
    if (!inativos.length) return;
    if (!confirm(`Excluir ${inativos.length} cadastro(s) sem acesso há mais de 5 anos?\n\nO login (e-mail) dessas pessoas também deve ser apagado no console do Firebase → Authentication → Usuários.`)) return;
    for (let u of inativos) { try { await deleteDoc(doc(db, COLECAO_USUARIOS, u.uid)); } catch (e) { console.warn(e); } }
    alert("Cadastros excluídos:\n" + inativos.map(u => u.email).join("\n"));
    window.carregarUsuarios();
};

// Planilha (CSV com ";" e acentos, abre direto no Excel).
window.baixarUsuariosCSV = function () {
    let cab = ["Nome", "E-mail", "Atividade", "Conselho", "Registro", "UF", "Especialidade", "Faculdade", "Formatura", "Celular", "Cadastro", "Último acesso", "Acessos", "Situação"];
    let cel = v => '"' + String(v ?? "").replace(/"/g, '""') + '"';
    let linhas = usuariosCarregados.map(u => {
        let p = u.perfil || {};
        return [p.nome, u.email, ATIVIDADES_PERFIL[p.atividade]?.nome, p.conselho, p.registro, p.uf, p.especialidade, p.instituicao,
            p.formaturaMes ? String(p.formaturaMes).padStart(2, '0') + "/" + p.formaturaAno : "", p.celular,
            dataBR(u.cadastro), dataBR(u.ultimo, true), u.acessos || "", pendenciaPerfil(u.perfil) ? "Cadastro incompleto" : "OK"].map(cel).join(';');
    });
    let blob = new Blob(["\uFEFF" + [cab.map(cel).join(';'), ...linhas].join('\r\n')], { type: "text/csv;charset=utf-8" });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "usuarios-jrmed-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
};

window.carregarUsuarios = async function () {
    let caixa = document.getElementById('listaUsuarios');
    if (!caixa) return;
    caixa.innerHTML = '<p class="form-hint">Carregando…</p>';
    try {
        if (!EMAILS_ADMIN.includes(auth.currentUser?.email)) throw new Error("Apenas o administrador pode ver os usuários.");
        let snap = await getDocs(query(collection(db, COLECAO_USUARIOS), orderBy("ultimoAcesso", "desc")));
        usuariosCarregados = snap.docs.map(d => {
            let x = d.data();
            return { uid: d.id, email: x.email, perfil: x.perfil || null, cadastro: x.cadastroEm ? new Date(x.cadastroEm) : null, ultimo: x.ultimoAcesso?.toDate ? x.ultimoAcesso.toDate() : null, acessos: x.acessos, versao: x.versao };
        });
        window.renderizarUsuarios();
    } catch (e) {
        let semPermissao = (e.code || "").includes("permission");
        caixa.innerHTML = semPermissao
            ? '<div class="usu-erro"><strong>Falta liberar a coleção "usuarios" no Firebase.</strong> No console do Firebase → Firestore Database → Regras, acrescente o bloco de regras que o Claude enviou e clique em Publicar.</div>'
            : `<div class="usu-erro">Não foi possível carregar: ${e.message}</div>`;
    }
};

// E-mails do Firebase (o texto do modelo não pode ser editado neste projeto): ao terminar
// no link do e-mail, a página do Firebase mostra "Continuar", que volta ao JR MED com um aviso.
function urlDeVolta(param) { return location.origin + location.pathname + '?' + param + '=1'; }
async function enviarNovaSenha(email) {
    try { await sendPasswordResetEmail(auth, email, { url: urlDeVolta('senhaRedefinida') }); }
    catch (e) { if (String(e.code || '').includes('continue-uri') || String(e.code || '').includes('unauthorized')) await sendPasswordResetEmail(auth, email); else throw e; }
}
(function avisoDeVolta() {
    let q = new URLSearchParams(location.search), txt = null;
    if (q.has('emailConfirmado')) txt = "✅ E-mail confirmado! Agora entre com o seu e-mail e senha.";
    if (q.has('senhaRedefinida')) txt = "✅ Senha alterada! Entre com a nova senha.";
    if (!txt) return;
    msgErro.style.color = "#16a34a";
    msgErro.innerText = txt;
    history.replaceState(null, '', location.pathname);
})();

const telaPerfil = document.getElementById('tela-perfil');
function lerPerfilLocal(uid) { try { let d = JSON.parse(localStorage.getItem('jrmed_perfil') || 'null'); return d && d.uid === uid ? d.perfil : null; } catch (e) { return null; } }
function guardarPerfilLocal(uid, perfil) { try { localStorage.setItem('jrmed_perfil', JSON.stringify({ uid, perfil })); } catch (e) { } }

function mostrarApp(user, perfil) {
    telaLogin.style.display = "none";
    telaPerfil.style.display = "none";
    appPrincipal.style.display = "block";
    let tag = document.getElementById('userEmailTag');
    let ehAdmin = EMAILS_ADMIN.includes(user.email);
    window.usuarioEhAdmin = ehAdmin;
    window.__usuarioAtual = { uid: user.uid, email: user.email, nome: perfil?.nome || "" };
    window.__perfilAtual = perfil || null;
    if (window.atualizarBotaoDigital) atualizarBotaoDigital();
    if (tag) tag.innerText = (perfil?.nome ? perfil.nome + " · " : "") + user.email + (ehAdmin ? " (admin)" : "");
    let btnAdd = document.getElementById('btnAddMed');
    if (btnAdd) btnAdd.style.display = ehAdmin ? "inline-flex" : "none";
    let btnCat = document.getElementById('btnCategorias');
    if (btnCat) btnCat.style.display = ehAdmin ? "inline-flex" : "none";
    let btnUsu = document.getElementById('btnUsuarios');
    if (btnUsu) btnUsu.style.display = ehAdmin ? "inline-flex" : "none";
    let secEquipe = document.getElementById('cfgEquipe');
    if (secEquipe) secEquipe.style.display = ehAdmin ? "block" : "none";
    let avatar = document.getElementById('configAvatar');
    if (avatar) avatar.innerText = (perfil?.nome || user.email || "?").charAt(0).toUpperCase();
    iniciarListenerMedicamentos();
    iniciarListenerCategorias();
    iniciarListenerFichas();
    if (window.atualizarVisibilidadeAdmin) window.atualizarVisibilidadeAdmin();
}

// Pede o cadastro profissional (bloqueia o app até salvar).
function pedirPerfil(user, perfil, motivo) {
    telaLogin.style.display = "none";
    appPrincipal.style.display = "none";
    telaPerfil.style.display = "flex";
    document.getElementById('perfilMotivo').innerText = motivo;
    document.getElementById('perfilForm').innerHTML = htmlFormPerfil('pf', perfil);
    document.getElementById('perfilErro').innerText = "";
    document.getElementById('btnSalvarPerfil').onclick = async () => {
        let erroEl = document.getElementById('perfilErro');
        let lido = lerFormPerfil('pf');
        if (lido.erro) { erroEl.style.color = "#dc2626"; erroEl.innerText = lido.erro; document.getElementById('pf' + lido.campo)?.focus(); return; }
        erroEl.style.color = "#0f172a"; erroEl.innerText = "Salvando...";
        try {
            await setDoc(doc(db, COLECAO_USUARIOS, user.uid), { email: user.email, perfil: lido.perfil }, { merge: true });
            guardarPerfilLocal(user.uid, lido.perfil);
            mostrarApp(user, lido.perfil);
        } catch (e) {
            erroEl.style.color = "#dc2626";
            erroEl.innerText = "Não foi possível salvar (" + (e.code || e.message) + "). Verifique a internet e tente de novo.";
        }
    };
}
document.getElementById('btnSairPerfil').addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, async (user) => {
    if (user) { // e-mail de confirmação suspenso: qualquer conta logada entra
        if (conferirInatividade()) return;
        if (!lerAtividade()) marcarAtividade();
        let ehAdmin = EMAILS_ADMIN.includes(user.email);
        // Versão de teste (/teste/): só administradores entram.
        if (MODO_TESTE && !ehAdmin) { registrarAcesso(user); telaLogin.style.display = "none"; appPrincipal.style.display = "block"; mostrarBloqueioTeste(user.email); return; }
        // Celular com digital ativada: pede a digital antes de mostrar o app.
        if (!entrouComSenha && window.digitalAtivadaPara && digitalAtivadaPara(user.uid)) {
            telaLogin.style.display = "none";
            if (!(await exigirDigital())) { window.sairDaConta(); return; }
        }
        entrouComSenha = false;
        // Lê o perfil ANTES de gravar o acesso: com uma gravação pendente, o Firebase devolvia a cópia
        // local (só com os dados do acesso, sem o perfil) e o app pedia o cadastro de novo a cada entrada.
        let perfil = null, lido = false;
        try {
            let snap = await getDoc(doc(db, COLECAO_USUARIOS, user.uid));
            perfil = snap.exists() ? (snap.data().perfil || null) : null;
            lido = true;
        } catch (e) {
            // Sem permissão de leitura (regra antiga) ou sem internet: não trava o acesso.
            console.warn("Perfil não lido:", e.code || e.message);
        }
        registrarAcesso(user);
        // Cópia do perfil salva neste aparelho: se o servidor não trouxer, usa e regrava.
        let copia = lerPerfilLocal(user.uid);
        if (perfilDoCadastro && perfilDoCadastro.email === (user.email || '').toLowerCase()) { copia = perfilDoCadastro.perfil; perfilDoCadastro = null; }
        if (pendenciaPerfil(perfil) && copia && !pendenciaPerfil(copia)) {
            perfil = copia;
            setDoc(doc(db, COLECAO_USUARIOS, user.uid), { email: user.email, perfil: copia }, { merge: true }).catch(() => { });
        }
        if (perfil && !pendenciaPerfil(perfil)) guardarPerfilLocal(user.uid, perfil);
        let motivo = lido ? pendenciaPerfil(perfil) : null;
        if (motivo) pedirPerfil(user, perfil, motivo);
        else mostrarApp(user, perfil);
    } else {
        telaLogin.style.display = "flex";
        telaPerfil.style.display = "none";
        appPrincipal.style.display = "none";
        if (!modoCadastro) { emailInput.value = ""; senhaInput.value = ""; }
        if (sessaoExpirada) {
            sessaoExpirada = false;
            msgErro.style.color = "#0f172a";
            msgErro.innerText = `Por segurança, sua sessão foi encerrada após ${LIMITE_HORAS} h sem uso. Entre novamente.`;
        }
        window.usuarioEhAdmin = false;
        window.__usuarioAtual = null;
        pararListenerMedicamentos();
        pararListenerCategorias();
        pararListenerFichas();
        if (window.atualizarMedicamentosCustomizados) window.atualizarMedicamentosCustomizados([]);
        if (window.atualizarCategoriasCustomizadas) window.atualizarCategoriasCustomizadas([]);
        if (window.atualizarFichasMedicamentos) window.atualizarFichasMedicamentos([]);
    }
});
