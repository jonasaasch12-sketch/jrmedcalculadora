// =====================================================
// CONDUTA: CRISE CONVULSIVA / ESTADO DE MAL EPILÉPTICO
// Base: AES 2016 (Glauser) — algoritmo por tempo e doses; ILAE 2015 (Trinka) — definição
// (t1 = 5 min, t2 = 30 min); ESETT 2019 (Kapur) — 2ª linha; Neurocritical Care Society 2012
// (Brophy) — estado de mal refratário; AAN 2000 (Hirtz) — 1ª crise afebril; AAP 2011 — convulsão febril.
// As doses ficam nos cards (medicamentos/neuro.js).
// =====================================================

// Cronômetro da crise: o tempo decide a etapa do tratamento.
let _criseInicio = null, _criseTimer = null;
const CRISE_FASES = [
    [0, "0–5 min · Estabilizar", "ABC, decúbito lateral, O₂, glicemia capilar, acesso.", "#0284c7"],
    [5, "5 min · 1º benzodiazepínico", "Diazepam EV ou midazolam IM / intranasal / bucal.", "#d97706"],
    [10, "10 min · 2º benzodiazepínico", "Repetir 1 vez (máximo 2 doses no total).", "#d97706"],
    [20, "20 min · 2ª linha", "Fenitoína, levetiracetam (ou fenobarbital). Chamar a UTI.", "#dc2626"],
    [40, "40 min · Refratário", "Intubação, midazolam contínuo, EEG, UTI.", "#7f1d1d"]
];
function ferramentaCronometroCrise() {
    return `<div class="exg crise-crono" id="crise-crono">
        <div class="crise-crono-tempo" id="crise-crono-tempo">00:00</div>
        <div class="crise-crono-fase" id="crise-crono-fase">Toque em <strong>Iniciar</strong> quando a crise começou (ou ajuste os minutos já passados).</div>
        <div class="crise-crono-botoes">
            <button type="button" onclick="iniciarCronometroCrise(0)">▶ Iniciar agora</button>
            <button type="button" onclick="iniciarCronometroCrise(5)">Já passou 5 min</button>
            <button type="button" onclick="iniciarCronometroCrise(10)">10 min</button>
            <button type="button" onclick="pararCronometroCrise()">■ Parar</button>
        </div>
    </div>`;
}
function iniciarCronometroCrise(minPassados) {
    _criseInicio = Date.now() - minPassados * 60000;
    clearInterval(_criseTimer);
    _criseTimer = setInterval(atualizarCronometroCrise, 1000);
    atualizarCronometroCrise();
}
function pararCronometroCrise() {
    clearInterval(_criseTimer); _criseTimer = null;
    let f = document.getElementById('crise-crono-fase');
    if (f) f.innerHTML += ' <em>(parado)</em>';
}
function atualizarCronometroCrise() {
    let t = document.getElementById('crise-crono-tempo'), f = document.getElementById('crise-crono-fase');
    if (!t || !f) { clearInterval(_criseTimer); return; }
    let s = Math.floor((Date.now() - _criseInicio) / 1000), m = Math.floor(s / 60);
    t.textContent = String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    let fase = CRISE_FASES.filter(x => m >= x[0]).pop();
    t.style.color = fase[3];
    f.innerHTML = `<strong style="color:${fase[3]}">${fase[1]}</strong><br>${fase[2]}`;
}

