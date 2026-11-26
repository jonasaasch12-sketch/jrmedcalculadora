// =====================================================
// 🏥 PRESCRIÇÃO DE INTERNAÇÃO (sugestão aceita pelo Dr. Jonas, 11/2026): escolhe a doença e o app monta a
// prescrição hospitalar numerada (dieta, soro de manutenção, medicações, sintomáticos, cuidados) para copiar.
// NENHUMA DOSE É ESCRITA AQUI: as medicações são os cards hospitalares que a própria conduta já usa
// (farmaciaJR + condutasJR); o soro vem do card tgi_manutencao (Holliday-Segar). Nada vem marcado: o médico escolhe.
// Dieta e cuidados são frases de enfermagem, sem dose. Nada é salvo.
// Tela inicial → Pediatria → "Prescrição de internação". Página própria (procModoPagina).
// Só no teste até o Dr. Jonas conferir (INTERNACAO_LIBERADA). Carregado depois de js/sala-vermelha.js.
// =====================================================
const INTERNACAO_LIBERADA = false;

function internacaoAtiva() {
    return INTERNACAO_LIBERADA || (typeof MODO_TESTE !== "undefined" && MODO_TESTE);
}

const INT_DIETAS = ["Dieta oral livre para a idade", "Aleitamento materno em livre demanda", "Dieta branda para a idade", "Dieta zero"];
const INT_SINTOMATICOS = ["dip_inj", "ondan_ev"];
const INT_SORO = "tgi_manutencao";
const INT_CUIDADOS = [
    "Sinais vitais de 4/4 horas",
    "Oximetria de pulso contínua",
    "Cabeceira elevada a 30 graus",
    "Controle de diurese",
    "Balanço hídrico",
    "Peso diário",
    "Acompanhante em tempo integral",
    "Comunicar febre, desconforto respiratório ou piora clínica"
];
/* condutas sem internação típica ou só de emergência ficam fora da lista */
const INT_FORA = ["ventilacao", "anafilaxia", "crupe", "tce", "faringoamigdalite", "otite_media", "exantema_guia"];

let intDoenca = null, intEscutando = false;
const intMarcados = { cards: {}, cuidados: {}, dieta: null, soro: "" };

