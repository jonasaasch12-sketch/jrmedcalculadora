// =====================================================
// CONDUTA: DOENÇA MÃO-PÉ-BOCA
// Base: OMS (WPRO) 2011 — guia de manejo clínico e resposta em saúde pública;
// Diretriz chinesa de diagnóstico e tratamento (2018, World J Pediatr) — sinais de
// alerta para formas graves (enterovírus A71). Fotos reais: FOTOS_EXANTEMA.
// =====================================================
function ferramentaMaoPeBocaFotos() {
    if (typeof htmlFotoExantema !== 'function') return '';
    return `<div class="exg ex-galeria">${["mao_pe_boca", "mao_pe_boca_boca"].map(k => htmlFotoExantema(k)).join('')}</div>
        <div class="ex-card-desc">Toque na foto para ampliar.</div>`;
}

registrarConduta({
    id: "mao_pe_boca",
    nome: "Doença mão-pé-boca",
    categoria: "Doenças exantemáticas",
    cor: "#0e7490",
    kw: "mao pe boca coxsackie enterovirus a71 vesiculas maos pes nadegas ulceras boca herpangina onicomadese mioclonia creche",
    resumo: "Quadro típico e atípico com fotos, sinais de alerta de forma grave, critérios de internação clicáveis, dor e hidratação, isolamento e volta à creche.",
    legenda: "Conduta conforme o guia da OMS (2011) e a diretriz chinesa de 2018 (sinais de alerta das formas graves). Fotos reais da Wikimedia Commons, com crédito.",
    padraoTexto: true, // padrão de escrita (rótulo azul, subitens ›, caixa de atenção)

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",
                    icone: "🔎",
                    resumo: "Menor de 5 anos, febre baixa, úlceras na boca e vesículas em mãos, pés e nádegas.",
                    itens: [
                        "Diagnóstico clínico, mais em menores de 5 anos, em surtos (creche). Incubação de 3 a 6 dias.",
                        "Febre baixa a moderada, dor de garganta, recusa alimentar e salivação.",
                        "<strong>Boca:</strong> vesículas que viram úlceras dolorosas na língua, mucosa jugal, gengiva e palato.",
                        "<strong>Pele:</strong> pápulas e vesículas ovais em palmas, plantas, nádegas, joelhos e cotovelos; pouco pruriginosas.",
                        "<strong>Forma atípica</strong> (Coxsackie A6): lesões mais extensas e maiores, ao redor da boca, em áreas de eczema; descamação das mãos e pés e queda das unhas (onicomadese) semanas depois.",
                        "<strong>Transmissão:</strong> secreções, saliva, líquido das vesículas e fezes (eliminação nas fezes por semanas)."
                    ],
                    ferramenta: "ferramentaMaoPeBocaFotos"
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Herpangina, gengivoestomatite herpética, varicela, estrófulo, aftas, Kawasaki.",
                    itens: [
                        "<strong>Herpangina</strong> (mesmos vírus): só úlceras no palato mole e pilares, sem lesões de pele.",
                        "<strong>Gengivoestomatite herpética:</strong> gengiva edemaciada e sangrante, úlceras na boca anterior e lábios.",
                        "<strong>Varicela:</strong> lesões centrípetas no tronco, em fases diferentes, muito pruriginosas.",
                        "Estrófulo, aftas, Kawasaki (febre ≥ 5 dias, sem vesículas), sarampo, eritema multiforme.",
                        "Use o Guia de identificação do exantema desta categoria para comparar."
                    ]
                },
                {
                    titulo: "Sinais de alerta de forma grave",
                    icone: "🚨",
                    alerta: true,
                    resumo: "Febre alta persistente, sonolência, mioclonias, ataxia, vômitos, taquipneia, taquicardia, má perfusão.",
                    itens: [
                        "<strong>Maior risco:</strong> menores de 3 anos, nos primeiros 3 dias, pelo enterovírus A71 (diretriz chinesa 2018).",
                        "<strong>Neurológicos:</strong> febre alta persistente, letargia ou irritabilidade, mioclonias (abalos, sobretudo no sono), tremor, ataxia, vômitos repetidos, fraqueza de membros (paralisia flácida), rigidez de nuca.",
                        "<strong>Cardiorrespiratórios:</strong> taquipneia ou ritmo respiratório irregular, taquicardia sem explicação, extremidades frias, enchimento capilar lento, hipertensão; secreção rósea espumosa (edema pulmonar).",
                        "Laboratório que acompanha a piora: leucocitose, hiperglicemia, lactato elevado (diretriz chinesa 2018)."
                    ]
                }
            ]
        },
        {
            titulo: "Condução: passo a passo",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "A maioria é tratada em casa; procurar os sinais de alerta.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "Internar? → dor e hidratação → isolamento e creche → sinais de alarme na alta.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar?</strong> Critérios clicáveis: UTI · enfermaria · casa",
                        "<span class=\"cond-passo\">2</span> <strong>Dor e febre:</strong> analgésico regular para conseguir beber",
                        "<span class=\"cond-passo\">3</span> <strong>Hidratação:</strong> líquidos frios em pequenos volumes; desidratação = conduta de diarreia",
                        "<span class=\"cond-passo\">4</span> <strong>Isolamento e creche:</strong> lavar as mãos, fraldas, volta sem febre e com lesões secando",
                        "<span class=\"cond-passo\">5</span> <strong>Alta:</strong> sinais de alarme neurológicos e de desidratação"
                    ]
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    resumo: "Primeiro decida: UTI, internar ou casa. A forma comum é tratada em casa.",
                    alerta: true,
                    itens: [
                        "A forma leve é tratada em casa (OMS 2011; diretriz chinesa 2018). Internar por desidratação ou por sinal de alerta de forma grave."
                    ],
                    escore: {
                        id: "internacao_mpb",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave. Sem nenhum, toque em \"Nenhum\".",
                        itens: [
                            { nome: "🔴 UTI", opcoes: [[3, "Insuficiência respiratória ou secreção rósea espumosa (edema pulmonar)", "🔴"]] },
                            { nome: "", opcoes: [[3, "Choque ou disfunção cardíaca (má perfusão, taquicardia importante, hipotensão)", "🔴"]] },
                            { nome: "", opcoes: [[3, "Rebaixamento da consciência ou convulsão", "🔴"]] },
                            { nome: "", opcoes: [[3, "Mioclonias com taquicardia, taquipneia ou hipertensão (encefalite de tronco)", "🔴"]] },
                            { nome: "🟠 Internar (enfermaria)", opcoes: [[2, "Desidratação ou não aceita líquidos mesmo com analgesia", "🟠"]] },
                            { nome: "", opcoes: [[2, "Mioclonias, tremor, ataxia, fraqueza de membros ou vômitos repetidos", "🟠"]] },
                            { nome: "", opcoes: [[2, "Letargia, sonolência ou irritabilidade importante", "🟠"]] },
                            { nome: "", opcoes: [[2, "Febre alta persistente (≥ 39 °C por mais de 3 dias)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Taquicardia ou taquipneia sem explicação pela febre", "🟠"]] },
                            { nome: "", opcoes: [[2, "Sem condição de cuidado em casa ou risco social", "🟠"]] },
                            { nome: "🟢 Nenhum dos acima", opcoes: [[0, "Nenhum critério", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI", cor: "#dc2626", texto: "Suporte respiratório e hemodinâmico, monitorização contínua; neurologia/infecto. Precaução de contato e gotículas." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Hidratação (VO ou EV), analgesia, monitorizar FC, FR, PA, perfusão, glicemia e exame neurológico a cada poucas horas nas primeiras 72 h." };
                            return { num: "🏠", rotulo: "Tratar em casa", cor: "#16a34a", texto: "Analgesia, líquidos frios, isolamento em casa e retorno se sinal de alerta (passo 5)." };
                        },
                        nota: "Critérios reunidos do guia da OMS (2011) e dos sinais de alerta de forma grave da diretriz chinesa (2018)."
                    }
                },
                {
                    passo: 2,
                    titulo: "Dor e febre",
                    resumo: "Analgésico regular nos primeiros dias para a criança conseguir beber.",
                    itens: [
                        "Paracetamol, dipirona ou ibuprofeno em horários regulares nos 2 a 3 primeiros dias (a dor das úlceras é o que impede a criança de beber).",
                        "Não há antiviral. Corticoide e imunoglobulina não são de rotina (OMS 2011).",
                        "Evitar anestésicos tópicos (lidocaína) em crianças pequenas pelo risco de absorção."
                    ],
                    remedios: ["pct_gts", "dip_gts", "ibu_gts"]
                },
                {
                    passo: 3,
                    titulo: "Hidratação e alimentação",
                    resumo: "Líquidos frios em pequenos volumes; alimentos pastosos e frios; desidratação = planos da conduta de diarreia.",
                    itens: [
                        "Líquidos frios (água, leite, picolé de fruta) em pequenos volumes e com frequência; alimentos pastosos e frios.",
                        "Evitar alimentos ácidos, salgados ou quentes.",
                        "<strong>Desidratação:</strong> seguir os planos B ou C da conduta de diarreia."
                    ],
                    remedios: ["tgi_sro"]
                },
                {
                    passo: 4,
                    titulo: "Isolamento, creche e notificação",
                    resumo: "Lavar as mãos e cuidar das fraldas. Volta à creche sem febre e com as lesões secando. Notificar surtos.",
                    itens: [
                        "Lavar as mãos (sobretudo após trocar fralda), limpar brinquedos e superfícies, não compartilhar talheres e copos (OMS 2011).",
                        "<strong>Creche/escola:</strong> afastar enquanto houver febre, salivação ou lesões abertas; a eliminação nas fezes continua por semanas, então a higiene segue depois da volta.",
                        "<strong>Internado:</strong> precaução de contato e gotículas.",
                        "Notificar surtos (creches, escolas) à vigilância."
                    ]
                },
                {
                    passo: 5,
                    titulo: "Alta e sinais de alarme",
                    resumo: "Retornar se sonolência, abalos, desequilíbrio, vômitos, respiração rápida ou não bebe.",
                    itens: [
                        "<strong>Retornar se:</strong> sonolência ou irritabilidade intensa, abalos (sobretudo dormindo), tremor ou desequilíbrio, fraqueza nas pernas ou braços, vômitos repetidos, respiração rápida, palidez ou mãos e pés frios, febre alta por mais de 3 dias, não consegue beber, pouca urina.",
                        "As unhas podem cair semanas depois e as mãos e pés descamarem: é esperado e volta ao normal."
                    ],
                    remedios: ["orientacoes_gerais"]
                }
            ]
        },
        {
            titulo: "Ambulatório: prevenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Prevenção e orientação à família",
                    icone: "🛡️",
                    resumo: "Higiene das mãos e das superfícies; sem vacina no Brasil.",
                    itens: [
                        "Lavagem das mãos, limpeza de brinquedos e superfícies, cuidado com fraldas.",
                        "A doença pode se repetir (vírus diferentes). Não há vacina disponível no Brasil."
                    ]
                }
            ]
        }
    ],

    citacoes: { "OMS 2011": 0, "OMS": 0, "diretriz chinesa 2018": 1, "diretriz chinesa": 1 },
    fontes: [
        "World Health Organization, Western Pacific Region. A Guide to Clinical Management and Public Health Response for Hand, Foot and Mouth Disease (HFMD). Manila: WHO WPRO, 2011.",
        "Li XW, Ni X, Qian SY, et al. Chinese guidelines for the diagnosis and treatment of hand, foot and mouth disease (2018 edition). World J Pediatr 2018;14(5):437-447. doi:10.1007/s12519-018-0189-8"
    ],
    revisao: "10/2026"
});