registrarConduta({
    id: "crise_convulsiva",
    nome: "Crise convulsiva e estado de mal epiléptico",
    categoria: "Neurologia",
    cor: "#6d28d9",
    kw: "crise convulsiva convulsao epilepsia estado de mal epileptico eme status epilepticus diazepam midazolam fenitoina levetiracetam fenobarbital refratario crise febril hipoglicemia",
    resumo: "Crise ≥ 5 min = tratar como estado de mal: cronômetro, benzodiazepínico aos 5 min (até 2 doses), 2ª linha aos 20 min, refratário aos 40 min.",
    legenda: "Conduta conforme a <strong>American Epilepsy Society (2016)</strong>, a definição da <strong>ILAE (2015)</strong>, o estudo <strong>ESETT (2019)</strong> e a <strong>Neurocritical Care Society (2012)</strong>.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",
                    icone: "🔎",
                    resumo: "Crise tônico-clônica com 5 min ou mais, ou crises seguidas sem recuperar a consciência = estado de mal.",
                    itens: [
                        "<strong>Estado de mal epiléptico convulsivo</strong> (ILAE 2015): crise tônico-clônica que dura <strong>5 minutos ou mais</strong> (t1), ou <strong>crises repetidas sem recuperar a consciência</strong> entre elas.",
                        "<strong>Aos 5 minutos a crise dificilmente para sozinha</strong>: começar o tratamento. Após <strong>30 minutos</strong> (t2) há risco de lesão neuronal definitiva (ILAE 2015).",
                        "<strong>Pela história:</strong> início (focal ou generalizado), duração cronometrada, febre, trauma, ingestão de remédios ou tóxicos, epilepsia conhecida e remédios em uso (adesão, troca recente), desenvolvimento, vacinas.",
                        "<strong>Exame:</strong> sinais vitais, glicemia capilar, sinais meníngeos, fontanela, sinais de trauma (pensar em maus-tratos no lactente), pele (manchas café com leite, hipocrômicas), sinais focais, pupilas.",
                        "<strong>Crise sutil:</strong> após crise longa ou benzodiazepínico, a criança pode continuar em crise com pouco movimento (desvio do olhar, nistagmo, piscar, taquicardia). Se não acorda em 20 a 30 min, pensar em <strong>estado de mal não convulsivo</strong> e pedir EEG."
                    ]
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Síncope, perda de fôlego, distonia por remédio, tremores e calafrios, crise não epiléptica psicogênica.",
                    itens: [
                        "<strong>Síncope</strong> (com abalos breves), <strong>perda de fôlego</strong> (choro → apneia → cianose ou palidez → abalos), <strong>calafrios e tremores</strong> da febre.",
                        "<strong>Distonia aguda por remédio</strong> (metoclopramida, bromoprida, antipsicóticos): consciente, torcicolo, crise oculógira. Tratamento: biperideno ou difenidramina, não anticonvulsivante.",
                        "<strong>Lactente:</strong> mioclonia benigna do sono, Sandifer (refluxo), tremores (jitteriness: param ao segurar o membro).",
                        "<strong>Crise não epiléptica psicogênica</strong> (adolescente): olhos fechados com resistência à abertura, movimentos assíncronos, longa duração sem hipóxia. 10% dos pacientes do ESETT tinham crise psicogênica."
                    ]
                },
                {
                    titulo: "Causas a procurar",
                    icone: "🧩",
                    resumo: "Febre, infecção do SNC, hipoglicemia, sódio/cálcio/magnésio, trauma, intoxicação, epilepsia, hipóxia.",
                    itens: [
                        "<strong>Febre:</strong> convulsão febril (6 meses a 5 anos), mas <strong>sempre pensar em meningite/encefalite</strong>.",
                        "<strong>Metabólicas:</strong> <strong>hipoglicemia</strong>, hiponatremia (diarreia, soro hipotônico), hipocalcemia (lactente, raquitismo), hipomagnesemia.",
                        "<strong>Trauma</strong> (acidental ou maus-tratos), AVC, hemorragia, tumor, hidrocefalia com válvula.",
                        "<strong>Intoxicação:</strong> antidepressivos tricíclicos, isoniazida (antídoto: piridoxina), anti-histamínicos, cocaína, organofosforado, abstinência.",
                        "<strong>Epilepsia conhecida:</strong> baixa adesão ou nível baixo do anticonvulsivante, privação de sono, infecção.",
                        "<strong>Recém-nascido:</strong> encefalopatia hipóxico-isquêmica, hemorragia, infecção, hipoglicemia, hipocalcemia, erros inatos, dependência de piridoxina."
                    ]
                },
                {
                    titulo: "Sinais de gravidade",
                    icone: "⚠️",
                    resumo: "Crise > 5 min, hipóxia, rebaixamento que não melhora, déficit focal, sinais de hipertensão intracraniana, febre com toxemia.",
                    itens: [
                        "<strong>Crise que não para</strong> após 2 doses de benzodiazepínico (estado de mal estabelecido).",
                        "<strong>Hipóxia, apneia</strong> ou via aérea que não se mantém.",
                        "<strong>Não recupera a consciência</strong> em 30 a 60 min, <strong>déficit focal novo</strong>, assimetria de pupilas, bradicardia com hipertensão (hipertensão intracraniana).",
                        "<strong>Febre com toxemia</strong>, petéquias, rigidez de nuca ou fontanela abaulada (infecção do SNC).",
                        "<strong>Instabilidade hemodinâmica</strong> ou arritmia (intoxicação por tricíclico, distúrbio eletrolítico)."
                    ]
                }
            ]
        },
        {
            titulo: "Condução na emergência: passo a passo",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Cronometrar desde o início da crise. O tempo define a etapa.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "0–5 min estabilizar → 5 min benzodiazepínico (até 2 doses) → 20 min 2ª linha → 40 min refratário/UTI.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar / UTI?</strong> Decidir junto com o tratamento, sem atrasá-lo",
                        "<span class=\"cond-passo\">2</span> <strong>0 a 5 min:</strong> ABC, lateralizar, O₂, monitor, <strong>glicemia capilar</strong>, acesso EV ou IO",
                        "<span class=\"cond-passo\">3</span> <strong>5 min:</strong> <strong>benzodiazepínico</strong>; repetir 1 vez após 5 min (máx. 2 doses no total)",
                        "<span class=\"cond-passo\">4</span> <strong>20 min:</strong> <strong>2ª linha</strong>: fenitoína ou levetiracetam (fenobarbital se não houver)",
                        "<span class=\"cond-passo\">5</span> <strong>40 min:</strong> <strong>refratário</strong>: intubar, midazolam contínuo, EEG, UTI",
                        "<span class=\"cond-passo\">6</span> <strong>Investigar a causa</strong>: exames, punção lombar, tomografia quando indicados",
                        "<span class=\"cond-passo\">7</span> <strong>Depois da crise</strong>: observar o pós-ictal, tratar a causa, decidir alta"
                    ],
                    ferramenta: "ferramentaCronometroCrise"
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    resumo: "Marque o que a criança tem. Não atrasa o benzodiazepínico: se ainda está em crise, trate primeiro.",
                    alerta: true,
                    itens: [
                        "<strong>Se a criança ainda está em crise, tratar primeiro</strong> (passos 2 e 3) e decidir o destino depois."
                    ],
                    escore: {
                        id: "internacao_crise",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave.",
                        itens: [
                            { nome: "🔴 UTI", opcoes: [[3, "Estado de mal refratário (precisou de 2ª linha e não parou) ou infusão contínua", "🔴"]] },
                            { nome: "", opcoes: [[3, "Intubação, apneia ou hipóxia que não melhora", "🔴"]] },
                            { nome: "", opcoes: [[3, "Instabilidade hemodinâmica ou arritmia", "🔴"]] },
                            { nome: "", opcoes: [[3, "Rebaixamento persistente, sinais de hipertensão intracraniana ou suspeita de estado de mal não convulsivo", "🔴"]] },
                            { nome: "🟠 Internar (enfermaria)", opcoes: [[2, "Estado de mal controlado (precisou de 2 doses de benzodiazepínico ou de 2ª linha)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Crises repetidas nas últimas horas", "🟠"]] },
                            { nome: "", opcoes: [[2, "Suspeita de meningite/encefalite, trauma, intoxicação ou distúrbio metabólico", "🟠"]] },
                            { nome: "", opcoes: [[2, "Não voltou ao normal após o pós-ictal ou déficit focal novo", "🟠"]] },
                            { nome: "", opcoes: [[1, "Menor de 6 meses, 1ª crise afebril sem causa ou família sem condições de observar e retornar", "🟡"]] },
                            { nome: "🟢 Pode ir para casa", opcoes: [[0, "Crise única e curta, voltou ao normal, causa benigna (convulsão febril simples ou epiléptico com crise habitual)", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI pediátrica", cor: "#dc2626", texto: "Via aérea, infusão contínua (passo 5), EEG. Acionar a UTI e transferir estabilizado." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Observar nível de consciência e novas crises, tratar a causa (passo 6), manter o anticonvulsivante de 2ª linha se foi usado." };
                            if (g === 1) return { num: "?", rotulo: "Considerar internar", cor: "#ca8a04", texto: "Observar no pronto-socorro até voltar ao normal; internar se dúvida, idade baixa ou falta de condições de retorno." };
                            return { num: "🏠", rotulo: "Alta com orientação", cor: "#16a34a", texto: "Após voltar ao estado habitual. Orientar os sinais de retorno e o que fazer numa nova crise (bloco 🏠)." };
                        },
                        nota: "As diretrizes de estado de mal não trazem lista formal de internação. Critérios reunidos dos sinais de gravidade (AES 2016, Neurocritical Care Society 2012) e da avaliação da 1ª crise e da convulsão febril (AAN 2000, AAP 2011)."
                    }
                },
                {
                    passo: 2,
                    titulo: "0 a 5 min: estabilizar",
                    resumo: "Lateralizar, aspirar, O₂, monitor, glicemia capilar, acesso EV ou IO, cronometrar.",
                    itens: [
                        "<strong>Cronometrar</strong> desde o início da crise (perguntar quando começou).",
                        "<strong>Decúbito lateral</strong>, aspirar secreções, <strong>O₂</strong>; não colocar nada na boca. Ventilar com bolsa-máscara se apneia.",
                        "<strong>Monitor</strong> cardíaco, oximetria, PA.",
                        "<strong>Glicemia capilar já.</strong> Se <strong>&lt; 60 mg/dL</strong>: glicose EV (card abaixo) (AES 2016).",
                        "<strong>Acesso venoso</strong>; se não conseguir rápido, <strong>não esperar</strong>: benzodiazepínico IM, intranasal ou bucal (passo 3). Intraósseo se precisar.",
                        "<strong>Exames:</strong> eletrólitos (sódio, cálcio, magnésio), gasometria, hemograma, nível sérico do anticonvulsivante (se usa), toxicológico conforme a história.",
                        "<strong>Febre:</strong> antitérmico; não previne a crise, mas dá conforto."
                    ],
                    remedios: ["glicose_pals"]
                },
                {
                    passo: 3,
                    titulo: "5 min: benzodiazepínico",
                    resumo: "Diazepam EV; sem acesso: midazolam IM, intranasal ou bucal, ou diazepam retal. Repetir 1 vez após 5 min.",
                    alerta: true,
                    itens: [
                        "<strong>Com acesso EV:</strong> <strong>diazepam EV</strong> (AES 2016).",
                        "<strong>Sem acesso:</strong> <strong>midazolam IM</strong>, <strong>intranasal ou bucal</strong>, ou <strong>diazepam retal</strong>. Não perder tempo tentando acesso.",
                        "<strong>Crise continua 5 min depois:</strong> repetir <strong>1 vez</strong> o benzodiazepínico.",
                        "<strong>No máximo 2 doses de benzodiazepínico no total</strong>, contando as feitas antes da chegada (SAMU, casa). Mais doses aumentam a depressão respiratória e não aumentam o controle.",
                        "<strong>Via aérea pronta:</strong> a depressão respiratória é mais comum na crise que não para do que pelo benzodiazepínico (AES 2016)."
                    ],
                    remedios: ["neuro_diaz", "neuro_midaz", "neuro_midaz_nasal"]
                },
                {
                    passo: 4,
                    titulo: "20 min: 2ª linha",
                    resumo: "Fenitoína ou levetiracetam (eficácia igual no ESETT). Fenobarbital se não houver os outros.",
                    alerta: true,
                    itens: [
                        "<strong>Crise que continua após 2 doses de benzodiazepínico</strong>: uma droga de 2ª linha, <strong>em dose única cheia</strong> (AES 2016).",
                        "<strong>Fenitoína</strong> (ou fosfenitoína), <strong>levetiracetam</strong> ou <strong>valproato</strong> param a crise em <strong>cerca de metade</strong> dos pacientes, sem diferença entre elas (ESETT 2019).",
                        "<strong>Levetiracetam:</strong> sem hipotensão nem arritmia, infusão rápida. <strong>Fenitoína:</strong> monitor cardíaco e PA, só em SF 0,9%.",
                        "<strong>Valproato EV</strong> (40 mg/kg, AES 2016): evitar em menores de 2 anos, doença hepática ou mitocondrial (sem card no app).",
                        "<strong>Fenobarbital:</strong> se não houver as outras (AES 2016); 1ª escolha no <strong>recém-nascido</strong>. Causa hipotensão e depressão respiratória.",
                        "<strong>Avisar a UTI</strong> já nesta etapa."
                    ],
                    remedios: ["neuro_fenitoina", "neuro_levetiracetam", "fenobarbital"]
                },
                {
                    passo: 5,
                    titulo: "40 min: estado de mal refratário",
                    resumo: "Outra droga de 2ª linha ou anestésico contínuo, com intubação, EEG e UTI.",
                    alerta: true,
                    itens: [
                        "<strong>Refratário:</strong> crise que continua após benzodiazepínico e um fármaco de 2ª linha (Neurocritical Care Society 2012).",
                        "<strong>Opções</strong> (AES 2016): repetir com <strong>outra droga de 2ª linha</strong> ou iniciar <strong>anestésico em infusão contínua</strong>: <strong>midazolam</strong> (o mais usado), tiopental, pentobarbital ou propofol (cautela em criança: síndrome da infusão do propofol).",
                        "<strong>Intubação</strong> em sequência rápida (cetamina é boa opção de indutor). Bloqueador neuromuscular de curta duração: ele <strong>esconde a crise</strong>, por isso o EEG.",
                        "<strong>EEG contínuo</strong> para guiar a dose; manter 24 a 48 h de controle antes de desmamar (Neurocritical Care Society 2012).",
                        "<strong>Investigar</strong> causas autoimunes, infecciosas e metabólicas; no lactente, prova com <strong>piridoxina</strong>."
                    ],
                    remedios: ["neuro_midaz_continuo", "rsi_ceta"]
                },
                {
                    passo: 6,
                    titulo: "Investigar a causa",
                    resumo: "Exames conforme a história. Punção lombar se suspeita de infecção. Tomografia se trauma, déficit focal ou não acorda.",
                    itens: [
                        "<strong>Eletrólitos e glicemia</strong>: sempre no estado de mal; na 1ª crise afebril com criança bem, só conforme a clínica (vômitos, diarreia, desidratação, não acorda) (AAN 2000).",
                        "<strong>Punção lombar</strong>: suspeita de meningite/encefalite (febre com toxemia, rigidez, rebaixamento). Na crise febril de <strong>6 a 12 meses</strong>, é opção se vacinas Hib/pneumococo incompletas ou se já usou antibiótico (AAP 2011). Não atrasar o antibiótico; adiar a punção se instável ou com hipertensão intracraniana.",
                        "<strong>Tomografia de urgência</strong>: trauma, déficit focal novo, não volta ao normal, sinais de hipertensão intracraniana, válvula (DVP), coagulopatia. Fora disso, ressonância eletiva (AAN 2000).",
                        "<strong>Toxicológico</strong> se a história sugerir ou causa não esclarecida.",
                        "<strong>EEG</strong>: urgente se não acorda (estado de mal não convulsivo); eletivo na 1ª crise afebril (AAN 2000). Não é necessário na convulsão febril simples (AAP 2011)."
                    ]
                },
                {
                    passo: 7,
                    titulo: "Depois da crise",
                    resumo: "Observar até voltar ao normal, tratar a causa, decidir manutenção com a neurologia.",
                    itens: [
                        "<strong>Pós-ictal</strong>: sonolência é esperada; vigiar respiração e novas crises. <strong>Paresia de Todd</strong> pode durar horas, mas déficit que não melhora exige imagem.",
                        "<strong>Epiléptico conhecido</strong>: rever adesão e dose com a neurologia; dosar nível sérico se disponível.",
                        "<strong>Após estado de mal com 2ª linha</strong>: em geral a droga é mantida em dose de manutenção, conforme a neurologia.",
                        "<strong>1ª crise afebril</strong> que voltou ao normal: em geral <strong>não</strong> se inicia anticonvulsivante no pronto-socorro; encaminhar à neurologia com EEG (AAN 2000)."
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
                    titulo: "Orientação à família: o que fazer numa crise",
                    icone: "👪",
                    resumo: "Deitar de lado, não colocar nada na boca, cronometrar; mais de 5 min = medicação de resgate e SAMU.",
                    itens: [
                        "Manter a calma, <strong>deitar de lado</strong>, afastar objetos, afrouxar roupas. <strong>Não colocar nada na boca</strong>, não dar água nem remédio pela boca.",
                        "<strong>Cronometrar</strong> e, se possível, <strong>filmar</strong> a crise (ajuda muito no diagnóstico).",
                        "<strong>Crise com mais de 5 minutos</strong>, crises seguidas, dificuldade para respirar ou não acorda: <strong>ligar 192 (SAMU)</strong>.",
                        "Criança com epilepsia e crises prolongadas: a neurologia pode prescrever <strong>medicação de resgate em casa</strong> (midazolam intranasal/bucal ou diazepam retal), com orientação de uso."
                    ]
                },
                {
                    titulo: "Voltar ao pronto-socorro se",
                    icone: "🚩",
                    resumo: "Nova crise, sonolência que não passa, vômitos, febre com prostração, fraqueza de um lado.",
                    itens: [
                        "Nova crise (principalmente se mais de 5 min).",
                        "<strong>Sonolência que não melhora</strong>, confusão, dor de cabeça forte, vômitos repetidos.",
                        "Febre com prostração, manchas na pele, rigidez de nuca.",
                        "Fraqueza ou dormência de um lado do corpo, alteração da fala ou da visão."
                    ]
                },
                {
                    titulo: "Seguimento",
                    icone: "📋",
                    resumo: "1ª crise afebril: neurologia + EEG. Convulsão febril simples: não precisa de exames nem de remédio contínuo.",
                    itens: [
                        "<strong>1ª crise afebril:</strong> encaminhar à <strong>neurologia pediátrica</strong> com <strong>EEG</strong>; ressonância se crise focal, exame neurológico alterado, atraso do desenvolvimento ou menor de 1 ano (AAN 2000).",
                        "<strong>Convulsão febril simples</strong> (6 meses a 5 anos, generalizada, menos de 15 min, uma em 24 h): procurar a causa da febre; <strong>não precisa</strong> de EEG, exames de sangue ou imagem (AAP 2011). Antitérmico não previne nova crise.",
                        "<strong>Epilepsia:</strong> manter o remédio sem interromper, não trocar marca sem orientação, dormir bem; atividades na água sempre com supervisão."
                    ]
                }
            ]
        }
    ],

    citacoes: { "AES 2016": 0, "ILAE 2015": 1, "ESETT 2019": 2, "ESETT": 2, "Neurocritical Care Society 2012": 3, "AAN 2000": 4, "AAP 2011": 5 },
    fontes: [
        "Glauser T, Shinnar S, Gloss D, et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults: Report of the Guideline Committee of the American Epilepsy Society. Epilepsy Curr 2016;16(1):48-61. doi:10.5698/1535-7597-16.1.48",
        "Trinka E, Cock H, Hesdorffer D, et al. A definition and classification of status epilepticus — Report of the ILAE Task Force on Classification of Status Epilepticus. Epilepsia 2015;56(10):1515-23. doi:10.1111/epi.13121",
        "Kapur J, Elm J, Chamberlain JM, et al. Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus (ESETT). N Engl J Med 2019;381(22):2103-13. doi:10.1056/NEJMoa1905795",
        "Brophy GM, Bell R, Claassen J, et al. Guidelines for the evaluation and management of status epilepticus (Neurocritical Care Society). Neurocrit Care 2012;17(1):3-23. doi:10.1007/s12028-012-9695-z",
        "Hirtz D, Ashwal S, Berg A, et al. Practice parameter: evaluating a first nonfebrile seizure in children (AAN, Child Neurology Society, AES). Neurology 2000;55(5):616-23. doi:10.1212/wnl.55.5.616",
        "American Academy of Pediatrics, Subcommittee on Febrile Seizures. Febrile seizures: guideline for the neurodiagnostic evaluation of the child with a simple febrile seizure. Pediatrics 2011;127(2):389-94. doi:10.1542/peds.2010-3318"
    ],
    revisao: "10/2026"
});
