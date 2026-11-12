// =====================================================
// 🏠 TELA INICIAL (depois do login): Pediatria | Adulto, prescrições prontas e recentes.
// Estilo "Apple" (css/inicio.css). Pedido do Dr. Jonas (11/2026): o JR MED vai virar um sistema de
// prescrição médica geral; a pediatria é o que já existe, o adulto vem depois ("Em breve").
// Só no teste por enquanto (INICIO_LIBERADO). Sem a tela, tudo fica exatamente como antes.
// Carregado por último (depois de app.js, atalhos.js e condutas): usa trocarModo, irParaCategoria,
// abrirAtalhos, atalhosMeus, condutasJR, farmaciaJR.
// =====================================================
const INICIO_LIBERADO = false; /* trocar para true quando o Dr. Jonas liberar para todos */
const INICIO_CHAVE_RECENTES = "jrmed_recentes";
const INICIO_MAX_RECENTES = 6;

function inicioAtivo() {
    return (INICIO_LIBERADO || (typeof MODO_TESTE !== "undefined" && MODO_TESTE)) && !!document.getElementById("tela-inicio");
}

// Ícones de traço fino (SVG), no lugar dos emojis.
const INICIO_ICONES = {
    casa: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h5v-6h4v6h5V9.5"/>',
    pilula: '<rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="m8.5 8.5 7 7"/>',
    livro: '<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/>',
    raio: '<path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12z"/>',
    prancheta: '<rect x="5" y="4" width="14" height="17" rx="2.5"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>',
    crianca: '<circle cx="12" cy="7" r="3.2"/><path d="M6.5 21v-3.5a5.5 5.5 0 0 1 11 0V21"/>',
    adulto: '<circle cx="12" cy="6.5" r="3.5"/><path d="M5 21v-4a7 7 0 0 1 14 0v4"/>',
    pulso: '<path d="M2.5 12h4l2.5-6 4 12 2.5-6h6"/>',
    lupa: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>',
    seta: '<path d="m9 5 7 7-7 7"/>',
    receita: '<path d="M6 2.5h9l3.5 3.5v15.5H6z"/><path d="M9 9h6M9 13h6M9 17h4"/>',
    lista: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>'
};
function inIcone(nome) { return `<svg class="in-i" viewBox="0 0 24 24" aria-hidden="true">${INICIO_ICONES[nome] || ""}</svg>`; }
function inQuad(nome, cor, grande) { return `<div class="in-q${grande ? " grande" : ""}" style="background:${cor}">${inIcone(nome)}</div>`; }

// Itens da Pediatria (o que já existe) e do Adulto (em breve).
const INICIO_PEDIATRIA = [
    { d: "prescricao", ic: "pilula", cor: "var(--in-ped)", t: "Prescrição", s: "Remédios por sistema e por doença" },
    { d: "condutas", ic: "livro", cor: "var(--in-cond)", t: "Condutas", s: "Passo a passo, escores e critérios" },
    { d: "emergencia", ic: "pulso", cor: "var(--in-emer)", t: "Emergência", s: "PALS, sequência rápida de intubação" },
    { d: "exame", ic: "prancheta", cor: "var(--in-exa)", t: "Exame físico e orientações", s: "Modelos e sinais de alarme" },
    { d: "atalhos", ic: "raio", cor: "var(--in-ata)", t: "Atalhos", s: "Janela por cima do prontuário · Ctrl+V", so: "atalhos" }
];
const INICIO_ADULTO = [
    { ic: "pilula", t: "Prescrição", s: "Doses padrão do adulto" },
    { ic: "livro", t: "Condutas", s: "Emergência e enfermaria" },
    { ic: "pulso", t: "Emergência", s: "ACLS, sequência rápida" },
    { ic: "prancheta", t: "Exame físico e orientações", s: "Modelos do adulto" }
];

