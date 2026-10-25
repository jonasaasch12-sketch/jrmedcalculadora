// =====================================================
// CONDUTA: LARINGITE VIRAL AGUDA (CRUPE) E TRAQUEÍTE BACTERIANA
// Base: SBP — Departamento de Emergências, Guia Prático de Conduta nº 1
// (jan/2017): Crupe viral e bacteriano. Complemento: Hospital Israelita
// Albert Einstein — Guia do Episódio de Cuidado: Laringite em crianças e
// adolescentes (CPTW176.2, 2022), marcado como "(Einstein)".
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
registrarConduta({
    id: "crupe",
    nome: "Laringite Viral Aguda (Crupe)",
    categoria: "Respiratório",
    cor: "#0284c7",
    kw: "crupe laringite laringotraqueite laringotraqueobronquite estridor tosse ladrante rouquidao traqueite bacteriana epiglotite supraglotite",
    resumo: "Diagnóstico clínico, escore de gravidade clicável, dexametasona para todos, adrenalina inalatória e critérios de internação e UTI.",
    legenda: "Conduta conforme o <strong>Guia Prático de Conduta nº 1 do Departamento de Emergências da SBP (2017)</strong>. Itens marcados <strong>(Einstein)</strong> são do Guia do Episódio de Cuidado do Hospital Israelita Albert Einstein (2022).",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",
                    icone: "🔎",
                    resumo: "Clínico: rouquidão, tosse ladrante e estridor inspiratório.",
                    itens: [
                        "<strong>Síndrome do crupe:</strong> rouquidão, <strong>tosse ladrante</strong>, <strong>estridor predominantemente inspiratório</strong> e graus variados de desconforto respiratório. Quando a causa é viral: crupe viral.",
                        "<strong>Diagnóstico clínico.</strong> Não são recomendados exames laboratoriais ou radiológicos de rotina.",
                        "<strong>Quadro:</strong> começa com rinorreia clara, faringite, tosse leve e febre baixa. Após <strong>12 a 48 h</strong> surgem os sintomas de obstrução alta. Resolve em <strong>3 a 7 dias</strong> (até 14 dias nos graves).",
                        "<strong>Extensão:</strong> só laringe = laringite (rouquidão e tosse ladrante) · laringe + traqueia = laringotraqueíte (crupe) · + bronquíolos = laringotraqueobronquite (tempo expiratório prolongado e sibilos).",
                        "<strong>Idade:</strong> 1 a 6 anos, pico aos 18 meses; mais em meninos. Mais no outono e inverno, mas ocorre o ano todo.",
                        "<strong>Agentes:</strong> parainfluenza 1, 2 e 3 (principais), influenza A e B, VSR. Acima de 5 anos: <em>Mycoplasma pneumoniae</em>.",
                        "<strong>RX cervical</strong> (sinal da \"torre de igreja\"): pouco valor; 50% dos crupes têm RX normal. Reservar para suspeita de outra causa (corpo estranho) ou evolução atípica.",
                        "<strong>Crupe recorrente:</strong> afastar refluxo gastroesofágico, papilomatose de laringe, estenose laringotraqueal e anomalias congênitas."
                    ]
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Supraglotite, traqueíte bacteriana, corpo estranho, abscessos.",
                    itens: [
                        "<strong>Diferenciais:</strong> edema angioneurótico, aspiração de corpo estranho, traqueíte bacteriana, abscesso retrofaríngeo ou periamigdaliano, mononucleose e supraglotite (epiglotite).",
                        "<strong>Supraglotite:</strong> estridor e desconforto <strong>sem rouquidão e sem tosse ladrante</strong>, voz abafada (\"batata quente\"), salivação, aspecto tóxico e alteração de perfusão. Ficou rara após a vacina Hib.",
                        "<strong>Onde está a obstrução:</strong> supraglótica = estridor inspiratório, voz abafada, salivação · glótica/subglótica (crupe) = rouquidão, estridor inspiratório ou bifásico · intratorácica = estridor mais expiratório."
                    ],
                    tabela: {
                        titulo: "Crupe viral × traqueíte bacteriana",
                        colunas: ["", "Crupe viral", "Traqueíte bacteriana"],
                        linhas: [
                            ["Idade", "3 meses a 3 anos", "> 3 anos"],
                            ["Início", "12 a 48 h", "Progressivo: 12 h a 7 dias"],
                            ["Estridor", "Leve a intenso", "Moderado a intenso"],
                            ["Cavidade oral", "Hiperemia de faringe, epiglote normal", "Hiperemia de faringe, secreção purulenta"],
                            ["Sintomas circulatórios", "Normalmente ausentes", "Moderados a graves (toxemia)"],
                            ["Resposta a adrenalina + corticoide", "Sim", "Não"],
                            ["Intubação", "Geralmente desnecessária", "Geralmente necessária (cânula menor)"],
                            ["Internação", "Infrequente; enfermaria ou UTI", "UTI"]
                        ],
                        nota: "Pródromo (coriza e tosse seca), febre (37,8 a 40,5 °C) e rouquidão/tosse ladrante estão presentes nos dois."
                    }
                },
                {
                    titulo: "Fatores de risco para falência respiratória",
                    icone: "⚠️",
                    resumo: "< 6 meses, estridor em repouso, alteração de consciência, hipoxemia.",
                    itens: [
                        "Idade <strong>&lt; 6 meses</strong>, <strong>estridor em repouso</strong>, <strong>alteração do nível de consciência</strong> e hipercapnia.",
                        "Manipulação prévia da via aérea (cirurgia, intubação prévia) ou doença prévia da via aérea: abordagem mais cuidadosa.",
                        "<strong>Oximetria em toda criança com estridor.</strong> Saturação normal <strong>não</strong> afasta gravidade: a via aérea se estreita muito antes da hipóxia.",
                        "<strong>Hipoxemia = doença avançada</strong>, falência respiratória iminente → <strong>UTI</strong>. Crupe moderado com hipoxemia sugere acometimento de via aérea inferior associado."
                    ]
                },
                {
                    titulo: "Gravidade + escore clínico",
                    icone: "📊",
                    resumo: "Escore clicável (SBP) e classificação clínica (Einstein).",
                    tabela: {
                        titulo: "Classificação clínica (Einstein)",
                        colunas: ["Gravidade", "Sintomas"],
                        linhas: [
                            ["Leve", "Tosse estridulosa, sem estridor inspiratório em repouso, sem ou leve tiragem intercostal/supraesternal"],
                            ["Moderada", "Estridor em repouso, pouca ou nenhuma agitação"],
                            ["Grave", "Estridor expiratório, agitação e confusão mental"],
                            ["Ameaça à vida", "Estridor pouco audível, letargia, rebaixamento do nível de consciência, cianose"]
                        ]
                    },
                    escore: {
                        id: "crupe_sbp",
                        instrucao: "Toque no que o paciente apresenta em cada item. A soma é feita automaticamente.",
                        itens: [
                            { nome: "Estridor", opcoes: [[0, "Ausente"], [1, "Com agitação"], [2, "Leve em repouso"], [3, "Grave em repouso"]] },
                            { nome: "Retração", opcoes: [[0, "Ausente"], [1, "Leve"], [2, "Moderada"], [3, "Grave"]] },
                            { nome: "Entrada de ar", opcoes: [[0, "Normal"], [2, "Diminuída"], [3, "Muito diminuída"]] },
                            { nome: "Cor", opcoes: [[0, "Normal"], [2, "Cianose com agitação"], [3, "Cianose em repouso"]] },
                            { nome: "Nível de consciência", opcoes: [[0, "Normal"], [1, "Agitação sob estímulo"], [2, "Agitação"], [3, "Letárgico"]] }
                        ],
                        faixas: [
                            { min: 0, max: 6, rotulo: "Crupe leve", cor: "#16a34a" },
                            { min: 7, max: 8, rotulo: "Crupe moderado", cor: "#d97706" },
                            { min: 9, max: 15, rotulo: "Crupe grave", cor: "#dc2626" }
                        ],
                        nota: "Tabela 1 da SBP (escore clínico para abordagem de estridor). Na tabela original, \"entrada de ar normal\" e \"cor normal\" valem 0 ou 1; aqui contam 0. Classificação: < 6 leve · 7–8 moderada · > 8 grave (o 6 foi incluído no leve). O escore é um guia e não substitui a avaliação clínica."
                    }
                }
            ]
        },
        {
            titulo: "Condução na emergência",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Passo a passo, na ordem em que se faz.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "Internar? → acalmar e classificar → corticoide → adrenalina → observar e reavaliar.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar?</strong> Critérios clicáveis: UTI · enfermaria · casa",
                        "<span class=\"cond-passo\">2</span> <strong>Chegada:</strong> criança calma no colo, oximetria, escore e sinais de alarme",
                        "<span class=\"cond-passo\">3</span> <strong>Corticoide para todos:</strong> dexametasona 0,6 mg/kg dose única",
                        "<span class=\"cond-passo\">4</span> <strong>Moderado ou grave:</strong> adrenalina inalatória",
                        "<span class=\"cond-passo\">5</span> <strong>SpO₂ &lt; 92%:</strong> O₂ umidificado e UTI",
                        "<span class=\"cond-passo\">6</span> <strong>Observar 3 a 4 h</strong> após a adrenalina (rebote em ~2 h)",
                        "<span class=\"cond-passo\">7</span> <strong>Grave sem resposta:</strong> UTI, adrenalina repetida, via aérea"
                    ]
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    icone: "🏥",
                    resumo: "Primeiro decida: UTI, internar ou casa. Reavalie depois da observação após a adrenalina (passo 6).",
                    alerta: true,
                    itens: [
                        "A maioria vai para casa após a dexametasona. A decisão final vem <strong>depois de 3 a 4 h de observação</strong> após a adrenalina (rebote em ~2 h)."
                    ],
                    escore: {
                        id: "internacao_crupe",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave. Sem nenhum, toque em \"Nenhum\".",
                        itens: [
                            { nome: "🔴 UTI", opcoes: [[3, "Crupe grave (escore > 8) ou hipoxemia (SpO₂ < 92%)", "🔴"]] },
                            { nome: "", opcoes: [[3, "Grave sem resposta às medidas iniciais, ou que voltou ao estado anterior após a conduta inicial e/ou 2 h de observação (Einstein)", "🔴"]] },
                            { nome: "", opcoes: [[3, "Desconforto grave: musculatura acessória, rebaixamento da consciência (Einstein)", "🔴"]] },
                            { nome: "", opcoes: [[3, "Suspeita de traqueíte bacteriana", "🔴"]] },
                            { nome: "🟠 Internar (enfermaria)", opcoes: [[2, "Toxemia, desidratação ou incapacidade de ingerir líquidos", "🟠"]] },
                            { nome: "", opcoes: [[2, "Estridor significativo ou retrações em repouso", "🟠"]] },
                            { nome: "", opcoes: [[2, "Sem resposta à adrenalina ou piora clínica 2 h após a adrenalina", "🟠"]] },
                            { nome: "", opcoes: [[2, "Moderado com pouca ou nenhuma resposta às medidas iniciais, ou grave com melhora só parcial após 4 h de observação (Einstein)", "🟠"]] },
                            { nome: "🟢 Nenhum dos acima", opcoes: [[0, "Nenhum critério", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI", cor: "#dc2626", texto: "O₂, adrenalina inalatória repetida e via aérea pelo mais experiente (passo 7)." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Internar, manter dexametasona já feita e adrenalina se necessário; reavaliar com o escore." };
                            return { num: "🏠", rotulo: "Alta com retorno", cor: "#16a34a", texto: "Crupe leve após dexametasona, ou moderado que melhorou: sem estridor em repouso, sem desconforto e sem hipoxemia após 3 a 4 h de observação. Orientações do bloco 🏠." };
                        },
                        nota: "Critérios de alta, internação e UTI da SBP e do Einstein (antes no passo de decisão). Reavaliar a decisão depois da observação de 3 a 4 h após a adrenalina (passo 6)."
                    }
                },
                {
                    passo: 2,
                    titulo: "Chegada: acalmar e classificar",
                    resumo: "Colo dos pais, oximetria, escore e sinais de outra causa.",
                    itens: [
                        "Manter a criança <strong>o mais calma possível, no colo dos pais</strong>. Evitar manipulação e exames desnecessários: o choro piora o colapso da via aérea e a resistência ao fluxo.",
                        "<strong>Oximetria</strong> em todos. Classificar a gravidade pelo <strong>escore</strong> (bloco 🔎).",
                        "Procurar sinais de <strong>outra causa</strong>: toxemia, febre alta, salivação, voz abafada, ausência de tosse ladrante (supraglotite, traqueíte bacteriana, abscesso) ou início súbito (corpo estranho).",
                        "<strong>Não</strong> pedir RX de rotina. Nebulização com SF ou ar umidificado <strong>não tem eficácia comprovada</strong>: não insistir se a criança ficar mais agitada."
                    ]
                },
                {
                    passo: 3,
                    titulo: "Corticoide: dexametasona para todos",
                    resumo: "Dose única, VO, IM ou EV. Reduz gravidade, internação e UTI.",
                    itens: [
                        "<strong>Dexametasona 0,6 mg/kg, dose única</strong> (padrão do serviço), VO ou parenteral. Ação longa (> 48 h).",
                        "Vomitando: <strong>IM</strong>. Já com acesso venoso: <strong>EV</strong>.",
                        "Referência SBP: leve 0,15 a 0,3 mg/kg · moderado 0,3 a 0,6 mg/kg · grave 0,6 mg/kg IM.",
                        "<strong>Alternativas:</strong> budesonida inalatória <strong>2 mg</strong> (8 mL da 0,25 mg/mL), dose única, no leve/moderado ou se vomita e recusa a dexametasona oral · <strong>(Einstein)</strong> prednisolona 1 a 2 mg/kg/dia por 3 dias, se não houver dexametasona."
                    ],
                    remedios: ["dexa_crupe"]
                },
                {
                    passo: 4,
                    titulo: "Adrenalina inalatória (moderado ou grave)",
                    resumo: "Efeito quase imediato, dura cerca de 2 h.",
                    itens: [
                        "<strong>Indicação:</strong> crupe <strong>moderado ou grave</strong>, e criança com procedimento ou manipulação prévia da via aérea.",
                        "<strong>Dose:</strong> adrenalina 1:1000, <strong>0,5 mL/kg, máximo 5 mL</strong> por dose, <strong>pura, sem diluir</strong>, nebulizada.",
                        "<strong>Não</strong> indicada no crupe leve (só dexametasona e alta).",
                        "Efeito em minutos, mas <strong>dura cerca de 2 h</strong>: o desconforto pode voltar. Sempre junto com o corticoide.",
                        "Uma dose é segura. Nos casos de falência respiratória, a experiência clínica sugere que pode ser <strong>repetida a cada 2 horas</strong>; há relato de taquicardia ventricular e infarto em criança saudável com crupe grave. Monitorar."
                    ],
                    remedios: ["adrenalina_neb"]
                },
                {
                    passo: 5,
                    titulo: "Oxigênio se hipoxemia",
                    resumo: "O₂ umidificado se SpO₂ < 92%. Hipoxemia indica UTI.",
                    itens: [
                        "<strong>O₂ umidificado</strong> se SpO₂ <strong>&lt; 92%</strong> (pode ser pela própria nebulização).",
                        "Hipoxemia no crupe = doença avançada, risco de parada respiratória → <strong>solicitar UTI</strong>."
                    ]
                },
                {
                    passo: 6,
                    titulo: "Observar após a adrenalina",
                    resumo: "3 a 4 horas na emergência antes de decidir.",
                    itens: [
                        "Observar <strong>3 a 4 horas</strong> após a última adrenalina (o efeito acaba em ~2 h).",
                        "Reavaliar o escore. Piora ou retorno do estridor em repouso → repetir adrenalina e reclassificar."
                    ]
                },
                {
                    passo: 7,
                    titulo: "Grave sem resposta: UTI e via aérea",
                    resumo: "Adrenalina repetida, O₂, heliox, VNI; IOT pelo mais experiente.",
                    itens: [
                        "Na UTI: adrenalina inalatória repetida <strong>a cada 2 horas</strong> se falência respiratória (SBP), O₂ se SpO₂ &lt; 92%. <strong>(Einstein)</strong> <strong>heliox</strong> (30% O₂ + 70% hélio) se risco de falência e pouca resposta, <strong>VNI</strong>, IOT se necessário.",
                        "<strong>Intubação:</strong> em ambiente controlado, pelo profissional <strong>mais experiente</strong>. Cânula com <strong>0,5 mm a menos</strong> de diâmetro interno que a calculada para a idade.",
                        "A maioria das crianças <strong>não</strong> precisa de intubação após adrenalina + dexametasona."
                    ]
                },
                {
                    titulo: "A qualquer momento: traqueíte bacteriana",
                    icone: "🦠",
                    alerta: true,
                    resumo: "Crupe grave + febre alta + toxemia, sem resposta a adrenalina e corticoide.",
                    itens: [
                        "<strong>Suspeitar:</strong> crupe grave com febre > 38,5 °C e <strong>toxemia</strong>, <strong>sem resposta</strong> a adrenalina e corticoide. Mais em > 3 anos. Agente principal: <em>S. aureus</em> (também estreptococos, <em>Moraxella</em>, <em>Haemophilus</em>). Mortalidade de 18% a 40%.",
                        "<strong>UTI.</strong> Intubação de preferência <strong>no centro cirúrgico, com endoscopia</strong> (diagnóstico, retirada das membranas e coleta de secreção). Intubação por 3 a 7 dias; cuidado com obstrução da cânula pelas membranas.",
                        "<strong>Antibiótico EV:</strong> cefalosporina de 2ª (<strong>cefuroxima</strong>) ou 3ª geração (<strong>ceftriaxona</strong>), como droga única.",
                        "<strong>Não</strong> há lugar para corticoide ou adrenalina inalatória.",
                        "Complicações: falência respiratória, obstrução da via aérea, pneumotórax, síndrome do choque tóxico, SDRA."
                    ]
                },
                {
                    titulo: "A qualquer momento: edema pulmonar pós-obstrução",
                    icone: "💧",
                    resumo: "Pode surgir logo após aliviar a obstrução (intubação).",
                    itens: [
                        "Na obstrução alta, a pressão pleural muito negativa acumula líquido no interstício pulmonar.",
                        "Ao <strong>aliviar a obstrução</strong> (intubação), a pressão intersticial sobe de repente e o líquido entra nos alvéolos: <strong>edema pulmonar</strong>, mesmo sem doença cardíaca ou pulmonar prévia. Estar preparado."
                    ]
                }
            ]
        },
        {
            titulo: "Ambulatório: casa e seguimento",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Alta e orientações",
                    icone: "🏠",
                    resumo: "Critério de alta e sinais para voltar.",
                    itens: [
                        "<strong>Critério de alta (Einstein):</strong> sem desconforto respiratório e sem hipoxemia.",
                        "Dexametasona em <strong>dose única</strong> já feita na emergência: em geral não precisa de corticoide para casa (exceto se usada prednisolona: 3 dias).",
                        "Explicar que a tosse rouca pode durar alguns dias (3 a 7) e costuma piorar à noite.",
                        "Manter a criança calma; oferecer líquidos; antitérmico se febre."
                    ],
                    grupos: [
                        {
                            nome: "Voltar ao pronto-socorro se (Einstein)",
                            itens: [
                                "Piora da tosse rouca ou estridor em repouso.",
                                "Falta de ar.",
                                "Prostração ou piora do estado geral.",
                                "Febre persistente por mais de 72 horas."
                            ]
                        }
                    ]
                },
                {
                    titulo: "Crupe recorrente: investigar",
                    icone: "🔁",
                    resumo: "Quadros repetidos pedem investigação.",
                    itens: [
                        "Afastar refluxo gastroesofágico, papilomatose recorrente de laringe, estenose laringotraqueal e anomalias congênitas.",
                        "Encaminhar ao otorrino/pneumologista para avaliação da via aérea (broncoscopia/laringoscopia) conforme o caso."
                    ]
                }
            ]
        }
    ],

    citacoes: { "SBP": 0, "Einstein": 1 }, // sigla no texto → fonte (índice em fontes)
    fontes: [
        "Sociedade Brasileira de Pediatria — Departamento de Emergências. Guia Prático de Conduta nº 1: Crupe viral e bacteriano (janeiro de 2017).",
        "Hospital Israelita Albert Einstein. Guia do Episódio de Cuidado: Laringite em crianças e adolescentes (CPTW176.2, aprovado em 08/02/2022)."
    ],
    revisao: "10/2026"
});
