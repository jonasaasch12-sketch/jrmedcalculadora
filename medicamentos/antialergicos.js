// =====================================================
// ANTIALÉRGICOS — cards com cat: "cat-antialergicos"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    "hixizine": {
        cat: "cat-antialergicos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "hixizine hidroxizina coceira alergia antialergico oral ambulatorial", nome: "Hixizine Xarope (Hidroxizina)", apres: "2 mg / mL",
        info: "<strong>Posologia (bula):</strong> acima de 6 meses: 0,7 mg/kg (0,35 mL/kg) de 8/8h. Acima de 40 kg: máx. 100 mg/dia.", badge: "Máx: 16,5 mL/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            /* Bula: crianças 0,7 mg/kg 3x ao dia (2 mg/mL = 0,35 mL/kg). > 40 kg: máx. 100 mg/dia (33 mg = 16,5 mL por dose). A partir de 6 meses. */
            if (i !== "" && parseFloat(i) < 0.5) return { v: "Contraind.", r: "ATENÇÃO: Hixizine só acima de 6 meses (bula)." };
            let v = Math.min(parseFloat(round05(p * 0.35)), 16.5), t = String(v).replace('.', ',');
            return { v: v + " mL", r: `${recHead}1) HIXIZINE XAROPE 2 MG/ML ---------------- 1 FR\nDAR ${t} ML, VIA ORAL, DE 8/8 HORAS POR 5 DIAS.` };
        },
        detalhes: {
            indicacao: "Prurido, urticária e dermatites alérgicas.",
            dose: "0,7 mg/kg/dose (0,35 mL/kg) VO de 8/8h por 5 dias (bula).",
            atencao: "Acima de 6 meses. Bula: até 40 kg, não passar de 2 mg/kg/dia; acima de 40 kg, máx. 100 mg/dia. Causa sonolência."
        }
    },
    "dexclor": {
        cat: "cat-antialergicos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "dexclorfeniramina polaramine histamin coceira alergia antialergico oral ambulatorial", nome: "Dexclorfeniramina Sol. (Polaramine / Histamin)", apres: "2 mg / 5 mL",
        info: "<strong>Posologia:</strong> 2-6a: 1,25 mL | 6-12a: 2,5 mL | >12a: 5 mL. De 8/8h.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            if (i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(i);
            if (id < 2) return { v: "Contraind.", r: "ATENÇÃO: Dexclorfeniramina solução não indicada para menores de 2 anos." };
            // Dose fixa por idade, 3x ao dia. Máximo: 3 mg/dia (2-6a), 6 mg/dia (6-12a), 12 mg/dia (>12a).
            let dose = "5 ML", max = "30 ML (12 MG)";
            if (id < 6) { dose = "1,25 ML"; max = "7,5 ML (3 MG)"; }
            else if (id <= 12) { dose = "2,5 ML"; max = "15 ML (6 MG)"; }
            return { v: dose.toLowerCase().replace("ml", "mL"), r: `${recHead}1) DEXCLORFENIRAMINA 2 MG/5 ML (POLARAMINE / HISTAMIN) -- 1 FR\nDAR ${dose} VIA ORAL, DE 8/8 HORAS, SE COCEIRA. MÁXIMO ${max} POR DIA.` };
        },
        detalhes: {
            indicacao: "Prurido, urticária e rinite alérgica.",
            dose: "2-6 anos: 1,25 mL | 6-12 anos: 2,5 mL | >12 anos: 5 mL. VO 3x ao dia (8/8h).",
            atencao: "Máximo por dia: 7,5 mL (3 mg) de 2-6 anos | 15 mL (6 mg) de 6-12 anos | 30 mL (12 mg) acima de 12 anos. Não usar em menores de 2 anos. Causa sonolência."
        }
    },
    "deslo": {
        cat: "cat-antialergicos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "desloratadina alergia rinite antialergico oral ambulatorial", nome: "Desloratadina Xarope", apres: "0,5 mg / mL",
        info: "<strong>Posologia:</strong> 6m a 2a: 2mL | 2a a 5a: 2,5mL | 5a a 10a: 5mL | >10a: 10mL.", badge: "", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => {
            if (i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(i);
            let t = "10 ML"; if(id<2) t="2 ML"; else if(id<5) t="2,5 ML"; else if(id<10) t="5 ML";
            return { v: t.replace("ML", "mL"), r: `${recHead}1) DESLORATADINA XAROPE 0,5 MG/ML ---------- 1 FR\nDAR ${t} VIA ORAL UMA VEZ AO DIA.` };
        },
        detalhes: {
            indicacao: "Rinite alérgica e urticária.",
            dose: "6m-2a: 2 mL | 2-5a: 2,5 mL | 5-10a: 5 mL | >10a: 10 mL. 1x ao dia.",
            atencao: "Liberado a partir de 6 meses. Pouca sonolência. Precisa da idade para calcular."
        }
    },
    "adrenalina_im": {
        cat: "cat-antialergicos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "adrenalina epinefrina intramuscular anafilaxia choque anafilatico alergia grave reacao alergica emergencia", nome: "Adrenalina IM (Anafilaxia)", apres: "Ampola 1 mg / mL (1:1000)",
        info: "<strong>Conduta:</strong> 0,01 mg/kg (0,01 mL/kg) IM na face anterolateral da coxa. Repetir a cada 5-15 min.", badge: "Máx: 0,3 mg (criança) / 0,5 mg", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            // SBP (Anafilaxia: atualização 2021): 0,01 mg/kg da solução 1:1000 (1 mg/mL) IM na face anterolateral da coxa,
            // máximo 0,3 mg em crianças e 0,5 mg em adultos; repetir a cada 5-15 min se necessário.
            let teto = (i !== "" && parseFloat(i) >= 12) ? 0.5 : 0.3;
            let mg = Math.min(p * 0.01, teto);
            return { v: mg.toFixed(2) + " mL", r: `🚨 VIA INTRAMUSCULAR (ANAFILAXIA)\n\nAspirar ${mg.toFixed(2)} mL de Adrenalina 1 mg/mL (1:1000), sem diluir = ${mg.toFixed(2)} mg.\nAplicar IM na face anterolateral da coxa, AGORA.\nRepetir a cada 5 a 15 minutos, se necessário.\n\n(Dose máxima por aplicação: ${teto.toFixed(1)} mg.)` };
        },
        detalhes: {
            indicacao: "Anafilaxia.",
            dose: "0,01 mg/kg (0,01 mL/kg da solução 1 mg/mL) IM na face anterolateral da coxa. Repetir a cada 5-15 minutos, se necessário.",
            atencao: "Máximo 0,3 mg em crianças e 0,5 mg em adolescentes/adultos por aplicação. Não diluir. É a medicação de 1ª linha: não atrasar por anti-histamínico ou corticoide."
        },
        ficha: {
            indicacoes: "Anafilaxia.",
            dose: "Anafilaxia: 0,01 mg/kg (0,01 mL/kg da solução 1 mg/mL) IM na face anterolateral da coxa, repetir a cada 5-15 minutos, se necessário",
            doseMaxima: "0,3 mg em crianças; 0,5 mg em adultos.",
            apresentacoes: "Ampola 1 mg/mL (1:1000). Autoinjetores: 0,15 mg (crianças de 7,5 kg a 25-30 kg) e 0,3 mg (a partir de 25-30 kg, adolescentes e adultos).",
            via: "Intramuscular (face anterolateral da coxa).",
            intervalo: "A cada 5-15 minutos, se necessário.",
            fonteRevisao: "SBP - Guia Prático de Atualização Anafilaxia: atualização 2021: https://www.sbp.com.br/fileadmin/user_upload/22970c-GPA-Anafilaxia_-_Atualizacao_2021.pdf; ASBAI - Autoinjetores de adrenalina no manejo da anafilaxia (2024) - consultados em out/2026."
        }
    },
    "anaf_expansao": {
        cat: "cat-antialergicos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "anafilaxia choque anafilatico expansao volemica soro fisiologico ringer bolus hipotensao", nome: "Expansão na Anafilaxia (SF 0,9% / Ringer)", apres: "SF 0,9% ou Ringer lactato",
        info: "<strong>Conduta:</strong> 5 a 10 mL/kg EV nos primeiros 5 minutos e até 30 mL/kg na primeira hora.", badge: "Máx: 30 mL/kg na 1ª hora", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            /* SBP (Anafilaxia: atualização 2021): crianças 5-10 mL/kg IV nos primeiros 5 min e 30 mL/kg na 1ª hora; adultos/adolescentes 1-2 L rápido. */
            let b5 = Math.min(p * 5, 1000), b10 = Math.min(p * 10, 1000), h1 = Math.min(p * 30, 2000);
            return { v: `${b5.toFixed(0)}–${b10.toFixed(0)} mL em 5 min`, r: `VIA ENDOVENOSA (ANAFILAXIA - EXPANSÃO)\n\nSF 0,9% OU RINGER LACTATO ${b5.toFixed(0)} a ${b10.toFixed(0)} mL (5 a 10 mL/kg) EV EM 5 MINUTOS.\nRepetir conforme pulso e pressão arterial, até ${h1.toFixed(0)} mL (30 mL/kg) na primeira hora.\n\n* Acesso venoso do maior calibre possível. Monitorar sobrecarga de volume.\n* Manter decúbito dorsal com membros inferiores elevados.` };
        },
        detalhes: {
            indicacao: "Anafilaxia com hipotensão ou má perfusão (sempre depois da adrenalina IM).",
            dose: "5 a 10 mL/kg EV nos primeiros 5 minutos e até 30 mL/kg na primeira hora. Adolescentes/adultos: 1 a 2 L rápido.",
            atencao: "A velocidade é regulada pelo pulso e pela pressão arterial. Monitorar sobrecarga de volume."
        },
        ficha: {
            indicacoes: "Expansão volêmica na anafilaxia com hipotensão ou sinais de má perfusão.",
            dose: "Crianças: 5-10 mL/kg EV nos primeiros 5 minutos e 30 mL/kg na primeira hora\nAdultos/adolescentes: 1-2 litros EV rapidamente",
            doseMaxima: "Teto do app: 1.000 mL por bolus e 2.000 mL na primeira hora.",
            apresentacoes: "Soro fisiológico 0,9% ou Ringer lactato.",
            via: "Endovenosa, pelo acesso de maior calibre possível.",
            intervalo: "Bolus repetidos conforme pulso e pressão arterial.",
            alertasPediatricos: "Levantar-se ou sentar-se subitamente está associado a desfechos fatais (síndrome do ventrículo vazio): manter decúbito dorsal com membros inferiores elevados. Monitorar sobrecarga de volume.",
            fonteRevisao: "SBP - Guia Prático de Atualização Anafilaxia: atualização 2021 (Quadro 3): https://www.sbp.com.br/fileadmin/user_upload/22970c-GPA-Anafilaxia_-_Atualizacao_2021.pdf - consultado em out/2026."
        }
    },
    "prometa": {
        cat: "cat-antialergicos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "prometazina fenergan alergia prurido injetavel im hospitalar", nome: "Prometazina IM", apres: "Ampola 25 mg / mL",
        info: "<strong>Conduta (SBP):</strong> 1 mg/kg/dose (0,04 mL/kg), máx. 50 mg (2 mL), de 6/6h. Contraindicado em menores de 2 anos.", badge: "Dose Máx: 2 mL (50 mg)", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            /* SBP (Anafilaxia 2021): prometazina crianças 1 mg/kg até máx. 50 mg. Ampola 25 mg/mL: 0,04 mL/kg, máx. 2 mL. */
            let v = Math.min((p * 0.04), 2.0);
            if (i !== "" && parseFloat(i) < 2) return { v: "Contraind.", r: "ATENÇÃO: Prometazina é CONTRAINDICADA para menores de 2 anos." };
            return { v: v.toFixed(2) + " mL", r: `VIA INTRAMUSCULAR (USO HOSPITALAR)\n\n Fazer ${v.toFixed(2)} mL de Prometazina (25 mg/mL) por via INTRAMUSCULAR profunda, de 6/6 horas.` };
        },
        detalhes: {
            indicacao: "Reação alérgica e urticária em ambiente hospitalar.",
            dose: "1 mg/kg/dose (0,04 mL/kg) IM de 6/6h. Máx. 50 mg (2 mL) por dose (SBP).",
            atencao: "Contraindicado em menores de 2 anos (risco de depressão respiratória). Máximo 2 mL (50 mg) por dose."
        }
    },
    "loratadina": {
        cat: "cat-antialergicos", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "loratadina claritin antialergico rinite urticaria xarope oral", nome: "Loratadina Xarope (Claritin)", apres: "1 mg / mL",
        info: "<strong>Posologia (bula):</strong> 2 a 12 anos: até 30 kg 5 mL; acima de 30 kg 10 mL. Acima de 12 anos: 10 mL. 1x ao dia.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            /* Bula: 2-12 anos com peso <= 30 kg: 5 mL (5 mg); > 30 kg: 10 mL; > 12 anos: 10 mL, 1x ao dia. */
            if (i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(i);
            if (id < 2) return { v: "Evitar", r: "ATENÇÃO: Evitar loratadina em menores de 2 anos." };
            let ml = (id > 12 || p > 30) ? "10 ML" : "5 ML";
            return { v: ml.toLowerCase().replace("ml", "mL"), r: `${recHead}1) LORATADINA XAROPE 1 MG/ML ------------- 1 FR\nDAR ${ml}, VIA ORAL, 1 VEZ AO DIA.` };
        },
        detalhes: {
            indicacao: "Rinite alérgica e urticária.",
            dose: "2 a 12 anos: até 30 kg 5 mL (5 mg); acima de 30 kg 10 mL (10 mg). Acima de 12 anos: 10 mL. VO 1x ao dia (bula).",
            atencao: "Evitar em menores de 2 anos. Precisa da idade para calcular."
        }
    },
    "dexa_elixir": {
        cat: "cat-antialergicos", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "dexametasona elixir decadron corticoide oral alergia inflamacao", nome: "Dexametasona Elixir (Decadron)", apres: "0,1 mg / mL",
        info: "<strong>Posologia:</strong> peso/3 mL por dose, de 8/8h, por 3 a 5 dias.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let ml = (p / 3).toFixed(1);
            return { v: `${ml} mL`, r: `${recHead}1) DEXAMETASONA ELIXIR 0,1 MG/ML (DECADRON) --------- 1 FR\nTOMAR ${ml} ML DE 8/8 HORAS POR 3 A 5 DIAS.` };
        },
        detalhes: {
            indicacao: "Corticoide oral (alergia / inflamação).",
            dose: "Peso/3 mL por dose (≈ 0,033 mg/kg/dose) de 8/8h, por 3 a 5 dias.",
            atencao: "—"
        }
    }
});
