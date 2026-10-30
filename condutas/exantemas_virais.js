// =====================================================
// CONDUTAS: RUBÉOLA, EXANTEMA SÚBITO E ERITEMA INFECCIOSO
// Rubéola: Ministério da Saúde — Guia de Vigilância em Saúde e Notas Técnicas Conjuntas 344 e 345/2025.
// Exantema súbito: revisão de Leung et al. (Curr Pediatr Rev 2024).
// Eritema infeccioso: revisão de Bloise et al. (Ital J Pediatr 2024) e Servey et al. (Am Fam Physician 2007).
// Fotos reais: FOTOS_EXANTEMA (condutas/exantematicas.js, carregado antes).
// =====================================================
function ferramentaFotosExantema(lista) {
    if (typeof htmlFotoExantema !== 'function') return '';
    return `<div class="exg ex-galeria">${lista.map(k => htmlFotoExantema(k)).join('')}</div>`;
}
function ferramentaRubeolaFotos() { return ferramentaFotosExantema(["rubeola"]); }
function ferramentaRoseolaFotos() { return ferramentaFotosExantema(["roseola"]); }
function ferramentaEritemaFotos() { return ferramentaFotosExantema(["eritema_infeccioso"]); }

// Monta o checklist padrão de internação (🔴 UTI = 3, 🟠 enfermaria = 2, 🟢 nenhum = 0)
function escoreInternacaoExantema(id, uti, enf, txt, nota) {
    let itens = [];
    uti.forEach((t, k) => itens.push({ nome: k ? "" : "🔴 UTI", opcoes: [[3, t, "🔴"]] }));
    enf.forEach((t, k) => itens.push({ nome: k ? "" : "🟠 Internar (enfermaria)", opcoes: [[2, t, "🟠"]] }));
    itens.push({ nome: "🟢 Nenhum dos acima", opcoes: [[0, "Nenhum critério", "🟢"]] });
    return {
        id, unidade: " ", checklist: true,
        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave. Sem nenhum, toque em \"Nenhum\".",
        itens,
        classificar: (v) => {
            let g = Math.max(...v);
            if (g === 3) return { num: "UTI", rotulo: "UTI", cor: "#dc2626", texto: txt[0] };
            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: txt[1] };
            return { num: "🏠", rotulo: "Tratar em casa", cor: "#16a34a", texto: txt[2] };
        },
        nota
    };
}

