// =====================================================
// EXAME FÍSICO — cards com cat: "cat-exame-fisico"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    "exame_masculino": {
        cat: "cat-exame-fisico", sub: "Modelo pronto para prontuário",
        kw: "exame fisico masculino eg bem ativo reidratado",
        nome: "Exame Físico — Masculino", apres: "Padrão Clínico",
        info: "<strong>Descrição:</strong> Exame físico geral e segmentar normal para paciente masculino.",
        badgeSt: "static-blue", badge: "Padrão", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Padrão", r: "EG BOM, ATIVO, REATIVO, HIDRATADO, NORMOCORADO, EUPNEICO, AFEBRIL.\nACV: RCR EM 2T, BNF, S/S. FC: \nAR: MV+ EM AHT, SEM RA. FR:   SpO2:  AA\nABD: SEM ALTERAÇÕES\nS.ORO: NDN OTO: NDN PELE: NDN EXT: NDN\nNEURO: NUCA LIVRE, SEM IRRITAÇÃO MENÍNGEA, PUPILAS ISOCÓRICAS E FOTORREAGENTES" })
    },
    "exame_feminino": {
        cat: "cat-exame-fisico", sub: "Modelo pronto para prontuário",
        kw: "exame fisico feminino eg bem ativa reidratada",
        nome: "Exame Físico — Feminino", apres: "Padrão Clínico",
        info: "<strong>Descrição:</strong> Exame físico geral e segmentar normal para paciente feminino.",
        badgeSt: "static-blue", badge: "Padrão", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Padrão", r: "EG BOM, ATIVA, REATIVA, HIDRATADA, NORMOCORADA, EUPNEICA, AFEBRIL.\nACV: RCR EM 2T, BNF, S/S. FC: \nAR: MV+ EM AHT, SEM RA. FR:   SpO2:  AA\nABD: SEM ALTERAÇÕES\nS.ORO: NDN OTO: NDN PELE: NDN EXT: NDN\nNEURO: NUCA LIVRE, SEM IRRITAÇÃO MENÍNGEA, PUPILAS ISOCÓRICAS E FOTORREAGENTES" })
    },
    "orientacoes_gerais": {
        cat: "cat-exame-fisico", sub: "Orientações e Sinais de Alarme",
        kw: "orientacoes alta sinais alarme respiratorio tosse febre cansaço",
        nome: "Sinais de Alarme — Respiratório / Geral", apres: "Termo de Alta",
        info: "<strong>Descrição:</strong> Orientações de alta para quadros respiratórios e gerais.",
        badgeSt: "static-blue", badge: "Orientações", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Orientações", r: "ORIENTAÇÕES:\n - TOSSE E CORIZA PODEM PERSISTIR POR ALGUMAS SEMANAS\n\nRETORNAR SE:\n- RESPIRAÇÃO OFEGANTE, RUIDOSA OU DIFÍCIL\n- CANSAÇO\n- QUEDA NO ESTADO GERAL MESMO QUE SEM FEBRE\n- FEBRE POR MAIS 48H APÓS O DIA DE HOJE (TEMPERATURA >= 37.5°C)\n- PIORA OU NÃO MELHORA" })
    },
    "orientacoes_geca": {
        cat: "cat-exame-fisico", sub: "Orientações e Sinais de Alarme",
        kw: "orientacoes alta sinais alarme geca diarreia vomitos gastroenterite",
        nome: "Sinais de Alarme — GECA", apres: "Termo de Alta",
        info: "<strong>Descrição:</strong> Orientações de alta para Gastroenterite (GECA).",
        badgeSt: "static-blue", badge: "Orientações", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Orientações", r: "ORIENTAÇÕES GECA - RETORNAR AO HOSPITAL SE HOUVER:\n- Agravamento da diarreia ou vômitos persistentes;\n- Sede intensa;\n- Recusa alimentar acentuada;\n- Presença de sangue nas fezes;\n- Redução da diurese (mais de 6 horas sem urinar);\n- Sonolência excessiva ou prostração;\n- Dor abdominal intensa." })
    }
});
