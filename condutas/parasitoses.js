// =====================================================
// CONDUTA: PARASITOSES INTESTINAIS (HELMINTOS E PROTOZOÁRIOS)
// Base: SBP — Guia Prático de Atualização nº 7 (novembro/2020), Departamentos
// Científicos de Gastroenterologia e Infectologia: "Parasitoses intestinais:
// diagnóstico e tratamento".
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
registrarConduta({
    id: "parasitoses",
    nome: "Parasitoses Intestinais",
    categoria: "Gastrointestinal",
    cor: "#65a30d",
    kw: "parasitoses intestinais verminose vermes helmintos protozoarios ascaris lombriga oxiuro enterobius giardia ameba amebiase estrongiloides ancilostomo tenia solitaria tricuris himenolepis criptosporidio albendazol mebendazol nitazoxanida ivermectina",
    resumo: "Helmintos e protozoários: quando suspeitar, exames, tratamento por parasita (clicável) e complicações graves.",
    legenda: "Conduta conforme o <strong>Guia Prático de Atualização nº 7 da SBP (2020): Parasitoses intestinais — diagnóstico e tratamento</strong>.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico: quando suspeitar",
                    icone: "🔎",
                    resumo: "Sintomas digestivos, anemia, eosinofilia, prurido anal, desnutrição, vermes vistos.",
                    itens: [
                        "<strong>Helmintos:</strong> Ascaris (ascaridíase), ancilostomídeos (ancilostomíase), Strongyloides (estrongiloidíase), Enterobius (oxiuríase), Trichuris (tricuríase), Taenia (teníase), Hymenolepis nana (himenolepíase).",
                        "<strong>Protozoários:</strong> Giardia, Entamoeba histolytica/dispar (amebíase), Cryptosporidium, Cystoisospora (Isospora), Cyclospora, Balantidium, Blastocystis.",
                        "<strong>Quando pensar:</strong> dor abdominal, náuseas, vômitos, distensão, diarreia aguda ou arrastada, disenteria, má absorção e perda de peso, anemia ferropriva, eosinofilia, prurido anal noturno, eliminação de vermes ou proglotes, tosse com sibilância e eosinofilia (síndrome de Löeffler).",
                        "Muitas infecções são <strong>assintomáticas</strong>; os quadros graves aparecem em cargas altas, desnutridos e imunodeprimidos."
                    ]
                },
                {
                    titulo: "Quadro clínico por parasita",
                    icone: "🦠",
                    resumo: "O que cada parasita costuma causar.",
                    tabela: {
                        colunas: ["Parasita", "Principais manifestações"],
                        linhas: [
                            ["Ascaris", "Pneumonite larvária (Löeffler); desnutrição; <strong>suboclusão/obstrução intestinal</strong>; migração: apendicite, pancreatite, colangite, abscesso hepático, asfixia"],
                            ["Ancilostomídeos", "Dermatite larvária; dor epigástrica; <strong>anemia ferropriva</strong> crônica, hipoproteinemia e edema"],
                            ["Strongyloides", "Dor epigástrica (pseudo-úlcera), má absorção; <strong>hiperinfecção/disseminação em imunossuprimidos ou em uso de corticoide</strong> (sepse, meningite por gram-negativos)"],
                            ["Trichuris", "Geralmente leve; <strong>tricuríase maciça</strong>: disenteria crônica, tenesmo, anemia, desnutrição, prolapso retal"],
                            ["Enterobius (oxiúro)", "<strong>Prurido anal noturno</strong> intenso, insônia; vulvovaginite em meninas"],
                            ["Taenia", "Geralmente assintomática; eliminação de proglotes. <strong>T. solium</strong>: risco de cisticercose/neurocisticercose"],
                            ["Hymenolepis nana", "Assintomática ou cólicas e diarreia crônica (autoinfestação)"],
                            ["Giardia", "Diarreia aguda ou arrastada, dispepsia, <strong>má absorção</strong> semelhante à doença celíaca, déficit de crescimento"],
                            ["E. histolytica", "Assintomática; colite não disentérica; <strong>disenteria amebiana</strong>; colite necrosante; ameboma; <strong>abscesso hepático</strong>"],
                            ["Cryptosporidium / Isospora / Cyclospora", "Diarreia aquosa autolimitada no imunocompetente; <strong>grave e prolongada no imunodeprimido</strong> (AIDS)"]
                        ]
                    }
                },
                {
                    titulo: "Exames",
                    icone: "🧪",
                    resumo: "Parasitológico em pelo menos 3 amostras; Graham no prurido anal; eosinofilia sugere helminto.",
                    itens: [
                        "<strong>Parasitológico de fezes (PPF):</strong> pelo menos <strong>3 amostras em 10 dias</strong> (eliminação intermitente). Amostra fresca, idealmente no laboratório em até 1 hora.",
                        "<strong>Fita adesiva (Graham):</strong> oxiúro e Taenia; colher em <strong>3 manhãs seguidas</strong>, ao acordar e antes da higiene.",
                        "<strong>Hemograma:</strong> eosinofilia (> 600/mm³ ou > 6%) sugere helminto. Giardíase <strong>não</strong> causa eosinofilia. Ancilostomíase maciça: Hb ≤ 5 g/dL e ferritina baixa.",
                        "<strong>Protozoários:</strong> Giardia — antígeno nas fezes (ELISA/imunofluorescência, 90 a 100%); E. histolytica — antígeno nas fezes (ELISA) ou PCR distinguem da E. dispar; Cryptosporidium — pedir pesquisa específica (não entra no PPF de rotina); Isospora e Cyclospora — coloração de Kinyoun.",
                        "<strong>Strongyloides:</strong> PPF seriado (até 7 amostras), cultura de larvas (Baermann-Morais, Rugai), sorologia.",
                        "<strong>Ascaridíase complicada:</strong> RX de abdome (níveis hidroaéreos, imagem em \"feixe de charuto\"), ultrassom (vermes nas vias biliares)."
                    ],
                    tabela: {
                        titulo: "Principais métodos de parasitológico",
                        colunas: ["Método", "Indicação principal"],
                        linhas: [
                            ["Hoffman, Pons e Janer (Lutz)", "Ovos e larvas de helmintos, cistos de protozoários"],
                            ["Blagg (MIFC), Ritchie, Coprotest", "Ovos e larvas de helmintos, cistos e oocistos"],
                            ["Willis / Faust", "Ovos leves (ancilostomídeos); Faust: cistos de protozoários"],
                            ["Baermann-Morais / Rugai", "Larvas de Strongyloides"],
                            ["Kato-Katz", "Contagem de ovos de helmintos"],
                            ["Graham (fita adesiva)", "Enterobius e Taenia"]
                        ]
                    }
                },
                {
                    titulo: "Sinais de gravidade (procurar sempre)",
                    icone: "🚨",
                    aberta: true,
                    alerta: true,
                    resumo: "Obstrução por áscaris, migração biliar, hiperinfecção por Strongyloides, disenteria/abscesso amebiano.",
                    itens: [
                        "<strong>Suboclusão/obstrução por áscaris:</strong> cólica, distensão, vômitos biliosos, desidratação, eliminação de vermes pela boca/nariz/ânus, massa cilíndrica palpável, RHA ausentes.",
                        "<strong>Migração do áscaris:</strong> apendicite, pancreatite, colangite, abscesso hepático, obstrução de via aérea.",
                        "<strong>Hiperinfecção por Strongyloides:</strong> imunossuprimido ou em corticoide com sintomas intestinais, respiratórios e <strong>sepse ou meningite</strong> por enterobactérias.",
                        "<strong>Amebíase invasiva:</strong> disenteria com mais de 10 evacuações/dia, febre, toxemia, peritonite (colite necrosante); febre e dor no hipocôndrio direito (abscesso hepático).",
                        "<strong>Tricuríase maciça:</strong> disenteria crônica, anemia, prolapso retal.",
                        "<strong>Anemia grave</strong> (ancilostomíase) e <strong>desidratação</strong> (giardíase, criptosporidiose)."
                    ]
                }
            ]
        },
        {
            titulo: "Condução na emergência: complicações",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Para os casos graves. O tratamento comum do parasita está no bloco 🏠.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    aberta: true,
                    resumo: "Reconhecer a complicação e seguir o passo correspondente.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Avaliar:</strong> hidratação, abdome, sinais de obstrução, sepse e imunossupressão",
                        "<span class=\"cond-passo\">2</span> <strong>Suboclusão por áscaris:</strong> jejum, hidratação EV, SNG, óleo mineral; <strong>sem ascaricida</strong> na fase aguda",
                        "<span class=\"cond-passo\">3</span> <strong>Áscaris biliar/pancreático:</strong> jejum, hidratação, antibiótico, analgesia; colangite = drenagem urgente",
                        "<span class=\"cond-passo\">4</span> <strong>Hiperinfecção por Strongyloides:</strong> reduzir imunossupressão + ivermectina diária",
                        "<span class=\"cond-passo\">5</span> <strong>Amebíase invasiva:</strong> metronidazol 10 dias e, depois, amebicida intraluminal"
                    ]
                },
                {
                    passo: 1,
                    titulo: "Avaliar a gravidade",
                    aberta: true,
                    resumo: "Hidratação, abdome, sepse e uso de imunossupressores.",
                    itens: [
                        "Avaliar <strong>hidratação</strong> (conduta de diarreia), estado nutricional e anemia.",
                        "Abdome: distensão, massa, RHA, peritonite. Pedir <strong>RX de abdome</strong> e <strong>ultrassom</strong> se suspeita de obstrução ou migração.",
                        "Perguntar sempre por <strong>corticoide</strong>, quimioterapia, transplante, HIV, desnutrição grave.",
                        "Hemograma, eletrólitos; hemocultura se febre/toxemia."
                    ]
                },
                {
                    passo: 2,
                    titulo: "Suboclusão ou obstrução intestinal por áscaris",
                    aberta: true,
                    resumo: "Conservador 48 a 72h: hidratação EV, SNG e óleo mineral. Cirurgia se não resolver.",
                    itens: [
                        "<strong>Suboclusão:</strong> jejum, <strong>hidratação venosa</strong> e <strong>sonda nasogástrica</strong> aberta por 48 a 72 horas.",
                        "<strong>Óleo mineral 15 a 30 mL a cada 2 horas</strong> (lubrifica e facilita a eliminação dos vermes).",
                        "<strong>Evitar ascaricida nesta fase:</strong> a morte maciça dos vermes libera toxinas (inflamação, paralisia, necrose, perfuração). A piperazina foi retirada do mercado (ANVISA, 1999).",
                        "Sem resolução: <strong>enema com salina hipertônica</strong> ou <strong>gastrografina</strong> 15 a 30 mL (diluir em 3 vezes o volume de água em RN e lactentes; 2 vezes nas crianças).",
                        "<strong>Cirurgia</strong> se sangramento retal, toxemia ou falha do tratamento clínico (ordenha do bolo de vermes para o cólon; volvo: enterotomia).",
                        "Tratar o áscaris (albendazol ou mebendazol) <strong>depois da resolução</strong> do quadro agudo."
                    ],
                    remedios: ["oleo_mineral"]
                },
                {
                    passo: 3,
                    titulo: "Áscaris nas vias biliares ou no pâncreas",
                    resumo: "Clínico primeiro; anti-helmíntico após a remissão.",
                    itens: [
                        "<strong>Cólica biliar, colecistite, pancreatite:</strong> jejum, hidratação, antibiótico e analgesia; anti-helmíntico após a remissão dos sintomas agudos.",
                        "<strong>Colangite aguda:</strong> grave; descompressão e drenagem biliar <strong>urgentes</strong> (endoscópica ou cirúrgica). CPRE pode remover os vermes.",
                        "<strong>Abscesso hepático:</strong> aspiração guiada por ultrassom + antibiótico, analgesia e anti-helmíntico."
                    ]
                },
                {
                    passo: 4,
                    titulo: "Hiperinfecção / estrongiloidíase disseminada",
                    alerta: true,
                    resumo: "Reduzir a imunossupressão e ivermectina diária até exames negativos.",
                    itens: [
                        "Suspender ou reduzir a imunossupressão, se possível.",
                        "<strong>Ivermectina 200 mcg/kg/dia VO</strong> por 2 semanas, até fezes e/ou escarro negativos (pode associar albendazol).",
                        "Tratar a sepse ou meningite por enterobactérias associada.",
                        "Sem via oral possível (íleo, obstrução, má absorção): relatos de uso retal.",
                        "<strong>Prevenção:</strong> antes de corticoide em dose alta ou prolongado, rastrear e tratar Strongyloides com ivermectina."
                    ],
                    remedios: ["pele_iver"],
                    nota: "O card de ivermectina do app é o de escabiose (dose por faixa de peso). Segurança não estabelecida em < 15 kg; tomar em jejum, com água."
                },
                {
                    passo: 5,
                    titulo: "Amebíase invasiva (disenteria, colite, abscesso hepático)",
                    resumo: "Metronidazol por 10 dias, sempre seguido de amebicida intraluminal.",
                    itens: [
                        "<strong>Metronidazol 35 a 50 mg/kg/dia em 3 doses por 10 dias</strong> (ou tinidazol ≥ 3 anos 50 mg/kg dose única; ou secnidazol 30 mg/kg dose única).",
                        "<strong>Depois, sempre:</strong> amebicida intraluminal — <strong>etofamida 500 mg 2x/dia por 3 dias</strong> ou <strong>teclosan 100 mg 3x/dia por 5 dias</strong>.",
                        "Abscesso hepático grande, sem resposta ou com risco de ruptura: aspiração percutânea ou cirúrgica.",
                        "Colite necrosante: suporte intensivo (choque, distúrbios metabólicos); risco de perfuração.",
                        "Exame de fezes de controle após o tratamento."
                    ],
                    remedios: ["metro_parasitas"]
                }
            ]
        },
        {
            titulo: "Ambulatório: tratamento e prevenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Tratamento por parasita",
                    icone: "💊",
                    aberta: true,
                    resumo: "Toque no parasita: aparece o tratamento de 1ª e 2ª linha (SBP).",
                    escore: {
                        id: "parasita_trat",
                        unidade: "parasita",
                        checklist: true,
                        instrucao: "Toque no parasita identificado.",
                        itens: [
                            { nome: "Helmintos", opcoes: [[1, "Ascaridíase", "1"], [2, "Tricuríase", "2"], [3, "Ancilostomíase", "3"], [4, "Estrongiloidíase", "4"], [5, "Enterobíase (oxiúro)", "5"], [6, "Teníase", "6"], [7, "Himenolepíase", "7"], [8, "Toxocaríase", "8"]] },
                            { nome: "Protozoários", opcoes: [[9, "Giardíase", "9"], [10, "Amebíase assintomática", "10"], [11, "Amebíase sintomática / extraintestinal", "11"], [12, "Criptosporidiose", "12"], [13, "Isosporíase / Ciclosporose", "13"], [14, "Balantidíase", "14"], [15, "Blastocystis", "15"]] }
                        ],
                        classificar: (v) => {
                            const T = {
                                1: ["Ascaridíase", "1ª: albendazol 400 mg dose única (200 mg se < 2 anos) OU mebendazol 100 mg 1x/dia por 3 dias. 2ª: ivermectina 150-200 mcg/kg dose única; pamoato de pirantel 11 mg/kg (máx 1 g) 1x/dia por 3 dias; nitazoxanida 7,5 mg/kg/dose (máx 500 mg) 2x/dia por 3 dias."],
                                2: ["Tricuríase", "1ª: albendazol 400 mg 1x/dia por 3-7 dias OU mebendazol 100 mg 1x/dia por 3-7 dias. 2ª: ivermectina 200 mcg/kg por 3 dias (sinergismo com albendazol); nitazoxanida. Tricuríase maciça: tratar 3 vezes, com intervalo de 15 dias."],
                                3: ["Ancilostomíase", "1ª: albendazol 400 mg dose única (200 mg se < 2 anos) OU mebendazol 100 mg 1x/dia por 3 dias. 2ª: pamoato de pirantel 11 mg/kg (máx 1 g) 1x/dia por 3 dias; nitazoxanida. Tratar a anemia."],
                                4: ["Estrongiloidíase", "1ª: ivermectina 200 mcg/kg VO por 2 dias (hiperinfecção: 7-14 dias após a depuração). 2ª: albendazol 400 mg 2x/dia por 10-14 dias; tiabendazol 25 mg/kg 2x/dia por 3 dias; nitazoxanida. Controle de fezes em 2-4 semanas se sintomas persistirem."],
                                5: ["Enterobíase (oxiúro)", "1ª: albendazol 400 mg dose única OU mebendazol 100 mg dose única; REPETIR em 2 semanas. 2ª: pamoato de pirantel 11 mg/kg (máx 1 g) 1x/dia por 3 dias; nitazoxanida. Tratar todos da casa; unhas curtas; lavar roupas de cama em água quente."],
                                6: ["Teníase", "1ª: praziquantel 5-10 mg/kg dose única (cautela se houver cisticercose). 2ª: niclosamida 50 mg/kg (máx 2 g) dose única; nitazoxanida. Fezes por 3 dias após (proglotes) e controle em 1 e 3 meses."],
                                7: ["Himenolepíase", "1ª: praziquantel 25 mg/kg dose única (repetir a cada 20 dias se persistir). 2ª: niclosamida 11-34 kg: 1 g, depois 500 mg/dia por 6 dias; > 34 kg: 1,5 g, depois 1 g/dia por 6 dias; nitazoxanida."],
                                8: ["Toxocaríase", "Albendazol 400 mg 2x/dia por 5 dias. Ocular: 400-800 mg 2x/dia por 28 dias; pode precisar de corticoide."],
                                9: ["Giardíase", "Metronidazol 15 mg/kg/dia em 3 doses por 5-7 dias; OU albendazol 400 mg/dia por 5 dias; OU tinidazol (≥ 3 anos) 50 mg/kg dose única; OU secnidazol 30 mg/kg dose única; OU nitazoxanida (≥ 1 ano) 7,5 mg/kg/dose 2x/dia por 3 dias. Portador assintomático: não tratar (exceto imunodeficiência no domicílio)."],
                                10: ["Amebíase assintomática (cistos)", "Só amebicida intraluminal: etofamida 500 mg 2x/dia por 3 dias OU teclosan 100 mg 3x/dia por 5 dias. Metronidazol não age nos cistos."],
                                11: ["Amebíase sintomática / extraintestinal", "Metronidazol 35-50 mg/kg/dia em 3 doses por 10 dias (500-750 mg 3x/dia) OU tinidazol (≥ 3 anos) 50 mg/kg ou 2 g dose única OU secnidazol 30 mg/kg ou 2 g dose única; SEMPRE seguido de etofamida ou teclosan."],
                                12: ["Criptosporidiose", "Imunocompetente: geralmente sem tratamento. Nitazoxanida por 3 dias (3-14 dias): 1-3 anos 100 mg 2x/dia; 4-11 anos 200 mg 2x/dia; ≥ 12 anos 500 mg 2x/dia (ou 7,5 mg/kg 2x/dia). HIV: terapia antirretroviral."],
                                13: ["Isosporíase / Ciclosporose", "Sulfametoxazol-trimetoprim 8-10 mg/kg/dia de TMP em 2 doses por 7-10 dias (imunocomprometido: mais tempo)."],
                                14: ["Balantidíase", "Tetraciclina (≥ 8 anos) 40 mg/kg/dia em 4 doses por 10 dias; OU metronidazol 35-50 mg/kg/dia em 3 doses por 5 dias; OU nitazoxanida (dose da criptosporidiose)."],
                                15: ["Blastocystis", "Indicação de tratar não estabelecida; se sintomas persistentes: metronidazol 35-50 mg/kg/dia em 3 doses por 10 dias OU nitazoxanida; tinidazol (≥ 3 anos) 50 mg/kg dose única."]
                            };
                            const esc = v.filter(c => T[c]).map(c => T[c]);
                            if (!esc.length) return { num: "?", rotulo: "Toque no parasita", cor: "#64748b", texto: "" };
                            if (esc.length === 1) return { num: "💊", rotulo: esc[0][0], cor: "#16a34a", texto: esc[0][1] };
                            return { num: "💊", rotulo: esc.map(t => t[0]).join(" + "), cor: "#16a34a", texto: esc.map(t => t[0].toUpperCase() + ": " + t[1]).join(" ▪ ") };
                        },
                        nota: "Fonte: Tabelas 4 e 5 do Guia Prático nº 7 da SBP (2020). Albendazol: tomar com alimento. Ivermectina: em jejum, com água; segurança não estabelecida em < 15 kg e na gestação."
                    },
                    remedios: ["tgi_alben", "tgi_meben", "nitazoxanida", "metro_parasitas", "pele_iver", "smx_tmp"]
                },
                {
                    titulo: "Observações sobre os medicamentos",
                    icone: "ℹ️",
                    resumo: "Albendazol, mebendazol, nitazoxanida e ivermectina.",
                    itens: [
                        "<strong>Albendazol:</strong> absorvido e distribuído nos tecidos; escolha para larvas de Toxocara e cisticercos e para a maioria dos helmintos intestinais.",
                        "<strong>Mebendazol:</strong> pouco absorvido; 1ª linha em dose única só para ascaridíase e enterobíase. Cursos prolongados para tricuríase e ancilostomíase.",
                        "<strong>Nitazoxanida:</strong> aprovada pela ANVISA a partir de 12 meses; age em vários helmintos e protozoários.",
                        "<strong>Ivermectina:</strong> 1ª linha na estrongiloidíase.",
                        "Albendazol e mebendazol podem causar dor abdominal transitória, náusea ou diarreia em crianças com carga alta.",
                        "Os cards de albendazol e mebendazol do app seguem o esquema próprio (dose única repetida em 14 dias)."
                    ]
                },
                {
                    titulo: "Seguimento e controle de cura",
                    icone: "🔁",
                    resumo: "Teníase, estrongiloidíase e amebíase pedem exame de controle.",
                    itens: [
                        "<strong>Teníase:</strong> fezes por 3 dias após o tratamento (proglotes) e controle de ovos em 1 e 3 meses.",
                        "<strong>Estrongiloidíase:</strong> exame de controle 2 a 4 semanas após, se sintomas persistentes; retratar se recidiva.",
                        "<strong>Amebíase:</strong> exame de fezes de controle após o término.",
                        "<strong>Giardíase recorrente:</strong> reinfecção, imunossupressão, tratamento insuficiente ou resistência; usar droga de outra classe.",
                        "<strong>Enterobíase:</strong> reinfecção é comum; tratar todos da casa acima de 6 meses."
                    ]
                },
                {
                    titulo: "Prevenção e orientações",
                    icone: "🛡️",
                    resumo: "Higiene das mãos, água tratada, alimentos lavados, carne bem cozida.",
                    itens: [
                        "Lavar as mãos com água e sabão após usar o banheiro, trocar fraldas e antes de manusear alimentos.",
                        "Lavar frutas e verduras; água tratada ou fervida; saneamento básico.",
                        "Não comer carne crua ou mal cozida; evitar contato com terra contaminada (andar calçado).",
                        "<strong>Oxiúro:</strong> unhas curtas, não coçar, lavar roupas de cama e pessoais em água quente.",
                        "<strong>Creche (giardíase):</strong> afastar a criança até que as fezes fiquem contidas na fralda ou que a frequência das evacuações não passe do dobro do habitual; em surtos, acionar a vigilância.",
                        "O Brasil saiu da situação endêmica de helmintíases em 2016: não há indicação de tratamento em massa; tratamento individualizado."
                    ]
                }
            ]
        }
    ],

    fontes: [
        "Sociedade Brasileira de Pediatria — Departamentos Científicos de Gastroenterologia e de Infectologia. Guia Prático de Atualização nº 7: Parasitoses intestinais — diagnóstico e tratamento (novembro de 2020)."
    ],
    revisao: "10/2026"
});
