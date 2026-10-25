// =====================================================
// CONDUTA: DOENÇA MENINGOCÓCICA (MENINGOCOCCEMIA ± MENINGITE)
// Base: Ministério da Saúde — Guia de Vigilância em Saúde (6ª ed., 2023): definição de caso,
// tratamento, isolamento, notificação e quimioprofilaxia; Surviving Sepsis Campaign
// pediátrica 2020 (Weiss) — reconhecimento e ressuscitação do choque séptico;
// IDSA 2004 (Tunkel) — punção lombar e dexametasona na meningite bacteriana.
// Fotos reais: FOTOS_EXANTEMA (condutas/exantematicas.js, carregado antes).
// =====================================================
function ferramentaMeningoFotos() {
    if (typeof htmlFotoExantema !== 'function') return '';
    return `<div class="exg ex-galeria">${["petequias", "meningococcemia"].map(k => htmlFotoExantema(k)).join('')}</div>
        <div class="ex-card-desc"><strong>Teste do copo / vitropressão:</strong> pressionar a lesão com um vidro transparente; a petéquia e a púrpura <strong>não somem</strong>. Toque na foto para ampliar.</div>`;
}

registrarConduta({
    id: "meningococcemia",
    nome: "Doença meningocócica (meningococcemia)",
    categoria: "Doenças exantemáticas",
    cor: "#7e1f5a",
    kw: "meningococcemia doenca meningococica meningococo neisseria meningitidis petequias purpura fulminante febre toxemia choque septico meningite rigidez de nuca rifampicina quimioprofilaxia contatos notificacao",
    resumo: "Febre + petéquias: critérios de internação/UTI, antibiótico na 1ª hora, choque séptico, punção lombar, isolamento, notificação e quimioprofilaxia dos contatos.",
    legenda: "Conduta conforme o <strong>Guia de Vigilância em Saúde do Ministério da Saúde (2023)</strong> e a <strong>Surviving Sepsis Campaign pediátrica (2020)</strong>. Fotos reais da Wikimedia Commons, com crédito.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",
                    icone: "🔎",
                    resumo: "Febre + petéquias/púrpura que não somem à vitropressão, com toxemia: tratar antes de confirmar.",
                    itens: [
                        "<strong>Caso suspeito</strong> (MS): febre com <strong>exantema petequial ou purpúrico</strong>, com ou sem sinais de meningite (cefaleia, vômitos, rigidez de nuca, abaulamento de fontanela, alteração de consciência).",
                        "<strong>Formas:</strong> <strong>meningococcemia</strong> (sepse, a mais grave), <strong>meningite</strong> e a forma <strong>mista</strong> (a mais comum).",
                        "<strong>Início:</strong> febre alta, mal-estar, <strong>dor nas pernas</strong>, <strong>extremidades frias</strong> e palidez podem vir <strong>antes</strong> das petéquias. O exantema pode começar maculopapular e virar petequial em horas.",
                        "<strong>Evolução rápida:</strong> petéquias que aumentam em minutos a horas, viram <strong>púrpura</strong> e <strong>necrose</strong> (púrpura fulminante, CIVD).",
                        "<strong>Diagnóstico:</strong> clínico para começar o tratamento. Confirmar com <strong>hemocultura</strong>, cultura e PCR do <strong>líquor</strong>, e PCR/raspado de lesão quando disponível (MS).",
                        "<strong>Notificação compulsória imediata</strong> (até 24 h) do caso suspeito (MS)."
                    ],
                    ferramenta: "ferramentaMeningoFotos"
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Petéquias por esforço, plaquetopenia, dengue, vasculite por IgA, outras sepses.",
                    itens: [
                        "<strong>Petéquias por esforço</strong> (tosse, vômitos): só acima da linha dos mamilos, criança bem, sem febre alta.",
                        "<strong>Plaquetopenia</strong> (PTI, leucemia), <strong>dengue</strong>, <strong>vasculite por IgA</strong> (púrpura palpável em nádegas e pernas, criança bem).",
                        "<strong>Outras sepses</strong> (pneumococo, Hib, estafilococo, estreptococo), febre maculosa (exposição a carrapato), enteroviroses.",
                        "<strong>Na dúvida com febre + petéquias: tratar como doença meningocócica.</strong>"
                    ]
                },
                {
                    titulo: "Sinais de choque e de gravidade",
                    icone: "⚠️",
                    resumo: "Taquicardia, enchimento capilar lento, extremidades frias, oligúria e alteração de consciência. Hipotensão é tardia.",
                    itens: [
                        "<strong>Choque:</strong> taquicardia, <strong>enchimento capilar > 2 s</strong>, extremidades frias, pulsos finos, oligúria, lactato elevado, <strong>alteração de consciência</strong>. A <strong>hipotensão é sinal tardio</strong> na criança.",
                        "<strong>Púrpura que se espalha</strong>, sangramentos, plaquetopenia e coagulopatia (CIVD).",
                        "<strong>Meningite:</strong> rebaixamento, convulsão, sinais de hipertensão intracraniana (bradicardia com hipertensão, pupilas alteradas).",
                        "<strong>Risco maior:</strong> lactentes e adolescentes, asplenia, deficiência de complemento, uso de eculizumabe, aglomeração."
                    ]
                }
            ]
        },
        {
            titulo: "Condução na emergência: passo a passo",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Tempo é tudo: antibiótico na 1ª hora.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "UTI? → ABC e acesso → hemocultura e ceftriaxona na 1ª hora → tratar o choque → punção só estável → isolar, notificar, quimioprofilaxia.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar / UTI?</strong> Todo caso suspeito interna; choque e púrpura fulminante = UTI",
                        "<span class=\"cond-passo\">2</span> <strong>ABC:</strong> O₂, monitor, 2 acessos (ou intraósseo), glicemia",
                        "<span class=\"cond-passo\">3</span> <strong>Hemocultura e ceftriaxona</strong> na 1ª hora, sem esperar exames nem punção",
                        "<span class=\"cond-passo\">4</span> <strong>Choque:</strong> cristaloide em bolus com reavaliação, adrenalina ou noradrenalina, corrigir glicose e cálcio",
                        "<span class=\"cond-passo\">5</span> <strong>Punção lombar</strong> só com o paciente estável e sem contraindicação",
                        "<span class=\"cond-passo\">6</span> <strong>Isolar</strong> (gotículas 24 h), <strong>notificar</strong> já e <strong>quimioprofilaxia</strong> dos contatos",
                        "<span class=\"cond-passo\">7</span> <strong>Completar 7 dias</strong> e vigiar complicações (necrose, surdez)"
                    ]
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    resumo: "Todo caso suspeito interna. Decida se é UTI. Não atrasa o antibiótico (passo 3).",
                    alerta: true,
                    itens: [
                        "<strong>Todo caso suspeito de doença meningocócica é internado</strong>, com antibiótico EV e isolamento (MS). A decisão aqui é <strong>UTI ou enfermaria</strong>."
                    ],
                    escore: {
                        id: "internacao_meningo",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave.",
                        itens: [
                            { nome: "🔴 UTI", opcoes: [[3, "Choque: enchimento capilar lento, extremidades frias, oligúria, hipotensão ou lactato alto", "🔴"]] },
                            { nome: "", opcoes: [[3, "Púrpura que se espalha ou púrpura fulminante, sangramento, coagulopatia", "🔴"]] },
                            { nome: "", opcoes: [[3, "Rebaixamento da consciência, convulsão ou sinais de hipertensão intracraniana", "🔴"]] },
                            { nome: "", opcoes: [[3, "Insuficiência respiratória ou necessidade de via aérea", "🔴"]] },
                            { nome: "", opcoes: [[3, "Precisou de mais de 40 mL/kg de volume ou de droga vasoativa", "🔴"]] },
                            { nome: "🟠 Internar (enfermaria com vigilância)", opcoes: [[2, "Febre + petéquias, estável (caso suspeito)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Meningite sem sinais de choque nem de gravidade neurológica", "🟠"]] },
                            { nome: "🟢 Rever o diagnóstico", opcoes: [[0, "Petéquias só acima dos mamilos após tosse/vômitos, sem febre alta e criança bem", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI pediátrica", cor: "#dc2626", texto: "Ressuscitação do choque (passo 4), ceftriaxona na 1ª hora, sem punção lombar até estabilizar. Acionar a UTI e transferir estabilizado." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Ceftriaxona EV na 1ª hora, sinais vitais e perfusão de 1/1 h nas primeiras horas (a piora pode ser rápida), isolamento por gotículas." };
                            return { num: "?", rotulo: "Provável outra causa", cor: "#16a34a", texto: "Petéquias por esforço em criança bem podem ser observadas com hemograma e reavaliação. Qualquer febre alta, toxemia ou petéquia abaixo dos mamilos: tratar como doença meningocócica." };
                        },
                        nota: "Internação de todo caso suspeito: MS. Critérios de UTI reunidos dos sinais de choque e de disfunção orgânica da Surviving Sepsis Campaign pediátrica 2020."
                    }
                },
                {
                    passo: 2,
                    titulo: "ABC, monitorização e acesso",
                    resumo: "O₂, monitor, 2 acessos ou intraósseo em até 5 min, glicemia.",
                    itens: [
                        "<strong>O₂</strong> se SpO₂ baixa ou choque; monitor cardíaco, oximetria e PA.",
                        "<strong>Dois acessos venosos</strong>; se não conseguir em poucos minutos, <strong>intraósseo</strong>.",
                        "<strong>Glicemia capilar</strong>; corrigir hipoglicemia. Dosar cálcio iônico e corrigir hipocalcemia (SSC 2020).",
                        "Exames: hemograma, plaquetas, coagulograma, gasometria, lactato, eletrólitos, função renal, PCR."
                    ]
                },
                {
                    passo: 3,
                    titulo: "Hemocultura e ceftriaxona na 1ª hora",
                    resumo: "Ceftriaxona 100 mg/kg/dia de 12/12h. Não esperar exames nem punção lombar.",
                    alerta: true,
                    itens: [
                        "<strong>Antibiótico o mais rápido possível</strong>, idealmente na <strong>1ª hora</strong> no choque séptico (SSC 2020). Colher <strong>hemocultura antes</strong>, mas <strong>sem atrasar</strong> o antibiótico.",
                        "<strong>Ceftriaxona EV</strong> de 12/12h por <strong>7 dias</strong> (MS).",
                        "<strong>Sem acesso venoso</strong> (UBS, acesso difícil): a ceftriaxona pode ser feita <strong>IM</strong> (frasco com lidocaína) para não atrasar a 1ª dose; depois transferir.",
                        "<strong>Dexametasona:</strong> na meningite bacteriana suspeita, antes ou junto com a 1ª dose do antibiótico, reduz sequelas na meningite por Hib e pneumococo (IDSA 2004). Na <strong>meningococcemia sem meningite</strong> não está indicada."
                    ],
                    remedios: ["cef_meningo"]
                },
                {
                    passo: 4,
                    titulo: "Choque séptico: volume e vasoativo",
                    resumo: "Bolus de 10 a 20 mL/kg com reavaliação; adrenalina ou noradrenalina; hidrocortisona se refratário.",
                    itens: [
                        "<strong>Volume:</strong> <strong>cristaloide (preferir balanceado) 10 a 20 mL/kg em bolus</strong>, reavaliando após cada bolus (perfusão, FC, PA, fígado, crepitações), até <strong>40 a 60 mL/kg na 1ª hora</strong> onde há UTI. Parar se surgir sobrecarga (SSC 2020).",
                        "<strong>Sem UTI disponível e sem hipotensão:</strong> não fazer bolus; manter hidratação de manutenção e transferir (SSC 2020).",
                        "<strong>Vasoativo:</strong> choque que persiste após 40 a 60 mL/kg (ou antes, se sobrecarga): <strong>adrenalina ou noradrenalina</strong>; pode começar em <strong>acesso periférico</strong> (SSC 2020). <strong>Não usar dopamina</strong> como 1ª escolha.",
                        "<strong>Choque refratário</strong> a volume e vasoativos: considerar <strong>hidrocortisona</strong> (SSC 2020).",
                        "<strong>Plaquetas e plasma</strong> se sangramento ou procedimento com coagulopatia."
                    ]
                },
                {
                    passo: 5,
                    titulo: "Punção lombar: só com o paciente estável",
                    resumo: "Não puncionar no choque, coagulopatia, hipertensão intracraniana ou insuficiência respiratória.",
                    itens: [
                        "<strong>A punção lombar não pode atrasar o antibiótico.</strong>",
                        "<strong>Adiar</strong> se: <strong>choque ou instabilidade</strong>, <strong>coagulopatia ou plaquetopenia</strong>, <strong>sinais de hipertensão intracraniana</strong> (rebaixamento importante, déficit focal, papiledema), insuficiência respiratória, convulsão recente prolongada, infecção no local (IDSA 2004).",
                        "<strong>Tomografia antes</strong> só se déficit focal, convulsão nova, imunodepressão grave ou rebaixamento importante; nesses casos, antibiótico primeiro (IDSA 2004).",
                        "Líquor: citologia, bioquímica, Gram, cultura, látex e <strong>PCR</strong>; ainda útil após o antibiótico (PCR)."
                    ]
                },
                {
                    passo: 6,
                    titulo: "Isolar, notificar e quimioprofilaxia",
                    resumo: "Gotículas por 24 h de ceftriaxona. Notificar já. Rifampicina para os contatos próximos em até 48 h.",
                    itens: [
                        "<strong>Isolamento por gotículas</strong> (máscara cirúrgica a menos de 1 m) até <strong>24 h de antibiótico</strong> eficaz (MS).",
                        "<strong>Notificar imediatamente</strong> à vigilância epidemiológica: ela define e localiza os contatos (MS).",
                        "<strong>Quimioprofilaxia</strong> dos <strong>contatos próximos</strong> (mesmo domicílio, mesmo dormitório, creche/escola conforme a vigilância, quem teve contato com secreções), <strong>de preferência em até 48 h</strong>. <strong>Rifampicina</strong> é a 1ª escolha; <strong>ceftriaxona IM</strong> dose única nas gestantes e quando não pode usar rifampicina (MS).",
                        "<strong>O próprio paciente</strong> recebe quimioprofilaxia na alta, <strong>exceto se tratou com ceftriaxona</strong> (MS).",
                        "<strong>Profissional de saúde:</strong> só se fez manobras sem máscara (intubação, aspiração, ressuscitação boca a boca)."
                    ],
                    remedios: ["rifampicina_profilaxia", "cef_profilaxia_meningo"]
                },
                {
                    passo: 7,
                    titulo: "Completar o tratamento e vigiar complicações",
                    resumo: "7 dias de ceftriaxona. Necrose de pele e membros, surdez, artrite.",
                    itens: [
                        "<strong>Ceftriaxona por 7 dias</strong> (MS).",
                        "<strong>Complicações:</strong> necrose de pele e de extremidades (cirurgia plástica/vascular; amputação nos casos graves), insuficiência adrenal (Waterhouse-Friderichsen), artrite, pericardite, <strong>surdez</strong> (meningite), sequelas neurológicas.",
                        "<strong>Audiometria</strong> antes da alta ou logo depois em todo caso com meningite."
                    ]
                }
            ]
        },
        {
            titulo: "Ambulatório: seguimento e prevenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Seguimento após a alta",
                    icone: "📋",
                    resumo: "Audiometria, desenvolvimento, cicatrizes e investigar imunidade em casos atípicos.",
                    itens: [
                        "<strong>Audiometria</strong> e avaliação do desenvolvimento; reabilitação se sequela.",
                        "<strong>Investigar deficiência de complemento</strong> se doença meningocócica <strong>recorrente</strong>, em família ou por sorogrupo incomum; asplenia.",
                        "Acompanhamento das lesões de pele e membros com a cirurgia."
                    ]
                },
                {
                    titulo: "Vacinas",
                    icone: "💉",
                    resumo: "Meningocócica C no calendário, ACWY no adolescente; B na rede privada e nos grupos de risco.",
                    itens: [
                        "<strong>Meningocócica C conjugada</strong> no calendário do lactente (MS), com reforço; <strong>ACWY</strong> no adolescente (calendário do MS).",
                        "<strong>Meningocócica B</strong>: rede privada e CRIE em grupos de risco.",
                        "Asplenia, deficiência de complemento e uso de eculizumabe: esquema especial no <strong>CRIE</strong>.",
                        "<strong>Vacinação de bloqueio</strong> em surtos: decisão da vigilância (MS)."
                    ]
                }
            ]
        }
    ],

    citacoes: { "MS": 0, "Ministério da Saúde": 0, "SSC 2020": 1, "Surviving Sepsis Campaign": 1, "IDSA 2004": 2 },
    fontes: [
        "Brasil. Ministério da Saúde. Guia de Vigilância em Saúde. 6ª ed. Brasília: MS, 2023. Capítulo: Doença meningocócica (tratamento, isolamento, notificação e quimioprofilaxia).",
        "Weiss SL, Peters MJ, Alhazzani W, et al. Surviving Sepsis Campaign International Guidelines for the Management of Septic Shock and Sepsis-Associated Organ Dysfunction in Children. Pediatr Crit Care Med 2020;21(2):e52-e106. doi:10.1097/PCC.0000000000002198",
        "Tunkel AR, Hartman BJ, Kaplan SL, et al. Practice guidelines for the management of bacterial meningitis (IDSA). Clin Infect Dis 2004;39(9):1267-84. doi:10.1086/425368"
    ],
    revisao: "10/2026"
});
