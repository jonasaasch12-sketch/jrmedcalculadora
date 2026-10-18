// Login (Firebase Auth) e sincronização da equipe (Firestore). Carregado como módulo.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged, signOut, sendEmailVerification, sendPasswordResetEmail
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
const btnReenviar = document.getElementById('btnReenviarVerificacao');

// Criar conta: o 1º toque abre o formulário profissional; o 2º valida e cria a conta.
let modoCadastro = false;
function trocarModoCadastro(ligar) {
    modoCadastro = ligar;
    let extra = document.getElementById('cadastroExtra');
    if (ligar && !extra.innerHTML) extra.innerHTML = htmlFormPerfil('cad');
    extra.style.display = ligar ? 'block' : 'none';
    btnEntrar.style.display = ligar ? 'none' : 'block';
    document.getElementById('btnEsqueciSenha').style.display = ligar ? 'none' : 'block';
    document.getElementById('btnVoltarLogin').style.display = ligar ? 'block' : 'none';
    btnCadastrar.innerText = ligar ? "Criar minha conta" : "Criar conta";
    btnCadastrar.classList.toggle('btn-login', ligar);
    btnCadastrar.classList.toggle('btn-register', !ligar);
    senhaInput.setAttribute('autocomplete', ligar ? 'new-password' : 'current-password');
    msgErro.innerText = "";
    btnReenviar.style.display = "none";
}
document.getElementById('btnVoltarLogin').addEventListener('click', () => trocarModoCadastro(false));

btnCadastrar.addEventListener('click', () => {
    btnReenviar.style.display = "none";
    if (!modoCadastro) { trocarModoCadastro(true); document.getElementById('cadNome')?.focus(); return; }
    let lido = lerFormPerfil('cad');
    if (lido.erro) {
        msgErro.style.color = "#dc2626";
        msgErro.innerText = lido.erro;
        document.getElementById('cad' + lido.campo)?.focus();
        return;
    }
    let email = emailInput.value.trim(), senha = senhaInput.value;
    msgErro.style.color = "#0f172a";
    msgErro.innerText = "Criando conta e validando acesso...";
    createUserWithEmailAndPassword(auth, email, senha)
        .then(async (cred) => {
            try {
                await setDoc(doc(db, COLECAO_USUARIOS, cred.user.uid), {
                    email: cred.user.email, perfil: lido.perfil,
                    cadastroEm: cred.user.metadata?.creationTime || new Date().toUTCString()
                }, { merge: true });
            } catch (e) { console.warn("Perfil não gravado no cadastro:", e.code || e.message); }
            await sendEmailVerification(cred.user);
            await signOut(auth);
            trocarModoCadastro(false);
            emailInput.value = email;
            msgErro.style.color = "#16a34a";
            msgErro.innerText = "Conta criada! Enviamos um e-mail de confirmação — verifique sua caixa de entrada antes de entrar.";
        })
        .catch((error) => {
            msgErro.style.color = "#dc2626";
            if(error.code === 'auth/email-already-in-use') {
                msgErro.innerText = "Este e-mail já está em uso.";
            } else if(error.code === 'auth/weak-password') {
                msgErro.innerText = "A senha deve ter pelo menos 6 caracteres.";
            } else {
               msgErro.innerText = mensagemDeErro(error);
            }
        });
});

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

btnEntrar.addEventListener('click', () => {
    marcarAtividade();
    btnReenviar.style.display = "none";
    msgErro.style.color = "#0f172a";
    msgErro.innerText = "Verificando credenciais...";
    signInWithEmailAndPassword(auth, emailInput.value, senhaInput.value)
        .then(async (cred) => {
            if (!cred.user.emailVerified) {
                // Conta existe e a senha está certa, só falta confirmar o e-mail.
                // Isso acontece com contas criadas ANTES da checagem de e-mail
                // existir (nenhum e-mail chegou a ser enviado na época).
                msgErro.style.color = "#dc2626";
                msgErro.innerText = "Confirme seu e-mail antes de entrar. Se nunca recebeu o e-mail, toque no botão abaixo para reenviar.";
                btnReenviar.style.display = "block";
                await signOut(auth);
            }
        })
        .catch((error) => {
            msgErro.style.color = "#dc2626";
            msgErro.innerText = mensagemDeErro(error);
        });
});

btnReenviar.addEventListener('click', () => {
    msgErro.style.color = "#0f172a";
    msgErro.innerText = "Reenviando e-mail de confirmação...";
    signInWithEmailAndPassword(auth, emailInput.value, senhaInput.value)
        .then(async (cred) => {
            await sendEmailVerification(cred.user);
            await signOut(auth);
            msgErro.style.color = "#16a34a";
            msgErro.innerText = "E-mail reenviado! Confira sua caixa de entrada (e o spam) nos próximos minutos.";
            btnReenviar.style.display = "none";
        })
        .catch((error) => {
            msgErro.style.color = "#dc2626";
            msgErro.innerText = mensagemDeErro(error);
        });
});

