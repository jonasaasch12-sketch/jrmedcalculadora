// =====================================================
// CONDUTA: CETOACIDOSE DIABÉTICA (CAD) NA CRIANÇA E NO ADOLESCENTE
// Base pediátrica: Sociedade Portuguesa de Pediatria / SEDP — Protocolo de
// Cetoacidose Diabética (2019, baseado no ISPAD 2018).
// Adicionais: Diretriz SBD 2026 (só o que vale para a criança), Collett-Solberg
// (J Pediatr 2001, sistema de duas soluções), SPSP 2024 e ISPAD 2022 (DynaMed).
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
registrarConduta({
    id: "cetoacidose",
    nome: "Cetoacidose Diabética (CAD)",
    categoria: "Endócrino",
    cor: "#7c3aed",
    kw: "cetoacidose diabetica cad diabetes mellitus tipo 1 dm1 hiperglicemia cetonemia acidose insulina edema cerebral kussmaul",
    resumo: "Diagnóstico e gravidade, expansão, hidratação em 48h com potássio, insulina, duas soluções, edema cerebral e transição para insulina SC.",
    legenda: "Conduta conforme o <strong>Protocolo de CAD da Sociedade Portuguesa de Pediatria (2019, ISPAD)</strong>, com adicionais da <strong>Diretriz SBD 2026</strong>, do <strong>J Pediatr 2001 (duas soluções)</strong>, da <strong>SPSP 2024</strong> e do <strong>ISPAD 2022</strong>.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",
                    icone: "🔎",
                    resumo: "Hiperglicemia + acidose + cetose, ao mesmo tempo.",
                    itens: [
                        "A CAD é definida pela presença <strong>simultânea</strong> de:",
                        "<strong>Glicemia > 200 mg/dL</strong>;",
                        "<strong>pH venoso < 7,3</strong> e/ou <strong>bicarbonato < 15 mEq/L</strong> (ISPAD 2022: bicarbonato < 18);",
                        "<strong>Cetonemia ≥ 3 mmol/L</strong> (beta-hidroxibutirato) ou, na impossibilidade, <strong>cetonúria ≥ 2+</strong>.",
                        "<strong>Cetonemia capilar é preferível à cetonúria</strong> (mais acurada para o diagnóstico e o seguimento). Cetonemia de 1,5 a 3 mmol/L: risco aumentado, confirmar com gasometria e ânion gap (> 12).",
                        "A glicemia pode ser < 200 mg/dL (CAD euglicêmica), principalmente em quem já usa insulina.",
                        "A CAD é a apresentação de ~25% dos diagnósticos de DM1 na criança."
                    ],
                    tabela: {
                        titulo: "CAD × estado hiperglicêmico hiperosmolar (EHH)",
                        colunas: ["Parâmetro", "CAD", "EHH", "Misto CAD/EHH"],
                        linhas: [
                            ["Glicose", "≥ 200 mg/dL", "> 600 mg/dL", "≥ 600 mg/dL"],
                            ["pH venoso", "< 7,3", "> 7,3", "≤ 7,3"],
                            ["Bicarbonato", "< 18 mEq/L", "≥ 15 mEq/L", "< 18 mEq/L"],
                            ["Cetonas", "BOHB ≥ 3 mmol/L ou cetonúria ≥ 2+", "BOHB < 3 ou cetonúria < 2+", "BOHB ≥ 3 ou cetonúria ≥ 2+"],
                            ["Osmolalidade", "Variável", "> 320 mOsm/kg", "> 320 mOsm/kg"],
                            ["Ânion gap", "> 16 mEq/L", "Variável", "Variável"],
                            ["Consciência", "Geralmente alerta; pode alterar", "Confusão, letargia e convulsões são comuns", "Alteração comum; risco de confusão grave e convulsões"]
                        ],
                        nota: "BOHB: beta-hidroxibutirato. Fonte: ISPAD 2022 (Pediatr Diabetes 2022;23(7):835), via DynaMed."
                    }
                },
                {
                    titulo: "Quadro clínico",
                    icone: "🩺",
                    resumo: "Os 4 P, desidratação, Kussmaul, hálito cetônico e dor abdominal.",
                    itens: [
                        "<strong>Poliúria</strong>, noctúria, enurese, candidíase perineal; <strong>polidipsia</strong>, polifagia e <strong>perda de peso</strong> (semanas a meses antes).",
                        "Astenia, fadiga muscular.",
                        "<strong>Desidratação</strong>, taquicardia; choque nos casos extremos.",
                        "Taquipneia, <strong>hálito cetônico (frutado)</strong>, <strong>respiração de Kussmaul</strong>.",
                        "Náuseas, vômitos, <strong>dor abdominal</strong> (pode imitar abdome agudo/apendicite: examinar com cuidado).",
                        "Visão turva, letargia, confusão, obnubilação progressiva, coma.",
                        "A desidratação clínica é difícil de estimar na CAD (desidratação hiperosmolar): na prática, considerar 5 a 7% na moderada e 7 a 10% na grave."
                    ]
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🔀",
                    resumo: "Outras acidoses, pneumonia, intoxicações, abdome agudo.",
                    itens: [
                        "Outras acidoses metabólicas (acidose lática, cetose de jejum) e acidose respiratória.",
                        "Desconforto respiratório, <strong>pneumonia</strong>.",
                        "Hipocalemia.",
                        "<strong>Intoxicações:</strong> salicilatos, paracetamol, etanol, metanol, etilenoglicol.",
                        "<strong>Abdome agudo</strong>, gastroenterite.",
                        "Encefalopatia."
                    ]
                },
                {
                    titulo: "Fatores de risco e desencadeantes",
                    icone: "⚠️",
                    resumo: "Criança pequena no diagnóstico; adolescente com omissão de insulina.",
                    grupos: [
                        {
                            nome: "CAD na abertura do diabetes",
                            itens: [
                                "Criança pequena (<strong>principalmente < 2 anos</strong>).",
                                "Sem familiares de 1º grau com DM1; menor acesso à saúde; <strong>atraso no diagnóstico</strong>."
                            ]
                        },
                        {
                            nome: "CAD em quem já tem DM1",
                            itens: [
                                "<strong>Omissão de insulina</strong> (causa mais comum), mau controle, CAD prévia.",
                                "Adolescentes, transtorno alimentar, uso de álcool, família instável.",
                                "<strong>Infecções</strong> (aumentam a resistência à insulina; a falta de apetite pode mascarar a CAD sem glicemia alta).",
                                "Obstrução ou falha da bomba de insulina (sistema de infusão contínua).",
                                "Medicamentos: corticoide, entre outros."
                            ]
                        }
                    ]
                },
                {
                    titulo: "Exames e cálculos",
                    icone: "🧪",
                    resumo: "Gasometria, eletrólitos, osmolaridade, Na corrigido e ânion gap.",
                    itens: [
                        "<strong>Na chegada:</strong> glicemia e cetonemia capilares, gasometria venosa com eletrólitos, <strong>ECG contínuo</strong> (onda T: potássio).",
                        "<strong>Sangue:</strong> glicose; Na, K, Cl, Ca, fósforo e magnésio; ureia e creatinina; osmolaridade; hemograma (leucocitose pode ser só estresse); HbA1c.",
                        "<strong>Suspeita de infecção:</strong> EAS, culturas, swab de orofaringe, radiografia de tórax.",
                        "<strong>K da gasometria não substitui o K plasmático.</strong> Na 1ª hora o pH venoso pode piorar (lavagem do lactato com a hidratação).",
                        "<strong>Cetonúria não serve para acompanhar o tratamento</strong> (pode parecer persistente por horas a dias)."
                    ],
                    tabelas: [
                        {
                            titulo: "Cálculos",
                            colunas: ["Cálculo", "Fórmula", "Normal"],
                            linhas: [
                                ["Osmolaridade efetiva", "2 x Na + glicose/18", "275 a 295 mOsm/kg (na CAD: 300 a 350)"],
                                ["Osmolaridade total", "2 x Na + glicose/18 + ureia/2,8", ""],
                                ["Na corrigido", "Na + 1,6 x [(glicose − 100)/100] (glicose > 400: usar 2,4). SPP: fator 2", "135 a 145"],
                                ["Ânion gap", "Na − (Cl + HCO₃)", "12 ± 2 mEq/L"],
                                ["Hipercloremia", "Cl : Na > 0,79", ""]
                            ]
                        },
                        {
                            titulo: "O que se espera durante a correção",
                            colunas: ["Parâmetro", "Variação esperada"],
                            linhas: [
                                ["Glicemia", "Cair 35 a 90 mg/dL/h (após as 2 primeiras horas, não mais que 50 a 90 mg/dL/h)"],
                                ["Na", "Subir 0,5 a 1 mEq/L/h (0,5 para cada 18 mg/dL de queda da glicemia)"],
                                ["Cetonemia", "Cair 0,5 mmol/L/h"],
                                ["Bicarbonato", "Subir ~3 mEq/L/h"]
                            ],
                            nota: "Na que não sobe (ou sobe rápido demais) com a queda da glicemia pode indicar edema cerebral."
                        }
                    ]
                },
                {
                    titulo: "Escala de Glasgow pediátrica",
                    icone: "🧠",
                    resumo: "Toque nas respostas: soma automática. ≤ 13: UTI.",
                    escore: {
                        id: "glasgow_cad",
                        instrucao: "Toque na melhor resposta de cada item (vale para > 1 ano / ≤ 1 ano).",
                        itens: [
                            { nome: "Abertura ocular", opcoes: [[4, "Espontânea"], [3, "Ao chamado"], [2, "À dor"], [1, "Sem resposta"]] },
                            { nome: "Resposta verbal", opcoes: [[5, "Orientada / sorri, balbucia"], [4, "Confusa / choro consolável"], [3, "Palavras inapropriadas / choro persistente"], [2, "Sons incompreensíveis / agitação, gemido"], [1, "Sem resposta"]] },
                            { nome: "Resposta motora", opcoes: [[6, "Obedece / movimentos espontâneos"], [5, "Localiza a dor / retira ao toque"], [4, "Retirada à dor"], [3, "Flexão anormal (decorticação)"], [2, "Extensão anormal (descerebração)"], [1, "Sem resposta"]] }
                        ],
                        faixas: [
                            { min: 14, max: 15, rotulo: "Comprometimento leve", cor: "#16a34a", texto: "Reavaliar a consciência no mínimo de 1/1h." },
                            { min: 13, max: 13, rotulo: "Comprometimento leve: indicar UTI", cor: "#d97706", texto: "Glasgow ≤ 13: transferir para UTI pediátrica." },
                            { min: 9, max: 12, rotulo: "Comprometimento moderado: UTI", cor: "#dc2626", texto: "Transferir para UTI pediátrica. Pensar em edema cerebral." },
                            { min: 3, max: 8, rotulo: "Comprometimento grave: UTI + via aérea", cor: "#7f1d1d", texto: "Proteger a via aérea e esvaziar o estômago (SNG). Evitar intubar se possível; se intubar, não hiperventilar (pCO₂ > 35)." }
                        ],
                        nota: "Fonte: Tabela 2 do Protocolo da SPP (13 a 15 leve, 9 a 12 moderado, ≤ 8 grave; ≤ 13 = UTI)."
                    }
                },
                {
                    titulo: "Gravidade da CAD e critérios de UTI",
                    icone: "📊",
                    aberta: true,
                    resumo: "Toque no pH e/ou no bicarbonato: vale o pior.",
                    escore: {
                        id: "gravidade_cad",
                        unidade: "gravidade",
                        checklist: true,
                        instrucao: "Toque no pH venoso e/ou no bicarbonato (basta um; vale o pior).",
                        itens: [
                            { nome: "pH venoso", opcoes: [[0, "≥ 7,30", "—"], [1, "7,20 a 7,29", "L"], [2, "7,10 a 7,19", "M"], [3, "< 7,10", "G"]] },
                            { nome: "Bicarbonato (mEq/L)", opcoes: [[0, "≥ 15", "—"], [1, "10 a 14,9", "L"], [2, "5 a 9,9", "M"], [3, "< 5", "G"]] }
                        ],
                        classificar: (valores) => {
                            let g = Math.max(...valores);
                            if (g === 3) return { num: "G", rotulo: "CAD GRAVE", cor: "#dc2626", texto: "Desidratação ~7 a 10%. Indicação de UTI pediátrica." };
                            if (g === 2) return { num: "M", rotulo: "CAD MODERADA", cor: "#d97706", texto: "Desidratação ~5 a 7%. Tratamento EV com monitorização de 1/1h." };
                            if (g === 1) return { num: "L", rotulo: "CAD LEVE", cor: "#16a34a", texto: "Se tolera via oral e sem vômitos: pode ser insulina SC + hidratação oral, com monitorização." };
                            return { num: "—", rotulo: "Sem critério de acidose", cor: "#64748b", texto: "pH ≥ 7,30 e bicarbonato ≥ 15: não preenche o critério de CAD." };
                        },
                        nota: "Fonte: SPP 2019 / ISPAD (leve: pH < 7,3 ou HCO₃ < 15; moderada: pH < 7,2 ou HCO₃ < 10; grave: pH < 7,1 ou HCO₃ < 5)."
                    },
                    grupos: [
                        {
                            nome: "🏥 Critérios para UTI pediátrica",
                            itens: [
                                "Choque ou instabilidade hemodinâmica.",
                                "Alteração do estado de consciência (Glasgow ≤ 13).",
                                "CAD grave.",
                                "Tempo de evolução prolongado.",
                                "Risco aumentado de edema cerebral: <strong>≤ 5 anos</strong>, pCO₂ muito baixa, ureia muito alta.",
                                "Tratar num centro com experiência em CAD pediátrica; se não for possível, contatar um centro de referência e transferir após estabilizar."
                            ]
                        },
                        {
                            nome: "⚠️ Indicadores de risco de complicação (J Pediatr 2001)",
                            itens: [
                                "Alteração do estado mental; pH arterial < 7,1; glicose > 1.000 mg/dL; Na > 155; K < 3,5.",
                                "Idade < 5 anos, especialmente < 1 ano; Na corrigido que não sobe com o tratamento."
                            ]
                        }
                    ]
                }
            ]
        },
        {
            titulo: "Condução na emergência / hospitalar",
            icone: "🚨",
            cor: "#dc2626",
            secoes: [
                {
                    titulo: "Abordagem inicial e expansão",
                    icone: "🚑",
                    aberta: true,
                    resumo: "ABC do PALS, 2 acessos, SF 0,9% 10 mL/kg em 1h (choque: 10 a 20 mL/kg).",
                    alerta: true,
                    itens: [
                        "<strong>Avaliação imediata (PALS):</strong> sinais vitais e SatO₂ contínuos, <strong>peso atual</strong> (não o informado), grau de desidratação, Glasgow, glicemia e cetonemia capilares, gasometria com eletrólitos, ECG contínuo, sinais de infecção.",
                        "<strong>A — Via aérea:</strong> Glasgow ≤ 8: proteger a via aérea e esvaziar o estômago (SNG). Evitar intubar (a subida da pCO₂ piora o pH do líquor e o risco de edema cerebral).",
                        "<strong>B — Respiração:</strong> inconsciente, insuficiência respiratória ou choque: O₂ a 100% por máscara de alto fluxo.",
                        "<strong>C — Circulação:</strong> <strong>2 acessos venosos periféricos</strong>. <strong>Sem choque: SF 0,9% 10 mL/kg em 60 min.</strong> <strong>Choque: 10 a 20 mL/kg em 30 a 60 min</strong> (hipoperfusão grave: 15 a 30 min). Reavaliar e repetir se preciso. <strong>Não passar de 30 mL/kg.</strong>",
                        "<strong>D — Neurológico:</strong> Glasgow (≤ 13: UTI). Cefaleia + alteração da consciência: pensar já em edema cerebral. Inconsciente: sondagem vesical.",
                        "<strong>E — Exposição:</strong> procurar infecção e tratar com antibiótico quando indicado.",
                        "Bomba de insulina (infusão SC contínua): <strong>retirar</strong>.",
                        "<strong>Insulina só depois de pelo menos 1 hora de expansão.</strong>"
                    ],
                    remedios: ["cad_expansao"]
                },
                {
                    titulo: "Hidratação em 48h e potássio",
                    icone: "💧",
                    aberta: true,
                    resumo: "(Déficit + 2 x manutenção − expansão) ÷ 48h, com 40 mEq/L de K.",
                    itens: [
                        "Corrigir a desidratação em <strong>24 a 48 horas</strong> (72h se edema cerebral), junto com a manutenção. Soro: <strong>SF 0,9%</strong> (ou NaCl 0,45% ou Ringer lactato, conforme o Na e a osmolaridade).",
                        "<strong>Déficit (mL) = % desidratação x peso x 10.</strong> <strong>Total por hora = (déficit + 2 x manutenção − expansão) ÷ 48.</strong>",
                        "Total de líquidos <strong>até 1,5 a 2 x a manutenção</strong>. Obeso: peso ideal para sexo e estatura. Descontar o que o paciente beber; <strong>não repor a diurese</strong>.",
                        "Na baixo ou que não sobe com a queda da glicemia: aumentar o sódio do soro. Muito SF pode causar <strong>acidose hiperclorêmica</strong> (Cl:Na > 0,79): trocar por Ringer lactato.",
                        "<strong>Na corrigido ≥ 150</strong> (SBD): considerar NaCl 0,45%.",
                        "SPSP 2024: manutenção de 1.500 a 2.000 mL/m²/dia (Holliday-Segar)."
                    ],
                    tabelas: [
                        {
                            titulo: "Potássio: quando começar (pelo K inicial)",
                            colunas: ["K inicial", "Conduta"],
                            linhas: [
                                ["< 4,5 mEq/L", "Iniciar <strong>imediatamente</strong> (40 mEq/L no soro)"],
                                ["4,5 a 5,4 mEq/L", "Iniciar <strong>junto com a insulina</strong>"],
                                ["≥ 5,5 mEq/L", "Só <strong>após diurese</strong> e K < 5,5"]
                            ],
                            nota: "<strong>Dose:</strong> 40 mEq/L no soro (SPP: metade KCl + metade fosfato de potássio, se disponível); 20 mEq/L se a velocidade for ≥ 10 mL/kg/h; <strong>máximo 0,5 mEq/kg/h</strong>. Déficit corporal de K: 3 a 6 mEq/kg. Insuficiência renal: não repor de rotina. <strong>Hipocalemia grave:</strong> repor mais rápido e só começar a insulina com K > 2,5 (SPP); a SBD e o card de insulina usam K ≥ 3,3. SPSP 2024: 60 mEq/L se K < 3,5. ECG ajuda: hipocalemia (T achatada, onda U, QT longo); hipercalemia (T apiculada)."
                        }
                    ],
                    remedios: ["cad_hidratacao"]
                },
                {
                    titulo: "Insulina em infusão contínua",
                    icone: "💉",
                    aberta: true,
                    resumo: "0,05 a 0,1 U/kg/h após 1h de expansão. Nunca fazer bolus.",
                    itens: [
                        "<strong>Iniciar após pelo menos 1 hora de expansão</strong> (e com K adequado).",
                        "<strong>Dose: 0,05 a 0,1 U/kg/h</strong> de insulina regular EV em BIC. <strong>Bolus de insulina: contraindicação absoluta</strong> na criança (edema cerebral, choque, hipocalemia).",
                        "Preparo da SPP: insulina regular 50 U em 50 mL de SF 0,9% (1 U = 1 mL), em equipo separado (pode ir em Y com o soro). Trocar a solução e o equipo a cada 24h. O card do app usa 50 U em 500 mL (0,1 U/mL).",
                        "<strong>Manter a dose até resolver a CAD.</strong> Se a glicemia chegar a ≤ 300 mg/dL ou cair mais de 90 mg/dL/h: <strong>não reduzir a insulina, aumentar a glicose do soro</strong> (SPP).",
                        "pH, cetonemia, bicarbonato e ânion gap não melhoram: rever a dose, o tempo de preparo da solução, o equipo e o acesso, e pensar em infecção.",
                        "SBD (adultos): glicemia não cai 50 a 70 mg/dL na 1ª hora → checar o acesso; desprezar os primeiros 10% da solução (adsorção no equipo).",
                        "CAD leve com tolerância oral: insulina SC + hidratação oral (SPP); sem melhora, passar para o tratamento EV."
                    ],
                    remedios: ["insulina_cad"]
                },
                {
                    titulo: "Glicose no soro (sistema de duas soluções)",
                    icone: "🍬",
                    resumo: "Ajustar a proporção entre soro sem e com glicose pela glicemia de 1/1h.",
                    itens: [
                        "Ao iniciar a insulina, o soro passa a ter <strong>glicose a 5%</strong> (SPP). Se a CAD não resolveu e a glicemia ≤ 300 mg/dL ou cai > 90 mg/dL/h: subir para 7,5%, 10% ou 12,5%.",
                        "<strong>Sistema de duas soluções:</strong> uma sem glicose e outra com SG 10 a 12,5%, as duas com o mesmo sódio e potássio, correndo em Y. A velocidade total não muda; só muda a proporção entre elas conforme a glicemia. Permite ajustar a glicose na hora, sem preparar soro novo.",
                        "Queda da glicemia: até 50 mg/dL/h após as 2 primeiras horas e até 600 mg/dL nas primeiras 6 horas (J Pediatr 2001).",
                        "Glicemia já corrigida mas acidose persistente: <strong>aumentar a glicose (até 12,5% ou mais com acesso central)</strong> e manter a insulina."
                    ],
                    tabelas: [
                        {
                            titulo: "Proporção entre as duas soluções (J Pediatr 2001)",
                            colunas: ["Glicemia atual<br>(inicial > 800)", "Glicemia atual<br>(inicial < 800)", "Sem glicose", "Com glicose"],
                            linhas: [
                                ["> 500", "> 350", "100%", "0"],
                                ["401 a 500", "301 a 350", "75%", "25%"],
                                ["301 a 400", "251 a 300", "50%", "50%"],
                                ["201 a 300", "201 a 250", "25%", "75%"],
                                ["< 200", "< 200", "0", "100%"]
                            ],
                            nota: "Exemplo: 120 mL/h no total e 50% de cada = 60 mL/h de cada solução. Os valores podem variar entre serviços."
                        },
                        {
                            titulo: "Preparos de soro glicosado (SPP)",
                            colunas: ["Solução", "Preparo para 500 mL"],
                            linhas: [
                                ["SG 7,5% em SF", "450 mL de SG 5% em SF + 50 mL de SG 30%"],
                                ["SG 10% em SF", "400 mL de SG 5% em SF + 100 mL de SG 30% (ou 478 mL de SG 10% + 22 mL de NaCl 20%)"],
                                ["SG 12,5% em SF", "350 mL de SG 5% em SF + 150 mL de SG 30%"],
                                ["SG 5% em Ringer lactato", "417 mL de RL + 83 mL de SG 30%"],
                                ["SG 10% em Ringer lactato", "334 mL de RL + 166 mL de SG 30%"]
                            ]
                        }
                    ]
                },
                {
                    titulo: "Monitorização",
                    icone: "📈",
                    resumo: "Sinais vitais, Glasgow, glicemia e balanço de 1/1h; eletrólitos de 2/2h.",
                    itens: [
                        "<strong>De 1/1h:</strong> PA, FC, FR, SatO₂, ECG (onda T), Glasgow e sinais neurológicos, glicemia capilar, balanço hídrico, soro e velocidade, insulina.",
                        "<strong>De 2/2h:</strong> cetonemia capilar, gasometria (pH, bicarbonato), Na, K, Cl, glicose, osmolaridade e ânion gap.",
                        "<strong>De 4/4h:</strong> fósforo, cálcio e magnésio. <strong>De 6/6h:</strong> ureia, creatinina e hemograma (se alterados).",
                        "Em perfusão periférica ruim, medir a glicemia no sangue venoso ou arterial, não no capilar.",
                        "Registrar tudo em folha própria, hora a hora."
                    ]
                },
                {
                    titulo: "Bicarbonato e fosfato",
                    icone: "⚗️",
                    resumo: "Não usar de rotina. Bicarbonato só se pH < 6,9.",
                    itens: [
                        "<strong>Bicarbonato não é recomendado</strong> (hipocalemia, acidose paradoxal do líquor, edema cerebral). Exceção: <strong>pH venoso < 6,9</strong> ou hipercalemia com risco de vida e disfunção cardíaca: <strong>1 a 2 mEq/kg EV em 60 min, em UTI</strong>.",
                        "<strong>Fosfato:</strong> não repor de rotina (risco de hipocalcemia). Repor se fósforo < 2,5 mg/dL com sintomas (encefalopatia, disfunção miocárdica, insuficiência respiratória, fraqueza muscular, disfagia, íleo), como fosfato de potássio, monitorando o cálcio."
                    ],
                    remedios: ["cad_bicarbonato"]
                },
                {
                    titulo: "Edema cerebral",
                    icone: "🧠",
                    alerta: true,
                    resumo: "Primeiras 12h. Tratar na suspeita: manitol ou NaCl 3%, sem esperar tomografia.",
                    itens: [
                        "Complicação mais temida (1 a 3% das CAD, > 30% das mortes). Surge geralmente <strong>nas primeiras 12 horas</strong> do tratamento (pode ser antes ou após 24 a 48h).",
                        "<strong>Fatores de risco:</strong> idade ≤ 5 anos; diabetes de início; sintomas por muito tempo; pCO₂ muito baixa; ureia alta; pH inicial < 7,1; uso de bicarbonato; > 50 mL/kg de líquido nas primeiras 4h; queda rápida da osmolaridade ou do Na corrigido; insulina na 1ª hora.",
                        "<strong>Sinais:</strong> cefaleia que surge ou piora após o início do tratamento; vômitos persistentes; irritabilidade, confusão, incontinência; paralisia de nervos cranianos, anisocoria, papiledema; <strong>tríade de Cushing</strong> (hipertensão, bradicardia, bradipneia); queda da saturação; Na que não sobe ou sobe rápido demais.",
                        "Nos pacientes de risco: deixar a solução hipertônica <strong>com a dose calculada à beira do leito</strong>."
                    ],
                    escore: {
                        id: "edema_cad",
                        unidade: "critérios",
                        checklist: true,
                        instrucao: "Toque nos critérios presentes (não contar sinais que existiam antes do tratamento).",
                        itens: [
                            { nome: "Critérios diagnósticos", opcoes: [[100, "Resposta anormal (motora ou verbal) à dor", "D"]] },
                            { nome: "", opcoes: [[100, "Postura de decorticação ou descerebração", "D"]] },
                            { nome: "", opcoes: [[100, "Paralisia de nervo craniano (principalmente III, IV e VI)", "D"]] },
                            { nome: "", opcoes: [[100, "Padrão respiratório neurogênico (gemido, taquipneia, Cheyne-Stokes, apneia)", "D"]] },
                            { nome: "Critérios maiores", opcoes: [[10, "Alteração do estado mental, confusão, consciência flutuante", "M"]] },
                            { nome: "", opcoes: [[10, "Queda sustentada da FC (> 20 bpm), sem outra explicação", "M"]] },
                            { nome: "", opcoes: [[10, "Incontinência inapropriada para a idade", "M"]] },
                            { nome: "Critérios menores", opcoes: [[1, "Vômitos", "m"]] },
                            { nome: "", opcoes: [[1, "Cefaleia", "m"]] },
                            { nome: "", opcoes: [[1, "Letargia ou prostração", "m"]] },
                            { nome: "", opcoes: [[1, "PA diastólica > 90 mmHg", "m"]] },
                            { nome: "", opcoes: [[1, "Idade < 5 anos", "m"]] }
                        ],
                        classificar: (valores) => {
                            let d = valores.filter(v => v === 100).length, M = valores.filter(v => v === 10).length, m = valores.filter(v => v === 1).length;
                            if (d >= 1 || M >= 2 || (M >= 1 && m >= 2))
                                return { num: valores.length, rotulo: "EDEMA CEREBRAL: TRATAR AGORA", cor: "#dc2626", texto: "Manitol ou NaCl 3% já, cabeceira a 30°, hidratação a 1/3 e UTI. Não esperar a tomografia." };
                            return { num: valores.length, rotulo: "Ainda sem critério", cor: "#d97706", texto: "Diagnóstico: 1 critério diagnóstico, ou 2 maiores, ou 1 maior + 2 menores. Manter vigilância de 1/1h." };
                        },
                        nota: "Fonte: Protocolo da SPP (critérios de Muir). Diagnóstico clínico: não precisa de imagem para tratar."
                    },
                    grupos: [
                        {
                            nome: "Tratamento",
                            itens: [
                                "<strong>Cabeceira a 30°</strong>, cabeça na linha média.",
                                "<strong>Manitol 0,5 a 1 g/kg EV em 15 min</strong> (pode repetir após 30 min) <strong>ou NaCl 3% 2,5 a 5 mL/kg em 15 min</strong> (alternativa ou 2ª linha). A SBD e o J Pediatr 2001 citam manitol 0,25 a 0,5 g/kg.",
                                "<strong>Reduzir a hidratação para 1/3</strong>, mantendo a PA normal; corrigir o déficit em 72h.",
                                "Sondagem vesical.",
                                "Insuficiência respiratória: intubar <strong>sem hiperventilar</strong> (pCO₂ > 35 mmHg).",
                                "Após estabilizar: considerar tomografia de crânio (hemorragia, trombose, isquemia). <strong>Transferir para UTI.</strong>"
                            ],
                            remedios: ["cad_manitol", "cad_nacl3"]
                        }
                    ]
                },
                {
                    titulo: "Hipoglicemia e outras complicações",
                    icone: "🩸",
                    resumo: "Hipoglicemia: aumentar a glicose, não desligar a insulina.",
                    itens: [
                        "<strong>Hipoglicemia (< 60 mg/dL) sem sintomas:</strong> aumentar a glicose infundida em 25% (J Pediatr 2001).",
                        "<strong>Inconsciente ou convulsionando:</strong> glicose 25% 1 a 2 mL/kg EV, e depois aumentar a glicose do soro em 25%. Acidose já corrigida: pode reduzir a insulina em 25%.",
                        "<strong>Outras complicações:</strong> hipocalemia, hipofosfatemia, hipocalcemia, hipomagnesemia, acidose hiperclorêmica; trombose venosa e de seios venosos, AVC; sepse, pneumonia aspirativa, SDRA; pneumotórax e pneumomediastino; rabdomiólise, isquemia intestinal, pancreatite, insuficiência renal aguda."
                    ],
                    remedios: ["glicose_pals"]
                }
            ]
        },
        {
            titulo: "Resolução, transição e manutenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Resolução e transição para insulina SC",
                    icone: "✅",
                    aberta: true,
                    resumo: "pH > 7,30, HCO₃ > 15, cetonemia < 1 e via oral: passar para insulina SC.",
                    itens: [
                        "<strong>CAD resolvida:</strong> pH > 7,30, bicarbonato > 15 mEq/L e cetonemia < 1 mmol/L, com tolerância oral. Então: suspender o soro e planejar a insulina SC intensiva.",
                        "<strong>Melhor momento: antes de uma refeição.</strong> Fazer a insulina rápida SC (correção + refeição) e <strong>desligar a insulina EV 15 a 30 min depois</strong>. Se for a hora da insulina basal, fazer também.",
                        "Já usava insulina: retomar a dose prévia (50% basal e 50% bolus) ou recolocar a bomba de insulina.",
                        "Diabetes novo: dose diária total de <strong>0,5 a 0,6 U/kg/dia (pré-púbere)</strong> ou <strong>0,7 a 1 U/kg/dia (púbere)</strong>: 50% basal (glargina/detemir, 1 vez ao dia: de manhã se < 5 anos, à noite se ≥ 5 anos) e 50% rápida antes das refeições.",
                        "Glicemia capilar antes das refeições e às 3h da madrugada; corrigir com insulina rápida."
                    ],
                    tabela: {
                        titulo: "Exemplo da SPP: 6 anos, 22 kg, glicemia 240, lanche com 36 g de carboidrato",
                        colunas: ["Passo", "Cálculo"],
                        linhas: [
                            ["Dose diária total", "0,6 U/kg x 22 = 13 U"],
                            ["Basal (50%)", "6,5 U à noite"],
                            ["Fator de sensibilidade", "1800 ÷ 13 = 138 mg/dL por unidade"],
                            ["Razão insulina:carboidrato", "500 ÷ 13 = 38,5 g por unidade"],
                            ["Bolus de correção", "(240 − 120) ÷ 138 = 0,87 U"],
                            ["Bolus da refeição", "36 ÷ 38,5 = 0,9 U"],
                            ["Total antes do lanche", "1,8 U ≈ 2 U de insulina rápida"]
                        ]
                    },
                    remedios: ["cad_insulina_sc"]
                },
                {
                    titulo: "Exames do diabetes de início",
                    icone: "🧾",
                    resumo: "Autoanticorpos, peptídeo C, lipídios, tireoide e doença celíaca.",
                    itens: [
                        "Anticorpos anti-insulina, anti-GAD, anti-ZnT8 (conforme disponibilidade).",
                        "Peptídeo C.",
                        "Colesterol total, LDL, HDL e triglicerídeos.",
                        "TSH, T4 livre, anti-tireoglobulina e anti-TPO.",
                        "IgA total, antitransglutaminase IgA e antiendomísio IgA."
                    ]
                },
                {
                    titulo: "Prevenção de nova CAD",
                    icone: "🛡️",
                    resumo: "Educação da família, cetonas nas doenças intercorrentes, não omitir insulina.",
                    itens: [
                        "Quase toda CAD em quem já tem diabetes pode ser evitada com acompanhamento regular.",
                        "<strong>Dias de doença (infecção):</strong> monitorar mais a glicemia e as <strong>cetonas</strong>; nunca suspender a insulina; procurar atendimento se vômitos, dor abdominal, respiração rápida ou cetonas altas.",
                        "Atenção à <strong>omissão de insulina</strong> em adolescentes, transtorno alimentar e família com dificuldades: apoio psicológico e social.",
                        "Usuários de bomba de insulina: saber reconhecer obstrução ou falha do sistema.",
                        "Reconhecer cedo os sintomas (poliúria, polidipsia, perda de peso) em crianças sem diagnóstico: o atraso é o principal fator de gravidade."
                    ]
                }
            ]
        }
    ],

    fontes: [
        "Sociedade Portuguesa de Pediatria / Sociedade de Endocrinologia e Diabetologia Pediátrica — Grupo de Trabalho de Diabetes Mellitus. Cetoacidose Diabética (protocolo, 20/05/2019), baseado no ISPAD 2018.",
        "Sociedade Brasileira de Diabetes. Diretriz SBD 2026: Diagnóstico e tratamento da cetoacidose diabética (rev. 13/08/2026). Usada só a parte aplicável à criança.",
        "Collett-Solberg PF. Cetoacidose diabética em crianças: revisão da fisiopatologia e tratamento com o uso do método de duas soluções salinas. J Pediatr (Rio J) 2001;77(1):9-16.",
        "SPSP — Anais do congresso: Tratamento de emergência da cetoacidose diabética em crianças (10/04/2024).",
        "ISPAD Clinical Practice Consensus Guidelines 2022 (Pediatr Diabetes 2022;23(7):835) e Am Fam Physician 2024;110(5):476, via DynaMed: Tabela de achados na CAD, EHH e estado misto."
    ],
    revisao: "10/2026"
});
