// =====================================================
// CONDUTA: TRAUMATISMO CRANIOENCEFÁLICO (TCE) NA CRIANÇA
// Base: SBP — Departamento de Terapia Intensiva, Guia Prático de
// Atualização nº 1 (abr/2017): Trauma Cranioencefálico; e Hospital
// Israelita Albert Einstein — Guia do Episódio de Cuidado: TCE em
// crianças e adolescentes (CPTW430.1, 2025), marcado "(Einstein)".
// Regra PECARN (Kuppermann, Lancet 2009; validação Holmes, Lancet
// Child Adolesc Health 2024). Os remédios são ids dos cards.
// =====================================================

// PECARN: os 3 primeiros itens são de ALTO risco; os demais, de risco INTERMEDIÁRIO.
// m = { índice do item: 0 ou 1 }, n = número de itens.
function classificarPecarn(m, n, nAlto, riscoAlto, riscoBaixo, menor2) {
    let sim = i => m[i] === 1;
    let idx = [...Array(n).keys()];
    if (idx.slice(0, nAlto).some(sim)) return { num: "TC", rotulo: "TC de crânio recomendada", cor: "#dc2626", texto: `Risco alto: ~${riscoAlto} de lesão cerebral clinicamente importante.` };
    if (idx.slice(nAlto).some(sim)) return { num: "?", rotulo: "Observação ou TC", cor: "#d97706", texto: "Risco intermediário (~0,9%). Decidir: experiência do médico, achado isolado × vários, piora na observação, preferência dos pais" + (menor2 ? ", idade < 3 meses." : ".") };
    if (idx.every(i => m[i] === 0)) return { num: "✓", rotulo: "TC não recomendada", cor: "#16a34a", texto: `Risco muito baixo (${riscoBaixo}). Observar e orientar sinais de alarme.` };
    return { num: "…", rotulo: "Responda todos os itens", cor: "#64748b", texto: "A TC só pode ser dispensada com TODOS os itens = Não." };
}

const OPC_SN = [[0, "Não", "N"], [1, "Sim", "S"]];

