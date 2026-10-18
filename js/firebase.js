// Login (Firebase Auth) e sincronização da equipe (Firestore). Carregado como módulo.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged, signOut, sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {
    getFirestore, collection, addDoc, updateDoc, deleteDoc, setDoc, doc, onSnapshot, serverTimestamp, query, orderBy, getDocs, increment
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

btnCadastrar.addEventListener('click', () => {
    btnReenviar.style.display = "none";
    msgErro.style.color = "#0f172a";
    msgErro.innerText = "Criando conta e validando acesso...";
    createUserWithEmailAndPassword(auth, emailInput.value, senhaInput.value)
        .then(async (cred) => {
            await sendEmailVerification(cred.user);
            await signOut(auth);
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

btnSair.addEventListener('click', () => {
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
    let lista = usuariosCarregados.filter(u => (u.email || "").toLowerCase().includes(termo));
    let seteDias = Date.now() - 7 * 864e5;
    let recentes = usuariosCarregados.filter(u => u.ultimo && u.ultimo.getTime() >= seteDias).length;
    let esc = t => String(t).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
    caixa.innerHTML = `<div class="usu-resumo"><strong>${usuariosCarregados.length}</strong> usuário(s) · <strong>${recentes}</strong> entraram nos últimos 7 dias</div>` +
        (lista.length ? lista.map(u => `<div class="usu-item">
            <div class="usu-avatar">${esc((u.email || "?").charAt(0).toUpperCase())}</div>
            <div class="usu-dados">
                <div class="usu-email">${esc(u.email || "(sem e-mail)")}${EMAILS_ADMIN.includes(u.email) ? ' <span class="usu-tag">admin</span>' : ''}</div>
                <div class="usu-info">Cadastro: ${dataBR(u.cadastro)} · Último acesso: ${dataBR(u.ultimo, true)}${u.versao === 'teste' ? ' (teste)' : ''} · ${u.acessos || 1} acesso(s)</div>
            </div>
        </div>`).join('') : '<p class="form-hint">Nenhum usuário encontrado.</p>');
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
            return { email: x.email, cadastro: x.cadastroEm ? new Date(x.cadastroEm) : null, ultimo: x.ultimoAcesso?.toDate ? x.ultimoAcesso.toDate() : null, acessos: x.acessos, versao: x.versao };
        });
        window.renderizarUsuarios();
    } catch (e) {
        let semPermissao = (e.code || "").includes("permission");
        caixa.innerHTML = semPermissao
            ? '<div class="usu-erro"><strong>Falta liberar a coleção "usuarios" no Firebase.</strong> No console do Firebase → Firestore Database → Regras, acrescente o bloco de regras que o Claude enviou e clique em Publicar.</div>'
            : `<div class="usu-erro">Não foi possível carregar: ${e.message}</div>`;
    }
};

onAuthStateChanged(auth, (user) => {
    if (user && user.emailVerified) {
        telaLogin.style.display = "none";
        appPrincipal.style.display = "block";
        let tag = document.getElementById('userEmailTag');
        let ehAdmin = EMAILS_ADMIN.includes(user.email);
        registrarAcesso(user);
        // Versão de teste (/teste/): só administradores entram.
        if (MODO_TESTE && !ehAdmin) { mostrarBloqueioTeste(user.email); return; }
        window.usuarioEhAdmin = ehAdmin;
        if (tag) tag.innerText = user.email + (ehAdmin ? " (admin)" : "");
        let btnAdd = document.getElementById('btnAddMed');
        if (btnAdd) btnAdd.style.display = ehAdmin ? "inline-flex" : "none";
        let btnCat = document.getElementById('btnCategorias');
        if (btnCat) btnCat.style.display = ehAdmin ? "inline-flex" : "none";
        let btnUsu = document.getElementById('btnUsuarios');
        if (btnUsu) btnUsu.style.display = ehAdmin ? "inline-flex" : "none";
        let secEquipe = document.getElementById('cfgEquipe');
        if (secEquipe) secEquipe.style.display = ehAdmin ? "block" : "none";
        let avatar = document.getElementById('configAvatar');
        if (avatar && user.email) avatar.innerText = user.email.charAt(0).toUpperCase();
        iniciarListenerMedicamentos();
        iniciarListenerCategorias();
        iniciarListenerFichas();
        if (window.atualizarVisibilidadeAdmin) window.atualizarVisibilidadeAdmin();
    } else {
        telaLogin.style.display = "flex";
        appPrincipal.style.display = "none";
        emailInput.value = "";
        senhaInput.value = "";
        window.usuarioEhAdmin = false;
        pararListenerMedicamentos();
        pararListenerCategorias();
        pararListenerFichas();
        if (window.atualizarMedicamentosCustomizados) window.atualizarMedicamentosCustomizados([]);
        if (window.atualizarCategoriasCustomizadas) window.atualizarCategoriasCustomizadas([]);
        if (window.atualizarFichasMedicamentos) window.atualizarFichasMedicamentos([]);
    }
});
