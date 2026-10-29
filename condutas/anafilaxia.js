// =====================================================
// CONDUTA: ANAFILAXIA
// Base: SBP — Departamento Científico de Alergia, Guia Prático de
// Atualização nº 6 (31/05/2021): Anafilaxia: atualização 2021.
// Complemento: Hospital Israelita Albert Einstein — Guia do Episódio de
// Cuidado: Anafilaxia (CPTW58.3, revisão 08/08/2023), marcado "(Einstein)".
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
registrarConduta({
    id: "anafilaxia",
    nome: "Anafilaxia",
    categoria: "Antialérgicos",
    cor: "#c026d3",
    kw: "anafilaxia choque anafilatico reacao alergica grave alergia adrenalina angioedema urticaria edema de glote broncoespasmo picada de inseto alergia alimentar",
    resumo: "Critérios diagnósticos clicáveis, adrenalina IM imediata, expansão, broncoespasmo, edema de laringe, observação e prescrição de alta.",
    legenda: "Conduta conforme o Guia Prático de Atualização nº 6 do Departamento de Alergia da SBP (Anafilaxia: atualização 2021). Itens marcados (Einstein) são do Guia do Episódio de Cuidado do Hospital Israelita Albert Einstein (2023).",
    padraoTexto: true, // padrão de escrita (rótulo azul, subitens ›, caixa de atenção)

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico: critérios da WAO",
                    icone: "🔎",
                    resumo: "Clínico. Basta 1 dos 2 critérios (toque para conferir).",
                    itens: [
                        "<strong>Anafilaxia:</strong> reação multissistêmica grave, de início agudo e potencialmente fatal: urticária, angioedema, comprometimento respiratório e gastrintestinal e/ou hipotensão. Usar o termo tanto nos casos com choque quanto nos mais leves.",
                        "Diagnóstico eminentemente clínico. Na anamnese: agente suspeito, via, dose, sequência e tempo de início dos sintomas, tratamento já feito em episódio anterior, fatores associados (exercício, medicamentos).",
                        "Hipotensão = queda da PA sistólica > 30% da basal, ou PAS &lt; 70 + (2 × idade em anos) mmHg em menores de 10 anos, ou PAS &lt; 90 mmHg acima de 10 anos.",
                        "<strong>Exames:</strong> triptase sérica (colher entre 15 min e 3 h do início) pode ajudar a confirmar depois; normal não exclui. IgE específica no momento da reação pode ser negativa: pedir depois. Nunca esperar exame para tratar."
                    ],
                    escore: {
                        id: "anafilaxia_wao",
                        unidade: "critério(s)",
                        checklist: true,
                        instrucao: "Toque Sim ou Não. Basta UM critério para a anafilaxia ser altamente provável.",
                        itens: [
                            { nome: "Critério 1: início agudo (minutos a horas) com pele/mucosa (urticária generalizada, prurido, rubor, edema de lábios-língua-úvula) E pelo menos 1: respiratório (dispneia, broncoespasmo, estridor, hipoxemia) · PA baixa ou disfunção de órgão (hipotonia, síncope, incontinência) · GI grave (cólica intensa, vômitos repetidos), sobretudo após alérgeno não alimentar", opcoes: [[0, "Não", "N"], [1, "Sim", "S"]] },
                            { nome: "Critério 2: início agudo de hipotensão, broncoespasmo ou envolvimento laríngeo (estridor, alteração da voz, odinofagia) após exposição a alérgeno conhecido ou muito provável para o paciente, MESMO SEM pele", opcoes: [[0, "Não", "N"], [1, "Sim", "S"]] }
                        ],
                        classificar: (v) => {
                            let sim = v.filter(x => x === 1).length;
                            if (sim > 0) return { num: "✓", rotulo: "Anafilaxia altamente provável", cor: "#dc2626", texto: "Adrenalina IM AGORA (bloco 🚨, passo 3)." };
                            if (v.filter(x => x === 0).length === 2) return { num: "—", rotulo: "Critérios não preenchidos", cor: "#16a34a", texto: "Reavaliar: a reação pode progredir. Na dúvida com sinais graves, tratar como anafilaxia." };
                            return { num: "?", rotulo: "Responda os critérios", cor: "#64748b", texto: "" };
                        },
                        nota: "Critérios da World Allergy Organization 2020, adotados pela SBP em 2021 (os três critérios antigos viraram dois). Excluem-se sintomas respiratórios por alérgenos inalantes comuns."
                    }
                },
                {
                    titulo: "Manifestações clínicas",
                    icone: "🩺",
                    resumo: "Pele em 90%. Tosse e rouquidão podem preceder a obstrução.",
                    tabela: {
                        colunas: ["Sistema", "Sinais e sintomas", "%"],
                        linhas: [
                            ["Cutâneo", "Urticária e angioedema (lábios e olhos), eritema, prurido", "90"],
                            ["Respiratório", "Dispneia, sibilos, tosse; edema de laringe; espirros, coriza, prurido nasal/ocular", "40–60"],
                            ["Cardiovascular", "Taquicardia, tontura, síncope, dor precordial, hipotensão, choque", "30–35"],
                            ["Digestório", "Náuseas, vômitos, diarreia, cólicas", "25–30"],
                            ["Outros", "Cefaleia, convulsão, incontinência, gosto metálico, sensação de morte iminente, desorientação", "1–8"]
                        ],
                        nota: "Quadro 2 da SBP. Início de segundos/minutos até horas após a exposição. *Tosse e rouquidão podem preceder a obstrução das vias aéreas."
                    }
                },
                {
                    titulo: "Desencadeantes",
                    icone: "⚡",
                    resumo: "Medicamentos, alimentos, insetos e látex.",
                    itens: [
                        "<strong>Medicamentos:</strong> antibióticos (sobretudo beta-lactâmicos) e AINEs são os mais envolvidos. Também contrastes iodados, relaxantes musculares, opioides.",
                        "<strong>Alimentos:</strong> leite de vaca e clara de ovo em lactentes e pré-escolares; crustáceos em crianças maiores e adolescentes. Exercício isolado ou associado a alimentos (camarão, maçã, aipo, trigo).",
                        "<strong>Picadas de insetos:</strong> formiga-de-fogo, abelha, vespa.",
                        "<strong>Látex:</strong> atenção a espinha bífida e profissionais de saúde; reação cruzada com banana, abacate, kiwi, mamão, aipim, inhame.",
                        "Em cerca de 10% não se identifica a causa (anafilaxia idiopática)."
                    ]
                },
                {
                    titulo: "Diagnóstico diferencial e fatores de risco",
                    icone: "🧭",
                    resumo: "Reação vasovagal é a maior confusão. Asma mal controlada aumenta o risco de morte.",
                    itens: [
                        "<strong>Reação vasovagal</strong> (causa mais frequente de confusão): sudorese, náusea, hipotensão com bradicardia e sem urticária/angioedema. Na anafilaxia há taquicardia (bradicardia só na pré-parada).",
                        "Outros: mastocitose sistêmica, angioedema hereditário, feocromocitoma, síndrome carcinoide, disfunção de cordas vocais, escombroidismo.",
                        "<strong>Maior risco de reação fatal:</strong> asma mal controlada, doença cardiovascular, infecção associada.",
                        "(Einstein) Medicações que pioram a resposta: betabloqueadores, IECA/BRA, diuréticos (diminuem o efeito da adrenalina); tricíclicos, cocaína, anfetaminas (mais efeitos cardiovasculares da adrenalina); AINEs e opioides."
                    ]
                },
                {
                    titulo: "Gravidade (Einstein)",
                    icone: "📊",
                    resumo: "Leve, moderada ou grave: define observação e local.",
                    tabela: {
                        colunas: ["Gravidade", "Sintomas", "Onde e quanto tempo"],
                        linhas: [
                            ["Leve", "Urticária, prurido e edema limitados; prurido na garganta; congestão nasal; espirros/conjuntivite. Autolimitados, sem progressão", "PS, observação mínima de 8 h"],
                            ["Moderada", "Urticária/eritema difusos com sinais vitais estáveis; edema de face sem dispneia; aperto na garganta ou rouquidão sem dispneia; sibilos leves sem hipóxia; sintomas GI persistentes", "Observação mínima de 24 h, semi-intensiva ou UTI"],
                            ["Grave", "Edema difuso; eritema com hipotensão; edema de laringe com estridor e/ou hipóxia; broncoespasmo com hipóxia; hipotensão e taquicardia", "UTI ou semi-intensiva"]
                        ],
                        nota: "SBP: observação clínica de no mínimo 6 a 8 h nos casos leves e 24 a 48 h nos graves."
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
                    resumo: "Posição → adrenalina IM → O₂ e acesso → volume → broncoespasmo/laringe → 2ª linha → observar.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Destino:</strong> critérios clicáveis (UTI · internar 24 h · observar 6–8 h). Não atrasa a adrenalina",
                        "<span class=\"cond-passo\">2</span> <strong>Primeiro:</strong> retirar o desencadeante, chamar ajuda, ABC, deitar com pernas elevadas",
                        "<span class=\"cond-passo\">3</span> <strong>Adrenalina IM:</strong> na coxa, já. Repetir a cada 5–15 min",
                        "<span class=\"cond-passo\">4</span> <strong>O₂, monitor e acesso:</strong> O₂ se SpO₂ ≤ 95%, monitor, acesso venoso",
                        "<span class=\"cond-passo\">5</span> <strong>Hipotensão:</strong> expansão rápida",
                        "<span class=\"cond-passo\">6</span> <strong>Broncoespasmo:</strong> salbutamol · estridor: adrenalina inalatória",
                        "<span class=\"cond-passo\">7</span> <strong>2ª linha:</strong> anti-H1 e corticoide (não substituem a adrenalina)",
                        "<span class=\"cond-passo\">8</span> <strong>Refratário:</strong> adrenalina EV, glucagon, vasopressor, UTI",
                        "<span class=\"cond-passo\">9</span> <strong>Observar:</strong> reação bifásica; decidir o destino"
                    ]
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    icone: "🏥",
                    resumo: "Para decidir o destino. Não atrasa a adrenalina IM (passo 3): marque depois de aplicá-la.",
                    alerta: true,
                    itens: [
                        "Toda anafilaxia fica em observação. O tempo e o local dependem da gravidade (SBP; Einstein): leve no mínimo 6 a 8 h no PS; moderada no mínimo 24 h; grave em UTI.",
                        "Reação bifásica em até 10%, 8 a 12 h depois: pesa para observar mais tempo."
                    ],
                    escore: {
                        id: "internacao_anafilaxia",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave. Sem nenhum, toque em \"Nenhum\".",
                        itens: [
                            { nome: "🔴 UTI", opcoes: [[3, "Hipotensão ou choque", "🔴"]] },
                            { nome: "", opcoes: [[3, "Edema de laringe com estridor e/ou hipóxia", "🔴"]] },
                            { nome: "", opcoes: [[3, "Broncoespasmo com hipóxia", "🔴"]] },
                            { nome: "", opcoes: [[3, "Precisou de mais de 2 doses de adrenalina ou de adrenalina em infusão (refratária)", "🔴"]] },
                            { nome: "🟠 Internar (enfermaria)", opcoes: [[2, "Reação moderada: urticária ou eritema difusos, edema de face, aperto na garganta ou rouquidão sem dispneia, sibilos leves sem hipóxia, sintomas digestivos persistentes", "🟠"]] },
                            { nome: "", opcoes: [[2, "Risco de reação bifásica: reação inicial grave, demora no tratamento ou na melhora, alérgeno ainda sendo absorvido, asma mal controlada, bifásica prévia", "🟠"]] },
                            { nome: "", opcoes: [[2, "Mora longe, sem acesso a adrenalina em casa ou família que não consegue reconhecer os sinais", "🟠"]] },
                            { nome: "🟢 Nenhum dos acima", opcoes: [[0, "Nenhum critério", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI", cor: "#dc2626", texto: "UTI ou semi-intensiva (Einstein). Monitorização contínua." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Observação de no mínimo 24 h, em semi-intensiva ou enfermaria monitorizada (Einstein; SBP 24 a 48 h)." };
                            return { num: "🏠", rotulo: "Observar 6–8 h e alta", cor: "#16a34a", texto: "Reação leve: observar no mínimo 6 a 8 h no PS. Alta com a prescrição e as orientações do bloco 🏠. Coletar triptase se possível." };
                        },
                        nota: "Tempos de observação: SBP (leve 6 a 8 h; grave 24 a 48 h) e Einstein (leve PS ≥ 8 h; moderada ≥ 24 h semi-intensiva/UTI; grave UTI). Mais de 2 doses de adrenalina = anafilaxia refratária (passo 8)."
                    }
                },
                {
                    passo: 2,
                    titulo: "Reconhecer, retirar o desencadeante e posicionar",
                    resumo: "Parar a infusão suspeita, ABCM, decúbito dorsal com pernas elevadas.",
                    itens: [
                        "Se medicação EV: parar a infusão. Afastar o alérgeno (ferrão, alimento).",
                        "Chamar ajuda. Checar A (via aérea), B (respiração), C (circulação) e M (mente/sensório).",
                        "Decúbito dorsal com membros inferiores elevados. Não deixar sentar ou levantar de repente: associado a morte (\"síndrome do ventrículo vazio\"). Com dispneia ou vômitos, pode ficar semissentado/de lado."
                    ]
                },
                {
                    passo: 3,
                    titulo: "Adrenalina IM imediata",
                    alerta: true,
                    resumo: "Droga de 1ª linha. 0,01 mg/kg IM na coxa, sem diluir. Não atrasar.",
                    itens: [
                        "Adrenalina 1:1000 (1 mg/mL), 0,01 mg/kg = 0,01 mL/kg IM na face anterolateral da coxa. Máximo 0,3 mg em crianças (adolescentes/adultos 0,2 a 0,5 mg).",
                        "Repetir a cada 5 a 15 minutos se necessário. Monitorar frequência cardíaca.",
                        { alerta: "nada substitui a adrenalina: anti-histamínico e corticoide não tratam o choque nem a obstrução da via aérea." },
                        "Quanto mais a hipotensão se agrava, menor a resposta à adrenalina. Mesmo com adrenalina rápida, até 10% das reações não revertem."
                    ],
                    remedios: ["adrenalina_im"]
                },
                {
                    passo: 4,
                    titulo: "Oxigênio, monitor e acesso venoso",
                    resumo: "O₂ se SpO₂ ≤ 95%. Dois acessos calibrosos se houver sintoma circulatório.",
                    itens: [
                        "O₂ por cateter nasal ou máscara se SpO₂ ≤ 95%. SpO₂ &lt; 95% indica necessidade de mais de uma dose de adrenalina.",
                        "Monitorização cardiorrespiratória e oximetria contínuas.",
                        "Acesso venoso de maior calibre possível; (Einstein) 2 acessos calibrosos se houver sintomas cardiovasculares.",
                        "(Einstein) Insuficiência respiratória: IOT precoce ou cricotireoidostomia."
                    ]
                },
                {
                    passo: 5,
                    titulo: "Hipotensão: expansão volêmica",
                    resumo: "5 a 10 mL/kg em 5 min, até 30 mL/kg na 1ª hora.",
                    itens: [
                        "SF 0,9% ou Ringer lactato 5 a 10 mL/kg EV nos primeiros 5 minutos e até 30 mL/kg na primeira hora.",
                        "A velocidade é guiada por pulso e pressão arterial. Monitorar sobrecarga de volume."
                    ],
                    remedios: ["anaf_expansao"]
                },
                {
                    passo: 6,
                    titulo: "Broncoespasmo e edema de laringe",
                    resumo: "Salbutamol para sibilos; adrenalina inalatória pura para estridor.",
                    itens: [
                        "<strong>Broncoespasmo:</strong> salbutamol spray 100 mcg com espaçador, 50 mcg/kg/dose = 1 jato a cada 2 kg, máximo 10 jatos, a cada 20 min. Nebulização: 0,07 a 0,15 mg/kg a cada 20 min até 3 doses, máximo 5 mg.",
                        "(Einstein) Edema de laringe (estridor): inalação com adrenalina pura e considerar via aérea avançada (IOT, cricotireoidostomia) precoce.",
                        "Sibilos ou estridor não melhoram só com inalação: a adrenalina IM continua sendo o principal tratamento."
                    ],
                    remedios: ["salb_spray", "adrenalina_neb"]
                },
                {
                    passo: 7,
                    titulo: "Segunda linha: anti-histamínico e corticoide",
                    resumo: "Para sintomas cutâneos e prevenção. Não tratam o choque.",
                    itens: [
                        "<strong>Anti-H1:</strong> difenidramina ou prometazina 1 mg/kg EV, máximo 50 mg (adolescentes 25 a 50 mg). Em episódios mais brandos, a via oral pode ser suficiente. Anti-H1 + anti-H2 pode ser mais eficaz que o anti-H1 isolado (SBP cita ranitidina 1 mg/kg EV).",
                        "<strong>Corticoide:</strong> metilprednisolona 1 a 2 mg/kg/dia EV ou prednisona 0,5 a 1 mg/kg/dia VO. Padronização de dose não estabelecida; tem pouca ou nenhuma ação no tratamento agudo (prevenção da reação bifásica?).",
                        "(Einstein) Se o paciente engole e há medicação oral, anti-H1 e corticoide por via oral têm a mesma eficácia e são mais seguros."
                    ]
                },
                {
                    passo: 8,
                    titulo: "Anafilaxia refratária",
                    resumo: "Adrenalina EV só em PCR ou choque refratário. Betabloqueador: glucagon.",
                    itens: [
                        "Adrenalina EV (diluições 1:10.000 ou 1:100.000) somente na parada cardiorrespiratória ou na hipotensão profunda que não respondeu à expansão e a múltiplas doses IM. Em ambiente monitorizado.",
                        "<strong>Uso de betabloqueador:</strong> pode precisar de doses maiores de adrenalina. Ideal: glucagon 5 a 15 µg/min EV em infusão contínua (SBP). (Einstein) Crianças 0,5 a 1 mg IM.",
                        "(Einstein) Hipotensão refratária: noradrenalina (0,05 mcg/kg/min), vasopressina, dopamina (10 a 20 mcg/kg/min).",
                        "Transferir para UTI."
                    ]
                },
                {
                    passo: 9,
                    titulo: "Observar e decidir o destino",
                    resumo: "Leve 6–8 h; grave 24–48 h. Reação bifásica em até 10%.",
                    itens: [
                        "<strong>Observação:</strong> casos leves no mínimo 6 a 8 h; casos graves 24 a 48 h.",
                        "<strong>Reação bifásica:</strong> sintomas voltam 8 a 12 h depois, em até 10% dos casos, sem nova exposição. Mais risco: reação inicial grave, demora no tratamento ou na melhora, absorção contínua do alérgeno, asma mal controlada, reação bifásica prévia.",
                        "(Einstein) Leve: PS por no mínimo 8 h. Moderada: no mínimo 24 h em semi-intensiva/UTI. Grave: UTI. Coletar triptase antes da alta se possível.",
                        "Alta só com a prescrição e as orientações do bloco 🏠."
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
                    titulo: "Prescrição de alta",
                    icone: "💊",
                    resumo: "Corticoide oral 5–7 dias + anti-H1 de 2ª geração por pelo menos 7 dias.",
                    itens: [
                        "<strong>Corticoide oral:</strong> prednisona ou prednisolona 1 a 2 mg/kg/dia, dose única, por 5 a 7 dias.",
                        "Anti-H1 de 2ª geração (fexofenadina, cetirizina, desloratadina) nas doses habituais, por pelo menos 7 dias, em todas as idades.",
                        "Orientar que os sintomas podem voltar em até 12 h (sobretudo idiopática, absorção contínua do alérgeno, asma mal controlada ou bifásica prévia)."
                    ],
                    remedios: ["pred_sol", "deslo"]
                },
                {
                    titulo: "Orientações e prevenção",
                    icone: "🛡️",
                    resumo: "Plano de ação, identificação, escola, autoinjetor e alergista.",
                    itens: [
                        "<strong>Encaminhar todos ao alergista</strong>: investigação da causa, riscos, prevenção e comorbidades.",
                        "Ensinar a reconhecer os sinais precoces. Entregar plano de ação escrito (o que fazer, nome e dose dos remédios).",
                        "Portar identificação com diagnóstico, telefone de contato e plano de ação. Avisar a escola do risco, do que evitar e do que fazer.",
                        "<strong>Autoinjetor de adrenalina</strong> (doses fixas): 0,1 mg lactentes · 0,15 mg crianças até 30 kg · 0,3 mg crianças maiores e adultos. Aplicar na face anterolateral da coxa, por cima da roupa; segunda dose 5 a 10 min depois se não melhorar. Conferir a validade.",
                        "Suspender medicações de risco quando possível (betabloqueadores, IECA, IMAO).",
                        "<strong>Látex:</strong> evitar contato e inalação (chupetas, balões, luvas, drenos, equipos); procedimentos em ambiente <em>latex-free</em>.",
                        "Com o alergista: imunoterapia (veneno de himenópteros), dessensibilização a alimentos/medicamentos, pré-tratamento para contraste."
                    ]
                }
            ]
        }
    ],

    citacoes: { "SBP": 0, "Einstein": 1, "WAO": 2 }, // sigla no texto → fonte (índice em fontes)
    fontes: [
        "Sociedade Brasileira de Pediatria — Departamento Científico de Alergia. Guia Prático de Atualização nº 6: Anafilaxia: atualização 2021 (31/05/2021).",
        "Hospital Israelita Albert Einstein. Guia do Episódio de Cuidado: Anafilaxia (CPTW58.3, revisão 08/08/2023).",
        "Cardona V et al. World Allergy Organization anaphylaxis guidance 2020. World Allergy Organ J. 2020;13:100472."
    ],
    revisao: "10/2026"
});
