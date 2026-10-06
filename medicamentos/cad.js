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
        kw: "insulina regular cetoacidose diabetica cad diabetes infusao continua endovenosa", nome: "Insulina Regular (Cetoacidose Diabética)", apres: "100 U (1 mL) em 100 mL SF 0,9% (1 U/mL)",
        info: "<strong>Conduta (IMIP):</strong> < 5 anos 0,05 U/kg/h; ≥ 5 anos 0,1 U/kg/h EV em BIC, após 1h de expansão. Máx 10 U/h. Sem bolus.", badge: "Não iniciar se K < 3,3", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            let id = parseFloat(i);
            let mlh = u => Math.min(p * u, 10);
            let a = mlh(0.05), b = mlh(0.1), c = mlh(0.15), d = mlh(0.2);
            let v = isNaN(id) ? `< 5 a: ${a.toFixed(1)} mL/h\n≥ 5 a: ${b.toFixed(1)} mL/h` : id < 5 ? `0,05 U/kg/h: ${a.toFixed(1)} mL/h` : `0,1 U/kg/h: ${b.toFixed(1)} mL/h`;
            return { v, r: `VIA ENDOVENOSA (CETOACIDOSE DIABÉTICA - APÓS 1 HORA DE EXPANSÃO)\n\nPREPARO (IMIP): Insulina Regular 100 U/mL 1 mL (100 U) + SF 0,9% 100 mL (1 U/mL: 0,05 a 0,1 mL/kg/h). Desprezar 50 mL no equipo. Trocar o frasco de 6/6 horas.\n\nDOSE INICIAL (correr em BIC):\n• < 5 anos: 0,05 U/kg/h = ${a.toFixed(1)} mL/h.\n• ≥ 5 anos: 0,1 U/kg/h = ${b.toFixed(1)} mL/h.\n• Máximo: 10 U/h (10 mL/h). NÃO FAZER BOLUS (DOSE DE ATAQUE).\n\nAJUSTES:\n• HGT não cai 60 mg/dL/h ou acidose corrigindo muito devagar: aumentar para 0,15 a 0,2 U/kg/h (${c.toFixed(1)} a ${d.toFixed(1)} mL/h).\n• HGT < 300 com acidose: NÃO DIMINUIR A INSULINA. Acrescentar glicose ao soro.\n• Acidose parcialmente compensada, ainda sem critério de suspensão: 0,05 U/kg/h (${a.toFixed(1)} mL/h) + glicose no soro.\n\nSEM BIC: Insulina Regular ${(p * 0.2).toFixed(1)} U (0,2 U/kg) IM de 2/2h.\n\n* Não iniciar se K < 3,3. HGT 1/1h; gasometria e eletrólitos 2/2h.` };
        },
        detalhes: {
            indicacao: "Cetoacidose diabética, após pelo menos 1 hora de expansão.",
            dose: "< 5 anos: 0,05 U/kg/h; ≥ 5 anos: 0,1 U/kg/h EV em BIC (máx 10 U/h). Sem BIC: 0,2 U/kg IM de 2/2h.",
            atencao: "Não iniciar se K < 3,3. Nunca bolus. Com acidose, não diminuir a insulina: acrescentar glicose."
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
        kw: "cetoacidose diabetica cad hidratacao 48 horas deficit manutencao potassio kcl solucao padrao imip solucao a b duas solucoes soro glicosado", nome: "Hidratação da Cetoacidose em 48h (Solução Padrão A/B)", apres: "Solução padrão IMIP: K 40 mEq/L, Na 136 mEq/L",
        info: "<strong>Conduta:</strong> (Déficit + 2 x Manutenção − Expansão) ÷ 48h, com a solução padrão A/B do IMIP em Y. Déficit = % desidratação x Peso x 10.", badge: "K: máx 0,5 mEq/kg/h", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let man = p <= 10 ? p * 4 : p <= 20 ? 40 + (p - 10) * 2 : 60 + (p - 20);
            let taxa = d => Math.min(man + d * p * 10 / 48, man * 2);
            let t5 = taxa(5), t7 = taxa(7), t10 = taxa(10);
            let kMax = p * 0.5;
            let escada = (rot, t) => `• ${rot} (${t.toFixed(0)} mL/h): 0% = B ${t.toFixed(0)} | 2,5% = A ${(t / 4).toFixed(0)} + B ${(t * 3 / 4).toFixed(0)} | 5% = A ${(t / 2).toFixed(0)} + B ${(t / 2).toFixed(0)} | 7,5% = A ${(t * 3 / 4).toFixed(0)} + B ${(t / 4).toFixed(0)} | 10% = A ${t.toFixed(0)}`;
            return { v: `5%: ${t5.toFixed(0)} | 7%: ${t7.toFixed(0)} | 10%: ${t10.toFixed(0)} mL/h`, r: `VIA ENDOVENOSA (CETOACIDOSE DIABÉTICA - HIDRATAÇÃO EM 48 HORAS)\n\nVOLUME TOTAL POR HORA (manutenção + déficit em 48h):\n• Desidratação 5%: ${t5.toFixed(0)} mL/h\n• Desidratação 7% (CAD moderada): ${t7.toFixed(0)} mL/h\n• Desidratação 10% (CAD grave): ${t10.toFixed(0)} mL/h\n(Manutenção: ${man.toFixed(0)} mL/h. Total limitado a 2 x a manutenção.)\n\nDESCONTAR A EXPANSÃO: tirar (volume da expansão ÷ 48) da velocidade. Ex.: expansão de ${(p * 10).toFixed(0)} mL (10 mL/kg) = menos ${(p * 10 / 48).toFixed(1)} mL/h.\n\nSOLUÇÃO PADRÃO (IMIP), em Y - K 40 mEq/L e Na 136 mEq/L:\n• SOLUÇÃO A: SG 10% 250 mL + NaCl 20% 10 mL + KCl 19,1% 4 mL.\n• SOLUÇÃO B: AD 250 mL + NaCl 20% 10 mL + KCl 19,1% 4 mL.\n\nGLICOSE FINAL = PROPORÇÃO ENTRE A E B (a velocidade total não muda):\n${escada('Desidratação 5%', t5)}\n${escada('Desidratação 7%', t7)}\n${escada('Desidratação 10%', t10)}\nSem glicose: só B. Glicose a partir de HGT ≤ 300 mg/dL ou queda > 90 mg/dL/h (SPP): começar com 5% e subir para 7,5% ou 10% se o HGT continuar caindo com a acidose presente.\n\nPOTÁSSIO (pelo K inicial):\n• K < 4,5: solução padrão já.\n• K 4,5 a 5,4: começar o K junto com a insulina (até lá, A e B sem KCl).\n• K ≥ 5,5: preparar A e B SEM o KCl até haver diurese e K < 5,5.\n* Velocidade ≥ 10 mL/kg/h: usar KCl 19,1% 2 mL em cada solução (20 mEq/L). Máximo de K: ${kMax.toFixed(1)} mEq/h (0,5 mEq/kg/h).` };
        },
        detalhes: {
            indicacao: "Reposição do déficit e manutenção na cetoacidose diabética, após a expansão.",
            dose: "(Déficit + 2 x Manutenção − Expansão) ÷ 48h, com a solução padrão A/B do IMIP (K 40 mEq/L).",
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
            return { v: `DDT: ${f(p * 0.5)} a ${f(p * 1)} U/dia`, r: `VIA SUBCUTÂNEA (TRANSIÇÃO APÓS A CETOACIDOSE)\n\nDOSE DIÁRIA TOTAL (DDT):\n• Pré-púbere (0,5 a 0,6 U/kg/dia): ${ddt(0.5, 0.6)}\n• Púbere (0,7 a 1 U/kg/dia): ${ddt(0.7, 1)}\n\nINSULINA BASAL (glargina/detemir) = 50% da DDT, 1 vez ao dia (< 5 anos: de manhã; ≥ 5 anos: à noite):\n• Pré-púbere: ${f(p * 0.25)} a ${f(p * 0.3)} U\n• Púbere: ${f(p * 0.35)} a ${f(p * 0.5)} U\n\nINSULINA RÁPIDA (lispro/asparte) = 50% da DDT, antes das refeições:\n• Bolus = correção + refeição.\n• Correção: (glicemia − 120) ÷ FSI. FSI = 1800 ÷ DDT (pré-púbere ${faixa(1800, 0.5, 0.6)}; púbere ${faixa(1800, 0.7, 1)} mg/dL por unidade).\n• Refeição: gramas de carboidrato ÷ razão. Razão = 500 ÷ DDT (pré-púbere ${faixa(500, 0.5, 0.6)} g; púbere ${faixa(500, 0.7, 1)} g por unidade).\n• Alvo: 120 mg/dL de dia; 140 mg/dL ao deitar e de madrugada.\n\n* Fazer a transição antes de uma refeição: desligar a insulina EV 15 a 30 minutos após a rápida SC. HGT de 3/3h.` };
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
        kw: "bicarbonato de sodio cetoacidose diabetica cad acidose grave ph hipercalemia", nome: "Bicarbonato de Sódio na CAD (pH ≤ 6,9)", apres: "Bicarbonato de sódio 8,4% (1 mEq/mL)",
        info: "<strong>Conduta:</strong> Só se pH ≤ 6,9. Dose (IMIP) = (12 − HCO₃ encontrado) x 0,3 x Peso. Fazer metade em 2h, diluído 1:5 em AD.", badge: "Não usar de rotina", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let fator = 0.3 * p;
            let linha = hco3 => { let total = (12 - hco3) * fator, metade = Math.min(total / 2, 100); return `• HCO₃ ${hco3}: dose total ${total.toFixed(0)} mEq → fazer ${metade.toFixed(0)} mL de bicarbonato 8,4% + ${(metade * 5).toFixed(0)} mL de AD em 2 horas.`; };
            return { v: `${fator.toFixed(1)} mEq por ponto`, r: `VIA ENDOVENOSA (CETOACIDOSE - ACIDOSE GRAVE, pH ≤ 6,9)\n\nDOSE (IMIP) = (12 − HCO₃ encontrado) x 0,3 x ${p} kg = (12 − HCO₃) x ${fator.toFixed(1)} mEq.\nFazer METADE da dose em 2 horas, diluído 1:5 em AD (1 mL de bicarbonato 8,4% + 5 mL de AD).\n\n${[2, 4, 6, 8].map(linha).join('\n')}\n\n* Bicarbonato de sódio 8,4% = 1 mEq/mL. Teto de 100 mEq por infusão (dose de adulto da SBD).\n* Só com pH ≤ 6,9 (ou hipercalemia grave com disfunção cardíaca). Em UTI.\n* Risco: hipocalemia (monitorar o K), acidose paradoxal do líquor e edema cerebral. Reavaliar a gasometria ao final.` };
        },
        detalhes: {
            indicacao: "Cetoacidose com pH ≤ 6,9 ou hipercalemia grave com disfunção cardíaca.",
            dose: "(12 − HCO₃) x 0,3 x Peso: fazer metade em 2h, diluído 1:5 em AD.",
            atencao: "Não é rotina: aumenta o risco de hipocalemia e de edema cerebral."
        }
    }
});
