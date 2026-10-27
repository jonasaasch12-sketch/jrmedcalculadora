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

// Cada doença é um bloco (capítulo), na ordem pedida pelo Dr. Jonas:
// definição e critérios diagnósticos → agentes → apresentação clínica → diferencial →
// complicações → quando internar → tratamento ambulatorial → tratamento hospitalar.
registrarConduta({
    id: "pele_bacteriana",
    nome: "Infecções bacterianas de pele e partes moles",
    categoria: "Dermatologia",
    cor: "#be185d",
    kw: "impetigo bolhoso crostoso foliculite furunculo carbunculo abscesso ectima erisipela celulite celulite orbitaria periorbitaria fasciite necrosante sindrome da pele escaldada estafilococica paroniquia dactilite bolhosa dermatite perianal estreptococica piodermite staphylococcus aureus estreptococo mrsa",
    resumo: "Uma página por doença: impetigo, foliculite, furúnculo, ectima, paroníquia, dermatite perianal, erisipela, celulite, celulite orbitária, pele escaldada e fasciíte necrosante — diagnóstico, agentes, clínica, complicações e tratamento.",
    legenda: "Conduta conforme a <strong>SBP – Departamentos de Dermatologia e Infectologia (2022)</strong>, o <strong>Whitebook</strong> (impetigo, celulite, celulite orbitária e erisipela) e a <strong>IDSA (2014)</strong>. Fotos reais do DermNet, com crédito. Toque no nome da doença no índice acima.",

    blocos: [
        {
            titulo: "Visão geral",
            icone: "🧭",
            cor: "#0284c7",
            subtitulo: "Quais são as infecções, quando internar e o que fazer na chegada.",
            secoes: [
                {
                    titulo: "Quais são as infecções bacterianas de pele",
                    icone: "🔎",
                    resumo: "Classificadas pela profundidade: epiderme → folículo → derme → subcutâneo → fáscia. Agentes: S. aureus e S. pyogenes.",
                    itens: [
                        "As piodermites são classificadas pela <strong>profundidade e região</strong> da pele acometida (SBP 2022). O diagnóstico é <strong>clínico</strong>.",
                        "<strong>Principais agentes:</strong> <em>Staphylococcus aureus</em> e <em>Streptococcus pyogenes</em> (estreptococo β-hemolítico do grupo A).",
                        "Cultura da secreção quando há suspeita de <strong>MRSA</strong>, surto, recorrência ou falha do tratamento (SBP 2022)."
                    ],
                    tabela: {
                        colunas: ["Infecção", "Camada", "Como é"],
                        linhas: [
                            ["Impetigo", "Epiderme", "Crostas cor de mel ou bolhas flácidas"],
                            ["Foliculite", "Folículo", "Pápulas e pústulas centradas no pelo"],
                            ["Furúnculo / carbúnculo", "Folículo → subcutâneo", "Nódulo vermelho, doloroso, flutuante"],
                            ["Ectima", "Derme", "Úlcera com crosta escura e borda elevada"],
                            ["Erisipela", "Derme superficial e linfáticos", "Placa vermelha elevada, borda bem definida"],
                            ["Celulite", "Derme profunda e subcutâneo", "Eritema, calor, edema, borda mal definida"],
                            ["Fasciíte necrosante", "Fáscia", "Dor desproporcional, violáceo, toxemia"]
                        ]
                    }
                },
                {
                    titulo: "🏥 Critérios de internação",
                    resumo: "Marque o que o paciente tem. Fasciíte e pele escaldada extensa: UTI ou unidade de queimados.",
                    alerta: true,
                    escore: {
                        id: "internacao_pele",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave.",
                        itens: [
                            { nome: "🔴 UTI / centro cirúrgico", opcoes: [[3, "Suspeita de fasciíte necrosante (dor desproporcional, violáceo, bolhas hemorrágicas, crepitação)", "🔴"]] },
                            { nome: "", opcoes: [[3, "Sepse, choque ou síndrome do choque tóxico", "🔴"]] },
                            { nome: "", opcoes: [[3, "Pele escaldada extensa (descolamento grande, desidratação, hipotermia)", "🔴"]] },
                            { nome: "🟠 Internar", opcoes: [[2, "Celulite orbitária (proptose, dor ao mexer o olho, queda da visão)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Síndrome da pele escaldada (exceto forma leve localizada com seguimento garantido)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Erisipela grave, com sinais sistêmicos, imunossupressão ou impossibilidade de via oral", "🟠"]] },
                            { nome: "", opcoes: [[2, "Celulite grave, extensa ou de progressão rápida, ou celulite no recém-nascido", "🟠"]] },
                            { nome: "", opcoes: [[2, "Falha do antibiótico oral em 48 a 72 h", "🟠"]] },
                            { nome: "", opcoes: [[2, "Imunodepressão (incluindo neutropenia) ou ectima gangrenoso", "🟠"]] },
                            { nome: "", opcoes: [[1, "Lactente pequeno, baixa adesão ou dificuldade de retorno", "🟡"]] },
                            { nome: "🟢 Tratar em casa", opcoes: [[0, "Impetigo, foliculite, furúnculo, paroníquia ou celulite/erisipela leve em criança bem", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI / cirurgia", cor: "#dc2626", texto: "Ressuscitação (conduta de sepse), antibiótico EV de amplo espectro, cirurgião já na suspeita de fasciíte." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Abrir o \"Tratamento hospitalar\" da doença, marcar a borda, reavaliar em 24 a 48 h." };
                            if (g === 1) return { num: "?", rotulo: "Considerar internar", cor: "#ca8a04", texto: "Se tratar em casa, garantir retorno em 24 a 48 h." };
                            return { num: "🏠", rotulo: "Tratamento em casa", cor: "#16a34a", texto: "Abrir o \"Tratamento ambulatorial\" da doença, com retorno se piorar ou sem melhora em 48 a 72 h." };
                        },
                        nota: "SBP 2022: hospitalizar a celulite grave ou sem resposta ao oral; erisipela em lactentes, imunocomprometidos, baixa adesão ou falha ambulatorial; pele escaldada grave em unidade de queimados. Whitebook (erisipela): internar erisipela grave, falha do oral, imunossupressão, sinais sistêmicos ou impossibilidade de via oral. Os demais critérios vêm dos sinais de gravidade (SBP 2022; IDSA 2014)."
                    }
                },
                {
                    titulo: "Na chegada: gravidade, exames, drenagem e reavaliação",
                    icone: "🚨",
                    resumo: "Marcar a borda, sinais vitais, hemocultura se toxemia, ultrassom se dúvida de abscesso, drenar o que flutua, reavaliar em 48 h.",
                    itens: [
                        "<strong>Marcar a borda</strong> do eritema e anotar a hora. <strong>Sinais vitais e perfusão</strong>; sepse ou choque: conduta de <strong>sepse</strong>.",
                        "<strong>Hemocultura</strong> se toxemia, imunodepressão, sepse ou celulite extensa; cultura da secreção ou da punção (SBP 2022).",
                        "<strong>Ultrassom</strong> se não está claro se há abscesso (SBP 2022).",
                        "<strong>Abscesso ou furúnculo flutuante: incisão e drenagem</strong> (SBP 2022; IDSA 2014).",
                        "<strong>Reavaliar em 24 a 48 h</strong>: melhora → via oral; falha → MRSA, abscesso não drenado, outra bactéria ou fasciíte (SBP 2022)."
                    ]
                }
            ]
        },
        {
            titulo: "Impetigo",
            icone: "🟡",
            cor: "#ca8a04",
            secoes: [
                {
                    titulo: "Definição e critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Infecção da epiderme superficial. Diagnóstico clínico: crostas melicéricas (crostoso) ou bolhas flácidas (bolhoso).",
                    itens: [
                        "Infecção localizada na <strong>epiderme superficial</strong>; 3ª causa de infecção de pele na infância e 50–60% das infecções bacterianas cutâneas; mais no verão e no clima tropical (SBP 2022).",
                        "<strong>Diagnóstico clínico</strong>, pela história e exame. Cultura da secreção se suspeita de MRSA ou surto (SBP 2022).",
                        "Mais comum entre <strong>2 e 5 anos</strong>; o <strong>bolhoso</strong> concentra 90% dos casos em menores de 2 anos (SBP 2022)."
                    ]
                },
                {
                    titulo: "Agentes etiológicos",
                    icone: "🦠",
                    resumo: "Crostoso: S. aureus (80%), S. pyogenes (10%), os dois juntos (10%). Bolhoso: S. aureus produtor de toxina.",
                    itens: [
                        "<strong>Crostoso:</strong> <em>S. aureus</em> ~80%, <em>S. pyogenes</em> ~10%, associação ~10% (SBP 2022).",
                        "<strong>Bolhoso:</strong> quase só <em>S. aureus</em> produtor de exotoxina; é a forma localizada da pele escaldada (SBP 2022).",
                        "<strong>Secundário (impetiginização):</strong> sobre dermatite atópica, escabiose, picadas, varicela, herpes, trauma (SBP 2022)."
                    ]
                },
                {
                    titulo: "Apresentação clínica: sinais e sintomas",
                    icone: "👁️",
                    resumo: "Crostoso: mácula → pústula → crosta cor de mel na face. Bolhoso: bolhas flácidas no tronco e dobras.",
                    itens: [
                        "<strong>Crostoso (não bolhoso):</strong> mácula eritematosa → vesícula/pústula → <strong>crosta cor de mel</strong> com halo vermelho; <strong>face (ao redor da boca e do nariz)</strong> e membros inferiores. <strong>Sem dor</strong>, sem sintomas sistêmicos, prurido ocasional, poupa palmas e plantas; <strong>linfadenopatia regional</strong> frequente (SBP 2022).",
                        "<strong>Bolhoso:</strong> <strong>bolhas flácidas</strong>, de parede fina e conteúdo claro, que se rompem em 1 a 3 dias e deixam base úmida e borda descamativa; <strong>sem crosta melicérica</strong>; tronco, dobras, membros (lactente), períneo, umbigo, axilas e pescoço (recém-nascido). <strong>Febre e diarreia</strong> são mais comuns (SBP 2022).",
                        "As lesões são <strong>muito contagiosas</strong>."
                    ],
                    ferramenta: "ferramentaPeleImpetigo"
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Herpes simples e zoster, eczema herpético, escabiose, dermatite atópica e seborreica, tinha, candidíase.",
                    itens: [
                        "Herpes simples, herpes zoster, <strong>eczema herpético</strong> (erupção variceliforme de Kaposi), escabiose, dermatite atópica, dermatite seborreica, tinha, candidíase (SBP 2022).",
                        "Recorrente ou sem resposta: pensar em diagnóstico alternativo (SBP 2022)."
                    ]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Celulite, osteomielite, artrite, pneumonia, sepse; não infecciosas: glomerulonefrite pós-estreptocócica, escarlatina, psoríase gutata.",
                    itens: [
                        "Em geral cura sem cicatriz (SBP 2022).",
                        "<strong>Infecciosas:</strong> celulite, osteomielite, artrite, pneumonia, sepse (SBP 2022).",
                        "<strong>Não infecciosas:</strong> <strong>glomerulonefrite pós-estreptocócica</strong>, escarlatina, psoríase gutata (SBP 2022)."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Poucas lesões: mupirocina (> 3 meses) ou ácido fusídico por 5–7 dias. Sistêmico se > 5 lesões, bolhoso, febre, profundo: cefalexina (alérgico ou MRSA: outras).",
                    alerta: true,
                    itens: [
                        "<strong>Tópico</strong> (localizado, não complicado, poucas lesões): <strong>mupirocina 2%</strong> (maiores de 3 meses) ou <strong>ácido fusídico 2%</strong> (pode em menores de 3 meses), 2 a 3 vezes ao dia por 5 a 7 dias (Whitebook). Bacitracina não é mais recomendada (SBP 2022).",
                        "<strong>Sistêmico</strong> (Whitebook) se: acometimento profundo, <strong>mais de 5 lesões</strong>, <strong>bolhoso</strong>, <strong>febre</strong>, linfadenomegalia, faringite com lesões perto da boca, <strong>couro cabeludo</strong>, surto de glomerulonefrite pós-estreptocócica. A SBP acrescenta: mais de 2% da superfície corporal e menores de 2 anos (SBP 2022). <strong>Sempre junto com o tópico.</strong>",
                        "↳ <strong>Esquema A (empírico): cefalexina</strong> 25–50 mg/kg/dia de 6/6h por 7 a 10 dias.",
                        "↳ <strong>Esquema B (alérgico à penicilina):</strong> eritromicina, claritromicina, sulfametoxazol-trimetoprima ou clindamicina.",
                        "↳ <strong>Esquema C (MRSA):</strong> sulfametoxazol-trimetoprima, clindamicina ou doxiciclina (a partir de 8 anos).",
                        "<strong>Higiene</strong> (Whitebook): lavar com água morna e sabonete neutro para remover as crostas; unhas curtas e limpas; não compartilhar toalhas e roupas de cama. <strong>Clorexidina degermante</strong> só nos recorrentes ou com suspeita de MRSA.",
                        "<strong>Recorrente:</strong> cultura e descolonização do paciente e da família (SBP 2022). Voltar à escola depois de iniciado o tratamento, com as lesões cobertas."
                    ],
                    remedios: ["pele_mupi", "fusidico_impetigo", "cefalexina_impetigo", "eritro_impetigo", "claritro_impetigo", "smx_impetigo", "clinda_vo_impetigo", "doxi_impetigo"]
                }
            ]
        },
        {
            titulo: "Foliculite",
            icone: "🔴",
            cor: "#e11d48",
            secoes: [
                {
                    titulo: "Definição e critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Inflamação superficial do folículo piloso: pápulas e pústulas perifoliculares. Diagnóstico clínico.",
                    itens: [
                        "Inflamação <strong>superficial do folículo piloso</strong>: <strong>pápulas e/ou pústulas perifoliculares</strong> sobre base eritematosa (SBP 2022).",
                        "Diagnóstico clínico; exames só se não melhora com o tratamento habitual (SBP 2022)."
                    ]
                },
                {
                    titulo: "Agentes etiológicos",
                    icone: "🦠",
                    resumo: "Bacteriana é a causa infecciosa mais comum; S. aureus é o principal.",
                    itens: ["Causa bacteriana é a infecciosa mais frequente; <strong><em>S. aureus</em></strong> é o principal agente (SBP 2022)."]
                },
                {
                    titulo: "Apresentação clínica: sinais e sintomas",
                    icone: "👁️",
                    resumo: "Pústulas com halo vermelho no couro cabeludo, membros e face (perioral); pode vir após picadas e traumas.",
                    itens: ["Couro cabeludo e membros, também face (principalmente perioral); pode surgir após <strong>picadas de inseto e traumas</strong> (SBP 2022)."]
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Acne, rosácea, foliculite por fármacos, hidradenite, escabiose, ceratose pilar.",
                    itens: ["Acne, rosácea papulopustular, foliculite por fármacos ou outros agentes, hidradenite supurativa, escabiose, ceratose pilar (SBP 2022)."]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Poucas pústulas: melhora sozinha. Extensa: antisséptico e antibiótico tópico (mupirocina, ácido fusídico).",
                    alerta: true,
                    itens: [
                        "Poucas pústulas resolvem sozinhas em alguns dias (SBP 2022).",
                        "<strong>Extensa:</strong> antissépticos e <strong>antibiótico tópico</strong>: mupirocina, ácido fusídico ou clindamicina tópica (SBP 2022)."
                    ],
                    remedios: ["pele_mupi", "fusidico_impetigo"]
                }
            ]
        },
        {
            titulo: "Furúnculo, carbúnculo e abscesso",
            icone: "🔴",
            cor: "#b91c1c",
            secoes: [
                {
                    titulo: "Definição e critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Furúnculo: infecção do folículo até o subcutâneo, nódulo flutuante. Carbúnculo: 2 ou mais furúnculos juntos.",
                    itens: [
                        "<strong>Furúnculo:</strong> infecção do folículo piloso que se estende até o <strong>tecido subcutâneo</strong>, com abscesso e necrose do folículo (SBP 2022).",
                        "<strong>Carbúnculo (antraz):</strong> coalescência de <strong>dois ou mais furúnculos</strong>, com vários trajetos de drenagem, mais profundo (SBP 2022).",
                        "Diagnóstico clínico; <strong>ultrassom</strong> ajuda quando a flutuação não é clara (SBP 2022)."
                    ]
                },
                {
                    titulo: "Agentes etiológicos e fatores de risco",
                    icone: "🦠",
                    resumo: "S. aureus (inclusive MRSA). Risco: eczema, obesidade, desnutrição, imunodeficiência, higiene precária, colonização por MRSA.",
                    itens: [
                        "<strong><em>S. aureus</em></strong>, que entra pelo folículo; considerar <strong>MRSA</strong> (SBP 2022).",
                        "<strong>Fatores de risco:</strong> eczema, diabetes, desnutrição, imunodeficiência, obesidade, higiene precária, colonização crônica por MRSA, hiperidrose, anemia (SBP 2022)."
                    ]
                },
                {
                    titulo: "Apresentação clínica: sinais e sintomas",
                    icone: "👁️",
                    resumo: "Nódulo vermelho, doloroso e flutuante com pústula, calor e ponto de drenagem; axilas e nádegas; bom estado geral.",
                    itens: ["Bom estado geral, <strong>nódulo eritematoso, doloroso e flutuante</strong> com pústulas na superfície, calor local e ponto de drenagem; axilas e região glútea; único ou múltiplos (furunculose) (SBP 2022)."],
                    ferramenta: "ferramentaPeleFurunculo"
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Cisto epidermoide inflamado, hidradenite, granuloma de corpo estranho, pioderma gangrenoso, micobactéria.",
                    itens: ["Cisto epidermoide inflamado, hidradenite supurativa, granuloma de corpo estranho, pioderma gangrenoso, infecção por micobactéria (SBP 2022)."]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Calor local e drenagem. Antibiótico (SMX-TMP ou clindamicina, ≥ 7 dias) se halo > 2 cm ou carbúnculo. Recorrente: descolonizar.",
                    alerta: true,
                    itens: [
                        "<strong>Calor local</strong> e <strong>drenagem</strong> sempre que houver flutuação, se não drenou sozinho (SBP 2022).",
                        "<strong>Antibiótico sistêmico</strong> se <strong>halo de eritema &gt; 2 cm</strong> ou <strong>carbúnculo</strong>: com ação contra MRSA, <strong>sulfametoxazol-trimetoprima ou clindamicina</strong> por pelo menos <strong>7 dias</strong> (SBP 2022). Também se área de difícil drenagem (face, mãos, genitália), sinais sistêmicos ou imunodepressão (IDSA 2014).",
                        "A SBP não traz a dose: os cards abaixo usam a dose do Whitebook para pele (impetigo).",
                        "<strong>Furunculose de repetição:</strong> descolonizar paciente e contatos da casa com <strong>mupirocina nasal 2 vezes ao dia por 5 dias</strong> (evidência fraca) (SBP 2022)."
                    ],
                    remedios: ["smx_impetigo", "clinda_vo_impetigo", "pele_mupi"]
                }
            ]
        },
        {
            titulo: "Ectima",
            icone: "🟤",
            cor: "#92400e",
            secoes: [
                {
                    titulo: "Definição e critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Infecção da derme com úlcera recoberta por crosta. Diagnóstico clínico.",
                    itens: ["Infecção bacteriana que acomete a <strong>derme</strong>, com <strong>úlceras recobertas por crostas</strong> e limites elevados violáceos (SBP 2022)."]
                },
                {
                    titulo: "Agentes etiológicos",
                    icone: "🦠",
                    resumo: "S. pyogenes (S. aureus secundário). Ectima gangrenoso: Pseudomonas aeruginosa.",
                    itens: [
                        "<strong><em>S. pyogenes</em></strong>; <em>S. aureus</em> como agente secundário sinérgico (SBP 2022).",
                        "<strong>Ectima gangrenoso:</strong> <em>Pseudomonas aeruginosa</em> (SBP 2022)."
                    ]
                },
                {
                    titulo: "Apresentação clínica: sinais e sintomas",
                    icone: "👁️",
                    resumo: "Começa como impetigo, ulcera e forma crosta escura aderente com borda elevada; períneo, nádegas e extremidades.",
                    itens: [
                        "Começa como impetigo não bolhoso, com evolução mais arrastada: ulcera até a derme e forma <strong>crosta escura, seca e aderente</strong> e escara de bordas elevadas (SBP 2022).",
                        "Poucas lesões, às vezes múltiplas em estágios diferentes; <strong>períneo, nádegas e extremidades distais</strong> (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleEctima"
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Leishmaniose, vasculite leucocitoclástica, CIVD, êmbolos sépticos (endocardite).",
                    itens: ["Leishmaniose, vasculite leucocitoclástica de pequenos vasos, CIVD, êmbolos sépticos da endocardite (SBP 2022)."]
                },
                {
                    titulo: "Complicações e prognóstico",
                    icone: "⚠️",
                    resumo: "Depende do estado geral e imunológico. Ectima gangrenoso: investigar imunodeficiência.",
                    itens: ["O prognóstico depende do estado geral, imunológico e da doença de base. <strong>Investigar imunodeficiência</strong>, mesmo em criança sem doença conhecida (SBP 2022)."]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Antibiótico sistêmico; poucas lesões: oral (mesmo esquema sistêmico do impetigo).",
                    itens: [
                        "<strong>Antibiótico sistêmico</strong> (SBP 2022); a SBP não define a droga oral. Como é infecção por estreptococo e estafilococo, usar o <strong>esquema sistêmico do impetigo</strong> (cefalexina; alérgico: macrolídeo ou clindamicina)."
                    ],
                    remedios: ["cefalexina_impetigo", "claritro_impetigo", "clinda_vo_impetigo"]
                },
                {
                    titulo: "Tratamento hospitalar",
                    icone: "🏥",
                    resumo: "Extenso: EV com cobertura para Pseudomonas.",
                    itens: [
                        "Casos extensos: de preferência <strong>EV com cobertura para <em>P. aeruginosa</em></strong> (SBP 2022). A SBP não define o antibiótico: cefepime ou ceftazidima abaixo; ajustar pela cultura."
                    ],
                    remedios: ["cefepime", "ceftazidima"]
                }
            ]
        },
        {
            titulo: "Paroníquia e dactilite bolhosa",
            icone: "🖐️",
            cor: "#7c3aed",
            secoes: [
                {
                    titulo: "Definição e critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Paroníquia: infecção da prega ungueal após trauma da cutícula. Dactilite: bolha oval na falange distal.",
                    itens: [
                        "<strong>Paroníquia aguda:</strong> infecção após trauma direto ou indireto da cutícula ou da prega da unha (SBP 2022).",
                        "<strong>Dactilite bolhosa:</strong> bolha oval acral de 10 a 30 mm na falange distal de um ou mais dedos, de 2 a 16 anos; a cultura ajuda no diagnóstico (SBP 2022)."
                    ]
                },
                {
                    titulo: "Agentes etiológicos",
                    icone: "🦠",
                    resumo: "S. aureus e estreptococo β-hemolítico.",
                    itens: ["<em>S. aureus</em> e <em>Streptococcus</em> β-hemolítico (grupo A) (SBP 2022)."]
                },
                {
                    titulo: "Apresentação clínica: sinais e sintomas",
                    icone: "👁️",
                    resumo: "Prega ungueal com edema, eritema, dor latejante e pus. Dactilite: bolha que pode exulcerar.",
                    itens: [
                        "<strong>Paroníquia:</strong> edema, eritema, sensibilidade e <strong>pus</strong> na prega proximal, que pode chegar às laterais; bolhas e dor latejante (SBP 2022).",
                        "<strong>Dactilite:</strong> a bolha pode evoluir para exulcerações em alguns dias (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleParoniquia"
                },
                {
                    titulo: "Diagnóstico diferencial e complicações",
                    icone: "🧭",
                    resumo: "Dactilite: panarício herpético, impetigo bolhoso, bolha de fricção. Paroníquia pode deixar distrofia da unha.",
                    itens: [
                        "<strong>Dactilite:</strong> panarício herpético, impetigo bolhoso, bolha de fricção (SBP 2022).",
                        "<strong>Paroníquia:</strong> a matriz da unha da criança é frágil; mesmo leve pode causar <strong>distrofia ungueal permanente</strong>; manipulação crônica leva à paroníquia crônica (SBP 2022)."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Paroníquia: tópico; com pus: drenar + cefalosporina de 1ª geração ou amoxi-clavulanato por 10 dias. Dactilite: drenar + cefalexina.",
                    alerta: true,
                    itens: [
                        "<strong>Paroníquia aguda:</strong> antibiótico tópico; com pus, <strong>drenagem</strong> e antibiótico oral: <strong>amoxicilina-clavulanato ou cefalosporina de 1ª geração por 10 dias</strong> (SBP 2022).",
                        "<strong>Dactilite bolhosa:</strong> <strong>incisão e drenagem</strong>, compressas mornas e antibiótico oral resistente à betalactamase, como a <strong>cefalexina</strong> (SBP 2022).",
                        "A SBP não traz a dose: os cards abaixo usam a dose do Whitebook para pele (impetigo e erisipela)."
                    ],
                    remedios: ["pele_mupi", "fusidico_impetigo", "cefalexina_impetigo", "clav_erisipela"]
                }
            ]
        },
        {
            titulo: "Dermatite estreptocócica perianal",
            icone: "🩹",
            cor: "#db2777",
            secoes: [
                {
                    titulo: "Definição e critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Infecção superficial rara ao redor do ânus. Confirmar com swab e cultura (estreptococo do grupo A).",
                    itens: [
                        "Infecção superficial rara, mais em <strong>meninos de 6 meses a 10 anos</strong> (SBP 2022).",
                        "Confirmar com <strong>swab e cultura do exsudato</strong>; ASLO e anti-estreptoquinase não são confiáveis (SBP 2022)."
                    ]
                },
                {
                    titulo: "Agentes etiológicos",
                    icone: "🦠",
                    resumo: "Estreptococo β-hemolítico do grupo A.",
                    itens: ["<em>Streptococcus</em> β-hemolítico do <strong>grupo A</strong> (SBP 2022)."]
                },
                {
                    titulo: "Apresentação clínica: sinais e sintomas",
                    icone: "👁️",
                    resumo: "Eritema brilhante e bem delimitado ao redor do ânus, prurido, dor ao evacuar, fezes com sangue.",
                    itens: [
                        "<strong>Prurido anal</strong> (78–100%), dor retal (50%), <strong>defecação dolorosa</strong> (50%), fezes com estrias de sangue (20–35%) (SBP 2022).",
                        "Erupção <strong>eritematosa, brilhante e bem demarcada</strong> ao redor do ânus, que se espalha; fissuras dolorosas ou exsudato no quadro crônico; sintomas sistêmicos raros (SBP 2022)."
                    ]
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Dermatite de fralda, candidíase, trauma por higiene, dermatite de contato, alergia alimentar, DII, histiocitose, abuso sexual.",
                    itens: ["Dermatite de fralda, candidíase, trauma por higiene vigorosa ou manipulação, dermatite de contato, alergia alimentar, doença inflamatória intestinal, histiocitose e <strong>abuso sexual</strong> (SBP 2022)."]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Desconforto prolongado, constipação (50%), raramente proctite e abscesso; transmissão a irmãos e pais.",
                    itens: ["Atraso no diagnóstico é comum: <strong>constipação em 50%</strong>, desconforto prolongado, raramente proctite e abscesso; maior transmissão a irmãos e pais (SBP 2022)."]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Sempre sistêmico: penicilina, amoxicilina ou cefalosporina. Swab de controle para garantir a erradicação.",
                    alerta: true,
                    itens: [
                        "Tratamento <strong>sistêmico</strong>: <strong>penicilina, amoxicilina ou cefalosporinas</strong>, com melhora rápida (SBP 2022).",
                        "Colher <strong>swab perianal e cultura</strong> para garantir a erradicação (SBP 2022).",
                        "A SBP não traz a dose: os cards abaixo usam a dose do Whitebook para infecção estreptocócica de pele (erisipela)."
                    ],
                    remedios: ["amox_erisipela", "benza", "cefalexina_erisipela"]
                }
            ]
        },
        {
            titulo: "Erisipela",
            icone: "🟠",
            cor: "#ea580c",
            secoes: [
                {
                    titulo: "Definição e critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Infecção da derme superficial e dos linfáticos superficiais. Diagnóstico clínico, sem exames.",
                    itens: [
                        "Infecção da <strong>derme superficial</strong> com acometimento da <strong>rede linfática superficial</strong> (SBP 2022).",
                        "<strong>Diagnóstico clínico</strong>; não precisa de exame. Leucocitose e PCR altas são comuns mas não mudam a conduta; hemocultura tem baixa sensibilidade — hemograma e cultura só no imunocomprometido (SBP 2022)."
                    ]
                },
                {
                    titulo: "Agentes etiológicos e fatores de risco",
                    icone: "🦠",
                    resumo: "Estreptococo do grupo A. Risco: obesidade, linfedema, intertrigo, úlceras, eczema.",
                    itens: [
                        "<strong>Estreptococo β-hemolítico do grupo A</strong> é o principal agente (SBP 2022).",
                        "<strong>Fatores de risco:</strong> obesidade, linfedema, intertrigo, úlceras de perna, eczema, diabetes descontrolado, doença hepática; na face, infecção recente da nasofaringe (SBP 2022)."
                    ]
                },
                {
                    titulo: "Apresentação clínica: sinais e sintomas",
                    icone: "👁️",
                    resumo: "Febre e calafrios até 48 h antes; placa vermelha elevada e bem delimitada, ardor e dor, nas pernas ou na face.",
                    itens: [
                        "Mal-estar, <strong>febre e calafrios até 48 h antes</strong> da lesão (SBP 2022).",
                        "<strong>Placa eritematosa bem delimitada e elevada</strong>, mais nas <strong>pernas</strong> e depois na <strong>face</strong>; ardor, dor e às vezes prurido; adenopatia comum. Formas graves com vesículas, bolhas e necrose (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleErisipela"
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Celulite (borda mal definida, evolução lenta), fasciíte necrosante, dermatite de contato.",
                    itens: [
                        "<strong>Celulite:</strong> limites mal definidos e evolução lenta; a erisipela tem borda bem definida e evolução rápida (SBP 2022).",
                        "Dor desproporcional, cor violácea ou bolhas hemorrágicas: pensar em <strong>fasciíte necrosante</strong>."
                    ]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Abscesso, escarlatina, pneumonia, meningite, necrose, púrpura, tromboflebite. Abscesso ou gangrena: desbridamento.",
                    itens: [
                        "Formação de abscesso, escarlatina, pneumonia, meningite, necrose da pele, púrpura hemorrágica, tromboflebite (SBP 2022).",
                        "Abscesso ou gangrena: <strong>desbridamento cirúrgico</strong>. O prognóstico é bom, com resposta rápida ao antibiótico oral na criança (SBP 2022)."
                    ]
                },
                {
                    titulo: "Quando internar",
                    icone: "🏥",
                    resumo: "Erisipela grave, falha do oral, imunossupressão, sinais sistêmicos ou sem via oral (Whitebook); lactentes e baixa adesão (SBP).",
                    itens: [
                        "<strong>Whitebook:</strong> erisipela grave, falha do tratamento oral, imunossupressão, sinais sistêmicos ou impossibilidade de via oral.",
                        "<strong>SBP 2022:</strong> lactentes, imunocomprometidos, baixa adesão e falha do tratamento ambulatorial."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Amoxicilina, amoxi-clavulanato, penicilina benzatina (dose única) ou cefalexina por 5 dias. Repouso e membro elevado.",
                    alerta: true,
                    itens: [
                        "<strong>Formas leves</strong> (Whitebook), escolher uma: <strong>amoxicilina</strong> 50 mg/kg/dia, <strong>amoxicilina-clavulanato</strong> 30–50 mg/kg/dia, <strong>penicilina benzatina</strong> IM dose única (&lt; 27 kg: 600.000 UI; ≥ 27 kg: 1.200.000 UI) ou <strong>cefalexina</strong> 50–100 mg/kg/dia, <strong>por 5 dias</strong>. A penicilina é a 1ª linha também na SBP 2022.",
                        "<strong>Cuidados</strong> (Whitebook): repouso relativo, <strong>membro elevado</strong>, identificar e tratar fatores predisponentes (fissuras, descamação). Compressas frias, hidratação e antitérmico (SBP 2022).",
                        "<strong>Recorrente:</strong> penicilina oral ou eritromicina 2 vezes ao dia por 4 a 5 semanas, ou <strong>penicilina benzatina IM a cada 2 a 4 semanas</strong>; tratar o fator predisponente (SBP 2022).",
                        "<strong>Retorno em 48 a 72 h</strong>; antes se a borda passar da marcação, febre persistir ou a dor aumentar."
                    ],
                    remedios: ["amox_erisipela", "clav_erisipela", "benza", "cefalexina_erisipela"]
                },
                {
                    titulo: "Tratamento hospitalar",
                    icone: "🏥",
                    resumo: "Ceftriaxona, cefazolina ou oxacilina EV; trocar para via oral quando melhorar e tolerar.",
                    alerta: true,
                    itens: [
                        "<strong>Escolher uma</strong> (Whitebook): <strong>ceftriaxona</strong> 50–75 mg/kg/dia de 12/12 ou 24/24h, <strong>cefazolina</strong> 50–100 mg/kg/dia de 8/8h ou <strong>oxacilina</strong> 100–150 mg/kg/dia de 6/6h.",
                        "<strong>Trocar para via oral</strong> quando houver melhora clínica e tolerância (Whitebook), completando com o tratamento ambulatorial.",
                        "<strong>Cuidados</strong> (Whitebook): dieta oral própria para a idade, hidratação conforme a clínica, membro elevado, repouso relativo. Dor ou febre: dipirona ou paracetamol; vômitos: ondansetrona ou bromoprida."
                    ],
                    remedios: ["cef_erisipela", "cefazolina_erisipela", "oxa_erisipela", "dip_inj", "ondan_ev"]
                }
            ]
        },
        {
            titulo: "Celulite",
            icone: "🔶",
            cor: "#c2410c",
            secoes: [
                {
                    titulo: "Definição e critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Infecção da derme profunda e do subcutâneo. Diagnóstico clínico; imagem se suspeita de abscesso ou fasciíte.",
                    itens: [
                        "Infecção da <strong>derme profunda e do tecido subcutâneo</strong> (SBP 2022).",
                        "Diagnóstico pela história e exame. <strong>Hemocultura</strong> na bacteremia/sepse. Ultrassom, tomografia ou ressonância se suspeita de <strong>coleção, abscesso ou fasciíte</strong> (SBP 2022)."
                    ]
                },
                {
                    titulo: "Agentes etiológicos e fatores de risco",
                    icone: "🦠",
                    resumo: "Maioria por S. aureus; também Hib, Pseudomonas, estreptococo do grupo A. Risco: obesidade, imunossupressão, quebra da pele.",
                    itens: [
                        "Maioria por <strong><em>S. aureus</em></strong>; às vezes <em>H. influenzae</em> tipo b, <em>P. aeruginosa</em>, <em>Legionella</em>, estreptococo do grupo A (SBP 2022).",
                        "<strong>Fatores de risco:</strong> obesidade, diabetes, imunossupressão, <strong>perda da integridade da pele</strong> (intertrigo, fissuras plantares, edema, úlceras, trauma, cirurgia) (SBP 2022)."
                    ]
                },
                {
                    titulo: "Apresentação clínica: sinais e sintomas",
                    icone: "👁️",
                    resumo: "Eritema, calor, dor e edema com borda mal definida e evolução lenta; febre e adenopatia. Mais nos membros inferiores.",
                    itens: [
                        "<strong>Eritema, calor, dor e edema</strong>, com <strong>limites mal definidos</strong> e evolução lenta; pode ter febre e adenopatia regional (SBP 2022).",
                        "Mais nos membros inferiores; também membros superiores, face, orelha e tronco; após cirurgia ou trauma penetrante (SBP 2022).",
                        "<strong>Marcar a borda</strong> com caneta para acompanhar a evolução."
                    ],
                    ferramenta: "ferramentaPeleCelulite"
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Erisipela (borda bem definida, rápida), abscesso, fasciíte necrosante, celulite orbitária.",
                    itens: [
                        "<strong>Erisipela</strong> (borda bem definida, evolução rápida), <strong>abscesso</strong> (flutuação), <strong>fasciíte necrosante</strong> (dor desproporcional, violáceo).",
                        "Perto do olho: veja o capítulo de <strong>celulite periorbitária e orbitária</strong>."
                    ]
                },
                {
                    titulo: "Complicações e quando internar",
                    icone: "⚠️",
                    resumo: "Abscesso, bacteremia, fasciíte. Internar se grave, sem resposta ao oral ou no recém-nascido.",
                    itens: [
                        "<strong>Falha</strong> do tratamento indica organismo resistente ou outra bactéria; atenção a imunossupressão e doença hepática ou renal crônica (SBP 2022).",
                        "<strong>Internar</strong> a doença grave e a que não responde ao oral (SBP 2022), e a celulite no recém-nascido (Whitebook)."
                    ]
                },
                {
                    titulo: "Tratamento ambulatorial",
                    icone: "💊",
                    resumo: "Cefalexina, cefadroxila ou sulfametoxazol-trimetoprima por 7 a 14 dias. Marcar a borda e reavaliar em 48–72 h.",
                    alerta: true,
                    itens: [
                        "<strong>Celulite não complicada, escolher uma</strong> (Whitebook): <strong>cefalexina</strong> 25–100 mg/kg/dia de 6/6h, <strong>cefadroxila</strong> 30 mg/kg/dia de 12/12h ou <strong>sulfametoxazol-trimetoprima</strong> 8–12 mg TMP/kg/dia de 12/12h, por <strong>7 a 14 dias</strong>.",
                        "A SBP também aceita amoxicilina-clavulanato; alergia imediata à penicilina: clindamicina ou macrolídeo (SBP 2022).",
                        "<strong>Suporte:</strong> elevar a área; dipirona ou paracetamol se dor ou febre (Whitebook).",
                        "<strong>Retorno em 48 a 72 h</strong>; antes se a borda passar da marcação, febre persistir ou a dor aumentar muito."
                    ],
                    remedios: ["cefalexina_celulite", "cefadroxila_celulite", "smx_celulite", "dip_gts", "pct_gts"]
                },
                {
                    titulo: "Tratamento hospitalar",
                    icone: "🏥",
                    resumo: "Purulenta, refratária, sistêmica ou MRSA: clindamicina, SMX-TMP, linezolida ou vancomicina. Neonato: cefotaxima, ou gentamicina + vancomicina. Sem pus: oxacilina.",
                    alerta: true,
                    itens: [
                        "<strong>Esquema A</strong> (Whitebook) — exsudato purulento, refratária, sinais de doença sistêmica, recorrente com condição predisponente ou <strong>MRSA prévio</strong>: <strong>clindamicina EV</strong> 20–40 mg/kg/dia de 6/6 ou 8/8h (máx. 2.700 mg/dia), <strong>sulfametoxazol-trimetoprima EV</strong> 8–12 mg TMP/kg/dia de 12/12h (máx. 160 mg/dose), <strong>linezolida</strong> (máx. 600 mg/dose) ou <strong>vancomicina</strong> 40–60 mg/kg/dia de 6/6h (nível sérico, máx. 4 g/dia), por 7 a 14 dias.",
                        "<strong>Esquema B</strong> (Whitebook) — <strong>recém-nascido</strong>: <strong>cefotaxima</strong> (até 1 semana: 50–100 mg/kg/dia de 12/12h; 1 a 4 semanas: 75–100 mg/kg/dia de 8/8h) <strong>ou gentamicina</strong> 4 mg/kg/dose de 24/24h <strong>+ vancomicina</strong>, por 7 a 14 dias.",
                        "<strong>Grave sem pus e sem risco de MRSA:</strong> <strong>oxacilina</strong> (1ª escolha EV da SBP); cefazolina, cefuroxima ou ceftriaxona são opções. Alergia à penicilina: clindamicina ou vancomicina (SBP 2022).",
                        "<strong>Cuidados</strong> (Whitebook): dieta oral própria para a idade; dor ou febre: dipirona ou paracetamol; vômitos: ondansetrona."
                    ],
                    remedios: ["clindamicina", "linezolida_ev", "vancomicina", "cefotax_neo_sepse", "genta_neo_sepse", "oxacilina", "cefazolina_erisipela", "dip_inj", "ondan_ev"]
                }
            ]
        },
        {
            titulo: "Celulite periorbitária e orbitária",
            icone: "👁️",
            cor: "#0f766e",
            secoes: [
                {
                    titulo: "Definição e critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Pré-septal: pálpebra; olho mexe e enxerga normal. Orbitária: atrás do septo, com proptose, dor ao mexer o olho e queda da visão.",
                    itens: [
                        "A diferenciação entre <strong>periorbitária (pré-septal)</strong> e <strong>orbitária</strong> define a conduta; nas duas há edema palpebral, eritema e dor ocular (Whitebook).",
                        "<strong>Orbitária</strong> se: proptose, <strong>dor à movimentação ocular</strong>, oftalmoplegia com diplopia, <strong>queda da acuidade visual</strong> — esses achados nunca estão presentes na pré-septal (Whitebook).",
                        "<strong>Tomografia de órbitas e seios com contraste</strong> se suspeita de orbitária. Classificação de Chandler: conduta de <strong>sinusite</strong>."
                    ]
                },
                {
                    titulo: "Agentes etiológicos",
                    icone: "🦠",
                    resumo: "Em geral complicação de sinusite (etmoidite); S. aureus, estreptococos; anaeróbios se sinusite crônica ou foco dentário.",
                    itens: [
                        "Em geral complicação de <strong>sinusite</strong> (etmoidite na criança pequena): pneumococo, <em>S. aureus</em> (inclusive MRSA), estreptococos, <em>H. influenzae</em>.",
                        "<strong>Anaeróbios:</strong> sinusite crônica, foco odontológico ou infecção do SNC (Whitebook)."
                    ]
                },
                {
                    titulo: "Apresentação clínica: sinais e sintomas",
                    icone: "👁️",
                    resumo: "Febre, edema e hiperemia palpebral, dor ocular; na orbitária: dor ao mexer o olho, proptose, diplopia, queda da visão.",
                    itens: [
                        "<strong>Orbitária</strong> (Whitebook): febre, edema, hiperemia e dor ocular; <strong>dor à movimentação ocular</strong>, queixa de queda da acuidade visual e diplopia; proptose e oftalmoplegia.",
                        "Também: cefaleia, alteração de sensório, náuseas e vômitos (SNC); febre, mal-estar, descarga nasal e tosse (Whitebook).",
                        "<strong>Exame</strong> (Whitebook): edema e hiperemia da pálpebra, quemose; avaliar <strong>todos os dias</strong> a acuidade visual e os reflexos pupilares."
                    ]
                },
                {
                    titulo: "Sinais de alarme e complicações",
                    icone: "⚠️",
                    resumo: "Alarme: febre, proptose, dor ao mexer o olho, queda da visão, visão de cores e pupilas alteradas. Complicações: abscessos, cegueira, trombose do seio cavernoso.",
                    alerta: true,
                    itens: [
                        "<strong>Sinais de alarme</strong> (Whitebook): febre, proptose, dor à movimentação ocular, redução da acuidade visual, alteração da visão de cores, alteração dos reflexos pupilares.",
                        "<strong>Complicações</strong> (Whitebook): abscesso subperiosteal, abscesso orbitário, <strong>cegueira</strong>, tromboflebite do seio cavernoso, abscesso cerebral."
                    ]
                },
                {
                    titulo: "Tratamento",
                    icone: "🏥",
                    resumo: "Orbitária: vancomicina + ceftriaxona (ou cefotaxima) por 2–3 semanas; + metronidazol se SNC, sinusite crônica ou foco dentário. Oftalmologia.",
                    alerta: true,
                    itens: [
                        "<strong>Celulite pré-septal leve</strong> em criança bem: pode ser tratada por via oral (conduta de sinusite).",
                        "<strong>Orbitária — Esquema A</strong> (preferencial, Whitebook): <strong>vancomicina</strong> 60 mg/kg/dia de 6/6h <strong>+ ceftriaxona</strong> 100 mg/kg/dia de 12/12h.",
                        "<strong>Esquema B</strong> (alternativa à ceftriaxona): vancomicina <strong>+ cefotaxima</strong> 150–200 mg/kg/dia de 8/8h (máx. 12 g/dia).",
                        "<strong>Esquema C</strong> (anaeróbios): A ou B <strong>+ metronidazol</strong> 30 mg/kg/dia de 8/8h (máx. 500 mg/dose).",
                        "<strong>Duração:</strong> 2 a 3 semanas ou até a resolução (Whitebook).",
                        "<strong>Cuidados</strong> (Whitebook): sinais vitais de 6/6 h; <strong>avaliação da oftalmologia</strong>; <strong>sem melhora em 24 a 48 h</strong>: nova imagem (abscesso) e avaliar cirurgia; jejum se cirurgia, com hidratação basal."
                    ],
                    remedios: ["vanco_orbitaria", "cef_orbitaria", "cefotax_orbitaria", "metro_orbitaria", "dip_inj", "ondan_ev"]
                }
            ]
        },
        {
            titulo: "Síndrome da pele escaldada estafilocócica",
            icone: "🚨",
            cor: "#9f1239",
            secoes: [
                {
                    titulo: "Definição e critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Emergência pediátrica: desnudamento da pele por toxina estafilocócica. Diagnóstico clínico.",
                    alerta: true,
                    itens: [
                        "Doença de Ritter: <strong>emergência pediátrica</strong> potencialmente fatal, com <strong>desnudamento da pele</strong> por exotoxinas do <em>S. aureus</em> (SBP 2022).",
                        "<strong>Diagnóstico clínico</strong>; hemocultura e cultura da bolha costumam ser negativas (SBP 2022).",
                        "Mais em <strong>menores de 2 anos</strong> (imaturidade renal, sem imunidade e sem anticorpos maternos) (SBP 2022)."
                    ]
                },
                {
                    titulo: "Agentes etiológicos",
                    icone: "🦠",
                    resumo: "S. aureus produtor de exotoxinas A e B, a partir de um foco distante (vias aéreas, ouvido, conjuntiva, coto umbilical).",
                    itens: ["<em>S. aureus</em> produtor de <strong>exotoxinas A e B</strong>; foco geralmente distante: vias aéreas superiores, ouvido, conjuntiva, coto umbilical (SBP 2022)."]
                },
                {
                    titulo: "Apresentação clínica: sinais e sintomas",
                    icone: "👁️",
                    resumo: "Febre e irritabilidade; em 24–48 h eritema doloroso, bolhas flácidas, Nikolsky positivo, rágades periorais, sem mucosa.",
                    itens: [
                        "Irritabilidade, febre e mal-estar; em <strong>24 a 48 h</strong>, erupção <strong>dolorosa</strong>: eritema e fissuras na face e nas dobras (virilha, axilas, pescoço), depois <strong>bolhas grandes, finas e flácidas</strong> (SBP 2022).",
                        "<strong>Sinal de Nikolsky</strong> (a pele descola ao toque), <strong>rágades periorais</strong>, <strong>sem envolvimento de mucosa</strong> (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleSsss"
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Impetigo bolhoso, choque tóxico, Kawasaki, celulite, queimadura, Stevens-Johnson/NET (tem mucosa), epidermólise bolhosa.",
                    itens: [
                        "<strong>Impetigo bolhoso</strong> (toxina só local), síndrome do choque tóxico, Kawasaki, celulite, queimadura térmica, <strong>Stevens-Johnson/NET</strong> (com lesão de mucosa), epidermólise bolhosa (SBP 2022).",
                        "Surtos em <strong>creches e berçários</strong> (SBP 2022)."
                    ]
                },
                {
                    titulo: "Complicações e prognóstico",
                    icone: "⚠️",
                    resumo: "Hipotermia, perda de líquidos e distúrbios eletrolíticos. Mortalidade < 5%; cura em 2 semanas sem cicatriz.",
                    itens: [
                        "Pele muito desnuda: <strong>hipotermia</strong>, perda de líquidos e distúrbios hidroeletrolíticos (SBP 2022).",
                        "Mortalidade infantil &lt; 5%. Febre cai em poucos dias, descamação em ~5 dias, cura em 2 semanas, geralmente sem cicatriz (SBP 2022)."
                    ]
                },
                {
                    titulo: "Tratamento",
                    icone: "🏥",
                    resumo: "Antibiótico sistêmico sempre: oxacilina (+ clindamicina); vancomicina só se MRSA. Grave: unidade de queimados. Isolar.",
                    alerta: true,
                    itens: [
                        "<strong>Antibiótico sistêmico sempre</strong>: tópico isolado não funciona (SBP 2022).",
                        "<strong>Oxacilina</strong> é a escolha; <strong>clindamicina</strong> deve ser considerada de 1ª linha (reduz a toxina); <strong>vancomicina</strong> só se suspeita de MRSA (SBP 2022).",
                        "<strong>Forma leve localizada:</strong> antibiótico oral e seguimento próximo na atenção primária (SBP 2022).",
                        "<strong>Grave:</strong> internar, de preferência em <strong>unidade de queimados</strong>; controlar desidratação, temperatura, dor e nutrição. <strong>Evitar sulfadiazina de prata</strong> (SBP 2022).",
                        "<strong>Isolar</strong> o paciente (SBP 2022)."
                    ],
                    remedios: ["oxacilina", "clindamicina", "vancomicina"]
                }
            ]
        },
        {
            titulo: "Fasciíte necrosante",
            icone: "🚨",
            cor: "#7f1d1d",
            secoes: [
                {
                    titulo: "Definição e critérios diagnósticos",
                    icone: "🔎",
                    resumo: "Infecção de progressão rápida com necrose da fáscia. Diagnóstico clínico; não esperar imagem para chamar o cirurgião.",
                    alerta: true,
                    itens: [
                        "Infecção incomum e de <strong>progressão rápida</strong> para necrose da fáscia muscular e do subcutâneo, além da derme e epiderme; pode evoluir para sepse, choque e morte em até 40% (SBP 2022).",
                        "<strong>Diagnóstico principalmente clínico</strong>; imagem ajuda se incerto (ultrassom no instável) (SBP 2022). <strong>Não atrasar o cirurgião.</strong>"
                    ]
                },
                {
                    titulo: "Agentes etiológicos e fatores de risco",
                    icone: "🦠",
                    resumo: "Estreptococo do grupo A, S. aureus (MRSA), gram-negativos e anaeróbios. Porta: trauma, picada, varicela.",
                    itens: [
                        "Polimicrobiana ou monomicrobiana: <strong>estreptococo do grupo A</strong>, <em>S. aureus</em> (MRSA), gram-negativos e anaeróbios (SBP 2022; IDSA 2014).",
                        "<strong>Porta de entrada:</strong> trauma, lesão perfurante, picada de inseto, procedimento, <strong>pós-varicela</strong>, até contusão sem ferida (SBP 2022)."
                    ]
                },
                {
                    titulo: "Apresentação clínica: sinais e sintomas",
                    icone: "👁️",
                    resumo: "Parece celulite, mas a dor é desproporcional; em 24–72 h fica violácea, com bolhas hemorrágicas e toxemia.",
                    itens: [
                        "Início leve, parecendo <strong>erisipela ou celulite</strong>, mas com <strong>dor desproporcional</strong> (SBP 2022).",
                        "Em <strong>24 a 72 h</strong>: lesão <strong>eritemato-violácea</strong>, limites mal definidos, <strong>vesículas hemorrágicas</strong>, endurecimento, edema e dor além do eritema; febre, letargia, confusão, toxemia (SBP 2022).",
                        "<strong>Outros sinais:</strong> crepitação, anestesia da pele, progressão em horas, choque."
                    ],
                    ferramenta: "ferramentaPeleFasciite"
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Erisipela e celulite bolhosa, abscesso, hematoma infectado, pioderma gangrenoso, piomiosite, gangrena gasosa.",
                    itens: ["Erisipela e celulite bolhosa, abscessos, hematoma infectado, pioderma gangrenoso, piomiosite, gangrena gasosa, infecção pós-operatória (SBP 2022)."]
                },
                {
                    titulo: "Complicações",
                    icone: "⚠️",
                    resumo: "Sepse, CIVD, falência de múltiplos órgãos, morte; síndrome do choque tóxico estreptocócico.",
                    itens: ["Sepse, coagulação intravascular disseminada, falência de múltiplos órgãos e morte; síndrome do choque tóxico estreptocócico (SBP 2022)."]
                },
                {
                    titulo: "Tratamento",
                    icone: "🏥",
                    resumo: "Cirurgia urgente (desbridamento) + vancomicina ou linezolida + piperacilina-tazobactam ou meropenem, + clindamicina.",
                    alerta: true,
                    itens: [
                        "<strong>Desbridamento cirúrgico precoce</strong> é essencial (SBP 2022).",
                        "<strong>Antibiótico de amplo espectro já:</strong> cobertura de <strong>MRSA</strong> (vancomicina ou linezolida) + <strong>gram-negativos</strong> (piperacilina-tazobactam; meropenem ou imipenem se alta prevalência de ESBL) e anaeróbios (SBP 2022).",
                        "<strong>Clindamicina</strong> associada na infecção pelo estreptococo do grupo A, para reduzir a toxina (IDSA 2014).",
                        "<strong>Imunoglobulina EV</strong>: considerar com síndrome do choque tóxico estreptocócico; oxigênio hiperbárico se anaeróbios, com evidência fraca (SBP 2022).",
                        "<strong>Choque:</strong> conduta de sepse."
                    ],
                    remedios: ["vancomicina", "linezolida_ev", "meropenem", "clindamicina"]
                }
            ]
        }
    ],

    citacoes: { "Whitebook": 3, "SBP 2022": 0, "IDSA 2014": 1 },
    fontes: [
        "Sociedade Brasileira de Pediatria. Departamentos Científicos de Dermatologia e Infectologia (2019-2021). Infecções Bacterianas Superficiais Cutâneas. Documento Científico, 08 de dezembro de 2022.",
        "Stevens DL, Bisno AL, Chambers HF, et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the Infectious Diseases Society of America. Clin Infect Dis 2014;59(2):e10-52. doi:10.1093/cid/ciu444",
        "Fotos: DermNet (dermnetnz.org), CC BY-NC-ND 4.0 — \"Image sourced from DermNet\", com link para a página de origem em cada foto.",
        "Whitebook (Afya). Guia de Prescrição / Pediatria: Impetigo; Celulite (03/04/2025); Celulite Orbitária em Pediatria (23/04/2026); Erisipela em Pediatria (12/03/2026). Prescrição Ambulatorial e Hospitalar."
    ],
    revisao: "10/2026"
});
