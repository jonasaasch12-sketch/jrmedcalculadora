// =====================================================
// 🚨 FICHA DA SALA VERMELHA (pedido do Dr. Jonas, 11/2026): uma tela só, pelo peso e pela idade, com o que se usa
// nos primeiros minutos da emergência (via aérea, PCR, arritmias, choque, anafilaxia, crise convulsiva).
// NENHUMA DOSE É ESCRITA AQUI: cada item chama o calc() do card da Prescrição (farmaciaJR). Corrigiu o card, muda aqui.
// Única conta própria: energia do desfibrilador/cardioversão (PALS/AHA 2020), em SV_ENERGIA.
// Tela inicial → Pediatria → "Sala vermelha" (logo abaixo de Emergência). Página própria como a de Procedimentos.
// Peso/idade da página escrevem em #pesoInput/#idadeInput (os mesmos da Prescrição).
// Só no teste até o Dr. Jonas conferir (SALA_VERMELHA_LIBERADA). Carregado depois de js/calculadoras.js.
// =====================================================
const SALA_VERMELHA_LIBERADA = false;

function salaVermelhaAtiva() {
    return SALA_VERMELHA_LIBERADA || (typeof MODO_TESTE !== "undefined" && MODO_TESTE);
}

const SV_BLOCOS = [
    { titulo: "Via aérea e intubação", cor: "#0a84ff", ids: ["rsi_tubo", "rsi_fent", "rsi_ceta", "rsi_midaz", "rsi_propofol", "rsi_roc", "rsi_succi", "rsi_pancuronio"] },
    { titulo: "Parada cardiorrespiratória e arritmias", cor: "#ff3b30", energia: true, ids: ["epinefrina_pals", "amiodarona_pals", "lidocaina_pals", "adenosina_pals", "atropina", "magnesio_pals", "bicarbonato_pals", "gluconato_calcio_pals"] },
    { titulo: "Choque", cor: "#ff9f0a", ids: ["sepse_expansao", "adrenalina_sepse", "nora_sepse"] },
    { titulo: "Anafilaxia", cor: "#af52de", ids: ["adrenalina_im", "anaf_expansao"] },
    { titulo: "Crise convulsiva", cor: "#5856d6", ids: ["neuro_midaz_nasal", "neuro_midaz", "neuro_diaz", "neuro_levetiracetam", "neuro_fenitoina", "fenobarbital"] },
    { titulo: "Hipoglicemia e antídotos", cor: "#34c759", ids: ["glicose_pals", "naloxona_pals", "flumazenil_pals"] }
];

/* "Como fazer", sempre visível (pedido do Dr. Jonas, 11/2026: na emergência, ver a diluição sem clicar).
   Só o modo de preparo do próprio card (texto da receita dele); os números que mudam com o peso são tirados do texto do card (t).
   Tocar no item continua abrindo a receita completa. Card sem linha aqui: mostra só a dose. */
