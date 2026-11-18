// =====================================================
// 📝 DESCRIÇÃO DE PROCEDIMENTOS (pedido do Dr. Jonas, 11/2026): modelos de texto para o prontuário.
// Na tela inicial: Pediatria → "Descrição de procedimentos". Escolhe o procedimento, preenche só os
// campos em vermelho (o que muda) e copia o texto pronto.
// Campos no modelo: {{rótulo}} = texto livre; {{rótulo|opção 1|opção 2}} = lista de opções.
// Nada é guardado: os campos se apagam ao fechar (não colocar dado que identifique o paciente).
// Só no teste até o Dr. Jonas conferir os textos (PROCEDIMENTOS_LIBERADO).
// Carregado depois de js/inicio.js (usa INICIO_PEDIATRIA, mostrarInicio, montarInicio, escaparHtml).
// A página abre dentro da tela inicial (#tela-inicio main), com a mesma tarja, logo e menus.
// =====================================================
const PROCEDIMENTOS_LIBERADO = false;

function procedimentosAtivo() {
    return PROCEDIMENTOS_LIBERADO || (typeof MODO_TESTE !== "undefined" && MODO_TESTE);
}

const PROCEDIMENTOS = [
    {
        id: "puncao_lombar", ic: "coluna", cor: "#5856d6", nome: "Punção lombar (coleta de líquor)",
        texto: "Procedimento: punção lombar para coleta de líquor, indicada por {{indicação}}. Responsável orientado sobre indicação, riscos e possíveis complicações, com consentimento verbal. " +
            "Paciente posicionado em {{posição|decúbito lateral|sentado}}, com auxílio para contenção. Higienização das mãos, uso de luvas estéreis, máscara e campo estéril. Antissepsia com {{antisséptico|clorexidina alcoólica|clorexidina degermante e alcoólica|PVPI}}. " +
            "{{anestesia|Sem anestesia local|Anestesia local com lidocaína|Anestesia tópica com creme anestésico}}. Punção no espaço {{espaço|L3-L4|L4-L5}} com agulha {{agulha|22G|20G|25G}} com mandril, em {{número de tentativas}} tentativa(s). " +
            "Saída de líquor de aspecto {{aspecto|límpido|turvo|hemorrágico|xantocrômico}}, coletados {{volume}} mL para {{exames solicitados}}. Retirada da agulha e curativo compressivo. Procedimento sem intercorrências."
    },
    {
        id: "cvc", ic: "cateter", cor: "#ff3b30", nome: "Acesso venoso central",
        texto: "Procedimento: passagem de cateter venoso central em {{veia|veia jugular interna direita|veia jugular interna esquerda|veia subclávia direita|veia subclávia esquerda|veia femoral direita|veia femoral esquerda}}, indicada por {{indicação}}. Responsável orientado sobre indicação, riscos e possíveis complicações. " +
            "Higienização das mãos, paramentação com barreira máxima estéril (gorro, máscara, avental e luvas estéreis, campo amplo), antissepsia com clorexidina alcoólica. " +
            "{{guia|Punção guiada por ultrassom em tempo real|Punção por reparo anatômico}}. {{anestesia|Sem anestesia local (paciente sedado)|Anestesia local com lidocaína}}. Punção venosa com retorno de sangue venoso, passagem de fio-guia pela técnica de Seldinger, dilatação do trajeto e inserção de cateter {{lúmens|duplo lúmen|triplo lúmen|mono lúmen}} {{calibre}} Fr, fixado em {{fixação}} cm. " +
            "Retirado o fio-guia íntegro. Refluxo e permeabilidade confirmados em todas as vias. Fixação e curativo estéril. {{tentativas}} tentativa(s). {{controle|Solicitada radiografia de tórax para confirmar a posição|Sem necessidade de radiografia (acesso femoral)}}. Procedimento sem intercorrências."
    },
    {
        id: "iot", ic: "via_aerea", cor: "#0a84ff", nome: "Intubação orotraqueal",
        texto: "Procedimento: intubação orotraqueal, indicada por {{indicação}}. Monitorização com oximetria, frequência cardíaca e pressão arterial. Pré-oxigenação com {{pré-oxigenação|bolsa-válvula-máscara com O2 a 100%|máscara não reinalante|cateter nasal de alto fluxo}}. " +
            "Sequência rápida com {{medicações e doses}}. Laringoscopia {{laringoscopia|direta com lâmina reta|direta com lâmina curva|com videolaringoscópio}} nº {{lâmina}}, Cormack-Lehane {{cormack|I|II|III|IV}}. " +
            "Introduzida cânula {{cânula|com cuff|sem cuff}} nº {{nº da cânula}}, fixada em {{fixação}} cm na rima labial, em {{tentativas}} tentativa(s). " +
            "Posição confirmada por expansão torácica simétrica, ausculta pulmonar simétrica e ausente em epigástrio{{capnografia|, e capnografia com curva presente|}}. Iniciada ventilação mecânica. {{controle|Solicitada radiografia de tórax para controle da posição|Radiografia de tórax já realizada, com cânula bem posicionada}}. Procedimento {{intercorrências|sem intercorrências|com intercorrência: descrever}}."
    },
    {
        id: "intraosseo", ic: "osso", cor: "#ff9f0a", nome: "Acesso intraósseo",
        texto: "Procedimento: acesso intraósseo, indicado por {{indicação|parada cardiorrespiratória|choque sem acesso venoso periférico após tentativas|emergência sem acesso venoso}}. " +
            "Antissepsia com clorexidina alcoólica. Punção em {{local|tíbia proximal direita|tíbia proximal esquerda|úmero proximal direito|úmero proximal esquerdo|fêmur distal direito|fêmur distal esquerdo}}, com {{dispositivo|agulha intraóssea manual|dispositivo intraósseo a bateria}} {{calibre}}, em {{tentativas}} tentativa(s). " +
            "Posição confirmada por perda de resistência, agulha firme sem apoio, aspiração de medula e infusão de soro sem resistência e sem extravasamento. Fixação e observação do membro. Procedimento sem intercorrências."
    },
    {
        id: "drenagem_toracica", ic: "pulmao_dreno", cor: "#30b0a0", nome: "Drenagem torácica",
        texto: "Procedimento: drenagem torácica fechada à {{lado|direita|esquerda}}, indicada por {{indicação|pneumotórax|derrame pleural|empiema|hemotórax}}. Responsável orientado sobre indicação, riscos e possíveis complicações. " +
            "Paciente em decúbito {{posição|dorsal com o membro superior abduzido|lateral}}. Paramentação estéril completa, antissepsia com clorexidina alcoólica e campos estéreis. Anestesia local com lidocaína {{anestesia}}. " +
            "{{técnica|Incisão no 5º espaço intercostal, linha axilar média, borda superior da costela inferior, dissecção romba até a pleura|Punção pela técnica de Seldinger no 5º espaço intercostal, linha axilar média}}, e inserção de dreno nº {{nº do dreno}} Fr. " +
            "Saída de {{conteúdo|ar|líquido seroso|líquido purulento|sangue}}, volume drenado: {{volume em mL}}. Dreno conectado a selo d'água, com oscilação presente. Fixado na pele com {{fixação}} e curativo. {{tentativas}} tentativa(s). Solicitada radiografia de tórax para controle. Procedimento sem intercorrências."
    },
    {
        id: "toracocentese", ic: "pulmao_agulha", cor: "#34c759", nome: "Toracocentese",
        texto: "Procedimento: toracocentese {{finalidade|diagnóstica|de alívio|diagnóstica e de alívio}} à {{lado|direita|esquerda}}, indicada por derrame pleural. Responsável orientado sobre indicação, riscos e possíveis complicações. " +
            "Paciente {{posição|sentado com tronco inclinado para frente|em decúbito lateral}}. Higienização das mãos, luvas estéreis, antissepsia com clorexidina alcoólica e campo estéril. {{guia|Local definido por ultrassom|Local definido por exame físico e radiografia}}. Anestesia local com lidocaína. " +
            "Punção na borda superior da costela, em {{espaço intercostal}}, com {{dispositivo|cateter sobre agulha|agulha}} {{calibre}}, em {{tentativas}} tentativa(s). Retirados {{volume}} mL de líquido de aspecto {{aspecto|citrino|turvo|purulento|sero-hemorrágico}}, enviado para {{exames solicitados}}. " +
            "Curativo oclusivo. {{controle|Solicitada radiografia de tórax de controle|Sem radiografia de controle}}. Procedimento sem intercorrências."
    },
    {
        id: "sutura", ic: "sutura", cor: "#af52de", nome: "Sutura de ferimento",
        texto: "Procedimento: sutura de ferimento {{tipo|corto-contuso|cortante|lácero-contuso}} em {{local}}, medindo cerca de {{tamanho}} cm, {{profundidade|superficial|até o subcutâneo|com acometimento muscular}}. " +
            "Higienização das mãos, luvas estéreis, antissepsia com {{antisséptico|clorexidina|PVPI}} e campo estéril. Anestesia local com lidocaína {{anestesia}}. Irrigação abundante com soro fisiológico e revisão da ferida, {{revisão|sem corpo estranho e sem lesão de estruturas profundas|com retirada de corpo estranho}}. " +
            "Sutura com fio {{fio|nylon|categute (absorvível)|poliglactina (absorvível)}} {{espessura|6-0|5-0|4-0|3-0}}, {{pontos}} pontos {{técnica|simples|em U|intradérmicos}}. Curativo. {{vacina|Situação vacinal antitetânica em dia|Prescrita profilaxia antitetânica}}. Orientada retirada dos pontos em {{dias}} dias. Procedimento sem intercorrências."
    },
    {
        id: "sondagem_vesical", ic: "gota", cor: "#ffcc00", nome: "Cateterismo vesical",
        texto: "Procedimento: cateterismo vesical {{finalidade|de alívio para coleta de urina|de demora}}, indicado por {{indicação}}. Responsável orientado. " +
            "Higienização das mãos, luvas estéreis, antissepsia da região genital com {{antisséptico|clorexidina aquosa|PVPI tópico}} e campo estéril. Lubrificação com gel {{gel|anestésico (lidocaína)|não anestésico}}. " +
            "Introduzida sonda {{sonda|uretral|Foley}} nº {{nº da sonda}} Fr, com saída de urina de aspecto {{aspecto|límpido|turvo|hematúrico}}{{coleta|, coletada amostra para urina tipo 1 e urocultura|}}. {{retirada|Sonda retirada após a coleta|Sonda mantida, com balão insuflado com água destilada}}. Procedimento sem intercorrências."
    }
];