// ---------------- RUBÉOLA ----------------
registrarConduta({
    id: "rubeola",
    nome: "Rubéola",
    categoria: "Doenças exantemáticas",
    cor: "#db2777",
    kw: "rubeola exantema maculopapular rosado linfadenopatia retroauricular occipital notificacao imediata gestante sindrome da rubeola congenita triplice viral",
    resumo: "Caso suspeito, notificação imediata, exames, isolamento, gestantes expostas, internação clicável e vacinação.",
    legenda: "Conduta conforme o Guia de Vigilância em Saúde do Ministério da Saúde e as Notas Técnicas Conjuntas 344 e 345/2025. O Brasil é livre da circulação da rubéola desde 2015: todo caso suspeito é um alerta.",
    padraoTexto: true, // padrão de escrita (rótulo azul, subitens ›, caixa de atenção)
    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica", icone: "🔎", cor: "#0284c7",
            secoes: [
                {
                    titulo: "Caso suspeito e quadro clínico", icone: "🔎",
                    resumo: "Febre + exantema maculopapular + linfadenopatia retroauricular, occipital ou cervical, em qualquer idade e situação vacinal.",
                    itens: [
                        "<strong>Caso suspeito</strong> (MS): febre + exantema maculopapular + linfadenopatia retroauricular, occipital e/ou cervical, independentemente da idade e da vacinação.",
                        "Febre baixa, quadro leve; exantema rosado, fino, não confluente, da face para o corpo em 24 h, some em cerca de 3 dias.",
                        "Linfadenopatia retroauricular e occipital, às vezes antes do exantema; artralgia em adolescentes; manchas petequiais no palato (Forchheimer).",
                        "Último caso autóctone no Brasil em 2009 e país livre da circulação desde 2015: caso suspeito tem investigação obrigatória (MS)."
                    ],
                    ferramenta: "ferramentaRubeolaFotos"
                },
                {
                    titulo: "Diagnóstico diferencial", icone: "🧭",
                    resumo: "Sarampo, exantema súbito, dengue, eritema infeccioso, chikungunya, zika, enteroviroses, riquetsiose.",
                    itens: [
                        "Sarampo (febre alta, tosse, coriza, conjuntivite, Koplik), exantema súbito, dengue, eritema infeccioso, chikungunya, zika, enteroviroses e riquetsiose (MS).",
                        "Use o Guia de identificação do exantema desta categoria."
                    ]
                },
                {
                    titulo: "Gestante e síndrome da rubéola congênita", icone: "🤰",
                    resumo: "Infecção no início da gestação: catarata, surdez, cardiopatia. Gestante exposta: sorologia e pré-natal.",
                    itens: [
                        "<strong>Síndrome da rubéola congênita</strong> (SRC): sobretudo nas primeiras 16 semanas; catarata, glaucoma, surdez, cardiopatia (persistência do canal arterial, estenose pulmonar), microcefalia, atraso. Notificação imediata (MS).",
                        "Gestante em contato com caso suspeito: sorologia e acompanhamento no pré-natal de alto risco; não vacinar durante a gestação."
                    ]
                }
            ]
        },
        {
            titulo: "Condução: passo a passo", icone: "🚨", cor: "#dc2626",
            subtitulo: "Notificar e isolar primeiro.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)", icone: "⏱️", lista: "passos",
                    resumo: "Internar? → notificar em 24 h, colher exames e isolar → sintomáticos → contatos e gestantes → alta.",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar?</strong> Raro; critérios clicáveis",
                        "<span class=\"cond-passo\">2</span> <strong>Vigilância:</strong> notificar em 24 h, colher sorologia e RT-PCR, isolar",
                        "<span class=\"cond-passo\">3</span> <strong>Sintomáticos:</strong> antitérmico e analgésico para artralgia",
                        "<span class=\"cond-passo\">4</span> <strong>Contatos:</strong> bloqueio vacinal pela vigilância; gestantes expostas ao pré-natal",
                        "<span class=\"cond-passo\">5</span> <strong>Alta:</strong> afastamento e sinais de alarme"
                    ]
                },
                {
                    passo: 1, titulo: "🏥 Critérios de internação", alerta: true,
                    resumo: "A rubéola é quase sempre leve e tratada em casa. Interna por complicação rara.",
                    itens: ["A rubéola pós-natal é leve e tratada em casa, isolada. Internação só por complicação rara (plaquetopenia, encefalite)."],
                    escore: escoreInternacaoExantema("internacao_rubeola",
                        ["Encefalite: rebaixamento da consciência ou convulsão"],
                        ["Plaquetopenia com sangramento", "Recém-nascido com suspeita de síndrome da rubéola congênita", "Desidratação ou não aceita líquidos", "Sem condição de isolamento em casa"],
                        ["UTI com precaução para gotículas; neurologia. Notificar já.", "Internar com precaução para gotículas; hemograma, plaquetas; avaliação oftalmológica, auditiva e cardíaca no RN com SRC. Notificar já.", "Tratar em casa, isolado; notificar e colher os exames (passo 2)."],
                        "O Ministério da Saúde não traz uma lista formal de internação. Critérios reunidos das complicações da rubéola e da síndrome da rubéola congênita descritas no Guia de Vigilância.")
                },
                {
                    passo: 2, titulo: "Notificar, colher exames e isolar", alerta: true,
                    resumo: "Notificação imediata. Sorologia antes do 5º dia + swab e urina para RT-PCR até 7 dias. Isolamento por gotículas.",
                    itens: [
                        "Notificar em até 24 h (notificação imediata) todo caso suspeito (MS).",
                        "Sangue para IgM e IgG no 1º atendimento (de preferência antes do 5º dia do exantema; 2ª amostra em 15 a 25 dias se necessário) e swab de naso/orofaringe e urina para RT-PCR até 7 dias do exantema (MS).",
                        "Isolamento por gotículas; afastar da escola, creche e trabalho por 7 dias após o início do exantema; evitar contato com gestantes."
                    ]
                },
                {
                    passo: 3, titulo: "Sintomáticos",
                    resumo: "Sem tratamento específico. Antitérmico e analgésico.",
                    itens: ["Não há antiviral. Paracetamol ou dipirona para febre e dor; artralgia do adolescente melhora em dias a semanas."],
                    remedios: ["pct_gts", "dip_gts"]
                },
                {
                    passo: 4, titulo: "Contatos e gestantes",
                    resumo: "A vigilância faz o bloqueio vacinal. Gestante exposta: sorologia e pré-natal.",
                    itens: [
                        "Bloqueio vacinal dos contatos suscetíveis com a tríplice viral, organizado pela vigilância (MS).",
                        "Gestantes que tiveram contato: não vacinar; sorologia e acompanhamento pré-natal."
                    ]
                },
                {
                    passo: 5, titulo: "Alta e orientações",
                    resumo: "Afastamento de 7 dias e retorno se sangramento, sonolência ou convulsão.",
                    itens: ["<strong>Retornar se:</strong> manchas roxas ou sangramento, sonolência, convulsão, dor de cabeça forte.", "Manter longe de gestantes durante o afastamento."],
                    remedios: ["orientacoes_gerais"]
                }
            ]
        },
        {
            titulo: "Ambulatório: vacinação", icone: "🏠", cor: "#16a34a",
            secoes: [
                {
                    titulo: "Vacinação", icone: "💉",
                    resumo: "Tríplice viral aos 12 meses e tetra viral aos 15 meses; mulheres em idade fértil vacinadas.",
                    itens: ["Tríplice viral aos 12 meses e tetra viral aos 15 meses (MS); atualizar adolescentes e adultos, sobretudo mulheres em idade fértil (evitar gravidez por 1 mês após a vacina)."]
                }
            ]
        }
    ],
    citacoes: { "MS": 0, "Ministério da Saúde": 0 },
    fontes: [
        "Brasil. Ministério da Saúde. Guia de Vigilância em Saúde. 6ª ed. Brasília: MS. Capítulo: Rubéola e síndrome da rubéola congênita; Notas Técnicas Conjuntas nº 344/2025 e 345/2025 (CGVDI/DPNI/SVSA/MS)."
    ],
    revisao: "10/2026"
});