function inicioTemAtalhos() {
    return typeof atalhosDisponivel === "function" && atalhosDisponivel() && !(typeof ehCelular === "function" && ehCelular());
}

// ===== Recentes (só neste aparelho): cards postos na receita e condutas abertas =====
function lerRecentes() {
    try { return JSON.parse(localStorage.getItem(INICIO_CHAVE_RECENTES) || "[]").filter(r => r && r.id && r.tipo); } catch (e) { return []; }
}
function registrarRecente(tipo, id) {
    try {
        let lista = lerRecentes().filter(r => !(r.tipo === tipo && r.id === id));
        lista.unshift({ tipo, id, q: Date.now() });
        localStorage.setItem(INICIO_CHAVE_RECENTES, JSON.stringify(lista.slice(0, 20)));
    } catch (e) { }
}
function quandoRecente(ms) {
    let d = new Date(ms), hoje = new Date();
    let mesmoDia = (a, b) => a.toDateString() === b.toDateString();
    if (mesmoDia(d, hoje)) return "Hoje";
    let ontem = new Date(hoje); ontem.setDate(hoje.getDate() - 1);
    if (mesmoDia(d, ontem)) return "Ontem";
    return d.toLocaleDateString("pt-BR", { day: "numeric", month: "short" }).replace(".", "");
}
// Anota os recentes sem mexer em app.js/condutas.js: embrulha as funções globais.
function instalarRecentes() {
    if (typeof adicionarAoCarrinho === "function" && !adicionarAoCarrinho._inicio) {
        let original = adicionarAoCarrinho;
        window.adicionarAoCarrinho = function (instanceId, btnId) {
            let r = original.apply(this, arguments);
            try {
                let inst = (instanciasRenderizadas || []).find(i => i.instanceId === instanceId);
                let id = inst && (inst.grupo ? inst.escolha : inst.medKey);
                if (id && buscarMed(id)) registrarRecente("card", id);
            } catch (e) { }
            return r;
        };
        window.adicionarAoCarrinho._inicio = true;
    }
    if (typeof abrirConduta === "function" && !abrirConduta._inicio) {
        let original = abrirConduta;
        window.abrirConduta = function (id) {
            let r = original.apply(this, arguments);
            try { if (typeof condutasJR !== "undefined" && condutasJR[id]) registrarRecente("cond", id); } catch (e) { }
            return r;
        };
        window.abrirConduta._inicio = true;
    }
}

