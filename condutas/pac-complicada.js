// =====================================================
// CONDUTA: PNEUMONIA ADQUIRIDA NA COMUNIDADE COMPLICADA (PACC)
// Base: SBP — Documento Científico nº 151 (29/04/2024), Departamentos de
// Pneumologia e Infectologia: "Pneumonias Adquiridas na Comunidade
// Complicadas: Atualização 2024".
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
registrarConduta({
    id: "pac_complicada",
    nome: "Pneumonia Complicada (PACC)",
    categoria: "Respiratório",
    cor: "#0284c7",
    kw: "pneumonia complicada pac pacc derrame pleural parapneumonico empiema necrosante abscesso pulmonar pneumatocele dreno toracico",
    resumo: "Derrame parapneumônico, empiema, pneumonia necrosante e abscesso pulmonar: diagnóstico, antibiótico e abordagem cirúrgica.",
    legenda: "Conduta conforme o <strong>Documento Científico da SBP nº 151 (2024)</strong>: Pneumonias Adquiridas na Comunidade Complicadas.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Definição e etiologia",
                    icone: "🔎",
                    resumo: "O que é PACC e principais agentes.",
                    itens: [
                        "<strong>PAC complicada (PACC):</strong> PAC associada a complicações <strong>locais</strong> (derrame parapneumônico, empiema pleural, pneumonia necrosante, abscesso pulmonar) e/ou <strong>sistêmicas</strong> (bacteremia, infecção metastática, falência de múltiplos órgãos, SDRA, CIVD).",
                        "Pode ser a apresentação inicial ou decorrer de PAC não complicada com evolução desfavorável ou falência de tratamento. Curso e internação em geral prolongados, mas a maioria evolui para cura.",
                        "<strong>Agentes:</strong> vírus (principalmente VSR) são os principais em < 2 anos. Entre as bactérias, o <strong>pneumococo</strong> é o principal em < 5 anos. Coinfecção viral + bacteriana em ~30%.",
                        "Outros: <strong>S. aureus</strong> (inclusive MRSA e cepas produtoras de PVL nas formas necrosantes graves), S. pyogenes, H. influenzae, M. catarrhalis, M. pneumoniae, K. pneumoniae, P. aeruginosa.",
                        "Sorotipos pneumocócicos mais prevalentes em < 5 anos (2022): <strong>19A</strong> (52%, clone com alta resistência à penicilina), 3 (sensível à penicilina) e 6C."
                    ]
                },
                {
                    titulo: "Quadro clínico",
                    icone: "🩺",
                    aberta: true,
                    resumo: "Derrame/empiema, necrosante, abscesso e aspirativa.",
                    grupos: [
                        {
                            nome: "Derrame parapneumônico (DPP) e empiema (EP)",
                            itens: [
                                "Manifestação <strong>mais comum</strong> da PACC. Estágios: exsudativo (DPP simples) → fibrinopurulento (DPP complicado) → organização (paquipleuris). EP = coleção purulenta, estágio avançado do mesmo processo.",
                                "<strong>Suspeitar</strong> quando a resposta ao antibiótico para PAC é lenta ou há piora durante o tratamento.",
                                "Mal-estar, letargia e febre, seguidos de tosse e taquipneia (> 90%). Dispneia à medida que o derrame cresce. Dor torácica ou abdominal do lado acometido, com febre alta e calafrios; a criança pode deitar sobre o lado afetado.",
                                "Toxemia, respiração superficial, dificuldade respiratória grave, hipotensão e choque séptico. Escoliose para o lado afetado.",
                                "Ausculta: murmúrio francamente diminuído no lado acometido; estertores; atrito pleural se derrame pequeno. Macicez à percussão.",
                                "Mortalidade baixa, exceto em < 2 anos."
                            ]
                        },
                        {
                            nome: "Pneumonia necrosante",
                            itens: [
                                "Até <strong>7%</strong> das PAC pediátricas. Consolidação com necrose → cavitação (pneumatocele), em geral periférica e em um lobo. Pode formar fístula broncopleural e pneumotórax.",
                                "Agentes: pneumococo, S. aureus (MRSA, PVL) e S. pyogenes. Em geral < 5 anos e previamente hígidos.",
                                "Febre, tosse, dor torácica, taquipneia, macicez, murmúrio diminuído e/ou respiração brônquica. Criança <strong>desproporcionalmente doente</strong>, com febre persistente e pneumonia progressiva ou sem resposta.",
                                "<strong>Considerar na PAC grave sem melhora após ≥ 72 h de antibiótico.</strong> Procurar focos extrapulmonares (pele, partes moles, osteoarticular).",
                                "Empiema associado em 63–100%; fístula broncopleural em 17–67% (pneumotórax ou escape de ar > 24 h pelo dreno).",
                                "Pode deteriorar rápido: sepse grave, choque, falência de múltiplos órgãos.",
                                "<strong>SHU</strong> (rara): anemia hemolítica, plaquetopenia e insuficiência renal. Alerta: hemorragia pulmonar, hemoptise, exantema eritematoso, leucopenia."
                            ]
                        },
                        {
                            nome: "Abscesso pulmonar (AP)",
                            itens: [
                                "Evolução insidiosa (após aspiração, em 1–2 semanas). Sintomas inespecíficos como na PAC não complicada.",
                                "Sugerem AP: <strong>febre persistente, toxemia, hipoxemia persistente, sem resposta ao antibiótico</strong>. Tosse seca, que pode ficar maciçamente produtiva (vômica) se o abscesso romper no brônquio.",
                                "Diferencial: tuberculose, nocardiose, fungos, melioidose, paragonimíase, abscesso amebiano; tumores, sarcoidose, infarto pulmonar."
                            ]
                        },
                        {
                            nome: "Pneumonia aspirativa",
                            itens: [
                                "Material da boca, esôfago ou estômago para a via aérea. Causas: distúrbios da deglutição, malformações congênitas, refluxo gastroesofágico.",
                                "Gram-positivos, Gram-negativos e anaeróbios: tratar com <strong>antibiótico de amplo espectro</strong>.",
                                "Pneumonia lipoide: aspiração de <strong>óleo mineral</strong>. O uso de óleo mineral para constipação é iatrogênico e deve ser abolido."
                            ]
                        }
                    ]
                },
                {
                    titulo: "Exames laboratoriais e microbiológicos",
                    icone: "🧪",
                    resumo: "Hemocultura, líquido pleural e critérios de empiema.",
                    itens: [
                        "<strong>Provas de fase aguda</strong> (leucócitos, neutrófilos, PCR, VHS, procalcitonina): pouco eficientes para distinguir viral de bacteriana; úteis em <strong>medidas seriadas</strong> para monitorar a resposta.",
                        "<strong>Hemocultura em todas as crianças</strong> (positiva em < 10%).",
                        "<strong>Líquido pleural em quantidade significativa</strong> (clínica ou imagem): aspirar para citologia (contagem e diferencial), bioquímica e microbiologia (Gram, cultura com antibiograma e PCR para patógenos comuns). PCR no líquido pleural é mais sensível e específica que no sangue e mais sensível que a cultura após início do antibiótico.",
                        "Antígeno pneumocócico no líquido pleural: alto valor preditivo positivo para empiema pneumocócico. Antígeno urinário: sensível, mas não distingue colonização de doença.",
                        "Escarro induzido e amostras de naso/orofaringe: não distinguem colonização. Técnicas invasivas (aspirado, biópsia, LBA) só na deterioração progressiva, sobretudo em imunocomprometidos."
                    ],
                    tabela: {
                        titulo: "Líquido pleural sugestivo de empiema",
                        colunas: ["Parâmetro", "Valor"],
                        linhas: [
                            ["Aspecto", "Pus franco ou organismos visíveis no Gram"],
                            ["Leucócitos", "≥ 15.000/mm³ (15,0 × 10⁶/L), predomínio de neutrófilos"],
                            ["pH", "< 7,20 (pH < 7,0: alto risco de septações)"],
                            ["Proteína", "> 30 g/L"],
                            ["Glicose", "< 2,2 mmol/L (< 40 mg/dL)"],
                            ["DHL", "frequentemente ≥ 1.000 U/L"]
                        ],
                        nota: "pH e glicose baixos e DHL elevado indicam DP complicado (atividade metabólica de células inflamatórias e bactérias) e são preditivos de PAC grave."
                    }
                },
                {
                    titulo: "Exames de imagem",
                    icone: "🩻",
                    resumo: "Radiografia, ultrassonografia e tomografia.",
                    itens: [
                        "<strong>Radiografia de tórax</strong> (incluir decúbito lateral, incidência de Hjelm-Laurell): diferencia derrame livre de loculado, consolidação e espessamento pleural, mas <strong>não diferencia DPP de empiema</strong>. Pneumonia necrosante é vista em < 40%; pneumatoceles em média 4–8 dias após a internação. Desvio do mediastino só com derrame > 1.000 mL.",
                        "<strong>Ultrassonografia de tórax:</strong> o método <strong>mais sensível para o espaço pleural</strong> e o recomendado para estimar o volume do derrame (decisivo para a conduta). Superior à TC para ver loculações e fibrina. Sem radiação, portátil e sem sedação. Com Doppler, áreas hipoecoicas ou hipoperfundidas predizem necrose e diferenciam abscesso de empiema (operador-dependente).",
                        "<strong>TC de tórax com contraste:</strong> padrão para diagnosticar <strong>pneumonia necrosante</strong> (consolidação com baixa atenuação e sem realce; múltiplas cavidades de paredes finas sem borda de realce). <strong>Abscesso:</strong> cavidade com parede de realce bem definida. Útil para indicar intervenção. Fístula broncopleural só é definida se a comunicação for vista."
                    ]
                }
            ]
        },
        {
            titulo: "Condução hospitalar",
            icone: "🚨",
            cor: "#dc2626",
            secoes: [
                {
                    titulo: "Antibioticoterapia empírica",
                    icone: "💊",
                    aberta: true,
                    resumo: "Esquema por gravidade; parenteral por pelo menos 2–3 semanas.",
                    itens: [
                        "Escolha conforme <strong>gravidade clínica</strong>, resistência local e comorbidades. Tratamento parenteral prolongado: <strong>pelo menos 2–3 semanas</strong>.",
                        "Antibiótico isolado costuma bastar em <strong>derrames pequenos, sem desvio do mediastino e sem insuficiência respiratória</strong>, e também na necrosante e no abscesso, mesmo com cavidades grandes."
                    ],
                    grupos: [
                        {
                            nome: "🟢 PACC com derrame e boas condições clínicas",
                            itens: [
                                "<strong>Penicilina cristalina ou ampicilina</strong>, além da abordagem cirúrgica adequada.",
                                "Suspeita ou confirmação de <strong>M. pneumoniae ou C. pneumoniae</strong>: associar <strong>macrolídeo</strong>. Levofloxacino é opção, inclusive na alergia grave a betalactâmicos."
                            ],
                            remedios: ["pen_cristalina", "ampicilina", "azi_ev"]
                        },
                        {
                            nome: "🟠 PACC grave",
                            itens: [
                                "<strong>Ceftriaxona ou cefotaxima</strong> (cobrem pneumococo e S. aureus sensível).",
                                "Em áreas com <strong>alta prevalência de MRSA</strong> na comunidade: associar <strong>vancomicina</strong> até o resultado das culturas.",
                                "Alternativas à vancomicina para MRSA: linezolida ou clindamicina. Ceftarolina em monoterapia é opção possível."
                            ],
                            remedios: ["cef_resp_ev", "vancomicina", "clindamicina"]
                        },
                        {
                            nome: "🔴 PACC muito grave (choque, ventilação, UTI)",
                            itens: [
                                "<strong>Vancomicina + ceftriaxona (ou cefotaxima) + azitromicina.</strong>",
                                "Na sazonalidade do influenza: considerar <strong>oseltamivir</strong>."
                            ],
                            remedios: ["vancomicina", "cef_resp_ev", "azi_ev"]
                        },
                        {
                            nome: "Pneumonia necrosante",
                            itens: [
                                "Antibiótico EV de amplo espectro por <strong>3–4 semanas</strong>: <strong>vancomicina + cefotaxima, ceftriaxona ou cefepima</strong>.",
                                "Se clinicamente estável: amoxicilina-clavulanato/sulbactam ou ampicilina-sulbactam EV, a critério médico, se ainda não usados neste episódio.",
                                "Abordagem cirúrgica conforme o fluxograma (abaixo)."
                            ],
                            remedios: ["vancomicina", "cef_resp_ev", "cefepime"]
                        },
                        {
                            nome: "Abscesso pulmonar",
                            itens: [
                                "Curso prolongado, em geral iniciado EV, total de <strong>3–4 semanas</strong> conforme a resposta.",
                                "Tratamento em geral <strong>conservador</strong>. VTCA ou toracotomia raramente (abscessos grandes que exigem exérese, ou muito periféricos com risco de fístula)."
                            ]
                        }
                    ]
                },
                {
                    titulo: "Doses sugeridas pela SBP (Quadro 2)",
                    icone: "📋",
                    resumo: "Tabela de referência do documento (antibióticos EV).",
                    tabela: {
                        colunas: ["Antimicrobiano", "Esquema sugerido", "Máximo / comentário"],
                        linhas: [
                            ["Ampicilina", "150–200 mg/kg/dia de 6/6 h", "12 g/dia"],
                            ["Ampicilina-sulbactam", "150–200 mg/kg/dia de ampicilina", ""],
                            ["Penicilina cristalina", "200.000–250.000 U/kg/dia de 6/6 h ou 4/4 h", "24 milhões U/dia"],
                            ["Oxacilina", "200 mg/kg/dia de 6/6 h", "12 g/dia"],
                            ["Ceftriaxona", "50–100 mg/kg/dia de 12/12 h", "4 g/dia"],
                            ["Cefotaxima", "150 mg/kg/dia de 8/8 h ou 6/6 h", "8 g/dia"],
                            ["Amicacina", "15 mg/kg/dia de 12/12 h", ""],
                            ["Amoxicilina-clavulanato", "75 mg/kg/dia de amoxicilina de 8/8 h", "1 g/dose"],
                            ["Vancomicina", "40–60 mg/kg/dia de 6/6 h ou 8/8 h", "4 g/dia"],
                            ["Ceftarolina*", "≥ 2 meses e < 2 anos: 8 mg/kg (dia, conforme o texto) · ≥ 2 e < 18 anos: até 33 kg, 12 mg de 8/8 h; > 33 kg, 400 mg de 8/8 h ou 600 mg de 12/12 h", "6/6 h ou 8/8 h"],
                            ["Linezolida", "< 12 anos: 30 mg/kg/dia de 8/8 h · ≥ 12 anos: 600 mg de 8/8 h", "600 mg/dose"],
                            ["Levofloxacino", "≥ 6 meses e < 5 anos: 20 mg/kg/dia de 12/12 h · ≥ 5 e < 16 anos: 10 mg/kg 1×/dia", "750 mg/dia"],
                            ["Azitromicina", "10 mg/kg/dia nos dias 1 e 2; 5 mg/kg/dia nos dias seguintes", "500 mg/dia"],
                            ["Metronidazol", "30 mg/kg/dia de 6/6 h", "4 g/dia"]
                        ],
                        nota: "Para prescrever, usar os cards do app (os cards podem ter esquemas próprios do serviço). *Ceftarolina: transcrito como está no documento, provável erro de digitação nas unidades (\"8 mg/kg/dia\" e \"12 mg de 8/8 h\"); conferir na bula antes de usar."
                    }
                },
                {
                    titulo: "Abordagem cirúrgica",
                    icone: "🔪",
                    resumo: "Indicações de drenagem, fibrinolíticos, VTCA e toracotomia.",
                    itens: [
                        "Adjuvante ao antibiótico. Objetivos: limpar a cavidade pleural, reduzir febre e carga bacteriana, facilitar a ação do antibiótico e permitir a reexpansão pulmonar.",
                        "<strong>Falha do tratamento da PAC:</strong> insuficiência respiratória, febre persistente, piora do estado geral após 72 h e elevação de marcadores inflamatórios.",
                        "Escolha da técnica: quadro clínico, fase da doença e experiência da equipe cirúrgica."
                    ],
                    grupos: [
                        {
                            nome: "Indicações de drenagem pleural simples",
                            itens: [
                                "Pus no espaço pleural.",
                                "Gram-positivos na coloração.",
                                "Glicose < 50 mg/dL.",
                                "DHL > 1.000 UI.",
                                "Comprometimento da função pulmonar por derrame extenso.",
                                "Septações e/ou loculações."
                            ]
                        },
                        {
                            nome: "Toracocentese e drenagem",
                            itens: [
                                "<strong>Toracocentese:</strong> diagnóstico (culturas, tipo de líquido) e esvaziamento; retirar o máximo possível. Toracocenteses seriadas são pouco usadas em crianças (mais traumáticas).",
                                "<strong>Drenagem simples:</strong> pode ser guiada por US (lojas). Selo d'água com pressão de 15–20 cmH₂O facilita a reexpansão.",
                                "Avaliar o débito a cada 24 h. <strong>Retirar o dreno</strong> com débito mínimo: <strong>40–60 mL/24 h</strong> ou < 1–1,5 mL/kg/dia."
                            ],
                            tabela: {
                                titulo: "Calibre do dreno torácico (Fr)",
                                colunas: ["Peso", "Derrame loculado", "Derrame não loculado"],
                                linhas: [
                                    ["< 3 kg", "8–10", "10–12"],
                                    ["3–8 kg", "10–12", "12–16"],
                                    ["9–15 kg", "12–16", "16–20"],
                                    ["16–40 kg", "16–20", "24–28"],
                                    ["> 40 kg", "24–28", "28–36"]
                                ],
                                nota: "Fonte: Martín et al., reproduzido no documento da SBP."
                            }
                        },
                        {
                            nome: "Fibrinolíticos pelo dreno",
                            itens: [
                                "Rompem septações. Alguns autores indicam como 1ª opção não operatória no DP complicado e no empiema.",
                                "Opções: estreptoquinase, uroquinase (mais descrita, menos alergênica e pirogênica) e alteplase.",
                                "<strong>Uroquinase:</strong> <strong>10.000 UI em 10 mL de SF 0,9%</strong> se < 1 ano; <strong>40.000 UI em 40 mL de SF 0,9%</strong> se > 1 ano.",
                                "Instilar pelo dreno e mantê-lo <strong>pinçado por 4 h</strong>, com mudanças de decúbito. Uroquinase e estreptoquinase 2×/dia; alteplase 1×/dia, por 3 dias (o ciclo pode ser repetido por mais 3 dias)."
                            ]
                        },
                        {
                            nome: "Falha da drenagem torácica",
                            itens: [
                                "Febre persistente ou em aumento após 72 h da drenagem.",
                                "Débito escasso com imagem persistente na radiografia.",
                                "Septações ou loculações persistentes na US.",
                                "Piora do quadro respiratório."
                            ]
                        },
                        {
                            nome: "Videotoracoscopia (VTCA) e toracotomia",
                            itens: [
                                "<strong>VTCA:</strong> limpeza do espaço pleural e das loculações, posicionamento do dreno, menos dor e melhor resultado estético (sucesso 83–97%). Indicada se não houver resposta à drenagem com fibrinolítico e houver febre persistente, sepse, insuficiência respiratória ou pus em fase organizada.",
                                "VTCA também (sociedades espanholas): derrame maciço com comprometimento respiratório após falha de drenagem e fibrinolítico; fístula broncopleural sem resolução com drenagem; necrose extensa.",
                                "<strong>Decorticação por toracotomia:</strong> fases mais crônicas, com material fibrótico, ou onde não há VTCA ou fibrinolítico. Cirurgia de grande porte."
                            ]
                        }
                    ]
                },
                {
                    titulo: "Pneumonia necrosante: fluxograma cirúrgico",
                    icone: "🧭",
                    resumo: "Conduta conforme empiema e extensão da necrose.",
                    itens: [
                        "O tratamento inicial deve ser <strong>clínico</strong>; cirurgia para quem piora, conforme empiema e extensão da necrose."
                    ],
                    tabela: {
                        colunas: ["Situação", "Conduta", "Se piora"],
                        linhas: [
                            ["Sem empiema e necrose pouco extensa", "Tratamento clínico; manter se melhora", "Reavaliar: surgimento de derrame + aumento das áreas de necrose"],
                            ["Associada a empiema", "Drenagem de tórax simples; manter se melhora", "Reavaliar drenagem + áreas de necrose: possível VTCA ou toracoscopia"],
                            ["Área extensa de necrose", "VTCA ou toracoscopia (conforme experiência do serviço)", "Segmentectomia, lobectomia ou pneumectomia"]
                        ],
                        nota: "Fonte: Figura 2 do documento da SBP."
                    }
                }
            ]
        },
        {
            titulo: "Prevenção",
            icone: "🛡️",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Vacinas pneumocócicas",
                    icone: "💉",
                    resumo: "VPC10 no PNI; VPC13 nos CRIE; VPC15 e VPC20.",
                    itens: [
                        "<strong>VPC10</strong> (1, 4, 5, 6B, 7F, 9V, 14, 18C, 19F, 23F): rotina do PNI desde 2010. Reduziu a mortalidade, mas houve substituição por sorotipos não vacinais (19A, 3, 6C).",
                        "<strong>VPC13</strong> (+ 3, 6A, 19A) nos CRIE a partir de 2 meses para: HIV/aids, câncer em atividade ou até a alta, transplantados de órgão sólido e de células-tronco, asplenia anatômica ou funcional, erros inatos da imunidade, fibrose cística, fístula liquórica e DVP.",
                        "<strong>VPC15</strong> (+ 22F, 33F): rede privada desde 2023. <strong>VPC20</strong> (+ 8, 10A, 11A, 12F, 15B): aprovada a partir de 6 semanas de vida.",
                        "Os sorotipos 3 e 19A estão nas vacinas 13, 15 e 20-valente; o 6C pode ter proteção cruzada pelo 6A."
                    ]
                }
            ]
        }
    ],

    fontes: [
        "Sociedade Brasileira de Pediatria. Departamentos Científicos de Pneumologia e Infectologia. Documento Científico nº 151: Pneumonias Adquiridas na Comunidade Complicadas: Atualização 2024. 29/04/2024."
    ],
    revisao: "10/2026"
});
