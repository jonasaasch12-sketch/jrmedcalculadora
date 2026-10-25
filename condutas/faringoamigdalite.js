// =====================================================
// CONDUTA: FARINGOAMIGDALITE AGUDA (VIRAL × ESTREPTOCÓCICA)
// Base: IDSA 2012 (Shulman, Clin Infect Dis) — diagnóstico, tratamento e doses;
// IDSA 2025 (Linder, Clin Infect Dis) — escore clínico para decidir quem testar;
// SBP — Departamento de Infectologia (J Pediatr 2006) — recomendação brasileira.
// Escore: McIsaac (CMAJ 1998). Amigdalectomia: AAO-HNS 2019 (critérios de Paradise).
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
registrarConduta({
    id: "faringoamigdalite",
    nome: "Faringoamigdalite Aguda",
    categoria: "Respiratório",
    cor: "#0f766e",
    kw: "faringoamigdalite faringite amigdalite tonsilite dor de garganta estreptococo beta hemolitico grupo a pyogenes escarlatina mcisaac centor teste rapido abscesso periamigdaliano febre reumatica",
    resumo: "Viral × estreptocócica, escore de McIsaac clicável, quando testar e tratar, antibiótico de 10 dias, alérgicos, complicações e amigdalectomia.",
    legenda: "Conduta conforme a <strong>diretriz da IDSA (2012)</strong> e a <strong>atualização IDSA 2025</strong> (escore clínico para decidir o teste), com a <strong>recomendação do Departamento de Infectologia da SBP (2006)</strong>. Escore de <strong>McIsaac (1998)</strong>.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",
                    icone: "🔎",
                    resumo: "A maioria é viral. O estreptococo é 20 a 30% das dores de garganta na criança.",
                    itens: [
                        "<strong>A maioria das faringoamigdalites é viral.</strong> O <strong>estreptococo beta-hemolítico do grupo A</strong> (<em>S. pyogenes</em>) causa <strong>20 a 30%</strong> das dores de garganta na criança e 5 a 15% no adulto (IDSA 2012).",
                        "<strong>Idade típica do estreptococo: 5 a 15 anos.</strong> Raro abaixo de 3 anos; nessa idade a febre reumática é muito rara.",
                        "<strong>Sugerem estreptococo:</strong> início súbito, febre, dor para engolir, exsudato amigdaliano, <strong>petéquias no palato</strong>, adenomegalia cervical anterior dolorosa, cefaleia, náuseas, vômitos e dor abdominal; inverno e primavera; contato com caso confirmado.",
                        "<strong>Sugerem vírus (não testar):</strong> <strong>tosse, coriza, rouquidão</strong>, conjuntivite, úlceras orais ou vesículas, diarreia (IDSA 2012).",
                        "<strong>O clínico não basta:</strong> os sinais se sobrepõem. O diagnóstico do estreptococo se confirma com <strong>teste rápido</strong> (antígeno) e/ou <strong>cultura de orofaringe</strong> (IDSA 2012; SBP)."
                    ]
                },
                {
                    titulo: "Escarlatina",
                    icone: "🍓",
                    resumo: "Faringite estreptocócica + exantema áspero (lixa) e língua em framboesa.",
                    itens: [
                        "<strong>Exantema eritematoso micropapular áspero (\"lixa\")</strong>, que começa no tronco e pescoço, mais intenso nas dobras (<strong>sinal de Pastia</strong>); palidez perioral (<strong>sinal de Filatov</strong>).",
                        "<strong>Língua em morango/framboesa</strong>; descamação das mãos e pés na convalescença.",
                        "Mesma conduta da faringite estreptocócica (testar e tratar 10 dias)."
                    ]
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Mononucleose, adenovírus, herpangina, herpes, difteria e abscessos.",
                    itens: [
                        "<strong>Mononucleose (EBV):</strong> exsudato extenso, <strong>adenomegalia cervical posterior</strong> e generalizada, hepatoesplenomegalia, fadiga. <strong>Exantema com amoxicilina.</strong> Evitar esporte de contato pelo risco de ruptura do baço.",
                        "<strong>Adenovírus:</strong> febre faringoconjuntival (faringite + conjuntivite).",
                        "<strong>Herpangina (Coxsackie):</strong> vesículas e úlceras no palato mole e pilares; mão-pé-boca.",
                        "<strong>Gengivoestomatite herpética:</strong> úlceras na gengiva e na boca anterior.",
                        "<strong>Difteria:</strong> pseudomembrana acinzentada aderente que sangra ao descolar; vacinação incompleta. Notificar.",
                        "<strong>Abscesso periamigdaliano ou retrofaríngeo, epiglotite:</strong> ver sinais de alarme no passo 1."
                    ]
                },
                {
                    titulo: "Escore de McIsaac: quem testar",
                    icone: "📊",
                    resumo: "Toque em cada item. 0 a 1: não testar · 2 a 3: testar · 4 a 5: testar (ou tratar se não houver teste).",
                    itens: [
                        "A IDSA 2025 recomenda usar um <strong>escore clínico</strong> (Centor/McIsaac) para decidir quem testar: o maior benefício é <strong>identificar quem tem baixa probabilidade</strong> e evitar exame e antibiótico desnecessários.",
                        "<strong>Testar mesmo com escore baixo:</strong> contato domiciliar com estreptococo, febre reumática prévia ou quadro de escarlatina.",
                        "<strong>Menores de 3 anos:</strong> o escore funciona mal; em geral não testar, salvo irmão ou contato com estreptococo (IDSA 2012)."
                    ],
                    escore: {
                        id: "mcisaac",
                        instrucao: "Toque no que a criança apresenta em cada item. A soma é feita automaticamente. Abaixo de 3 anos o escore funciona mal.",
                        itens: [
                            { nome: "Febre > 38 °C", opcoes: [[0, "Não"], [1, "Sim"]] },
                            { nome: "Tosse", opcoes: [[1, "Ausente"], [0, "Presente"]] },
                            { nome: "Adenomegalia cervical anterior dolorosa", opcoes: [[0, "Não"], [1, "Sim"]] },
                            { nome: "Amígdalas aumentadas ou com exsudato", opcoes: [[0, "Não"], [1, "Sim"]] },
                            { nome: "Idade", opcoes: [[1, "3 a 14 anos"], [0, "< 3 ou ≥ 15 anos"]] }
                        ],
                        faixas: [
                            { min: 0, max: 1, rotulo: "Baixa probabilidade", cor: "#16a34a", texto: "Não testar e não dar antibiótico. Tratar os sintomas e orientar retorno." },
                            { min: 2, max: 3, rotulo: "Probabilidade intermediária", cor: "#d97706", texto: "Fazer teste rápido ou cultura. Antibiótico só se positivo." },
                            { min: 4, max: 5, rotulo: "Probabilidade alta", cor: "#dc2626", texto: "Fazer teste rápido ou cultura e tratar se positivo. Sem teste disponível: considerar tratar." }
                        ],
                        nota: "McIsaac 1998: 1 ponto para febre > 38 °C, ausência de tosse, adenomegalia cervical anterior dolorosa, amígdalas aumentadas/exsudato e idade 3 a 14 anos. Probabilidade de estreptococo: ≤ 1 ponto ~1 a 10%; 2 a 3 pontos ~17 a 35%; ≥ 4 pontos ~50%."
                    }
                }
            ]
        },
        {
            titulo: "Condução no pronto-socorro: passo a passo",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Siga na ordem.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "Alarme → escore → teste → antibiótico de 10 dias → sintomáticos e orientações.",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Sinais de alarme:</strong> estridor, sialorreia, trismo, voz abafada, torcicolo, toxemia → <strong>abscesso ou epiglotite</strong>",
                        "<span class=\"cond-passo\">2</span> <strong>Escore de McIsaac:</strong> 0–1 não testar · ≥ 2 <strong>teste rápido ou cultura</strong>",
                        "<span class=\"cond-passo\">3</span> <strong>Positivo:</strong> <strong>amoxicilina 10 dias</strong> ou <strong>penicilina benzatina IM dose única</strong>",
                        "<span class=\"cond-passo\">4</span> <strong>Alérgico à penicilina:</strong> sem anafilaxia = cefadroxila 10 dias · com anafilaxia = azitromicina 5 dias",
                        "<span class=\"cond-passo\">5</span> <strong>Dor e febre:</strong> ibuprofeno ou paracetamol. <strong>Sem corticoide.</strong> Orientar retorno"
                    ],
                    lista: "passos"
                },
                {
                    passo: 1,
                    titulo: "Sinais de alarme: abscesso, epiglotite, via aérea",
                    resumo: "Estridor, sialorreia, trismo, voz abafada, torcicolo ou toxemia: não é faringite simples.",
                    alerta: true,
                    itens: [
                        "<strong>Abscesso periamigdaliano:</strong> dor intensa e unilateral, <strong>trismo</strong>, <strong>voz de \"batata quente\"</strong>, abaulamento do palato e <strong>desvio da úvula</strong>. Adolescentes. Avaliação do otorrino para drenagem.",
                        "<strong>Abscesso retrofaríngeo:</strong> menores de 5 anos, febre, <strong>torcicolo</strong> ou recusa a mexer o pescoço, sialorreia, abaulamento da parede posterior da faringe. Tomografia cervical com contraste.",
                        "<strong>Epiglotite / obstrução de via aérea:</strong> estridor, sialorreia, posição em tripé, toxemia. <strong>Não examinar a orofaringe com espátula</strong>; manter a criança calma no colo e acionar a via aérea difícil (ver conduta de crupe).",
                        "<strong>Desidratação</strong> por não aceitar líquidos: hidratação e analgesia antes de decidir a alta."
                    ]
                },
                {
                    passo: 2,
                    titulo: "Decidir o teste pelo escore",
                    resumo: "0 a 1: sem teste e sem antibiótico. 2 ou mais: teste rápido ou cultura.",
                    itens: [
                        "<strong>Escore 0 a 1, ou quadro viral claro</strong> (tosse, coriza, rouquidão, úlceras): <strong>não testar e não dar antibiótico</strong>.",
                        "<strong>Escore ≥ 2:</strong> <strong>teste rápido</strong> (antígeno) ou <strong>cultura de orofaringe</strong>. Colher esfregando as duas amígdalas e a parede posterior, sem tocar língua e bochecha.",
                        "<strong>Teste rápido negativo na criança:</strong> confirmar com <strong>cultura</strong> (IDSA 2012). Teste rápido positivo: tratar, sem cultura.",
                        "<strong>Sem teste disponível:</strong> decisão clínica; escore alto (≥ 4) favorece tratar. Iniciar o antibiótico <strong>até 9 dias</strong> do início dos sintomas ainda previne a febre reumática, então dá tempo de esperar a cultura.",
                        "<strong>Não fazer</strong> teste de controle após o tratamento e <strong>não testar contactantes</strong> sem sintomas (IDSA 2012)."
                    ]
                },
                {
                    passo: 3,
                    titulo: "Positivo: antibiótico de 10 dias",
                    resumo: "Amoxicilina VO 10 dias ou penicilina benzatina IM dose única.",
                    itens: [
                        "<strong>1ª escolha: penicilina ou amoxicilina</strong> (IDSA 2012; SBP). Não há resistência do <em>S. pyogenes</em> à penicilina.",
                        "<strong>Amoxicilina VO por 10 dias completos</strong>, mesmo com melhora em 2 a 3 dias: é o que previne a febre reumática.",
                        "<strong>Penicilina benzatina IM dose única:</strong> quando há dúvida se a família vai completar os 10 dias, vômitos ou dificuldade de dar medicação oral.",
                        "<strong>Penicilina V oral</strong> (acima de 5 anos) é alternativa (card na aba Prescrição).",
                        "Sem antibiótico de amplo espectro (cefalosporinas de 3ª geração, amoxicilina-clavulanato) na faringite não complicada."
                    ],
                    remedios: ["amox_faringo", "benza"]
                },
                {
                    passo: 4,
                    titulo: "Alérgico à penicilina",
                    resumo: "Sem anafilaxia: cefadroxila 10 dias. Com anafilaxia: azitromicina 5 dias.",
                    itens: [
                        "<strong>Alergia sem reação imediata</strong> (exantema tardio, sem anafilaxia): <strong>cefalosporina de 1ª geração por 10 dias</strong> (cefadroxila ou cefalexina).",
                        "<strong>Reação imediata ou anafilaxia:</strong> <strong>azitromicina 5 dias</strong> (ou clindamicina 10 dias). Evitar cefalosporinas.",
                        "<strong>Macrolídeos:</strong> resistência do estreptococo em aumento, <strong>inclusive no Brasil</strong>, e erradicação menor que a da penicilina (meta-análise em rede 2026). Usar só nos alérgicos."
                    ],
                    remedios: ["cefadroxila", "azitro_faringo"]
                },
                {
                    passo: 5,
                    titulo: "Sintomáticos, alta e orientações",
                    resumo: "Ibuprofeno ou paracetamol. Sem corticoide. Retorno se piorar ou não melhorar em 48 a 72 h.",
                    itens: [
                        "<strong>Dor e febre:</strong> ibuprofeno ou paracetamol. <strong>Não usar AAS</strong> na criança (síndrome de Reye).",
                        "<strong>Corticoide não é recomendado</strong> como tratamento da faringite (IDSA 2012).",
                        "<strong>Líquidos frios e alimentos pastosos</strong>; manter a hidratação.",
                        "<strong>Volta à escola:</strong> após 12 a 24 h de antibiótico e sem febre.",
                        "<strong>Retornar se:</strong> sem melhora em 48 a 72 h de antibiótico, dificuldade para engolir saliva ou líquidos, trismo, voz abafada, torcicolo, falta de ar ou manchas na pele."
                    ],
                    remedios: ["ibu_gts", "pct_gts", "dip_gts"]
                }
            ]
        },
        {
            titulo: "Ambulatório: complicações, recorrência e amigdalectomia",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Complicações do estreptococo",
                    icone: "⚠️",
                    resumo: "Supurativas (abscessos, otite, sinusite) e não supurativas (febre reumática, GNPE).",
                    itens: [
                        "<strong>Supurativas:</strong> abscesso periamigdaliano e retrofaríngeo, adenite cervical, otite média, sinusite, mastoidite.",
                        "<strong>Febre reumática:</strong> 2 a 4 semanas depois. <strong>O antibiótico correto (10 dias) previne</strong>, mesmo iniciado até 9 dias após o início dos sintomas.",
                        "<strong>Glomerulonefrite pós-estreptocócica:</strong> 1 a 2 semanas depois (edema, hematúria, hipertensão). <strong>O antibiótico não previne.</strong>"
                    ]
                },
                {
                    titulo: "Recorrência e portador",
                    icone: "🔁",
                    resumo: "Episódios repetidos com teste positivo podem ser portador com virose.",
                    itens: [
                        "<strong>Portador crônico</strong> de estreptococo: tem a bactéria na garganta sem doença; episódios virais dão teste positivo. <strong>Não precisa tratar o portador</strong> (IDSA 2012).",
                        "<strong>Febre periódica (PFAPA):</strong> febre a cada 3 a 6 semanas com faringite, aftas e adenite, sem tosse e com a criança bem entre os episódios: encaminhar.",
                        "<strong>Falha clínica:</strong> rever adesão (10 dias), pensar em mononucleose, abscesso ou portador com nova virose."
                    ]
                },
                {
                    titulo: "Quando encaminhar para amigdalectomia",
                    icone: "✂️",
                    resumo: "Critérios de Paradise: ≥ 7 episódios em 1 ano, ≥ 5/ano em 2 anos ou ≥ 3/ano em 3 anos.",
                    itens: [
                        "<strong>Critérios de Paradise</strong> (AAO-HNS 2019): <strong>≥ 7 episódios em 1 ano</strong>, <strong>≥ 5 por ano em 2 anos</strong> ou <strong>≥ 3 por ano em 3 anos</strong>, cada um documentado com febre > 38,3 °C, adenomegalia cervical, exsudato ou teste positivo.",
                        "Abaixo disso: <strong>acompanhar</strong> (conduta expectante). A IDSA não recomenda a cirurgia só para reduzir a frequência das faringites.",
                        "Também encaminhar: abscesso periamigdaliano recorrente, apneia obstrutiva do sono por hipertrofia, PFAPA."
                    ]
                }
            ]
        }
    ],

    citacoes: { "IDSA 2012": 0, "IDSA 2025": 1, "IDSA": [0, 1], "SBP": 2, "McIsaac": 3, "AAO-HNS 2019": 4, "meta-análise em rede 2026": 5 }, // sigla no texto → fonte (índice em fontes)
    fontes: [
        "Shulman ST, Bisno AL, Clegg HW, et al. Clinical Practice Guideline for the Diagnosis and Management of Group A Streptococcal Pharyngitis: 2012 Update by the Infectious Diseases Society of America. Clin Infect Dis 2012;55(10):e86-102. doi:10.1093/cid/cis629",
        "Linder JA, Watson ME, Wessels MR, et al. 2025 Clinical Practice Guideline Update by the IDSA on Group A Streptococcal Pharyngitis: Risk Assessment Using Clinical Scoring Systems in Children and Adults. Clin Infect Dis 2026;82(Suppl 3):i97-i104. doi:10.1093/cid/ciaf668",
        "Sociedade Brasileira de Pediatria — Departamento de Infectologia. Recomendação para conduta de crianças e adolescentes com faringoamigdalites agudas. J Pediatr (Rio J) 2006;82(1):79-82.",
        "McIsaac WJ, White D, Tannenbaum D, Low DE. A clinical score to reduce unnecessary antibiotic use in patients with sore throat. CMAJ 1998;158(1):75-83.",
        "Mitchell RB, Archer SM, Ishman SL, et al. Clinical Practice Guideline: Tonsillectomy in Children (Update). Otolaryngol Head Neck Surg 2019;160(1 Suppl):S1-S42 (AAO-HNS).",
        "Sun X, Du H, Lei Y, et al. Efficacy and safety of 24 antibiotics for group A streptococcal pharyngitis: a network meta-analysis of 64 randomized controlled trials. Front Public Health 2026;14:1848949. doi:10.3389/fpubh.2026.1848949"
    ],
    revisao: "10/2026"
});
