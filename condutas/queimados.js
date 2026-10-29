// =====================================================
// CONDUTA: QUEIMADURAS NA CRIANÇA
// Ferramenta: boneco clicável (frente e costas) com a tabela de
// Lund-Browder, que muda as proporções conforme a idade (a cabeça
// do lactente vale mais, as pernas valem menos). Cada toque numa
// região: inteira → metade → limpa. Soma a % de SCQ.
// O restante da conduta (profundidade, hidratação, analgesia,
// curativo, transferência) entra com o material do Dr. Jonas.
// =====================================================

// Lund-Browder: A = metade da cabeça (frente OU costas), B = metade de UMA coxa,
// C = metade de UMA perna. Faixas: < 1 ano · 1–4 · 5–9 · 10–14 · 15 anos · adulto.
const LUND_BROWDER = {
    faixas: ["< 1 ano", "1 a 4 anos", "5 a 9 anos", "10 a 14 anos", "15 anos", "Adulto"],
    A: [9.5, 8.5, 6.5, 5.5, 4.5, 3.5],
    B: [2.75, 3.25, 4, 4.25, 4.5, 4.75],
    C: [2.5, 2.5, 2.75, 3, 3.25, 3.5],
    cabecaRx: [33, 31, 28, 26, 24, 23],
    cabecaRy: [35, 33, 30, 28, 27, 26]
};

// Regiões: id, nome, vista (f = frente, p = costas), forma SVG e valor (% da SC).
// Na frente, o lado direito do paciente fica à esquerda da tela; nas costas, à direita.
const QUEIMADOS_REGIOES = [
    // ---- FRENTE ----
    { id: "pescoco_f", nome: "Pescoço (frente)", v: "f", r: [90, 66, 20, 24], val: () => 1 },
    { id: "tronco_f", nome: "Tronco anterior (tórax + abdome)", v: "f", r: [62, 88, 76, 118], val: () => 13 },
    { id: "braco_d_f", nome: "Braço D (frente)", v: "f", r: [38, 92, 22, 64], val: () => 2 },
    { id: "braco_e_f", nome: "Braço E (frente)", v: "f", r: [140, 92, 22, 64], val: () => 2 },
    { id: "antebraco_d_f", nome: "Antebraço D (frente)", v: "f", r: [34, 158, 22, 56], val: () => 1.5 },
    { id: "antebraco_e_f", nome: "Antebraço E (frente)", v: "f", r: [144, 158, 22, 56], val: () => 1.5 },
    { id: "mao_d_f", nome: "Mão D (palma)", v: "f", e: [45, 229, 11, 14], val: () => 1.25 },
    { id: "mao_e_f", nome: "Mão E (palma)", v: "f", e: [155, 229, 11, 14], val: () => 1.25 },
    { id: "coxa_d_f", nome: "Coxa D (frente)", v: "f", r: [64, 208, 34, 82], val: f => LUND_BROWDER.B[f] },
    { id: "coxa_e_f", nome: "Coxa E (frente)", v: "f", r: [102, 208, 34, 82], val: f => LUND_BROWDER.B[f] },
    { id: "perna_d_f", nome: "Perna D (frente)", v: "f", r: [66, 292, 30, 78], val: f => LUND_BROWDER.C[f] },
    { id: "perna_e_f", nome: "Perna E (frente)", v: "f", r: [104, 292, 30, 78], val: f => LUND_BROWDER.C[f] },
    { id: "pe_d_f", nome: "Pé D (dorso)", v: "f", r: [58, 372, 40, 16], val: () => 1.75 },
    { id: "pe_e_f", nome: "Pé E (dorso)", v: "f", r: [102, 372, 40, 16], val: () => 1.75 },
    { id: "genitalia", nome: "Genitália / períneo", v: "f", r: [90, 204, 20, 16], val: () => 1 },
    { id: "cabeca_f", nome: "Cabeça (face)", v: "f", cab: true, val: f => LUND_BROWDER.A[f] },
    // ---- COSTAS ----
    { id: "pescoco_p", nome: "Pescoço (nuca)", v: "p", r: [90, 66, 20, 24], val: () => 1 },
    { id: "tronco_p", nome: "Tronco posterior (dorso + lombar)", v: "p", r: [62, 88, 76, 110], val: () => 13 },
    { id: "braco_e_p", nome: "Braço E (costas)", v: "p", r: [38, 92, 22, 64], val: () => 2 },
    { id: "braco_d_p", nome: "Braço D (costas)", v: "p", r: [140, 92, 22, 64], val: () => 2 },
    { id: "antebraco_e_p", nome: "Antebraço E (costas)", v: "p", r: [34, 158, 22, 56], val: () => 1.5 },
    { id: "antebraco_d_p", nome: "Antebraço D (costas)", v: "p", r: [144, 158, 22, 56], val: () => 1.5 },
    { id: "mao_e_p", nome: "Mão E (dorso)", v: "p", e: [45, 229, 11, 14], val: () => 1.25 },
    { id: "mao_d_p", nome: "Mão D (dorso)", v: "p", e: [155, 229, 11, 14], val: () => 1.25 },
    { id: "nadega_e", nome: "Nádega E", v: "p", r: [62, 196, 37, 30], val: () => 2.5 },
    { id: "nadega_d", nome: "Nádega D", v: "p", r: [101, 196, 37, 30], val: () => 2.5 },
    { id: "coxa_e_p", nome: "Coxa E (costas)", v: "p", r: [64, 228, 34, 62], val: f => LUND_BROWDER.B[f] },
    { id: "coxa_d_p", nome: "Coxa D (costas)", v: "p", r: [102, 228, 34, 62], val: f => LUND_BROWDER.B[f] },
    { id: "perna_e_p", nome: "Perna E (panturrilha)", v: "p", r: [66, 292, 30, 78], val: f => LUND_BROWDER.C[f] },
    { id: "perna_d_p", nome: "Perna D (panturrilha)", v: "p", r: [104, 292, 30, 78], val: f => LUND_BROWDER.C[f] },
    { id: "pe_e_p", nome: "Pé E (planta)", v: "p", r: [58, 372, 40, 16], val: () => 1.75 },
    { id: "pe_d_p", nome: "Pé D (planta)", v: "p", r: [102, 372, 40, 16], val: () => 1.75 },
    { id: "cabeca_p", nome: "Cabeça (couro cabeludo / nuca)", v: "p", cab: true, val: f => LUND_BROWDER.A[f] }
];

