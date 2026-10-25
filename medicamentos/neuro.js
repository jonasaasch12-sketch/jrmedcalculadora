// =====================================================
// NEUROLOGIA — cards com cat: "cat-neuro"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    "neuro_diaz": {
        cat: "cat-neuro", sub: "🏥 Uso Hospitalar (Crise Convulsiva)", 
        kw: "diazepam convulsao estado de mal neuro hospitalar injetavel retal", nome: "Diazepam EV ou Retal (Ataque)", apres: "Ampola 10 mg / 2 mL",
        info: "<strong>Conduta:</strong> EV 0,2 mg/kg/dose (máx. 10 mg) | Retal 0,5 mg/kg/dose (máx. 20 mg).", badge: "Teto: EV 10 mg | Retal 20 mg", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            // EV: 0,2 mg/kg/dose, teto 10 mg. Retal: 0,5 mg/kg e repetição de 0,25 mg/kg, teto 20 mg por dose. Ampola de 5 mg/mL.
            let ev = Math.min(p * 0.04, 2).toFixed(2);
            let retal = Math.min(p * 0.1, 4).toFixed(2);
            let retal2 = Math.min(p * 0.05, 4).toFixed(2);
            return { v: `EV: ${ev} mL\nRetal: ${retal} mL`, r: `CRISE CONVULSIVA - DIAZEPAM (5 MG/ML)\n\nOPÇÃO ENDOVENOSA (0,2 MG/KG/DOSE):\n FAZER ${ev} ML DE DIAZEPAM EV. SE A CRISE PERSISTIR, PODE REPETIR A CADA 3 A 5 MINUTOS, ATÉ 2 VEZES.\n\nOPÇÃO RETAL (0,5 MG/KG/DOSE):\n FAZER ${retal} ML DE DIAZEPAM VIA RETAL. SE A CRISE PERSISTIR, PODE REPETIR APÓS 10 MINUTOS COM ${retal2} ML (0,25 MG/KG).` };
        },
        detalhes: {
            indicacao: "Crise convulsiva.",
            dose: "EV: 0,2 mg/kg/dose, pode repetir a cada 3 a 5 min, até 2 vezes. Retal: 0,5 mg/kg/dose, pode repetir após 10 min com 0,25 mg/kg.",
            atencao: "Máximo por dose: EV 10 mg (2 mL) | Retal 20 mg (4 mL). Risco de depressão respiratória: ter material de via aérea pronto."
        }
    },
    "neuro_midaz": {
        cat: "cat-neuro", sub: "🏥 Uso Hospitalar (Crise Convulsiva)", 
        kw: "midazolam convulsao estado de mal neuro hospitalar injetavel intramuscular", nome: "Midazolam IM (Se sem acesso)", apres: "Ampola 5 mg / mL",
        info: "<strong>Conduta:</strong> 0,2 mg/kg IM (Peso x 0,04 mL). Máx. 6 mg. Pode repetir em 10-15 min.", badge: "Teto Máx: 6 mg (1,2 mL)", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = Math.min(p * 0.04, 1.2).toFixed(2); /* SBP: 0,2 mg/kg IM, máx. 6 mg/dose (1,2 mL a 5 mg/mL), repetir em 10-15 min se necessário */ return { v: v + " mL", r: `VIA INTRAMUSCULAR (SEM ACESSO)\n\n FAZER ${v} ML DE MIDAZOLAM (5 MG/ML) IM IMEDIATAMENTE. PODE SER REPETIDO EM 10 A 15 MINUTOS, SE NECESSÁRIO.` }; },
        detalhes: {
            indicacao: "Crise convulsiva aguda sem acesso venoso.",
            dose: "0,2 mg/kg (Peso x 0,04 mL) IM. Pode ser repetido em 10-15 minutos, se necessário.",
            atencao: "Máximo 6 mg (1,2 mL) por dose (SBP). Risco de depressão respiratória: ter material de via aérea pronto."
        },
        ficha: {
            indicacoes: "Crise convulsiva aguda / estado de mal epiléptico sem acesso venoso.",
            dose: "Crise convulsiva sem acesso venoso: 0,2 mg/kg IM, podendo repetir em 10-15 minutos, se necessário\nEstado de mal refratário (EV): 0,15-0,2 mg/kg, seguidos de infusão contínua de 1 mcg/kg/min",
            doseMaxima: "6 mg por dose IM.",
            apresentacoes: "Ampola 5 mg/mL.",
            via: "Intramuscular.",
            alertasPediatricos: "O midazolam por vias não intravenosas (IM, intranasal) é eficaz e seguro no controle de crises agudas, comparável ao diazepam EV. Nos casos de persistência das crises, usar fenitoína, ácido valproico ou fenobarbital. Risco de depressão respiratória.",
            fonteRevisao: "SBP - Sedação, Analgesia e Bloqueio Neuromuscular: https://www.sbp.com.br/fileadmin/user_upload/pdfs/Sedacao_Analgesia_Bloqueio_Neuromuscular.pdf - consultado em out/2026."
        }
    },
    "neuro_midaz_nasal": {
        cat: "cat-neuro", sub: "🏥 Uso Hospitalar (Crise Convulsiva)",
        kw: "midazolam intranasal nasal convulsao estado de mal sem acesso neuro",
        nome: "Midazolam Intranasal (Se sem acesso)", apres: "Ampola 5 mg / mL",
        info: "<strong>Conduta:</strong> 0,2 mg/kg (Peso x 0,04 mL) intranasal. Máx. 10 mg (2 mL).", badge: "Teto Máx: 10 mg (2 mL)", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (Crise Convulsiva em Pediatria, 04/2025): sem acesso EV em 3 min, midazolam IM ou intranasal 0,2 mg/kg, máx. 10 mg; repetir a cada 10 min, até 3 vezes. Ampola 5 mg/mL. */
            let v = Math.min(parseFloat((p * 0.04).toFixed(2)), 2);
            let narina = (v / 2).toFixed(2);
            return { v: v.toFixed(2) + " mL", r: `VIA INTRANASAL (CRISE CONVULSIVA SEM ACESSO VENOSO)\n\nMIDAZOLAM 5 MG/ML: ${v.toFixed(2)} ML (0,2 MG/KG).\nAPLICAR ${narina} ML EM CADA NARINA, DE PREFERÊNCIA COM ATOMIZADOR (MAD).\n\nSE A CRISE PERSISTIR, PODE REPETIR A CADA 10 MINUTOS, ATÉ 3 VEZES.` };
        },
        detalhes: {
            indicacao: "Crise convulsiva sem acesso venoso obtido em 3 minutos.",
            dose: "0,2 mg/kg (Peso x 0,04 mL) intranasal, metade em cada narina. Pode repetir a cada 10 min, até 3 vezes.",
            atencao: "Máximo 10 mg (2 mL) por dose. Risco de depressão respiratória: ter material de via aérea pronto."
        },
        ficha: {
            indicacoes: "Crise convulsiva / estado de mal epiléptico sem acesso venoso.",
            dose: "0,2 mg/kg intranasal; repetir a cada 10 minutos, por até 3 vezes",
            doseMaxima: "10 mg por dose.",
            apresentacoes: "Ampola 5 mg/mL (usar a solução injetável pela mucosa nasal).",
            via: "Intranasal, com atomizador, metade do volume em cada narina.",
            alertasPediatricos: "Usar quando o acesso EV não for obtido em 3 minutos. Risco de depressão respiratória, maior com doses repetidas.",
            fonteRevisao: "Whitebook (Afya) - Crise Convulsiva em Pediatria (Prescrição Hospitalar), atualizado em 29/04/2025."
        }
    },
    "neuro_levetiracetam": {
        cat: "cat-neuro", sub: "🏥 Uso Hospitalar (Crise Convulsiva)",
        kw: "levetiracetam keppra convulsao crise persistente estado de mal epileptico segunda linha neuro hospitalar injetavel",
        nome: "Levetiracetam EV (Crise Persistente)", apres: "Frasco 500 mg / 5 mL (100 mg/mL)",
        info: "<strong>Conduta:</strong> 60 mg/kg EV em 10 a 15 min. Máx. 4.500 mg.", badge: "Máx: 4.500 mg (45 mL)", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* AES 2016 e ESETT 2019: 60 mg/kg EV, máx. 4500 mg, dose única, em 10 min. Frasco 100 mg/mL. */
            let mg = Math.min(p * 60, 4500);
            let ml = mg / 100;
            let fr = Math.ceil(ml / 5);
            /* Bula (DailyMed): diluir a no máximo 15 mg/mL (adulto: em 100 mL) e infundir em 15 min. */
            let total = Math.max(Math.ceil(mg / 15), Math.ceil(ml));
            let sf = Math.max(total - ml, 0);
            return { v: `${ml.toFixed(1)} mL (${mg.toFixed(0)} mg)`, r: `VIA ENDOVENOSA (CRISE CONVULSIVA PERSISTENTE - 2ª LINHA)\n\nLEVETIRACETAM 100 MG/ML (FRASCO 500 MG/5 ML) ---- ${fr} FR\nDOSE: ${mg.toFixed(0)} MG (60 MG/KG) = ${ml.toFixed(1)} ML.\n\nASPIRAR ${ml.toFixed(1)} ML DE LEVETIRACETAM + ${sf.toFixed(1)} ML DE SF 0,9% (TOTAL ${total} ML, NO MÁXIMO 15 MG/ML).\nCORRER EM BIC EM 15 MINUTOS (${(total * 4).toFixed(0)} ML/H), EM DOSE ÚNICA.` };
        },
        detalhes: {
            indicacao: "Crise convulsiva que persiste após 2 doses de benzodiazepínico (2ª linha, alternativa à fenitoína).",
            dose: "60 mg/kg EV em 10 a 15 minutos, dose única.",
            atencao: "Máximo 4.500 mg (45 mL). Não causa hipotensão nem arritmia e não precisa de monitor cardíaco para a infusão. Reduzir a manutenção na insuficiência renal."
        },
        ficha: {
            indicacoes: "Estado de mal epiléptico convulsivo refratário ao benzodiazepínico (2ª linha).",
            dose: "Ataque: 60 mg/kg EV, dose única, em 10 minutos (ESETT) a 15 minutos",
            doseMaxima: "4.500 mg por dose.",
            apresentacoes: "Solução injetável 100 mg/mL, frasco de 5 mL (500 mg).",
            via: "Endovenosa.",
            diluicao: "Diluir em SF 0,9%, Ringer lactato ou SG 5%, a no máximo 15 mg/mL (adulto: dose em 100 mL). Considerar o volume total de líquidos da criança. Usar em até 4 h após diluir.",
            infusao: "15 minutos (bula); 10 minutos no ESETT.",
            alertasPediatricos: "No ESETT (crianças e adultos), levetiracetam, fosfenitoína e valproato tiveram eficácia semelhante (cerca de 50% das crises controladas em 60 min) e eventos adversos parecidos. Sem hipotensão nem arritmia; pode causar sonolência e irritabilidade.",
            ajusteRenal: "Ajustar a manutenção pela função renal.",
            fonteRevisao: "Glauser T et al. AES Guideline. Epilepsy Curr 2016;16(1):48-61. doi:10.5698/1535-7597-16.1.48 | Kapur J et al. Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus (ESETT). N Engl J Med 2019;381:2103-13. doi:10.1056/NEJMoa1905795 | Diluição: bula do levetiracetam injetável (FDA/DailyMed), consultada em out/2026."
        }
    },
    "neuro_midaz_continuo": {
        cat: "cat-neuro", sub: "🏥 Uso Hospitalar (Crise Convulsiva)",
        kw: "midazolam infusao continua estado de mal epileptico refratario uti coma neuro",
        nome: "Midazolam Contínuo (Estado de Mal Refratário)", apres: "Ampola 5 mg/mL · solução 1 mg/mL",
        info: "<strong>Conduta (UTI):</strong> ataque 0,2 mg/kg EV; infusão 0,05 a 2 mg/kg/h.", badge: "Ataque máx: 10 mg", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Neurocritical Care Society 2012: ataque 0,2 mg/kg; bolus extra de 0,2-0,4 mg/kg a cada 5 min até parar (máx. 2 mg/kg); infusão 0,05-2 mg/kg/h. Solução 1 mg/mL: mL/h = peso x mg/kg/h. */
            let at = Math.min(p * 0.2, 10), atMl = at / 5;
            let t = d => (p * d).toFixed(1);
            return { v: `Ataque ${atMl.toFixed(2)} mL`, r: `VIA ENDOVENOSA (ESTADO DE MAL REFRATÁRIO - UTI)\n\nATAQUE: ${atMl.toFixed(2)} ML DE MIDAZOLAM 5 MG/ML (${at.toFixed(1)} MG = 0,2 MG/KG) EV.\n\nSOLUÇÃO: 10 ML DE MIDAZOLAM 5 MG/ML (50 MG) + 40 ML DE SF 0,9% (TOTAL 50 ML = 1 MG/ML).\nVELOCIDADES NA BIC:\n • 0,05 MG/KG/H: ${t(0.05)} ML/H\n • 0,1 MG/KG/H: ${t(0.1)} ML/H\n • 0,2 MG/KG/H: ${t(0.2)} ML/H\n • 0,5 MG/KG/H: ${t(0.5)} ML/H\n • 1 MG/KG/H: ${t(1)} ML/H\n • 2 MG/KG/H: ${t(2)} ML/H\n\nSE A CRISE CONTINUAR: BOLUS DE 0,2 A 0,4 MG/KG A CADA 5 MINUTOS E SUBIR A INFUSÃO. VIA AÉREA ASSEGURADA E EEG CONTÍNUO.` };
        },
        detalhes: {
            indicacao: "Estado de mal epiléptico refratário (persiste após benzodiazepínico e um fármaco de 2ª linha), em UTI.",
            dose: "Ataque 0,2 mg/kg EV; bolus de 0,2 a 0,4 mg/kg a cada 5 min se persistir (máx. 2 mg/kg somados); infusão 0,05 a 2 mg/kg/h.",
            atencao: "Uso em UTI, com via aérea assegurada, monitor e, de preferência, EEG contínuo. Causa hipotensão e depressão respiratória; tolerância com o uso prolongado."
        },
        ficha: {
            indicacoes: "Estado de mal epiléptico refratário.",
            dose: "Ataque: 0,2 mg/kg EV\nBolus adicionais: 0,2-0,4 mg/kg a cada 5 minutos até cessar a crise (máximo 2 mg/kg de ataque somado)\nInfusão contínua: 0,05-2 mg/kg/h, ajustada pela clínica e pelo EEG",
            apresentacoes: "Ampola 5 mg/mL.",
            via: "Endovenosa (infusão contínua em BIC).",
            diluicao: "Ex.: 50 mg (10 mL) em 40 mL de SF 0,9% = 1 mg/mL.",
            alertasPediatricos: "Hipotensão, depressão respiratória; taquifilaxia com uso prolongado. Manter a infusão por 24 a 48 h de controle eletrográfico antes de desmamar.",
            fonteRevisao: "Brophy GM et al. Guidelines for the evaluation and management of status epilepticus (Neurocritical Care Society). Neurocrit Care 2012;17(1):3-23. doi:10.1007/s12028-012-9695-z"
        }
    },
    "neuro_fenitoina": {
        cat: "cat-neuro", sub: "🏥 Uso Hospitalar (Crise Convulsiva)", 
        kw: "fenitoina hidantal convulsao crise persistente estado de mal epileptico neuro hospitalar injetavel", nome: "Fenitoína EV (Crise Persistente)", apres: "Ampola 50 mg / mL",
        info: "<strong>Conduta:</strong> 20 mg/kg EV (máx. 1.500 mg). Velocidade máx. 3 mg/kg/min, até 50 mg/min.", badge: "Máx: 1.500 mg (30 mL)", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            // 20 mg/kg (Whitebook: 15-20 mg/kg), teto de 1500 mg (Whitebook, Crise Convulsiva em Pediatria, 04/2025). Velocidade: até 3 mg/kg/min, nunca acima de 50 mg/min.
            let mg = Math.min(p * 20, 1500);
            let mlPuro = mg / 50;                       // ampola 50 mg/mL
            let mgMin = Math.min(p * 3, 50);            // velocidade máxima permitida
            let tempoMin = Math.ceil(mg / mgMin);       // tempo mínimo de infusão
            let volDiluido = mg / 5;                    // diluição final de 5 mg/mL
            let sf = volDiluido - mlPuro;
            let vazao = (mgMin / 5) * 60;               // mL/h na BIC
            return { v: `${mlPuro.toFixed(1)} mL (${mg.toFixed(0)} mg)`, r: `VIA ENDOVENOSA (CRISE CONVULSIVA PERSISTENTE)\n\nDOSE: ${mg.toFixed(0)} MG = ${mlPuro.toFixed(1)} ML DE FENITOÍNA 50 MG/ML.\n\nOPÇÃO A - SEM DILUIÇÃO:\n Fazer ${mlPuro.toFixed(1)} mL EV lento, em no mínimo ${tempoMin} minutos (máx. ${mgMin.toFixed(0)} mg/min).\n\nOPÇÃO B - DILUÍDA (5 MG/ML):\n Aspirar ${mlPuro.toFixed(1)} mL de Fenitoína + ${sf.toFixed(1)} mL de SF 0,9% (total ${volDiluido.toFixed(1)} mL).\n Correr em BIC a ${vazao.toFixed(0)} mL/h (${mgMin.toFixed(0)} mg/min), em no mínimo ${tempoMin} minutos.` };
        },
        detalhes: {
            indicacao: "Crise convulsiva que persiste por mais de 10 a 15 minutos mesmo após diazepam ou midazolam.",
            dose: "20 mg/kg EV (Whitebook: 15 a 20 mg/kg). Sem diluir ou diluída a 5 mg/mL, a no máximo 3 mg/kg/min e 50 mg/min.",
            atencao: "Máximo 1.500 mg (30 mL) por dose (Whitebook). Diluir só em SF 0,9% (precipita em soro glicosado). Monitorar ECG e PA: risco de arritmia e hipotensão se correr rápido."
        }
    },
    "fenobarbital": {
        cat: "cat-neuro", sub: "🏥 Uso Hospitalar (Crise Convulsiva)",
        kw: "fenobarbital gardenal anticonvulsivante barbiturico convulsao crise neonatal ataque sedacao hospitalar injetavel", nome: "Fenobarbital EV", apres: "Ampola 100 mg / mL",
        info: "<strong>Conduta:</strong> Ataque 10-20 mg/kg EV dose única (neonatal 20 mg/kg). Máx. 320 mg/dose. Infundir até 60 mg/min.", badge: "Máx: 320 mg/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            // Whitebook - ampola 100 mg/mL, diluir com SF e infundir no máximo a 60 mg/min.
            // Neonatal: ataque 20 mg/kg (repetir 10-20 mg/kg se necessário); manutenção 5 mg/kg/dia EV de 24/24h.
            // Lactentes, crianças e adolescentes: ataque 10-20 mg/kg (repetir 5-10 mg/kg); manutenção 3-6 mg/kg/dia de 12/12 ou 24/24h. Máximo 320 mg/dose.
            let f = n => n.toFixed(2), neo = i !== "" && parseFloat(i) < 0.08;
            let cap = mg => Math.min(mg, 320), t = mg => Math.ceil(mg / 60);
            if (neo) {
                let a = cap(p * 20), r1 = cap(p * 10), r2 = cap(p * 20);
                return { v: f(a / 100) + " mL", r: `VIA ENDOVENOSA (PERÍODO NEONATAL) - FENOBARBITAL 100 MG/ML\n\nATAQUE (20 MG/KG): ${f(a / 100)} mL (${a.toFixed(0)} mg), diluído em SF 0,9%, EV em dose única (no mínimo ${t(a)} min, até 60 mg/min).\nSE NECESSÁRIO, REPETIR: ${f(r1 / 100)} a ${f(r2 / 100)} mL (10 a 20 mg/kg).\n\nMANUTENÇÃO: ${f(p * 5 / 100)} mL (${(p * 5).toFixed(1)} mg = 5 mg/kg/dia) EV de 24/24 horas.` };
            }
            let a1 = cap(p * 10), a2 = cap(p * 20), r1 = cap(p * 5), r2 = cap(p * 10);
            return { v: `${f(a1 / 100)}-${f(a2 / 100)} mL`, r: `VIA ENDOVENOSA - FENOBARBITAL 100 MG/ML\n\nATAQUE (10 A 20 MG/KG): ${f(a1 / 100)} a ${f(a2 / 100)} mL (${a1.toFixed(0)} a ${a2.toFixed(0)} mg), diluído em SF 0,9%, EV em dose única (até 60 mg/min; ${a2.toFixed(0)} mg em no mínimo ${t(a2)} min).\nPODE SER REPETIDO: ${f(r1 / 100)} a ${f(r2 / 100)} mL (5 a 10 mg/kg).\n\nMANUTENÇÃO: ${(p * 3).toFixed(0)} a ${(p * 6).toFixed(0)} mg/dia (3 a 6 mg/kg/dia) EV de 12/12 ou 24/24 horas.\n\nDOSE MÁXIMA: 320 mg (3,2 mL) por dose.` };
        },
        detalhes: {
            indicacao: "Anticonvulsivante; sedação; efeitos hipnóticos.",
            dose: "Neonatal: ataque 20 mg/kg EV (repetir 10-20 mg/kg se necessário); manutenção 5 mg/kg/dia de 24/24h. Lactentes, crianças e adolescentes: ataque 10-20 mg/kg EV (repetir 5-10 mg/kg); manutenção 3-6 mg/kg/dia de 12/12 ou 24/24h.",
            atencao: "Dose máxima 320 mg (3,2 mL) por dose. Diluir com SF e infundir no máximo a 60 mg/min. Pode causar hipotensão, depressão respiratória e rebaixamento do nível de consciência, podendo ser necessário manejo de via aérea avançada em doses repetidas."
        },
        ficha: {
            indicacoes: "Anticonvulsivante; sedação; efeitos hipnóticos.",
            dose: "Período neonatal - ataque: 20 mg/kg EV dose única; repetir 10-20 mg/kg se necessário\nPeríodo neonatal - manutenção: 5 mg/kg/dia EV de 24/24 horas\nLactentes, crianças e adolescentes - ataque: 10-20 mg/kg EV dose única; repetir 5-10 mg/kg se necessário\nLactentes, crianças e adolescentes - manutenção: 3-6 mg/kg/dia EV de 12/12 ou 24/24 horas",
            doseMaxima: "3,2 mL/dose (320 mg).",
            apresentacoes: "Ampola 100 mg/mL e 200 mg/mL; comprimido 50 mg e 100 mg; gotas 40 mg/mL (1 gota = 1 mg).",
            via: "Endovenosa.",
            diluicao: "Diluir com soro fisiológico.",
            infusao: "Infundir no máximo a 60 mg/minuto.",
            alertasPediatricos: "Pode causar hipotensão, depressão respiratória e rebaixamento do nível de consciência, podendo ser necessário inclusive manejo de via aérea avançada em uso de doses repetidas.",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Fenobarbital, atualizado em 14/08/2025."
        }
    },
    "fenobarbital_gts": {
        cat: "cat-neuro", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "fenobarbital gardenal gotas anticonvulsivante manutencao crise convulsiva oral", nome: "Fenobarbital Gotas (Manutenção)", apres: "40 mg / mL (1 gota = 1 mg)",
        info: "<strong>Posologia:</strong> Neonatos 5 mg/kg/dia 24/24h | >1 mês 3-6 mg/kg/dia de 12/12 ou 24/24h. Máx. 400 gotas/dia.", badge: "Máx: 400 gotas/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            // Whitebook - manutenção para crises convulsivas (VO, 1 gota = 1 mg). Dose máxima 400 gotas/dia (400 mg/dia).
            if (i !== "" && parseFloat(i) < 0.08) {
                let g = Math.min(Math.round(p * 5), 400);
                return { v: g + " gts", r: `${recHead}1) FENOBARBITAL GOTAS 40 MG/ML ------------- 1 FR\nDAR ${g} GOTAS (5 MG/KG/DIA), VIA ORAL, DE 24/24 HORAS.` };
            }
            let min = Math.min(Math.round(p * 3), 400), max = Math.min(Math.round(p * 6), 400);
            return { v: `${min}-${max} gts/dia`, r: `${recHead}1) FENOBARBITAL GOTAS 40 MG/ML ------------- 1 FR\nDAR ${min} A ${max} GOTAS POR DIA (3 A 6 MG/KG/DIA), VIA ORAL, EM DOSE ÚNICA (24/24 HORAS) OU DIVIDIDO DE 12/12 HORAS. MÁXIMO 400 GOTAS POR DIA.` };
        },
        detalhes: {
            indicacao: "Dose de manutenção para crises convulsivas.",
            dose: "Neonatos: 5 mg/kg/dia VO de 24/24h. >1 mês de idade: 3-6 mg/kg/dia VO de 12/12 ou 24/24h. 1 gota = 1 mg.",
            atencao: "Dose máxima: 400 gotas/dia (400 mg/dia)."
        },
        ficha: {
            indicacoes: "Dose de manutenção para crises convulsivas.",
            dose: "Manutenção em neonatos: 5 mg/kg/dia VO de 24/24 horas\nManutenção em > 1 mês de idade: 3-6 mg/kg/dia VO de 12/12 ou 24/24 horas",
            doseMaxima: "400 gotas/dia (400 mg/dia).",
            apresentacoes: "Gotas 40 mg/mL (1 gota = 1 mg); comprimido 50 mg e 100 mg.",
            via: "Oral.",
            intervalo: "12/12 ou 24/24 horas.",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Fenobarbital, atualizado em 14/08/2025."
        }
    },
    "hidrato_cloral": {
        cat: "cat-neuro", sub: "🏥 Uso Hospitalar (Sedação)",
        kw: "hidrato de cloral sedacao exame ecocardiograma eco sedativo oral", nome: "Hidrato de Cloral 4% (Sedação para Exames)", apres: "40 mg / mL",
        info: "<strong>Conduta:</strong> Peso ÷ 2 mL (20 mg/kg), 30 min antes do exame.", badge: "Máx: 20 mL acumulado", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let v = Math.min(parseFloat(round05(p / 2)), 20).toFixed(1);
            return { v: v + " mL", r: `${recHead}1) HIDRATO DE CLORAL 4% (40 MG/ML)\nDAR ${v} ML, VIA ORAL, 30 MINUTOS ANTES DO EXAME.\nOBSERVAR POR 60 MINUTOS. SE NÃO DORMIR, PODE REPETIR A DOSE, SEM PASSAR DE 20 ML SOMANDO TODAS AS DOSES.` };
        },
        detalhes: {
            indicacao: "Sedação leve para exames (ex.: ecocardiograma).",
            dose: "20 mg/kg (Peso ÷ 2 mL) VO, 30 min antes do exame. Pode repetir após 60 min se não dormir.",
            atencao: "Máximo 20 mL somando todas as doses. Não usar se estiver em uso de diazepam; metade da dose se usar clonazepam ou clobazam."
        }
    }
});
