// =====================================================
// CONDUTA: FEBRE SEM SINAIS LOCALIZATÓRIOS (FSSL), 0 A 36 MESES
// Base: SBP — Documento Científico nº 206 (15/05/2025), Departamentos de
// Pediatria Ambulatorial e Infectologia: "Abordagem da Febre Aguda em Pediatria
// e Reflexões sobre a febre nas arboviroses", com o fluxograma do Tratado de
// Pediatria da SBP 2017 (protocolo HU-USP, baseado em Baraff e Rochester).
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
registrarConduta({
    id: "fssl",
    nome: "Febre sem Sinais Localizatórios (FSSL)",
    categoria: "Infectologia",
    cor: "#ea580c",
    kw: "febre sem sinais localizatorios fssl febre sem foco lactente bacteremia oculta itu rochester baraff antitermico febre aguda arbovirose dengue",
    resumo: "Criança de 0 a 36 meses com febre sem foco: estado geral, idade, vacinação e temperatura definem exames, internação e antibiótico.",
    legenda: "Conduta conforme o <strong>Documento Científico nº 206 da SBP (2025)</strong>, com o fluxograma do <strong>Tratado de Pediatria da SBP (2017, protocolo HU-USP)</strong>.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Definição de febre e de FSSL",
                    icone: "🔎",
                    resumo: "Febre axilar ≥ 37,5 °C; FSSL = febre < 7 dias sem causa na história e no exame.",
                    itens: [
                        "<strong>Febre:</strong> temperatura axilar <strong>≥ 37,5 °C</strong> (equivale a 38 °C oral ou retal). A retal é o padrão-ouro da temperatura central.",
                        "<strong>FSSL:</strong> febre com <strong>menos de 7 dias</strong> de duração em criança cuja história clínica e exame físico <strong>não revelaram a causa</strong>.",
                        "A maioria tem doença infecciosa aguda autolimitada ou está no pródromo de doença benigna; poucos têm infecção bacteriana grave.",
                        "<strong>A intensidade da febre não indica gravidade nem etiologia</strong> (viral × bacteriana), exceto em < 3 meses com leucocitose ou PCR aumentada.",
                        "<strong>Febre × hipertermia:</strong> na febre há extremidades frias, sem sudorese, sensação de frio, tremores, taquicardia e taquipneia. Na hipertermia (roupa demais, ambiente quente, exercício) há vasodilatação, extremidades quentes, sudorese e ausência de tremores.",
                        "<strong>Medida:</strong> termômetro digital axilar em < 4 semanas (todos os ambientes) e em < 1 ano; infravermelho só em > 1 ano e por profissional treinado."
                    ]
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🔀",
                    resumo: "Bacteremia oculta, ITU, pneumonia oculta, arboviroses e febre de origem indeterminada.",
                    itens: [
                        "Infecções bacterianas graves ocultas: <strong>infecção urinária</strong>, <strong>bacteremia oculta</strong>, <strong>pneumonia</strong> sem sinais respiratórios.",
                        "<strong>Arboviroses</strong> (dengue, chikungunya, zika, febre amarela): avaliar história epidemiológica, exantema, artralgia, sangramentos, vômitos (bloco 🏠).",
                        "<strong>Febre de origem indeterminada (criança):</strong> febre ≥ 38,3 °C diária por <strong>≥ 14 dias</strong>, sem causa após avaliação clínica e laboratorial básica. Causas: infecciosas (30 a 40%: CMV, EBV, HIV, tuberculose, endocardite, abscessos, Bartonella, salmonelose, osteomielite, ITU, malária, toxoplasmose), neoplásicas (20 a 30%), reumatológicas/inflamatórias (15 a 20%) e outras (10 a 20%)."
                    ]
                },
                {
                    titulo: "Grupos de risco",
                    icone: "⚠️",
                    resumo: "Menores de 3 meses, vacinação incompleta, prematuro e desnutrido.",
                    itens: [
                        "<strong>Menores de 30 dias</strong>: sempre internar e investigar.",
                        "<strong>1 a 3 meses</strong>: decidir pelos critérios de Rochester (baixo × alto risco).",
                        "<strong>3 a 36 meses com vacinação incompleta</strong>: maior risco de bacteremia oculta.",
                        "<strong>Recém-nascido, principalmente prematuro</strong>: pode não ter febre mesmo infectado, ou ter <strong>hipotermia</strong>.",
                        "<strong>Desnutrido grave</strong>: pode não ter febre quando infectado."
                    ]
                },
                {
                    titulo: "Sinais vitais e sinais de alerta (semáforo)",
                    icone: "🚦",
                    resumo: "Toque nos sinais presentes: qualquer um pesa para comprometimento do estado geral.",
                    escore: {
                        id: "alerta_fssl",
                        unidade: "sinais",
                        checklist: true,
                        instrucao: "Toque nos sinais presentes na avaliação.",
                        itens: [
                            { nome: "Frequência cardíaca alta", opcoes: [[1, "< 12 meses: ≥ 160 bpm · 12 a 24 meses: ≥ 150 bpm · 2 a 5 anos: ≥ 140 bpm", "FC"]] },
                            { nome: "Frequência respiratória alta", opcoes: [[1, "6 a 12 meses: > 50 irpm · > 12 meses: > 40 irpm", "FR"]] },
                            { nome: "Saturação", opcoes: [[1, "SatO₂ ≤ 95%", "Sat"]] },
                            { nome: "Perfusão", opcoes: [[1, "Tempo de enchimento capilar > 3 segundos", "TEC"]] },
                            { nome: "Hidratação", opcoes: [[1, "Mucosas secas / turgor diminuído", "H₂O"]] },
                            { nome: "Atividade", opcoes: [[1, "Pouco ativa ou pouco responsiva aos estímulos", "SNC"]] }
                        ],
                        classificar: (valores) => {
                            let n = valores.length;
                            if (n === 0) return { num: 0, rotulo: "Sem sinais de alerta", cor: "#16a34a", texto: "" };
                            return { num: n, rotulo: "Sinal de alerta presente", cor: "#dc2626", texto: "Avaliar pelo semáforo (NICE) e considerar comprometimento do estado geral: internar e investigar." };
                        },
                        nota: "Fonte: DC nº 206 da SBP (2025), com base no semáforo do NICE (verde, amarelo, vermelho)."
                    }
                },
                {
                    titulo: "Classificação: qual caminho seguir",
                    icone: "📊",
                    aberta: true,
                    resumo: "Toque no estado geral, na idade e, se 3 a 36 meses, na vacinação e na temperatura.",
                    escore: {
                        id: "caminho_fssl",
                        unidade: "conduta",
                        checklist: true,
                        instrucao: "Toque nas características do paciente (0 a 36 meses com FSSL).",
                        itens: [
                            { nome: "Comprometimento do estado geral?", opcoes: [[100, "Sim", "S"], [101, "Não", "N"]] },
                            { nome: "Idade", opcoes: [[200, "< 30 dias", "①"], [201, "1 a 3 meses", "②"], [202, "3 a 36 meses", "③"]] },
                            { nome: "Vacinação (só 3 a 36 meses)", opcoes: [[300, "Completa", "✔"], [301, "Incompleta", "✘"]] },
                            { nome: "Temperatura axilar (só 3 a 36 meses com vacinação incompleta)", opcoes: [[400, "≤ 39 °C", "≤"], [401, "> 39 °C", ">"]] }
                        ],
                        classificar: (v) => {
                            let tem = x => v.includes(x);
                            if (tem(100)) return { num: "🏥", rotulo: "INTERNAR (qualquer idade)", cor: "#dc2626", texto: "Hemocultura, urocultura, LCR, RX de tórax e antibiótico empírico." };
                            if (!tem(101)) return { num: "?", rotulo: "Marque o estado geral", cor: "#64748b", texto: "" };
                            if (tem(200)) return { num: "🏥", rotulo: "< 30 dias: INTERNAR", cor: "#dc2626", texto: "PVR, hemograma, hemocultura, EAS, urocultura, LCR, RX de tórax e antibiótico empírico." };
                            if (tem(201)) return { num: "R", rotulo: "1 a 3 meses: critérios de Rochester", cor: "#d97706", texto: "Colher PVR, hemograma e EAS. Baixo risco: reavaliação diária obrigatória. Alto risco: internar, hemocultura, urocultura, LCR, RX de tórax e antibiótico empírico." };
                            if (!tem(202)) return { num: "?", rotulo: "Marque a idade", cor: "#64748b", texto: "" };
                            if (tem(300)) return { num: "🔁", rotulo: "Vacinação completa: reavaliação diária", cor: "#16a34a", texto: "PVR, EAS e urocultura. Reavaliação diária." };
                            if (!tem(301)) return { num: "?", rotulo: "Marque a vacinação", cor: "#64748b", texto: "" };
                            if (tem(400)) return { num: "🔁", rotulo: "Tax ≤ 39 °C: reavaliação diária", cor: "#16a34a", texto: "PVR. Reavaliação diária; considerar EAS e urocultura." };
                            if (tem(401)) return { num: "🧪", rotulo: "Tax > 39 °C: EAS e urocultura", cor: "#d97706", texto: "Leucocitúria alta: tratar ITU. Normal: hemograma. Leucócitos ≥ 20.000 ou neutrófilos ≥ 10.000: hemocultura + RX de tórax (alterado = pneumonia; normal = ceftriaxona 50 mg/kg IM 1x/dia). Abaixo disso: reavaliação diária." };
                            return { num: "?", rotulo: "Marque a temperatura", cor: "#64748b", texto: "" };
                        },
                        nota: "Fonte: fluxograma do Tratado de Pediatria da SBP 2017 (protocolo HU-USP, baseado em Baraff e Rochester), reproduzido no DC nº 206 da SBP (2025). PVR = pesquisa de vírus respiratório (quando disponível)."
                    }
                }
            ]
        },
        {
            titulo: "Condução na emergência: passo a passo",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Siga na ordem: estado geral → idade → vacinação → temperatura → exames.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    aberta: true,
                    resumo: "Toda a condução numa olhada. Os detalhes estão em cada passo abaixo.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Estado geral:</strong> comprometido (ou sinal de alerta) = <strong>internar</strong>, colher culturas, LCR, RX e antibiótico empírico, em qualquer idade",
                        "<span class=\"cond-passo\">2</span> <strong>< 30 dias:</strong> <strong>internar</strong> sempre, exames completos e antibiótico empírico",
                        "<span class=\"cond-passo\">3</span> <strong>1 a 3 meses:</strong> PVR, hemograma e EAS + <strong>critérios de Rochester</strong> (baixo risco: reavaliar todo dia; alto risco: internar)",
                        "<span class=\"cond-passo\">4</span> <strong>3 a 36 meses, vacinação completa:</strong> PVR, EAS e urocultura; <strong>reavaliação diária</strong>",
                        "<span class=\"cond-passo\">5</span> <strong>3 a 36 meses, vacinação incompleta:</strong> PVR; Tax ≤ 39 °C reavaliar todo dia; Tax > 39 °C: EAS/urocultura → hemograma → hemocultura e RX",
                        "<span class=\"cond-passo\">6</span> <strong>Risco de bacteremia oculta:</strong> <strong>ceftriaxona 50 mg/kg IM 1x/dia</strong> e reavaliação diária até o fim das culturas",
                        "<span class=\"cond-passo\">7</span> <strong>Antitérmico</strong> só se houver desconforto, em monoterapia; orientar e reavaliar"
                    ]
                },
                {
                    passo: 1,
                    titulo: "Avaliar o estado geral e os sinais vitais",
                    aberta: true,
                    resumo: "Comprometido: internar em qualquer idade.",
                    itens: [
                        "Anamnese detalhada e <strong>exame físico completo</strong> procurando o foco da febre.",
                        "Avaliar FC, FR, SatO₂, enchimento capilar, hidratação, atividade e resposta aos estímulos (escore 🚦 no bloco 🔎).",
                        "<strong>Comprometimento do estado geral, em qualquer idade:</strong> <strong>internar</strong>, colher <strong>hemocultura, urocultura, LCR e RX de tórax</strong> e iniciar <strong>antibiótico empírico</strong>.",
                        "Bom estado geral: seguir pela idade (passos 2 a 5)."
                    ]
                },
                {
                    passo: 2,
                    titulo: "Menor de 30 dias",
                    aberta: true,
                    resumo: "Internar sempre, exames completos e antibiótico empírico.",
                    itens: [
                        "<strong>Internar</strong>, mesmo em bom estado geral.",
                        "<strong>Exames:</strong> PVR, hemograma, hemocultura, EAS, urocultura, LCR e RX de tórax.",
                        "<strong>Antibiótico empírico</strong> (esquema conforme o protocolo do serviço; o documento não define o antibiótico).",
                        "Antitérmico, se necessário: <strong>só paracetamol</strong> em menores de 1 mês."
                    ]
                },
                {
                    passo: 3,
                    titulo: "1 a 3 meses: critérios de Rochester",
                    aberta: true,
                    resumo: "PVR, hemograma e EAS; baixo risco reavalia todo dia, alto risco interna.",
                    itens: [
                        "<strong>Exames:</strong> PVR, hemograma e EAS.",
                        "Aplicar os <strong>critérios de Rochester</strong> (toque abaixo).",
                        "<strong>Baixo risco:</strong> <strong>reavaliação diária obrigatória</strong>.",
                        "<strong>Alto risco:</strong> <strong>internar</strong>, hemocultura, urocultura, LCR, RX de tórax e <strong>antibiótico empírico</strong>."
                    ],
                    escore: {
                        id: "rochester_fssl",
                        unidade: "critérios",
                        checklist: true,
                        instrucao: "Toque nos critérios que o lactente CUMPRE. Baixo risco só se cumprir todos.",
                        itens: [
                            { nome: "", opcoes: [[1, "Bom estado geral", "✔"]] },
                            { nome: "", opcoes: [[1, "Previamente hígido: a termo, sem antibiótico perinatal, sem internação prévia, sem doença crônica, sem antibiótico atual", "✔"]] },
                            { nome: "", opcoes: [[1, "Sem infecção focal (pele, partes moles, osso, articulação, ouvido)", "✔"]] },
                            { nome: "", opcoes: [[1, "Leucócitos 5.000 a 15.000/mm³ e bastões ≤ 1.500/mm³", "✔"]] },
                            { nome: "", opcoes: [[1, "EAS com ≤ 10 leucócitos por campo", "✔"]] },
                            { nome: "", opcoes: [[1, "Se diarreia: ≤ 5 leucócitos por campo nas fezes (sem diarreia: marcar)", "✔"]] }
                        ],
                        classificar: (v) => v.length === 6
                            ? { num: 6, rotulo: "BAIXO RISCO", cor: "#16a34a", texto: "Reavaliação diária obrigatória." }
                            : { num: v.length, rotulo: "ALTO RISCO (não cumpre todos)", cor: "#dc2626", texto: "Internar, hemocultura, urocultura, LCR, RX de tórax e antibiótico empírico." },
                        nota: "Critérios de Rochester clássicos (Jaskiewicz, Pediatrics 1994). O DC nº 206 da SBP cita os critérios, mas não os detalha."
                    }
                },
                {
                    passo: 4,
                    titulo: "3 a 36 meses com vacinação completa",
                    aberta: true,
                    resumo: "PVR, EAS e urocultura; reavaliação diária.",
                    itens: [
                        "<strong>Exames:</strong> PVR, EAS e urocultura.",
                        "<strong>Reavaliação diária.</strong>",
                        "EAS alterado: tratar como infecção urinária (conduta de ITU)."
                    ]
                },
                {
                    passo: 5,
                    titulo: "3 a 36 meses com vacinação incompleta",
                    aberta: true,
                    resumo: "Tax ≤ 39 °C reavalia; Tax > 39 °C: EAS/urocultura → hemograma → hemocultura e RX.",
                    itens: [
                        "<strong>PVR</strong> para todos.",
                        "<strong>Tax ≤ 39 °C:</strong> reavaliação diária; considerar EAS e urocultura.",
                        "<strong>Tax > 39 °C:</strong> colher <strong>EAS e urocultura</strong>:",
                        "→ <strong>Leucocitúria alta</strong>: <strong>tratar</strong> (infecção urinária).",
                        "→ <strong>Leucocitúria baixa</strong>: colher <strong>hemograma</strong>:",
                        "→ Leucócitos ≤ 20.000/mm³ <strong>e</strong> neutrófilos ≤ 10.000/mm³: <strong>reavaliação diária</strong>.",
                        "→ Leucócitos ≥ 20.000/mm³ <strong>ou</strong> neutrófilos ≥ 10.000/mm³: <strong>hemocultura + RX de tórax</strong>. RX alterado = <strong>pneumonia</strong> (tratar). RX normal = <strong>risco de bacteremia oculta</strong> (passo 6)."
                    ],
                    nota: "No fluxograma impresso os dois ramos da temperatura aparecem como \"Tax ≤ 39 °C\"; pela lógica do protocolo, o ramo que segue para EAS/urocultura é o de Tax > 39 °C. Leucocitúria de corte no fluxograma: ≤ 5 x 10⁴/mL × > 5 x 10⁵/mL."
                },
                {
                    passo: 6,
                    titulo: "Risco de bacteremia oculta: ceftriaxona IM",
                    aberta: true,
                    resumo: "Ceftriaxona 50 mg/kg IM 1x/dia e reavaliação diária até o fim das culturas.",
                    itens: [
                        "Indicação: 3 a 36 meses, vacinação incompleta, Tax > 39 °C, leucocitose (≥ 20.000) ou neutrofilia (≥ 10.000) e <strong>RX de tórax normal</strong>.",
                        "<strong>Colher hemocultura antes</strong> da 1ª dose.",
                        "<strong>Ceftriaxona 50 mg/kg IM, 1 vez ao dia</strong>.",
                        "<strong>Reavaliação diária até o resultado final das culturas.</strong>"
                    ],
                    remedios: ["cef_fssl"]
                },
                {
                    passo: 7,
                    titulo: "Antitérmico e orientações na alta",
                    aberta: true,
                    resumo: "Só se houver desconforto, em monoterapia. Sem métodos físicos.",
                    itens: [
                        "Antitérmico quando a febre causa <strong>desconforto</strong> (choro intenso, irritabilidade, redução da atividade, do apetite ou do sono), <strong>não por um número</strong> de temperatura.",
                        "<strong>Monoterapia.</strong> Não alternar nem associar antitérmicos.",
                        "Doses e cards: bloco 🏠 (Antitérmicos).",
                        "Orientar sinais de alerta e garantir a <strong>reavaliação diária</strong> nos casos indicados."
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
                    titulo: "Antitérmicos",
                    icone: "💊",
                    aberta: true,
                    resumo: "Paracetamol, dipirona ou ibuprofeno, em monoterapia, se houver desconforto.",
                    itens: [
                        "Indicar quando a febre está associada a <strong>desconforto evidente</strong>, e não a partir de um valor fixo de temperatura.",
                        "No Brasil estão recomendados <strong>paracetamol, dipirona e ibuprofeno</strong>. <strong>Ácido acetilsalicílico: não</strong> (síndrome de Reye).",
                        "<strong>Não alternar nem associar</strong>: confunde os cuidadores, aumenta o risco de superdosagem e não traz benefício.",
                        "<strong>Menores de 1 mês:</strong> só paracetamol, com dose ajustada à idade gestacional.",
                        "<strong>Não usar antitérmico para prevenir convulsão febril</strong> nem de rotina antes de vacinas (pode reduzir a resposta de algumas vacinas).",
                        "<strong>Métodos físicos</strong> (banho, compressas): não recomendados, salvo hipertermia (≥ 40 °C central com alteração neurológica).",
                        "Doença hepática crônica: preferir paracetamol em dose ajustada. Insuficiência renal: evitar ibuprofeno. Asma: cautela com ibuprofeno."
                    ],
                    tabela: {
                        titulo: "Antitérmicos (Quadro 1 do DC nº 206 da SBP)",
                        colunas: ["Fármaco", "A partir de", "Por dose", "Máx. diária"],
                        linhas: [
                            ["Paracetamol", "Neonatos e > 3 kg", "10 a 15 mg/kg a cada 4 a 6 h", "50 a 75 mg/kg/dia"],
                            ["Dipirona", "3 meses e > 5 kg", "10 a 16 mg/kg a cada 6 a 8 h", "40 a 64 mg/kg/dia*"],
                            ["Ibuprofeno", "6 meses e > 5 kg", "5 a 10 mg/kg a cada 6 a 8 h", "40 mg/kg/dia"]
                        ],
                        nota: "* Checar a dose máxima por faixa etária na bula. Os cards abaixo seguem o esquema próprio do app."
                    },
                    remedios: ["pct_gts", "dip_gts", "ibu_gts"]
                },
                {
                    titulo: "Reavaliação e sinais de alerta",
                    icone: "🚨",
                    resumo: "Reavaliar diariamente nos casos indicados e retornar se houver sinal de gravidade.",
                    itens: [
                        "<strong>Reavaliação diária</strong> nos casos indicados pelo fluxograma, até o resultado das culturas quando colhidas.",
                        "Retornar antes se: piora do estado geral, sonolência ou irritabilidade excessiva, recusa alimentar, vômitos, sinais de desidratação, respiração rápida ou difícil, manchas na pele.",
                        "Febre que persiste por <strong>7 dias ou mais</strong>: deixa de ser FSSL; reavaliar e investigar (≥ 14 dias: febre de origem indeterminada)."
                    ]
                },
                {
                    titulo: "Febre nas arboviroses",
                    icone: "🦟",
                    resumo: "Dengue: a queda da febre pode iniciar a fase crítica. Evitar AINEs.",
                    itens: [
                        "<strong>Dengue:</strong> febre alta e súbita (39 a 41 °C) por 2 a 7 dias. A <strong>queda da febre (3º ao 7º dia)</strong> pode marcar o início da <strong>fase crítica</strong> (extravasamento plasmático), que dura 24 a 48 h: vigilância mesmo sem febre.",
                        "<strong>Chikungunya:</strong> febre súbita 39 a 40 °C por 3 a 5 dias, mialgia e artralgia intensas. <strong>Zika:</strong> febre baixa ou ausente, exantema precoce e prurido. <strong>Febre amarela:</strong> > 39 °C, bifásica.",
                        "<strong>Antitérmicos:</strong> paracetamol 10 a 15 mg/kg a cada 4 a 6 h (máx. 60 mg/kg/dia) ou dipirona 10 mg/kg de 6/6 h.",
                        "<strong>Evitar AINEs (ibuprofeno, AAS)</strong>: contraindicados na dengue (sangramento e insuficiência renal).",
                        "<strong>Hidratação oral precoce e abundante</strong> (água, SRO, sucos); casos moderados a graves: hidratação venosa.",
                        "<strong>Sinais de alarme:</strong> dor abdominal intensa e contínua, vômitos persistentes, sangramento de mucosas, alteração da consciência, acúmulo de líquidos (derrames, ascite, edema), aumento progressivo do hematócrito, hipotensão postural/lipotimia, hepatomegalia > 2 cm."
                    ],
                    remedios: ["pct_gts", "dip_gts"]
                },
                {
                    titulo: "Orientações à família (febrefobia)",
                    icone: "👨‍👩‍👧",
                    resumo: "Febre é um sinal, não uma doença.",
                    itens: [
                        "A febre é uma resposta de defesa; o mais importante é o <strong>estado geral da criança</strong>, não o número do termômetro.",
                        "Medir com <strong>termômetro digital axilar</strong>; a temperatura varia ao longo do dia (maior no fim da tarde) e com o ambiente.",
                        "Usar o dosador do próprio medicamento: gotejadores diferentes liberam doses diferentes; subdose é o erro mais comum.",
                        "Não alternar antitérmicos e não dar antitérmico \"preventivo\"."
                    ]
                }
            ]
        }
    ],

    fontes: [
        "Sociedade Brasileira de Pediatria — Departamentos Científicos de Pediatria Ambulatorial e de Infectologia. Documento Científico nº 206: Abordagem da Febre Aguda em Pediatria e Reflexões sobre a febre nas arboviroses (15/05/2025).",
        "Machado MB, Gilio AE. Febre sem sinais localizatórios. In: SBP — Tratado de Pediatria, 4ª ed. Manole, 2017: 899-900 (protocolo HU-USP, baseado em Baraff e Rochester).",
        "Jaskiewicz JA et al. Febrile infants at low risk for serious bacterial infection — an appraisal of the Rochester criteria. Pediatrics 1994;94(3):390-6."
    ],
    revisao: "10/2026"
});
