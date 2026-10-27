// =====================================================
// PELE — cards com cat: "cat-pele"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    "pele_larva": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "larva migrans bicho geografico tiabendazol albendazol pele ambulatorial", nome: "Larva Migrans (Tópico + Sistêmico)", apres: "Tiabendazol 5% + Albendazol",
        info: "<strong>Conduta:</strong> Tiabendazol pomada + Albendazol oral.", badgeSt: "static-blue", badge: "Tópico + Oral", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => { 
            let alb = (parseFloat(p) >= 40 || parseFloat(i) >= 12) ? "ALBENDAZOL 400 MG ---------------------- 3 CP\nTOMAR 01 COMPRIMIDO 1X AO DIA POR 3 DIAS." : "ALBENDAZOL 400 MG/10ML ---------------------- 1 FR\nDAR 10 ML 1X AO DIA POR 3 DIAS.";
            return { v: "Tópico + Oral", r: `USO TÓPICO E ORAL\n\n1) TIABENDAZOL 5% POMADA ---------------------- 1 TUBO\nAPLICAR NA LESÃO DE 6/6H POR 5 DIAS.\n\n2) ${alb}` }; 
        },
        detalhes: {
            indicacao: "Larva migrans cutânea (bicho geográfico).",
            dose: "Tiabendazol pomada de 6/6h por 5 dias + albendazol 400 mg 1x ao dia por 3 dias.",
            atencao: "Albendazol para maiores de 2 anos."
        }
    },
    "pele_delta": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "deltametrina piolho pediculose shampoo cabelo pele ambulatorial tópica", nome: "Deltametrina Shampoo", apres: "Uso Tópico Capilar",
        info: "<strong>Conduta:</strong> 10 min no cabelo por 4 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) DELTAMETRINA SHAMPOO --------------------------------- 1 FR\nAPLICAR NOS CABELOS, DEIXAR AGIR 10 MIN E ENXAGUAR, POR 4 DIAS SEGUIDOS.` }),
        detalhes: {
            indicacao: "Pediculose (piolho).",
            dose: "Aplicar nos cabelos por 4 dias seguidos.",
            atencao: "Passar pente fino depois. Tratar os contactantes."
        }
    },
    "pele_perme_shampoo": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "permetrina shampoo 1% piolho pediculose cabelo pele ambulatorial tópica", nome: "Permetrina Shampoo 1% (Pediculose)", apres: "Uso Tópico Capilar",
        info: "<strong>Conduta:</strong> 10 min no cabelo. Repetir em 7 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) PERMETRINA SHAMPOO A 1% --------------------------------- 1 FR\nAPLICAR NOS CABELOS, DEIXAR AGIR POR 10 MIN E ENXAGUAR. REPETIR APÓS 7 DIAS.` }),
        detalhes: {
            indicacao: "Pediculose (piolho).",
            dose: "Aplicar 1 vez e repetir após 7 dias.",
            atencao: "Passar pente fino depois. Tratar os contactantes."
        }
    },
    "pele_perme": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "permetrina loção 5% sarna escabiose coceira pele ambulatorial tópica", nome: "Permetrina Loção 5% (Escabiose)", apres: "Loção Tópica",
        info: "<strong>Conduta:</strong> Abaixo do pescoço à noite. Repetir em 7 dias. A partir de 2 meses.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => {
            // SBP (Ectoparasitoses): permetrina 5% é a 1ª escolha na escabiose, a partir de 2 meses de idade.
            if (i !== "" && parseFloat(i) < 0.17) return { v: "Contraind.", r: "ATENÇÃO: Permetrina 5% indicada a partir de 2 meses de idade (SBP)." };
            return { v: "Uso Tópico", r: `USO TÓPICO\n\n1) PERMETRINA LOÇÃO A 5% --------------------------------- 1 FR\nAPLICAR NO CORPO ABAIXO DO PESCOÇO ANTES DE DORMIR, RETIRAR AO ACORDAR. REPETIR EM 7 DIAS.` };
        },
        detalhes: {
            indicacao: "Escabiose (sarna).",
            dose: "Aplicar à noite e repetir após 7 dias.",
            atencao: "A partir de 2 meses de idade. 1ª escolha na escabiose (eficácia de 90-98% com 8-12 h de contato). Tratar todos da casa ao mesmo tempo. Lavar roupas e roupas de cama em água quente."
        },
        ficha: {
            indicacoes: "Escabiose (1ª escolha).",
            dose: "Escabiose: aplicar em todo o corpo abaixo do pescoço, em todas as lesões, à noite, e retirar no banho ao acordar (8-12 horas de contato); repetir em 7 dias",
            apresentacoes: "Loção/creme 5%.",
            via: "Tópica.",
            contraindicacoes: "Menores de 2 meses de idade.",
            alertasPediatricos: "Eficácia de 90-98% com 8-12 horas de contato. A permetrina 5% não tem eficácia na pediculose.",
            fonteRevisao: "SBP - Documento Científico Ectoparasitoses: https://www.sbp.com.br/fileadmin/user_upload/22734c-DC-Ectoparasitoses.pdf - consultado em out/2026."
        }
    },
    "pele_iver": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "ivermectina comprimido sarna escabiose pele oral ambulatorial", nome: "Ivermectina 6 mg (Escabiose Oral)", apres: "Comprimido",
        info: "<strong>Conduta:</strong> Dose única por peso. >5 anos e >15 kg. Reservada a casos graves ou refratários.", badge: "> 5 anos e > 15 kg", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => { 
            // SBP (Ectoparasitoses): só para maiores de 5 anos e 15 kg; reservada às formas graves ou refratárias ao tratamento tópico.
            if (i !== "" && parseFloat(i) <= 5) return { v: "Contraind.", r: "ATENÇÃO: Ivermectina indicada apenas para maiores de 5 anos e 15 kg (SBP). Preferir permetrina 5% tópica." };
            let c = "Contraind.", t = "VERIFICAR CONTRAINDICAÇÃO (<15 kg).";
            if (p >= 15 && p <= 25) { c = "0.5 cp"; t = "TOMAR MEIO COMPRIMIDO VIA ORAL, DOSE ÚNICA. REPETIR EM 14 DIAS."; }
            else if (p > 25 && p <= 45) { c = "1 cp"; t = "TOMAR 01 COMPRIMIDO VIA ORAL, DOSE ÚNICA. REPETIR EM 14 DIAS."; }
            else if (p > 45) { c = "2 cp"; t = "TOMAR 02 COMPRIMIDOS VIA ORAL, DOSE ÚNICA. REPETIR EM 14 DIAS."; }
            return { v: c, r: `${recHead}1) IVERMECTINA 6 MG -------------------------------------- 1 CX\n${t}` }; 
        },
        detalhes: {
            indicacao: "Escabiose (sarna) e outras parasitoses.",
            dose: "15-25 kg: ½ cp | 26-45 kg: 1 cp | >45 kg: 2 cp. Dose única, repetir em 14 dias.",
            atencao: "Contraindicada abaixo de 15 kg ou 5 anos. Reservada às formas graves de escabiose ou refratárias ao tratamento tópico (SBP); a permetrina 5% é a 1ª escolha."
        },
        ficha: {
            indicacoes: "Escabiose grave ou refratária ao tratamento tópico. Tem indicação em bula para pediculose.",
            dose: "Escabiose grave ou refratária: 200 mcg/kg VO em dose única, repetir em 14 dias\n15-25 kg: ½ comprimido\n26-45 kg: 1 comprimido\n> 45 kg: 2 comprimidos",
            apresentacoes: "Comprimido 6 mg.",
            via: "Oral.",
            contraindicacoes: "Crianças com 5 anos ou menos ou com 15 kg ou menos.",
            alertasPediatricos: "Deve ter as indicações limitadas às formas mais graves de escabiose ou refratárias ao tratamento tópico: há relatos de efeitos adversos graves e a segurança em crianças não está bem estabelecida. A permetrina 5% tópica é o tratamento de 1ª escolha.",
            fonteRevisao: "SBP - Documento Científico Ectoparasitoses: https://www.sbp.com.br/fileadmin/user_upload/22734c-DC-Ectoparasitoses.pdf - consultado em out/2026."
        }
    },
    "pele_escabiose_orient": {
        cat: "cat-pele", sub: "Orientações",
        kw: "escabiose sarna orientacoes familia contactantes ubs lavar ferver roupas ferro colchao sofa ivermectina permetrina",
        nome: "Orientações — Escabiose (Família)", apres: "Termo de Orientação",
        info: "<strong>Descrição:</strong> Tratamento de todos os contactantes e cuidados com roupas, colchão e sofá.",
        badgeSt: "static-blue", badge: "Orientações", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Orientações", r: "ORIENTAÇÕES - ESCABIOSE (SARNA): TRATAMENTO DE TODA A FAMÍLIA\n\n1) TRATAR TODOS DA CASA AO MESMO TEMPO:\n- Todas as pessoas que moram na casa e os contatos próximos devem ser tratados no mesmo dia, mesmo quem não tem coceira.\n- Procurar a UBS para que seja prescrito o tratamento de todos os contactantes.\n- Repetir o tratamento conforme a receita: permetrina após 7 dias, ivermectina após 14 dias.\n\n2) ROUPAS E OBJETOS:\n- Lavar e ferver todas as roupas de cama, de banho e de uso pessoal por 3 dias consecutivos.\n- Secar ao sol e passar ferro quente em todas as roupas.\n- Passar ferro quente no colchão, no sofá e em outros estofados.\n- O que não puder ser lavado (bichos de pelúcia, almofadas, sapatos) deve ficar fechado em saco plástico por 7 dias.\n- Não compartilhar roupas, toalhas e roupas de cama.\n\n3) CUIDADOS:\n- Manter as unhas curtas e limpas e evitar coçar, para não infeccionar as lesões.\n- A coceira pode continuar por até 2 a 4 semanas depois do tratamento. Isso não quer dizer que o tratamento falhou.\n\nRETORNAR SE:\n- Lesões com pus, vermelhidão que aumenta ou febre;\n- Coceira ou lesões novas depois de 4 semanas do tratamento." })
    },
    "fusidico_impetigo": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "acido fusidico verutex fucidin impetigo creme pomada antibiotico topico",
        nome: "Ácido Fusídico 2% (Impetigo)", apres: "Creme ou pomada",
        info: "<strong>Conduta (Whitebook):</strong> aplicar 2–3 vezes ao dia por 5–7 dias. Pode ser usado em < 3 meses.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) ÁCIDO FUSÍDICO 2% CREME --------------------------- 1 BISNAGA\nLAVAR AS LESÕES COM ÁGUA MORNA E SABONETE NEUTRO, REMOVER AS CROSTAS E APLICAR 2 A 3 VEZES AO DIA POR 5 A 7 DIAS.` }),
        detalhes: {
            indicacao: "Impetigo localizado, não complicado, com poucas lesões (opção tópica, inclusive em menores de 3 meses).",
            dose: "Aplicar na lesão 2–3 vezes ao dia por 5–7 dias.",
            atencao: "Lesões extensas, bolhosas, febre ou mais de 5 lesões: antibiótico oral (ver cards de impetigo)."
        },
        ficha: { indicacoes: "Impetigo localizado.", dose: "Aplicar na lesão 2-3 vezes ao dia por 5-7 dias", apresentacoes: "Creme ou pomada 2%.", via: "Tópica.", alertasPediatricos: "Pode ser utilizado em lactentes menores de 3 meses.", fonteRevisao: "Whitebook (Afya) - Impetigo (Prescrição Ambulatorial: tratamento tópico e sistêmico), vídeo enviado pelo Dr. Jonas em 27/10/2026." }
    },
    "cefalexina_impetigo": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "cefalexina keflex impetigo bolhoso piodermite pele celulite antibiotico oral suspensao",
        nome: "Cefalexina Suspensão (Impetigo / Pele)", apres: "250 mg / 5 mL",
        info: "<strong>Posologia (Whitebook):</strong> 25–50 mg/kg/dia (0,125–0,25 mL/kg/dose) VO de 6/6h por 7–10 dias.", badge: "Máx: 10 mL/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (Impetigo, esquema A): cefalexina 250 mg/5 mL 25-50 mg/kg/dia (0,125-0,25 mL/kg/dose) VO de 6/6h por 7-10 dias. Teto do app 10 mL/dose (500 mg), dose máxima do Whitebook na ITU. */
            let a = Math.min(parseFloat(round05(p * 0.125)), 10), b = Math.min(parseFloat(round05(p * 0.25)), 10), t = x => String(x).replace('.', ',');
            return { v: `${a}–${b} mL`, r: `${recHead}1) CEFALEXINA 250 MG / 5 ML ------------------ 1 FR\nDAR ${t(a)} A ${t(b)} ML, VIA ORAL, DE 6/6 HORAS POR 7 A 10 DIAS.` };
        },
        detalhes: {
            indicacao: "Impetigo com indicação de tratamento sistêmico (1ª escolha, junto com o tópico); celulite leve.",
            dose: "25–50 mg/kg/dia (0,125–0,25 mL/kg/dose) VO de 6/6h por 7 a 10 dias.",
            atencao: "Teto do app: 10 mL (500 mg) por dose. Associar o tratamento tópico."
        },
        ficha: { indicacoes: "Impetigo com indicação de tratamento sistêmico (esquema A, monoterapia empírica).", dose: "25-50 mg/kg/dia (0,125-0,25 mL/kg/dose) VO de 6/6 horas por 7-10 dias", doseMaxima: "Teto do app: 500 mg/dose (10 mL).", apresentacoes: "Suspensão 250 mg/5 mL.", via: "Oral.", fonteRevisao: "Whitebook (Afya) - Impetigo (Prescrição Ambulatorial: tratamento tópico e sistêmico), vídeo enviado pelo Dr. Jonas em 27/10/2026." }
    },
    "eritro_impetigo": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "eritromicina impetigo alergia penicilina pele antibiotico oral suspensao macrolideo",
        nome: "Eritromicina Suspensão (Impetigo, alérgico)", apres: "50 mg / mL",
        info: "<strong>Posologia (Whitebook):</strong> 40 mg/kg/dia (0,2 mL/kg/dose) VO de 6/6h por 7 dias.", badge: "Teto: 10 mL/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (Impetigo, esquema B - alérgicos à penicilina): eritromicina 50 mg/mL 40 mg/kg/dia (0,2 mL/kg/dose) VO de 6/6h por 7 dias. Teto do app 10 mL/dose (500 mg, dose do adulto). */
            let v = Math.min(parseFloat(round05(p * 0.2)), 10);
            return { v: v + " mL", r: `${recHead}1) ERITROMICINA 50 MG/ML ---------------------- 1 FR\nDAR ${String(v).replace('.', ',')} ML, VIA ORAL, DE 6/6 HORAS POR 7 DIAS.` };
        },
        detalhes: { indicacao: "Impetigo com tratamento sistêmico em alérgico à penicilina.", dose: "40 mg/kg/dia (0,2 mL/kg/dose) VO de 6/6h por 7 dias.", atencao: "Teto do app: 10 mL (500 mg) por dose. Intolerância gastrointestinal frequente." },
        ficha: { indicacoes: "Impetigo em alérgicos às penicilinas (esquema B).", dose: "40 mg/kg/dia (0,2 mL/kg/dose) VO de 6/6 horas por 7 dias", doseMaxima: "Teto do app: 500 mg/dose (10 mL).", apresentacoes: "Suspensão 50 mg/mL.", via: "Oral.", fonteRevisao: "Whitebook (Afya) - Impetigo (Prescrição Ambulatorial: tratamento tópico e sistêmico), vídeo enviado pelo Dr. Jonas em 27/10/2026." }
    },
    "claritro_impetigo": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "claritromicina klaricid impetigo alergia penicilina pele antibiotico oral suspensao macrolideo",
        nome: "Claritromicina Suspensão (Impetigo, alérgico)", apres: "50 mg / mL",
        info: "<strong>Posologia (Whitebook):</strong> 15 mg/kg/dia (0,15 mL/kg/dose) VO de 12/12h por 7–10 dias. Máx. 500 mg/dose.", badge: "Máx: 10 mL/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (Impetigo, esquema B): claritromicina 50 mg/mL 15 mg/kg/dia (0,15 mL/kg/dose) VO de 12/12h por 7-10 dias, máx. 500 mg/dose (10 mL). */
            let v = Math.min(parseFloat(round05(p * 0.15)), 10);
            return { v: v + " mL", r: `${recHead}1) CLARITROMICINA 50 MG/ML -------------------- 1 FR\nDAR ${String(v).replace('.', ',')} ML, VIA ORAL, DE 12/12 HORAS POR 7 A 10 DIAS.` };
        },
        detalhes: { indicacao: "Impetigo com tratamento sistêmico em alérgico à penicilina.", dose: "15 mg/kg/dia (0,15 mL/kg/dose) VO de 12/12h por 7 a 10 dias.", atencao: "Máximo 500 mg (10 mL) por dose." },
        ficha: { indicacoes: "Impetigo em alérgicos às penicilinas (esquema B).", dose: "15 mg/kg/dia (0,15 mL/kg/dose) VO de 12/12 horas por 7-10 dias", doseMaxima: "500 mg/dose (10 mL).", apresentacoes: "Suspensão 50 mg/mL.", via: "Oral.", fonteRevisao: "Whitebook (Afya) - Impetigo (Prescrição Ambulatorial: tratamento tópico e sistêmico), vídeo enviado pelo Dr. Jonas em 27/10/2026." }
    },
    "smx_impetigo": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "sulfametoxazol trimetoprima bactrim impetigo mrsa furunculo alergia penicilina pele",
        nome: "Sulfametoxazol + Trimetoprima (Impetigo / MRSA)", apres: "200 + 40 mg / 5 mL (8 mg TMP/mL)",
        info: "<strong>Posologia (Whitebook):</strong> 8 mg TMP/kg/dia (0,5 mL/kg/dose) VO de 12/12h por 7–10 dias. Máx. 20 mL/dose.", badge: "Máx: 20 mL/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            /* Whitebook (Impetigo, esquemas B e C): SMX-TMP 40+8 mg/mL, 8 mg/kg/dia de TMP (0,5 mL/kg/dose) VO de 12/12h por 7-10 dias, máx. 160 mg TMP/dose (20 mL). A partir de 2 meses. */
            if (i !== "" && parseFloat(i) < 0.17) return { v: "Contraind.", r: "ATENÇÃO: Sulfametoxazol + Trimetoprima a partir de 2 meses de idade." };
            let v = Math.min(parseFloat(round05(p * 0.5)), 20);
            return { v: v + " mL", r: `${recHead}1) SULFAMETOXAZOL + TRIMETOPRIMA 200+40 MG/5 ML -- 1 FR\nDAR ${String(v).replace('.', ',')} ML, VIA ORAL, DE 12/12 HORAS POR 7 A 10 DIAS.` };
        },
        detalhes: { indicacao: "Impetigo em alérgico à penicilina ou com suspeita/confirmação de MRSA; furúnculo com halo > 2 cm.", dose: "8 mg/kg/dia de trimetoprima (0,5 mL/kg/dose) VO de 12/12h por 7 a 10 dias.", atencao: "Máximo 20 mL (160 mg de TMP) por dose. A partir de 2 meses. Perguntar sobre alergia a sulfa." },
        ficha: { indicacoes: "Impetigo (esquemas B e C: alérgicos à penicilina e MRSA).", dose: "8 mg/kg/dia de TMP (0,5 mL/kg/dose) VO de 12/12 horas por 7-10 dias", doseMaxima: "160 mg de TMP/dose (20 mL).", apresentacoes: "Suspensão 200 mg + 40 mg/5 mL.", via: "Oral.", alertasPediatricos: "Uso a partir de 2 meses de idade.", fonteRevisao: "Whitebook (Afya) - Impetigo (Prescrição Ambulatorial: tratamento tópico e sistêmico), vídeo enviado pelo Dr. Jonas em 27/10/2026." }
    },
    "clinda_vo_impetigo": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "clindamicina dalacin oral capsula impetigo mrsa alergia penicilina furunculo pele",
        nome: "Clindamicina Oral (Impetigo / MRSA)", apres: "Cápsula 300 mg",
        info: "<strong>Posologia (Whitebook):</strong> 20–40 mg/kg/dia VO de 6/6h por 7–10 dias. Máx. 400 mg/dose.", badge: "Máx: 400 mg/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* Whitebook (Impetigo, esquemas B e C): clindamicina (300 mg) 20-40 mg/kg/dia VO de 6/6h por 7-10 dias, máx. 400 mg/dose. */
            let a = Math.min(p * 5, 400), b = Math.min(p * 10, 400);
            return { v: `${a.toFixed(0)}–${b.toFixed(0)} mg 6/6h`, r: `${recHead}1) CLINDAMICINA 300 MG ------------------------ 1 CX\nDAR ${a.toFixed(0)} A ${b.toFixed(0)} MG (20 A 40 MG/KG/DIA), VIA ORAL, DE 6/6 HORAS POR 7 A 10 DIAS.` };
        },
        detalhes: { indicacao: "Impetigo em alérgico à penicilina ou com suspeita/confirmação de MRSA.", dose: "20–40 mg/kg/dia VO de 6/6h por 7 a 10 dias.", atencao: "Máximo 400 mg por dose. Disponível em cápsula de 300 mg: ajustar a dose à apresentação. Risco de diarreia por C. difficile." },
        ficha: { indicacoes: "Impetigo (esquemas B e C).", dose: "20-40 mg/kg/dia VO de 6/6 horas por 7-10 dias", doseMaxima: "400 mg/dose.", apresentacoes: "Cápsula 300 mg.", via: "Oral.", fonteRevisao: "Whitebook (Afya) - Impetigo (Prescrição Ambulatorial: tratamento tópico e sistêmico), vídeo enviado pelo Dr. Jonas em 27/10/2026." }
    },
    "doxi_impetigo": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "doxiciclina vibramicina impetigo mrsa maior de 8 anos pele",
        nome: "Doxiciclina (Impetigo MRSA, ≥ 8 anos)", apres: "Comprimido 100 mg",
        info: "<strong>Posologia (Whitebook):</strong> ≥ 8 anos e ≤ 45 kg: 2–4 mg/kg/dose 12/12h (máx. 100 mg/dose); > 45 kg: 100 mg 12/12h, por 5–10 dias.", badge: "≥ 8 anos", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            /* Whitebook (Impetigo, esquema C - MRSA): doxiciclina 100 mg; >= 8 anos e <= 45 kg: 2-4 mg/kg/dose de 12/12h por 5-10 dias, máx. 100 mg/dose; >= 8 anos e > 45 kg: 100 mg/dose de 12/12h por 5-10 dias. Liberada por bula para maiores de 8 anos. */
            if (i !== "" && parseFloat(i) < 8) return { v: "≥ 8 anos", r: "ATENÇÃO: doxiciclina liberada por bula para crianças maiores de 8 anos." };
            if (p > 45) return { v: "100 mg 12/12h", r: `${recHead}1) DOXICICLINA 100 MG ---------------------- 20 COMPRIMIDOS\nTOMAR 1 COMPRIMIDO, VIA ORAL, DE 12/12 HORAS POR 5 A 10 DIAS.` };
            let a = Math.min(p * 2, 100), b = Math.min(p * 4, 100);
            return { v: `${a.toFixed(0)}–${b.toFixed(0)} mg 12/12h`, r: `${recHead}1) DOXICICLINA 100 MG\nDAR ${a.toFixed(0)} A ${b.toFixed(0)} MG (2 A 4 MG/KG/DOSE), VIA ORAL, DE 12/12 HORAS POR 5 A 10 DIAS (MÁXIMO 100 MG POR DOSE).` };
        },
        detalhes: { indicacao: "Impetigo com suspeita ou confirmação de MRSA, em maiores de 8 anos.", dose: "≥ 8 anos e ≤ 45 kg: 2–4 mg/kg/dose 12/12h; > 45 kg: 100 mg 12/12h; por 5 a 10 dias.", atencao: "Máximo 100 mg/dose. Só a partir de 8 anos. Tomar com água, sentado, longe de leite; fotossensibilidade." },
        ficha: { indicacoes: "Impetigo por S. aureus MRSA (esquema C).", dose: "Crianças ≥ 8 anos e ≤ 45 kg: 2-4 mg/kg/dose de 12/12 horas por 5-10 dias\nCrianças ≥ 8 anos e > 45 kg: 100 mg/dose de 12/12 horas por 5-10 dias", doseMaxima: "100 mg/dose.", apresentacoes: "Comprimido 100 mg.", via: "Oral.", alertasPediatricos: "Liberada por bula para crianças maiores de 8 anos.", fonteRevisao: "Whitebook (Afya) - Impetigo (Prescrição Ambulatorial: tratamento tópico e sistêmico), vídeo enviado pelo Dr. Jonas em 27/10/2026." }
    },
    "pele_mupi": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "mupirocina pomada impetigo bacteriana pele ambulatorial tópica", nome: "Mupirocina 2% Creme (Impetigo)", apres: "Creme Tópico",
        info: "<strong>Conduta:</strong> Aplicar de 8/8h por 7 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) MUPIROCINA 2% CREME ----------------------------------- 1 BISNAGA\nLAVAR COM ÁGUA E SABÃO E APLICAR DE 8/8 HORAS POR 7 DIAS.` }),
        detalhes: {
            indicacao: "Impetigo e infecções bacterianas superficiais da pele.",
            dose: "Aplicar de 8/8h por 7 dias.",
            atencao: "Lesões extensas podem precisar de antibiótico oral."
        }
    },
    "pele_nista": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "nistatina moniliase sapinho oral bochecha pele ambulatorial tópica", nome: "Nistatina Solução Oral (Sapinho)", apres: "100.000 UI / mL",
        info: "<strong>Conduta:</strong> Aplicar 4x ao dia por 14 dias.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = p <= 12 ? "1.0 mL" : "2.5 mL"; return { v: v, r: `USO LOCAL ORAL\n\n1) NISTATINA SOLUÇÃO ORAL 100.000 UI/ML ----------------- 1 FR\nAPLICAR ${v} COM GAZE NAS BOCHECHAS E LÍNGUA 4 VEZES AO DIA POR 14 DIAS.` }; },
        detalhes: {
            indicacao: "Candidíase oral (sapinho).",
            dose: "≤12 kg: 1 mL | >12 kg: 2,5 mL. 4 vezes ao dia por 14 dias.",
            atencao: "Manter por alguns dias depois que as placas sumirem. Higienizar bicos e chupetas."
        }
    },
    "pele_acicl": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "aciclovir varicela catapora herpes pomada pele ambulatorial tópica oral", nome: "Aciclovir Pomada Dermatológica", apres: "Pomada",
        info: "<strong>Conduta:</strong> Aplicar de 4/4h por 5 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) ACICLOVIR POMADA DERMATOLÓGICA ------------------ 1 BISNAGA\nAPLICAR SOBRE AS LESÕES DE 4 EM 4 HORAS DURANTE 5 DIAS.` }),
        detalhes: {
            indicacao: "Herpes labial e lesões herpéticas de pele.",
            dose: "Aplicar de 4/4h por 5 dias.",
            atencao: "Melhor resultado se iniciado logo nos primeiros sintomas."
        }
    },
    "pele_trok": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "trok trok pomada creme corticoide pele ambulatorial topica", nome: "Trok", apres: "Cetoconazol + Dipropionato de Betametasona Tópico",
        info: "<strong>Conduta:</strong> Fina camada 12/12h por 5 dias. (Max 2 semanas).", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) TROK -------------------------------------- 1 BISNAGA\nAPLICAR FINA CAMADA 12/12h POR 5 DIAS.` }),
        detalhes: {
            indicacao: "Dermatites com infecção fúngica associada.",
            dose: "Fina camada de 12/12h por 5 dias.",
            atencao: "Contém corticoide: máximo 2 semanas. Evitar no rosto e na área da fralda por tempo prolongado."
        }
    },
    "pele_trokg": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)", 
        kw: "trok-g trokg pomada creme corticoide pele ambulatorial topica", nome: "Trok-G", apres: "Creme",
        info: "<strong>Conduta:</strong> Fina camada 1-2x/dia (Max 2 semanas).", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) TROK-G -------------------------------------- 1 BISNAGA\nAPLICAR FINA CAMADA 1 A 2 VEZES AO DIA (MÁXIMO 2 SEMANAS).` }),
        detalhes: {
            indicacao: "Dermatites com infecção fúngica ou bacteriana associada.",
            dose: "Fina camada 1 a 2 vezes ao dia.",
            atencao: "Contém corticoide: máximo 2 semanas. Evitar no rosto e na área da fralda por tempo prolongado."
        }
    },
    "trok_n": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "trok n cetoconazol betametasona neomicina creme pomada dermatite micose", nome: "Trok-N", apres: "Cetoconazol + Betametasona + Neomicina",
        info: "<strong>Conduta:</strong> Aplicar na lesão 3 vezes ao dia por 10 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) TROK-N -------------------------------------- 1 TUBO\nAPLICAR NA LESÃO 3 VEZES AO DIA POR 10 DIAS.` }),
        detalhes: {
            indicacao: "Dermatites com infecção fúngica/bacteriana associada.",
            dose: "Aplicar 3x/dia por 10 dias.",
            atencao: "Contém corticoide."
        }
    },
    "quadriderm": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "quadriderm creme betametasona gentamicina tolnaftato clioquinol dermatite", nome: "Quadriderm Creme", apres: "Creme",
        info: "<strong>Conduta:</strong> Aplicar 2 vezes ao dia por 5 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) QUADRIDERM CREME ---------------------------- 1 TUBO\nAPLICAR 2 VEZES AO DIA POR 5 DIAS.` }),
        detalhes: {
            indicacao: "Dermatites com infecção associada.",
            dose: "Aplicar 2x/dia por 5 dias.",
            atencao: "Contém corticoide."
        }
    },
    "cetoconazol_cr": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "cetoconazol creme micose antifungico tinea candidiase pele", nome: "Cetoconazol Creme", apres: "Creme 2%",
        info: "<strong>Conduta:</strong> Aplicar 2 vezes ao dia por 14 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) CETOCONAZOL CREME --------------------------- 1 TUBO\nAPLICAR 2 VEZES AO DIA POR 14 DIAS.` }),
        detalhes: {
            indicacao: "Micoses cutâneas.",
            dose: "Aplicar 2x/dia por 14 dias.",
            atencao: "—"
        }
    },
    "nistatina_zinco": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "nistatina oxido de zinco pomada dermatite das fraldas assadura candidiase", nome: "Nistatina + Óxido de Zinco Pomada", apres: "Pomada",
        info: "<strong>Conduta:</strong> Aplicar 3 vezes ao dia por 7 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) NISTATINA + ÓXIDO DE ZINCO POMADA ----------- 1 TUBO\nAPLICAR 3 VEZES AO DIA POR 7 DIAS.` }),
        detalhes: {
            indicacao: "Dermatite das fraldas.",
            dose: "Aplicar 3x/dia por 7 dias.",
            atencao: "—"
        }
    },
    "penvir": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "penvir penciclovir pomada herpes labial", nome: "Penvir Pomada (Penciclovir)", apres: "Pomada",
        info: "<strong>Conduta:</strong> Aplicar nas lesões de 8/8h por 7 dias.", badgeSt: "static-blue", badge: "Uso Tópico", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Uso Tópico", r: `USO TÓPICO\n\n1) PENVIR POMADA ------------------------------- 1 TUBO\nAPLICAR NAS LESÕES DE 8/8 HORAS POR 7 DIAS.` }),
        detalhes: {
            indicacao: "Herpes labial.",
            dose: "Aplicar nas lesões de 8/8h por 7 dias.",
            atencao: "—"
        }
    },
    "fluconazol": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "fluconazol 150 mg antifungico candidiase dose unica", nome: "Fluconazol 150 mg (Diluído)", apres: "Cápsula 150 mg",
        info: "<strong>Conduta:</strong> 3 mg/kg VO dose única. Diluir a cápsula em 10 mL (15 mg/mL).", badge: "Máx: 150 mg", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let mg = Math.min(p * 3, 150), ml = mg / 15;
            return { v: `${ml.toFixed(1)} mL`, r: `${recHead}1) FLUCONAZOL 150 MG ---------------------------------- 1 CP\nABRIR/DILUIR 1 CÁPSULA EM 10 ML DE ÁGUA (CADA ML = 15 MG) E DAR ${ml.toFixed(1)} ML (${mg.toFixed(0)} MG), VIA ORAL, DOSE ÚNICA.` };
        },
        detalhes: {
            indicacao: "Candidíase (antifúngico oral).",
            dose: "3 mg/kg VO dose única; cápsula diluída em 10 mL (15 mg/mL).",
            atencao: "Máximo 150 mg (cápsula inteira)."
        }
    },
    // ===== Varicela: cards próprios da doença (Ministério da Saúde, Guia de Vigilância 2023) =====
    "aciclovir_varicela_vo": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "aciclovir oral suspensao varicela catapora antiviral zovirax 5 vezes ao dia",
        nome: "Aciclovir VO: Varicela", apres: "Suspensão 200 mg / 5 mL",
        info: "<strong>Posologia (MS):</strong> 20 mg/kg/dose VO 5 vezes ao dia por 5 dias, iniciado em até 24 h do exantema. Máx. 800 mg/dose.", badge: "Máx: 800 mg/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* MS: 20 mg/kg/dose 5x/dia por 5 dias. Suspensão 200 mg/5 mL (40 mg/mL). Teto 800 mg por dose (20 mL). Total do tratamento: 5 doses x 5 dias */
            let v = Math.min(parseFloat(round05(p * 20 / 40)), 20), t = String(v).replace('.', ','), tot = Math.ceil(v * 5 * 5);
            return { v: v + " mL", r: `${recHead}1) ACICLOVIR SUSPENSÃO 200 MG/5ML ---------- ${tot} ML\nDAR ${t} ML, VIA ORAL, 5 VEZES AO DIA (DE 4/4 HORAS, EXCETO DE MADRUGADA), POR 5 DIAS.` };
        },
        detalhes: {
            indicacao: "Varicela sem imunodepressão nos grupos de risco: > 12 anos, doença crônica de pele ou pulmão, uso de corticoide ou salicilato, caso secundário no domicílio. Iniciar em até 24 h do exantema.",
            dose: "20 mg/kg/dose VO 5 vezes ao dia por 5 dias (MS). Máximo 800 mg por dose.",
            atencao: "Criança saudável com varicela não complicada: não é de rotina. Imunodeprimido ou forma grave: aciclovir EV. Hidratar bem."
        }
    },
    "aciclovir_varicela_ev": {
        cat: "cat-pele", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "aciclovir endovenoso ev varicela grave imunodeprimido pneumonia encefalite recem nascido antiviral",
        nome: "Aciclovir EV: Varicela grave / imunodeprimido", apres: "FA 250 mg (pó)",
        info: "<strong>Posologia (MS):</strong> 10 mg/kg/dose EV de 8/8h, infundir em 1 hora, por 7 a 14 dias.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* MS: 10 mg/kg/dose EV 8/8h em 1 h, 7 a 14 dias. FA 250 mg + 10 mL de AD = 25 mg/mL; diluir em SF 0,9% até 5 mg/mL (concentração final até 7 mg/mL) */
            let mg = p * 10, ml = mg / 25, sf = Math.ceil(mg / 5), fa = Math.ceil(mg / 250);
            let t = ml.toFixed(1).replace('.', ',');
            return { v: `${mg.toFixed(0)} mg (${ml.toFixed(1)} mL)`, r: `VIA ENDOVENOSA (VARICELA GRAVE / IMUNODEPRIMIDO)\n\n Reconstituir ${fa} FA de Aciclovir 250 mg com 10 mL de água destilada cada (25 mg/mL).\n Aspirar ${t} mL (${mg.toFixed(0)} mg = 10 mg/kg) e diluir em SF 0,9% até completar ${sf} mL (5 mg/mL).\n Infundir em 1 hora, de 8/8 horas, por 7 a 14 dias.\n\n * Manter boa hidratação (risco de lesão renal). Ajustar se insuficiência renal.` };
        },
        detalhes: {
            indicacao: "Varicela em imunodeprimido, recém-nascido e formas graves ou complicadas (pneumonia, encefalite, varicela hemorrágica).",
            dose: "10 mg/kg/dose EV de 8/8h, infundido em 1 hora, por 7 a 14 dias (MS).",
            atencao: "Concentração final de até 7 mg/mL (aqui 5 mg/mL). Infusão rápida e desidratação aumentam o risco de lesão renal. Ajustar na insuficiência renal."
        }
    },
    // ===== Sarampo: card próprio (Nota Técnica Conjunta MS nº 02/2025) =====
    "vit_a_sarampo": {
        cat: "cat-pele", sub: "🏠 Uso Ambulatorial (Vias Orais / Tópicos)",
        kw: "vitamina a retinol sarampo caso suspeito megadose duas doses",
        nome: "Vitamina A: Sarampo (2 doses)", apres: "Cápsulas 100.000 UI e 200.000 UI",
        info: "<strong>Conduta (MS 2025):</strong> criança até 59 meses com suspeita de sarampo, 2 doses VO (dia da suspeita e dia seguinte): < 6 m 50.000 UI · 6 a 11 m 100.000 UI · 12 a 59 m 200.000 UI.", badge: "Por idade", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => {
            /* MS (NT Conjunta 02/2025): até 59 meses com suspeita de sarampo, independentemente da vacinação: < 6 m 50.000; 6-11 m 100.000; 12-59 m 200.000 UI; 2 doses em dias seguidos */
            if (i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(String(i).replace(',', '.'));
            if (id >= 5) return { v: "Avaliar", r: "VITAMINA A NO SARAMPO: INDICAÇÃO DO MINISTÉRIO DA SAÚDE ATÉ 59 MESES. ACIMA DISSO, AVALIAR CONFORME O ESTADO NUTRICIONAL." };
            let ui = id < 0.5 ? "50.000" : id < 1 ? "100.000" : "200.000";
            return { v: `${ui} UI x 2`, r: `${recHead}1) VITAMINA A ${ui} UI\nADMINISTRAR ${ui} UI, VIA ORAL, NO DIA DO DIAGNÓSTICO E REPETIR A MESMA DOSE NO DIA SEGUINTE (2 DOSES).` };
        },
        detalhes: {
            indicacao: "Criança até 59 meses com suspeita de sarampo, independentemente de doses prévias de vitamina A ou da vacinação.",
            dose: "< 6 meses: 50.000 UI; 6 a 11 meses: 100.000 UI; 12 a 59 meses: 200.000 UI. VO, 1 dose no dia da suspeita e 1 no dia seguinte (MS 2025).",
            atencao: "Reduz complicações e mortalidade. Sinais de deficiência de vitamina A (lesões oculares): esquema ampliado com o especialista."
        }
    }
});
