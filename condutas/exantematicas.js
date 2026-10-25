// =====================================================
// DOENÇAS EXANTEMÁTICAS — categoria da área 📖 Condutas
// 1) Guia de identificação do exantema (ferramenta clicável que afunila as hipóteses)
// 2) Varicela (primeira conduta da categoria)
// Desenhos próprios em SVG (sem direitos de terceiros): boneco com a distribuição
// e o aspecto de cada tipo de lesão. Fotos de licença livre podem ser acrescentadas
// depois em DOENCAS_EXANTEMA[].foto (com o crédito).
// Base: MS — Guia de Vigilância em Saúde (2023); Manual dos CRIE (MS);
// AHA 2017 (Kawasaki); IDSA 2012 (escarlatina); revisões de exantemas (PubMed).
// =====================================================

// ---------- Desenhos ----------
// Cada tipo de lesão: como desenhar um ponto.
const EXANTEMA_LESAO = {
    mp: { nome: "Máculo-papular", cor: "#e2525c" },
    ves: { nome: "Vesicular", cor: "#e2525c" },
    pet: { nome: "Petequial / purpúrico", cor: "#7e1f5a" },
    lixa: { nome: "Micropapular áspero (\"lixa\")", cor: "#ef6f6f" }
};

// Pontos pseudoaleatórios fixos (sempre o mesmo desenho)
function exPontos(n, semente) {
    let s = semente, r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }, out = [];
    for (let i = 0; i < n; i++) out.push([r(), r(), r()]);
    return out;
}

function exPonto(tipo, x, y, k, i) {
    let c = EXANTEMA_LESAO[tipo].cor;
    if (tipo === 'ves') {
        // fases diferentes ao mesmo tempo (varicela): mácula, pápula, vesícula, crosta
        let f = i % 4;
        if (f === 0) return `<circle cx="${x}" cy="${y}" r="2.6" fill="${c}" opacity=".55"/>`;
        if (f === 1) return `<circle cx="${x}" cy="${y}" r="2.6" fill="${c}"/>`;
        if (f === 2) return `<circle cx="${x}" cy="${y}" r="3.2" fill="${c}" opacity=".45"/><circle cx="${x}" cy="${y}" r="2" fill="#fff" stroke="${c}" stroke-width=".6"/>`;
        return `<circle cx="${x}" cy="${y}" r="2.4" fill="#8a5a2b"/>`;
    }
    if (tipo === 'pet') return `<circle cx="${x}" cy="${y}" r="${1 + k * 1.6}" fill="${c}"/>`;
    if (tipo === 'lixa') return `<circle cx="${x}" cy="${y}" r=".9" fill="${c}"/>`;
    return `<ellipse cx="${x}" cy="${y}" rx="${2 + k * 2.4}" ry="${1.6 + k * 1.8}" fill="${c}" opacity=".8"/>`;
}

// Regiões do boneco (frente): retângulos/elipses onde caem os pontos
const EX_REGIOES = {
    face: { cx: 60, cy: 24, rx: 13, ry: 14, el: true },
    boca: { cx: 60, cy: 31, rx: 5, ry: 2.5, el: true },
    pescoco: { x: 53, y: 38, w: 14, h: 8 },
    tronco: { x: 40, y: 46, w: 40, h: 52 },
    dobras: { x: 40, y: 46, w: 40, h: 8 },
    bracos: { x: 22, y: 48, w: 14, h: 50, par: 84 },
    maos: { cx: 28, cy: 106, rx: 6, ry: 6, el: true, par: 92 },
    pernas: { x: 42, y: 100, w: 15, h: 62, par: 21 },
    pes: { cx: 49, cy: 170, rx: 8, ry: 4, el: true, par: 22 },
    perineo: { cx: 60, cy: 100, rx: 8, ry: 4, el: true }
};

function exPontosNaRegiao(reg, tipo, dens, semente) {
    let g = EX_REGIOES[reg], out = '', n = Math.round(dens);
    if (!g || !n) return '';
    exPontos(n, semente).forEach(([a, b, k], i) => {
        let x, y;
        if (g.el) { let t = a * 2 * Math.PI, rr = Math.sqrt(b); x = g.cx + Math.cos(t) * rr * g.rx; y = g.cy + Math.sin(t) * rr * g.ry; }
        else { x = g.x + a * g.w; y = g.y + b * g.h; }
        out += exPonto(tipo, x.toFixed(1), y.toFixed(1), k, i);
        if (g.par !== undefined) {
            let x2 = g.el ? (120 - x) : (120 - x);
            out += exPonto(tipo, x2.toFixed(1), y.toFixed(1), k, i + 1);
        }
    });
    return out;
}

// Boneco com o exantema. dist = { regiao: densidade }. setas = texto curto da progressão.
function svgBonecoExantema(tipo, dist, legenda, semente = 7) {
    let corpo = `
        <circle cx="60" cy="24" r="15" class="ex-pele"/>
        <rect x="53" y="37" width="14" height="10" rx="3" class="ex-pele"/>
        <rect x="38" y="45" width="44" height="56" rx="10" class="ex-pele"/>
        <rect x="20" y="47" width="16" height="54" rx="7" class="ex-pele"/><rect x="84" y="47" width="16" height="54" rx="7" class="ex-pele"/>
        <circle cx="28" cy="106" r="7" class="ex-pele"/><circle cx="92" cy="106" r="7" class="ex-pele"/>
        <rect x="41" y="98" width="17" height="66" rx="7" class="ex-pele"/><rect x="62" y="98" width="17" height="66" rx="7" class="ex-pele"/>
        <ellipse cx="49" cy="170" rx="10" ry="5" class="ex-pele"/><ellipse cx="71" cy="170" rx="10" ry="5" class="ex-pele"/>`;
    let pontos = '', s = semente;
    Object.keys(dist).forEach(r => { pontos += exPontosNaRegiao(r, tipo, dist[r], s); s += 13; });
    return `<figure class="ex-fig"><svg viewBox="0 0 120 180" role="img" aria-label="${legenda || 'distribuição do exantema'}">${corpo}${pontos}</svg>${legenda ? `<figcaption>${legenda}</figcaption>` : ''}</figure>`;
}