const queimadosEstado = { faixa: null, marcadas: {} };

function faixaPelaIdade() {
    let i = parseFloat((document.getElementById('idadeInput') || {}).value);
    if (isNaN(i)) return 2;
    return i < 1 ? 0 : i < 5 ? 1 : i < 10 ? 2 : i < 15 ? 3 : i < 16 ? 4 : 5;
}

function svgFiguraQueimados(vista) {
    let f = queimadosEstado.faixa;
    let formas = QUEIMADOS_REGIOES.filter(r => r.v === vista).map(r => {
        let attrs = `class="qm-reg" data-reg="${r.id}" onclick="tocarRegiaoQueimada('${r.id}')"`;
        let titulo = `<title>${r.nome}</title>`;
        if (r.cab) return `<ellipse ${attrs} cx="100" cy="40" rx="${LUND_BROWDER.cabecaRx[f]}" ry="${LUND_BROWDER.cabecaRy[f]}">${titulo}</ellipse>`;
        if (r.e) return `<ellipse ${attrs} cx="${r.e[0]}" cy="${r.e[1]}" rx="${r.e[2]}" ry="${r.e[3]}">${titulo}</ellipse>`;
        return `<rect ${attrs} x="${r.r[0]}" y="${r.r[1]}" width="${r.r[2]}" height="${r.r[3]}" rx="7">${titulo}</rect>`;
    }).join('');
    let ladoE = vista === 'f' ? 'D' : 'E', ladoD = vista === 'f' ? 'E' : 'D';
    return `<figure class="qm-fig"><figcaption>${vista === 'f' ? 'Frente' : 'Costas'}</figcaption>
        <svg viewBox="0 0 200 400" role="img" aria-label="Corpo, ${vista === 'f' ? 'frente' : 'costas'}">
            <defs><pattern id="qm-metade-${vista}" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)"><rect width="8" height="8" fill="#fed7aa"/><rect width="4" height="8" fill="#f97316"/></pattern></defs>
            ${formas}
            <text x="12" y="395" class="qm-lado">${ladoE}</text><text x="182" y="395" class="qm-lado">${ladoD}</text>
        </svg></figure>`;
}

// Chamada pela seção da conduta (campo "ferramenta").
function ferramentaQueimados() {
    if (queimadosEstado.faixa === null) queimadosEstado.faixa = faixaPelaIdade();
    let botoes = LUND_BROWDER.faixas.map((t, k) =>
        `<button type="button" class="qm-faixa${k === queimadosEstado.faixa ? ' ativa' : ''}" onclick="trocarFaixaQueimados(${k})">${t}</button>`).join('');
    setTimeout(atualizarQueimados, 0);
    return `<div class="qm" id="qm">
        <div class="escore-instrucao">👆 Escolha a idade e toque nas áreas queimadas (2º e 3º grau). <strong>1 toque = região inteira · 2 toques = metade · 3 toques = limpa.</strong></div>
        <div class="qm-faixas">${botoes}</div>
        <div class="qm-figuras">${svgFiguraQueimados('f')}${svgFiguraQueimados('p')}</div>
        <div class="qm-legenda"><span class="qm-cor qm-cor-inteira"></span> inteira <span class="qm-cor qm-cor-metade"></span> metade</div>
        <div class="escore-resultado" id="qm-resultado"></div>
        <div class="qm-lista" id="qm-lista"></div>
        <div id="qm-hidratacao"></div>
    </div>`;
}