// Ícones de traço (mesmo modelo da tela inicial: INICIO_ICONES + inQuad), um por procedimento.
const PROC_ICONES = {
    coluna: '<rect x="8" y="2.5" width="8" height="4" rx="1.5"/><rect x="8" y="10" width="8" height="4" rx="1.5"/><rect x="8" y="17.5" width="8" height="4" rx="1.5"/><path d="M12 6.5V10M12 14v3.5M3 12h5"/>',
    cateter: '<path d="M4 20c4-1 6-4 7-8s3-7 9-8"/><path d="M14 4h6v6"/><circle cx="4" cy="20" r="1.5"/>',
    via_aerea: '<path d="M9 3v6a3 3 0 0 0 6 0V3"/><path d="M12 12v4M12 16l-5 4M12 16l5 4"/>',
    osso: '<path d="M8.5 6.5 17.5 15.5"/><path d="M6 9a2.5 2.5 0 1 1 3-3 2.5 2.5 0 1 1 3 3M15 18a2.5 2.5 0 1 0 3-3 2.5 2.5 0 1 0 3-3" transform="translate(-3 0)"/>',
    pulmao_dreno: '<path d="M12 4v8M12 8c-2-2-6 0-6 5v5c0 2 2 2 3 1l3-3M12 8c2-2 6 0 6 5v5c0 2-2 2-3 1"/><path d="M19 15h3"/>',
    pulmao_agulha: '<path d="M12 4v8M12 8c-2-2-6 0-6 5v5c0 2 2 2 3 1l3-3M12 8c2-2 6 0 6 5v5c0 2-2 2-3 1l-3-3"/><path d="m21 11-5 3"/>',
    sutura: '<path d="M3 12h18"/><path d="M6 8l2 8M11 8l2 8M16 8l2 8"/>',
    gota: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5"/>'
};
function procIcone(x) {
    if (typeof inQuad !== "function" || typeof INICIO_ICONES === "undefined") return "";
    let k = "proc_" + x.ic;
    if (!INICIO_ICONES[k]) INICIO_ICONES[k] = PROC_ICONES[x.ic] || "";
    return inQuad(k, x.cor);
}

