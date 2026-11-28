// =====================================================
// 🧮 CALCULADORAS E ESCORES (pedido do Dr. Jonas, 11/2026): junta num lugar só os escores e as calculadoras
// que já existem nas condutas. Na tela inicial: Pediatria → "Calculadoras e escores".
// NADA É COPIADO: cada item aponta para o escore (id) ou para a ferramenta (função) da conduta; corrigiu lá,
// muda aqui. O escore é desenhado com htmlEscore() (condutas/condutas.js) com o id prefixado "calc_", para não
// misturar com o mesmo escore aberto na conduta. As ferramentas usam o peso/idade do topo da Prescrição
// (#pesoInput/#idadeInput): a página tem campos próprios que escrevem nesses mesmos campos.
// Página própria como a de Procedimentos (procModoPagina). Só no teste até o Dr. Jonas conferir (CALCULADORAS_LIBERADO).
// Carregado depois de js/procedimentos.js.
// =====================================================
const CALCULADORAS_LIBERADO = false;

function calculadorasAtivo() {
    return CALCULADORAS_LIBERADO || (typeof MODO_TESTE !== "undefined" && MODO_TESTE);
}

/* conduta: id da conduta; escore: id do escore dentro dela; ferramenta: função global que devolve o HTML;
   peso/idade: a ferramenta precisa do peso (e da idade) do paciente. Mostrado em ordem alfabética. */
const CALCULADORAS = [
    { id: "anafilaxia", nome: "Anafilaxia: critérios diagnósticos (WAO)", conduta: "anafilaxia", escore: "anafilaxia_wao" },
    { id: "balanco", nome: "Balanço hídrico e débito urinário", ferramenta: "calcBalancoHidrico", tipo: "calc" },
    { id: "wdf", nome: "Bronquiolite: escore de Wood-Downes-Ferrés", conduta: "bronquiolite", escore: "wdf" },
    { id: "cad_gravidade", nome: "CAD: gravidade e critérios de UTI", conduta: "cetoacidose", escore: "gravidade_cad" },
    { id: "cad_edema", nome: "CAD: sinais de edema cerebral", conduta: "cetoacidose", escore: "edema_cad" },
    { id: "cad_hidratacao", nome: "CAD: hidratação de 48 h com potássio", conduta: "cetoacidose", ferramenta: "ferramentaCadPasso4", peso: true, tipo: "calc" },
    { id: "cad_glicose", nome: "CAD: glicose no soro", conduta: "cetoacidose", ferramenta: "ferramentaCadGlicose", peso: true, tipo: "calc" },
    { id: "cad_transicao", nome: "CAD: transição para insulina SC", conduta: "cetoacidose", ferramenta: "ferramentaCadTransicao", peso: true, tipo: "calc" },
    { id: "controle_asma", nome: "Asma: avaliação do controle (≤ 5 anos)", conduta: "asma", escore: "controle_asma" },
    { id: "pram", nome: "Asma: escore PRAM (gravidade da crise)", conduta: "asma", escore: "pram" },
    { id: "crise", nome: "Crise convulsiva: cronômetro", conduta: "crise_convulsiva", ferramenta: "ferramentaCronometroCrise", tipo: "calc" },
    { id: "crupe", nome: "Crupe: gravidade (escore clínico)", conduta: "crupe", escore: "crupe_sbp" },
    { id: "dengue", nome: "Dengue: classificação de risco (grupos)", conduta: "dengue", escore: "dengue_grupo" },
    { id: "desidratacao", nome: "Desidratação: avaliação da hidratação (planos A, B e C)", conduta: "diarreia", escore: "hidratacao_dai" },
    { id: "rochester", nome: "Febre sem sinais localizatórios: critérios de Rochester", conduta: "fssl", escore: "rochester_fssl" },
    { id: "glasgow", nome: "Glasgow pediátrico (escala de coma)", conduta: "tce", escore: "glasgow_ped" },
    { id: "ictericia", nome: "Icterícia neonatal: precisa de fototerapia?", conduta: "ictericia", ferramenta: "ferramentaIctericia", tipo: "calc" },
    { id: "kawasaki", nome: "Kawasaki: critérios clássicos", conduta: "kawasaki", escore: "kawasaki_criterios" },
    { id: "kawasaki_inc", nome: "Kawasaki incompleto: algoritmo", conduta: "kawasaki", escore: "kawasaki_incompleto" },
    { id: "mcisaac", nome: "Faringoamigdalite: escore de McIsaac", conduta: "faringoamigdalite", escore: "mcisaac" },
    { id: "bms", nome: "Meningite: Bacterial Meningitis Score", conduta: "meningite", escore: "bms" },
    { id: "oma", nome: "Otite média aguda: antibiótico ou observar?", conduta: "otite_media", escore: "oma_decisao" },
    { id: "pecarn_menor", nome: "PECARN: TC de crânio em < 2 anos", conduta: "tce", escore: "pecarn_menor2" },
    { id: "pecarn_maior", nome: "PECARN: TC de crânio em ≥ 2 anos", conduta: "tce", escore: "pecarn_maior2" },
    { id: "pa", nome: "Pressão arterial por percentil (AAP 2017)", ferramenta: "calcPressaoArterial", tipo: "calc" },
    { id: "phoenix", nome: "Sepse: escore de Phoenix", conduta: "sepse", escore: "phoenix" },
    { id: "queimados", nome: "Queimados: superfície queimada e hidratação", conduta: "queimados", ferramenta: "ferramentaQueimados", peso: true, idade: true, tipo: "calc" },
    { id: "sinusite", nome: "Sinusite: antibiótico ou observar?", conduta: "sinusite", escore: "sinusite_decisao" }
];

