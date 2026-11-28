// =====================================================
// 💉 CALENDÁRIO VACINAL (pedido do Dr. Jonas, 11/2026): digita a idade, aparecem MARCADAS as vacinas que a criança
// já deveria ter recebido (calendário SBP 2026/2027). O médico desmarca a que falta e o texto de orientação
// ("procurar a sala de vacina") se monta sozinho, para copiar na receita. Nada é salvo.
// Tela inicial → Pediatria → "Calendário vacinal". Página própria como a de Procedimentos (procModoPagina).
// Idade da página escreve em #idadeInput/#idadeUnidade (os mesmos da Prescrição).
// Só no teste até o Dr. Jonas conferir (VACINAS_LIBERADO). Carregado depois de js/sala-vermelha.js.
// =====================================================
const VACINAS_LIBERADO = false;

function vacinasAtivo() {
    return VACINAS_LIBERADO || (typeof MODO_TESTE !== "undefined" && MODO_TESTE);
}

/* Calendário SBP 2026/2027. m = idade (meses) a partir da qual a dose já é devida; ate = idade (meses) depois da qual o item
   some (não se aplica mais); opcional = bolinha vazia (○) na tabela da SBP. */
const VACINAS_SBP = [
    { m: 0, idade: "Ao nascer", doses: [
        { id: "bcg", nome: "BCG ID" },
        { id: "hepb_0", nome: "Hepatite B", dose: "1ª dose" },
        { id: "vsr", nome: "Anticorpo monoclonal contra VSR", dose: "dose única no 1º ano de vida, o mais cedo possível", ate: 24 }
    ]},
    { m: 2, idade: "2 meses", doses: [
        { id: "hepb_2", nome: "Hepatite B", dose: "2ª dose" },
        { id: "rota_2", nome: "Rotavírus", dose: "1ª dose", ate: 8 },
        { id: "dtp_2", nome: "DTP/DTPa", dose: "1ª dose" },
        { id: "hib_2", nome: "Hib", dose: "1ª dose" },
        { id: "vip_2", nome: "VIP (poliomielite inativada)", dose: "1ª dose" },
        { id: "pneumo_2", nome: "Pneumocócica conjugada", dose: "1ª dose" }
    ]},
    { m: 3, idade: "3 meses", doses: [
        { id: "menc_3", nome: "Meningocócica conjugada C ou ACWY", dose: "1ª dose" },
        { id: "menb_3", nome: "Meningocócica B recombinante", dose: "1ª dose" }
    ]},
    { m: 4, idade: "4 meses", doses: [
        { id: "hepb_4", nome: "Hepatite B", dose: "dose dos 4 meses", opcional: true },
        { id: "rota_4", nome: "Rotavírus", dose: "2ª dose", ate: 8 },
        { id: "dtp_4", nome: "DTP/DTPa", dose: "2ª dose" },
        { id: "hib_4", nome: "Hib", dose: "2ª dose" },
        { id: "vip_4", nome: "VIP (poliomielite inativada)", dose: "2ª dose" },
        { id: "pneumo_4", nome: "Pneumocócica conjugada", dose: "2ª dose" }
    ]},
    { m: 5, idade: "5 meses", doses: [
        { id: "menc_5", nome: "Meningocócica conjugada C ou ACWY", dose: "2ª dose" },
        { id: "menb_5", nome: "Meningocócica B recombinante", dose: "2ª dose" }
    ]},
    { m: 6, idade: "6 meses", doses: [
        { id: "hepb_6", nome: "Hepatite B", dose: "dose dos 6 meses" },
        { id: "rota_6", nome: "Rotavírus", dose: "3ª dose", opcional: true, ate: 8 },
        { id: "dtp_6", nome: "DTP/DTPa", dose: "3ª dose" },
        { id: "hib_6", nome: "Hib", dose: "3ª dose" },
        { id: "vip_6", nome: "VIP (poliomielite inativada)", dose: "3ª dose" },
        { id: "pneumo_6", nome: "Pneumocócica conjugada", dose: "3ª dose" },
        { id: "influenza", nome: "Influenza", dose: "a partir dos 6 meses, todo ano" },
        { id: "covid", nome: "COVID-19", dose: "segundo as recomendações vigentes" }
    ]},
    { m: 9, idade: "9 meses", doses: [
        { id: "fa_9", nome: "Febre amarela", dose: "1ª dose, a partir de 9 meses" }
    ]},
    { m: 12, idade: "12 meses", doses: [
        { id: "pneumo_12", nome: "Pneumocócica conjugada", dose: "reforço" },
        { id: "menc_12", nome: "Meningocócica conjugada C ou ACWY", dose: "reforço" },
        { id: "menb_12", nome: "Meningocócica B recombinante", dose: "reforço" },
        { id: "scr_12", nome: "SCR / Varicela / SCRV", dose: "1ª dose" },
        { id: "hepa_12", nome: "Hepatite A", dose: "1ª dose" }
    ]},
    { m: 15, idade: "15 meses", doses: [
        { id: "dtp_15", nome: "DTP/DTPa", dose: "1º reforço" },
        { id: "hib_15", nome: "Hib", dose: "reforço" },
        { id: "vip_15", nome: "VIP (poliomielite inativada)", dose: "1º reforço" },
        { id: "scr_15", nome: "SCR / Varicela / SCRV", dose: "2ª dose" }
    ]},
    { m: 18, idade: "18 meses", doses: [
        { id: "hepa_18", nome: "Hepatite A", dose: "2ª dose" }
    ]},
    { m: 48, idade: "4 a 6 anos", doses: [
        { id: "dtp_4a", nome: "DTP/DTPa", dose: "2º reforço" },
        { id: "vip_4a", nome: "VIP (poliomielite inativada)", dose: "2º reforço" },
        { id: "menc_4a", nome: "Meningocócica conjugada ACWY", dose: "reforço" },
        { id: "fa_4a", nome: "Febre amarela", dose: "2ª dose, aos 4 anos" },
        { id: "dengue", nome: "Dengue", dose: "a partir dos 4 anos" }
    ]},
    { m: 108, idade: "9 anos", doses: [
        { id: "hpv", nome: "HPV", dose: "2 doses, meninos e meninas a partir dos 9 anos" }
    ]},
    { m: 132, idade: "11 a 12 anos", doses: [
        { id: "menc_11", nome: "Meningocócica conjugada ACWY", dose: "reforço" }
    ]},
    { m: 156, idade: "13 a 15 anos", doses: [
        { id: "dtpa_13", nome: "dTpa / dT", dose: "reforço" }
    ]},
    { m: 192, idade: "16 anos", doses: [
        { id: "menc_16", nome: "Meningocócica conjugada ACWY", dose: "reforço", opcional: true }
    ]}
];