/* cards hospitalares que a conduta usa (seções, grupos, blocos) */
function intCardsDaConduta(cid) {
    let s = new Set();
    (function andar(o) {
        if (!o || typeof o !== "object") return;
        if (Array.isArray(o.remedios)) o.remedios.forEach(r => s.add(r));
        for (let k in o) andar(o[k]);
    })(typeof condutasJR !== "undefined" ? condutasJR[cid] : null);
    return [...s].filter(id => {
        let m = typeof farmaciaJR !== "undefined" && farmaciaJR[id];
        if (!m || id === INT_SORO || INT_SINTOMATICOS.includes(id)) return false;
        let via = ""; try { via = String(m.calc(10, "2").r).split("\n")[0]; } catch (e) { }
        return /hospital|injet|endoven|nebuliz/i.test((m.sub || "") + " " + via);
    });
}
function intDoencas() {
    if (typeof condutasJR === "undefined") return [];
    return Object.values(condutasJR).filter(c => !INT_FORA.includes(c.id) && intCardsDaConduta(c.id).length)
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

function abrirInternacao() {
    if (typeof mostrarInicio === "function") mostrarInicio();
    let tela = document.getElementById("tela-inicio"); if (!tela) return;
    if (!intEscutando) { intEscutando = true; tela.addEventListener("click", intClique); tela.addEventListener("input", intMudou); tela.addEventListener("change", intMudou); }
    intDoenca = null;
    intDesenhar();
}

function intDesenhar() {
    let main = document.querySelector("#tela-inicio main"), e = escaparHtml;
    if (!main) return;
    if (typeof procModoPagina === "function") procModoPagina();
    let c = intDoenca && condutasJR[intDoenca];
    let inicio = `<div class="cond-inicio-linha"><button type="button" class="cond-btn-inicio" data-int-acao="fechar" title="Voltar à tela inicial"><span aria-hidden="true">🏠</span>Início</button></div>`;
    let topo = inicio + (c ? `<button type="button" class="proc-voltar" data-int-acao="lista">‹ Escolher outra doença</button>` : "") + `<h1>${c ? "Internação: " + e(c.nome) : "Prescrição de internação"}</h1>`;
    if (!c) {
        let lista = intDoencas().map(x => `<button type="button" class="in-row" data-int-doenca="${x.id}">${typeof inQuad === "function" ? inQuad("hospital_int", x.cor || "#005eb8") : ""}<div class="in-tx">${e(x.nome)}</div><span class="in-d">${typeof inIcone === "function" ? inIcone("seta") : "›"}</span></button>`).join("");
        main.innerHTML = `<div class="proc-corpo int-corpo">${topo}<p class="proc-dica">Escolha a doença. O app junta a dieta, o soro, as medicações da conduta e os cuidados numa prescrição numerada para copiar.</p>
            <div class="in-lista proc-lista" id="intLista">${lista}</div>
            <p class="proc-aviso">As doses vêm dos cards da Prescrição. Nada vem marcado: escolha o que vai usar e confira antes de prescrever.</p></div>`;
    } else {
        let peso = typeof calcLer === "function" ? calcLer("pesoInput") : "";
        let idade = typeof calcLerIdadeAnos === "function" ? calcLerIdadeAnos() : "";
        let marca = (grupo, valor, texto, tipo, nome) => `<label class="int-op"><input type="${tipo}" name="${nome}" data-int-grupo="${grupo}" value="${e(valor)}">${texto}</label>`;
        main.innerHTML = `<div class="proc-corpo int-corpo">${topo}
            <div class="calc-paciente">
                <label>Peso (kg)<input type="number" inputmode="decimal" min="0" step="0.1" id="intPeso" value="${e(peso)}" placeholder="—"></label>
                <label>Idade (anos)<input type="number" inputmode="decimal" min="0" step="any" id="intIdade" value="${e(idade)}" placeholder="—"></label>
            </div>
            <section class="int-sec"><h2>Dieta</h2>${INT_DIETAS.map(d => marca("dieta", d, e(d), "radio", "intDieta")).join("")}</section>
            <section class="int-sec"><h2>Hidratação venosa (Holliday-Segar)</h2>
                ${marca("soro", "", "Sem soro de manutenção", "radio", "intSoro")}${marca("soro", "70", "Manutenção a 70%", "radio", "intSoro")}${marca("soro", "80", "Manutenção a 80%", "radio", "intSoro")}</section>
            <section class="int-sec"><h2>Medicações da conduta</h2><div id="intCards"></div></section>
            <section class="int-sec"><h2>Sintomáticos</h2><div id="intSint"></div></section>
            <section class="int-sec"><h2>Cuidados</h2>${INT_CUIDADOS.map(t => marca("cuidado", t, e(t), "checkbox", "")).join("")}</section>
            <section class="int-sec int-saida"><h2>Prescrição pronta</h2><pre id="intTexto"></pre>
                <button type="button" class="proc-copiar calc-copiar" data-int-acao="copiar">Copiar prescrição</button>
                <button type="button" class="calc-conduta" data-int-acao="conduta">📖 Abrir a conduta: ${e(c.nome)}</button></section>
            <p class="proc-aviso">Confira cada item antes de prescrever. Os cards com mais de uma opção (ex.: 24/24 h ou 12/12 h) saem com as duas: apague a que não usar.</p></div>`;
        /* restaura o que já estava marcado */
        main.querySelectorAll("[data-int-grupo]").forEach(i => {
            let g = i.dataset.intGrupo;
            if (g === "dieta") i.checked = intMarcados.dieta === i.value;
            else if (g === "soro") i.checked = intMarcados.soro === i.value;
            else if (g === "cuidado") i.checked = !!intMarcados.cuidados[i.value];
        });
        intAtualizarCards();
    }
    window.scrollTo(0, 0);
}

function intPesoIdade() {
    let p = parseFloat(String((document.getElementById("intPeso") || {}).value || "").replace(",", "."));
    let i = String((document.getElementById("intIdade") || {}).value || "").replace(",", ".");
    return { p, i };
}
function intCalc(id) {
    let { p, i } = intPesoIdade();
    if (!(p > 0)) return null;
    try { return farmaciaJR[id].calc(p, i); } catch (e) { return null; }
}
function intLimpar(t) { return String(t || "").replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, ""); }

/* desenha as listas de cards (dose ao lado do nome) e o texto final */
function intAtualizarCards() {
    let e = escaparHtml, semPeso = !(intPesoIdade().p > 0);
    let item = id => {
        let m = farmaciaJR[id], r = intCalc(id);
        return `<label class="int-op int-card"><input type="checkbox" data-int-grupo="card" value="${id}"${intMarcados.cards[id] ? " checked" : ""}>
            <span><b>${e(intLimpar(m.nome))}</b><small>${e(intLimpar(m.apres || ""))}</small></span><em>${semPeso ? "" : e(intLimpar(r ? r.v : "—"))}</em></label>`;
    };
    let a = document.getElementById("intCards"), b = document.getElementById("intSint");
    if (a) a.innerHTML = intCardsDaConduta(intDoenca).map(item).join("");
    if (b) b.innerHTML = INT_SINTOMATICOS.filter(id => farmaciaJR[id]).map(item).join("");
    intMontarTexto();
}

