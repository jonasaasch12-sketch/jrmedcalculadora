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
    },
    "orientacoes_bva": {
        cat: "cat-exame-fisico", sub: "Orientações e Sinais de Alarme",
        kw: "orientacoes alta sinais alarme alerta bronquiolite bva vsr lactente chiado",
        nome: "Sinais de Alarme — Bronquiolite", apres: "Termo de Alta",
        info: "<strong>Descrição:</strong> Orientações para casa e sinais de alerta da bronquiolite viral aguda (Ministério da Saúde, 2026).",
        badgeSt: "static-blue", badge: "Orientações", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Orientações", r: "ORIENTAÇÕES BRONQUIOLITE:\n- Lavar o nariz com soro fisiológico 0,9%, principalmente antes das mamadas;\n- Oferecer leite e líquidos em pequenas quantidades e com mais frequência;\n- Lavar as mãos antes de pegar no bebê; evitar contato com pessoas gripadas e locais fechados com muitas pessoas;\n- Não fumar perto da criança;\n- Não usar xaropes para tosse nem descongestionantes;\n- A piora pode acontecer entre o 3º e o 5º dia da doença; a tosse pode durar até 3 a 4 semanas.\n\nRETORNAR IMEDIATAMENTE AO SERVIÇO DE SAÚDE SE:\n- Dificuldade para respirar, respiração rápida, gemido, \"costelas aparecendo\" ou asa do nariz batendo;\n- Pausas na respiração;\n- Lábios, pele ou dedos arroxeados;\n- Recusa para mamar ou dificuldade para sugar o peito;\n- Vômitos frequentes após as mamadas;\n- Pouco xixi, boca seca ou olhos fundos;\n- Sonolência excessiva, irritabilidade ou choro fraco;\n- Convulsão ou movimentos anormais." }),
        detalhes: {
            indicacao: "Orientações de alta e sinais de alerta para a família na bronquiolite viral aguda.",
            dose: "Não se aplica.",
            atencao: "Conforme o Guia de Manejo Clínico da BVA do Ministério da Saúde (2026)."
        }
    },
    "orientacoes_dengue": {
        cat: "cat-exame-fisico", sub: "Orientações e Sinais de Alarme",
        kw: "orientacoes alta sinais alarme dengue arbovirose retorno reavaliacao",
        nome: "Sinais de Alarme — Dengue", apres: "Termo de Alta",
        info: "<strong>Descrição:</strong> Orientações de alta para dengue.",
        badgeSt: "static-blue", badge: "Orientações", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Orientações", r: "ORIENTAÇÕES DENGUE - RETORNAR PARA REAVALIAÇÃO EM 48 HORAS OU A QUALQUER MOMENTO SE:\n- Dor abdominal intensa;\n- Vômitos persistentes;\n- Sangramento no nariz, na gengiva, na urina ou nas fezes;\n- Sonolência ou irritabilidade;\n- Tonturas ou desmaio." })
    },
    "orientacoes_tce": {
        cat: "cat-exame-fisico", sub: "Orientações e Sinais de Alarme",
        kw: "orientacoes alta sinais alarme tce trauma craniano traumatismo cranioencefalico batida na cabeca queda concussao retorno",
        nome: "Sinais de Alarme — TCE (Batida na Cabeça)", apres: "Termo de Alta",
        info: "<strong>Descrição:</strong> Orientações de alta após trauma de crânio (TCE leve).",
        badgeSt: "static-blue", badge: "Orientações", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "Orientações", r: "ORIENTAÇÕES TCE (BATIDA NA CABEÇA) - AS PRIMEIRAS 24 A 48 HORAS SÃO AS MAIS IMPORTANTES.\n- A criança pode dormir normalmente, mas um adulto deve ficar por perto e conseguir acordá-la, e ela deve responder normalmente;\n- Manter repouso relativo por 24 a 48 horas, com menos telas e sem brincadeiras de impacto; voltar à escola e ao esporte aos poucos, conforme orientação médica;\n- Para dor de cabeça leve, usar somente o analgésico receitado.\n\nRETORNAR IMEDIATAMENTE AO PRONTO-SOCORRO SE:\n- Sonolência excessiva, dificuldade para acordar, confusão ou comportamento diferente do habitual;\n- Vômitos repetidos (3 ou mais vezes);\n- Dor de cabeça forte ou que piora;\n- Convulsão, desmaio ou perda de consciência;\n- Fraqueza, formigamento, dificuldade para andar ou falar, visão dupla ou pupilas de tamanhos diferentes;\n- Saída de líquido claro ou sangue pelo nariz ou pelo ouvido;\n- Bebê: choro inconsolável, recusa alimentar ou moleira estufada." }),
        detalhes: {
            indicacao: "Alta após TCE leve (PECARN de baixo risco, observação sem piora ou TC normal).",
            dose: "Entregar e explicar aos responsáveis.",
            atencao: "Primeiras 24 a 48 h são as mais críticas. Suspeita de maus-tratos: não dar alta sem avaliação."
        }
    }
});
