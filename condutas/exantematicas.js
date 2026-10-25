// =====================================================
// DOENÇAS EXANTEMÁTICAS — categoria da área 📖 Condutas
// 1) Guia de identificação do exantema (ferramenta clicável que afunila as hipóteses)
// 2) Varicela (primeira conduta da categoria)
// Fotos reais de domínio público ou Creative Commons (Wikimedia Commons), com crédito,
// licença e link em cada foto (FOTOS_EXANTEMA). Arquivos em img/exantemas/.
// Base: MS — Guia de Vigilância em Saúde (2023); Manual dos CRIE (MS);
// AHA 2017 (Kawasaki); IDSA 2012 (escarlatina); revisões de exantemas (PubMed).
// =====================================================

// ---------- Fotos reais (Wikimedia Commons; domínio público ou Creative Commons) ----------
// Redimensionadas para o app. Crédito e licença sempre embaixo da foto, com link para a página original.
const FOTOS_EXANTEMA = {
    "varicela_crianca": {
        "arq": "img/exantemas/varicela_crianca.jpg",
        "autor": "Jonnymccullagh",
        "licenca": "CC BY-SA 3.0",
        "legenda": "Varicela em menino de 5 anos: lesões em fases diferentes no tronco e na face.",
        "link": "https://commons.wikimedia.org/wiki/File%3AChickenpox_5yearold.JPG"
    },
    "varicela_vesicula": {
        "arq": "img/exantemas/varicela_vesicula.jpg",
        "autor": "Zeimusu",
        "licenca": "CC BY-SA 3.0",
        "legenda": "Vesícula da varicela de perto (\"gota de orvalho\" sobre base vermelha).",
        "link": "https://commons.wikimedia.org/wiki/File%3AChickenpox_blister-%28closeup%29.jpg"
    },
    "varicela_grave": {
        "arq": "img/exantemas/varicela_grave.jpg",
        "autor": "Gzzz",
        "licenca": "CC BY-SA 4.0",
        "legenda": "Varicela extensa em criança (manchas brancas = pasta d'água).",
        "link": "https://commons.wikimedia.org/wiki/File%3ASevere_chickenpox.jpg"
    },
    "sarampo": {
        "arq": "img/exantemas/sarampo.jpg",
        "autor": "CDC",
        "licenca": "domínio público",
        "legenda": "Sarampo: exantema maculopapular confluente na face e no tronco.",
        "link": "https://commons.wikimedia.org/wiki/File%3ABoy_with_measles.jpg"
    },
    "sarampo_koplik": {
        "arq": "img/exantemas/sarampo_koplik.jpg",
        "autor": "CDC",
        "licenca": "domínio público",
        "legenda": "Manchas de Koplik na mucosa jugal (fase pré-eruptiva).",
        "link": "https://commons.wikimedia.org/wiki/File%3AKoplik_spots%2C_measles_6111_lores.jpg"
    },
    "rubeola": {
        "arq": "img/exantemas/rubeola.jpg",
        "autor": "CDC",
        "licenca": "domínio público",
        "legenda": "Rubéola: exantema rosado e fino nas costas de uma criança.",
        "link": "https://commons.wikimedia.org/wiki/File%3ARash_of_rubella_on_skin_of_child%27s_back.JPG"
    },
    "roseola": {
        "arq": "img/exantemas/roseola.jpg",
        "autor": "M Davis",
        "licenca": "domínio público",
        "legenda": "Exantema súbito em menina de 21 meses, após a febre.",
        "link": "https://commons.wikimedia.org/wiki/File%3ARoseola_on_a_21-month-old_girl.jpg"
    },
    "eritema_infeccioso": {
        "arq": "img/exantemas/eritema_infeccioso.jpg",
        "autor": "Andrew Kerr",
        "licenca": "domínio público",
        "legenda": "Eritema infeccioso: \"bochecha esbofeteada\" e exantema rendilhado no tronco.",
        "link": "https://commons.wikimedia.org/wiki/File%3AFifth_disease.jpg"
    },
    "mao_pe_boca": {
        "arq": "img/exantemas/mao_pe_boca.jpg",
        "autor": "James Heilman, MD",
        "licenca": "CC BY-SA 3.0",
        "legenda": "Mão-pé-boca: vesículas ovais nas mãos.",
        "link": "https://commons.wikimedia.org/wiki/File%3ACharacteristic_rash_of_hand%2C_foot%2C_and_mouth_disease%2C_on_human_hands.jpg"
    },
    "mao_pe_boca_boca": {
        "arq": "img/exantemas/mao_pe_boca_boca.jpg",
        "autor": "shawn c",
        "licenca": "domínio público",
        "legenda": "Mão-pé-boca: úlceras no palato mole e na orofaringe.",
        "link": "https://commons.wikimedia.org/wiki/File%3AHFMD_soft_palete_oropharynx.jpg"
    },
    "escarlatina": {
        "arq": "img/exantemas/escarlatina.jpg",
        "autor": "Whispyhistory",
        "licenca": "CC BY-SA 4.0",
        "legenda": "Escarlatina: exantema áspero (\"lixa\") no pescoço e no tronco.",
        "link": "https://commons.wikimedia.org/wiki/File%3AScarlet_fever_rash.jpg"
    },
    "escarlatina_lingua": {
        "arq": "img/exantemas/escarlatina_lingua.jpg",
        "autor": "Dr Graham Beards, com Tamii Render",
        "licenca": "CC BY-SA 4.0",
        "legenda": "Escarlatina: língua em framboesa.",
        "link": "https://commons.wikimedia.org/wiki/File%3AChild_with_scarlet_fever.jpg"
    },
    "kawasaki_labios": {
        "arq": "img/exantemas/kawasaki_labios.jpg",
        "autor": "Dong Soo Kim (recorte: Natr)",
        "licenca": "CC BY 2.0",
        "legenda": "Kawasaki: lábios vermelhos e fissurados, língua em framboesa.",
        "link": "https://commons.wikimedia.org/wiki/File%3AKawasaki_symptoms_B.jpg"
    },
    "kawasaki_maos": {
        "arq": "img/exantemas/kawasaki_maos.jpg",
        "autor": "Dong Soo Kim (recorte: Natr)",
        "licenca": "CC BY 2.0",
        "legenda": "Kawasaki: eritema das palmas com edema.",
        "link": "https://commons.wikimedia.org/wiki/File%3AKawasaki_symptoms_D.jpg"
    },
    "meningococcemia": {
        "arq": "img/exantemas/meningococcemia.jpg",
        "autor": "Pam Cleverley e Perry Bisman",
        "licenca": "CC BY-SA 3.0",
        "legenda": "Doença meningocócica: púrpura fulminante em lactente.",
        "link": "https://commons.wikimedia.org/wiki/File%3ACharlotte_Cleverley-Bisman_Meningicoccal_Disease.jpg"
    },
    "petequias": {
        "arq": "img/exantemas/petequias.jpg",
        "autor": "DrFO.Jr.Tn",
        "licenca": "CC BY-SA 3.0",
        "legenda": "Exantema petequial: pontos que não somem à vitropressão.",
        "link": "https://commons.wikimedia.org/wiki/File%3APetechial_rash.JPG"
    },
    "dengue": {
        "arq": "img/exantemas/dengue.jpg",
        "autor": "Emy Abi Thomas, Mary John e Bimal Kanish",
        "licenca": "CC BY 3.0",
        "legenda": "Dengue: eritema confluente com petéquias (\"ilhas brancas\").",
        "link": "https://commons.wikimedia.org/wiki/File%3AErythema_with_petechiae_on_patient_with_dengue_fever.jpg"
    },
    "mononucleose_amoxi": {
        "arq": "img/exantemas/mononucleose_amoxi.jpg",
        "autor": "RainbowKatie",
        "licenca": "CC BY-SA 3.0",
        "legenda": "Exantema por amoxicilina na mononucleose.",
        "link": "https://commons.wikimedia.org/wiki/File%3AAmoxycillin_rash_in_infectious_mononucleosis.jpg"
    },
    "kawasaki_olhos": {
        "arq": "img/exantemas/kawasaki_olhos.jpg",
        "autor": "Dong Soo Kim (recorte: Natr)",
        "licenca": "CC BY 2.0",
        "legenda": "Kawasaki: conjuntivite bilateral sem secreção, poupando o limbo.",
        "link": "https://commons.wikimedia.org/wiki/File%3AKawasaki_symptoms_A.jpg"
    },
    "kawasaki_perineo": {
        "arq": "img/exantemas/kawasaki_perineo.jpg",
        "autor": "Dong Soo Kim (recorte: Natr)",
        "licenca": "CC BY 2.0",
        "legenda": "Kawasaki: exantema com acentuação no períneo.",
        "link": "https://commons.wikimedia.org/wiki/File%3AKawasaki_symptoms_C.jpg"
    }
};

