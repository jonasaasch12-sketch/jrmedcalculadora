// =====================================================
// CARDS AGRUPADOS (pedido do Dr. Jonas, 10/2026)
// =====================================================
// Na Prescrição, os cards de um mesmo remédio usados em doenças diferentes viram UM card só,
// com o nome do remédio, e a doença é escolhida numa lista (começa em branco, só o nome das doenças).
// Os cards de cada doença continuam existindo em farmaciaJR (cada um com a sua dose):
// as condutas e a receita usam o card da doença escolhida.
//
// opcoes: { via (só para os botões IM/EV), rotulo (doença), id (card em farmaciaJR),
//           dose (só injetáveis): (p, i, calc) => texto da linha "DOSE: ..." que vai no FINAL da receita,
//           variantes (no lugar de id, quando a doença tem mais de um frasco/via): [{ rotulo, id, dose }]
//           → ao tocar na doença aparece a fila "Frasco / via" }

// "DOSE: 50 MG/KG/DOSE" ou, quando o teto corta a dose, "DOSE: 1 G (DOSE MÁXIMA)".
// Mesma conta dos cards: Math.min(peso × mg/kg, teto).
function textoDoseMgKg(p, mgkg, teto, intervalo) {
    let ate = intervalo ? ` ${intervalo}` : "";
    if (p * mgkg > teto) return `${String(teto / 1000).replace('.', ',')} G/DOSE${ate} (DOSE MÁXIMA)`;
    return `${String(mgkg).replace('.', ',')} MG/KG/DOSE${ate}`;
}
const doseCef = (mgkg, teto) => (p) => `DOSE: ${textoDoseMgKg(p, mgkg, teto)}.`;
const doseCef2 = (a, b) => (p) => `DOSE: ${textoDoseMgKg(p, a[0], a[1], a[2])} OU ${textoDoseMgKg(p, b[0], b[1], b[2])}.`;

const GRUPOS_CARDS = {
    ceftriaxona: {
        nome: "Ceftriaxona",
        apres: "FA 500 mg / 1 g",
        vias: [{ via: "IM", rotulo: "💉 IM" }, { via: "EV", rotulo: "🩸 EV" }],
        opcoes: [
            { via: "IM", rotulo: "Otite média aguda", id: "cef_oma", dose: doseCef(50, 1000) },
            { via: "IM", rotulo: "Sinusite bacteriana aguda", id: "cef_sinusite", dose: doseCef(50, 1000) },
            { via: "IM", rotulo: "Febre sem sinais localizatórios", id: "cef_fssl", dose: doseCef(50, 2000) },
            { via: "IM", rotulo: "Disenteria", id: "cef_disenteria", dose: doseCef(75, 2000) },
            { via: "IM", rotulo: "Pneumonia", id: "cef_resp_im", dose: doseCef2([100, 2000, "24/24H"], [50, 1000, "12/12H"]) },
            { via: "IM", rotulo: "Quimioprofilaxia meningocócica", id: "cef_profilaxia_meningo",
              dose: (p, i, calc) => `DOSE: ${String(calc.v).toUpperCase()} (DOSE FIXA).` },

            { via: "EV", rotulo: "Meningite / doença meningocócica", id: "cef_meningo", dose: doseCef(50, 2000) },
            { via: "EV", rotulo: "Celulite orbitária", id: "cef_orbitaria", dose: doseCef(50, 2000) },
            { via: "EV", rotulo: "Sepse / choque séptico", id: "cef_sepse", dose: doseCef2([50, 2000, "12/12H"], [100, 4000, "24/24H"]) },
            { via: "EV", rotulo: "Pielonefrite / ITU febril", id: "urina_ceft", dose: doseCef2([50, 1000, "12/12H"], [100, 2000, "24/24H"]) },
            { via: "EV", rotulo: "Pneumonia", id: "cef_resp_ev", dose: doseCef2([100, 2000, "24/24H"], [50, 1000, "12/12H"]) },
            { via: "EV", rotulo: "Erisipela", id: "cef_erisipela", dose: doseCef(62.5, 2000) }
        ]
    },
    cefalexina: {
        nome: "Cefalexina Suspensão",
        apres: "250 mg / 5 mL",
        // Via oral: sem linha de dose na receita (pedido do Dr. Jonas).
        opcoes: [
            { rotulo: "Impetigo", id: "cefalexina_impetigo" },
            { rotulo: "Cistite / ITU", id: "urina_cefa" },
            { rotulo: "Erisipela", id: "cefalexina_erisipela" },
            { rotulo: "Celulite", id: "cefalexina_celulite" }
        ]
    }
};

GRUPOS_CARDS.amoxicilina = {
    nome: "Amoxicilina Suspensão",
    apres: "250 mg/5 mL ou 400 mg/5 mL",
    opcoes: [
        { rotulo: "Erisipela", id: "amox_erisipela" },
        { rotulo: "Faringoamigdalite", id: "amox_faringo" },
        { rotulo: "Otite média aguda", id: "amox_oma" },
        { rotulo: "Pneumonia", variantes: [
            { rotulo: "250 mg/5 mL (8/8h)", id: "amox" },
            { rotulo: "400 mg/5 mL (12/12h)", id: "amox400" }
        ] },
        { rotulo: "Sinusite", id: "amox_sinusite" }
    ]
};
GRUPOS_CARDS.amoxiclav = {
    nome: "Amoxicilina + Clavulanato",
    apres: "400+57 · 250+62,5 · EV 1 g",
    opcoes: [
        { rotulo: "Erisipela", id: "clav_erisipela" },
        { rotulo: "ITU", id: "urina_clav" },
        { rotulo: "Otite média aguda", id: "clav_oma" },
        { rotulo: "Pneumonia", variantes: [
            { rotulo: "VO 400+57 (12/12h)", id: "clav" },
            { rotulo: "🩸 EV (hospital)", id: "amoxclav_ev", dose: doseCef(25, 1000) }
        ] },
        { rotulo: "Sinusite", id: "clav_sinusite" }
    ]
};

// Cada doença ganha uma chave (o id do card, ou "v<n>" quando tem variantes).
Object.keys(GRUPOS_CARDS).forEach(g => GRUPOS_CARDS[g].opcoes.forEach((o, n) => { o.chave = o.id || ('v' + n); }));

// Todos os cards de um grupo: [{ opcao, variante, id }]
function itensDoGrupo(grupo) {
    let lista = [];
    GRUPOS_CARDS[grupo].opcoes.forEach(o => {
        if (o.variantes) o.variantes.forEach(v => lista.push({ opcao: o, variante: v, id: v.id }));
        else lista.push({ opcao: o, variante: null, id: o.id });
    });
    return lista;
}
function acharNoGrupo(grupo, id) { return itensDoGrupo(grupo).find(x => x.id === id) || null; }

// id do card da doença → nome do grupo
const GRUPO_DO_CARD = {};
Object.keys(GRUPOS_CARDS).forEach(g => itensDoGrupo(g).forEach(x => { GRUPO_DO_CARD[x.id] = g; }));
