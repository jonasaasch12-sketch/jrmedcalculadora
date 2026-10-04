// =====================================================
// CONDUTA: BRONQUIOLITE VIRAL AGUDA
// Conteúdo clínico. Os remédios são só referências aos cards
// já existentes (farmaciaJR) — a dose é sempre calculada lá.
// =====================================================
registrarConduta({
    id: "bronquiolite",
    nome: "Bronquiolite Viral Aguda",
    categoria: "Respiratório",
    cor: "#0284c7",
    kw: "bronquiolite bva vsr sincicial lactente sibilancia",
    resumo: "Primeiro episódio de sibilância em < 2 anos, após pródromo de IVAS.",

    secoes: [
        {
            titulo: "Definição e diagnóstico",
            icone: "🔎",
            itens: [
                "Primeiro episódio de sibilância em lactente < 2 anos (pico entre 2 e 6 meses).",
                "Pródromo de IVAS (coriza, tosse, febre baixa) por 2–3 dias, seguido de taquipneia, tiragem, sibilos e/ou crepitações.",
                "Principal agente: <strong>VSR</strong> (outros: rinovírus, metapneumovírus, parainfluenza, adenovírus).",
                "Diagnóstico <strong>clínico</strong>. Não pedir de rotina: radiografia de tórax, hemograma ou pesquisa viral."
            ]
        },
        {
            titulo: "Fatores de risco para gravidade",
            icone: "⚠️",
            itens: [
                "Idade < 3 meses · prematuridade (< 35 semanas)",
                "Cardiopatia congênita com repercussão hemodinâmica · doença pulmonar crônica (DBP)",
                "Imunodeficiência · doença neuromuscular · síndrome de Down"
            ]
        },
        {
            titulo: "Classificação de gravidade",
            icone: "📊",
            tabela: {
                colunas: ["", "Leve", "Moderada", "Grave"],
                linhas: [
                    ["Frequência respiratória", "Normal ou pouco ↑", "↑", "Muito ↑ (> 70 irpm) ou bradipneia"],
                    ["Esforço", "Ausente ou leve", "Tiragem moderada, BAN", "Tiragem intensa, gemência, apneia"],
                    ["SatO₂ (ar ambiente)", "≥ 95%", "90–94%", "< 90%"],
                    ["Alimentação", "Normal", "< 50–75% do habitual", "Recusa / incapaz"],
                    ["Estado geral", "Bom", "Irritado", "Letárgico / toxemiado"]
                ]
            }
        },
        {
            titulo: "Conduta",
            icone: "🩺",
            grupos: [
                {
                    nome: "🏠 Leve — domiciliar",
                    itens: [
                        "Lavagem nasal com SF 0,9% e aspiração das narinas <strong>antes das mamadas</strong> e antes de dormir.",
                        "Fracionar a dieta; manter aleitamento materno.",
                        "Antitérmico se febre.",
                        "Orientar sinais de alarme e reavaliar em 24–48 h."
                    ],
                    remedios: ["soro_nasal", "pct_gts", "dip_gts"]
                },
                {
                    nome: "🏥 Moderada / grave — hospitalar",
                    itens: [
                        "Decúbito elevado (30°) e aspiração de vias aéreas superiores.",
                        "<strong>O₂ suplementar se SatO₂ &lt; 94–95%</strong> (cateter nasal → máscara → CNAF conforme necessidade).",
                        "Taquipneia importante: dieta por <strong>sonda nasoenteral</strong>.",
                        "Casos graves: dieta zero + hidratação venosa com <strong>2/3 da cota hídrica</strong> (risco de SIHAD).",
                        "Salina hipertônica 3% inalatória, junto com broncodilatador (protocolo HIAS).",
                        "Broncodilatador (β2): <strong>não usar de rotina</strong> — apenas teste terapêutico; manter só se houver resposta clínica clara."
                    ],
                    remedios: ["salina_hipertonica", "salb_neb", "fenoterol_gts", "tgi_manutencao"]
                }
            ]
        },
        {
            titulo: "O que NÃO fazer",
            icone: "🚫",
            alerta: true,
            itens: [
                "Corticoide sistêmico ou inalatório — sem benefício.",
                "Antibiótico sem evidência de infecção bacteriana secundária.",
                "Fisioterapia respiratória de rotina.",
                "Descongestionantes, antitussígenos e mucolíticos.",
                "Adrenalina inalatória de rotina."
            ]
        },
        {
            titulo: "Critérios de internação e sinais de alarme",
            icone: "🚨",
            itens: [
                "SatO₂ persistentemente &lt; 92–94% em ar ambiente.",
                "Desconforto respiratório moderado/grave, apneia ou cianose.",
                "Ingesta &lt; 50% do habitual ou desidratação.",
                "Idade &lt; 3 meses ou prematuro com fatores de risco.",
                "Letargia, toxemia ou condição social que impeça seguimento.",
                "<strong>UTI:</strong> apneias recorrentes, falha do O₂/CNAF, hipercapnia, exaustão."
            ]
        },
        {
            titulo: "Evolução atípica / arrastada",
            icone: "🕒",
            itens: [
                "Imunomodulação com azitromicina 5 mg/kg/dia, 3x por semana (protocolo HIAS) — avaliar caso a caso.",
                "Prevenção do VSR em grupos de risco: palivizumabe / nirsevimabe conforme critérios do Ministério da Saúde."
            ]
        }
    ],

    fonte: "SBP — Diretrizes para o manejo da infecção causada pelo VSR; Manual de Condutas HIAS. ⚠️ PRÉVIA — conteúdo a revisar pelo Dr. Jonas antes de publicar.",
    revisao: "10/2026"
});
