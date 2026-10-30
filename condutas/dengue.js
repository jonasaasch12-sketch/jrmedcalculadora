// =====================================================
// CONDUTA: DENGUE
// Base: Ministério da Saúde — Dengue: diagnóstico e manejo clínico: adulto e criança (6ª ed., 2024):
// fases, sinais de alarme, classificação de risco A/B/C/D, hidratação, alta.
// Os remédios são ids dos cards (farmaciaJR): o volume é calculado lá.
// =====================================================
function ferramentaDengueFotos() {
    if (typeof htmlFotoExantema !== 'function') return '';
    return `<div class="exg ex-galeria">${["dengue"].map(k => htmlFotoExantema(k)).join('')}</div>`;
}

registrarConduta({
    id: "dengue",
    nome: "Dengue",
    categoria: "Infectologia",
    cor: "#b91c1c",
    kw: "dengue arbovirose aedes febre dor retro orbitaria sinais de alarme grupo a b c d prova do laco hematocrito plaquetas hidratacao choque extravasamento plasmatico chikungunya zika",
    resumo: "Classificação de risco A, B, C e D clicável (decide casa, observação, internação ou UTI), sinais de alarme, hidratação por grupo, prova do laço e critérios de alta.",
    legenda: "Conduta conforme o manual do Ministério da Saúde: Dengue, diagnóstico e manejo clínico, adulto e criança (6ª ed., 2024).",
    padraoTexto: true, // padrão de escrita (rótulo azul, subitens ›, caixa de atenção)

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Caso suspeito e fases da doença",
                    icone: "🔎",
                    resumo: "Febre de 2 a 7 dias + 2 sintomas (náusea, exantema, mialgia, cefaleia, dor retro-orbitária, petéquias, leucopenia). Fase crítica na queda da febre.",
                    itens: [
                        "<strong>Caso suspeito</strong> (MS): febre de 2 a 7 dias, em área com transmissão, com 2 ou mais: náusea/vômitos, exantema, mialgia/artralgia, cefaleia, dor retro-orbitária, petéquias ou prova do laço positiva, leucopenia. Criança: febre sem foco aparente em área de transmissão também é suspeita.",
                        "<strong>Fase febril</strong> (2 a 7 dias): febre alta, dor no corpo, exantema morbiliforme pruriginoso.",
                        "<strong>Fase crítica</strong> (em geral do 3º ao 7º dia, na queda da febre): extravasamento de plasma, sinais de alarme e risco de choque.",
                        { alerta: "a melhora da febre não é sinal de cura: a fase crítica começa justamente na queda da febre." },
                        "<strong>Fase de recuperação:</strong> reabsorção do líquido; exantema com \"ilhas brancas\", prurido; cuidado com sobrecarga de volume.",
                        "<strong>Na criança:</strong> o choque pode ser o primeiro sinal; sonolência, recusa de líquidos e dor abdominal são frequentes.",
                        "<strong>Notificação:</strong> compulsória de todo caso suspeito; óbitos e casos graves de forma imediata (MS)."
                    ],
                    ferramenta: "ferramentaDengueFotos"
                },
                {
                    titulo: "Sinais de alarme e de choque",
                    icone: "🚨",
                    alerta: true,
                    resumo: "Alarme = grupo C (internar). Choque, sangramento grave ou disfunção de órgão = grupo D (UTI).",
                    itens: [
                        "<strong>Sinais de alarme</strong> (MS): dor abdominal intensa e contínua; vômitos persistentes; acúmulo de líquidos (ascite, derrame pleural ou pericárdico); hipotensão postural e/ou lipotimia; hepatomegalia > 2 cm abaixo do rebordo costal; sangramento de mucosa; letargia e/ou irritabilidade; aumento progressivo do hematócrito.",
                        "<strong>Sinais de choque</strong> (MS): taquicardia, extremidades frias, pulso fraco e filiforme, enchimento capilar > 2 s, PA convergente (diferencial ≤ 20 mmHg), taquipneia, oligúria, hipotensão (tardia), cianose.",
                        "<strong>Dengue grave:</strong> choque ou acúmulo de líquido com desconforto respiratório, sangramento grave, disfunção grave de órgão (fígado, coração, SNC, rim)."
                    ]
                },
                {
                    titulo: "Prova do laço",
                    icone: "🩸",
                    resumo: "Obrigatória se não houver sangramento espontâneo. Criança: 3 min; positiva com ≥ 10 petéquias no quadrado de 2,5 cm.",
                    itens: [
                        "Fazer em todo caso suspeito sem sangramento espontâneo (MS).",
                        "Calcular a PA média ((PAS + PAD) ÷ 2), insuflar o manguito nesse valor por 3 minutos na criança (5 minutos no adulto).",
                        "Desenhar um quadrado de 2,5 cm no antebraço e contar as petéquias: positiva com ≥ 10 na criança (≥ 20 no adulto).",
                        "Prova positiva ou sangramento de pele: no mínimo grupo B."
                    ]
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Chikungunya, zika, influenza, COVID-19, enteroviroses, leptospirose, meningococcemia, sarampo.",
                    itens: [
                        "Chikungunya (artralgia intensa) e zika (exantema precoce, conjuntivite, pouca febre).",
                        "Influenza, COVID-19, enteroviroses, sarampo e rubéola, escarlatina, Kawasaki.",
                        "<strong>Febre + petéquias com toxemia:</strong> pensar em meningococcemia (conduta nesta área).",
                        "Leptospirose (enchente, icterícia, dor na panturrilha), febre maculosa (carrapato), malária (área endêmica)."
                    ]
                }
            ]
        },
        {
            titulo: "Condução: passo a passo por grupo",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Classificar e reclassificar a cada atendimento.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "Classificar (A, B, C, D) → hidratar conforme o grupo → reavaliar → alta com critérios.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Classificar o risco:</strong> A casa · B observar com hemograma · C internar · D UTI",
                        "<span class=\"cond-passo\">2</span> <strong>Grupo A:</strong> hidratação oral em casa, antitérmico sem AAS/anti-inflamatório, retorno na queda da febre",
                        "<span class=\"cond-passo\">3</span> <strong>Grupo B:</strong> hemograma obrigatório; hidratação oral na unidade até o resultado",
                        "<span class=\"cond-passo\">4</span> <strong>Grupo C:</strong> SF 10 mL/kg na 1ª hora, reavaliar, até 3 vezes; depois manutenção",
                        "<span class=\"cond-passo\">5</span> <strong>Grupo D:</strong> SF 20 mL/kg em 20 min, até 3 vezes; UTI",
                        "<span class=\"cond-passo\">6</span> <strong>Alta:</strong> estável há 48 h, sem febre há 24 h, hematócrito estável, plaquetas subindo"
                    ]
                },
                {
                    passo: 1,
                    titulo: "🏥 Classificação de risco e internação",
                    resumo: "Toque no que o paciente tem. O grupo decide: casa (A), observação (B), internação (C) ou UTI (D).",
                    alerta: true,
                    itens: [
                        "A classificação da dengue já é o critério de internação (MS): A casa · B observação na unidade com hemograma · C leito de internação · D UTI. Reclassificar em todo retorno."
                    ],
                    escore: {
                        id: "dengue_grupo",
                        unidade: "grupo",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o grupo mais grave. Sem nenhum, toque em \"Nenhum\".",
                        itens: [
                            { nome: "🔴 Grupo D (UTI)", opcoes: [[4, "Sinais de choque (extremidades frias, enchimento capilar > 2 s, PA convergente, hipotensão)", "D"]] },
                            { nome: "", opcoes: [[4, "Desconforto respiratório por acúmulo de líquido", "D"]] },
                            { nome: "", opcoes: [[4, "Sangramento grave ou disfunção grave de órgão", "D"]] },
                            { nome: "🟠 Grupo C (internar)", opcoes: [[3, "Dor abdominal intensa e contínua", "C"]] },
                            { nome: "", opcoes: [[3, "Vômitos persistentes", "C"]] },
                            { nome: "", opcoes: [[3, "Acúmulo de líquidos (ascite, derrame pleural ou pericárdico)", "C"]] },
                            { nome: "", opcoes: [[3, "Hipotensão postural e/ou lipotimia", "C"]] },
                            { nome: "", opcoes: [[3, "Hepatomegalia > 2 cm", "C"]] },
                            { nome: "", opcoes: [[3, "Sangramento de mucosa", "C"]] },
                            { nome: "", opcoes: [[3, "Letargia e/ou irritabilidade", "C"]] },
                            { nome: "", opcoes: [[3, "Aumento progressivo do hematócrito", "C"]] },
                            { nome: "🟡 Grupo B (observar com hemograma)", opcoes: [[2, "Sangramento de pele espontâneo ou prova do laço positiva", "B"]] },
                            { nome: "", opcoes: [[2, "Lactente (< 24 meses)", "B"]] },
                            { nome: "", opcoes: [[2, "Doença de base (cardíaca, renal, hepática, hematológica, diabetes, asma grave, imunodepressão), gestante", "B"]] },
                            { nome: "", opcoes: [[2, "Risco social", "B"]] },
                            { nome: "🟢 Nenhum dos acima", opcoes: [[1, "Sem sinal de alarme, sem sangramento e sem condição especial", "A"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 4) return { num: "D", rotulo: "Grupo D: UTI", cor: "#dc2626", texto: "SF 0,9% 20 mL/kg em até 20 min, reavaliar e repetir até 3 vezes (passo 5). Acionar a UTI." };
                            if (g === 3) return { num: "C", rotulo: "Grupo C: internar", cor: "#ea580c", texto: "Leito de internação. SF 0,9% 10 mL/kg na 1ª hora, reavaliar, até 3 vezes (passo 4). Hematócrito, plaquetas, albumina, transaminases; RX de tórax e ultrassom." };
                            if (g === 2) return { num: "B", rotulo: "Grupo B: observar", cor: "#ca8a04", texto: "Hemograma obrigatório; hidratação oral supervisionada na unidade até o resultado (passo 3)." };
                            return { num: "A", rotulo: "Grupo A: casa", cor: "#16a34a", texto: "Hidratação oral, antitérmico (sem AAS/anti-inflamatório), cartão de acompanhamento, retorno no dia da melhora da febre ou se sinal de alarme (passo 2)." };
                        },
                        nota: "Classificação de risco do manual do Ministério da Saúde (2024). Condições especiais do grupo B: lactentes, gestantes, idosos, comorbidades e risco social."
                    }
                },
                {
                    passo: 2,
                    titulo: "Grupo A: tratamento em casa",
                    resumo: "Hidratação oral pelo peso, paracetamol ou dipirona, sem AAS/anti-inflamatório, retorno na queda da febre.",
                    itens: [
                        "Hidratação oral pelo peso: 1/3 em SRO e 2/3 em líquidos caseiros, até 24 a 48 h sem febre (MS).",
                        "<strong>Febre e dor:</strong> paracetamol ou dipirona.",
                        { alerta: "não usar AAS nem anti-inflamatórios (ibuprofeno, cetoprofeno, nimesulida)." },
                        "Repouso, cartão de acompanhamento e retorno no dia da melhora da febre (fase crítica) ou imediatamente se aparecer sinal de alarme.",
                        "Exames não são obrigatórios no grupo A; hemograma a critério clínico."
                    ],
                    remedios: ["dengue_hidratacao_oral", "pct_gts", "dip_gts", "orientacoes_dengue"]
                },
                {
                    passo: 3,
                    titulo: "Grupo B: observar com hemograma",
                    resumo: "Hemograma obrigatório. Hidratação oral supervisionada até o resultado. Hematócrito normal: casa com retorno diário.",
                    itens: [
                        "Hemograma obrigatório, com resultado no mesmo atendimento (MS).",
                        "Hidratação oral supervisionada na unidade enquanto aguarda (volume do card).",
                        "Hematócrito normal e sem alarme: tratar como grupo A, com reavaliação diária até 48 h após a queda da febre.",
                        "Hemoconcentração (hematócrito subindo) ou sinal de alarme: grupo C."
                    ],
                    remedios: ["dengue_hidratacao_oral"]
                },
                {
                    passo: 4,
                    titulo: "Grupo C: expansão e manutenção",
                    resumo: "SF 0,9% 10 mL/kg na 1ª hora; reavaliar e repetir até 3 vezes; melhorou: manutenção.",
                    itens: [
                        "Internar. Colher hematócrito, plaquetas, albumina, transaminases; RX de tórax e ultrassom de abdome (derrames, ascite).",
                        "SF 0,9% 10 mL/kg na 1ª hora; reavaliar clínica e hematócrito (em 2 h); repetir até 3 vezes se não melhorar (MS).",
                        "<strong>Melhorou:</strong> hidratação venosa de manutenção e reavaliação frequente; reduzir aos poucos conforme a melhora.",
                        "<strong>Não melhorou ou piorou:</strong> conduta do grupo D.",
                        "Diurese e sinais de sobrecarga (crepitações, piora do desconforto, hepatomegalia) a cada reavaliação."
                    ],
                    remedios: ["dengue_expansao_c", "tgi_manutencao"]
                },
                {
                    passo: 5,
                    titulo: "Grupo D: choque",
                    resumo: "SF 0,9% 20 mL/kg em até 20 min, até 3 vezes; UTI; hematócrito orienta albumina ou sangue.",
                    alerta: true,
                    itens: [
                        "SF 0,9% 20 mL/kg em até 20 minutos, reavaliando após cada etapa; repetir até 3 vezes (MS). Acionar a UTI.",
                        "<strong>Melhorou:</strong> seguir a expansão do grupo C.",
                        "<strong>Sem melhora com hematócrito subindo:</strong> albumina ou coloide; hematócrito caindo com choque: pensar em hemorragia, concentrado de hemácias.",
                        "<strong>Choque persistente:</strong> droga vasoativa e suporte em UTI. Plaquetas só se sangramento importante, conforme o caso."
                    ],
                    remedios: ["dengue_choque_d"]
                },
                {
                    passo: 6,
                    titulo: "Critérios de alta",
                    resumo: "Estável há 48 h, sem febre há 24 h, melhora clínica, hematócrito normal e estável, plaquetas subindo.",
                    itens: [
                        "<strong>Alta da internação</strong> (MS): estabilidade hemodinâmica há 48 h, sem febre há 24 h, melhora visível, hematócrito normal e estável há 24 h, plaquetas em elevação, sem derrames com desconforto.",
                        "Retorno para reavaliação clínica e laboratorial; orientar os sinais de alarme."
                    ],
                    remedios: ["orientacoes_dengue"]
                }
            ]
        },
        {
            titulo: "Ambulatório: retorno e prevenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Retorno e cartão de acompanhamento",
                    icone: "📋",
                    resumo: "Todo paciente sai com o cartão; retorno na queda da febre e diário no grupo B.",
                    itens: [
                        "Cartão de acompanhamento com o grupo, a data de início dos sintomas e os sinais de alarme.",
                        "<strong>Grupo A:</strong> retorno no dia da melhora da febre (ou no 5º dia, se a febre continuar). Grupo B: reavaliação diária."
                    ]
                },
                {
                    titulo: "Prevenção",
                    icone: "🛡️",
                    resumo: "Eliminar criadouros, repelente, tela; vacina de dengue no SUS na faixa etária indicada.",
                    itens: [
                        "Eliminar água parada (criadouros do <em>Aedes</em>), telas, roupas compridas e repelente adequado à idade.",
                        "Vacina da dengue no SUS para a faixa etária definida pelo Ministério da Saúde; conferir o calendário vigente."
                    ]
                }
            ]
        }
    ],

    citacoes: { "MS": 0, "Ministério da Saúde": 0 },
    fontes: [
        "Brasil. Ministério da Saúde. Dengue: diagnóstico e manejo clínico: adulto e criança. 6ª ed. Brasília: MS, 2024."
    ],
    revisao: "10/2026"
});
