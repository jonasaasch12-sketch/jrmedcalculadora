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
}

registrarConduta({
    id: "queimados",
    nome: "Queimaduras: cálculo da SCQ",
    categoria: "Trauma e Emergência",
    cor: "#ea580c",
    kw: "queimadura queimado queimados scq superficie corporal queimada lund browder regra dos nove parkland escaldadura",
    resumo: "Boneco clicável (frente e costas) com a tabela de Lund-Browder por idade: toque nas áreas queimadas e veja a % de superfície corporal queimada.",
    legenda: "Cálculo da superfície corporal queimada pela <strong>tabela de Lund-Browder</strong>, que corrige as proporções do corpo pela idade. O restante da conduta (profundidade, hidratação, analgesia, curativo e transferência) será montado com o material de referência.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Calcular a SCQ (boneco clicável)",
                    icone: "🧍",
                    resumo: "Toque nas regiões queimadas: inteira, metade ou limpa.",
                    ferramenta: "ferramentaQueimados",
                    nota: "Contar só queimaduras de <strong>2º e 3º grau</strong>; o 1º grau (só eritema, sem bolha) não entra na SCQ. Na frente, o lado direito do paciente fica à esquerda da tela. A idade digitada no topo já escolhe a faixa; dá para trocar nos botões."
                },
                {
                    titulo: "Como estimar áreas pequenas ou espalhadas",
                    icone: "✋",
                    resumo: "Regra da palma e por que não usar a regra dos 9 na criança.",
                    itens: [
                        "<strong>Regra da palma:</strong> a palma da mão <strong>do paciente</strong>, com os dedos, corresponde a cerca de <strong>1% da SC</strong>. Útil em queimaduras pequenas ou salpicadas.",
                        "<strong>Regra dos 9 (Wallace)</strong> é feita para adultos: na criança a cabeça é proporcionalmente maior e as pernas menores. Por isso a tabela de Lund-Browder, que corrige pela idade, é a mais indicada em pediatria.",
                        "Se a região está só parcialmente queimada, use \"metade\" no boneco ou some pela regra da palma."
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
                }
            ]
        }
    ],

    fontes: [
        "Lund CC, Browder NC. The estimation of areas of burns. Surg Gynecol Obstet. 1944;79:352-8 (tabela de Lund-Browder)."
    ],
    revisao: "10/2026"
});