// Amostra do aspecto da lesão (quadradinho de pele ampliado)
function svgAmostraLesao(tipo) {
    let pts = exPontos(tipo === 'lixa' ? 70 : tipo === 'pet' ? 14 : 9, 3).map(([a, b, k], i) => exPonto(tipo, (6 + a * 48).toFixed(1), (6 + b * 28).toFixed(1), tipo === 'mp' ? k : k * .8, i)).join('');
    let escala = tipo === 'lixa' ? '' : ' transform="scale(1)"';
    return `<svg class="ex-amostra" viewBox="0 0 60 40" aria-label="${EXANTEMA_LESAO[tipo].nome}"><rect width="60" height="40" rx="6" class="ex-pele"/><g${escala}>${pts}</g></svg>`;
}

// Evolução da lesão da varicela: mácula → pápula → vesícula → pústula → crosta
function svgEvolucaoVaricela() {
    let fases = [
        ['Mácula', `<circle cx="20" cy="20" r="7" fill="#e2525c" opacity=".5"/>`],
        ['Pápula', `<circle cx="20" cy="20" r="7" fill="#e2525c"/><circle cx="18" cy="18" r="2" fill="#fff" opacity=".35"/>`],
        ['Vesícula', `<circle cx="20" cy="20" r="10" fill="#e2525c" opacity=".45"/><circle cx="20" cy="20" r="6.5" fill="#fff" stroke="#e2525c" stroke-width="1"/><circle cx="18" cy="18" r="1.8" fill="#dbeafe"/>`],
        ['Pústula', `<circle cx="20" cy="20" r="10" fill="#e2525c" opacity=".4"/><circle cx="20" cy="20" r="6.5" fill="#fde68a" stroke="#d97706" stroke-width="1"/>`],
        ['Crosta', `<circle cx="20" cy="20" r="7" fill="#8a5a2b"/><circle cx="18" cy="18" r="2" fill="#a16207" opacity=".6"/>`]
    ];
    return `<div class="ex-evolucao">${fases.map(([n, d], i) => `<div class="ex-fase"><svg viewBox="0 0 40 40" class="ex-fase-svg"><rect width="40" height="40" rx="8" class="ex-pele"/>${d}</svg><span>${n}</span></div>${i < fases.length - 1 ? '<span class="ex-seta">→</span>' : ''}`).join('')}</div>`;
}

// ---------- Guia de identificação ----------
// tags: lesão (mp/ves/pet/lixa) · febre (febre_antes / febre_junto / febre_pouca) · início (ini_face/ini_tronco/ini_extrem/ini_boca) · sinais
const DOENCAS_EXANTEMA = [
    { id: "sarampo", nome: "Sarampo", tipo: "mp", conduta: null, alerta: "Notificação imediata (até 24 h). Isolamento respiratório.",
      tags: ["mp", "febre_junto", "ini_face", "s_tosse", "s_koplik"],
      dist: { face: 18, pescoco: 6, tronco: 26, bracos: 10, pernas: 10 },
      texto: "Febre alta + <strong>tosse, coriza e conjuntivite</strong>; exantema no 3º a 5º dia, ainda com febre, que começa <strong>atrás das orelhas e na face</strong> e desce (craniocaudal), confluente. <strong>Manchas de Koplik</strong> na mucosa jugal." },
    { id: "rubeola", nome: "Rubéola", tipo: "mp", conduta: null, alerta: "Notificação imediata (até 24 h).",
      tags: ["mp", "febre_pouca", "ini_face", "s_adeno_post"],
      dist: { face: 10, pescoco: 5, tronco: 16, bracos: 6, pernas: 6 },
      texto: "Febre baixa; exantema rosado, <strong>não confluente</strong>, da face para o corpo em 24 h, some em ~3 dias. <strong>Adenomegalia retroauricular e occipital.</strong>" },
    { id: "exantema_subito", nome: "Exantema súbito (roséola)", tipo: "mp", conduta: null,
      tags: ["mp", "febre_antes", "ini_tronco"],
      dist: { tronco: 22, pescoco: 6, face: 4, bracos: 4 },
      texto: "Lactente de 6 meses a 2 anos com <strong>febre alta por 3 a 5 dias</strong> e bom estado; <strong>a febre some e aí aparece</strong> o exantema rosado no tronco (herpesvírus 6)." },
    { id: "eritema_infeccioso", nome: "Eritema infeccioso (parvovírus B19)", tipo: "mp", conduta: null,
      tags: ["mp", "febre_pouca", "ini_face", "s_bochecha"],
      dist: { face: 24, bracos: 12, pernas: 12, tronco: 6 },
      texto: "Escolar pouco febril; <strong>\"bochecha esbofeteada\"</strong>, depois exantema <strong>rendilhado</strong> nos membros, que volta com calor e sol. Risco de crise aplástica em anemia hemolítica." },
    { id: "varicela", nome: "Varicela (catapora)", tipo: "ves", conduta: "varicela",
      tags: ["ves", "febre_junto", "ini_tronco", "ini_face", "s_prurido", "s_fases"],
      dist: { face: 10, tronco: 34, bracos: 7, pernas: 7, maos: 1 },
      texto: "Vesículas pruriginosas em <strong>fases diferentes ao mesmo tempo</strong> (mácula, pápula, vesícula, crosta), começando no <strong>tronco, face e couro cabeludo</strong> (centrípeta); mucosas." },
    { id: "mao_pe_boca", nome: "Mão-pé-boca (Coxsackie)", tipo: "ves", conduta: null,
      tags: ["ves", "febre_junto", "febre_pouca", "ini_boca", "ini_extrem"],
      dist: { boca: 5, maos: 8, pes: 8, perineo: 6 },
      texto: "Menor de 5 anos; <strong>úlceras na boca</strong> e vesículas em <strong>mãos, pés e nádegas</strong>. Atenção à desidratação por dor para engolir." },
    { id: "escarlatina", nome: "Escarlatina", tipo: "lixa", conduta: "faringoamigdalite", condutaNome: "Faringoamigdalite",
      tags: ["lixa", "febre_junto", "ini_tronco", "s_garganta", "s_lingua"],
      dist: { pescoco: 26, tronco: 70, dobras: 30, bracos: 26, pernas: 20 },
      texto: "Faringite + exantema <strong>áspero (\"lixa\")</strong> que começa no pescoço e tronco, mais forte nas dobras (<strong>Pastia</strong>), palidez ao redor da boca (<strong>Filatov</strong>), <strong>língua em framboesa</strong>. 5 a 15 anos." },
    { id: "kawasaki", nome: "Doença de Kawasaki", tipo: "mp", conduta: null, alerta: "Febre ≥ 5 dias: pensar e tratar cedo (aneurisma coronariano).",
      tags: ["mp", "febre_antes", "febre_junto", "ini_tronco", "s_febre5", "s_lingua", "s_maos_pes"],
      dist: { tronco: 22, perineo: 8, bracos: 6, pernas: 6, maos: 3, pes: 3 },
      texto: "<strong>Febre ≥ 5 dias</strong> + conjuntivite sem secreção, <strong>lábios rachados e língua em framboesa</strong>, exantema polimorfo (não vesicular), <strong>edema e eritema de mãos e pés</strong>, adenomegalia cervical ≥ 1,5 cm. Menor de 5 anos." },
    { id: "meningococcemia", nome: "Meningococcemia", tipo: "pet", conduta: null, alerta: "EMERGÊNCIA: febre + petéquias = antibiótico e suporte já.",
      tags: ["pet", "febre_junto", "ini_extrem", "s_toxemia", "s_vitro"],
      dist: { bracos: 9, pernas: 11, tronco: 8, maos: 2, pes: 2 },
      texto: "Febre, <strong>toxemia</strong> e <strong>petéquias ou púrpura que não somem ao apertar</strong> (vitropressão), em progressão rápida. Pode evoluir para choque em horas." },
    { id: "dengue", nome: "Dengue", tipo: "mp", conduta: null, alerta: "Procurar sinais de alarme (dor abdominal, vômitos, sangramento).",
      tags: ["mp", "febre_antes", "febre_junto", "ini_tronco", "s_prurido", "s_vitro"],
      dist: { tronco: 26, bracos: 12, pernas: 14, maos: 2, pes: 2 },
      texto: "Febre alta, dor no corpo e atrás dos olhos; exantema morbiliforme pruriginoso perto da queda da febre, no tronco e membros (\"ilhas brancas\"). Pode ter petéquias; prova do laço." },
    { id: "mononucleose", nome: "Mononucleose / exantema com amoxicilina", tipo: "mp", conduta: null,
      tags: ["mp", "febre_junto", "ini_tronco", "s_garganta", "s_adeno_post", "s_amoxi"],
      dist: { tronco: 26, bracos: 10, pernas: 10, face: 3 },
      texto: "Faringite exsudativa, <strong>adenomegalia cervical posterior</strong>, hepatoesplenomegalia; exantema maculopapular, muitas vezes <strong>depois de amoxicilina</strong> (não é alergia verdadeira)." }
];