registrarConduta({
    id: "tce",
    nome: "Traumatismo Cranioencefálico (TCE)",
    categoria: "Trauma e Emergência",
    cor: "#7c3aed",
    kw: "tce traumatismo cranioencefalico trauma craniano batida na cabeca queda pecarn glasgow tomografia concussao hipertensao intracraniana herniacao",
    resumo: "Glasgow pediátrico e PECARN clicáveis (quando pedir TC), observação, neuroproteção, hipertensão intracraniana, herniação e orientações de alta.",
    legenda: "Conduta conforme o <strong>Guia Prático de Atualização nº 1 do Departamento de Terapia Intensiva da SBP (Trauma Cranioencefálico, 2017)</strong> e a <strong>regra PECARN</strong> (Kuppermann, <em>Lancet</em> 2009). Itens marcados <strong>(Einstein)</strong> são do Guia do Episódio de Cuidado do Hospital Israelita Albert Einstein (2025).",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico e dados que pesam na gravidade",
                    icone: "🔎",
                    resumo: "Mecanismo, Glasgow e sinais que aumentam o risco.",
                    itens: [
                        "Cerca de <strong>80% dos TCE pediátricos são leves</strong>. Mais frequente em 0–4 anos e em adolescentes. Causas: quedas, acidentes domésticos e de trânsito, esporte e <strong>violência</strong> (criança sacudida).",
                        "Na criança pequena, sinais de gravidade são difíceis de avaliar: <strong>confiar na impressão dos pais</strong> (\"não está agindo normalmente\").",
                        "<strong>Pesam na gravidade:</strong> perda de consciência · vômitos (mais de 2 episódios) · crise convulsiva · amnésia · sinais de fratura ou afundamento de crânio · <strong>sinais de fratura de base</strong> (olhos de guaxinim, sinal de Battle, otorragia, rinorragia/rinoliquorreia).",
                        "Adolescentes: TCE frequentemente associado a álcool e drogas."
                    ]
                },
                {
                    titulo: "Escala de Coma de Glasgow (clicável)",
                    icone: "🧠",
                    resumo: "Versão convencional e versão modificada para < 2 anos. Leve 13–15 · moderado 9–12 · grave 3–8.",
                    escore: {
                        id: "glasgow_ped",
                        instrucao: "Toque na melhor resposta de cada item. Em < 2 anos, use a descrição depois da barra ( / ).",
                        itens: [
                            { nome: "Abertura ocular", opcoes: [[4, "Espontânea"], [3, "Ao chamado / comando verbal"], [2, "À dor"], [1, "Ausente"]] },
                            { nome: "Resposta verbal (convencional / < 2 anos)", opcoes: [[5, "Orientado / balbucio"], [4, "Confuso / choro irritado"], [3, "Palavras inapropriadas / choro à dor"], [2, "Sons incompreensíveis / gemido à dor"], [1, "Ausente"]] },
                            { nome: "Resposta motora (convencional / < 2 anos)", opcoes: [[6, "Obedece a comandos / movimento espontâneo normal"], [5, "Localiza a dor / retira ao toque"], [4, "Retirada inespecífica à dor"], [3, "Flexão anormal (decorticação)"], [2, "Extensão anormal (descerebração)"], [1, "Ausente"]] }
                        ],
                        faixas: [
                            { min: 3, max: 8, rotulo: "TCE grave", cor: "#dc2626", texto: "Intubar (ECG ≤ 8), TC urgente, neurocirurgia e UTI." },
                            { min: 9, max: 12, rotulo: "TCE moderado", cor: "#d97706", texto: "TC o mais rápido possível, neurocirurgia; UTI (sobretudo ECG < 11)." },
                            { min: 13, max: 15, rotulo: "TCE leve", cor: "#16a34a", texto: "Aplicar o PECARN para decidir a TC." }
                        ],
                        nota: "Classificação pelo Einstein/ATLS. A SBP 2017 usa leve ≥ 14, moderado 8–14 e grave ≤ 8. <strong>Queda de 2 pontos ou mais</strong> durante a observação = deterioração neurológica."
                    }
                },
                {
                    titulo: "PECARN: TC de crânio em < 2 anos (TCE leve)",
                    icone: "👶",
                    resumo: "Clicável. Itens 1–3 = alto risco; 4–7 = risco intermediário.",
                    escore: {
                        id: "pecarn_menor2",
                        unidade: "PECARN",
                        checklist: true,
                        instrucao: "Para ECG 14–15. Responda Sim ou Não em todos os itens.",
                        itens: [
                            { nome: "1. ECG ≤ 14", opcoes: OPC_SN },
                            { nome: "2. Alteração do estado mental (agitação, sonolência, perguntas repetitivas, resposta lenta)", opcoes: OPC_SN },
                            { nome: "3. Fratura de crânio palpável", opcoes: OPC_SN },
                            { nome: "4. Hematoma de couro cabeludo occipital, parietal ou temporal", opcoes: OPC_SN },
                            { nome: "5. Perda de consciência ≥ 5 segundos", opcoes: OPC_SN },
                            { nome: "6. Mecanismo grave (ver abaixo; queda > 0,9 m)", opcoes: OPC_SN },
                            { nome: "7. Não está agindo normalmente, segundo os pais", opcoes: OPC_SN }
                        ],
                        classificar: (v, m, n) => classificarPecarn(m, n, 3, "4,4%", "< 0,02%", true),
                        nota: "<strong>Mecanismo grave:</strong> acidente de carro com ejeção, capotamento ou morte de outro passageiro; pedestre ou ciclista sem capacete atingido por veículo; <strong>queda > 0,9 m</strong>; cabeça atingida por objeto de alto impacto. <strong>(Einstein)</strong> Em &lt; 3 meses, algumas diretrizes usam queda > 0,7 m ou o dobro da altura da criança. Validação 2024: sensibilidade de 100% em &lt; 2 anos."
                    }
                },
                {
                    titulo: "PECARN: TC de crânio em ≥ 2 anos (TCE leve)",
                    icone: "🧒",
                    resumo: "Clicável. Itens 1–3 = alto risco; 4–7 = risco intermediário.",
                    escore: {
                        id: "pecarn_maior2",
                        unidade: "PECARN",
                        checklist: true,
                        instrucao: "Para ECG 14–15. Responda Sim ou Não em todos os itens.",
                        itens: [
                            { nome: "1. ECG ≤ 14", opcoes: OPC_SN },
                            { nome: "2. Alteração do estado mental (agitação, sonolência, perguntas repetitivas, resposta lenta)", opcoes: OPC_SN },
                            { nome: "3. Sinais de fratura de base de crânio (guaxinim, Battle, otorragia, hemotímpano, rinoliquorreia)", opcoes: OPC_SN },
                            { nome: "4. Perda de consciência (qualquer)", opcoes: OPC_SN },
                            { nome: "5. Vômitos", opcoes: OPC_SN },
                            { nome: "6. Mecanismo grave (ver abaixo; queda > 1,5 m)", opcoes: OPC_SN },
                            { nome: "7. Cefaleia intensa", opcoes: OPC_SN }
                        ],
                        classificar: (v, m, n) => classificarPecarn(m, n, 3, "4,3%", "< 0,05%"),
                        nota: "<strong>Mecanismo grave:</strong> acidente de carro com ejeção, capotamento ou morte de outro passageiro; pedestre ou ciclista sem capacete atingido por veículo; <strong>queda > 1,5 m</strong>; cabeça atingida por objeto de alto impacto. Validação 2024: sensibilidade de 98,8% em ≥ 2 anos."
                    }
                },
                {
                    titulo: "Quando o PECARN não se aplica: TC por outros motivos",
                    icone: "⚠️",
                    resumo: "Coagulopatia, DVP, suspeita de maus-tratos, convulsão.",
                    itens: [
                        "O PECARN vale para <strong>TCE leve (ECG 14–15) até 24 h</strong>. Não vale para trauma penetrante, tumor cerebral, doença neurológica prévia que atrapalhe a avaliação, <strong>derivação ventricular (DVP)</strong> ou <strong>coagulopatia</strong>.",
                        "<strong>Distúrbio de coagulação</strong> (ex.: hemofilia): em geral <strong>TC independentemente da gravidade</strong> (SBP).",
                        "<strong>Suspeita de maus-tratos</strong> (lactente com história incompatível, lesões em fases diferentes): investigar à parte, não usar o PECARN para dispensar imagem.",
                        "Convulsão pós-traumática, déficit focal, fontanela tensa: avaliar TC mesmo com ECG 15.",
                        "Suspeita de lesão cervical: imagem da coluna cervical; se for fazer TC de crânio, incluir a janela cervical (SBP)."
                    ],
                    tabela: {
                        titulo: "(Einstein) Altura padrão de móveis, para estimar a queda",
                        colunas: ["Móvel", "Altura (cm)"],
                        linhas: [
                            ["Berço", "Colchão 30–40 · grades 80–100"],
                            ["Cama", "Colchão 50–60 · cabeceira 100–120"],
                            ["Sofá", "Assento 40–45 · encosto 80–90"],
                            ["Cadeira de jantar", "Assento 45 · encosto 85"],
                            ["Mesa de jantar / escrivaninha", "75"],
                            ["Trocador / bancada de cozinha", "≈ 90"],
                            ["Estante", "Total 180–200"]
                        ],
                        nota: "Corte do PECARN: 0,9 m (90 cm) em &lt; 2 anos e 1,5 m (150 cm) em ≥ 2 anos."
                    }
                }
            ]
        },
        {
            titulo: "Condução na emergência",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Passo a passo, na ordem em que se faz.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "ABCDE → Glasgow → leve: PECARN · moderado/grave: TC, neuroproteção e UTI.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>ABCDE</strong> (ATLS/PALS) com proteção da coluna cervical",
                        "<span class=\"cond-passo\">2</span> <strong>Glasgow, pupilas e glicemia</strong>: classificar leve, moderado ou grave",
                        "<span class=\"cond-passo\">3</span> <strong>TCE leve:</strong> PECARN → TC, observação 4–6 h ou alta",
                        "<span class=\"cond-passo\">4</span> <strong>Moderado/grave:</strong> TC urgente, neurocirurgia, exames, UTI",
                        "<span class=\"cond-passo\">5</span> <strong>Via aérea:</strong> intubar se ECG ≤ 8 ou sinais de HIC",
                        "<span class=\"cond-passo\">6</span> <strong>Neuroproteção:</strong> evitar hipóxia, hipotensão, febre, hiponatremia",
                        "<span class=\"cond-passo\">7</span> <strong>Hipertensão intracraniana:</strong> salina 3% / manitol",
                        "<span class=\"cond-passo\">8</span> <strong>Convulsão:</strong> tratar como estado de mal"
                    ]
                },
                {
                    passo: 1,
                    titulo: "ABCDE com proteção cervical",
                    resumo: "Sistematizar pelo ATLS e PALS.",
                    itens: [
                        "Atendimento sistematizado pelo <strong>ATLS e PALS</strong>, com <strong>proteção da coluna cervical</strong> se houver suspeita de trauma raquimedular.",
                        "O₂ para manter <strong>SatO₂ > 92%</strong>. Reconhecer e tratar o choque rapidamente: <strong>hipotensão é marcador sensível de mortalidade</strong>.",
                        "Choque: SF 0,9% <strong>20 mL/kg</strong> o mais rápido possível, repetindo conforme a resposta (SBP). Procurar outra fonte de sangramento: TCE isolado raramente causa choque, exceto no lactente (sangramento intracraniano ou subgaleal grande)."
                    ]
                },
                {
                    passo: 2,
                    titulo: "Glasgow, pupilas e glicemia",
                    resumo: "Classificar a gravidade pelo Glasgow do bloco 🔎.",
                    itens: [
                        "Calcular o <strong>Glasgow</strong> (versão para &lt; 2 anos se necessário) no bloco 🔎. Leve 13–15 · moderado 9–12 · grave 3–8.",
                        "Pupilas (tamanho, simetria, reação), postura, déficit focal, fontanela.",
                        "Glicemia capilar: <strong>tratar a hipoglicemia</strong>; manter glicemia até 180 mg/dL (Einstein).",
                        "Examinar o couro cabeludo (hematomas, afundamento), sinais de fratura de base e a coluna cervical."
                    ]
                },
                {
                    passo: 3,
                    titulo: "TCE leve: PECARN e observação",
                    resumo: "TC só se o PECARN indicar; senão, observar 4 a 6 h.",
                    itens: [
                        "Aplicar o <strong>PECARN</strong> da idade (bloco 🔎): <strong>alto risco → TC</strong> · intermediário → TC ou observação · <strong>todos \"Não\" → sem TC</strong>.",
                        "Equilibrar o risco de lesão com a <strong>radiação</strong> da TC: o objetivo é não deixar passar lesão e não irradiar sem necessidade.",
                        "<strong>Observação:</strong> mínimo de <strong>4 horas</strong>, no máximo 6 a 8 h (SBP). Piora durante a observação (vômitos, sonolência, cefaleia, queda do Glasgow) → TC.",
                        "TC inicial normal: em geral <strong>não precisa repetir</strong> nem internar para observação neurológica. Repetir a TC se houver qualquer piora neurológica.",
                        "Alta com orientações do bloco 🏠."
                    ]
                },
                {
                    passo: 4,
                    titulo: "TCE moderado e grave: TC, neurocirurgia, UTI",
                    resumo: "TC o mais rápido possível e neurocirurgião desde o início.",
                    itens: [
                        "<strong>TC de crânio o mais rapidamente possível</strong> e acionar a <strong>neurocirurgia</strong> desde o início.",
                        "Exames: hemoglobina/hematócrito, função renal, eletrólitos (sódio), glicemia, gasometria, coagulograma e tipagem.",
                        "<strong>UTI</strong>: indicação formal no TCE grave e no moderado, sobretudo com ECG &lt; 11 (SBP). Encaminhar a serviço pediátrico de referência se possível.",
                        "Sonda gástrica, se necessária, por via <strong>orogástrica</strong> (risco de fratura de base de crânio)."
                    ]
                },
                {
                    passo: 5,
                    titulo: "Via aérea: quando e como intubar",
                    alerta: true,
                    resumo: "ECG ≤ 8 ou sinais de HIC/herniação. Coluna neutra.",
                    itens: [
                        "<strong>Indicações:</strong> ECG ≤ 8 · sinais de hipertensão intracraniana ou iminência de herniação.",
                        "Coluna cervical em <strong>posição neutra</strong> (abrir o colar e estabilizar manualmente), elevação da mandíbula, sem hiperextensão.",
                        "<strong>Sequência rápida.</strong> (Einstein) preferir <strong>etomidato ou cetamina</strong> e <strong>evitar succinilcolina</strong>. A SBP 2017 cita etomidato (cuidado: supressão adrenal no choque) e tiopental (depressão cardiovascular) e pede cautela com a cetamina; o guia mais recente do Einstein (2025) já a prefere.",
                        "Ventilação: <strong>PaO₂ 90–100 mmHg</strong> e <strong>PaCO₂ 35–40 mmHg</strong>. <strong>Não hiperventilar de forma profilática.</strong>"
                    ],
                    remedios: ["rsi_ceta", "rsi_roc"]
                },
                {
                    passo: 6,
                    titulo: "Neuroproteção: evitar a lesão secundária",
                    resumo: "Hipóxia, hipotensão, febre, hiponatremia e hipoglicemia pioram o cérebro.",
                    itens: [
                        "Cabeça em <strong>posição neutra</strong> e cabeceira a <strong>30°</strong>.",
                        "<strong>Evitar hipotensão:</strong> PAS mínima &gt; 70 mmHg (1–12 meses), <strong>&gt; 70 + (2 × idade)</strong> (1–10 anos), &gt; 90 mmHg (&gt; 10 anos). Vasoativo se necessário para manter a PAM.",
                        "<strong>Normotermia</strong> (36–37,5 °C): evitar agressivamente a febre (&gt; 38 °C).",
                        "<strong>Sódio 135–150 mEq/L.</strong> Não usar soluções hipotônicas. Vigiar hiponatremia.",
                        "Analgesia e sedação adequadas (opioide + benzodiazepínico).",
                        "(Einstein) Hb mínima 7 g/dL (10 g/dL se instabilidade); diurese &gt; 1 mL/kg/h até 30 kg; nutrição enteral precoce.",
                        "<strong>Corticoide: não usar</strong> (sem benefício, mais infecção)."
                    ]
                },
                {
                    passo: 7,
                    titulo: "Hipertensão intracraniana",
                    resumo: "Salina 3% (1ª linha) ou manitol; sedação; hiperventilação só leve e refratária.",
                    itens: [
                        "<strong>Salina hipertônica 3%</strong> (1ª linha): (Einstein) bolus de <strong>2 a 5 mL/kg em 10 a 20 min</strong>; SBP: infusão contínua de 0,1 a 1 mL/kg/h. Sem NaCl 3% pronto: <strong>NaCl 20% 15 mL + água destilada 85 mL</strong>.",
                        "<strong>Manitol 0,25 a 1 g/kg</strong> em 20 a 30 min, pode repetir. Evitar em hipovolêmicos. Manter osmolalidade ≤ 310.",
                        "Otimizar analgesia e sedação; considerar bloqueador neuromuscular. Drenar líquor se houver ventriculostomia.",
                        "TCE grave: monitorização da PIC pode ser usada. Alvos (Einstein): <strong>PIC &lt; 20 mmHg</strong>, <strong>PPC (PAM − PIC) 40 a 65 mmHg</strong>.",
                        "<strong>Hiperventilação leve</strong> (PaCO₂ 30–35) só na HIC refratária, com o neurocirurgião; PaCO₂ &lt; 30 apenas na herniação aguda."
                    ]
                },
                {
                    passo: 8,
                    titulo: "Convulsão",
                    resumo: "Tratar como estado de mal; fenitoína.",
                    itens: [
                        "Crise convulsiva relacionada ao trauma: <strong>tratar como estado de mal convulsivo</strong> (benzodiazepínico) e administrar <strong>fenitoína</strong>.",
                        "(Einstein) Fenitoína <strong>profilática</strong> pode ser considerada no TCE grave (ECG ≤ 8), no moderado em &lt; 2 anos, ou com sangramento/lesão na imagem, HIC ou alteração importante da consciência. Nos casos graves, monitorização com EEG se disponível."
                    ],
                    remedios: ["neuro_diaz", "neuro_midaz", "neuro_fenitoina"]
                },
                {
                    titulo: "A qualquer momento: herniação cerebral",
                    icone: "🆘",
                    alerta: true,
                    resumo: "Anisocoria, Cushing, postura em extensão ou queda do Glasgow.",
                    itens: [
                        "<strong>Suspeitar:</strong> pupila dilatada ou <strong>anisocoria</strong> · <strong>tríade de Cushing</strong> (hipertensão, bradicardia, bradipneia/alteração respiratória) · <strong>postura em extensão</strong> · queda de 2 ou mais pontos no Glasgow.",
                        "<strong>Conduta (Einstein):</strong> hiperventilação com FiO₂ 100% · <strong>manitol 0,5 a 1 g/kg</strong> OU <strong>salina 3% 1 a 3 mL/kg</strong> · drenar líquor se ventriculostomia · <strong>TC de urgência e neurocirurgia</strong>."
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
                    titulo: "Alta e sinais de alarme",
                    icone: "🏠",
                    resumo: "As primeiras 24 a 48 h são as mais críticas.",
                    itens: [
                        "Alta: TCE leve com PECARN de baixo risco, ou após observação sem piora, ou com TC normal; família capaz de observar e de voltar.",
                        "Orientar que as <strong>primeiras 24 a 48 horas</strong> são as mais importantes. Pode dormir, mas um adulto deve conseguir acordá-la e ela deve responder normalmente.",
                        "Analgesia simples (paracetamol ou dipirona) para dor de cabeça leve."
                    ],
                    remedios: ["pct_gts", "dip_gts"],
                    grupos: [
                        {
                            nome: "Voltar imediatamente se",
                            itens: [
                                "Sonolência excessiva, dificuldade para acordar, confusão ou comportamento diferente.",
                                "Vômitos repetidos (3 ou mais).",
                                "Dor de cabeça forte ou que piora.",
                                "Convulsão, desmaio ou perda de consciência.",
                                "Fraqueza, formigamento, dificuldade para andar ou falar, visão dupla, pupilas de tamanhos diferentes.",
                                "Saída de líquido claro ou sangue pelo nariz ou ouvido.",
                                "Lactente: choro inconsolável, recusa alimentar, moleira abaulada."
                            ]
                        }
                    ]
                },
                {
                    titulo: "Concussão: volta à escola e ao esporte",
                    icone: "🎒",
                    resumo: "Repouso relativo curto e retorno gradual.",
                    itens: [
                        "Repouso relativo nas primeiras 24 a 48 h (menos telas e esforço), depois <strong>retorno gradual</strong> à escola e às atividades, conforme os sintomas.",
                        "Esporte de contato só depois de assintomático e com liberação médica. Novo trauma antes da recuperação é perigoso.",
                        "Sintomas que persistem por mais de 4 semanas (cefaleia, tontura, dificuldade de concentração, irritabilidade): encaminhar para avaliação especializada."
                    ]
                },
                {
                    titulo: "Prevenção e proteção",
                    icone: "🛡️",
                    resumo: "Quedas, cadeirinha, capacete e maus-tratos.",
                    itens: [
                        "Nunca deixar o lactente sozinho em trocador, cama ou sofá. Grades em janelas e escadas. Evitar andador.",
                        "Cadeirinha adequada à idade no carro; capacete em bicicleta, patins e skate.",
                        "<strong>Nunca sacudir o bebê</strong> (síndrome do bebê sacudido). Na suspeita de maus-tratos: proteger, registrar e <strong>notificar</strong>."
                    ]
                }
            ]
        }
    ],

    fontes: [
        "Sociedade Brasileira de Pediatria — Departamento Científico de Terapia Intensiva. Guia Prático de Atualização nº 1: Trauma Cranioencefálico (abril de 2017).",
        "Hospital Israelita Albert Einstein. Guia do Episódio de Cuidado: Traumatismo Cranioencefálico em Crianças e Adolescentes (CPTW430.1, aprovado em 22/01/2025).",
        "Kuppermann N et al. Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study. Lancet. 2009;374:1160-70 (PECARN).",
        "Holmes JF et al. PECARN prediction rules for CT imaging of children with blunt abdominal or minor head trauma: a multicentre prospective validation study. Lancet Child Adolesc Health. 2024;8(5):339-47.",
        "Babl FE et al. Accuracy of PECARN, CATCH, and CHALICE head injury decision rules in children: a prospective cohort study. Lancet. 2017;389:2393-402.",
        "Lumba-Brown A et al. CDC Guideline on the Diagnosis and Management of Mild Traumatic Brain Injury Among Children. JAMA Pediatr. 2018;172(11):e182853.",
        "Kochanek PM et al. Guidelines for the Management of Pediatric Severe Traumatic Brain Injury, 3rd ed. Pediatr Crit Care Med. 2019;20:S1-82."
    ],
    revisao: "10/2026"
});
