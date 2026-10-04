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

    secoes: [
        {
            titulo: "Definição e diagnóstico",
            icone: "🔎",
            itens: [
                "<strong>Definição:</strong> síndrome clínica manifestada por dificuldade respiratória em crianças <strong>menores de 2 anos</strong>, provocada por infecção viral aguda do trato respiratório, com inflamação das vias aéreas inferiores.",
                "<strong>Agentes:</strong> VSR (até 80% dos casos), seguido do rinovírus. Outros: parainfluenza, metapneumovírus, influenza, adenovírus, coronavírus (incluindo SARS-CoV-2) e bocavírus. Cerca de 1/3 dos hospitalizados tem 2 ou mais vírus.",
                "<strong>Quadro:</strong> rinorreia, obstrução nasal e tosse, seguidos (2º–3º dia) de taquipneia, sibilos, crepitações difusas e/ou uso de musculatura acessória. Febre baixa ou ausente. Contactantes com sintomas gripais corroboram.",
                "<strong>Evolução:</strong> pico de gravidade entre o <strong>3º e o 5º dia</strong>. Duração de cerca de 10 dias. Tosse resolve em até 3 semanas em 90%, podendo persistir até 4 semanas.",
                "Avaliar FR, FC e esforço fora do choro, da febre e da agitação. A saturação pode cair no sono.",
                "<strong>Diagnóstico essencialmente clínico.</strong>",
                "<strong>Radiografia de tórax:</strong> não indicada de rotina. Reservar para casos graves, evolução desfavorável, suspeita de complicação/coinfecção bacteriana ou diagnóstico diferencial (especialmente cardiopatas). Tomografia não indicada de rotina. USG pulmonar à beira-leito pode ser considerada em casos graves/UTI.",
                "<strong>Exames laboratoriais:</strong> não rotineiros. Hemograma e proteínas de fase aguda nos casos graves ou com dúvida diagnóstica. Eletrólitos e função renal se desidratação. Gasometria arterial nos casos graves com indicação de VNI/VMI.",
                "<strong>Pesquisa viral (RT-PCR de nasofaringe):</strong> recomendada nos hospitalizados com doença grave / SRAG, na admissão, conforme fluxo local.",
                "<strong>CID-10:</strong> J21 Bronquiolite aguda · J21.0 por vírus sincicial respiratório."
            ]
        },
        {
            titulo: "Diagnóstico diferencial",
            icone: "🧭",
            recolhida: true,
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
                nota: "<strong>Qualquer critério de moderada ou grave classifica o caso no nível mais elevado.</strong> *Caso crítico: desidratação grave ou falência respiratória iminente. Reavaliar periodicamente, sobretudo em lactentes mais jovens. Fonte: adaptado de Manti et al. (2023)."
            },
            grupos: [
                {
                    nome: `Escore de Wood-Downes modificado por Ferrés ${IMIP}`,
                    tabela: {
                        colunas: ["", "0", "1", "2", "3"],
                        linhas: [
                            ["Sibilância", "Não", "Final da expiração", "Toda a expiração", "Inspiração + expiração"],
                            ["Tiragem", "Não", "Subcostal + intercostal inferior", "\"1\" + supraclavicular + BAN", "\"2\" + intercostal superior + supraesternal"],
                            ["Entrada de ar", "Boa, simétrica", "Regular, simétrica", "Muito diminuída", "Tórax silencioso"],
                            ["Cianose", "Não", "Sim", "", ""],
                            ["FR", "< 30", "31 – 45", "46 – 60", "> 60"],
                            ["FC", "< 120", "> 120", "", ""]
                        ],
                        nota: "1–3 = leve · 4–7 = moderada · 8–14 = grave. Antes de aplicar: desobstruir o nariz (lavagem nasal se necessário), decúbito a 30–45° e aguardar o fim de acesso de tosse."
                    }
                }
            ]
        },
        {
            titulo: "Conduta",
            icone: "🩺",
            grupos: [
                {
                    nome: "🏠 Leve: acompanhamento ambulatorial",
                    itens: [
                        "<strong>Idade < 2 meses → acompanhamento em leito de internação</strong>, mesmo se leve.",
                        "Higiene nasal com SF 0,9%.",
                        "Manter hidratação e alimentação adequadas para a idade (ofertas frequentes e em pequenas quantidades).",
                        "Antitérmico se necessário.",
                        "Higiene das mãos, etiqueta respiratória, manter a criança em casa e evitar contato com outras pessoas. Evitar tabagismo passivo.",
                        "<strong>Evitar descongestionantes e medicamentos para tosse</strong> (sem benefício e podem ser prejudiciais).",
                        "Nenhuma intervenção farmacológica específica é necessária.",
                        "Orientar evolução esperada e <strong>retorno para reavaliação</strong> (piora possível entre o 3º e o 5º dia). Retorno imediato se sinais de alerta.",
                        "Manejo ambulatorial não indicado se cuidado insuficiente: insegurança familiar/social, impossibilidade de seguir orientações ou dificuldade de acesso."
                    ],
                    remedios: ["soro_nasal", "pct_gts", "dip_gts", "orientacoes_bva"]
                },
                {
                    nome: "🏥 Moderada: leito de internação",
                    itens: [
                        "Hospitalizar se não houver resposta satisfatória às medidas iniciais em unidade de observação.",
                        "<strong>Monitorização:</strong> reavaliar continuamente até estabilizar. Depois, sinais vitais (oximetria, FC, FR, temperatura) a cada 2–3 h. Monitorização contínua se CNAF/VNI, apneia documentada ou risco de apneia (prematuros, < 2 meses). Controlar ingesta e diurese.",
                        "<strong>Higiene nasal</strong> com NaCl 0,9% e aspiração nasal <strong>superficial</strong> pontual, se secreção abundante com desconforto ou dificuldade para alimentar. Aspiração profunda (oro/nasofaringe) não é recomendada de rotina.",
                        `Aspirar antes das terapias inalatórias. Cabeceira elevada 30–45° em posição supina; se possível, no colo dos pais. ${IMIP}`,
                        "<strong>O₂ suplementar umidificado</strong> se hipoxemia persistente (<strong>SatO₂ ≤ 92%</strong>) e/ou esforço respiratório persistente: cânula nasal 1–3 L/min ou máscara facial. Esforço persistente mesmo com saturação no alvo indica escalonar o suporte.",
                        "<strong>CNAF</strong> indicada na BVA moderada/grave com necessidade de O₂, iniciada o mais precoce possível (ver Suporte ventilatório).",
                        "<strong>Alimentação:</strong> manter VO se o padrão respiratório permitir (CNAF não contraindica VO). Se intolerância, má aceitação, vômitos ou risco de aspiração, usar <strong>sonda gástrica/enteral</strong>, preferível à hidratação venosa.",
                        "<strong>Hidratação IV</strong> se desidratação ou intolerância à dieta enteral (distensão, vômitos). Usar <strong>solução isotônica</strong> (nunca hipotônica), com volume cuidadoso e reavaliado (o excesso piora a congestão). Hiponatremia é comum na BVA grave (secreção de ADH).",
                        "Tratar a febre com antipirético.",
                        "Reavaliação clínica seriada. Reclassificar conforme a evolução."
                    ],
                    remedios: ["soro_nasal", "pct_gts", "dip_gts", "tgi_manutencao"]
                },
                {
                    nome: "🚨 Grave: leito de terapia intensiva",
                    itens: [
                        "Monitorização contínua multiparamétrica. Monitorização invasiva da PA, em geral, não se justifica.",
                        "Suporte ventilatório conforme a gravidade: CNAF → CPAP/VNI → VMI. Nas formas mais graves, <strong>VNI como primeira linha</strong> em vez da CNAF.",
                        "Higiene nasal, manejo da febre e suporte hídrico e nutricional (enteral preferível; IV isotônica, com balanço hídrico).",
                        "Pesquisa viral (RT-PCR) na admissão. Gasometria arterial periódica e individualizada na BVA crítica. Capnografia (ETCO₂) em alguns pacientes. Ecocardiograma funcional (POCUS) ao menos uma vez se em VMI, se disponível.",
                        "Aspiração profunda cuidadosa por equipe treinada pode ser considerada em casos graves na UTIP.",
                        `Isolamento (ou coorte), precaução respiratória. Considerar posição prona nas etapas avançadas. ${IMIP}`,
                        `<strong>Sedação</strong> é medida de exceção, em UTI, para adaptação à VNI quando as medidas não farmacológicas falham (presença ativa dos pais, otimizar interface e alimentação, sacarose). Ter material de intubação e drogas de urgência à mão. ${IMIP}`,
                        `Sedação leve, esquema sugerido: 1ª linha <strong>dexmedetomidina 0,1–1 mcg/kg/h</strong> EV em infusão contínua. 2ª linha <strong>clonidina 4–6 mcg/kg/dose VO 6/6h</strong>. ${IMIP}`
                    ],
                    remedios: ["rsi_cont_precedex"]
                }
            ]
        },
        {
            titulo: "Suporte ventilatório",
            icone: "🫁",
            recolhida: true,
            grupos: [
                {
                    nome: "Cânula nasal de alto fluxo (CNAF)",
                    itens: [
                        "Indicada na BVA moderada/grave, o mais precoce possível. Antes da instalação, considerar fisioterapia respiratória e higienização brônquica.",
                        "<strong>Não indicar</strong> se insuficiência respiratória iminente, letargia, má perfusão ou apneias.",
                        "FiO₂ inicial 40% ou o suficiente para SpO₂ ≥ 92%. Reavaliar a cada 2 h.",
                        "<strong>Falha:</strong> FiO₂ > 50–60% ou piora do desconforto, hipercapnia, taquipneia, apneia, taquicardia ou bradicardia → escalonar para CPAP, VNI ou VMI.",
                        "<strong>Desmame:</strong> após 12–24 h de resposta, se FiO₂ < 30–40%, desconforto leve ou ausente e FC adequada: reduzir para o fluxo de desmame e a FiO₂. <strong>Retirada:</strong> FiO₂ < 30% e > 6 h no fluxo de desmame. Sucesso: 48 h fora da CNAF.",
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
                        "<strong>CPAP inicial 7–8 cmH₂O</strong>, FiO₂ 40% ou o suficiente para SpO₂ ≥ 92%. Reavaliar a cada 2 h.",
                        "<strong>Falha:</strong> FiO₂ > 60% ou piora do desconforto, hipercapnia, taquipneia, apneia, taquicardia ou bradicardia → VNI ou VMI.",
                        "<strong>Desmame:</strong> após 12–24 h, se FiO₂ ≤ 40% e desconforto leve a moderado: reduzir para 5 cmH₂O. <strong>Retirada:</strong> FiO₂ < 30% e desconforto leve ou ausente. Sucesso: 48 h fora do CPAP.",
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
            titulo: "O que NÃO fazer (rotina)",
            icone: "🚫",
            alerta: true,
            itens: [
                "<strong>Antimicrobianos</strong>: só se infecção bacteriana concomitante confirmada ou forte suspeita.",
                "<strong>Broncodilatadores β2</strong> inalatórios ou EV (salbutamol). Não fazer prova terapêutica de rotina quando o diagnóstico é claro.",
                "<strong>Brometo de ipratrópio.</strong>",
                "<strong>Adrenalina</strong> (epinefrina) inalatória.",
                "<strong>Corticoide</strong> sistêmico ou inalatório.",
                "<strong>Nebulização com salina hipertônica</strong> (≥ 3%): evidência insuficiente para uso rotineiro.",
                "<strong>Antileucotrienos</strong> (montelucaste), inclusive no pós-bronquiolite.",
                "Descongestionantes e antitussígenos.",
                "Fluidos IV <strong>hipotônicos</strong>.",
                "Aspiração nasal profunda de rotina.",
                `Sulfato de magnésio, heliox e antivirais. ${IMIP}`,
                "<strong>Fisioterapia respiratória:</strong> não rotineira. Considerar individualmente em comorbidades que dificultem eliminar secreções (doença neuromuscular, alteração estrutural de vias aéreas) e em UTI sob VM."
            ]
        },
        {
            titulo: "Critérios de internação",
            icone: "🏥",
            grupos: [
                {
                    nome: "Absolutos (um ou mais)",
                    itens: [
                        "Episódios de apneia.",
                        "Comprometimento do estado geral: hipoatividade, prostração, sonolência.",
                        "Sinais de comprometimento sistêmico.",
                        "Desconforto respiratório: gemência, retração torácica, taquipneia, cianose e/ou <strong>SatO₂ < 92% persistente</strong>, balanço da cabeça, balanço tóraco-abdominal.",
                        "Sinais de desidratação (ex.: redução da diurese).",
                        "Recusa alimentar ou ingestão reduzida.",
                        "<strong>Idade inferior a 2 meses.</strong>"
                    ]
                },
                {
                    nome: "Relativos",
                    itens: [
                        "Fatores de risco para BVA grave.",
                        "Condição social precária ou vulnerabilidade social.",
                        "Dificuldade de acesso ao serviço de saúde se houver piora.",
                        "Pais ou cuidadores incapazes de identificar os sinais de alerta."
                    ]
                },
                {
                    nome: `Admissão em UTI ${IMIP}`,
                    itens: [
                        "Alteração do nível de consciência e/ou hipotonia · apneia · dispneia grave.",
                        "SatO₂ < 92% mesmo em oxigenoterapia.",
                        "pH < 7,3 e pCO₂ > 60 · desidratação grave · instabilidade hemodinâmica."
                    ],
                    nota: "Pelo Guia do MS: toda BVA grave deve ser acompanhada em leito de terapia intensiva."
                }
            ]
        },
        {
            titulo: "Alta e seguimento",
            icone: "✅",
            itens: [
                "<strong>Critérios de alta:</strong> estabilidade clínica por pelo menos <strong>12 h</strong>, <strong>SatO₂ > 92% em ar ambiente</strong>, melhora do padrão respiratório e ingestão oral suficiente para prevenir desidratação.",
                "Cuidador apto a manter o tratamento, reconhecer sinais de alerta e com acesso ao serviço de saúde.",
                `Alta da UTI: SatO₂ ≥ 92% sem O₂ há pelo menos 24 h e estabilidade clínica por no mínimo 24 h. ${IMIP}`,
                "<strong>Reavaliação ambulatorial em até 48 h</strong> após a alta e seguimento na atenção primária.",
                "Estridor ou desconforto persistente: reavaliar e encaminhar à atenção secundária. <strong>Tosse > 4 semanas:</strong> encaminhar para investigação.",
                "Não há medicamento que previna sibilância recorrente ou tosse pós-BVA. Risco de sibilância recorrente/asma cerca de 2,4×. Bronquiolite obliterante é rara (mais associada ao adenovírus)."
            ]
        },
        {
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
            titulo: "Prevenção, isolamento e notificação",
            icone: "🛡️",
            recolhida: true,
            itens: [
                "<strong>Nirsevimabe</strong> (dose única, protege toda a sazonalidade), disponível nos CRIE desde fev/2026 para: prematuros com IG ≤ 36 semanas e 6 dias (qualquer peso); e crianças até 23 meses e 29 dias com cardiopatia congênita hemodinamicamente significativa, broncodisplasia, imunocomprometimento, síndrome de Down, fibrose cística, doença neuromuscular ou anomalias congênitas de vias aéreas.",
                "<strong>Palivizumabe</strong> 15 mg/kg IM mensal na sazonalidade (até 5 doses). Em 2026, em transição para o nirsevimabe: consultar as Notas Técnicas vigentes.",
                "<strong>Vacina VSR para gestantes:</strong> dose única a partir de 28 semanas de IG (exceto em trabalho de parto ativo).",
                "<strong>No hospital:</strong> precauções padrão + contato e gotículas (máscara cirúrgica, proteção ocular, avental, luvas). Precaução para <strong>aerossóis (N95/PFF2)</strong> em intubação, VNI e broncoscopia. Quarto privativo ou coorte (≥ 1 m entre leitos).",
                "<strong>Notificação:</strong> todo caso de <strong>SRAG hospitalizado</strong> (e óbito por SRAG) no <strong>Sivep-Gripe em até 24 h</strong>. Casos leves ambulatoriais não são de notificação compulsória.",
                "Comunidade: higiene das mãos, etiqueta respiratória, evitar aglomerações e contato com pessoas gripadas, manter aleitamento materno e vacinas em dia, evitar tabagismo passivo."
            ]
        }
    ],

    fontes: [
        "Brasil. Ministério da Saúde. Guia de Manejo Clínico: Bronquiolite Viral Aguda. Brasília: MS, 2026 (1ª edição). Prioridade nas condutas.",
        "Duarte MCMB, Andrade LB et al. Protocolo de Bronquiolite Viral Aguda na Criança. Recife: IMIP, 2024 (informações adicionais, marcadas IMIP)."
    ],
    revisao: "10/2026"
});
})();
