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
    "sepse_expansao": {
        cat: "cat-pals", sub: "🏥 Uso Hospitalar (Choque Séptico)",
        kw: "sepse choque septico expansao volemica bolus cristaloide ringer lactato soro fisiologico ressuscitacao volume",
        nome: "Expansão na Sepse / Choque Séptico (Cristaloide)", apres: "Ringer lactato (preferir) ou SF 0,9%",
        info: "<strong>Conduta (SSC 2020):</strong> bolus de 10 a 20 mL/kg com reavaliação após cada um; até 40 a 60 mL/kg na 1ª hora onde há UTI.", badge: "Máx: 1.000 mL por bolus", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Surviving Sepsis Campaign pediátrica 2020: 10-20 mL/kg por bolus, até 40-60 mL/kg na 1ª hora (com UTI), parando se sobrecarga. Sem UTI: só se hipotensão, até 40 mL/kg na 1ª hora. Cristaloide balanceado preferido. Teto do app: 1.000 mL por bolus (adulto). */
            let b10 = Math.min(p * 10, 1000), b20 = Math.min(p * 20, 1000);
            let h40 = p * 40, h60 = p * 60;
            return { v: `${b10.toFixed(0)}–${b20.toFixed(0)} mL por bolus`, r: `VIA ENDOVENOSA (SEPSE / CHOQUE SÉPTICO - EXPANSÃO)\n\nRINGER LACTATO (OU SF 0,9%) ${b10.toFixed(0)} A ${b20.toFixed(0)} ML (10 A 20 ML/KG) EV EM BOLUS, EM 5 A 20 MINUTOS.\nREAVALIAR APÓS CADA BOLUS (PERFUSÃO, FC, PA, FÍGADO, CREPITAÇÕES, SpO2).\nREPETIR SE MÁ PERFUSÃO E SEM SINAIS DE SOBRECARGA, ATÉ ${h40.toFixed(0)} A ${h60.toFixed(0)} ML (40 A 60 ML/KG) NA 1ª HORA (ONDE HÁ UTI).\n\nPARAR SE: CREPITAÇÕES, HEPATOMEGALIA, PIORA DA SpO2 OU DO DESCONFORTO RESPIRATÓRIO.\nSEM UTI DISPONÍVEL: SÓ FAZER BOLUS SE HIPOTENSÃO (ATÉ ${h40.toFixed(0)} ML NA 1ª HORA); SEM HIPOTENSÃO, MANTER SÓ A HIDRATAÇÃO DE MANUTENÇÃO.` };
        },
        detalhes: {
            indicacao: "Sepse com má perfusão ou choque séptico.",
            dose: "10 a 20 mL/kg EV por bolus, reavaliando após cada um; até 40 a 60 mL/kg na 1ª hora onde há UTI.",
            atencao: "Preferir cristaloide balanceado (Ringer lactato). Parar se sobrecarga (crepitações, hepatomegalia). Sem UTI e sem hipotensão: não fazer bolus (SSC 2020). Teto do app: 1.000 mL por bolus."
        },
        ficha: {
            indicacoes: "Ressuscitação volêmica na sepse com má perfusão e no choque séptico.",
            dose: "Com UTI disponível: 10-20 mL/kg por bolus, até 40-60 mL/kg na 1ª hora, guiado pela perfusão e parando se sobrecarga\nSem UTI e sem hipotensão: não fazer bolus; manter hidratação de manutenção\nSem UTI e com hipotensão: até 40 mL/kg na 1ª hora (10-20 mL/kg por bolus)",
            doseMaxima: "Teto do app: 1.000 mL por bolus.",
            apresentacoes: "Ringer lactato (cristaloide balanceado, preferido) ou SF 0,9%.",
            via: "Endovenosa ou intraóssea.",
            alertasPediatricos: "Não usar albumina na ressuscitação inicial, nem amidos ou gelatinas (SSC 2020). Reavaliar após cada bolus: a hipotensão é sinal tardio na criança.",
            fonteRevisao: "Weiss SL et al. Surviving Sepsis Campaign International Guidelines for the Management of Septic Shock and Sepsis-Associated Organ Dysfunction in Children. Pediatr Crit Care Med 2020;21(2):e52-e106. doi:10.1097/PCC.0000000000002198"
        }
    },
    "cef_sepse": {
        cat: "cat-pals", sub: "🏥 Uso Hospitalar (Choque Séptico)",
        kw: "ceftriaxona rocefin sepse choque septico antibiotico empirico endovenoso",
        nome: "Ceftriaxona EV (Sepse)", apres: "FA 1 g (+ 10 mL AD = 100 mg/mL)",
        info: "<strong>Conduta (Whitebook):</strong> 100 mg/kg/dia EV de 12/12 ou 24/24h. Máx. 4 g/dia.", badge: "Máx: 4 g/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (Sepse em Pediatria, 02/2026): 100 mg/kg/dia EV de 12/12 ou 24/24 h, máx. 4.000 mg/dia. FA 1 g em 10 mL de AD = 100 mg/mL. */
            let d12 = Math.min(p * 50, 2000), d24 = Math.min(p * 100, 4000);
            return { v: `${(d12 / 100).toFixed(1)} mL 12/12h`, r: `VIA ENDOVENOSA (SEPSE - ANTIBIÓTICO)\n\nCEFTRIAXONA 1 G (RECONSTITUIR EM 10 ML DE AD = 100 MG/ML)\nFAZER ${(d12 / 100).toFixed(1)} ML (${d12.toFixed(0)} MG) EV DE 12/12 HORAS\nOU ${(d24 / 100).toFixed(1)} ML (${d24.toFixed(0)} MG) EV DE 24/24 HORAS.\nDILUIR EM SF 0,9% OU SG 5% E CORRER EM 30 MINUTOS.\n\nDOSE MÁXIMA: 4 G POR DIA.` };
        },
        detalhes: {
            indicacao: "Sepse e choque séptico: antibiótico empírico (associado conforme idade e foco).",
            dose: "100 mg/kg/dia EV de 12/12 ou 24/24 horas.",
            atencao: "Máximo 4 g/dia. No choque séptico, fazer na 1ª hora. Não misturar com soluções com cálcio (Ringer) no mesmo acesso."
        },
        ficha: {
            indicacoes: "Antibioticoterapia empírica da sepse (crianças > 1 mês), em associação conforme o esquema.",
            dose: "100 mg/kg/dia EV de 12/12 ou 24/24 horas",
            doseMaxima: "4.000 mg/dia.",
            apresentacoes: "Frasco-ampola 1 g.",
            via: "Endovenosa.",
            reconstituicao: "1 g em 10 mL de água destilada (100 mg/mL).",
            alertasPediatricos: "Tempo de tratamento costuma variar de 7 a 10 dias, conforme o foco e a evolução.",
            fonteRevisao: "Whitebook (Afya) - Sepse em Pediatria (Prescrição Hospitalar), atualizado em 12/02/2026."
        }
    },
    "adrenalina_sepse": {
        cat: "cat-pals", sub: "🏥 Uso Hospitalar (Choque Séptico)",
        kw: "adrenalina epinefrina infusao continua droga vasoativa amina choque septico sepse vasopressor",
        nome: "Adrenalina Contínua (Choque Séptico)", apres: "Ampola 1 mg/mL · solução 10 mcg/mL",
        info: "<strong>Conduta (Whitebook):</strong> 0,05 a 0,3 mcg/kg/min (0,3 a 1,8 mL/kg/h). Máx. 1 mcg/kg/min (6 mL/kg/h).", badge: "Máx: 1 mcg/kg/min", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (Sepse em Pediatria, 02/2026): 1 mL de adrenalina 1 mg/mL + 99 mL SG 5% = 10 mcg/mL; 0,05-0,3 mcg/kg/min = 0,3-1,8 mL/kg/h; máx. 1 mcg/kg/min = 6 mL/kg/h. mL/h = mcg/kg/min x peso x 6. */
            let t = d => (d * p * 6).toFixed(1);
            return { v: `${t(0.05)}–${t(0.3)} mL/h`, r: `VIA ENDOVENOSA (CHOQUE SÉPTICO - INFUSÃO CONTÍNUA)\n\nSOLUÇÃO: ADRENALINA 1 MG/ML 1 ML + SG 5% 99 ML (TOTAL 100 ML = 10 MCG/ML).\nVELOCIDADES NA BIC:\n • 0,05 MCG/KG/MIN: ${t(0.05)} ML/H\n • 0,1 MCG/KG/MIN: ${t(0.1)} ML/H\n • 0,2 MCG/KG/MIN: ${t(0.2)} ML/H\n • 0,3 MCG/KG/MIN: ${t(0.3)} ML/H\n • 0,5 MCG/KG/MIN: ${t(0.5)} ML/H\n • 1 MCG/KG/MIN (MÁXIMO): ${t(1)} ML/H\n\nTITULAR PELA PERFUSÃO E PELA PA. PODE SER INICIADA EM ACESSO PERIFÉRICO.` };
        },
        detalhes: {
            indicacao: "Choque séptico que persiste após a expansão volêmica (preferida no choque frio / baixo débito).",
            dose: "0,05 a 0,3 mcg/kg/min (0,3 a 1,8 mL/kg/h da solução de 10 mcg/mL).",
            atencao: "Máximo 1 mcg/kg/min (6 mL/kg/h). Pode começar em acesso periférico ou intraósseo. Monitorar ECG, PA, glicemia e lactato."
        },
        ficha: {
            indicacoes: "Choque séptico (amina vasoativa), isolada ou associada à noradrenalina.",
            dose: "0,05-0,3 micrograma/kg/minuto EV em infusão contínua",
            doseMaxima: "1 micrograma/kg/minuto (6 mL/kg/hora na diluição padrão).",
            apresentacoes: "Ampola 1 mg/mL.",
            via: "Endovenosa (periférica ou central) ou intraóssea, em BIC.",
            diluicao: "1 mL de adrenalina + 99 mL de SG 5% (10 microgramas/mL).",
            infusao: "Contínua: 0,3-1,8 mL/kg/hora.",
            fonteRevisao: "Whitebook (Afya) - Sepse em Pediatria (Prescrição Hospitalar), atualizado em 12/02/2026."
        }
    },
    "nora_sepse": {
        cat: "cat-pals", sub: "🏥 Uso Hospitalar (Choque Séptico)",
        kw: "noradrenalina norepinefrina infusao continua droga vasoativa amina choque septico quente sepse vasopressor",
        nome: "Noradrenalina Contínua (Choque Séptico)", apres: "Ampola 2 mg/mL (= 1 mg/mL base) · solução 8 mcg/mL",
        info: "<strong>Conduta (Whitebook):</strong> 0,05 a 0,1 mcg/kg/min (0,375 a 0,75 mL/kg/h); Whitebook cita dose usual de até 2 mcg/kg/min.", badge: "Ver faixa", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (Sepse em Pediatria, 02/2026): 2 mL de noradrenalina (2 mg/mL = 1 mg/mL base) + 248 mL SG 5% = 8 mcg/mL; 0,05-0,1 mcg/kg/min = 0,375-0,75 mL/kg/h; "dose usual" 2 mcg/kg/min = 15 mL/kg/h. mL/h = mcg/kg/min x peso x 60 / 8. */
            let t = d => (d * p * 7.5).toFixed(1);
            return { v: `${t(0.05)}–${t(0.1)} mL/h`, r: `VIA ENDOVENOSA (CHOQUE SÉPTICO - INFUSÃO CONTÍNUA)\n\nSOLUÇÃO: NORADRENALINA 2 MG/ML (1 MG/ML BASE) 2 ML + SG 5% 248 ML (TOTAL 250 ML = 8 MCG/ML).\nVELOCIDADES NA BIC:\n • 0,05 MCG/KG/MIN: ${t(0.05)} ML/H\n • 0,1 MCG/KG/MIN: ${t(0.1)} ML/H\n • 0,2 MCG/KG/MIN: ${t(0.2)} ML/H\n • 0,5 MCG/KG/MIN: ${t(0.5)} ML/H\n • 1 MCG/KG/MIN: ${t(1)} ML/H\n • 2 MCG/KG/MIN: ${t(2)} ML/H\n\nTITULAR PELA PA E PELA PERFUSÃO. PODE SER INICIADA EM ACESSO PERIFÉRICO.` };
        },
        detalhes: {
            indicacao: "Choque séptico que persiste após a expansão volêmica (preferida no choque quente / vasodilatado).",
            dose: "0,05 a 0,1 mcg/kg/min (0,375 a 0,75 mL/kg/h da solução de 8 mcg/mL), titulando; Whitebook cita dose usual de até 2 mcg/kg/min (15 mL/kg/h).",
            atencao: "Pode começar em acesso periférico ou intraósseo. Monitorar PA, perfusão e extravasamento."
        },
        ficha: {
            indicacoes: "Choque séptico (amina vasoativa), isolada ou associada à adrenalina.",
            dose: "0,05-0,1 micrograma/kg/minuto EV em infusão contínua\nDose usual (Whitebook): 2 microgramas/kg/minuto (15 mL/kg/hora na diluição padrão)",
            apresentacoes: "Ampola 2 mg/mL de hemitartarato (= 1 mg/mL de noradrenalina base).",
            via: "Endovenosa (periférica ou central) ou intraóssea, em BIC.",
            diluicao: "2 mL de noradrenalina + 248 mL de SG 5% (8 microgramas/mL).",
            infusao: "Contínua: 0,375-0,75 mL/kg/hora.",
            fonteRevisao: "Whitebook (Afya) - Sepse em Pediatria (Prescrição Hospitalar), atualizado em 12/02/2026."
        }
    },
    "hidrocortisona_sepse": {
        cat: "cat-pals", sub: "🏥 Uso Hospitalar (Choque Séptico)",
        kw: "hidrocortisona solucortef corticoide choque septico refratario insuficiencia adrenal sepse",
        nome: "Hidrocortisona EV (Choque Séptico)", apres: "FA 100 mg (+ 2 mL AD = 50 mg/mL)",
        info: "<strong>Conduta (Whitebook):</strong> 100 mg/m²/dia EV de 6/6h.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (Sepse em Pediatria, 02/2026): 100 mg/m2/dia EV de 6/6 h. Superfície corporal estimada pelo peso: (4 x peso + 7) / (peso + 90). FA 100 mg em 2 mL de AD = 50 mg/mL. */
            let sc = (4 * p + 7) / (p + 90), dia = 100 * sc, dose = dia / 4;
            return { v: `${dose.toFixed(1)} mg 6/6h`, r: `VIA ENDOVENOSA (CHOQUE SÉPTICO)\n\nHIDROCORTISONA 100 MG (RECONSTITUIR EM 2 ML DE AD = 50 MG/ML)\nFAZER ${(dose / 50).toFixed(2)} ML (${dose.toFixed(1)} MG) EV DE 6/6 HORAS.\n\n(100 MG/M²/DIA; SUPERFÍCIE CORPORAL ESTIMADA ${sc.toFixed(2)} M² = ${dia.toFixed(0)} MG/DIA)` };
        },
        detalhes: {
            indicacao: "Choque séptico refratário a volume e vasoativo; uso crônico de corticoide ou suspeita de insuficiência adrenal.",
            dose: "100 mg/m²/dia EV de 6/6 horas (superfície corporal estimada pelo peso).",
            atencao: "A SSC 2020 não recomenda se o choque respondeu a volume e vasoativo. Se tiver a altura, conferir a superfície corporal (Mosteller)."
        },
        ficha: {
            indicacoes: "Choque séptico refratário a catecolaminas; insuficiência adrenal.",
            dose: "100 mg/m²/dia EV de 6/6 horas",
            apresentacoes: "Frasco-ampola 100 mg.",
            via: "Endovenosa.",
            reconstituicao: "100 mg em 2 mL de água destilada (50 mg/mL).",
            alertasPediatricos: "O app estima a superfície corporal pelo peso: (4 x peso + 7) / (peso + 90).",
            fonteRevisao: "Whitebook (Afya) - Sepse em Pediatria (Prescrição Hospitalar), atualizado em 12/02/2026."
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
