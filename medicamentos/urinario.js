// =====================================================
// URINÁRIO — cards com cat: "cat-urinario"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    "urina_clav": {
        cat: "cat-urinario", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "amoxicilina clavulanato itu urinaria pielonefrite antibiotico oral ambulatorial", nome: "Amoxi-Clavulanato Suspensão (ITU)", apres: "250 mg + 62,5 mg / 5 mL",
        info: "<strong>Posologia (SBP):</strong> 20–40 mg/kg/dia de amoxicilina VO de 8/8h por 10 dias. Última opção na ITU.", badge: "Máx: 10 mL/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* SBP (DC Nefrologia nº 101, 2023): amoxicilina-clavulanato 20-40 mg/kg/dia de 8/8h, última opção (altera mais a flora intestinal). 250 mg/5 mL: 20 mg/kg/dia = p x 0,133 mL/dose; 40 mg/kg/dia = p x 0,267 mL/dose. Teto do app 10 mL/dose (500 mg). Total em mL: 3 doses x 10 dias. */
            let a = Math.min(parseFloat(round05(p * 20 / 3 / 50)), 10), b = Math.min(parseFloat(round05(p * 40 / 3 / 50)), 10);
            let tot = Math.ceil(b * 3 * 10), t = x => String(x).replace('.', ',');
            return { v: `${a}–${b} mL`, r: `${recHead}1) AMOXICILINA + CLAVULANATO 250+62,5 MG/5ML -- ${tot} ML\nDAR ${t(a)} A ${t(b)} ML, VIA ORAL, DE 8/8 HORAS POR 10 DIAS.` };
        },
        detalhes: {
            indicacao: "Infecção do trato urinário (última opção, quando as outras não servem).",
            dose: "20–40 mg/kg/dia de amoxicilina VO de 8/8h por 10 dias (SBP 2023).",
            atencao: "Máximo 10 mL (500 mg) por dose. Perguntar sobre alergia a penicilina. Ajustar pela urocultura. A SBP coloca como última opção, por alterar mais a flora intestinal."
        }
    },
    "urina_cefa": {
        cat: "cat-urinario", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "cefalexina cistite itu urinaria antibiotico oral ambulatorial", nome: "Cefalexina Suspensão (Cistite)", apres: "250 mg / 5 mL",
        info: "<strong>Posologia (Whitebook):</strong> 12,5–25 mg/kg/dose (Peso ÷ 4 a Peso ÷ 2 mL) de 6/6h por 7 dias. Máx. 10 mL/dose.", badge: "Máx: 10 mL/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (ITU em Pediatria, ITU afebril): cefalexina 250 mg/5 mL, 12,5-25 mg/kg/dose (0,25-0,5 mL/kg/dose) VO de 6/6h por 7-14 dias, máx. 10 mL/dose (500 mg). */
            let a = Math.min(parseFloat(round05(p / 4)), 10), b = Math.min(parseFloat(round05(p / 2)), 10), t = x => String(x).replace('.', ',');
            return { v: `${a}–${b} mL`, r: `${recHead}1) CEFALEXINA 250 MG / 5 ML ------------------ 1 FR\nDAR ${t(a)} A ${t(b)} ML, VIA ORAL, DE 6/6 HORAS POR 7 DIAS.` };
        },
        detalhes: {
            indicacao: "Cistite (ITU baixa, sem febre).",
            dose: "12,5–25 mg/kg/dose (Peso ÷ 4 a Peso ÷ 2 mL) VO de 6/6h por 7 dias (Whitebook: 7 a 14 dias).",
            atencao: "Máximo 10 mL (500 mg) por dose. Ajustar pela urocultura."
        }
    },
    "urina_ceft": {
        cat: "cat-urinario", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "ceftriaxona itu hospitalar pielonefrite internação antibiotico hospitalar injetavel", nome: "Ceftriaxona EV (Pielonefrite)", apres: "FA 1 G",
        info: "<strong>Conduta:</strong> 50 mg/kg/dose de 12/12h.", badge: "Teto: 2 g/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => calcCeftriaxona(p, "VIA ENDOVENOSA (PIELONEFRITE)", "EV", 12, () => 50),
        detalhes: {
            indicacao: "Pielonefrite (ITU alta) e ITU febril em lactentes.",
            dose: "100 mg/kg/dia EV: 50 mg/kg de 12/12h ou 100 mg/kg de 24/24h.",
            atencao: "Máximo 2 g/dia: até 2 g de 24/24h ou até 1 g de 12/12h. Acima de 1 g, usar 2 frascos. Não infundir junto com soluções com cálcio. Ajustar pela urocultura."
        }
    },
    "nitrofurantoina_itu": {
        cat: "cat-urinario", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "nitrofurantoina macrodantina cistite itu afebril infeccao urinaria baixa antibiotico oral",
        nome: "Nitrofurantoína (Cistite / ITU afebril)", apres: "Cápsula / comprimido 100 mg",
        info: "<strong>Posologia (Whitebook):</strong> 5–7 mg/kg/dia VO de 6/6h por 7 dias. Máx. 100 mg/dose. Não usar na ITU febril.", badge: "Máx: 100 mg/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (ITU em Pediatria): ITU afebril 5-7 mg/kg/dia VO de 6/6h por 7 dias, máx. 100 mg/dose. Solução não é mais produzida: abrir a cápsula em água filtrada para fracionar. */
            let a = Math.min(p * 5 / 4, 100), b = Math.min(p * 7 / 4, 100);
            return { v: `${a.toFixed(0)}–${b.toFixed(0)} mg 6/6h`, r: `${recHead}1) NITROFURANTOÍNA 100 MG ---------------------- 28 CÁPSULAS\nDAR ${a.toFixed(0)} A ${b.toFixed(0)} MG (5 A 7 MG/KG/DIA), VIA ORAL, DE 6/6 HORAS POR 7 DIAS.\n(SE A CRIANÇA NÃO ENGOLE CÁPSULA: DILUIR O CONTEÚDO DA CÁPSULA EM ÁGUA FILTRADA PARA FRACIONAR A DOSE.)` };
        },
        detalhes: {
            indicacao: "ITU afebril (cistite).",
            dose: "5–7 mg/kg/dia VO de 6/6h por 7 dias.",
            atencao: "Máximo 100 mg/dose. Não usar na ITU febril/pielonefrite (não atinge o rim). A solução oral não é mais produzida: diluir o conteúdo da cápsula em água filtrada."
        },
        ficha: {
            indicacoes: "ITU afebril (cistite).",
            dose: "5-7 mg/kg/dia VO de 6/6 horas por 7 dias",
            doseMaxima: "100 mg/dose.",
            apresentacoes: "Cápsula ou comprimido 100 mg (solução oral não é mais produzida).",
            via: "Oral.",
            alertasPediatricos: "Não usar na ITU febril. Para quem não engole cápsula: diluir o conteúdo em água filtrada para fracionar a dose.",
            fonteRevisao: "Whitebook (Afya) - Infecção do Trato Urinário em Pediatria (Prescrição Ambulatorial e Hospitalar), vídeo enviado pelo Dr. Jonas em 27/10/2026."
        }
    },
    "cefuroxima_vo_itu": {
        cat: "cat-urinario", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "cefuroxima zinnat axetil itu febril pielonefrite infeccao urinaria antibiotico oral suspensao",
        nome: "Cefuroxima Suspensão (ITU febril)", apres: "250 mg / 5 mL",
        info: "<strong>Posologia (Whitebook):</strong> 10–15 mg/kg/dose VO de 12/12h por 7–14 dias. Máx. 500 mg/dose.", badge: "Máx: 10 mL/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (ITU febril ambulatorial): cefuroxima 250 mg/5 mL, 10-15 mg/kg/dose (0,2-0,3 mL/kg/dose) VO de 12/12h por 7-14 dias, máx. 500 mg/dose (10 mL). */
            let a = Math.min(parseFloat(round05(p * 0.2)), 10), b = Math.min(parseFloat(round05(p * 0.3)), 10), tot = Math.ceil(b * 2 * 10);
            return { v: `${a}–${b} mL`, r: `${recHead}1) CEFUROXIMA 250 MG/5 ML ---------------------- ${tot} ML\nDAR ${String(a).replace('.', ',')} A ${String(b).replace('.', ',')} ML, VIA ORAL, DE 12/12 HORAS POR 10 DIAS.` };
        },
        detalhes: {
            indicacao: "ITU febril / pielonefrite tratada em casa (maiores de 3 meses, bom estado).",
            dose: "10–15 mg/kg/dose (0,2–0,3 mL/kg/dose) VO de 12/12h por 7 a 14 dias (a SBP recomenda 10 dias).",
            atencao: "Máximo 500 mg (10 mL) por dose. O total de mL da receita considera 10 dias. Ajustar pela urocultura."
        },
        ficha: {
            indicacoes: "ITU febril ambulatorial.",
            dose: "10-15 mg/kg/dose VO de 12/12 horas por 7-14 dias",
            doseMaxima: "500 mg/dose.",
            apresentacoes: "Suspensão 250 mg/5 mL.",
            via: "Oral.",
            fonteRevisao: "Whitebook (Afya) - Infecção do Trato Urinário em Pediatria (Prescrição Ambulatorial e Hospitalar), vídeo enviado pelo Dr. Jonas em 27/10/2026."
        }
    },
    "cefaclor_itu": {
        cat: "cat-urinario", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "cefaclor ceclor itu febril pielonefrite infeccao urinaria antibiotico oral suspensao",
        nome: "Cefaclor Suspensão (ITU febril)", apres: "250 mg / 5 mL",
        info: "<strong>Posologia (Whitebook):</strong> 6,6–13,3 mg/kg/dose VO de 8/8h por 7–14 dias. Máx. 1 g/dia.", badge: "Máx: 1 g/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (ITU febril ambulatorial): cefaclor 250 mg/5 mL, 6,6-13,3 mg/kg/dose (0,132-0,266 mL/kg/dose) VO de 8/8h por 7-14 dias, máx. 1 g/dia (333 mg/dose = 6,6 mL). */
            let a = Math.min(parseFloat(round05(p * 0.132)), 6.5), b = Math.min(parseFloat(round05(p * 0.266)), 6.5), tot = Math.ceil(b * 3 * 10);
            return { v: `${a}–${b} mL`, r: `${recHead}1) CEFACLOR 250 MG/5 ML ------------------------ ${tot} ML\nDAR ${String(a).replace('.', ',')} A ${String(b).replace('.', ',')} ML, VIA ORAL, DE 8/8 HORAS POR 10 DIAS.` };
        },
        detalhes: {
            indicacao: "ITU febril / pielonefrite tratada em casa (alternativa à cefuroxima).",
            dose: "6,6–13,3 mg/kg/dose (0,132–0,266 mL/kg/dose) VO de 8/8h por 7 a 14 dias.",
            atencao: "Máximo 1 g/dia (o app limita a 6,5 mL por dose). O total de mL da receita considera 10 dias."
        },
        ficha: {
            indicacoes: "ITU febril ambulatorial.",
            dose: "6,6-13,3 mg/kg/dose VO de 8/8 horas por 7-14 dias",
            doseMaxima: "1 g/dia.",
            apresentacoes: "Suspensão 250 mg/5 mL.",
            via: "Oral.",
            fonteRevisao: "Whitebook (Afya) - Infecção do Trato Urinário em Pediatria (Prescrição Ambulatorial e Hospitalar), vídeo enviado pelo Dr. Jonas em 27/10/2026."
        }
    },
    "profilaxia_itu": {
        cat: "cat-urinario", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "profilaxia itu quimioprofilaxia infeccao urinaria recorrente refluxo vesicoureteral sulfametoxazol trimetoprima cefalexina nitrofurantoina dose noturna",
        nome: "Profilaxia de ITU (dose única à noite)", apres: "SMX-TMP 200+40/5 mL · Cefalexina 250 mg/5 mL · Nitrofurantoína 100 mg",
        info: "<strong>Whitebook:</strong> 1x/dia antes de dormir. < 1 mês: cefalexina. > 1 mês: nitrofurantoína ou SMX-TMP.", badge: "1x à noite", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            /* Whitebook (Profilaxia de ITU): SMX-TMP 2-3 mg TMP/kg/dia (0,25-0,375 mL/kg/dia) 1x/dia antes de dormir (evitar pelo risco de resistência); cefalexina 10-15 mg/kg/dia (0,2-0,3 mL/kg) 1x/dia, máx. 2.000 mg/dia (40 mL), < 1 mês; nitrofurantoína 1-2 mg/kg/dia 1x/dia, máx. 100 mg/dia, > 1 mês. */
            let r = (a, b) => `${String(round05(a)).replace('.', ',')} A ${String(round05(b)).replace('.', ',')} ML`;
            let ce = r(Math.min(p * 0.2, 40), Math.min(p * 0.3, 40)), sm = r(p * 0.25, p * 0.375);
            let n1 = Math.min(p * 1, 100), n2 = Math.min(p * 2, 100);
            return { v: "Ver opções", r: `${recHead}ESCOLHER UMA OPÇÃO (1 VEZ AO DIA, ANTES DE DORMIR):\n\n• MENOR DE 1 MÊS: CEFALEXINA 250 MG/5 ML ---- 1 FR\n  DAR ${ce} (10 A 15 MG/KG/DIA), VIA ORAL, 1 VEZ AO DIA, À NOITE.\n\n• MAIOR DE 1 MÊS: NITROFURANTOÍNA 100 MG\n  DAR ${n1.toFixed(0)} A ${n2.toFixed(0)} MG (1 A 2 MG/KG/DIA), VIA ORAL, 1 VEZ AO DIA, À NOITE (MÁX. 100 MG/DIA).\n\n• SULFAMETOXAZOL + TRIMETOPRIMA 200+40 MG/5 ML ---- 1 FR\n  DAR ${sm} (2 A 3 MG/KG/DIA DE TRIMETOPRIMA), VIA ORAL, 1 VEZ AO DIA, À NOITE.\n  (EVITAR PELO RISCO DE RESISTÊNCIA.)` };
        },
        detalhes: {
            indicacao: "Profilaxia de ITU nos casos indicados (até o fim da investigação; ITU recorrente; refluxo de alto grau; uropatia obstrutiva).",
            dose: "Cefalexina 10–15 mg/kg/dia (< 1 mês) · Nitrofurantoína 1–2 mg/kg/dia (> 1 mês) · SMX-TMP 2–3 mg TMP/kg/dia. Sempre 1x ao dia, antes de dormir.",
            atencao: "Cefalexina máx. 2 g/dia (40 mL); nitrofurantoína máx. 100 mg/dia. O Whitebook sugere evitar SMX-TMP pelo risco de resistência."
        },
        ficha: {
            indicacoes: "Antibioticoprofilaxia de ITU.",
            dose: "Sulfametoxazol + Trimetoprima: 2-3 mg/kg/dia de trimetoprima (0,25-0,375 mL/kg/dia) VO 1x/dia antes de dormir; evitar pelo risco de resistência\nCefalexina: 10-15 mg/kg/dia VO 1x/dia antes de dormir (< 1 mês de vida)\nNitrofurantoína: 1-2 mg/kg/dia VO 1x/dia antes de dormir (> 1 mês de vida)",
            doseMaxima: "Cefalexina 40 mL/dia (2.000 mg/dia); nitrofurantoína 100 mg/dia.",
            apresentacoes: "SMX-TMP suspensão 200 + 40 mg/5 mL; cefalexina suspensão 250 mg/5 mL; nitrofurantoína 100 mg.",
            via: "Oral.",
            fonteRevisao: "Whitebook (Afya) - Infecção do Trato Urinário em Pediatria (Prescrição Ambulatorial e Hospitalar), vídeo enviado pelo Dr. Jonas em 27/10/2026."
        }
    },
    "cefuroxima_ev_itu": {
        cat: "cat-urinario", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "cefuroxima zinacef endovenosa itu febril pielonefrite hospitalar injetavel",
        nome: "Cefuroxima EV (ITU febril hospitalar)", apres: "FA 750 mg",
        info: "<strong>Conduta (Whitebook):</strong> 150 mg/kg/dia EV de 8/8h. Máx. 750 mg/dose.", badge: "Máx: 750 mg/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (ITU febril > 2 meses, hospitalar): cefuroxima 150 mg/kg/dia EV de 8/8h (dose máxima 500-750 mg/dose); diluir em SF 0,9% ou SG 5% a no mínimo 30 mg/mL; infundir em 30 min. FA 750 mg + 7,5 mL AD = 100 mg/mL. */
            let mg = Math.min(p * 50, 750), ml = mg / 100;
            return { v: `${ml.toFixed(1)} mL 8/8h`, r: `VIA ENDOVENOSA (ITU FEBRIL)\n\nCEFUROXIMA 750 MG (RECONSTITUIR EM 7,5 ML DE AD = 100 MG/ML)\nFAZER ${ml.toFixed(1)} ML (${mg.toFixed(0)} MG = 50 MG/KG/DOSE) EV DE 8/8 HORAS.\nDILUIR EM SF 0,9% OU SG 5% (CONCENTRAÇÃO MÍNIMA 30 MG/ML) E INFUNDIR EM 30 MINUTOS.\n\nDOSE MÁXIMA: 750 MG POR DOSE.` };
        },
        detalhes: {
            indicacao: "ITU febril em maiores de 2 meses com indicação de internação.",
            dose: "150 mg/kg/dia EV de 8/8h (50 mg/kg/dose).",
            atencao: "Máximo 750 mg/dose (Whitebook: 500–750 mg/dose). Passar para via oral quando melhorar, pelo antibiograma."
        },
        ficha: {
            indicacoes: "ITU febril hospitalar (maiores de 2 meses).",
            dose: "150 mg/kg/dia EV de 8/8 horas",
            doseMaxima: "500-750 mg/dose.",
            apresentacoes: "Frasco-ampola 750 mg.",
            via: "Endovenosa.",
            diluicao: "SF 0,9% ou SG 5%, concentração mínima de 30 mg/mL.",
            infusao: "30 minutos.",
            fonteRevisao: "Whitebook (Afya) - Infecção do Trato Urinário em Pediatria (Prescrição Ambulatorial e Hospitalar), vídeo enviado pelo Dr. Jonas em 27/10/2026."
        }
    },
    "amp_itu": {
        cat: "cat-urinario", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "ampicilina itu febril recem nascido lactente menor de 2 meses neonatal infeccao urinaria",
        nome: "Ampicilina EV (ITU febril < 2 meses)", apres: "FA 1 g (diluir a 30 mg/mL)",
        info: "<strong>Conduta (Whitebook):</strong> pela idade gestacional e dias de vida; > 1 mês: 50–100 mg/kg/dia de 6/6h. Por 7–14 dias.", badge: "< 2 meses", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (ITU febril < 2 meses): IG <= 34 sem e <= 7 d 50 mg/kg/dose 12/12h; IG <= 34 sem e 8-28 d 75 mg/kg/dose 12/12h; IG > 34 sem até 28 d 50 mg/kg/dose 8/8h; > 1 mês 50-100 mg/kg/dia 6/6h. Diluir em SF 0,9% a 30 mg/mL, EV em 30 min, por 7-14 dias. */
            let d = mg => `${mg.toFixed(0)} MG`;
            return { v: `${d(p * 50).toLowerCase()} (50 mg/kg)`, r: `VIA ENDOVENOSA (ITU FEBRIL < 2 MESES)\n\nAMPICILINA 1 G - DILUIR EM SF 0,9% A 30 MG/ML E INFUNDIR EM 30 MINUTOS, POR 7 A 14 DIAS:\n • IG ≤ 34 SEMANAS E ≤ 7 DIAS DE VIDA: ${d(p * 50)} (50 MG/KG/DOSE) EV DE 12/12 HORAS\n • IG ≤ 34 SEMANAS E 8 A 28 DIAS: ${d(p * 75)} (75 MG/KG/DOSE) EV DE 12/12 HORAS\n • IG > 34 SEMANAS ATÉ 28 DIAS: ${d(p * 50)} (50 MG/KG/DOSE) EV DE 8/8 HORAS\n • MAIOR DE 1 MÊS: ${d(p * 12.5)} A ${d(p * 25)} (50 A 100 MG/KG/DIA) EV DE 6/6 HORAS` };
        },
        detalhes: {
            indicacao: "ITU febril em menores de 2 meses (com gentamicina).",
            dose: "IG ≤ 34 sem: ≤ 7 dias 50 mg/kg/dose 12/12h; 8–28 dias 75 mg/kg/dose 12/12h. IG > 34 sem até 28 dias: 50 mg/kg/dose 8/8h. > 1 mês: 50–100 mg/kg/dia 6/6h.",
            atencao: "Escolher a linha pela idade gestacional e pelos dias de vida. Diluir a 30 mg/mL e infundir em 30 min."
        },
        ficha: {
            indicacoes: "ITU febril em menores de 2 meses.",
            dose: "IG ≤ 34 semanas e ≤ 7 dias de vida: 50 mg/kg/dose EV de 12/12 horas\nIG ≤ 34 semanas e 8-28 dias: 75 mg/kg/dose EV de 12/12 horas\nIG > 34 semanas e até 28 dias: 50 mg/kg/dose EV de 8/8 horas\n> 1 mês: 50-100 mg/kg/dia EV dividido de 6/6 horas",
            apresentacoes: "Frasco-ampola 1 g.",
            via: "Endovenosa.",
            diluicao: "SF 0,9% (concentração final de 30 mg/mL).",
            infusao: "30 minutos, por 7-14 dias.",
            fonteRevisao: "Whitebook (Afya) - Infecção do Trato Urinário em Pediatria (Prescrição Ambulatorial e Hospitalar), vídeo enviado pelo Dr. Jonas em 27/10/2026."
        }
    },
    "genta_itu_neo": {
        cat: "cat-urinario", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "gentamicina itu febril recem nascido lactente menor de 2 meses neonatal infeccao urinaria aminoglicosideo",
        nome: "Gentamicina EV (ITU febril < 2 meses)", apres: "Ampola 40 mg/mL (diluir a 5 mg/mL)",
        info: "<strong>Conduta (Whitebook):</strong> 4 a 5 mg/kg/dose com intervalo pela idade gestacional e dias de vida. Por 7–14 dias.", badge: "< 2 meses", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (ITU febril < 2 meses): IG <= 29 sem: 0-7 d 5 mg/kg 48/48h; 8-28 d 4 mg/kg 36/36h; >= 29 d 4 mg/kg 24/24h. IG 30-34: 0-7 d 4,5 mg/kg 36/36h; >= 8 d 4 mg/kg 24/24h. IG >= 35 e <= 7 d: 4 mg/kg 24/24h. Diluir em SF 0,9% a 5 mg/mL, EV em 60 min, 7-14 dias. */
            let d = mg => `${(mg / 40).toFixed(2)} ML (${mg.toFixed(1)} MG)`;
            return { v: `${(p * 4 / 40).toFixed(2)}–${(p * 5 / 40).toFixed(2)} mL`, r: `VIA ENDOVENOSA (ITU FEBRIL < 2 MESES)\n\nGENTAMICINA 40 MG/ML - DILUIR EM SF 0,9% A 5 MG/ML E INFUNDIR EM 60 MINUTOS, POR 7 A 14 DIAS:\n\nIG ≤ 29 SEMANAS:\n • 0 A 7 DIAS DE VIDA: ${d(p * 5)} (5 MG/KG/DOSE) DE 48/48 HORAS\n • 8 A 28 DIAS: ${d(p * 4)} (4 MG/KG/DOSE) DE 36/36 HORAS\n • 29 DIAS OU MAIS: ${d(p * 4)} (4 MG/KG/DOSE) DE 24/24 HORAS\n\nIG 30 A 34 SEMANAS:\n • 0 A 7 DIAS: ${d(p * 4.5)} (4,5 MG/KG/DOSE) DE 36/36 HORAS\n • 8 DIAS OU MAIS: ${d(p * 4)} (4 MG/KG/DOSE) DE 24/24 HORAS\n\nIG ≥ 35 SEMANAS E ≤ 7 DIAS:\n • ${d(p * 4)} (4 MG/KG/DOSE) DE 24/24 HORAS` };
        },
        detalhes: {
            indicacao: "ITU febril em menores de 2 meses (com ampicilina).",
            dose: "IG ≤ 29 sem: 5 mg/kg 48/48h (0–7 d), 4 mg/kg 36/36h (8–28 d), 4 mg/kg 24/24h (≥ 29 d). IG 30–34 sem: 4,5 mg/kg 36/36h (0–7 d), 4 mg/kg 24/24h (≥ 8 d). IG ≥ 35 sem e ≤ 7 d: 4 mg/kg 24/24h.",
            atencao: "Creatinina antes de iniciar. Diluir a 5 mg/mL e infundir em 60 min. Nefro e ototóxica."
        },
        ficha: {
            indicacoes: "ITU febril em menores de 2 meses.",
            dose: "IG ≤ 29 semanas: 0-7 dias 0,125 mL/kg/dose (5 mg/kg) EV de 48/48 horas; 8-28 dias 0,1 mL/kg/dose (4 mg/kg) de 36/36 horas; ≥ 29 dias 0,1 mL/kg/dose (4 mg/kg) de 24/24 horas\nIG 30-34 semanas: 0-7 dias 4,5 mg/kg/dose de 36/36 horas; ≥ 8 dias 0,1 mL/kg/dose (4 mg/kg) de 24/24 horas\nIG ≥ 35 semanas e ≤ 7 dias: 0,1 mL/kg/dose (4 mg/kg) de 24/24 horas",
            apresentacoes: "Ampola 40 mg/mL.",
            via: "Endovenosa.",
            diluicao: "SF 0,9% (concentração final de 5 mg/mL).",
            infusao: "60 minutos, por 7-14 dias.",
            fonteRevisao: "Whitebook (Afya) - Infecção do Trato Urinário em Pediatria (Prescrição Ambulatorial e Hospitalar), vídeo enviado pelo Dr. Jonas em 27/10/2026."
        }
    },
    "urina_furo": {
        cat: "cat-urinario", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "furosemida nefritica gnpe edema hipertensao diuretico hospitalar injetavel", nome: "Furosemida EV (GNPE / Edema)", apres: "Ampola 10 mg / mL",
        info: "<strong>Conduta:</strong> Peso * 0,1 mL EV bólus. Máx. 20 mg/dia.", badge: "Teto: 10 mg/dose (20 mg/dia)", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = Math.min(p * 0.1, 1).toFixed(1); /* 1 mg/kg/dose, teto de 10 mg/dose (1 mL) = 20 mg/dia em 12/12h */ return { v: v + " mL", r: `VIA ENDOVENOSA (GNPE / EDEMA)\n\n FAZER ${v} ML DE FUROSEMIDA (10 MG/ML) PURA POR VIA ENDOVENOSA, BÓLUS, DE 12/12 HORAS. MÁXIMO 20 MG POR DIA.` }; },
        detalhes: {
            indicacao: "Edema e hipertensão da síndrome nefrítica (GNPE).",
            dose: "1 mg/kg (Peso x 0,1 mL) EV em bolus, de 12/12h.",
            atencao: "Máximo 10 mg (1 mL) por dose, 20 mg por dia. Monitorar diurese, PA e potássio."
        }
    },
    "monuril": {
        cat: "cat-urinario", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "monuril fosfomicina sache cistite itu infeccao urinaria dose unica", nome: "Monuril (Fosfomicina) Sachê", apres: "Envelope 3 g",
        info: "<strong>Conduta:</strong> > 12 anos: 1 envelope diluído em 1 copo de água, à noite, dose única.", badgeSt: "static-blue", badge: "1 Envelope", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => {
            let alerta = (i !== "" && parseFloat(i) <= 12) ? "ATENÇÃO: indicado para maiores de 12 anos.\n\n" : "";
            return { v: "1 Envelope", r: `${alerta}${recHead}1) MONURIL ---------------------------------------- 01 SACHÊ\nDILUIR 01 ENVELOPE EM 01 COPO DE ÁGUA E TOMAR À NOITE, DOSE ÚNICA.` };
        },
        detalhes: {
            indicacao: "Cistite (maiores de 12 anos).",
            dose: "1 envelope em 1 copo de água, à noite, dose única.",
            atencao: "Indicado para maiores de 12 anos."
        }
    }
});