// ---------------- EXANTEMA SÚBITO ----------------
registrarConduta({
    id: "exantema_subito",
    nome: "Exantema súbito (roséola)",
    categoria: "Doenças exantemáticas",
    cor: "#c026d3",
    kw: "exantema subito roseola sexta doenca herpesvirus 6 hhv-6 hhv-7 febre alta 3 dias exantema apos a febre lactente convulsao febril",
    resumo: "Lactente com febre alta 3 a 4 dias e exantema quando a febre some; convulsão febril; quando internar e quando é FSSL.",
    legenda: "Conduta conforme a revisão de Leung et al. (2024). Na fase febril, sem exantema, seguir a conduta de febre sem sinais localizatórios.",
    padraoTexto: true, // padrão de escrita (rótulo azul, subitens ›, caixa de atenção)
    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica", icone: "🔎", cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico", icone: "🔎",
                    resumo: "6 meses a 2 anos, febre alta 3 a 4 dias com bom estado; o exantema aparece quando a febre some.",
                    itens: [
                        "<strong>Idade:</strong> mais entre 6 meses e 2 anos. Causa: herpesvírus 6 (às vezes 7) (Leung 2024).",
                        "Febre alta por 3 a 4 dias, com a criança bem, ativa e brincando entre os picos.",
                        "<strong>O exantema aparece quando a febre some:</strong> máculas e pápulas rosadas, de 2 a 3 mm, que clareiam à pressão, começando no tronco e indo para pescoço e braços; somem em 2 a 4 dias sem sequela.",
                        "Pode haver pápulas no palato e úvula (manchas de Nagayama), edema palpebral, adenomegalia cervical, fontanela um pouco abaulada.",
                        "Diagnóstico clínico, muitas vezes só retrospectivo (quando o exantema aparece)."
                    ],
                    ferramenta: "ferramentaRoseolaFotos"
                },
                {
                    titulo: "Diagnóstico diferencial", icone: "🧭",
                    resumo: "Na fase febril: febre sem sinais localizatórios (ITU, bacteremia). No exantema: rubéola, sarampo, reação a medicamento.",
                    itens: [
                        "<strong>Fase febril</strong> (sem exantema): seguir a conduta de febre sem sinais localizatórios; pensar em infecção urinária e bacteremia.",
                        "<strong>Exantema após antibiótico</strong> (comum nessa idade): é o exantema súbito, não alergia, se surgiu quando a febre sumiu.",
                        "Rubéola, sarampo, enteroviroses: o exantema vem com a febre."
                    ]
                }
            ]
        },
        {
            titulo: "Condução: passo a passo", icone: "🚨", cor: "#dc2626",
            subtitulo: "Benigno na maioria; atenção à convulsão febril.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)", icone: "⏱️", lista: "passos",
                    resumo: "Internar? → febre sem foco: conduta de FSSL → antitérmico → orientar sobre convulsão febril.",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar?</strong> Critérios clicáveis",
                        "<span class=\"cond-passo\">2</span> <strong>Fase febril:</strong> conduta de febre sem sinais localizatórios",
                        "<span class=\"cond-passo\">3</span> <strong>Antitérmico:</strong> para conforto; não é preciso tratar o exantema",
                        "<span class=\"cond-passo\">4</span> <strong>Convulsão febril:</strong> orientar a família",
                        "<span class=\"cond-passo\">5</span> <strong>Alta:</strong> orientar os sinais de alarme"
                    ]
                },
                {
                    passo: 1, titulo: "🏥 Critérios de internação", alerta: true,
                    resumo: "Quase sempre em casa. Interna por convulsão complicada, encefalite, toxemia ou idade de risco.",
                    itens: ["O exantema súbito é benigno e autolimitado; complicações graves são raras e mais comuns em imunodeprimidos (Leung 2024)."],
                    escore: escoreInternacaoExantema("internacao_roseola",
                        ["Estado de mal convulsivo ou convulsão prolongada", "Encefalite: rebaixamento da consciência que não melhora após a convulsão"],
                        ["Convulsão febril complexa (focal, > 15 min ou repetida em 24 h)", "Toxemia ou mau estado geral (pensar em outra causa)", "Menor de 3 meses com febre (seguir a conduta de FSSL)", "Imunodeprimido", "Desidratação"],
                        ["Tratar a convulsão (benzodiazepínico), suporte; investigar encefalite (líquor, neuroimagem).", "Observar e investigar conforme o caso; nos menores de 3 meses, seguir a conduta de febre sem sinais localizatórios.", "Tratar em casa: antitérmico, hidratação e orientação sobre convulsão febril."],
                        "Critérios reunidos das complicações descritas na revisão de Leung et al. (2024) e da conduta de febre sem sinais localizatórios.")
                },
                {
                    passo: 2, titulo: "Fase febril: febre sem sinais localizatórios",
                    resumo: "Antes do exantema, não dá para ter certeza: seguir a conduta de FSSL pela idade e vacinação.",
                    itens: ["Na fase de febre sem exantema, seguir a conduta de febre sem sinais localizatórios (idade, vacinação, EAS/urocultura quando indicado)."]
                },
                {
                    passo: 3, titulo: "Antitérmico e cuidados",
                    resumo: "Antitérmico para conforto. O exantema não precisa de tratamento.",
                    itens: ["Não há tratamento específico. Antitérmico para o desconforto; hidratação. O exantema não coça e some sozinho (Leung 2024).", "O antitérmico não previne a convulsão febril."],
                    remedios: ["pct_gts", "dip_gts", "ibu_gts"]
                },
                {
                    passo: 4, titulo: "Convulsão febril",
                    resumo: "Ocorre em 10 a 15% na fase febril. Orientar a família.",
                    itens: ["Convulsão febril em 10 a 15% das crianças com exantema súbito, na fase febril (Leung 2024).", "<strong>Orientar:</strong> deitar de lado, não colocar nada na boca, cronometrar e procurar atendimento; acima de 5 minutos é emergência."]
                },
                {
                    passo: 5, titulo: "Alta e sinais de alarme",
                    resumo: "Retornar se convulsão, sonolência, febre por mais de 5 dias ou piora do estado geral.",
                    itens: ["<strong>Retornar se:</strong> convulsão, sonolência ou irritabilidade intensa, febre por mais de 5 dias, recusa de líquidos, manchas que não somem ao apertar.", "Pode voltar à creche quando estiver sem febre (o exantema não transmite)."],
                    remedios: ["orientacoes_gerais"]
                }
            ]
        },
        {
            titulo: "Ambulatório: orientações", icone: "🏠", cor: "#16a34a",
            secoes: [
                {
                    titulo: "Orientações à família", icone: "📋",
                    resumo: "Doença benigna, geralmente uma vez na vida.",
                    itens: ["O vírus é transmitido pela saliva de adultos e crianças sem sintomas; não há vacina. A doença costuma ocorrer uma vez; quadros parecidos podem vir pelo HHV-7."]
                }
            ]
        }
    ],
    citacoes: { "Leung 2024": 0 },
    fontes: [
        "Leung AKC, Lam JMC, Barankin B, Leong KF, Hon KL. Roseola Infantum: An Updated Review. Curr Pediatr Rev 2024;20(2):119-128. doi:10.2174/1573396319666221118123844"
    ],
    revisao: "10/2026"
});

