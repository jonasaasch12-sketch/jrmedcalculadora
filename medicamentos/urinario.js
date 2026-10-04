// =====================================================
// URINÁRIO — cards com cat: "cat-urinario"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    "urina_clav": {
        cat: "cat-urinario", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "amoxicilina clavulanato itu urinaria pielonefrite antibiotico oral ambulatorial", nome: "Amoxi-Clavulanato Suspensão (ITU)", apres: "250 mg + 62,5 mg / 5 mL",
        info: "<strong>Posologia:</strong> Peso / 3 mL de 8/8h por 10 dias.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = round05(p / 3); return { v: v + " mL", r: `${recHead}1) AMOXICILINA + CLAVULANATO 250+62,5 MG/5ML -- 1 FR\nDAR ${v} ML, VIA ORAL, DE 8/8 HORAS POR 10 DIAS.` }; },
        detalhes: {
            indicacao: "Infecção do trato urinário (ITU).",
            dose: "Peso ÷ 3 mL VO de 8/8h por 10 dias.",
            atencao: "Perguntar sobre alergia a penicilina. Ajustar pela urocultura."
        }
    },
    "urina_cefa": {
        cat: "cat-urinario", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "cefalexina cistite itu urinaria antibiotico oral ambulatorial", nome: "Cefalexina Suspensão (Cistite)", apres: "250 mg / 5 mL",
        info: "<strong>Posologia:</strong> Peso / 4 mL de 6/6h por 7 dias.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = round05(p / 4); return { v: v + " mL", r: `${recHead}1) CEFALEXINA 250 MG / 5 ML ------------------ 1 FR\nDAR ${v} ML, VIA ORAL, DE 6/6 HORAS POR 7 DIAS.` }; },
        detalhes: {
            indicacao: "Cistite (ITU baixa).",
            dose: "Peso ÷ 4 mL VO de 6/6h por 7 dias.",
            atencao: "Ajustar pela urocultura."
        }
    },
    "urina_ceft": {
        cat: "cat-urinario", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "ceftriaxona itu hospitalar pielonefrite internação antibiotico hospitalar injetavel", nome: "Ceftriaxona EV (Pielonefrite)", apres: "FA 1 G",
        info: "<strong>Conduta:</strong> 50 mg/kg/dose de 12/12h.", badge: "Teto: 2 g/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => calcCeftriaxona(p, "VIA ENDOVENOSA (PIELONEFRITE)", "EV", 12, () => 50),
        detalhes: {
            indicacao: "Pielonefrite (ITU alta) e ITU febril em lactentes.",
            dose: "100 mg/kg/dia EV: 50 mg/kg de 12/12h ou 100 mg/kg de 24/24h.",
            atencao: "Máximo 2 g/dia: até 2 g de 24/24h ou até 1 g de 12/12h. Acima de 1 g, usar 2 frascos. Não infundir junto com soluções com cálcio. Ajustar pela urocultura."
        }
    },
    "urina_furo": {
        cat: "cat-urinario", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "furosemida nefritica gnpe edema hipertensao diuretico hospitalar injetavel", nome: "Furosemida EV (GNPE / Edema)", apres: "Ampola 10 mg / mL",
        info: "<strong>Conduta:</strong> Peso * 0,1 mL EV bólus. Máx. 20 mg/dia.", badge: "Teto: 10 mg/dose (20 mg/dia)", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = Math.min(p * 0.1, 1).toFixed(1); /* 1 mg/kg/dose, teto de 10 mg/dose (1 mL) = 20 mg/dia em 12/12h */ return { v: v + " mL", r: `VIA ENDOVENOSA (GNPE / EDEMA)\n\n FAZER ${v} ML DE FUROSEMIDA (10 MG/ML) PURA POR VIA ENDOVENOSA, BÓLUS, DE 12/12 HORAS. MÁXIMO 20 MG POR DIA.` }; },
        detalhes: {
            indicacao: "Edema e hipertensão da síndrome nefrítica (GNPE).",
            dose: "1 mg/kg (Peso x 0,1 mL) EV em bolus, de 12/12h.",
            atencao: "Máximo 10 mg (1 mL) por dose, 20 mg por dia. Monitorar diurese, PA e potássio."
        }
    }
});