// ===== Montagem da tela =====
function htmlInicio() {
    let e = escaparHtml;
    let u = window.__usuarioAtual || {}, p = window.__perfilAtual || {};
    let nome = (p.nome || u.nome || "").trim();
    let primeiro = nome ? nome.split(/\s+/)[0] : "";
    let titulo = primeiro ? "Olá, " + primeiro : "Início";
    let atividade = { medico: "Médico(a)", enfermeiro: "Enfermeiro(a)", farmaceutico: "Farmacêutico(a)", academico: "Acadêmico(a)" }[p.atividade] || "";
    let papel = [atividade, window.usuarioEhAdmin ? "Administrador" : ""].filter(Boolean).join(" · ");
    let data = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
    data = data.charAt(0).toUpperCase() + data.slice(1);
    let teste = typeof MODO_TESTE !== "undefined" && MODO_TESTE;

    let ped = INICIO_PEDIATRIA.filter(i => i.so !== "atalhos" || inicioTemAtalhos());
    let linhasPed = ped.map(i => `<button type="button" class="in-row" data-ir="${i.d}">${inQuad(i.ic, i.cor)}<div class="in-tx">${e(i.t)}<small>${e(i.s)}</small></div><span class="in-d">${inIcone("seta")}</span></button>`).join("");
    let linhasAdu = INICIO_ADULTO.map(i => `<div class="in-row">${inQuad(i.ic, "var(--in-adu)")}<div class="in-tx">${e(i.t)}<small>${e(i.s)}</small></div></div>`).join("");

    let menuPed = ped.map(i => `<button type="button" class="in-it" data-ir="${i.d}">${inIcone(i.ic)}${e(i.t)}</button>`).join("");
    let menuAdu = INICIO_ADULTO.slice(0, 3).map(i => `<div class="in-it off">${inIcone(i.ic)}${e(i.t)}<span class="in-mt">Em breve</span></div>`).join("");

    return `
  <header class="in-topo-cel">
    <div class="in-logo-cel"><div class="in-lg">JR</div><div><b>JR MED</b><small>Prescrição médica</small></div></div>
    ${teste ? '<span class="in-teste">TESTE</span>' : ""}
  </header>
<aside>
  <div class="in-marca"><div class="in-lg">JR</div>JR MED${teste ? ' <span class="in-teste">TESTE</span>' : ""}</div>
  <label class="in-busca">${inIcone("lupa")}<input id="inicioBuscaLado" placeholder="Buscar" autocomplete="off"></label>
  <button type="button" class="in-it on">${inIcone("casa")}Início</button>
  <div class="in-grp">Pediatria</div>${menuPed}
  <div class="in-grp">Adulto</div>${menuAdu}
  <div class="in-esp"></div>
  <div class="in-user"><div class="in-av">${e((primeiro || u.email || "?").charAt(0).toUpperCase())}</div><div><span class="in-nome">${e(nome || u.email || "")}</span><small>${e(papel || u.email || "")}</small></div><button type="button" class="in-sair" data-ir="sair">Sair</button></div>
</aside>
<main>
  <div class="in-data">${e(data)}</div>
  <h1>${e(titulo)}</h1>
  <label class="in-busca">${inIcone("lupa")}<input id="inicioBusca" placeholder="Buscar remédio, doença ou conduta" autocomplete="off"></label>
  <div class="in-areas">
    <section class="in-area">
      <div class="in-acab">${inQuad("crianca", "linear-gradient(160deg,#3a9bff,#0a6cff)", true)}<div><h3>Pediatria</h3><p>Recém-nascido a adolescente · doses por peso e idade</p></div></div>
      <div class="in-lista">${linhasPed}</div>
    </section>
    <section class="in-area off">
      <div class="in-acab">${inQuad("adulto", "linear-gradient(160deg,#4cc3b3,#1f8f81)", true)}<div><h3>Adulto</h3><p>Clínica médica e emergência do adulto</p></div><span class="in-breve">Em breve</span></div>
      <div class="in-lista">${linhasAdu}</div>
    </section>
  </div>
  <div class="in-duas">
    <div id="inicioKits"></div>
    <div id="inicioRecentes"></div>
  </div>
</main>
<nav class="in-tab" aria-label="Início">
  <button type="button" class="on">${inIcone("casa")}Início</button>
  <button type="button" data-ir="prescricao">${inIcone("crianca")}Pediatria</button>
  <button type="button" disabled style="opacity:.45">${inIcone("adulto")}Adulto</button>
  ${inicioTemAtalhos() ? `<button type="button" data-ir="atalhos">${inIcone("raio")}Atalhos</button>` : ""}
  <button type="button" data-ir="menu">${inIcone("lista")}Menu</button>
</nav>`;
}

function inicioKitsHtml() {
    let caixa = document.getElementById("inicioKits"); if (!caixa) return;
    if (!inicioTemAtalhos()) { caixa.innerHTML = ""; return; }
    let kits = (typeof atalhosMeus !== "undefined" ? atalhosMeus : []).filter(a => a.tipo === "kit");
    let linhas = kits.length ? kits.map((k, i) =>
        `<button type="button" class="in-row" data-kit="${i}">${inQuad("receita", "var(--in-ata)")}<span class="in-nome">${escaparHtml(k.nome)}</span><span class="in-d">${k.ids.length} ${k.ids.length === 1 ? "item" : "itens"}${inIcone("seta")}</span></button>`).join("")
        : `<div class="in-vazio">Nenhuma ainda. Em ⚡ Atalhos → "+ Adicionar atalho" → "Prescrição pronta".</div>`;
    caixa.innerHTML = `<h2>Prescrições prontas <span class="in-peq">Pediatria</span><button type="button" class="in-ver" data-ir="atalhos">Abrir atalhos</button></h2><div class="in-lista">${linhas}</div>`;
}