// ----- tela -----
let procAtual = null;

function procCampos(texto) {
    let n = 0;
    return texto.replace(/\{\{([^}]*)\}\}/g, (m, dentro) => {
        let partes = dentro.split("|"), rotulo = partes[0], id = "pc" + (n++);
        let e = escaparHtml;
        if (partes.length > 1) {
            let ops = partes.slice(1).map(o => `<option value="${e(o)}">${e(o) || "(nada)"}</option>`).join("");
            return `<select class="proc-campo" data-rotulo="${e(rotulo)}" id="${id}" title="${e(rotulo)}"><option value="" disabled selected>${e(rotulo)}</option>${ops}</select>`;
        }
        return `<input class="proc-campo" data-rotulo="${e(rotulo)}" id="${id}" placeholder="${e(rotulo)}" size="${Math.max(6, rotulo.length)}" autocomplete="off">`;
    });
}

// A página abre DENTRO da tela inicial (mesma tarja, logo, lateral e barra de baixo): troca só o conteúdo central
// (pedido do Dr. Jonas, 11/2026: toda página com o mesmo padrão da tela inicial).
let procEscutando = false;
function abrirProcedimentos() {
    if (typeof mostrarInicio === "function") mostrarInicio();
    let tela = document.getElementById("tela-inicio");
    if (!tela) return;
    if (!procEscutando) {
        procEscutando = true;
        tela.addEventListener("click", procClique);
        tela.addEventListener("input", procAtualizarFalta);
        tela.addEventListener("change", procAtualizarFalta);
    }
    procAtual = null;
    procDesenhar();
}

