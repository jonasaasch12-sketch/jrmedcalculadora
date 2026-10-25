// =====================================================
// CONDUTA: SINUSITE (RINOSSINUSITE) BACTERIANA AGUDA
// Base: AAP 2013 (Wald, Pediatrics) — diagnóstico (3 apresentações), sem imagem,
// antibiótico × observação, escolha, falha em 72 h; IDSA 2012 (Chow, Clin Infect Dis) —
// fatores de risco para resistência, duração 10 a 14 dias, alérgicos, adjuvantes.
// Complicações orbitárias: classificação de Chandler; revisões 2023.
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
registrarConduta({
    id: "sinusite",
    nome: "Sinusite Bacteriana Aguda",
    categoria: "Respiratório",
    cor: "#0369a1",
    kw: "sinusite rinossinusite bacteriana aguda secrecao nasal purulenta tosse diurna 10 dias dupla piora celulite periorbitaria orbitaria chandler amoxicilina clavulanato",
    resumo: "As 3 apresentações (persistente, piora, grave), sem imagem, antibiótico ou observar (clicável), escolha e falha em 72 h, alérgicos e complicações orbitárias e intracranianas.",
    legenda: "Conduta conforme a <strong>diretriz da AAP (2013)</strong> e a <strong>diretriz da IDSA (2012)</strong>. Complicações orbitárias pela <strong>classificação de Chandler</strong>.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",
                    icone: "🔎",
                    resumo: "Clínico. IVAS que dura mais de 10 dias, piora depois de melhorar ou começa grave.",
                    itens: [
                        "<strong>Diagnóstico clínico</strong> em criança de 1 a 18 anos com IVAS e <strong>uma das três apresentações</strong> (AAP 2013):",
                        "• <strong>Persistente:</strong> secreção nasal (de qualquer aspecto) e/ou <strong>tosse diurna</strong> por <strong>mais de 10 dias sem melhora</strong>.",
                        "• <strong>Piora (dupla piora):</strong> volta ou piora da secreção nasal, da tosse diurna ou da febre <strong>depois de melhora inicial</strong>.",
                        "• <strong>Início grave:</strong> <strong>febre ≥ 39 °C + secreção nasal purulenta</strong> por <strong>pelo menos 3 dias seguidos</strong>.",
                        "<strong>Secreção amarela ou verde sozinha não é sinusite:</strong> no resfriado, a secreção fica purulenta em poucos dias e melhora sozinha.",
                        "<strong>Não pedir exame de imagem</strong> (raio-X, tomografia ou ressonância) para diferenciar de IVAS viral: não ajuda no diagnóstico (AAP 2013).",
                        "<strong>Tomografia com contraste</strong> só se suspeita de <strong>complicação orbitária ou intracraniana</strong>.",
                        "<strong>Agentes:</strong> <em>S. pneumoniae</em>, <em>H. influenzae</em> não tipável e <em>M. catarrhalis</em>, os mesmos da otite."
                    ]
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Resfriado comum, rinite alérgica, corpo estranho nasal, adenoidite e coqueluche.",
                    itens: [
                        "<strong>Resfriado comum (viral):</strong> pico dos sintomas no 3º a 5º dia e melhora em 7 a 10 dias. A tosse pode durar mais, mas melhorando.",
                        "<strong>Rinite alérgica:</strong> prurido, espirros em salva, secreção clara, sazonal, sem febre.",
                        "<strong>Corpo estranho nasal:</strong> secreção <strong>unilateral, fétida</strong>, às vezes com sangue, em pré-escolar.",
                        "<strong>Hipertrofia de adenoide / adenoidite:</strong> roncos, respiração bucal, voz anasalada.",
                        "<strong>Coqueluche:</strong> tosse em acessos, guincho, vômito após a tosse.",
                        "<strong>Celulite periorbitária</strong> sem sinusite: lesão de pele, picada ou trauma próximos ao olho."
                    ]
                },
                {
                    titulo: "Fatores de risco",
                    icone: "⚠️",
                    resumo: "Creche, rinite alérgica, fumo passivo; < 2 anos e antibiótico recente pedem amoxicilina + clavulanato.",
                    itens: [
                        "<strong>Para a doença:</strong> IVAS frequentes (creche), <strong>rinite alérgica</strong>, fumo passivo, hipertrofia de adenoide.",
                        "<strong>Para pneumococo resistente / beta-lactamase</strong> (IDSA 2012): <strong>< 2 anos</strong>, <strong>creche</strong>, <strong>antibiótico nos últimos 30 dias</strong>, internação recente, imunodepressão.",
                        "<strong>Sinusite recorrente</strong> (≥ 3 episódios em 6 meses ou ≥ 4 em 12 meses): investigar rinite alérgica, imunodeficiência, fibrose cística, discinesia ciliar e alteração anatômica."
                    ]
                },
                {
                    titulo: "Gravidade: antibiótico ou observar?",
                    icone: "📊",
                    resumo: "Toque em cada item. Complicação: internar. Piora ou início grave: antibiótico. Persistente: antibiótico ou observar 3 dias.",
                    itens: [
                        "<strong>Sinais de complicação</strong> (passo 1): edema ou vermelhidão ao redor do olho, olho saltado, dor ou limitação ao mexer o olho, visão dupla, cefaleia intensa, vômitos, rigidez de nuca, alteração de consciência.",
                        "<strong>Observar</strong> só no quadro <strong>persistente</strong> não grave, com <strong>reavaliação garantida em 3 dias</strong> (AAP 2013)."
                    ],
                    escore: {
                        id: "sinusite_decisao",
                        instrucao: "Toque no que a criança apresenta em cada item. A decisão sai automaticamente (AAP 2013 / IDSA 2012).",
                        unidade: " ",
                        itens: [
                            { nome: "Sinais de complicação orbitária ou intracraniana", opcoes: [[1, "Sim", "✓"], [0, "Não", "—"]] },
                            { nome: "Apresentação", opcoes: [[0, "Persistente > 10 dias sem melhora", "1"], [1, "Piora após melhora inicial", "2"], [2, "Início grave: febre ≥ 39 °C + secreção purulenta ≥ 3 dias", "3"], [3, "Nenhuma (resfriado)", "—"]] },
                            { nome: "Fator de risco: < 2 anos, creche, antibiótico nos últimos 30 dias ou imunodeprimido", opcoes: [[1, "Sim", "✓"], [0, "Não", "—"]] }
                        ],
                        classificar: (v, m, n) => {
                            if (m[0] === 1) return { num: "🏥", rotulo: "Internar", cor: "#dc2626", texto: "Complicação: tomografia com contraste, antibiótico EV, otorrino e oftalmologia (passo 1)." };
                            if (Object.keys(m).length < n) return { num: "?", rotulo: "", cor: "#64748b", texto: "" };
                            let atb = m[2] ? "Amoxicilina + clavulanato (fator de risco)" : "Amoxicilina";
                            if (m[1] === 3) return { num: "—", rotulo: "Não é sinusite bacteriana", cor: "#16a34a", texto: "Resfriado: sem antibiótico. Lavagem nasal, sintomáticos e retorno se durar mais de 10 dias, piorar ou febre alta." };
                            if (m[1] === 0) return { num: "⏳", rotulo: "Antibiótico ou observar 3 dias", cor: "#d97706", texto: `Decidir com a família. Se antibiótico: ${atb}, 10 dias. Observar só com retorno garantido em 3 dias.` };
                            return { num: "💊", rotulo: "Antibiótico", cor: "#dc2626", texto: `${m[1] === 1 ? "Piora após melhora" : "Início grave"}: ${atb}, 10 dias.` };
                        },
                        nota: "AAP 2013 (1 a 18 anos): antibiótico no início grave e na piora; antibiótico ou 3 dias de observação no persistente. Fatores de risco para resistência: IDSA 2012."
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
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "Complicação? → confirmar a apresentação → antibiótico ou observar → amoxicilina (± clavulanato) 10 dias → reavaliar em 72 h.",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar?</strong> Critérios clicáveis: UTI · enfermaria · casa (celulite orbitária, proptose, dor ao mexer o olho, sinais neurológicos)",
                        "<span class=\"cond-passo\">2</span> <strong>Confirmar a apresentação:</strong> persistente, piora ou início grave. <strong>Sem raio-X</strong>",
                        "<span class=\"cond-passo\">3</span> <strong>Antibiótico ou observar:</strong> pelo quadro de gravidade (bloco 🔎)",
                        "<span class=\"cond-passo\">4</span> <strong>Amoxicilina 10 dias;</strong> amoxicilina + clavulanato se fator de risco. Vômitos: ceftriaxona IM",
                        "<span class=\"cond-passo\">5</span> <strong>Alérgico:</strong> sem anafilaxia = cefalosporina · com anafilaxia = levofloxacino ou clindamicina + cefixima",
                        "<span class=\"cond-passo\">6</span> <strong>Sintomáticos:</strong> lavagem nasal e analgésico. Sem descongestionante ou anti-histamínico",
                        "<span class=\"cond-passo\">7</span> <strong>Sem melhora em 72 h:</strong> reavaliar e subir um degrau"
                    ],
                    lista: "passos"
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    resumo: "Primeiro decida: UTI, internar ou tratar em casa. Complicação orbitária ou intracraniana interna.",
                    alerta: true,
                    itens: [
                        "A <strong>sinusite não complicada é tratada em casa</strong>. Internar por <strong>complicação orbitária ou intracraniana</strong>, toxemia ou quando o tratamento oral não é possível (AAP 2013).",
                        "<strong>Orbitária</strong> (a mais comum; etmoidite em criança pequena): <strong>edema e hiperemia palpebral</strong>, <strong>proptose</strong>, <strong>dor ou limitação da movimentação ocular</strong>, diplopia, <strong>queda da acuidade visual</strong>.",
                        "<strong>Intracraniana</strong> (adolescente; sinusite frontal): <strong>cefaleia intensa</strong>, vômitos, febre alta, <strong>rigidez de nuca</strong>, alteração de consciência, convulsão, déficit focal. <strong>Tumor de Pott</strong>: edema mole na testa.",
                        "<strong>Conduta:</strong> internar, <strong>tomografia de seios da face e órbitas (e crânio, se sinal neurológico) com contraste</strong>, <strong>antibiótico EV</strong>, <strong>otorrino e oftalmologia</strong> (cirurgia se abscesso, piora visual ou falha) (AAP 2013; revisões 2023).",
                        "<strong>Celulite pré-septal</strong> leve (sem proptose, movimento ocular normal, visão normal), criança bem: pode ser tratada por via oral com reavaliação em 24 a 48 h."
                    ],
                    tabela: {
                        colunas: ["Chandler", "Quadro", "Sinais"],
                        linhas: [
                            ["I", "Celulite pré-septal (periorbitária)", "Edema e hiperemia palpebral; olho mexe normal, visão normal"],
                            ["II", "Celulite orbitária", "+ proptose, dor/limitação ao mexer o olho, quemose"],
                            ["III", "Abscesso subperiosteal", "+ deslocamento do globo, piora da movimentação"],
                            ["IV", "Abscesso orbitário", "Proptose grave, oftalmoplegia, perda visual"],
                            ["V", "Trombose do seio cavernoso", "Bilateral, toxemia, paralisia de nervos cranianos"]
                        ]
                    },
                    escore: {
                        id: "internacao_sinusite",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave. Sem nenhum, toque em \"Nenhum\".",
                        itens: [
                            { nome: "🔴 UTI", opcoes: [[3, "Choque ou sepse (má perfusão, hipotensão)", "🔴"]] },
                            { nome: "", opcoes: [[3, "Rebaixamento da consciência ou convulsão", "🔴"]] },
                            { nome: "", opcoes: [[3, "Déficit focal, sinais de hipertensão intracraniana ou de trombose do seio cavernoso (bilateral, paralisia de nervos cranianos)", "🔴"]] },
                            { nome: "🟠 Internar (enfermaria)", opcoes: [[2, "Celulite orbitária: proptose, dor ou limitação ao mexer o olho, diplopia ou queda da visão (Chandler II a IV)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Suspeita de complicação intracraniana: cefaleia intensa, vômitos, rigidez de nuca, edema na testa (tumor de Pott)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Celulite pré-septal com toxemia, em lactente ou sem melhora em 24 a 48 h de antibiótico oral", "🟠"]] },
                            { nome: "", opcoes: [[2, "Vômitos que impedem o antibiótico oral, sem como fazer ceftriaxona IM", "🟠"]] },
                            { nome: "", opcoes: [[2, "Falha de dois esquemas de antibiótico", "🟠"]] },
                            { nome: "", opcoes: [[2, "Imunodeprimido com quadro grave", "🟠"]] },
                            { nome: "", opcoes: [[2, "Sem condição de retorno ou risco social", "🟠"]] },
                            { nome: "🟢 Nenhum dos acima", opcoes: [[0, "Nenhum critério", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI", cor: "#dc2626", texto: "Estabilizar, antibiótico EV, tomografia com contraste (seios, órbitas e crânio) e otorrino, oftalmo e neurocirurgia de urgência." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Antibiótico EV, tomografia com contraste se suspeita orbitária ou intracraniana, otorrino e oftalmologia." };
                            return { num: "🏠", rotulo: "Alta com retorno", cor: "#16a34a", texto: "Tratamento oral em casa (passos 2 a 7). Reavaliar em 72 h ou antes se piorar." };
                        },
                        nota: "A AAP 2013 e a IDSA 2012 não trazem uma lista formal de internação. Estes critérios reúnem as complicações e as situações de risco descritas nelas e nas revisões 2023 de complicações orbitárias."
                    }
                },
                {
                    passo: 2,
                    titulo: "Confirmar a apresentação",
                    resumo: "Persistente (> 10 dias), piora após melhora ou início grave. Sem exame de imagem.",
                    itens: [
                        "<strong>Contar os dias</strong> desde o início da IVAS e perguntar se houve <strong>melhora e depois piora</strong>.",
                        "<strong>Exame:</strong> secreção purulenta na rinoscopia ou na orofaringe posterior, edema de mucosa, dor à palpação da face (pouco sensível na criança). Olhar os olhos e a movimentação ocular.",
                        "<strong>Não pedir raio-X de seios da face</strong>: o resfriado também altera a imagem (AAP 2013).",
                        "<strong>Menor de 1 ano:</strong> seios pouco desenvolvidos; a diretriz não se aplica. Pensar em outra causa."
                    ]
                },
                {
                    passo: 3,
                    titulo: "Antibiótico ou observar",
                    resumo: "Piora ou início grave: antibiótico. Persistente: antibiótico ou observar 3 dias.",
                    itens: [
                        "<strong>Antibiótico:</strong> <strong>início grave</strong> e <strong>piora após melhora</strong> (AAP 2013).",
                        "<strong>Persistente (> 10 dias):</strong> <strong>antibiótico ou observar mais 3 dias</strong>, decidindo com a família. Iniciar se piorar ou não melhorar.",
                        "<strong>Duração:</strong> <strong>10 dias</strong> (IDSA 2012: 10 a 14 dias; AAP 2013: até 7 dias sem sintomas)."
                    ]
                },
                {
                    passo: 4,
                    titulo: "Escolha do antibiótico",
                    resumo: "Amoxicilina dose alta 10 dias. Fator de risco: amoxicilina + clavulanato. Vômitos: ceftriaxona IM.",
                    itens: [
                        "<strong>1ª escolha: amoxicilina</strong> (AAP 2013). Dose alta pelo pneumococo resistente.",
                        "<strong>Amoxicilina + clavulanato</strong> se <strong>< 2 anos</strong>, <strong>creche</strong>, <strong>antibiótico nos últimos 30 dias</strong>, quadro <strong>moderado a grave</strong> ou <strong>imunodeprimido</strong> (IDSA 2012). A IDSA prefere a amoxicilina + clavulanato para todos.",
                        "<strong>Vômitos ou não aceita via oral:</strong> <strong>ceftriaxona IM dose única</strong>; melhorou em 24 h, completar com antibiótico oral (AAP 2013).",
                        "<strong>Não usar</strong> macrolídeos (azitromicina, claritromicina) nem sulfametoxazol + trimetoprima: resistência alta do pneumococo e do <em>H. influenzae</em> (IDSA 2012)."
                    ],
                    remedios: ["amox_sinusite", "clav_sinusite", "cef_sinusite"]
                },
                {
                    passo: 5,
                    titulo: "Alérgico à penicilina",
                    resumo: "Sem anafilaxia: cefalosporina. Com anafilaxia: levofloxacino ou clindamicina + cefixima.",
                    itens: [
                        "<strong>Alergia sem reação imediata:</strong> <strong>cefalosporina</strong> de 2ª ou 3ª geração (cefuroxima, cefpodoxima) ou <strong>ceftriaxona IM</strong> (AAP 2013; IDSA 2012).",
                        "<strong>Reação imediata ou anafilaxia:</strong> <strong>levofloxacino</strong> ou <strong>clindamicina + cefixima</strong> (IDSA 2012).",
                        "Macrolídeo não é opção por resistência."
                    ],
                    remedios: ["cef_sinusite"]
                },
                {
                    passo: 6,
                    titulo: "Sintomáticos e orientações",
                    resumo: "Lavagem nasal com soro e analgésico. Sem descongestionante, anti-histamínico ou mucolítico.",
                    itens: [
                        "<strong>Lavagem nasal com soro fisiológico</strong> (ou hipertônico): alivia os sintomas (IDSA 2012).",
                        "<strong>Dor e febre:</strong> paracetamol, dipirona ou ibuprofeno.",
                        "<strong>Não usar</strong> descongestionante, anti-histamínico (exceto se rinite alérgica) nem mucolítico (IDSA 2012).",
                        "<strong>Corticoide nasal:</strong> só como adjuvante em quem tem <strong>rinite alérgica</strong>.",
                        "<strong>Retornar se:</strong> febre persistente após 72 h de antibiótico, inchaço ou vermelhidão ao redor do olho, dor ao mexer o olho, visão dupla, dor de cabeça forte, vômitos ou sonolência."
                    ],
                    remedios: ["soro_nasal", "pct_gts", "dip_gts", "ibu_gts"]
                },
                {
                    passo: 7,
                    titulo: "Sem melhora em 72 h",
                    resumo: "Reavaliar. Observação → amoxicilina; amoxicilina → amoxicilina + clavulanato; esta → ceftriaxona ou otorrino.",
                    itens: [
                        "<strong>Reavaliar</strong> se piora a qualquer momento ou <strong>sem melhora em 72 h</strong>: confirmar o diagnóstico e procurar complicação (passo 1).",
                        "<strong>Estava em observação:</strong> iniciar <strong>amoxicilina</strong> (ou amoxicilina + clavulanato se fator de risco).",
                        "<strong>Estava com amoxicilina:</strong> trocar para <strong>amoxicilina + clavulanato</strong>.",
                        "<strong>Estava com amoxicilina + clavulanato:</strong> ceftriaxona IM ou levofloxacino; <strong>tomografia com contraste e otorrino</strong> se persistir (IDSA 2012)."
                    ],
                    remedios: ["clav_sinusite", "cef_sinusite"]
                }
            ]
        },
        {
            titulo: "Ambulatório: recorrência, crônica e prevenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Sinusite recorrente",
                    icone: "🔁",
                    resumo: "≥ 3 episódios em 6 meses ou ≥ 4 em 12 meses: investigar a causa e encaminhar ao otorrino.",
                    itens: [
                        "<strong>Definição:</strong> ≥ 3 episódios em 6 meses ou ≥ 4 em 12 meses, com melhora completa entre eles.",
                        "<strong>Investigar:</strong> <strong>rinite alérgica</strong> (a causa mais comum), imunodeficiência (imunoglobulinas), <strong>fibrose cística</strong>, discinesia ciliar, refluxo, alteração anatômica (desvio de septo, hipertrofia de adenoide).",
                        "<strong>Encaminhar ao otorrino</strong> para avaliação e tomografia fora da crise."
                    ]
                },
                {
                    titulo: "Sinusite crônica",
                    icone: "⏳",
                    resumo: "Sintomas por mais de 12 semanas: otorrino. Pensar em adenoide, alergia e fibrose cística.",
                    itens: [
                        "<strong>Sintomas por mais de 12 semanas</strong>: secreção, obstrução nasal, tosse, cefaleia.",
                        "<strong>Pólipo nasal na criança</strong>: investigar <strong>fibrose cística</strong>.",
                        "Encaminhar ao <strong>otorrino</strong> (lavagem nasal, corticoide nasal, adenoidectomia quando indicada)."
                    ]
                },
                {
                    titulo: "Prevenção",
                    icone: "🛡️",
                    resumo: "Vacinas em dia, tratar a rinite alérgica, sem fumo passivo e lavagem nasal nas IVAS.",
                    itens: [
                        "<strong>Vacinas pneumocócica conjugada e influenza</strong> em dia.",
                        "<strong>Tratar a rinite alérgica</strong> e evitar fumo passivo.",
                        "<strong>Lavagem nasal</strong> nas IVAS e lavar as mãos."
                    ]
                }
            ]
        }
    ],

    citacoes: { "AAP 2013": 0, "AAP": 0, "IDSA 2012": 1, "IDSA": 1, "revisões 2023": [2, 3] }, // sigla no texto → fonte (índice em fontes)
    fontes: [
        "Wald ER, Applegate KE, Bordley C, et al. Clinical practice guideline for the diagnosis and management of acute bacterial sinusitis in children aged 1 to 18 years. Pediatrics 2013;132(1):e262-80 (AAP). doi:10.1542/peds.2013-1071",
        "Chow AW, Benninger MS, Brook I, et al. IDSA clinical practice guideline for acute bacterial rhinosinusitis in children and adults. Clin Infect Dis 2012;54(8):e72-e112. doi:10.1093/cid/cir1043",
        "Trbojević T, Penezić A, Sitaš I, et al. Interdisciplinary care in orbital complications of acute rhinosinusitis in children. Indian J Ophthalmol 2023;71(1):242-248. doi:10.4103/ijo.IJO_798_22",
        "Yang XJ, Tang LX, Wang PP, et al. Diagnosis and management of orbital and cranial complications of pediatric acute rhinosinusitis. Zhonghua Er Bi Yan Hou Tou Jing Wai Ke Za Zhi 2023;58(2):133-138. doi:10.3760/cma.j.cn115330-20220315-00114"
    ],
    revisao: "10/2026"
});
