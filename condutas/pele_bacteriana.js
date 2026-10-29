// =====================================================
// CONDUTA: INFECÇÕES BACTERIANAS DE PELE E PARTES MOLES
// Base: SBP — Departamentos de Dermatologia e Infectologia: Documento Científico
// "Infecções Bacterianas Superficiais Cutâneas" (2022); IDSA 2014 (Stevens) — infecções
// de pele e partes moles. Fotos reais do DermNet (CC BY-NC-ND 4.0), sem alteração.
// Usa FOTOS_EXANTEMA / htmlFotoExantema (condutas/exantematicas.js, carregado antes).
// As doses ficam nos cards.
// =====================================================

(function () {
    if (typeof FOTOS_EXANTEMA === 'undefined') return;
    const dn = (k, leg, link) => ({ arq: `img/pele/${k}.jpg`, autor: "DermNet", licenca: "CC BY-NC-ND 4.0", fonte: "dermnet", legenda: leg, link: link });
    Object.assign(FOTOS_EXANTEMA, {
        pele_impetigo: dn("impetigo", "Impetigo crostoso (não bolhoso): crostas cor de mel ao redor da boca.", "https://dermnetnz.org/topics/impetigo"),
        pele_impetigo_bolhoso: dn("impetigo_bolhoso", "Impetigo bolhoso extenso no dorso: bolhas flácidas e erosões.", "https://dermnetnz.org/topics/impetigo"),
        pele_celulite: dn("celulite", "Celulite na coxa de uma criança, com a borda marcada a caneta para acompanhar a evolução.", "https://dermnetnz.org/topics/cellulitis"),
        pele_erisipela: dn("erisipela", "Erisipela: placa vermelha, elevada e bem delimitada, com bolha.", "https://dermnetnz.org/topics/erysipelas"),
        pele_furunculo: dn("furunculo", "Furúnculo: nódulo vermelho e doloroso centrado no folículo.", "https://dermnetnz.org/topics/boil"),
        pele_ectima: dn("ectima", "Ectima: úlceras com crosta escura e borda elevada na perna.", "https://dermnetnz.org/topics/ecthyma-images"),
        pele_ssss: dn("ssss", "Síndrome da pele escaldada estafilocócica: eritema, crostas e fissuras ao redor da boca e dos olhos.", "https://dermnetnz.org/topics/staphylococcal-scalded-skin-syndrome"),
        pele_ssss_corpo: dn("ssss_corpo", "Síndrome da pele escaldada: descolamento superficial nas axilas e no pescoço de um lactente.", "https://dermnetnz.org/topics/staphylococcal-scalded-skin-syndrome"),
        pele_fasciite: dn("fasciite", "Fasciíte necrosante: área violácea com necrose e bolhas; dor maior do que a lesão aparenta.", "https://dermnetnz.org/topics/necrotising-fasciitis-images"),
        pele_paroniquia: dn("paroniquia", "Paroníquia aguda: prega da unha vermelha e inchada, com pus.", "https://dermnetnz.org/topics/paronychia-images")
    });
})();

function fotosPele(lista) {
    if (typeof htmlFotoExantema !== 'function') return '';
    return `<div class="exg ex-galeria">${lista.map(k => htmlFotoExantema(k)).join('')}</div>`;
}
function ferramentaPeleImpetigo() { return fotosPele(["pele_impetigo", "pele_impetigo_bolhoso"]); }
function ferramentaPeleFurunculo() { return fotosPele(["pele_furunculo"]); }
function ferramentaPeleEctima() { return fotosPele(["pele_ectima"]); }
function ferramentaPeleParoniquia() { return fotosPele(["pele_paroniquia"]); }
function ferramentaPeleErisipela() { return fotosPele(["pele_erisipela"]); }
function ferramentaPeleCelulite() { return fotosPele(["pele_celulite"]); }
function ferramentaPeleSsss() { return fotosPele(["pele_ssss", "pele_ssss_corpo"]); }
function ferramentaPeleFasciite() { return fotosPele(["pele_fasciite"]); }

// Cada doença é um bloco, na ordem pedida pelo Dr. Jonas (como o Whitebook):
// apresentação clínica → critérios diagnósticos → tratamento ambulatorial →
// tratamento hospitalar (1º os critérios de internação, depois as medicações) → complicações.

// Critérios de internação clicáveis de uma doença (valores 3 = UTI, 2 = internar, 1 = considerar, 0 = casa).
function internacaoPele(id, uti, internar, considerar, casa, nota) {
    let itens = [];
    uti.forEach((t, k) => itens.push({ nome: k ? "" : "🔴 UTI / centro cirúrgico", opcoes: [[3, t, "🔴"]] }));
    internar.forEach((t, k) => itens.push({ nome: k ? "" : "🟠 Internar", opcoes: [[2, t, "🟠"]] }));
    considerar.forEach(t => itens.push({ nome: "", opcoes: [[1, t, "🟡"]] }));
    itens.push({ nome: "🟢 Tratar em casa", opcoes: [[0, casa, "🟢"]] });
    return {
        id: id, unidade: " ", checklist: true,
        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave.",
        itens: itens,
        classificar: (v) => {
            let g = Math.max(...v);
            if (g === 3) return { num: "UTI", rotulo: "UTI / cirurgia", cor: "#dc2626", texto: "Ressuscitação (conduta de sepse), antibiótico EV já e cirurgião/UTI conforme o caso." };
            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Tratamento EV abaixo; marcar a borda e reavaliar em 24 a 48 h." };
            if (g === 1) return { num: "?", rotulo: "Considerar internar", cor: "#ca8a04", texto: "Se tratar em casa, garantir retorno em 24 a 48 h." };
            return { num: "🏠", rotulo: "Tratar em casa", cor: "#16a34a", texto: "Seguir o tratamento ambulatorial, com retorno em 48 a 72 h ou antes se piorar." };
        },
        nota: nota
    };
}

