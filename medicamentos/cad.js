// =====================================================
// CAD (CETOACIDOSE DIABÉTICA) — cards com cat: "cat-cad"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome).
// Onde ele aparece no menu fica em medicamentos/menu.js. Cards usados na CAD
// que já existem em outras categorias (KCl EV, glicose) só são citados no menu.
// =====================================================
registrarMedicamentos({
    "insulina_cad": {
        cat: "cat-cad", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "insulina regular cetoacidose diabetica cad diabetes infusao continua endovenosa", nome: "Insulina Regular (Cetoacidose Diabética)", apres: "50 U em 500 mL SF 0,9% (0,1 U/mL)",
        info: "<strong>Conduta:</strong> 0,1 U/kg/h EV em BIC, após a expansão. Reduzir para 0,05 U/kg/h se glicemia ~250.", badge: "Não iniciar se K < 3,3", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let r1 = p * 0.1 / 0.1, r05 = p * 0.05 / 0.1;
            return { v: `0,1: ${r1.toFixed(1)} mL/h\n0,05: ${r05.toFixed(1)} mL/h`, r: `VIA ENDOVENOSA (CETOACIDOSE DIABÉTICA - 2ª HORA)\n\nPREPARO: Insulina Regular 50 U em 500 mL de SF 0,9% (0,1 U/mL). Lavar o equipo com a solução e trocar o frasco a cada 6 horas.\n\n• 0,1 U/kg/h: correr em BIC a ${r1.toFixed(1)} mL/h.\n• Reduzir para 0,05 U/kg/h (${r05.toFixed(1)} mL/h) quando a glicemia ficar perto de 250 mg/dL ou cair mais de 100 mg/dL/h com acidose ainda presente.\n\nSEM BIC: Insulina Regular ${(p * 0.2).toFixed(1)} U (0,2 U/kg) IM de 2/2h; reduzir para ${(p * 0.1).toFixed(1)} U (0,1 U/kg) nas mesmas situações.\n\n* Não iniciar se K < 3,3. Glicemia capilar 1/1h, cetonúria e gasometria 2/2h.` };
        },
        detalhes: {
            indicacao: "Cetoacidose diabética, após a expansão inicial.",
            dose: "0,1 U/kg/h EV em BIC; reduzir para 0,05 U/kg/h. Sem BIC: 0,2 U/kg IM de 2/2h.",
            atencao: "Não iniciar se K < 3,3. Queda da glicemia entre 50 e 100 mg/dL/h. Glicemia 1/1h e gasometria 2/2h."
        }
    },
    "cad_expansao": {
        cat: "cat-cad", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "cetoacidose diabetica cad expansao volemica soro fisiologico bolus ressuscitacao choque", nome: "Expansão na Cetoacidose (SF 0,9%)", apres: "NaCl 0,9%",
        info: "<strong>Conduta:</strong> sem choque 10 mL/kg em 60 min; em choque 10 a 20 mL/kg em 30 a 60 min. Não passar de 30 mL/kg.", badge: "Máx: 30 mL/kg no total", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let v10 = p * 10, v20 = p * 20, v30 = p * 30;
            return { v: `10 mL/kg: ${v10.toFixed(0)} mL`, r: `VIA ENDOVENOSA (CETOACIDOSE DIABÉTICA - EXPANSÃO)\n\nSEM CHOQUE: SF 0,9% ${v10.toFixed(0)} mL (10 mL/kg) EV em 60 minutos.\n\nCOM CHOQUE HIPOVOLÊMICO: SF 0,9% ${v10.toFixed(0)} a ${v20.toFixed(0)} mL (10 a 20 mL/kg) EV em 30 a 60 minutos (hipoperfusão grave: em 15 a 30 minutos).\n\n* Reavaliar após cada bolus e repetir se necessário. Total máximo: ${v30.toFixed(0)} mL (30 mL/kg).\n* Descontar o volume da expansão no cálculo da hidratação das 48 horas.\n* Usar o peso atual (obeso: peso ideal para sexo e estatura).` };
        },
        detalhes: {
            indicacao: "Primeira hora da cetoacidose diabética, antes da insulina.",
            dose: "Sem choque: 10 mL/kg em 60 min. Choque: 10 a 20 mL/kg em 30 a 60 min. Máx: 30 mL/kg.",
            atencao: "Volumes acima de 50 mL/kg nas primeiras 4 horas aumentam o risco de edema cerebral."
        }
    },
    "cad_hidratacao": {
        cat: "cat-cad", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "cetoacidose diabetica cad hidratacao 48 horas deficit manutencao potassio kcl duas solucoes soro glicosado", nome: "Hidratação da Cetoacidose em 48h (+ Potássio)", apres: "SF 0,9% + KCl 19,1% (40 mEq/L)",
        info: "<strong>Conduta:</strong> (Déficit + 2 x Manutenção − Expansão) ÷ 48h. Déficit = % desidratação x Peso x 10.", badge: "K: máx 0,5 mEq/kg/h", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let man = p <= 10 ? p * 4 : p <= 20 ? 40 + (p - 10) * 2 : 60 + (p - 20);
            let taxa = d => Math.min(man + d * p * 10 / 48, man * 2);
            let t5 = taxa(5), t7 = taxa(7), t10 = taxa(10);
            let kMax = p * 0.5;
            return { v: `5%: ${t5.toFixed(0)} | 7%: ${t7.toFixed(0)} | 10%: ${t10.toFixed(0)} mL/h`, r: `VIA ENDOVENOSA (CETOACIDOSE DIABÉTICA - HIDRATAÇÃO EM 48 HORAS)\n\nVOLUME POR HORA (manutenção + déficit em 48h):\n• Desidratação 5%: ${t5.toFixed(0)} mL/h\n• Desidratação 7% (CAD moderada): ${t7.toFixed(0)} mL/h\n• Desidratação 10% (CAD grave): ${t10.toFixed(0)} mL/h\n(Manutenção: ${man.toFixed(0)} mL/h. Total limitado a 2 x a manutenção.)\n\nDESCONTAR A EXPANSÃO: tirar (volume da expansão ÷ 48) da velocidade. Ex.: expansão de ${(p * 10).toFixed(0)} mL (10 mL/kg) = menos ${(p * 10 / 48).toFixed(1)} mL/h.\n\nSOLUÇÃO SEM GLICOSE: SF 0,9% 500 mL + KCl 19,1% 7,8 mL (40 mEq/L de K).\nSOLUÇÃO COM GLICOSE (após iniciar a insulina): SG 10% 478 mL + NaCl 20% 22 mL + KCl 19,1% 7,8 mL (SG 10% em SF + 40 mEq/L de K).\nCorrer as duas em Y, somando a velocidade total; a proporção entre elas segue a glicemia (tabela da conduta).\n\nPOTÁSSIO (pelo K inicial):\n• K < 4,5: iniciar já.\n• K 4,5 a 5,4: iniciar junto com a insulina.\n• K ≥ 5,5: só após diurese e K < 5,5.\n* Se a velocidade for ≥ 10 mL/kg/h: usar 20 mEq/L. Máximo de K: ${kMax.toFixed(1)} mEq/h (0,5 mEq/kg/h).` };
        },
        detalhes: {
            indicacao: "Reposição do déficit e manutenção na cetoacidose diabética, após a expansão.",
            dose: "(Déficit + 2 x Manutenção − Expansão) ÷ 48h, com 40 mEq/L de potássio.",
            atencao: "Total até 2 x a manutenção. Obeso: peso ideal. Edema cerebral: corrigir em 72h e reduzir a 1/3."
        }
    },
    "cad_insulina_sc": {
        cat: "cat-cad", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "cetoacidose diabetica cad insulina subcutanea transicao basal bolus glargina lispro asparte dose diaria total fator de sensibilidade", nome: "Insulina SC: Transição após a Cetoacidose", apres: "Basal (glargina) + rápida (lispro/asparte)",
        info: "<strong>Conduta:</strong> Dose diária total 0,5 a 1 U/kg/dia: 50% basal e 50% rápida. Desligar a insulina EV 15 a 30 min após a rápida SC.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let f = (x) => (Math.round(x * 2) / 2).toFixed(1).replace('.0', '');
            let ddt = (a, b) => `${f(p * a)} a ${f(p * b)} U/dia`;
            let faixa = (k, a, b) => `${(k / (p * b)).toFixed(0)} a ${(k / (p * a)).toFixed(0)}`;
            return { v: `DDT: ${f(p * 0.5)} a ${f(p * 1)} U/dia`, r: `VIA SUBCUTÂNEA (TRANSIÇÃO APÓS A CETOACIDOSE)\n\nDOSE DIÁRIA TOTAL (DDT):\n• Pré-púbere (0,5 a 0,6 U/kg/dia): ${ddt(0.5, 0.6)}\n• Púbere (0,7 a 1 U/kg/dia): ${ddt(0.7, 1)}\n\nINSULINA BASAL (glargina/detemir) = 50% da DDT, 1 vez ao dia (< 5 anos: de manhã; ≥ 5 anos: à noite):\n• Pré-púbere: ${f(p * 0.25)} a ${f(p * 0.3)} U\n• Púbere: ${f(p * 0.35)} a ${f(p * 0.5)} U\n\nINSULINA RÁPIDA (lispro/asparte) = 50% da DDT, antes das refeições:\n• Bolus = correção + refeição.\n• Correção: (glicemia − 120) ÷ FSI. FSI = 1800 ÷ DDT (pré-púbere ${faixa(1800, 0.5, 0.6)}; púbere ${faixa(1800, 0.7, 1)} mg/dL por unidade).\n• Refeição: gramas de carboidrato ÷ razão. Razão = 500 ÷ DDT (pré-púbere ${faixa(500, 0.5, 0.6)} g; púbere ${faixa(500, 0.7, 1)} g por unidade).\n• Alvo: 120 mg/dL de dia; 140 mg/dL ao deitar e de madrugada.\n\n* Fazer a transição antes de uma refeição: desligar a insulina EV 15 a 30 minutos após a rápida SC. Glicemia capilar de 3/3h.` };
        },
        detalhes: {
            indicacao: "Cetoacidose resolvida (pH > 7,30, bicarbonato > 15 e cetonemia < 1) e tolerando a via oral.",
            dose: "DDT 0,5 a 0,6 U/kg/dia (pré-púbere) ou 0,7 a 1 U/kg/dia (púbere): 50% basal e 50% rápida.",
            atencao: "Paciente que já usava insulina: dividir a dose prévia em 50% basal e 50% bolus."
        }
    },
    "cad_manitol": {
        cat: "cat-cad", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "manitol edema cerebral cetoacidose diabetica cad hipertensao intracraniana solucao hipertonica", nome: "Manitol 20% (Edema Cerebral na CAD)", apres: "Manitol 20% (0,2 g/mL)",
        info: "<strong>Conduta:</strong> 0,5 a 1 g/kg EV em 15 min. Pode repetir após 30 min.", badge: "Tratar na suspeita", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let a = p * 0.5 / 0.2, b = p * 1 / 0.2;
            return { v: `${a.toFixed(1)} a ${b.toFixed(1)} mL`, r: `VIA ENDOVENOSA (EDEMA CEREBRAL NA CETOACIDOSE)\n\nManitol 20%: ${a.toFixed(1)} a ${b.toFixed(1)} mL (0,5 a 1 g/kg = ${(p * 0.5).toFixed(1)} a ${(p * 1).toFixed(1)} g) EV em 15 minutos.\n\n* Efeito em ~15 min, dura ~2h. Pode repetir após 30 minutos se necessário.\n* Alternativa ou 2ª linha: NaCl 3% 2,5 a 5 mL/kg.\n* Cabeceira a 30°, reduzir a hidratação para 1/3, sondagem vesical e transferir para UTI.` };
        },
        detalhes: {
            indicacao: "Suspeita clínica de edema cerebral durante a cetoacidose (não esperar a tomografia).",
            dose: "0,5 a 1 g/kg (2,5 a 5 mL/kg do manitol 20%) EV em 15 min.",
            atencao: "Iniciar assim que houver suspeita. Deixar a dose calculada à beira do leito nos pacientes de risco."
        }
    },
    "cad_nacl3": {
        cat: "cat-cad", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "nacl 3% salina hipertonica edema cerebral cetoacidose diabetica cad hipertensao intracraniana", nome: "NaCl 3% (Edema Cerebral na CAD)", apres: "NaCl 20% 15 mL + AD 85 mL",
        info: "<strong>Conduta:</strong> 2,5 a 5 mL/kg EV em 15 min. Alternativa ou 2ª linha ao manitol.", badge: "Tratar na suspeita", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let a = p * 2.5, b = p * 5;
            return { v: `${a.toFixed(0)} a ${b.toFixed(0)} mL`, r: `VIA ENDOVENOSA (EDEMA CEREBRAL NA CETOACIDOSE)\n\nNaCl 3%: ${a.toFixed(0)} a ${b.toFixed(0)} mL (2,5 a 5 mL/kg) EV em 15 minutos.\n\nPREPARO DO NaCl 3%: NaCl 20% 15 mL + AD 85 mL (para cada 100 mL).\nPara ${b.toFixed(0)} mL: NaCl 20% ${(b * 0.15).toFixed(1)} mL + AD ${(b * 0.85).toFixed(1)} mL.\n\n* 0,5 g/kg de manitol equivale a 2,5 mL/kg de NaCl 3%.\n* Cabeceira a 30°, reduzir a hidratação para 1/3 e transferir para UTI.` };
        },
        detalhes: {
            indicacao: "Edema cerebral na cetoacidose: alternativa ao manitol ou 2ª linha se não houver resposta.",
            dose: "2,5 a 5 mL/kg EV em 15 min.",
            atencao: "Não esperar a tomografia para tratar."
        }
    },
    "cad_bicarbonato": {
        cat: "cat-cad", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "bicarbonato de sodio cetoacidose diabetica cad acidose grave ph hipercalemia", nome: "Bicarbonato de Sódio na CAD (pH < 6,9)", apres: "Bicarbonato de sódio 8,4% (1 mEq/mL)",
        info: "<strong>Conduta:</strong> Só se pH < 6,9 ou hipercalemia grave com disfunção cardíaca: 1 a 2 mEq/kg EV em 60 min, em UTI.", badge: "Não usar de rotina", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let a = Math.min(p * 1, 100), b = Math.min(p * 2, 100);
            return { v: `${a.toFixed(0)} a ${b.toFixed(0)} mL`, r: `VIA ENDOVENOSA (CETOACIDOSE - ACIDOSE GRAVE, pH < 6,9)\n\nBicarbonato de sódio 8,4% (1 mEq/mL): ${a.toFixed(0)} a ${b.toFixed(0)} mL (1 a 2 mEq/kg), diluído, EV em 60 minutos, em UTI.\n\n* Indicação: pH venoso < 6,9 ou hipercalemia com risco de vida e comprometimento da contratilidade cardíaca.\n* Risco: hipocalemia (monitorar o K), acidose paradoxal do líquor e edema cerebral.` };
        },
        detalhes: {
            indicacao: "Cetoacidose com pH < 6,9 ou hipercalemia grave com disfunção cardíaca.",
            dose: "1 a 2 mEq/kg EV em 60 min (teto de 100 mEq, dose de adulto da SBD).",
            atencao: "Não é rotina: aumenta o risco de hipocalemia e de edema cerebral."
        }
    }
});
