// =====================================================
// ANTIBIÓTICOS — cards com cat: "cat-antibioticos"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    "cef_fssl": {
        cat: "cat-antibioticos", sub: "🏥 Uso Hospitalar / UBS (Vias Injetáveis)",
        kw: "ceftriaxona febre sem sinais localizatorios fssl bacteremia oculta im intramuscular antibiotico injetavel",
        nome: "Ceftriaxona IM (Febre sem Sinais Localizatórios)", apres: "FA 1 g + 3,5 mL Lidocaína 1%",
        info: "<strong>Conduta (SBP):</strong> risco de bacteremia oculta (3 a 36 meses): 50 mg/kg IM 1x/dia, com reavaliação diária até o final das culturas.", badge: "Teto: 2 g/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* SBP (Tratado 2017 / DC nº 206, 2025): 50 mg/kg IM 1x/dia. IM: 1 g + 3,5 mL de lidocaína 1% (285,7 mg/mL). Teto do app: 2 g/dia. */
            let mg = Math.min(p * 50, 2000), ml = mg / 285.7, fa = mg > 1000 ? 2 : 1;
            return { v: `IM: ${ml.toFixed(1)} mL`, r: `VIA INTRAMUSCULAR (FEBRE SEM SINAIS LOCALIZATÓRIOS - RISCO DE BACTEREMIA OCULTA)\n\n Reconstituir ${fa} FA de Ceftriaxona 1 g com 3,5 mL de lidocaína 1% cada.\n Aspirar ${ml.toFixed(1)} mL (${mg.toFixed(0)} mg = 50 mg/kg) e aplicar IM profunda, 1 vez ao dia.\n\n * Colher hemocultura antes da 1ª dose. Reavaliação diária até o resultado final das culturas.` };
        },
        detalhes: {
            indicacao: "Febre sem sinais localizatórios, 3 a 36 meses, vacinação incompleta, Tax > 39 °C, leucócitos ≥ 20.000 ou neutrófilos ≥ 10.000 e RX de tórax normal (risco de bacteremia oculta).",
            dose: "50 mg/kg IM 1 vez ao dia, com reavaliação diária até o final das culturas (SBP).",
            atencao: "Colher hemocultura antes. Teto do app: 2 g/dia."
        }
    },
    "amox": {
        cat: "cat-antibioticos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "amoxicilina suspensao pneumonia faringo antibiotico oral ambulatorial", nome: "Amoxicilina Suspensão (Regular)", apres: "250 mg / 5 mL",
        info: "<strong>Posologia:</strong> 50 mg/kg/dia de 8/8h por 7 dias.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = round05((p * 50 * 5) / 750); return { v: v + " mL", r: `${recHead}1) AMOXICILINA SUSPENSÃO 250 MG/5ML ---------- 1 FR\nDAR ${v} ML, VIA ORAL, DE 8/8 HORAS POR 7 DIAS.` }; },
        detalhes: {
            indicacao: "Pneumonia, otite média aguda e faringoamigdalite bacteriana.",
            dose: "50 mg/kg/dia VO de 8/8h por 7 dias.",
            atencao: "Perguntar sobre alergia a penicilina."
        }
    },
    "amox400": {
        cat: "cat-antibioticos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "amoxicilina suspensao 400 oral ambulatorial antibiotico", nome: "Amoxicilina Suspensão (12h)", apres: "400 mg / 5 mL",
        info: "<strong>Posologia:</strong> 50 mg/kg/dia de 12/12h por 7 dias.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = round05((p * 50 * 5) / 800); return { v: v + " mL", r: `${recHead}1) AMOXICILINA SUSPENSÃO 400 MG/5ML ---------- 1 FR\nDAR ${v} ML, VIA ORAL, DE 12/12 HORAS POR 7 DIAS.` }; },
        detalhes: {
            indicacao: "Pneumonia, otite média aguda e faringoamigdalite bacteriana.",
            dose: "50 mg/kg/dia VO de 12/12h por 7 dias.",
            atencao: "Perguntar sobre alergia a penicilina. Concentração diferente da suspensão de 250 mg/5 mL."
        }
    },
    "clav": {
        cat: "cat-antibioticos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "amoxicilina clavulanato clavulin pneumonia otite antibiotico oral ambulatorial", nome: "Amoxicilina + Clavulanato", apres: "400 mg + 57 mg / 5 mL",
        info: "<strong>Posologia:</strong> 45 mg/kg/dia de 12/12h por 7 dias.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = round05((p * 45 * 5) / 800); return { v: v + " mL", r: `${recHead}1) AMOXICILINA + CLAVULANATO 400+57 MG/5ML - 1 FR\nDAR ${v} ML, VIA ORAL, DE 12/12 HORAS POR 7 DIAS.` }; },
        detalhes: {
            indicacao: "Pneumonia, otite e sinusite com falha à amoxicilina.",
            dose: "45 mg/kg/dia VO de 12/12h por 7 dias.",
            atencao: "Perguntar sobre alergia a penicilina. Pode causar diarreia."
        }
    },
    "benza": {
        cat: "cat-antibioticos", sub: "🏥 Uso Hospitalar / UBS (Vias Injetáveis)", 
        kw: "penicilina benzatina benzetacil faringite amigdalite antibiotico im", nome: "Penicilina Benzatina (Benzetacil)", apres: "600k e 1.2M UI",
        info: "<strong>Conduta:</strong> 50.000 UI/kg/dose IM única. 11-27kg: 600k | >27kg: 1.2M.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { 
            let u = p * 50000; let f = u > 1200000 ? "1.200.000 UI" : u > 600000 ? "600.000 UI" : u.toLocaleString() + " UI";
            let q = p > 27 ? "1 FA (1.200.000 UI)" : "1 FA (600.000 UI)";
            return { v: f, r: `VIA INTRAMUSCULAR (UBS / HOSPITAL)\n\n APLICAR ${q} DE PENICILINA BENZATINA (BENZETACIL) IM. AGUARDAR 40 MINUTOS EM OBSERVAÇÃO.` }; 
        },
        detalhes: {
            indicacao: "Faringoamigdalite estreptocócica (dose única).",
            dose: "50.000 UI/kg IM, dose única. ≤27 kg: 600.000 UI | >27 kg: 1.200.000 UI.",
            atencao: "Perguntar sobre alergia a penicilina. Manter em observação por 40 minutos."
        }
    },
    "cefadroxila": {
        cat: "cat-antibioticos", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "cefadroxila cefamox antibiotico suspensao capsula oral pele faringite amigdalite", nome: "Cefadroxila", apres: "Suspensão 250 mg/5 mL | Cápsula 500 mg",
        info: "<strong>Posologia:</strong> <12a: 12,5-25 mg/kg 12/12h | ≥12a: 1-2 g/dia em 2 tomadas.", badge: "Máx: 1 g/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            // Whitebook: <12 anos 12,5-25 mg/kg/dose VO de 12/12h (suspensão 250 mg/5 mL = 50 mg/mL); ≥12 anos 1-2 g/dia em 2 tomadas.
            if (i !== "" && parseFloat(i) >= 12) return { v: "500 mg-1 g", r: `${recHead}1) CEFADROXILA 500 MG CÁPSULA ------------- 1 CX\nTOMAR 1 A 2 CÁPSULAS (500 MG A 1 G), VIA ORAL, DE 12/12 HORAS, POR 10 DIAS.` };
            let min = Math.min(parseFloat(round05(p * 12.5 / 50)), 20).toFixed(1), max = Math.min(parseFloat(round05(p * 25 / 50)), 20).toFixed(1);
            return { v: `${min}-${max} mL`, r: `${recHead}1) CEFADROXILA SUSPENSÃO 250 MG/5 ML ------ 1 FR\nDAR ${min} A ${max} ML (12,5 A 25 MG/KG), VIA ORAL, DE 12/12 HORAS, POR 10 DIAS.` };
        },
        detalhes: {
            indicacao: "Faringite ou amigdalite estreptocócica beta-hemolítica.",
            dose: "<12 anos: 12,5-25 mg/kg/dose VO de 12/12h. ≥12 anos: 1-2 g/dia em 2 tomadas (cápsula 500 mg). Faringoamigdalite: por 10 dias.",
            atencao: "Máximo 1 g por dose. Perguntar sobre alergia a cefalosporinas."
        },
        ficha: {
            indicacoes: "Faringite ou amigdalite estreptocócica beta-hemolítica.",
            dose: "< 12 anos (suspensão oral): 12,5-25 mg/kg VO de 12/12 horas\n≥ 12 anos: 1-2 g/dia VO em 2 tomadas de 12/12 horas, ou em dose única diária\nFaringite ou amigdalite estreptocócica beta-hemolítica (≥ 12 anos, cápsula): 1 g/dia VO em dose única ou de 12/12 horas, por 7-10 dias",
            doseMaxima: "≥ 12 anos: 2 g/dia.",
            apresentacoes: "Suspensão oral; cápsula (indicada para ≥ 12 anos).",
            via: "Oral.",
            intervalo: "12/12 horas ou dose única diária.",
            fonteRevisao: "Whitebook (Afya) - Medicamentos/Bulário: Cefadroxila, atualizado em 13/02/2025."
        }
    },
    "pen_v": {
        cat: "cat-antibioticos", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "penicilina v pen-ve-oral fenoximetilpenicilina faringite otite estreptococo solucao oral", nome: "Penicilina V Solução (Pen-Ve-Oral)", apres: "80.000 UI / mL",
        info: "<strong>Posologia:</strong> 5-12a: 40.000 UI/kg/dia de 12/12h por 10 dias | ≥12a: 2,5-6,3 mL de 6/6 ou 8/8h.", badge: "Máx: 6,3 mL (500.000 UI)", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            // Whitebook: uso acima de 5 anos. 5-12a (infecções estreptocócicas, incluindo otite): 40.000 UI/kg/dia VO de 12/12h por 10 dias.
            // ≥12a (infecções estreptocócicas leves a moderadas): 2,5-6,3 mL (200.000-500.000 UI) VO de 6/6 ou 8/8h por 10 dias. Máx. 6,3 mL/dose.
            if (i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(i);
            if (id < 5) return { v: "Contraind.", r: "ATENÇÃO: Penicilina V indicada acima de 5 anos de idade." };
            if (id >= 12) return { v: "2,5-6,3 mL", r: `${recHead}1) PENICILINA V 80.000 UI/ML ---------------- 1 FR\nDAR 2,5 A 6,3 ML (200.000 A 500.000 UI), VIA ORAL, DE 6/6 OU 8/8 HORAS, POR 10 DIAS.` };
            let v = Math.min(parseFloat(round05(p * 0.25)), 6.3).toFixed(1);
            return { v: v + " mL", r: `${recHead}1) PENICILINA V 80.000 UI/ML ---------------- 1 FR\nDAR ${v} ML, VIA ORAL, DE 12/12 HORAS, POR 10 DIAS.` };
        },
        detalhes: {
            indicacao: "Infecções suscetíveis; infecções estreptocócicas (incluindo otite média); tratamento de faringoamigdalite para profilaxia de febre reumática; infecções pneumocócicas leves a moderadas; infecções estafilocócicas de pele e tecidos moles; angina de Vincent; prevenção de febre reumática.",
            dose: "5-12 anos: 40.000 UI/kg/dia VO de 12/12h por 10 dias. ≥12 anos: 2,5-6,3 mL (200.000-500.000 UI) de 6/6 ou 8/8h por 10 dias.",
            atencao: "Uso acima de 5 anos. Máximo 6,3 mL (500.000 UI) por dose. Para prevenção de febre reumática, preferir penicilina G benzatina."
        },
        ficha: {
            indicacoes: "Infecções suscetíveis; infecções estreptocócicas (incluindo otite média); tratamento de faringoamigdalite para profilaxia de febre reumática; infecções estreptocócicas leves a moderadas; infecções pneumocócicas leves a moderadas; infecções estafilocócicas de pele e tecidos moles; angina de Vincent (leves a moderadas); prevenção de febre reumática.",
            dose: "Infecções suscetíveis (5-12 anos): 25.000-90.000 unidades/kg/dia VO de 4/4, 6/6 ou 8/8 horas\nInfecções estreptocócicas, incluindo otite média (5-12 anos): 40.000 unidades/kg/dia VO de 12/12 horas, por 10 dias\nFaringoamigdalite para profilaxia de febre reumática (5-12 anos): 25.000-50.000 unidades/kg/dia VO de 8/8 ou 12/12 horas, por 10 dias\nInfecções estreptocócicas leves a moderadas (≥ 12 anos): 2,5-6,3 mL/dose (200.000-500.000 unidades) VO de 6/6 ou 8/8 horas, por 10 dias\nInfecções pneumocócicas, estafilocócicas de pele e tecidos moles e angina de Vincent (≥ 12 anos): 5-6,3 mL/dose (400.000-500.000 unidades) VO de 6/6 ou 8/8 horas\nPrevenção de febre reumática (≥ 12 anos): 5-6,3 mL VO de 12/12 horas, ininterruptamente",
            doseMaxima: "6,3 mL/dose (500.000 unidades/dose).",
            apresentacoes: "Comprimido 500.000 unidades; solução oral 80.000 unidades/mL.",
            via: "Oral.",
            alertasPediatricos: "Uso acima de 5 anos de idade. O uso de penicilina G benzatina deve ser preconizado para prevenção de febre reumática.",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Penicilina V, atualizado em 22/01/2026."
        }
    },
    "smx_tmp": {
        cat: "cat-antibioticos", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "sulfametoxazol trimetoprima bactrim smx tmp antibiotico suspensao itu infeccao urinaria", nome: "Sulfametoxazol + Trimetoprima (Bactrim)", apres: "200 + 40 mg / 5 mL (8 mg TMP/mL)",
        info: "<strong>Posologia (ITU):</strong> 8-12 mg TMP/kg/dia de 12/12h por 7-14 dias. Máx. 20 mL/dose.", badge: "Máx: 20 mL/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            // Whitebook (ITU): 8-12 mg de TMP/kg/dia VO de 12/12h, por 7-14 dias. Máximo 20 mL (160 mg TMP) por dose. A partir de 2 meses.
            if (i !== "" && parseFloat(i) < 0.17) return { v: "Contraind.", r: "ATENÇÃO: Sulfametoxazol + Trimetoprima a partir de 2 meses de idade." };
            let min = Math.min(parseFloat(round05(p * 4 / 8)), 20).toFixed(1), max = Math.min(parseFloat(round05(p * 6 / 8)), 20).toFixed(1);
            return { v: `${min}-${max} mL`, r: `${recHead}1) SULFAMETOXAZOL + TRIMETOPRIMA 200+40 MG/5 ML -- 1 FR\nDAR ${min} A ${max} ML, VIA ORAL, DE 12/12 HORAS, POR 7 A 14 DIAS.` };
        },
        detalhes: {
            indicacao: "Infecção do trato urinário.",
            dose: "8-12 mg de TMP/kg/dia VO de 12/12h, por 7 a 14 dias.",
            atencao: "Máximo 20 mL (160 mg de TMP) por dose. A partir de 2 meses. Perguntar sobre alergia a sulfa."
        },
        ficha: {
            indicacoes: "Infecção do trato urinário.",
            dose: "Infecção do trato urinário (> 2 meses): 8-12 mg TMP/kg/dia VO de 12/12 horas, por 7-14 dias",
            doseMaxima: "20 mL/dose (160 mg de TMP/dose).",
            apresentacoes: "Suspensão oral 200 mg + 40 mg/5 mL.",
            via: "Oral.",
            intervalo: "12/12 horas.",
            alertasPediatricos: "Uso a partir de 2 meses de idade.",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Sulfametoxazol + Trimetoprima, atualizado em 14/08/2025."
        }
    },
    "metronidazol_vo": {
        cat: "cat-antibioticos", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "metronidazol flagyl suspensao oral giardia ameba anaerobio antibiotico", nome: "Metronidazol Suspensão", apres: "40 mg / mL",
        info: "<strong>Posologia:</strong> 30-40 mg/kg/dia de 8/8h. Peso ÷ 3 mL por dose.", badge: "Máx: 500 mg/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let v = Math.min(parseFloat(round05(p / 3)), 12.5).toFixed(1); // teto 500 mg/dose (Whitebook)
            return { v: v + " mL", r: `${recHead}1) METRONIDAZOL SUSPENSÃO 40 MG/ML -------- 1 FR\nDAR ${v} ML, VIA ORAL, DE 8/8 HORAS.` };
        },
        detalhes: {
            indicacao: "Giardíase, amebíase (incluindo abscesso hepático amebiano) e infecções bacterianas anaeróbias; casos leves de infecções por Clostridioides (Clostridium) difficile; infecção de cateter de diálise peritoneal.",
            dose: "15-50 mg/kg/dia VO de 8/8h. O app calcula 40 mg/kg/dia (Peso ÷ 3 mL por dose).",
            atencao: "Máximo 500 mg por dose (12,5 mL). Na infecção por C. difficile, a vancomicina oral é preferida. Gosto metálico e náusea são comuns."
        },
        ficha: {
            indicacoes: "Giardíase, amebíase (incluindo abscesso hepático amebiano) e infecções bacterianas anaeróbias; casos leves de infecções por Clostridioides (Clostridium) difficile; infecção de cateter de diálise peritoneal.",
            dose: "Giardíase, amebíase e infecções anaeróbias: 15-50 mg/kg/dia VO de 8/8 horas\nCasos leves de C. difficile: 30 mg/kg/dia VO de 8/8 horas, por 10-14 dias\nInfecção de cateter de diálise peritoneal: 10 mg/kg/dose VO de 8/8 horas",
            doseMaxima: "C. difficile: 500 mg/dose. Diálise peritoneal: 1.500 mg/dose.",
            via: "Oral.",
            intervalo: "8/8 horas.",
            alertasPediatricos: "O uso em outras parasitoses, como trichomoníase, é raro em pediatria. Na indisponibilidade da fidaxomicina (atual tratamento de escolha), a vancomicina oral é preferida ao metronidazol para C. difficile em crianças, especialmente em casos moderados a graves.",
            ajusteRenal: "Não é necessário ajuste de dose em pacientes em diálise peritoneal contínua ambulatorial.",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Metronidazol, atualizado em 05/02/2026."
        }
    },
    "cipro_vo": {
        cat: "cat-antibioticos", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "ciprofloxacino cipro quinolona antibiotico comprimido oral itu infeccao urinaria", nome: "Ciprofloxacino VO", apres: "Comprimido 500 mg",
        info: "<strong>Posologia (ITU):</strong> 10-20 mg/kg/dose de 12/12h. Máx. 750 mg/dose.", badge: "Máx: 750 mg/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            // Whitebook (ITU): 10-20 mg/kg/dose VO de 12/12h, por 3-7 dias (cistite) ou 7-14 dias (pielonefrite). Máximo 750 mg/dose.
            let min = Math.min(p * 10, 750), max = Math.min(p * 20, 750);
            return { v: `${min.toFixed(0)}-${max.toFixed(0)} mg`, r: `${recHead}1) CIPROFLOXACINO 500 MG ------------------- 1 CX\nDAR ${min.toFixed(0)} A ${max.toFixed(0)} MG, VIA ORAL, DE 12/12 HORAS, POR 3 A 7 DIAS (CISTITE) OU 7 A 14 DIAS (PIELONEFRITE).` };
        },
        detalhes: {
            indicacao: "Infecção do trato urinário; profilaxia de doença meningocócica; doença por complexo Mycobacterium avium.",
            dose: "ITU: 10-20 mg/kg/dose VO de 12/12h, por 3-7 dias (cistite) ou 7-14 dias (pielonefrite). Profilaxia de doença meningocócica: 20 mg/kg em dose única (máx. 500 mg).",
            atencao: "Máximo 750 mg por dose. Suspender ao primeiro sinal de dor ou inflamação de tendão ou de neuropatia."
        },
        ficha: {
            indicacoes: "Infecção do trato urinário; profilaxia de doença meningocócica; doença por complexo Mycobacterium avium.",
            dose: "Infecção do trato urinário: 10-20 mg/kg/dose VO de 12/12 horas, por 3-7 dias (cistite) ou 7-14 dias (pielonefrite)\nProfilaxia de doença meningocócica: 20 mg/kg VO em dose única\nComplexo Mycobacterium avium: 10-15 mg/kg/dose VO de 12/12 horas (com outros antibióticos)",
            doseMaxima: "ITU e M. avium: 750 mg/dose. Profilaxia meningocócica: 500 mg.",
            apresentacoes: "Comprimido 500 mg; solução injetável 2 mg/mL.",
            via: "Oral.",
            intervalo: "12/12 horas.",
            alertasPediatricos: "O tratamento com fluoroquinolona deve ser descontinuado ao primeiro sinal de dor ou inflamação do tendão. Procurar atendimento imediato se houver sintomas de neuropatia (dor, queimação, formigamento, dormência ou fraqueza).",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Ciprofloxacino, atualizado em 10/11/2025."
        }
    },
    "amicacina": {
        cat: "cat-antibioticos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "amicacina aminoglicosideo antibiotico endovenoso hospitalar injetavel neutropenia", nome: "Amicacina EV", apres: "Ampola 100 mg / 2 mL (50 mg/mL)",
        info: "<strong>Conduta:</strong> 15 mg/kg/dia, 1x ao dia ou de 8/8h. Máx. 1,5 g/dia.", badge: "Máx: 1,5 g/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let dia = Math.min(p * 15, 1500), d8 = dia / 3;
            let op = (mg, h) => `Aspirar ${(mg / 50).toFixed(1)} mL (${mg.toFixed(0)} mg) e diluir em SF 0,9% até ${Math.ceil(mg / 5)} mL (5 mg/mL). Infundir em 30 a 60 min, de ${h}/${h}h.`;
            return { v: `24/24h: ${(dia / 50).toFixed(1)} mL\n8/8h: ${(d8 / 50).toFixed(1)} mL`, r: `VIA ENDOVENOSA (USO HOSPITALAR)\n\nOPÇÃO 1X AO DIA (15 MG/KG):\n ${op(dia, 24)}\n\nOPÇÃO 8/8H (5 MG/KG/DOSE):\n ${op(d8, 8)}` };
        },
        detalhes: {
            indicacao: "Infecções graves por gram-negativos e neutropenia febril (em associação).",
            dose: "15 mg/kg/dia EV, 1x ao dia ou dividido de 8/8h. Diluir a 5 mg/mL em SF 0,9%.",
            atencao: "Máximo 1,5 g/dia. Nefrotóxica e ototóxica: ajustar pelo clearance de creatinina."
        }
    },
    "cefalotina": {
        cat: "cat-antibioticos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "cefalotina keflin cefalotil cefalosporina primeira geracao antibiotico endovenoso intramuscular hospitalar injetavel", nome: "Cefalotina Sódica EV / IM", apres: "Pó para solução injetável 1 g",
        info: "<strong>Conduta:</strong> 20-40 mg/kg IM/EV de 6/6h OU 12-25 mg/kg IM/EV de 4/4h.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            // Whitebook (Pediatria): 20-40 mg/kg IM/EV de 6/6h OU 12-25 mg/kg IM/EV de 4/4h.
            // Reconstituição: EV 1 g em 10 mL AD (100 mg/mL); IM 1 g em 5 mL AD (200 mg/mL). Infusão: diluir em 100 mL de SF 0,9% ou SG 5%, em 30 min.
            let f = n => n.toFixed(1);
            let a1 = p * 20, a2 = p * 40, b1 = p * 12, b2 = p * 25;
            let nFA = Math.max(a2, b2) > 1000 ? "2 FA (1 g cada)" : "1 FA de 1 g";
            return { v: `6/6h: ${f(a1 / 100)}-${f(a2 / 100)} mL\n4/4h: ${f(b1 / 100)}-${f(b2 / 100)} mL`,
                r: `VIA ENDOVENOSA OU INTRAMUSCULAR (USO HOSPITALAR)\n\nOPÇÃO 6/6H (20 A 40 MG/KG/DOSE): ${a1.toFixed(0)} a ${a2.toFixed(0)} mg por dose.\nOPÇÃO 4/4H (12 A 25 MG/KG/DOSE): ${b1.toFixed(0)} a ${b2.toFixed(0)} mg por dose.\n\nEV: Reconstituir ${nFA} em 10 mL de água para injetáveis (100 mg/mL).\n 6/6h: aspirar ${f(a1 / 100)} a ${f(a2 / 100)} mL | 4/4h: aspirar ${f(b1 / 100)} a ${f(b2 / 100)} mL.\n Fazer EV direta em 3 a 5 minutos OU diluir em 100 mL de SF 0,9% ou SG 5% e infundir em 30 minutos.\n\nIM: Reconstituir em 5 mL de água para injetáveis (200 mg/mL).\n 6/6h: aspirar ${f(a1 / 200)} a ${f(a2 / 200)} mL | 4/4h: aspirar ${f(b1 / 200)} a ${f(b2 / 200)} mL.\n Injetar em grande massa muscular (face lateral da coxa).` };
        },
        detalhes: {
            indicacao: "Infecções do trato respiratório; infecções do trato geniturinário; infecções gastrointestinais; infecções da pele e dos tecidos moles; infecções ósseas e articulares; meningite; septicemia; profilaxia em cirurgias.",
            dose: "20-40 mg/kg IM/EV de 6/6h OU 12-25 mg/kg IM/EV de 4/4h. EV direta em 3-5 min ou infusão em 30 min.",
            atencao: "Reconstituir EV 1 g em 10 mL e IM 1 g em 5 mL de água para injetáveis. Infusão: diluir em 100 mL de SF 0,9% ou SG 5% (~9 mg/mL). Monitorar função renal."
        },
        ficha: {
            indicacoes: "Infecções do trato respiratório; infecções do trato geniturinário; infecções gastrointestinais; infecções da pele e dos tecidos moles; infecções ósseas e articulares; meningite; septicemia; profilaxia em cirurgias.",
            dose: "Dose usual: 20-40 mg/kg IM/EV de 6/6 horas\nOu: 12-25 mg/kg IM/EV de 4/4 horas",
            apresentacoes: "Pó para solução injetável 1 g. Nomes comerciais: Cefalotil®, Cefariston®, Kefalomax®, Keflin Neutro®.",
            via: "Endovenosa ou intramuscular.",
            intervalo: "6/6 horas ou 4/4 horas.",
            reconstituicao: "IM: 1 g em 5 mL de água para injetáveis. EV direta e infusão EV: 1 g em 10 mL de água para injetáveis.",
            diluicao: "Infusão EV: diluir em 100 mL de SF 0,9% ou SG 5%, obtendo concentração final de ~9 mg/mL.",
            infusao: "EV direta: 3-5 minutos. Infusão EV: durante 30 minutos. IM: injetar em grande massa muscular (face lateral da coxa).",
            alertasPediatricos: "Cefalosporina de 1ª geração. Monitoramento: função renal.",
            fonteRevisao: "Whitebook (Afya) - Medicamentos/Bulário: Cefalotina Sódica, atualizado em 21/01/2026."
        }
    },
    "cefepime": {
        cat: "cat-antibioticos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "cefepime maxcef cefalosporina 4 geracao antibiotico endovenoso hospitalar neutropenia febril", nome: "Cefepime EV", apres: "FA 1 g ou 2 g",
        info: "<strong>Conduta:</strong> 50 mg/kg/dose de 8/8h. Máx. 2 g/dose.", badge: "Máx: 2 g/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let mg = Math.min(p * 50, 2000), ml = mg / 100;
            return { v: ml.toFixed(1) + " mL", r: `VIA ENDOVENOSA (USO HOSPITALAR)\n\n Reconstituir o FA a 100 mg/mL (1 g em 10 mL de AD). Aspirar ${ml.toFixed(1)} mL (${mg.toFixed(0)} mg) e rediluir em SF 0,9% até ${Math.ceil(mg / 40)} mL (40 mg/mL). Infundir em 30 min, de 8/8 horas.` };
        },
        detalhes: {
            indicacao: "Neutropenia febril de alto risco e infecções hospitalares graves.",
            dose: "50 mg/kg/dose EV de 8/8h. Rediluir a 40 mg/mL e correr em 30 min.",
            atencao: "Máximo 2 g por dose. Ajustar pelo clearance de creatinina."
        }
    },
    "ceftazidima": {
        cat: "cat-antibioticos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "ceftazidima fortaz cefalosporina pseudomonas antibiotico endovenoso hospitalar neutropenia febril", nome: "Ceftazidima EV", apres: "FA 1 g ou 2 g",
        info: "<strong>Conduta:</strong> 100-150 mg/kg/dia de 8/8h. Máx. 6 g/dia.", badge: "Máx: 6 g/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let m100 = Math.min(p * 100 / 3, 2000), m150 = Math.min(p * 150 / 3, 2000);
            let op = mg => `Aspirar ${(mg / 100).toFixed(1)} mL (${mg.toFixed(0)} mg) do FA reconstituído a 100 mg/mL e rediluir em SF 0,9% até ${Math.ceil(mg / 40)} mL (40 mg/mL). Infundir em 20 min, de 8/8 horas.`;
            return { v: `100: ${(m100 / 100).toFixed(1)} mL\n150: ${(m150 / 100).toFixed(1)} mL`, r: `VIA ENDOVENOSA (USO HOSPITALAR)\n\nOPÇÃO 100 MG/KG/DIA:\n ${op(m100)}\n\nOPÇÃO 150 MG/KG/DIA (NEUTROPENIA FEBRIL):\n ${op(m150)}` };
        },
        detalhes: {
            indicacao: "Infecções por Pseudomonas e neutropenia febril de baixo risco (com amicacina).",
            dose: "100-150 mg/kg/dia EV de 8/8h. Rediluir a 40 mg/mL e correr em 20 min.",
            atencao: "Máximo 6 g/dia (2 g por dose). Ajustar pelo clearance de creatinina."
        }
    },
    "cipro_ev": {
        cat: "cat-antibioticos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "ciprofloxacino cipro quinolona antibiotico endovenoso hospitalar injetavel", nome: "Ciprofloxacino EV", apres: "Solução injetável 2 mg / mL",
        info: "<strong>Conduta:</strong> 10 mg/kg/dose EV de 8/8 ou 12/12h. Máx. 400 mg/dose.", badge: "Máx: 400 mg/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            // Whitebook: 10 mg/kg/dose EV de 8/8 ou 12/12h. Máximo 400 mg (200 mL) por dose. Sem diluição, correr em 60 min.
            let mg = Math.min(p * 10, 400), ml = (mg / 2).toFixed(1);
            return { v: ml + " mL", r: `VIA ENDOVENOSA (USO HOSPITALAR)\n\n Infundir ${ml} mL (${mg.toFixed(0)} mg) de Ciprofloxacino 2 mg/mL, sem diluir, em 60 minutos, de 8/8 ou 12/12 horas.` };
        },
        detalhes: {
            indicacao: "Infecções moderadas a graves; fibrose cística (exacerbação pulmonar); endocardite infecciosa; meningite ou ventriculite (agente alternativo); profilaxia para infecção por antraz por inalação (pós-exposição).",
            dose: "10 mg/kg/dose EV de 8/8 ou 12/12h. Fibrose cística: de 8/8h. Sem diluir, em 60 minutos.",
            atencao: "Máximo 400 mg (200 mL) por dose. Suspender ao primeiro sinal de dor ou inflamação de tendão ou de neuropatia."
        },
        ficha: {
            indicacoes: "Infecções moderadas a graves; fibrose cística (exacerbação pulmonar); endocardite infecciosa; meningite ou ventriculite (agente alternativo); profilaxia para infecção por antraz por inalação (pós-exposição).",
            dose: "Infecções moderadas a graves: 10 mg/kg/dose EV de 8/8 ou 12/12 horas\nFibrose cística (exacerbação pulmonar): 10 mg/kg/dose EV de 8/8 horas\nEndocardite infecciosa: 10-15 mg/kg/dose EV de 12/12 horas\nMeningite ou ventriculite: 10 mg/kg/dose EV de 8/8 horas ou 15 mg/kg/dose EV de 12/12 horas\nAntraz por inalação (pós-exposição): 10 mg/kg/dose EV de 12/12 horas",
            doseMaxima: "200 mL/dose (400 mg/dose).",
            apresentacoes: "Comprimido 500 mg; solução injetável 2 mg/mL.",
            via: "Endovenosa.",
            diluicao: "Sem diluição. Correr em 60 minutos.",
            infusao: "60 minutos.",
            alertasPediatricos: "Neonatos: dados limitados. O tratamento com fluoroquinolona deve ser descontinuado ao primeiro sinal de dor ou inflamação do tendão (como inchaço, dificuldade de caminhar). Os pacientes devem procurar atendimento médico imediato se apresentarem sintomas de neuropatia (dor, queimação, formigamento, dormência ou fraqueza).",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Ciprofloxacino, atualizado em 10/11/2025."
        }
    },
    "clindamicina": {
        cat: "cat-antibioticos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "clindamicina dalacin lincosamida antibiotico endovenoso intramuscular hospitalar injetavel osteoarticular osteomielite artrite septica pneumonia celulite erisipela pneumocistose", nome: "Clindamicina EV / IM", apres: "Solução injetável 150 mg / mL",
        info: "<strong>Conduta:</strong> 20-40 mg/kg/dia EV/IM de 6/6 ou 8/8h. Máx. 2.700 mg/dia.", badge: "Máx: 2.700 mg/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            // Whitebook (lactentes, crianças e adolescentes): dose usual 20-40 mg/kg/dia EV ou IM de 6/6 ou 8/8h. Máximo 18 mL/dia (2.700 mg/dia).
            // EV: diluir em SF ou SG 5% até 18 mg/mL e infundir em 10-60 min (máx. 30 mg/min). IM: sem diluir, máximo 600 mg/dose.
            let f = n => n.toFixed(2);
            let o6 = [Math.min(p * 5, 675), Math.min(p * 10, 675)], o8 = [Math.min(p * 20 / 3, 900), Math.min(p * 40 / 3, 900)];
            let ml = mg => mg / 150, tot = mg => mg / 18;
            let ev = (o, h) => `${h}/${h}H: aspirar ${f(ml(o[0]))} a ${f(ml(o[1]))} mL (${o[0].toFixed(0)} a ${o[1].toFixed(0)} mg) e completar com SF 0,9% até ${Math.ceil(tot(o[0]))} a ${Math.ceil(tot(o[1]))} mL (18 mg/mL).`;
            let im = (o, h) => `${h}/${h}H: ${f(ml(Math.min(o[0], 600)))} a ${f(ml(Math.min(o[1], 600)))} mL IM, sem diluir.`;
            return { v: `6/6h: ${f(ml(o6[0]))}-${f(ml(o6[1]))} mL\n8/8h: ${f(ml(o8[0]))}-${f(ml(o8[1]))} mL`,
                r: `CLINDAMICINA 150 MG/ML - DOSE USUAL 20 A 40 MG/KG/DIA (MÁXIMO 2.700 MG/DIA)\n\nVIA ENDOVENOSA:\n ${ev(o6, 6)}\n ${ev(o8, 8)}\n Infundir em 10 a 60 minutos (máximo 30 mg/minuto).\n\nVIA INTRAMUSCULAR (máximo 600 mg/dose):\n ${im(o6, 6)}\n ${im(o8, 8)}` };
        },
        detalhes: {
            indicacao: "Infecções osteoarticulares; pneumocistose; pneumonia adquirida na comunidade (sem ser por MRSA); infecções cutâneas (celulites, erisipelas).",
            dose: "Dose usual: 20-40 mg/kg/dia EV/IM de 6/6 ou 8/8h. Osteoarticulares: 30-40 mg/kg/dia de 6/6 ou 8/8h. PAC: 40 mg/kg/dia por 5-10 dias. Cutâneas: 25-40 mg/kg/dia de 8/8h. Pneumocistose: 40 mg/kg/dia de 6/6h com primaquina, 21 dias.",
            atencao: "Máximo 2.700 mg/dia (18 mL). EV: diluir a 18 mg/mL em SF ou SG 5%, infundir em 10-60 min (máx. 30 mg/min). IM: máximo 600 mg/dose. Cutâneas e pneumocistose: máximo 600 mg/dose; osteoarticulares: 900 mg/dose."
        },
        ficha: {
            indicacoes: "Infecções osteoarticulares; pneumocistose; pneumonia adquirida na comunidade (sem ser por MRSA); infecções cutâneas (celulites, erisipelas). VO: infecções leves a moderadas; malária; otite média; faringite por Streptococcus do grupo A; pneumocistose (quadros leves); pneumonia (quadros leves); impetigo (MRSA suspeito ou confirmado); infecções por MRSA (ex.: celulite ou erisipela).",
            dose: "Dose usual (EV ou IM): 20-40 mg/kg/dia de 6/6 ou 8/8 horas\nInfecções osteoarticulares: 30-40 mg/kg/dia EV de 6/6 ou 8/8 horas (≥ 2-3 semanas na artrite séptica; ≥ 3-4 semanas na osteomielite)\nPneumocistose: 40 mg/kg/dia EV de 6/6 horas com primaquina, por 21 dias\nPAC (sem MRSA): 40 mg/kg/dia EV de 6/6 ou 8/8 horas, por 5-10 dias\nInfecções cutâneas (celulites, erisipelas): 25-40 mg/kg/dia EV de 8/8 horas\nVO - infecções leves a moderadas: 10-40 mg/kg/dia de 8/8 horas\nVO - otite média: 30-40 mg/kg/dia de 6/6 ou 8/8 horas\nVO - faringite por Streptococcus do grupo A: 21 mg/kg/dia de 8/8 horas, por 10 dias\nVO - pneumonia leve: 30-40 mg/kg/dia de 6/6 ou 8/8 horas\nVO - impetigo (MRSA): 20 mg/kg/dia de 8/8 horas, por 7 dias\nVO - infecções por MRSA (celulite, erisipela): 30-40 mg/kg/dia de 6/6 ou 8/8 horas",
            doseMaxima: "EV: 18 mL/dia (2.700 mg/dia); osteoarticulares 900 mg/dose; pneumocistose e cutâneas 600 mg/dose. IM: 600 mg/dose. VO: 1.800 mg/dia (faringite 300 mg/dose; impetigo 400 mg/dose; MRSA 450 mg/dose; pneumocistose 300-450 mg/dose).",
            apresentacoes: "Comprimido 300 mg; solução injetável 150 mg/mL.",
            via: "Endovenosa, intramuscular ou oral.",
            diluicao: "Uso EV: diluir em SG 5% ou SF para concentração final de 6-18 mg/mL. Uso IM: não é necessária diluição.",
            infusao: "Infundir em 10-60 minutos (máximo: 30 mg/minuto).",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Clindamicina, atualizado em 30/10/2025."
        }
    },
    "meropenem": {
        cat: "cat-antibioticos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "meropenem meropenem meronem carbapenemico antibiotico endovenoso hospitalar meningite neutropenia febril fibrose cistica intra-abdominal", nome: "Meropeném EV", apres: "Frasco-ampola 500 mg, 1 g e 2 g",
        info: "<strong>Conduta (≥3 meses):</strong> 20 mg/kg/dose (máx. 1 g) ou 40 mg/kg/dose (máx. 2 g) EV de 8/8h.", badge: "Máx: 1 g ou 2 g/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            // Whitebook (lactentes ≥3 meses, crianças e adolescentes), EV de 8/8h:
            // 20 mg/kg/dose (máx. 1 g): neutropenia febril, intra-abdominais, cutâneas graves, anthrax cutânea (máx. 2 g).
            // 40 mg/kg/dose (máx. 2 g): meningite, anthrax sistêmica, exacerbação pulmonar de fibrose cística.
            // Reconstituir a 50 mg/mL e rediluir em SF 0,9% a 20 mg/mL. Infundir em 15-30 min.
            if (i !== "" && parseFloat(i) < 0.25) return { v: "< 3 meses", r: "ATENÇÃO: Em neonatos e lactentes menores de 3 meses a dose depende da idade gestacional e dos dias de vida. Consultar a tabela do Whitebook." };
            let f = n => n.toFixed(1);
            let a = Math.min(p * 20, 1000), b = Math.min(p * 40, 2000);
            let op = (mg, t) => `${t}:\n Aspirar ${f(mg / 50)} mL (${mg.toFixed(0)} mg) do frasco reconstituído (50 mg/mL) + ${f(mg / 20 - mg / 50)} mL de SF 0,9% (total ${f(mg / 20)} mL, 20 mg/mL). Infundir EV em 15 a 30 minutos, de 8/8 horas.`;
            return { v: `20: ${f(a / 50)} mL\n40: ${f(b / 50)} mL`, r: `VIA ENDOVENOSA (USO HOSPITALAR)\n\nRECONSTITUIÇÃO: 500 mg em 10 mL, 1 g em 20 mL ou 2 g em 40 mL de água para injeção (50 mg/mL).\n\n${op(a, "20 MG/KG/DOSE (NEUTROPENIA FEBRIL, INTRA-ABDOMINAIS, CUTÂNEAS GRAVES) - MÁX. 1 G")}\n\n${op(b, "40 MG/KG/DOSE (MENINGITE, FIBROSE CÍSTICA, ANTHRAX SISTÊMICA) - MÁX. 2 G")}` };
        },
        detalhes: {
            indicacao: "Infecções graves (intra-abdominais complicadas, pele, partes moles e meningite bacteriana); neutropenia febril; exacerbação pulmonar de fibrose cística; anthrax cutânea e sistêmica.",
            dose: "≥3 meses, EV de 8/8h: 20 mg/kg/dose (neutropenia febril, intra-abdominais, cutâneas graves) ou 40 mg/kg/dose (meningite, fibrose cística, anthrax sistêmica). Fibrose cística ≥8 anos: pode infundir em 3 horas.",
            atencao: "Máximo 1 g/dose no esquema de 20 mg/kg e 2 g/dose no de 40 mg/kg. Reconstituir a 50 mg/mL e rediluir a 1-20 mg/mL em SF 0,9% ou SG 5%, infundir em 15-30 min. Menores de 3 meses: dose por idade gestacional."
        },
        ficha: {
            indicacoes: "Antibiótico para infecções graves (intra-abdominais complicadas, pele, partes moles e meningite bacteriana); neutropenia febril; exacerbação pulmonar de fibrose cística; anthrax cutânea e sistêmica.",
            dose: "Neutropenia febril: 20 mg/kg/dose EV de 8/8 horas\nInfecções intra-abdominais: 20 mg/kg/dose EV de 8/8 horas\nInfecções cutâneas graves: 20 mg/kg/dose EV de 8/8 horas\nMeningite: 40 mg/kg/dose EV de 8/8 horas\nExacerbação pulmonar de fibrose cística: 40 mg/kg/dose EV de 8/8 horas (≥ 8 anos: pode infundir em 3 horas)\nAnthrax cutânea: 20 mg/kg/dose EV de 8/8 horas\nAnthrax sistêmica (incluindo meningite): 40 mg/kg/dose EV de 8/8 horas\nNeonatos e < 3 meses: conforme idade gestacional e dias de vida (20-40 mg/kg/dose de 8/8 ou 12/12 horas)",
            doseMaxima: "20 mg/kg/dose: 1 g/dose (anthrax cutânea 2 g/dose). 40 mg/kg/dose: 2 g/dose.",
            apresentacoes: "Frasco-ampola 500 mg, 1.000 mg e 2.000 mg.",
            via: "Endovenosa.",
            intervalo: "8/8 horas.",
            reconstituicao: "Reconstituir o frasco em água para injeção a 50 mg/mL (500 mg em 10 mL, 1.000 mg em 20 mL e 2.000 mg em 40 mL).",
            diluicao: "Rediluir em SF 0,9% ou SG 5% ou 10% para concentração final de 1-20 mg/mL.",
            infusao: "Infundir em 15-30 minutos.",
            alertasPediatricos: "O tempo de tratamento deve ser individualizado conforme o paciente, a doença tratada e o patógeno envolvido. Os dados sobre tempo de tratamento em lactentes menores de 3 meses são limitados.",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Meropeném, atualizado em 05/02/2026."
        }
    },
    "metronidazol_ev": {
        cat: "cat-antibioticos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "metronidazol flagyl anaerobio antibiotico endovenoso hospitalar injetavel", nome: "Metronidazol EV", apres: "5 mg / mL (solução pronta)",
        info: "<strong>Conduta:</strong> 30-40 mg/kg/dia de 8/8h. 2 x Peso em mL por dose.", badge: "Máx: 500 mg/dose (100 mL)", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let mg = Math.min(p * 10, 500), ml = (mg / 5).toFixed(1); // teto 500 mg/dose (Whitebook)
            return { v: ml + " mL", r: `VIA ENDOVENOSA (USO HOSPITALAR)\n\n Infundir ${ml} mL (${mg.toFixed(0)} mg) de Metronidazol 5 mg/mL (solução pronta, sem diluir) em 30 a 60 minutos, de 8/8 horas.` };
        },
        detalhes: {
            indicacao: "Prevenção cirúrgica; apendicite; infecções intra-abdominais.",
            dose: "30 mg/kg/dia EV (2 x Peso em mL por dose de 8/8h). Apendicite: 30 mg/kg/dia de 6/6h, por 7 dias somando EV e VO.",
            atencao: "Máximo 500 mg (100 mL) por dose. Solução pronta, sem diluir, em 30 a 60 minutos."
        },
        ficha: {
            indicacoes: "Prevenção cirúrgica; apendicite; infecções intra-abdominais.",
            dose: "Neonatal: ataque 15 mg/kg/dose EV; após 24 h, 7,5 mg/kg/dose; depois conforme a idade gestacional (23-34 semanas: 7,5 mg/kg/dose de 12/12 horas, iniciando 12 h após o ataque)\nPrevenção cirúrgica (< 1.200 g): 7,5 mg/kg/dose EV, 30-60 minutos antes da cirurgia\nPrevenção cirúrgica (≥ 1.200 g, neonatos e crianças): 15 mg/kg/dose EV, 30-60 minutos antes da cirurgia\nApendicite: 30 mg/kg/dia EV de 6/6 horas, por 7 dias (somando EV e VO)",
            doseMaxima: "500 mg/dose (100 mL/dose).",
            apresentacoes: "Frasco de 5 mg/mL.",
            via: "Endovenosa.",
            diluicao: "Não é necessária a diluição.",
            infusao: "Correr em 30-60 minutos. A infusão deve ser a uma velocidade de 5 mL por minuto.",
            alertasPediatricos: "O regime de escolha para apendicite não complicada em crianças é ceftriaxona associada a metronidazol, com transição para amoxicilina-clavulanato oral ou ciprofloxacino-metronidazol.",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Metronidazol, atualizado em 05/02/2026."
        }
    },
    "oxacilina": {
        cat: "cat-antibioticos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "oxacilina staphylococcus antibiotico endovenoso hospitalar injetavel pele celulite", nome: "Oxacilina EV", apres: "FA 500 mg",
        info: "<strong>Conduta:</strong> 150-200 mg/kg/dia de 4/4h ou 6/6h. Máx. 1 g/dose.", badge: "Máx: 1 g/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let mg = Math.min(p * 200 / 6, 1000), ml = mg / 100; // 200 mg/kg/dia de 4/4h
            return { v: ml.toFixed(1) + " mL", r: `VIA ENDOVENOSA (USO HOSPITALAR)\n\n Reconstituir o FA a 100 mg/mL (500 mg em 5 mL de AD). Aspirar ${ml.toFixed(1)} mL (${mg.toFixed(0)} mg) e rediluir em SF 0,9% até ${Math.ceil(mg / 10)} mL (10 mg/mL). Administrar de 4/4 horas.` };
        },
        detalhes: {
            indicacao: "Infecções por estafilococo sensível (pele, partes moles, ossos).",
            dose: "150-200 mg/kg/dia EV de 4/4h ou 6/6h. O app calcula 200 mg/kg/dia de 4/4h.",
            atencao: "Máximo 1 g por dose. Rediluir a 10 mg/mL em SF 0,9%."
        }
    },
    "pen_cristalina": {
        cat: "cat-antibioticos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "penicilina cristalina g potassica antibiotico endovenoso hospitalar sifilis meningite", nome: "Penicilina Cristalina EV", apres: "FA 5.000.000 UI (+ 8 mL AD = 500.000 UI/mL)",
        info: "<strong>Conduta:</strong> 200.000 UI/kg/dia de 6/6h. Máx. 24.000.000 UI/dia.", badge: "Máx: 24 milhões UI/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            let ui = Math.min(p * 50000, 6000000), ml = ui / 500000;
            let conc = (i !== "" && parseFloat(i) < 1) ? 50000 : 100000;
            return { v: ml.toFixed(2) + " mL", r: `VIA ENDOVENOSA (USO HOSPITALAR)\n\n Reconstituir 1 FA de 5.000.000 UI com 8 mL de AD (500.000 UI/mL). Aspirar ${ml.toFixed(2)} mL (${ui.toLocaleString('pt-BR')} UI) e rediluir em SF 0,9% até ${Math.ceil(ui / conc)} mL (${conc.toLocaleString('pt-BR')} UI/mL${conc === 50000 ? ", menor de 1 ano" : ""}). Administrar de 6/6 horas.` };
        },
        detalhes: {
            indicacao: "Sífilis congênita, meningite e infecções graves por germes sensíveis.",
            dose: "200.000 UI/kg/dia EV de 6/6h (Peso ÷ 10 mL do FA reconstituído).",
            atencao: "Máximo 24 milhões UI/dia. Rediluir: menor de 1 ano a 50.000 UI/mL, maior de 1 ano a 100.000 UI/mL."
        }
    },
    "vancomicina": {
        cat: "cat-antibioticos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "vancomicina vanco cloridrato glicopeptideo mrsa antibiotico endovenoso hospitalar meningite endocardite cateter neutropenia", nome: "Vancomicina EV", apres: "Frasco-ampola 500 mg e 1 g (reconstituído a 100 mg/mL)",
        info: "<strong>Conduta:</strong> Infecções suscetíveis 45-60 mg/kg/dia EV de 6/6 ou 8/8h. Ajustar pela concentração sérica.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            // Whitebook (lactentes, crianças e adolescentes) - infecções suscetíveis: 45-60 mg/kg/dia EV de 6/6 ou 8/8h, ajustar pela concentração sérica.
            // Reconstituir a 100 mg/mL (500 mg + 5 mL ou 1 g + 10 mL de diluente) e rediluir em SF 0,9% a 5 mg/mL. Infundir lentamente em 60 min.
            let f = n => n.toFixed(1);
            let o6 = [p * 45 / 4, p * 60 / 4], o8 = [p * 45 / 3, p * 60 / 3];
            let op = (o, h) => `${h}/${h}H: ${o[0].toFixed(0)} a ${o[1].toFixed(0)} mg = aspirar ${f(o[0] / 100)} a ${f(o[1] / 100)} mL e completar com SF 0,9% até ${Math.ceil(o[0] / 5)} a ${Math.ceil(o[1] / 5)} mL (5 mg/mL).`;
            return { v: `6/6h: ${f(o6[0] / 100)}-${f(o6[1] / 100)} mL\n8/8h: ${f(o8[0] / 100)}-${f(o8[1] / 100)} mL`,
                r: `VIA ENDOVENOSA (USO HOSPITALAR) - INFECÇÕES SUSCETÍVEIS (45 A 60 MG/KG/DIA)\n\nRECONSTITUIÇÃO: 500 mg + 5 mL ou 1 g + 10 mL de água para diluente (100 mg/mL).\n\n ${op(o6, 6)}\n ${op(o8, 8)}\n\n Infundir lentamente em 60 minutos. Ajustar conforme a concentração sérica.` };
        },
        detalhes: {
            indicacao: "Infecções suscetíveis; endocardite; meningite; infecções graves por MRSA; infecções cutâneas (necrotizantes e piomiosites).",
            dose: "Infecções suscetíveis: 45-60 mg/kg/dia de 6/6 ou 8/8h. Meningite: 60 mg/kg/dia de 6/6h. Endocardite: empírico 60 mg/kg/dia de 6/6h; estreptococo, enterococo e S. aureus 40 mg/kg/dia de 8/8 ou 12/12h, por 4-6 semanas. MRSA grave: 3 meses-12 anos 60-80 mg/kg/dia de 6/6h; ≥12 anos 60-70 mg/kg/dia de 6/6 ou 8/8h. Necrotizantes não MRSA: 10-13 mg/kg/dose de 8/8h.",
            atencao: "Máximo: endocardite 2 g/dia; MRSA grave e piomiosite 3,6 g/dia. Ajustar pela concentração sérica. Rediluir a 5 mg/mL e infundir lentamente em 60 min. Neonatos: dose por idade gestacional (ver Whitebook)."
        },
        ficha: {
            indicacoes: "Infecções suscetíveis; endocardite; meningite; infecções graves por MRSA; infecções cutâneas (infecções necrotizantes não MRSA; infecções necrotizantes e piomiosites MRSA).",
            dose: "Infecções suscetíveis: 45-60 mg/kg/dia EV de 6/6 ou 8/8 horas (ajustar pela concentração sérica)\nEndocardite (empírico): 60 mg/kg/dia EV de 6/6 horas, por 4-6 semanas, com outro antibiótico\nEndocardite (estreptococo, enterococo, S. aureus): 40 mg/kg/dia EV de 8/8 ou 12/12 horas, por 4-6 semanas\nMeningite: 60 mg/kg/dia EV de 6/6 horas\nInfecções graves por MRSA (3 meses-12 anos): 60-80 mg/kg/dia EV de 6/6 horas\nInfecções graves por MRSA (≥ 12 anos): 60-70 mg/kg/dia EV de 6/6 ou 8/8 horas\nInfecções necrotizantes não MRSA: 10-13 mg/kg/dose EV de 8/8 horas\nInfecções necrotizantes e piomiosites MRSA: 60 mg/kg/dia EV de 6/6 horas\nNeonatal (infecções suscetíveis): 15 mg/kg/dose a cada 24 h (≤ 29 semanas), 12/12 h (29-35 semanas) ou 8/8 h (> 35 semanas)",
            doseMaxima: "Endocardite: 2 g/dia. MRSA grave e piomiosite MRSA: 3.600 mg/dia.",
            apresentacoes: "Frasco-ampola 500 mg e 1.000 mg.",
            via: "Endovenosa.",
            reconstituicao: "Diluir 1 frasco para concentração de 100 mg/mL (500 mg + 5 mL ou 1.000 mg + 10 mL de água para diluente).",
            diluicao: "Rediluir para concentração de 5 mg/mL em soro fisiológico.",
            infusao: "Infundir lentamente em 60 minutos.",
            alertasPediatricos: "Ajustar a dose conforme a concentração sérica.",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Cloridrato de Vancomicina, atualizado em 30/10/2025."
        }
    }
});