const VACINAS_OBS = [
    "Hepatite B, SCR/Varicela e Hepatite A: adolescentes não vacinados devem receber as doses que faltam (hepatite B: 3 doses; SCR/varicela: 2; hepatite A: 2).",
    "Meningocócica B: adolescentes não vacinados devem receber 2 doses.",
    "Febre amarela: não vacinados devem receber 2 doses.",
    "Anticorpo contra VSR: dose adicional para situações de risco para doença grave.",
    "Rotavírus: o item some depois dos 8 meses (passou da idade máxima da vacina).",
    "○ na tabela da SBP: dose que depende da vacina usada. Aparece marcada; desmarque só se for o caso."
];

let vacDesmarcadas = new Set();
let vacEscutando = false;

function vacIdadeMeses() {
    let n = parseFloat(String((document.getElementById("vacIdade") || {}).value || "").replace(",", "."));
    if (!(n >= 0)) return NaN;
    let u = (document.getElementById("vacUnidade") || {}).value || "anos";
    return u === "meses" ? n : n * 12;
}

function abrirVacinas() {
    if (typeof mostrarInicio === "function") mostrarInicio();
    let tela = document.getElementById("tela-inicio"); if (!tela) return;
    if (!vacEscutando) { vacEscutando = true; tela.addEventListener("click", vacClique); tela.addEventListener("input", vacDigitou); tela.addEventListener("change", vacMudou); }
    vacDesmarcadas = new Set();
    vacDesenhar();
}