function inicioRecentesHtml() {
    let caixa = document.getElementById("inicioRecentes"); if (!caixa) return;
    let rec = lerRecentes().map(r => {
        if (r.tipo === "card") { let m = buscarMed(r.id); return m ? { ...r, nome: m.nome, ic: "pilula", cor: "var(--in-ped)" } : null; }
        if (r.tipo === "cond") { let c = typeof condutasJR !== "undefined" && condutasJR[r.id]; return c ? { ...r, nome: c.nome, ic: "livro", cor: "var(--in-cond)" } : null; }
        return null;
    }).filter(Boolean).slice(0, INICIO_MAX_RECENTES);
    let linhas = rec.length ? rec.map((r, i) =>
        `<button type="button" class="in-row" data-rec="${i}">${inQuad(r.ic, r.cor)}<span class="in-nome">${escaparHtml(r.nome)}</span><span class="in-d">Pediatria · ${quandoRecente(r.q)}</span></button>`).join("")
        : `<div class="in-vazio">Os remédios que você põe na receita e as condutas que abre aparecem aqui.</div>`;
    caixa.innerHTML = `<h2>Recentes</h2><div class="in-lista">${linhas}</div>`;
    caixa._rec = rec;
}

let inicioMontada = false;
function montarInicio() {
    let tela = document.getElementById("tela-inicio"); if (!tela) return;
    tela.innerHTML = htmlInicio();
    inicioKitsHtml(); inicioRecentesHtml();
    if (typeof carregarAtalhosMeus === "function") carregarAtalhosMeus().then(inicioKitsHtml).catch(() => { });
    if (!inicioMontada) {
        inicioMontada = true;
        tela.addEventListener("click", (ev) => {
            let b = ev.target.closest("[data-ir],[data-kit],[data-rec]"); if (!b) return;
            if (b.dataset.ir) { irDoInicio(b.dataset.ir); return; }
            if (b.dataset.kit !== undefined) { irDoInicio("atalhos"); return; }
            if (b.dataset.rec !== undefined) {
                let r = (document.getElementById("inicioRecentes")._rec || [])[+b.dataset.rec]; if (!r) return;
                if (r.tipo === "cond") { irDoInicio("condutas"); abrirConduta(r.id); }
                else irDoInicio("prescricao", r.nome);
            }
        });
        tela.addEventListener("keydown", (ev) => {
            if (ev.key !== "Enter" || !ev.target.matches("#inicioBusca, #inicioBuscaLado")) return;
            let q = ev.target.value.trim(); if (!q) return;
            ev.preventDefault();
            irDoInicio("prescricao", q);
        });
    }
}