function htmlFotoExantema(k, pequena) {
    let f = FOTOS_EXANTEMA[k];
    if (!f) return '';
    return `<figure class="ex-foto${pequena ? ' pequena' : ''}">
        <img src="${f.arq}" alt="${f.legenda}" loading="lazy" onclick="abrirFotoExantema('${k}')" onerror="this.closest('figure').style.display='none'">
        ${pequena ? '' : `<figcaption>${f.legenda}</figcaption>`}
        <div class="ex-credito">Foto: ${f.autor} · ${f.licenca} · <a href="${f.link}" target="_blank" rel="noopener">Wikimedia Commons</a>${f.licenca.startsWith('CC') ? ' · redimensionada' : ''}</div>
    </figure>`;
}

// Foto em tela cheia ao tocar
function abrirFotoExantema(k) {
    let f = FOTOS_EXANTEMA[k];
    if (!f) return;
    let v = document.createElement('div');
    v.className = 'ex-zoom';
    v.onclick = () => v.remove();
    v.innerHTML = `<figure><img src="${f.arq}" alt="${f.legenda}"><figcaption>${f.legenda}<br><span>Foto: ${f.autor} · ${f.licenca} · Wikimedia Commons</span></figcaption></figure><button type="button" class="ex-zoom-fechar" aria-label="Fechar">✕</button>`;
    document.body.appendChild(v);
}

