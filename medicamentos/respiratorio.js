// =====================================================
// RESPIRATÓRIO — cards com cat: "cat-respiratorio"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    "soro_nasal": {
        cat: "cat-respiratorio", sub: "🏠 Uso Ambulatorial (Vias Orais / Inalatórios)", 
        kw: "soro fisiologico nasal lavagem coriza nariz",
        nome: "Lavagem Nasal (SF 0,9%)", apres: "Soro Fisiológico 0,9%",
        info: "<strong>Conduta:</strong> Lavar as narinas com volume adequado (<1a: 3ml | 1-2a: 5ml | >2a: 10ml) de 2/2h.", badge: "", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => { 
            let x = "X";
            if(i !== "") {
                let id = parseFloat(i);
                if(id < 1) x = "3";
                else if(id <= 2) x = "5";
                else x = "10";
            }
            return { v: x === "X" ? "—" : x + " mL", r: `USO NASAL\n\n1) SORO FISIOLÓGICO 0,9% -------------------- 1 FR\nLAVAR AS NARINAS COM ${x} ML DE SORO CADA, DE 2/2 HORAS OU CONFORME NECESSIDADE.` }; 
        },
        detalhes: {
            indicacao: "Congestão e obstrução nasal (resfriado, rinite, bronquiolite).",
            dose: "<1a: 3 mL | 1-2a: 5 mL | >2a: 10 mL em cada narina, de 2/2h ou conforme necessidade.",
            atencao: "Sem contraindicação. Precisa da idade para calcular o volume."
        }
    },
    "salb_spray": {
        cat: "cat-respiratorio", sub: "🏠 Uso Ambulatorial (Vias Orais / Inalatórios)", 
        kw: "salbutamol spray jatos bombinha asma crise alta ambulatorial", nome: "Salbutamol Spray 100 mcg", apres: "Dispositivo + Espaçador",
        info: "<strong>Crise:</strong> Peso/2 jts | <strong>Alta:</strong> Peso/3 jts.", badge: "Mín 4, Máx 10 Jatos", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { 
            let cri = Math.max(4, Math.min(Math.round(p / 2), 10));
            let alt = Math.max(4, Math.min(Math.round(p / 3), 10));
            return { v: `Crise: ${cri} jts\nAlta: ${alt} jts`, r: `USO INALATÓRIO DE ALTA\n\n1) SALBUTAMOL SPRAY 100 MCG + ESPAÇADOR ------ 1 UNID\n• EM CRISE RESGATE: FAZER ${cri} JATOS DE 20/20 MIN POR 1H.\n• ALTA MANUTENÇÃO: FAZER ${alt} JATOS DE 4/4H POR 3 DIAS, DEPOIS 6/6H POR 2 DIAS.` }; 
        },
        detalhes: {
            indicacao: "Broncoespasmo: crise de asma e sibilância.",
            dose: "Crise: Peso ÷ 2 jatos de 20/20 min por 1h. Alta: Peso ÷ 3 jatos de 4/4h por 3 dias, depois 6/6h por 2 dias.",
            atencao: "Mínimo 4 e máximo 10 jatos por vez. Pode causar taquicardia e tremor."
        }
    },
    "pred_sol": {
        cat: "cat-respiratorio", sub: "🏠 Uso Ambulatorial (Vias Orais / Inalatórios)", 
        kw: "prednisolona prelone asma corticoide oral ambulatorial", nome: "Prednisolona Solução (Prelone)", apres: "3 mg / mL",
        info: "<strong>Posologia Asma:</strong> 1 mg/kg/dia VO pela manhã por 5 dias.", badge: "Teto por Idade (GINA)", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            if (i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(i);
            // GINA: 1 mg/kg/dia, com dose máxima por idade: <2a 20 mg | 2-5a 30 mg | 6-11a 40 mg | ≥12a 50 mg.
            let tetoMg = id < 2 ? 20 : id < 6 ? 30 : id < 12 ? 40 : 50;
            let tetoMl = Math.floor((tetoMg / 3) * 2) / 2; // arredonda para baixo, para nunca passar do teto
            let v = Math.min(parseFloat(round05(p / 3)), tetoMl).toFixed(1);
            return { v: v + " mL", r: `${recHead}1) PREDNISOLONA SOLUÇÃO 3 MG/ML ------------ 1 FR\nDAR ${v} ML, VIA ORAL, UMA VEZ AO DIA PELA MANHÃ DURANTE 5 DIAS.` };
        },
        detalhes: {
            indicacao: "Crise de asma (corticoide oral).",
            dose: "1 mg/kg/dia VO pela manhã por 5 dias (GINA).",
            atencao: "Máximo por dia: <2 anos 20 mg (6,5 mL) | 2-5 anos 30 mg (10 mL) | 6-11 anos 40 mg (13 mL) | ≥12 anos 50 mg (16,5 mL)."
        }
    },
    "clenil_hfa": {
        cat: "cat-respiratorio", sub: "🏠 Uso Ambulatorial (Vias Orais / Inalatórios)", 
        kw: "clenil hfa beclometasona corticoide inalatorio asma manutenção",
        nome: "Clenil HFA (Beclometasona)", apres: "50 mcg / dose (Extrafina)",
        info: "<strong>Manutenção Pós-Crise (GINA):</strong> Adaptação por faixa etária, dose e dispositivo.", badge: "", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => {
            if (i === "") return { v: "—", r: "Insira a idade do paciente para calcular o Clenil HFA." };
            let id = parseFloat(i);
            let textoPresc = "";
            
            if (id <= 5) {
                let mascaraOuBocal = id <= 3 ? "espaçador valvulado com MÁSCARA FACIAL" : "espaçador valvulado com BOCAL";
                textoPresc = `USO INALATÓRIO (MANUTENÇÃO - GINA)\n\n1) CLENIL HFA 50 MCG/DOSE ----------------------------- 1 FRASCO\nAPLICAR 1 JATO, 2 VEZES AO DIA (DE 12 EM 12 HORAS).\nDISPOSITIVO: pMDI acoplado a ${mascaraOuBocal}.\n(Lavar o rosto após o uso e fazer higiene oral).`;
            } else if (id <= 11) {
                textoPresc = `USO INALATÓRIO (MANUTENÇÃO - GINA)\n\n1) CLENIL HFA 50 MCG/DOSE ----------------------------- 1 FRASCO\nAPLICAR 1 A 2 JATOS, 2 VEZES AO DIA (DE 12 EM 12 HORAS).\nDISPOSITIVO: pMDI acoplado a espaçador valvulado com BOCAL.\n(Lavar o rosto após o uso e fazer higiene oral).`;
            } else {
                textoPresc = `USO INALATÓRIO (MANUTENÇÃO PÓS-CRISE)\n\n1) CLENIL HFA 50 MCG/DOSE ----------------------------- 1 FRASCO\nAPLICAR 2 JATOS, 2 VEZES AO DIA (DE 12 EM 12 HORAS).\nDISPOSITIVO: pMDI acoplado a espaçador valvulado com BOCAL.\n(Lavar o rosto após o uso e fazer higiene oral).`;
            }
            return { v: id <= 5 ? "1 jato 12/12h" : "1-2 jatos 12/12h", r: textoPresc };
        },
        detalhes: {
            indicacao: "Asma: manutenção após a crise (corticoide inalatório — GINA).",
            dose: "Dose e número de jatos por faixa etária, 12/12h (ver texto da receita).",
            atencao: "Lavar o rosto e fazer higiene oral após o uso (risco de candidíase). Precisa da idade."
        }
    },
    "pulmicort": {
        cat: "cat-respiratorio", sub: "🏠 Uso Ambulatorial (Vias Orais / Inalatórios)", 
        kw: "pulmicort budesonida nebulizacao asma laringite oral ambulatorial inalatorio",
        nome: "Pulmicort (Budesonida)", apres: "0,25 mg / mL",
        info: "<strong>Conduta:</strong> Nebulizar 2 mL + 2 mL de SF 0,9% 1x ao dia por 5 dias. <span style='color:#b91c1c; font-weight:bold;'>(Idade mínima: 5 meses)</span>.", badge: "", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => { 
            if (i !== "" && parseFloat(i) < 0.41) { 
                return { v: "Contraind.", r: "ATENÇÃO: Idade inferior a 5 meses. Avalie contraindicação." };
            }
            return { v: "2 mL", r: `USO INALATÓRIO\n\n1) PULMICORT 0,25 MG/ML --------------------- 1 CX\nNEBULIZAR COM 2 ML + 2 ML DE SORO FISIOLÓGICO 0,9%, 1 VEZ AO DIA POR 5 DIAS.` }; 
        },
        detalhes: {
            indicacao: "Laringite (crupe) e sibilância/asma (corticoide inalatório).",
            dose: "2 mL nebulizados 1x ao dia por 5 dias.",
            atencao: "Idade mínima: 5 meses."
        }
    },
    "azi_oral": {
        cat: "cat-respiratorio", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "azitromicina suspensao pneumonia oral ambulatorial",
        nome: "Azitromicina Suspensão (Pneumonia)", apres: "200 mg / 5 mL",
        info: "<strong>Posologia:</strong> 10 mg/kg no Dia 1, depois 5 mg/kg por 4 dias.", badge: "Teto: 12,5 mL (D1) / 6,25 mL", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let d1 = Math.min(round05(p/4), 12.5); let d2 = Math.min(round05(p/8), 6.25); /* Teto: 500 mg (12,5 mL) no 1º dia e 250 mg (6,25 mL) nos dias 2 a 5 */ return { v: d1 + " mL", r: `${recHead}1) AZITROMICINA SUSPENSÃO 200 MG/5ML --------- 1 FR\n• DIA 1: DAR ${d1} ML EM DOSE ÚNICA.\n• DIAS 2 A 5: DAR ${d2} ML 1X AO DIA.` }; },
        detalhes: {
            indicacao: "Pneumonia atípica (Mycoplasma, Chlamydia) e alergia a penicilina.",
            dose: "10 mg/kg no 1º dia, depois 5 mg/kg 1x ao dia por mais 4 dias.",
            atencao: "Máximo 500 mg (12,5 mL) no 1º dia e 250 mg (6,25 mL) do 2º ao 5º dia. Cautela em QT longo."
        }
    },
    "ampicilina": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)", 
        kw: "ampicilina antibiotico pneumonia respiratorio hospitalar injetavel", nome: "Ampicilina EV (Hospitalar)", apres: "FA 1 g",
        info: "<strong>Conduta:</strong> 50 mg/kg/dose rediluída em 20 mL de AD EV lenta de 6/6h.", badge: "Teto Máx: 20 mL", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = Math.min((p * 50) / 100, 20.0); return { v: v.toFixed(1) + " mL", r: `VIA ENDOVENOSA (USO HOSPITALAR)\n\n Reconstituir 1 FA de Ampicilina 1 g em 10 mL de AD. Aspirar ${v.toFixed(1)} mL e rediluir em 20 mL de AD. Administrar EV lenta, de 6/6 horas por 7 dias.` }; },
        detalhes: {
            indicacao: "Pneumonia com necessidade de internação.",
            dose: "50 mg/kg/dose EV de 6/6h por 7 dias.",
            atencao: "Perguntar sobre alergia a penicilina. Máximo 20 mL (2 g) por dose."
        }
    },
    "cef_resp_ev": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)", 
        kw: "ceftriaxona ev antibiotico pneumonia respiratorio hospitalar injetavel", nome: "Ceftriaxona EV (Respiratório)", apres: "FA 1 g",
        info: "<strong>Conduta:</strong> 100 mg/kg/dose EV de 24/24h por 7 dias.", badge: "Teto: 2 g/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => calcCeftriaxona(p, "VIA ENDOVENOSA (USO HOSPITALAR - RESPIRATÓRIO)", "EV", 24, ml => Math.max(ml * 2.5, 10)),
        detalhes: {
            indicacao: "Pneumonia grave ou com necessidade de internação.",
            dose: "100 mg/kg/dia EV por 7 dias: 100 mg/kg de 24/24h ou 50 mg/kg de 12/12h.",
            atencao: "Máximo 2 g/dia: até 2 g de 24/24h ou até 1 g de 12/12h. Acima de 1 g, usar 2 frascos. Não infundir junto com soluções com cálcio."
        }
    },
    "cef_resp_im": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)", 
        kw: "ceftriaxona im antibiotico pneumonia respiratorio ambulatorial ubs injetavel", nome: "Ceftriaxona IM (Respiratório)", apres: "FA 1 g + 3,5 mL Lidocaína 1%",
        info: "<strong>Conduta:</strong> 100 mg/kg/dose IM de 24/24h por 7 dias.", badge: "Teto: 2 g/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => calcCeftriaxona(p, "VIA INTRAMUSCULAR (USO HOSPITALAR/UBS - RESPIRATÓRIO)", "IM", 24),
        detalhes: {
            indicacao: "Pneumonia quando não há acesso venoso.",
            dose: "100 mg/kg/dia IM por 7 dias: 100 mg/kg de 24/24h ou 50 mg/kg de 12/12h.",
            atencao: "A versão com lidocaína é só IM, nunca EV. Máximo 2 g/dia: até 2 g (7 mL) de 24/24h ou até 1 g (3,5 mL) de 12/12h. Acima de 1 g, usar 2 frascos."
        }
    },
    "azi_ev": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)", 
        kw: "azitromicina ev atipica antibiotico pneumonia respiratorio hospitalar injetavel", nome: "Azitromicina EV (Pneumonia Atípica)", apres: "FA 500 mg",
        info: "<strong>Conduta:</strong> 10 mg/kg/dia EV de 24/24h por 5 dias.", badge: "Teto Máx: 5 mL (500 mg)", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = Math.min((p * 10) / 100, 5.0), sf = (v * 100) / 2; /* 10 mg/kg/dia, teto de 500 mg (5 mL a 100 mg/mL) */ return { v: v.toFixed(1) + " mL", r: `VIA ENDOVENOSA (ATÍPICOS)\n\n Reconstituir 1 FA de Azitromicina em 4,8 mL de AD (100 mg/mL). Aspirar ${v.toFixed(1)} mL e diluir em ${Math.ceil(sf)} mL de SF 0,9%. Infundir em 3 horas.` }; },
        detalhes: {
            indicacao: "Pneumonia atípica com necessidade de internação.",
            dose: "10 mg/kg/dia EV de 24/24h por 5 dias.",
            atencao: "Máximo 500 mg (5 mL) por dose. Não fazer em bolus. Cautela em QT longo."
        }
    },
    "genta": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)", 
        kw: "gentamicina antibiotico respiratorio hospitalar injetavel ev im", nome: "Gentamicina EV / IM", apres: "Ampola 40 mg / mL",
        info: "<strong>Conduta:</strong> 5 a 7,5 mg/kg/dia EV/IM de 24/24h.", badge: "Dose Máx: 240 mg/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let mg = Math.min((p * 5), 240), v = mg / 40, sf = Math.max(mg / 5, 10); return { v: v.toFixed(2) + " mL", r: `VIA ENDOVENOSA OU INTRAMUSCULAR\n\n Aspirar ${v.toFixed(2)} mL de Gentamicina, diluir em ${Math.ceil(sf)} mL de SF 0,9% e infundir por 30-120 minutos, de 24/24h.` }; },
        detalhes: {
            indicacao: "Infecções bacterianas graves (gram-negativos), em associação.",
            dose: "5 a 7,5 mg/kg/dia EV ou IM de 24/24h.",
            atencao: "Máximo 240 mg/dia. Nefrotóxica e ototóxica: monitorar função renal."
        }
    },
    "metil": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)", 
        kw: "metilprednisolona asma grave corticoide injetavel hospitalar", nome: "Metilprednisolona EV 125 mg", apres: "FA 125 mg",
        info: "<strong>Ataque Asma Grave:</strong> 2 mg/kg/dose EV lento.", badge: "Teto Máx: 60 mg", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = Math.min((p * 2) / 62.5, 0.96); return { v: v.toFixed(2) + " mL", r: `VIA ENDOVENOSA (ATAQUE ASMA GRAVE)\n\n Reconstituir 1 FA de Metilprednisolona 125 mg em 2 mL diluente próprio. Aspirar ${v.toFixed(2)} mL, rediluir em 5 mL de AD e administrar EV lento.` }; },
        detalhes: {
            indicacao: "Crise de asma grave (corticoide EV).",
            dose: "2 mg/kg/dose EV lento.",
            atencao: "Máximo 60 mg por dose."
        }
    },
    "magnesio_ev": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)", 
        kw: "sulfato de magnesio asma grave crise ev hospitalar injetavel", nome: "Sulfato de Magnésio EV", apres: "Ampolas a 10% ou 50%",
        info: "<strong>Conduta:</strong> 50 mg/kg/h por 5 horas (Dose Máxima: 2 g/h).", badge: "Máx: 2 g/h", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { 
            // Limite máximo de 2.000 mg por hora (2 g/h).
            let mgPorHora = Math.min((p * 50), 2000);
            // O total para as 5 horas de infusão
            let mgTotal = mgPorHora * 5; 
            
            let vol10 = mgTotal / 100, sf10 = vol10 * 2, vazao10 = (vol10 + sf10) / 5;
            let vol50 = mgTotal / 500, sf50 = vol50 * 8, vazao50 = (vol50 + sf50) / 5;
            
            return { 
                v: `10%: ${vazao10.toFixed(1)} mL/h\n50%: ${vazao50.toFixed(1)} mL/h`, 
                r: `VIA ENDOVENOSA (INFUSÃO CONTÍNUA - 5 HORAS)\n\nOPÇÃO A (Ampola 10% - 100 mg/mL):\nAspirar ${vol10.toFixed(1)} mL de Sulfato de Magnésio a 10% + ${sf10.toFixed(1)} mL de SF 0,9%.\nCorrer em BIC a ${vazao10.toFixed(1)} mL/h.\n\nOPÇÃO B (Ampola 50% - 500 mg/mL):\nAspirar ${vol50.toFixed(1)} mL de Sulfato de Magnésio a 50% + ${sf50.toFixed(1)} mL de SF 0,9%.\nCorrer em BIC a ${vazao50.toFixed(1)} mL/h.` 
            }; 
        },
        detalhes: {
            indicacao: "Crise de asma grave sem resposta ao tratamento inicial.",
            dose: "50 mg/kg/h em infusão contínua por 5 horas.",
            atencao: "Máximo 2 g/h. Monitorar PA, reflexos e frequência respiratória."
        }
    },
    "salb_neb": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)", 
        kw: "salbutamol gotas nebulizacao asma hospitalar injetavel", nome: "Salbutamol Gotas (Nebulização)", apres: "5 mg / mL",
        info: "<strong>Conduta:</strong> Peso / 2 em gotas + 4 mL SF 0,9%.", badge: "Teto Máx: 20 gotas", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = Math.min(Math.round(p / 2), 20); return { v: v + " gts", r: `VIA INALATÓRIA HOSPITALAR\n\n Colocar ${v} gotas de Salbutamol + 4 mL de SF 0,9% sob fluxo de O2 (6-8 L/min).` }; },
        detalhes: {
            indicacao: "Broncoespasmo: crise de asma e sibilância.",
            dose: "Peso ÷ 2 gotas por nebulização.",
            atencao: "Máximo 20 gotas por nebulização. Pode causar taquicardia e tremor."
        }
    },
    "hidro_ev": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)", 
        kw: "hidrocortisona ev asma hospitalar injetavel", nome: "Hidrocortisona EV (Crise Asma)", apres: "FA 100 mg (reconst. 2 mL AD = 50 mg/mL)",
        info: "<strong>Conduta:</strong> 1 mg/kg/dose EV de 6/6h (máx. 240 mg/dose).", badge: "Teto Máx: 240 mg/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            // 1 mg/kg/dose, teto de 240 mg. FA 100 mg + 2 mL AD = 50 mg/mL. Rediluir em SF 0,9% a 1 mg/mL.
            let mg = Math.min(p * 1, 240);
            let nFA = Math.ceil(mg / 100);
            let ml = mg / 50;
            let total = mg;            // 1 mg/mL
            let sf = total - ml;
            let fa = nFA > 1 ? `${nFA} FA de Hidrocortisona 100 mg, cada um com 2 mL de AD` : "1 FA de Hidrocortisona 100 mg com 2 mL de AD";
            return { v: `${ml.toFixed(1)} mL (${mg.toFixed(0)} mg)`, r: `VIA ENDOVENOSA HOSPITALAR\n\n Reconstituir ${fa} (50 mg/mL). Aspirar ${ml.toFixed(1)} mL (${mg.toFixed(0)} mg) e rediluir em ${sf.toFixed(1)} mL de SF 0,9% (total ${total.toFixed(0)} mL, 1 mg/mL). Infundir em 20 a 30 minutos, de 6/6 horas.` };
        },
        detalhes: {
            indicacao: "Crise de asma (corticoide EV).",
            dose: "1 mg/kg/dose EV de 6/6h, infundir em 20 a 30 minutos.",
            atencao: "Máximo 240 mg por dose. Rediluir em SF 0,9% a 1 mg/mL."
        }
    },
    "ipra": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)", 
        kw: "ipratropio atrovent nebulizacao asma hospitalar", nome: "Brometo de Ipratrópio Gotas", apres: "0,25 mg / mL",
        info: "<strong>Conduta:</strong> <10kg: 10gts | 10-20kg: 20gts | >20kg: 40gts.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = 20; if(p<10)v=10; if(p>20)v=40; return { v: v + " gts", r: `NEBULIZAÇÃO HOSPITALAR ASMA\n\n Colocar ${v} gotas de Ipratrópio + 4 mL de SF 0,9%. Realizar ciclos de 20/20 min na 1ª hora.` }; },
        detalhes: {
            indicacao: "Crise de asma moderada a grave, junto com o salbutamol.",
            dose: "<10 kg: 10 gotas | 10-20 kg: 20 gotas | >20 kg: 40 gotas. De 20/20 min na 1ª hora.",
            atencao: "Usar junto com o salbutamol, não sozinho. Proteger os olhos da névoa."
        }
    },
    "adrenalina_neb": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)",
        kw: "adrenalina epinefrina inalatoria nebulizacao crupe laringite estridor", nome: "Adrenalina Inalatória (Crupe)", apres: "Ampola 1 mg / mL (1:1000)",
        info: "<strong>Conduta:</strong> 0,5 mL/kg nebulizado (Peso ÷ 2 em mL). Máx. 5 mL.", badge: "Máx: 5 mL", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            // Manual HIAS (2017): adrenalina 1:1000, 0,5 mL/kg (Peso ÷ 2 em mL), máximo 5 mL; pode ou não diluir com igual volume de SF 0,9%.
            // SBP (Crupe viral e bacteriano): efeito ultrarrápido no estridor, com duração de cerca de 2 horas.
            let v = Math.min(p * 0.5, 5).toFixed(1);
            return { v: v + " mL", r: `NEBULIZAÇÃO (LARINGITE / CRUPE)\n\n Colocar ${v} mL de Adrenalina 1 mg/mL (1:1000) no nebulizador (pode completar com igual volume de SF 0,9%) e nebulizar com O2.\n Manter observação por pelo menos 2 horas após a nebulização (risco de retorno dos sintomas).` };
        },
        detalhes: {
            indicacao: "Laringite viral aguda (crupe) com estridor em repouso ou desconforto respiratório.",
            dose: "0,5 mL/kg (Peso ÷ 2 em mL) da adrenalina 1:1000 nebulizada. Pode diluir com igual volume de SF 0,9%.",
            atencao: "Máximo 5 mL. Efeito ultrarrápido, mas dura cerca de 2 horas: observar o retorno dos sintomas. Associar dexametasona."
        },
        ficha: {
            indicacoes: "Laringite viral aguda (crupe) com estridor ou desconforto respiratório.",
            dose: "Crupe: 0,5 mL/kg (Peso ÷ 2 em mL) da adrenalina 1:1000 nebulizada, pode diluir com igual volume de SF 0,9%",
            doseMaxima: "5 mL por nebulização.",
            apresentacoes: "Ampola 1 mg/mL (1:1000).",
            via: "Inalatória (nebulização).",
            alertasPediatricos: "Efeito ultrarrápido: diminui quase instantaneamente o estridor e os sintomas de falência respiratória. Como o efeito é breve (cerca de 2 horas), o paciente pode voltar ao desconforto inicial após o fim da ação. Há evidência de benefício da adrenalina combinada à dexametasona na redução das internações.",
            fonteRevisao: "Dose: Manual de Sobrevivência do Residente de Pediatria (HIAS, 2017). Efeito e associação: SBP - Crupe viral e bacteriano: https://www.sbp.com.br/fileadmin/user_upload/2017/01/Emergncia-Crupe-Viral-e-Bacteriano.pdf - consultado em out/2026."
        }
    },
    "dexa_crupe": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)", 
        kw: "dexametasona injetavel crupe laringite anafilaxia alergia hospitalar", nome: "Dexametasona Injetável", apres: "4 mg / mL",
        info: "<strong>Conduta:</strong> Crupe: 0,15 mg/kg (leve) até 0,6 mg/kg (grave), dose única.", badge: "Teto Máx: 5 mL (20 mg)", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            // SBP (crupe): dose única de 0,15 mg/kg (crupe leve) até 0,6 mg/kg (crupe grave), VO ou parenteral. Teto do app: 5 mL (20 mg).
            let leve = Math.min(p * 0.15 / 4, 5).toFixed(2), grave = Math.min(p * 0.6 / 4, 5).toFixed(2);
            return { v: `0,15: ${leve} mL\n0,6: ${grave} mL`, r: `VIA ENDOVENOSA / INTRAMUSCULAR (CRUPE) - DEXAMETASONA 4 MG/ML, DOSE ÚNICA\n\n• CRUPE LEVE (0,15 MG/KG): fazer ${leve} mL agora.\n• CRUPE GRAVE (0,6 MG/KG): fazer ${grave} mL agora.` };
        },
        detalhes: {
            indicacao: "Laringite viral aguda (crupe).",
            dose: "Dose única de 0,15 mg/kg (crupe leve) até 0,6 mg/kg (crupe grave), VO ou parenteral (IM/EV).",
            atencao: "Máximo 5 mL (20 mg). A associação com adrenalina inalatória reduz as taxas de internação."
        },
        ficha: {
            indicacoes: "Laringite viral aguda (crupe).",
            dose: "Crupe leve: 0,15 mg/kg, dose única, VO ou parenteral\nCrupe grave: 0,6 mg/kg, dose única, VO ou parenteral",
            doseMaxima: "Teto do app: 5 mL (20 mg).",
            apresentacoes: "Injetável 4 mg/mL.",
            via: "Oral, intramuscular ou endovenosa.",
            intervalo: "Dose única.",
            alertasPediatricos: "Há evidência de benefício da adrenalina inalatória combinada à dexametasona na redução das taxas de internação.",
            fonteRevisao: "SBP - Crupe viral e bacteriano: https://www.sbp.com.br/fileadmin/user_upload/2017/01/Emergncia-Crupe-Viral-e-Bacteriano.pdf - consultado em out/2026."
        }
    },
    "fenoterol_gts": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)",
        kw: "fenoterol berotec gotas nebulizacao asma broncoespasmo crise", nome: "Fenoterol Gotas (Berotec) - Nebulização", apres: "5 mg / mL (0,25 mg/gota)",
        info: "<strong>Conduta:</strong> 1 gota a cada 3 kg + 4 mL SF, de 20/20 min, 3 vezes. Máx. 10 gotas.", badge: "Máx: 10 gotas", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let gts = Math.max(1, Math.min(Math.round(p / 3), 10));
            return { v: gts + " gts", r: `NEBULIZAÇÃO (CRISE DE ASMA / BRONCOESPASMO)\n\n Colocar ${gts} gotas de Fenoterol (Berotec) + 4 mL de SF 0,9%. Nebulizar de 20/20 minutos, 3 vezes. Após melhora, espaçar para 2/2 horas.` };
        },
        detalhes: {
            indicacao: "Crise de asma e broncoespasmo (nebulização).",
            dose: "1 gota a cada 3 kg + 4 mL de SF 0,9%, de 20/20 min, 3 vezes.",
            atencao: "Máximo 10 gotas por nebulização. Pode causar taquicardia e tremor."
        }
    },
    "fenoterol_spray": {
        cat: "cat-respiratorio", sub: "🏠 Uso Ambulatorial (Vias Orais / Inalatórios)",
        kw: "fenoterol berotec spray bombinha asma broncoespasmo crise inalatorio espacador", nome: "Fenoterol Spray (Berotec) 100 mcg", apres: "100 mcg / jato + espaçador",
        info: "<strong>Conduta:</strong> 1 jato a cada 3 kg, de 20/20 min, 3 vezes. Máx. 10 jatos.", badge: "Máx: 10 jatos", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let jt = Math.max(1, Math.min(Math.round(p / 3), 10));
            return { v: jt + " jatos", r: `USO INALATÓRIO (CRISE)\n\n1) FENOTEROL SPRAY 100 MCG + ESPAÇADOR ------ 1 UNID\nFAZER ${jt} JATOS COM ESPAÇADOR, DE 20/20 MINUTOS, 3 VEZES.` };
        },
        detalhes: {
            indicacao: "Crise de asma e broncoespasmo.",
            dose: "1 jato a cada 3 kg com espaçador, de 20/20 min, 3 vezes.",
            atencao: "Máximo 10 jatos por dose. Pode causar taquicardia e tremor."
        }
    },
    "salina_hipertonica": {
        cat: "cat-respiratorio", sub: "🏥 Uso Hospitalar (Vias Injetáveis / Nebulização)",
        kw: "salina hipertonica nacl 3% nebulizacao bronquiolite bva", nome: "Salina Hipertônica 3% (Nebulização)", apres: "NaCl 20% 1,5 mL + AD 8,5 mL",
        info: "<strong>Conduta:</strong> Nebulizar 4 mL de NaCl 3% de 8/8h, junto com broncodilatador.", badgeSt: "static-blue", badge: "4 mL 8/8h", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "4 mL", r: `NEBULIZAÇÃO (BRONQUIOLITE VIRAL AGUDA)\n\n Preparar NaCl 3%: 1,5 mL de NaCl 20% + 8,5 mL de AD (total 10 mL).\n Retirar 4 mL e nebulizar de 8/8 horas.\n Fazer broncodilatador junto, para evitar broncoespasmo.` }),
        detalhes: {
            indicacao: "Bronquiolite viral aguda (nebulização).",
            dose: "4 mL de NaCl 3% nebulizados de 8/8h.",
            atencao: "Fazer junto com broncodilatador, para evitar broncoespasmo."
        }
    },
    "koid_d": {
        cat: "cat-respiratorio", sub: "🏠 Uso Ambulatorial (Vias Orais / Inalatórios)",
        kw: "koid d betametasona dexclorfeniramina tosse alergica xarope antitussigeno", nome: "Koid D Xarope (Betametasona + Dexclorfeniramina)", apres: "0,25 mg + 2 mg / 5 mL",
        info: "<strong>Posologia:</strong> 2-6a: 2 mL | 6-12a: 2,5 mL | >12a: 5 mL. De 8/8h.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            if (i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(i);
            if (id < 2) return { v: "Contraind.", r: "ATENÇÃO: Koid D não indicado para menores de 2 anos." };
            let ml = id < 6 ? "2 ML" : id <= 12 ? "2,5 ML" : "5 ML";
            return { v: ml.toLowerCase().replace("ml", "mL"), r: `${recHead}1) KOID D XAROPE ---------------------------- 1 FR\nDAR ${ml}, VIA ORAL, DE 8/8 HORAS.` };
        },
        detalhes: {
            indicacao: "Tosse e sintomas alérgicos respiratórios.",
            dose: "2-6 anos: 2 mL | 6-12 anos: 2,5 mL | >12 anos: 5 mL. VO de 8/8h.",
            atencao: "Contém corticoide (betametasona): evitar uso prolongado. Não usar em menores de 2 anos."
        }
    },
    "torante": {
        cat: "cat-respiratorio", sub: "🏠 Uso Ambulatorial (Vias Orais / Inalatórios)",
        kw: "torante hedera helix tosse expectorante xarope antitussigeno", nome: "Torante Xarope (Hedera helix)", apres: "15 mg / mL",
        info: "<strong>Posologia:</strong> 2-5a: 2,5 mL | ≥6a: 5 mL. De 8/8h.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            if (i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(i);
            if (id < 2) return { v: "Evitar", r: "ATENÇÃO: Dose do manual definida a partir de 2 anos." };
            let ml = id < 6 ? "2,5 ML" : "5 ML";
            return { v: ml.toLowerCase().replace("ml", "mL"), r: `${recHead}1) TORANTE XAROPE 15 MG/ML ----------------- 1 FR\nDAR ${ml}, VIA ORAL, DE 8/8 HORAS.` };
        },
        detalhes: {
            indicacao: "Tosse produtiva (expectorante).",
            dose: "2-5 anos: 2,5 mL | ≥6 anos: 5 mL. VO de 8/8h.",
            atencao: "Dose do manual a partir de 2 anos. Precisa da idade para calcular."
        }
    },
    "acebrofilina": {
        cat: "cat-respiratorio", sub: "🏠 Uso Ambulatorial (Vias Orais / Inalatórios)",
        kw: "acebrofilina brondilat tosse expectorante broncodilatador xarope", nome: "Acebrofilina Xarope Pediátrico", apres: "25 mg / 5 mL",
        info: "<strong>Posologia:</strong> Peso ÷ 5 mL de 12/12h por 5 dias (máx. 10 mL).", badge: "Máx: 10 mL/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let v = Math.min(parseFloat(round05(p / 5)), 10).toFixed(1);
            return { v: v + " mL", r: `${recHead}1) ACEBROFILINA XAROPE 25 MG/5 ML -------- 1 FR\nDAR ${v} ML, VIA ORAL, DE 12/12 HORAS, POR 5 DIAS.` };
        },
        detalhes: {
            indicacao: "Tosse com broncoespasmo e secreção.",
            dose: "Peso ÷ 5 mL VO de 12/12h por 5 dias.",
            atencao: "Máximo 10 mL por dose."
        }
    }
});