const CALC_ICONES = {
    escore: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    calc: '<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8 6.5h8M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h3"/>'
};
function calcIcone(x) {
    if (typeof inQuad !== "function" || typeof INICIO_ICONES === "undefined") return "";
    let k = "calc_" + (x.tipo || "escore");
    if (!INICIO_ICONES[k]) INICIO_ICONES[k] = CALC_ICONES[x.tipo || "escore"];
    return inQuad(k, x.tipo === "calc" ? "#0a84ff" : "#ff2d55");
}

/* procura o escore pelo id dentro da conduta (seções, grupos, blocos...) */
function calcAcharEscore(cid, eid) {
    let achado = null;
    (function andar(o) {
        if (achado || !o || typeof o !== "object") return;
        if (o.escore && o.escore.id === eid) { achado = o; return; }
        for (let k in o) if (k !== "escore") andar(o[k]);
    })(typeof condutasJR !== "undefined" ? condutasJR[cid] : null);
    return achado;
}
function calcDisponivel(x) {
    if (x.escore) return !!calcAcharEscore(x.conduta, x.escore);
    return typeof window[x.ferramenta] === "function";
}

// ----- tela -----
let calcAtual = null, calcEscutando = false;

function abrirCalculadoras() {
    if (typeof mostrarInicio === "function") mostrarInicio();
    let tela = document.getElementById("tela-inicio"); if (!tela) return;
    if (!calcEscutando) { calcEscutando = true; tela.addEventListener("click", calcClique); tela.addEventListener("input", calcDigitou); }
    /* conduta aberta escondida tem os mesmos ids das ferramentas: volta a área de condutas para a lista */
    if (typeof condutaAberta !== "undefined" && condutaAberta && typeof renderizarListaCondutas === "function") renderizarListaCondutas();
    calcAtual = null;
    calcDesenhar();
}

function calcDesenhar() {
    let main = document.querySelector("#tela-inicio main"), e = escaparHtml;
    if (!main) return;
    if (typeof procModoPagina === "function") procModoPagina();
    let x = CALCULADORAS.find(c => c.id === calcAtual);
    let inicio = `<div class="cond-inicio-linha"><button type="button" class="cond-btn-inicio" data-calc-acao="fechar" title="Voltar à tela inicial"><span aria-hidden="true">🏠</span>Início</button></div>`;
    let topo = inicio + (x ? `<button type="button" class="proc-voltar" data-calc-acao="lista">‹ Calculadoras e escores</button>` : "") + `<h1>${x ? e(x.nome) : "Calculadoras e escores"}</h1>`;
    if (!x) {
        main.innerHTML = `<div class="proc-corpo calc-corpo">${topo}
            <input type="search" class="calc-busca" id="calcBusca" placeholder="Buscar (Glasgow, PRAM, PECARN...)" autocomplete="off">
            <div class="in-lista proc-lista" id="calcLista"></div>
            <p class="proc-aviso">Os mesmos escores e calculadoras das condutas, num lugar só. Confira sempre com o quadro clínico.</p></div>`;
        calcListar("");
    } else {
        let corpo = "";
        if (x.escore) {
            let s = calcAcharEscore(x.conduta, x.escore);
            corpo = s ? htmlEscore(Object.assign({}, s.escore, { id: "calc_" + s.escore.id })) : "";
        } else if (typeof window[x.ferramenta] === "function") corpo = window[x.ferramenta]();
        let campos = x.peso ? `<div class="calc-paciente">
            <label>Peso (kg)<input type="number" inputmode="decimal" min="0" step="0.1" id="calcPeso" value="${e(calcLer("pesoInput"))}" placeholder="—"></label>
            ${x.idade ? `<label>Idade (anos)<input type="number" inputmode="decimal" min="0" step="any" id="calcIdade" value="${e(calcLerIdadeAnos())}" placeholder="—"></label>` : ""}
            </div>` : "";
        let cond = x.conduta && typeof condutasJR !== "undefined" && condutasJR[x.conduta];
        main.innerHTML = `<div class="proc-corpo calc-corpo">${topo}${campos}<div class="calc-ferramenta">${corpo}</div>
            ${cond ? `<button type="button" class="calc-conduta" data-calc-acao="conduta">📖 Abrir a conduta: ${e(cond.nome)}</button>` : ""}
            <p class="proc-aviso">Apoio à decisão: confira sempre com o quadro clínico. Nada é salvo.</p></div>`;
    }
    window.scrollTo(0, 0);
}