// "Esqueci minha senha": o Firebase envia um link para a pessoa criar uma senha nova.
document.getElementById('btnEsqueciSenha').addEventListener('click', () => {
    btnReenviar.style.display = "none";
    let email = emailInput.value.trim();
    if (!email) {
        msgErro.style.color = "#dc2626";
        msgErro.innerText = "Digite seu e-mail no campo acima e toque de novo em \"Esqueci minha senha\".";
        emailInput.focus();
        return;
    }
    msgErro.style.color = "#0f172a";
    msgErro.innerText = "Enviando o link para criar uma nova senha...";
    sendPasswordResetEmail(auth, email)
        .then(() => {
            msgErro.style.color = "#16a34a";
            msgErro.innerText = "Se existir conta com esse e-mail, enviamos um link para criar uma nova senha. Confira a caixa de entrada e o spam.";
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
// Computador (muitas vezes compartilhado no hospital): 1 h. Celular (pessoal, com bloqueio de tela): 6 h.
// A última atividade fica no aparelho (localStorage) e vale para todas as abas abertas.
const LIMITE_INATIVIDADE_COMPUTADOR_H = 1;
const LIMITE_INATIVIDADE_CELULAR_H = 6;
const CHAVE_ATIVIDADE = 'jrmed_ultimaAtividade';
const EH_CELULAR = window.matchMedia('(pointer: coarse)').matches;
const LIMITE_HORAS = EH_CELULAR ? LIMITE_INATIVIDADE_CELULAR_H : LIMITE_INATIVIDADE_COMPUTADOR_H;
const LIMITE_MS = LIMITE_HORAS * 3600 * 1000;
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
    if (!auth.currentUser) return false;
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
if (infoSessao) infoSessao.innerText = `Por segurança, a sessão se encerra após ${LIMITE_HORAS} h sem uso neste ${EH_CELULAR ? 'celular' : 'computador'}.`;

btnSair.addEventListener('click', () => {
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
    caixa.innerHTML = `<div class="usu-resumo"><strong>${usuariosCarregados.length}</strong> usuário(s) no total · ${recentes} acessaram nos últimos 7 dias</div>` +
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
            return { email: x.email, perfil: x.perfil || null, cadastro: x.cadastroEm ? new Date(x.cadastroEm) : null, ultimo: x.ultimoAcesso?.toDate ? x.ultimoAcesso.toDate() : null, acessos: x.acessos, versao: x.versao };
        });
        window.renderizarUsuarios();
    } catch (e) {
        let semPermissao = (e.code || "").includes("permission");
        caixa.innerHTML = semPermissao
            ? '<div class="usu-erro"><strong>Falta liberar a coleção "usuarios" no Firebase.</strong> No console do Firebase → Firestore Database → Regras, acrescente o bloco de regras que o Claude enviou e clique em Publicar.</div>'
            : `<div class="usu-erro">Não foi possível carregar: ${e.message}</div>`;
    }
};

const telaPerfil = document.getElementById('tela-perfil');

function mostrarApp(user, perfil) {
    telaLogin.style.display = "none";
    telaPerfil.style.display = "none";
    appPrincipal.style.display = "block";
    let tag = document.getElementById('userEmailTag');
    let ehAdmin = EMAILS_ADMIN.includes(user.email);
    window.usuarioEhAdmin = ehAdmin;
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
            mostrarApp(user, lido.perfil);
        } catch (e) {
            erroEl.style.color = "#dc2626";
            erroEl.innerText = "Não foi possível salvar (" + (e.code || e.message) + "). Verifique a internet e tente de novo.";
        }
    };
}
document.getElementById('btnSairPerfil').addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, async (user) => {
    if (user && user.emailVerified) {
        if (conferirInatividade()) return;
        if (!lerAtividade()) marcarAtividade();
        let ehAdmin = EMAILS_ADMIN.includes(user.email);
        registrarAcesso(user);
        // Versão de teste (/teste/): só administradores entram.
        if (MODO_TESTE && !ehAdmin) { telaLogin.style.display = "none"; appPrincipal.style.display = "block"; mostrarBloqueioTeste(user.email); return; }
        let perfil = null, lido = false;
        try {
            let snap = await getDoc(doc(db, COLECAO_USUARIOS, user.uid));
            perfil = snap.exists() ? (snap.data().perfil || null) : null;
            lido = true;
        } catch (e) {
            // Sem permissão de leitura (regra antiga) ou sem internet: não trava o acesso.
            console.warn("Perfil não lido:", e.code || e.message);
        }
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
        pararListenerMedicamentos();
        pararListenerCategorias();
        pararListenerFichas();
        if (window.atualizarMedicamentosCustomizados) window.atualizarMedicamentosCustomizados([]);
        if (window.atualizarCategoriasCustomizadas) window.atualizarCategoriasCustomizadas([]);
        if (window.atualizarFichasMedicamentos) window.atualizarFichasMedicamentos([]);
    }
});
