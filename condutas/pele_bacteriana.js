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

registrarConduta({
    id: "pele_bacteriana",
    nome: "Infecções bacterianas de pele e partes moles",
    categoria: "Dermatologia",
    cor: "#be185d",
    kw: "impetigo bolhoso crostoso foliculite furunculo carbunculo abscesso ectima erisipela celulite celulite orbitaria periorbitaria fasciite necrosante sindrome da pele escaldada estafilococica paroniquia dactilite bolhosa dermatite perianal estreptococica piodermite staphylococcus aureus estreptococo mrsa",
    resumo: "Cada doença com seu diagnóstico (com foto) e seu tratamento: impetigo, foliculite, furúnculo, ectima, paroníquia, dermatite perianal, erisipela, celulite, celulite orbitária, pele escaldada e fasciíte necrosante.",
    legenda: "Conduta conforme a <strong>SBP – Departamentos de Dermatologia e Infectologia (2022)</strong>, o <strong>Whitebook</strong> (impetigo, celulite, celulite orbitária e erisipela) e a <strong>IDSA (2014)</strong>. Fotos reais do DermNet, com crédito. Cada doença tem a sua seção de tratamento, com os cards dela.",

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
                        "<strong>Principais agentes:</strong> <em>Staphylococcus aureus</em> e <em>Streptococcus pyogenes</em> (estreptococo do grupo A).",
                        "Depois de identificar a doença, vá à <strong>seção de tratamento dela</strong> no bloco 🚨 (internado) ou 🏠 (em casa)."
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
                        "<strong>Crostoso (não bolhoso):</strong> o mais comum (2 a 5 anos). Mácula → vesícula/pústula → <strong>crosta cor de mel</strong> com halo vermelho, na <strong>face</strong> (ao redor da boca e do nariz) ou nas pernas. Sem dor e sem sintomas sistêmicos (SBP 2022).",
                        "<strong>Bolhoso:</strong> <em>S. aureus</em> produtor de toxina (forma localizada da pele escaldada). <strong>Bolhas flácidas</strong> de conteúdo claro que se rompem e deixam base úmida; tronco, dobras, períneo. <strong>90% em menores de 2 anos</strong>; pode ter febre e diarreia (SBP 2022).",
                        "<strong>Secundário:</strong> sobre dermatite atópica, escabiose, picada de inseto, varicela, herpes.",
                        "<strong>Diferencial:</strong> herpes simples, eczema herpético, escabiose, dermatite atópica, tinha, candidíase (SBP 2022).",
                        "<strong>Complicações:</strong> celulite, osteomielite, artrite, sepse; <strong>glomerulonefrite pós-estreptocócica</strong>, escarlatina (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleImpetigo"
                },
                {
                    titulo: "Foliculite, furúnculo e carbúnculo",
                    icone: "🔴",
                    resumo: "Foliculite: pústula no pelo. Furúnculo: nódulo doloroso e flutuante. Carbúnculo: vários furúnculos juntos.",
                    itens: [
                        "<strong>Foliculite:</strong> pápulas e pústulas no folículo, com halo vermelho; couro cabeludo, membros, face (SBP 2022).",
                        "<strong>Furúnculo:</strong> infecção do folículo até o subcutâneo: <strong>nódulo vermelho, doloroso e flutuante</strong>, com pústula; axilas e nádegas; criança em bom estado (SBP 2022). Ultrassom ajuda se a flutuação não é clara.",
                        "<strong>Carbúnculo:</strong> dois ou mais furúnculos juntos, com vários trajetos de drenagem, mais profundo (SBP 2022).",
                        "<strong>Fatores de risco:</strong> eczema, obesidade, desnutrição, imunodeficiência, higiene precária, colonização por MRSA (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleFurunculo"
                },
                {
                    titulo: "Ectima",
                    icone: "🟤",
                    resumo: "Começa como impetigo e ulcera: crosta escura aderente e borda elevada violácea. Ectima gangrenoso: investigar imunidade.",
                    itens: [
                        "Úlceras recobertas por <strong>crosta escura, seca e aderente</strong>, borda elevada violácea; poucas lesões; períneo, nádegas e extremidades. Agente: <em>S. pyogenes</em> (± <em>S. aureus</em>) (SBP 2022).",
                        "<strong>Ectima gangrenoso</strong> (<em>Pseudomonas aeruginosa</em>): <strong>investigar imunodeficiência</strong> (SBP 2022).",
                        "<strong>Diferencial:</strong> leishmaniose, vasculite, CIVD, êmbolos sépticos (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleEctima"
                },
                {
                    titulo: "Paroníquia, dactilite bolhosa e dermatite perianal",
                    icone: "🖐️",
                    resumo: "Paroníquia: prega da unha com pus. Dactilite: bolha na ponta do dedo. Perianal: eritema brilhante ao redor do ânus.",
                    itens: [
                        "<strong>Paroníquia aguda:</strong> após trauma da cutícula: prega ungueal vermelha, inchada, dolorosa, com pus; pode deixar distrofia da unha na criança (SBP 2022).",
                        "<strong>Dactilite bolhosa:</strong> bolha oval de 10 a 30 mm na falange distal (2 a 16 anos), por estreptococo ou estafilococo (SBP 2022).",
                        "<strong>Dermatite estreptocócica perianal:</strong> eritema <strong>brilhante e bem delimitado</strong> ao redor do ânus, prurido, dor ao evacuar, fezes com estrias de sangue; meninos de 6 meses a 10 anos. Confirmar com swab e cultura. Diferencial: dermatite de fralda, candidíase, <strong>abuso sexual</strong> (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleParoniquia"
                },
                {
                    titulo: "Erisipela",
                    icone: "🟠",
                    resumo: "Placa vermelha elevada, borda bem definida, início rápido, nas pernas ou na face. Estreptococo do grupo A.",
                    itens: [
                        "Derme superficial e linfáticos: <strong>placa vermelha, elevada e bem delimitada</strong>, nas pernas ou na face (após infecção da nasofaringe) (SBP 2022).",
                        "Mal-estar, febre e calafrios podem vir <strong>48 h antes</strong> da lesão; ardor e dor; formas graves com bolhas e necrose (SBP 2022).",
                        "<strong>Exames:</strong> não necessários; hemograma e cultura só no imunocomprometido (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleErisipela"
                },
                {
                    titulo: "Celulite",
                    icone: "🔶",
                    resumo: "Eritema, calor, dor e edema com borda mal definida e evolução mais lenta. Maioria por S. aureus. Marcar a borda.",
                    itens: [
                        "Derme profunda e subcutâneo: eritema, calor, dor, edema, <strong>limites mal definidos</strong>, evolução mais lenta; pode ter febre e adenomegalia. Maioria por <strong><em>S. aureus</em></strong> (SBP 2022).",
                        "<strong>Marcar a borda</strong> com caneta para acompanhar a evolução.",
                        "<strong>Exames:</strong> não na forma leve. Hemocultura se bacteremia/sepse. Ultrassom, tomografia ou ressonância se suspeita de <strong>abscesso</strong> ou <strong>fasciíte</strong> (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleCelulite"
                },
                {
                    titulo: "Celulite periorbitária e orbitária",
                    icone: "👁️",
                    resumo: "Pré-septal: pálpebra inchada, olho mexe e enxerga normal. Orbitária: proptose, dor ao mexer o olho, queda da visão.",
                    itens: [
                        "<strong>Periorbitária (pré-septal):</strong> edema e hiperemia da pálpebra, quemose; movimentação ocular e visão normais (Whitebook).",
                        "<strong>Orbitária:</strong> febre, edema, hiperemia e dor ocular, <strong>dor à movimentação ocular</strong>, <strong>proptose</strong>, <strong>oftalmoplegia com diplopia</strong>, <strong>queda da acuidade visual</strong> (Whitebook). Pode ter cefaleia, alteração de sensório, náuseas e vômitos (SNC), descarga nasal e tosse.",
                        "<strong>Sinais de alarme</strong> (Whitebook): febre, proptose, dor ao mexer o olho, redução da acuidade visual, alteração da visão de cores e dos reflexos pupilares.",
                        "<strong>Complicações</strong> (Whitebook): abscesso subperiosteal, abscesso orbitário, cegueira, tromboflebite do seio cavernoso, abscesso cerebral. Classificação de Chandler: conduta de <strong>sinusite</strong>."
                    ]
                },
                {
                    titulo: "Síndrome da pele escaldada estafilocócica",
                    icone: "🚨",
                    resumo: "Lactente com febre, eritema doloroso, bolhas flácidas, pele que descola (Nikolsky), rágades periorais, sem mucosa.",
                    alerta: true,
                    itens: [
                        "Emergência. Menor de 2 anos com febre e irritabilidade; em 24 a 48 h, <strong>eritema doloroso</strong> na face e nas dobras, <strong>bolhas grandes e flácidas</strong>, <strong>pele que descola ao toque (Nikolsky)</strong>, <strong>rágades ao redor da boca</strong>, <strong>sem lesão de mucosa</strong> (diferencia da necrólise epidérmica tóxica) (SBP 2022).",
                        "Foco distante: vias aéreas, ouvido, conjuntiva, coto umbilical. Hemocultura e cultura da bolha costumam ser negativas (SBP 2022).",
                        "<strong>Diferencial:</strong> impetigo bolhoso, choque tóxico, Kawasaki, queimadura, Stevens-Johnson/NET (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleSsss"
                },
                {
                    titulo: "Fasciíte necrosante",
                    icone: "🚨",
                    resumo: "Parece celulite, mas a dor é desproporcional; em 24–72 h fica violácea, com bolhas hemorrágicas e toxemia.",
                    alerta: true,
                    itens: [
                        "Começa parecendo celulite ou erisipela, mas com <strong>dor desproporcional</strong> à lesão; em 24 a 72 h fica <strong>violácea</strong>, com bolhas hemorrágicas e endurecimento além do eritema; febre, letargia, toxemia. Pode vir após <strong>varicela</strong>, trauma ou picada. Mortalidade até 40% (SBP 2022).",
                        "<strong>Outros sinais:</strong> crepitação, anestesia da pele, progressão em horas, choque.",
                        "Diagnóstico clínico; ultrassom pode ajudar no instável. <strong>Não esperar imagem para chamar o cirurgião</strong> (SBP 2022)."
                    ],
                    ferramenta: "ferramentaPeleFasciite"
                }
            ]
        },
        {
            titulo: "Condução na emergência / hospitalar",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Decida se interna, drene o que tiver pus e abra o tratamento da doença.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "Internar? → gravidade, exames e drenagem → tratamento EV da doença → reavaliar em 48 h e passar para via oral.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar / UTI?</strong> Lactente, toxemia, extensão, falha do oral, sinais de alarme",
                        "<span class=\"cond-passo\">2</span> <strong>Gravidade, exames e drenagem</strong>: marcar a borda, hemocultura se toxemia, drenar abscesso",
                        "<span class=\"cond-passo\">3</span> <strong>Tratamento EV da doença</strong>: erisipela, celulite, celulite orbitária, ectima, pele escaldada ou fasciíte",
                        "<span class=\"cond-passo\">4</span> <strong>Reavaliar em 48 h</strong> e passar para via oral"
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
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Abrir o tratamento EV da doença (passo 3), marcar a borda, reavaliar em 24 a 48 h." };
                            if (g === 1) return { num: "?", rotulo: "Considerar internar", cor: "#ca8a04", texto: "Se tratar em casa, garantir retorno em 24 a 48 h." };
                            return { num: "🏠", rotulo: "Tratamento em casa", cor: "#16a34a", texto: "Abrir o tratamento da doença no bloco 🏠, com retorno se piorar ou sem melhora em 48 a 72 h." };
                        },
                        nota: "SBP 2022: hospitalizar a celulite grave ou sem resposta ao oral; erisipela em lactentes, imunocomprometidos, baixa adesão ou falha ambulatorial; pele escaldada grave em unidade de queimados. Whitebook (erisipela): internar erisipela grave, falha do oral, imunossupressão, sinais sistêmicos ou impossibilidade de via oral. Os demais critérios vêm dos sinais de gravidade (SBP 2022; IDSA 2014)."
                    }
                },
                {
                    passo: 2,
                    titulo: "Gravidade, exames e drenagem",
                    resumo: "Marcar a borda, sinais vitais, hemocultura se toxemia, ultrassom se dúvida de abscesso. Abscesso flutuante: incisão e drenagem.",
                    itens: [
                        "<strong>Marcar a borda</strong> do eritema e anotar a hora. <strong>Sinais vitais e perfusão</strong>; sepse ou choque: conduta de <strong>sepse</strong>.",
                        "<strong>Hemocultura</strong> se toxemia, imunodepressão, sepse ou celulite extensa; cultura da secreção ou da punção (SBP 2022).",
                        "<strong>Ultrassom</strong> se não está claro se há abscesso (SBP 2022). Celulite orbitária: tomografia de órbitas e seios com contraste.",
                        "<strong>Abscesso ou furúnculo flutuante: incisão e drenagem</strong>, o tratamento principal (SBP 2022; IDSA 2014)."
                    ]
                },
                {
                    passo: 3,
                    titulo: "Tratamento: erisipela internada",
                    resumo: "Ceftriaxona, cefazolina ou oxacilina EV; trocar para via oral quando melhorar e tolerar.",
                    alerta: true,
                    itens: [
                        "<strong>Indicação</strong> (Whitebook): erisipela grave, falha do tratamento oral, imunossupressão, sinais sistêmicos ou impossibilidade de via oral.",
                        "<strong>Escolher uma opção</strong> (Whitebook): <strong>ceftriaxona</strong> 50–75 mg/kg/dia de 12/12 ou 24/24h, <strong>cefazolina</strong> 50–100 mg/kg/dia de 8/8h ou <strong>oxacilina</strong> 100–150 mg/kg/dia de 6/6h.",
                        "<strong>Trocar para via oral</strong> quando houver melhora clínica e tolerância (Whitebook), completando com o esquema do bloco 🏠.",
                        "<strong>Cuidados:</strong> dieta oral própria para a idade, hidratação conforme a clínica, membro elevado, repouso relativo, tratar fissuras e descamação (Whitebook). Dor ou febre: dipirona ou paracetamol; vômitos: ondansetrona ou bromoprida (Whitebook)."
                    ],
                    remedios: ["cef_erisipela", "cefazolina_erisipela", "oxa_erisipela", "dip_inj", "ondan_ev"]
                },
                {
                    passo: 3,
                    titulo: "Tratamento: celulite internada",
                    resumo: "Purulenta, refratária, sistêmica ou MRSA: clindamicina, SMX-TMP, linezolida ou vancomicina. Neonato: cefotaxima, ou gentamicina + vancomicina. Sem pus: oxacilina.",
                    alerta: true,
                    itens: [
                        "<strong>Esquema A</strong> (Whitebook) — exsudato purulento, refratária, sinais de doença sistêmica, recorrente com condição predisponente ou <strong>MRSA prévio</strong>: <strong>clindamicina EV</strong> 20–40 mg/kg/dia de 6/6 ou 8/8h (máx. 2.700 mg/dia), <strong>sulfametoxazol-trimetoprima EV</strong> 8–12 mg TMP/kg/dia de 12/12h (máx. 160 mg/dose), <strong>linezolida</strong> (máx. 600 mg/dose) ou <strong>vancomicina</strong> 40–60 mg/kg/dia de 6/6h (nível sérico, máx. 4 g/dia), por 7 a 14 dias.",
                        "<strong>Esquema B</strong> (Whitebook) — <strong>recém-nascido</strong>: <strong>cefotaxima</strong> (até 1 semana: 50–100 mg/kg/dia de 12/12h; 1 a 4 semanas: 75–100 mg/kg/dia de 8/8h) <strong>ou gentamicina</strong> 4 mg/kg/dose de 24/24h <strong>+ vancomicina</strong>, por 7 a 14 dias.",
                        "<strong>Celulite grave sem pus e sem risco de MRSA:</strong> <strong>oxacilina</strong> é a 1ª escolha EV da SBP; cefazolina, cefuroxima ou ceftriaxona são opções. Alergia à penicilina: clindamicina ou vancomicina (SBP 2022).",
                        "<strong>Cuidados</strong> (Whitebook): dieta oral própria para a idade; dor ou febre: dipirona ou paracetamol; vômitos: ondansetrona."
                    ],
                    remedios: ["clindamicina", "linezolida_ev", "vancomicina", "cefotax_neo_sepse", "genta_neo_sepse", "oxacilina", "cefazolina_erisipela", "dip_inj", "ondan_ev"]
                },
                {
                    passo: 3,
                    titulo: "Tratamento: celulite orbitária",
                    resumo: "Vancomicina + ceftriaxona (ou cefotaxima) por 2–3 semanas; + metronidazol se SNC, sinusite crônica ou foco dentário. Oftalmologia.",
                    alerta: true,
                    itens: [
                        "<strong>Esquema A</strong> (preferencial, Whitebook): <strong>vancomicina</strong> 60 mg/kg/dia de 6/6h <strong>+ ceftriaxona</strong> 100 mg/kg/dia de 12/12h.",
                        "<strong>Esquema B</strong> (alternativa à ceftriaxona): vancomicina <strong>+ cefotaxima</strong> 150–200 mg/kg/dia de 8/8h (máx. 12 g/dia).",
                        "<strong>Esquema C</strong> (anaeróbios: sinais de infecção do SNC, sinusite crônica ou foco odontológico): A ou B <strong>+ metronidazol</strong> 30 mg/kg/dia de 8/8h (máx. 500 mg/dose).",
                        "<strong>Duração:</strong> 2 a 3 semanas ou até a resolução (Whitebook).",
                        "<strong>Cuidados</strong> (Whitebook): sinais vitais de 6/6 h; <strong>avaliação da oftalmologia</strong>; acuidade visual e reflexos pupilares todos os dias; <strong>sem melhora em 24 a 48 h</strong>: nova imagem (abscesso) e avaliar cirurgia; jejum se cirurgia, com hidratação basal.",
                        "<strong>Celulite pré-septal leve</strong> em criança bem: pode ser tratada por via oral (veja a conduta de sinusite)."
                    ],
                    remedios: ["vanco_orbitaria", "cef_orbitaria", "cefotax_orbitaria", "metro_orbitaria", "dip_inj", "ondan_ev"]
                },
                {
                    passo: 3,
                    titulo: "Tratamento: ectima extenso ou gangrenoso",
                    resumo: "Antibiótico sistêmico; extenso: EV. Ectima gangrenoso: cobrir Pseudomonas e investigar imunodeficiência.",
                    itens: [
                        "Tratar com <strong>antibióticos sistêmicos</strong>; nos casos extensos, de preferência <strong>EV com cobertura para <em>P. aeruginosa</em></strong> (SBP 2022).",
                        "A SBP não define o antibiótico. Para cobertura de <em>Pseudomonas</em>, os cards de cefepime ou ceftazidima estão abaixo; ajustar pela cultura.",
                        "<strong>Investigar imunodeficiência</strong> no ectima gangrenoso (SBP 2022)."
                    ],
                    remedios: ["cefepime", "ceftazidima"]
                },
                {
                    passo: 3,
                    titulo: "Tratamento: síndrome da pele escaldada",
                    resumo: "Antibiótico sistêmico sempre: oxacilina (+ clindamicina); vancomicina só se MRSA. Suporte como queimado e isolamento.",
                    alerta: true,
                    itens: [
                        "<strong>Antibiótico sistêmico sempre</strong>: tópico isolado não funciona (SBP 2022).",
                        "<strong>Oxacilina</strong> é a escolha; <strong>clindamicina</strong> deve ser considerada de 1ª linha (reduz a toxina); <strong>vancomicina</strong> só se suspeita de MRSA (SBP 2022).",
                        "<strong>Forma leve localizada:</strong> antibiótico oral e seguimento próximo (SBP 2022).",
                        "<strong>Grave:</strong> internar, de preferência em <strong>unidade de queimados</strong>; controlar desidratação, temperatura (hipotermia), dor e nutrição. <strong>Evitar sulfadiazina de prata</strong> (SBP 2022).",
                        "<strong>Isolar</strong> o paciente (surtos em creches e berçários) (SBP 2022).",
                        "Evolução: febre cai em poucos dias, descamação em ~5 dias, cura em 2 semanas, geralmente sem cicatriz (SBP 2022)."
                    ],
                    remedios: ["oxacilina", "clindamicina", "vancomicina"]
                },
                {
                    passo: 3,
                    titulo: "Tratamento: fasciíte necrosante",
                    resumo: "Cirurgia urgente (desbridamento) + vancomicina ou linezolida + piperacilina-tazobactam ou meropenem, + clindamicina.",
                    alerta: true,
                    itens: [
                        "<strong>Desbridamento cirúrgico precoce</strong> é essencial (SBP 2022).",
                        "<strong>Antibiótico de amplo espectro já:</strong> cobertura de <strong>MRSA</strong> (vancomicina ou linezolida) + <strong>gram-negativos</strong> (piperacilina-tazobactam; meropenem ou imipenem se alta prevalência de ESBL) e anaeróbios (SBP 2022).",
                        "<strong>Clindamicina</strong> associada na infecção pelo estreptococo do grupo A, para reduzir a toxina (IDSA 2014).",
                        "<strong>Imunoglobulina EV</strong>: considerar na fasciíte com síndrome do choque tóxico estreptocócico (SBP 2022).",
                        "<strong>Choque:</strong> conduta de sepse."
                    ],
                    remedios: ["vancomicina", "linezolida_ev", "meropenem", "clindamicina"]
                },
                {
                    passo: 4,
                    titulo: "Reavaliar em 48 h e passar para via oral",
                    resumo: "Borda regrediu? Febre cedeu? Passar para oral (bloco 🏠). Sem melhora: abscesso, MRSA ou fasciíte.",
                    itens: [
                        "<strong>Reavaliar em 24 a 48 h</strong> a borda marcada, a febre e a dor.",
                        "<strong>Melhora:</strong> passar para <strong>via oral</strong> e completar em casa com o esquema da doença (bloco 🏠).",
                        "<strong>Falha:</strong> pensar em MRSA, abscesso não drenado, outra bactéria ou fasciíte (SBP 2022)."
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
                    titulo: "Tratamento: impetigo",
                    icone: "🟡",
                    resumo: "Poucas lesões: mupirocina (> 3 meses) ou ácido fusídico por 5–7 dias. Sistêmico se > 5 lesões, bolhoso, febre, profundo: cefalexina (alérgico ou MRSA: outras).",
                    itens: [
                        "<strong>Tópico</strong> (localizado, não complicado, poucas lesões): <strong>mupirocina 2%</strong> (maiores de 3 meses) ou <strong>ácido fusídico 2%</strong> (pode em menores de 3 meses), 2 a 3 vezes ao dia por 5 a 7 dias (Whitebook). Bacitracina não é mais recomendada (SBP 2022).",
                        "<strong>Sistêmico</strong> (Whitebook) se: acometimento profundo, <strong>mais de 5 lesões</strong>, <strong>bolhoso</strong>, <strong>febre</strong>, linfadenomegalia, faringite com lesões perto da boca, <strong>couro cabeludo</strong>, surto de glomerulonefrite pós-estreptocócica. A SBP acrescenta: mais de 2% da superfície corporal e menores de 2 anos (SBP 2022). <strong>Sempre junto com o tópico.</strong>",
                        "↳ <strong>Esquema A (empírico): cefalexina</strong> 25–50 mg/kg/dia de 6/6h por 7 a 10 dias.",
                        "↳ <strong>Esquema B (alérgico à penicilina):</strong> eritromicina, claritromicina, sulfametoxazol-trimetoprima ou clindamicina.",
                        "↳ <strong>Esquema C (MRSA):</strong> sulfametoxazol-trimetoprima, clindamicina ou doxiciclina (a partir de 8 anos).",
                        "<strong>Higiene</strong> (Whitebook): lavar com água morna e sabonete neutro para remover as crostas; unhas curtas e limpas; não compartilhar toalhas e roupas de cama. <strong>Clorexidina degermante</strong> só nos recorrentes ou com suspeita de MRSA.",
                        "<strong>Recorrente:</strong> cultura e descolonização do paciente e da família (SBP 2022)."
                    ],
                    remedios: ["pele_mupi", "fusidico_impetigo", "cefalexina_impetigo", "eritro_impetigo", "claritro_impetigo", "smx_impetigo", "clinda_vo_impetigo", "doxi_impetigo"]
                },
                {
                    titulo: "Tratamento: foliculite",
                    icone: "🔴",
                    resumo: "Poucas pústulas: melhora sozinha. Extensa: antisséptico e antibiótico tópico (mupirocina, ácido fusídico).",
                    itens: [
                        "Poucas pústulas resolvem sozinhas em alguns dias (SBP 2022).",
                        "<strong>Extensa:</strong> antissépticos e <strong>antibiótico tópico</strong>: mupirocina, ácido fusídico ou clindamicina tópica (SBP 2022). Sem melhora: rever o diagnóstico (acne, escabiose, ceratose pilar)."
                    ],
                    remedios: ["pele_mupi", "fusidico_impetigo"]
                },
                {
                    titulo: "Tratamento: furúnculo, carbúnculo e abscesso",
                    icone: "🔴",
                    resumo: "Calor local e drenagem. Antibiótico (SMX-TMP ou clindamicina, ≥ 7 dias) se halo > 2 cm ou carbúnculo. Recorrente: descolonizar.",
                    itens: [
                        "<strong>Calor local</strong> e <strong>drenagem</strong> sempre que houver flutuação, se não drenou sozinho (SBP 2022).",
                        "<strong>Antibiótico sistêmico</strong> se <strong>halo de eritema &gt; 2 cm</strong> ou <strong>carbúnculo</strong>: com ação contra MRSA, <strong>sulfametoxazol-trimetoprima ou clindamicina</strong> por pelo menos <strong>7 dias</strong> (SBP 2022). Também se área de difícil drenagem (face, mãos, genitália), sinais sistêmicos ou imunodepressão (IDSA 2014).",
                        "A SBP não traz a dose: os cards abaixo usam a dose do Whitebook para pele (impetigo).",
                        "<strong>Furunculose de repetição:</strong> descolonizar paciente e contatos da casa com <strong>mupirocina nasal 2 vezes ao dia por 5 dias</strong> (evidência fraca) (SBP 2022)."
                    ],
                    remedios: ["smx_impetigo", "clinda_vo_impetigo", "pele_mupi"]
                },
                {
                    titulo: "Tratamento: ectima",
                    icone: "🟤",
                    resumo: "Antibiótico sistêmico (oral se poucas lesões). Extenso ou gangrenoso: EV (bloco 🚨).",
                    itens: [
                        "<strong>Antibiótico sistêmico</strong> (SBP 2022); a SBP não define a droga oral. Como é infecção por estreptococo e estafilococo, usar o <strong>esquema sistêmico do impetigo</strong> (cefalexina; alérgico: macrolídeo ou clindamicina).",
                        "<strong>Extenso ou gangrenoso:</strong> EV com cobertura de <em>Pseudomonas</em> (bloco 🚨)."
                    ],
                    remedios: ["cefalexina_impetigo", "claritro_impetigo", "clinda_vo_impetigo"]
                },
                {
                    titulo: "Tratamento: paroníquia e dactilite bolhosa",
                    icone: "🖐️",
                    resumo: "Paroníquia: tópico; com pus: drenar + cefalosporina de 1ª geração ou amoxi-clavulanato por 10 dias. Dactilite: drenar + cefalexina.",
                    itens: [
                        "<strong>Paroníquia aguda:</strong> antibiótico tópico; com pus, <strong>drenagem</strong> e antibiótico oral: <strong>amoxicilina-clavulanato ou cefalosporina de 1ª geração por 10 dias</strong> (SBP 2022).",
                        "<strong>Dactilite bolhosa:</strong> <strong>incisão e drenagem</strong>, compressas mornas e antibiótico oral resistente à betalactamase, como a <strong>cefalexina</strong> (SBP 2022).",
                        "A SBP não traz a dose: os cards abaixo usam a dose do Whitebook para pele (impetigo e erisipela)."
                    ],
                    remedios: ["pele_mupi", "fusidico_impetigo", "cefalexina_impetigo", "clav_erisipela"]
                },
                {
                    titulo: "Tratamento: dermatite estreptocócica perianal",
                    icone: "🩹",
                    resumo: "Sempre sistêmico: penicilina, amoxicilina ou cefalosporina. Swab de controle para garantir a erradicação.",
                    itens: [
                        "Tratamento <strong>sistêmico</strong>: <strong>penicilina, amoxicilina ou cefalosporinas</strong>, com melhora rápida (SBP 2022).",
                        "Colher <strong>swab perianal e cultura</strong> para garantir a erradicação; o atraso no diagnóstico causa constipação em 50% (SBP 2022).",
                        "A SBP não traz a dose: os cards abaixo usam a dose do Whitebook para infecção estreptocócica de pele (erisipela)."
                    ],
                    remedios: ["amox_erisipela", "benza", "cefalexina_erisipela"]
                },
                {
                    titulo: "Tratamento: erisipela",
                    icone: "🟠",
                    resumo: "Amoxicilina, amoxi-clavulanato, penicilina benzatina (dose única) ou cefalexina por 5 dias. Repouso e membro elevado.",
                    itens: [
                        "<strong>Formas leves</strong> (Whitebook), escolher uma: <strong>amoxicilina</strong> 50 mg/kg/dia, <strong>amoxicilina-clavulanato</strong> 30–50 mg/kg/dia, <strong>penicilina benzatina</strong> IM dose única (&lt; 27 kg: 600.000 UI; ≥ 27 kg: 1.200.000 UI) ou <strong>cefalexina</strong> 50–100 mg/kg/dia, <strong>por 5 dias</strong>. A penicilina é a 1ª linha também na SBP 2022.",
                        "<strong>Cuidados</strong> (Whitebook): repouso relativo, <strong>membro elevado</strong>, identificar e tratar fatores predisponentes (fissuras, descamação da pele). Compressas frias, hidratação e antitérmico (SBP 2022).",
                        "<strong>Erisipela recorrente:</strong> penicilina oral ou eritromicina 2 vezes ao dia por 4 a 5 semanas, ou <strong>penicilina benzatina IM a cada 2 a 4 semanas</strong>; tratar o fator predisponente (SBP 2022).",
                        "<strong>Retorno em 48 a 72 h</strong>; antes se a borda passar da marcação, febre persistir ou a dor aumentar."
                    ],
                    remedios: ["amox_erisipela", "clav_erisipela", "benza", "cefalexina_erisipela"]
                },
                {
                    titulo: "Tratamento: celulite não complicada",
                    icone: "🔶",
                    resumo: "Cefalexina, cefadroxila ou sulfametoxazol-trimetoprima por 7 a 14 dias. Marcar a borda e reavaliar em 48–72 h.",
                    itens: [
                        "<strong>Escolher uma</strong> (Whitebook): <strong>cefalexina</strong> 25–100 mg/kg/dia de 6/6h, <strong>cefadroxila</strong> 30 mg/kg/dia de 12/12h ou <strong>sulfametoxazol-trimetoprima</strong> 8–12 mg TMP/kg/dia de 12/12h, por <strong>7 a 14 dias</strong>.",
                        "A SBP também aceita amoxicilina-clavulanato; alergia imediata à penicilina: clindamicina ou macrolídeo (SBP 2022).",
                        "<strong>Suporte:</strong> elevar a área, analgésico/antitérmico (Whitebook: dipirona ou paracetamol se dor ou febre).",
                        "<strong>Retorno em 48 a 72 h</strong>; antes se a borda passar da marcação, febre persistir ou a dor aumentar muito."
                    ],
                    remedios: ["cefalexina_celulite", "cefadroxila_celulite", "smx_celulite", "dip_gts", "pct_gts"]
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
        "Whitebook (Afya). Guia de Prescrição / Pediatria: Impetigo; Celulite (03/04/2025); Celulite Orbitária em Pediatria (23/04/2026); Erisipela em Pediatria (12/03/2026). Prescrição Ambulatorial e Hospitalar."
    ],
    revisao: "10/2026"
});
