// =====================================================
// CONDUTA: SEPSE E CHOQUE SÉPTICO (PEDIATRIA)
// Base: Critérios de Phoenix (SCCM, JAMA 2024: Schlapbach; Sanchez-Pinto) — definição e escore;
// Surviving Sepsis Campaign pediátrica 2020 (Weiss) — reconhecimento e tratamento;
// FEAST 2011 (Maitland) — bolus de volume sem UTI. As doses ficam nos cards.
// =====================================================

registrarConduta({
    id: "sepse",
    nome: "Sepse e choque séptico",
    categoria: "Infectologia",
    cor: "#b91c1c",
    kw: "sepse choque septico phoenix surviving sepsis infeccao grave disfuncao organica hipotensao lactato vasoativo adrenalina noradrenalina antibiotico primeira hora expansao volume cristaloide",
    resumo: "Infecção + disfunção orgânica (Phoenix ≥ 2). Antibiótico na 1ª hora no choque, volume em bolus com reavaliação, adrenalina ou noradrenalina, controle do foco.",
    legenda: "Conduta conforme o <strong>Whitebook (Sepse em Pediatria, 2026)</strong>, os <strong>critérios de Phoenix (SCCM, 2024)</strong> e a <strong>Surviving Sepsis Campaign pediátrica (2020)</strong>.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",
                    icone: "🔎",
                    resumo: "Sepse = infecção suspeita + Phoenix ≥ 2. Choque séptico = sepse + ≥ 1 ponto cardiovascular.",
                    itens: [
                        "<strong>Sepse</strong> (Phoenix 2024): criança (< 18 anos) com <strong>infecção suspeita</strong> e <strong>escore de Phoenix ≥ 2</strong>, isto é, disfunção <strong>respiratória, cardiovascular, da coagulação e/ou neurológica</strong> com risco de morte.",
                        "<strong>Choque séptico</strong>: sepse com <strong>≥ 1 ponto cardiovascular</strong> (hipotensão grave para a idade, <strong>lactato > 5 mmol/L</strong> ou necessidade de <strong>droga vasoativa</strong>) (Phoenix 2024).",
                        "Os termos <strong>SIRS</strong> e <strong>\"sepse grave\"</strong> deixaram de ser usados (Phoenix 2024). Recém-nascido prematuro e período neonatal imediato não entram nesses critérios.",
                        "<strong>Reconhecer cedo, antes do escore:</strong> febre ou hipotermia com <strong>taquicardia</strong>, taquipneia, <strong>alteração do estado mental</strong> (irritabilidade, sonolência, choro fraco), <strong>enchimento capilar > 2 s</strong> ou \"flash\", <strong>extremidades frias</strong>, pulsos finos, pele moteada, oligúria, petéquias. A <strong>hipotensão é sinal tardio</strong> na criança.",
                        "Usar uma <strong>triagem sistemática</strong> para reconhecer a criança grave no pronto-socorro (SSC 2020)."
                    ]
                },
                {
                    titulo: "Escore de Phoenix",
                    icone: "🧮",
                    resumo: "4 sistemas: respiratório (0–3), cardiovascular (0–6), coagulação (0–2), neurológico (0–2). ≥ 2 = sepse.",
                    itens: [
                        "Usar os piores valores das <strong>primeiras 24 h</strong>. Item sem exame (ex.: lactato não colhido) conta <strong>0</strong> (Phoenix 2024).",
                        "<strong>Coagulação:</strong> 1 ponto para cada: plaquetas &lt; 100.000/mm³, INR &gt; 1,3, D-dímero &gt; 2 mg/L FEU, fibrinogênio &lt; 100 mg/dL (máximo 2)."
                    ],
                    tabela: {
                        titulo: "PAM (pressão arterial média) para a idade, em mmHg",
                        colunas: ["Idade", "1 pt", "2 pts"],
                        linhas: [
                            ["< 1 mês", "17 a 30", "< 17"],
                            ["1 a 11 meses", "25 a 38", "< 25"],
                            ["1 a < 2 anos", "31 a 43", "< 31"],
                            ["2 a < 5 anos", "32 a 44", "< 32"],
                            ["5 a < 12 anos", "36 a 48", "< 36"],
                            ["12 a 17 anos", "38 a 51", "< 38"]
                        ]
                    },
                    escore: {
                        id: "phoenix",
                        checklist: true,
                        instrucao: "Toque no que o paciente tem (piores valores em 24 h). O que não for marcado conta 0.",
                        itens: [
                            { nome: "🫁 Respiratório", opcoes: [
                                [1, "SpO₂/FiO₂ < 292 (ou PaO₂/FiO₂ < 400) com qualquer suporte respiratório"],
                                [2, "SpO₂/FiO₂ 148–220 (ou PaO₂/FiO₂ 100–200) em ventilação invasiva"],
                                [3, "SpO₂/FiO₂ < 148 (ou PaO₂/FiO₂ < 100) em ventilação invasiva"]] },
                            { nome: "❤️ Cardiovascular: droga vasoativa", opcoes: [[1, "1 droga vasoativa"], [2, "2 ou mais drogas vasoativas"]] },
                            { nome: "❤️ Cardiovascular: lactato", opcoes: [[1, "Lactato 5 a 10,9 mmol/L"], [2, "Lactato ≥ 11 mmol/L"]] },
                            { nome: "❤️ Cardiovascular: PAM para a idade (tabela acima)", opcoes: [[1, "PAM na faixa de 1 ponto"], [2, "PAM na faixa de 2 pontos"]] },
                            { nome: "🩸 Coagulação (plaquetas < 100 mil, INR > 1,3, D-dímero > 2, fibrinogênio < 100)", opcoes: [[1, "1 alteração"], [2, "2 ou mais alterações"]] },
                            { nome: "🧠 Neurológico", opcoes: [[1, "Glasgow ≤ 10"], [2, "Pupilas fixas bilateralmente"]] }
                        ],
                        classificar: (v, m) => {
                            let total = v.reduce((a, b) => a + b, 0);
                            let cv = (m[1] || 0) + (m[2] || 0) + (m[3] || 0);
                            if (total >= 2 && cv >= 1) return { num: total, rotulo: "Choque séptico", cor: "#7f1d1d", texto: "Sepse com disfunção cardiovascular: antibiótico na 1ª hora, volume com reavaliação, vasoativo, UTI." };
                            if (total >= 2) return { num: total, rotulo: "Sepse", cor: "#dc2626", texto: "Infecção com disfunção orgânica: antibiótico em até 3 h (na 1ª hora se piorar), monitorização e reavaliação frequente." };
                            return { num: total, rotulo: "Não preenche sepse (Phoenix < 2)", cor: "#d97706", texto: "Não exclui infecção grave: reavaliar com frequência, o escore muda com a evolução." };
                        },
                        nota: "Escore de Phoenix: Schlapbach LJ et al. e Sanchez-Pinto LN et al., JAMA 2024. Pontos cardiovasculares somam vasoativo + lactato + PAM (máximo 6)."
                    }
                },
                {
                    titulo: "Grupos de risco",
                    icone: "⚠️",
                    resumo: "Lactente pequeno, imunodeprimido, neutropenia, doença crônica complexa, cateter, asplenia/falciforme, vacina incompleta.",
                    itens: [
                        "<strong>Menores de 3 meses</strong> (sinais pouco específicos).",
                        "<strong>Imunodepressão</strong>: neutropenia febril, câncer, transplante, corticoide crônico, imunodeficiência.",
                        "<strong>Asplenia ou doença falciforme</strong>; <strong>cateter venoso central</strong> ou outros dispositivos.",
                        "<strong>Doença crônica complexa</strong> (neurológica, cardiopatia, prematuridade com sequelas).",
                        "<strong>Vacinação incompleta</strong> (pneumococo, Hib, meningococo)."
                    ]
                },
                {
                    titulo: "Foco infeccioso e diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Procurar o foco (pulmão, urina, SNC, abdome, pele, cateter). Pensar em choque hipovolêmico, cardiogênico, anafilaxia, SIM-P, dengue.",
                    itens: [
                        "<strong>Focos mais comuns:</strong> pneumonia, infecção urinária, meningite, abdome (apendicite, peritonite), pele e partes moles, osteoarticular, cateter.",
                        "<strong>Febre + petéquias:</strong> pensar em <strong>doença meningocócica</strong> (veja a conduta própria).",
                        "<strong>Diferencial do choque:</strong> hipovolêmico (diarreia, desidratação), cardiogênico (miocardite, cardiopatia, arritmia), <strong>anafilaxia</strong>, intoxicação, insuficiência adrenal, <strong>síndrome inflamatória multissistêmica (SIM-P)</strong>, síndrome do choque tóxico, <strong>dengue grave</strong>.",
                        "Hepatomegalia, estertores, sopro ou ritmo de galope sugerem causa cardíaca: <strong>cuidado com o volume</strong>."
                    ]
                }
            ]
        },
        {
            titulo: "Condução na emergência: passo a passo",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Tempo é tudo: no choque, antibiótico e volume na 1ª hora.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "UTI? → O₂, monitor, acesso em 5 min, exames → antibiótico (1ª hora no choque) → volume em bolus com reavaliação → vasoativo → refratário → foco e suporte.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar / UTI?</strong> Toda sepse interna; choque = UTI",
                        "<span class=\"cond-passo\">2</span> <strong>0 a 5 min:</strong> O₂, monitor, <strong>acesso EV ou IO</strong>, glicemia, hemocultura, lactato",
                        "<span class=\"cond-passo\">3</span> <strong>Antibiótico:</strong> choque <strong>na 1ª hora</strong>; sepse sem choque em até 3 h",
                        "<span class=\"cond-passo\">4</span> <strong>Volume:</strong> bolus de 10 a 20 mL/kg reavaliando após cada um (40 a 60 mL/kg na 1ª hora onde há UTI)",
                        "<span class=\"cond-passo\">5</span> <strong>Vasoativo:</strong> adrenalina ou noradrenalina se o choque persiste (pode ser periférico)",
                        "<span class=\"cond-passo\">6</span> <strong>Choque refratário:</strong> hidrocortisona, UTI, considerar ECMO",
                        "<span class=\"cond-passo\">7</span> <strong>Suporte:</strong> glicemia, cálcio, intubação sem etomidato, transfusão, nutrição",
                        "<span class=\"cond-passo\">8</span> <strong>Controle do foco</strong> e revisão do antibiótico em 48 a 72 h",
                        "<span class=\"cond-passo\">9</span> <strong>Prescrição de internação</strong>: dieta, soro, cuidados, sintomáticos"
                    ]
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    resumo: "Toda sepse interna. Marque o que o paciente tem para decidir UTI. Não atrasa o antibiótico nem o volume.",
                    alerta: true,
                    itens: [
                        "<strong>Sepse é internação</strong>; a decisão aqui é <strong>UTI ou enfermaria</strong>. Não atrasar o antibiótico (passo 3) nem o volume (passo 4)."
                    ],
                    escore: {
                        id: "internacao_sepse",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave.",
                        itens: [
                            { nome: "🔴 UTI", opcoes: [[3, "Choque séptico: hipotensão, lactato > 5, má perfusão que não melhora com volume ou necessidade de vasoativo", "🔴"]] },
                            { nome: "", opcoes: [[3, "Insuficiência respiratória, ventilação não invasiva ou intubação", "🔴"]] },
                            { nome: "", opcoes: [[3, "Rebaixamento da consciência (Glasgow ≤ 10), convulsão ou sinais de hipertensão intracraniana", "🔴"]] },
                            { nome: "", opcoes: [[3, "Precisou de 40 mL/kg ou mais de volume", "🔴"]] },
                            { nome: "", opcoes: [[3, "Coagulopatia, púrpura que se espalha, oligúria/anúria ou outra disfunção orgânica que piora", "🔴"]] },
                            { nome: "🟠 Internar (enfermaria com vigilância)", opcoes: [[2, "Sepse (Phoenix ≥ 2) sem choque e com boa resposta inicial", "🟠"]] },
                            { nome: "", opcoes: [[2, "Infecção grave em grupo de risco (menor de 3 meses, neutropenia, imunodepressão, asplenia, cateter)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Necessidade de antibiótico EV ou de O₂", "🟠"]] },
                            { nome: "🟢 Sem critério de sepse", opcoes: [[0, "Infecção sem disfunção orgânica (Phoenix < 2), perfusão normal, bom estado geral", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI pediátrica", cor: "#dc2626", texto: "Ressuscitação (passos 3 a 5) já no pronto-socorro, acionar a UTI e transferir estabilizado." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Antibiótico EV, sinais vitais e perfusão de 1/1 h nas primeiras horas, lactato de controle, reavaliar a necessidade de UTI." };
                            return { num: "🏠", rotulo: "Tratar a infecção", cor: "#16a34a", texto: "Tratar o foco conforme a conduta da doença, com orientação de sinais de alarme e reavaliação em 24 a 48 h." };
                        },
                        nota: "A SSC 2020 e os critérios de Phoenix não trazem lista formal de internação. Critérios reunidos das disfunções do escore de Phoenix 2024 e das recomendações de ressuscitação da SSC 2020."
                    }
                },
                {
                    passo: 2,
                    titulo: "0 a 5 min: O₂, monitor, acesso e exames",
                    resumo: "O₂, monitor, acesso EV ou intraósseo, glicemia, hemocultura e lactato, sem atrasar o antibiótico.",
                    itens: [
                        "<strong>O₂</strong> se hipoxemia ou choque; monitor, oximetria, PA, diurese.",
                        "<strong>Acesso venoso</strong>; se não conseguir em poucos minutos, <strong>intraósseo</strong>.",
                        "<strong>Glicemia capilar</strong>: tratar hipoglicemia (card abaixo).",
                        "<strong>Exames:</strong> <strong>hemocultura</strong> (antes do antibiótico, sem atrasá-lo), <strong>lactato</strong>, gasometria, hemograma, coagulograma (INR, fibrinogênio, D-dímero), eletrólitos e <strong>cálcio iônico</strong>, função renal e hepática, PCR/procalcitonina, culturas do foco (urina, líquor quando seguro) (SSC 2020).",
                        "<strong>Lactato:</strong> ajuda a avaliar a gravidade e a resposta, mas <strong>não deve ser usado sozinho</strong> para classificar o risco (SSC 2020)."
                    ],
                    remedios: ["glicose_pals"]
                },
                {
                    passo: 3,
                    titulo: "Antibiótico: na 1ª hora no choque",
                    resumo: "Choque: antibiótico em até 1 h. Sepse sem choque: em até 3 h. Amplo espectro conforme idade e foco.",
                    alerta: true,
                    itens: [
                        "<strong>Choque séptico: antibiótico o mais rápido possível, em até 1 hora</strong> do reconhecimento. <strong>Sepse sem choque: em até 3 horas</strong> (SSC 2020).",
                        "<strong>Esquema empírico</strong> conforme idade, foco, estado imunológico e perfil local (Whitebook):",
                        "↳ <strong>Recém-nascido sem alteração do SNC:</strong> ampicilina + gentamicina, ou ampicilina + gentamicina + cefotaxima.",
                        "↳ <strong>Recém-nascido com alteração do SNC, coma ou sinais de encefalite:</strong> ampicilina + gentamicina + cefotaxima + <strong>aciclovir</strong>.",
                        "↳ <strong>1 a 3 meses, foco respiratório ou indeterminado:</strong> oxacilina + ceftriaxona.",
                        "↳ <strong>1 a 3 meses, suspeita de pneumonia intersticial:</strong> oxacilina + ceftriaxona + claritromicina.",
                        "↳ <strong>1 a 3 meses, foco abdominal ou urinário:</strong> ceftriaxona + gentamicina.",
                        "↳ <strong>1 a 3 meses com alteração do SNC, coma ou encefalite:</strong> vancomicina + ceftriaxona + aciclovir.",
                        "↳ <strong>Maior de 3 meses sem suspeita de MRSA:</strong> oxacilina + ceftriaxona.",
                        "↳ <strong>Maior de 3 meses com suspeita ou confirmação de MRSA:</strong> vancomicina + ceftriaxona.",
                        "↳ <strong>Maior de 3 meses com alteração do SNC, coma ou encefalite:</strong> vancomicina + ceftriaxona + aciclovir.",
                        "<strong>Neutropenia, imunodepressão ou infecção hospitalar:</strong> ampliar (cefepime ou meropenem ± vancomicina) conforme a CCIH.",
                        "<strong>Duração:</strong> em geral 7 a 10 dias; com aciclovir, 21 dias (Whitebook).",
                        "<strong>Recém-nascido:</strong> usar os cards da <strong>sepse neonatal</strong> (ampicilina, gentamicina, cefotaxima e aciclovir), com dose pela idade gestacional e pelos dias de vida (Whitebook).",
                        "<strong>Sem acesso EV:</strong> ceftriaxona IM para não atrasar a 1ª dose.",
                        "<strong>Doença meningocócica</strong> suspeita (febre + petéquias): veja a conduta própria."
                    ],
                    remedios: ["cef_sepse", "oxacilina", "vancomicina", "amp_neo_sepse", "genta_neo_sepse", "cefotax_neo_sepse", "aciclovir_sepse", "cefepime", "meropenem"]
                },
                {
                    passo: 4,
                    titulo: "Volume: bolus com reavaliação",
                    resumo: "Com UTI: 10–20 mL/kg por bolus, até 40–60 mL/kg na 1ª hora. Sem UTI e sem hipotensão: não fazer bolus.",
                    alerta: true,
                    itens: [
                        "<strong>Com UTI disponível:</strong> <strong>Ringer lactato 10 a 20 mL/kg por bolus</strong>, até <strong>40 a 60 mL/kg na 1ª hora</strong>, guiado pela perfusão, <strong>parando se surgir sobrecarga</strong> (SSC 2020; Whitebook).",
                        "<strong>Sem UTI e sem hipotensão:</strong> <strong>não fazer bolus</strong>; manter hidratação de manutenção (SSC 2020; no FEAST, o bolus aumentou a mortalidade nesse cenário).",
                        "<strong>Sem UTI e com hipotensão:</strong> até 40 mL/kg na 1ª hora (SSC 2020; Whitebook).",
                        "<strong>Preferir cristaloide balanceado</strong> (Ringer lactato) ao SF 0,9%. <strong>Não usar</strong> albumina na ressuscitação inicial, amidos nem gelatinas (SSC 2020).",
                        "<strong>Reavaliar após cada bolus:</strong> FC, enchimento capilar, pulsos, PA, diurese, nível de consciência, <strong>fígado e crepitações</strong> (sobrecarga).",
                        "<strong>Meta de PAM:</strong> entre o percentil 5 e 50 para a idade, ou acima do 50 (SSC 2020)."
                    ],
                    remedios: ["sepse_expansao"]
                },
                {
                    passo: 5,
                    titulo: "Vasoativo: adrenalina ou noradrenalina",
                    resumo: "Choque que persiste após 40–60 mL/kg (ou antes, se sobrecarga): adrenalina ou noradrenalina, inclusive em veia periférica.",
                    alerta: true,
                    itens: [
                        "<strong>Indicação:</strong> choque que persiste após 40 a 60 mL/kg de volume, ou antes se houver sinais de sobrecarga (SSC 2020).",
                        "<strong>Adrenalina ou noradrenalina</strong> em vez de dopamina (SSC 2020), isoladas ou associadas conforme a necessidade (Whitebook). Não há preferência entre elas na diretriz: escolher pelo quadro (adrenalina se extremidades frias / baixo débito; noradrenalina se vasodilatado, \"choque quente\").",
                        "<strong>Pode começar em acesso periférico</strong> (ou intraósseo) enquanto não há acesso central (SSC 2020).",
                        "<strong>Dose alta de catecolamina:</strong> associar <strong>vasopressina</strong> ou subir a catecolamina (SSC 2020).",
                        "<strong>Disfunção cardíaca</strong> com perfusão ruim apesar de vasoativo: considerar inodilatador (milrinona) na UTI."
                    ],
                    remedios: ["adrenalina_sepse", "nora_sepse", "milrinone_pals"]
                },
                {
                    passo: 6,
                    titulo: "Choque refratário",
                    resumo: "Persiste apesar de volume e vasoativo: hidrocortisona, rever o foco e as causas, UTI, considerar ECMO.",
                    itens: [
                        "<strong>Hidrocortisona</strong> (dose do Whitebook no card): <strong>não</strong> usar se o choque respondeu a volume e vasoativo; no <strong>choque refratário</strong>, pode ser usada (SSC 2020). Indicada se uso crônico de corticoide, insuficiência adrenal ou púrpura fulminante.",
                        "<strong>Rever</strong> o foco não controlado, pneumotórax, tamponamento, sangramento, hipocalcemia, hipoglicemia, acidose grave.",
                        "<strong>ECMO venoarterial</strong> no choque refratário a todas as medidas, em centro com o recurso (SSC 2020)."
                    ],
                    remedios: ["hidrocortisona_sepse"]
                },
                {
                    passo: 7,
                    titulo: "Suporte: glicemia, cálcio, via aérea, sangue, nutrição",
                    resumo: "Glicemia < 180, cálcio normal se vasoativo, intubar sem etomidato, transfundir se Hb < 7 (estável), dieta enteral em 48 h.",
                    itens: [
                        "<strong>Glicemia:</strong> manter <strong>abaixo de 180 mg/dL</strong>; <strong>não</strong> usar insulina para meta ≤ 140 (SSC 2020). Tratar hipoglicemia.",
                        "<strong>Cálcio:</strong> manter cálcio iônico normal na criança em uso de vasoativo (SSC 2020).",
                        "<strong>Intubação:</strong> se insuficiência respiratória ou choque refratário. <strong>Não usar etomidato</strong> (SSC 2020); cetamina é opção. Volume e vasoativo prontos antes de intubar.",
                        "<strong>Transfusão:</strong> no paciente estabilizado, transfundir se <strong>Hb &lt; 7 g/dL</strong> (SSC 2020). Plaquetas e plasma se sangramento ou procedimento.",
                        "<strong>Nutrição:</strong> dieta enteral precoce, em até 48 h, se não houver contraindicação (SSC 2020).",
                        "<strong>Não usar</strong> de rotina: vitamina C, selênio, imunoglobulina (SSC 2020)."
                    ],
                    remedios: ["rsi_ceta"]
                },
                {
                    passo: 8,
                    titulo: "Controle do foco e revisão do antibiótico",
                    resumo: "Drenar abscesso, retirar cateter infectado, cirurgia se precisar. Rever o antibiótico com culturas em 48–72 h.",
                    itens: [
                        "<strong>Controle do foco o quanto antes</strong>: drenar abscesso ou empiema, cirurgia abdominal, desbridamento, <strong>retirar cateter</strong> infectado (SSC 2020).",
                        "<strong>Rever o antibiótico diariamente</strong>; com as culturas, <strong>descalonar</strong> para o espectro mais estreito eficaz (SSC 2020).",
                        "<strong>Duração</strong> conforme o foco e a evolução; não prolongar sem indicação.",
                        "Vigiar sobrecarga hídrica após a fase de ressuscitação (balanço, diurético ou terapia renal se necessário)."
                    ]
                },
                {
                    passo: 9,
                    titulo: "📝 Prescrição de internação",
                    resumo: "Dieta zero se instável (enteral se estável), soro de manutenção, cuidados (sinais vitais e balanço de 3/3 h, monitor, glicemia 6/6 h) e sintomáticos.",
                    itens: [
                        "<strong>Dieta:</strong> <strong>zero</strong> se hemodinamicamente instável, com aumento progressivo de aminas; <strong>enteral</strong> se reanimação adequada, sem aumento de aminas ou em desmame (Whitebook).",
                        "<strong>Hidratação venosa de manutenção</strong> (card abaixo), ajustada pelos eletrólitos e pelo balanço hídrico (Whitebook).",
                        "<strong>Cuidados</strong> (Whitebook): sinais vitais de 3/3 h; <strong>balanço hídrico de 3/3 h</strong>; monitorização eletrocardiográfica e oximetria; PA não invasiva; oxigenioterapia, VNI ou ventilação mecânica conforme a necessidade; cabeceira a 30°; <strong>glicemia capilar de 6/6 h</strong>.",
                        "<strong>Sintomáticos</strong> (Whitebook): analgésico/antitérmico se dor ou febre ≥ 37,8 °C (dipirona ou paracetamol); antiemético se náuseas ou vômitos (ondansetrona ou bromoprida)."
                    ],
                    remedios: ["tgi_manutencao", "dip_inj", "ondan_ev", "broma_ev"]
                }
            ]
        },
        {
            titulo: "Ambulatório: casa e manutenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Sinais de alarme para a família",
                    icone: "🚩",
                    resumo: "Febre com prostração, sonolência, mãos e pés frios, manchas que não somem, respiração rápida, urina pouca.",
                    itens: [
                        "<strong>Voltar imediatamente</strong> se: criança muito sonolenta ou irritada que não se consola, <strong>mãos e pés frios</strong>, pele moteada ou acinzentada, <strong>manchas roxas que não somem</strong> ao pressionar, respiração rápida ou gemente, <strong>pouca urina</strong> (fralda seca por 8 h ou mais), vômitos que não param.",
                        "Febre em <strong>menor de 3 meses</strong>: sempre avaliar no pronto-socorro."
                    ]
                },
                {
                    titulo: "Seguimento após a sepse",
                    icone: "📋",
                    resumo: "Sequelas físicas, neurológicas e emocionais; reabilitação; rever vacinas e imunidade.",
                    itens: [
                        "Após sepse grave, a criança pode ter <strong>sequelas físicas, cognitivas e emocionais</strong> (síndrome pós-cuidados intensivos): seguimento com o pediatra e reabilitação quando necessário (SSC 2020).",
                        "<strong>Investigar imunodeficiência</strong> se infecções graves de repetição, germe incomum ou doença meningocócica/pneumocócica invasiva recorrente.",
                        "<strong>Atualizar vacinas</strong> (pneumocócica, Hib, meningocócicas, influenza) e esquemas especiais do CRIE quando indicado (asplenia, falciforme, imunodepressão)."
                    ]
                }
            ]
        }
    ],

    citacoes: { "Whitebook": 4, "Phoenix 2024": [0, 1], "SSC 2020": 2, "Surviving Sepsis Campaign": 2, "FEAST": 3 },
    fontes: [
        "Schlapbach LJ, Watson RS, Sorce LR, et al. International Consensus Criteria for Pediatric Sepsis and Septic Shock. JAMA 2024;331(8):665-74. doi:10.1001/jama.2024.0179",
        "Sanchez-Pinto LN, Bennett TD, DeWitt PE, et al. Development and Validation of the Phoenix Criteria for Pediatric Sepsis and Septic Shock. JAMA 2024;331(8):675-86. doi:10.1001/jama.2024.0196",
        "Weiss SL, Peters MJ, Alhazzani W, et al. Surviving Sepsis Campaign International Guidelines for the Management of Septic Shock and Sepsis-Associated Organ Dysfunction in Children. Pediatr Crit Care Med 2020;21(2):e52-e106. doi:10.1097/PCC.0000000000002198",
        "Maitland K, Kiguli S, Opoka RO, et al. Mortality after fluid bolus in African children with severe infection (FEAST). N Engl J Med 2011;364(26):2483-95. doi:10.1056/NEJMoa1101549",
        "Whitebook (Afya). Guia de Prescrição / Pediatria: Sepse em Pediatria (Prescrição Hospitalar). Atualizado em 12/02/2026."
    ],
    revisao: "10/2026"
});