function tocarRegiaoQueimada(id) {
    let m = queimadosEstado.marcadas;
    m[id] = !m[id] ? 1 : m[id] === 1 ? 0.5 : 0;
    if (!m[id]) delete m[id];
    atualizarQueimados();
}

function trocarFaixaQueimados(k) {
    queimadosEstado.faixa = k;
    let caixa = document.getElementById('qm');
    if (!caixa) return;
    caixa.outerHTML = ferramentaQueimados();
}

function limparQueimados() {
    queimadosEstado.marcadas = {};
    atualizarQueimados();
}

function fmtPct(x) { return (Math.round(x * 100) / 100).toLocaleString('pt-BR'); }

function atualizarQueimados() {
    let f = queimadosEstado.faixa, m = queimadosEstado.marcadas, total = 0, linhas = [];
    QUEIMADOS_REGIOES.forEach(r => {
        let fr = m[r.id] || 0, el = document.querySelector(`#qm [data-reg="${r.id}"]`);
        if (el) el.setAttribute('class', 'qm-reg' + (fr === 1 ? ' qm-inteira' : fr === 0.5 ? ' qm-metade' : ''));
        if (el) el.style.fill = fr === 0.5 ? `url(#qm-metade-${r.v})` : '';
        if (fr) { let v = r.val(f) * fr; total += v; linhas.push(`${r.nome}${fr === 0.5 ? ' (metade)' : ''}: ${fmtPct(v)}%`); }
    });
    let res = document.getElementById('qm-resultado');
    if (!res) return;
    let cor = total === 0 ? '#64748b' : total < 10 ? '#d97706' : '#dc2626';
    res.style.setProperty('--cor-escore', cor);
    res.innerHTML = `<div class="escore-total"><span class="escore-total-num">${fmtPct(total)}%</span><span class="escore-total-de">SCQ</span></div>
        <div class="escore-classe"><strong>${total === 0 ? 'Toque nas áreas queimadas' : 'Superfície corporal queimada'}</strong><span>Lund-Browder · ${LUND_BROWDER.faixas[f]}</span></div>
        ${total ? '<button type="button" class="escore-limpar" onclick="limparQueimados()">Limpar</button>' : ''}`;
    document.getElementById('qm-lista').innerHTML = linhas.length ? `<ul>${linhas.map(l => `<li>${l}</li>`).join('')}</ul>` : '';
    let calc = document.getElementById('qm-hidratacao');
    if (calc) calc.innerHTML = htmlHidratacaoQueimado(total);
}

// Hidratação pelo ATLS (Parkland modificada): adulto/≥ 14 anos 2 mL/kg/%SCQ; ≤ 13 anos 3 mL/kg/%SCQ;
// elétrica 4 mL/kg/%SCQ. Metade nas 8 h desde a queimadura, metade nas 16 h seguintes.
// Crianças ≤ 30 kg: somar manutenção com glicose (Holliday-Segar). Diurese-alvo por peso.
function htmlHidratacaoQueimado(scq) {
    let p = parseFloat((document.getElementById('pesoInput') || {}).value);
    let idade = parseFloat((document.getElementById('idadeInput') || {}).value);
    if (!scq) return '';
    if (isNaN(p) || p <= 0) return `<div class="cond-nota">Digite o <strong>peso</strong> no topo para calcular a hidratação.</div>`;
    let eletrica = !!queimadosEstado.eletrica;
    let adulto = !isNaN(idade) ? idade >= 14 : p > 40;
    let coef = eletrica ? 4 : adulto ? 2 : 3;
    let total = coef * p * scq, h8 = total / 2 / 8, h16 = total / 2 / 16;
    let man = p <= 10 ? p * 4 : p <= 20 ? 40 + (p - 10) * 2 : 60 + (p - 20);
    let diurese = eletrica ? `${(p * 1).toFixed(0)} a ${(p * 1.5).toFixed(0)} mL/h (1 a 1,5 mL/kg/h) até a urina clarear` : p <= 30 ? `${(p * 1).toFixed(0)} mL/h (1 mL/kg/h)` : `${(p * 0.5).toFixed(0)} mL/h (0,5 mL/kg/h)`;
    let f = n => Math.round(n).toLocaleString('pt-BR');
    return `<div class="qm-hid">
        <label class="qm-eletrica"><input type="checkbox" ${eletrica ? 'checked' : ''} onchange="queimadosEstado.eletrica=this.checked; atualizarQueimados()"> Queimadura elétrica (alta voltagem)</label>
        <div class="qm-hid-titulo">💧 Hidratação — ATLS: ${coef} mL × ${String(p).replace('.', ',')} kg × ${fmtPct(scq)}% SCQ</div>
        <ul>
            <li><strong>Total nas primeiras 24 h: ${f(total)} mL de Ringer lactato</strong></li>
            <li><strong>1ª metade em 8 h</strong> (contadas desde a hora da queimadura): ${f(total / 2)} mL = <strong>${f(h8)} mL/h</strong></li>
            <li><strong>2ª metade nas 16 h seguintes</strong>: ${f(total / 2)} mL = <strong>${f(h16)} mL/h</strong></li>
            ${p <= 30 ? `<li><strong>+ Manutenção com glicose</strong> (≤ 30 kg): ${f(man)} mL/h (Holliday-Segar), além da fórmula</li>` : ''}
            <li><strong>Diurese-alvo:</strong> ${diurese}. Sonda vesical. A fórmula é só o ponto de partida: ajustar a velocidade pela diurese.</li>
        </ul>
        <div class="cond-nota">Descontar o volume já recebido e o tempo já passado desde a queimadura. ATLS indica a fórmula para queimaduras de 2º/3º grau ≥ 20% SCQ; em crianças, muitos serviços iniciam hidratação EV a partir de 10–15% (lactentes, a partir de 10%). Coeficientes: ≥ 14 anos 2 mL · ≤ 13 anos 3 mL · elétrica 4 mL.</div>
    </div>`;
}