function vacDesenhar() {
    let main = document.querySelector("#tela-inicio main"), e = escaparHtml;
    if (!main) return;
    if (typeof procModoPagina === "function") procModoPagina();
    /* aproveita a idade do topo da Prescrição */
    let idade = (document.getElementById("idadeInput") || {}).value || "";
    let un = (document.getElementById("idadeUnidade") || {}).value || "anos";
    if (un !== "meses" && un !== "anos") { idade = ""; un = "anos"; }
    main.innerHTML = `<div class="proc-corpo vac-corpo">
        <div class="cond-inicio-linha"><button type="button" class="cond-btn-inicio" data-vac-acao="fechar" title="Voltar à tela inicial"><span aria-hidden="true">🏠</span>Início</button></div>
        <h1>Calendário vacinal</h1>
        <p class="proc-dica">Digite a idade: aparecem marcadas as vacinas que a criança já deveria ter recebido. Desmarque a que falta e a orientação para a sala de vacina se monta sozinha.</p>
        <div class="calc-paciente">
            <label>Idade<input type="number" inputmode="decimal" min="0" step="any" id="vacIdade" value="${e(idade)}" placeholder="—"></label>
            <label>Em<select id="vacUnidade"><option value="meses"${un === "meses" ? " selected" : ""}>meses</option><option value="anos"${un === "anos" ? " selected" : ""}>anos</option></select></label>
        </div>
        <div id="vacConteudo"></div>
        <details class="vac-obs"><summary>Observações da SBP</summary><ul>${VACINAS_OBS.map(o => `<li>${e(o)}</li>`).join("")}</ul></details>
        <p class="proc-aviso">Calendário de Vacinação 2026/2027 da Sociedade Brasileira de Pediatria. Confira sempre com a caderneta. Nada é salvo.</p></div>`;
    vacAtualizar();
    window.scrollTo(0, 0);
}

function vacAtualizar() {
    let caixa = document.getElementById("vacConteudo"); if (!caixa) return;
    let m = vacIdadeMeses(), e = escaparHtml;
    if (isNaN(m)) { caixa.innerHTML = `<div class="sv-vazio">Digite a <strong>idade</strong> para ver as vacinas.</div>`; return; }
    let devidos = VACINAS_SBP.filter(g => g.m <= m + 0.001)
        .map(g => Object.assign({}, g, { doses: g.doses.filter(d => !(d.ate && m >= d.ate)) }))
        .filter(g => g.doses.length);
    let proximo = VACINAS_SBP.find(g => g.m > m + 0.001);
    let html = devidos.map(g => `<section class="vac-grupo"><h2>${e(g.idade)}</h2>${g.doses.map(d => `
        <label class="vac-item${vacDesmarcadas.has(d.id) ? " falta" : ""}">
            <input type="checkbox" data-vac="${d.id}"${vacDesmarcadas.has(d.id) ? "" : " checked"}>
            <span><strong>${e(d.nome)}</strong>${d.dose ? `<small>${e(d.dose)}${d.opcional ? " · ○ depende da vacina" : ""}</small>` : ""}</span>
        </label>`).join("")}</section>`).join("");
    if (!html) html = `<div class="sv-vazio">Nenhuma vacina prevista até esta idade.</div>`;
    if (proximo) html += `<div class="vac-proximas"><strong>Próximas (${e(proximo.idade)}):</strong> ${e(proximo.doses.map(d => d.nome + (d.dose ? " (" + d.dose + ")" : "")).join("; "))}.</div>`;
    let faltam = vacFaltando();
    html += faltam.length
        ? `<div class="vac-texto-caixa"><div class="vac-texto-titulo">Orientação para a receita (${faltam.length} ${faltam.length === 1 ? "vacina" : "vacinas"} em atraso)</div>
            <div class="vac-texto" id="vacTexto">${e(vacTexto(faltam))}</div>
            <button type="button" class="proc-copiar" data-vac-acao="copiar">Copiar texto</button></div>`
        : `<div class="vac-ok">✓ Tudo marcado: nenhuma vacina em atraso. Desmarque a que a criança não tomou.</div>`;
    caixa.innerHTML = html;
}

