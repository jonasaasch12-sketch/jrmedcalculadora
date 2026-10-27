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
function ferramentaPeleFurunculo() { return fotosPele(["pele_furunculo", "pele_ectima", "pele_paroniquia"]); }
function ferramentaPeleCelulite() { return fotosPele(["pele_celulite", "pele_erisipela"]); }
function ferramentaPeleGraves() { return fotosPele(["pele_ssss", "pele_ssss_corpo", "pele_fasciite"]); }

registrarConduta({
    id: "pele_bacteriana",
    nome: "Infecções bacterianas de pele e partes moles",
    categoria: "Dermatologia",
    cor: "#be185d",
    kw: "impetigo bolhoso crostoso foliculite furunculo carbunculo abscesso ectima erisipela celulite fasciite necrosante sindrome da pele escaldada estafilococica paroniquia dactilite bolhosa piodermite staphylococcus aureus estreptococo mrsa",
    resumo: "Impetigo, foliculite, furúnculo/abscesso, ectima, paroníquia, erisipela, celulite, pele escaldada e fasciíte necrosante: como reconhecer (com fotos), quando internar, drenar e qual antibiótico.",
    legenda: "Conduta conforme a <strong>SBP – Departamentos de Dermatologia e Infectologia (2022)</strong>, o <strong>Whitebook</strong> (impetigo) e a <strong>IDSA (2014)</strong>. Fotos reais do DermNet, com crédito.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico: qual é a infecção?",
                    icone: "🔎",
                    resumo: "Classificar pela profundidade: epiderme (impetigo) → folículo (foliculite, furúnculo) → derme (ectima, erisipela) → subcutâneo (celulite) → fáscia (fasciíte).",
                    itens: [
                        "O diagnóstico é <strong>clínico</strong> (SBP 2022). Cultura da secreção se suspeita de <strong>MRSA</strong>, surto, recorrência ou falha do tratamento.",
                        "<strong>Principais agentes:</strong> <em>Staphylococcus aureus</em> e <em>Streptococcus pyogenes</em> (estreptococo do grupo A)."
                    ],
                    tabela: {
                        colunas: ["Infecção", "Camada", "Como é"],
                        linhas: [
                            ["Impetigo", "Epiderme", "Crostas cor de mel (crostoso) ou bolhas flácidas (bolhoso)"],
                            ["Foliculite", "Folículo", "Pápulas e pústulas centradas no pelo"],
                            ["Furúnculo / abscesso", "Folículo → subcutâneo", "Nódulo vermelho, doloroso, flutuante"],
                            ["Ectima", "Derme", "Úlcera com crosta escura e borda elevada"],
                            ["Erisipela", "Derme superficial e linfáticos", "Placa vermelha elevada, borda bem definida, início rápido"],
                            ["Celulite", "Derme profunda e subcutâneo", "Eritema, calor, edema, borda mal definida, evolução lenta"],
                            ["Fasciíte necrosante", "Fáscia", "Dor desproporcional, violáceo, bolhas, toxemia"]
                        ]
                    }
                },
                {
                    titulo: "Impetigo",
                    icone: "🟡",
                    resumo: "Crostoso: crostas cor de mel na face. Bolhoso: bolhas flácidas no lactente (S. aureus).",
                    itens: [
                        "<strong>Impetigo crostoso (não bolhoso):</strong> o mais comum (2 a 5 anos). Mácula → vesícula/pústula → <strong>crosta cor de mel</strong> com halo vermelho, na <strong>face</strong> (ao redor da boca e do nariz) ou nas pernas. Sem dor e sem sintomas sistêmicos (SBP 2022).",
                        "<strong>Impetigo bolhoso:</strong> <em>S. aureus</em> produtor de toxina (forma localizada da pele escaldada). <strong>Bolhas flácidas</strong> de conteúdo claro que se rompem e deixam base úmida; tronco, dobras, períneo. <strong>90% em menores de 2 anos</strong>; pode ter febre e diarreia (SBP 2022).",
                        "<strong>Secundário:</strong> sobre dermatite atópica, escabiose, picada de inseto, varicela, herpes.",
                        "<strong>Diferencial:</strong> herpes simples, eczema herpético, escabiose, dermatite atópica, tinha, candidíase (SBP 2022).",
                        "<strong>Complicações:</strong> celulite, osteomielite, artrite, sepse; <strong>glomerulonefrite pós-estreptocócica</strong>, escarlatina (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleImpetigo"
                },
                {
                    titulo: "Foliculite, furúnculo, abscesso, ectima e paroníquia",
                    icone: "🔴",
                    resumo: "Furúnculo: nódulo flutuante → drenar. Ectima: úlcera com crosta escura. Paroníquia: prega ungueal com pus.",
                    itens: [
                        "<strong>Foliculite:</strong> pápulas e pústulas no folículo, com halo vermelho; couro cabeludo, membros, face (SBP 2022).",
                        "<strong>Furúnculo:</strong> infecção do folículo até o subcutâneo: <strong>nódulo vermelho, doloroso e flutuante</strong>, com pústula; axilas e nádegas. <strong>Carbúnculo:</strong> vários furúnculos juntos, mais profundo (SBP 2022). Ultrassom ajuda se a flutuação não é clara.",
                        "<strong>Ectima:</strong> começa como impetigo, mas <strong>ulcera</strong> até a derme: crosta escura aderente e borda elevada violácea; pernas, nádegas, períneo. <strong>Ectima gangrenoso</strong> (<em>Pseudomonas</em>): investigar imunodeficiência (SBP 2022).",
                        "<strong>Paroníquia aguda:</strong> após trauma da cutícula: prega ungueal vermelha, inchada, dolorosa, com pus. <strong>Dactilite bolhosa:</strong> bolha oval na ponta do dedo (estreptococo ou estafilococo) (SBP 2022).",
                        "<strong>Dermatite estreptocócica perianal:</strong> eritema brilhante e bem delimitado ao redor do ânus, prurido, dor ao evacuar, fezes com sangue (meninos de 6 meses a 10 anos); tratamento sistêmico (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleFurunculo"
                },
                {
                    titulo: "Erisipela × celulite",
                    icone: "🟠",
                    resumo: "Erisipela: borda bem definida, elevada, início rápido (estreptococo). Celulite: borda mal definida, evolução lenta (estafilococo).",
                    itens: [
                        "<strong>Erisipela:</strong> derme superficial e linfáticos; <strong>placa vermelha, elevada e bem delimitada</strong>, nas pernas ou na face. Febre e calafrios podem vir 48 h antes; formas graves com bolhas e necrose. Principal agente: <strong>estreptococo do grupo A</strong> (SBP 2022).",
                        "<strong>Celulite:</strong> derme profunda e subcutâneo; eritema, calor, dor, edema, <strong>limites mal definidos</strong>, evolução mais lenta; pode ter febre e adenomegalia. Maioria por <strong><em>S. aureus</em></strong> (SBP 2022).",
                        "<strong>Marcar a borda</strong> com caneta para acompanhar a evolução.",
                        "<strong>Exames:</strong> não necessários na forma leve. Hemocultura se toxemia, imunodepressão ou sepse. Ultrassom, tomografia ou ressonância se suspeita de <strong>abscesso</strong> ou <strong>fasciíte</strong> (SBP 2022).",
                        "<strong>Celulite periorbitária ou orbitária:</strong> veja a conduta de <strong>sinusite</strong> (classificação de Chandler)."
                    ],
                    ferramenta: "ferramentaPeleCelulite"
                },
                {
                    titulo: "Sinais de alarme: pele escaldada e fasciíte necrosante",
                    icone: "🚨",
                    resumo: "Pele escaldada: lactente com febre, pele dolorosa que descola (Nikolsky), sem mucosa. Fasciíte: dor desproporcional, violáceo, toxemia.",
                    alerta: true,
                    itens: [
                        "<strong>Síndrome da pele escaldada estafilocócica:</strong> emergência. Menor de 2 anos com febre e irritabilidade; em 24 a 48 h, <strong>eritema doloroso</strong> na face e nas dobras, <strong>bolhas grandes e flácidas</strong>, <strong>pele que descola ao toque (sinal de Nikolsky)</strong>, <strong>rágades ao redor da boca</strong>, <strong>sem lesão de mucosa</strong> (diferencia da necrólise epidérmica tóxica) (SBP 2022).",
                        "<strong>Fasciíte necrosante:</strong> começa parecendo celulite, mas com <strong>dor desproporcional</strong> à lesão; em 24 a 72 h fica <strong>violácea</strong>, com bolhas hemorrágicas, endurecimento além do eritema, febre, letargia, toxemia. Pode vir após <strong>varicela</strong> ou trauma. Mortalidade até 40% (SBP 2022).",
                        "<strong>Outros sinais de gravidade:</strong> crepitação, anestesia da pele, progressão rápida em horas, choque, síndrome do choque tóxico."
                    ],
                    ferramenta: "ferramentaPeleGraves"
                }
            ]
        },
        {
            titulo: "Condução na emergência / hospitalar",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Abscesso se drena. Fasciíte é cirurgia urgente.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "Internar? → gravidade e exames → drenar abscesso → antibiótico EV → fasciíte: cirurgia já → pele escaldada: cuidados de queimado → reavaliar em 48 h e passar para via oral.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar / UTI?</strong> Lactente, toxemia, extensão, falha do oral, sinais de alarme",
                        "<span class=\"cond-passo\">2</span> <strong>Gravidade e exames</strong>: marcar a borda, hemocultura se toxemia, imagem se dúvida",
                        "<span class=\"cond-passo\">3</span> <strong>Drenar</strong> abscesso flutuante",
                        "<span class=\"cond-passo\">4</span> <strong>Antibiótico EV</strong>: oxacilina; alergia ou MRSA: clindamicina ou vancomicina",
                        "<span class=\"cond-passo\">5</span> <strong>Fasciíte necrosante</strong>: cirurgia urgente + amplo espectro",
                        "<span class=\"cond-passo\">6</span> <strong>Pele escaldada</strong>: oxacilina (+ clindamicina), suporte como queimado",
                        "<span class=\"cond-passo\">7</span> <strong>Reavaliar em 48 h</strong> e passar para via oral"
                    ]
                },
                {
                    passo: 1,
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
                            { nome: "🟠 Internar", opcoes: [[2, "Síndrome da pele escaldada (qualquer extensão, exceto leve localizada com seguimento garantido)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Celulite ou erisipela com toxemia, extensa ou de progressão rápida", "🟠"]] },
                            { nome: "", opcoes: [[2, "Lactente pequeno com celulite ou erisipela", "🟠"]] },
                            { nome: "", opcoes: [[2, "Falha do antibiótico oral em 48 a 72 h", "🟠"]] },
                            { nome: "", opcoes: [[2, "Imunodepressão (incluindo neutropenia) ou ectima gangrenoso", "🟠"]] },
                            { nome: "", opcoes: [[2, "Celulite de face perto do olho com sinais de celulite orbitária", "🟠"]] },
                            { nome: "", opcoes: [[1, "Baixa adesão ou dificuldade de retorno", "🟡"]] },
                            { nome: "🟢 Tratar em casa", opcoes: [[0, "Impetigo, foliculite, furúnculo, paroníquia ou celulite/erisipela leve em criança bem", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI / cirurgia", cor: "#dc2626", texto: "Ressuscitação (conduta de sepse), antibiótico EV de amplo espectro, cirurgião já na suspeita de fasciíte." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Antibiótico EV (passo 4), marcar a borda, reavaliar em 24 a 48 h." };
                            if (g === 1) return { num: "?", rotulo: "Considerar internar", cor: "#ca8a04", texto: "Se tratar em casa, garantir retorno em 24 a 48 h." };
                            return { num: "🏠", rotulo: "Tratamento em casa", cor: "#16a34a", texto: "Tópico ou oral conforme o bloco 🏠, com retorno se piorar ou sem melhora em 48 a 72 h." };
                        },
                        nota: "SBP 2022: hospitalizar a celulite grave ou sem resposta ao oral; erisipela em lactentes, imunocomprometidos, baixa adesão ou falha ambulatorial; pele escaldada grave em unidade de queimados. Os demais critérios vêm dos sinais de gravidade (SBP 2022; IDSA 2014)."
                    }
                },
                {
                    passo: 2,
                    titulo: "Gravidade e exames",
                    resumo: "Marcar a borda, sinais vitais, hemocultura se toxemia, ultrassom se dúvida de abscesso, imagem e cirurgião se suspeita de fasciíte.",
                    itens: [
                        "<strong>Marcar a borda</strong> do eritema e anotar a hora.",
                        "<strong>Sinais vitais e perfusão</strong>; sepse ou choque: seguir a conduta de <strong>sepse</strong>.",
                        "<strong>Hemocultura</strong> se toxemia, imunodepressão, sepse ou celulite extensa (SBP 2022). Cultura da secreção ou da punção do abscesso.",
                        "<strong>Ultrassom</strong> se não está claro se há abscesso (SBP 2022).",
                        "<strong>Suspeita de fasciíte:</strong> não esperar imagem para chamar o cirurgião; ultrassom pode ajudar no paciente instável (SBP 2022)."
                    ]
                },
                {
                    passo: 3,
                    titulo: "Drenar o abscesso",
                    resumo: "Abscesso ou furúnculo flutuante: incisão e drenagem (é o tratamento principal). Calor local.",
                    itens: [
                        "<strong>Incisão e drenagem</strong> sempre que houver flutuação, se não drenou sozinho (SBP 2022). É o tratamento principal do abscesso (IDSA 2014).",
                        "<strong>Calor local</strong> nos furúnculos (SBP 2022).",
                        "<strong>Antibiótico após drenar</strong> se: halo de eritema &gt; 2 cm, carbúnculo, doença extensa ou grave, sinais sistêmicos, área de difícil drenagem (face, mãos, genitália), imunodepressão ou falha só com drenagem (SBP 2022; IDSA 2014).",
                        "<strong>Paroníquia com pus e dactilite bolhosa:</strong> drenagem + compressas mornas (SBP 2022)."
                    ]
                },
                {
                    passo: 4,
                    titulo: "Antibiótico EV",
                    resumo: "Celulite grave: oxacilina (ou cefazolina, cefuroxima, ceftriaxona). Alergia ou MRSA: clindamicina ou vancomicina.",
                    alerta: true,
                    itens: [
                        "<strong>Celulite grave ou sem resposta ao oral:</strong> <strong>oxacilina</strong> é a 1ª escolha EV (SBP 2022); cefazolina, cefuroxima ou ceftriaxona são opções (SBP 2022).",
                        "<strong>Alergia à penicilina:</strong> clindamicina ou vancomicina (SBP 2022).",
                        "<strong>MRSA suspeito ou confirmado:</strong> clindamicina, vancomicina ou linezolida (SBP 2022).",
                        "<strong>Erisipela:</strong> penicilina é a 1ª linha (SBP 2022); internado: penicilina cristalina EV.",
                        "<strong>Ectima extenso:</strong> EV, com cobertura de <em>Pseudomonas</em> se ectima gangrenoso (SBP 2022)."
                    ],
                    remedios: ["oxacilina", "clindamicina", "vancomicina"]
                },
                {
                    passo: 5,
                    titulo: "Fasciíte necrosante: cirurgia urgente",
                    resumo: "Desbridamento cirúrgico precoce + vancomicina (ou linezolida) + piperacilina-tazobactam (ou carbapenêmico) ± clindamicina.",
                    alerta: true,
                    itens: [
                        "<strong>Desbridamento cirúrgico precoce</strong> é essencial (SBP 2022).",
                        "<strong>Antibiótico empírico de amplo espectro</strong> já: cobertura de <strong>MRSA</strong> (vancomicina ou linezolida) + <strong>gram-negativos</strong> (piperacilina-tazobactam; meropenem se alta prevalência de ESBL) e anaeróbios (SBP 2022).",
                        "<strong>Clindamicina</strong> associada na infecção pelo estreptococo do grupo A, para reduzir a produção de toxina (IDSA 2014).",
                        "<strong>Imunoglobulina EV</strong> pode ser considerada na fasciíte com síndrome do choque tóxico estreptocócico (SBP 2022).",
                        "<strong>Choque:</strong> conduta de sepse."
                    ],
                    remedios: ["vancomicina", "meropenem", "clindamicina"]
                },
                {
                    passo: 6,
                    titulo: "Pele escaldada estafilocócica",
                    resumo: "Antibiótico sistêmico sempre (oxacilina; considerar clindamicina), suporte como queimado: líquidos, temperatura, dor, isolamento.",
                    itens: [
                        "<strong>Antibiótico sistêmico sempre</strong>: tópico isolado não funciona (SBP 2022).",
                        "<strong>Oxacilina</strong> é a escolha (<em>S. aureus</em> sensível); <strong>clindamicina</strong> deve ser considerada de 1ª linha (reduz a toxina); <strong>vancomicina</strong> só se suspeita de MRSA (SBP 2022).",
                        "<strong>Forma leve localizada:</strong> pode ser tratada com antibiótico oral e seguimento próximo (SBP 2022).",
                        "<strong>Casos graves:</strong> internar, de preferência em <strong>unidade de queimados</strong>; controlar desidratação, temperatura (hipotermia), dor e nutrição. <strong>Evitar sulfadiazina de prata</strong> (SBP 2022).",
                        "<strong>Isolar</strong> o paciente (surtos em creches e berçários) (SBP 2022).",
                        "Evolução: febre cai em poucos dias, descamação em ~5 dias, cura em 2 semanas, geralmente sem cicatriz (SBP 2022)."
                    ],
                    remedios: ["oxacilina", "clindamicina"]
                },
                {
                    passo: 7,
                    titulo: "Reavaliar e passar para via oral",
                    resumo: "Em 48 h: a borda regrediu? Febre cedeu? Passar para oral. Sem melhora: rever abscesso, MRSA ou fasciíte.",
                    itens: [
                        "<strong>Reavaliar em 24 a 48 h</strong> a borda marcada, a febre e a dor.",
                        "<strong>Melhora:</strong> passar para <strong>via oral</strong> e completar o tratamento em casa.",
                        "<strong>Falha:</strong> pensar em organismo resistente (MRSA), abscesso não drenado, outra bactéria ou fasciíte (SBP 2022)."
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
                    titulo: "Impetigo: tópico ou sistêmico?",
                    icone: "🧴",
                    resumo: "Poucas lesões: mupirocina (> 3 meses) ou ácido fusídico 2 a 3x/dia por 5 a 7 dias. Sistêmico se > 5 lesões, bolhoso, febre, profundo, couro cabeludo: cefalexina.",
                    itens: [
                        "<strong>Tópico</strong> (quadro localizado, não complicado, poucas lesões): <strong>mupirocina 2%</strong> (maiores de 3 meses) ou <strong>ácido fusídico 2%</strong> (pode em menores de 3 meses), <strong>2 a 3 vezes ao dia por 5 a 7 dias</strong> (Whitebook). Retapamulina 1% acima de 9 meses; <strong>bacitracina não é mais recomendada</strong> (SBP 2022).",
                        "<strong>Sistêmico</strong> (Whitebook) se: acometimento <strong>profundo</strong> (subcutâneo, fáscia), <strong>mais de 5 lesões</strong>, <strong>impetigo bolhoso</strong>, <strong>febre</strong>, <strong>linfadenomegalia</strong>, faringite associada a lesões perto da boca, <strong>couro cabeludo</strong> (difícil usar creme), <strong>surto de glomerulonefrite pós-estreptocócica</strong>. A SBP acrescenta: mais de 2% da superfície corporal e menores de 2 anos (SBP 2022).",
                        "<strong>Sempre associar o tópico ao sistêmico</strong> (Whitebook).",
                        "↳ <strong>Esquema A (empírico): cefalexina</strong> por 7 a 10 dias (Whitebook; 1ª escolha também na SBP 2022).",
                        "↳ <strong>Esquema B (alérgico à penicilina):</strong> eritromicina, claritromicina, sulfametoxazol-trimetoprima ou clindamicina (Whitebook).",
                        "↳ <strong>Esquema C (suspeita ou confirmação de MRSA):</strong> sulfametoxazol-trimetoprima, clindamicina ou <strong>doxiciclina</strong> (a partir de 8 anos) (Whitebook).",
                        "<strong>Higiene:</strong> lavar as lesões com água morna e sabonete neutro para remover as crostas; unhas curtas e limpas; não compartilhar toalhas e roupas de cama. <strong>Clorexidina degermante</strong> só nos casos recorrentes ou com suspeita de MRSA (Whitebook).",
                        "<strong>Recorrente:</strong> cultura e descolonização do paciente e da família (SBP 2022)."
                    ],
                    remedios: ["pele_mupi", "fusidico_impetigo", "cefalexina_impetigo", "eritro_impetigo", "claritro_impetigo", "smx_impetigo", "clinda_vo_impetigo", "doxi_impetigo"]
                },
                {
                    titulo: "Foliculite, furúnculo e paroníquia",
                    icone: "🩹",
                    resumo: "Foliculite: costuma melhorar sozinha; tópico se extensa. Furúnculo: calor, drenar, antibiótico se halo > 2 cm. Furunculose de repetição: descolonizar.",
                    itens: [
                        "<strong>Foliculite:</strong> poucas pústulas resolvem sozinhas; extensa: antisséptico e antibiótico tópico (mupirocina, ácido fusídico, clindamicina tópica) (SBP 2022).",
                        "<strong>Furúnculo:</strong> calor local e drenagem quando flutuar. <strong>Antibiótico oral</strong> se halo &gt; 2 cm ou carbúnculo: com ação contra MRSA (<strong>sulfametoxazol-trimetoprima ou clindamicina</strong>) por pelo menos 7 dias (SBP 2022).",
                        "<strong>Furunculose de repetição:</strong> descolonizar paciente e contatos da casa com <strong>mupirocina nasal 2x/dia por 5 dias</strong> (evidência fraca) (SBP 2022).",
                        "<strong>Paroníquia aguda:</strong> antibiótico tópico; com pus, drenagem e antibiótico oral (amoxicilina-clavulanato ou cefalosporina de 1ª geração por 10 dias) (SBP 2022)."
                    ]
                },
                {
                    titulo: "Celulite e erisipela leves em casa",
                    icone: "💊",
                    resumo: "Celulite leve: cefalexina ou amoxicilina-clavulanato. Erisipela: penicilina. Alergia: clindamicina ou macrolídeo. Elevar o membro.",
                    itens: [
                        "<strong>Celulite leve:</strong> <strong>cefalexina</strong> ou amoxicilina-clavulanato (SBP 2022).",
                        "<strong>Erisipela:</strong> <strong>penicilina</strong> é a 1ª linha (SBP 2022).",
                        "<strong>Alergia imediata à penicilina:</strong> clindamicina ou macrolídeo (claritromicina, azitromicina) (SBP 2022).",
                        "<strong>Suporte:</strong> hidratação, compressas frias, antitérmico, <strong>elevar a área</strong> (SBP 2022).",
                        "<strong>Erisipela recorrente:</strong> profilaxia com penicilina oral ou eritromicina 2x/dia por 4 a 5 semanas, ou penicilina benzatina IM a cada 2 a 4 semanas; tratar o fator predisponente (SBP 2022).",
                        "<strong>Retorno em 48 a 72 h:</strong> se a borda passar da marcação, febre persistir ou a dor aumentar muito, voltar antes."
                    ],
                    remedios: ["cefalexina_impetigo", "benza"]
                },
                {
                    titulo: "Prevenção e escola",
                    icone: "🏫",
                    resumo: "Higiene das mãos, unhas curtas, tratar dermatite e escabiose, cobrir as lesões. Impetigo é muito contagioso.",
                    itens: [
                        "<strong>Impetigo é muito contagioso</strong>: lavar as mãos, unhas curtas e limpas, não compartilhar toalhas, cobrir as lesões.",
                        "<strong>Tratar a pele de base:</strong> dermatite atópica, escabiose, picadas de inseto (porta de entrada).",
                        "Voltar à creche/escola depois de iniciado o tratamento e com as lesões cobertas."
                    ]
                }
            ]
        }
    ],

    citacoes: { "Whitebook": 3, "SBP 2022": 0, "IDSA 2014": 1 },
    fontes: [
        "Sociedade Brasileira de Pediatria. Departamentos Científicos de Dermatologia e Infectologia (2019-2021). Infecções Bacterianas Superficiais Cutâneas. Documento Científico, 08 de dezembro de 2022.",
        "Stevens DL, Bisno AL, Chambers HF, et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the Infectious Diseases Society of America. Clin Infect Dis 2014;59(2):e10-52. doi:10.1093/cid/ciu444",
        "Fotos: DermNet (dermnetnz.org), CC BY-NC-ND 4.0 — \"Image sourced from DermNet\", com link para a página de origem em cada foto.",
        "Whitebook (Afya). Guia de Prescrição / Pediatria: Impetigo (Prescrição Ambulatorial: tratamento tópico e sistêmico)."
    ],
    revisao: "10/2026"
});
