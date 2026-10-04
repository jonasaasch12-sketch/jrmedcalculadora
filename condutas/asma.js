// =====================================================
// CONDUTA: ASMA NA CRIANÇA (0 A 11 ANOS)
// Base: GINA 2026 (Global Initiative for Asthma), capítulos pediátricos:
// tratamento de 6–11 anos (seção 4), diagnóstico, manejo e crises em
// ≤ 5 anos (seções 10–12). Tradução e adaptação para o português.
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
registrarConduta({
    id: "asma",
    nome: "Asma (0 a 11 anos)",
    categoria: "Respiratório",
    cor: "#0284c7",
    kw: "asma broncoespasmo crise asmatica sibilancia chiado bombinha gina pram exacerbacao",
    resumo: "Diagnóstico, controle, tratamento de manutenção por etapas e manejo da crise, com o escore PRAM.",
    legenda: "Conduta conforme o <strong>GINA 2026</strong> (capítulos pediátricos), traduzido e adaptado. O manejo da crise neste documento é o da faixa de <strong>≤ 5 anos</strong>. O escore PRAM é validado de 2 a 17 anos.",

    secoes: [
        {
            titulo: "Diagnóstico (≤ 5 anos)",
            icone: "🔎",
            itens: [
                "Diagnóstico <strong>essencialmente clínico</strong>. Os <strong>3 critérios</strong> devem estar presentes:",
                "<strong>1. Episódios agudos de sibilância recorrentes:</strong> ≥ 2 episódios nos últimos 12 meses, <strong>ou</strong> ≥ 1 episódio + sintomas entre as crises (tosse seca, acessos de tosse, piora no sono ou após rir, chorar ou atividade). Cada episódio dura > 24 h. A sibilância deve ser confirmada ao menos uma vez por profissional de saúde (preferível) ou por relato convincente dos pais (vídeo, áudio ou imitação do som).",
                "<strong>2. Nenhuma causa alternativa provável</strong> para os sintomas (exceto infecção viral concomitante). Exames de imagem ou laboratoriais geralmente não são necessários.",
                "<strong>3. Resposta clínica oportuna ao tratamento:</strong> melhora em <strong>20–60 min</strong> após SABA; ou em 3–4 h após SABA + corticoide oral nas crises mais graves; ou melhora durante teste de <strong>2–3 meses com CI diário</strong> (ex.: fluticasona 100–250 mcg/dia ou equivalente, pMDI + espaçador) + SABA se necessário.",
                "<strong>Asma suspeita:</strong> se só 1 ou 2 critérios forem cumpridos. Considerar tratamento e reavaliar periodicamente.",
                "<strong>Reforçam (não obrigatórios):</strong> doença alérgica na criança (rinite, dermatite atópica, sensibilização) ou asma/alergia em parente de 1º grau.",
                "<strong>Asma menos provável:</strong> < 12 meses no 1º episódio de sibilância (em geral bronquiolite); tosse produtiva como único sintoma; ausência documentada de resposta a SABA e/ou CI; sinais e sintomas atípicos.",
                "<strong>Exames auxiliares:</strong> radiografia de tórax raramente indicada (se dúvida: malformação, anel vascular, tuberculose, corpo estranho). Teste de sensibilização alérgica (prick test ou IgE específica). Espirometria em geral a partir de 5–6 anos. Oscilometria a partir de 3 anos. FeNO ainda é principalmente pesquisa nessa idade."
            ]
        },
        {
            titulo: "Diagnóstico diferencial (≤ 5 anos)",
            icone: "🧭",
            recolhida: true,
            tabela: {
                colunas: ["Sintomas ou sinais", "Considerar"],
                linhas: [
                    ["Tosse e coriza/congestão nasal < 10 dias, sem sibilância ou dificuldade respiratória", "IVAS viral"],
                    ["Tosse ao mamar/comer, infecções respiratórias recorrentes", "DRGE ± disfagia faríngea"],
                    ["Início súbito, sibilância unilateral", "Corpo estranho (e outras, como tuberculose)"],
                    ["Acessos prolongados de tosse, com estridor e vômitos", "Coqueluche"],
                    ["Tosse úmida persistente", "Bronquite bacteriana protraída; tuberculose"],
                    ["Respiração ruidosa ao chorar ou comer; tosse rouca", "Traqueomalácia; laringomalácia"],
                    ["Sopro cardíaco, baixo ganho de peso", "Cardiopatia congênita"],
                    ["Prematuro, sintomas desde o nascimento", "Displasia broncopulmonar"],
                    ["Tosse e muco excessivos, sintomas gastrointestinais, baixo ganho de peso", "Fibrose cística"],
                    ["Tosse, infecções recorrentes, desconforto respiratório neonatal, otites crônicas, secreção nasal persistente desde o nascimento", "Discinesia ciliar primária"],
                    ["Respiração ruidosa, dificuldade alimentar", "Anel vascular"],
                    ["Febre e infecções recorrentes (inclusive não respiratórias)", "Imunodeficiência primária"]
                ]
            },
            grupos: [
                {
                    nome: "Encaminhar ao especialista (sugere diagnóstico alternativo)",
                    itens: [
                        "Baixo ganho de peso · início neonatal ou muito precoce · vômitos associados aos sintomas respiratórios.",
                        "Sibilância contínua, estridor recorrente ou tosse ladrante (malácia de via aérea).",
                        "Falha de resposta à medicação para asma (CI, corticoide oral ou SABA).",
                        "Sem associação com gatilhos típicos (IVAS) · sinais pulmonares focais, cardiovasculares ou baqueteamento.",
                        "Hipoxemia (< 95%) acordado, fora de crise.",
                        "Lactente < 12 meses com ≥ 2 episódios de sibilância."
                    ]
                }
            ]
        },
        {
            titulo: "Avaliação do controle (≤ 5 anos)",
            icone: "🎯",
            escore: {
                id: "controle_asma",
                instrucao: "Nas últimas 4 semanas, a criança teve… (toque Sim ou Não em cada item)",
                itens: [
                    { nome: "Sintomas diurnos de asma mais de 2×/semana?", opcoes: [[0, "Não"], [1, "Sim"]] },
                    { nome: "Algum despertar ou tosse noturna por asma?", opcoes: [[0, "Não"], [1, "Sim"]] },
                    { nome: "Uso de SABA de alívio mais de 2×/semana? (exceto antes de exercício)", opcoes: [[0, "Não"], [1, "Sim"]] },
                    { nome: "Alguma limitação de atividade por asma? (corre/brinca menos, cansa fácil)", opcoes: [[0, "Não"], [1, "Sim"]] }
                ],
                faixas: [
                    { min: 0, max: 0, rotulo: "Bem controlada", cor: "#16a34a" },
                    { min: 1, max: 2, rotulo: "Parcialmente controlada", cor: "#d97706" },
                    { min: 3, max: 4, rotulo: "Não controlada", cor: "#dc2626" }
                ],
                nota: "Antes de mudar o tratamento, confirmar que os sintomas são por asma e checar técnica inalatória e adesão."
            },
            grupos: [
                {
                    nome: "Fatores de risco para crises nos próximos meses",
                    itens: [
                        "≥ 1 crise grave no último ano (emergência, internação ou corticoide oral).",
                        "Sintomas não controlados.",
                        "Início da \"estação de crises\" habitual da criança (especialmente outono).",
                        "Exposições domiciliares: fumaça de tabaco, poluição, alérgenos (ácaro, barata, animais, mofo), principalmente junto com infecção viral. Poluição externa.",
                        "Problemas psicológicos ou socioeconômicos importantes da criança ou da família.",
                        "Má adesão ao CI ou técnica inalatória incorreta."
                    ]
                },
                {
                    nome: "Risco de limitação persistente ao fluxo aéreo e de efeitos adversos",
                    itens: [
                        "Limitação persistente: asma grave com várias internações; história de bronquiolite.",
                        "Efeitos sistêmicos: cursos frequentes de corticoide oral, CI em dose alta e/ou potente. Medir a altura ao menos 1×/ano.",
                        "Efeitos locais: CI em dose moderada/alta, técnica incorreta, não proteger pele e olhos com máscara (lavar o rosto após o uso)."
                    ]
                }
            ]
        },
        {
            titulo: "Manutenção ≤ 5 anos (por etapas)",
            icone: "🪜",
            tabela: {
                colunas: ["Etapa", "Preferencial", "Outras opções", "Para quem"],
                linhas: [
                    ["1", "Evidência insuficiente para controlador diário", "CI em curso curto intermitente no início de virose", "Sibilância aguda infrequente (ex.: viral), sem ou com poucos sintomas entre as crises"],
                    ["2", "<strong>CI diário em dose baixa</strong>", "Antileucotrieno diário* ou CI curto intermitente no início de virose", "Asma não controlada ou ≥ 1 crise grave no último ano"],
                    ["3", "<strong>Dobrar a dose baixa de CI</strong>", "Considerar encaminhar ao especialista", "Não controlada com CI em dose baixa"],
                    ["4", "Manter o controlador e <strong>encaminhar</strong> para avaliação especializada", "—", "Não controlada na etapa 3"]
                ],
                nota: "Alívio em todas as etapas: <strong>SABA se necessário</strong>. Antes de subir de etapa: checar diagnóstico alternativo, técnica inalatória, adesão e exposições. *Antileucotrieno (montelucaste): orientar sobre efeitos neuropsiquiátricos (sono e comportamento)."
            },
            grupos: [
                {
                    nome: "Quando iniciar CI diário (etapa 2)",
                    itens: [
                        "Sintomas não controlados (ex.: alívio > 2×/semana em média), <strong>ou</strong>",
                        "≥ 1 crise ou episódio de sibilância nos últimos 12 meses com atendimento de urgência, corticoide oral ou internação.",
                        "Pode ser indicado também na asma viral recorrente.",
                        "Manter inicialmente por pelo menos <strong>2–3 meses</strong> para avaliar a resposta. Com boa resposta por 2–3 meses, considerar reduzir a dose.",
                        "Reavaliar a necessidade do controlador a cada 3–6 meses (muitas crianças entram em remissão). Ao reduzir ou suspender, rever em 3–6 semanas."
                    ],
                    remedios: ["clenil_hfa"]
                },
                {
                    nome: "CI: dose diária baixa (≤ 5 anos)",
                    tabela: {
                        colunas: ["Corticoide inalatório", "Dose diária baixa (mcg)"],
                        linhas: [
                            ["Beclometasona (pMDI, partícula padrão, HFA)", "100 (≥ 5 anos)"],
                            ["Beclometasona (pMDI, partícula extrafina, HFA)", "50 (≥ 5 anos)"],
                            ["Budesonida nebulizada", "500 (≥ 1 ano)"],
                            ["Budesonida pMDI ou DPI", "Aguardando revisão sistemática"],
                            ["Fluticasona propionato (pMDI, partícula padrão, HFA)", "50 (≥ 4 anos)"],
                            ["Mometasona furoato (pMDI, partícula padrão, HFA)", "100 (≥ 5 anos)"],
                            ["Fluticasona furoato (DPI) · ciclesonida", "Não estudadas o suficiente em ≤ 5 anos"]
                        ],
                        nota: "Não é tabela de equivalência de potência. Na criança, o pMDI deve ser usado <strong>sempre com espaçador</strong>. Usar a menor dose eficaz."
                    }
                },
                {
                    nome: "Dispositivo inalatório (≤ 5 anos)",
                    tabela: {
                        colunas: ["Idade", "Preferencial", "Alternativa"],
                        linhas: [
                            ["0–3 anos", "pMDI + espaçador valvulado com <strong>máscara facial</strong>", "Nebulizador com máscara facial"],
                            ["4–5 anos", "pMDI + espaçador valvulado com <strong>bocal</strong>", "pMDI + espaçador com máscara ou (se indisponível) nebulizador"]
                        ],
                        nota: "Um jato por vez, agitando o salbutamol antes de cada jato, com <strong>5–6 respirações</strong> após cada jato (respiração corrente). Iniciar a inalação logo após o disparo. Máscara bem ajustada; lavar o rosto depois. Passar para o bocal assim que a criança conseguir. Espaçador plástico: lavar com detergente sem enxaguar (reduz a carga estática)."
                    }
                }
            ]
        },
        {
            titulo: "Manutenção 6–11 anos (por etapas)",
            icone: "🪜",
            tabela: {
                colunas: ["Etapa", "Controlador preferencial", "Outras opções"],
                linhas: [
                    ["1", "<strong>Somente alívio anti-inflamatório (AIR):</strong> CI-formoterol dose baixa se necessário, <strong>ou</strong> CI + SABA se necessário (combinados ou inaladores separados)", "—"],
                    ["2", "<strong>CI diário em dose baixa</strong>", "CI-formoterol ou CI-SABA se necessário; ou antileucotrieno diário*"],
                    ["3", "CI dose média, <strong>ou</strong> CI-LABA dose baixa, <strong>ou</strong> MART com CI-formoterol dose baixa", "CI dose baixa + antileucotrieno*"],
                    ["4", "CI-LABA dose média, <strong>ou</strong> MART com CI-formoterol dose baixa (dobro da etapa 3), <strong>ou</strong> encaminhar ao especialista", "Associar tiotrópio ou antileucotrieno* ao controlador da etapa 3"],
                    ["5", "Encaminhar para fenotipagem; considerar CI-LABA dose alta ou terapia adicional (LAMA, anti-IgE, anti-IL4Rα, anti-IL5)", "Encaminhar ao especialista"]
                ],
                nota: "Alívio: CI-formoterol dose baixa ou CI-SABA se necessário, ou SABA se necessário (se AIR indisponível). \"CI + SABA com inaladores separados\" = usar CI em dose baixa toda vez que usar o SABA. *Antileucotrieno: orientar efeitos neuropsiquiátricos."
            },
            grupos: [
                {
                    nome: "Tratamento inicial (6–11 anos)",
                    tabela: {
                        colunas: ["Sintomas nas últimas semanas", "Iniciar com"],
                        linhas: [
                            ["≤ 2 dias/semana", "<strong>Etapa 1:</strong> CI-formoterol dose baixa se necessário, ou CI + SABA se necessário"],
                            ["3–4 dias/semana", "<strong>Etapa 2:</strong> CI diário dose baixa + CI-SABA ou SABA se necessário"],
                            ["Na maioria dos dias, despertar ≥ 1×/semana ou função pulmonar baixa", "<strong>Etapa 3:</strong> CI-LABA dose baixa ou CI dose média (+ alívio), ou MART dose baixa"],
                            ["Sintomas diários, despertar ≥ 1×/semana <strong>e</strong> função pulmonar baixa ou crise recente", "<strong>Etapa 4:</strong> CI-LABA dose média (+ alívio), ou MART dose baixa"],
                            ["Apresentação inicial durante crise aguda", "Tratar a crise (com corticoide oral se grave) e iniciar etapa 3 ou 4 antes da alta"]
                        ]
                    }
                },
                {
                    nome: "Pontos práticos (6–11 anos)",
                    itens: [
                        "Antes de iniciar: registrar evidência do diagnóstico, nível de controle e fatores de risco (incluindo função pulmonar), escolher inalador adequado e checar a técnica.",
                        "<strong>Reavaliar em 2–3 meses</strong>. <strong>Reduzir a etapa</strong> após 3 meses de bom controle.",
                        "AIR com CI-formoterol: formulação sugerida <strong>budesonida-formoterol 80/4,5 mcg</strong> (dose liberada; 100/6 mcg dose medida), <strong>1 inalação se necessário</strong>. Procurar atendimento se > <strong>8 inalações em 24 h</strong>.",
                        "MART etapa 3: budesonida-formoterol 80/4,5 mcg 1 inalação 1×/dia + 1 inalação se necessário. Etapa 4: manutenção 2×/dia (ainda dose baixa).",
                        "Subida de etapa conforme a etapa 1 prévia: CI-formoterol se necessário → MART dose baixa; CI-SABA combinado → CI diário + CI-SABA; CI + SABA separados → CI diário + SABA, com CI extra a cada uso do SABA.",
                        "<strong>Não recomendado:</strong> tratamento só com SABA (maior risco de morte e de atendimento de urgência); uso regular ou excessivo de SABA (≥ 3 frascos/ano dobra o risco de ida à emergência); SABA oral e teofilina; LABA sem CI."
                    ],
                    remedios: ["clenil_hfa"]
                }
            ]
        },
        {
            titulo: "Crise: avaliação da gravidade",
            icone: "📊",
            tabela: {
                gravidade: true,
                colunas: ["", "Leve (todos)", "Moderada", "Grave (qualquer)", "Ameaça à vida"],
                linhas: [
                    ["Consciência", "Normal", "Normal", "Normal", "Sonolento, confuso"],
                    ["Cianose central", "Ausente", "Não", "Pode estar presente", "Cianótico"],
                    ["SpO₂ em ar ambiente*", "≥ 94%", "≥ 92%", "< 92%", ""],
                    ["Fala†", "Frases", "Expressões", "Palavras", ""],
                    ["Frequência respiratória", "≤ 40/min", "Aumentada, mas ≤ 40/min", "> 40/min", ""],
                    ["Musculatura acessória", "Ausente", "Alguma", "Presente; retração de escalenos", ""],
                    ["Entrada de ar", "Normal ou ↓ leve nas bases", "↓ (bases ou difusa)", "Tórax silencioso ou só sibilo inspiratório", ""],
                    ["Sibilância", "Nenhuma ou expiratória leve", "Expiratória ± inspiratória", "Tórax pode estar silencioso", ""],
                    ["PRAM", "1–3", "4–7", "8–10", "11–12"]
                ],
                nota: "Tabela do GINA para ≤ 5 anos (Box 12-1). *Antes do O₂; a oximetria pode superestimar a saturação em pele escura. †Considerar o desenvolvimento da criança. Agitação, sonolência e confusão sugerem hipoxemia cerebral. Tórax silencioso = ventilação mínima. SpO₂ < 92% na chegada (sobretudo < 88%) indica alta chance de internação."
            },
            grupos: [
                {
                    nome: "Escore PRAM (Pediatric Respiratory Assessment Measure) · 2 a 17 anos",
                    escore: {
                        id: "pram",
                        instrucao: "Toque no que o paciente apresenta em cada item. A soma é feita automaticamente.",
                        itens: [
                            { nome: "Saturação de O₂", opcoes: [[0, "≥ 95%"], [1, "92–94%"], [2, "< 92%"]] },
                            { nome: "Retração supraesternal", opcoes: [[0, "Ausente"], [2, "Presente"]] },
                            { nome: "Contração dos escalenos (palpação)", opcoes: [[0, "Ausente"], [2, "Presente"]] },
                            { nome: "Entrada de ar*", opcoes: [[0, "Normal"], [1, "Diminuída nas bases"], [2, "Diminuída em ápices e bases"], [3, "Mínima ou ausente"]] },
                            { nome: "Sibilância§", opcoes: [[0, "Ausente"], [1, "Só expiratória"], [2, "Inspiratória (± expiratória)"], [3, "Audível sem estetoscópio ou tórax silencioso"]] }
                        ],
                        faixas: [
                            { min: 0, max: 3, rotulo: "Crise leve", cor: "#16a34a" },
                            { min: 4, max: 7, rotulo: "Crise moderada", cor: "#d97706" },
                            { min: 8, max: 10, rotulo: "Crise grave", cor: "#dc2626" },
                            { min: 11, max: 12, rotulo: "Crise grave: risco de vida", cor: "#7f1d1d", texto: "Pior categoria do escore. Tratar imediatamente e chamar UTI." }
                        ],
                        nota: "Máximo 12. Classificação: 0–3 leve · 4–7 moderada · 8–12 grave (11–12 = ameaça à vida, pela tabela de gravidade do GINA). *Se assimetria, vale o campo pulmonar (ápice-base) mais acometido. §Se assimetria, valem as duas zonas de ausculta mais acometidas. O escore é um guia e não substitui a avaliação clínica. PRAM © 2011 Francine Ducharme."
                    }
                }
            ]
        },
        {
            titulo: "Crise: conduta (≤ 5 anos)",
            icone: "🩺",
            itens: [
                "Avaliar se os sintomas são de asma ou de outra causa (crupe, bronquiolite: mais provável se < 12 meses com crepitações, corpo estranho, cetoacidose). Perguntar que tratamento já foi feito.",
                "<strong>Se houver sinais de anafilaxia junto com a asma: adrenalina IM primeiro.</strong>",
                "<strong>Salbutamol: pMDI + espaçador é preferível</strong> ao nebulizador (mais eficiente, mais confortável, menos efeitos adversos e não dispersa vírus). Usar máscara só se a criança não conseguir usar o bocal."
            ],
            grupos: [
                {
                    nome: "🟢 Leve",
                    itens: [
                        "<strong>Salbutamol 100 mcg: 4 jatos</strong> (um por vez) por pMDI + espaçador, <strong>ou 2,5 mg</strong> por nebulização.",
                        "Avaliar a resposta e, <strong>se necessário, repetir 1× após 30–60 min</strong>."
                    ]
                },
                {
                    nome: "🟠 Moderada",
                    itens: [
                        "<strong>Salbutamol 4–6 jatos</strong> por pMDI + espaçador, ou <strong>2,5 mg</strong> por nebulização, <strong>até 3×, a cada 20–30 min</strong>.",
                        "<strong>Ipratrópio 20 mcg: 4 jatos</strong> junto com cada série de salbutamol (ou 0,25 mg nebulizado), até 3×.",
                        "<strong>Iniciar corticoide sistêmico.</strong>"
                    ],
                    remedios: ["pred_sol"]
                },
                {
                    nome: "🔴 Grave",
                    itens: [
                        "<strong>Transferir para unidade de urgência e iniciar o tratamento imediatamente.</strong>",
                        "Salbutamol 4–6 jatos (pMDI + espaçador) ou 2,5 mg nebulizado <strong>a cada 20 min</strong>, + ipratrópio 4 jatos (20 mcg/jato) ou 0,25 mg nebulizado a cada vez, até 3×.",
                        "<strong>O₂ se SpO₂ < 92%</strong> (acordado), alvo <strong>≥ 92%</strong>.",
                        "Corticoide sistêmico. <strong>Considerar sulfato de magnésio EV.</strong> Monitorização contínua."
                    ],
                    remedios: ["pred_sol", "adrenalina_im"]
                },
                {
                    nome: "⛔ Ameaça à vida (sonolento, confuso, cianótico ou PRAM 11–12)",
                    itens: [
                        "Tratar imediatamente com salbutamol, ipratrópio, O₂ e corticoide sistêmico. <strong>Chamar UTI pediátrica ou anestesia.</strong>",
                        "Adrenalina IM primeiro se anafilaxia. Acesso EV e monitorização cardiorrespiratória contínua.",
                        "O₂ 100% por máscara não reinalante. <strong>Salbutamol + ipratrópio nebulizados contínuos por 60 min.</strong> Monitorar toxicidade do SABA.",
                        "Corticoide EV ou IM. Sulfato de magnésio EV. Radiografia de tórax. Considerar gasometria."
                    ]
                },
                {
                    nome: "Medicações da crise: doses do GINA (≤ 5 anos)",
                    tabela: {
                        colunas: ["Medicação", "Dose e administração"],
                        linhas: [
                            ["Oxigênio", "Cateter nasal ou máscara, para manter SpO₂ ≥ 92%."],
                            ["Salbutamol (SABA)", "≥ 4 jatos de 100 mcg por espaçador (um por vez) ou 2,5 mg nebulizado (2,5 mg diluídos em 3 mL de SF 0,9% em nebulizador a O₂, se hipoxemia). Moderada/grave: a cada 20 min até 3×, depois reavaliar."],
                            ["Prednisolona / prednisona VO", "1–2 mg/kg (máx. <strong>20 mg se < 2 anos</strong>; <strong>30 mg se 2–5 anos</strong>), por <strong>3–5 dias</strong>, sem desmame."],
                            ["Dexametasona VO", "0,3–0,6 mg/kg (máx. 12 mg), 1 dose, com ou sem 2ª dose no dia seguinte (total 1–2 dias). Causa menos vômitos."],
                            ["Metilprednisolona EV", "1 mg/kg de 6/6 h no 1º dia."],
                            ["Brometo de ipratrópio", "4 jatos de 20 mcg (pMDI + espaçador) ou 0,25 mg nebulizado, com o SABA, até 3×. Suspender após as primeiras 1–2 h."],
                            ["Sulfato de magnésio EV", "40–50 mg/kg (máx. 2 g) em 20–60 min, dose única, em ≥ 2 anos com crise grave, após a 1ª hora de tratamento. Magnésio nebulizado não tem benefício."]
                        ],
                        nota: "⚠️ Toxicidade do SABA: taquicardia, palpitações, ansiedade, hipocalemia, arritmias, acidose lática e hiperventilação. Pode ser confundida com piora da asma."
                    }
                }
            ]
        },
        {
            titulo: "Reavaliação, transferência e internação",
            icone: "🏥",
            grupos: [
                {
                    nome: "Reavaliar em 1 hora (ou antes)",
                    itens: [
                        "Repetir SpO₂, FR, musculatura acessória, entrada de ar e PRAM.",
                        "<strong>Melhora acentuada</strong> sem novo SABA: avaliar alta.",
                        "<strong>Melhora parcial:</strong> salbutamol adicional se necessário, considerar nova dose de ipratrópio, corticoide sistêmico se ainda não feito. Reavaliar no mínimo a cada hora.",
                        "<strong>Piora:</strong> pensar em causas alternativas ou adicionais; salbutamol + ipratrópio; corticoide; magnésio EV; considerar UTI."
                    ]
                },
                {
                    nome: "Transferência imediata para hospital (qualquer um)",
                    itens: [
                        "Cianose · incapaz de falar ou beber · <strong>FR > 40/min</strong> · <strong>SpO₂ < 92%</strong> em ar ambiente · tórax silencioso com dispneia.",
                        "Sem resposta a 4–6 jatos de salbutamol a cada 20 min por até 3× (1 hora), ou taquipneia persistente após 3 doses, mesmo com outra melhora (FR normal: < 50 entre 2–12 meses; < 40 entre 1–5 anos).",
                        "Crise grave sem resolução em 1–2 h · parada ou parada iminente · recorrência de crise grave em 48 h (sobretudo já com corticoide).",
                        "Ambiente social que limita o tratamento ou cuidador incapaz de manejar em casa.",
                        "Durante o transporte: manter salbutamol, O₂ (alvo ≥ 92%) e iniciar corticoide sistêmico.",
                        "Procurar atendimento precoce se história de crise grave com risco de vida ou < 2 anos (maior risco de desidratação e fadiga)."
                    ]
                },
                {
                    nome: "Considerar internação se",
                    itens: [
                        "Sem melhora em 1 hora · SpO₂ < 92% · necessidade de SABA mais que a cada 1–2 h.",
                        "Dispneia persistente 4–6 h após o corticoide sistêmico.",
                        "Fatores que dificultem a adesão ou impossibilidade de acompanhamento próximo."
                    ]
                }
            ]
        },
        {
            titulo: "Alta e seguimento",
            icone: "✅",
            itens: [
                "<strong>Critérios:</strong> sintomas melhorados e critérios de crise \"leve\" por <strong>1–2 h após o último salbutamol</strong>, <strong>SpO₂ ≥ 92%</strong> em ar ambiente, estável (fora do leito, comendo e bebendo) e recursos adequados em casa.",
                "Registrar o diagnóstico de asma se confirmado: sibilância observada, sem outra causa e resposta ao SABA.",
                "<strong>Salbutamol pMDI + espaçador, 2 jatos se necessário</strong> (não regular). Voltar à emergência se precisar de novo em menos de 4 h (máx. 12 jatos/24 h).",
                "<strong>Ipratrópio:</strong> suspender (sem benefício após 1–2 h).",
                "<strong>CI:</strong> iniciar, manter ou aumentar se crise moderada/grave ou sintomas entre as crises (≥ 2 dias/semana). No 1º mês após a alta, <strong>dobro da dose baixa</strong>, depois ajustar.",
                "<strong>Corticoide oral:</strong> completar o curso (prednisolona 3–5 dias no total, ou dexametasona 1–2 dias).",
                "Treinar técnica com espaçador, plano de ação escrito, identificar gatilhos (virose, tabaco, poluição, alérgenos, adesão).",
                "<strong>Retorno em 1–3 dias</strong> e novamente em <strong>2–3 meses</strong>. Encaminhar ao especialista se ≥ 1 crise nos últimos 12 meses ou > 1 curso de corticoide oral no ano.",
                "Procurar atendimento se não melhorar ou piorar nas próximas 24–48 h."
            ],
            remedios: ["pred_sol", "clenil_hfa"]
        },
        {
            titulo: "Plano de ação em casa (≤ 5 anos)",
            icone: "🏠",
            itens: [
                "Iniciar <strong>salbutamol 100 mcg 2 jatos</strong> (um por vez, pMDI + espaçador). Pode repetir mais 2× a intervalos de 20 min se necessário. Se melhorar, manter em repouso e observar por 1 h ou mais.",
                "<strong>Procurar atendimento imediato se:</strong> desconforto agudo (falta de ar intensa, tiragem, cianose), sonolência/letargia ou piora; sem alívio rápido com o broncodilatador; alívio dura menos de 4 h ou cada vez menos; menor de 12 meses precisando de SABA repetido por várias horas.",
                "<strong>Procurar atendimento no mesmo dia</strong> se ≥ 4 jatos em menos de 4 h ou SABA > 3 vezes nas primeiras 12 h.",
                "<strong>Corticoide oral iniciado pelos pais não é recomendado.</strong> CI em dose alta episódico só se o médico tiver certeza do uso adequado.",
                "Montelucaste no início de virose: evidência conflitante. Orientar efeitos em sono, comportamento e humor."
            ]
        },
        {
            titulo: "Não recomendado",
            icone: "🚫",
            alerta: true,
            itens: [
                "Broncodilatador oral (xarope ou comprimido), pela ação mais lenta e mais efeitos adversos.",
                "Teofilina, inclusive como adicional.",
                "Tratamento só com SABA em 6–11 anos, ou uso regular de SABA (mascara a piora).",
                "LABA sem corticoide inalatório.",
                "Corticoide oral iniciado pelos pais em casa.",
                "Manter ipratrópio após as primeiras 1–2 h da crise.",
                "Sulfato de magnésio nebulizado.",
                "Corticoide IM em vez de oral na alta (sem evidência de superioridade)."
            ]
        },
        {
            titulo: "Vacinas",
            icone: "💉",
            recolhida: true,
            itens: [
                "<strong>Influenza</strong> anual na asma moderada a grave (ou quando indicada para a população geral).",
                "Pneumocócica, coqueluche, influenza, VSR e COVID-19 conforme o calendário local.",
                "Asma isolada não é indicação específica de vacina pneumocócica."
            ]
        }
    ],

    fontes: [
        "Global Initiative for Asthma (GINA). Global Strategy for Asthma Management and Prevention, 2026: seção 4 (tratamento de 6–11 anos) e seções 10–12 (diagnóstico, manejo e crises em crianças ≤ 5 anos). Tradução e adaptação.",
        "PRAM: Ducharme FM et al. © 2011, reproduzido no GINA 2026 (Box 12-2)."
    ],
    revisao: "10/2026"
});