const SV_PREPARO = {
    rsi_fent: () => "Diluir 1 mL + 9 mL de AD (5 mcg/mL). IV/IO lento.",
    rsi_ceta: () => "Puro (50 mg/mL). IV/IO.",
    rsi_midaz: () => "Puro (5 mg/mL). IV/IO.",
    rsi_roc: () => "Puro (10 mg/mL). IV/IO.",
    rsi_succi: () => "1 FA de 100 mg + 10 mL de AD (10 mg/mL). IV/IO.",
    epinefrina_pals: t => `IV/IO: 1 mL (1 mg) + 9 mL de AD (0,1 mg/mL), a cada 3 a 5 min. Tubo: ${svPega(t, /ASPIRAR ([\d.,]+ ML) PUROS/) || "pura"}, sem diluir.`,
    amiodarona_pals: () => "Pura (50 mg/mL), diluir em SG 5%. Correr em 20 a 60 min.",
    lidocaina_pals: () => "Lidocaína 2% pura (sem vasoconstritor). IV/IO em 2 a 3 min.",
    adenosina_pals: t => `Pura (3 mg/mL). Bolus rápido + flush de SF. 2ª dose: ${svPega(t, /2ª DOSE[\s\S]*?ASPIRAR ([\d.,]+ ML)/) || "ver receita"}.`,
    atropina: () => "Pura (0,25 mg/mL). Bolus IV/IO; pode repetir 1 vez.",
    magnesio_pals: () => "Magnésio 10% puro. IV/IO em 10 a 20 min.",
    bicarbonato_pals: () => "Bicarbonato 8,4% (1 mEq/mL). Bolus lento.",
    sepse_expansao: () => "Ringer lactato ou SF 0,9% em 5 a 20 min. Reavaliar após cada bolus.",
    adrenalina_sepse: () => "1 mL (1 mg) + 99 mL de SG 5% (10 mcg/mL). BIC.",
    nora_sepse: () => "2 mL + 248 mL de SG 5% (8 mcg/mL). BIC.",
    adrenalina_im: () => "Pura (1 mg/mL), sem diluir. IM na coxa; repetir a cada 5 a 15 min.",
    anaf_expansao: () => "SF 0,9% ou Ringer lactato em 5 min.",
    neuro_midaz_nasal: t => `Puro (5 mg/mL): ${svPega(t, /APLICAR ([\d.,]+ ML) EM CADA NARINA/) || "metade"} em cada narina.`,
    neuro_midaz: () => "Puro (5 mg/mL). IM.",
    neuro_diaz: () => "Puro (5 mg/mL). EV ou retal.",
    neuro_levetiracetam: t => `+ ${svPega(t, /\+ ([\d.,]+ ML) DE SF/) || "SF 0,9%"} de SF 0,9%. BIC em 15 min.`,
    neuro_fenitoina: t => `Puro EV lento (máx. 50 mg/min), ou + ${svPega(t, /\+ ([\d.,]+ ML) DE SF/) || "SF"} de SF 0,9% em BIC.`,
    fenobarbital: () => "Diluir em SF 0,9%. EV até 60 mg/min.",
    glicose_pals: t => ["RECÉM-NASCIDOS", "LACTENTES", "ADOLESCENTES"].map((k, n) => {
        let m = String(t).toUpperCase().match(new RegExp(k + "[^\\n]*\\(GLICOSE (\\d+%)\\):\\s*ADMINISTRAR ([\\d.,]+ A [\\d.,]+ ML)"));
        return m ? `${["RN", "Criança", "Adolescente"][n]}: glicose ${m[1]} ${m[2].toLowerCase()}` : "";
    }).filter(Boolean).join(" · "),
    naloxona_pals: () => "Pura (0,4 mg/mL). IV a cada 2 a 3 min.",
    rsi_propofol: () => "Puro (10 mg/mL). IV/IO.",
    rsi_pancuronio: () => "Puro (2 mg/mL). IV/IO.",
    gluconato_calcio_pals: () => "Gluconato de cálcio 10% puro. IV/IO lento.",
    flumazenil_pals: t => `Puro (0,1 mg/mL). IV em 15 s. Sem resposta em 45 s: repetir a cada 60 s (até 4 vezes), no total máximo de ${svPega(t, /TOTAL MÁXIMA DE ([\d.,]+ ML)/) || "0,05 mg/kg ou 1 mg"}.`
};
function svPega(t, re) { let m = String(t).toUpperCase().match(re); return m ? m[1].toLowerCase().replace(/ ml$/, " mL") : ""; }

/* PALS (AHA 2020): desfibrilação 2 → 4 → ≥ 4 J/kg (máx. 10 J/kg ou a dose de adulto); cardioversão sincronizada 0,5–1 → 2 J/kg */
function svEnergia(p) {
    let j = x => (Math.round(x * 10) / 10).toString().replace(".", ",");
    return `<div class="sv-energia">
        <div class="sv-energia-item"><span>Desfibrilação (FV / TV sem pulso)</span>
            <strong>1º choque: ${j(2 * p)} J · 2º: ${j(4 * p)} J</strong>
            <em>Seguintes: ≥ 4 J/kg (${j(4 * p)} J), máx. 10 J/kg (${j(10 * p)} J) ou a dose de adulto</em></div>
        <div class="sv-energia-item"><span>Cardioversão sincronizada (TSV / TV com pulso)</span>
            <strong>${j(0.5 * p)} a ${j(1 * p)} J</strong>
            <em>Se não reverter: 2 J/kg (${j(2 * p)} J)</em></div>
        <div class="sv-fonte">Energia: PALS (AHA 2020).</div>
    </div>`;
}

let svEscutando = false;
function abrirSalaVermelha() {
    if (typeof mostrarInicio === "function") mostrarInicio();
    let tela = document.getElementById("tela-inicio"); if (!tela) return;
    if (!svEscutando) { svEscutando = true; tela.addEventListener("click", svClique); tela.addEventListener("input", svDigitou); }
    svDesenhar();
}

function svDesenhar() {
    let main = document.querySelector("#tela-inicio main"), e = escaparHtml;
    if (!main) return;
    if (typeof procModoPagina === "function") procModoPagina();
    let peso = typeof calcLer === "function" ? calcLer("pesoInput") : (document.getElementById("pesoInput") || {}).value || "";
    let idade = typeof calcLerIdadeAnos === "function" ? calcLerIdadeAnos() : "";
    main.innerHTML = `<div class="proc-corpo sv-corpo">
        <div class="cond-inicio-linha"><button type="button" class="cond-btn-inicio" data-sv-acao="fechar" title="Voltar à tela inicial"><span aria-hidden="true">🏠</span>Início</button></div>
        <h1>Sala vermelha</h1>
        <p class="proc-dica">Tudo da emergência numa tela, pelo peso. Toque num item para ver o preparo e copiar.</p>
        <div class="calc-paciente sv-paciente">
            <label>Peso (kg)<input type="number" inputmode="decimal" min="0" step="0.1" id="svPeso" value="${e(peso)}" placeholder="—"></label>
            <label>Idade (anos)<input type="number" inputmode="decimal" min="0" step="any" id="svIdade" value="${e(idade)}" placeholder="—"></label>
        </div>
        <div id="svConteudo"></div>
        <p class="proc-aviso">As doses vêm dos cards da Prescrição. Confira sempre antes de administrar.</p></div>`;
    svAtualizar();
    window.scrollTo(0, 0);
}

