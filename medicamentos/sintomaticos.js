// =====================================================
// SINTOMÁTICOS (FEBRE E DOR) — cards com cat: "cat-sintomaticos"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    "dip_gts": {
        cat: "cat-sintomaticos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "dipirona gotas febre dor sintomaticos oral ambulatorial",
        nome: "Dipirona Gotas", apres: "500 mg / mL (1 gota = 25 mg)",
        info: "<strong>Posologia:</strong> 15 mg/kg/dose (0,6 gota/kg) VO de 6/6h se dor ou febre.", badge: "Teto Máx: 40 gotas (1 g)", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            // SBP (Manejo da febre aguda): 10-16 mg/kg/dose de 6/6 ou 8/8h, máx. 40-64 mg/kg/dia, a partir de 3 meses e 5 kg.
            // App: 15 mg/kg/dose (0,6 gota/kg) de 6/6h = 60 mg/kg/dia. Teto absoluto de 40 gotas (1 g) por dose.
            if ((i !== "" && parseFloat(i) < 0.25) || p < 5) return { v: "Contraind.", r: "ATENÇÃO: Dipirona indicada a partir de 3 meses de idade e 5 kg (SBP)." };
            let v = Math.min(Math.round(p * 0.6), 40);
            return { v: v + " gts", r: `${recHead}1) DIPIRONA 500 MG/ML --------------------- 1 FR\nDAR ${v} GOTAS, VIA ORAL, DE 6/6 HORAS, SE DOR OU FEBRE (TEMPERATURA MAIOR QUE 37,5°C).` };
        },
        detalhes: {
            indicacao: "Febre e dor leve a moderada.",
            dose: "15 mg/kg/dose (0,6 gota/kg) VO de 6/6h, se dor ou febre (>37,5°C).",
            atencao: "Máximo 40 gotas (1 g) por dose. Não alternar nem combinar antitérmicos (risco de superdosagem, sem benefício). A partir de 3 meses e 5 kg. Máximo 64 mg/kg/dia."
        },
        ficha: {
            indicacoes: "Febre associada a desconforto evidente (choro intenso, irritabilidade, redução da atividade, do apetite ou do sono) e dor.",
            dose: "Febre e dor: 15 mg/kg/dose (0,6 gota/kg) VO de 6/6 horas\nFaixa SBP: 10-16 mg/kg/dose de 6/6 ou 8/8 horas",
            doseMaxima: "40-64 mg/kg/dia (SBP). Teto absoluto do app: 1 g por dose.",
            apresentacoes: "Gotas 500 mg/mL (1 gota = 25 mg).",
            via: "Oral.",
            intervalo: "6/6 ou 8/8 horas.",
            contraindicacoes: "Menores de 3 meses ou com menos de 5 kg.",
            alertasPediatricos: "O uso alternado ou combinado de antitérmicos não é recomendado: pode confundir familiares e cuidadores e aumentar o risco de superdosagem, sem benefício sobre a monoterapia. O antitérmico deve ser indicado quando a febre estiver associada a desconforto evidente.",
            fonteRevisao: "SBP - Documento Científico Manejo da febre aguda (Depto. de Pediatria Ambulatorial e Infectologia): https://www.sbp.com.br/fileadmin/user_upload/23229c-DC_Manejo_da_febre_aguda.pdf - consultado em out/2026."
        }
    },
    "dip_xpe": {
        cat: "cat-sintomaticos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "dipirona xarope febre dor sintomaticos oral ambulatorial", nome: "Dipirona Xarope", apres: "50 mg / mL",
        info: "<strong>Posologia:</strong> 15 mg/kg/dose (Peso x 0,3 mL) VO de 6/6h.", badge: "Teto Máx: 20 mL (1 g)", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            // SBP: 10-16 mg/kg/dose, máx. 40-64 mg/kg/dia, a partir de 3 meses e 5 kg. App: 15 mg/kg/dose de 6/6h, teto 1 g (20 mL) por dose.
            if ((i !== "" && parseFloat(i) < 0.25) || p < 5) return { v: "Contraind.", r: "ATENÇÃO: Dipirona indicada a partir de 3 meses de idade e 5 kg (SBP)." };
            let v = Math.min(parseFloat(round05(p * 0.3)), 20).toFixed(1);
            return { v: v + " mL", r: `${recHead}1) DIPIRONA 50 MG/ML ---------------------- 1 FR\nDAR ${v} ML, VIA ORAL, DE 6/6 HORAS, SE DOR OU FEBRE (>37,5°C).` };
        },
        detalhes: {
            indicacao: "Febre e dor leve a moderada.",
            dose: "15 mg/kg/dose (Peso x 0,3 mL) VO de 6/6h, se dor ou febre.",
            atencao: "Máximo 20 mL (1 g) por dose. Não alternar nem combinar antitérmicos (risco de superdosagem, sem benefício). A partir de 3 meses e 5 kg. Máximo 64 mg/kg/dia."
        },
        ficha: {
            indicacoes: "Febre associada a desconforto evidente (choro intenso, irritabilidade, redução da atividade, do apetite ou do sono) e dor.",
            dose: "Febre e dor: 15 mg/kg/dose (0,3 mL/kg) VO de 6/6 horas\nFaixa SBP: 10-16 mg/kg/dose de 6/6 ou 8/8 horas",
            doseMaxima: "40-64 mg/kg/dia (SBP). Teto absoluto do app: 1 g por dose.",
            apresentacoes: "Solução oral 50 mg/mL.",
            via: "Oral.",
            intervalo: "6/6 ou 8/8 horas.",
            contraindicacoes: "Menores de 3 meses ou com menos de 5 kg.",
            alertasPediatricos: "O uso alternado ou combinado de antitérmicos não é recomendado: pode confundir familiares e cuidadores e aumentar o risco de superdosagem, sem benefício sobre a monoterapia. O antitérmico deve ser indicado quando a febre estiver associada a desconforto evidente.",
            fonteRevisao: "SBP - Documento Científico Manejo da febre aguda (Depto. de Pediatria Ambulatorial e Infectologia): https://www.sbp.com.br/fileadmin/user_upload/23229c-DC_Manejo_da_febre_aguda.pdf - consultado em out/2026."
        }
    },
    "pct_gts": {
        cat: "cat-sintomaticos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "paracetamol gotas febre dor sintomaticos oral ambulatorial", nome: "Paracetamol Gotas", apres: "200 mg / mL",
        info: "<strong>Posologia:</strong> 1 gota/kg/dose VO de 6/6h se dor ou febre (>37,5°C).", badge: "Teto Máx: 35 gotas", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = Math.min(Math.round(p), 35); return { v: v + " gts", r: `${recHead}1) PARACETAMOL 200 MG/ML ------------------ 1 FR\nDAR ${v} GOTAS, VIA ORAL, DE 6/6 HORAS, SE DOR OU FEBRE (TEMPERATURA MAIOR QUE 37,5°C).` }; },
        detalhes: {
            indicacao: "Febre e dor leve a moderada.",
            dose: "1 gota/kg/dose VO de 6/6h, se dor ou febre (>37,5°C).",
            atencao: "Máximo 35 gotas por dose. Risco de hepatotoxicidade se ultrapassar a dose diária."
        }
    },
    "pct_bebe": {
        cat: "cat-sintomaticos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "paracetamol bebe solução oral febre dor oral ambulatorial", nome: "Paracetamol Bebê", apres: "100 mg / mL",
        info: "<strong>Posologia:</strong> Dar 0,15 x Peso mL por via oral de 6/6 horas.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = round05(0.15 * p); return { v: v + " mL", r: `${recHead}1) PARACETAMOL SOLUÇÃO BEBÊ 100 MG/ML ------ 1 FR\nDAR ${v} ML, VIA ORAL, DE 6/6 HORAS SE DOR OU FEBRE (>37,5°C).` }; },
        detalhes: {
            indicacao: "Febre e dor leve a moderada em lactentes.",
            dose: "0,15 mL/kg/dose (15 mg/kg) VO de 6/6h, se dor ou febre.",
            atencao: "Concentração diferente das gotas (100 mg/mL). Conferir a apresentação antes de orientar."
        }
    },
    "ibu_gts": {
        cat: "cat-sintomaticos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "ibuprofeno gotas alivium febre dor sintomaticos oral ambulatorial", nome: "Ibuprofeno Gotas (Alivium)", apres: "100 mg / mL",
        info: "<strong>Posologia:</strong> 1 gota/kg/dose VO de 6/6h ou 8/8h. Liberado >6 meses.", badge: "Teto: 400 mg (<12a) | 600 mg (≥12a)", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => { /* 1 gota = 5 mg. Teto por dose: 400 mg (80 gts) abaixo de 12 anos, 600 mg (120 gts) a partir de 12. Sem idade, usa o teto menor. */ let teto = (i !== "" && parseFloat(i) >= 12) ? 120 : 80; let v = Math.min(Math.round(p), teto); return { v: v + " gts", r: `${recHead}1) IBUPROFENO 100 MG/ML ------------------- 1 FR\nDAR ${v} GOTAS, VIA ORAL, DE 6/6 HORAS, SE DOR OU FEBRE (TEMPERATURA MAIOR QUE 37,5°C).` }; },
        detalhes: {
            indicacao: "Febre e dor; efeito anti-inflamatório.",
            dose: "1 gota/kg/dose (5 mg/kg) VO de 6/6h ou 8/8h.",
            atencao: "Liberado a partir de 6 meses. Máximo por dose: 400 mg (80 gotas) abaixo de 12 anos, 600 mg (120 gotas) a partir de 12. Evitar em desidratação, dengue e doença renal."
        }
    },
    "ibu_50": {
        cat: "cat-sintomaticos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "ibuprofeno gotas febre dor sintomaticos oral ambulatorial", nome: "Ibuprofeno Gotas", apres: "50 mg / mL",
        info: "<strong>Posologia:</strong> Dar 2 x Peso em gotas por via oral de 6/6 horas.", badge: "Teto: 400 mg (<12a) | 600 mg (≥12a)", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => { /* 1 gota = 2,5 mg. Teto por dose: 400 mg (160 gts) abaixo de 12 anos, 600 mg (240 gts) a partir de 12. Sem idade, usa o teto menor. */ let teto = (i !== "" && parseFloat(i) >= 12) ? 240 : 160; let v = Math.min(Math.round(p * 2), teto); return { v: v + " gts", r: `${recHead}1) IBUPROFENO GOTAS 50 MG/ML ---------------- 1 FR\nDAR ${v} GOTAS, VIA ORAL, DE 6/6 HORAS SE FEBRE (>37,5°C).` }; },
        detalhes: {
            indicacao: "Febre e dor; efeito anti-inflamatório.",
            dose: "2 gotas/kg/dose (5 mg/kg) VO de 6/6h.",
            atencao: "Liberado a partir de 6 meses. Máximo por dose: 400 mg (160 gotas) abaixo de 12 anos, 600 mg (240 gotas) a partir de 12. Evitar em desidratação, dengue e doença renal."
        }
    },
    "ceto_oral": {
        cat: "cat-sintomaticos", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "cetoprofeno solucao oral gotas dor febre anti-inflamatorio",
        nome: "Cetoprofeno Solução Oral", apres: "20 mg / mL (1 mg = 1 gota)",
        info: "<strong>Posologia:</strong> ≥6m: 0,5-1 mg/kg | >1a: até 1 mg/kg (máx 50gts/dose) | 7-11a: 25gts | >12a: 50gts. (6/6h ou 8/8h, máx 300gts/dia). Uso máx 3 dias.",
        badge: "Uso ≤ 3 dias", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            if (i !== "" && parseFloat(i) < 0.5) return { v: "Contraind.", r: "ATENÇÃO: Cetoprofeno oral não recomendado para menores de 6 meses." };
            let pNum = parseFloat(p);
            let id = i !== "" ? parseFloat(i) : 2;
            let gts = 10;
            let dosagemTxt = "";

            if (id >= 12 || pNum >= 40) {
                gts = 50;
                dosagemTxt = "50 GOTAS (50 MG)";
            } else if (id >= 7) {
                gts = 25;
                dosagemTxt = "25 GOTAS (25 MG)";
            } else if (id >= 1) {
                gts = Math.min(Math.round(pNum), 50);
                dosagemTxt = `${gts} GOTAS (${gts} MG)`;
            } else {
                gts = Math.min(Math.round(pNum * 0.75), 25);
                dosagemTxt = `${gts} GOTAS`;
            }

            return {
                v: `${gts} gts`,
                r: `${recHead}1) CETOPROFENO SOLUÇÃO ORAL 20 MG/ML ------- 1 FR\nDAR ${dosagemTxt} VIA ORAL, DE 6/6 OU 8/8 HORAS, POR NO MÁXIMO 3 DIAS.\n(1 mg equivale a 1 gota. Dose máxima diária: 300 gotas/dia).`
            };
        },
        detalhes: {
            indicacao: "Dor e febre; efeito anti-inflamatório.",
            dose: "6m-1a: 0,5-1 mg/kg | >1a: até 1 mg/kg (máx. 50 gts) | 7-11a: 25 gts | ≥12a: 50 gts. De 6/6h ou 8/8h (1 gota = 1 mg).",
            atencao: "Não usar em menores de 6 meses. Máximo 300 gotas/dia e no máximo 3 dias de uso."
        }
    },
    "buscopan": {
        cat: "cat-sintomaticos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "buscopan gotas escopolamina dor abdominal colica oral ambulatorial", nome: "Buscopan Gotas (Escopolamina)", apres: "10 mg / mL",
        info: "<strong>Posologia:</strong> Evitar em RN. 1-3m: 0,5mg/kg | 3-11m: 0,7mg/kg | 1-6a: 0,4mg/kg | >6a: 20 a 40 gotas (8/8h).", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            let idAnos = i !== "" ? parseFloat(i) : null;
            let pNum = parseFloat(p);
            
            // Sistema de segurança: se preencher só o peso, o sistema estima a idade para não quebrar a regra
            if (idAnos === null && pNum) {
                if (pNum < 4) idAnos = 0.05; // Recém-nascido (< 1 mês)
                else if (pNum < 6) idAnos = 0.16; // 1 a 3 meses
                else if (pNum < 10) idAnos = 0.5; // 3 a 11 meses
                else if (pNum <= 20) idAnos = 3; // 1 a 6 anos
                else idAnos = 7; // > 6 anos
            }
            
            if (idAnos === null || !pNum) return { v: "—", r: "Insira o peso e a idade acima para calcular." };

            let meses = idAnos * 12;
            
            // Regra 1: Evitar em Recém-nascido
            if (meses < 1) return { v: "Evitar", r: "ATENÇÃO: Evitar o uso em recém-nascidos (< 1 mês)." };

            let gotas;
            let txtGotas;

            // Sabendo que 1 gota = 0,5 mg
            if (meses < 3) {
                // 0,5 mg/kg = 1 gota/kg
                gotas = Math.round(pNum * 1);
                txtGotas = `${gotas} GOTAS`;
            } else if (meses < 12) {
                // 0,7 mg/kg = 1,4 gotas/kg
                gotas = Math.round(pNum * 1.4);
                txtGotas = `${gotas} GOTAS`;
            } else if (idAnos <= 6) {
                // 0,4 mg/kg = 0,8 gotas/kg
                gotas = Math.round(pNum * 0.8);
                txtGotas = `${gotas} GOTAS`;
            } else {
                // > 6 anos = 20 a 40 gotas
                gotas = "20 a 40";
                txtGotas = `20 A 40 GOTAS`;
            }

            return {
                v: `${gotas} gts`,
                r: `${recHead}1) BUSCOPAN GOTAS 10 MG/ML ------------------ 1 FR\nDAR ${txtGotas}, VIA ORAL, DE 8/8 HORAS SE CÓLICAS OU DORES ABDOMINAIS.`
            };
        },
        detalhes: {
            indicacao: "Cólica abdominal (espasmo do trato gastrointestinal).",
            dose: "1-3m: 0,5 mg/kg | 3-11m: 0,7 mg/kg | 1-6a: 0,4 mg/kg | >6a: 20 a 40 gotas. De 8/8h.",
            atencao: "Evitar em recém-nascidos. Calcula melhor com peso e idade preenchidos."
        }
    },
    "simet": {
        cat: "cat-sintomaticos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "simeticona gotas gases distensao abdominal oral ambulatorial", nome: "Simeticona Gotas", apres: "75 mg / mL",
        info: "<strong>Posologia:</strong> Lactentes: 6 gotas | <12 anos: 10 gotas | >12 anos: 16 gotas de 8/8h.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = "6 gts"; if(p>12)v="10 gts"; if(p>35)v="16 gts"; return { v: v, r: `${recHead}1) SIMETICONA GOTAS 75 MG/ML ----------------- 1 FR\nDAR ${v} VIA ORAL, DE 8/8 HORAS SE DISTENSÃO OU GASES.` }; },
        detalhes: {
            indicacao: "Gases e distensão abdominal.",
            dose: "Lactentes: 6 gotas | <12 anos: 10 gotas | >12 anos: 16 gotas. De 8/8h.",
            atencao: "Sem efeito sistêmico importante. Reavaliar se houver vômitos, febre ou distensão persistente."
        }
    },
    "dip_inj": {
        cat: "cat-sintomaticos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "dipirona ev im febre dor hospitalar injetavel", nome: "Dipirona Injetável", apres: "Ampola 500 mg / mL",
        info: "<strong>Conduta:</strong> 15 mg/kg/dose (0,03 mL/kg). EV: diluir em 9 mL AD lento. IM: sem diluir.", badge: "Teto Máx: 2 mL (1 g)", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => { 
            // SBP: 10-16 mg/kg/dose, a partir de 3 meses e 5 kg. App: 15 mg/kg/dose (0,03 mL/kg), teto 2 mL (1 g) por dose.
            if ((i !== "" && parseFloat(i) < 0.25) || p < 5) return { v: "Contraind.", r: "ATENÇÃO: Dipirona indicada a partir de 3 meses de idade e 5 kg (SBP)." };
            let v = Math.min((p * 0.03), 2.0).toFixed(2); 
            return { 
                v: v + " mL", 
                r: `USO HOSPITALAR (ANALGESIA / ANTITÉRMICO)\n\nOPÇÃO ENDOVENOSA:\nAspirar ${v} mL de Dipirona (500 mg/mL). Diluir em 9 mL de Água Destilada e administrar por via EV LENTA.\n\nOPÇÃO INTRAMUSCULAR:\nAspirar ${v} mL de Dipirona (500 mg/mL) e administrar por via IM profunda (NÃO DILUIR).\n\n(Administrar de 6/6 horas se dor ou febre)` 
            }; 
        },
        detalhes: {
            indicacao: "Febre e dor em ambiente hospitalar.",
            dose: "15 mg/kg/dose (0,03 mL/kg) EV ou IM de 6/6h.",
            atencao: "Máximo 2 mL (1 g) por dose. EV lento: infusão rápida pode causar hipotensão. Não alternar nem combinar antitérmicos (risco de superdosagem, sem benefício). A partir de 3 meses e 5 kg. Máximo 64 mg/kg/dia."
        },
        ficha: {
            indicacoes: "Febre associada a desconforto evidente (choro intenso, irritabilidade, redução da atividade, do apetite ou do sono) e dor.",
            dose: "Febre e dor: 15 mg/kg/dose (0,03 mL/kg) EV ou IM de 6/6 horas\nFaixa SBP: 10-16 mg/kg/dose de 6/6 ou 8/8 horas",
            doseMaxima: "40-64 mg/kg/dia (SBP). Teto absoluto do app: 1 g por dose.",
            apresentacoes: "Ampola 500 mg/mL.",
            via: "Endovenosa ou intramuscular.",
            intervalo: "6/6 ou 8/8 horas.",
            contraindicacoes: "Menores de 3 meses ou com menos de 5 kg.",
            alertasPediatricos: "O uso alternado ou combinado de antitérmicos não é recomendado: pode confundir familiares e cuidadores e aumentar o risco de superdosagem, sem benefício sobre a monoterapia. O antitérmico deve ser indicado quando a febre estiver associada a desconforto evidente.",
            diluicao: "EV: diluir em 9 mL de água destilada. IM: não diluir.",
            infusao: "EV lenta (infusão rápida pode causar hipotensão). IM profunda.",
            fonteRevisao: "SBP - Documento Científico Manejo da febre aguda (Depto. de Pediatria Ambulatorial e Infectologia): https://www.sbp.com.br/fileadmin/user_upload/23229c-DC_Manejo_da_febre_aguda.pdf - consultado em out/2026."
        }
    },
    "tramadol_gts": {
        cat: "cat-sintomaticos", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "tramadol tramal dor analgesico opioide gotas oral", nome: "Tramadol Gotas", apres: "100 mg / mL (2,5 mg/gota)",
        info: "<strong>Posologia:</strong> 1 mg/kg/dose de 6/6h. Máx. 400 mg/dia.", badge: "Máx: 100 mg/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            // 1 mg/kg/dose (faixa 1-2 mg/kg) de 6/6h. Máximo 400 mg/dia = 100 mg/dose (40 gotas).
            let gts = Math.min(Math.round(p / 2.5), 40);
            return { v: gts + " gts", r: `${recHead}1) TRAMADOL GOTAS 100 MG/ML ---------------- 1 FR\nDAR ${gts} GOTAS (${(gts * 2.5).toFixed(1)} MG), VIA ORAL, DE 6/6 HORAS, SE DOR. MÁXIMO 400 MG POR DIA.` };
        },
        detalhes: {
            indicacao: "Dor moderada a intensa que não melhora com dipirona ou paracetamol.",
            dose: "1 mg/kg/dose (faixa 1-2 mg/kg) VO de 6/6h. 1 gota = 2,5 mg.",
            atencao: "Máximo 400 mg/dia (100 mg = 40 gotas por dose). Risco de depressão respiratória e sonolência."
        }
    },
    "buscopan_composto": {
        cat: "cat-sintomaticos", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "buscopan composto hioscina escopolamina dipirona colica dor abdominal gotas", nome: "Buscopan Composto Gotas (Hioscina + Dipirona)", apres: "6,67 + 333,4 mg/mL (0,5 + 25 mg/gota)",
        info: "<strong>Posologia:</strong> 1-6a: 5-10 gotas | >6a: 10-20 gotas. De 8/8h ou 6/6h.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            if (i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(i);
            if (id < 1) return { v: "Evitar", r: "ATENÇÃO: Evitar o uso em menores de 1 ano (lactentes)." };
            let gts = id <= 6 ? "5 A 10 GOTAS" : "10 A 20 GOTAS";
            return { v: id <= 6 ? "5-10 gts" : "10-20 gts", r: `${recHead}1) BUSCOPAN COMPOSTO GOTAS ------------------ 1 FR\nDAR ${gts}, VIA ORAL, DE 8/8 HORAS, SE CÓLICA OU DOR ABDOMINAL.` };
        },
        detalhes: {
            indicacao: "Cólica e dor abdominal.",
            dose: "1-6 anos: 5-10 gotas | >6 anos: 10-20 gotas. VO de 8/8h ou 6/6h.",
            atencao: "Contém dipirona: confirmar alergia. Evitar em lactentes."
        }
    },
    "buscopan_composto_ev": {
        cat: "cat-sintomaticos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "buscopan composto hioscina escopolamina dipirona colica dor abdominal endovenoso hospitalar injetavel", nome: "Buscopan Composto EV", apres: "Ampola 6,67 + 333,4 mg/mL",
        info: "<strong>Conduta:</strong> 0,03 x Peso em mL EV lento (5 min).", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let v = (p * 0.03).toFixed(2);
            return { v: v + " mL", r: `VIA ENDOVENOSA (CÓLICA / DOR ABDOMINAL)\n\n Fazer ${v} mL de Buscopan Composto EV LENTO, em 5 minutos, de 8/8 ou 6/6 horas, se dor.` };
        },
        detalhes: {
            indicacao: "Cólica e dor abdominal em ambiente hospitalar.",
            dose: "0,03 x Peso em mL EV de 8/8h ou 6/6h.",
            atencao: "Fazer lento, em 5 minutos. Contém dipirona: confirmar alergia."
        }
    },
    "colikids": {
        cat: "cat-sintomaticos", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "colikids lactobacillus reuteri probiotico colica lactente gotas", nome: "Colikids Gotas (Lactobacillus reuteri)", apres: "Frasco 5 mL",
        info: "<strong>Posologia:</strong> 5 gotas 1x ao dia.", badgeSt: "static-blue", badge: "5 Gotas", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "5 gts", r: `${recHead}1) COLIKIDS GOTAS ----------------------------- 1 FR\nDAR 5 GOTAS, VIA ORAL, 1 VEZ AO DIA. PODE DILUIR EM SUCO OU OUTRO LÍQUIDO, EXCETO LÍQUIDOS QUENTES.` }),
        detalhes: {
            indicacao: "Cólica do lactente (probiótico).",
            dose: "5 gotas VO 1x ao dia.",
            atencao: "Não misturar com líquidos quentes."
        }
    }
});