// ---------- Guia de identificação ----------
// tags: lesão (mp/ves/pet/lixa) · febre (febre_antes / febre_junto / febre_pouca) · início (ini_face/ini_tronco/ini_extrem/ini_boca) · sinais
const DOENCAS_EXANTEMA = [
    { id: "sarampo", fotos: ["sarampo", "sarampo_koplik"], nome: "Sarampo", tipo: "mp", conduta: "sarampo", alerta: "Notificação imediata (até 24 h). Isolamento respiratório.",
      tags: ["mp", "febre_junto", "ini_face", "s_tosse", "s_koplik"],
      texto: "Febre alta + <strong>tosse, coriza e conjuntivite</strong>; exantema no 3º a 5º dia, ainda com febre, que começa <strong>atrás das orelhas e na face</strong> e desce (craniocaudal), confluente. <strong>Manchas de Koplik</strong> na mucosa jugal." },
    { id: "rubeola", fotos: ["rubeola"], nome: "Rubéola", tipo: "mp", conduta: "rubeola", alerta: "Notificação imediata (até 24 h).",
      tags: ["mp", "febre_pouca", "ini_face", "s_adeno_post"],
      texto: "Febre baixa; exantema rosado, <strong>não confluente</strong>, da face para o corpo em 24 h, some em ~3 dias. <strong>Adenomegalia retroauricular e occipital.</strong>" },
    { id: "exantema_subito", fotos: ["roseola"], nome: "Exantema súbito (roséola)", tipo: "mp", conduta: "exantema_subito",
      tags: ["mp", "febre_antes", "ini_tronco"],
      texto: "Lactente de 6 meses a 2 anos com <strong>febre alta por 3 a 5 dias</strong> e bom estado; <strong>a febre some e aí aparece</strong> o exantema rosado no tronco (herpesvírus 6)." },
    { id: "eritema_infeccioso", fotos: ["eritema_infeccioso"], nome: "Eritema infeccioso (parvovírus B19)", tipo: "mp", conduta: "eritema_infeccioso",
      tags: ["mp", "febre_pouca", "ini_face", "s_bochecha"],
      texto: "Escolar pouco febril; <strong>\"bochecha esbofeteada\"</strong>, depois exantema <strong>rendilhado</strong> nos membros, que volta com calor e sol. Risco de crise aplástica em anemia hemolítica." },
    { id: "varicela", fotos: ["varicela_crianca", "varicela_vesicula"], nome: "Varicela (catapora)", tipo: "ves", conduta: "varicela",
      tags: ["ves", "febre_junto", "ini_tronco", "ini_face", "s_prurido", "s_fases"],
      texto: "Vesículas pruriginosas em <strong>fases diferentes ao mesmo tempo</strong> (mácula, pápula, vesícula, crosta), começando no <strong>tronco, face e couro cabeludo</strong> (centrípeta); mucosas." },
    { id: "mao_pe_boca", fotos: ["mao_pe_boca", "mao_pe_boca_boca"], nome: "Mão-pé-boca (Coxsackie)", tipo: "ves", conduta: "mao_pe_boca",
      tags: ["ves", "febre_junto", "febre_pouca", "ini_boca", "ini_extrem"],
      texto: "Menor de 5 anos; <strong>úlceras na boca</strong> e vesículas em <strong>mãos, pés e nádegas</strong>. Atenção à desidratação por dor para engolir." },
    { id: "escarlatina", fotos: ["escarlatina", "escarlatina_lingua"], nome: "Escarlatina", tipo: "lixa", conduta: "faringoamigdalite", condutaNome: "Faringoamigdalite",
      tags: ["lixa", "febre_junto", "ini_tronco", "s_garganta", "s_lingua"],
      texto: "Faringite + exantema <strong>áspero (\"lixa\")</strong> que começa no pescoço e tronco, mais forte nas dobras (<strong>Pastia</strong>), palidez ao redor da boca (<strong>Filatov</strong>), <strong>língua em framboesa</strong>. 5 a 15 anos." },
    { id: "kawasaki", fotos: ["kawasaki_labios", "kawasaki_maos"], nome: "Doença de Kawasaki", tipo: "mp", conduta: "kawasaki", alerta: "Febre ≥ 5 dias: pensar e tratar cedo (aneurisma coronariano).",
      tags: ["mp", "febre_antes", "febre_junto", "ini_tronco", "s_febre5", "s_lingua", "s_maos_pes"],
      texto: "<strong>Febre ≥ 5 dias</strong> + conjuntivite sem secreção, <strong>lábios rachados e língua em framboesa</strong>, exantema polimorfo (não vesicular), <strong>edema e eritema de mãos e pés</strong>, adenomegalia cervical ≥ 1,5 cm. Menor de 5 anos." },
    { id: "meningococcemia", fotos: ["petequias", "meningococcemia"], nome: "Meningococcemia", tipo: "pet", conduta: "meningococcemia", alerta: "EMERGÊNCIA: febre + petéquias = antibiótico e suporte já.",
      tags: ["pet", "febre_junto", "ini_extrem", "s_toxemia", "s_vitro"],
      texto: "Febre, <strong>toxemia</strong> e <strong>petéquias ou púrpura que não somem ao apertar</strong> (vitropressão), em progressão rápida. Pode evoluir para choque em horas." },
    { id: "dengue", fotos: ["dengue"], nome: "Dengue", tipo: "mp", conduta: "dengue", alerta: "Procurar sinais de alarme (dor abdominal, vômitos, sangramento).",
      tags: ["mp", "febre_antes", "febre_junto", "ini_tronco", "s_prurido", "s_vitro"],
      texto: "Febre alta, dor no corpo e atrás dos olhos; exantema morbiliforme pruriginoso perto da queda da febre, no tronco e membros (\"ilhas brancas\"). Pode ter petéquias; prova do laço." },
    { id: "mononucleose", fotos: ["mononucleose_amoxi"], nome: "Mononucleose / exantema com amoxicilina", tipo: "mp", conduta: null,
      tags: ["mp", "febre_junto", "ini_tronco", "s_garganta", "s_adeno_post", "s_amoxi"],
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
                <div class="ex-card-fig">${(d.fotos || []).map(k => htmlFotoExantema(k, true)).join('')}</div>
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
    resumo: "Toque no tipo de lesão, na febre e em onde começou: as hipóteses sobem com fotos reais de cada doença. Sinais de alarme e notificação.",
    legenda: "Guia de apoio ao diagnóstico diferencial dos exantemas na criança, com fotos reais (Wikimedia Commons, domínio público ou Creative Commons). Vigilância: <strong>Ministério da Saúde (Guia de Vigilância em Saúde, 2023)</strong>.",

    blocos: [
        {
            titulo: "Diagnóstico e apresentação clínica",
            icone: "🔎",
            cor: "#0284c7",
            secoes: [
                {
                    titulo: "Identificar o exantema (clicável)",
                    icone: "🔍",
                    resumo: "Lesão, febre, onde começou e o sinal que chama atenção. Foto de cada doença.",
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
                    ]
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

// ---------- Varicela: fotos ----------
function ferramentaVaricelaImagens() {
    return `<div class="exg ex-galeria">${["varicela_crianca", "varicela_vesicula", "varicela_grave"].map(k => htmlFotoExantema(k)).join('')}</div>
        <div class="ex-card-desc">Cada lesão passa por <strong>mácula → pápula → vesícula ("gota de orvalho" sobre base vermelha) → pústula → crosta</strong> em 24 a 48 h, em surtos. <strong>Fases misturadas na mesma região</strong> diferenciam da varíola/mpox (lesões na mesma fase). Toque na foto para ampliar.</div>`;
}

registrarConduta({
    id: "varicela",
    nome: "Varicela (catapora)",
    categoria: "Doenças exantemáticas",
    cor: "#be185d",
    kw: "varicela catapora vesicula exantema vesicular coceira prurido aciclovir imunoglobulina vacina bloqueio contato fasciite infeccao secundaria pneumonia ataxia cerebelar encefalite reye",
    resumo: "Diagnóstico clínico com fotos reais, critérios de internação clicáveis, isolamento e notificação, sintomáticos, quando usar aciclovir e profilaxia dos contatos.",
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
                    ],
                    remedios: ["aciclovir_varicela_vo", "aciclovir_varicela_ev"]
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
