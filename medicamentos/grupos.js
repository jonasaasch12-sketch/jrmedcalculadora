// =====================================================
// CARDS AGRUPADOS (pedido do Dr. Jonas, 10/2026)
// =====================================================
// Na Prescrição, os cards de um mesmo remédio usados em doenças diferentes viram UM card só,
// com o nome do remédio, e a doença é escolhida numa lista (começa em branco).
// Os cards de cada doença continuam existindo em farmaciaJR (cada um com a sua dose):
// as condutas e a receita usam o card da doença escolhida.
//
// opcoes: { via (só para os botões IM/EV), regime (título do grupo na lista: o esquema de dose),
//           rotulo (doença), id (card em farmaciaJR), dose (linha "DOSE: ..." que entra na receita) }

const GRUPOS_CARDS = {
    ceftriaxona: {
        nome: "Ceftriaxona",
        apres: "FA 500 mg / 1 g",
        vias: [{ via: "IM", rotulo: "💉 IM" }, { via: "EV", rotulo: "🩸 EV" }],
        opcoes: [
            { via: "IM", regime: "50 mg/kg/dose, 1x ao dia", rotulo: "Otite média aguda (1 a 3 dias)", id: "cef_oma",
              dose: "DOSE: 50 MG/KG/DOSE IM, 1 VEZ AO DIA (MÁX. 1 G/DOSE)." },
            { via: "IM", regime: "50 mg/kg/dose, 1x ao dia", rotulo: "Sinusite bacteriana aguda (dose única)", id: "cef_sinusite",
              dose: "DOSE: 50 MG/KG/DOSE IM, DOSE ÚNICA (MÁX. 1 G)." },
            { via: "IM", regime: "50 mg/kg/dose, 1x ao dia", rotulo: "Febre sem sinais localizatórios", id: "cef_fssl",
              dose: "DOSE: 50 MG/KG/DOSE IM, 1 VEZ AO DIA (MÁX. 2 G/DIA)." },
            { via: "IM", regime: "50 a 100 mg/kg/dose, 1x ao dia", rotulo: "Disenteria (EV se < 3 meses ou grave)", id: "cef_disenteria",
              dose: "DOSE: 50 A 100 MG/KG/DOSE, 1 VEZ AO DIA, POR 3 A 5 DIAS (MÁX. 2 G/DIA)." },
            { via: "IM", regime: "100 mg/kg/dia (24/24h ou 12/12h)", rotulo: "Pneumonia (7 dias)", id: "cef_resp_im",
              dose: "DOSE: 100 MG/KG/DOSE DE 24/24H OU 50 MG/KG/DOSE DE 12/12H (MÁX. 2 G/DIA)." },
            { via: "IM", regime: "Dose fixa (sem peso)", rotulo: "Quimioprofilaxia meningocócica (contatos)", id: "cef_profilaxia_meningo",
              dose: "DOSE: 125 MG (< 12 ANOS) OU 250 MG (≥ 12 ANOS) IM, DOSE ÚNICA." },

            { via: "EV", regime: "50 mg/kg/dose de 12/12h (100 mg/kg/dia)", rotulo: "Meningite / doença meningocócica (7 dias)", id: "cef_meningo",
              dose: "DOSE: 50 MG/KG/DOSE EV DE 12/12H = 100 MG/KG/DIA (MÁX. 2 G/DOSE)." },
            { via: "EV", regime: "50 mg/kg/dose de 12/12h (100 mg/kg/dia)", rotulo: "Celulite orbitária (2 a 3 semanas)", id: "cef_orbitaria",
              dose: "DOSE: 50 MG/KG/DOSE EV DE 12/12H = 100 MG/KG/DIA (MÁX. 2 G/DOSE)." },
            { via: "EV", regime: "100 mg/kg/dia (12/12h ou 24/24h)", rotulo: "Sepse / choque séptico", id: "cef_sepse",
              dose: "DOSE: 50 MG/KG/DOSE DE 12/12H OU 100 MG/KG/DOSE DE 24/24H (MÁX. 4 G/DIA)." },
            { via: "EV", regime: "100 mg/kg/dia (12/12h ou 24/24h)", rotulo: "Pielonefrite / ITU febril", id: "urina_ceft",
              dose: "DOSE: 50 MG/KG/DOSE DE 12/12H OU 100 MG/KG/DOSE DE 24/24H (MÁX. 2 G/DIA)." },
            { via: "EV", regime: "100 mg/kg/dia (12/12h ou 24/24h)", rotulo: "Pneumonia (7 dias)", id: "cef_resp_ev",
              dose: "DOSE: 100 MG/KG/DOSE DE 24/24H OU 50 MG/KG/DOSE DE 12/12H (MÁX. 2 G/DIA)." },
            { via: "EV", regime: "50 a 75 mg/kg/dia", rotulo: "Erisipela (formas moderadas a graves)", id: "cef_erisipela",
              dose: "DOSE: 50 A 75 MG/KG/DOSE DE 24/24H (OU METADE DE 12/12H) (MÁX. 2 G/DOSE)." }
        ]
    },
    cefalexina: {
        nome: "Cefalexina Suspensão",
        apres: "250 mg / 5 mL",
        opcoes: [
            { regime: "25 a 50 mg/kg/dia, de 6/6h", rotulo: "Impetigo / infecção de pele (7 a 10 dias)", id: "cefalexina_impetigo",
              dose: "DOSE: 6,25 A 12,5 MG/KG/DOSE DE 6/6H = 25 A 50 MG/KG/DIA (MÁX. 500 MG/DOSE)." },
            { regime: "50 a 100 mg/kg/dia, de 6/6h", rotulo: "Cistite / ITU baixa (7 dias)", id: "urina_cefa",
              dose: "DOSE: 12,5 A 25 MG/KG/DOSE DE 6/6H = 50 A 100 MG/KG/DIA (MÁX. 500 MG/DOSE)." },
            { regime: "50 a 100 mg/kg/dia, de 6/6h", rotulo: "Erisipela (5 dias)", id: "cefalexina_erisipela",
              dose: "DOSE: 12,5 A 25 MG/KG/DOSE DE 6/6H = 50 A 100 MG/KG/DIA (MÁX. 500 MG/DOSE)." },
            { regime: "25 a 100 mg/kg/dia, de 6/6h", rotulo: "Celulite (7 a 14 dias)", id: "cefalexina_celulite",
              dose: "DOSE: 6,25 A 25 MG/KG/DOSE DE 6/6H = 25 A 100 MG/KG/DIA (MÁX. 500 MG/DOSE)." }
        ]
    }
};

// id do card da doença → nome do grupo
const GRUPO_DO_CARD = {};
Object.keys(GRUPOS_CARDS).forEach(g => GRUPOS_CARDS[g].opcoes.forEach(o => { GRUPO_DO_CARD[o.id] = g; }));