function fecharProcedimentos() {
    procAtual = null;
    if (typeof montarInicio === "function") montarInicio();
    window.scrollTo(0, 0);
}

// Página própria, como a Prescrição e as Condutas (pedido do Dr. Jonas, 11/2026): sem a lateral da tela inicial,
// com o subtítulo do app ("Prescrição e condutas médicas") e só o "🏠 Início" para voltar. Tudo isso se
// desfaz sozinho quando a tela inicial é montada de novo (montarInicio troca todo o conteúdo).
function procModoPagina() {
    let tela = document.getElementById("tela-inicio"); if (!tela) return;
    let corpo = tela.querySelector(".in-corpo"); if (corpo) corpo.classList.add("pag-proc");
    tela.querySelectorAll(".in-band small, .in-logo-cel small").forEach(el => { el.textContent = "Prescrição e condutas médicas"; });
    let abaInicio = tela.querySelector(".in-tab button.on"); if (abaInicio) { abaInicio.classList.remove("on"); abaInicio.dataset.acao = "fechar"; }
}

function procDesenhar() {
    let main = document.querySelector("#tela-inicio main"), e = escaparHtml;
    if (!main) return;
    let p = PROCEDIMENTOS.find(x => x.id === procAtual);
    procModoPagina();
    /* "🏠 Início" no mesmo estilo das Condutas; dentro de um procedimento, "‹ Procedimentos" volta à lista */
    let inicio = `<div class="cond-inicio-linha"><button type="button" class="cond-btn-inicio" data-acao="fechar" title="Voltar à tela inicial"><span aria-hidden="true">🏠</span>Início</button></div>`;
    let topo = inicio + (p ? `<button type="button" class="proc-voltar" data-acao="lista">‹ Procedimentos</button>` : "") + `<h1>${p ? e(p.nome) : "Descrição de procedimentos"}</h1>`;
    if (!p) {
        /* lista igual à da tela inicial: quadradinho colorido com ícone, nome e › */
        let linhas = PROCEDIMENTOS.map(x => `<button type="button" class="in-row" data-proc="${x.id}">${procIcone(x)}<div class="in-tx">${e(x.nome)}</div><span class="in-d">${typeof inIcone === "function" ? inIcone("seta") : "›"}</span></button>`).join("");
        main.innerHTML = `<div class="proc-corpo">${topo}<p class="proc-dica">Escolha o procedimento. O texto vem pronto: preencha só os campos em vermelho e copie para o prontuário.</p><div class="in-lista proc-lista">${linhas}</div>
            <p class="proc-aviso">Modelos de apoio: confira e ajuste ao que foi feito. Não digite nome nem dado que identifique o paciente. Nada fica salvo.</p></div>`;
    } else {
        main.innerHTML = `<div class="proc-corpo">${topo}<div class="proc-texto" id="procTexto">${procCampos(p.texto)}</div>
        <div class="proc-acoes"><button type="button" class="proc-prox" data-acao="proximo">Próximo campo <span id="procFalta"></span></button><button type="button" class="proc-copiar" data-acao="copiar">Copiar texto</button></div>
        <p class="proc-aviso">Campo em vermelho = falta preencher. Não digite nome nem dado que identifique o paciente.</p></div>`;
        procAtualizarFalta();
        let primeiro = main.querySelector(".proc-campo"); if (primeiro && !(typeof ehCelular === "function" && ehCelular())) primeiro.focus();
    }
    window.scrollTo(0, 0); main.scrollTop = 0;
}