function calcListar(termo) {
    let lista = document.getElementById("calcLista"); if (!lista) return;
    let n = s => (typeof normalizar === "function" ? normalizar(s) : String(s).toLowerCase());
    let t = n(termo || "");
    let itens = CALCULADORAS.filter(calcDisponivel).filter(x => !t || n(x.nome + " " + (x.conduta || "")).includes(t))
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    lista.innerHTML = itens.length ? itens.map(x => `<button type="button" class="in-row" data-calc="${x.id}">${calcIcone(x)}<div class="in-tx">${escaparHtml(x.nome)}</div><span class="in-d">${typeof inIcone === "function" ? inIcone("seta") : "›"}</span></button>`).join("")
        : `<div class="calc-vazio">Nada encontrado.</div>`;
}

function calcLer(id) { let c = document.getElementById(id); return c ? c.value : ""; }
function calcLerIdadeAnos() {
    let u = document.getElementById("idadeUnidade");
    return (!u || u.value === "anos") ? calcLer("idadeInput") : "";
}
/* escreve no campo do topo da Prescrição e avisa quem escuta (cálculos e ferramentas das condutas) */
function calcEscrever(id, valor) {
    let c = document.getElementById(id); if (!c) return;
    c.value = valor;
    c.dispatchEvent(new Event("input", { bubbles: true }));
}

function calcDigitou(ev) {
    let t = ev.target;
    if (t.id === "calcBusca") calcListar(t.value);
    else if (t.id === "calcPeso" || t.id === "calcIdade") {
        if (t.id === "calcPeso") calcEscrever("pesoInput", t.value);
        else { let u = document.getElementById("idadeUnidade"); if (u) u.value = "anos"; calcEscrever("idadeInput", t.value); }
        /* as ferramentas da CAD leem o peso ao desenhar: redesenha só a ferramenta (o foco fica no campo) */
        let x = CALCULADORAS.find(c => c.id === calcAtual), caixa = document.querySelector("#tela-inicio .calc-ferramenta");
        if (x && x.ferramenta && x.ferramenta !== "ferramentaQueimados" && caixa) caixa.innerHTML = window[x.ferramenta]();
    }
    else if (t.closest && t.closest(".calc-balanco")) calcAtualizarBalanco();
}

function calcClique(ev) {
    let b = ev.target.closest("[data-calc],[data-calc-acao]"); if (!b) return;
    if (b.dataset.calc) { calcAtual = b.dataset.calc; calcDesenhar(); return; }
    let a = b.dataset.calcAcao;
    if (a === "fechar") { calcAtual = null; if (typeof voltarDaPagina === "function") voltarDaPagina(); }
    else if (a === "lista") { calcAtual = null; calcDesenhar(); }
    else if (a === "conduta") {
        let x = CALCULADORAS.find(c => c.id === calcAtual);
        let main = document.querySelector("#tela-inicio main"); if (main) main.innerHTML = "";  /* evita ids repetidos com a conduta */
        calcAtual = null;
        if (typeof mostrarAppDoInicio === "function") mostrarAppDoInicio();
        if (x && typeof irParaConduta === "function") irParaConduta(x.conduta);
    }
    else if (a === "copiar-balanco") calcCopiarBalanco(b);
}