const EX_FILTROS = [
    { nome: "Tipo de lesão", opcoes: [["mp", "Manchas/pápulas vermelhas"], ["ves", "Vesículas (bolhinhas)"], ["pet", "Petéquias/púrpura"], ["lixa", "Áspero (\"lixa\")"]] },
    { nome: "Febre", opcoes: [["febre_antes", "Febre alta ANTES, some quando aparece o exantema"], ["febre_junto", "Febre junto com o exantema"], ["febre_pouca", "Pouca febre ou sem febre"]] },
    { nome: "Onde começou", opcoes: [["ini_face", "Face / atrás das orelhas"], ["ini_tronco", "Tronco / pescoço"], ["ini_extrem", "Mãos, pés, membros"], ["ini_boca", "Boca"]] },
    { nome: "Sinal que chama atenção", opcoes: [["s_tosse", "Tosse, coriza, conjuntivite"], ["s_koplik", "Manchas brancas na bochecha (Koplik)"], ["s_bochecha", "\"Bochecha esbofeteada\""], ["s_fases", "Lesões em fases diferentes"], ["s_prurido", "Muita coceira"], ["s_garganta", "Dor de garganta / faringite"], ["s_lingua", "Língua em framboesa"], ["s_febre5", "Febre há 5 dias ou mais"], ["s_maos_pes", "Mãos e pés inchados/vermelhos"], ["s_adeno_post", "Gânglio atrás da orelha/nuca"], ["s_toxemia", "Toxemia, mal estado geral"], ["s_vitro", "Não some ao apertar (vitropressão)"], ["s_amoxi", "Apareceu após amoxicilina"]] }
];

let exGuiaMarcados = {};

function ferramentaExantemaGuia() {
    setTimeout(atualizarExantemaGuia, 0);
    let filtros = EX_FILTROS.map(f => `<div class="ex-filtro"><div class="escore-item-nome">${f.nome}</div><div class="ex-chips">${f.opcoes.map(([t, txt]) => `<button type="button" class="ex-chip${exGuiaMarcados[t] ? ' ativo' : ''}" data-tag="${t}" onclick="tocarExantemaGuia('${t}')">${txt}</button>`).join('')}</div></div>`).join('');
    return `<div class="exg" id="exg">
        <div class="escore-instrucao">👆 Toque no que você vê. As hipóteses mais prováveis sobem para o topo. Toque de novo para desmarcar.</div>
        ${filtros}
        <div class="ex-acoes"><button type="button" class="escore-limpar" onclick="limparExantemaGuia()">Limpar</button></div>
        <div id="exg-lista" class="ex-lista"></div>
    </div>`;
}

