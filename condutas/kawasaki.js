// =====================================================
// CONDUTA: DOENÇA DE KAWASAKI
// Base: AHA 2017 (McCrindle, Circulation) — critérios, algoritmo do incompleto, IGIV, AAS,
// resistência, ecocardiograma; AHA 2024 (Jone, Circulation) — atualização (alto risco,
// anti-inflamatórios, imagem); SBP — DC de Reumatologia (2019).
// Fotos reais: FOTOS_EXANTEMA (condutas/exantematicas.js, carregado antes).
// =====================================================
function ferramentaKawasakiFotos() {
    if (typeof htmlFotoExantema !== 'function') return '';
    return `<div class="exg ex-galeria">${["kawasaki_olhos", "kawasaki_labios", "kawasaki_maos", "kawasaki_perineo"].map(k => htmlFotoExantema(k)).join('')}</div>
        <div class="ex-card-desc">Toque na foto para ampliar.</div>`;
}

registrarConduta({
    id: "kawasaki",
    nome: "Doença de Kawasaki",
    categoria: "Doenças exantemáticas",
    cor: "#b45309",
    kw: "kawasaki doenca de kawasaki febre 5 dias conjuntivite labios fissurados lingua em framboesa exantema polimorfo edema maos pes descamacao adenomegalia cervical aneurisma coronariano imunoglobulina igiv aas incompleto",
    resumo: "Critérios clássicos e algoritmo do incompleto clicáveis, internação, imunoglobulina em até 10 dias, AAS, resistência, ecocardiograma e seguimento.",
    legenda: "Conduta conforme as declarações científicas da AHA (2017 e atualização 2024) e o Departamento de Reumatologia da SBP. Fotos reais da Wikimedia Commons, com crédito.",
    padraoTexto: true, // padrão de escrita (rótulo azul, subitens ›, caixa de atenção)

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico: critérios clássicos (clicável)",
                    icone: "🔎",
                    resumo: "Febre ≥ 5 dias + 4 dos 5 critérios. Toque no que a criança tem.",
                    itens: [
                        { texto: "<strong>Kawasaki completo</strong> (AHA 2017): febre ≥ 5 dias + ≥ 4 dos 5 critérios abaixo (não precisam estar presentes ao mesmo tempo).", sub: [
                            "<strong>Olhos:</strong> conjuntivite bilateral sem secreção, poupando o limbo.",
                            "<strong>Boca:</strong> lábios vermelhos e rachados, língua em framboesa, hiperemia difusa da orofaringe.",
                            "<strong>Pele:</strong> exantema polimorfo (maculopapular, eritema difuso, tipo eritema multiforme), não vesicular; acentuação no períneo.",
                            "<strong>Extremidades:</strong> eritema e edema endurado de mãos e pés na fase aguda; descamação periungueal na 2ª a 3ª semana.",
                            "<strong>Linfonodo:</strong> adenomegalia cervical ≥ 1,5 cm, geralmente unilateral (o critério menos frequente)."
                        ] },
                        "<strong>Achados que ajudam:</strong> irritabilidade intensa, eritema ou endurecimento na cicatriz da BCG, uretrite, artrite, hidropsia de vesícula, uveíte anterior."
                    ],
                    escore: {
                        id: "kawasaki_criterios",
                        unidade: " ",
                        instrucao: "Toque na febre e em cada critério. A classificação sai automaticamente (AHA 2017).",
                        itens: [
                            { nome: "Febre", opcoes: [[0, "Menos de 5 dias", "< 5"], [1, "5 dias ou mais", "≥ 5"], [2, "Lactente com febre ≥ 7 dias sem outra causa", "≥ 7"]] },
                            { nome: "Conjuntivite bilateral sem secreção", opcoes: [[1, "Sim", "✓"], [0, "Não", "—"]] },
                            { nome: "Lábios/língua/orofaringe alterados", opcoes: [[1, "Sim", "✓"], [0, "Não", "—"]] },
                            { nome: "Exantema polimorfo (não vesicular)", opcoes: [[1, "Sim", "✓"], [0, "Não", "—"]] },
                            { nome: "Mãos e pés: eritema/edema ou descamação periungueal", opcoes: [[1, "Sim", "✓"], [0, "Não", "—"]] },
                            { nome: "Adenomegalia cervical ≥ 1,5 cm", opcoes: [[1, "Sim", "✓"], [0, "Não", "—"]] }
                        ],
                        classificar: (v, m, n) => {
                            if (Object.keys(m).length < n) return { num: "?", rotulo: "", cor: "#64748b", texto: "" };
                            let c = [1, 2, 3, 4, 5].reduce((a, k) => a + (m[k] || 0), 0), f = m[0];
                            if (f >= 1 && c >= 4) return { num: c + "/5", rotulo: "Kawasaki completo", cor: "#dc2626", texto: "Internar, ecocardiograma e imunoglobulina EV (passos 1 a 4). Descartar os diferenciais." };
                            if (f === 0 && c >= 4) return { num: c + "/5", rotulo: "Critérios completos com febre < 5 dias", cor: "#d97706", texto: "Com ≥ 4 critérios (sobretudo mãos e pés típicos), o diagnóstico pode ser feito no 4º dia por quem tem experiência (AHA 2017). Discutir com reumato/cardiologia." };
                            if ((f === 1 && c >= 2) || f === 2) return { num: c + "/5", rotulo: "Suspeita de Kawasaki incompleto", cor: "#d97706", texto: "Dosar PCR e VHS e seguir o algoritmo do incompleto (seção abaixo)." };
                            if (f === 1) return { num: c + "/5", rotulo: "Não preenche os critérios", cor: "#16a34a", texto: "Procurar outra causa da febre. Reavaliar se surgirem novos critérios ou descamação dos dedos." };
                            return { num: c + "/5", rotulo: "Ainda sem critérios", cor: "#16a34a", texto: "Reavaliar diariamente; os critérios aparecem em sequência." };
                        },
                        nota: "AHA 2017: completo = febre ≥ 5 dias + ≥ 4 critérios. Incompleto: febre ≥ 5 dias com 2 ou 3 critérios, ou lactente com febre ≥ 7 dias sem explicação."
                    },
                    ferramenta: "ferramentaKawasakiFotos"
                },
                {
                    titulo: "Kawasaki incompleto: algoritmo (clicável)",
                    icone: "🧪",
                    resumo: "PCR ≥ 3 mg/dL ou VHS ≥ 40 + ≥ 3 achados de laboratório ou eco alterado = tratar.",
                    itens: [
                        "<strong>Quando usar:</strong> febre ≥ 5 dias com 2 ou 3 critérios, ou lactente com febre ≥ 7 dias sem outra causa (AHA 2017).",
                        "<strong>PCR &lt; 3 mg/dL e VHS &lt; 40 mm/h:</strong> seguimento diário; se a febre continuar, repetir os exames; se surgir descamação típica, fazer ecocardiograma.",
                        "Lactentes &lt; 6 meses com febre prolongada sem causa: maior risco de aneurisma e quadro incompleto; pensar sempre."
                    ],
                    escore: {
                        id: "kawasaki_incompleto",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque no que estiver presente. Comece pela PCR/VHS.",
                        itens: [
                            { nome: "Inflamação", opcoes: [[100, "PCR ≥ 3 mg/dL ou VHS ≥ 40 mm/h", "⚡"]] },
                            { nome: "Achados de laboratório (precisa de ≥ 3)", opcoes: [[1, "Anemia para a idade", "1"]] },
                            { nome: "", opcoes: [[1, "Plaquetas ≥ 450.000 após o 7º dia de febre", "1"]] },
                            { nome: "", opcoes: [[1, "Albumina ≤ 3,0 g/dL", "1"]] },
                            { nome: "", opcoes: [[1, "TGP (ALT) elevada", "1"]] },
                            { nome: "", opcoes: [[1, "Leucócitos ≥ 15.000 após o 7º dia de febre", "1"]] },
                            { nome: "", opcoes: [[1, "Urina com ≥ 10 leucócitos por campo", "1"]] },
                            { nome: "Ecocardiograma", opcoes: [[50, "Alterado: z-escore DA ou CD ≥ 2,5, aneurisma, ou ≥ 3 outros achados", "🫀"]] }
                        ],
                        classificar: (v) => {
                            let pcr = v.includes(100), eco = v.includes(50), lab = v.filter(x => x === 1).length;
                            if (!pcr && !eco) return { num: "—", rotulo: "PCR < 3 e VHS < 40", cor: "#16a34a", texto: "Seguimento diário. Febre persistente: repetir PCR/VHS. Descamação típica: ecocardiograma." };
                            if (eco || lab >= 3) return { num: "💉", rotulo: "Tratar como Kawasaki", cor: "#dc2626", texto: "Imunoglobulina EV e AAS (passos 3 e 4)." };
                            return { num: lab + "/6", rotulo: "Fazer ecocardiograma", cor: "#d97706", texto: "Eco alterado: tratar. Eco normal e febre persistente: repetir o eco e discutir com o especialista. Febre cessou: improvável." };
                        },
                        nota: "Algoritmo do Kawasaki incompleto da AHA 2017 (Figura 3). Eco alterado: z-escore da descendente anterior ou coronária direita ≥ 2,5, aneurisma, ou ≥ 3 achados (brilho perivascular, falta de afilamento, disfunção do VE, insuficiência mitral, derrame pericárdico, z-escore 2 a 2,5)."
                    }
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "MIS-C, viroses (adenovírus, sarampo), escarlatina, choque tóxico, reação a droga, artrite idiopática juvenil.",
                    itens: [
                        "Síndrome inflamatória multissistêmica (MIS-C) pós-COVID: idade maior, sintomas gastrointestinais, choque, disfunção miocárdica.",
                        "<strong>Adenovírus, sarampo, EBV, enterovírus:</strong> conjuntivite com secreção, exsudato, quadro viral claro.",
                        "Escarlatina (responde ao antibiótico em 24 a 48 h), síndrome do choque tóxico, Stevens-Johnson e reação a droga (DRESS), AIJ sistêmica, leptospirose, febre maculosa.",
                        "Use o Guia de identificação do exantema desta categoria para comparar."
                    ]
                },
                {
                    titulo: "Ecocardiograma: classificação das coronárias",
                    icone: "🫀",
                    resumo: "Pelo z-escore: sem alteração < 2; dilatação 2 a < 2,5; aneurisma pequeno 2,5 a < 5; médio 5 a < 10; gigante ≥ 10 ou ≥ 8 mm.",
                    tabela: {
                        colunas: ["Classificação (z-escore)", "Coronárias"],
                        linhas: [
                            ["Sem acometimento", "&lt; 2"],
                            ["Só dilatação", "2 a &lt; 2,5 (ou queda ≥ 1 no seguimento)"],
                            ["Aneurisma pequeno", "≥ 2,5 a &lt; 5"],
                            ["Aneurisma médio", "≥ 5 a &lt; 10, com diâmetro &lt; 8 mm"],
                            ["Aneurisma grande ou gigante", "≥ 10, ou diâmetro ≥ 8 mm"]
                        ],
                        nota: "AHA 2017. Eco no diagnóstico, em 1 a 2 semanas e em 4 a 6 semanas; mais vezes se houver alteração."
                    }
                }
            ]
        },
        {
            titulo: "Condução hospitalar: passo a passo",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Imunoglobulina nos primeiros 10 dias de febre (ideal até o 7º).",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "Internar → confirmar e eco → imunoglobulina → AAS → alto risco → resistência → eco e alta.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar / UTI?</strong> Todo caso para imunoglobulina interna; choque e disfunção miocárdica = UTI",
                        "<span class=\"cond-passo\">2</span> <strong>Confirmar:</strong> critérios, exames, ECG e ecocardiograma; descartar diferenciais",
                        "<span class=\"cond-passo\">3</span> <strong>Imunoglobulina EV:</strong> 2 g/kg em 10 a 12 h, até o 10º dia de febre (ou depois, se ainda inflamado)",
                        "<span class=\"cond-passo\">4</span> <strong>AAS:</strong> dose anti-inflamatória até 48 a 72 h sem febre, depois dose baixa",
                        "<span class=\"cond-passo\">5</span> <strong>Alto risco de aneurisma:</strong> considerar corticoide junto",
                        "<span class=\"cond-passo\">6</span> <strong>Febre ≥ 36 h após a imunoglobulina:</strong> resistente → 2ª dose ou alternativas",
                        "<span class=\"cond-passo\">7</span> <strong>Alta:</strong> eco de controle, AAS em dose baixa; adiar vacinas de vírus vivo"
                    ]
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    resumo: "Todo Kawasaki com indicação de tratamento interna. Decida se é UTI.",
                    alerta: true,
                    itens: [
                        "A imunoglobulina é feita internado, com monitorização da infusão, eco e controle da febre (AHA 2017)."
                    ],
                    escore: {
                        id: "internacao_kawasaki",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave. Sem nenhum, toque em \"Nenhum\".",
                        itens: [
                            { nome: "🔴 UTI", opcoes: [[3, "Choque (síndrome de choque do Kawasaki) ou hipotensão", "🔴"]] },
                            { nome: "", opcoes: [[3, "Disfunção miocárdica, insuficiência cardíaca ou arritmia", "🔴"]] },
                            { nome: "", opcoes: [[3, "Suspeita de síndrome de ativação macrofágica (febre persistente, citopenias, ferritina muito alta, fígado)", "🔴"]] },
                            { nome: "", opcoes: [[3, "Aneurisma gigante com trombo ou sinais de isquemia", "🔴"]] },
                            { nome: "🟠 Internar (enfermaria)", opcoes: [[2, "Kawasaki completo", "🟠"]] },
                            { nome: "", opcoes: [[2, "Kawasaki incompleto com indicação de tratamento (algoritmo)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Lactente com febre ≥ 7 dias sem causa, em investigação", "🟠"]] },
                            { nome: "🟢 Nenhum dos acima", opcoes: [[0, "Nenhum critério", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI pediátrica", cor: "#dc2626", texto: "Estabilizar, ecocardiograma urgente, imunoglobulina e cardiologia/reumatologia. No choque, pensar também em MIS-C e síndrome do choque tóxico." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Ecocardiograma e imunoglobulina EV 2 g/kg + AAS (passos 3 e 4)." };
                            return { num: "🏠", rotulo: "Seguimento ambulatorial", cor: "#16a34a", texto: "Sem critérios: reavaliar todo dia enquanto houver febre; voltar se surgirem novos critérios ou descamação dos dedos." };
                        },
                        nota: "Internação para o tratamento com imunoglobulina: AHA 2017. Critérios de UTI reunidos das complicações descritas na AHA 2017 e 2024 (síndrome de choque, miocardite, ativação macrofágica, trombose coronariana)."
                    }
                },
                {
                    passo: 2,
                    titulo: "Confirmar o diagnóstico e ecocardiograma",
                    resumo: "Hemograma, PCR, VHS, albumina, TGP, urina, ECG e eco ao diagnóstico.",
                    itens: [
                        "<strong>Exames:</strong> hemograma, plaquetas, PCR e VHS, albumina, TGP, sódio, urina (leucocitúria estéril), ECG.",
                        "Ecocardiograma ao diagnóstico, sem atrasar o tratamento (AHA 2017).",
                        "Descartar os diferenciais (bloco 🔎): sorologias e testes virais conforme o quadro, teste para estreptococo, hemoculturas se toxemia.",
                        "Não esperar todos os critérios aparecerem se o algoritmo do incompleto indicar tratamento."
                    ]
                },
                {
                    passo: 3,
                    titulo: "Imunoglobulina EV",
                    resumo: "2 g/kg em dose única, infusão em 10 a 12 h, até o 10º dia de febre.",
                    alerta: true,
                    itens: [
                        "Imunoglobulina humana EV 2 g/kg em dose única, infundida em 10 a 12 horas (AHA 2017).",
                        "<strong>Quando:</strong> nos primeiros 10 dias de febre, de preferência até o 7º dia. Depois do 10º dia: tratar se ainda houver febre ou PCR/VHS elevadas, ou se houver aneurisma (AHA 2017).",
                        "<strong>Na infusão:</strong> sinais vitais, reações (febre, calafrios, hipotensão); reduzir a velocidade se houver reação. Hemólise é possível, sobretudo em grupo sanguíneo não O.",
                        "<strong>Vacinas de vírus vivo</strong> (tríplice/tetra viral, varicela): adiar 11 meses após a imunoglobulina (AHA 2017)."
                    ],
                    remedios: ["ivig_kawasaki"]
                },
                {
                    passo: 4,
                    titulo: "AAS",
                    resumo: "Dose anti-inflamatória até 48 a 72 h sem febre; depois dose baixa (antiagregante) por 4 a 6 semanas.",
                    itens: [
                        "AAS em dose moderada (30 a 50 mg/kg/dia) ou alta (80 a 100 mg/kg/dia), dividida em 4 tomadas, até 48 a 72 h sem febre (AHA 2017).",
                        "Depois: AAS em dose baixa, 3 a 5 mg/kg/dia, 1 vez ao dia, até o eco de 4 a 6 semanas normal; mais tempo se houver aneurisma (AHA 2017).",
                        { alerta: "evitar ibuprofeno junto com o AAS (bloqueia o efeito antiagregante)." },
                        "<strong>Síndrome de Reye:</strong> se a criança pegar influenza ou varicela em uso de AAS, suspender e trocar o antiagregante com o especialista. Vacina da influenza inativada é recomendada."
                    ],
                    remedios: ["aas_kawasaki_aguda", "aas_kawasaki_baixa"]
                },
                {
                    passo: 5,
                    titulo: "Alto risco de aneurisma: terapia adjunta",
                    resumo: "z-escore ≥ 2,5 no 1º eco, lactente < 6 meses, síndrome de choque: considerar corticoide junto com a imunoglobulina.",
                    itens: [
                        "Alto risco de aneurisma: z-escore ≥ 2,5 já no 1º eco, lactente &lt; 6 meses, síndrome de choque, ativação macrofágica, PCR muito alta (AHA 2017; AHA 2024).",
                        "Nesses casos, considerar corticoide junto com a imunoglobulina e o AAS, com reumatologia/cardiologia (AHA 2017; AHA 2024)."
                    ]
                },
                {
                    passo: 6,
                    titulo: "Resistência à imunoglobulina",
                    resumo: "Febre ≥ 36 h após o fim da infusão: 2ª dose de imunoglobulina ou alternativas com o especialista.",
                    itens: [
                        "<strong>Resistente:</strong> febre persistente ou que volta ≥ 36 h após o fim da imunoglobulina (10 a 20% dos casos) (AHA 2017).",
                        "<strong>Opções:</strong> 2ª dose de imunoglobulina 2 g/kg; pulso de metilprednisolona ou prednisolona com desmame; infliximabe; ciclosporina nos refratários (AHA 2017; AHA 2024).",
                        "Discutir com reumatologia e cardiologia pediátrica; repetir o eco."
                    ],
                    remedios: ["ivig_kawasaki"]
                },
                {
                    passo: 7,
                    titulo: "Eco de controle e alta",
                    resumo: "Alta sem febre há 24 a 48 h, com AAS em dose baixa e eco marcado.",
                    itens: [
                        "Alta com a criança sem febre, com AAS em dose baixa e eco marcado em 1 a 2 semanas e em 4 a 6 semanas (AHA 2017).",
                        "<strong>Aneurisma:</strong> antiagregação dupla ou anticoagulação conforme o tamanho, com o cardiologista (AHA 2017; AHA 2024).",
                        "Orientar retorno se a febre voltar, dor no peito, palidez, choro inconsolável ou falta de ar."
                    ],
                    remedios: ["aas_kawasaki_baixa"]
                }
            ]
        },
        {
            titulo: "Ambulatório: seguimento e prevenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Seguimento cardiológico",
                    icone: "🫀",
                    resumo: "Pelo maior z-escore: sem aneurisma, alta do cardiologista em até 12 meses; com aneurisma, seguimento por toda a vida.",
                    itens: [
                        "<strong>Sem acometimento ou só dilatação:</strong> AAS até 4 a 6 semanas; reavaliação cardiológica e alta em até 12 meses (AHA 2017).",
                        "<strong>Aneurisma:</strong> seguimento por toda a vida, com testes de isquemia e imagem conforme o tamanho (AHA 2017; AHA 2024).",
                        "Recorrência em 1 a 3% dos casos."
                    ]
                },
                {
                    titulo: "Vacinas",
                    icone: "💉",
                    resumo: "Vírus vivo só 11 meses após a imunoglobulina; influenza inativada em uso de AAS.",
                    itens: [
                        "<strong>Tríplice/tetra viral e varicela:</strong> adiar 11 meses após a imunoglobulina; se aplicada antes, repetir depois (AHA 2017).",
                        "Influenza inativada anual enquanto usar AAS. As demais vacinas inativadas seguem o calendário."
                    ]
                }
            ]
        }
    ],

    citacoes: { "AHA 2017": 0, "AHA 2024": 1, "AHA": [0, 1], "SBP": 2 },
    fontes: [
        "McCrindle BW, Rowley AH, Newburger JW, et al. Diagnosis, Treatment, and Long-Term Management of Kawasaki Disease: A Scientific Statement From the American Heart Association. Circulation 2017;135(17):e927-e999. doi:10.1161/CIR.0000000000000484",
        "Jone PN, Tremoulet A, Choueiter N, et al. Update on Diagnosis and Management of Kawasaki Disease: A Scientific Statement From the American Heart Association. Circulation 2024;150(23):e481-e500. doi:10.1161/CIR.0000000000001295",
        "Sociedade Brasileira de Pediatria. Departamento Científico de Reumatologia. Doença de Kawasaki. Documento Científico, 2019."
    ],
    revisao: "10/2026"
});