// ----- Balanço hídrico (veio dos Procedimentos, pedido do Dr. Jonas, 11/2026) -----
function calcBalancoHidrico() {
    let campo = (id, rot, un, ph) => `<label class="calc-campo"><span>${rot}</span><span class="calc-campo-linha"><input type="text" inputmode="decimal" id="${id}" placeholder="${ph}" autocomplete="off"><em>${un}</em></span></label>`;
    return `<div class="calc-balanco">
        <div class="escore-instrucao">👆 Digite os totais do período. O balanço e o débito urinário saem sozinhos.</div>
        <div class="calc-campos">
            ${campo("bhHoras", "Período", "h", "24")}
            ${campo("bhEntradas", "Entradas", "mL", "ex.: 1.250")}
            ${campo("bhSaidas", "Saídas", "mL", "ex.: 900")}
            ${campo("bhDiurese", "Diurese", "mL", "ex.: 480")}
            ${campo("bhPeso", "Peso", "kg", "ex.: 10")}
        </div>
        <div class="calc-resultados">
            <div class="calc-res"><span>Balanço hídrico</span><strong id="bhBalanco">—</strong></div>
            <div class="calc-res"><span>Débito urinário</span><strong id="bhDebito">—</strong></div>
        </div>
        <button type="button" class="proc-copiar calc-copiar" data-calc-acao="copiar-balanco">Copiar texto</button>
    </div>`;
}
/* "1.250" = mil duzentos e cinquenta; vírgula = decimal */
function calcNumero(id) {
    let t = calcLer(id).trim();
    if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(t)) t = t.replace(/\./g, "");
    return parseFloat(t.replace(",", "."));
}
function calcContasBalanco() {
    let h = calcNumero("bhHoras"), e = calcNumero("bhEntradas"), s = calcNumero("bhSaidas"), d = calcNumero("bhDiurese"), p = calcNumero("bhPeso");
    let r = {};
    if (!isNaN(e) && !isNaN(s)) { let b = Math.round(e - s); r.balanco = (b > 0 ? "+" : "") + b; }
    if (!isNaN(d) && p > 0 && h > 0) r.debito = (d / p / h).toFixed(1).replace(".", ",");
    return r;
}
function calcAtualizarBalanco() {
    let r = calcContasBalanco();
    let b = document.getElementById("bhBalanco"), d = document.getElementById("bhDebito");
    if (b) b.textContent = r.balanco ? r.balanco + " mL" : "—";
    if (d) d.textContent = r.debito ? r.debito + " mL/kg/h" : "—";
}
function calcCopiarBalanco(botao) {
    let r = calcContasBalanco();
    if (!r.balanco) { let f = document.getElementById(isNaN(calcNumero("bhEntradas")) ? "bhEntradas" : "bhSaidas"); if (f) f.focus(); return; }
    let v = id => calcLer(id).trim();
    let linhas = ["BALANÇO HÍDRICO", ""];
    if (v("bhHoras")) linhas.push(`- Período: ${v("bhHoras")} h`);
    linhas.push(`- Entradas: ${v("bhEntradas")} mL`, `- Saídas: ${v("bhSaidas")} mL`);
    if (v("bhDiurese")) linhas.push(`- Diurese: ${v("bhDiurese")} mL`);
    if (v("bhPeso")) linhas.push(`- Peso: ${v("bhPeso")} kg`);
    linhas.push("", `Balanço hídrico: ${r.balanco} mL.` + (r.debito ? ` Débito urinário: ${r.debito} mL/kg/h.` : ""));
    let t = linhas.join("\n");
    let ok = () => { botao.textContent = "✓ Copiado"; setTimeout(() => { botao.textContent = "Copiar texto"; }, 1500); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok).catch(() => { if (typeof procCopiarAntigo === "function") procCopiarAntigo(t, ok); });
    else if (typeof procCopiarAntigo === "function") procCopiarAntigo(t, ok);
}

// Item na tela inicial (Pediatria), logo depois de "Descrição de procedimentos" (ou de "Condutas").
if (calculadorasAtivo() && typeof INICIO_PEDIATRIA !== "undefined" && !INICIO_PEDIATRIA.some(i => i.d === "calculadoras")) {
    INICIO_ICONES.calculadora = CALC_ICONES.calc;
    let ref = INICIO_PEDIATRIA.findIndex(i => i.d === "procedimentos");
    if (ref < 0) ref = INICIO_PEDIATRIA.findIndex(i => i.d === "condutas");
    INICIO_PEDIATRIA.splice(ref + 1, 0, { d: "calculadoras", ic: "calculadora", cor: "#0a84ff", t: "Calculadoras e escores", s: "Glasgow, PRAM, PECARN, balanço hídrico..." });
    if (typeof irDoInicio === "function") {
        let original = window.irDoInicio;
        window.irDoInicio = function (destino) {
            if (destino === "calculadoras") { abrirCalculadoras(); return; }
            return original.apply(this, arguments);
        };
    }
}