function procFaltando() {
    return [...document.querySelectorAll("#procTexto .proc-campo")].filter(c => !c.value.trim() && !(c.tagName === "SELECT" && c.selectedIndex > 0));
}
function procAtualizarFalta() {
    let campos = document.querySelectorAll("#procTexto .proc-campo");
    campos.forEach(c => c.classList.toggle("ok", !!c.value.trim() || (c.tagName === "SELECT" && c.selectedIndex > 0)));
    let f = document.getElementById("procFalta"); if (f) f.textContent = `(${procFaltando().length})`;
}

function procTextoFinal() {
    let caixa = document.getElementById("procTexto"); if (!caixa) return "";
    let copia = caixa.cloneNode(true);
    let originais = caixa.querySelectorAll(".proc-campo");
    copia.querySelectorAll(".proc-campo").forEach((c, k) => {
        let o = originais[k], v = o.value.trim();
        c.replaceWith(document.createTextNode(v || (o.tagName === "SELECT" && o.selectedIndex > 0 ? "" : "[" + o.dataset.rotulo + "]")));
    });
    return copia.textContent.replace(/[ \t]+/g, " ").replace(/ ([.,])/g, "$1").trim();
}

function procClique(ev) {
    let b = ev.target.closest("[data-acao],[data-proc]"); if (!b) return;
    if (b.dataset.proc) { procAtual = b.dataset.proc; procDesenhar(); return; }
    let a = b.dataset.acao;
    if (a === "fechar") fecharProcedimentos();
    else if (a === "lista") { procAtual = null; procDesenhar(); }
    else if (a === "proximo") { let f = procFaltando()[0]; if (f) { f.focus(); f.scrollIntoView({ block: "center", behavior: "smooth" }); } }
    else if (a === "copiar") {
        let falta = procFaltando().length;
        if (falta && !confirm(`Faltam ${falta} campo(s). Copiar assim mesmo? Os campos vazios saem entre colchetes.`)) return;
        let t = procTextoFinal();
        let ok = () => { b.textContent = "✓ Copiado"; setTimeout(() => { b.textContent = "Copiar texto"; }, 1500); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok).catch(() => procCopiarAntigo(t, ok));
        else procCopiarAntigo(t, ok);
    }
}
function procCopiarAntigo(t, ok) {
    let area = document.createElement("textarea"); area.value = t; document.body.appendChild(area); area.select();
    try { document.execCommand("copy"); ok(); } catch (e) { alert("Não foi possível copiar."); }
    area.remove();
}

// Item na tela inicial (Pediatria), logo depois de "Exame físico e orientações".
if (procedimentosAtivo() && typeof INICIO_PEDIATRIA !== "undefined" && !INICIO_PEDIATRIA.some(i => i.d === "procedimentos")) {
    INICIO_ICONES.agulha = '<path d="m18 3 3 3M16.5 4.5l3 3M19 6l-9.5 9.5-3-3L16 3"/><path d="m7.5 13.5-3 3 3 3 3-3M4.5 19.5 3 21"/>';
    let pos = INICIO_PEDIATRIA.findIndex(i => i.d === "exame") + 1;
    INICIO_PEDIATRIA.splice(pos, 0, { d: "procedimentos", ic: "agulha", cor: "#5856d6", t: "Descrição de procedimentos", s: "Modelos prontos para o prontuário" });
    if (typeof irDoInicio === "function") {
        let original = irDoInicio;
        window.irDoInicio = function (destino) {
            if (destino === "procedimentos") { abrirProcedimentos(); return; }
            return original.apply(this, arguments);
        };
    }
}