function tocarExantemaGuia(t) {
    if (exGuiaMarcados[t]) delete exGuiaMarcados[t]; else exGuiaMarcados[t] = 1;
    document.querySelectorAll(`#exg .ex-chip[data-tag="${t}"]`).forEach(b => b.classList.toggle('ativo', !!exGuiaMarcados[t]));
    atualizarExantemaGuia();
}

function limparExantemaGuia() {
    exGuiaMarcados = {};
    document.querySelectorAll('#exg .ex-chip.ativo').forEach(b => b.classList.remove('ativo'));
    atualizarExantemaGuia();
}

function atualizarExantemaGuia() {
    let caixa = document.getElementById('exg-lista');
    if (!caixa) return;
    let sel = Object.keys(exGuiaMarcados);
    let lista = DOENCAS_EXANTEMA.map((d, i) => ({ d, i, pts: sel.filter(t => d.tags.includes(t)).length }));
    if (sel.length) lista = lista.filter(x => x.pts > 0).sort((a, b) => b.pts - a.pts || a.i - b.i);
    let topo = lista.length ? lista[0].pts : 0;
    caixa.innerHTML = (sel.length ? `<div class="ex-lista-titulo">${lista.length ? 'Hipóteses, da mais para a menos provável' : 'Nenhuma doença do guia combina. Reveja os itens marcados.'}</div>` : `<div class="ex-lista-titulo">Todas as doenças do guia</div>`) +
        lista.map(({ d, pts }) => {
            let forte = sel.length && pts === topo;
            let link = d.conduta && typeof condutasJR !== 'undefined' && condutasJR[d.conduta]
                ? `<button type="button" class="ex-link" onclick="abrirConduta('${d.conduta}')">📖 Conduta${d.condutaNome ? ': ' + d.condutaNome : ''} ›</button>`
                : `<span class="ex-embreve">Conduta em preparação</span>`;
            return `<div class="ex-card${forte ? ' forte' : ''}">
                <div class="ex-card-fig">${svgBonecoExantema(d.tipo, d.dist, '')}${svgAmostraLesao(d.tipo)}</div>
                <div class="ex-card-txt">
                    <div class="ex-card-nome">${d.nome}${sel.length ? ` <span class="ex-pts">${pts}/${sel.length}</span>` : ''}</div>
                    ${d.alerta ? `<div class="ex-alerta">⚠️ ${d.alerta}</div>` : ''}
                    <div class="ex-card-desc">${d.texto}</div>
                    ${link}
                </div></div>`;
        }).join('');
}

