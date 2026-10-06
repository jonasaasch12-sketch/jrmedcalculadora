// =====================================================
// CONDUTA: CETOACIDOSE DIABÉTICA (CAD) NA CRIANÇA E NO ADOLESCENTE
// Base pediátrica: Sociedade Portuguesa de Pediatria / SEDP — Protocolo de
// Cetoacidose Diabética (2019, baseado no ISPAD 2018).
// Adicionais: UTI pediátrica do IMIP (2018), Diretriz SBD 2026 (só o que vale para a criança), Collett-Solberg
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
    legenda: "Conduta conforme o <strong>Protocolo de CAD da Sociedade Portuguesa de Pediatria (2019, ISPAD)</strong>, com adicionais da <strong>UTI pediátrica do IMIP (2018)</strong>, da <strong>Diretriz SBD 2026</strong>, do <strong>J Pediatr 2001 (duas soluções)</strong>, da <strong>SPSP 2024</strong> e do <strong>ISPAD 2022</strong>.",

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
                        "<strong>Na chegada:</strong> HGT e cetonemia capilar, gasometria venosa com eletrólitos, <strong>ECG contínuo</strong> (onda T: potássio).",
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
            titulo: "Condução na emergência: passo a passo",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Siga na ordem. Os passos 1 a 7 acontecem nas primeiras horas.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    aberta: true,
                    resumo: "Toda a condução numa olhada. Os detalhes estão em cada passo abaixo.",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Chegada (0 min):</strong> Monitor, ABC, pesar, <strong>2 acessos</strong> e <strong>colher os exames</strong>",
                        "<span class=\"cond-passo\">2</span> <strong>0 a 1 h:</strong> <strong>Expansão:</strong> SF 0,9% 10 mL/kg em 1h (choque: 10 a 20 mL/kg). <strong>Ainda sem insulina</strong>",
                        "<span class=\"cond-passo\">3</span> <strong>Saiu o K:</strong> Decidir <strong>quando começar o potássio</strong>. Insulina só com <strong>K ≥ 3,3</strong>",
                        "<span class=\"cond-passo\">4</span> <strong>A partir da 2ª hora:</strong> <strong>Hidratação de 48h</strong> com a <strong>solução padrão A/B</strong> (só B no início; card calcula o mL/h)",
                        "<span class=\"cond-passo\">5</span> <strong>Após 1 h de expansão:</strong> <strong>Insulina regular EV contínua</strong>: < 5 anos 0,05 U/kg/h; ≥ 5 anos 0,1 U/kg/h (máx 10 U/h). <strong>Nunca bolus</strong>",
                        "<span class=\"cond-passo\">6</span> <strong>HGT ≤ 300:</strong> <strong>Colocar glicose no soro</strong>: 5% = ½ A + ½ B. Não diminuir a insulina",
                        "<span class=\"cond-passo\">7</span> <strong>De 1/1h e 2/2h:</strong> HGT, sinais vitais e Glasgow 1/1h; gasometria, eletrólitos e cetonemia 2/2h",
                        "<span class=\"cond-passo\">8</span> <strong>CAD resolvida:</strong> pH > 7,30, HCO₃ > 15, cetonemia < 1 e aceitando VO: <strong>insulina SC</strong>",
                        "⚠️ <strong>A qualquer hora:</strong> Cefaleia, vômitos, sonolência, bradicardia: <strong>edema cerebral</strong>. HGT < 60: <strong>hipoglicemia</strong>"
                    ],
                    lista: "passos"
                },
                {
                    passo: 1,
                    titulo: "Chegada: estabilizar e pedir os exames",
                    aberta: true,
                    resumo: "Minuto 0. Monitor, ABC, peso, 2 acessos e exames.",
                    itens: [
                        "<strong>Monitorizar:</strong> FC, FR, PA, SatO₂ e <strong>ECG contínuo</strong> (onda T mostra o potássio).",
                        "<strong>A — Via aérea:</strong> Glasgow ≤ 8: proteger a via aérea e passar SNG. Evitar intubar; se intubar, não hiperventilar (pCO₂ > 35).",
                        "<strong>B — Respiração:</strong> choque, inconsciente ou insuficiência respiratória: O₂ a 100% por máscara.",
                        "<strong>C — Circulação:</strong> <strong>2 acessos venosos periféricos</strong> (um para soro/insulina, outro para coletas).",
                        "<strong>D — Neurológico:</strong> Glasgow (escala no bloco 🔎). ≤ 13: UTI. Inconsciente: sonda vesical.",
                        "<strong>Pesar a criança</strong> (peso atual, não o informado). Obeso: usar o peso ideal.",
                        "Usa bomba de insulina: <strong>retirar</strong>.",
                        "Marcar a <strong>gravidade</strong> (pH/bicarbonato) no bloco 🔎: grave ou choque → UTI."
                    ],
                    tabela: {
                        titulo: "🧪 Exames para pedir na chegada",
                        colunas: ["Exame", "Para quê"],
                        linhas: [
                            ["HGT (glicemia capilar)", "Confirmar; depois de 1/1h"],
                            ["Cetonemia capilar (beta-hidroxibutirato)", "Confirmar (≥ 3 mmol/L); depois de 2/2h"],
                            ["Gasometria venosa", "pH e bicarbonato: gravidade"],
                            ["Na, K, Cl", "K decide o passo 3; Na corrigido e ânion gap"],
                            ["Glicose sérica, ureia e creatinina", "Osmolaridade e função renal"],
                            ["Cálcio, fósforo e magnésio", "Basal (para eventual reposição)"],
                            ["Hemograma", "Infecção (leucocitose pode ser só estresse)"],
                            ["HbA1c", "Controle prévio / diabetes de início"],
                            ["Se suspeita de infecção", "EAS, urocultura, hemocultura, RX de tórax, swab de orofaringe"]
                        ],
                        nota: "Fórmulas (Na corrigido, osmolaridade, ânion gap) e o que se espera da correção: seção 🧪 Exames e cálculos, no bloco 🔎. K da gasometria não substitui o K do sangue."
                    }
                },
                {
                    passo: 2,
                    titulo: "0 a 1 hora: expansão (ainda sem insulina)",
                    aberta: true,
                    resumo: "SF 0,9% 10 mL/kg em 1h. Choque: 10 a 20 mL/kg. Máximo 30 mL/kg.",
                    itens: [
                        "<strong>Sem choque:</strong> SF 0,9% <strong>10 mL/kg em 60 minutos</strong>.",
                        "<strong>Com choque:</strong> SF 0,9% <strong>10 a 20 mL/kg em 30 a 60 minutos</strong> (hipoperfusão grave: em 15 a 30 min). Reavaliar e repetir se preciso.",
                        "<strong>Não passar de 30 mL/kg</strong> no total. <strong>Anotar o volume dado</strong>: ele é descontado no passo 4.",
                        "❌ <strong>Não iniciar insulina nesta 1ª hora.</strong> ❌ <strong>Não dar bicarbonato.</strong>"
                    ],
                    remedios: ["cad_expansao"]
                },
                {
                    passo: 3,
                    titulo: "Saiu o potássio: decidir quando repor",
                    aberta: true,
                    resumo: "O K do exame decide quando o potássio entra no soro.",
                    tabela: {
                        colunas: ["K do exame", "O que fazer"],
                        linhas: [
                            ["< 3,0 mEq/L", "<strong>KCl no soro já</strong> + <strong>correção rápida</strong> 0,3 a 0,5 mEq/kg/h em 2 a 4h (card KCl EV). <strong>Adiar a insulina</strong> até K ≥ 3,3"],
                            ["3,0 a 3,2 mEq/L", "<strong>KCl no soro já</strong> (40 mEq/L). <strong>Adiar a insulina</strong> até K ≥ 3,3"],
                            ["3,3 a 4,4 mEq/L", "<strong>KCl no soro já</strong> (40 mEq/L)"],
                            ["4,5 a 5,4 mEq/L", "KCl no soro <strong>junto com o início da insulina</strong>"],
                            ["≥ 5,5 mEq/L", "Sem K por enquanto (A e B <strong>sem KCl</strong>). Só <strong>após diurese</strong> e K < 5,5"]
                        ],
                        nota: "<strong>Dose:</strong> 40 mEq/L no soro = KCl 19,1% 4 mL em cada solução A e B (20 mEq/L = 2 mL, se a velocidade for ≥ 10 mL/kg/h). <strong>Máximo: 0,5 mEq/kg/h.</strong> Sem diurese ou insuficiência renal: não repor. Sem resultado ainda? O ECG ajuda: T achatada, onda U, QT longo = K baixo; T apiculada = K alto. Fonte: SPP; K mínimo de 3,3 para a insulina e correção rápida com K < 3,0: IMIP 2018 (igual à SBD). SPSP 2024: 60 mEq/L se K < 3,5."
                    },
                    remedios: ["kcl_ev"]
                },
                {
                    passo: 4,
                    titulo: "A partir da 2ª hora: hidratação de 48h com potássio",
                    aberta: true,
                    resumo: "O card calcula o mL/h por % de desidratação. Descontar a expansão.",
                    itens: [
                        "<strong>Escolher a desidratação:</strong> CAD moderada <strong>5 a 7%</strong>; CAD grave <strong>7 a 10%</strong>.",
                        "<strong>Velocidade (mL/h) = (déficit + 2 x manutenção − expansão) ÷ 48.</strong> Déficit = % x peso x 10. O card abaixo já faz a conta.",
                        "<strong>Soro: solução padrão do IMIP em Y</strong> (K 40 mEq/L, Na 136 mEq/L). <strong>A:</strong> SG 10% 250 mL + NaCl 20% 10 mL + KCl 19,1% 4 mL. <strong>B:</strong> AD 250 mL + NaCl 20% 10 mL + KCl 19,1% 4 mL. <strong>Sem glicose: correr só a B</strong> no volume total; a glicose entra no passo 6.",
                        "<strong>Não repor a diurese.</strong> Descontar o que beber. Total de até 2 x a manutenção.",
                        "Na que não sobe enquanto a glicemia cai: aumentar o sódio do soro e vigiar edema cerebral."
                    ],
                    remedios: ["cad_hidratacao"]
                },
                {
                    passo: 5,
                    titulo: "Após 1 hora de expansão: insulina contínua",
                    aberta: true,
                    resumo: "< 5 anos 0,05 U/kg/h; ≥ 5 anos 0,1 U/kg/h (máx 10 U/h). Nunca bolus.",
                    itens: [
                        "<strong>Conferir antes:</strong> já passou 1 hora de expansão? <strong>K ≥ 3,3</strong> (passo 3)?",
                        "<strong>Insulina regular EV contínua</strong> em bomba de infusão, equipo próprio (pode ir em Y com o soro): <strong>< 5 anos: 0,05 U/kg/h</strong>; <strong>≥ 5 anos: 0,1 U/kg/h</strong>. <strong>Máximo 10 U/h</strong> (IMIP).",
                        "❌ <strong>Bolus de insulina é proibido</strong> na criança (edema cerebral, choque, hipocalemia).",
                        "<strong>HGT < 300 com acidose: NÃO diminuir a insulina</strong>, acrescentar glicose ao soro (passo 6). Não desligar até a CAD resolver.",
                        "<strong>HGT não cai 60 mg/dL/h ou acidose corrigindo muito devagar:</strong> checar acesso, equipo e preparo e <strong>aumentar para 0,15 a 0,2 U/kg/h</strong>.",
                        "Acidose parcialmente compensada, ainda sem critério de suspensão: <strong>0,05 U/kg/h + glicose</strong>.",
                        "<strong>CAD leve</strong>, sem vômitos e aceitando VO: pode ser insulina SC + hidratação oral; sem melhora, voltar para este esquema."
                    ],
                    nota: "<strong>Preparo (IMIP):</strong> insulina regular 100 U/mL 1 mL + SF 0,9% 100 mL (1 U/mL: 0,05 a 0,1 mL/kg/h). Desprezar 50 mL no equipo. Trocar o frasco de 6/6h.",
                    remedios: ["insulina_cad"]
                },
                {
                    passo: 6,
                    titulo: "HGT caiu: colocar glicose no soro",
                    aberta: true,
                    resumo: "HGT ≤ 300 ou queda > 90/h: glicose pela proporção A/B. Não diminuir a insulina.",
                    itens: [
                        "<strong>Gatilho (SPP):</strong> HGT <strong>≤ 300 mg/dL</strong> ou queda <strong>> 90 mg/dL/h</strong>.",
                        "<strong>Começar com glicose a 5%</strong> = metade solução A + metade solução B. A <strong>velocidade total do passo 4 não muda</strong>: só a proporção entre A e B.",
                        "CAD ainda não resolvida e HGT continua ≤ 300 ou caindo > 90 mg/dL/h: <strong>subir para 7,5%</strong> (¾ A + ¼ B) e depois <strong>10%</strong> (só A).",
                        "HGT normal mas <strong>acidose ainda presente</strong>: aumentar a glicose e <strong>manter a insulina</strong> (SPP admite até 12,5%).",
                        "O card do passo 4 já mostra os mL/h de A e de B para cada concentração."
                    ],
                    tabela: {
                        titulo: "Solução padrão do IMIP (em Y): K 40 mEq/L, Na 136 mEq/L",
                        colunas: ["Glicose final", "Solução A", "Solução B"],
                        linhas: [
                            ["0% (sem glicose)", "—", "Todo o volume"],
                            ["2,5%", "¼", "¾"],
                            ["5%", "½", "½"],
                            ["7,5%", "¾", "¼"],
                            ["10%", "Todo o volume", "—"]
                        ],
                        nota: "<strong>A:</strong> SG 10% 250 mL + NaCl 20% 10 mL + KCl 19,1% 4 mL. <strong>B:</strong> AD 250 mL + NaCl 20% 10 mL + KCl 19,1% 4 mL. K ≥ 5,5: preparar sem o KCl. Se precisar de 12,5% (SPP): SG 5% em SF 350 mL + SG 30% 150 mL."
                    },
                    remedios: ["cad_hidratacao"]
                },
                {
                    passo: 7,
                    titulo: "De hora em hora: monitorizar e reavaliar",
                    aberta: true,
                    resumo: "O que checar, quando, e o que fazer se não melhorar.",
                    tabela: {
                        colunas: ["Quando", "O que checar"],
                        linhas: [
                            ["1/1h", "PA, FC, FR, SatO₂, ECG, <strong>Glasgow e sinais neurológicos</strong>, <strong>HGT</strong>, balanço hídrico, soro e insulina (velocidades)"],
                            ["2/2h", "Gasometria (pH, HCO₃), Na, K, Cl, glicose, osmolaridade, ânion gap, cetonemia capilar"],
                            ["4/4h", "Fósforo, cálcio e magnésio"],
                            ["6/6h", "Ureia, creatinina e hemograma (se alterados)"]
                        ],
                        nota: "Esperado: HGT −35 a 90 mg/dL/h; cetonemia −0,5 mmol/L/h; HCO₃ +3 mEq/L/h; Na subindo 0,5 a 1 mEq/L/h. Perfusão ruim: glicemia venosa ou arterial, não capilar."
                    },
                    grupos: [
                        {
                            nome: "Não está melhorando? (pH, cetonemia, HCO₃ e ânion gap parados)",
                            itens: [
                                "Rever a <strong>insulina</strong>: dose, preparo (há quanto tempo), equipo, acesso venoso.",
                                "Rever a <strong>hidratação</strong> e se precisa de nova expansão.",
                                "Procurar <strong>infecção</strong> (sepse).",
                                "Fosfato < 2,5 mg/dL com sintomas: repor fosfato de potássio, vigiando o cálcio. Não repor de rotina."
                            ]
                        },
                        {
                            nome: "Bicarbonato: só se pH ≤ 6,9",
                            itens: [
                                "<strong>Não é rotina</strong> (piora o K e aumenta o risco de edema cerebral).",
                                "Só com <strong>pH ≤ 6,9</strong> (SPP) ou hipercalemia grave com disfunção cardíaca, em UTI.",
                                "<strong>Dose (IMIP) = (12 − HCO₃ encontrado) x 0,3 x peso.</strong> Fazer <strong>metade da dose em 2 horas</strong>, diluído <strong>1:5 em AD</strong>. Repetir a gasometria ao final."
                            ],
                            remedios: ["cad_bicarbonato"]
                        }
                    ]
                },
                {
                    passo: 8,
                    titulo: "CAD resolvida: passar para insulina SC",
                    resumo: "pH > 7,30, HCO₃ > 15, cetonemia < 1 e aceitando a via oral.",
                    itens: [
                        "<strong>Critérios:</strong> pH > 7,30, bicarbonato > 15 mEq/L, cetonemia < 1 mmol/L e aceitando a via oral.",
                        "Suspender o soro e fazer a <strong>insulina SC antes de uma refeição</strong>; <strong>desligar a insulina EV 15 a 30 min depois</strong>.",
                        "Doses e cálculo: seção ✅ <strong>Resolução e transição para insulina SC</strong>, no bloco 🏠 abaixo."
                    ]
                },
                {
                    titulo: "A qualquer momento: edema cerebral",
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
                    titulo: "A qualquer momento: hipoglicemia e outras complicações",
                    icone: "🩸",
                    alerta: true,
                    resumo: "HGT < 60: aumentar a glicose. Não desligar a insulina.",
                    itens: [
                        "<strong>HGT < 60 mg/dL sem sintomas:</strong> aumentar a glicose infundida em 25% (J Pediatr 2001).",
                        "<strong>Inconsciente ou convulsionando:</strong> glicose 25% 1 a 2 mL/kg EV e depois aumentar a glicose do soro em 25%. Acidose já corrigida: pode reduzir a insulina em 25%.",
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
                        "HGT antes das refeições e às 3h da madrugada; corrigir com insulina rápida."
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
        "UTI Pediátrica — IMIP. Protocolo de Cetoacidose Diabética (2018): dose da insulina, solução padrão em Y, potássio e fórmula do bicarbonato.",
        "Sociedade Brasileira de Diabetes. Diretriz SBD 2026: Diagnóstico e tratamento da cetoacidose diabética (rev. 13/08/2026). Usada só a parte aplicável à criança.",
        "Collett-Solberg PF. Cetoacidose diabética em crianças: revisão da fisiopatologia e tratamento com o uso do método de duas soluções salinas. J Pediatr (Rio J) 2001;77(1):9-16.",
        "SPSP — Anais do congresso: Tratamento de emergência da cetoacidose diabética em crianças (10/04/2024).",
        "ISPAD Clinical Practice Consensus Guidelines 2022 (Pediatr Diabetes 2022;23(7):835) e Am Fam Physician 2024;110(5):476, via DynaMed: Tabela de achados na CAD, EHH e estado misto."
    ],
    revisao: "10/2026"
});
