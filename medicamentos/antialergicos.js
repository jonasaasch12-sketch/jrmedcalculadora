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
        info: "<strong>Posologia:</strong> A partir de 2 anos. Peso / 4 mL por tomada de 8/8h.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = round05(p / 4); return { v: v + " mL", r: `${recHead}1) HIXIZINE XAROPE 2 MG/ML ---------------- 1 FR\nDAR ${v} ML, VIA ORAL, DE 8/8 HORAS POR 5 DIAS.` }; },
        detalhes: {
            indicacao: "Prurido, urticária e dermatites alérgicas.",
            dose: "0,5 mg/kg/dose (Peso ÷ 4 mL) VO de 8/8h por 5 dias.",
            atencao: "Liberado a partir de 2 anos. Causa sonolência."
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
    "prometa": {
        cat: "cat-antialergicos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "prometazina fenergan alergia prurido injetavel im hospitalar", nome: "Prometazina IM", apres: "Ampola 25 mg / mL",
        info: "<strong>Conduta:</strong> 0,02 mL/kg/dose via IM de 6/6h. Contraindicado em menores de 2 anos.", badge: "Dose Máx: 1 mL", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            let v = Math.min((p * 0.02), 1.0);
            if (i !== "" && parseFloat(i) < 2) return { v: "Contraind.", r: "ATENÇÃO: Prometazina é CONTRAINDICADA para menores de 2 anos." };
            return { v: v.toFixed(2) + " mL", r: `VIA INTRAMUSCULAR (USO HOSPITALAR)\n\n Fazer ${v.toFixed(2)} mL de Prometazina (25 mg/mL) por via INTRAMUSCULAR profunda, de 6/6 horas.` };
        },
        detalhes: {
            indicacao: "Reação alérgica e urticária em ambiente hospitalar.",
            dose: "0,02 mL/kg/dose (0,5 mg/kg) IM de 6/6h.",
            atencao: "Contraindicado em menores de 2 anos (risco de depressão respiratória). Máximo 1 mL por dose."
        }
    },
    "loratadina": {
        cat: "cat-antialergicos", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "loratadina claritin antialergico rinite urticaria xarope oral", nome: "Loratadina Xarope (Claritin)", apres: "1 mg / mL",
        info: "<strong>Posologia:</strong> 2-5a: 5 mL | ≥6a ou >30 kg: 10 mL. 1x ao dia.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            if (i === "") return { v: "—", r: "Insira a idade acima." };
            let id = parseFloat(i);
            if (id < 2) return { v: "Evitar", r: "ATENÇÃO: Evitar loratadina em menores de 2 anos." };
            let ml = (id >= 6 || p > 30) ? "10 ML" : "5 ML";
            return { v: ml.toLowerCase().replace("ml", "mL"), r: `${recHead}1) LORATADINA XAROPE 1 MG/ML ------------- 1 FR\nDAR ${ml}, VIA ORAL, 1 VEZ AO DIA.` };
        },
        detalhes: {
            indicacao: "Rinite alérgica e urticária.",
            dose: "2-5 anos: 5 mL | ≥6 anos ou >30 kg: 10 mL. VO 1x ao dia.",
            atencao: "Evitar em menores de 2 anos. Precisa da idade para calcular."
        }
    }
});