registrarConduta({
    id: "exantema_guia",
    nome: "Guia de identificação do exantema",
    categoria: "Doenças exantemáticas",
    cor: "#be185d",
    kw: "exantema exantematica manchas pele rash erupção identificar diferencial sarampo rubeola varicela catapora roseola exantema subito eritema infeccioso parvovirus mao pe boca escarlatina kawasaki meningococcemia petequias dengue mononucleose",
    resumo: "Toque no tipo de lesão, na febre e em onde começou: as hipóteses sobem com o desenho de cada doença. Sinais de alarme e notificação.",
    legenda: "Guia de apoio ao diagnóstico diferencial dos exantemas na criança, com desenhos de distribuição e do tipo de lesão. Vigilância: <strong>Ministério da Saúde (Guia de Vigilância em Saúde, 2023)</strong>.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Identificar o exantema (clicável)",
                    icone: "🔍",
                    resumo: "Lesão, febre, onde começou e o sinal que chama atenção. Desenho de cada doença.",
                    ferramenta: "ferramentaExantemaGuia"
                },
                {
                    titulo: "Como descrever o exantema",
                    icone: "🧭",
                    resumo: "Tipo de lesão, onde começou, como espalhou e a relação com a febre.",
                    itens: [
                        "<strong>Tipo de lesão:</strong> mácula (plana), pápula (elevada), vesícula (líquido claro), pústula, petéquia/púrpura (não some à vitropressão), micropapular áspero (\"lixa\").",
                        "<strong>Onde começou e como espalhou:</strong> craniocaudal (sarampo, rubéola), centrípeta (varicela), extremidades (mão-pé-boca, meningococcemia), dobras (escarlatina).",
                        "<strong>Febre × exantema:</strong> febre que some quando aparece o exantema (exantema súbito); febre alta junto (sarampo); febre ≥ 5 dias (Kawasaki).",
                        "<strong>Sinais associados:</strong> enantema (Koplik, úlceras, língua em framboesa), conjuntivite, adenomegalia, prurido, estado geral.",
                        "<strong>Contexto:</strong> idade, vacinação (tríplice viral, varicela), contato com caso, medicamento recente (amoxicilina, anticonvulsivante)."
                    ],
                    ferramenta: "ferramentaAmostrasLesao"
                }
            ]
        },
        {
            titulo: "Condução na emergência: sinais de alarme",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Exantema que não pode esperar.",
            secoes: [
                {
                    titulo: "Febre + petéquias ou púrpura",
                    icone: "🩸",
                    alerta: true,
                    resumo: "Meningococcemia até prova em contrário: antibiótico e suporte imediatos.",
                    itens: [
                        "<strong>Petéquias ou púrpura que não somem ao apertar</strong>, com febre e toxemia, ou que aumentam em minutos a horas: <strong>meningococcemia</strong> até prova em contrário.",
                        "<strong>Conduta:</strong> ABC, acesso, hemocultura e <strong>antibiótico EV sem atrasar</strong> (não esperar exames nem punção lombar), tratar o choque, isolamento respiratório por gotículas e <strong>notificação imediata</strong> (MS).",
                        "Outras causas de petéquias: dengue, plaquetopenia (PTI, leucemia), tosse ou vômitos intensos (petéquias só acima da linha dos mamilos)."
                    ]
                },
                {
                    titulo: "Outros exantemas de alarme",
                    icone: "⚠️",
                    resumo: "Kawasaki, mucosas descolando (Stevens-Johnson), choque tóxico, sarampo.",
                    itens: [
                        "<strong>Kawasaki:</strong> febre ≥ 5 dias + critérios clínicos: imunoglobulina nos primeiros 10 dias reduz o aneurisma coronariano (AHA 2017).",
                        "<strong>Stevens-Johnson / necrólise epidérmica tóxica:</strong> lesões em alvo atípicas, bolhas, <strong>descolamento da pele</strong> e <strong>mucosas</strong> (boca, olhos, genital), geralmente após medicamento: suspender o fármaco e internar.",
                        "<strong>Síndrome do choque tóxico:</strong> eritrodermia difusa (\"queimadura de sol\"), febre e hipotensão.",
                        "<strong>DRESS:</strong> exantema extenso, febre, adenomegalia, eosinofilia e acometimento de órgãos 2 a 8 semanas após anticonvulsivante, sulfa ou antibiótico.",
                        "<strong>Sarampo e rubéola:</strong> <strong>notificação imediata (até 24 h)</strong>, isolamento e bloqueio vacinal dos contatos (MS)."
                    ]
                }
            ]
        },
        {
            titulo: "Ambulatório: isolamento, escola e notificação",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Isolamento e volta à escola",
                    icone: "🏫",
                    resumo: "Quando a criança pode voltar e quando notificar.",
                    tabela: {
                        colunas: ["Doença", "Transmissão / isolamento", "Notificar"],
                        linhas: [
                            ["Sarampo", "Aerossol; até 4 dias após o início do exantema", "Imediata (24 h)"],
                            ["Rubéola", "Gotículas; até 7 dias após o início do exantema", "Imediata (24 h)"],
                            ["Varicela", "Aerossol e contato; até <strong>todas as lesões em crosta</strong>", "Casos graves, óbitos e surtos"],
                            ["Escarlatina", "Volta após 12 a 24 h de antibiótico e sem febre", "Não"],
                            ["Mão-pé-boca", "Fezes e secreções por semanas; volta sem febre e com as lesões secando", "Surtos"],
                            ["Eritema infeccioso", "Já não transmite quando o exantema aparece", "Não"],
                            ["Meningococcemia", "Gotículas até 24 h de antibiótico; quimioprofilaxia dos contatos", "Imediata"]
                        ],
                        nota: "Notificação e isolamento conforme o Guia de Vigilância em Saúde do Ministério da Saúde (2023). Mão-pé-boca e escarlatina: orientação usual de retorno escolar."
                    }
                },
                {
                    titulo: "Vacinas que previnem",
                    icone: "💉",
                    resumo: "Tríplice/tetra viral e varicela no calendário; meningocócicas.",
                    itens: [
                        "<strong>Tríplice viral</strong> (sarampo, caxumba, rubéola) aos 12 meses e <strong>tetra viral</strong> (+ varicela) aos 15 meses; <strong>varicela</strong> aos 4 anos (calendário do MS).",
                        "<strong>Meningocócica C</strong> (ou ACWY) no calendário. Conferir o cartão em toda criança com exantema."
                    ]
                }
            ]
        }
    ],

    citacoes: { "MS": 0, "Ministério da Saúde": 0, "AHA 2017": 1 },
    fontes: [
        "Brasil. Ministério da Saúde. Guia de Vigilância em Saúde. 6ª ed. Brasília: MS, 2023 (capítulos de sarampo, rubéola, varicela e doença meningocócica).",
        "McCrindle BW, Rowley AH, Newburger JW, et al. Diagnosis, Treatment, and Long-Term Management of Kawasaki Disease: A Scientific Statement From the American Heart Association. Circulation 2017;135(17):e927-e999. doi:10.1161/CIR.0000000000000484",
        "Shulman ST, Bisno AL, Clegg HW, et al. Clinical Practice Guideline for the Diagnosis and Management of Group A Streptococcal Pharyngitis: 2012 Update by the IDSA. Clin Infect Dis 2012;55(10):e86-102. doi:10.1093/cid/cis629",
        "Daniels DK, Muppidi P, Rasakumar Y, Conners GP. Recognition, Diagnosis, and Management of Measles in the Emergency Department. Pediatr Emerg Care 2026;42(1):79-89. doi:10.1097/PEC.0000000000003482",
        "Haber JS, Cipriano SD, Oza VS. Morbilliform Eruptions in the Hospitalized Child. Dermatol Clin 2022;40(2):191-202. doi:10.1016/j.det.2021.12.006",
        "Manieri E, Dondi A, Neri I, Lanari M. Drug rash with eosinophilia and systemic symptoms (DRESS) syndrome in childhood: a narrative review. Front Med 2023;10:1108345. doi:10.3389/fmed.2023.1108345"
    ],
    revisao: "10/2026"
});

function ferramentaAmostrasLesao() {
    return `<div class="exg ex-amostras">${Object.keys(EXANTEMA_LESAO).map(t => `<div class="ex-amostra-item">${svgAmostraLesao(t)}<span>${EXANTEMA_LESAO[t].nome}</span></div>`).join('')}</div>`;
}

// ---------- Varicela: desenhos ----------
function ferramentaVaricelaImagens() {
    return `<div class="exg ex-var">
        <div class="ex-var-linha">
            ${svgBonecoExantema('ves', { face: 12, tronco: 40, bracos: 8, pernas: 8, maos: 1 }, 'Centrípeta: mais no tronco, face e couro cabeludo; menos nos membros', 11)}
            <div class="ex-var-txt">
                <div class="escore-item-nome">Lesões em fases diferentes ao mesmo tempo</div>
                ${svgEvolucaoVaricela()}
                <div class="ex-card-desc">Cada lesão passa por <strong>mácula → pápula → vesícula (\"gota de orvalho\" sobre base vermelha) → pústula → crosta</strong> em 24 a 48 h, em surtos. Ver as fases misturadas na mesma região é o que diferencia da varíola/mpox (lesões na mesma fase).</div>
            </div>
        </div>
    </div>`;
}


