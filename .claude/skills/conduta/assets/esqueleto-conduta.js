// =====================================================
// CONDUTA: NOME DA DOENÇA
// Base: DIRETRIZ (ANO) — o que foi tirado dela (diagnóstico, tratamento, internação...).
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
// Conduta ainda não conferida pelo Dr. Jonas: fica só no teste.
// Quando ele liberar, trocar para true (e avisar no CLAUDE.md).
const NOMEDADOENCA_LIBERADA = false;

if (NOMEDADOENCA_LIBERADA || (typeof MODO_TESTE !== 'undefined' && MODO_TESTE)) registrarConduta({
    id: "nome_da_doenca",                 // igual ao nome do arquivo: condutas/nome_da_doenca.js
    nome: "Nome da Doença",
    categoria: "Respiratório",            // a mesma grafia das outras condutas da categoria
    cor: "#0369a1",
    kw: "palavras da busca sem acento sintomas sinonimos nome popular",
    resumo: "Uma linha com o que a conduta cobre.",
    legenda: "Conduta conforme a diretriz DIRETRIZ (ANO).",
    padraoTexto: true,

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",       // sempre a 1ª seção do 1º bloco
                    icone: "🔎",
                    resumo: "Uma linha: como se faz o diagnóstico.",
                    itens: [
                        "<strong>Critério:</strong> texto técnico, igual à fonte (DIRETRIZ ANO).",
                        { texto: "<strong>Rótulo:</strong> frase que abre uma lista.", sub: [
                            "primeiro subitem;",
                            "segundo subitem."
                        ] },
                        { alerta: "ponto de atenção em minúscula, só o que muda a conduta." }
                    ]
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Uma linha com os principais diferenciais.",
                    itens: [
                        "<strong>Doença parecida:</strong> o que diferencia."
                    ]
                },
                {
                    titulo: "Gravidade",          // a gravidade ou o escore vem por último no bloco
                    icone: "📊",
                    resumo: "Uma linha: como classificar.",
                    itens: [
                        "Marque o que o paciente apresenta em cada item."
                    ],
                    escore: {
                        id: "gravidade_nome_da_doenca",   // único no app inteiro
                        instrucao: "Toque no que o paciente apresenta em cada item. A soma é feita automaticamente.",
                        itens: [
                            { nome: "Item do escore", opcoes: [[0, "Ausente"], [1, "Presente"]] },
                            { nome: "Outro item", opcoes: [[0, "Normal"], [1, "Alterado"], [2, "Muito alterado"]] }
                        ],
                        faixas: [
                            { min: 0, max: 1, rotulo: "Leve", cor: "#16a34a" },
                            { min: 2, max: 3, rotulo: "Grave", cor: "#dc2626", texto: "O que fazer nesta faixa." }
                        ],
                        nota: "De onde veio o escore (autor, ano) e o máximo de pontos."
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
                    titulo: "Linha do tempo (resumo)",   // sempre a 1ª seção deste bloco
                    icone: "⏱️",
                    resumo: "Internar? → primeira medida → tratamento → reavaliar.",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar?</strong> Critérios clicáveis: UTI · enfermaria · casa",
                        "<span class=\"cond-passo\">2</span> <strong>Tratamento:</strong> o que fazer, em uma linha"
                    ],
                    lista: "passos"
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    resumo: "Primeiro decida: UTI, internar ou tratar em casa. Marque o que o paciente tem.",
                    itens: [
                        "Quando internar, em frases curtas (DIRETRIZ ANO)."
                    ],
                    escore: {
                        id: "internacao_nome_da_doenca",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave. Sem nenhum, toque em \"Nenhum\".",
                        itens: [
                            { nome: "🔴 UTI pediátrica", opcoes: [[2, "Critério de UTI", "🔴"]] },
                            { nome: "🟠 Internar (enfermaria)", opcoes: [[1, "Critério de enfermaria", "🟠"]] },
                            { nome: "🟢 Nenhum dos acima", opcoes: [[0, "Nenhum critério", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 2) return { num: "UTI", rotulo: "UTI pediátrica", cor: "#dc2626", texto: "O que fazer." };
                            if (g === 1) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "O que fazer." };
                            return { num: "🏠", rotulo: "Alta com retorno", cor: "#16a34a", texto: "Em que condições e quando reavaliar." };
                        },
                        nota: "De onde vieram os critérios. Se a diretriz não traz lista formal, dizer isso aqui."
                    }
                },
                {
                    passo: 2,
                    titulo: "Tratamento",
                    resumo: "Uma linha: o que fazer neste passo.",
                    itens: [
                        "<strong>Primeira escolha:</strong> frase curta e imperativa."
                    ],
                    remedios: ["dip_gts"]        // ids de cards que existem; a dose nunca é escrita aqui
                }
            ]
        },
        {
            titulo: "Ambulatório: casa e manutenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Orientações e retorno",
                    icone: "🏠",
                    resumo: "Uma linha: o que orientar e quando voltar.",
                    itens: [
                        "<strong>Retornar se:</strong> sinais de alarme."
                    ]
                }
            ]
        }
    ],

    citacoes: { "DIRETRIZ ANO": 0, "DIRETRIZ": 0 },   // sigla que aparece no texto → posição em fontes
    fontes: [
        "Autor AB, Autor CD, et al. Título do documento. Revista Ano;volume(número):páginas. doi:..."
    ],
    revisao: "MM/AAAA"
});