// ===== Trocar entre a tela inicial e o app =====
function mostrarInicio(semHistorico) {
    if (!inicioAtivo()) return;
    montarInicio();
    document.getElementById("aplicativo-principal").style.display = "none";
    document.getElementById("tela-inicio").style.display = "flex";
    document.body.classList.add("na-tela-inicio");
    if (typeof fecharConfig === "function") fecharConfig();
    if (!semHistorico) { try { if (!(history.state && history.state.modo === "inicio")) history.pushState({ modo: "inicio" }, "", location.href); } catch (e) { } }
    window.scrollTo(0, 0);
}
function mostrarAppDoInicio() {
    document.getElementById("tela-inicio").style.display = "none";
    document.getElementById("aplicativo-principal").style.display = "block";
    document.body.classList.remove("na-tela-inicio");
    if (typeof atualizarAlturaTopo === "function") atualizarAlturaTopo();
}
function irDoInicio(destino, busca) {
    if (destino === "sair") { if (window.sairDaConta) sairDaConta(); return; }
    mostrarAppDoInicio();
    try { if (history.state && history.state.modo === "inicio") history.pushState({ modo: "prescricao" }, "", location.href); } catch (e) { }
    let campo = document.getElementById("searchInput");
    if (destino === "condutas") {
        if (campo) { campo.value = ""; }
        if (typeof irParaModo === "function") irParaModo("condutas");
        return;
    }
    if (typeof trocarModo === "function" && document.getElementById("area-condutas")) trocarModo("prescricao");
    if (campo) { campo.value = busca || ""; if (typeof filtrarMedicas === "function") filtrarMedicas(); }
    if (destino === "emergencia") irParaCategoria("cat-pals");
    else if (destino === "exame") irParaCategoria("cat-exame-fisico");
    else if (destino === "atalhos") { if (typeof abrirAtalhos === "function") abrirAtalhos(); }
    else if (destino === "menu") { if (typeof abrirConfig === "function") abrirConfig(); }
    else window.scrollTo(0, 0);
}

// Botão "voltar" do navegador/celular: volta para a tela inicial quando ela foi o passo anterior.
window.addEventListener("popstate", (ev) => {
    if (!inicioAtivo()) return;
    if (ev.state && ev.state.modo === "inicio") mostrarInicio(true);
    else if (document.getElementById("tela-inicio").style.display === "flex") mostrarAppDoInicio();
});

// Botões para voltar ao início: "‹ Início" no cabeçalho (computador), aba na barra do celular e item no Menu.
function instalarBotoesInicio() {
    if (!inicioAtivo()) return;
    let left = document.querySelector("#aplicativo-principal .header-left");
    if (left && !document.getElementById("btnInicioTopo")) {
        let b = document.createElement("button");
        b.type = "button"; b.id = "btnInicioTopo"; b.className = "btn-inicio"; b.title = "Voltar à tela inicial";
        b.innerHTML = '<svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg>Início';
        b.addEventListener("click", () => mostrarInicio());
        left.insertBefore(b, left.firstChild);
    }
    let barra = document.getElementById("barraAbas");
    if (barra && !document.getElementById("tabInicio")) {
        let b = document.createElement("button");
        b.type = "button"; b.id = "tabInicio"; b.className = "tab-b";
        b.innerHTML = "<span>🏠</span>Início";
        b.addEventListener("click", () => mostrarInicio());
        barra.insertBefore(b, barra.firstChild);
    }
    let drawer = document.querySelector("#painelConfig .config-conta");
    if (drawer && !document.getElementById("btnInicioCfg")) {
        let sec = document.createElement("div");
        sec.className = "config-secao";
        sec.innerHTML = '<button type="button" id="btnInicioCfg" class="config-acao" title="Voltar à tela inicial"><span>🏠</span> Tela inicial</button>';
        drawer.parentNode.insertBefore(sec, drawer.nextSibling);
        sec.querySelector("button").addEventListener("click", () => mostrarInicio());
    }
}

// Chamado pelo login (js/firebase.js → mostrarApp) e pela saída da conta.
window.aoEntrarNoApp = function () {
    if (!inicioAtivo()) return;
    instalarRecentes(); instalarBotoesInicio();
    mostrarInicio(true);
    try { history.replaceState({ modo: "inicio" }, "", location.href); } catch (e) { }
};
window.aoSairDoApp = function () {
    let tela = document.getElementById("tela-inicio");
    if (tela) tela.style.display = "none";
    document.body.classList.remove("na-tela-inicio");
};
if (typeof document !== "undefined") {
    let iniciar = () => { if (inicioAtivo()) { instalarRecentes(); instalarBotoesInicio(); } };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
}
