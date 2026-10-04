// =====================================================
// RSI (INTUBAÇÃO) — cards com cat: "cat-rsi"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    // RSI - MATERIAIS COM ARREDONDAMENTO DE 0.5 em 0.5
    "rsi_tubo": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Materiais e Dispositivos)", 
        kw: "tubo fixacao laringo tamanho rsi dispositivos idade", nome: "Dispositivos de Via Aérea (Por Idade)", apres: "Cálculo anatômico",
        info: "<strong>Apoio Técnico:</strong> Tubos arredondados de 0,5 em 0,5 mm.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => { 
            let id = i !== "" ? parseFloat(i) : Math.max(0.1, (p - 4) / 2);
            let tc_raw = (id / 4) + 3.5;
            let ts_raw = (id / 4) + 4;
            let lam = "1";
            
            if (id <= 0.3) { tc_raw = 3.0; ts_raw = 3.0; lam = "0"; } 
            else if (id <= 1) { tc_raw = 3.5; ts_raw = 4.0; lam = "1"; } 
            else if (id <= 5) { lam = "2"; } 
            else { lam = "3"; }
            
            let tc = Math.round(tc_raw * 2) / 2;
            let ts = Math.round(ts_raw * 2) / 2;
            
            return { v: `Tubo c/ cuff: ${tc.toFixed(1)}\nTubo s/ cuff: ${ts.toFixed(1)}\nFixação: ${(tc * 3).toFixed(1)} cm`, r: `DISPOSITIVOS SELECIONADOS PELA IDADE:\n\n• LÂMINA DE LARINGOSCÓPIO: LÂMINA ${lam}\n• TUBO COM CUFF: DIÂMETRO ${tc.toFixed(1)} MM\n• TUBO SEM CUFF: DIÂMETRO ${ts.toFixed(1)} MM\n• FIXAÇÃO: ALINHAR EM ${(tc * 3).toFixed(1)} CM NA RIMA LABIAL.` }; 
        },
        detalhes: {
            indicacao: "Intubação: escolher tubo, lâmina e profundidade de fixação.",
            dose: "Com cuff: idade ÷ 4 + 3,5. Sem cuff: idade ÷ 4 + 4. Fixação: tubo x 3 cm.",
            atencao: "Valores arredondados de 0,5 em 0,5 mm. Confirmar a posição com capnografia e ausculta."
        }
    },
    "rsi_lido": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "lidocaina tce pic pre-medicacao intubacao rsi hospitalar injetavel", nome: "Lidocaína 2% (Pré-medicação)", apres: "20 mg / mL",
        info: "<strong>Dose TCE:</strong> 1.5 mg/kg IV.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = (p * 1.5) / 20; return { v: v.toFixed(2) + " mL", r: `VIA ENDOVENOSA (RSI - PRÉ-MEDICAÇÃO TCE)\n\n FAZER ${v.toFixed(2)} ML DE LIDOCAÍNA 2% SEM VASOCONSTRITOR IV/IO, AGORA.` }; },
        detalhes: {
            indicacao: "Pré-medicação na intubação de pacientes com TCE.",
            dose: "1,5 mg/kg IV/IO.",
            atencao: "Usar só a apresentação sem vasoconstritor."
        }
    },
    "rsi_fent": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "fentanil analgesia sedacao intubacao rsi hospitalar injetavel", nome: "Fentanil (Analgesia e Sedação)", apres: "50 mcg / mL (Diluído 5 mcg/mL)",
        info: "<strong>Dose:</strong> 2 mcg/kg lento.", badge: "Teto Máx: 50 mcg", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = Math.min((p * 2), 50) / 5; /* Teto de 50 mcg por dose (10 mL da solução diluída) */ return { v: v.toFixed(1) + " mL", r: `VIA ENDOVENOSA (RSI - ANALGESIA)\n\n DILUIR 1 ML DE FENTANIL EM 9 ML DE AD. FAZER ${v.toFixed(1)} ML DA SOLUÇÃO DILUÍDA IV/IO LENTA, AGORA.` }; },
        detalhes: {
            indicacao: "Analgesia e sedação na intubação.",
            dose: "2 mcg/kg IV/IO lento.",
            atencao: "Teto 50 mcg por dose. Infusão rápida pode causar rigidez torácica."
        }
    },
    "rsi_ceta": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "cetamina ketamina inducao asma intubacao rsi hospitalar injetavel cetamina bólus", nome: "Cetamina (Bólus de Indução)", apres: "50 mg / mL",
        info: "<strong>Dose:</strong> 2 mg/kg IV (Choque/Asma).", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = (p * 2) / 50; return { v: v.toFixed(2) + " mL", r: `VIA ENDOVENOSA (RSI - INDUTOR BÓLUS)\n\n FAZER ${v.toFixed(2)} ML DE CETAMINA (50 MG/ML) IV/IO, AGORA.` }; },
        detalhes: {
            indicacao: "Indução na intubação; preferida em choque e asma.",
            dose: "2 mg/kg IV/IO.",
            atencao: "Pode aumentar secreção e causar reações na recuperação."
        }
    },
    "rsi_midaz": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "midazolam dormonid sedacao inducao intubacao rsi hospitalar injetavel", nome: "Midazolam (Sedação)", apres: "5 mg / mL",
        info: "<strong>Dose:</strong> 0,2 mg/kg.", badge: "Teto Máx: 10 mg", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = Math.min((p * 0.2) / 5, 2.0); return { v: v.toFixed(2) + " mL", r: `VIA ENDOVENOSA (RSI - SEDATIVO)\n\n FAZER ${v.toFixed(2)} ML DE MIDAZOLAM (5 MG/ML) IV/IO, AGORA.` }; },
        detalhes: {
            indicacao: "Sedação na intubação.",
            dose: "0,2 mg/kg IV/IO.",
            atencao: "Máximo 10 mg por dose. Causa hipotensão, cuidado no choque."
        }
    },
    "rsi_roc": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "rocuronio bloqueador neuromuscular relaxante intubacao rsi hospitalar injetavel", nome: "Rocurônio (Bloqueador)", apres: "10 mg / mL",
        info: "<strong>Dose:</strong> 1 mg/kg.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = p * 0.1; return { v: v.toFixed(1) + " mL", r: `VIA ENDOVENOSA (RSI - BLOQUEADOR)\n\n FAZER ${v.toFixed(1)} ML DE ROCURÔNIO (10 MG/ML) IV/IO, AGORA.` }; },
        detalhes: {
            indicacao: "Bloqueio neuromuscular na intubação.",
            dose: "1 mg/kg IV/IO.",
            atencao: "Só fazer depois do sedativo e com via aérea pronta. Antídoto: sugamadex."
        }
    },
    "rsi_succi": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "succinilcolina succi bloqueador neuromuscular relaxante intubacao rsi hospitalar", nome: "Succinilcolina (Bloqueador)", apres: "FA 100 mg (Reconst. 10 mL AD)",
        info: "<strong>Dose:</strong> 1 mg/kg.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = p * 0.1; return { v: v.toFixed(1) + " mL", r: `VIA ENDOVENOSA (RSI - BLOQUEADOR RECONSTITUÍDO)\n\n RECONSTITUIR 1 FA DE SUCCINILCOLINA 100 MG EM 10 ML DE AD. FAZER ${v.toFixed(1)} ML IV/IO, AGORA.` }; },
        detalhes: {
            indicacao: "Bloqueio neuromuscular na intubação.",
            dose: "1 mg/kg IV/IO.",
            atencao: "Contraindicada em hipercalemia, queimaduras/trauma após 48h, doenças neuromusculares e história de hipertermia maligna."
        }
    },
    "rsi_cont_morfina": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Infusão Contínua)", 
        kw: "morfina analgesia infusao continua manutenção sedacao rsi tabela contínuo morfina contínuo",
        nome: "Morfina (Infusão Contínua)", apres: "Amp 10 mg/10 mL",
        info: "Doses: 5 a 20 mcg/kg/h.", badge: "Fatores: 5mcg=0.075 | 10mcg=0.15 | 15mcg=0.22 | 20mcg=0.30", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => ({ v: 'Dose (5 mcg): ' + (p * 0.075).toFixed(1) + ' ml/h', r: 'VIA ENDOVENOSA (INFUSÃO CONTÍNUA)\n\n SOLUÇÃO: 4 mL Morfina (1 mg/mL) + 56 mL SG 5% (Total 60 mL).\n VELOCIDADES NA BIC:\n • 5 mcg/kg/h: ' + (p * 0.075).toFixed(1) + ' mL/h\n • 10 mcg/kg/h: ' + (p * 0.15).toFixed(1) + ' mL/h\n • 15 mcg/kg/h: ' + (p * 0.22).toFixed(1) + ' mL/h\n • 20 mcg/kg/h: ' + (p * 0.30).toFixed(1) + ' mL/h' }),
        detalhes: {
            indicacao: "Analgesia e sedação contínuas após a intubação.",
            dose: "5 a 20 mcg/kg/h.",
            atencao: "Monitorar depressão respiratória e hipotensão. Antídoto: naloxona."
        }
    },
    "rsi_cont_cetamina": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Infusão Contínua)", 
        kw: "cetamina ketamina inducao asma sedacao infusao continua manutenção sedacao rsi tabela contínuo cetamina contínuo",
        nome: "Cetamina (Infusão Contínua)", apres: "10 mL + 50 mL SG 5% (Total 60 mL - 8.33 mg/mL)",
        info: "<strong>Diluição padrão:</strong> 10 mL Cetamina (50mg/mL) + 50 mL SG 5% (Total 60 mL - 8.33 mg/mL).",
        badge: "Tabela Oficial", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let r10 = (p * 0.072).toFixed(2);
            let r20 = (p * 0.15).toFixed(2);
            let r30 = (p * 0.22).toFixed(2);
            let r40 = (p * 0.29).toFixed(2);
            return {
                v: `10 mcg: ${r10} ml/h`,
                r: `VIA ENDOVENOSA (INFUSÃO CONTÍNUA - CETAMINA)\n\nSOLUÇÃO: 10 mL Cetamina (50 mg/mL) + 50 mL SG 5% (Totalizando 60 mL - 8.33 mg/mL).\n\nVELOCIDADES NA BOMBA DE INFUSÃO (BIC):\n• 10 mcg/kg/min: ${r10} mL/h\n• 20 mcg/kg/min: ${r20} mL/h\n• 30 mcg/kg/min: ${r30} mL/h\n• 40 mcg/kg/min: ${r40} mL/h`
            };
        },
        detalhes: {
            indicacao: "Sedação e analgesia contínuas após a intubação.",
            dose: "10 a 40 mcg/kg/min.",
            atencao: "Pode aumentar secreções e a pressão arterial."
        }
    },
    "rsi_cont_clonidina": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Infusão Contínua)", 
        kw: "clonidina sedacao infusao continua manutenção sedacao rsi tabela contínuo clonidina contínuo",
        nome: "Clonidina (Infusão Contínua)", apres: "Ampola 1 mL (150 mcg/mL)",
        info: "Doses: 0,5 a 3 mcg/kg/h.", badge: "Fatores: 0.5mcg=0.1 | 1mcg=0.2 | 2mcg=0.4 | 3mcg=0.6", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => ({ v: 'Dose (0,5 mcg): ' + (p * 0.1).toFixed(1) + ' ml/h', r: 'VIA ENDOVENOSA (INFUSÃO CONTÍNUA)\n\n SOLUÇÃO: 2 mL Clonidina + 58 mL SG 5% (Total 60 mL).\n VELOCIDADES NA BIC:\n • 0,5 mcg/kg/h: ' + (p * 0.1).toFixed(1) + ' mL/h\n • 1 mcg/kg/h: ' + (p * 0.2).toFixed(1) + ' mL/h\n • 2 mcg/kg/h: ' + (p * 0.4).toFixed(1) + ' mL/h\n • 3 mcg/kg/h: ' + (p * 0.6).toFixed(1) + ' mL/h' }),
        detalhes: {
            indicacao: "Sedação contínua (adjuvante) após a intubação.",
            dose: "0,5 a 3 mcg/kg/h.",
            atencao: "Pode causar bradicardia e hipotensão."
        }
    },
    "rsi_cont_precedex": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Infusão Contínua)", 
        kw: "precedex dexmedetomidina sedacao infusao continua manutenção sedacao rsi tabela contínuo precedex contínuo",
        nome: "Precedex (Infusão Contínua)", apres: "Ampola 2 mL (100 mcg/mL)",
        info: "Doses: 0,2 a 1 mcg/kg/h.", badge: "Fatores: 0.2mcg=0.05 | 0.4mcg=0.1 | 0.8mcg=0.2 | 1mcg=0.25", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => ({ v: 'Dose (0,2 mcg): ' + (p * 0.05).toFixed(1) + ' ml/h', r: 'VIA ENDOVENOSA (INFUSÃO CONTÍNUA)\n\n SOLUÇÃO: 2 mL Precedex + 48 mL SF 0,9% (Total 50 mL).\n VELOCIDADES NA BIC:\n • 0,2 mcg/kg/h: ' + (p * 0.05).toFixed(1) + ' mL/h\n • 0,4 mcg/kg/h: ' + (p * 0.1).toFixed(1) + ' mL/h\n • 0,8 mcg/kg/h: ' + (p * 0.2).toFixed(1) + ' mL/h\n • 1 mcg/kg/h: ' + (p * 0.25).toFixed(1) + ' mL/h' }),
        detalhes: {
            indicacao: "Sedação contínua após a intubação.",
            dose: "0,2 a 1 mcg/kg/h.",
            atencao: "Pode causar bradicardia e hipotensão."
        }
    },
    "rsi_cont_rocuronio": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Infusão Contínua)", 
        kw: "rocuronio bloqueador neuromuscular infusao continua manutenção sedacao rsi tabela contínuo rocuronio contínuo",
        nome: "Rocurônio (Infusão Contínua)", apres: "Ampola 5 mL (10 mg/mL)",
        info: "Doses: 7 a 12 mcg/kg/min.", badge: "Fatores: 7mcg=0.5 | 10mcg=0.72 | 12mcg=0.86", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => ({ v: 'Dose (7 mcg/min): ' + (p * 0.5).toFixed(1) + ' ml/h', r: 'VIA ENDOVENOSA (INFUSÃO CONTÍNUA)\n\n SOLUÇÃO: 5 mL Rocurônio + 55 mL SF 0,9% (Total 60 mL).\n VELOCIDADES NA BIC:\n • 7 mcg/kg/min: ' + (p * 0.5).toFixed(1) + ' mL/h\n • 10 mcg/kg/min: ' + (p * 0.72).toFixed(1) + ' mL/h\n • 12 mcg/kg/min: ' + (p * 0.86).toFixed(1) + ' mL/h' }),
        detalhes: {
            indicacao: "Bloqueio neuromuscular contínuo após a intubação.",
            dose: "7 a 12 mcg/kg/min.",
            atencao: "Só com sedação e analgesia adequadas."
        }
    },
    "rsi_cont_pancuronio": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Infusão Contínua)", 
        kw: "pancuronio bloqueador neuromuscular infusao continua manutenção sedacao rsi tabela contínuo pancuronio contínuo",
        nome: "Pancurônio (Infusão Contínua)", apres: "Ampola 2 mL (2 mg/mL)",
        info: "Doses: 0,4 a 1 mcg/kg/min.", badge: "Fatores: 0.4mcg=0.36 | 0.8mcg=0.72 | 1mcg=0.9", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => ({ v: 'Dose (0,4 mcg/min): ' + (p * 0.36).toFixed(1) + ' ml/h', r: 'VIA ENDOVENOSA (INFUSÃO CONTÍNUA)\n\n SOLUÇÃO: 2 mL Pancurônio + 58 mL SG 5% (Total 60 mL).\n VELOCIDADES NA BIC:\n • 0,4 mcg/kg/min: ' + (p * 0.36).toFixed(1) + ' mL/h\n • 0,8 mcg/kg/min: ' + (p * 0.72).toFixed(1) + ' mL/h\n • 1 mcg/kg/min: ' + (p * 0.9).toFixed(1) + ' mL/h' }),
        detalhes: {
            indicacao: "Bloqueio neuromuscular contínuo após a intubação.",
            dose: "0,4 a 1 mcg/kg/min.",
            atencao: "Só com sedação e analgesia adequadas. Pode causar taquicardia."
        }
    },
    "rsi_cont_lidocaina": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Infusão Contínua)", 
        kw: "lidocaina 2% pré-medicação arritmia infusao continua manutenção sedacao rsi tabela contínuo lidocaina contínuo",
        nome: "Lidocaína 2% (Infusão Contínua)", apres: "Ampola 20 mL (20 mg/mL)",
        info: "Doses: 1 a 3 mg/kg/h.", badge: "AVC ou Periférica", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => ({ v: 'Dose (1 mg AVC): ' + (p * 0.125).toFixed(1) + ' ml/h', r: 'VIA ENDOVENOSA (INFUSÃO CONTÍNUA)\n\n AVC: 20 mL Lidocaína + 30 mL SG 5% (Total 50 mL). 1 mg/kg/h = ' + (p * 0.125).toFixed(1) + ' mL/h.\n PERIFÉRICA: 20 mL Lidocaína + 380 mL SG 5% (Total 400 mL). 1 mg/kg/h = ' + (p * 1).toFixed(1) + ' mL/h.' }),
        detalhes: {
            indicacao: "Analgesia contínua e adjuvante da sedação.",
            dose: "1 a 3 mg/kg/h.",
            atencao: "Usar sem vasoconstritor. Monitorar ECG (risco de arritmia e convulsão em dose alta)."
        }
    },
    "rsi_cont_propofol": {
        cat: "cat-rsi", sub: "🏥 Uso Hospitalar (Infusão Contínua)", 
        kw: "propofol 1% inducao sedacao infusao continua manutenção sedacao rsi tabela contínuo propofol contínuo puro",
        nome: "Propofol 1% (Infusão Contínua)", apres: "Solução Pura (10 mg/mL)",
        info: "Doses: 25 a 300 mcg/kg/min.", badge: "Fatores: 25mcg=0.15 | 100mcg=0.6 | 300mcg=1.8", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => ({ v: 'Dose (25 mcg): ' + (p * 0.15).toFixed(1) + ' ml/h', r: 'VIA ENDOVENOSA (INFUSÃO CONTÍNUA - SOLUÇÃO PURA)\n\n VELOCIDADES NA BIC:\n • 25 mcg/kg/min: ' + (p * 0.15).toFixed(1) + ' mL/h\n • 100 mcg/kg/min: ' + (p * 0.6).toFixed(1) + ' mL/h\n • 300 mcg/kg/min: ' + (p * 1.8).toFixed(1) + ' mL/h' }),
        detalhes: {
            indicacao: "Sedação contínua após a intubação.",
            dose: "25 a 300 mcg/kg/min.",
            atencao: "Causa hipotensão. Uso prolongado em dose alta: risco de síndrome da infusão do propofol."
        }
    }
});