function svAtualizar() {
    let caixa = document.getElementById("svConteudo"); if (!caixa) return;
    let p = parseFloat(String(calcLerSv("svPeso")).replace(",", "."));
    let i = String(calcLerSv("svIdade")).replace(",", ".");
    if (!(p > 0)) { caixa.innerHTML = `<div class="sv-vazio">Digite o <strong>peso</strong> para ver as doses e os materiais.</div>`; return; }
    let e = escaparHtml, limpar = t => String(t).replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "");
    let html = "";
    if (!i) html += `<div class="sv-aviso">Sem a idade, o tamanho do tubo é estimado pelo peso. Digite a idade para mais precisão.</div>`;
    SV_BLOCOS.forEach(b => {
        let itens = b.ids.filter(id => typeof farmaciaJR !== "undefined" && farmaciaJR[id]).map(id => {
            let m = farmaciaJR[id], r;
            try { r = m.calc(p, i); } catch (err) { r = { v: "—", r: "" }; }
            let prep = ""; try { prep = SV_PREPARO[id] ? SV_PREPARO[id](limpar(r.r || "")) : ""; } catch (err) { prep = ""; }
            return `<details class="sv-item">
                <summary><span class="sv-nome">${e(limpar(m.nome))}<small>${e(limpar(m.apres || ""))}</small></span><span class="sv-dose">${/ver receita/i.test(r.v) ? "" : e(limpar(r.v))}</span>${prep ? `<span class="sv-prep">${e(prep)}</span>` : ""}</summary>
                <div class="sv-receita" id="sv-r-${id}">${e(limpar(r.r || ""))}</div>
                <button type="button" class="sv-copiar" data-sv-copiar="${id}">Copiar</button>
            </details>`;
        }).join("");
        html += `<section class="sv-bloco" style="--sv-cor:${b.cor}"><h2>${e(b.titulo)}</h2>${b.energia ? svEnergia(p) : ""}${itens}</section>`;
    });
    caixa.innerHTML = html;
}
function calcLerSv(id) { let c = document.getElementById(id); return c ? c.value.trim() : ""; }

function svDigitou(ev) {
    let t = ev.target;
    if (t.id !== "svPeso" && t.id !== "svIdade") return;
    if (t.id === "svPeso") { if (typeof calcEscrever === "function") calcEscrever("pesoInput", t.value); }
    else { let u = document.getElementById("idadeUnidade"); if (u) u.value = "anos"; if (typeof calcEscrever === "function") calcEscrever("idadeInput", t.value); }
    svAtualizar();
}

function svClique(ev) {
    let b = ev.target.closest("[data-sv-acao],[data-sv-copiar]"); if (!b) return;
    if (b.dataset.svAcao === "fechar") { if (typeof voltarDaPagina === "function") voltarDaPagina(); return; }
    if (b.dataset.svCopiar) {
        let t = (document.getElementById("sv-r-" + b.dataset.svCopiar) || {}).textContent || "";
        let ok = () => { b.textContent = "✓ Copiado"; setTimeout(() => { b.textContent = "Copiar"; }, 1500); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok).catch(() => { if (typeof procCopiarAntigo === "function") procCopiarAntigo(t, ok); });
        else if (typeof procCopiarAntigo === "function") procCopiarAntigo(t, ok);
    }
}

// Item na tela inicial (Pediatria), logo depois de "Condutas".
if (salaVermelhaAtiva() && typeof INICIO_PEDIATRIA !== "undefined" && !INICIO_PEDIATRIA.some(x => x.d === "sala_vermelha")) {
    INICIO_ICONES.sirene = '<path d="M7 17v-5a5 5 0 0 1 10 0v5"/><path d="M4 21h16M5 17h14v4H5zM12 3v2M4.2 6.2l1.4 1.4M19.8 6.2l-1.4 1.4"/>';
    let ref = INICIO_PEDIATRIA.findIndex(x => x.d === "condutas");
    INICIO_PEDIATRIA.splice(ref + 1, 0, { d: "sala_vermelha", ic: "sirene", cor: "#ff3b30", t: "Sala vermelha", s: "Doses, tubo e choque pelo peso, numa tela" });
    if (typeof irDoInicio === "function") {
        let original = window.irDoInicio;
        window.irDoInicio = function (destino) {
            if (destino === "sala_vermelha") { abrirSalaVermelha(); return; }
            return original.apply(this, arguments);
        };
    }
}
