// =====================================================
// PELE — cards com cat: "cat-pele"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    "pele_larva": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "larva migrans bicho geografico tiabendazol albendazol pele ambulatorial", nome: "Larva Migrans (Tópico + Sistêmico)", apres: "Tiabendazol 5% + Albendazol",
        info: "<strong>Conduta:</strong> Tiabendazol pomada + Albendazol oral.", badgeSt: "static-blue", badge: "Tópico + Oral", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => { 
            let alb = (parseFloat(p) >= 40 || parseFloat(i) >= 12) ? "ALBENDAZOL 400 MG ---------------------- 3 CP\nTOMAR 01 COMPRIMIDO 1X AO DIA POR 3 DIAS." : "ALBENDAZOL 400 MG/10ML ---------------------- 1 FR\nDAR 10 ML 1X AO DIA POR 3 DIAS.";
            return { v: "Tópico + Oral", r: `USO TÓPICO E ORAL\n\n1) TIABENDAZOL 5% POMADA ---------------------- 1 TUBO\nAPLICAR NA LESÃO DE 6/6H POR 5 DIAS.\n\n2) ${alb}` }; 
        },
        detalhes: {
            indicacao: "Larva migrans cutânea (bicho geográfico).",
            dose: "Tiabendazol pomada de 6/6h por 5 dias + albendazol 400 mg 1x ao dia por 3 dias.",
            atencao: "Albendazol para maiores de 2 anos."
        }
    },
    "pele_delta": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "deltametrina piolho pediculose shampoo cabelo pele ambulatorial tópica", nome: "Deltametrina Shampoo", apres: "Uso Tópico Capilar",
        info: "<strong>Conduta:</strong> 10 min no cabelo por 4 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) DELTAMETRINA SHAMPOO --------------------------------- 1 FR\nAPLICAR NOS CABELOS, DEIXAR AGIR 10 MIN E ENXAGUAR, POR 4 DIAS SEGUIDOS.` }),
        detalhes: {
            indicacao: "Pediculose (piolho).",
            dose: "Aplicar nos cabelos por 4 dias seguidos.",
            atencao: "Passar pente fino depois. Tratar os contactantes."
        }
    },
    "pele_perme_shampoo": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "permetrina shampoo 1% piolho pediculose cabelo pele ambulatorial tópica", nome: "Permetrina Shampoo 1% (Pediculose)", apres: "Uso Tópico Capilar",
        info: "<strong>Conduta:</strong> 10 min no cabelo. Repetir em 7 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) PERMETRINA SHAMPOO A 1% --------------------------------- 1 FR\nAPLICAR NOS CABELOS, DEIXAR AGIR POR 10 MIN E ENXAGUAR. REPETIR APÓS 7 DIAS.` }),
        detalhes: {
            indicacao: "Pediculose (piolho).",
            dose: "Aplicar 1 vez e repetir após 7 dias.",
            atencao: "Passar pente fino depois. Tratar os contactantes."
        }
    },
    "pele_perme": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "permetrina loção 5% sarna escabiose coceira pele ambulatorial tópica", nome: "Permetrina Loção 5% (Escabiose)", apres: "Loção Tópica",
        info: "<strong>Conduta:</strong> Abaixo do pescoço à noite. Repetir em 7 dias. A partir de 2 meses.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => {
            // SBP (Ectoparasitoses): permetrina 5% é a 1ª escolha na escabiose, a partir de 2 meses de idade.
            if (i !== "" && parseFloat(i) < 0.17) return { v: "Contraind.", r: "ATENÇÃO: Permetrina 5% indicada a partir de 2 meses de idade (SBP)." };
            return { v: "Uso Tópico", r: `USO TÓPICO\n\n1) PERMETRINA LOÇÃO A 5% --------------------------------- 1 FR\nAPLICAR NO CORPO ABAIXO DO PESCOÇO ANTES DE DORMIR, RETIRAR AO ACORDAR. REPETIR EM 7 DIAS.` };
        },
        detalhes: {
            indicacao: "Escabiose (sarna).",
            dose: "Aplicar à noite e repetir após 7 dias.",
            atencao: "A partir de 2 meses de idade. 1ª escolha na escabiose (eficácia de 90-98% com 8-12 h de contato). Tratar todos da casa ao mesmo tempo. Lavar roupas e roupas de cama em água quente."
        },
        ficha: {
            indicacoes: "Escabiose (1ª escolha).",
            dose: "Escabiose: aplicar em todo o corpo abaixo do pescoço, em todas as lesões, à noite, e retirar no banho ao acordar (8-12 horas de contato); repetir em 7 dias",
            apresentacoes: "Loção/creme 5%.",
            via: "Tópica.",
            contraindicacoes: "Menores de 2 meses de idade.",
            alertasPediatricos: "Eficácia de 90-98% com 8-12 horas de contato. A permetrina 5% não tem eficácia na pediculose.",
            fonteRevisao: "SBP - Documento Científico Ectoparasitoses: https://www.sbp.com.br/fileadmin/user_upload/22734c-DC-Ectoparasitoses.pdf - consultado em out/2026."
        }
    },
    "pele_iver": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "ivermectina comprimido sarna escabiose pele oral ambulatorial", nome: "Ivermectina 6 mg (Escabiose Oral)", apres: "Comprimido",
        info: "<strong>Conduta:</strong> Dose única por peso. >5 anos e >15 kg. Reservada a casos graves ou refratários.", badge: "> 5 anos e > 15 kg", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => { 
            // SBP (Ectoparasitoses): só para maiores de 5 anos e 15 kg; reservada às formas graves ou refratárias ao tratamento tópico.
            if (i !== "" && parseFloat(i) <= 5) return { v: "Contraind.", r: "ATENÇÃO: Ivermectina indicada apenas para maiores de 5 anos e 15 kg (SBP). Preferir permetrina 5% tópica." };
            let c = "Contraind.", t = "VERIFICAR CONTRAINDICAÇÃO (<15 kg).";
            if (p >= 15 && p <= 25) { c = "0.5 cp"; t = "TOMAR MEIO COMPRIMIDO VIA ORAL, DOSE ÚNICA. REPETIR EM 14 DIAS."; }
            else if (p > 25 && p <= 45) { c = "1 cp"; t = "TOMAR 01 COMPRIMIDO VIA ORAL, DOSE ÚNICA. REPETIR EM 14 DIAS."; }
            else if (p > 45) { c = "2 cp"; t = "TOMAR 02 COMPRIMIDOS VIA ORAL, DOSE ÚNICA. REPETIR EM 14 DIAS."; }
            return { v: c, r: `${recHead}1) IVERMECTINA 6 MG -------------------------------------- 1 CX\n${t}` }; 
        },
        detalhes: {
            indicacao: "Escabiose (sarna) e outras parasitoses.",
            dose: "15-25 kg: ½ cp | 26-45 kg: 1 cp | >45 kg: 2 cp. Dose única, repetir em 14 dias.",
            atencao: "Contraindicada abaixo de 15 kg ou 5 anos. Reservada às formas graves de escabiose ou refratárias ao tratamento tópico (SBP); a permetrina 5% é a 1ª escolha."
        },
        ficha: {
            indicacoes: "Escabiose grave ou refratária ao tratamento tópico. Tem indicação em bula para pediculose.",
            dose: "Escabiose grave ou refratária: 200 mcg/kg VO em dose única, repetir em 14 dias\n15-25 kg: ½ comprimido\n26-45 kg: 1 comprimido\n> 45 kg: 2 comprimidos",
            apresentacoes: "Comprimido 6 mg.",
            via: "Oral.",
            contraindicacoes: "Crianças com 5 anos ou menos ou com 15 kg ou menos.",
            alertasPediatricos: "Deve ter as indicações limitadas às formas mais graves de escabiose ou refratárias ao tratamento tópico: há relatos de efeitos adversos graves e a segurança em crianças não está bem estabelecida. A permetrina 5% tópica é o tratamento de 1ª escolha.",
            fonteRevisao: "SBP - Documento Científico Ectoparasitoses: https://www.sbp.com.br/fileadmin/user_upload/22734c-DC-Ectoparasitoses.pdf - consultado em out/2026."
        }
    },
    "pele_escabiose_orient": {
        cat: "cat-pele", sub: "Orientações",
        kw: "escabiose sarna orientacoes familia contactantes ubs lavar ferver roupas ferro colchao sofa ivermectina permetrina",
        nome: "Orientações — Escabiose (Família)", apres: "Termo de Orientação",
        info: "<strong>Descrição:</strong> Tratamento de todos os contactantes e cuidados com roupas, colchão e sofá.",
        badgeSt: "static-blue", badge: "Orientações", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Orientações", r: "ORIENTAÇÕES - ESCABIOSE (SARNA): TRATAMENTO DE TODA A FAMÍLIA\n\n1) TRATAR TODOS DA CASA AO MESMO TEMPO:\n- Todas as pessoas que moram na casa e os contatos próximos devem ser tratados no mesmo dia, mesmo quem não tem coceira.\n- Procurar a UBS para que seja prescrito o tratamento de todos os contactantes.\n- Repetir o tratamento conforme a receita: permetrina após 7 dias, ivermectina após 14 dias.\n\n2) ROUPAS E OBJETOS:\n- Lavar e ferver todas as roupas de cama, de banho e de uso pessoal por 3 dias consecutivos.\n- Secar ao sol e passar ferro quente em todas as roupas.\n- Passar ferro quente no colchão, no sofá e em outros estofados.\n- O que não puder ser lavado (bichos de pelúcia, almofadas, sapatos) deve ficar fechado em saco plástico por 7 dias.\n- Não compartilhar roupas, toalhas e roupas de cama.\n\n3) CUIDADOS:\n- Manter as unhas curtas e limpas e evitar coçar, para não infeccionar as lesões.\n- A coceira pode continuar por até 2 a 4 semanas depois do tratamento. Isso não quer dizer que o tratamento falhou.\n\nRETORNAR SE:\n- Lesões com pus, vermelhidão que aumenta ou febre;\n- Coceira ou lesões novas depois de 4 semanas do tratamento." })
    },
    "pele_mupi": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "mupirocina pomada impetigo bacteriana pele ambulatorial tópica", nome: "Mupirocina 2% Creme (Impetigo)", apres: "Creme Tópico",
        info: "<strong>Conduta:</strong> Aplicar de 8/8h por 8 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) MUPIROCINA 2% CREME ----------------------------------- 1 BISNAGA\nLAVAR COM ÁGUA E SABÃO E APLICAR DE 8/8 HORAS POR 8 DIAS.` }),
        detalhes: {
            indicacao: "Impetigo e infecções bacterianas superficiais da pele.",
            dose: "Aplicar de 8/8h por 8 dias.",
            atencao: "Lesões extensas podem precisar de antibiótico oral."
        }
    },
    "pele_nista": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "nistatina moniliase sapinho oral bochecha pele ambulatorial tópica", nome: "Nistatina Solução Oral (Sapinho)", apres: "100.000 UI / mL",
        info: "<strong>Conduta:</strong> Aplicar 4x ao dia por 14 dias.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = p <= 12 ? "1.0 mL" : "2.5 mL"; return { v: v, r: `USO LOCAL ORAL\n\n1) NISTATINA SOLUÇÃO ORAL 100.000 UI/ML ----------------- 1 FR\nAPLICAR ${v} COM GAZE NAS BOCHECHAS E LÍNGUA 4 VEZES AO DIA POR 14 DIAS.` }; },
        detalhes: {
            indicacao: "Candidíase oral (sapinho).",
            dose: "≤12 kg: 1 mL | >12 kg: 2,5 mL. 4 vezes ao dia por 14 dias.",
            atencao: "Manter por alguns dias depois que as placas sumirem. Higienizar bicos e chupetas."
        }
    },
    "pele_acicl": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "aciclovir varicela catapora herpes pomada pele ambulatorial tópica oral", nome: "Aciclovir Pomada Dermatológica", apres: "Pomada",
        info: "<strong>Conduta:</strong> Aplicar de 4/4h por 5 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) ACICLOVIR POMADA DERMATOLÓGICA ------------------ 1 BISNAGA\nAPLICAR SOBRE AS LESÕES DE 4 EM 4 HORAS DURANTE 5 DIAS.` }),
        detalhes: {
            indicacao: "Herpes labial e lesões herpéticas de pele.",
            dose: "Aplicar de 4/4h por 5 dias.",
            atencao: "Melhor resultado se iniciado logo nos primeiros sintomas."
        }
    },
    "pele_trok": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "trok trok pomada creme corticoide pele ambulatorial topica", nome: "Trok", apres: "Cetoconazol + Dipropionato de Betametasona Tópico",
        info: "<strong>Conduta:</strong> Fina camada 12/12h por 5 dias. (Max 2 semanas).", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) TROK -------------------------------------- 1 BISNAGA\nAPLICAR FINA CAMADA 12/12h POR 5 DIAS.` }),
        detalhes: {
            indicacao: "Dermatites com infecção fúngica associada.",
            dose: "Fina camada de 12/12h por 5 dias.",
            atencao: "Contém corticoide: máximo 2 semanas. Evitar no rosto e na área da fralda por tempo prolongado."
        }
    },
    "pele_trokg": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "trok-g trokg pomada creme corticoide pele ambulatorial topica", nome: "Trok-G", apres: "Creme",
        info: "<strong>Conduta:</strong> Fina camada 1-2x/dia (Max 2 semanas).", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) TROK-G -------------------------------------- 1 BISNAGA\nAPLICAR FINA CAMADA 1 A 2 VEZES AO DIA (MÁXIMO 2 SEMANAS).` }),
        detalhes: {
            indicacao: "Dermatites com infecção fúngica ou bacteriana associada.",
            dose: "Fina camada 1 a 2 vezes ao dia.",
            atencao: "Contém corticoide: máximo 2 semanas. Evitar no rosto e na área da fralda por tempo prolongado."
        }
    },
    "trok_n": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "trok n cetoconazol betametasona neomicina creme pomada dermatite micose", nome: "Trok-N", apres: "Cetoconazol + Betametasona + Neomicina",
        info: "<strong>Conduta:</strong> Aplicar na lesão 3 vezes ao dia por 10 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) TROK-N -------------------------------------- 1 TUBO\nAPLICAR NA LESÃO 3 VEZES AO DIA POR 10 DIAS.` }),
        detalhes: {
            indicacao: "Dermatites com infecção fúngica/bacteriana associada.",
            dose: "Aplicar 3x/dia por 10 dias.",
            atencao: "Contém corticoide."
        }
    },
    "quadriderm": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "quadriderm creme betametasona gentamicina tolnaftato clioquinol dermatite", nome: "Quadriderm Creme", apres: "Creme",
        info: "<strong>Conduta:</strong> Aplicar 2 vezes ao dia por 5 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) QUADRIDERM CREME ---------------------------- 1 TUBO\nAPLICAR 2 VEZES AO DIA POR 5 DIAS.` }),
        detalhes: {
            indicacao: "Dermatites com infecção associada.",
            dose: "Aplicar 2x/dia por 5 dias.",
            atencao: "Contém corticoide."
        }
    },
    "cetoconazol_cr": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "cetoconazol creme micose antifungico tinea candidiase pele", nome: "Cetoconazol Creme", apres: "Creme 2%",
        info: "<strong>Conduta:</strong> Aplicar 2 vezes ao dia por 14 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) CETOCONAZOL CREME --------------------------- 1 TUBO\nAPLICAR 2 VEZES AO DIA POR 14 DIAS.` }),
        detalhes: {
            indicacao: "Micoses cutâneas.",
            dose: "Aplicar 2x/dia por 14 dias.",
            atencao: "—"
        }
    },
    "nistatina_zinco": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "nistatina oxido de zinco pomada dermatite das fraldas assadura candidiase", nome: "Nistatina + Óxido de Zinco Pomada", apres: "Pomada",
        info: "<strong>Conduta:</strong> Aplicar 3 vezes ao dia por 7 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) NISTATINA + ÓXIDO DE ZINCO POMADA ----------- 1 TUBO\nAPLICAR 3 VEZES AO DIA POR 7 DIAS.` }),
        detalhes: {
            indicacao: "Dermatite das fraldas.",
            dose: "Aplicar 3x/dia por 7 dias.",
            atencao: "—"
        }
    },
    "penvir": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "penvir penciclovir pomada herpes labial", nome: "Penvir Pomada (Penciclovir)", apres: "Pomada",
        info: "<strong>Conduta:</strong> Aplicar nas lesões de 8/8h por 7 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) PENVIR POMADA ------------------------------- 1 TUBO\nAPLICAR NAS LESÕES DE 8/8 HORAS POR 7 DIAS.` }),
        detalhes: {
            indicacao: "Herpes labial.",
            dose: "Aplicar nas lesões de 8/8h por 7 dias.",
            atencao: "—"
        }
    },
    "fluconazol": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "fluconazol 150 mg antifungico candidiase dose unica", nome: "Fluconazol 150 mg (Diluído)", apres: "Cápsula 150 mg",
        info: "<strong>Conduta:</strong> 3 mg/kg VO dose única. Diluir a cápsula em 10 mL (15 mg/mL).", badge: "Máx: 150 mg", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let mg = Math.min(p * 3, 150), ml = mg / 15;
            return { v: `${ml.toFixed(1)} mL`, r: `${recHead}1) FLUCONAZOL 150 MG ---------------------------------- 1 CP\nABRIR/DILUIR 1 CÁPSULA EM 10 ML DE ÁGUA (CADA ML = 15 MG) E DAR ${ml.toFixed(1)} ML (${mg.toFixed(0)} MG), VIA ORAL, DOSE ÚNICA.` };
        },
        detalhes: {
            indicacao: "Candidíase (antifúngico oral).",
            dose: "3 mg/kg VO dose única; cápsula diluída em 10 mL (15 mg/mL).",
            atencao: "Máximo 150 mg (cápsula inteira)."
        }
    }
});