function vacFaltando() {
    let m = vacIdadeMeses(), lista = [];
    if (isNaN(m)) return lista;
    VACINAS_SBP.forEach(g => { if (g.m <= m + 0.001) g.doses.forEach(d => { if (vacDesmarcadas.has(d.id) && !(d.ate && m >= d.ate)) lista.push({ g, d }); }); });
    return lista;
}

function vacTexto(faltam) {
    let linhas = faltam.map(({ g, d }) => `- ${d.nome}${d.dose ? " (" + d.dose + ")" : ""}`.toUpperCase());
    return `ORIENTAÇÕES (VACINAÇÃO)\n\nPROCURAR A SALA DE VACINA DA UNIDADE BÁSICA DE SAÚDE, LEVANDO A CADERNETA DE VACINAÇÃO, PARA ATUALIZAR AS VACINAS EM ATRASO:\n${linhas.join("\n")}\n\nAS VACINAS QUE NÃO ESTIVEREM DISPONÍVEIS NA REDE PÚBLICA PODEM SER FEITAS EM CLÍNICA DE VACINAÇÃO.`;
}

function vacClique(ev) {
    let b = ev.target.closest("[data-vac-acao]"); if (!b) return;
    if (b.dataset.vacAcao === "fechar") { if (typeof montarInicio === "function") montarInicio(); window.scrollTo(0, 0); return; }
    if (b.dataset.vacAcao === "copiar") {
        let t = (document.getElementById("vacTexto") || {}).textContent || "";
        let ok = () => { b.textContent = "✓ Copiado"; setTimeout(() => { b.textContent = "Copiar texto"; }, 1500); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok).catch(() => { if (typeof procCopiarAntigo === "function") procCopiarAntigo(t, ok); });
        else if (typeof procCopiarAntigo === "function") procCopiarAntigo(t, ok);
    }
}

function vacDigitou(ev) {
    if (ev.target.id !== "vacIdade") return;
    vacSincronizarIdade();
    vacAtualizar();
}

function vacMudou(ev) {
    let t = ev.target;
    if (t.id === "vacUnidade") { vacSincronizarIdade(); vacAtualizar(); return; }
    if (t.dataset && t.dataset.vac) {
        if (t.checked) vacDesmarcadas.delete(t.dataset.vac); else vacDesmarcadas.add(t.dataset.vac);
        let y = window.scrollY;
        vacAtualizar();
        window.scrollTo(0, y);
    }
}

/* escreve a idade no topo da Prescrição (mesmo paciente nas outras telas) */
function vacSincronizarIdade() {
    let v = (document.getElementById("vacIdade") || {}).value || "";
    let u = (document.getElementById("vacUnidade") || {}).value || "anos";
    let un = document.getElementById("idadeUnidade");
    if (un && un.value !== u && [...un.options].some(o => o.value === u)) { un.value = u; un.dispatchEvent(new Event("change", { bubbles: true })); }
    if (typeof calcEscrever === "function") calcEscrever("idadeInput", v);
}

// Item na tela inicial (Pediatria), logo depois de "Exame físico e orientações".
if (vacinasAtivo() && typeof INICIO_PEDIATRIA !== "undefined" && !INICIO_PEDIATRIA.some(x => x.d === "vacinas")) {
    INICIO_ICONES.seringa = '<path d="m18 2 4 4M15 5l4 4M17 7 7.5 16.5M9 9l6 6M11.5 6.5l6 6-9 9H5v-3.5l9-9M5 19l-3 3"/>';
    let ref = INICIO_PEDIATRIA.findIndex(x => x.d === "exame");
    INICIO_PEDIATRIA.splice(ref + 1, 0, { d: "vacinas", ic: "seringa", cor: "#34c759", t: "Calendário vacinal", s: "Marque o que falta e copie a orientação" });
    if (typeof irDoInicio === "function") {
        let original = window.irDoInicio;
        window.irDoInicio = function (destino) {
            if (destino === "vacinas") { abrirVacinas(); return; }
            return original.apply(this, arguments);
        };
    }
}