function intMontarTexto() {
    let saida = document.getElementById("intTexto"); if (!saida) return;
    let { p } = intPesoIdade();
    if (!(p > 0)) { saida.textContent = "Digite o peso para montar a prescrição."; return; }
    let itens = [];
    if (intMarcados.dieta) itens.push(intMarcados.dieta.toUpperCase() + ".");
    if (intMarcados.soro) {
        let r = intCalc(INT_SORO), txt = r ? intLimpar(r.r) : "";
        let sol = (txt.match(/SG 5%[^\n]*/) || [""])[0].trim().replace(/\.$/, "");
        let vel = (txt.match(new RegExp(intMarcados.soro + "%:\\s*([\\d.,]+\\s*mL/h)")) || [])[1];
        if (sol && vel) itens.push(`${sol.toUpperCase()}. CORRER EV CONTÍNUO A ${vel.toUpperCase()} (MANUTENÇÃO HOLLIDAY-SEGAR ${intMarcados.soro}%).`);
    }
    let cards = Object.keys(intMarcados.cards).filter(id => intMarcados.cards[id] && farmaciaJR[id]);
    let ordem = intCardsDaConduta(intDoenca).concat(INT_SINTOMATICOS);
    cards.sort((x, y) => ordem.indexOf(x) - ordem.indexOf(y)).forEach(id => {
        let r = intCalc(id); if (!r) return;
        let linhas = intLimpar(r.r).split("\n").map(l => l.trim());
        let corpo = linhas.filter(Boolean).join("\n   ");  /* 1ª linha = via do card (ex.: VIA ENDOVENOSA ...) */
        itens.push(`${intLimpar(farmaciaJR[id].nome).toUpperCase()}\n   ${corpo}`);
    });
    INT_CUIDADOS.filter(t => intMarcados.cuidados[t]).forEach(t => itens.push(t.toUpperCase() + "."));
    saida.textContent = itens.length
        ? "PRESCRIÇÃO DE INTERNAÇÃO\n\n" + itens.map((t, k) => `${k + 1}) ${t}`).join("\n\n")
        : "Marque os itens acima. A prescrição aparece aqui.";
}

function intMudou(ev) {
    let t = ev.target;
    if (t.id === "intPeso" || t.id === "intIdade") {
        if (typeof calcEscrever === "function") {
            if (t.id === "intPeso") calcEscrever("pesoInput", t.value);
            else { let u = document.getElementById("idadeUnidade"); if (u) u.value = "anos"; calcEscrever("idadeInput", t.value); }
        }
        intAtualizarCards(); return;
    }
    let g = t.dataset && t.dataset.intGrupo; if (!g || ev.type !== "change") return;
    if (g === "dieta") intMarcados.dieta = t.value;
    else if (g === "soro") intMarcados.soro = t.value;
    else if (g === "cuidado") intMarcados.cuidados[t.value] = t.checked;
    else if (g === "card") intMarcados.cards[t.value] = t.checked;
    intMontarTexto();
}

function intClique(ev) {
    let b = ev.target.closest("[data-int-acao],[data-int-doenca]"); if (!b) return;
    if (b.dataset.intDoenca) {
        if (intDoenca !== b.dataset.intDoenca) { intMarcados.cards = {}; }
        intDoenca = b.dataset.intDoenca; intDesenhar(); return;
    }
    let a = b.dataset.intAcao;
    if (a === "fechar") { intDoenca = null; if (typeof montarInicio === "function") montarInicio(); window.scrollTo(0, 0); }
    else if (a === "lista") { intDoenca = null; intDesenhar(); }
    else if (a === "conduta") {
        let id = intDoenca, main = document.querySelector("#tela-inicio main"); if (main) main.innerHTML = "";
        intDoenca = null;
        if (typeof mostrarAppDoInicio === "function") mostrarAppDoInicio();
        if (typeof irParaConduta === "function") irParaConduta(id);
    }
    else if (a === "copiar") {
        let t = (document.getElementById("intTexto") || {}).textContent || "";
        if (!/^PRESCRIÇÃO DE INTERNAÇÃO/.test(t)) return;
        let ok = () => { b.textContent = "✓ Copiado"; setTimeout(() => { b.textContent = "Copiar prescrição"; }, 1500); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok).catch(() => { if (typeof procCopiarAntigo === "function") procCopiarAntigo(t, ok); });
        else if (typeof procCopiarAntigo === "function") procCopiarAntigo(t, ok);
    }
}

// Item na tela inicial (Pediatria), logo depois de "Sala vermelha" (ou de "Emergência").
if (internacaoAtiva() && typeof INICIO_PEDIATRIA !== "undefined" && !INICIO_PEDIATRIA.some(x => x.d === "internacao")) {
    INICIO_ICONES.hospital_int = '<path d="M4 21V7l8-4 8 4v14"/><path d="M2 21h20M12 8v6M9 11h6"/>';
    let ref = INICIO_PEDIATRIA.findIndex(x => x.d === "sala_vermelha");
    if (ref < 0) ref = INICIO_PEDIATRIA.findIndex(x => x.d === "emergencia");
    INICIO_PEDIATRIA.splice(ref + 1, 0, { d: "internacao", ic: "hospital_int", cor: "#005eb8", t: "Prescrição de internação", s: "Dieta, soro, medicações e cuidados, numerados" });
    if (typeof irDoInicio === "function") {
        let original = window.irDoInicio;
        window.irDoInicio = function (destino) {
            if (destino === "internacao") { abrirInternacao(); return; }
            return original.apply(this, arguments);
        };
    }
}
