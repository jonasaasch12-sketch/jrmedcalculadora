// =====================================================
// CONDUTA: OTITE MÉDIA AGUDA (OMA)
// Base: AAP 2013 (Lieberthal, Pediatrics) — diagnóstico, antibiótico × observação,
// escolha, duração e recorrência; SBP (recomendação brasileira, via Einstein 2025);
// Consenso italiano 2025 (Ital J Pediatr); AAO-HNS 2016 (otite com efusão) e
// 2022 (tubos de ventilação); revisão de mastoidite 2025 (Eur J Pediatr).
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
registrarConduta({
    id: "otite_media",
    nome: "Otite Média Aguda",
    categoria: "Respiratório",
    cor: "#7c3aed",
    kw: "otite media aguda oma dor de ouvido otalgia otorreia abaulamento membrana timpanica otoscopia amoxicilina clavulanato mastoidite otite com efusao serosa recorrente tubo de ventilacao",
    resumo: "Critérios de diagnóstico, antibiótico ou observar (clicável), escolha e duração, falha em 48–72 h, alérgicos, mastoidite, efusão e recorrência.",
    legenda: "Conduta conforme a <strong>diretriz da AAP (2013)</strong>, com a <strong>recomendação brasileira (SBP)</strong> e o <strong>consenso italiano (2025)</strong>. Efusão e tubos: <strong>AAO-HNS 2016 e 2022</strong>.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",
                    icone: "🔎",
                    resumo: "Abaulamento da membrana timpânica ou otorreia recente. Sem efusão, não é OMA.",
                    itens: [
                        "<strong>Diagnosticar OMA quando houver</strong> (AAP 2013):",
                        "• <strong>Abaulamento moderado a intenso</strong> da membrana timpânica, <strong>ou</strong>",
                        "• <strong>Otorreia de início recente</strong> que não seja de otite externa, <strong>ou</strong>",
                        "• <strong>Abaulamento leve</strong> + <strong>otalgia de início recente</strong> (< 48 h; no lactente: levar a mão à orelha, choro, irritabilidade) <strong>ou hiperemia intensa</strong> da membrana.",
                        "<strong>Não diagnosticar OMA sem efusão</strong> no ouvido médio (otoscopia pneumática ou timpanometria) (AAP 2013).",
                        "<strong>Hiperemia isolada não é OMA:</strong> choro e febre avermelham a membrana. O sinal mais confiável é o <strong>abaulamento</strong>.",
                        "<strong>Quadro típico:</strong> IVAS há alguns dias, depois febre, otalgia, irritabilidade, sono ruim, recusa alimentar. Febre e otalgia sozinhas não dão o diagnóstico.",
                        "<strong>Agentes:</strong> <em>S. pneumoniae</em>, <em>H. influenzae</em> não tipável (produz beta-lactamase) e <em>M. catarrhalis</em>; vírus respiratórios iniciam o quadro."
                    ]
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Otite com efusão, otite externa, miringite, cerume, corpo estranho e dor referida.",
                    itens: [
                        "<strong>Otite média com efusão (secretora):</strong> líquido atrás da membrana <strong>sem sinais agudos</strong> (sem abaulamento, sem otalgia aguda). <strong>Não usar antibiótico</strong> (AAO-HNS 2016).",
                        "<strong>Otite externa:</strong> dor à <strong>tração do pavilhão</strong> ou ao pressionar o trago, conduto edemaciado, secreção no conduto, piscina. Tratamento tópico (cards em Otorrino: Ouvido).",
                        "<strong>Miringite bolhosa:</strong> bolhas na membrana; tratar como OMA.",
                        "<strong>Cerume impactado e corpo estranho:</strong> limpar o conduto antes de concluir.",
                        "<strong>Dor referida:</strong> dente, faringe/amígdalas, articulação temporomandibular.",
                        "<strong>Mastoidite:</strong> edema e dor atrás da orelha, pavilhão deslocado (ver passo 1)."
                    ]
                },
                {
                    titulo: "Fatores de risco",
                    icone: "⚠️",
                    resumo: "Menor de 2 anos, creche, fumo passivo, mamadeira deitado, sem aleitamento materno.",
                    itens: [
                        "<strong>Idade 6 a 24 meses</strong>, creche, irmãos pequenos, inverno e IVAS.",
                        "<strong>Fumo passivo</strong>, <strong>mamadeira deitado</strong>, chupeta, <strong>ausência de aleitamento materno</strong>.",
                        "<strong>Fenda palatina, síndrome de Down</strong> e outras malformações craniofaciais; imunodeficiência.",
                        "Vacinação pneumocócica e de influenza incompletas."
                    ]
                },
                {
                    titulo: "Gravidade: antibiótico ou observar?",
                    icone: "📊",
                    resumo: "Toque em cada item. Grave, otorreia, < 6 meses ou bilateral < 2 anos: antibiótico. Demais: antibiótico ou observar 48–72 h.",
                    itens: [
                        "<strong>OMA grave</strong> (AAP 2013): <strong>otalgia moderada a intensa</strong>, <strong>otalgia há ≥ 48 h</strong> ou <strong>febre ≥ 39 °C</strong>.",
                        "<strong>Observar sem antibiótico</strong> só com <strong>decisão compartilhada com a família</strong> e <strong>reavaliação garantida em 48 a 72 h</strong> (ou receita para iniciar se não melhorar).",
                        "A AAP não se aplica a <strong>menores de 6 meses</strong>: nessa idade, tratar sempre (e, abaixo de 2 meses com febre, seguir a conduta de febre do lactente)."
                    ],
                    escore: {
                        id: "oma_decisao",
                        instrucao: "Toque no que a criança apresenta em cada item. A decisão e a duração saem automaticamente (AAP 2013).",
                        unidade: " ",
                        itens: [
                            { nome: "Idade", opcoes: [[0, "< 6 meses", "•"], [1, "6 a 23 meses", "•"], [2, "2 a 5 anos", "•"], [3, "≥ 6 anos", "•"]] },
                            { nome: "Otorreia (secreção saindo pelo ouvido)", opcoes: [[1, "Sim", "✓"], [0, "Não", "—"]] },
                            { nome: "Grave: otalgia moderada/intensa, otalgia ≥ 48 h ou febre ≥ 39 °C", opcoes: [[1, "Sim", "✓"], [0, "Não", "—"]] },
                            { nome: "Ouvidos acometidos", opcoes: [[1, "Bilateral", "2"], [0, "Unilateral", "1"]] }
                        ],
                        classificar: (v, m, n) => {
                            if (Object.keys(m).length < n) return { num: "?", rotulo: "", cor: "#64748b", texto: "" };
                            let idade = m[0], otorreia = m[1], grave = m[2], bilateral = m[3];
                            let dur = (idade <= 1 || grave) ? "10 dias" : idade === 2 ? "7 dias" : "5 a 7 dias";
                            if (idade === 0) return { num: "💊", rotulo: "Antibiótico", cor: "#dc2626", texto: "Menor de 6 meses: tratar sempre, 10 dias. Abaixo de 2 meses com febre: conduta de febre do lactente." };
                            if (otorreia || grave) return { num: "💊", rotulo: "Antibiótico", cor: "#dc2626", texto: (otorreia ? "Otorreia" : "OMA grave") + `: antibiótico por ${dur}. Analgesia sempre.` };
                            if (idade === 1 && bilateral) return { num: "💊", rotulo: "Antibiótico", cor: "#dc2626", texto: `Bilateral abaixo de 2 anos: antibiótico por ${dur}. Analgesia sempre.` };
                            return { num: "⏳", rotulo: "Antibiótico ou observar 48–72 h", cor: "#d97706", texto: `Decidir com a família. Observar só com reavaliação garantida em 48–72 h. Se antibiótico: ${dur}. Analgesia sempre.` };
                        },
                        nota: "AAP 2013 (6 meses a 12 anos). Duração: < 2 anos ou grave = 10 dias; 2 a 5 anos não grave = 7 dias; ≥ 6 anos não grave = 5 a 7 dias. O consenso italiano 2025 propõe 5 dias nos casos não graves."
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
                    resumo: "Complicação? → confirmar na otoscopia → analgesia → antibiótico ou observar → amoxicilina → reavaliar em 48–72 h.",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Complicação?</strong> Edema retroauricular, pavilhão deslocado, paralisia facial, meningismo, toxemia → <strong>internar</strong>",
                        "<span class=\"cond-passo\">2</span> <strong>Confirmar na otoscopia:</strong> abaulamento ou otorreia recente. Sem efusão não é OMA",
                        "<span class=\"cond-passo\">3</span> <strong>Analgesia sempre:</strong> ibuprofeno ou paracetamol",
                        "<span class=\"cond-passo\">4</span> <strong>Antibiótico ou observar:</strong> pelo quadro de gravidade (bloco 🔎)",
                        "<span class=\"cond-passo\">5</span> <strong>1ª escolha: amoxicilina.</strong> Amoxicilina + clavulanato se amoxicilina nos últimos 30 dias, conjuntivite purulenta ou recorrência sem resposta",
                        "<span class=\"cond-passo\">6</span> <strong>Alérgico:</strong> sem anafilaxia = cefalosporina · com anafilaxia = macrolídeo",
                        "<span class=\"cond-passo\">7</span> <strong>Sem melhora em 48–72 h:</strong> reexaminar e subir um degrau do antibiótico"
                    ],
                    lista: "passos"
                },
                {
                    passo: 1,
                    titulo: "Sinais de complicação: internar",
                    resumo: "Mastoidite, paralisia facial, meningite, abscesso, labirintite ou trombose de seio: não é OMA simples.",
                    alerta: true,
                    itens: [
                        "<strong>Mastoidite aguda:</strong> <strong>edema, hiperemia e dor atrás da orelha</strong>, apagamento do sulco retroauricular, <strong>pavilhão deslocado para frente e para baixo</strong>, febre. É a complicação mais comum.",
                        "<strong>Intracranianas:</strong> cefaleia intensa, vômitos, <strong>rigidez de nuca</strong>, rebaixamento, convulsão, sinais focais (meningite, abscesso, <strong>trombose do seio sigmoide</strong>).",
                        "<strong>Paralisia facial periférica</strong>, <strong>vertigem</strong> e nistagmo (labirintite), toxemia.",
                        "<strong>Conduta:</strong> internar, colher exames, <strong>antibiótico EV</strong> (cefalosporina de 3ª geração é o mais usado), <strong>avaliação do otorrino</strong> e tomografia com contraste se suspeita de abscesso subperiosteal ou complicação intracraniana (revisão de mastoidite 2025).",
                        "<strong>Menor de 2 meses com febre:</strong> não tratar como OMA simples; seguir a conduta de febre do lactente."
                    ]
                },
                {
                    passo: 2,
                    titulo: "Confirmar o diagnóstico na otoscopia",
                    resumo: "Abaulamento da membrana ou otorreia recente. Limpar o conduto se precisar.",
                    itens: [
                        "<strong>Olhar os dois ouvidos.</strong> Remover cerume se impedir a visão da membrana.",
                        "<strong>Abaulamento</strong> (membrana convexa, opaca, sem reflexo, cabo do martelo apagado) = OMA. <strong>Hiperemia sozinha não basta.</strong>",
                        "<strong>Otorreia</strong> com perfuração: OMA supurada. Diferenciar de otite externa (dor à tração do pavilhão, conduto edemaciado).",
                        "<strong>Líquido sem sinais agudos:</strong> otite com efusão; <strong>não dar antibiótico</strong> (bloco 🏠)."
                    ]
                },
                {
                    passo: 3,
                    titulo: "Analgesia sempre",
                    resumo: "Ibuprofeno ou paracetamol, com ou sem antibiótico.",
                    itens: [
                        "<strong>Tratar a dor em todos os casos</strong>, principalmente nas primeiras 24 h (AAP 2013). O antibiótico não alivia a dor no 1º dia.",
                        "<strong>Ibuprofeno</strong> (a partir de 6 meses) ou <strong>paracetamol</strong>. Não usar AAS.",
                        "<strong>Não usar</strong> descongestionante, anti-histamínico nem corticoide: não ajudam na OMA."
                    ],
                    remedios: ["ibu_gts", "pct_gts", "dip_gts"]
                },
                {
                    passo: 4,
                    titulo: "Antibiótico ou observar",
                    resumo: "Usar o quadro de gravidade (bloco 🔎). Observar só com retorno garantido em 48–72 h.",
                    itens: [
                        "<strong>Antibiótico sempre:</strong> menor de 6 meses, <strong>otorreia</strong>, <strong>OMA grave</strong> (otalgia moderada/intensa, otalgia ≥ 48 h, febre ≥ 39 °C) e <strong>bilateral abaixo de 2 anos</strong>.",
                        "<strong>Antibiótico ou observar:</strong> unilateral não grave de 6 a 23 meses e não grave a partir de 2 anos.",
                        "<strong>Observar</strong> = analgesia e reavaliação em 48 a 72 h. Iniciar o antibiótico se piorar ou não melhorar. Uma opção é deixar a receita com a família (\"receita de segurança\").",
                        "<strong>Duração:</strong> < 2 anos ou grave = <strong>10 dias</strong> · 2 a 5 anos não grave = <strong>7 dias</strong> · ≥ 6 anos não grave = <strong>5 a 7 dias</strong> (AAP 2013)."
                    ]
                },
                {
                    passo: 5,
                    titulo: "Escolha do antibiótico",
                    resumo: "Amoxicilina. Amoxicilina + clavulanato se uso recente, conjuntivite purulenta ou recorrência sem resposta.",
                    itens: [
                        "<strong>1ª escolha: amoxicilina</strong> (AAP 2013; SBP; consenso italiano 2025).",
                        "<strong>Dose:</strong> a <strong>AAP</strong> e o <strong>consenso italiano</strong> usam <strong>dose alta (80 a 90 mg/kg/dia)</strong> pelo pneumococo resistente. A <strong>SBP</strong> aceita a dose padrão (50 mg/kg/dia) nos casos simples. <strong>Aqui usamos a dose alta</strong> (cards abaixo), com a duração calculada pela idade.",
                        "<strong>Amoxicilina + clavulanato</strong> (AAP 2013) se: <strong>amoxicilina nos últimos 30 dias</strong>, <strong>conjuntivite purulenta</strong> associada (síndrome otite-conjuntivite, <em>H. influenzae</em>) ou <strong>OMA recorrente sem resposta à amoxicilina</strong>.",
                        "<strong>Vômitos ou não aceita via oral:</strong> ceftriaxona IM (1 dose; 3 doses se falha)."
                    ],
                    remedios: ["amox_oma", "clav_oma", "cef_oma"]
                },
                {
                    passo: 6,
                    titulo: "Alérgico à penicilina",
                    resumo: "Sem anafilaxia: cefalosporina (cefuroxima, ceftriaxona). Com anafilaxia: macrolídeo ou clindamicina.",
                    itens: [
                        "<strong>Alergia sem reação imediata</strong> (exantema tardio): <strong>cefalosporina</strong> (cefuroxima VO, cefpodoxima ou ceftriaxona IM) (AAP 2013).",
                        "<strong>Reação imediata ou anafilaxia:</strong> <strong>macrolídeo</strong> (azitromicina, claritromicina) ou clindamicina. Macrolídeos têm eficácia menor contra pneumococo e <em>H. influenzae</em>.",
                        "<strong>Exantema durante a amoxicilina</strong> nem sempre é alergia (viroses, mononucleose): registrar e investigar depois."
                    ],
                    remedios: ["cef_oma"]
                },
                {
                    passo: 7,
                    titulo: "Sem melhora em 48 a 72 h",
                    resumo: "Reexaminar. Observação → amoxicilina; amoxicilina → amoxicilina + clavulanato; esta → ceftriaxona IM 3 dias.",
                    itens: [
                        "<strong>Reexaminar o ouvido</strong>: confirmar a OMA e descartar complicação (passo 1).",
                        "<strong>Estava em observação:</strong> iniciar <strong>amoxicilina</strong>.",
                        "<strong>Estava com amoxicilina:</strong> trocar para <strong>amoxicilina + clavulanato</strong>.",
                        "<strong>Estava com amoxicilina + clavulanato:</strong> <strong>ceftriaxona IM por 3 dias</strong> (AAP 2013).",
                        "<strong>Falha de novo:</strong> otorrino (timpanocentese com cultura); clindamicina com ou sem cefalosporina de 3ª geração.",
                        "<strong>Orientar retorno se:</strong> febre persistente, dor que não cede, inchaço atrás da orelha, rigidez de nuca, sonolência, vômitos repetidos ou paralisia facial."
                    ],
                    remedios: ["clav_oma", "cef_oma"]
                }
            ]
        },
        {
            titulo: "Ambulatório: efusão, recorrência e prevenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Depois da OMA: efusão residual",
                    icone: "💧",
                    resumo: "Líquido atrás da membrana é esperado por semanas. Não tratar; reavaliar em 3 meses.",
                    itens: [
                        "<strong>A efusão persiste</strong> em 60 a 70% das crianças em 2 semanas, 40% em 1 mês e 10 a 25% em 3 meses após a OMA (AAP 2013).",
                        "<strong>Não dar antibiótico, corticoide, anti-histamínico ou descongestionante</strong> para a efusão (AAO-HNS 2016).",
                        "<strong>Efusão ≥ 3 meses:</strong> <strong>audiometria</strong> e encaminhar ao otorrino. Criança de risco (atraso de fala, síndrome de Down, fenda palatina, autismo): avaliar antes.",
                        "Não precisa retorno de rotina se ficou bem, exceto menores de 2 anos ou com sintomas persistentes."
                    ]
                },
                {
                    titulo: "OMA recorrente",
                    icone: "🔁",
                    resumo: "≥ 3 episódios em 6 meses ou ≥ 4 em 12 meses (com 1 nos últimos 6): otorrino.",
                    itens: [
                        "<strong>Definição:</strong> <strong>≥ 3 episódios em 6 meses</strong> ou <strong>≥ 4 em 12 meses</strong> com pelo menos 1 nos últimos 6 meses (AAP 2013).",
                        "<strong>Não usar antibiótico profilático</strong> para reduzir episódios (AAP 2013).",
                        "<strong>Tubo de ventilação:</strong> oferecer na OMA recorrente <strong>com efusão</strong> presente na avaliação; sem efusão, não indicar (AAO-HNS 2022).",
                        "<strong>Otorreia com tubo de ventilação:</strong> gotas otológicas de antibiótico <strong>sem antibiótico oral</strong> (AAO-HNS 2022).",
                        "Investigar imunodeficiência se infecções graves ou de outros sítios."
                    ]
                },
                {
                    titulo: "Prevenção",
                    icone: "🛡️",
                    resumo: "Vacinas pneumocócica e influenza, aleitamento materno, sem fumo passivo e sem mamadeira deitado.",
                    itens: [
                        "<strong>Vacina pneumocócica conjugada</strong> e <strong>influenza anual</strong> em dia (AAP 2013).",
                        "<strong>Aleitamento materno exclusivo</strong> até pelo menos 6 meses.",
                        "<strong>Evitar fumo passivo</strong> e <strong>mamadeira com a criança deitada</strong>; reduzir chupeta após 6 meses.",
                        "Lavar as mãos e evitar exposição a IVAS quando possível (creche)."
                    ]
                }
            ]
        }
    ],

    citacoes: { "AAP 2013": 0, "AAP": 0, "SBP": 1, "consenso italiano 2025": 2, "consenso italiano": 2, "AAO-HNS 2016": 3, "AAO-HNS 2022": 4, "revisão de mastoidite 2025": 5 }, // sigla no texto → fonte (índice em fontes)
    fontes: [
        "Lieberthal AS, Carroll AE, Chonmaitree T, et al. The diagnosis and management of acute otitis media. Pediatrics 2013;131(3):e964-99 (AAP). doi:10.1542/peds.2012-3488",
        "Sociedade Brasileira de Pediatria. Otite Média Aguda: protocolos clínicos atualizados (2023), conforme o Guia do Episódio de Cuidado: Otite Média Aguda em Crianças e Adolescentes, Hospital Israelita Albert Einstein (2025).",
        "Castelli Gattinara G, Bergamini M, Simeone G, et al. Antibiotic treatment of acute and recurrent otitis media in children: an Italian intersociety Consensus. Ital J Pediatr 2025;51(1):50. doi:10.1186/s13052-025-01894-z",
        "Rosenfeld RM, Shin JJ, Schwartz SR, et al. Clinical Practice Guideline: Otitis Media with Effusion (Update). Otolaryngol Head Neck Surg 2016;154(1 Suppl):S1-S41 (AAO-HNS). doi:10.1177/0194599815623467",
        "Rosenfeld RM, Tunkel DE, Schwartz SR, et al. Clinical Practice Guideline: Tympanostomy Tubes in Children (Update). Otolaryngol Head Neck Surg 2022;166(1 Suppl):S1-S55 (AAO-HNS). doi:10.1177/01945998211065662",
        "Parri N, Bettelli S, Storelli F, et al. Acute otomastoiditis in children: a scoping review on diagnosis and antibiotic regimens. Eur J Pediatr 2025;184(9):548. doi:10.1007/s00431-025-06385-1"
    ],
    revisao: "10/2026"
});