registrarConduta({
    id: "varicela",
    nome: "Varicela (catapora)",
    categoria: "Doenças exantemáticas",
    cor: "#be185d",
    kw: "varicela catapora vesicula exantema vesicular coceira prurido aciclovir imunoglobulina vacina bloqueio contato fasciite infeccao secundaria pneumonia ataxia cerebelar encefalite reye",
    resumo: "Diagnóstico clínico com desenhos, critérios de internação clicáveis, isolamento e notificação, sintomáticos, quando usar aciclovir e profilaxia dos contatos.",
    legenda: "Conduta conforme o <strong>Guia de Vigilância em Saúde do Ministério da Saúde (2023)</strong> e o <strong>Manual dos CRIE</strong> (imunoglobulina e vacina pós-exposição).",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Diagnóstico",
                    icone: "🔎",
                    resumo: "Clínico: vesículas pruriginosas em fases diferentes, centrípetas, com febre baixa.",
                    itens: [
                        "<strong>Diagnóstico clínico</strong> (MS). Incubação de <strong>10 a 21 dias</strong> (até 28 dias se recebeu imunoglobulina).",
                        "<strong>Pródromo</strong> leve (febre baixa, mal-estar) por 1 a 2 dias; na criança pequena o exantema costuma ser o primeiro sinal.",
                        "<strong>Exantema pruriginoso</strong>: mácula → pápula → <strong>vesícula</strong> → pústula → crosta, em <strong>surtos</strong>, com <strong>lesões em fases diferentes ao mesmo tempo</strong> (polimorfismo regional).",
                        "<strong>Distribuição centrípeta:</strong> começa no couro cabeludo, face e tronco, menos nos membros. Pode acometer <strong>mucosas</strong> (boca, conjuntiva, genital).",
                        "<strong>Transmissão:</strong> de 1 a 2 dias antes do exantema até <strong>todas as lesões virarem crosta</strong>.",
                        "<strong>Exames:</strong> não são necessários no caso típico. Na dúvida ou no caso grave: PCR do líquido da vesícula."
                    ],
                    ferramenta: "ferramentaVaricelaImagens"
                },
                {
                    titulo: "Diagnóstico diferencial",
                    icone: "🧭",
                    resumo: "Mão-pé-boca, estrófulo (picada de inseto), impetigo, herpes zoster disseminado, mpox.",
                    itens: [
                        "<strong>Mão-pé-boca:</strong> vesículas em mãos, pés, boca e nádegas; poucas no tronco.",
                        "<strong>Estrófulo (prurigo por picada de inseto):</strong> pápulas com vesícula no centro em áreas expostas, sem febre, em surtos sazonais.",
                        "<strong>Impetigo bolhoso:</strong> bolhas que rompem e deixam crosta melicérica, sem polimorfismo.",
                        "<strong>Herpes zoster disseminado</strong> (imunodeprimido) e <strong>eczema herpético</strong> (dermatite atópica com vesículas umbilicadas agrupadas).",
                        "<strong>Mpox:</strong> lesões profundas, <strong>todas na mesma fase</strong>, centrífugas (palmas e plantas), com adenomegalia.",
                        "Use o <strong>Guia de identificação do exantema</strong> nesta categoria para comparar."
                    ]
                },
                {
                    titulo: "Grupos de risco para forma grave",
                    icone: "⚠️",
                    resumo: "Imunodeprimidos, RN, adolescentes, doença crônica de pele ou pulmão, corticoide, salicilato.",
                    itens: [
                        "<strong>Imunodeprimidos</strong> (leucemia, quimioterapia, transplante, HIV, corticoide em dose imunossupressora): varicela disseminada, pneumonia, hepatite.",
                        "<strong>Recém-nascido</strong> de mãe com varicela de 5 dias antes a 2 dias depois do parto: varicela neonatal grave.",
                        "<strong>Maiores de 12 anos e adultos</strong>, <strong>doença crônica de pele ou pulmão</strong>, uso de <strong>corticoide</strong> (inclusive inalatório) ou de <strong>salicilato</strong> (risco de Reye).",
                        "<strong>Caso secundário no mesmo domicílio</strong> costuma ser mais grave."
                    ]
                },
                {
                    titulo: "Complicações",
                    icone: "🚩",
                    resumo: "Infecção bacteriana da pele (a mais comum), pneumonia, ataxia cerebelar, encefalite, varicela hemorrágica.",
                    itens: [
                        "<strong>Infecção bacteriana secundária</strong> (<em>S. aureus</em>, <em>S. pyogenes</em>): impetigo, celulite, abscesso; <strong>fasciíte necrosante</strong> e <strong>choque tóxico</strong>. Alerta: <strong>febre que volta</strong> depois do 3º ou 4º dia, eritema que se espalha, <strong>dor desproporcional</strong>.",
                        "<strong>Pneumonia viral</strong> (adolescente, adulto, imunodeprimido): tosse, taquipneia, hipoxemia.",
                        "<strong>Ataxia cerebelar aguda</strong> (em geral benigna) e <strong>encefalite</strong> (rebaixamento, convulsão).",
                        "<strong>Varicela hemorrágica</strong>, plaquetopenia, hepatite, artrite, glomerulonefrite.",
                        "<strong>Síndrome de Reye</strong> com AAS: <strong>nunca usar AAS</strong>."
                    ]
                }
            ]
        },
        {
            titulo: "Condução na emergência: passo a passo",
            icone: "🚨",
            cor: "#dc2626",
            subtitulo: "Siga na ordem.",
            secoes: [
                {
                    titulo: "Linha do tempo (resumo)",
                    icone: "⏱️",
                    resumo: "Internar? → confirmar → isolar e notificar → sintomáticos → aciclovir se indicado → contatos → alta.",
                    lista: "passos",
                    itens: [
                        "<span class=\"cond-passo\">1</span> <strong>Internar?</strong> Critérios clicáveis: UTI · enfermaria · casa",
                        "<span class=\"cond-passo\">2</span> <strong>Confirmar o diagnóstico:</strong> clínico; lesões em fases diferentes, centrípetas",
                        "<span class=\"cond-passo\">3</span> <strong>Isolar e notificar:</strong> aerossol + contato até as crostas; notificar grave, óbito e surto",
                        "<span class=\"cond-passo\">4</span> <strong>Sintomáticos:</strong> paracetamol ou dipirona, anti-histamínico, unhas curtas. <strong>Sem AAS</strong>",
                        "<span class=\"cond-passo\">5</span> <strong>Aciclovir:</strong> só nos grupos de risco (VO) ou nas formas graves e imunodeprimidos (EV)",
                        "<span class=\"cond-passo\">6</span> <strong>Contatos suscetíveis:</strong> vacina até 120 h · imunoglobulina até 96 h nos de risco",
                        "<span class=\"cond-passo\">7</span> <strong>Alta:</strong> sinais de alarme e volta à escola com todas as lesões em crosta"
                    ]
                },
                {
                    passo: 1,
                    titulo: "🏥 Critérios de internação",
                    resumo: "Primeiro decida: UTI, internar ou casa. A varicela comum é tratada em casa.",
                    alerta: true,
                    itens: [
                        "A <strong>varicela da criança saudável é tratada em casa</strong>. Internar por <strong>complicação</strong>, <strong>imunodepressão</strong>, <strong>RN</strong> ou quando não é possível tratar em casa (MS)."
                    ],
                    escore: {
                        id: "internacao_varicela",
                        unidade: " ",
                        checklist: true,
                        instrucao: "Toque em tudo o que o paciente apresenta. Vale o critério mais grave. Sem nenhum, toque em \"Nenhum\".",
                        itens: [
                            { nome: "🔴 UTI", opcoes: [[3, "Choque, fasciíte necrosante ou síndrome do choque tóxico", "🔴"]] },
                            { nome: "", opcoes: [[3, "Pneumonia com hipoxemia ou insuficiência respiratória", "🔴"]] },
                            { nome: "", opcoes: [[3, "Encefalite: rebaixamento da consciência ou convulsão", "🔴"]] },
                            { nome: "", opcoes: [[3, "Varicela hemorrágica ou sangramento com plaquetopenia grave", "🔴"]] },
                            { nome: "🟠 Internar (enfermaria)", opcoes: [[2, "Imunodeprimido com varicela (aciclovir EV)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Recém-nascido com varicela (mãe com varicela perto do parto)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Pneumonia sem insuficiência respiratória", "🟠"]] },
                            { nome: "", opcoes: [[2, "Celulite extensa, abscesso ou suspeita de infecção bacteriana grave (febre que volta, dor desproporcional)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Ataxia com vômitos, sonolência ou que impede andar com segurança", "🟠"]] },
                            { nome: "", opcoes: [[2, "Desidratação ou não aceita líquidos (lesões na boca)", "🟠"]] },
                            { nome: "", opcoes: [[2, "Sem condição de cuidado em casa ou risco social", "🟠"]] },
                            { nome: "🟢 Nenhum dos acima", opcoes: [[0, "Nenhum critério", "🟢"]] }
                        ],
                        classificar: (v) => {
                            let g = Math.max(...v);
                            if (g === 3) return { num: "UTI", rotulo: "UTI", cor: "#dc2626", texto: "Estabilizar, aciclovir EV, antibiótico EV se infecção bacteriana grave (cobrir estreptococo e estafilococo), cirurgia se fasciíte. Isolamento por aerossol e contato." };
                            if (g === 2) return { num: "🏥", rotulo: "Internar", cor: "#d97706", texto: "Isolamento por aerossol e contato; aciclovir EV no imunodeprimido, RN, pneumonia e encefalite; antibiótico se infecção bacteriana." };
                            return { num: "🏠", rotulo: "Tratar em casa", cor: "#16a34a", texto: "Sintomáticos (passo 4), aciclovir VO só nos grupos de risco (passo 5), afastamento até todas as lesões em crosta." };
                        },
                        nota: "O Ministério da Saúde não traz uma lista formal de internação. Estes critérios reúnem as complicações, os grupos de risco e as indicações de aciclovir EV do Guia de Vigilância em Saúde (2023)."
                    }
                },
                {
                    passo: 2,
                    titulo: "Confirmar o diagnóstico",
                    resumo: "Clínico. Procurar lesões em fases diferentes, couro cabeludo e mucosas.",
                    itens: [
                        "Examinar <strong>couro cabeludo, boca e todo o corpo</strong>; ver se há lesões em fases diferentes.",
                        "Perguntar: <strong>contato</strong> com varicela ou zoster há 10 a 21 dias, <strong>vacinação</strong>, imunodepressão, corticoide, AAS.",
                        "<strong>Varicela em vacinado</strong> (breakthrough): geralmente leve, menos de 50 lesões, mais maculopapulares que vesiculares; também transmite.",
                        "Procurar sinais de <strong>infecção bacteriana</strong>, <strong>pneumonia</strong> e <strong>alteração neurológica</strong> (passo 1)."
                    ]
                },
                {
                    passo: 3,
                    titulo: "Isolar e notificar",
                    resumo: "Aerossol e contato até todas as lesões em crosta. Notificar casos graves, óbitos e surtos.",
                    itens: [
                        "<strong>No serviço de saúde:</strong> precaução para <strong>aerossol e contato</strong> até <strong>todas as lesões em crosta</strong> (MS).",
                        "<strong>Escola/creche:</strong> afastar até todas as lesões em crosta (em geral 5 a 7 dias após o início do exantema).",
                        "<strong>Notificar:</strong> casos <strong>graves (internados)</strong>, <strong>óbitos</strong> e <strong>surtos</strong> (MS).",
                        "Evitar contato com gestantes, RN e imunodeprimidos suscetíveis."
                    ]
                },
                {
                    passo: 4,
                    titulo: "Sintomáticos e cuidados com a pele",
                    resumo: "Paracetamol ou dipirona, anti-histamínico, banho, unhas curtas. Nunca AAS.",
                    itens: [
                        "<strong>Febre e dor:</strong> paracetamol ou dipirona. <strong>Nunca AAS</strong> (síndrome de Reye).",
                        "<strong>Ibuprofeno:</strong> estudos observacionais associam o uso na varicela a infecção grave de pele e partes moles; preferir paracetamol ou dipirona.",
                        "<strong>Prurido:</strong> anti-histamínico oral; banho morno, roupas leves.",
                        "<strong>Unhas curtas e limpas</strong> para evitar a infecção secundária; lavar as lesões com água e sabão."
                    ],
                    remedios: ["pct_gts", "dip_gts", "hixizine"]
                },
                {
                    passo: 5,
                    titulo: "Aciclovir: quando usar",
                    resumo: "Criança saudável: não de rotina. VO nos grupos de risco, nas primeiras 24 h. EV nas formas graves e nos imunodeprimidos.",
                    itens: [
                        "<strong>Criança saudável com varicela não complicada:</strong> aciclovir <strong>não é de rotina</strong> (benefício pequeno; só se iniciado nas primeiras 24 h do exantema) (MS).",
                        "<strong>Aciclovir VO</strong> (sem imunodepressão), iniciado em até 24 h: <strong>maiores de 12 anos</strong>, <strong>doença crônica de pele ou pulmão</strong>, uso de <strong>corticoide</strong> ou de <strong>salicilato</strong>, <strong>caso secundário no domicílio</strong> (MS).",
                        "<strong>Aciclovir EV</strong>: <strong>imunodeprimidos</strong>, <strong>RN</strong>, formas graves ou complicadas (<strong>pneumonia</strong>, <strong>encefalite</strong>, varicela hemorrágica), por 7 a 14 dias (MS).",
                        "<strong>Aciclovir tópico não tem papel na varicela.</strong>"
                    ]
                },
                {
                    passo: 6,
                    titulo: "Contatos suscetíveis: profilaxia",
                    resumo: "Vacina até 120 h do contato. Imunoglobulina até 96 h nos de alto risco que não podem vacinar.",
                    itens: [
                        "<strong>Suscetível</strong> = sem história de varicela e sem 2 doses da vacina.",
                        "<strong>Vacina de bloqueio:</strong> até <strong>120 h (5 dias)</strong> após o contato, nos suscetíveis que podem receber a vacina (MS).",
                        "<strong>Imunoglobulina antivaricela-zoster (IGHAVZ)</strong>, pelo CRIE, até <strong>96 h</strong> (ideal nas primeiras 48 h), em suscetíveis com contato significativo e <strong>risco especial</strong>: <strong>imunodeprimidos</strong>, <strong>gestantes</strong>, <strong>RN de mãe com varicela de 5 dias antes a 48 h depois do parto</strong>, <strong>prematuros ≥ 28 semanas</strong> de mãe sem varicela, <strong>prematuros &lt; 28 semanas ou &lt; 1.000 g</strong> independentemente da mãe (CRIE).",
                        "<strong>Dose da IGHAVZ:</strong> 125 UI a cada 10 kg, IM (máximo 625 UI) (CRIE). Não tem indicação para tratar a varicela já instalada."
                    ]
                },
                {
                    passo: 7,
                    titulo: "Alta e sinais de alarme",
                    resumo: "Retornar se febre que volta, pele vermelha e dolorida, falta de ar, sonolência ou desequilíbrio.",
                    itens: [
                        "<strong>Retornar se:</strong> <strong>febre que volta</strong> ou dura mais de 4 dias, <strong>vermelhidão que se espalha</strong>, inchaço ou <strong>dor forte</strong> em volta das lesões, lesões com sangue, <strong>falta de ar</strong>, <strong>sonolência</strong>, convulsão, <strong>desequilíbrio</strong> para andar, vômitos repetidos.",
                        "<strong>Volta à escola</strong> com todas as lesões em crosta.",
                        "Conferir a <strong>vacinação</strong> dos irmãos e contatos (passo 6)."
                    ],
                    remedios: ["orientacoes_gerais"]
                }
            ]
        },
        {
            titulo: "Ambulatório: casa e prevenção",
            icone: "🏠",
            cor: "#16a34a",
            secoes: [
                {
                    titulo: "Vacina da varicela",
                    icone: "💉",
                    resumo: "Tetra viral aos 15 meses e varicela aos 4 anos (MS).",
                    itens: [
                        "<strong>Calendário do MS:</strong> <strong>tetra viral</strong> (sarampo, caxumba, rubéola e varicela) aos <strong>15 meses</strong> e <strong>varicela</strong> aos <strong>4 anos</strong>.",
                        "Vacina de vírus vivo: contraindicada em imunodeprimidos e gestantes (avaliar no CRIE).",
                        "Quem teve varicela não precisa da vacina."
                    ]
                },
                {
                    titulo: "Depois da varicela",
                    icone: "🩹",
                    resumo: "Cicatrizes, manchas e herpes zoster no futuro.",
                    itens: [
                        "As crostas caem em 1 a 2 semanas; manchas claras ou escuras somem aos poucos. Coçar e infectar deixa cicatriz.",
                        "O vírus fica latente e pode voltar como <strong>herpes zoster</strong> anos depois."
                    ]
                }
            ]
        }
    ],

    citacoes: { "MS": 0, "Ministério da Saúde": 0, "CRIE": 1 },
    fontes: [
        "Brasil. Ministério da Saúde. Guia de Vigilância em Saúde. 6ª ed. Brasília: MS, 2023. Capítulo: Varicela e herpes zoster.",
        "Brasil. Ministério da Saúde. Manual dos Centros de Referência para Imunobiológicos Especiais (CRIE). 5ª ed. Brasília: MS, 2019 (imunoglobulina antivaricela-zoster e vacina pós-exposição)."
    ],
    revisao: "10/2026"
});