// ---------------- ERITEMA INFECCIOSO ----------------
registrarConduta({
    id: "eritema_infeccioso",
    nome: "Eritema infeccioso (parvovírus B19)",
    categoria: "Doenças exantemáticas",
    cor: "#e11d48",
    kw: "eritema infeccioso quinta doenca parvovirus b19 bochecha esbofeteada exantema rendilhado crise aplastica anemia falciforme gestante hidropsia artrite luvas e meias",
    resumo: "\"Bochecha esbofeteada\" e exantema rendilhado; já não transmite quando o exantema aparece. Crise aplástica, imunodeprimidos e gestantes.",
    legenda: "Conduta conforme as revisões de Bloise et al. (2024) e Servey et al. (2007).",
    padraoTexto: true, // padrão de escrita (rótulo azul, subitens ›, caixa de atenção)
    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica", icone: "🔎", cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico", icone: "🔎",
                    resumo: "Escolar pouco febril; bochecha vermelha, depois exantema rendilhado que volta com calor e sol.",
                    itens: [
                        "Escolares (5 a 15 anos), em surtos no fim do inverno e na primavera; causa: parvovírus B19.",
                        "Pródromo leve (febre baixa, coriza, dor de cabeça) cerca de 1 semana antes.",
                        "<strong>1ª fase:</strong> eritema vivo nas bochechas, \"bochecha esbofeteada\", poupando o nariz e a região ao redor da boca.",
                        "<strong>2ª fase:</strong> exantema rendilhado (reticulado) no tronco e na face extensora dos membros.",
                        "<strong>3ª fase:</strong> o exantema volta e some por semanas com calor, banho quente, exercício e sol.",
                        "Quando o exantema aparece, a criança já não transmite (Servey 2007). Diagnóstico clínico; IgM só se necessário (gestante, anemia)."
                    ],
                    ferramenta: "ferramentaEritemaFotos"
                },
                {
                    titulo: "Outras formas do parvovírus B19", icone: "🧭",
                    resumo: "Artropatia, síndrome de luvas e meias, crise aplástica, aplasia crônica no imunodeprimido, hidropsia fetal.",
                    itens: [
                        "Artralgia/artrite simétrica de mãos, punhos e joelhos (mais em adolescentes e adultos).",
                        "<strong>Síndrome papulopurpúrica \"em luvas e meias\":</strong> edema e petéquias em mãos e pés.",
                        "Crise aplástica transitória em quem tem anemia hemolítica (falciforme, esferocitose, talassemia): palidez, cansaço, queda de hemoglobina com reticulócitos baixos; nessa forma a criança transmite (Bloise 2024).",
                        "<strong>Imunodeprimidos:</strong> aplasia eritroide crônica (imunoglobulina EV).",
                        "<strong>Gestação</strong> (sobretudo de 9 a 20 semanas): aborto, anemia fetal e hidropsia (Bloise 2024)."
                    ]
                }
            ]
        },
        {
            titulo: "Condução: passo a passo", icone: "🚨", cor: "#dc2626",
            subtitulo: "Benigno na criança saudável; atenção a anemia hemolítica, imunodeprimidos e gestantes.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)", icone: "⏱️", lista: "passos",
                    resumo: "Internar? → sintomáticos → grupos de risco (anemia hemolítica, imunodeprimido, gestante) → escola e orientações.",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar?</strong> Crise aplástica e imunodeprimido com anemia",
                        "<span class=\"cond-passo\">2</span> <strong>Sintomáticos:</strong> e anti-histamínico se prurido",
                        "<span class=\"cond-passo\">3</span> <strong>Grupos de risco:</strong> hemograma e reticulócitos na anemia hemolítica; gestante exposta ao obstetra",
                        "<span class=\"cond-passo\">4</span> <strong>Escola:</strong> não precisa afastar com o exantema"
                    ]
                },
                {
                    passo: 1, titulo: "🏥 Critérios de internação", alerta: true,
                    resumo: "Criança saudável fica em casa. Interna a crise aplástica e o imunodeprimido com anemia.",
                    itens: ["O eritema infeccioso na criança saudável é benigno. Internar quem tem anemia importante pelo vírus (Bloise 2024)."],
                    escore: escoreInternacaoExantema("internacao_eritema",
                        ["Anemia grave com instabilidade (taquicardia, insuficiência cardíaca)"],
                        ["Crise aplástica: anemia hemolítica com palidez/cansaço e queda da hemoglobina", "Imunodeprimido com anemia (aplasia eritroide)", "Miocardite, hepatite ou outra complicação orgânica", "Artrite que impede andar, com dor importante"],
                        ["Transfusão de concentrado de hemácias, suporte; hematologia. Precaução para gotículas (a crise aplástica transmite).", "Hemograma e reticulócitos seriados, transfusão se necessário; imunoglobulina EV no imunodeprimido (hematologia). Precaução para gotículas.", "Tratar em casa: sintomáticos; a criança pode ir à escola."],
                        "Critérios reunidos das complicações descritas nas revisões de Bloise et al. (2024) e Servey et al. (2007).")
                },
                {
                    passo: 2, titulo: "Sintomáticos",
                    resumo: "Antitérmico/analgésico; anti-histamínico se prurido; evitar sol e calor para não reativar o exantema.",
                    itens: ["Não há antiviral. Analgésico para febre e artralgia; anti-histamínico se prurido.", "O exantema pode voltar com sol e calor por semanas: orientar que é esperado."],
                    remedios: ["pct_gts", "ibu_gts", "hixizine"]
                },
                {
                    passo: 3, titulo: "Grupos de risco",
                    resumo: "Anemia hemolítica: hemograma e reticulócitos. Imunodeprimido: hematologia. Gestante exposta: obstetra.",
                    itens: [
                        "Anemia hemolítica (falciforme, esferocitose) com contato ou sintomas: hemograma e reticulócitos.",
                        "<strong>Imunodeprimido:</strong> PCR do vírus e hematologia.",
                        "<strong>Gestante exposta</strong> (inclusive a mãe ou professora): sorologia e acompanhamento com o obstetra (ultrassom seriado se infecção)."
                    ]
                },
                {
                    passo: 4, titulo: "Escola e orientações",
                    resumo: "Sem afastamento quando o exantema aparece; retorno se palidez, cansaço ou dor nas articulações.",
                    itens: ["Não precisa afastar da escola com o exantema: a transmissão foi antes (Servey 2007).", "<strong>Retornar se:</strong> palidez, cansaço, falta de ar, manchas roxas, dor e inchaço nas articulações."],
                    remedios: ["orientacoes_gerais"]
                }
            ]
        },
        {
            titulo: "Ambulatório: prevenção", icone: "🏠", cor: "#16a34a",
            secoes: [
                {
                    titulo: "Prevenção", icone: "🛡️",
                    resumo: "Higiene das mãos e etiqueta respiratória; não há vacina.",
                    itens: ["Lavar as mãos e cobrir tosse e espirro; não há vacina. Orientar gestantes e pais de crianças com anemia hemolítica durante surtos."]
                }
            ]
        }
    ],
    citacoes: { "Bloise 2024": 0, "Servey 2007": 1 },
    fontes: [
        "Bloise S, Cocchi E, Mambelli L, Radice C, Marchetti F. Parvovirus B19 infection in children: a comprehensive review of clinical manifestations and management. Ital J Pediatr 2024;50(1):261. doi:10.1186/s13052-024-01831-6",
        "Servey JT, Reamy BV, Hodge J. Clinical presentations of parvovirus B19 infection. Am Fam Physician 2007;75(3):373-6."
    ],
    revisao: "10/2026"
});
