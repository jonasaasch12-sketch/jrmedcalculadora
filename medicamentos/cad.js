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
        kw: "insulina regular cetoacidose diabetica cad diabetes infusao continua endovenosa", nome: "Insulina Regular (Cetoacidose Diabética)", apres: "1 mL (100 U) + 99 mL SF 0,9% (1 U/mL)",
        info: "<strong>Conduta (IMIP):</strong> < 5 anos 0,05 U/kg/h; ≥ 5 anos 0,1 U/kg/h EV em BIC, após 1h de expansão. Máx 10 U/h. Sem bolus.", badge: "Não iniciar se K < 3,3", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            let id = parseFloat(i);
            /* trava: velocidade máxima 10 U/h = 10 mL/h (1 U/mL) */
            let mlh = u => Math.min(p * u, 10);
            let f = x => x.toFixed(1).replace('.', ',');
            let teto = u => p * u > 10 ? ' (TRAVADO NO MÁXIMO DE 10 U/H)' : '';
            let a = mlh(0.05), b = mlh(0.1), c = mlh(0.15), d = mlh(0.2);
            let semIdade = isNaN(id);
            let u0 = semIdade ? null : id < 5 ? 0.05 : 0.1, m0 = semIdade ? null : mlh(u0);
            let v = semIdade ? `< 5 a: ${a.toFixed(1)} mL/h\n≥ 5 a: ${b.toFixed(1)} mL/h` : `${String(u0).replace('.', ',')} U/kg/h: ${m0.toFixed(1)} mL/h${p * u0 > 10 ? ' (máx)' : ''}`;
            let dose = semIdade
                ? `DOSE INICIAL (correr em BIC) - INFORMAR A IDADE:\n• < 5 anos: 0,05 U/kg/h = ${f(a)} mL/h${teto(0.05)}.\n• ≥ 5 anos: 0,1 U/kg/h = ${f(b)} mL/h${teto(0.1)}.`
                : `DOSE INICIAL (correr em BIC): ${String(u0).replace('.', ',')} U/kg/h = ${f(m0)} mL/h${teto(u0)}.`;
            return { v, r: `VIA ENDOVENOSA (CETOACIDOSE DIABÉTICA - APÓS 1 HORA DE EXPANSÃO)\n\nPREPARO: Insulina Regular 1 mL (100 UNIDADES) + SF 0,9% 99 mL = 1 U/mL. Trocar o frasco a cada 6 horas.\n\n${dose}\n• VELOCIDADE MÁXIMA: 10 U/h (10 mL/h). NÃO FAZER BOLUS (DOSE DE ATAQUE).\n\nAJUSTES:\n• HGT não cai 60 mg/dL/h ou acidose corrigindo muito devagar: aumentar para 0,15 a 0,2 U/kg/h (${c >= 10 ? '10,0 mL/h: já é o máximo de 10 U/h' : `${f(c)} a ${f(d)} mL/h${p * 0.2 > 10 ? ', máx 10 U/h' : ''}`}).\n• HGT < 300 com acidose: NÃO DIMINUIR A INSULINA. Acrescentar glicose ao soro.\n• Acidose parcialmente compensada, ainda sem critério de suspensão: 0,05 U/kg/h (${f(a)} mL/h) + glicose no soro.\n\nSEM BIC: Insulina Regular ${f(p * 0.2)} U (0,2 U/kg) IM de 2/2h.\n\n* Não iniciar se K < 3,3. HGT 1/1h; gasometria e eletrólitos 2/2h.` };
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
        kw: "cetoacidose diabetica cad hidratacao 48 horas deficit manutencao potassio kcl solucao padrao imip solucao a b duas solucoes soro glicosado em y", nome: "Soro da CAD em Y: Soluções A e B (48h)", apres: "Solução padrão IMIP: K 40 mEq/L, Na 136 mEq/L",
        info: "<strong>Conduta:</strong> velocidade total = (déficit + 2 x manutenção − expansão) ÷ 48h, que não muda. Começa só com a B; a glicose entra trocando a proporção A/B pelo HGT.", badge: "K: máx 0,5 mEq/kg/h", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let man = p <= 10 ? p * 4 : p <= 20 ? 40 + (p - 10) * 2 : 60 + (p - 20);
            /* expansão de 10 mL/kg já descontada (passo 2 da conduta, sem choque) */
            let taxa = d => Math.min(man + d * p * 10 / 48, man * 2) - p * 10 / 48;
            let t5 = Math.round(taxa(5)), t7 = Math.round(taxa(7)), t10 = Math.round(taxa(10));
            let kMax = (p * 0.5).toFixed(1).replace('.', ',');
            return { v: `5%: ${t5} | 7%: ${t7} | 10%: ${t10} mL/h`, r: `VIA ENDOVENOSA (CETOACIDOSE DIABÉTICA - SORO EM Y, 48 HORAS)

1) SOLUÇÃO A (COM GLICOSE):
   SG 10% --------------- 250 ML
   NACL 20% -------------- 10 ML
   KCL 19,1% -------------- 4 ML
2) SOLUÇÃO B (SEM GLICOSE):
   ÁGUA DESTILADA ------- 250 ML
   NACL 20% -------------- 10 ML
   KCL 19,1% -------------- 4 ML

CORRER EM Y, EM BIC. VELOCIDADE TOTAL (NÃO MUDA ATÉ O FIM):
• DESIDRATAÇÃO 5%: ${t5} ML/H
• DESIDRATAÇÃO 7% (CAD MODERADA): ${t7} ML/H
• DESIDRATAÇÃO 10% (CAD GRAVE): ${t10} ML/H
(já descontada a expansão de 10 mL/kg; total até 2 x a manutenção)

GLICOSE PELO HGT DE 1/1H (SÓ MUDA A PROPORÇÃO A/B):
• INÍCIO (HGT > 300): SÓ SOLUÇÃO B.
• HGT ≤ 300 OU QUEDA > 90 MG/DL/H: ½ A + ½ B (GLICOSE 5%).
• AINDA CAINDO, COM ACIDOSE: ¾ A + ¼ B (7,5%) E DEPOIS SÓ A (10%).

POTÁSSIO (PELO K INICIAL):
• K < 4,5: SOLUÇÕES COM KCL JÁ.
• K 4,5 A 5,4: KCL JUNTO COM A INSULINA (ATÉ LÁ, A E B SEM KCL).
• K ≥ 5,5: A E B SEM KCL ATÉ HAVER DIURESE E K < 5,5.
* Velocidade ≥ 10 mL/kg/h: KCl 19,1% 2 mL em cada solução (20 mEq/L). Máximo de K: ${kMax} mEq/h (0,5 mEq/kg/h).
* Não repor a diurese; descontar o que beber.` };
        },
        detalhes: {
            indicacao: "Reposição do déficit e manutenção na cetoacidose diabética, após a expansão.",
            dose: "Velocidade total = (déficit + 2 x manutenção − expansão) ÷ 48h. Solução padrão A/B do IMIP em Y (K 40 mEq/L).",
            atencao: "Total até 2 x a manutenção. Obeso: peso ideal. Edema cerebral: corrigir em 72h e reduzir a 1/3. Expansão diferente de 10 mL/kg: usar a calculadora da conduta."
        }
    },
    "cad_insulina_sc": {
        cat: "cat-cad", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "cetoacidose diabetica cad insulina subcutanea transicao basal nph regular glargina ultrarrapida escala hgt diabetes novo", nome: "Insulina SC: Transição após a Cetoacidose", apres: "NPH ou glargina + regular (IFF/Fiocruz e HC-UFTM)",
        info: "<strong>Conduta:</strong> antes de uma refeição: regular SC 0,1 a 0,2 U/kg e desligar a bomba 30 a 60 min depois. Basal no diabetes novo: 0,5 U/kg/dia (< 4 anos: 0,3).", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            let u = x => String(Math.round(x * 2) / 2).replace('.', ',');
            let id = parseFloat(i), semIdade = isNaN(id), menor4 = id < 4;
            let b5 = p * 0.5, b3 = p * 0.3, base = Math.round(p * 0.1 * 2) / 2;
            let nph = semIdade
                ? `• ≥ 4 ANOS: NPH ${u(b5)} U/DIA = ${u(b5 * 2 / 3)} U PELA MANHÃ + ${u(b5 / 3)} U À NOITE (22H) (0,5 U/KG/DIA).\n• < 4 ANOS: NPH ${u(b3)} U PELA MANHÃ (0,3 U/KG/DIA, DOSE ÚNICA).`
                : menor4 ? `INSULINA NPH ${u(b3)} U SC PELA MANHÃ (0,3 U/KG/DIA, DOSE ÚNICA).`
                    : `INSULINA NPH ${u(b5)} U/DIA SC = ${u(b5 * 2 / 3)} U PELA MANHÃ + ${u(b5 / 3)} U À NOITE (22H) (0,5 U/KG/DIA).`;
            let glar = semIdade ? `${u(b5)} U (≥ 4 anos) ou ${u(b3)} U (< 4 anos)` : `${u(menor4 ? b3 : b5)} U`;
            let v = semIdade ? `Basal: ${u(b3)} a ${u(b5)} U/dia` : `NPH ${u(menor4 ? b3 : b5)} U/dia`;
            return { v, r: `VIA SUBCUTÂNEA (TRANSIÇÃO APÓS A CETOACIDOSE DIABÉTICA)

1) INSULINA REGULAR: ${u(p * 0.1) === u(p * 0.2) ? u(p * 0.1) : u(p * 0.1) + ' A ' + u(p * 0.2)} U SC ANTES DE UMA REFEIÇÃO (0,1 A 0,2 U/KG).
   DESLIGAR A INSULINA EV E O SORO 30 A 60 MINUTOS DEPOIS. ALIMENTAR LOGO APÓS.
2) ${semIdade ? 'INSULINA BASAL (DIABETES NOVO) - INFORMAR A IDADE:\n' : ''}${nph}
3) INSULINA REGULAR CONFORME HGT, DE 4/4 HORAS OU ANTES DAS REFEIÇÕES:
   < 150: NÃO FAZER
   150-199: ${u(base)} U
   200-299: ${u(base + 1)} U
   300-399: ${u(base + 2)} U
   400-499: ${u(base + 3)} U
   ≥ 500: ${u(base + 4)} U

HGT ANTES DAS REFEIÇÕES E ÀS 3 HORAS DA MADRUGADA.
* Com glargina no lugar da NPH: ${glar} SC 1 vez ao dia, pela manhã; ultrarrápida no lugar da regular: desligar a bomba 15 a 30 min depois.
* Já usava insulina: retomar a dose basal habitual de antes da internação.` };
        },
        detalhes: {
            indicacao: "Cetoacidose resolvida (pH > 7,30, bicarbonato > 15 e cetonemia < 1), sem vômitos e aceitando a via oral.",
            dose: "Regular SC 0,1 a 0,2 U/kg antes da refeição; desligar a bomba 30 a 60 min depois. Basal: 0,5 U/kg/dia (< 4 anos: 0,3) — NPH 2/3 manhã + 1/3 noite.",
            atencao: "Nunca desligar a bomba antes da SC (rebote). Já usava insulina: retomar a dose habitual. Esquema definitivo com o endocrinologista."
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