// Peso/idade mudaram → refaz o cálculo, se o boneco estiver na tela.
['pesoInput', 'idadeInput'].forEach(id => document.getElementById(id)?.addEventListener('input', () => { if (document.getElementById('qm')) atualizarQueimados(); }));

registrarConduta({
    id: "queimados",
    nome: "Queimaduras",
    categoria: "Trauma e Emergência",
    cor: "#ea580c",
    kw: "queimadura queimado queimados scq superficie corporal queimada lund browder regra dos nove parkland escaldadura inalacao fogo eletrica quimica atls",
    resumo: "Boneco clicável (Lund-Browder) para a SCQ com cálculo automático da hidratação pelo ATLS, profundidade, ABCDE do queimado, analgesia, curativo e transferência.",
    legenda: "Conduta conforme o ATLS (American College of Surgeons) para o atendimento inicial do queimado, com Lund-Browder para a SCQ, primeiros socorros e cuidados da ferida pelas diretrizes da ISBI e critérios de transferência da American Burn Association. ⚠️ Os coeficientes da hidratação seguem o ATLS 10ª ed., que segundo resumos publicados se mantiveram na 11ª; confirmar no manual da 11ª edição.",
    padraoTexto: true, // padrão de escrita (rótulo azul, subitens ›, caixa de atenção)

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Calcular a SCQ e a hidratação (boneco clicável)",
                    icone: "🧍",
                    resumo: "Toque nas regiões queimadas: a % de SCQ e o volume do ATLS saem na hora.",
                    ferramenta: "ferramentaQueimados",
                    nota: "Contar só queimaduras de 2º e 3º grau; o 1º grau (só eritema, sem bolha) não entra na SCQ. Na frente, o lado direito do paciente fica à esquerda da tela. A idade e o peso digitados no topo escolhem a faixa e calculam o volume."
                },
                {
                    titulo: "Profundidade da queimadura",
                    icone: "🔥",
                    resumo: "1º grau não conta; 2º profundo e 3º grau vão para cirurgia/centro de queimados.",
                    tabela: {
                        colunas: ["Profundidade", "Aspecto", "Dor e enchimento capilar", "Evolução"],
                        linhas: [
                            ["1º grau (epidérmica)", "Eritema, seca, sem bolha (ex.: sol)", "Dolorosa; empalidece à pressão", "3 a 6 dias, sem cicatriz. Não entra na SCQ"],
                            ["2º grau superficial", "Bolhas, rosada, úmida, brilhante", "Muito dolorosa; enchimento capilar rápido", "10 a 21 dias, pouca cicatriz"],
                            ["2º grau profundo", "Mais pálida ou rosa-manchada, menos úmida, bolhas rotas", "Menos dor; enchimento capilar lento ou ausente", "> 3 semanas; cicatriz hipertrófica; muitas vezes enxerto"],
                            ["3º grau (espessura total)", "Branca, marrom ou negra, seca, coriácea; vasos trombosados", "Indolor (terminações destruídas); não empalidece", "Não cicatriza sozinha: enxerto"]
                        ],
                        nota: "A profundidade pode progredir nas primeiras 48 a 72 h: reavaliar. Na dúvida entre superficial e profunda, tratar como profunda."
                    }
                },
                {
                    titulo: "Como estimar áreas pequenas ou espalhadas",
                    icone: "✋",
                    resumo: "Regra da palma e por que não usar a regra dos 9 na criança.",
                    itens: [
                        "<strong>Regra da palma:</strong> a palma da mão do paciente, com os dedos, corresponde a cerca de 1% da SC. Útil em queimaduras pequenas ou salpicadas.",
                        "Regra dos 9 é para adultos: na criança a cabeça é proporcionalmente maior e as pernas menores. A tabela de Lund-Browder, que corrige pela idade, é a mais precisa em pediatria.",
                        "Região só parcialmente queimada: use \"metade\" no boneco ou some pela regra da palma."
                    ],
                    tabela: {
                        titulo: "Tabela de Lund-Browder (% da SC)",
                        colunas: ["Região", "< 1 a", "1–4 a", "5–9 a", "10–14 a", "15 a", "Adulto"],
                        linhas: [
                            ["A: ½ da cabeça (frente ou costas)", "9,5", "8,5", "6,5", "5,5", "4,5", "3,5"],
                            ["B: ½ de uma coxa", "2,75", "3,25", "4", "4,25", "4,5", "4,75"],
                            ["C: ½ de uma perna", "2,5", "2,5", "2,75", "3", "3,25", "3,5"]
                        ],
                        nota: "Fixos em todas as idades: pescoço 1 + 1 · tronco anterior 13 e posterior 13 · cada nádega 2,5 · genitália 1 · cada braço 2 + 2 · cada antebraço 1,5 + 1,5 · cada mão 1,25 + 1,25 · cada pé 1,75 + 1,75. Total = 100%."
                    }
                },
                {
                    titulo: "Lesão inalatória, CO e cianeto",
                    icone: "🫁",
                    resumo: "Suspeitar em incêndio em ambiente fechado. Saturação normal não exclui CO.",
                    itens: [
                        "<strong>Sinais de lesão inalatória:</strong> queimadura de face e pescoço, sobrancelhas ou vibrissas chamuscadas, depósito de carvão na boca/orofaringe, escarro carbonáceo, rouquidão, estridor, alteração da consciência, história de incêndio em local fechado ou explosão.",
                        "<strong>Monóxido de carbono:</strong> a oximetria de pulso fica falsamente normal. Pedir carboxi-hemoglobina na gasometria. Tratar com O₂ a 100% em máscara com reservatório.",
                        "<strong>Cianeto:</strong> suspeitar em incêndio fechado com acidose lática inexplicada, rebaixamento ou instabilidade."
                    ]
                },
                {
                    titulo: "Suspeita de maus-tratos",
                    icone: "🛑",
                    resumo: "Padrões de imersão, cigarro e história incompatível: notificar.",
                    itens: [
                        "Queimadura por imersão com limites nítidos, em \"luva\" ou \"meia\", simétrica, poupando dobras (flexuras) e a região glútea central.",
                        "Queimaduras de contato com forma de objeto (ferro, grelha) ou de cigarro (circulares, 0,5 a 1 cm).",
                        "História incompatível com a lesão ou com o desenvolvimento da criança, versões diferentes, atraso na procura de atendimento, outras lesões em fases diferentes.",
                        "Na suspeita: proteger a criança (internar se necessário), registrar com detalhes e notificar (Conselho Tutelar / ficha do SINAN)."
                    ]
                },
                {
                    titulo: "Critérios de transferência para centro de queimados",
                    icone: "🚑",
                    resumo: "Critérios da American Burn Association.",
                    itens: [
                        "2º grau (espessura parcial) &gt; 10% SCQ.",
                        "Qualquer 3º grau em criança.",
                        "Queimaduras de face, mãos, pés, genitália, períneo ou grandes articulações.",
                        "Queimaduras elétricas (inclusive raio), químicas ou com lesão inalatória.",
                        "Doença prévia que complique o tratamento ou trauma associado (estabilizar o trauma primeiro, se for o maior risco).",
                        "Hospital sem estrutura ou equipe pediátrica para o caso; necessidade de suporte social, emocional ou suspeita de maus-tratos.",
                        "Revisão de 2020 da ABA (consenso eDelphi): consultar o centro de queimados também em 2º grau profundo ≥ 10% e 3º grau ≥ 5%."
                    ]
                }
            ]
        },
        {
            titulo: "Condução na emergência",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Passo a passo do ATLS, na ordem em que se faz.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "Parar a queimadura → via aérea → O₂ → acesso e volume → SCQ e fórmula → analgesia → ferida → transferir.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Destino:</strong> critérios clicáveis (UTI/centro de queimados · internar · casa). Não atrasa interromper a queimadura e o ABC",
                        "<span class=\"cond-passo\">2</span> <strong>Parar o processo:</strong> retirar roupas e adornos, resfriar com água corrente, evitar hipotermia",
                        "<span class=\"cond-passo\">3</span> <strong>A — via aérea:</strong> sinais de inalação → IOT precoce",
                        "<span class=\"cond-passo\">4</span> <strong>B — respiração:</strong> O₂ 100%, CO, escarotomia de tórax se restringir",
                        "<span class=\"cond-passo\">5</span> <strong>C — circulação:</strong> 2 acessos, taxa inicial por idade, sem bolus (exceto choque)",
                        "<span class=\"cond-passo\">6</span> <strong>Hidratação:</strong> SCQ e fórmula do ATLS pelo boneco; sonda vesical e diurese-alvo",
                        "<span class=\"cond-passo\">7</span> <strong>D e E:</strong> trauma associado, glicemia, aquecer",
                        "<span class=\"cond-passo\">8</span> <strong>Analgesia:</strong> EV, titulada",
                        "<span class=\"cond-passo\">9</span> <strong>Ferida:</strong> cobrir, tétano, escarotomia se circunferencial",
                        "<span class=\"cond-passo\">10</span> <strong>Transferir:</strong> se houver critério (bloco 🔎)"
                    ]
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    icone: "🏥",
                    resumo: "Para decidir o destino. Não atrasa interromper a queimadura e o ABC (passos 2 a 5).",
                    alerta: true,
                    itens: [
                        "Os critérios de transferência para centro de queimados (American Burn Association) estão no bloco 🔎; aqui eles viram a decisão clicável."
                    ],
                    escore: {
                        id: "internacao_queimados",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave. Sem nenhum, toque em \"Nenhum\".",
                        itens: [
                            { nome: "🔴 UTI", opcoes: [[3, "Lesão inalatória ou via aérea ameaçada (fuligem, rouquidão, estridor, queimadura de face e pescoço)", "🔴"]] },
                            { nome: "", opcoes: [[3, "Choque ou instabilidade hemodinâmica", "🔴"]] },
                            { nome: "", opcoes: [[3, "Rebaixamento da consciência (pensar em CO ou cianeto)", "🔴"]] },
                            { nome: "", opcoes: [[3, "Trauma grave associado", "🔴"]] },
                            { nome: "🟠 Internar (enfermaria)", opcoes: [[2, "2º grau (espessura parcial) > 10% da SCQ", "🟠"]] },
                            { nome: "", opcoes: [[2, "Qualquer 3º grau", "🟠"]] },
                            { nome: "", opcoes: [[2, "Face, mãos, pés, genitália, períneo ou grandes articulações", "🟠"]] },
                            { nome: "", opcoes: [[2, "Queimadura elétrica (inclusive raio) ou química", "🟠"]] },
                            { nome: "", opcoes: [[2, "Queimadura circunferencial de membro ou tórax", "🟠"]] },
                            { nome: "", opcoes: [[2, "Doença prévia que complique o tratamento", "🟠"]] },
                            { nome: "", opcoes: [[2, "Suspeita de maus-tratos ou falta de suporte social", "🟠"]] },
                            { nome: "🟢 Nenhum dos acima", opcoes: [[0, "Nenhum critério", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI", cor: "#dc2626", texto: "Via aérea segura, 2 acessos, fórmula do ATLS, sonda vesical; UTI e transferência para centro de queimados (passo 10)." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Internar e contatar o centro de queimados de referência (critérios da American Burn Association)." };
                            return { num: "🏠", rotulo: "Alta com retorno", cor: "#16a34a", texto: "Pequeno queimado sem critério: tratamento em casa (bloco 🏠)." };
                        },
                        nota: "Critérios de transferência da American Burn Association (bloco 🔎). Revisão de 2020 da ABA: consultar também em 2º grau profundo ≥ 10% e 3º grau ≥ 5%."
                    }
                },
                {
                    passo: 2,
                    titulo: "Interromper a queimadura",
                    resumo: "Retirar roupas e adornos; resfriar com água corrente; não usar gelo.",
                    itens: [
                        "Retirar toda a roupa, fraldas, anéis, pulseiras e relógios (o edema vai garrotear). Roupa grudada: cortar ao redor, não arrancar.",
                        "<strong>Resfriar:</strong> água corrente em temperatura ambiente/fria (não gelada) por 20 minutos, se ainda dentro das primeiras 3 horas (ISBI).",
                        { alerta: "nunca gelo, nem pasta de dente, manteiga ou pomadas caseiras." },
                        "Cuidado com hipotermia, sobretudo em lactentes e queimaduras extensas: resfriar só a área queimada e manter o resto coberto e aquecido.",
                        "<strong>Química:</strong> pó seco → escovar antes; depois irrigar com água em abundância por 20 a 30 min (álcalis: mais tempo). Não tentar neutralizar. Olhos: irrigação contínua."
                    ]
                },
                {
                    passo: 3,
                    titulo: "A — via aérea",
                    alerta: true,
                    resumo: "Lesão inalatória: intubar cedo, antes do edema.",
                    itens: [
                        "Avaliar os sinais de lesão inalatória (bloco 🔎). O edema de via aérea piora nas horas seguintes, principalmente com a hidratação.",
                        "Rouquidão, estridor, queimadura profunda de face/pescoço ou circunferencial do pescoço, SCQ extensa ou rebaixamento: intubação precoce pelo profissional mais experiente.",
                        "Usar tubo com cuff e não cortar o tubo (o edema facial aumenta e o tubo curto pode sair).",
                        "Imobilização cervical se houver mecanismo de trauma (explosão, queda, acidente)."
                    ]
                },
                {
                    passo: 4,
                    titulo: "B — respiração",
                    resumo: "O₂ a 100% em todos com suspeita de inalação ou CO.",
                    itens: [
                        "O₂ a 100% por máscara com reservatório se incêndio em local fechado ou suspeita de CO, independentemente da saturação.",
                        "Gasometria com carboxi-hemoglobina e lactato.",
                        "Queimadura circunferencial do tórax/abdome limitando a expansão: escarotomia (cirurgião)."
                    ]
                },
                {
                    passo: 5,
                    titulo: "C — circulação e acesso",
                    resumo: "Dois acessos calibrosos; taxa inicial por idade até calcular a SCQ.",
                    itens: [
                        "Dois acessos periféricos calibrosos, de preferência em pele sã (se preciso, pode ser através da área queimada). Sem acesso: intraósseo.",
                        "Antes de calcular a SCQ, iniciar Ringer lactato na taxa do ATLS: ≤ 5 anos 125 mL/h · 6 a 13 anos 250 mL/h · ≥ 14 anos 500 mL/h.",
                        "Não fazer bolus de rotina. Choque logo na chegada não é esperado só pela queimadura: procurar outra causa (trauma, sangramento) e tratar como choque.",
                        "Colher hemograma, eletrólitos, função renal, glicemia, gasometria com lactato e COHb; tipagem se trauma."
                    ]
                },
                {
                    passo: 6,
                    titulo: "SCQ, fórmula do ATLS e diurese",
                    resumo: "O boneco do bloco 🔎 calcula o volume e a velocidade.",
                    itens: [
                        "Calcular a SCQ (só 2º e 3º grau) no boneco do bloco 🔎: ele já mostra o volume e as velocidades.",
                        "<strong>Fórmula do ATLS (Ringer lactato, 24 h):</strong> ≤ 13 anos: 3 mL × kg × %SCQ · ≥ 14 anos: 2 mL × kg × %SCQ · elétrica: 4 mL × kg × %SCQ.",
                        "Metade nas primeiras 8 h contadas desde a hora da queimadura (não da chegada); a outra metade nas 16 h seguintes.",
                        "<strong>Crianças ≤ 30 kg:</strong> somar soro de manutenção com glicose (risco de hipoglicemia: pouca reserva de glicogênio).",
                        "Sonda vesical e diurese horária. Alvo: 1 mL/kg/h em ≤ 30 kg · 0,5 mL/kg/h em > 30 kg · elétrica com urina escura (mioglobinúria): 1 a 1,5 mL/kg/h até clarear.",
                        "A fórmula é só o ponto de partida: aumentar ou reduzir a velocidade pela diurese. Excesso de volume causa edema, síndrome compartimental e piora respiratória (\"fluid creep\")."
                    ]
                },
                {
                    passo: 7,
                    titulo: "D e E — neurológico, trauma associado e temperatura",
                    resumo: "Rebaixamento: pensar em CO, hipóxia, TCE, hipoglicemia.",
                    itens: [
                        "Rebaixamento de consciência: pensar em CO, cianeto, hipóxia, TCE ou hipoglicemia. Glicemia capilar.",
                        "Exame secundário completo à procura de trauma associado (explosão, queda, choque elétrico com arremesso).",
                        "<strong>Elétrica:</strong> ECG e monitorização cardíaca; procurar pontos de entrada e saída; a lesão interna pode ser muito maior que a da pele (rabdomiólise, síndrome compartimental).",
                        "Manter o ambiente aquecido, soros aquecidos, cobrir o paciente."
                    ]
                },
                {
                    passo: 8,
                    titulo: "Analgesia",
                    resumo: "Dor intensa: opioide EV em doses pequenas e tituladas.",
                    itens: [
                        "Queimadura dói muito, sobretudo o 2º grau superficial. Cobrir a ferida já alivia (o ar na ferida dói).",
                        "Dor leve a moderada: dipirona ou paracetamol. Dor intensa ou queimadura extensa: opioide EV em doses pequenas, tituladas pela resposta (preferir EV: a absorção IM/SC é irregular no queimado), conforme o protocolo do serviço.",
                        "Sedação/analgesia para curativos extensos: cetamina é uma boa opção (mantém a via aérea e a pressão)."
                    ],
                    remedios: ["dip_inj", "dip_gts", "pct_gts"]
                },
                {
                    passo: 9,
                    titulo: "Ferida, tétano e escarotomia",
                    resumo: "Cobrir com material limpo e seco; vacina antitetânica; vigiar circulação.",
                    itens: [
                        "No atendimento inicial, cobrir com filme plástico (PVC) ou compressas limpas e secas. Não aplicar pomadas antes da avaliação do centro que vai receber (atrapalha a avaliação da profundidade).",
                        "Profilaxia do tétano conforme a situação vacinal.",
                        "Não usar antibiótico sistêmico profilático.",
                        "Queimadura circunferencial de membro: elevar o membro e vigiar pulsos, enchimento capilar, dor à extensão passiva → escarotomia se comprometimento circulatório.",
                        "Elevar a cabeceira se queimadura de face/pescoço."
                    ]
                },
                {
                    passo: 10,
                    titulo: "Transferência",
                    resumo: "Contato médico a médico; enviar a SCQ, o volume e a diurese.",
                    itens: [
                        "Se houver critério (bloco 🔎), contatar o centro de queimados de referência.",
                        "Enviar: hora da queimadura, mecanismo, SCQ e profundidade, volume recebido, diurese, via aérea, analgesia, vacinação e exames.",
                        "Transportar com via aérea segura, 2 acessos, sonda vesical, aquecido e com a ferida coberta."
                    ]
                }
            ]
        },
        {
            titulo: "Ambulatório: casa e seguimento",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Pequeno queimado: tratamento em casa",
                    icone: "🩹",
                    resumo: "2º grau superficial pequeno, fora de áreas especiais, sem suspeita de maus-tratos.",
                    itens: [
                        "Candidatos: queimadura pequena de 2º grau superficial (em geral &lt; 5–10% SCQ), fora de face, mãos, pés, genitália, períneo e articulações, sem critério de transferência e com família capaz de cuidar.",
                        "Limpar com água e sabão neutro ou SF. Bolhas pequenas e íntegras podem ser mantidas; bolhas grandes, tensas ou rotas: desbridar.",
                        "Curativo conforme o padrão do serviço (curativo não aderente / sulfadiazina de prata 1%, evitar em &lt; 2 meses), trocas e reavaliação em 24 a 48 h.",
                        "Analgesia regular por via oral; profilaxia do tétano; manter o membro elevado.",
                        "Após a cicatrização: hidratante, protetor solar e evitar sol por pelo menos 1 ano (hiperpigmentação)."
                    ],
                    remedios: ["dip_gts", "pct_gts"],
                    grupos: [
                        {
                            nome: "Retornar antes se",
                            itens: [
                                "Febre, vermelhidão que se espalha, secreção purulenta, mau cheiro ou aumento da dor (infecção).",
                                "Criança prostrada, vomitando ou bebendo pouco; febre com exantema e hipotensão (síndrome do choque tóxico, mesmo em queimaduras pequenas).",
                                "Ferida que não cicatriza em 10 a 14 dias (provável profunda: encaminhar)."
                            ]
                        }
                    ]
                },
                {
                    titulo: "Prevenção",
                    icone: "🛡️",
                    resumo: "Cozinha, líquidos quentes, álcool, tomadas.",
                    itens: [
                        "Cabos das panelas virados para dentro; criança fora da cozinha durante o preparo.",
                        "Não segurar a criança no colo com bebida quente. Testar a água do banho (cotovelo) antes de colocar a criança.",
                        "Álcool líquido e fósforos fora do alcance; protetores de tomada; não soltar fogos.",
                        "Detector de fumaça e plano de fuga em casa."
                    ]
                }
            ]
        }
    ],

    citacoes: { "ATLS": 0, "ISBI": 1, "American Burn Association": [2, 3], "ABA": [2, 3], "Lund-Browder": 4 }, // sigla no texto → fonte (índice em fontes)
    fontes: [
        "American College of Surgeons — Committee on Trauma. Advanced Trauma Life Support (ATLS), capítulo Lesões térmicas (10ª ed., 2018; 11ª ed., 2025). Coeficientes da hidratação, taxa inicial por idade e diurese-alvo pela 10ª edição, a confirmar no manual da 11ª.",
        "ISBI Practice Guidelines for Burn Care (Burns 2016;42:953-1021) e Part 2 (Burns 2018;44:1617-1706).",
        "Cartotto R et al. American Burn Association Clinical Practice Guidelines on Burn Shock Resuscitation. J Burn Care Res. 2023.",
        "American Burn Association — Burn Center Referral Criteria; Updating the Burn Center Referral Criteria: 2018 eDelphi Consensus (J Burn Care Res. 2020).",
        "Lund CC, Browder NC. The estimation of areas of burns. Surg Gynecol Obstet. 1944;79:352-8."
    ],
    revisao: "10/2026"
});
