// =====================================================
// CONDUTA: DIARREIA AGUDA INFECCIOSA
// Base: SBP — Guia Prático de Atualização nº 74 (06/06/2023), Departamento de
// Gastroenterologia: "Diarreia Aguda Infecciosa", que incorpora o novo fluxograma
// do Ministério da Saúde (Manejo do paciente com diarreia, 2023).
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
registrarConduta({
    id: "diarreia",
    nome: "Diarreia Aguda (Gastroenterite)",
    categoria: "Gastrointestinal",
    cor: "#0891b2",
    kw: "diarreia aguda gastroenterite geca desidratacao plano a b c sro soro de reidratacao oral disenteria rotavirus vomitos",
    resumo: "Avaliação da hidratação (Planos A, B e C), reidratação, antibiótico na disenteria, zinco, probióticos e sinais de alerta.",
    legenda: "Conduta conforme o <strong>Guia Prático da SBP nº 74 (2023)</strong>, com o fluxograma do <strong>Ministério da Saúde (2023)</strong>.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico e definições",
                    icone: "🔎",
                    resumo: "Definição da OMS/MS, duração e o que não é diarreia.",
                    itens: [
                        "<strong>Diarreia aguda (OMS):</strong> 3 ou mais evacuações amolecidas ou líquidas por dia, com duração de <strong>até 14 dias</strong>. <strong>MS:</strong> síndrome autolimitada, duração máxima de 14 dias.",
                        "Pode haver náusea, vômitos, febre e dor abdominal; às vezes muco e sangue (<strong>disenteria</strong>). Pode causar desidratação leve, moderada ou grave.",
                        "<strong>Diarreia aguda prolongada:</strong> 7 a 14 dias (pode indicar investigação). <strong>Persistente:</strong> > 14 dias. <strong>Crônica:</strong> > 30 dias.",
                        "<strong>Não é diarreia:</strong> lactente em <strong>aleitamento materno exclusivo</strong> com evacuações frequentes, semilíquidas, após as mamadas (reflexo gastrocólico), com bom ganho de peso e sem outros sinais.",
                        "<strong>\"Diarreia de fome\":</strong> em desnutridos, fezes amolecidas, esverdeadas, de pequeno volume (descamação celular e muco).",
                        "<strong>Febre ≥ 39 °C</strong> junto com a diarreia: investigar e tratar outras causas (pneumonia, otite, amigdalite, faringite, infecção urinária)."
                    ]
                },
                {
                    titulo: "Etiologia",
                    icone: "🦠",
                    resumo: "Vírus, bactérias e protozoários.",
                    itens: [
                        "<strong>Vírus:</strong> <strong>rotavírus</strong> (principal causa de diarreia grave em < 5 anos; a vacina reduziu as internações); <strong>norovírus</strong> (principal agente de surtos por água e alimentos; aumentou com a queda do rotavírus); adenovírus; astrovírus (lactentes, leve); SARS-CoV-2.",
                        "<strong>Protozoários:</strong> Cryptosporidium parvum, Giardia intestinalis, Entamoeba histolytica, Cyclospora cayetanensis.",
                        "Bactérias e parasitas predominam em países em desenvolvimento, com pico nas estações chuvosas e quentes."
                    ],
                    tabela: {
                        titulo: "Principais bactérias",
                        colunas: ["Agente", "Quadro clínico"],
                        linhas: [
                            ["E. coli enterotoxigênica (ETEC)", "Diarreia do viajante e do lactente: líquida, abundante, sem sangue; dor abdominal, febre baixa (secretora)"],
                            ["E. coli enteropatogênica (EPEC)", "Lactentes: diarreia com muco, sem sangue; dor abdominal, vômitos, febre"],
                            ["E. coli enteroinvasiva (EIEC)", "> 2 anos: disenteria, febre, cólica, mal-estar (semelhante à Shigella)"],
                            ["E. coli entero-hemorrágica (EHEC)", "Colite hemorrágica, sangue sem leucócitos nas fezes, <strong>SHU</strong> (toxina Shiga)"],
                            ["E. coli enteroagregativa (EAEC)", "Diarreia líquida, persistente; portador assintomático"],
                            ["Campylobacter", "Lactentes; aves. Líquida ou disenteria, dor abdominal, vômitos, cefaleia, mialgia"],
                            ["Shigella", "Febre alta, dor abdominal intensa, enterocolite, SHU (S. dysenteriae tipo 1)"],
                            ["Salmonella", "Lactentes e imunocomprometidos: diarreia, vômitos, dor, febre moderada; infecção sistêmica"],
                            ["Yersinia enterocolitica", "Enterocolite, linfadenite mesentérica, ileíte: pode imitar apendicite"],
                            ["Clostridioides difficile", "Uso prévio de antibiótico, nosocomial: colite pseudomembranosa"],
                            ["Vibrio cholerae", "Início abrupto, vômitos e diarreia \"água de arroz\": desidratação e choque"]
                        ]
                    }
                },
                {
                    titulo: "Exames laboratoriais",
                    icone: "🧪",
                    resumo: "Não indicados nos casos leves.",
                    itens: [
                        "<strong>Não indicados nos quadros leves.</strong> Úteis nos moderados de difícil abordagem e nos graves.",
                        "Colher de preferência <strong>após a expansão</strong> (a hemoconcentração da desidratação altera os resultados).",
                        "Conforme o caso: leucograma (leucocitose com desvio), ionograma, gasometria; nas fezes: leucócitos, sangue, parasitas e substâncias redutoras.",
                        "Etiologia: parasitológico de fezes, coprocultura e pesquisa de vírus. Em surtos: acionar a vigilância epidemiológica do município."
                    ]
                },
                {
                    titulo: "Avaliação da hidratação (Planos A, B e C)",
                    icone: "💧",
                    aberta: true,
                    resumo: "Observe e explore: toque no que o paciente apresenta; o app indica o plano.",
                    escore: {
                        id: "hidratacao_dai",
                        unidade: "sinais",
                        instrucao: "Toque no achado de cada item. A = sem desidratação · B = com desidratação · C = desidratação grave (C* = sinal destacado).",
                        itens: [
                            { nome: "Estado geral", opcoes: [[0, "Ativo, alerta", "A"], [1, "Irritado, intranquilo", "B"], [3, "Comatoso, hipotônico, letárgico ou inconsciente", "C*"]] },
                            { nome: "Olhos", opcoes: [[0, "Sem alteração", "A"], [1, "Fundos", "B/C"]] },
                            { nome: "Sede", opcoes: [[0, "Sem sede", "A"], [1, "Sedento, bebe rápido e avidamente", "B"], [3, "Não é capaz de beber", "C*"]] },
                            { nome: "Lágrimas", opcoes: [[0, "Presentes", "A"], [1, "Ausentes", "B/C"]] },
                            { nome: "Boca / língua", opcoes: [[0, "Úmida", "A"], [1, "Seca ou levemente seca", "B"], [2, "Muito seca", "C"]] },
                            { nome: "Sinal da prega abdominal", opcoes: [[0, "Desaparece imediatamente", "A"], [1, "Desaparece lentamente", "B"], [2, "Desaparece muito lentamente (> 2 s)", "C"]] },
                            { nome: "Pulso", opcoes: [[0, "Cheio", "A"], [3, "Fraco ou ausente", "C*"]] },
                            { nome: "Perda de peso (internado com diarreia e vômitos)", opcoes: [[0, "Sem perda / não avaliada", "A"], [1, "Até 10%", "B"], [2, "Acima de 10%", "C"]] }
                        ],
                        classificar: (valores) => {
                            let sinais = valores.filter(v => v >= 1).length;
                            let destacado = valores.some(v => v === 3);
                            if (sinais >= 2 && destacado) return { num: sinais, rotulo: "Desidratação grave: PLANO C", cor: "#dc2626", texto: "Hidratação endovenosa (ver Condução na emergência)." };
                            if (sinais >= 2) return { num: sinais, rotulo: "Com desidratação: PLANO B", cor: "#d97706", texto: "SRO na unidade de saúde até a reidratação completa." };
                            return { num: sinais, rotulo: "Sem desidratação: PLANO A", cor: "#16a34a", texto: "Tratamento em casa." };
                        },
                        nota: "<strong>Decida:</strong> sem sinais = Plano A · 2 ou mais sinais = Plano B · 2 ou mais sinais, sendo ao menos 1 destacado (C*: comatoso/hipotônico/letárgico/inconsciente, não consegue beber, pulso fraco ou ausente) = Plano C. Na dúvida entre B e C, considerar o pior cenário: <strong>Plano C</strong>. A perda de peso é avaliada no internado com diarreia e vômitos. Fonte: MS 2023 (Quadro 2 do Guia da SBP)."
                    }
                }
            ]
        },
        {
            titulo: "Condução na unidade de saúde e hospital",
            icone: "🚨",
            cor: "#dc2626",
            secoes: [
                {
                    titulo: "Plano B: reidratação oral na unidade",
                    icone: "🟠",
                    aberta: true,
                    resumo: "SRO 50–100 mL/kg em 4–6 h, ondansetrona se vômitos persistentes.",
                    itens: [
                        "Desidratação <strong>sem gravidade</strong>, capaz de ingerir líquidos: tratar com <strong>SRO na unidade de saúde</strong>, onde permanece até a reidratação completa.",
                        "SRO em pequenos volumes, aumentando a oferta aos poucos, conforme a sede, até sumirem os sinais de desidratação. Estimativa: <strong>50 a 100 mL/kg em 4 a 6 horas</strong>.",
                        "<strong>Reavaliar constantemente.</strong> O Plano B termina quando desaparecem os sinais de desidratação: passar para o Plano A.",
                        "Se continuar desidratado com pouca tolerância ao SRO: <strong>sonda nasogástrica (gastróclise)</strong>.",
                        "<strong>Vômitos persistentes:</strong> 1 dose de <strong>ondansetrona</strong> (alerta da ANVISA: não usar em gestantes; avaliar com cautela em lactentes). <strong>Metoclopramida é proibida em < 18 anos.</strong>",
                        "Sem melhora em <strong>6 horas</strong> (na prática, 3 a 4 h): encaminhar para internação. Evoluiu para desidratação grave: <strong>Plano C</strong>.",
                        "Orientar a família a reconhecer sinais de desidratação, preparar e oferecer o SRO e as medidas de higiene."
                    ],
                    tabela: {
                        titulo: "Ondansetrona VO (dose única, Plano B)",
                        colunas: ["Faixa etária", "Dose"],
                        linhas: [
                            ["6 meses a 2 anos", "2 mg (0,2 a 0,4 mg/kg)"],
                            ["> 2 a 10 anos (até 30 kg)", "4 mg"],
                            ["> 10 anos (> 30 kg)", "8 mg"]
                        ],
                        nota: "Fonte: Quadro 5 do Guia da SBP. Os cards de ondansetrona do app seguem o esquema próprio do serviço."
                    },
                    remedios: ["tgi_planob", "ondif_cp", "ondan_vo"]
                },
                {
                    titulo: "Plano C: hidratação endovenosa",
                    icone: "🔴",
                    aberta: true,
                    resumo: "Expansão 30 + 70 mL/kg, depois manutenção + reposição.",
                    itens: [
                        "Desidratação grave (perda de peso > 10%; sinais de choque: perfusão lentificada, taquicardia importante). Pode haver acidose metabólica e distúrbios eletrolíticos.",
                        "<strong>Transferir o mais rápido possível</strong>, já iniciando os cuidados na unidade. Doença grave associada ou alteração do sensório: hidratação venosa imediata.",
                        "Aleitamento materno pode ser mantido, se tolerado. Alimentação reiniciada após a reidratação."
                    ],
                    grupos: [
                        {
                            nome: "1ª fase: expansão (SF 0,9% ou Ringer lactato)",
                            tabela: {
                                colunas: ["Idade", "1ª etapa", "2ª etapa"],
                                linhas: [
                                    ["< 1 ano", "30 mL/kg em 1 h", "70 mL/kg em 5 h"],
                                    ["> 1 ano", "30 mL/kg em 30 min", "70 mL/kg em 2 h 30 min"],
                                    ["RN e < 5 anos com cardiopatia grave", "10 mL/kg", "Ajustar a velocidade pela clínica"]
                                ]
                            },
                            itens: [
                                "<strong>Reavaliar após 2 horas:</strong> se persistirem sinais de choque, repetir a prescrição; se não, iniciar a manutenção (com balanço hídrico)."
                            ],
                            remedios: ["tgi_planoc"]
                        },
                        {
                            nome: "2ª fase: manutenção + reposição (24 h)",
                            tabela: {
                                colunas: ["", "Solução", "Volume"],
                                linhas: [
                                    ["Manutenção", "SG 5% + SF 0,9% (4:1)", "Até 10 kg: 100 mL/kg · 10–20 kg: 1.000 mL + 50 mL/kg acima de 10 kg · > 20 kg: 1.500 mL + 20 mL/kg acima de 20 kg (máx. 2.000 mL)"],
                                    ["Reposição", "SG 5% + SF 0,9% (1:1)", "Iniciar 50 mL/kg/dia; reavaliar conforme as perdas"],
                                    ["Potássio", "KCl 10%", "2 mL para cada 100 mL da manutenção"]
                                ]
                            },
                            itens: [
                                "Iniciar <strong>SRO</strong> em pequenas doses frequentes assim que aceitar (em geral 2–3 h após o início da EV), junto com o soro venoso.",
                                "<strong>Suspender a EV</strong> quando hidratado, tolerando o SRO e sem vômitos. Observar por pelo menos 6 h, reavaliando a hidratação e as fezes."
                            ],
                            remedios: ["tgi_manut_planoc"]
                        }
                    ]
                },
                {
                    titulo: "Antibióticos (só na disenteria grave ou cólera grave)",
                    icone: "💊",
                    resumo: "Diarreia com sangue + comprometimento do estado geral, ou cólera grave.",
                    itens: [
                        "<strong>Indicação:</strong> diarreia com sangue (disenteria) <strong>e</strong> comprometimento do estado geral, ou <strong>cólera grave</strong>. Fora disso, antibiótico é ineficaz, gera resistência e <strong>não deve ser prescrito</strong>."
                    ],
                    tabela: {
                        colunas: ["Idade / peso", "Antibiótico", "Dose (MS 2023)"],
                        linhas: [
                            ["Até 10 anos / até 30 kg", "<strong>Azitromicina</strong>", "10 mg/kg no 1º dia + 5 mg/kg por mais 4 dias, VO (total 5 dias)"],
                            ["Até 10 anos / até 30 kg", "<strong>Ceftriaxona</strong>", "50–100 mg/kg IM 1x/dia por 3–5 dias. < 3 meses ou imunodeficiência: EV, 1x/dia"],
                            ["> 10 anos / > 30 kg", "<strong>Ciprofloxacino</strong>", "500 mg VO de 12/12 h por 3 dias"],
                            ["> 10 anos / > 30 kg", "<strong>Ceftriaxona</strong>", "50–100 mg/kg IM 1x/dia por 3–5 dias. Graves: 50–100 mg/kg/dia EV por 3–5 dias"],
                            ["Casos graves", "<strong>Cefotaxima</strong>", "100 mg/kg/dia, dividido em 4 doses"]
                        ]
                    },
                    remedios: ["tgi_azitro", "cef_disenteria", "cipro_disenteria", "cefotax_pac"]
                },
                {
                    titulo: "Desnutrido grave",
                    icone: "⚠️",
                    resumo: "Desidratação difícil de avaliar; soro e volume diferentes.",
                    itens: [
                        "Com ou sem edema: a desidratação é mais difícil de avaliar (confunde com a desnutrição). Avaliar atividade, pulso, FC e perfusão de extremidades.",
                        "<strong>SRO para desnutrido</strong> (OMS: menos sódio, 45 mmol/L; mais potássio, 40 mmol/L; glicose 125 mmol/L). Não disponível pronto: diluir o sachê do SRO (90 mEq/L) em <strong>2 litros</strong> de água e acrescentar KCl e glicose até <strong>40 mEq de potássio e 30 g de glicose por litro</strong>.",
                        "<strong>Hidratação venosa:</strong> não superestimar a desidratação (risco de sobrecarga): <strong>SF 0,9% 10 mL/kg</strong>, reavaliando a cada hora.",
                        "Tratar deficiências específicas: <strong>vitamina A</strong> e zinco.",
                        "Iniciar hidratação e <strong>antibiótico imediatamente</strong> em qualquer serviço. Se não estiver internado: 1ª dose do antibiótico IM e encaminhar ao hospital."
                    ],
                    remedios: ["vit_a_diarreia", "tgi_zinco"]
                }
            ]
        },
        {
            titulo: "Ambulatório: casa e seguimento",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Plano A: tratamento em casa",
                    icone: "🟢",
                    aberta: true,
                    resumo: "Líquidos e SRO após cada evacuação, manter alimentação, zinco e sinais de alerta.",
                    itens: [
                        "<strong>Aumentar a ingestão de água e líquidos</strong>, incluindo <strong>SRO após cada evacuação</strong>. Não usar refrigerantes; de preferência não adoçar chás e sucos.",
                        "<strong>Manter a alimentação habitual</strong> e o aleitamento materno.",
                        "Retornar se não melhorar em 2 dias ou se aparecer algum sinal de alerta.",
                        "Orientar a reconhecer sinais de desidratação, preparar e oferecer o SRO e as medidas de higiene (lavagem das mãos, tratamento da água, higiene dos alimentos).",
                        "<strong>Zinco 1x/dia por 10 a 14 dias:</strong> até 6 meses 10 mg/dia; > 6 meses até 5 anos 20 mg/dia."
                    ],
                    tabela: {
                        titulo: "Volume de SRO após cada evacuação",
                        colunas: ["Idade", "Volume"],
                        linhas: [
                            ["< 1 ano", "50 a 100 mL"],
                            ["1 a 10 anos", "100 a 200 mL"],
                            ["> 10 anos", "O volume tolerado"]
                        ]
                    },
                    remedios: ["tgi_sro", "tgi_zinco", "orientacoes_geca"]
                },
                {
                    titulo: "Sinais de alerta (retorno à unidade)",
                    icone: "🚨",
                    resumo: "Quando a família deve voltar.",
                    itens: [
                        "Não melhora em 2 dias.",
                        "Aumento da frequência e/ou do volume da diarreia.",
                        "Vômitos repetidos.",
                        "Sangue nas fezes.",
                        "Diminuição da diurese.",
                        "Sede excessiva.",
                        "Recusa de alimentos."
                    ],
                    remedios: ["orientacoes_geca"]
                },
                {
                    titulo: "Medicações adjuvantes",
                    icone: "💊",
                    resumo: "Antitérmico, racecadotrila, probióticos e antiparasitários.",
                    itens: [
                        "<strong>Antitérmicos:</strong> se febre ou dor (dipirona ou paracetamol).",
                        "<strong>Antiemético:</strong> só se vômitos persistentes.",
                        "<strong>Racecadotrila</strong> (antissecretor; ESPGHAN e diretriz ibero-americana): 1,5 mg/kg 3x/dia até cessar a diarreia; contraindicada em < 3 meses; adultos até 400 mg/dia. Reduz perdas e duração. O MS não a menciona.",
                        "<strong>Probióticos recomendados (ESPGHAN 2023), por 5 a 7 dias:</strong> Saccharomyces boulardii CNCM I-745 250–750 mg/dia; L. rhamnosus GG ≥ 10¹⁰ UFC/dia; L. reuteri DSM 17938 10⁸–4×10⁸ UFC/dia; L. rhamnosus 19070-2 + L. reuteri DSM 12246 10¹⁰ UFC de cada, 2x/dia por 5 dias. Reduzem em média 1 dia de diarreia.",
                        "<strong>Não recomendados:</strong> L. helveticus R0052 + L. rhamnosus R0011; Bacillus clausii (cepas O/C, SIN, N/R e T).",
                        "<strong>Antiparasitários</strong>, só se: <strong>amebíase</strong> (falha do tratamento da Shigella ou trofozoítos de E. histolytica com hemácias): metronidazol 50 mg/kg/dia em 3 doses por 10 dias; <strong>giardíase</strong> (diarreia ≥ 14 dias com cistos ou trofozoítos): metronidazol 15 mg/kg/dia em 3 doses por 5 dias.",
                        "<strong>Vitamina A</strong> em populações de risco (desnutridos): < 6 meses 50.000 UI; 6–12 meses 100.000 UI; maiores 200.000 UI."
                    ],
                    remedios: ["pct_gts", "dip_gts", "tiorfan", "tgi_flora", "tgi_provance_gg", "metro_parasitas", "vit_a_diarreia"]
                },
                {
                    titulo: "Diarreia persistente e encaminhamento",
                    icone: "📤",
                    resumo: "Mais de 14 dias.",
                    itens: [
                        "Diarreia > 14 dias em <strong>menor de 6 meses</strong> ou com sinais de desidratação (hidratar primeiro): encaminhar para unidade hospitalar ou especialista (pediatra ou gastroenterologista pediátrico).",
                        "Diarreia aguda prolongada (7–14 dias) pode indicar investigação."
                    ]
                },
                {
                    titulo: "Prevenção",
                    icone: "🛡️",
                    resumo: "Vacina do rotavírus, higiene, água e aleitamento.",
                    itens: [
                        "<strong>Vacinação contra o rotavírus</strong> (reduziu em 52,5% as internações de < 5 anos no Brasil).",
                        "Lavagem das mãos com sabão, higiene dos alimentos e do domicílio, água tratada e saneamento.",
                        "Aleitamento materno prolongado. SRO disponível em casa."
                    ]
                }
            ]
        }
    ],

    fontes: [
        "Sociedade Brasileira de Pediatria. Departamento Científico de Gastroenterologia. Guia Prático de Atualização nº 74: Diarreia Aguda Infecciosa. 06/06/2023.",
        "Brasil. Ministério da Saúde. Manejo do paciente com diarreia. Brasília: MS, 2023 (quadros reproduzidos no Guia da SBP)."
    ],
    revisao: "10/2026"
});
