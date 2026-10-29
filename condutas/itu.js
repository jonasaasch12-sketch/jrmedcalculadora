// =====================================================
// CONDUTA: INFECÇÃO DO TRATO URINÁRIO (ITU) NA CRIANÇA
// Base: SBP — Departamento de Nefrologia: Documento Científico nº 101 (2023) "Infecção
// urinária: diagnóstico, investigação e prevenção" e Atualização 2021 "Existe consenso
// entre os consensos?"; AAP 2011 (reafirmada em 2016) — ITU febril de 2 a 24 meses.
// As doses ficam nos cards.
// =====================================================

registrarConduta({
    id: "itu",
    nome: "Infecção do trato urinário (ITU)",
    categoria: "Nefrologia",
    cor: "#a16207",
    kw: "itu infeccao do trato urinario infeccao urinaria pielonefrite cistite urocultura sondagem puncao suprapubica saco coletor febre sem foco refluxo vesicoureteral ultrassom uretrocistografia profilaxia",
    resumo: "Lactente com febre sem foco: pensar em ITU. Coleta invasiva para cultura, antibiótico de menor espectro (oral se > 3 meses e bem), 10 dias na ITU febril, ultrassom após a 1ª pielonefrite em < 2 anos.",
    legenda: "Conduta conforme a SBP – Departamento de Nefrologia (2023 e 2021) e o Whitebook; a diretriz da AAP (2011), depois aposentada, entra só como apoio.",
    padraoTexto: true, // padrão de escrita (rótulo azul, subitens ›, caixa de atenção)

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",
                    icone: "🔎",
                    resumo: "Suspeitar em todo lactente com febre sem foco há > 24 h. Confirmar com urina tipo 1 + urocultura de coleta adequada.",
                    itens: [
                        "Suspeitar em todo lactente com febre sem foco aparente há mais de 24 horas (SBP 2023). A calculadora de risco UTICalc (uticalc.pitt.edu) pode ajudar na emergência (SBP 2023).",
                        "<strong>Recém-nascido e lactente:</strong> febre sem foco, vômitos, diarreia, icterícia persistente, recusa alimentar, irritabilidade, pouco ganho de peso ou quadro de sepse (SBP 2023).",
                        "<strong>Pré-escolar:</strong> urina fétida, dor abdominal, disúria, polaciúria, incontinência, urgência, febre. Escolar: também enurese secundária e dor lombar (SBP 2023).",
                        "<strong>Pielonefrite (ITU alta):</strong> febre ≥ 38,5 °C, comprometimento do estado geral, dor lombar, PCR alta. Cistite (ITU baixa): sintomas urinários sem febre.",
                        "<strong>Urina tipo 1 sugestiva:</strong> piúria (&gt; 5 a 10 leucócitos por campo), nitrito positivo, esterase leucocitária positiva ou bactérias (SBP 2023).",
                        "Urocultura é o padrão-ouro (resultado em 24 a 48 h). Valores que confirmam: punção suprapúbica: qualquer contagem; cateterismo vesical: &gt; 50.000 UFC/mL; jato médio: &gt; 100.000 UFC/mL (SBP 2023)."
                    ]
                },
                {
                    titulo: "Como colher a urina",
                    icone: "🧪",
                    resumo: "Sem controle esfincteriano: cateterismo ou punção suprapúbica. Saco coletor só serve para descartar (se negativo).",
                    itens: [
                        "<strong>Sem controle esfincteriano:</strong> cateterismo vesical ou punção suprapúbica (SBP 2023).",
                        "<strong>\"Clean catch\"</strong> (lactente): 25 min após oferecer líquido (25 mL/kg), segurar pelas axilas e estimular as regiões sacral e suprapúbica para colher o jato médio (SBP 2023).",
                        "<strong>Saco coletor:</strong> só serve para descartar (se negativo), pela alta taxa de falso-positivo. Pode ser triagem em quadro leve; se positivo, repetir por método invasivo antes de tratar (SBP 2023).",
                        "<strong>Com controle esfincteriano:</strong> jato médio, após higiene (SBP 2023).",
                        "Fita reagente (esterase e nitrito) serve como triagem; se sugestiva ou se a suspeita é alta, colher sedimento, Gram e urocultura (SBP 2023)."
                    ]
                },
                {
                    titulo: "Febre sem foco de 1 mês a 2 anos: quem colher e como",
                    icone: "🧭",
                    resumo: "< 3 meses: cultura por coleta invasiva. ≥ 3 meses com mau estado ou suspeita de pielonefrite: coleta invasiva. Estado bom: fita (pode ser saco).",
                    itens: [
                        "<strong>1 mês a 2 anos com febre ≥ 38,5 °C sem foco</strong> (SBP 2023, adaptado de Geurts 2014):",
                        "↳ Menor de 3 meses: urocultura por coleta invasiva.",
                        "↳ 3 meses ou mais com comprometimento do estado geral ou suspeita de pielonefrite: coleta invasiva.",
                        "↳ 3 meses ou mais em bom estado: fita reagente (pode ser em saco coletor). Negativa: sem ITU. Leucocitúria e/ou nitrito: colher por método invasivo.",
                        "Menor de 1 mês com febre: avaliação completa de sepse (veja a conduta de febre sem sinais localizatórios)."
                    ]
                },
                {
                    titulo: "Fatores de risco",
                    icone: "⚠️",
                    resumo: "Refluxo e malformações, disfunção vesical e intestinal, constipação, sonda, imunossupressão, neonato, menino não circuncidado.",
                    itens: [
                        "<strong>Anomalias estruturais:</strong> refluxo vesicoureteral, válvula de uretra posterior, estenose de junção, megaureter, rins policísticos (SBP 2023).",
                        "<strong>Alterações funcionais:</strong> disfunção vesical e intestinal (30 a 50% no 1º episódio), bexiga neurogênica, constipação (SBP 2023).",
                        "<strong>Outros:</strong> sonda vesical, imunossupressão, neonato, menino não circuncidado (SBP 2023). Perguntar sobre ultrassom pré-natal alterado.",
                        "<strong>Resistência:</strong> maior se antibiótico nos últimos 90 dias (principalmente &lt; 30 dias), malformação, internação prévia ou disfunção vesical (SBP 2023)."
                    ]
                }
            ]
        },
        {
            titulo: "Condução na emergência / hospitalar",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Antibiótico de menor espectro, revisto com a cultura em 48–72 h.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "Internar? → colher urina certa (antes do antibiótico) → antibiótico oral ou EV → reavaliar em 48–72 h com a cultura → 10 dias na ITU febril → ultrassom e profilaxia quando indicados.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar?</strong> Menor de 2 meses, toxemia, não aceita via oral, risco de não adesão",
                        "<span class=\"cond-passo\">2</span> <strong>Colher:</strong> a urina certa antes do antibiótico; creatinina se for internar",
                        "<span class=\"cond-passo\">3</span> <strong>Antibiótico empírico:</strong> oral se &gt; 3 meses e bem; EV se internado",
                        "<span class=\"cond-passo\">4</span> <strong>Reavaliar:</strong> em 48–72 h com a urocultura; sem melhora, investigar",
                        "<span class=\"cond-passo\">5</span> <strong>Duração:</strong> 10 dias na ITU febril; cistite mais curta",
                        "<span class=\"cond-passo\">6</span> <strong>Imagem e profilaxia:</strong> quando indicadas"
                    ]
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    resumo: "Menor de 2 meses, criança muito doente ou com risco de não aderir ao tratamento (SBP). Marque o que o paciente tem.",
                    alerta: true,
                    escore: {
                        id: "internacao_itu",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave.",
                        itens: [
                            { nome: "🔴 UTI", opcoes: [[3, "Sepse ou choque (veja a conduta de sepse)", "🔴"]] },
                            { nome: "", opcoes: [[3, "Rebaixamento da consciência, insuficiência renal aguda grave ou distúrbio hidroeletrolítico grave", "🔴"]] },
                            { nome: "🟠 Internar", opcoes: [[2, "Menor de 2 meses", "🟠"]] },
                            { nome: "", opcoes: [[2, "Criança criticamente doente / toxemiada", "🟠"]] },
                            { nome: "", opcoes: [[2, "Risco de não adesão ao tratamento", "🟠"]] },
                            { nome: "", opcoes: [[2, "Vômitos ou recusa que impedem o antibiótico oral, desidratação", "🟠"]] },
                            { nome: "", opcoes: [[2, "Sem melhora após 48 a 72 h de antibiótico oral adequado", "🟠"]] },
                            { nome: "", opcoes: [[2, "Imunocomprometimento", "🟠"]] },
                            { nome: "", opcoes: [[1, "Malformação urinária conhecida ou rim único", "🟡"]] },
                            { nome: "🟢 Tratar em casa", opcoes: [[0, "Maior de 3 meses, bom estado, aceita via oral, família confiável", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI pediátrica", cor: "#dc2626", texto: "Ressuscitação (conduta de sepse), hemocultura e urocultura, antibiótico EV na 1ª hora." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Antibiótico EV, creatinina antes de iniciar (principalmente se aminoglicosídeo), passar para via oral quando melhorar." };
                            if (g === 1) return { num: "?", rotulo: "Considerar internar", cor: "#ca8a04", texto: "Avaliar caso a caso; se tratar em casa, reavaliar em 24 a 48 h." };
                            return { num: "🏠", rotulo: "Tratamento oral em casa", cor: "#16a34a", texto: "Antibiótico oral, retorno em 48 a 72 h com a urocultura (ou antes se piorar)." };
                        },
                        nota: "Indicações de internação do Whitebook: menor de 2 meses, febre com toxemia, desidratação, vômitos persistentes, intolerância à medicação oral, imunocomprometimento, falha no tratamento ambulatorial ou impossibilidade de garantir o tratamento. A SBP (2021 e 2023) traz: menor de 2 meses, criticamente doente ou risco de não adesão."
                    }
                },
                {
                    passo: 2,
                    titulo: "Colher a urina certa antes do antibiótico",
                    resumo: "Urina tipo 1 + Gram + urocultura por método adequado. Creatinina se internar. Hemocultura se toxemia ou < 3 meses.",
                    itens: [
                        "<strong>Antes do antibiótico:</strong> urina tipo 1, Gram (se disponível) e urocultura por cateterismo ou punção suprapúbica em quem não tem controle esfincteriano (SBP 2023).",
                        "Creatinina sérica antes do tratamento no internado, principalmente se usar aminoglicosídeo (SBP 2023).",
                        "Hemograma, PCR e hemocultura se toxemia, menor de 3 meses ou suspeita de sepse.",
                        "<strong>Criança grave:</strong> não atrasar o antibiótico por dificuldade de coleta."
                    ]
                },
                {
                    passo: 3,
                    titulo: "Antibiótico empírico",
                    resumo: "Menor espectro possível, cobrindo E. coli. Oral se > 3 meses e bem. EV: ceftriaxona ou gentamicina. Cistite: cefalexina.",
                    alerta: true,
                    itens: [
                        "Escolher o de menor espectro possível, pelo Gram se houver; senão, cobrir <em>E. coli</em> conforme a sensibilidade local (resistência &lt; 20%) (SBP 2023).",
                        "<strong>Maiores de 3 meses:</strong> via oral preferencial (SBP 2023).",
                        { alerta: "na ITU febril / pielonefrite, o antibiótico precisa atingir o parênquima renal: não usar nitrofurantoína nem ácido nalidíxico (SBP 2023)." },
                        "<strong>Menor de 2 meses (internado):</strong> ampicilina + gentamicina, com dose pela idade gestacional e dias de vida (Whitebook). Suspeita de Candida (mais comum no RN): anfotericina B ou fluconazol (Whitebook).",
                        "<strong>Maior de 2 meses internado:</strong> cefuroxima EV, gentamicina ou amicacina 1x ao dia, cefotaxima ou piperacilina-tazobactam, por 7 a 14 dias; trocar para via oral quando melhorar (Whitebook; SBP 2023).",
                        "<strong>ITU febril em casa:</strong> cefuroxima ou cefaclor (Whitebook; SBP 2023); ciprofloxacina é opção da SBP; amoxicilina-clavulanato só como última opção, por alterar mais a flora intestinal (SBP 2023).",
                        "<strong>ITU afebril (cistite):</strong> cefalexina, nitrofurantoína ou sulfametoxazol-trimetoprima por 7 dias; fosfomicina (Monuril) dose única só a partir de 12 anos (Whitebook; SBP 2023)."
                    ],
                    remedios: ["urina_cefa", "nitrofurantoina_itu", "smx_tmp", "monuril", "cefuroxima_vo_itu", "cefaclor_itu", "urina_clav", "amp_itu", "genta_itu_neo", "cefuroxima_ev_itu", "genta", "amicacina", "urina_ceft"]
                },
                {
                    passo: 4,
                    titulo: "Reavaliar em 48–72 h com a cultura",
                    resumo: "Descalonar pelo antibiograma. Sem melhora em 48 h: ultrassom para malformação ou abscesso e ampliar o antibiótico.",
                    itens: [
                        "Rever o tratamento em 48 a 72 h com o antibiograma e descalonar quando possível (SBP 2023).",
                        "<strong>Sem melhora clínica em 48 h:</strong> afastar anormalidade do trato urinário (ultrassom: obstrução, abscesso) e ampliar a cobertura (SBP 2023).",
                        "Com resposta e sensibilidade confirmada, não precisa de urocultura de controle (SBP 2023).",
                        "Internado que melhorou: passar para via oral conforme o antibiograma."
                    ]
                },
                {
                    passo: 5,
                    titulo: "Duração",
                    resumo: "ITU febril: 10 dias (7 a 14 conforme AAP). Cistite: mais curta.",
                    itens: [
                        "<strong>ITU febril:</strong> 10 dias (diretrizes inglesa, italiana e australiana); a canadense e a AAP sugerem 7 a 14 dias (SBP 2023).",
                        "<strong>Cistite:</strong> tratamento mais curto, conforme o card (em geral 3 a 7 dias)."
                    ]
                },
                {
                    passo: 6,
                    titulo: "Imagem e profilaxia",
                    resumo: "Ultrassom após a 1ª pielonefrite em < 2 anos. Uretrocistografia se ultrassom alterado ou ITU recorrente. Profilaxia em casos selecionados.",
                    itens: [
                        "<strong>Ultrassom de rins e vias urinárias:</strong> avaliação inicial de todo menor de 2 anos com pielonefrite (SBP 2023; AAP 2011).",
                        "<strong>Uretrocistografia miccional:</strong> se o ultrassom mostrar acometimento do parênquima ou se houver ITU recorrente (SBP 2023); não fazer de rotina após a 1ª ITU febril (AAP 2011).",
                        "Profilaxia até o fim da investigação se: ultrassom alterado (pré-natal ou atual), ITU febril com PCR positiva, refluxo grau 4 ou 5, uropatia obstrutiva, ITU recorrente (2 ou mais pielonefrites; 1 cistite + 1 pielonefrite; 3 ou mais cistites). Não em reinfecção (novo episódio em menos de 2 semanas) (SBP 2023).",
                        "<strong>Drogas de profilaxia</strong> (1/3 a 1/2 da dose de tratamento, 1x ao dia, de preferência à noite): nitrofurantoína, sulfametoxazol-trimetoprima (maiores de 6 semanas) e cefalexina (menores de 6 semanas) (SBP 2023).",
                        "Cranberry e probióticos: evidência insuficiente (SBP 2023).",
                        "Doses de profilaxia do Whitebook no card abaixo (1x ao dia, antes de dormir). O Whitebook sugere evitar o sulfametoxazol-trimetoprima pelo risco de resistência."
                    ],
                    remedios: ["profilaxia_itu"]
                }
            ]
        },
        {
            titulo: "Ambulatório: casa e manutenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Orientações para prevenir nova ITU",
                    icone: "🚽",
                    resumo: "Urinar de 3/3 h, postura correta no vaso, não segurar a urina, água, fibras e tratar a constipação.",
                    itens: [
                        "Ir ao banheiro a cada 3 horas, mesmo sem vontade; não segurar a urina (SBP 2023).",
                        "Sentar bem no vaso, com redutor de assento e pés apoiados (banquinho), pernas afastadas, sem pressa (SBP 2023).",
                        "Água a cada 3 horas (pelo menos 1 litro por dia); frutas e legumes todos os dias (SBP 2023).",
                        "Horário para evacuar (10 minutos após uma refeição); tratar a constipação; urinar antes de dormir; evitar líquidos nas 2 horas antes de dormir (SBP 2023).",
                        "Investigar disfunção vesical e intestinal na criança com controle esfincteriano: incontinência, urgência, manobras de contenção, enurese, constipação (escala de Bristol, Roma IV) (SBP 2023)."
                    ]
                },
                {
                    titulo: "Voltar antes se",
                    icone: "🚩",
                    resumo: "Febre após 48–72 h de antibiótico, vômitos, prostração, dor lombar forte, pouca urina.",
                    itens: [
                        "Febre que continua após 48 a 72 h de antibiótico.",
                        "Vômitos que impedem o remédio, prostração, sonolência, pouca urina.",
                        "Nova febre sem foco depois do tratamento: colher urina (risco de recorrência no 1º ano)."
                    ]
                },
                {
                    titulo: "Seguimento",
                    icone: "📋",
                    resumo: "Nefropediatria se malformação, refluxo de alto grau, cicatriz ou ITU recorrente: PA, função renal e albuminúria.",
                    itens: [
                        "Encaminhar à nefrologia pediátrica: refluxo de alto grau, cicatriz renal, malformação, ITU recorrente, alteração da função renal.",
                        "Nesses pacientes: pressão arterial, função renal e albuminúria no seguimento (SBP 2023).",
                        "O prognóstico é bom com diagnóstico e tratamento precoces (SBP 2023)."
                    ]
                }
            ]
        }
    ],

    citacoes: { "Whitebook": 3, "SBP 2023": 0, "SBP": [0, 1], "AAP 2011": 2, "AAP": 2 },
    fontes: [
        "Sociedade Brasileira de Pediatria. Departamento Científico de Nefrologia. Infecção urinária: diagnóstico, investigação e prevenção. Documento Científico nº 101, 13 de setembro de 2023.",
        "Sociedade Brasileira de Pediatria. Departamento Científico de Nefrologia. Infecção do Trato Urinário em Pediatria – Existe consenso entre os consensos? Atualização 2021.",
        "Subcommittee on Urinary Tract Infection, American Academy of Pediatrics. Urinary tract infection: clinical practice guideline for the diagnosis and management of the initial UTI in febrile infants and children 2 to 24 months. Pediatrics 2011;128(3):595-610. doi:10.1542/peds.2011-1330 (reafirmada em 2016: doi:10.1542/peds.2016-3026; depois aposentada pela AAP por usar raça no algoritmo de coleta — ver Wright JL, Kowalsky RH. Pediatrics 2026, doi:10.1542/peds.2026-078945)",
        "Whitebook (Afya). Guia de Prescrição / Pediatria: Infecção do Trato Urinário (Profilaxia, ITU afebril, ITU febril ambulatorial e hospitalar < 2 meses e > 2 meses)."
    ],
    revisao: "10/2026"
});