registrarConduta({
    id: "pele_bacteriana",
    nome: "Infecções bacterianas de pele e partes moles",
    categoria: "Dermatologia",
    cor: "#be185d",
    kw: "impetigo bolhoso crostoso foliculite furunculo carbunculo abscesso ectima erisipela celulite celulite orbitaria periorbitaria fasciite necrosante sindrome da pele escaldada estafilococica paroniquia dactilite bolhosa dermatite perianal estreptococica piodermite staphylococcus aureus estreptococo mrsa",
    resumo: "Uma página por doença: impetigo, foliculite, furúnculo, ectima, paroníquia, dermatite perianal, erisipela, celulite, celulite orbitária, pele escaldada e fasciíte — clínica, diagnóstico, tratamento em casa e no hospital, complicações.",
    legenda: "Conduta conforme a SBP – Departamentos de Dermatologia e Infectologia (2022), o Whitebook (impetigo, celulite, celulite orbitária e erisipela) e a IDSA (2014). Fotos reais do DermNet, com crédito. Toque no nome da doença no índice acima.",
    padraoTexto: true, // padrão de escrita (rótulo azul, subitens ›, caixa de atenção)

    blocos: [
        {
            titulo: "Impetigo",
            icone: "🟡",
            cor: "#ca8a04",
            secoes: [
                {
                    titulo: "Apresentação clínica e sinais e sintomas",
                    icone: "👁️",
                    resumo: "Crostoso: mácula → pústula → crosta cor de mel na face. Bolhoso: bolhas flácidas no tronco e dobras, no lactente.",
                    itens: [
                        "Infecção da epiderme superficial, mais entre 2 e 5 anos, no verão e no clima tropical; muito contagiosa (SBP 2022).",
                        "<strong>Crostoso (não bolhoso):</strong> mácula eritematosa → vesícula/pústula → crosta cor de mel com halo vermelho; face (ao redor da boca e do nariz) e membros inferiores. Sem dor, sem sintomas sistêmicos, prurido ocasional, poupa palmas e plantas; linfadenopatia regional frequente (SBP 2022).",
                        "<strong>Bolhoso:</strong> bolhas flácidas, de parede fina e conteúdo claro, que se rompem em 1 a 3 dias e deixam base úmida; sem crosta melicérica; tronco, dobras, membros (lactente), períneo, umbigo, axilas e pescoço (recém-nascido). Febre e diarreia mais comuns; 90% em menores de 2 anos (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleImpetigo"
                },
                {
                    titulo: "Critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Clínico. Crostoso: S. aureus 80%, S. pyogenes 10%. Bolhoso: S. aureus produtor de toxina. Diferencial: herpes, eczema herpético, escabiose.",
                    itens: [
                        "Diagnóstico clínico, pela história e exame. Cultura da secreção se suspeita de MRSA ou surto (SBP 2022).",
                        "<strong>Agentes:</strong> crostoso — <em>S. aureus</em> ~80%, <em>S. pyogenes</em> ~10%, os dois ~10%; bolhoso — <em>S. aureus</em> produtor de exotoxina (forma localizada da pele escaldada) (SBP 2022).",
                        "<strong>Secundário:</strong> sobre dermatite atópica, escabiose, picadas, varicela, herpes, trauma (SBP 2022).",
                        "<strong>Diferencial:</strong> herpes simples e zoster, eczema herpético, escabiose, dermatite atópica e seborreica, tinha, candidíase. Recorrente ou sem resposta: rever o diagnóstico (SBP 2022)."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Poucas lesões: mupirocina (> 3 meses) ou ácido fusídico por 5–7 dias. Sistêmico se > 5 lesões, bolhoso, febre, profundo: cefalexina (alérgico ou MRSA: outras).",
                    alerta: true,
                    itens: [
                        "<strong>Tópico</strong> (localizado, não complicado, poucas lesões): mupirocina 2% (maiores de 3 meses) ou ácido fusídico 2% (pode em menores de 3 meses), 2 a 3 vezes ao dia por 5 a 7 dias (Whitebook). Bacitracina não é mais recomendada (SBP 2022).",
                        "Sistêmico (Whitebook) se: acometimento profundo, mais de 5 lesões, bolhoso, febre, linfadenomegalia, faringite com lesões perto da boca, couro cabeludo, surto de glomerulonefrite pós-estreptocócica. A SBP acrescenta: mais de 2% da superfície corporal e menores de 2 anos (SBP 2022). Sempre junto com o tópico.",
                        "↳ Esquema A (empírico): cefalexina 25–50 mg/kg/dia de 6/6h por 7 a 10 dias.",
                        "↳ Esquema B (alérgico à penicilina): eritromicina, claritromicina, sulfametoxazol-trimetoprima ou clindamicina.",
                        "↳ Esquema C (MRSA): sulfametoxazol-trimetoprima, clindamicina ou doxiciclina (a partir de 8 anos).",
                        "<strong>Higiene</strong> (Whitebook): lavar com água morna e sabonete neutro para remover as crostas; unhas curtas e limpas; não compartilhar toalhas e roupas de cama. Clorexidina degermante só nos recorrentes ou com suspeita de MRSA.",
                        "<strong>Recorrente:</strong> cultura e descolonização do paciente e da família (SBP 2022). Voltar à escola depois de iniciado o tratamento, com as lesões cobertas."
                    ],
                    remedios: ["pele_mupi", "fusidico_impetigo", "cefalexina_impetigo", "eritro_impetigo", "claritro_impetigo", "smx_impetigo", "clinda_vo_impetigo", "doxi_impetigo"]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Celulite, osteomielite, artrite, pneumonia, sepse; glomerulonefrite pós-estreptocócica, escarlatina, psoríase gutata.",
                    itens: [
                        "Em geral cura sem cicatriz (SBP 2022).",
                        "<strong>Infecciosas:</strong> celulite, osteomielite, artrite, pneumonia, sepse (SBP 2022).",
                        "<strong>Não infecciosas:</strong> glomerulonefrite pós-estreptocócica, escarlatina, psoríase gutata (SBP 2022)."
                    ]
                }
            ]
        },
        {
            titulo: "Foliculite",
            icone: "🔴",
            cor: "#e11d48",
            secoes: [
                {
                    titulo: "Apresentação clínica e sinais e sintomas",
                    icone: "👁️",
                    resumo: "Pápulas e pústulas com halo vermelho centradas no pelo; couro cabeludo, membros e face.",
                    itens: ["Pápulas e/ou pústulas perifoliculares sobre base eritematosa; couro cabeludo, membros e face (principalmente perioral); pode surgir após picadas e traumas (SBP 2022)."]
                },
                {
                    titulo: "Critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Clínico. S. aureus é o principal. Diferencial: acne, rosácea, hidradenite, escabiose, ceratose pilar.",
                    itens: [
                        "Diagnóstico clínico; exames só se não melhora com o tratamento habitual (SBP 2022).",
                        "<strong>Agente:</strong> a causa bacteriana é a infecciosa mais frequente; <em>S. aureus</em> é o principal (SBP 2022).",
                        "<strong>Diferencial:</strong> acne, rosácea papulopustular, foliculite por fármacos, hidradenite supurativa, escabiose, ceratose pilar (SBP 2022)."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Poucas pústulas: melhora sozinha. Extensa: antisséptico e antibiótico tópico (mupirocina, ácido fusídico).",
                    alerta: true,
                    itens: [
                        "Poucas pústulas resolvem sozinhas em alguns dias (SBP 2022).",
                        "<strong>Extensa:</strong> antissépticos e antibiótico tópico: mupirocina, ácido fusídico ou clindamicina tópica (SBP 2022)."
                    ],
                    remedios: ["pele_mupi", "fusidico_impetigo"]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Pode evoluir para furúnculo.",
                    itens: ["A infecção pode se aprofundar e formar furúnculo (veja o próximo capítulo)."]
                }
            ]
        },
        {
            titulo: "Furúnculo, carbúnculo e abscesso",
            icone: "🔴",
            cor: "#b91c1c",
            secoes: [
                {
                    titulo: "Apresentação clínica e sinais e sintomas",
                    icone: "👁️",
                    resumo: "Nódulo vermelho, doloroso e flutuante com pústula, calor e ponto de drenagem; axilas e nádegas; bom estado geral.",
                    itens: [
                        "<strong>Furúnculo:</strong> bom estado geral, nódulo eritematoso, doloroso e flutuante com pústulas na superfície, calor local e ponto de drenagem; axilas e região glútea; único ou múltiplos (furunculose) (SBP 2022).",
                        "<strong>Carbúnculo (antraz):</strong> dois ou mais furúnculos juntos, com vários trajetos de drenagem, mais profundo (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleFurunculo"
                },
                {
                    titulo: "Critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Clínico; ultrassom se a flutuação não é clara. S. aureus (MRSA). Diferencial: cisto inflamado, hidradenite.",
                    itens: [
                        "Infecção do folículo que se estende ao subcutâneo. Diagnóstico clínico; ultrassom ajuda quando a flutuação não é clara (SBP 2022).",
                        "<strong>Agente:</strong> <em>S. aureus</em>, considerar MRSA. Fatores de risco: eczema, obesidade, desnutrição, imunodeficiência, higiene precária, colonização por MRSA, hiperidrose, anemia (SBP 2022).",
                        "<strong>Diferencial:</strong> cisto epidermoide inflamado, hidradenite supurativa, granuloma de corpo estranho, pioderma gangrenoso, micobactéria (SBP 2022)."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Calor local e drenagem. Antibiótico (SMX-TMP ou clindamicina, ≥ 7 dias) se halo > 2 cm ou carbúnculo. Recorrente: descolonizar.",
                    alerta: true,
                    itens: [
                        "Calor local e incisão e drenagem sempre que houver flutuação, se não drenou sozinho (SBP 2022; IDSA 2014).",
                        "Antibiótico sistêmico se halo de eritema &gt; 2 cm ou carbúnculo: com ação contra MRSA, sulfametoxazol-trimetoprima ou clindamicina por pelo menos 7 dias (SBP 2022). Também se área de difícil drenagem (face, mãos, genitália), sinais sistêmicos ou imunodepressão (IDSA 2014).",
                        "A SBP não traz a dose: os cards abaixo usam a dose do Whitebook para pele (impetigo).",
                        "<strong>Furunculose de repetição:</strong> descolonizar paciente e contatos da casa com mupirocina nasal 2 vezes ao dia por 5 dias (evidência fraca) (SBP 2022)."
                    ],
                    remedios: ["smx_impetigo", "clinda_vo_impetigo", "pele_mupi"]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Celulite ao redor, furunculose de repetição; com sinais sistêmicos: tratar como celulite grave.",
                    itens: [
                        "Celulite ao redor da lesão e furunculose de repetição (SBP 2022).",
                        "Toxemia, sepse ou celulite extensa: veja o tratamento hospitalar no capítulo de celulite."
                    ]
                }
            ]
        },
        {
            titulo: "Ectima",
            icone: "🟤",
            cor: "#92400e",
            secoes: [
                {
                    titulo: "Apresentação clínica e sinais e sintomas",
                    icone: "👁️",
                    resumo: "Começa como impetigo, ulcera e forma crosta escura aderente com borda elevada; períneo, nádegas e extremidades.",
                    itens: [
                        "Começa como impetigo não bolhoso, com evolução mais arrastada: ulcera até a derme e forma crosta escura, seca e aderente e escara de bordas elevadas violáceas (SBP 2022).",
                        "Poucas lesões, às vezes múltiplas em estágios diferentes; períneo, nádegas e extremidades distais (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleEctima"
                },
                {
                    titulo: "Critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Clínico. S. pyogenes (± S. aureus); ectima gangrenoso: Pseudomonas. Diferencial: leishmaniose, vasculite.",
                    itens: [
                        "Infecção da derme; diagnóstico clínico (SBP 2022).",
                        "<strong>Agentes:</strong> <em>S. pyogenes</em>, com <em>S. aureus</em> secundário; ectima gangrenoso: <em>Pseudomonas aeruginosa</em> (SBP 2022).",
                        "<strong>Diferencial:</strong> leishmaniose, vasculite leucocitoclástica, CIVD, êmbolos sépticos da endocardite (SBP 2022)."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Antibiótico sistêmico oral (mesmo esquema sistêmico do impetigo).",
                    itens: ["Antibiótico sistêmico (SBP 2022); a SBP não define a droga oral. Como é infecção por estreptococo e estafilococo, usar o esquema sistêmico do impetigo (cefalexina; alérgico: macrolídeo ou clindamicina)."],
                    remedios: ["cefalexina_impetigo", "claritro_impetigo", "clinda_vo_impetigo"]
                },
                {
                    titulo: "Tratamento hospitalar",
                    icone: "🏥",
                    resumo: "Internar se extenso, gangrenoso ou imunodeprimido. EV com cobertura para Pseudomonas.",
                    alerta: true,
                    grupos: [
                        {
                            nome: "🏥 Critérios de internação",
                            escore: internacaoPele("internacao_ectima",
                                ["Sepse ou choque"],
                                ["Ectima extenso", "Ectima gangrenoso (suspeita de Pseudomonas)", "Imunodepressão ou neutropenia"],
                                ["Falha do antibiótico oral"],
                                "Poucas lesões, criança bem",
                                "SBP 2022: casos extensos com antibiótico EV; investigar imunodeficiência no ectima gangrenoso.")
                        },
                        {
                            nome: "💉 Tratamento",
                            itens: ["De preferência EV com cobertura para <em>P. aeruginosa</em> (SBP 2022). A SBP não define o antibiótico: cefepime ou ceftazidima abaixo; ajustar pela cultura."],
                            remedios: ["cefepime", "ceftazidima"]
                        }
                    ]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Depende do estado imunológico. Ectima gangrenoso: investigar imunodeficiência.",
                    itens: ["O prognóstico depende do estado geral, imunológico e da doença de base. Investigar imunodeficiência, mesmo em criança sem doença conhecida (SBP 2022)."]
                }
            ]
        },
        {
            titulo: "Paroníquia e dactilite bolhosa",
            icone: "🖐️",
            cor: "#7c3aed",
            secoes: [
                {
                    titulo: "Apresentação clínica e sinais e sintomas",
                    icone: "👁️",
                    resumo: "Paroníquia: prega da unha vermelha, inchada, com pus e dor latejante. Dactilite: bolha oval na ponta do dedo.",
                    itens: [
                        "<strong>Paroníquia aguda:</strong> após trauma da cutícula: edema, eritema, sensibilidade e pus na prega proximal, às vezes nas laterais; bolhas e dor latejante (SBP 2022).",
                        "<strong>Dactilite bolhosa:</strong> bolha oval de 10 a 30 mm na falange distal de um ou mais dedos, de 2 a 16 anos; pode exulcerar (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleParoniquia"
                },
                {
                    titulo: "Critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Clínico; cultura na dactilite. S. aureus e estreptococo. Diferencial: panarício herpético, impetigo bolhoso, bolha de fricção.",
                    itens: [
                        "Diagnóstico clínico; na dactilite, a cultura ajuda a diferenciar e orientar o tratamento (SBP 2022).",
                        "<strong>Agentes:</strong> <em>S. aureus</em> e estreptococo β-hemolítico (SBP 2022).",
                        "<strong>Diferencial da dactilite:</strong> panarício herpético, impetigo bolhoso, bolha de fricção (SBP 2022)."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Paroníquia: tópico; com pus: drenar + cefalosporina de 1ª geração ou amoxi-clavulanato por 10 dias. Dactilite: drenar + cefalexina.",
                    alerta: true,
                    itens: [
                        "<strong>Paroníquia aguda:</strong> antibiótico tópico; com pus, drenagem e antibiótico oral: amoxicilina-clavulanato ou cefalosporina de 1ª geração por 10 dias (SBP 2022).",
                        "<strong>Dactilite bolhosa:</strong> incisão e drenagem, compressas mornas e antibiótico oral resistente à betalactamase, como a cefalexina (SBP 2022).",
                        "A SBP não traz a dose: os cards abaixo usam a dose do Whitebook para pele (impetigo e erisipela)."
                    ],
                    remedios: ["pele_mupi", "fusidico_impetigo", "cefalexina_impetigo", "clav_erisipela"]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Distrofia ungueal permanente; paroníquia crônica com a manipulação.",
                    itens: ["A matriz da unha da criança é frágil: mesmo a paroníquia leve pode causar distrofia ungueal permanente; a manipulação crônica leva à paroníquia crônica, com crises agudas (SBP 2022)."]
                }
            ]
        },
        {
            titulo: "Dermatite estreptocócica perianal",
            icone: "🩹",
            cor: "#db2777",
            secoes: [
                {
                    titulo: "Apresentação clínica e sinais e sintomas",
                    icone: "👁️",
                    resumo: "Eritema brilhante e bem delimitado ao redor do ânus, prurido, dor ao evacuar, fezes com sangue. Meninos de 6 meses a 10 anos.",
                    itens: [
                        "Mais em meninos de 6 meses a 10 anos (SBP 2022).",
                        "Prurido anal (78–100%), dor retal (50%), defecação dolorosa (50%), fezes com estrias de sangue (20–35%) (SBP 2022).",
                        "Erupção eritematosa, brilhante e bem demarcada ao redor do ânus, que se espalha; fissuras dolorosas ou exsudato no quadro crônico; sintomas sistêmicos raros (SBP 2022)."
                    ]
                },
                {
                    titulo: "Critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Swab e cultura (estreptococo do grupo A). Diferencial: dermatite de fralda, candidíase, abuso sexual.",
                    itens: [
                        "Confirmar com swab e cultura do exsudato: estreptococo β-hemolítico do grupo A. ASLO e anti-estreptoquinase não são confiáveis (SBP 2022).",
                        "<strong>Diferencial:</strong> dermatite de fralda, candidíase, trauma por higiene ou manipulação, dermatite de contato, alergia alimentar, doença inflamatória intestinal, histiocitose e abuso sexual (SBP 2022)."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Sempre sistêmico: penicilina, amoxicilina ou cefalosporina. Swab de controle para garantir a erradicação.",
                    alerta: true,
                    itens: [
                        "Tratamento sistêmico: penicilina, amoxicilina ou cefalosporinas, com melhora rápida (SBP 2022).",
                        "Colher swab perianal e cultura para garantir a erradicação (SBP 2022).",
                        "A SBP não traz a dose: os cards abaixo usam a dose do Whitebook para infecção estreptocócica de pele (erisipela)."
                    ],
                    remedios: ["amox_erisipela", "benza", "cefalexina_erisipela"]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Desconforto prolongado, constipação (50%), raramente proctite e abscesso; transmissão a irmãos e pais.",
                    itens: ["Atraso no diagnóstico é comum: constipação em 50%, desconforto prolongado, raramente proctite e abscesso; maior transmissão a irmãos e pais (SBP 2022)."]
                }
            ]
        },
        {
            titulo: "Erisipela",
            icone: "🟠",
            cor: "#ea580c",
            secoes: [
                {
                    titulo: "Apresentação clínica e sinais e sintomas",
                    icone: "👁️",
                    resumo: "Febre e calafrios até 48 h antes; placa vermelha elevada e bem delimitada, ardor e dor, nas pernas ou na face.",
                    itens: [
                        "Mal-estar, febre e calafrios até 48 h antes da lesão (SBP 2022).",
                        "Placa eritematosa bem delimitada e elevada, mais nas pernas e depois na face; ardor, dor e às vezes prurido; adenopatia comum. Formas graves com vesículas, bolhas e necrose (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleErisipela"
                },
                {
                    titulo: "Critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Clínico, sem exames. Estreptococo do grupo A. Diferencial: celulite (borda mal definida, lenta), fasciíte.",
                    itens: [
                        "Infecção da derme superficial e dos linfáticos superficiais; diagnóstico clínico, sem exames. Leucocitose e PCR não mudam a conduta; hemograma e cultura só no imunocomprometido (SBP 2022).",
                        "<strong>Agente:</strong> estreptococo β-hemolítico do grupo A. Fatores de risco: obesidade, linfedema, intertrigo, úlceras, eczema; na face, infecção recente da nasofaringe (SBP 2022).",
                        "<strong>Diferencial:</strong> celulite (limites mal definidos, evolução lenta); dor desproporcional, cor violácea ou bolhas hemorrágicas: fasciíte necrosante."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Amoxicilina, amoxi-clavulanato, penicilina benzatina (dose única) ou cefalexina por 5 dias. Repouso e membro elevado.",
                    alerta: true,
                    itens: [
                        "Formas leves (Whitebook), escolher uma: amoxicilina 50 mg/kg/dia, amoxicilina-clavulanato 30–50 mg/kg/dia, penicilina benzatina IM dose única (&lt; 27 kg: 600.000 UI; ≥ 27 kg: 1.200.000 UI) ou cefalexina 50–100 mg/kg/dia, por 5 dias. A penicilina é a 1ª linha também na SBP 2022.",
                        "<strong>Cuidados</strong> (Whitebook): repouso relativo, membro elevado, identificar e tratar fatores predisponentes (fissuras, descamação). Compressas frias, hidratação e antitérmico (SBP 2022).",
                        "<strong>Recorrente:</strong> penicilina oral ou eritromicina 2 vezes ao dia por 4 a 5 semanas, ou penicilina benzatina IM a cada 2 a 4 semanas; tratar o fator predisponente (SBP 2022).",
                        "Retorno em 48 a 72 h; antes se a borda passar da marcação, febre persistir ou a dor aumentar."
                    ],
                    remedios: ["amox_erisipela", "clav_erisipela", "benza", "cefalexina_erisipela"]
                },
                {
                    titulo: "Tratamento hospitalar",
                    icone: "🏥",
                    resumo: "Internar: grave, falha do oral, imunossupressão, sinais sistêmicos, sem via oral, lactente. Ceftriaxona, cefazolina ou oxacilina EV.",
                    alerta: true,
                    grupos: [
                        {
                            nome: "🏥 Critérios de internação",
                            escore: internacaoPele("internacao_erisipela",
                                ["Sepse ou choque", "Necrose, bolhas hemorrágicas ou dor desproporcional (suspeita de fasciíte)"],
                                ["Erisipela grave", "Sinais sistêmicos", "Imunossupressão", "Falha do tratamento oral", "Impossibilidade de administração oral", "Lactente"],
                                ["Baixa adesão ou dificuldade de retorno"],
                                "Forma leve em criança bem",
                                "Whitebook: erisipela grave, falha do tratamento oral, imunossupressão, sinais sistêmicos ou impossibilidade de via oral. SBP 2022: também lactentes, imunocomprometidos, baixa adesão e falha ambulatorial.")
                        },
                        {
                            nome: "💉 Tratamento",
                            itens: [
                                "<strong>Escolher uma</strong> (Whitebook): ceftriaxona 50–75 mg/kg/dia de 12/12 ou 24/24h, cefazolina 50–100 mg/kg/dia de 8/8h ou oxacilina 100–150 mg/kg/dia de 6/6h.",
                                "Trocar para via oral quando houver melhora clínica e tolerância (Whitebook), completando com o tratamento ambulatorial.",
                                "<strong>Cuidados</strong> (Whitebook): dieta oral própria para a idade, hidratação conforme a clínica, membro elevado, repouso relativo. Dor ou febre: dipirona ou paracetamol; vômitos: ondansetrona ou bromoprida."
                            ],
                            remedios: ["cef_erisipela", "cefazolina_erisipela", "oxa_erisipela", "dip_inj", "ondan_ev"]
                        }
                    ]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Abscesso, escarlatina, pneumonia, meningite, necrose, púrpura, tromboflebite. Abscesso ou gangrena: desbridamento.",
                    itens: [
                        "Formação de abscesso, escarlatina, pneumonia, meningite, necrose da pele, púrpura hemorrágica, tromboflebite (SBP 2022).",
                        "Abscesso ou gangrena: desbridamento cirúrgico. O prognóstico é bom, com resposta rápida ao antibiótico oral na criança (SBP 2022)."
                    ]
                }
            ]
        },
        {
            titulo: "Celulite",
            icone: "🔶",
            cor: "#c2410c",
            secoes: [
                {
                    titulo: "Apresentação clínica e sinais e sintomas",
                    icone: "👁️",
                    resumo: "Eritema, calor, dor e edema com borda mal definida e evolução lenta; febre e adenopatia. Mais nos membros inferiores.",
                    itens: [
                        "Eritema, calor, dor e edema, com limites mal definidos e evolução lenta; pode ter febre e adenopatia regional (SBP 2022).",
                        "Mais nos membros inferiores; também membros superiores, face, orelha e tronco; após cirurgia ou trauma penetrante (SBP 2022).",
                        "Marcar a borda com caneta para acompanhar a evolução."
                    ],
                    ferramenta: "ferramentaPeleCelulite"
                },
                {
                    titulo: "Critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Clínico; imagem se suspeita de abscesso ou fasciíte. Maioria por S. aureus. Diferencial: erisipela, abscesso, fasciíte.",
                    itens: [
                        "Infecção da derme profunda e do subcutâneo. Diagnóstico pela história e exame; hemocultura na bacteremia/sepse; ultrassom, tomografia ou ressonância se suspeita de coleção, abscesso ou fasciíte (SBP 2022).",
                        "<strong>Agentes:</strong> maioria por <em>S. aureus</em>; às vezes <em>H. influenzae</em> tipo b, <em>P. aeruginosa</em>, estreptococo do grupo A. Fatores de risco: obesidade, diabetes, imunossupressão, perda da integridade da pele (intertrigo, fissuras, úlceras, trauma) (SBP 2022).",
                        "<strong>Diferencial:</strong> erisipela (borda bem definida, rápida), abscesso (flutuação), fasciíte (dor desproporcional, violáceo). Perto do olho: capítulo de celulite periorbitária e orbitária."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Cefalexina, cefadroxila ou sulfametoxazol-trimetoprima por 7 a 14 dias. Marcar a borda e reavaliar em 48–72 h.",
                    alerta: true,
                    itens: [
                        "<strong>Celulite não complicada, escolher uma</strong> (Whitebook): cefalexina 25–100 mg/kg/dia de 6/6h, cefadroxila 30 mg/kg/dia de 12/12h ou sulfametoxazol-trimetoprima 8–12 mg TMP/kg/dia de 12/12h, por 7 a 14 dias.",
                        "A SBP também aceita amoxicilina-clavulanato; alergia imediata à penicilina: clindamicina ou macrolídeo (SBP 2022).",
                        "<strong>Suporte:</strong> elevar a área; dipirona ou paracetamol se dor ou febre (Whitebook).",
                        "Retorno em 48 a 72 h; antes se a borda passar da marcação, febre persistir ou a dor aumentar muito."
                    ],
                    remedios: ["cefalexina_celulite", "cefadroxila_celulite", "smx_celulite", "dip_gts", "pct_gts"]
                },
                {
                    titulo: "Tratamento hospitalar",
                    icone: "🏥",
                    resumo: "Internar: grave, falha do oral, recém-nascido. Purulenta/MRSA: clindamicina, SMX-TMP, linezolida ou vancomicina. Neonato: cefotaxima, ou gentamicina + vancomicina. Sem pus: oxacilina.",
                    alerta: true,
                    grupos: [
                        {
                            nome: "🏥 Critérios de internação",
                            escore: internacaoPele("internacao_celulite",
                                ["Sepse, choque ou síndrome do choque tóxico", "Suspeita de fasciíte necrosante (dor desproporcional, violáceo, bolhas hemorrágicas, crepitação)"],
                                ["Celulite grave, extensa ou de progressão rápida", "Não respondeu ao antibiótico oral em 48 a 72 h", "Recém-nascido", "Exsudato purulento com sinais de doença sistêmica", "Imunodepressão"],
                                ["Lactente pequeno, baixa adesão ou dificuldade de retorno"],
                                "Celulite não complicada em criança bem",
                                "SBP 2022: hospitalizar a doença grave e a que não responde ao oral. Whitebook: celulite com indicação de internação, esquema próprio para neonatos. Sinais de fasciíte e sepse: SBP 2022 e IDSA 2014.")
                        },
                        {
                            nome: "💉 Tratamento",
                            itens: [
                                "Esquema A (Whitebook) — exsudato purulento, refratária, sinais de doença sistêmica, recorrente com condição predisponente ou MRSA prévio: clindamicina EV 20–40 mg/kg/dia de 6/6 ou 8/8h (máx. 2.700 mg/dia), sulfametoxazol-trimetoprima EV 8–12 mg TMP/kg/dia de 12/12h (máx. 160 mg/dose), linezolida (máx. 600 mg/dose) ou vancomicina 40–60 mg/kg/dia de 6/6h (nível sérico, máx. 4 g/dia), por 7 a 14 dias.",
                                "Esquema B (Whitebook) — recém-nascido: cefotaxima (até 1 semana: 50–100 mg/kg/dia de 12/12h; 1 a 4 semanas: 75–100 mg/kg/dia de 8/8h) ou gentamicina 4 mg/kg/dose de 24/24h + vancomicina, por 7 a 14 dias.",
                                "<strong>Grave sem pus e sem risco de MRSA:</strong> oxacilina (1ª escolha EV da SBP); cefazolina, cefuroxima ou ceftriaxona são opções. Alergia à penicilina: clindamicina ou vancomicina (SBP 2022).",
                                "<strong>Reavaliar em 24 a 48 h:</strong> melhora → via oral (tratamento ambulatorial); falha → MRSA, abscesso não drenado ou fasciíte (SBP 2022).",
                                "<strong>Cuidados</strong> (Whitebook): dieta oral própria para a idade; dor ou febre: dipirona ou paracetamol; vômitos: ondansetrona."
                            ],
                            remedios: ["clindamicina", "linezolida_ev", "vancomicina", "cefotax_neo_sepse", "genta_neo_sepse", "oxacilina", "cefazolina_erisipela", "dip_inj", "ondan_ev"]
                        }
                    ]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Abscesso, bacteremia, fasciíte. Falha indica germe resistente ou outra bactéria.",
                    itens: [
                        "Abscesso, bacteremia/sepse, fasciíte necrosante.",
                        "Falha do tratamento indica organismo resistente ou outra bactéria; atenção a imunossupressão e doença hepática ou renal crônica (SBP 2022)."
                    ]
                }
            ]
        },
        {
            titulo: "Celulite periorbitária e orbitária",
            icone: "👁️",
            cor: "#0f766e",
            secoes: [
                {
                    titulo: "Apresentação clínica e sinais e sintomas",
                    icone: "👁️",
                    resumo: "Febre, edema e hiperemia palpebral, dor ocular; na orbitária: dor ao mexer o olho, proptose, diplopia, queda da visão.",
                    itens: [
                        "<strong>Nas duas:</strong> edema palpebral, eritema e dor ocular; quemose (Whitebook).",
                        "<strong>Orbitária</strong> (Whitebook): febre, dor à movimentação ocular, queixa de queda da acuidade visual e diplopia; proptose e oftalmoplegia. Também cefaleia, alteração de sensório, náuseas e vômitos (SNC); mal-estar, descarga nasal e tosse.",
                        "<strong>Sinais de alarme</strong> (Whitebook): febre, proptose, dor à movimentação ocular, redução da acuidade visual, alteração da visão de cores, alteração dos reflexos pupilares."
                    ]
                },
                {
                    titulo: "Critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Proptose, dor ao mexer o olho, oftalmoplegia ou queda da visão = orbitária. Tomografia com contraste. Em geral complicação de sinusite.",
                    itens: [
                        "Orbitária se: proptose, dor à movimentação ocular, oftalmoplegia com diplopia ou queda da acuidade visual — achados que nunca estão na pré-septal (Whitebook).",
                        "Tomografia de órbitas e seios com contraste na suspeita de orbitária ou abscesso. Classificação de Chandler: conduta de sinusite.",
                        "<strong>Agentes:</strong> em geral complicação de sinusite (etmoidite): pneumococo, <em>S. aureus</em> (inclusive MRSA), estreptococos, <em>H. influenzae</em>; anaeróbios se sinusite crônica, foco odontológico ou infecção do SNC (Whitebook)."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Só a celulite pré-septal leve em criança bem: via oral com reavaliação em 24 a 48 h (conduta de sinusite).",
                    itens: ["Celulite pré-septal leve (sem proptose, olho mexe normal, visão normal), criança bem: pode ser tratada por via oral com reavaliação em 24 a 48 h — veja a conduta de sinusite."],
                    remedios: ["clav_sinusite", "cef_sinusite"]
                },
                {
                    titulo: "Tratamento hospitalar",
                    icone: "🏥",
                    resumo: "Orbitária interna sempre. Vancomicina + ceftriaxona (ou cefotaxima) por 2–3 semanas; + metronidazol se SNC, sinusite crônica ou foco dentário.",
                    alerta: true,
                    grupos: [
                        {
                            nome: "🏥 Critérios de internação",
                            escore: internacaoPele("internacao_orbitaria",
                                ["Rebaixamento, sinais de infecção do SNC ou de trombose do seio cavernoso", "Sepse ou choque"],
                                ["Celulite orbitária: proptose, dor ao mexer o olho, oftalmoplegia ou queda da visão", "Abscesso subperiosteal ou orbitário na imagem", "Pré-septal com toxemia, em lactente ou sem melhora em 24 a 48 h de antibiótico oral"],
                                ["Pré-septal sem condição de retorno"],
                                "Pré-septal leve, criança bem",
                                "Whitebook: celulite orbital na prescrição hospitalar, com avaliação da oftalmologia e nova imagem se sem melhora em 24 a 48 h. Pré-septal: conduta de sinusite (AAP 2013).")
                        },
                        {
                            nome: "💉 Tratamento",
                            itens: [
                                "<strong>Esquema A</strong> (preferencial, Whitebook): vancomicina 60 mg/kg/dia de 6/6h + ceftriaxona 100 mg/kg/dia de 12/12h.",
                                "<strong>Esquema B</strong> (alternativa à ceftriaxona): vancomicina + cefotaxima 150–200 mg/kg/dia de 8/8h (máx. 12 g/dia).",
                                "<strong>Esquema C</strong> (anaeróbios): A ou B + metronidazol 30 mg/kg/dia de 8/8h (máx. 500 mg/dose).",
                                "<strong>Duração:</strong> 2 a 3 semanas ou até a resolução (Whitebook).",
                                "<strong>Cuidados</strong> (Whitebook): sinais vitais de 6/6 h; avaliação da oftalmologia; acuidade visual e reflexos pupilares todos os dias; sem melhora em 24 a 48 h: nova imagem (abscesso) e avaliar cirurgia; jejum se cirurgia, com hidratação basal."
                            ],
                            remedios: ["vanco_orbitaria", "cef_orbitaria", "cefotax_orbitaria", "metro_orbitaria", "dip_inj", "ondan_ev"]
                        }
                    ]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Abscesso subperiosteal ou orbitário, cegueira, tromboflebite do seio cavernoso, abscesso cerebral.",
                    alerta: true,
                    itens: ["<strong>Complicações</strong> (Whitebook): abscesso subperiosteal, abscesso orbitário, cegueira, tromboflebite do seio cavernoso, abscesso cerebral."]
                }
            ]
        },
        {
            titulo: "Síndrome da pele escaldada estafilocócica",
            icone: "🚨",
            cor: "#9f1239",
            secoes: [
                {
                    titulo: "Apresentação clínica e sinais e sintomas",
                    icone: "👁️",
                    resumo: "Febre e irritabilidade; em 24–48 h eritema doloroso, bolhas flácidas, Nikolsky positivo, rágades periorais, sem mucosa.",
                    alerta: true,
                    itens: [
                        "Emergência pediátrica, mais em menores de 2 anos (SBP 2022).",
                        "Irritabilidade, febre e mal-estar; em 24 a 48 h, erupção dolorosa: eritema e fissuras na face e nas dobras (virilha, axilas, pescoço), depois bolhas grandes, finas e flácidas (SBP 2022).",
                        "Sinal de Nikolsky (a pele descola ao toque), rágades periorais, sem envolvimento de mucosa (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleSsss"
                },
                {
                    titulo: "Critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Clínico; culturas costumam ser negativas. Toxina do S. aureus de foco distante. Diferencial: impetigo bolhoso, Stevens-Johnson/NET (tem mucosa).",
                    itens: [
                        "Diagnóstico clínico; hemocultura e cultura da bolha costumam ser negativas (SBP 2022).",
                        "<strong>Agente:</strong> <em>S. aureus</em> produtor de exotoxinas A e B, de foco distante: vias aéreas, ouvido, conjuntiva, coto umbilical (SBP 2022).",
                        "<strong>Diferencial:</strong> impetigo bolhoso (toxina só local), choque tóxico, Kawasaki, celulite, queimadura, Stevens-Johnson/NET (com lesão de mucosa), epidermólise bolhosa. Surtos em creches e berçários (SBP 2022)."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Só a forma leve localizada: antibiótico oral e seguimento próximo.",
                    itens: [
                        "<strong>Forma leve localizada:</strong> antibiótico oral e acompanhamento rigoroso na atenção primária (SBP 2022). Tópico isolado não funciona.",
                        "A SBP não traz a droga oral; como é estafilocócica, os cards orais de pele abaixo (cefalexina; alérgico ou MRSA: clindamicina) usam a dose do Whitebook para impetigo."
                    ],
                    remedios: ["cefalexina_impetigo", "clinda_vo_impetigo"]
                },
                {
                    titulo: "Tratamento hospitalar",
                    icone: "🏥",
                    resumo: "Interna quase sempre. Oxacilina (+ clindamicina); vancomicina só se MRSA. Grave: unidade de queimados. Isolar.",
                    alerta: true,
                    grupos: [
                        {
                            nome: "🏥 Critérios de internação",
                            escore: internacaoPele("internacao_ssss",
                                ["Descolamento extenso, desidratação importante, hipotermia ou choque"],
                                ["Pele escaldada (exceto forma leve localizada com seguimento garantido)", "Recém-nascido ou lactente pequeno", "Dor que impede alimentação ou hidratação"],
                                [],
                                "Forma leve localizada com seguimento rigoroso",
                                "SBP 2022: casos graves hospitalizados, de preferência em unidade de queimados; forma leve localizada pode ser tratada com antibiótico oral e seguimento rigoroso.")
                        },
                        {
                            nome: "💉 Tratamento",
                            itens: [
                                "Antibiótico sistêmico sempre (SBP 2022).",
                                "Oxacilina é a escolha; clindamicina deve ser considerada de 1ª linha (reduz a toxina); vancomicina só se suspeita de MRSA (SBP 2022).",
                                "<strong>Grave:</strong> de preferência em unidade de queimados; controlar desidratação, temperatura, dor e nutrição. Evitar sulfadiazina de prata (SBP 2022).",
                                "Isolar o paciente (SBP 2022)."
                            ],
                            remedios: ["oxacilina", "clindamicina", "vancomicina"]
                        }
                    ]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Hipotermia, perda de líquidos e distúrbios eletrolíticos. Mortalidade < 5%; cura em 2 semanas sem cicatriz.",
                    itens: [
                        "Pele muito desnuda: hipotermia, perda de líquidos e distúrbios hidroeletrolíticos (SBP 2022).",
                        "Mortalidade infantil &lt; 5%. Febre cai em poucos dias, descamação em ~5 dias, cura em 2 semanas, geralmente sem cicatriz (SBP 2022)."
                    ]
                }
            ]
        },
        {
            titulo: "Fasciíte necrosante",
            icone: "🚨",
            cor: "#7f1d1d",
            secoes: [
                {
                    titulo: "Apresentação clínica e sinais e sintomas",
                    icone: "👁️",
                    resumo: "Parece celulite, mas a dor é desproporcional; em 24–72 h fica violácea, com bolhas hemorrágicas e toxemia.",
                    alerta: true,
                    itens: [
                        "Início leve, parecendo erisipela ou celulite, mas com dor desproporcional (SBP 2022).",
                        "Em 24 a 72 h: lesão eritemato-violácea, limites mal definidos, vesículas hemorrágicas, endurecimento, edema e dor além do eritema; febre, letargia, confusão, toxemia (SBP 2022).",
                        "<strong>Outros sinais:</strong> crepitação, anestesia da pele, progressão em horas, choque."
                    ],
                    ferramenta: "ferramentaPeleFasciite"
                },
                {
                    titulo: "Critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Clínico; não esperar imagem para chamar o cirurgião. Estreptococo A, S. aureus, gram-negativos, anaeróbios. Porta: trauma, varicela.",
                    itens: [
                        "Diagnóstico principalmente clínico; imagem ajuda se incerto (ultrassom no instável) (SBP 2022). Não atrasar o cirurgião.",
                        "<strong>Agentes:</strong> estreptococo do grupo A, <em>S. aureus</em> (MRSA), gram-negativos e anaeróbios (SBP 2022; IDSA 2014). Porta de entrada: trauma, perfuração, picada, procedimento, pós-varicela, até contusão sem ferida (SBP 2022).",
                        "<strong>Diferencial:</strong> erisipela e celulite bolhosa, abscesso, hematoma infectado, pioderma gangrenoso, piomiosite, gangrena gasosa (SBP 2022)."
                    ]
                },
                {
                    titulo: "Tratamento hospitalar",
                    icone: "🏥",
                    resumo: "Sempre UTI/centro cirúrgico. Desbridamento urgente + vancomicina ou linezolida + piperacilina-tazobactam ou meropenem, + clindamicina.",
                    alerta: true,
                    grupos: [
                        {
                            nome: "🏥 Critérios de internação",
                            itens: ["<strong>Toda suspeita de fasciíte necrosante:</strong> internar em UTI e chamar o cirurgião já (SBP 2022). Choque: conduta de sepse."]
                        },
                        {
                            nome: "💉 Tratamento",
                            itens: [
                                "Desbridamento cirúrgico precoce é essencial (SBP 2022).",
                                "<strong>Antibiótico de amplo espectro já:</strong> cobertura de MRSA (vancomicina ou linezolida) + gram-negativos (piperacilina-tazobactam; meropenem ou imipenem se alta prevalência de ESBL) e anaeróbios (SBP 2022).",
                                "Clindamicina associada na infecção pelo estreptococo do grupo A, para reduzir a toxina (IDSA 2014).",
                                "<strong>Imunoglobulina EV:</strong> considerar com síndrome do choque tóxico estreptocócico; oxigênio hiperbárico se anaeróbios, com evidência fraca (SBP 2022)."
                            ],
                            remedios: ["vancomicina", "linezolida_ev", "meropenem", "clindamicina"]
                        }
                    ]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Sepse, CIVD, falência de múltiplos órgãos, morte (até 40%); choque tóxico estreptocócico.",
                    itens: ["Sepse, choque, coagulação intravascular disseminada, falência de múltiplos órgãos e morte em até 40%; síndrome do choque tóxico estreptocócico (SBP 2022)."]
                }
            ]
        }
    ],

    citacoes: { "Whitebook": 3, "SBP 2022": 0, "IDSA 2014": 1, "AAP 2013": 4 },
    fontes: [
        "Sociedade Brasileira de Pediatria. Departamentos Científicos de Dermatologia e Infectologia (2019-2021). Infecções Bacterianas Superficiais Cutâneas. Documento Científico, 08 de dezembro de 2022.",
        "Stevens DL, Bisno AL, Chambers HF, et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the Infectious Diseases Society of America. Clin Infect Dis 2014;59(2):e10-52. doi:10.1093/cid/ciu444",
        "Fotos: DermNet (dermnetnz.org), CC BY-NC-ND 4.0 — \"Image sourced from DermNet\", com link para a página de origem em cada foto.",
        "Whitebook (Afya). Guia de Prescrição / Pediatria: Impetigo; Celulite (03/04/2025); Celulite Orbitária em Pediatria (23/04/2026); Erisipela em Pediatria (12/03/2026). Prescrição Ambulatorial e Hospitalar.",
        "Wald ER, Applegate KE, Bordley C, et al. Clinical practice guideline for the diagnosis and management of acute bacterial sinusitis in children aged 1 to 18 years (AAP). Pediatrics 2013;132(1):e262-80. doi:10.1542/peds.2013-1071"
    ],
    revisao: "10/2026"
});
