// =====================================================
// GASTRO / TGI E HIDRATAÇÃO — cards com cat: "cat-diarreia"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    // TIORFAN (RACECADOTRILA) AJUSTADO SEM FRAÇÕES DE SACHÊS
    "tiorfan": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "tiorfan racecadotrila antissecretor diarreia infantil sachê",
        nome: "Tiorfan (Racecadotrila)", apres: "Sachê 10 mg ou 30 mg",
        info: "<strong>Antissecretor Intestinal:</strong> Idade mínima de 3 meses. Ajustado por peso e apresentação inteira.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            if (i !== "" && parseFloat(i) < 0.25) {
                return { v: "Contraind.", r: "ATENÇÃO: Idade inferior a 3 meses. Tiorfan contraindicado." };
            }
            let pNum = parseFloat(p);
            let textoPresc = "";

            if (pNum >= 27) {
                textoPresc = `${recHead}1) TIORFAN 30 MG ----------------------------------- 01 CAIXA\nDAR 2 SACHÊS DE 30 MG (60 MG TOTAL) VIA ORAL, DE 8/8 HORAS, ATÉ CESSAR A DIARREIA.\n\n*INSTRUÇÃO DE PREPARO:\nDiluir os sachês em 100 mL de água e administrar imediatamente.`;
            } else if (pNum >= 14 || (i !== "" && parseFloat(i) >= 3)) {
                textoPresc = `${recHead}1) TIORFAN 30 MG ----------------------------------- 01 CAIXA\nDAR 1 SACHÊ DE 30 MG VIA ORAL, DE 8/8 HORAS, ATÉ CESSAR A DIARREIA.\n\n*INSTRUÇÃO DE PREPARO:\nDiluir o sachê em 100 mL de água e administrar imediatamente.`;
            } else if (pNum >= 9 || (i !== "" && parseFloat(i) >= 0.8)) {
                textoPresc = `${recHead}1) TIORFAN 10 MG ----------------------------------- 01 CAIXA\nDAR 2 SACHÊS DE 10 MG (20 MG TOTAL) VIA ORAL, DE 8/8 HORAS, ATÉ CESSAR A DIARREIA.\n\n*INSTRUÇÃO DE PREPARO:\nDiluir os sachês em 100 mL de água e administrar imediatamente.`;
            } else {
                textoPresc = `${recHead}1) TIORFAN 10 MG ----------------------------------- 01 CAIXA\nDAR 1 SACHÊ DE 10 MG VIA ORAL, DE 8/8 HORAS, ATÉ CESSAR A DIARREIA.\n\n*INSTRUÇÃO DE PREPARO:\nDiluir o sachê em 100 mL de água e administrar imediatamente.`;
            }

            let rotuloResumo = pNum >= 14 ? "1 sachê (30mg)" : (pNum >= 9 ? "2 sachês (10mg)" : "1 sachê (10mg)");
            if (pNum >= 27) rotuloResumo = "2 sachês (30mg)";

            return { v: rotuloResumo, r: textoPresc };
        },
        detalhes: {
            indicacao: "Diarreia aguda (antissecretor intestinal), junto com a reidratação.",
            dose: "<9 kg: 1 sachê de 10 mg | 9-13 kg: 2 de 10 mg | 14-26 kg: 1 de 30 mg | ≥27 kg: 2 de 30 mg. De 8/8h até cessar a diarreia.",
            atencao: "Contraindicado em menores de 3 meses. Não substitui a reidratação."
        }
    },
    "tgi_sro": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "sais reidratacao oral sro plano a desidratacao diarreia soro oral ambulatorial idade sachê", nome: "Sais de Reidratação Oral (OMS)", apres: "Sachê Padrão",
        info: "<strong>Conduta (MS):</strong> <1a: 50-100 mL | 1-10a: 100-200 mL | >10a: volume tolerado, após cada evacuação.", badge: "", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => { 
            if(i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(i);
            /* MS 2023 (Manejo do paciente com diarreia): < 1 ano 50-100 mL | 1 a 10 anos 100-200 mL | > 10 anos o volume tolerado. */
            let v = id < 1 ? "50 a 100 mL" : id <= 10 ? "100 a 200 mL" : "O VOLUME TOLERADO"; 
            return { v: v, r: `${recHead}1) SAIS DE REIDRATAÇÃO ORAL (OMS) ------------ 05 SACHÊS\nDILUIR 1 SACHÊ EM 1L DE ÁGUA. OFERECER ${v} APÓS CADA EVACUAÇÃO LÍQUIDA.` }; 
        },
        detalhes: {
            indicacao: "Diarreia: prevenir e tratar desidratação (Planos A e B).",
            dose: "<2 anos: 50-100 mL | ≥2 anos: 100-200 mL após cada evacuação líquida.",
            atencao: "Não acrescentar açúcar. Precisa da idade para calcular."
        }
    },
    "tgi_zinco": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "biozinc zinco suplemento diarreia tgi oral ambulatorial idade", nome: "Biozinc Solução (Zinco por Idade)", apres: "2 mg / 0,5 mL",
        info: "<strong>Conduta (SBP/MS):</strong> até 6m: 10 mg (2,5 mL) | 6m a 5 anos: 20 mg (5 mL), 1x ao dia por 10 a 14 dias.", badge: "", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => { 
            if(i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(i);
            /* SBP/MS: até 6 meses 10 mg/dia (2,5 mL); > 6 meses até 5 anos 20 mg/dia (5 mL), por 10 a 14 dias. */
            if (id >= 5) return { v: "> 5 anos", r: "ATENÇÃO: o zinco na diarreia aguda está indicado para menores de 5 anos (SBP/MS)." };
            let v = id < 0.5 ? "2.5 mL" : "5.0 mL"; 
            return { v: v, r: `${recHead}1) BIOZINC SOLUÇÃO 2MG/0,5ML --------------- 1 FR\nDAR ${v} VIA ORAL, 1 VEZ AO DIA, DURANTE 10 DIAS.` }; 
        },
        detalhes: {
            indicacao: "Diarreia aguda (reduz duração e gravidade).",
            dose: "<6 meses: 2,5 mL | ≥6 meses: 5 mL. 1x ao dia por 10 dias.",
            atencao: "Pode causar vômito se dado em jejum. Precisa da idade."
        }
    },
    "tgi_provance_mini": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "provance mini probiotico diarreia tgi oral ambulatorial", nome: "Provance Mini", apres: "Sachê",
        info: "<strong>Conduta:</strong> 1 sachê em 100mL de água 1x ao dia por 5 dias.", badgeSt: "static-blue", badge: "1 Sachê/dia", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "1 Sachê/dia", r: `USO ORAL\n\n1) PROVANCE MINI SACHÊ --------------------- 5 SACHÊS\nDILUIR 1 SACHÊ EM 100 ML DE ÁGUA E TOMAR 1 VEZ AO DIA POR 5 DIAS.` }),
        detalhes: {
            indicacao: "Diarreia aguda (probiótico).",
            dose: "1 sachê 1x ao dia por 5 dias.",
            atencao: "Não diluir em líquido quente."
        }
    },
    "tgi_provance_gg": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "provance gg gotas probiotico diarreia tgi oral ambulatorial", nome: "Provance GG Gotas", apres: "Frasco",
        info: "<strong>Conduta:</strong> <1a: 14 gts 12/12h | >1a: 28 gts 1x/dia por 5 dias.", badge: "Dose por Idade", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => { 
            if (i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(i);
            let doseTexto = id <= 1 ? "14 GOTAS VIA ORAL DE 12/12 HORAS" : "28 GOTAS VIA ORAL 1 VEZ AO DIA";
            let v = id <= 1 ? "14 gts (12/12h)" : "28 gts (1x/dia)";
            return { v: v, r: `USO ORAL\n\n1) PROVANCE GG GOTAS --------------------- 1 FR\nDAR ${doseTexto} POR 5 DIAS.` }; 
        },
        detalhes: {
            indicacao: "Diarreia aguda (probiótico).",
            dose: "≤1 ano: 14 gotas de 12/12h | >1 ano: 28 gotas 1x ao dia. Por 5 dias.",
            atencao: "Não misturar com líquido quente. Precisa da idade."
        }
    },
    "tgi_flora": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "floratil saccharomyces boulardii probiotico diarreia tgi oral ambulatorial", nome: "Floratil Sachê (Probiótico)", apres: "200 mg pó",
        info: "<strong>Conduta:</strong> 1 sachê de 12/12h.", badgeSt: "static-gray", badge: "1 Sachê", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "1 Sachê", r: `${recHead}1) FLORATIL SACHÊ 200MG ---------------- 1 CX\nDILUIR 1 SACHÊ EM ÁGUA E TOMAR DE 12/12H ENQUANTO DURAREM OS SINTOMAS.` }),
        detalhes: {
            indicacao: "Diarreia aguda (probiótico).",
            dose: "1 sachê de 12/12h enquanto durarem os sintomas.",
            atencao: "Não diluir em líquido quente."
        }
    },
    "tgi_azitro": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "azitromicina diarreia disenteria antibiotico oral ambulatorial", nome: "Azitromicina Suspensão (Disenteria)", apres: "200 mg / 5 mL",
        info: "<strong>Conduta:</strong> 10 mg/kg no Dia 1, depois 5 mg/kg por 4 dias.", badge: "Teto: 12,5 mL (D1) / 6,25 mL", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let d1 = Math.min(round05(p/4), 12.5); let d2 = Math.min(round05(p/8), 6.25); /* Teto: 500 mg (12,5 mL) no 1º dia e 250 mg (6,25 mL) nos dias 2 a 5 */ return { v: d1 + " mL", r: `${recHead}1) AZITROMICINA SUSPENSÃO 200 MG/5ML --------- 1 FR\n• DIA 1: DAR ${d1} ML EM DOSE ÚNICA.\n• DIAS 2 A 5: DAR ${d2} ML 1X AO DIA.` }; },
        detalhes: {
            indicacao: "Disenteria (diarreia com sangue) com indicação de antibiótico.",
            dose: "10 mg/kg no 1º dia, depois 5 mg/kg 1x ao dia por mais 4 dias.",
            atencao: "Máximo 500 mg (12,5 mL) no 1º dia e 250 mg (6,25 mL) do 2º ao 5º dia. Cautela em QT longo."
        }
    },
    "tgi_alben": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "albendazol verme vermifugo parasitose oral ambulatorial", nome: "Albendazol Suspensão", apres: "400 mg / 10 mL",
        info: "<strong>Conduta:</strong> 10 mL dose única. Repetir em 14 dias.", badgeSt: "static-blue", badge: "10 mL", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "10 mL", r: `${recHead}1) ALBENDAZOL 400 MG/10ML ------------------- 2 FR\nTOMAR 10 ML VIA ORAL, DOSE ÚNICA. REPETIR APÓS 14 DIAS.` }),
        detalhes: {
            indicacao: "Verminoses (ascaridíase, ancilostomíase, tricuríase, enterobíase).",
            dose: "10 mL (400 mg) VO em dose única. Repetir em 14 dias.",
            atencao: "Dose para maiores de 2 anos."
        }
    },
    "tgi_meben": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "mebendazol verme vermifugo parasitose oral ambulatorial", nome: "Mebendazol Suspensão", apres: "20 mg / mL",
        info: "<strong>Conduta:</strong> 5 mL dose única. Repetir em 14 dias.", badgeSt: "static-blue", badge: "5 mL", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "5 mL", r: `${recHead}1) MEBENDAZOL 20 MG/ML ------------------- 1 FR\nDAR 5 ML VIA ORAL, DOSE ÚNICA. REPETIR APÓS 14 DIAS.` }),
        detalhes: {
            indicacao: "Verminoses (ascaridíase, ancilostomíase, tricuríase, enterobíase).",
            dose: "5 mL (100 mg) VO em dose única. Repetir em 14 dias.",
            atencao: "Dose para maiores de 2 anos."
        }
    },
    "tgi_planoc": {
        cat: "cat-diarreia", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Expansão)", 
        kw: "plano c soro fisiologico expansao venosa desidratacao choque hospitalar injetavel", nome: "Fase Rápida de Expansão (Plano C)", apres: "Soro Fisiológico 0,9%",
        info: "<strong>Conduta:</strong> 30 mL/kg rápido + 70 mL/kg.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => { 
            let id = i !== "" ? parseFloat(i) : 2;
            let vol1 = p * 30, vol2 = p * 70;
            let t1 = id <= 1 ? "1 hora" : "30 minutos", t2 = id <= 1 ? "5 horas" : "2h 30min";
            /* MS 2023: SF 0,9% ou Ringer lactato. RN e < 5 anos com cardiopatia grave: 10 mL/kg, ajustando pela clínica. */
            return { v: (p * 100).toFixed(1) + " mL", r: `VIA ENDOVENOSA (PLANO C)\n\n ETAPA 1 (30 ML/KG): ${vol1.toFixed(1)} mL de SF 0,9% (ou Ringer lactato) EV em ${t1}.\n ETAPA 2 (70 ML/KG): ${vol2.toFixed(1)} mL de SF 0,9% (ou Ringer lactato) EV em ${t2}.\n Reavaliar após 2 horas: se persistirem sinais de choque, repetir; se não, iniciar manutenção.\n\n RN E < 5 ANOS COM CARDIOPATIA GRAVE: ${(p * 10).toFixed(1)} mL (10 mL/kg), ajustando a velocidade pela clínica.` }; 
        },
        detalhes: {
            indicacao: "Desidratação grave ou choque (Plano C).",
            dose: "Etapa 1: 30 mL/kg. Etapa 2: 70 mL/kg. <1 ano: 1h + 5h | ≥1 ano: 30 min + 2h30.",
            atencao: "Reavaliar o paciente após cada etapa. Iniciar SRO assim que conseguir beber."
        }
    },
    "tgi_manutencao": {
        cat: "cat-diarreia", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Expansão)", 
        kw: "manutencao hidratacao holliday segar soro glicosado potassio sodio hospitalar injetavel", nome: "Manutenção Pediátrica (Holliday-Segar)", apres: "SG 5% + Eletrólitos",
        info: "<strong>Conduta:</strong> Holliday-Segar (70% e 80%) contínua em 24h.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { 
            let total = p <= 10 ? p * 100 : (p <= 20 ? 1000 + (p - 10) * 50 : 1500 + (p - 20) * 20);
            let v70 = (total * 0.7) / 24, v80 = (total * 0.8) / 24;
            return { v: `70%: ${v70.toFixed(1)} mL/h`, r: `VIA ENDOVENOSA (HOLLIDAY-SEGAR)\n\n SG 5% 500mL + NaCl 20% 20mL + KCl 19,1% 5mL.\n • 70%: ${v70.toFixed(1)} mL/h\n • 80%: ${v80.toFixed(1)} mL/h` }; 
        },
        detalhes: {
            indicacao: "Hidratação venosa de manutenção.",
            dose: "Holliday-Segar: 70% ou 80% da necessidade, contínuo em 24h.",
            atencao: "Reavaliar sódio, potássio e glicemia. Ajustar em cardiopatia, nefropatia ou SIADH."
        }
    },
    "vig_4": {
        cat: "cat-diarreia", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Expansão)", 
        kw: "vig 4 neonatologia rn recem nascido glicose soro glicosado venoclise hospitalar injetavel holliday segar", 
        nome: "Venóclise de Manutenção (VIG 4)", apres: "Diluição SG 5% + G 50%",
        info: "<strong>Conduta:</strong> VIG 4 mg/kg/min.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { 
            let total = p <= 10 ? p * 100 : 1000 + (p - 10) * 50;
            let vol = total * 0.7, c = (4 * p * 144) / vol, g50 = c > 5 ? vol * (c - 5) / 45 : 0, sg5 = vol - g50;
            return { v: `${(vol/24).toFixed(1)} mL/h`, r: `VENÓCLISE VIG 4 (Cota 70%):\n- SG 5%: ${Math.round(sg5)} mL\n- Glicose 50%: ${Math.round(g50)} mL\nCorrer a ${(vol/24).toFixed(1)} mL/h.` }; 
        },
        detalhes: {
            indicacao: "Hidratação venosa de manutenção com oferta de glicose (VIG 4).",
            dose: "VIG 4 mg/kg/min, com 70% da necessidade hídrica.",
            atencao: "Controlar a glicemia."
        }
    },
    "vig_5": {
        cat: "cat-diarreia", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Expansão)", 
        kw: "vig 5 neonatologia rn recem nascido glicose soro glicosado venoclise hospitalar injetavel holliday segar", 
        nome: "Venóclise de Manutenção (VIG 5)", apres: "Diluição SG 5% + G 50%",
        info: "<strong>Conduta:</strong> VIG 5 mg/kg/min.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { 
            let total = p <= 10 ? p * 100 : 1000 + (p - 10) * 50;
            let vol = total * 0.7, c = (5 * p * 144) / vol, g50 = c > 5 ? vol * (c - 5) / 45 : 0, sg5 = vol - g50;
            return { v: `${(vol/24).toFixed(1)} mL/h`, r: `VENÓCLISE VIG 5 (Cota 70%):\n- SG 5%: ${Math.round(sg5)} mL\n- Glicose 50%: ${Math.round(g50)} mL\nCorrer a ${(vol/24).toFixed(1)} mL/h.` }; 
        },
        detalhes: {
            indicacao: "Hidratação venosa de manutenção com oferta de glicose (VIG 5).",
            dose: "VIG 5 mg/kg/min, com 70% da necessidade hídrica.",
            atencao: "Controlar a glicemia."
        }
    },
    "nitazoxanida": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "nitazoxanida annita verminose giardia criptosporidio diarreia antiparasitario suspensao", nome: "Nitazoxanida Suspensão (Annita)", apres: "20 mg / mL",
        info: "<strong>Posologia:</strong> 7,5 mg/kg/dose de 12/12h por 3 dias. Máx. 15 mL/dose.", badge: "Máx: 15 mL/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            if (i !== "" && parseFloat(i) < 1) return { v: "Contraind.", r: "ATENÇÃO: Nitazoxanida indicada a partir de 1 ano." };
            if (i !== "" && parseFloat(i) > 12) return { v: "500 mg", r: `${recHead}1) NITAZOXANIDA 500 MG ----------------------- 6 CP\nTOMAR 1 COMPRIMIDO, VIA ORAL, DE 12/12 HORAS, POR 3 DIAS.` };
            let v = Math.min(parseFloat(round05(p * 7.5 / 20)), 15).toFixed(1);
            return { v: v + " mL", r: `${recHead}1) NITAZOXANIDA SUSPENSÃO 20 MG/ML -------- 1 FR\nDAR ${v} ML, VIA ORAL, DE 12/12 HORAS, POR 3 DIAS.` };
        },
        detalhes: {
            indicacao: "Giardíase, criptosporidiose, amebíase e outras parasitoses intestinais.",
            dose: "7,5 mg/kg/dose VO de 12/12h por 3 dias. Acima de 12 anos: 500 mg de 12/12h.",
            atencao: "A partir de 1 ano. Máximo 15 mL por dose."
        }
    },
    "domperidona": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "domperidona motilium procinetico dispepsia emese vomito refluxo suspensao oral", nome: "Domperidona Suspensão (Motilium)", apres: "Suspensão 1 mg / mL",
        info: "<strong>Posologia:</strong> 0,25-0,5 mg/kg/dose de 8/8h. Máx. 1 mg/kg/dia ou 35 mg/dia.", badge: "Máx: 1 mg/kg/dia (35 mg/dia)", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            // Whitebook: dispepsia e êmese 0,25-0,5 mg/kg/dose VO de 8/8h, 15-30 min antes das refeições e ao dormir (se necessário).
            // Dose máxima 1 mg/kg/dia ou 35 mg/dia. Atenção: evitar em menores de 12 anos e/ou 35 kg.
            let maxDia = Math.min(p * 1, 35);
            let min = Math.min(p * 0.25, maxDia / 3).toFixed(1), max = Math.min(p * 0.5, maxDia / 3).toFixed(1); // as 3 tomadas não podem passar do máximo diário
            let alerta = ((i !== "" && parseFloat(i) < 12) || p < 35) ? "ATENÇÃO: Evitar o uso em menores de 12 anos e/ou 35 kg de peso corpóreo.\n\n" : "";
            return { v: `${min}-${max} mL`, r: `${alerta}${recHead}1) DOMPERIDONA SUSPENSÃO 1 MG/ML ---------- 1 FR\nDAR ${min} A ${max} ML, VIA ORAL, DE 8/8 HORAS, 15 A 30 MINUTOS ANTES DAS REFEIÇÕES E AO DORMIR, SE NECESSÁRIO. NÃO ULTRAPASSAR ${maxDia.toFixed(1)} ML POR DIA.` };
        },
        detalhes: {
            indicacao: "Dispepsia e êmese (procinético).",
            dose: "0,25-0,5 mg/kg/dose VO de 8/8h, 15-30 minutos antes das refeições e ao dormir (caso necessário).",
            atencao: "Evitar o uso em menores de 12 anos e/ou 35 kg de peso corpóreo. Dose máxima: 1 mg/kg/dia ou 35 mg/dia."
        },
        ficha: {
            indicacoes: "Dispepsia e êmese (procinético).",
            dose: "Dispepsia e êmese: 0,25-0,5 mg/kg/dose VO de 8/8 horas, 15-30 minutos antes das refeições e ao dormir (caso necessário)",
            doseMaxima: "1 mg/kg/dia ou 35 mg/dia.",
            apresentacoes: "Suspensão 1 mg/mL e 5 mg/mL; comprimido 10 mg.",
            via: "Oral.",
            intervalo: "8/8 horas.",
            alertasPediatricos: "Evitar o uso em menores de 12 anos e/ou 35 kg de peso corpóreo.",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Domperidona, atualizado em 15/09/2026."
        }
    },
    "lactulose": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "lactulose lactulona constipacao intestino preso laxativo xarope", nome: "Lactulose Xarope (Lactulona)", apres: "667 mg / mL",
        info: "<strong>Posologia:</strong> Constipação: 0,3-0,5 mL/kg/dia de 12/12h.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let min = round05(p * 0.15), max = round05(p * 0.25);
            return { v: `${min}-${max} mL`, r: `${recHead}1) LACTULOSE XAROPE 667 MG/ML -------------- 1 FR\nDAR ${min} A ${max} ML, VIA ORAL, DE 12/12 HORAS. AJUSTAR A DOSE CONFORME O FUNCIONAMENTO DO INTESTINO.` };
        },
        detalhes: {
            indicacao: "Constipação intestinal.",
            dose: "0,3-0,5 mL/kg/dia VO de 12/12h.",
            atencao: "Pode causar gases e cólica no início. Ajustar a dose pelo funcionamento do intestino."
        }
    },
    "oleo_mineral": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "oleo mineral nujol constipacao intestino preso laxativo", nome: "Óleo Mineral", apres: "Frasco",
        info: "<strong>Posologia:</strong> 1-3 mL/kg/dia em 1-2 doses. Máx. 50 mL/dose. Só a partir de 4 anos.", badge: "Máx: 50 mL/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            if (i === "") return { v: "—", r: "Insira a idade acima." };
            if (parseFloat(i) < 4) return { v: "Contraind.", r: "ATENÇÃO: Não usar óleo mineral em menores de 4 anos ou com risco de aspiração." };
            let v = Math.min(Math.round(p), 50);
            return { v: v + " mL", r: `${recHead}1) ÓLEO MINERAL ------------------------------- 1 FR\nDAR ${v} ML, VIA ORAL, 1 VEZ AO DIA. NÃO DAR DEITADO NEM PERTO DE DORMIR.` };
        },
        detalhes: {
            indicacao: "Constipação intestinal.",
            dose: "1-3 mL/kg/dia VO em 1 ou 2 doses (app calcula 1 mL/kg).",
            atencao: "Não usar em menores de 4 anos nem com risco de aspiração. Máximo 50 mL por dose."
        }
    },
    "solucao_mucosite": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "solucao mucosite boca xilocaina nistatina eritromicina hidroxido aluminio bochecho", nome: "Solução para Mucosite (Bochecho)", apres: "Fórmula manipulada",
        info: "<strong>Conduta:</strong> Bochechar e cuspir de 8/8h.", badgeSt: "static-blue", badge: "Bochecho", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Bochecho", r: `USO ORAL (BOCHECHO)\n\n1) SOLUÇÃO PARA MUCOSITE:\n   XILOCAÍNA 5 ML + NISTATINA 5 ML + ERITROMICINA 5 ML + HIDRÓXIDO DE ALUMÍNIO 5 ML\nBOCHECHAR E CUSPIR, DE 8/8 HORAS. NÃO ENGOLIR.` }),
        detalhes: {
            indicacao: "Mucosite oral.",
            dose: "Bochechar e cuspir de 8/8h.",
            atencao: "Não engolir (contém xilocaína)."
        }
    },
    "kcl_ev": {
        cat: "cat-diarreia", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Expansão)",
        kw: "potassio kcl hipocalemia hipopotassemia correcao reposicao endovenosa hidroeletrolitico", nome: "KCl 10% EV (Hipocalemia Grave, K < 2,5)", apres: "KCl 10% = 1,34 mEq/mL",
        info: "<strong>Conduta:</strong> 0,3 a 0,5 mEq/kg/h por 4h, a 4 mEq/100 mL.", badge: "Máx periférica: 8 mEq/100 mL", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let op = taxa => { let meq = taxa * p * 4, vol = meq / 4 * 100, kcl = meq / 1.34; return { meq, vol, kcl, bic: vol / 4 }; };
            let a = op(0.3), b = op(0.5);
            let txt = (o, t) => `${t} MEQ/KG/H (${o.meq.toFixed(1)} mEq em 4h):\n SG 5% ou SF 0,9% ..... ${Math.round(o.vol)} mL\n KCl 10% ..... ${o.kcl.toFixed(1)} mL\n Correr EV em 4 horas, em BIC a ${o.bic.toFixed(0)} mL/h.`;
            return { v: `0,3: ${a.kcl.toFixed(1)} mL KCl\n0,5: ${b.kcl.toFixed(1)} mL KCl`, r: `VIA ENDOVENOSA (HIPOCALEMIA GRAVE - FASE RÁPIDA)\n\n${txt(a, "0,3")}\n\n${txt(b, "0,5")}\n\n* Concentração de 4 mEq/100 mL. Máximo em veia periférica: 8 mEq/100 mL; veia central: 15 mEq/100 mL.` };
        },
        detalhes: {
            indicacao: "Hipocalemia grave (K < 2,5).",
            dose: "0,3 a 0,5 mEq/kg/h por 4 horas, a 4 mEq/100 mL de SG 5% ou SF 0,9%.",
            atencao: "Sempre em BIC. Máximo 8 mEq/100 mL em veia periférica e 15 mEq/100 mL em veia central. Monitorar ECG."
        }
    },
    "kcl_xarope": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "potassio kcl xarope hipocalemia leve moderada reposicao oral", nome: "KCl 6% Xarope (Hipocalemia Leve/Moderada)", apres: "6% = 0,8 mEq/mL",
        info: "<strong>Posologia:</strong> 2 a 5 mEq/kg/dia de 6/6h.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let min = (p * 2 / 4 / 0.8).toFixed(1), max = (p * 5 / 4 / 0.8).toFixed(1);
            return { v: `${min}-${max} mL`, r: `${recHead}1) CLORETO DE POTÁSSIO XAROPE 6% ------------ 1 FR\nDAR ${min} A ${max} ML, VIA ORAL, DE 6/6 HORAS (2 A 5 MEQ/KG/DIA).` };
        },
        detalhes: {
            indicacao: "Hipocalemia leve a moderada.",
            dose: "2 a 5 mEq/kg/dia VO de 6/6h (1 mL = 0,8 mEq).",
            atencao: "Dar após as refeições para reduzir a irritação gástrica."
        }
    },
    "nacl3_hiponatremia": {
        cat: "cat-diarreia", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Expansão)",
        kw: "sodio nacl 3% hiponatremia correcao reposicao endovenosa hidroeletrolitico", nome: "NaCl 3% EV (Hiponatremia Grave, Na < 120)", apres: "NaCl 20% 15 mL + SG 5% 85 mL",
        info: "<strong>Conduta:</strong> (Na desejado − Na atual) x 0,6 x Peso, em 4 a 6h. Calculado para subir 8 mEq/L.", badge: "Máx: 12 mEq/L por dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let meq = 8 * 0.6 * p, vol = meq / 0.5, nacl20 = vol * 0.15, sg = vol * 0.85;
            return { v: `${vol.toFixed(0)} mL NaCl 3%`, r: `VIA ENDOVENOSA (HIPONATREMIA GRAVE - FASE DE ATAQUE)\n\nCálculo para subir 8 mEq/L: 8 x 0,6 x ${p} kg = ${meq.toFixed(1)} mEq de Na.\n\nNaCl 20% ..... ${nacl20.toFixed(1)} mL\nSG 5% ..... ${sg.toFixed(1)} mL\n(${vol.toFixed(0)} mL de NaCl 3%)\nFazer EV em 4 horas, em BIC a ${(vol / 4).toFixed(0)} mL/h.\n\n* Não subir mais que 12 mEq/L por dia (ideal 6 a 8).\n* Velocidade máxima: aguda 10 mL/kg/h (${(p * 10).toFixed(0)} mL/h); crônica 5 mL/kg/h (${(p * 5).toFixed(0)} mL/h).` };
        },
        detalhes: {
            indicacao: "Hiponatremia grave (Na < 120) ou sintomática.",
            dose: "(Na desejado − Na atual) x 0,6 x Peso, em 4 a 6 horas. O app calcula para subir 8 mEq/L.",
            atencao: "Não subir mais que 12 mEq/L por dia (ideal 6 a 8): risco de mielinólise. Ajustar o cálculo ao Na real do paciente."
        }
    },
    // ---------- Diarreia aguda: Guia Prático SBP nº 74 (2023) / Manejo do paciente com diarreia (MS, 2023) ----------
    "tgi_planob": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "plano b sro sais de reidratacao oral desidratacao unidade de saude terapia de reidratacao oral tro gastroclise",
        nome: "SRO na Unidade (Plano B)", apres: "Sais de reidratação oral",
        info: "<strong>Conduta (MS):</strong> 50 a 100 mL/kg de SRO em 4 a 6 horas, na unidade, até desaparecerem os sinais de desidratação.", badge: "50-100 mL/kg", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* MS 2023 / SBP: Plano B = 50 a 100 mL/kg de SRO em 4 a 6 horas. */
            let a = p * 50, b = p * 100;
            return { v: `${a.toFixed(0)}–${b.toFixed(0)} mL`, r: `USO ORAL (PLANO B - NA UNIDADE DE SAÚDE)\n\n SAIS DE REIDRATAÇÃO ORAL: ${a.toFixed(0)} a ${b.toFixed(0)} mL (50 a 100 mL/kg) em 4 a 6 horas.\n Oferecer em pequenos volumes, aumentando a oferta aos poucos, conforme a sede, até desaparecerem os sinais de desidratação.\n Reavaliar continuamente. Se não melhorar, considerar gastróclise. Sem melhora em 6 horas (na prática, 3 a 4 h): encaminhar para internação.` };
        },
        detalhes: {
            indicacao: "Desidratação sem gravidade (Plano B), com capacidade de ingerir líquidos.",
            dose: "50 a 100 mL/kg de SRO em 4 a 6 horas, na unidade de saúde (MS/SBP).",
            atencao: "Terminou o Plano B (sem sinais de desidratação): passar para o Plano A. Vômitos persistentes: 1 dose de ondansetrona. Evoluiu para grave: Plano C."
        }
    },
    "tgi_manut_planoc": {
        cat: "cat-diarreia", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Expansão)",
        kw: "plano c manutencao reposicao soro glicosado fisiologico 4:1 1:1 kcl desidratacao grave diarreia hospitalar",
        nome: "Manutenção + Reposição (Plano C)", apres: "SG 5% + SF 0,9% + KCl 10%",
        info: "<strong>Conduta (MS):</strong> manutenção SG 5% + SF 0,9% 4:1 (Holliday) + reposição SG 5% + SF 0,9% 1:1 (50 mL/kg/dia) + KCl 10% 2 mL/100 mL da manutenção, em 24 h.", badge: "24 h", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* MS 2023 (Plano C, fase de manutenção/reposição): manutenção SG5%:SF0,9% 4:1 pelo Holliday (máx. 2.000 mL); reposição SG5%:SF0,9% 1:1, iniciar 50 mL/kg/dia; KCl 10% 2 mL para cada 100 mL da manutenção. */
            let man = Math.min(p <= 10 ? p * 100 : (p <= 20 ? 1000 + (p - 10) * 50 : 1500 + (p - 20) * 20), 2000);
            let rep = p * 50, kcl = man / 100 * 2;
            let sgM = man * 0.8, sfM = man * 0.2, sgR = rep / 2, sfR = rep / 2;
            let vel = (man + kcl + rep) / 24;
            return { v: `${vel.toFixed(1)} mL/h`, r: `VIA ENDOVENOSA (PLANO C - MANUTENÇÃO E REPOSIÇÃO EM 24 HORAS)\n\n MANUTENÇÃO (4:1): SG 5% ${sgM.toFixed(0)} mL + SF 0,9% ${sfM.toFixed(0)} mL + KCl 10% ${kcl.toFixed(1)} mL.\n REPOSIÇÃO (1:1): SG 5% ${sgR.toFixed(0)} mL + SF 0,9% ${sfR.toFixed(0)} mL (50 mL/kg/dia; reavaliar conforme as perdas).\n Total: ${(man + kcl + rep).toFixed(0)} mL em 24 h = ${vel.toFixed(1)} mL/h.` };
        },
        detalhes: {
            indicacao: "Plano C: após corrigida a desidratação grave (fase de manutenção e reposição).",
            dose: "Manutenção (Holliday, máx. 2.000 mL) em SG 5% + SF 0,9% 4:1 + reposição 50 mL/kg/dia em SG 5% + SF 0,9% 1:1 + KCl 10% 2 mL/100 mL da manutenção, em 24 h (MS).",
            atencao: "Iniciar SRO assim que aceitar (em geral 2–3 h após o início da EV). Suspender a EV quando hidratado, tolerando SRO e sem vômitos."
        }
    },
    "cef_disenteria": {
        cat: "cat-diarreia", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Expansão)",
        kw: "ceftriaxona disenteria diarreia com sangue shigella colera antibiotico im ev injetavel",
        nome: "Ceftriaxona IM / EV (Disenteria)", apres: "FA 1 g",
        info: "<strong>Conduta (MS):</strong> 50 a 100 mg/kg IM 1x ao dia por 3 a 5 dias. < 3 meses, imunodeficiência ou casos graves: EV.", badge: "Teto: 2 g/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            /* MS 2023: 50-100 mg/kg/dia, 1x/dia, 3 a 5 dias. IM; EV se < 3 meses, imunodeficiência ou grave. Teto do app: 2 g/dia. IM: 1 g + 3,5 mL de lidocaína 1% (285,7 mg/mL). EV: 1 g em 10 mL de AD (100 mg/mL). */
            let opc = (k) => { let mg = Math.min(p * k, 2000); return { mg, im: mg / 285.7, ev: mg / 100, fa: mg > 1000 ? 2 : 1 }; };
            let a = opc(50), b = opc(100);
            let ev = i !== "" && parseFloat(i) < 0.25;
            let lin = (o, k) => ev
                ? `${k} MG/KG: reconstituir ${o.fa} FA de 1 g em 10 mL de AD cada; aspirar ${o.ev.toFixed(1)} mL (${o.mg.toFixed(0)} mg), diluir em SF 0,9% e infundir EV em 30 min, 1 vez ao dia.`
                : `${k} MG/KG: reconstituir ${o.fa} FA de 1 g com 3,5 mL de lidocaína 1% cada; aspirar ${o.im.toFixed(1)} mL (${o.mg.toFixed(0)} mg) e aplicar IM profunda, 1 vez ao dia.`;
            return { v: ev ? `EV: ${a.ev.toFixed(1)}–${b.ev.toFixed(1)} mL` : `IM: ${a.im.toFixed(1)}–${b.im.toFixed(1)} mL`, r: `${ev ? "VIA ENDOVENOSA" : "VIA INTRAMUSCULAR"} (DISENTERIA - 3 A 5 DIAS)\n\n ${lin(a, 50)}\n ${lin(b, 100)}${ev ? "\n (Menor de 3 meses: via EV.)" : "\n Se < 3 meses, imunodeficiência ou caso grave: fazer EV."}` };
        },
        detalhes: {
            indicacao: "Diarreia com sangue (disenteria) com comprometimento do estado geral, ou cólera grave.",
            dose: "50 a 100 mg/kg 1x ao dia por 3 a 5 dias, IM. EV se < 3 meses, imunodeficiência ou caso grave (MS 2023).",
            atencao: "Máximo 2 g/dia (teto do app). Não usar antibiótico na diarreia aquosa sem sangue (exceto cólera grave)."
        }
    },
    "cipro_disenteria": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "ciprofloxacino disenteria diarreia com sangue shigella colera antibiotico oral adolescente",
        nome: "Ciprofloxacino (Disenteria > 10 anos)", apres: "Comprimido 500 mg",
        info: "<strong>Conduta (MS):</strong> > 10 anos ou > 30 kg: 500 mg VO de 12/12h por 3 dias.", badge: "> 10 anos / > 30 kg", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => {
            /* MS 2023: > 10 anos / > 30 kg: 1 comprimido de 500 mg de 12/12h, VO, por 3 dias. Até 10 anos / 30 kg: azitromicina ou ceftriaxona. */
            let maior = (i !== "" && parseFloat(i) > 10) || p > 30;
            if (!maior) return { v: "≤ 10 anos", r: "ATENÇÃO: até 10 anos e 30 kg, o MS indica azitromicina (ou ceftriaxona) na disenteria." };
            return { v: "500 mg 12/12h", r: `${recHead}1) CIPROFLOXACINO 500 MG ---------------------- 6 COMPRIMIDOS\nTOMAR 1 COMPRIMIDO, VIA ORAL, DE 12/12 HORAS, POR 3 DIAS.` };
        },
        detalhes: {
            indicacao: "Diarreia com sangue (disenteria) com comprometimento do estado geral, ou cólera grave, em > 10 anos ou > 30 kg.",
            dose: "500 mg VO de 12/12h por 3 dias (MS 2023).",
            atencao: "Até 10 anos / 30 kg: azitromicina. Cautela em QT longo."
        }
    },
    "metro_parasitas": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "metronidazol amebiase entamoeba giardia giardiase diarreia antiparasitario oral",
        nome: "Metronidazol (Amebíase / Giardíase)", apres: "Suspensão 40 mg/mL",
        info: "<strong>Conduta (MS):</strong> amebíase 50 mg/kg/dia de 8/8h por 10 dias | giardíase 15 mg/kg/dia de 8/8h por 5 dias.", badge: "Ver teto", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* MS 2023: amebíase 50 mg/kg/dia em 3 doses por 10 dias; giardíase 15 mg/kg/dia em 3 doses por 5 dias. Tetos por dose (750 mg e 250 mg) da literatura/bula: conferir. Suspensão 40 mg/mL. */
            let ame = Math.min(p * 50 / 3, 750), gia = Math.min(p * 5, 250);
            let vA = Math.min(parseFloat(round05(ame / 40)), 18.5).toFixed(1), vG = Math.min(parseFloat(round05(gia / 40)), 6).toFixed(1);
            return { v: `Ameb: ${vA} | Giard: ${vG} mL`, r: `${recHead}1) METRONIDAZOL SUSPENSÃO 40 MG/ML -------- 1 FR\n• AMEBÍASE: DAR ${vA} ML, VIA ORAL, DE 8/8 HORAS, POR 10 DIAS.\n• GIARDÍASE: DAR ${vG} ML, VIA ORAL, DE 8/8 HORAS, POR 5 DIAS.\n(USAR SÓ A LINHA DO DIAGNÓSTICO.)` };
        },
        detalhes: {
            indicacao: "Amebíase (falha do tratamento da Shigella ou trofozoítos de E. histolytica com hemácias) e giardíase (diarreia ≥ 14 dias com cistos/trofozoítos).",
            dose: "Amebíase: 50 mg/kg/dia de 8/8h por 10 dias. Giardíase: 15 mg/kg/dia de 8/8h por 5 dias (MS 2023).",
            atencao: "Tetos por dose usados no app (literatura/bula, conferir): amebíase 750 mg, giardíase 250 mg. Efeito antabuse e gosto metálico."
        }
    },
    "vit_a_diarreia": {
        cat: "cat-diarreia", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "vitamina a megadose desnutrido diarreia suplementacao retinol",
        nome: "Vitamina A (Megadose)", apres: "Cápsulas 100.000 UI e 200.000 UI",
        info: "<strong>Conduta (SBP):</strong> < 6 m: 50.000 UI | 6–12 m: 100.000 UI | > 12 m: 200.000 UI, VO.", badge: "Por idade", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => {
            /* SBP GPA nº 74: em geral 50.000 UI (< 6 meses), 100.000 UI (6 a 12 meses), 200.000 UI (maiores); dose variável conforme o quadro nutricional. */
            if (i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(i);
            let ui = id < 0.5 ? "50.000" : id <= 1 ? "100.000" : "200.000";
            return { v: `${ui} UI`, r: `${recHead}1) VITAMINA A ${ui} UI\nADMINISTRAR ${ui} UI, VIA ORAL, EM DOSE ÚNICA.` };
        },
        detalhes: {
            indicacao: "Diarreia em populações com alto risco de deficiência de vitamina A (ex.: desnutridos): reduz mortalidade e internações.",
            dose: "< 6 meses: 50.000 UI | 6 a 12 meses: 100.000 UI | > 12 meses: 200.000 UI, VO (SBP 2023).",
            atencao: "Dose variável conforme o quadro nutricional. Não repetir sem indicação (risco de hipervitaminose A)."
        }
    }
});
