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
    legenda: "Conduta conforme o <strong>guia da OMS (2011)</strong> e a <strong>diretriz chinesa de 2018</strong> (sinais de alerta das formas graves). Fotos reais da Wikimedia Commons, com crédito.",

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
                        "<strong>Diagnóstico clínico</strong>, mais em <strong>menores de 5 anos</strong>, em surtos (creche). Incubação de 3 a 6 dias.",
                        "<strong>Febre</strong> baixa a moderada, dor de garganta, recusa alimentar e <strong>salivação</strong>.",
                        "<strong>Boca:</strong> vesículas que viram <strong>úlceras dolorosas</strong> na língua, mucosa jugal, gengiva e palato.",
                        "<strong>Pele:</strong> pápulas e <strong>vesículas ovais</strong> em <strong>palmas, plantas, nádegas</strong>, joelhos e cotovelos; pouco pruriginosas.",
                        "<strong>Forma atípica</strong> (Coxsackie A6): lesões mais extensas e maiores, ao redor da boca, em áreas de eczema; <strong>descamação</strong> das mãos e pés e <strong>queda das unhas</strong> (onicomadese) semanas depois.",
                        "<strong>Transmissão:</strong> secreções, saliva, líquido das vesículas e <strong>fezes</strong> (eliminação nas fezes por semanas)."
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
                        "<strong>Estrófulo</strong>, aftas, <strong>Kawasaki</strong> (febre ≥ 5 dias, sem vesículas), sarampo, eritema multiforme.",
                        "Use o <strong>Guia de identificação do exantema</strong> desta categoria para comparar."
                    ]
                },
                {
                    titulo: "Sinais de alerta de forma grave",
                    icone: "🚨",
                    alerta: true,
                    resumo: "Febre alta persistente, sonolência, mioclonias, ataxia, vômitos, taquipneia, taquicardia, má perfusão.",
                    itens: [
                        "<strong>Maior risco:</strong> <strong>menores de 3 anos</strong>, nos <strong>primeiros 3 dias</strong>, pelo enterovírus A71 (diretriz chinesa 2018).",
                        "<strong>Neurológicos:</strong> <strong>febre alta persistente</strong>, letargia ou irritabilidade, <strong>mioclonias</strong> (abalos, sobretudo no sono), tremor, <strong>ataxia</strong>, vômitos repetidos, fraqueza de membros (paralisia flácida), rigidez de nuca.",
                        "<strong>Cardiorrespiratórios:</strong> <strong>taquipneia</strong> ou ritmo respiratório irregular, <strong>taquicardia</strong> sem explicação, extremidades frias, enchimento capilar lento, hipertensão; <strong>secreção rósea espumosa</strong> (edema pulmonar).",
                        "<strong>Laboratório</strong> que acompanha a piora: leucocitose, <strong>hiperglicemia</strong>, lactato elevado (diretriz chinesa 2018)."
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
                        "A <strong>forma leve é tratada em casa</strong> (OMS 2011; diretriz chinesa 2018). Internar por <strong>desidratação</strong> ou por <strong>sinal de alerta</strong> de forma grave."
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
                        "<strong>Paracetamol, dipirona ou ibuprofeno</strong> em horários regulares nos 2 a 3 primeiros dias (a dor das úlceras é o que impede a criança de beber).",
                        "<strong>Não há antiviral</strong>. Corticoide e imunoglobulina <strong>não são de rotina</strong> (OMS 2011).",
                        "Evitar anestésicos tópicos (lidocaína) em crianças pequenas pelo risco de absorção."
                    ],
                    remedios: ["pct_gts", "dip_gts", "ibu_gts"]
                },
                {
                    passo: 3,
                    titulo: "Hidratação e alimentação",
                    resumo: "Líquidos frios em pequenos volumes; alimentos pastosos e frios; desidratação = planos da conduta de diarreia.",
                    itens: [
                        "<strong>Líquidos frios</strong> (água, leite, picolé de fruta) em <strong>pequenos volumes</strong> e com frequência; alimentos <strong>pastosos e frios</strong>.",
                        "<strong>Evitar</strong> alimentos ácidos, salgados ou quentes.",
                        "<strong>Desidratação:</strong> seguir os planos B ou C da <strong>conduta de diarreia</strong>."
                    ],
                    remedios: ["tgi_sro"]
                },
                {
                    passo: 4,
                    titulo: "Isolamento, creche e notificação",
                    resumo: "Lavar as mãos e cuidar das fraldas. Volta à creche sem febre e com as lesões secando. Notificar surtos.",
                    itens: [
                        "<strong>Lavar as mãos</strong> (sobretudo após trocar fralda), limpar brinquedos e superfícies, não compartilhar talheres e copos (OMS 2011).",
                        "<strong>Creche/escola:</strong> afastar enquanto houver <strong>febre</strong>, <strong>salivação</strong> ou <strong>lesões abertas</strong>; a eliminação nas fezes continua por semanas, então a higiene segue depois da volta.",
                        "<strong>Internado:</strong> precaução de <strong>contato e gotículas</strong>.",
                        "<strong>Notificar surtos</strong> (creches, escolas) à vigilância."
                    ]
                },
                {
                    passo: 5,
                    titulo: "Alta e sinais de alarme",
                    resumo: "Retornar se sonolência, abalos, desequilíbrio, vômitos, respiração rápida ou não bebe.",
                    itens: [
                        "<strong>Retornar se:</strong> <strong>sonolência</strong> ou irritabilidade intensa, <strong>abalos</strong> (sobretudo dormindo), <strong>tremor</strong> ou <strong>desequilíbrio</strong>, fraqueza nas pernas ou braços, <strong>vômitos repetidos</strong>, <strong>respiração rápida</strong>, palidez ou mãos e pés frios, <strong>febre alta por mais de 3 dias</strong>, não consegue beber, pouca urina.",
                        "As <strong>unhas podem cair</strong> semanas depois e as mãos e pés descamarem: é esperado e volta ao normal."
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
                        "<strong>Lavagem das mãos</strong>, limpeza de brinquedos e superfícies, cuidado com fraldas.",
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
