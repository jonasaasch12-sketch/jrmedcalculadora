// =====================================================
// CONDUTA: BRONQUIOLITE VIRAL AGUDA (BVA)
// Base: Guia de Manejo Clínico da BVA — Ministério da Saúde (2026), que tem
// prioridade. Informações adicionais do Protocolo de BVA do IMIP (2024) vêm
// marcadas com o selo IMIP (só onde não contradizem o Ministério da Saúde).
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
(function () {
const IMIP = '<span class="tag-imip">IMIP</span>';

registrarConduta({
    id: "bronquiolite",
    nome: "Bronquiolite Viral Aguda",
    categoria: "Respiratório",
    cor: "#0284c7",
    kw: "bronquiolite bva vsr sincicial lactente sibilancia j21",
    resumo: "Criança < 2 anos com infecção viral aguda: IVAS seguida de acometimento do trato respiratório inferior.",
    legenda: `Conduta conforme o <strong>Guia de Manejo Clínico do Ministério da Saúde (2026)</strong>. Itens com ${IMIP} são informações adicionais do Protocolo do IMIP (2024).`,

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
        {
            resumo: "Quadro clínico, evolução e exames.",
            titulo: "Definição e diagnóstico",
            icone: "🔎",
            itens: [
                "<strong>Definição:</strong> síndrome clínica manifestada por dificuldade respiratória em crianças menores de 2 anos, provocada por infecção viral aguda do trato respiratório, com inflamação das vias aéreas inferiores.",
                "<strong>Agentes:</strong> VSR (até 80% dos casos), seguido do rinovírus. Outros: parainfluenza, metapneumovírus, influenza, adenovírus, coronavírus (incluindo SARS-CoV-2) e bocavírus. Cerca de 1/3 dos hospitalizados tem 2 ou mais vírus.",
                "<strong>Quadro:</strong> rinorreia, obstrução nasal e tosse, seguidos (2º–3º dia) de taquipneia, sibilos, crepitações difusas e/ou uso de musculatura acessória. Febre baixa ou ausente. Contactantes com sintomas gripais corroboram.",
                "<strong>Evolução:</strong> pico de gravidade entre o 3º e o 5º dia. Duração de cerca de 10 dias. Tosse resolve em até 3 semanas em 90%, podendo persistir até 4 semanas.",
                "Avaliar FR, FC e esforço fora do choro, da febre e da agitação. A saturação pode cair no sono.",
                "Diagnóstico essencialmente clínico.",
                "<strong>Radiografia de tórax:</strong> não indicada de rotina. Reservar para casos graves, evolução desfavorável, suspeita de complicação/coinfecção bacteriana ou diagnóstico diferencial (especialmente cardiopatas). Tomografia não indicada de rotina. USG pulmonar à beira-leito pode ser considerada em casos graves/UTI.",
                "<strong>Exames laboratoriais:</strong> não rotineiros. Hemograma e proteínas de fase aguda nos casos graves ou com dúvida diagnóstica. Eletrólitos e função renal se desidratação. Gasometria arterial nos casos graves com indicação de VNI/VMI.",
                "<strong>Pesquisa viral (RT-PCR de nasofaringe):</strong> recomendada nos hospitalizados com doença grave / SRAG, na admissão, conforme fluxo local.",
                "<strong>CID-10:</strong> J21 Bronquiolite aguda · J21.0 por vírus sincicial respiratório."
            ]
        },
        {
            resumo: "Outras causas a considerar.",
            titulo: "Diagnóstico diferencial",
            icone: "🧭",
            itens: [
                "<strong>Sibilância recorrente / asma desencadeada por vírus:</strong> mais provável em > 12 meses com sibilância prévia, atopia pessoal ou história familiar de asma.",
                "<strong>Pneumonia bacteriana:</strong> aspecto toxemiado, febre mais alta, sem sibilância, achados localizados.",
                "<strong>Coqueluche:</strong> guincho e tosse paroxística (podem faltar). Avaliar situação vacinal e contactantes.",
                "<strong>Anomalias de vias aéreas / doença pulmonar crônica:</strong> sintomas prolongados ou recorrentes, estridor, baixo ganho de peso, aspiração recorrente.",
                "<strong>Aspiração de corpo estranho:</strong> engasgo, início súbito, assimetria do murmúrio vesicular, sibilo focal/monofônico.",
                "<strong>Pneumonia aspirativa:</strong> DRGE, disfunção de deglutição. Cianose, tosse ou engasgo ao mamar.",
                "<strong>Cardiopatia congênita / insuficiência cardíaca:</strong> dificuldade alimentar, baixo ganho de peso, sopro, galope, hepatomegalia, cardiomegalia."
            ]
        },
        {
            resumo: "Quem tem mais risco de evoluir mal.",
            titulo: "Fatores de risco para BVA grave",
            icone: "⚠️",
            itens: [
                "Prematuridade (IG < 37 semanas) e baixo peso ao nascer.",
                "Idade < 12 meses, particularmente < 6 meses.",
                "Doença pulmonar crônica, especialmente displasia broncopulmonar.",
                "Erros inatos da imunidade e imunodeficiência adquirida.",
                "Defeitos anatômicos das vias aéreas (laringomalácia, fístula traqueoesofágica).",
                "Cardiopatia congênita com repercussão hemodinâmica.",
                "Doença neuromuscular · trissomia do 21 · fibrose cística.",
                "Ambientais: tabagismo passivo, poluição do ar, desmame precoce (especialmente < 2 meses).",
                `Baixa ingesta alimentar e/ou hídrica; vulnerabilidade social, dificuldade de acesso ao serviço de saúde e pais com dificuldade de reconhecer sinais de alarme. ${IMIP}`
            ]
        },
        {
            resumo: "Taquipneia e taquicardia por idade.",
            titulo: "Sinais vitais e esforço respiratório",
            icone: "📈",
            tabelas: [
                {
                    titulo: "Taquipneia (contar em 1 minuto)",
                    colunas: ["Idade", "FR"],
                    linhas: [["< 2 meses", "> 60 irpm"], ["2 meses – 1 ano", "> 50 irpm"], ["1 – 5 anos", "> 40 irpm"]]
                },
                {
                    titulo: "Taquicardia",
                    colunas: ["Idade", "FC"],
                    linhas: [["0 – 3 meses", "> 180 bpm"], ["3 – 6 meses", "> 175 bpm"], ["6 – 9 meses", "> 168 bpm"], ["9 – 12 meses", "> 161 bpm"], ["12 – 18 meses", "> 156 bpm"], ["18 – 24 meses", "> 149 bpm"]],
                    nota: "Fonte: adaptado de Fleming et al., 2011. Contar FR e FC com a criança afebril e sem agitação."
                }
            ],
            itens: [
                "<strong>Outros sinais de esforço:</strong> batimento de asas nasais, retração de fúrcula, tiragem intercostal e subcostal, balanço tóraco-abdominal, balanço da cabeça, gemência, tempo expiratório prolongado.",
                "Hipoxemia (SatO₂ < 92%) ou cianose · apneia · alteração do estado mental (agitação, choro inconsolável, letargia).",
                "Dificuldade para sugar o seio materno · TEC > 2 segundos."
            ]
        },
        {
            aberta: true,
            resumo: "Tabela do Ministério da Saúde e escore WDF clicável.",
            titulo: "Classificação de gravidade",
            icone: "📊",
            tabela: {
                gravidade: true,
                colunas: ["", "Leve", "Moderada", "Grave*"],
                linhas: [
                    ["Nível de consciência", "Normal", "Normal ou irritabilidade leve", "Irritabilidade ou letargia"],
                    ["Padrão respiratório", "Sem desconforto ou taquipneia leve", "Taquipneia e/ou esforço moderado (retrações moderadas, sem gemência, sem balanço tóraco-abdominal e da cabeça)", "Desconforto grave (retrações, gemência, BAN, balanço tóraco-abdominal e/ou da cabeça)"],
                    ["Saturação", "> 92%", "90% – 92%", "< 90%"],
                    ["Apneia", "Não", "Não", "Episódios frequentes ou apneia prolongada"],
                    ["Ingesta alimentar", "Normal", "Normal ou com dificuldade", "Recusa alimentar"]
                ],
                nota: "Qualquer critério de moderada ou grave classifica o caso no nível mais elevado. *Caso crítico: desidratação grave ou falência respiratória iminente. Reavaliar periodicamente, sobretudo em lactentes mais jovens. Fonte: adaptado de Manti et al. (2023)."
            },
            grupos: [
                {
                    nome: `Escore de Wood-Downes modificado por Ferrés ${IMIP}`,
                    escore: {
                        id: "wdf",
                        instrucao: "Toque no que o paciente apresenta em cada item. A soma é feita automaticamente.",
                        itens: [
                            { nome: "Sibilância", opcoes: [[0, "Não"], [1, "Final da expiração"], [2, "Toda a expiração"], [3, "Inspiração + expiração"]] },
                            { nome: "Tiragem", opcoes: [[0, "Não"], [1, "Subcostal + intercostal inferior"], [2, "Subcostal + intercostal inferior + supraclavicular + BAN"], [3, "Anteriores + intercostal superior + supraesternal"]] },
                            { nome: "Ventilação (entrada de ar)", opcoes: [[0, "Boa, simétrica"], [1, "Regular, simétrica"], [2, "Muito diminuída"], [3, "Tórax silencioso (ausência de sibilância)"]] },
                            { nome: "Cianose", opcoes: [[0, "Não"], [1, "Sim"]] },
                            { nome: "Frequência respiratória", opcoes: [[0, "< 30 irpm"], [1, "31–45 irpm"], [2, "46–60 irpm"], [3, "> 60 irpm"]] },
                            { nome: "Frequência cardíaca", opcoes: [[0, "< 120 bpm"], [1, "> 120 bpm"]] }
                        ],
                        faixas: [
                            { min: 1, max: 3, rotulo: "BVA leve", cor: "#16a34a" },
                            { min: 4, max: 7, rotulo: "BVA moderada", cor: "#d97706" },
                            { min: 8, max: 14, rotulo: "BVA grave", cor: "#dc2626" }
                        ],
                        nota: "1–3 = leve · 4–7 = moderada · 8–14 = grave (máximo 14). Antes de aplicar: desobstruir o nariz (lavagem nasal se necessário), decúbito a 30–45° e aguardar o fim de acesso de tosse. No IMIP: escore > 3 é critério de admissão em UTI e > 7 indica insucesso da VNI. A conduta deste app segue a classificação do Ministério da Saúde (tabela acima)."
                    }
                }
            ]
        }
            ]
        },
        {
            titulo: "Condução na emergência e internação",
            icone: "🚨",
            cor: "#dc2626",
            secoes: [
        {
            titulo: "Critérios de internação",
            icone: "🏥",
            alerta: true,
            resumo: "Primeiro decida: UTI, internar, considerar ou casa. Absolutos, relativos e de UTI.",
            escore: {
                id: "internacao_bva",
                unidade: " ",
                checklist: true,
                instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave. Sem nenhum, toque em \"Nenhum\".",
                itens: [
                    { nome: "🔴 UTI", opcoes: [[3, "Alteração do nível de consciência e/ou hipotonia", "🔴"]] },
                    { nome: "", opcoes: [[3, "Apneia", "🔴"]] },
                    { nome: "", opcoes: [[3, "Dispneia grave", "🔴"]] },
                    { nome: "", opcoes: [[3, "SatO₂ < 92% mesmo em oxigenoterapia", "🔴"]] },
                    { nome: "", opcoes: [[3, "pH < 7,3 e pCO₂ > 60", "🔴"]] },
                    { nome: "", opcoes: [[3, "Desidratação grave", "🔴"]] },
                    { nome: "", opcoes: [[3, "Instabilidade hemodinâmica", "🔴"]] },
                    { nome: "🟠 Internar (enfermaria)", opcoes: [[2, "Episódios de apneia (ainda sem critério de UTI)", "🟠"]] },
                    { nome: "", opcoes: [[2, "Comprometimento do estado geral: hipoatividade, prostração, sonolência", "🟠"]] },
                    { nome: "", opcoes: [[2, "Sinais de comprometimento sistêmico", "🟠"]] },
                    { nome: "", opcoes: [[2, "Desconforto respiratório: gemência, retração torácica, taquipneia, cianose e/ou SatO₂ < 92% persistente, balanço da cabeça ou tóraco-abdominal", "🟠"]] },
                    { nome: "", opcoes: [[2, "Sinais de desidratação (ex.: redução da diurese)", "🟠"]] },
                    { nome: "", opcoes: [[2, "Recusa alimentar ou ingestão reduzida", "🟠"]] },
                    { nome: "", opcoes: [[2, "Idade inferior a 2 meses", "🟠"]] },
                    { nome: "🟡 Considerar internar", opcoes: [[1, "Fatores de risco para BVA grave", "🟡"]] },
                    { nome: "", opcoes: [[1, "Condição social precária ou vulnerabilidade social", "🟡"]] },
                    { nome: "", opcoes: [[1, "Dificuldade de acesso ao serviço de saúde se houver piora", "🟡"]] },
                    { nome: "", opcoes: [[1, "Pais ou cuidadores incapazes de identificar os sinais de alerta", "🟡"]] },
                    { nome: "🟢 Nenhum dos acima", opcoes: [[0, "Nenhum critério", "🟢"]] }
                ],
                classificar: (v) => {
                    let g = Math.max(...v);
                    if (g === 3) return { num: "UTI", rotulo: "UTI", cor: "#dc2626", texto: "Terapia intensiva (ver Grave: terapia intensiva e Suporte ventilatório). Pelo Guia do MS, toda BVA grave deve ficar em leito de UTI." };
                    if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Leito de internação (ver Moderada: leito de internação): monitorização, O₂ se SatO₂ ≤ 92%, alimentação e hidratação." };
                    if (g === 1) return { num: "🟡", rotulo: "Considerar internar", cor: "#ca8a04", texto: "Critério relativo: pesar com a família e o acesso ao serviço; na dúvida, observar mais tempo ou internar." };
                    return { num: "🏠", rotulo: "Alta com retorno", cor: "#16a34a", texto: "Leve: acompanhamento ambulatorial e sinais de alerta para a família (bloco 🏠)." };
                },
                nota: "Absolutos e relativos: Guia do Ministério da Saúde. Admissão em UTI: IMIP. Antes era a lista \"Critérios de internação\"; o conteúdo é o mesmo."
            }
        },
        {
            titulo: "Moderada: leito de internação",
            icone: "🏥",
            aberta: true,
            resumo: "Monitorização, O₂, alimentação e hidratação.",                    itens: [
                        "Hospitalizar se não houver resposta satisfatória às medidas iniciais em unidade de observação.",
                        "<strong>Monitorização:</strong> reavaliar continuamente até estabilizar. Depois, sinais vitais (oximetria, FC, FR, temperatura) a cada 2–3 h. Monitorização contínua se CNAF/VNI, apneia documentada ou risco de apneia (prematuros, < 2 meses). Controlar ingesta e diurese.",
                        "Higiene nasal com NaCl 0,9% e aspiração nasal superficial pontual, se secreção abundante com desconforto ou dificuldade para alimentar. Aspiração profunda (oro/nasofaringe) não é recomendada de rotina.",
                        `Aspirar antes das terapias inalatórias. Cabeceira elevada 30–45° em posição supina; se possível, no colo dos pais. ${IMIP}`,
                        "O₂ suplementar umidificado se hipoxemia persistente (SatO₂ ≤ 92%) e/ou esforço respiratório persistente: cânula nasal 1–3 L/min ou máscara facial. Esforço persistente mesmo com saturação no alvo indica escalonar o suporte.",
                        "CNAF indicada na BVA moderada/grave com necessidade de O₂, iniciada o mais precoce possível (ver Suporte ventilatório).",
                        "<strong>Alimentação:</strong> manter VO se o padrão respiratório permitir (CNAF não contraindica VO). Se intolerância, má aceitação, vômitos ou risco de aspiração, usar sonda gástrica/enteral, preferível à hidratação venosa.",
                        "<strong>Hidratação IV:</strong> se desidratação ou intolerância à dieta enteral (distensão, vômitos). Usar solução isotônica (nunca hipotônica), com volume cuidadoso e reavaliado (o excesso piora a congestão). Hiponatremia é comum na BVA grave (secreção de ADH).",
                        "Tratar a febre com antipirético.",
                        "Reavaliação clínica seriada. Reclassificar conforme a evolução."
                    ],
                    remedios: ["soro_nasal", "pct_gts", "dip_gts", "tgi_manutencao"]
        },
        {
            titulo: "Grave: terapia intensiva",
            icone: "🚨",
            resumo: "Suporte ventilatório, monitorização e sedação.",                    itens: [
                        "Monitorização contínua multiparamétrica. Monitorização invasiva da PA, em geral, não se justifica.",
                        "Suporte ventilatório conforme a gravidade: CNAF → CPAP/VNI → VMI. Nas formas mais graves, VNI como primeira linha em vez da CNAF.",
                        "Higiene nasal, manejo da febre e suporte hídrico e nutricional (enteral preferível; IV isotônica, com balanço hídrico).",
                        "Pesquisa viral (RT-PCR) na admissão. Gasometria arterial periódica e individualizada na BVA crítica. Capnografia (ETCO₂) em alguns pacientes. Ecocardiograma funcional (POCUS) ao menos uma vez se em VMI, se disponível.",
                        "Aspiração profunda cuidadosa por equipe treinada pode ser considerada em casos graves na UTIP.",
                        `Isolamento (ou coorte), precaução respiratória. Considerar posição prona nas etapas avançadas. ${IMIP}`,
                        `<strong>Sedação</strong> é medida de exceção, em UTI, para adaptação à VNI quando as medidas não farmacológicas falham (presença ativa dos pais, otimizar interface e alimentação, sacarose). Ter material de intubação e drogas de urgência à mão. ${IMIP}`,
                        `Sedação leve, esquema sugerido: 1ª linha <strong>dexmedetomidina 0,1–1 mcg/kg/h</strong> EV em infusão contínua. 2ª linha <strong>clonidina 4–6 mcg/kg/dose VO 6/6h</strong>. ${IMIP}`
                    ],
                    remedios: ["rsi_cont_precedex"]
        },
        {
            resumo: "CNAF, CPAP/VNI, VMI e checklist de intubação.",
            titulo: "Suporte ventilatório",
            icone: "🫁",
            grupos: [
                {
                    nome: "Cânula nasal de alto fluxo (CNAF)",
                    itens: [
                        "Indicada na BVA moderada/grave, o mais precoce possível. Antes da instalação, considerar fisioterapia respiratória e higienização brônquica.",
                        "<strong>Não indicar:</strong> se insuficiência respiratória iminente, letargia, má perfusão ou apneias.",
                        "FiO₂ inicial 40% ou o suficiente para SpO₂ ≥ 92%. Reavaliar a cada 2 h.",
                        "<strong>Falha:</strong> FiO₂ > 50–60% ou piora do desconforto, hipercapnia, taquipneia, apneia, taquicardia ou bradicardia → escalonar para CPAP, VNI ou VMI.",
                        "<strong>Desmame:</strong> após 12–24 h de resposta, se FiO₂ < 30–40%, desconforto leve ou ausente e FC adequada: reduzir para o fluxo de desmame e a FiO₂. Retirada: FiO₂ < 30% e > 6 h no fluxo de desmame. Sucesso: 48 h fora da CNAF.",
                        "Complicações: hiperemia ou lesão do septo nasal, sangramento nasal, escape de ar."
                    ],
                    tabela: {
                        colunas: ["Peso", "≤ 12 kg", "13–15 kg", "16–30 kg", "31–50 kg", "> 50 kg"],
                        linhas: [
                            ["Fluxo inicial", "2 L/min/kg", "25–30 L/min", "35 L/min", "40 L/min", "50 L/min"],
                            ["Fluxo de desmame", "1 L/min/kg", "15 L/min", "18 L/min", "20 L/min", "25 L/min"]
                        ],
                        nota: "Temperatura 36–37 °C. Fonte: Apêndice A do Guia (adaptado de Richards-Belle et al., 2020)."
                    }
                },
                {
                    nome: "CPAP / VNI",
                    itens: [
                        "Considerar na BVA grave, esforço moderado a grave, insuficiência respiratória e/ou risco de progressão para VMI.",
                        "CPAP inicial 7–8 cmH₂O, FiO₂ 40% ou o suficiente para SpO₂ ≥ 92%. Reavaliar a cada 2 h.",
                        "<strong>Falha:</strong> FiO₂ > 60% ou piora do desconforto, hipercapnia, taquipneia, apneia, taquicardia ou bradicardia → VNI ou VMI.",
                        "<strong>Desmame:</strong> após 12–24 h, se FiO₂ ≤ 40% e desconforto leve a moderado: reduzir para 5 cmH₂O. Retirada: FiO₂ < 30% e desconforto leve ou ausente. Sucesso: 48 h fora do CPAP.",
                        "Interface que favoreça conforto e sincronia. Vigiar lesões de pele e septo nasal.",
                        `Preferir uso intermitente. Testar por 1–2 h. <strong>Insucesso:</strong> agitação, alteração da consciência e/ou hipotonia, FiO₂ > 40–45%, SatO₂/FiO₂ < 221, piora do padrão ou WDF > 7, ou sem resposta em até 2 h → intubação. ${IMIP}`
                    ]
                },
                {
                    nome: "Ventilação mecânica invasiva (VMI)",
                    itens: [
                        "<strong>Indicações:</strong> esforço grave e/ou falência respiratória sem melhora com suporte não invasivo, FiO₂ ≥ 60% para manter SatO₂ ≥ 90%, apneias persistentes ou recorrentes, deterioração do nível de consciência.",
                        "Antecipar descompensação hemodinâmica na indução (bolus de fluido e inotrópico disponíveis). Usar protocolos de sedação/analgesia e, se necessário, bloqueador neuromuscular.",
                        `Parâmetros iniciais sugeridos: PCV ou PRVC, FR 15–18, VC 6–8 mL/kg, PEEP 4–5 cmH₂O, pico < 35 cmH₂O, I:E 1:3, Ti 0,75–0,85 s, FiO₂ < 40%. Pressões inspiratórias maiores que o habitual (alta resistência). ${IMIP}`
                    ],
                    nota: "O Guia do MS ressalta que não há parâmetros ventilatórios específicos recomendados, pela variabilidade dos fenótipos da BVA. Revisar regularmente."
                },
                {
                    nome: "Checklist de intubação e manutenção da VMI",
                    tabela: {
                        colunas: ["Nº", "Item"],
                        linhas: [
                            ["1", "Pré-oxigenação com FiO₂ 100%"],
                            ["2", "Descompressão gástrica com sonda nasogástrica"],
                            ["3", "Considerar bolus de volume (10 mL/kg) antes da sedação"],
                            ["4", "Monitorização de CO₂ expirado (EtCO₂) disponível"],
                            ["5", "Checar todas as conexões do sistema ventilatório"],
                            ["6", "Bolsa-válvula-máscara adequada, FR 20–30 irpm, sem excessos"],
                            ["7", "Dispositivos de resgate para via aérea difícil (ex.: máscara laríngea)"],
                            ["8", "Considerar cânula com cuff (preferencialmente microcuff)"],
                            ["9", "Confirmar posição da cânula por radiografia de tórax"],
                            ["10", "Revisar regularmente as configurações da ventilação"],
                            ["11", "SatO₂ alvo > 90%"],
                            ["12", "EtCO₂ alvo 35–45 mmHg"],
                            ["13", "Aspirar a cânula conforme necessidade, evitar aspiração de rotina"],
                            ["14", "Fisioterapia respiratória regular"],
                            ["15", "Considerar posição prona se oxigenação/ventilação desafiadoras"],
                            ["16", "Evitar PA invasiva, salvo indicação específica"]
                        ],
                        nota: "Fonte: Apêndice C do Guia (adaptado de Evelina London Children's Hospital, 2022)."
                    }
                },
                {
                    nome: `SDRA pediátrica ${IMIP}`,
                    itens: [
                        "Considerar se hipoxemia e novos infiltrados na radiografia (mesmo unilaterais) em até 7 dias da fase aguda.",
                        "Índice de oxigenação (MAP × FiO₂ / PaO₂): 4–8 leve · 8–<16 moderada · ≥ 16 grave.",
                        "Sem gasometria, usar o índice de saturação (MAP × FiO₂ / SpO₂): 5–<7,5 leve · 7,5–<12,3 moderada · ≥ 12,3 grave."
                    ]
                }
            ]
        },
        {
            resumo: "Intervenções não recomendadas.",
            titulo: "O que NÃO fazer (rotina)",
            icone: "🚫",
            alerta: true,
            itens: [
                "<strong>Antimicrobianos</strong>: só se infecção bacteriana concomitante confirmada ou forte suspeita.",
                "Broncodilatadores β2 inalatórios ou EV (salbutamol). Não fazer prova terapêutica de rotina quando o diagnóstico é claro.",
                "Brometo de ipratrópio.",
                "Adrenalina (epinefrina) inalatória.",
                "Corticoide sistêmico ou inalatório.",
                "<strong>Nebulização com salina hipertônica</strong> (≥ 3%): evidência insuficiente para uso rotineiro.",
                "Antileucotrienos (montelucaste), inclusive no pós-bronquiolite.",
                "Descongestionantes e antitussígenos.",
                "Fluidos IV hipotônicos.",
                "Aspiração nasal profunda de rotina.",
                `Sulfato de magnésio, heliox e antivirais. ${IMIP}`,
                "<strong>Fisioterapia respiratória:</strong> não rotineira. Considerar individualmente em comorbidades que dificultem eliminar secreções (doença neuromuscular, alteração estrutural de vias aéreas) e em UTI sob VM."
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
            titulo: "Leve: acompanhamento ambulatorial",
            icone: "🏠",
            aberta: true,
            resumo: "Cuidados em casa e medicações.",                    itens: [
                        "Idade < 2 meses → acompanhamento em leito de internação, mesmo se leve.",
                        "Higiene nasal com SF 0,9%.",
                        "Manter hidratação e alimentação adequadas para a idade (ofertas frequentes e em pequenas quantidades).",
                        "Antitérmico se necessário.",
                        "Higiene das mãos, etiqueta respiratória, manter a criança em casa e evitar contato com outras pessoas. Evitar tabagismo passivo.",
                        "<strong>Não usar:</strong> descongestionantes e medicamentos para tosse (sem benefício e podem ser prejudiciais).",
                        "Nenhuma intervenção farmacológica específica é necessária.",
                        "Orientar evolução esperada e retorno para reavaliação (piora possível entre o 3º e o 5º dia). Retorno imediato se sinais de alerta.",
                        "Manejo ambulatorial não indicado se cuidado insuficiente: insegurança familiar/social, impossibilidade de seguir orientações ou dificuldade de acesso."
                    ],
                    remedios: ["soro_nasal", "pct_gts", "dip_gts", "orientacoes_bva"]
        },
        {
            resumo: "Quando voltar ao serviço de saúde.",
            titulo: "Sinais de alerta (orientar a família)",
            icone: "🚨",
            itens: [
                "Dificuldade para ingerir líquidos ou sugar o seio materno.",
                "Vômitos frequentes após alimentação.",
                "Agitação frequente e/ou alteração do nível de consciência (letargia, sonolência).",
                "Crises convulsivas ou movimentos anormais.",
                "Sinais de desidratação (diurese ausente ou diminuída, urina concentrada, boca seca, olhos fundos).",
                "Cianose (palidez ou coloração arroxeada).",
                "Choro fraco ou dificuldade para chorar.",
                "Respiração mais rápida, batimento de asas do nariz, retrações, tiragem, gemência ou estridor.",
                "Episódios de apneia (pausas na respiração).",
                `Febre por mais de 24 horas. ${IMIP}`
            ],
            remedios: ["orientacoes_bva"]
        },
        {
            resumo: "Critérios de alta e retorno.",
            titulo: "Alta e seguimento",
            icone: "✅",
            itens: [
                "<strong>Critérios de alta:</strong> estabilidade clínica por pelo menos 12 h, SatO₂ > 92% em ar ambiente, melhora do padrão respiratório e ingestão oral suficiente para prevenir desidratação.",
                "Cuidador apto a manter o tratamento, reconhecer sinais de alerta e com acesso ao serviço de saúde.",
                `Alta da UTI: SatO₂ ≥ 92% sem O₂ há pelo menos 24 h e estabilidade clínica por no mínimo 24 h. ${IMIP}`,
                "Reavaliação ambulatorial em até 48 h após a alta e seguimento na atenção primária.",
                "Estridor ou desconforto persistente: reavaliar e encaminhar à atenção secundária. Tosse > 4 semanas: encaminhar para investigação.",
                "Não há medicamento que previna sibilância recorrente ou tosse pós-BVA. Risco de sibilância recorrente/asma cerca de 2,4×. Bronquiolite obliterante é rara (mais associada ao adenovírus)."
            ]
        },
        {
            resumo: "Nirsevimabe, vacina da gestante, isolamento e Sivep-Gripe.",
            titulo: "Prevenção, isolamento e notificação",
            icone: "🛡️",
            itens: [
                "Nirsevimabe (dose única, protege toda a sazonalidade), disponível nos CRIE desde fev/2026 para: prematuros com IG ≤ 36 semanas e 6 dias (qualquer peso); e crianças até 23 meses e 29 dias com cardiopatia congênita hemodinamicamente significativa, broncodisplasia, imunocomprometimento, síndrome de Down, fibrose cística, doença neuromuscular ou anomalias congênitas de vias aéreas.",
                "Palivizumabe 15 mg/kg IM mensal na sazonalidade (até 5 doses). Em 2026, em transição para o nirsevimabe: consultar as Notas Técnicas vigentes.",
                "<strong>Vacina VSR para gestantes:</strong> dose única a partir de 28 semanas de IG (exceto em trabalho de parto ativo).",
                "<strong>No hospital:</strong> precauções padrão + contato e gotículas (máscara cirúrgica, proteção ocular, avental, luvas). Precaução para aerossóis (N95/PFF2) em intubação, VNI e broncoscopia. Quarto privativo ou coorte (≥ 1 m entre leitos).",
                "<strong>Notificação:</strong> todo caso de SRAG hospitalizado (e óbito por SRAG) no Sivep-Gripe em até 24 h. Casos leves ambulatoriais não são de notificação compulsória.",
                "Comunidade: higiene das mãos, etiqueta respiratória, evitar aglomerações e contato com pessoas gripadas, manter aleitamento materno e vacinas em dia, evitar tabagismo passivo."
            ]
        }
            ]
        }
    ],

    citacoes: { "Ministério da Saúde": 0, "MS": 0, "IMIP": 1 }, // sigla no texto → fonte (índice em fontes)
    fontes: [
        "Brasil. Ministério da Saúde. Guia de Manejo Clínico: Bronquiolite Viral Aguda. Brasília: MS, 2026 (1ª edição). Prioridade nas condutas.",
        "Duarte MCMB, Andrade LB et al. Protocolo de Bronquiolite Viral Aguda na Criança. Recife: IMIP, 2024 (informações adicionais, marcadas IMIP)."
    ],
    revisao: "10/2026"
});
})();
