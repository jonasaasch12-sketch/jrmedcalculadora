// =====================================================
// CONDUTA: MENINGITE (BACTERIANA E VIRAL) NA CRIANÇA
// Base: IDSA 2004 (Tunkel) — punção, tomografia, antibiótico por idade, dexametasona, duração;
// ESCMID 2016 (van de Beek); Cochrane 2015 (Brouwer) — corticoide; Bacterial Meningitis
// Score (Nigrovic, JAMA 2007); Ministério da Saúde — Guia de Vigilância (notificação,
// isolamento, quimioprofilaxia). As doses ficam nos cards.
// =====================================================

registrarConduta({
    id: "meningite",
    nome: "Meningite bacteriana e viral",
    categoria: "Infectologia",
    cor: "#7c2d12",
    kw: "meningite bacteriana viral asseptica liquor puncao lombar rigidez de nuca fontanela abaulada pneumococo meningococo haemophilus hib streptococcus agalactiae listeria dexametasona ceftriaxona vancomicina bacterial meningitis score",
    resumo: "Suspeita de meningite: antibiótico sem atrasar (punção só se seguro), dexametasona junto, esquema por idade, isolamento, notificação e quimioprofilaxia.",
    legenda: "Conduta conforme a <strong>IDSA (2004)</strong>, a <strong>ESCMID (2016)</strong> e o <strong>Guia de Vigilância do Ministério da Saúde</strong>, com o <strong>Bacterial Meningitis Score</strong> (2007).",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",
                    icone: "🔎",
                    resumo: "Lactente: febre, irritabilidade, fontanela abaulada, recusa alimentar. Maior: cefaleia, vômitos, rigidez de nuca. Confirmar pelo líquor.",
                    itens: [
                        "<strong>Lactente:</strong> sinais pouco específicos: febre ou hipotermia, <strong>irritabilidade</strong> (choro ao ser pego no colo), <strong>sonolência</strong>, recusa alimentar, vômitos, <strong>fontanela abaulada</strong>, convulsão, apneia. A rigidez de nuca muitas vezes falta.",
                        "<strong>Criança maior e adolescente:</strong> febre, <strong>cefaleia</strong>, <strong>vômitos</strong>, fotofobia, <strong>rigidez de nuca</strong>, sinais de Kernig e Brudzinski, confusão ou rebaixamento.",
                        "<strong>Petéquias ou púrpura:</strong> pensar em <strong>meningococo</strong> (veja a conduta de doença meningocócica).",
                        "<strong>Confirmação: líquor</strong> (citologia, bioquímica, Gram, cultura, látex e PCR). Hemocultura sempre (IDSA 2004).",
                        "<strong>Caso suspeito é de notificação compulsória</strong> (MS)."
                    ]
                },
                {
                    titulo: "Líquor: bacteriana × viral × tuberculosa",
                    icone: "🧪",
                    resumo: "Bacteriana: muitas células com neutrófilos, proteína alta, glicose baixa. Viral: linfócitos, glicose normal.",
                    tabela: {
                        colunas: ["", "Bacteriana", "Viral", "Tuberculosa"],
                        linhas: [
                            ["Aspecto", "Turvo", "Límpido", "Límpido ou xantocrômico"],
                            ["Células/mm³", "Centenas a milhares", "Dezenas a centenas", "Dezenas a centenas"],
                            ["Predomínio", "Neutrófilos", "Linfócitos (neutrófilos no início)", "Linfócitos"],
                            ["Proteína", "Alta", "Normal ou pouco alta", "Muito alta"],
                            ["Glicose", "Baixa (< 40% da sérica)", "Normal", "Baixa"]
                        ]
                    },
                    itens: [
                        "Recém-nascido tem valores normais maiores (até ~20 células/mm³ e proteína até ~100 mg/dL).",
                        "Antibiótico antes da punção pode deixar a cultura negativa e diminuir os neutrófilos: <strong>PCR e látex</strong> continuam úteis."
                    ]
                },
                {
                    titulo: "Bacterial Meningitis Score",
                    icone: "🧮",
                    resumo: "Líquor com pleocitose: 0 ponto = risco muito baixo de meningite bacteriana (> 2 meses, sem antibiótico prévio).",
                    alerta: true,
                    itens: [
                        "<strong>Só vale</strong> para criança de <strong>29 dias a 19 anos</strong> com pleocitose no líquor (≥ 10 células/mm³) e <strong>sem antibiótico antes da punção</strong>. <strong>Não usar</strong> se: menor de 2 meses, toxemia ou choque, <strong>petéquias ou púrpura</strong>, imunodepressão, derivação ventricular ou neurocirurgia recente (Nigrovic 2007).",
                        "No estudo de validação, os 2 casos bacterianos com escore 0 eram menores de 2 meses (Nigrovic 2007)."
                    ],
                    escore: {
                        id: "bms",
                        checklist: true,
                        instrucao: "Toque no que o paciente tem. O que não for marcado conta 0.",
                        itens: [
                            { nome: "", opcoes: [[2, "Gram positivo no líquor"]] },
                            { nome: "", opcoes: [[1, "Neutrófilos no líquor ≥ 1.000/mm³"]] },
                            { nome: "", opcoes: [[1, "Proteína no líquor ≥ 80 mg/dL"]] },
                            { nome: "", opcoes: [[1, "Neutrófilos no sangue ≥ 10.000/mm³"]] },
                            { nome: "", opcoes: [[1, "Convulsão antes ou na chegada"]] },
                            { nome: "", opcoes: [[0, "Nenhum dos itens acima", "0"]] }
                        ],
                        classificar: (v) => {
                            let t = v.reduce((a, b) => a + b, 0);
                            if (t === 0) return { num: 0, rotulo: "Risco muito baixo", cor: "#16a34a", texto: "Risco de meningite bacteriana ~0,1% (Nigrovic 2007). Pode-se considerar observar sem antibiótico se a criança está bem e cumpre todos os critérios de uso." };
                            return { num: t, rotulo: "Não é risco muito baixo", cor: "#dc2626", texto: "Tratar como meningite bacteriana: antibiótico EV e internação." };
                        },
                        nota: "Bacterial Meningitis Score: Nigrovic LE et al., JAMA 2007. Se nada estiver presente, toque em \"Nenhum dos itens acima\"."
                    }
                },
                {
                    titulo: "Agentes por idade e diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "RN: estreptococo do grupo B, E. coli, Listeria. 1–3 meses: + pneumococo, meningococo, Hib. > 3 meses: pneumococo, meningococo, Hib.",
                    itens: [
                        "<strong>Menor de 1 mês:</strong> <em>Streptococcus agalactiae</em> (grupo B), <em>E. coli</em> e outros gram-negativos, <em>Listeria</em> (IDSA 2004).",
                        "<strong>1 a 23 meses:</strong> pneumococo, meningococo, <em>S. agalactiae</em>, <em>H. influenzae</em>, <em>E. coli</em> (IDSA 2004).",
                        "<strong>2 anos ou mais:</strong> meningococo e pneumococo (IDSA 2004). Hib é raro em vacinado.",
                        "<strong>Viral</strong> (enterovírus, o mais comum): criança em bom estado, líquor com linfócitos e glicose normal.",
                        "<strong>Diferencial:</strong> encefalite (herpes: alteração de comportamento, convulsão focal), abscesso cerebral, meningite tuberculosa (evolução subaguda, contato com TB), fúngica (imunodeprimido), hemorragia, meningismo de pneumonia ou faringite."
                    ]
                }
            ]
        },
        {
            titulo: "Condução na emergência: passo a passo",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "O antibiótico não espera a punção nem a tomografia.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "UTI? → ABC, acesso, hemocultura → punção se segura → dexametasona + antibiótico (sem atrasar) → convulsão e HIC → isolar, notificar, quimioprofilaxia → duração e complicações.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar / UTI?</strong> Toda suspeita de bacteriana interna",
                        "<span class=\"cond-passo\">2</span> <strong>ABC</strong>, acesso, glicemia, <strong>hemocultura</strong>; choque: conduta de sepse",
                        "<span class=\"cond-passo\">3</span> <strong>Punção lombar</strong> só se segura; tomografia antes só se indicada",
                        "<span class=\"cond-passo\">4</span> <strong>Dexametasona</strong> antes ou junto da 1ª dose do antibiótico",
                        "<span class=\"cond-passo\">5</span> <strong>Antibiótico empírico por idade</strong>, sem atrasar",
                        "<span class=\"cond-passo\">6</span> <strong>Convulsão, hipertensão intracraniana, líquidos</strong>",
                        "<span class=\"cond-passo\">7</span> <strong>Isolar, notificar</strong> e <strong>quimioprofilaxia</strong> dos contatos",
                        "<span class=\"cond-passo\">8</span> <strong>Duração</strong> pelo agente e <strong>complicações</strong>"
                    ]
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    resumo: "Suspeita de meningite bacteriana interna. Marque o que o paciente tem para decidir UTI. Não atrasa o antibiótico.",
                    alerta: true,
                    itens: [
                        "<strong>Toda suspeita de meningite bacteriana é internada</strong>, com antibiótico EV. A decisão aqui é <strong>UTI ou enfermaria</strong>. Não atrasar o antibiótico (passo 5)."
                    ],
                    escore: {
                        id: "internacao_meningite",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave.",
                        itens: [
                            { nome: "🔴 UTI", opcoes: [[3, "Choque ou má perfusão, ou petéquias que se espalham", "🔴"]] },
                            { nome: "", opcoes: [[3, "Glasgow ≤ 8 a 10, rebaixamento progressivo ou sinais de hipertensão intracraniana", "🔴"]] },
                            { nome: "", opcoes: [[3, "Convulsão prolongada ou repetida, déficit focal", "🔴"]] },
                            { nome: "", opcoes: [[3, "Insuficiência respiratória ou apneia", "🔴"]] },
                            { nome: "🟠 Internar (enfermaria)", opcoes: [[2, "Suspeita de meningite bacteriana, estável", "🟠"]] },
                            { nome: "", opcoes: [[2, "Meningite viral provável em menor de 3 meses ou com mau estado geral, vômitos, dor que não cede", "🟠"]] },
                            { nome: "", opcoes: [[2, "Bacterial Meningitis Score ≥ 1 ou antibiótico antes da punção", "🟠"]] },
                            { nome: "🟢 Pode ir para casa", opcoes: [[0, "Meningite viral provável: criança > 2 meses em bom estado, Bacterial Meningitis Score 0, tolerando via oral, com retorno garantido", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI pediátrica", cor: "#dc2626", texto: "Estabilizar (conduta de sepse se choque), antibiótico já, punção adiada, acionar a UTI." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Antibiótico EV, dexametasona se bacteriana suspeita, sinais vitais, nível de consciência e perímetro cefálico (lactente) seriados." };
                            return { num: "🏠", rotulo: "Alta com retorno", cor: "#16a34a", texto: "Sintomáticos, hidratação oral, retorno em 24 h ou antes se piorar (bloco 🏠). Na dúvida, internar." };
                        },
                        nota: "As diretrizes não trazem lista formal de internação. Critérios reunidos dos sinais de gravidade (IDSA 2004, ESCMID 2016) e do Bacterial Meningitis Score (Nigrovic 2007)."
                    }
                },
                {
                    passo: 2,
                    titulo: "ABC, acesso e hemocultura",
                    resumo: "O₂, monitor, acesso, glicemia, hemocultura, exames. Choque: seguir a conduta de sepse.",
                    itens: [
                        "<strong>O₂</strong>, monitor, oximetria, PA; <strong>glicemia capilar</strong>.",
                        "<strong>Hemocultura</strong> antes do antibiótico, <strong>sem atrasá-lo</strong> (IDSA 2004).",
                        "Exames: hemograma, PCR/procalcitonina, eletrólitos (<strong>sódio</strong>: risco de SIADH), função renal, coagulograma, gasometria, lactato.",
                        "<strong>Choque ou má perfusão:</strong> ressuscitar primeiro (veja a conduta de <strong>sepse</strong>)."
                    ]
                },
                {
                    passo: 3,
                    titulo: "Punção lombar: só se segura",
                    resumo: "Adiar se instável, coagulopatia, sinais de HIC ou infecção no local. Tomografia antes só se indicada; antibiótico primeiro.",
                    itens: [
                        "<strong>A punção não pode atrasar o antibiótico.</strong> Se for demorar, colher hemocultura e tratar (IDSA 2004).",
                        "<strong>Adiar a punção</strong> se: choque ou instabilidade, insuficiência respiratória, <strong>coagulopatia ou plaquetas baixas</strong>, <strong>sinais de hipertensão intracraniana</strong> (rebaixamento importante, pupilas alteradas, bradicardia com hipertensão, papiledema), <strong>déficit focal</strong>, convulsão prolongada recente, infecção no local.",
                        "<strong>Tomografia antes da punção</strong> só se: déficit focal, papiledema, rebaixamento importante, convulsão nova, imunodepressão, derivação ventricular ou neurocirurgia (IDSA 2004). Nesses casos: <strong>hemocultura → dexametasona + antibiótico → tomografia → punção depois</strong>.",
                        "Líquor: citologia, bioquímica, Gram, cultura, látex e <strong>PCR</strong>; medir a pressão de abertura se possível."
                    ]
                },
                {
                    passo: 4,
                    titulo: "Dexametasona",
                    resumo: "Bacteriana suspeita em lactente e criança: 10–20 min antes ou junto da 1ª dose do antibiótico. Não no recém-nascido.",
                    alerta: true,
                    itens: [
                        "<strong>Quando:</strong> suspeita de meningite bacteriana em lactentes e crianças, <strong>10 a 20 minutos antes ou junto</strong> da 1ª dose do antibiótico (IDSA 2004; ESCMID 2016).",
                        "<strong>Benefício:</strong> menos <strong>surdez</strong> e sequelas neurológicas, principalmente na meningite por <strong>Hib</strong> e por <strong>pneumococo</strong> (Cochrane 2015).",
                        "<strong>Não fazer:</strong> no recém-nascido; se o antibiótico já foi dado há várias horas; na meningococcemia sem meningite; na meningite viral provável.",
                        "<strong>Suspender</strong> se a cultura confirmar outro agente que não Hib ou pneumococo (ESCMID 2016)."
                    ],
                    remedios: ["dexa_meningite"]
                },
                {
                    passo: 5,
                    titulo: "Antibiótico empírico por idade",
                    resumo: "RN: ampicilina + cefotaxima (± gentamicina). > 1 mês: ceftriaxona + vancomicina. Encefalite: + aciclovir.",
                    alerta: true,
                    itens: [
                        "<strong>Menor de 1 mês:</strong> <strong>ampicilina + cefotaxima</strong> ou ampicilina + aminoglicosídeo (IDSA 2004); doses da meningite nos cards da sepse neonatal (linha \"com doença do SNC\").",
                        "<strong>1 mês ou mais:</strong> <strong>ceftriaxona</strong> (MS) <strong>+ vancomicina</strong> (cobertura de pneumococo resistente, IDSA 2004). Retirar a vancomicina se o agente for sensível.",
                        "<strong>1 a 3 meses:</strong> considerar associar <strong>ampicilina</strong> se suspeita de <em>Listeria</em> ou estreptococo do grupo B.",
                        "<strong>Encefalite</strong> (alteração de comportamento, convulsão focal, líquor linfocitário): associar <strong>aciclovir</strong>.",
                        "<strong>Ajustar</strong> pelo Gram, cultura e antibiograma."
                    ],
                    remedios: ["cef_meningo", "vancomicina", "amp_neo_sepse", "cefotax_neo_sepse", "genta_neo_sepse", "aciclovir_sepse"]
                },
                {
                    passo: 6,
                    titulo: "Convulsão, hipertensão intracraniana e líquidos",
                    resumo: "Tratar convulsão (conduta própria). HIC: cabeceira 30°, normoventilação, osmoterapia na UTI. Manter normovolemia; vigiar sódio.",
                    itens: [
                        "<strong>Convulsão:</strong> veja a conduta de <strong>crise convulsiva</strong>.",
                        "<strong>Hipertensão intracraniana:</strong> cabeceira a 30°, cabeça na linha média, evitar hipóxia, hipercapnia e hipotensão, tratar febre; osmoterapia (manitol ou salina hipertônica) na UTI.",
                        "<strong>Líquidos:</strong> manter <strong>normovolemia</strong>; não restringir de rotina. Restringir só se SIADH com hiponatremia, sem choque. <strong>Sódio de 12/12 h</strong> nos primeiros dias.",
                        "<strong>Perímetro cefálico</strong> diário no lactente (hidrocefalia, coleção subdural)."
                    ]
                },
                {
                    passo: 7,
                    titulo: "Isolar, notificar e quimioprofilaxia",
                    resumo: "Gotículas por 24 h de antibiótico. Notificar. Meningococo e Hib: quimioprofilaxia dos contatos. Pneumococo: não.",
                    itens: [
                        "<strong>Isolamento por gotículas</strong> até <strong>24 h de antibiótico</strong> eficaz (suspeita de meningococo ou Hib) (MS).",
                        "<strong>Notificar</strong> a vigilância epidemiológica: ela define os contatos (MS).",
                        "<strong>Meningococo:</strong> rifampicina dos contatos próximos (veja a conduta de doença meningocócica).",
                        "<strong>Hib:</strong> rifampicina para os contatos, conforme a vigilância (domicílio com criança menor de 4 anos não vacinada ou imunodeprimida, creche). O paciente também recebe na alta se não tratou com ceftriaxona ou cefotaxima (MS).",
                        "<strong>Pneumococo:</strong> não há quimioprofilaxia."
                    ],
                    remedios: ["rifampicina_profilaxia", "rifampicina_hib"]
                },
                {
                    passo: 8,
                    titulo: "Duração e complicações",
                    resumo: "Meningococo 7 dias, Hib 7–10, pneumococo 10–14, estreptococo B 14–21, gram-negativo 21, Listeria ≥ 21. Audiometria em todos.",
                    itens: [
                        "<strong>Duração</strong> (IDSA 2004): <strong>meningococo 7 dias</strong>; <strong>Hib 7 dias</strong>; <strong>pneumococo 10 a 14 dias</strong>; <strong>estreptococo do grupo B 14 a 21 dias</strong>; <strong>gram-negativo aeróbio 21 dias</strong>; <strong>Listeria 21 dias ou mais</strong>.",
                        "<strong>Repetir a punção</strong> se não melhora em 48 h, no recém-nascido com gram-negativo e no pneumococo resistente que recebeu dexametasona (IDSA 2004).",
                        "<strong>Complicações:</strong> SIADH, coleção subdural, abscesso, hidrocefalia, trombose venosa, infarto cerebral, <strong>surdez</strong>, epilepsia, atraso do desenvolvimento.",
                        "<strong>Febre que volta ou persiste</strong> além de 5 a 7 dias: procurar coleção, flebite, febre por fármaco ou outro foco.",
                        "<strong>Audiometria</strong> antes da alta ou logo depois em toda meningite bacteriana."
                    ]
                }
            ]
        },
        {
            titulo: "Ambulatório: casa e manutenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Meningite viral em casa",
                    icone: "🏠",
                    resumo: "Analgésico, antitérmico, hidratação, repouso. Retorno em 24 h ou antes se piorar.",
                    itens: [
                        "Criança maior de 2 meses, em bom estado, <strong>Bacterial Meningitis Score 0</strong>, tolerando via oral e com retorno garantido: tratamento sintomático em casa.",
                        "<strong>Analgésico/antitérmico</strong>, hidratação, repouso. Melhora em 7 a 10 dias.",
                        "<strong>Voltar já</strong> se: sonolência ou confusão, convulsão, vômitos que não param, manchas roxas na pele, piora da dor de cabeça ou da febre."
                    ]
                },
                {
                    titulo: "Seguimento após meningite bacteriana",
                    icone: "📋",
                    resumo: "Audiometria, desenvolvimento, neurologia se sequela, vacinas, investigar imunidade se recorrente.",
                    itens: [
                        "<strong>Audiometria</strong> (se surdez profunda, encaminhar logo: implante coclear tem janela curta por ossificação da cóclea).",
                        "Acompanhar <strong>desenvolvimento</strong>, aprendizagem e epilepsia; neurologia e reabilitação se sequela.",
                        "<strong>Meningite recorrente</strong>: investigar fístula liquórica, defeito anatômico, asplenia e deficiência de complemento ou de anticorpos.",
                        "<strong>Vacinas:</strong> pneumocócica, Hib, meningocócicas C/ACWY e B conforme calendário e CRIE."
                    ]
                }
            ]
        }
    ],

    citacoes: { "IDSA 2004": 0, "ESCMID 2016": 1, "Cochrane 2015": 2, "Nigrovic 2007": 3, "MS": 4 },
    fontes: [
        "Tunkel AR, Hartman BJ, Kaplan SL, et al. Practice guidelines for the management of bacterial meningitis (IDSA). Clin Infect Dis 2004;39(9):1267-84. doi:10.1086/425368",
        "van de Beek D, Cabellos C, Dzupova O, et al. ESCMID guideline: diagnosis and treatment of acute bacterial meningitis. Clin Microbiol Infect 2016;22 Suppl 3:S37-62. doi:10.1016/j.cmi.2016.01.007",
        "Brouwer MC, McIntyre P, Prasad K, van de Beek D. Corticosteroids for acute bacterial meningitis. Cochrane Database Syst Rev 2015;(9):CD004405. doi:10.1002/14651858.CD004405.pub5",
        "Nigrovic LE, Kuppermann N, Macias CG, et al. Clinical prediction rule for identifying children with cerebrospinal fluid pleocytosis at very low risk of bacterial meningitis. JAMA 2007;297(1):52-60. doi:10.1001/jama.297.1.52",
        "Brasil. Ministério da Saúde. Guia de Vigilância em Saúde. 6ª ed. Brasília: MS, 2023. Capítulo: Meningites (notificação, isolamento e quimioprofilaxia)."
    ],
    revisao: "10/2026"
});
