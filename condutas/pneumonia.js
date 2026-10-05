// =====================================================
// CONDUTA: PNEUMONIA ADQUIRIDA NA COMUNIDADE (PAC), NÃO COMPLICADA E COMPLICADA
// Base: SBP, Departamento de Pneumologia. Documento Científico nº 8 (23/02/2022):
// "Abordagem Diagnóstica e Terapêutica das PAC Não Complicadas"; e
// Documento Científico nº 151 (29/04/2024), Pneumologia e Infectologia:
// "Pneumonias Adquiridas na Comunidade Complicadas: Atualização 2024".
// Os remédios são ids dos cards (farmaciaJR): a dose é calculada lá.
// =====================================================
registrarConduta({
    id: "pneumonia",
    nome: "Pneumonia (PAC)",
    categoria: "Respiratório",
    cor: "#0284c7",
    kw: "pneumonia pac broncopneumonia pneumonia complicada pacc derrame pleural parapneumonico empiema necrosante abscesso pulmonar pneumatocele dreno toracico amoxicilina",
    resumo: "Diagnóstico, gravidade, tratamento ambulatorial e hospitalar, falha terapêutica e complicações (derrame, empiema, necrosante, abscesso).",
    legenda: "Conduta conforme os Documentos Científicos da <strong>SBP</strong>: PAC não complicadas (nº 8, 2022) e PAC complicadas (nº 151, 2024).",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",
                    icone: "🔎",
                    resumo: "Definição, agentes, quadro clínico e classificação da OMS.",
                    itens: [
                        "<strong>PAC:</strong> pneumonia em criança <strong>não hospitalizada no último mês</strong> (germes do domicílio, escola e comunidade). Principal causa de morbimortalidade em < 5 anos.",
                        "<strong>Agentes:</strong> vírus predominam em todas as idades, sobretudo o <strong>VSR</strong> (mais frequente em < 5 anos); também metapneumovírus e bocavírus. Bactérias: <strong>pneumococo</strong>, H. influenzae e S. aureus.",
                        "<strong>Diagnóstico eminentemente clínico.</strong> Quadro clássico: <strong>febre de início agudo, taquipneia e tosse</strong>. Pode ser sutil (só inapetência e agitação). Em < 5 anos é comum pródromo de febre baixa e coriza.",
                        "Febre pode faltar em lactentes muito pequenos com C. trachomatis, B. pertussis ou Ureaplasma. Crianças maiores podem referir dor pleurítica ou rigidez de nuca (acometimento de lobo).",
                        "<strong>Mais associados à pneumonia radiográfica</strong> (< 5 anos): hipoxemia moderada (<strong>SatO₂ ≤ 96%</strong>) e aumento do esforço respiratório (gemência, batimento de asas nasais, retrações). SatO₂ > 96% diminui a probabilidade; taquipneia (FR > 40) isolada não foi fortemente associada.",
                        "<strong>Sibilância:</strong> asma, bronquiolite e sibilância viral também causam taquipneia. <strong>Tratar com broncodilatador antes de classificar como PAC</strong> (evita antibiótico desnecessário).",
                        "<strong>Classificação da OMS:</strong> < 2 meses com tosse, dificuldade respiratória e <strong>FR ≥ 60</strong> (com ou sem tiragem) = pneumonia grave → internar. > 2 meses: <strong>pneumonia</strong> (só FR aumentada para a idade) → tratamento ambulatorial com antibiótico; <strong>pneumonia grave</strong> (FR aumentada + <strong>tiragem subcostal</strong>) → internação."
                    ]
                },
                {
                    titulo: "Fluxograma: tosse ou dificuldade respiratória (2 meses a 5 anos)",
                    icone: "🧭",
                    resumo: "Com sibilos: pensar em BVA, asma ou sibilância viral. Sem sibilos: classificar.",
                    tabela: {
                        colunas: ["Achado", "Conduta"],
                        linhas: [
                            ["<strong>Com sibilos</strong> e < 2 anos", "Considerar <strong>bronquiolite viral aguda</strong>. Se sim, manejar como BVA. Se não, seguir como abaixo."],
                            ["<strong>Com sibilos</strong> (2–5 anos ou BVA afastada)", "<strong>Prova terapêutica com broncodilatador</strong> de curta ação (curso curto, sugestão: 3 vezes de 20/20 min). Boa resposta: crise de asma ou sibilância viral. Mantém tosse e/ou dificuldade respiratória: seguir como \"sem sibilos\"."],
                            ["<strong>Sem sibilos</strong>: tosse, resfriado (coriza, obstrução nasal)", "<strong>Não compatível com pneumonia</strong>"],
                            ["<strong>Sem sibilos</strong>: taquipneia e/ou esforço respiratório", "<strong>Pneumonia</strong>"],
                            ["<strong>Sem sibilos</strong>: comprometimento do estado geral", "<strong>Pneumonia grave ou muito grave</strong>: 1ª dose do antibiótico o mais breve possível e encaminhar para internação com antibiótico EV. Considerar diferenciais de outras doenças graves."]
                        ],
                        nota: "Fonte: Figura 1 do Documento Científico nº 8 da SBP (modificado de Ardura-Garcia & Kuehni)."
                    }
                },
                {
                    titulo: "Exames complementares (PAC não complicada)",
                    icone: "🧪",
                    resumo: "Em geral só nos internados; radiografia não é rotina no ambulatório.",
                    itens: [
                        "Exames se aplicam basicamente aos <strong>internados</strong> (PAC grave, não necessariamente complicada). Preferir métodos não invasivos.",
                        "<strong>Teste rápido de vírus</strong> (swab de nasofaringe, RCP multiplex), se disponível: reduz imagem e antibiótico desnecessários.",
                        "<strong>Doença grave ou aspecto tóxico:</strong> hemograma, eletrólitos, função hepática e renal e <strong>hemocultura</strong>. Anemia ou plaquetopenia podem sugerir SHU (pneumococo).",
                        "<strong>Hemocultura:</strong> não de rotina; colher em quem vai internar ou sem boa evolução com o antibiótico.",
                        "<strong>Marcadores inflamatórios</strong> (VHS, PCR, procalcitonina): não diferenciam viral de bacteriana com segurança; úteis na evolução e como prognóstico. <strong>PCT < 0,25 ng/mL</strong>: baixa probabilidade de PAC bacteriana; <strong>< 0,1 ng/mL</strong>: alto valor preditivo negativo. PCT elevada com vírus identificado pode sugerir coinfecção.",
                        "Investigar <strong>tuberculose</strong> se área endêmica ou contato com adulto com TB.",
                        "<strong>Radiografia de tórax:</strong> não indicada no ambulatório. Indicar se hipoxemia, esforço respiratório, má resposta ao tratamento (complicações), febre prolongada com tosse (mesmo sem taquipneia), casos graves, evolução prolongada ou recorrente, suspeita de corpo estranho ou malformação; considerar em < 5 anos com febre e leucocitose sem causa aparente. Não define a etiologia.",
                        "<strong>Não fazer de rotina:</strong> radiografia em perfil; radiografia de controle se houver melhora clínica (considerar na pneumonia redonda, colapso, pneumonia recorrente localizada ou sintomas persistentes); reagentes de fase aguda; investigação microbiológica no ambulatório; sorologias (diagnóstico retrospectivo); <strong>antígeno urinário para pneumococo</strong>."
                    ]
                },
                {
                    titulo: "PAC complicada: definição e agentes",
                    icone: "🔎",
                    resumo: "O que é PACC e principais agentes.",
                    itens: [
                        "<strong>PAC complicada (PACC):</strong> PAC associada a complicações <strong>locais</strong> (derrame parapneumônico, empiema pleural, pneumonia necrosante, abscesso pulmonar) e/ou <strong>sistêmicas</strong> (bacteremia, infecção metastática, falência de múltiplos órgãos, SDRA, CIVD).",
                        "Pode ser a apresentação inicial ou decorrer de PAC não complicada com evolução desfavorável ou falência de tratamento. Curso e internação em geral prolongados, mas a maioria evolui para cura.",
                        "<strong>Agentes:</strong> vírus (principalmente VSR) são os principais em < 2 anos. Entre as bactérias, o <strong>pneumococo</strong> é o principal em < 5 anos. Coinfecção viral + bacteriana em ~30%.",
                        "Outros: <strong>S. aureus</strong> (inclusive MRSA e cepas produtoras de PVL nas formas necrosantes graves), S. pyogenes, H. influenzae, M. catarrhalis, M. pneumoniae, K. pneumoniae, P. aeruginosa.",
                        "Sorotipos pneumocócicos mais prevalentes em < 5 anos (2022): <strong>19A</strong> (52%, clone com alta resistência à penicilina), 3 (sensível à penicilina) e 6C."
                    ]
                },
                {
                    titulo: "PAC complicada: quadro clínico",
                    icone: "🩺",
                    resumo: "Derrame/empiema, pneumonia necrosante, abscesso e aspirativa.",
                    grupos: [
                        {
                            nome: "Derrame parapneumônico (DPP) e empiema (EP)",
                            itens: [
                                "Manifestação <strong>mais comum</strong> da PACC. Estágios: exsudativo (DPP simples) → fibrinopurulento (DPP complicado) → organização (paquipleuris). EP = coleção purulenta, estágio avançado do mesmo processo.",
                                "<strong>Suspeitar</strong> quando a resposta ao antibiótico para PAC é lenta ou há piora durante o tratamento.",
                                "Mal-estar, letargia e febre, seguidos de tosse e taquipneia (> 90%). Dispneia à medida que o derrame cresce. Dor torácica ou abdominal do lado acometido, com febre alta e calafrios; a criança pode deitar sobre o lado afetado.",
                                "Toxemia, respiração superficial, dificuldade respiratória grave, hipotensão e choque séptico. Escoliose para o lado afetado.",
                                "Ausculta: murmúrio francamente diminuído no lado acometido; estertores; atrito pleural se derrame pequeno. Macicez à percussão.",
                                "Mortalidade baixa, exceto em < 2 anos."
                            ]
                        },
                        {
                            nome: "Pneumonia necrosante",
                            itens: [
                                "Até <strong>7%</strong> das PAC pediátricas. Consolidação com necrose → cavitação (pneumatocele), em geral periférica e em um lobo. Pode formar fístula broncopleural e pneumotórax.",
                                "Agentes: pneumococo, S. aureus (MRSA, PVL) e S. pyogenes. Em geral < 5 anos e previamente hígidos.",
                                "Febre, tosse, dor torácica, taquipneia, macicez, murmúrio diminuído e/ou respiração brônquica. Criança <strong>desproporcionalmente doente</strong>, com febre persistente e pneumonia progressiva ou sem resposta.",
                                "<strong>Considerar na PAC grave sem melhora após ≥ 72 h de antibiótico.</strong> Procurar focos extrapulmonares (pele, partes moles, osteoarticular).",
                                "Empiema associado em 63–100%; fístula broncopleural em 17–67% (pneumotórax ou escape de ar > 24 h pelo dreno).",
                                "Pode deteriorar rápido: sepse grave, choque, falência de múltiplos órgãos.",
                                "<strong>SHU</strong> (rara): anemia hemolítica, plaquetopenia e insuficiência renal. Alerta: hemorragia pulmonar, hemoptise, exantema eritematoso, leucopenia."
                            ]
                        },
                        {
                            nome: "Abscesso pulmonar (AP)",
                            itens: [
                                "Evolução insidiosa (após aspiração, em 1–2 semanas). Sintomas inespecíficos como na PAC não complicada.",
                                "Sugerem AP: <strong>febre persistente, toxemia, hipoxemia persistente, sem resposta ao antibiótico</strong>. Tosse seca, que pode ficar maciçamente produtiva (vômica) se o abscesso romper no brônquio.",
                                "Diferencial: tuberculose, nocardiose, fungos, melioidose, paragonimíase, abscesso amebiano; tumores, sarcoidose, infarto pulmonar."
                            ]
                        },
                        {
                            nome: "Pneumonia aspirativa",
                            itens: [
                                "Material da boca, esôfago ou estômago para a via aérea. Causas: distúrbios da deglutição, malformações congênitas, refluxo gastroesofágico.",
                                "Gram-positivos, Gram-negativos e anaeróbios: tratar com <strong>antibiótico de amplo espectro</strong>.",
                                "Pneumonia lipoide: aspiração de <strong>óleo mineral</strong>. O uso de óleo mineral para constipação é iatrogênico e deve ser abolido."
                            ]
                        }
                    ]
                },
                {
                    titulo: "PAC complicada: líquido pleural e culturas",
                    icone: "🧪",
                    resumo: "Hemocultura, toracocentese e critérios de empiema.",
                    itens: [
                        "<strong>Provas de fase aguda</strong> (leucócitos, neutrófilos, PCR, VHS, procalcitonina): pouco eficientes para distinguir viral de bacteriana; úteis em <strong>medidas seriadas</strong> para monitorar a resposta.",
                        "<strong>Hemocultura em todas as crianças</strong> (positiva em < 10%).",
                        "<strong>Líquido pleural em quantidade significativa</strong> (clínica ou imagem): aspirar para citologia (contagem e diferencial), bioquímica e microbiologia (Gram, cultura com antibiograma e PCR para patógenos comuns). PCR no líquido pleural é mais sensível e específica que no sangue e mais sensível que a cultura após início do antibiótico.",
                        "Antígeno pneumocócico no líquido pleural: alto valor preditivo positivo para empiema pneumocócico. Antígeno urinário: sensível, mas não distingue colonização de doença.",
                        "Escarro induzido e amostras de naso/orofaringe: não distinguem colonização. Técnicas invasivas (aspirado, biópsia, LBA) só na deterioração progressiva, sobretudo em imunocomprometidos."
                    ],
                    tabela: {
                        titulo: "Líquido pleural sugestivo de empiema",
                        colunas: ["Parâmetro", "Valor"],
                        linhas: [
                            ["Aspecto", "Pus franco ou organismos visíveis no Gram"],
                            ["Leucócitos", "≥ 15.000/mm³ (15,0 × 10⁶/L), predomínio de neutrófilos"],
                            ["pH", "< 7,20 (pH < 7,0: alto risco de septações)"],
                            ["Proteína", "> 30 g/L"],
                            ["Glicose", "< 2,2 mmol/L (< 40 mg/dL)"],
                            ["DHL", "frequentemente ≥ 1.000 U/L"]
                        ],
                        nota: "pH e glicose baixos e DHL elevado indicam DP complicado (atividade metabólica de células inflamatórias e bactérias) e são preditivos de PAC grave."
                    }
                },
                {
                    titulo: "PAC complicada: exames de imagem",
                    icone: "🩻",
                    resumo: "Radiografia, ultrassonografia e tomografia.",
                    itens: [
                        "<strong>Radiografia de tórax</strong> (incluir decúbito lateral, incidência de Hjelm-Laurell): diferencia derrame livre de loculado, consolidação e espessamento pleural, mas <strong>não diferencia DPP de empiema</strong>. Pneumonia necrosante é vista em < 40%; pneumatoceles em média 4–8 dias após a internação. Desvio do mediastino só com derrame > 1.000 mL.",
                        "<strong>Ultrassonografia de tórax:</strong> o método <strong>mais sensível para o espaço pleural</strong> e o recomendado para estimar o volume do derrame (decisivo para a conduta). Superior à TC para ver loculações e fibrina. Sem radiação, portátil e sem sedação. Com Doppler, áreas hipoecoicas ou hipoperfundidas predizem necrose e diferenciam abscesso de empiema (operador-dependente).",
                        "<strong>TC de tórax com contraste:</strong> padrão para diagnosticar <strong>pneumonia necrosante</strong> (consolidação com baixa atenuação e sem realce; múltiplas cavidades de paredes finas sem borda de realce). <strong>Abscesso:</strong> cavidade com parede de realce bem definida. Útil para indicar intervenção. Fístula broncopleural só é definida se a comunicação for vista."
                    ]
                },
                {
                    titulo: "Gravidade e critérios de internação",
                    icone: "🏥",
                    aberta: true,
                    resumo: "Marque o que o paciente apresenta: qualquer \"Sim\" indica internação.",
                    escore: {
                        id: "internacao_pac",
                        unidade: "critérios",
                        instrucao: "Toque Sim ou Não em cada critério.",
                        itens: [
                            { nome: "Hipoxemia: SatO₂ < 92% em ar ambiente?", opcoes: [[0, "Não"], [1, "Sim"]] },
                            { nome: "Desidratação ou incapaz de manter hidratação/alimentação VO?", opcoes: [[0, "Não"], [1, "Sim"]] },
                            { nome: "Desconforto moderado a grave: FR > 70 (< 12 meses) ou > 50 (maiores)?", opcoes: [[0, "Não"], [1, "Sim"]] },
                            { nome: "Dificuldade respiratória: gemência, batimento de asas nasais, retrações (tiragem subcostal) ou apneia?", opcoes: [[0, "Não"], [1, "Sim"]] },
                            { nome: "< 2 meses com FR ≥ 60 (pneumonia grave pela OMS)?", opcoes: [[0, "Não"], [1, "Sim"]] },
                            { nome: "Aparência tóxica, sonolência, rebaixamento da consciência ou recusa alimentar?", opcoes: [[0, "Não"], [1, "Sim"]] },
                            { nome: "Doença de base (cardiopulmonar, síndrome genética, neurológica) ou desnutrição grave?", opcoes: [[0, "Não"], [1, "Sim"]] },
                            { nome: "Complicação: derrame/empiema, pneumonia necrosante, abscesso (ou murmúrio abolido)?", opcoes: [[0, "Não"], [1, "Sim"]] }
                        ],
                        faixas: [
                            { min: 0, max: 0, rotulo: "Sem critério de internação", cor: "#16a34a", texto: "Tratamento ambulatorial, se boas condições clínicas e família capaz de reavaliar em 48–72 h." },
                            { min: 1, max: 8, rotulo: "Internação indicada", cor: "#dc2626", texto: "Ver o bloco Condução hospitalar." }
                        ],
                        nota: "A decisão de internar é individualizada (idade, doença de base e fatores de gravidade). Fatores de risco para evolução desfavorável: desnutrição, comorbidades, baixa idade, condições socioeconômicas e sanitárias precárias, baixa cobertura vacinal, desmame precoce e poluentes intradomiciliares."
                    }
                }
            ]
        },
        {
            titulo: "Condução hospitalar",
            icone: "🚨",
            cor: "#dc2626",
            secoes: [
                {
                    titulo: "Antibiótico na internação (PAC não complicada)",
                    icone: "💊",
                    aberta: true,
                    resumo: "Amoxicilina VO se aceitar; EV: ampicilina ou penicilina cristalina.",
                    itens: [
                        "<strong>Antibiótico oral é seguro e eficaz mesmo na PAC grave:</strong> amoxicilina 50 mg/kg/dia de 8/8 h ou 12/12 h, por 7 dias.",
                        "<strong>EV</strong> se não aceitar líquidos ou antibiótico VO, sinais de septicemia ou pneumonia complicada.",
                        "<strong>1ª opção EV</strong> (resistência mínima à penicilina no nosso meio): <strong>ampicilina 50 mg/kg/dose de 6/6 h</strong> ou <strong>penicilina cristalina 150.000 UI/kg/dia de 6/6 h</strong>.",
                        "<strong>2ª opção</strong> (VO ou EV, doses habituais): amoxicilina-clavulanato ou sulbactam, ou cefuroxima.",
                        "<strong>Ceftriaxona ou cefotaxima:</strong> crianças gravemente doentes, não totalmente imunizadas contra o pneumococo ou com HIV.",
                        "<strong>< 2 meses:</strong> <strong>gentamicina 7,5 mg/kg/dia de 12/12 h</strong> + penicilina cristalina ou ampicilina. Cefalosporina pode substituir a gentamicina: preferir <strong>cefotaxima</strong> (ceftriaxona desloca a bilirrubina da albumina, com risco de kernicterus).",
                        "<strong>Suspeita de atípica:</strong> azitromicina 10 mg/kg/dia, dose única diária, por 5 dias, ou claritromicina 7,5 mg/kg/dose de 12/12 h por 10 dias. < 2 meses com conjuntivite (C. trachomatis): <strong>eritromicina</strong>.",
                        "<strong>O₂</strong> se SatO₂ < 92% em ar ambiente: cânula nasal, alto fluxo ou máscara facial."
                    ],
                    remedios: ["amox", "amox400", "ampicilina", "pen_cristalina_pac", "clav", "cef_resp_ev", "genta", "azi_oral", "azi_ev"]
                },
                {
                    titulo: "Antibiótico na PAC complicada",
                    icone: "💊",
                    resumo: "Esquema por gravidade; parenteral por pelo menos 2–3 semanas.",
                    itens: [
                        "Escolha conforme <strong>gravidade clínica</strong>, resistência local e comorbidades. Tratamento parenteral prolongado: <strong>pelo menos 2–3 semanas</strong>.",
                        "Antibiótico isolado costuma bastar em <strong>derrames pequenos, sem desvio do mediastino e sem insuficiência respiratória</strong>, e também na necrosante e no abscesso, mesmo com cavidades grandes."
                    ],
                    grupos: [
                        {
                            nome: "🟢 PACC com derrame e boas condições clínicas",
                            itens: [
                                "<strong>Penicilina cristalina ou ampicilina</strong>, além da abordagem cirúrgica adequada.",
                                "Suspeita ou confirmação de <strong>M. pneumoniae ou C. pneumoniae</strong>: associar <strong>macrolídeo</strong>. Levofloxacino é opção, inclusive na alergia grave a betalactâmicos."
                            ],
                            remedios: ["pen_cristalina_pac", "ampicilina", "azi_ev"]
                        },
                        {
                            nome: "🟠 PACC grave",
                            itens: [
                                "<strong>Ceftriaxona ou cefotaxima</strong> (cobrem pneumococo e S. aureus sensível).",
                                "Em áreas com <strong>alta prevalência de MRSA</strong> na comunidade: associar <strong>vancomicina</strong> até o resultado das culturas.",
                                "Alternativas à vancomicina para MRSA: linezolida ou clindamicina. Ceftarolina em monoterapia é opção possível."
                            ],
                            remedios: ["cef_resp_ev", "vancomicina", "clindamicina"]
                        },
                        {
                            nome: "🔴 PACC muito grave (choque, ventilação, UTI)",
                            itens: [
                                "<strong>Vancomicina + ceftriaxona (ou cefotaxima) + azitromicina.</strong>",
                                "Na sazonalidade do influenza: considerar <strong>oseltamivir</strong>."
                            ],
                            remedios: ["vancomicina", "cef_resp_ev", "azi_ev"]
                        },
                        {
                            nome: "Pneumonia necrosante",
                            itens: [
                                "Antibiótico EV de amplo espectro por <strong>3–4 semanas</strong>: <strong>vancomicina + cefotaxima, ceftriaxona ou cefepima</strong>.",
                                "Se clinicamente estável: amoxicilina-clavulanato/sulbactam ou ampicilina-sulbactam EV, a critério médico, se ainda não usados neste episódio.",
                                "Abordagem cirúrgica conforme o fluxograma (abaixo)."
                            ],
                            remedios: ["vancomicina", "cef_resp_ev", "cefepime"]
                        },
                        {
                            nome: "Abscesso pulmonar",
                            itens: [
                                "Curso prolongado, em geral iniciado EV, total de <strong>3–4 semanas</strong> conforme a resposta.",
                                "Tratamento em geral <strong>conservador</strong>. VTCA ou toracotomia raramente (abscessos grandes que exigem exérese, ou muito periféricos com risco de fístula)."
                            ]
                        }
                    ]
                },
                {
                    titulo: "Doses EV sugeridas pela SBP (PAC complicada)",
                    icone: "📋",
                    resumo: "Tabela de referência do documento (antibióticos EV).",
                    tabela: {
                        colunas: ["Antimicrobiano", "Esquema sugerido", "Máximo / comentário"],
                        linhas: [
                            ["Ampicilina", "150–200 mg/kg/dia de 6/6 h", "12 g/dia"],
                            ["Ampicilina-sulbactam", "150–200 mg/kg/dia de ampicilina", ""],
                            ["Penicilina cristalina", "200.000–250.000 U/kg/dia de 6/6 h ou 4/4 h", "24 milhões U/dia"],
                            ["Oxacilina", "200 mg/kg/dia de 6/6 h", "12 g/dia"],
                            ["Ceftriaxona", "50–100 mg/kg/dia de 12/12 h", "4 g/dia"],
                            ["Cefotaxima", "150 mg/kg/dia de 8/8 h ou 6/6 h", "8 g/dia"],
                            ["Amicacina", "15 mg/kg/dia de 12/12 h", ""],
                            ["Amoxicilina-clavulanato", "75 mg/kg/dia de amoxicilina de 8/8 h", "1 g/dose"],
                            ["Vancomicina", "40–60 mg/kg/dia de 6/6 h ou 8/8 h", "4 g/dia"],
                            ["Ceftarolina*", "≥ 2 meses e < 2 anos: 8 mg/kg (dia, conforme o texto) · ≥ 2 e < 18 anos: até 33 kg, 12 mg de 8/8 h; > 33 kg, 400 mg de 8/8 h ou 600 mg de 12/12 h", "6/6 h ou 8/8 h"],
                            ["Linezolida", "< 12 anos: 30 mg/kg/dia de 8/8 h · ≥ 12 anos: 600 mg de 8/8 h", "600 mg/dose"],
                            ["Levofloxacino", "≥ 6 meses e < 5 anos: 20 mg/kg/dia de 12/12 h · ≥ 5 e < 16 anos: 10 mg/kg 1×/dia", "750 mg/dia"],
                            ["Azitromicina", "10 mg/kg/dia nos dias 1 e 2; 5 mg/kg/dia nos dias seguintes", "500 mg/dia"],
                            ["Metronidazol", "30 mg/kg/dia de 6/6 h", "4 g/dia"]
                        ],
                        nota: "Para prescrever, usar os cards do app (os cards podem ter esquemas próprios do serviço). *Ceftarolina: transcrito como está no documento, provável erro de digitação nas unidades (\"8 mg/kg/dia\" e \"12 mg de 8/8 h\"); conferir na bula antes de usar."
                    }
                },
                {
                    titulo: "Abordagem cirúrgica",
                    icone: "🔪",
                    resumo: "Indicações de drenagem, fibrinolíticos, VTCA e toracotomia.",
                    itens: [
                        "Adjuvante ao antibiótico. Objetivos: limpar a cavidade pleural, reduzir febre e carga bacteriana, facilitar a ação do antibiótico e permitir a reexpansão pulmonar.",
                        "<strong>Falha do tratamento da PAC:</strong> insuficiência respiratória, febre persistente, piora do estado geral após 72 h e elevação de marcadores inflamatórios.",
                        "Escolha da técnica: quadro clínico, fase da doença e experiência da equipe cirúrgica."
                    ],
                    grupos: [
                        {
                            nome: "Indicações de drenagem pleural simples",
                            itens: [
                                "Pus no espaço pleural.",
                                "Gram-positivos na coloração.",
                                "Glicose < 50 mg/dL.",
                                "DHL > 1.000 UI.",
                                "Comprometimento da função pulmonar por derrame extenso.",
                                "Septações e/ou loculações."
                            ]
                        },
                        {
                            nome: "Toracocentese e drenagem",
                            itens: [
                                "<strong>Toracocentese:</strong> diagnóstico (culturas, tipo de líquido) e esvaziamento; retirar o máximo possível. Toracocenteses seriadas são pouco usadas em crianças (mais traumáticas).",
                                "<strong>Drenagem simples:</strong> pode ser guiada por US (lojas). Selo d'água com pressão de 15–20 cmH₂O facilita a reexpansão.",
                                "Avaliar o débito a cada 24 h. <strong>Retirar o dreno</strong> com débito mínimo: <strong>40–60 mL/24 h</strong> ou < 1–1,5 mL/kg/dia."
                            ],
                            tabela: {
                                titulo: "Calibre do dreno torácico (Fr)",
                                colunas: ["Peso", "Derrame loculado", "Derrame não loculado"],
                                linhas: [
                                    ["< 3 kg", "8–10", "10–12"],
                                    ["3–8 kg", "10–12", "12–16"],
                                    ["9–15 kg", "12–16", "16–20"],
                                    ["16–40 kg", "16–20", "24–28"],
                                    ["> 40 kg", "24–28", "28–36"]
                                ],
                                nota: "Fonte: Martín et al., reproduzido no documento da SBP."
                            }
                        },
                        {
                            nome: "Fibrinolíticos pelo dreno",
                            itens: [
                                "Rompem septações. Alguns autores indicam como 1ª opção não operatória no DP complicado e no empiema.",
                                "Opções: estreptoquinase, uroquinase (mais descrita, menos alergênica e pirogênica) e alteplase.",
                                "<strong>Uroquinase:</strong> <strong>10.000 UI em 10 mL de SF 0,9%</strong> se < 1 ano; <strong>40.000 UI em 40 mL de SF 0,9%</strong> se > 1 ano.",
                                "Instilar pelo dreno e mantê-lo <strong>pinçado por 4 h</strong>, com mudanças de decúbito. Uroquinase e estreptoquinase 2×/dia; alteplase 1×/dia, por 3 dias (o ciclo pode ser repetido por mais 3 dias)."
                            ]
                        },
                        {
                            nome: "Falha da drenagem torácica",
                            itens: [
                                "Febre persistente ou em aumento após 72 h da drenagem.",
                                "Débito escasso com imagem persistente na radiografia.",
                                "Septações ou loculações persistentes na US.",
                                "Piora do quadro respiratório."
                            ]
                        },
                        {
                            nome: "Videotoracoscopia (VTCA) e toracotomia",
                            itens: [
                                "<strong>VTCA:</strong> limpeza do espaço pleural e das loculações, posicionamento do dreno, menos dor e melhor resultado estético (sucesso 83–97%). Indicada se não houver resposta à drenagem com fibrinolítico e houver febre persistente, sepse, insuficiência respiratória ou pus em fase organizada.",
                                "VTCA também (sociedades espanholas): derrame maciço com comprometimento respiratório após falha de drenagem e fibrinolítico; fístula broncopleural sem resolução com drenagem; necrose extensa.",
                                "<strong>Decorticação por toracotomia:</strong> fases mais crônicas, com material fibrótico, ou onde não há VTCA ou fibrinolítico. Cirurgia de grande porte."
                            ]
                        }
                    ]
                },
                {
                    titulo: "Pneumonia necrosante: fluxograma cirúrgico",
                    icone: "🧭",
                    resumo: "Conduta conforme empiema e extensão da necrose.",
                    itens: [
                        "O tratamento inicial deve ser <strong>clínico</strong>; cirurgia para quem piora, conforme empiema e extensão da necrose."
                    ],
                    tabela: {
                        colunas: ["Situação", "Conduta", "Se piora"],
                        linhas: [
                            ["Sem empiema e necrose pouco extensa", "Tratamento clínico; manter se melhora", "Reavaliar: surgimento de derrame + aumento das áreas de necrose"],
                            ["Associada a empiema", "Drenagem de tórax simples; manter se melhora", "Reavaliar drenagem + áreas de necrose: possível VTCA ou toracoscopia"],
                            ["Área extensa de necrose", "VTCA ou toracoscopia (conforme experiência do serviço)", "Segmentectomia, lobectomia ou pneumectomia"]
                        ],
                        nota: "Fonte: Figura 2 do documento da SBP."
                    }
                }
            ]
        },
        {
            titulo: "Ambulatório: casa e seguimento",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "📝",
                    aberta: true,
                    resumo: "Amoxicilina 50 mg/kg/dia por 7 dias; alternativas na alergia e na atípica.",
                    itens: [
                        "Criança <strong>sem sinais de gravidade e em boas condições</strong>: tratar em casa. Iniciar o antibiótico imediatamente.",
                        "<strong>1ª opção: amoxicilina VO 50 mg/kg/dia</strong>, de 8/8 h ou 12/12 h (eficácia equivalente), máx. 4 g/dia, por <strong>7 dias</strong> (diretriz nacional). Em crianças sem gravidade, 5 dias mostrou a mesma eficácia que 10 dias.",
                        "<strong>Alergia à penicilina não mediada por IgE:</strong> cefuroxima ou ceftriaxona. <strong>Mediada por IgE (tipo 1):</strong> clindamicina ou macrolídeo.",
                        "<strong>Macrolídeo</strong> só na suspeita clínica de <strong>pneumonia atípica</strong> (em > 5 anos não é mais eficaz que a amoxicilina): eritromicina 40 mg/kg/dia de 6/6 h (máx. 2 g/dia) por 7–10 dias; claritromicina 15 mg/kg/dia de 12/12 h (máx. 1 g/dia) por 7–10 dias; ou azitromicina 10 mg/kg/dia, dose única diária, por 5 dias."
                    ],
                    remedios: ["amox", "amox400", "azi_oral", "clav"]
                },
                {
                    titulo: "Orientações e reavaliação",
                    icone: "🏠",
                    resumo: "Febre, hidratação, sinais de piora e retorno em 48–72 h.",
                    itens: [
                        "Orientar o manejo da <strong>febre e da dor</strong>, manter <strong>hidratação e alimentação</strong> adequadas e reconhecer <strong>sinais de piora</strong>.",
                        "<strong>Reavaliação obrigatória em 48–72 h</strong> do início do tratamento, ou a qualquer momento se piorar.",
                        "<strong>Prevenção:</strong> aleitamento materno exclusivo nos primeiros meses, eliminar o tabagismo passivo, higiene (lavagem das mãos) e vacinação (pneumococo e influenza)."
                    ]
                },
                {
                    titulo: "Falha terapêutica (48–72 h sem melhora)",
                    icone: "⚠️",
                    resumo: "Causas, troca de antibiótico e quando internar.",
                    itens: [
                        "<strong>Falha:</strong> sem melhora após 48–72 h de amoxicilina na PAC não complicada. Rever condições associadas, aprofundar a investigação e trocar o tratamento.",
                        "<strong>Causas frequentes:</strong> (1) derrame/empiema, pneumonia necrosante ou abscesso; (2) agentes não esperados: vírus, atípicos, 1ª manifestação de <strong>tuberculose</strong>; (3) não cumprimento do tratamento (dose, intervalo, tempo); (4) doença de base: imunossupressão, fibrose cística, asma, desnutrição, bronquiectasias; (5) diferenciais: corpo estranho, malformação pulmonar (sequestro), hérnia diafragmática.",
                        "<strong>Suspeita de M. pneumoniae ou C. pneumoniae:</strong> acrescentar macrolídeo à amoxicilina ou substituí-la.",
                        "<strong>Possível pneumococo ou S. aureus resistente</strong> (MSSA ou MRSA): substituir por <strong>clindamicina ou linezolida</strong>.",
                        "Se melhorar com a troca: manter até completar 7 dias. <strong>Se piorar ou não mudar: avaliar internação.</strong>"
                    ],
                    remedios: ["azi_oral", "clindamicina"]
                },
                {
                    titulo: "Vacinas pneumocócicas",
                    icone: "💉",
                    resumo: "VPC10 no PNI; VPC13 nos CRIE; VPC15 e VPC20.",
                    itens: [
                        "<strong>VPC10</strong> (1, 4, 5, 6B, 7F, 9V, 14, 18C, 19F, 23F): rotina do PNI desde 2010. Reduziu a mortalidade, mas houve substituição por sorotipos não vacinais (19A, 3, 6C).",
                        "<strong>VPC13</strong> (+ 3, 6A, 19A) nos CRIE a partir de 2 meses para: HIV/aids, câncer em atividade ou até a alta, transplantados de órgão sólido e de células-tronco, asplenia anatômica ou funcional, erros inatos da imunidade, fibrose cística, fístula liquórica e DVP.",
                        "<strong>VPC15</strong> (+ 22F, 33F): rede privada desde 2023. <strong>VPC20</strong> (+ 8, 10A, 11A, 12F, 15B): aprovada a partir de 6 semanas de vida.",
                        "Os sorotipos 3 e 19A estão nas vacinas 13, 15 e 20-valente; o 6C pode ter proteção cruzada pelo 6A."
                    ]
                }
            ]
        }
    ],

    fontes: [
        "Sociedade Brasileira de Pediatria. Departamento Científico de Pneumologia. Documento Científico nº 8: Abordagem Diagnóstica e Terapêutica das Pneumonias Adquiridas na Comunidade Não Complicadas (atualização). 23/02/2022.",
        "Sociedade Brasileira de Pediatria. Departamentos Científicos de Pneumologia e Infectologia. Documento Científico nº 151: Pneumonias Adquiridas na Comunidade Complicadas: Atualização 2024. 29/04/2024."
    ],
    revisao: "10/2026"
});
