// =====================================================
// URGÊNCIA / PALS — cards com cat: "cat-pals"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    "atropina": {
        cat: "cat-pals", sub: "🚨 Parada / Arritmias (PALS)", 
        kw: "atropina bradicardia intubacao rsi pals", nome: "Atropina", apres: "Ampola 0,25 mg/mL",
        info: "<strong>Conduta:</strong> 0,02 mg/kg (Dose Máx: 0,5 mg). Tubo ET: 0,03 mg/kg.", badge: "Máx: 0,5 mg", recLabel: "Texto para copiar:",
        calc: (p) => { 
            // Trava de segurança: calcula 0.02 * peso, mas se passar de 0.5, ele trava em 0.5 mg
            let mgIV = Math.min((p * 0.02), 0.5); 
            
            // Converte a dose em mg para ml (usando a ampola de 0,25 mg/mL)
            let volIV = (mgIV / 0.25).toFixed(2); 

            // Dose para Tubo Endotraqueal (0.03 mg/kg)
            let mgET = (p * 0.03).toFixed(2);
            
            return { 
                v: volIV + " mL (IV/IO)", 
                r: `🚨 USO HOSPITALAR (BRADICARDIA)\n\nVIA IV / IO:\nAspirar ${volIV} mL de Atropina (0,25 mg/mL) -- equivalente a ${mgIV.toFixed(2)} mg.\nAdministrar em bolus.\n* Repetir uma vez, se necessário.\n* Dose única máxima estrita de 0,5 mg.\n\nVIA TUBO ENDOTRAQUEAL (ET):\nAdministrar dose de ${mgET} mg (0,03 mg/kg).` }; 
        },
        detalhes: {
            indicacao: "Bradicardia sintomática, incluindo a bradicardia vagal durante a intubação.",
            dose: "0,02 mg/kg IV/IO. Tubo endotraqueal: 0,03 mg/kg.",
            atencao: "Máximo 0,5 mg por dose."
        }
    },
    "adenosina_pals": {
        cat: "cat-pals", sub: "🚨 Parada / Arritmias (PALS)",
        kw: "adenosina taquicardia supraventricular tsv arritmia pals", nome: "Adenosina", apres: "Ampola 3 mg/mL",
        info: "<strong>Conduta:</strong> 1ª Dose: 0,1 mg/kg (Máx: 6mg). 2ª Dose: 0,2 mg/kg (Máx: 12mg).", badge: "Bolus Rápido", recLabel: "Texto para copiar:",
        calc: (p) => {
            let mg1 = Math.min((p * 0.1), 6);
            let mg2 = Math.min((p * 0.2), 12);
            return {
                v: (mg1 / 3).toFixed(1) + " mL (1ª Dose)",
                r: `🚨 USO HOSPITALAR (TAQUICARDIA SUPRAVENTRICULAR)\n\n1ª DOSE (0,1 mg/kg):\nAspirar ${(mg1 / 3).toFixed(1)} mL de Adenosina (3 mg/mL).\nAdministrar em BOLUS IV/IO RÁPIDO (sem ET), seguido imediatamente de lavagem (flush) com solução salina.\n\n2ª DOSE SE NECESSÁRIA (0,2 mg/kg):\nAspirar ${(mg2 / 3).toFixed(1)} mL de Adenosina.\nBolus IV/IO rápido + flush salino.`
            };
        },
        detalhes: {
            indicacao: "Taquicardia supraventricular (TSV).",
            dose: "1ª dose: 0,1 mg/kg (máx. 6 mg). 2ª dose: 0,2 mg/kg (máx. 12 mg).",
            atencao: "Fazer em acesso próximo ao coração, com monitor ligado. Não usar via endotraqueal."
        }
    },
    "amiodarona_pals": {
        cat: "cat-pals", sub: "🚨 Parada / Arritmias (PALS)",
        kw: "amiodarona taquiarritmia fibrilacao pals", nome: "Amiodarona", apres: "Ampola 50 mg/mL",
        info: "<strong>Conduta:</strong> 5 mg/kg em 20 a 60 min. Repetir até 15 mg/kg. (Máx: 300 mg).", badge: "Máx: 300 mg", recLabel: "Texto para copiar:",
        calc: (p) => {
            let mg = Math.min((p * 5), 300);
            return {
                v: (mg / 50).toFixed(1) + " mL",
                r: `🚨 USO HOSPITALAR (TAQUIARRITMIAS)\n\nAspirar ${(mg / 50).toFixed(1)} mL de Amiodarona (50 mg/mL) -- equivalente a ${mg.toFixed(0)} mg.\nDiluir em SG 5% e infundir durante 20 a 60 minutos.\n\nATENÇÃO: Monitorar ECG e Pressão Arterial (Meia-vida muito longa).`
            };
        },
        detalhes: {
            indicacao: "Taquiarritmias e FV/TV sem pulso.",
            dose: "5 mg/kg em 20 a 60 min. Pode repetir até 15 mg/kg.",
            atencao: "Máximo 300 mg por dose. Monitorar ECG e PA. Não associar com procainamida."
        }
    },
    "epinefrina_pals": {
        cat: "cat-pals", sub: "🚨 Parada / Arritmias (PALS)",
        kw: "epinefrina adrenalina parada cardiaca choque pals", nome: "Epinefrina (Adrenalina)", apres: "Ampola 1 mg/mL",
        info: "<strong>Conduta IV/IO:</strong> 0,01 mg/kg (Dose Máx: 1 mg). Repetir 3 a 5 min.", badge: "Diluição 1:10.000", recLabel: "Texto para copiar:",
        calc: (p) => {
            let mgIV = Math.min((p * 0.01), 1.0);
            let volDiluida = (mgIV / 0.1).toFixed(1); // 1:10.000 = 0.1 mg/mL
            let mgET = Math.min((p * 0.1), 2.5);
            return {
                v: volDiluida + " mL (Diluída)",
                r: `🚨 USO HOSPITALAR (PARADA CARDÍACA / CHOQUE)\n\nVIA IV/IO (DILUIÇÃO 1:10.000):\nDiluir 1 ampola (1 mL) em 9 mL de Água Destilada (Concentração final: 0,1 mg/mL).\nFazer ${volDiluida} mL dessa solução. Repetir a cada 3 a 5 minutos, se necessário.\n\nVIA TUBO ENDOTRAQUEAL (PURA 1:1.000):\nAspirar ${mgET.toFixed(1)} mL puros e administrar via ET.`
            };
        },
        detalhes: {
            indicacao: "Parada cardiorrespiratória e choque.",
            dose: "IV/IO: 0,01 mg/kg, de 3 a 5 min. Tubo endotraqueal: 0,1 mg/kg.",
            atencao: "Máximo IV/IO 1 mg por dose. Conferir a diluição antes de aplicar."
        }
    },
    "glicose_pals": {
        cat: "cat-pals", sub: "🚨 Parada / Arritmias (PALS)",
        kw: "glicose hipoglicemia d10w d25w d50w bolus pals", nome: "Glicose (Bolus Hipoglicemia)", apres: "Ampolas a 10%, 25% ou 50%",
        info: "<strong>Conduta:</strong> 0,5 a 1 g/kg. Escolher a concentração conforme a idade.", badge: "Bolus Rápido", recLabel: "Texto para copiar:",
        calc: (p) => {
            return {
                v: "Ver Receita",
                r: `🚨 USO HOSPITALAR (HIPOGLICEMIA - BOLUS DE 0,5 A 1 g/kg)\n\n• RECÉM-NASCIDOS (Glicose 10%):\nAdministrar ${(p * 5).toFixed(0)} a ${(p * 10).toFixed(0)} mL (Via IV).\n\n• LACTENTES / CRIANÇAS (Glicose 25%):\nAdministrar ${(p * 2).toFixed(0)} a ${(p * 4).toFixed(0)} mL (Via IV).\n\n• ADOLESCENTES (Glicose 50%):\nAdministrar ${(p * 1).toFixed(0)} a ${(p * 2).toFixed(0)} mL (Via IV).`
            };
        },
        detalhes: {
            indicacao: "Hipoglicemia.",
            dose: "0,5 a 1 g/kg IV.",
            atencao: "Concentrações altas lesam a veia. Repetir a glicemia após o bolus."
        }
    },
    "lidocaina_pals": {
        cat: "cat-pals", sub: "🚨 Parada / Arritmias (PALS)",
        kw: "lidocaina arritmia taquiarritmia pals", nome: "Lidocaína (Taquiarritmias)", apres: "Ampola 2% (20 mg/mL) sem vaso",
        info: "<strong>Conduta:</strong> Ataque 1 mg/kg. Manutenção 20-50 mcg/kg/min (Dose Máx: 100 mg).", badge: "Máx: 100 mg", recLabel: "Texto para copiar:",
        calc: (p) => {
            let mg = Math.min((p * 1), 100);
            return {
                v: (mg / 20).toFixed(1) + " mL (Ataque)",
                r: `🚨 USO HOSPITALAR (TAQUIARRITMIAS)\n\nDOSE DE ATAQUE INICIAL (1 mg/kg):\nAspirar ${(mg / 20).toFixed(1)} mL de Lidocaína 2% (Sem Vasoconstritor).\nAdministrar via IV/IO (Tempo de injeção: 2 a 3 min).\n\nINFUSÃO DE MANUTENÇÃO:\nInfundir de 20 a 50 mcg/kg/min.`
            };
        },
        detalhes: {
            indicacao: "Taquiarritmias ventriculares (FV/TV).",
            dose: "Ataque: 1 mg/kg IV/IO. Manutenção: 20 a 50 mcg/kg/min.",
            atencao: "Máximo 100 mg no ataque. Monitorar ECG."
        }
    },
    "magnesio_pals": {
        cat: "cat-pals", sub: "🚨 Parada / Arritmias (PALS)",
        kw: "sulfato de magnesio torsades de pointes arritmia pals ev injetavel", nome: "Sulfato de Magnésio (Torsades)", apres: "Ampola a 10% (100 mg/mL)",
        info: "<strong>Conduta:</strong> 20 a 50 mg/kg em 10 a 20 minutos. (Dose Máxima: 2 g).", badge: "Máx: 2 g", recLabel: "Texto para copiar:",
        calc: (p) => {
            let mg = Math.min((p * 50), 2000); // Usando 50mg/kg como padrão para calcular o volume, travando em 2g
            return {
                v: (mg / 100).toFixed(1) + " mL (10%)",
                r: `🚨 USO HOSPITALAR (TORSADES DE POINTES)\n\nAspirar ${(mg / 100).toFixed(1)} mL de Sulfato de Magnésio a 10%.\nAdministrar via IV/IO durante 10 a 20 minutos (Pode correr mais rápido se necessário para reverter Torsades).`
            };
        },
        detalhes: {
            indicacao: "Torsades de pointes e hipomagnesemia.",
            dose: "20 a 50 mg/kg IV/IO em 10 a 20 minutos.",
            atencao: "Máximo 2 g. Pode correr mais rápido em torsades. Monitorar hipotensão."
        }
    },
    "milrinone_pals": {
        cat: "cat-pals", sub: "🚨 Parada / Arritmias (PALS)",
        kw: "milrinone choque cardiogenico pals", nome: "Milrinone", apres: "Milrinone",
        info: "<strong>Conduta:</strong> Ataque 50 mcg/kg em 10 a 60 min. Manut: 0,5 a 0,75 mcg/kg/min.", badge: "Choque", recLabel: "Texto para copiar:",
        calc: (p) => {
            let mcgInicial = p * 50;
            let mgInicial = mcgInicial / 1000;
            return {
                v: mgInicial.toFixed(2) + " mg (Ataque)",
                r: `🚨 USO HOSPITALAR (CHOQUE CARDIOGÊNICO)\n\nDOSE INICIAL (ATAQUE):\nAdministrar ${mgInicial.toFixed(2)} mg (${mcgInicial.toFixed(0)} mcg) durante 10 a 60 minutos.\n\nMANUTENÇÃO:\nInfundir de 0,5 a 0,75 mcg/kg/min.\n* Tempos de infusão mais longos e euvolemia reduzem o risco de hipotensão.`
            };
        },
        detalhes: {
            indicacao: "Choque cardiogênico.",
            dose: "Ataque: 50 mcg/kg em 10 a 60 min. Manutenção: 0,5 a 0,75 mcg/kg/min.",
            atencao: "Causa hipotensão: infundir devagar e manter o paciente euvolêmico."
        }
    },
    "naloxona_pals": {
        cat: "cat-pals", sub: "🚨 Parada / Arritmias (PALS)",
        kw: "naloxona opioide reversao antidoto pals", nome: "Naloxona", apres: "Ampola 0,4 mg/mL",
        info: "<strong>Conduta:</strong> <5 anos/20kg: 0,1 mg/kg. >5 anos/20kg: 2 mg.", badge: "Antídoto Opioide", recLabel: "Texto para copiar:",
        calc: (p, i) => {
            let idAnos = i !== "" ? parseFloat(i) : null;
            let mg = (p > 20 || (idAnos !== null && idAnos > 5)) ? 2.0 : (p * 0.1);
            return {
                v: (mg / 0.4).toFixed(2) + " mL",
                r: `🚨 USO HOSPITALAR (REVERSÃO DE OPIOIDES)\n\nAspirar ${(mg / 0.4).toFixed(2)} mL de Naloxona (0,4 mg/mL).\nAdministrar via IV a cada 2 a 3 minutos, conforme necessário.\n\n* Diminuir a dose para reverter a depressão respiratória causada por uso terapêutico de opioides (1 a 5 mcg/kg, ajustar a dose conforme o efeito).`
            };
        },
        detalhes: {
            indicacao: "Intoxicação por opioide e depressão respiratória.",
            dose: "<5 anos ou ≤20 kg: 0,1 mg/kg. >5 anos ou >20 kg: 2 mg. IV a cada 2 a 3 min, se necessário.",
            atencao: "Efeito mais curto que o do opioide: observar nova depressão. Dose menor (1-5 mcg/kg) para uso terapêutico."
        }
    },
    "procainamida_pals": {
        cat: "cat-pals", sub: "🚨 Parada / Arritmias (PALS)",
        kw: "procainamida taquiarritmia pals", nome: "Procainamida", apres: "Ampola 100 mg/mL",
        info: "<strong>Conduta:</strong> 15 mg/kg durante 30 a 60 minutos. NÃO dar com Amiodarona.", badge: "Arritmias", recLabel: "Texto para copiar:",
        calc: (p) => {
            let mg = p * 15;
            return {
                v: (mg / 100).toFixed(1) + " mL",
                r: `🚨 USO HOSPITALAR (TAQUIARRITMIAS)\n\nAspirar ${(mg / 100).toFixed(1)} mL de Procainamida (100 mg/mL).\nInfundir via IV/IO durante 30 a 60 minutos.\n\nATENÇÃO:\nNÃO administrar com Amiodarona.\nMonitorar ECG e Pressão Arterial.`
            };
        },
        detalhes: {
            indicacao: "Taquiarritmias (TSV refratária e TV com pulso).",
            dose: "15 mg/kg IV/IO em 30 a 60 minutos.",
            atencao: "Não associar com amiodarona. Monitorar ECG e PA."
        }
    },
    "bicarbonato_pals": {
        cat: "cat-pals", sub: "🚨 Parada / Arritmias (PALS)",
        kw: "bicarbonato de sodio acidose hipercalemia pals", nome: "Bicarbonato de Sódio 8,4%", apres: "Ampola 8,4% (1 mEq/mL)",
        info: "<strong>Conduta:</strong> 1 mEq/kg em bolus lento. (Dose máxima: 50 mEq).", badge: "Máx: 50 mEq", recLabel: "Texto para copiar:",
        calc: (p) => {
            let meq = Math.min((p * 1), 50);
            return {
                v: meq.toFixed(1) + " mL",
                r: `🚨 USO HOSPITALAR (ACIDOSE METABÓLICA / HIPERCALEMIA)\n\nAspirar ${meq.toFixed(1)} mL de Bicarbonato de Sódio a 8,4% (1 mEq/mL).\nAdministrar em BOLUS LENTO.\nMonitorar gasometria arterial e ECG após ventilação adequada.`
            };
        },
        detalhes: {
            indicacao: "Acidose metabólica grave e hipercalemia.",
            dose: "1 mEq/kg em bolus lento.",
            atencao: "Máximo 50 mEq. Só após ventilação adequada. Monitorar gasometria e ECG."
        }
    }
});
