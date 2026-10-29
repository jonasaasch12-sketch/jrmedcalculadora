// =====================================================
// CONDUTA: SARAMPO
// Base: Ministério da Saúde — Guia de Vigilância em Saúde (6ª ed. revisada): caso suspeito,
// notificação, isolamento, exames, bloqueio vacinal e imunoglobulina dos contatos;
// Nota Técnica Conjunta MS nº 02/2025 (vitamina A); revisão de sarampo na emergência
// (Pediatr Emerg Care 2026). Fotos reais: FOTOS_EXANTEMA (condutas/exantematicas.js).
// =====================================================
function ferramentaSarampoFotos() {
    if (typeof htmlFotoExantema !== 'function') return '';
    return `<div class="exg ex-galeria">${["sarampo", "sarampo_corpo", "sarampo_koplik"].map(k => htmlFotoExantema(k)).join('')}</div>
        <div class="ex-card-desc">Toque na foto para ampliar.</div>`;
}

registrarConduta({
    id: "sarampo",
    nome: "Sarampo",
    categoria: "Doenças exantemáticas",
    cor: "#be123c",
    kw: "sarampo measles exantema maculopapular febre tosse coriza conjuntivite koplik notificacao imediata isolamento aerossol vitamina a bloqueio vacinal triplice viral imunoglobulina",
    resumo: "Caso suspeito, notificação imediata, isolamento por aerossol, critérios de internação clicáveis, vitamina A, complicações e proteção dos contatos (vacina em 72 h, imunoglobulina em 6 dias).",
    legenda: "Conduta conforme o Guia de Vigilância em Saúde do Ministério da Saúde e a Nota Técnica Conjunta MS nº 02/2025 (vitamina A). Fotos reais da Wikimedia Commons, com crédito.",
    padraoTexto: true, // padrão de escrita (rótulo azul, subitens ›, caixa de atenção)

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Caso suspeito e quadro clínico",
                    icone: "🔎",
                    resumo: "Febre + exantema maculopapular + tosse, coriza ou conjuntivite, em qualquer idade e situação vacinal.",
                    itens: [
                        "<strong>Caso suspeito</strong> (MS): febre + exantema maculopapular + tosse e/ou coriza e/ou conjuntivite, independentemente da idade e da vacinação; ou qualquer pessoa com história de viagem ou contato com caso suspeito.",
                        "<strong>Pródromo de 3 a 5 dias:</strong> febre alta, tosse, coriza e conjuntivite (os \"3 C\"), fotofobia, mal-estar.",
                        "<strong>Manchas de Koplik:</strong> pontos branco-acinzentados na mucosa jugal, 1 a 2 dias antes do exantema (passageiras).",
                        "Exantema maculopapular vermelho que começa atrás das orelhas e na face e desce (craniocaudal), ficando confluente; dura 4 a 7 dias e sai com descamação fina.",
                        "Febre alta no início do exantema; febre que persiste mais de 3 dias após o exantema sugere complicação.",
                        "<strong>Transmissão:</strong> de 6 dias antes a 4 dias depois do início do exantema (MS). Uma das doenças mais contagiosas."
                    ],
                    ferramenta: "ferramentaSarampoFotos"
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Rubéola, dengue, exantema súbito, escarlatina, Kawasaki, reação a medicamento.",
                    itens: [
                        "<strong>Rubéola:</strong> febre baixa, exantema rosado não confluente, adenomegalia retroauricular e occipital.",
                        "Dengue, exantema súbito (exantema depois que a febre some), eritema infeccioso, escarlatina, Kawasaki, enteroviroses e reação a medicamento.",
                        "Use o Guia de identificação do exantema desta categoria para comparar."
                    ]
                },
                {
                    titulo: "Grupos de risco e complicações",
                    icone: "🚩",
                    resumo: "Menores de 5 anos, desnutridos, imunodeprimidos e gestantes. Pneumonia é a principal causa de óbito.",
                    itens: [
                        "<strong>Risco de forma grave:</strong> menores de 5 anos (sobretudo < 1 ano), desnutridos e com deficiência de vitamina A, imunodeprimidos, gestantes.",
                        "<strong>Respiratórias:</strong> pneumonia (viral ou bacteriana secundária, a principal causa de óbito), laringotraqueobronquite, otite média.",
                        "<strong>Digestivas:</strong> diarreia, desidratação, piora da desnutrição.",
                        "<strong>Oculares:</strong> ceratite e úlcera de córnea (cegueira, sobretudo com deficiência de vitamina A).",
                        "<strong>Neurológicas:</strong> encefalite aguda (dias após o exantema) e panencefalite esclerosante subaguda (anos depois)."
                    ]
                }
            ]
        },
        {
            titulo: "Condução na emergência: passo a passo",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Isolar primeiro: o sarampo transmite por aerossol.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "Internar? → isolar, notificar e colher exames → vitamina A e sintomáticos → tratar complicações → proteger os contatos → alta.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar?</strong> Critérios clicáveis: UTI · enfermaria · casa",
                        "<span class=\"cond-passo\">2</span> <strong>Isolar já:</strong> aerossol (N95), notificar em 24 h e colher sorologia + RT-PCR",
                        "<span class=\"cond-passo\">3</span> <strong>Vitamina A:</strong> até 59 meses, 2 doses; e sintomáticos",
                        "<span class=\"cond-passo\">4</span> <strong>Complicações:</strong> pneumonia, otite, laringite, diarreia, encefalite",
                        "<span class=\"cond-passo\">5</span> <strong>Contatos:</strong> vacina em até 72 h · imunoglobulina em até 6 dias (< 6 meses, gestante, imunodeprimido)",
                        "<span class=\"cond-passo\">6</span> <strong>Alta:</strong> isolamento em casa até 4 dias após o exantema e sinais de alarme"
                    ]
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    resumo: "Primeiro decida: UTI, internar ou casa. O sarampo sem complicação é tratado em casa, isolado.",
                    alerta: true,
                    itens: [
                        "O sarampo sem complicação é tratado em casa, com isolamento. Internar por complicação, grupo de risco ou quando não é possível tratar em casa. Na internação: quarto de isolamento para aerossol (MS)."
                    ],
                    escore: {
                        id: "internacao_sarampo",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave. Sem nenhum, toque em \"Nenhum\".",
                        itens: [
                            { nome: "🔴 UTI", opcoes: [[3, "Insuficiência respiratória ou hipoxemia que não melhora com O₂", "🔴"]] },
                            { nome: "", opcoes: [[3, "Encefalite: rebaixamento da consciência ou convulsão", "🔴"]] },
                            { nome: "", opcoes: [[3, "Choque ou sepse", "🔴"]] },
                            { nome: "🟠 Internar (enfermaria, isolamento)", opcoes: [[2, "Pneumonia com SpO₂ < 92% ou desconforto respiratório", "🟠"]] },
                            { nome: "", opcoes: [[2, "Laringotraqueíte com estridor em repouso", "🟠"]] },
                            { nome: "", opcoes: [[2, "Desidratação ou não aceita líquidos", "🟠"]] },
                            { nome: "", opcoes: [[2, "Desnutrição grave", "🟠"]] },
                            { nome: "", opcoes: [[2, "Imunodeprimido", "🟠"]] },
                            { nome: "", opcoes: [[2, "Lesão de córnea ou queda da visão", "🟠"]] },
                            { nome: "", opcoes: [[2, "Sem condição de isolamento e cuidado em casa", "🟠"]] },
                            { nome: "🟢 Nenhum dos acima", opcoes: [[0, "Nenhum critério", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI", cor: "#dc2626", texto: "UTI com isolamento para aerossol. Suporte ventilatório, antibiótico se pneumonia bacteriana, vitamina A. Notificar já." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Quarto de isolamento para aerossol; vitamina A; tratar a complicação (passo 4). Notificar já." };
                            return { num: "🏠", rotulo: "Tratar em casa", cor: "#16a34a", texto: "Isolamento em casa até 4 dias após o início do exantema, vitamina A e sintomáticos. Retorno se sinais de alarme (passo 6)." };
                        },
                        nota: "O Ministério da Saúde não traz uma lista formal de internação. Estes critérios reúnem as complicações e os grupos de risco descritos no Guia de Vigilância em Saúde e na revisão de sarampo na emergência (2026)."
                    }
                },
                {
                    passo: 2,
                    titulo: "Isolar, notificar e colher exames",
                    resumo: "Máscara no paciente, N95 na equipe, quarto privativo. Notificação imediata. Sorologia + RT-PCR no 1º atendimento.",
                    alerta: true,
                    itens: [
                        "<strong>Isolar já na triagem:</strong> máscara cirúrgica no paciente, N95 na equipe, quarto privativo (de pressão negativa se houver). Precaução para aerossol até 4 dias após o início do exantema; no imunodeprimido, durante toda a doença (MS).",
                        "Notificar imediatamente (em até 24 h) todo caso suspeito à vigilância (MS).",
                        "<strong>Colher no 1º atendimento:</strong> sangue para sorologia (IgM e IgG) e swab de nasofaringe/orofaringe e urina para RT-PCR (até 7 dias do exantema) (MS).",
                        "Perguntar: vacinação, viagens, contato com caso, quem são os contatos (casa, escola, sala de espera)."
                    ]
                },
                {
                    passo: 3,
                    titulo: "Vitamina A e sintomáticos",
                    resumo: "Vitamina A em 2 doses para toda criança até 59 meses com suspeita. Sem tratamento antiviral específico.",
                    itens: [
                        "Vitamina A para toda criança até 59 meses com suspeita de sarampo, independentemente da vacinação ou de doses anteriores: 2 doses, no dia da suspeita e no dia seguinte (MS 2025).",
                        "Não há antiviral específico. Febre: paracetamol ou dipirona. Hidratação, alimentação e higiene dos olhos.",
                        "Antibiótico só se infecção bacteriana secundária (otite, pneumonia)."
                    ],
                    remedios: ["vit_a_sarampo", "pct_gts", "dip_gts"]
                },
                {
                    passo: 4,
                    titulo: "Complicações",
                    resumo: "Pneumonia, otite, laringite, diarreia, ceratite e encefalite: tratar conforme a conduta de cada uma.",
                    itens: [
                        "<strong>Pneumonia</strong> (taquipneia, hipoxemia, febre que volta ou persiste): RX e antibiótico como na conduta de pneumonia; O₂ se SpO₂ &lt; 92%.",
                        "Otite média e laringotraqueíte: condutas de otite e de crupe.",
                        "<strong>Diarreia e desidratação:</strong> conduta de diarreia (planos A, B e C).",
                        "<strong>Ceratite:</strong> oftalmologia; vitamina A.",
                        "<strong>Encefalite</strong> (sonolência, convulsão, déficit focal dias após o exantema): internar, neurologia, suporte."
                    ]
                },
                {
                    passo: 5,
                    titulo: "Contatos: bloqueio vacinal e imunoglobulina",
                    resumo: "Vacina em até 72 h nos suscetíveis a partir de 6 meses. Imunoglobulina em até 6 dias nos que não podem vacinar.",
                    itens: [
                        "A vigilância faz o bloqueio: vacinação seletiva dos contatos suscetíveis em até 72 h (MS).",
                        "<strong>Lactentes de 6 a 11 meses:</strong> \"dose zero\" da tríplice viral, que não conta para o calendário (refazer aos 12 e 15 meses) (MS).",
                        "Imunoglobulina humana em até 6 dias (144 h) após a exposição, pelo CRIE, para quem não pode vacinar: menores de 6 meses, gestantes e imunodeprimidos sem imunidade (MS).",
                        "Contato suscetível que não recebeu proteção: afastar do 5º ao 21º dia após a exposição."
                    ]
                },
                {
                    passo: 6,
                    titulo: "Alta e sinais de alarme",
                    resumo: "Isolamento em casa até 4 dias após o exantema. Retorno se falta de ar, sonolência, convulsão ou febre que não cede.",
                    itens: [
                        "<strong>Em casa:</strong> sem escola, creche e visitas até 4 dias após o início do exantema (MS).",
                        "<strong>Retornar se:</strong> falta de ar ou respiração rápida, febre que continua 3 dias depois do exantema ou que volta, sonolência, convulsão, dor de ouvido, diarreia com sinais de desidratação, dor ou vermelhidão nos olhos.",
                        "Completar as 2 doses de vitamina A."
                    ],
                    remedios: ["orientacoes_gerais"]
                }
            ]
        },
        {
            titulo: "Ambulatório: vacinação e prevenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Vacinação",
                    icone: "💉",
                    resumo: "Tríplice viral aos 12 meses e tetra viral aos 15 meses; dose zero de 6 a 11 meses em surtos.",
                    itens: [
                        "<strong>Calendário do MS:</strong> tríplice viral aos 12 meses e tetra viral aos 15 meses; adolescentes e adultos não vacinados: atualizar o esquema (MS).",
                        "Dose zero de 6 a 11 meses quando houver circulação do vírus ou viagem (MS).",
                        "Vacina de vírus vivo: contraindicada em gestantes e imunodeprimidos graves (avaliar no CRIE).",
                        "Conferir o cartão de toda criança atendida, sobretudo em surto."
                    ]
                },
                {
                    titulo: "Depois do sarampo",
                    icone: "📋",
                    resumo: "Acompanhar nutrição, visão e desenvolvimento.",
                    itens: [
                        "O sarampo deprime a imunidade por semanas a meses: atenção a novas infecções.",
                        "Acompanhar estado nutricional, visão e desenvolvimento; quem teve sarampo fica imune pelo resto da vida."
                    ]
                }
            ]
        }
    ],

    citacoes: { "MS 2025": 1, "MS": 0, "Ministério da Saúde": 0, "revisão de sarampo na emergência (2026)": 2 },
    fontes: [
        "Brasil. Ministério da Saúde. Guia de Vigilância em Saúde. 6ª ed. revisada. Brasília: MS. Capítulo: Sarampo (caso suspeito, notificação, isolamento, exames, bloqueio vacinal e imunoglobulina).",
        "Brasil. Ministério da Saúde. Nota Técnica Conjunta nº 02/2025: suplementação de vitamina A em crianças com suspeita de sarampo (reproduzida em Nota Técnica da Secretaria Municipal de Saúde de São Paulo, 2026).",
        "Daniels DK, Muppidi P, Rasakumar Y, Conners GP. Recognition, Diagnosis, and Management of Measles in the Emergency Department. Pediatr Emerg Care 2026;42(1):79-89. doi:10.1097/PEC.0000000000003482"
    ],
    revisao: "10/2026"
});
