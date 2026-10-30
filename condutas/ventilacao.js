// =====================================================
// CONDUTA: VENTILAÇÃO MECÂNICA — SIMULADOR DE PROGRAMAÇÃO DO VENTILADOR
// Pedido do Dr. Jonas (10/2026): conduta curta e interativa, a 1ª da lista de Condutas.
// Passo a passo igual ao de ligar um ventilador: tipo de paciente (RN ou criança; sem adulto) →
// peso e idade → motivo da intubação → modo (com sugestão) → painel com a programação inicial
// (botões − e +, alerta quando sai da faixa) → metas e "o que mexer" pela gasometria.
// Fontes: PALICC-2 (2023), PEMVECC (2017), I Consenso Brasileiro de VM em Pediatria e Neonatologia
// (SBP/AMIB: SDRA, asma, bronquiolite), Ministério da Saúde 2014 (RN), PALS 2020 (FR normal por
// idade, escolhida pelo Dr. Jonas), tabela PEEP/FiO2 do ARDS Network (indicada pelo PALICC-2),
// conduta de TCE do app (SBP 2017 / Einstein 2025). Não inventar valor: o que não tem fonte fica
// "a confirmar" (Ti inicial da criança fora da asma e da bronquiolite).
// =====================================================

// FR normal acordado por idade (PALS 2020, AHA). "ate" = idade em anos (exclusivo).
const VM_FR_IDADE = [
    { ate: 1, nome: "lactente (< 1 ano)", fr: [30, 53] },
    { ate: 3, nome: "1 a 2 anos", fr: [22, 37] },
    { ate: 6, nome: "pré-escolar (3 a 5 anos)", fr: [20, 28] },
    { ate: 12, nome: "escolar (6 a 11 anos)", fr: [18, 25] },
    { ate: 999, nome: "adolescente (≥ 12 anos)", fr: [12, 20] }
];

// Tabela PEEP baixa / FiO2 alta do ARDS Network: FiO2 (%) → PEEP mínima e máxima (cmH2O).
const VM_PEEP_FIO2 = [[30, 5, 5], [40, 5, 8], [50, 8, 10], [60, 10, 10], [70, 10, 14], [80, 14, 14], [90, 14, 18], [100, 18, 24]];
function vmPeepDaFio2(fio2) {
    let linha = VM_PEEP_FIO2[0];
    VM_PEEP_FIO2.forEach(l => { if (fio2 >= l[0]) linha = l; });
    return fio2 < 30 ? null : { min: linha[1], max: linha[2], fio2: linha[0] };
}

const VM_MOTIVOS = {
    rn: [
        { id: "rn_comp", icone: "🫁", nome: "Complacência baixa", sub: "SDR (membrana hialina), pneumonia, atelectasia, hemorragia pulmonar, hipoplasia" },
        { id: "rn_resist", icone: "💨", nome: "Resistência alta", sub: "aspiração de mecônio, taquipneia transitória, displasia broncopulmonar, secreção" },
        { id: "rn_controle", icone: "🧠", nome: "Controle da respiração", sub: "apneia da prematuridade, encefalopatia hipóxico-isquêmica, drogas depressoras" }
    ],
    crianca: [
        { id: "normal", icone: "🫁", nome: "Pulmão normal", sub: "apneia, convulsão, intoxicação, pós-parada, cirurgia" },
        { id: "sdra", icone: "🦠", nome: "Pneumonia grave / SDRA", sub: "pulmão \"duro\", hipoxemia" },
        { id: "bronq", icone: "👶", nome: "Bronquiolite", sub: "obstrução de vias aéreas finas" },
        { id: "asma", icone: "💨", nome: "Asma (crise grave)", sub: "ar preso, auto-PEEP" },
        { id: "tce", icone: "🧠", nome: "TCE / hipertensão intracraniana", sub: "controle rigoroso do CO₂" },
        { id: "choque", icone: "❤️", nome: "Choque / cardiopatia", sub: "a pressão no tórax mexe na circulação" }
    ]
};

const VM_MODOS = {
    PCV: { nome: "PCV", longo: "pressão controlada", desc: "Pressão fixa: o volume muda com o pulmão (cai se a resistência sobe ou a complacência cai). Vigiar o volume corrente." },
    VCV: { nome: "VCV", longo: "volume controlado", desc: "Volume fixo: a pressão muda com o pulmão. Vigiar o pico e o platô." },
    PRVC: { nome: "PRVC", longo: "pressão regulada a volume", desc: "Volume alvo com a menor pressão: o aparelho ajusta a pressão a cada ciclo." },
    IMV: { nome: "IMV", longo: "pressão limitada, ciclada a tempo", desc: "Ventilador neonatal de fluxo contínuo: você programa PIP, PEEP, Ti, FR, fluxo e FiO₂." }
};

const VM_AJUDA = {
    vc: "<b>Volume corrente (VC):</b> ar que entra em cada respiração. Calculado pelo peso (no obeso, pelo peso ideal).",
    pip: "<b>PIP:</b> pressão máxima na inspiração. Nos modos a pressão, é ela que define o volume que entra.",
    peep: "<b>PEEP:</b> pressão que fica no fim da expiração; mantém os alvéolos abertos. Subir a PEEP melhora a oxigenação; em excesso, atrapalha a circulação.",
    fr: "<b>FR:</b> respirações por minuto do aparelho. FR × VC = volume-minuto, que é o que tira o CO₂.",
    ti: "<b>Tempo inspiratório (Ti):</b> duração da inspiração. O resto do ciclo é a expiração (Te). Relação I:E = Ti : Te.",
    fio2: "<b>FiO₂:</b> fração de oxigênio (21% = ar ambiente). Ajustar pela saturação.",
    fluxo: "<b>Fluxo:</b> fluxo contínuo de gás no circuito do ventilador neonatal."
};

let vmEstado = { passo: 1, tipo: "", peso: "", idade: "", motivo: "", modo: "", prog: null, ajuda: "", gaso: {} };

function vmNum(x) { let n = parseFloat(String(x == null ? "" : x).replace(",", ".")); return isNaN(n) ? null : n; }
function vmFmt(x, dec) { return x == null ? "—" : Number(x).toFixed(dec || 0).replace(".", ","); }
function vmFaixaTxt(f, dec, un) { return f ? (f[0] === f[1] ? vmFmt(f[0], dec) : `${vmFmt(f[0], dec)}–${vmFmt(f[1], dec)}`) + (un ? " " + un : "") : ""; }

// ===== Configuração do caso: parâmetros, faixas, metas e explicações =====
function vmConfig() {
    let e = vmEstado, p = vmNum(e.peso) || 0, idade = vmNum(e.idade), m = e.motivo, modo = e.modo;
    let cfg = { modos: [], sugestao: "", params: [], metas: [], porque: [], alvo: {} };

    if (e.tipo === "rn") {
        // Ministério da Saúde 2014, vol. 3, cap. 22 (figura 16): três situações-padrão.
        let t = { rn_comp: { fluxo: [6, 8], peep: [4, 6], ti: [0.2, 0.3], te: 0.3, fr: [30, 60] },
                  rn_resist: { fluxo: [6, 8], peep: [3, 5], ti: [0.4, 0.5], te: 0.5, fr: [30, 60] },
                  rn_controle: { fluxo: [6, 6], peep: [3, 4], ti: [0.3, 0.5], te: 0.6, fr: [20, 40] } }[m] || {};
        cfg.modos = [{ id: "IMV", sug: true }];
        cfg.sugestao = "No RN, o ventilador habitual é de fluxo contínuo, limitado a pressão e ciclado a tempo (IMV). Se o RN não melhorar, considerar ventilação sincronizada: A/C ou SIMV com pressão de suporte (MS 2014).";
        cfg.params = [
            { id: "fluxo", nome: "Fluxo", un: "L/min", faixa: t.fluxo, ini: t.fluxo[0], passo: 1 },
            { id: "pip", nome: "PIP", un: "cmH₂O", texto: `Subir até expansão do tórax de ~0,5 cm (terço médio do esterno) ou VC expirado de 4–6 mL/kg (${vmFmt(4 * p, 0)}–${vmFmt(6 * p, 0)} mL). Usar sempre a menor PIP possível.` },
            { id: "peep", nome: "PEEP", un: "cmH₂O", faixa: t.peep, ini: t.peep[0], passo: 1,
              alerta: v => v > 8 ? "PEEP acima de 8 é rara no RN: atenção à hemodinâmica (MS 2014)." : null },
            { id: "ti", nome: "Ti", un: "s", faixa: t.ti, ini: t.ti[1], passo: 0.05, dec: 2 },
            { id: "fr", nome: "FR", un: "irpm", faixa: t.fr, ini: t.fr[0], passo: 2,
              alerta: v => v > 80 ? "FR acima de 80: baixar a PEEP para 2 cmH₂O (MS 2014)." : null },
            { id: "fio2", nome: "FiO₂", un: "%", faixa: [21, 100], ini: 40, passo: 5, livre: true,
              alerta: v => v > 60 ? "Evitar FiO₂ acima de 60% por tempo prolongado (MS 2014)." : null }
        ];
        cfg.teMin = t.te;
        cfg.metas = ["pH > 7,20 nas primeiras 6 horas de vida e, depois, > 7,25", "PaCO₂ 40–60 mmHg (aceitar até 65: hipercapnia permissiva)",
            "PaO₂ 50–70 mmHg ou SatO₂ 86–93%", "VC expirado 4–6 mL/kg", "RX: cúpula diafragmática direita entre a 8ª e a 9ª costela posterior; ponta da cânula entre T1 e T3"];
        cfg.alvo = { co2: [40, 60], co2max: 65, ph: 7.20, pao2: [50, 70], spo2: [86, 93] };
        cfg.porque = {
            rn_comp: ["<b>Complacência baixa:</b> o pulmão enche e esvazia rápido, então Ti curto (0,2–0,3 s) basta.", "<b>PEEP:</b> ajustar pelo volume pulmonar no RX (8 a 9 costelas)."],
            rn_resist: ["<b>Resistência alta:</b> o ar entra e sai devagar: Ti mais longo (0,4–0,5 s) e Te > 0,5 s para não prender ar (auto-PEEP)."],
            rn_controle: ["<b>Pulmão quase normal:</b> o problema é o comando da respiração. FR 20–40 e PEEP 3–4 bastam."]
        }[m] || [];
        cfg.porque.push("<b>Proteção:</b> menor PIP possível, FiO₂ > 60% pelo menor tempo e hipercapnia permissiva até PaCO₂ 65 (MS 2014).");
        return cfg;
    }

    // ===== Criança =====
    let faixaIdade = VM_FR_IDADE.find(f => (idade == null ? 0 : idade) < f.ate);
    let vcFaixa = m === "asma" ? [5, 8] : [6, 8];
    cfg.modos = [{ id: "PCV" }, { id: "VCV" }, { id: "PRVC" }];
    if (m === "asma") {
        cfg.modos[0].sug = true;
        cfg.sugestao = "Asma: modos a pressão (PCV), pela maior experiência em pediatria. PRVC é alternativa; VCV continua opção tradicional, vigiando o platô < 30 cmH₂O (Consenso SBP/AMIB, asma).";
    } else if (m === "bronq") {
        cfg.modos[0].sug = true;
        cfg.sugestao = "Bronquiolite: os estudos usaram modos controlados a pressão e tempo, os habituais em pediatria. Não há estudo comparando com volume (Consenso AMIB, bronquiolite).";
    } else {
        cfg.sugestao = "Nenhum modo mostrou ser melhor que outro (PEMVECC): escolha o que você conhece melhor, pensando na doença. " + ({
            sdra: "O que importa é respeitar VC 6–8 mL/kg, platô ≤ 28 e driving pressure ≤ 15 cmH₂O em qualquer modo (PALICC-2).",
            tce: "O que importa é manter o CO₂ estável (PaCO₂ 35–40). Nos modos a pressão o volume varia: conferir o volume-minuto.",
            choque: "Na criança cardiopata, ventilação assistida pode ser preferível à controlada (PEMVECC).",
            normal: "No pulmão normal, qualquer modo funciona bem."
        }[m] || "");
    }

    let vc = { id: "vc", nome: "Volume corrente", un: "mL", faixa: [Math.round(vcFaixa[0] * p), Math.round(vcFaixa[1] * p)],
        ini: Math.round(vcFaixa[0] * p), passo: Math.max(1, Math.round(p / 2)), porKg: true,
        alerta: v => { let k = v / p;
            if (k > 10) return "Acima de 10 mL/kg: evitar (PEMVECC).";
            if (k > 8) return "Acima de 8 mL/kg: volume suprafisiológico (PALICC-2).";
            if (k < 4) return "Abaixo de 4 mL/kg: usar com cuidado (PALICC-2).";
            if (m !== "sdra" && k < vcFaixa[0]) return `Abaixo de ${vcFaixa[0]} mL/kg.`;
            return null; } };
    let pip;
    if (m === "bronq") pip = { id: "pip", nome: "PIP", un: "cmH₂O", faixa: [25, 32], ini: 25, passo: 1,
        alerta: v => v > 32 ? "Acima de 32: além do usado nos estudos (Consenso AMIB)." : (v < 25 ? "PIP baixa pode não vencer a resistência e causar atelectasia (Consenso AMIB)." : null) };
    else if (m === "asma") pip = { id: "pip", nome: "PIP", un: "cmH₂O",
        texto: `Subir até VC de 5–8 mL/kg (${vmFmt(5 * p)}–${vmFmt(8 * p)} mL). Pico máximo: ${idade != null && idade < 6 ? "30–35 cmH₂O (pré-escolar)" : "35–40 cmH₂O (escolar e adolescente)"} (Consenso SBP/AMIB).` };
    else pip = { id: "pip", nome: "PIP", un: "cmH₂O",
        texto: `Subir até VC de 6–8 mL/kg (${vmFmt(6 * p)}–${vmFmt(8 * p)} mL). ${m === "sdra" ? "Platô ≤ 28 cmH₂O e driving pressure (PIP − PEEP) ≤ 15 (PALICC-2)." : "Platô ≤ 28 cmH₂O (PALICC-2); sem doença pulmonar, PIP − PEEP < 10 (PEMVECC)."}` };

    let peep;
    if (m === "sdra") peep = { id: "peep", nome: "PEEP", un: "cmH₂O", ini: 18, passo: 1, faixaPeloFio2: true,
        alerta: (v, prog) => { let t = vmPeepDaFio2(prog.fio2); return t && v < t.min ? `Abaixo da tabela PEEP/FiO₂: com FiO₂ ${prog.fio2}%, PEEP mínima ${t.min} (PALICC-2).` : null; } };
    else if (m === "bronq") peep = { id: "peep", nome: "PEEP", un: "cmH₂O", faixa: [4, 6], ini: 5, passo: 1,
        alerta: v => v > 6 ? "Na bronquiolite a hipoxemia depende mais do volume corrente; PEEP alta ajuda pouco, salvo se evoluir para SDRA (Consenso AMIB)." : null };
    else if (m === "asma") peep = { id: "peep", nome: "PEEP", un: "cmH₂O", faixa: [4, 5], ini: 4, passo: 1,
        alerta: v => v > 5 ? "Na asma, PEEP baixa (4–5) de rotina; PEEP maior só no desmame, medindo o auto-PEEP (Consenso SBP/AMIB)." : null };
    else peep = { id: "peep", nome: "PEEP", un: "cmH₂O", faixa: [3, 5], ini: 5, passo: 1,
        alerta: v => v > 5 ? (m === "choque" ? "Titular com cuidado: PEEP suficiente para manter o volume pulmonar, olhando a hemodinâmica (PEMVECC)." : "Pulmão sem lesão: PEEP fisiológica de 3–5 basta (PEMVECC). Subir só se a oxigenação pedir.") : (v < 3 ? "Abaixo da PEEP fisiológica (PEMVECC)." : null) };

    let fr, ti;
    if (m === "asma") {
        let f = idade != null && idade > 5 ? [10, 12] : [12, 16];
        fr = { id: "fr", nome: "FR", un: "irpm", faixa: f, ini: f[0], passo: 1,
            alerta: v => v > f[1] ? "FR alta encurta a expiração e prende mais ar (Consenso SBP/AMIB)." : null };
        ti = { id: "ti", nome: "Ti", un: "s", ini: Math.round(60 / f[0] / 4 / 0.05) * 0.05, passo: 0.05, dec: 2, faixaPelaFr: true,
            alerta: (v, prog) => (60 / prog.fr - v) / v < 3 ? "Relação I:E menor que 1:3: pouco tempo para expirar (Consenso SBP/AMIB)." : null };
    } else if (m === "bronq") {
        fr = { id: "fr", nome: "FR", un: "irpm", faixa: [16, 24], ini: 16, passo: 1,
            alerta: v => v > 24 ? "FR alta encurta a expiração (Te ideal 1,3–2,0 s) (Consenso AMIB)." : null };
        ti = { id: "ti", nome: "Ti", un: "s", faixa: [0.7, 0.9], ini: 0.7, passo: 0.05, dec: 2,
            alerta: v => v < 0.7 ? "Ti curto: as áreas obstruídas não enchem (Consenso AMIB)." : null };
        cfg.teMin = 1.3;
    } else {
        fr = { id: "fr", nome: "FR", un: "irpm", faixa: faixaIdade.fr, ini: faixaIdade.fr[0], passo: 1, nota: "normal para " + faixaIdade.nome,
            alerta: v => {
                if (m === "sdra") return v < faixaIdade.fr[0] ? "Abaixo da FR normal para a idade." : null; /* SDRA pode precisar de FR maior (PEMVECC) */
                if (v > faixaIdade.fr[1]) return m === "tce" ? "FR acima do normal: risco de hiperventilar (PaCO₂ < 35)." : "Acima da FR normal para a idade (PALS).";
                if (v < faixaIdade.fr[0]) return "Abaixo da FR normal para a idade (PALS).";
                return null; } };
        ti = { id: "ti", nome: "Ti", un: "s", texto: "Ajustar pela curva de fluxo: o fluxo inspiratório deve chegar a zero no fim da inspiração, e o expiratório antes do próximo ciclo (PEMVECC).", semFonte: true };
    }
    let fio2 = { id: "fio2", nome: "FiO₂", un: "%", faixa: [21, 100], ini: 100, passo: 5, livre: true,
        alerta: v => v > 60 ? "Manter FiO₂ abaixo de 60% sempre que possível (Consenso SBP/AMIB)." : null };

    cfg.params = [modo === "PCV" ? pip : vc, peep, fr, ti, fio2];

    let metasBase = ["Cabeceira elevada a 30–45° (PEMVECC)"];
    if (m === "sdra") {
        cfg.metas = ["SpO₂ 92–97% se PEEP < 10; 88–92% se PEEP ≥ 10 (PALICC-2 / PEMVECC)", "Hipercapnia permissiva: aceitar pH ≥ 7,20 (PALICC-2)",
            "Platô ≤ 28 cmH₂O (29–32 se a parede torácica for rígida) e driving pressure ≤ 15", "Gravidade: índice de oxigenação (OI) ≥ 16 ou OSI ≥ 12 = SDRA grave (PALICC-2)"];
        cfg.alvo = { ph: 7.20, permissiva: true, spo2: [92, 97], spo2Alta: [88, 92] };
        cfg.porque = ["<b>Pulmão \"duro\":</b> pouco pulmão aberto para ventilar. Volume baixo (6–8 mL/kg) e pressões limitadas evitam lesão (PALICC-2).",
            "<b>PEEP:</b> pela tabela PEEP/FiO₂ — quanto mais oxigênio precisa, mais PEEP (PALICC-2).",
            "<b>FR:</b> pode precisar ser maior que o normal para compensar o volume baixo (PEMVECC)."];
    } else if (m === "bronq") {
        cfg.metas = ["SatO₂ ~90% com FiO₂ 0,3–0,5 (Consenso AMIB)", "Te de 1,3 a 2,0 s para esvaziar o pulmão"];
        cfg.alvo = { spo2: [90, 97] };
        cfg.porque = ["<b>Obstrução:</b> o ar entra e sai devagar. Ti longo (0,7–0,9 s) e Te longo (1,3–2,0 s), por isso a FR fica baixa (16–24) (Consenso AMIB).",
            "<b>PIP 25–32:</b> pressão menor não vence a resistência e colapsa vias aéreas.",
            "<b>Hipoxemia:</b> depende do volume corrente; a PEEP ajuda pouco, salvo se virar SDRA."];
    } else if (m === "asma") {
        cfg.metas = ["Hipercapnia permissiva: aceitar pH > 7,1 (Consenso SBP/AMIB)", "Platô ≤ 30 cmH₂O (PEMVECC)",
            `Pico ≤ ${idade != null && idade < 6 ? "30–35" : "35–40"} cmH₂O`, "Monitorar auto-PEEP, pico, platô e volume corrente"];
        cfg.alvo = { ph: 7.1, permissiva: true, asma: true };
        cfg.porque = ["<b>Ar preso (auto-PEEP):</b> o problema é expirar. FR baixa e relação I:E 1:3 a 1:4 dão tempo para o ar sair (Consenso SBP/AMIB).",
            "<b>Volume baixo (5–8 mL/kg) e PEEP baixa (4–5):</b> evitam barotrauma; aceitar CO₂ alto."];
    } else if (m === "tce") {
        cfg.metas = ["PaCO₂ 35–40 mmHg e PaO₂ 90–100 mmHg (conduta TCE do app: SBP 2017 / Einstein 2025)", "Não hiperventilar de forma profilática; PaCO₂ < 30 só na herniação aguda",
            "Hipercapnia permissiva NÃO vale aqui (PALICC-2)"];
        cfg.alvo = { co2: [35, 40], pao2: [90, 100], spo2: [95, 100], tce: true };
        cfg.porque = ["<b>CO₂ controla o fluxo de sangue no cérebro:</b> CO₂ alto dilata os vasos e sobe a pressão intracraniana; CO₂ muito baixo causa isquemia.",
            "<b>Pulmão em geral normal:</b> volume e PEEP fisiológicos; o foco é a FR para acertar o CO₂."];
    } else if (m === "choque") {
        cfg.metas = ["CO₂ normal (35–45 mmHg); com risco de hipertensão pulmonar, manter pH normal (PEMVECC)", "Titular SpO₂ conforme a cardiopatia (PEMVECC)"];
        cfg.alvo = { co2: [35, 45], cardio: true };
        cfg.porque = ["<b>Pressão positiva:</b> diminui a pós-carga do ventrículo esquerdo (ajuda na falência esquerda), mas aumenta a do direito (PEMVECC).",
            "<b>Titular com mais cuidado</b> a PEEP e as pressões, olhando PA e perfusão a cada mudança."];
    } else {
        cfg.metas = ["CO₂ normal: PaCO₂ 35–45 mmHg (PEMVECC)", "SpO₂ > 95% é o esperado sem lesão pulmonar (PEMVECC); evitar > 97% com O₂ por tempo prolongado (PALICC-2)", "PIP − PEEP < 10 cmH₂O (PEMVECC)"];
        cfg.alvo = { co2: [35, 45], spo2: [95, 97] };
        cfg.porque = ["<b>Pulmão sadio:</b> volume fisiológico (6–8 mL/kg), PEEP fisiológica (3–5) e FR normal para a idade (PEMVECC, PALS)."];
    }
    cfg.metas = cfg.metas.concat(metasBase);
    return cfg;
}

// =====================================================
// TELA DO VENTILADOR (pedido do Dr. Jonas: "como se estivesse programando à beira-leito")
// Layout inspirado nos ventiladores de UTI mais usados (padrão Mindray SV300/SV800, escolhido
// pelo Dr. Jonas), sem marca nem logotipo: barra de cima com tipo de paciente, modo e alarmes;
// curvas de pressão, fluxo e volume; valores monitorados à direita; teclas de parâmetro embaixo
// (toca, ajusta com − e + e confirma, como o botão giratório).
// As curvas vêm de um pulmão simulado de um compartimento (complacência e constante de tempo
// ilustrativas por doença): servem para ensinar o efeito de cada ajuste, não são dado de paciente.
// =====================================================

// Nomes dos modos como aparecem no aparelho.
const VM_ROTULO = { PCV: "P-A/C", VCV: "V-A/C", PRVC: "PRVC", IMV: "P-A/C" };

// Pulmão simulado: complacência (mL/cmH2O por kg) e constante de tempo (s). Ilustrativo.
// Constante de tempo de base: RN 0,15 s e lactente 0,20 s (Consenso SBP/AMIB, VNIPP).
function vmPulmao() {
    let e = vmEstado, p = vmNum(e.peso) || 1, idade = vmNum(e.idade) || 0;
    let base = e.tipo === "rn" ? 0.15 : (idade < 1 ? 0.2 : idade < 6 ? 0.25 : 0.3);
    let t = { normal: [1.0, 1], tce: [1.0, 1], choque: [0.9, 1], sdra: [0.6, 0.6], bronq: [0.45, 2.5], asma: [0.5, 3.5],
              rn_comp: [0.5, 0.6], rn_resist: [0.9, 1.6], rn_controle: [1.0, 1] }[e.motivo] || [1, 1];
    let C = t[0] * p, tau = base * t[1];
    return { C, tau, R: tau / (C / 1000) };
}

// Ciclo em regime estável: volume que fica preso (auto-PEEP), VT, pressões e as curvas de um ciclo.
function vmSimular() {
    let e = vmEstado, pr = e.prog, L = vmPulmao();
    if (!pr) return null;
    let f = pr.fr, Tt = 60 / f, Ti = Math.min(pr.ti, Tt * 0.9), Te = Tt - Ti, C = L.C, tau = L.tau, Rml = L.R / 1000;
    let a = Math.exp(-Te / tau), b = Math.exp(-Ti / tau), peep = pr.peep, porVolume = e.modo === "VCV";
    let dP, V0, Vend, VT, F = 0, ppico, limitado = false;
    if (porVolume) {
        VT = pr.vc; V0 = VT * a / (1 - a); Vend = V0 + VT; F = VT / Ti;
        ppico = peep + Vend / C + F * Rml;
    } else {
        if (e.modo === "PRVC") {
            dP = pr.vc * (1 - a * b) / (C * (1 - b) * (1 - a));
            if (peep + dP > pr.plim - 5) { dP = Math.max(0, pr.plim - 5 - peep); limitado = true; } /* PRVC não passa de 5 abaixo do limite de pressão */
        } else dP = pr.pinsp;
        let Vinf = C * dP;
        Vend = Vinf * (1 - b) / (1 - a * b); V0 = a * Vend; VT = Vend - V0;
        ppico = peep + dP;
    }
    let pplat = peep + Vend / C, peepTot = peep + V0 / C;
    // Curvas de um ciclo (200 pontos): pressão (cmH2O), fluxo (L/min), volume (mL, a partir do início da inspiração).
    let n = 200, P = [], Fl = [], Vo = [], soma = 0;
    for (let k = 0; k < n; k++) {
        let t = k / n * Tt, v, fl, paw;
        if (t < Ti) {
            if (porVolume) { v = V0 + F * t; fl = F; paw = peep + v / C + F * Rml; }
            else { let Vinf = C * dP; v = Vinf + (V0 - Vinf) * Math.exp(-t / tau); fl = (Vinf - v) / tau; paw = peep + dP * Math.min(1, t / 0.05); }
        } else { let te = t - Ti; v = Vend * Math.exp(-te / tau); fl = -v / tau; paw = peep; }
        P.push(paw); Fl.push(fl * 60 / 1000); Vo.push(Math.max(0, v - V0)); soma += paw;
    }
    return { Tt, Ti, Te, VT, V0, ppico, pplat, peepTot, autoPeep: V0 / C, pmedia: soma / n, mv: VT * f / 1000, dP: pplat - peep,
             P, F: Fl, V: Vo, limitado, pinspEfetiva: ppico - peep, C, tau };
}

let vmAnim = { raf: 0, ultimo: 0, x: 0, buf: null, escala: null, t0: 0 };

function vmNovoEstado() {
    return { tela: "standby", tipo: "", peso: "", idade: "", motivo: "", modo: "", prog: null, sel: "", pend: null,
             menu: "", congelado: false, pausa: "", gaso: {} };
}
vmEstado = vmNovoEstado();

// Parâmetros que aparecem nas teclas, conforme o modo (Pinsp é a pressão acima da PEEP, como no aparelho).
function vmTeclas() {
    let e = vmEstado, cfg = vmConfig(), L = vmPulmao(), p = vmNum(e.peso) || 1;
    let porId = {}; cfg.params.forEach(x => porId[x.id] = x);
    let lista = [{ id: "fio2", nome: "O₂", un: "%", par: porId.fio2 }];
    if (e.modo === "PCV" || e.modo === "IMV") {
        let pip = porId.pip || {};
        lista.push({ id: "pinsp", nome: "Pinsp", un: "cmH₂O", par: { passo: 1, ajudaExtra: pip.texto || "", pipFaixa: pip.faixa, alertaPip: pip.alerta } });
    } else lista.push({ id: "vc", nome: e.modo === "PRVC" ? "VT alvo" : "VT", un: "mL", par: porId.vc });
    lista.push({ id: "fr", nome: "f", un: "/min", par: porId.fr });
    let ti = porId.ti;
    if (ti && ti.texto) ti = Object.assign({}, ti, { faixa: [vmArred(3 * L.tau, 0.05), vmArred(5 * L.tau, 0.05)], passo: 0.05, dec: 2,
        nota: "3–5 constantes de tempo do pulmão simulado (SBP)" });
    lista.push({ id: "ti", nome: "Tinsp", un: "s", par: ti });
    lista.push({ id: "peep", nome: "PEEP", un: "cmH₂O", par: porId.peep });
    return lista;
}
function vmArred(x, passo) { return Math.round(x / passo) * passo; }

// Valores iniciais: os da fonte (vmConfig); o que a fonte não traz em número é calculado no pulmão simulado.
function vmIniciarProg() {
    let e = vmEstado, cfg = vmConfig(), L = vmPulmao(), p = vmNum(e.peso) || 1, ant = e.prog;
    let pr = { plim: e.tipo === "rn" ? 30 : 35 };
    cfg.params.forEach(x => { if (x.ini != null) pr[x.id] = x.ini; });
    if (cfg.params.some(x => x.faixaPeloFio2)) { let t = vmPeepDaFio2(pr.fio2); if (t) pr.peep = t.min; }
    if (pr.ti == null) pr.ti = Math.max(0.3, vmArred(3 * L.tau, 0.05));
    if (pr.vc == null) pr.vc = Math.round((e.tipo === "rn" ? 5 : e.motivo === "asma" ? 5 : 6) * p);
    if (pr.pip != null) pr.pinsp = pr.pip - pr.peep;
    else { /* Pinsp que dá o VT inicial no pulmão simulado */
        let Tt = 60 / pr.fr, a = Math.exp(-(Tt - pr.ti) / L.tau), b = Math.exp(-pr.ti / L.tau);
        pr.pinsp = Math.max(5, Math.round(pr.vc * (1 - a * b) / (L.C * (1 - b) * (1 - a))));
    }
    if (ant && ant.plim) pr.plim = ant.plim;
    e.prog = pr;
}

// ===== Ações =====
function vmTipo(t) { let e = vmEstado; if (e.tipo !== t) { e.motivo = ""; e.modo = ""; } e.tipo = t; vmRenderTela(); }
function vmMotivo(m) { let e = vmEstado; e.motivo = m; let cfg = vmConfig(), s = cfg.modos.find(x => x.sug); e.modo = s ? s.id : ""; vmRenderTela(); }
function vmModoStandby(m) { vmEstado.modo = m; vmRenderTela(); }
function vmCampo(c, v) { vmEstado[c] = String(v).replace(",", "."); }
function vmIniciar() {
    let e = vmEstado, p = vmNum(e.peso), i = vmNum(e.idade), erro = "";
    if (!e.tipo) erro = "Escolha o tipo de paciente.";
    else if (!p || p <= 0) erro = "Digite o peso.";
    else if (e.tipo === "rn" && p > 6) erro = "Peso alto para neonato: confira (ou escolha Pediátrico).";
    else if (e.tipo === "crianca" && (i == null || i < 0)) erro = "Digite a idade em anos (6 meses = 0,5).";
    else if (!e.motivo) erro = "Escolha o motivo da ventilação.";
    else if (!e.modo) erro = "Escolha o modo.";
    if (erro) { let el = document.getElementById('vm-erro'); if (el) el.textContent = erro; return; }
    vmIniciarProg(); e.tela = "vent"; e.sel = ""; e.menu = ""; vmRender(true);
}
function vmStandby() { vmEstado.tela = "standby"; vmEstado.sel = ""; vmEstado.menu = ""; vmRender(); }
function vmNovoPaciente() { vmEstado = vmNovoEstado(); vmRender(true); }
function vmSel(id) {
    let e = vmEstado; e.menu = "";
    if (e.sel === id) { e.sel = ""; e.pend = null; } else { e.sel = id; e.pend = e.prog[id]; }
    vmAtualizarPartes();
}
function vmGirar(sinal) {
    let e = vmEstado, t = vmTeclas().find(x => x.id === e.sel); if (!t) return;
    let passo = (t.par && t.par.passo) || 1, v = Number((e.pend + sinal * passo).toFixed(2));
    if (e.sel === "fio2") v = Math.min(100, Math.max(21, v));
    else v = Math.max(e.sel === "ti" ? 0.1 : e.sel === "peep" ? 0 : passo, v);
    e.pend = v; vmAtualizarPartes();
}
function vmConfirmar() { let e = vmEstado; if (e.sel) { e.prog[e.sel] = e.pend; e.sel = ""; e.pend = null; vmAnim.escala = null; } vmAtualizarPartes(); }
function vmCancelar() { vmEstado.sel = ""; vmEstado.pend = null; vmAtualizarPartes(); }
function vmMenu(m) { let e = vmEstado; e.menu = e.menu === m ? "" : m; e.sel = ""; vmAtualizarPartes(); }
function vmTrocarModo(m) {
    let e = vmEstado, s = vmSimular();
    if (m !== e.modo && s) { /* troca suave: mantém o volume e a pressão que já estavam entrando */
        if (m === "VCV" || m === "PRVC") e.prog.vc = Math.round(s.VT);
        else e.prog.pinsp = Math.round(s.pinspEfetiva);
    }
    e.modo = m; e.menu = ""; vmAnim.escala = null; vmAtualizarPartes();
}
function vmPlim(sinal) { let e = vmEstado; e.prog.plim = Math.max(15, Math.min(60, e.prog.plim + sinal)); vmAtualizarPartes(); }
function vmCongelar() { vmEstado.congelado = !vmEstado.congelado; vmAtualizarPartes(); }
function vmPausa(tipo) { vmEstado.pausa = tipo; vmAtualizarPartes(); clearTimeout(vmPausa.t); vmPausa.t = setTimeout(() => { vmEstado.pausa = ""; vmAtualizarPartes(); }, 5000); }

// ===== Alarmes (o que as fontes dizem + o que o pulmão simulado mostra) =====
function vmAlarmes(s) {
    let e = vmEstado, pr = e.prog, p = vmNum(e.peso) || 1, cfg = vmConfig(), al = [];
    if (!s) return al;
    let add = (nivel, txt) => al.push({ nivel, txt });
    if (Math.round(s.ppico) >= pr.plim) add(3, `Pressão alta: Ppico ${vmFmt(s.ppico)} ≥ limite ${pr.plim}`);
    if (s.limitado) add(2, "PRVC limitado pela pressão: VT alvo não atingido");
    let vtkg = s.VT / p;
    if (e.tipo === "rn") { if (vtkg < 4 || vtkg > 6) add(2, `VTe ${vmFmt(vtkg, 1)} mL/kg: alvo 4–6 (MS 2014)`); }
    else {
        if (vtkg > 10) add(3, `VTe ${vmFmt(vtkg, 1)} mL/kg: evitar > 10 (PEMVECC)`);
        else if (vtkg > 8) add(2, `VTe ${vmFmt(vtkg, 1)} mL/kg: acima de 8 (PALICC-2)`);
        else if (vtkg < 4) add(2, `VTe ${vmFmt(vtkg, 1)} mL/kg: abaixo de 4 (PALICC-2)`);
        let platMax = e.motivo === "asma" ? 30 : 28;
        if (Math.round(s.pplat) > platMax) add(2, `Platô ${vmFmt(s.pplat)} cmH₂O: acima de ${platMax} (${e.motivo === "asma" ? "PEMVECC" : "PALICC-2"})`);
        if (e.motivo === "sdra" && Math.round(s.dP) > 15) add(2, `Driving pressure ${vmFmt(s.dP)}: acima de 15 (PALICC-2)`);
        if (["normal", "tce", "choque"].includes(e.motivo) && Math.round(s.ppico - pr.peep) >= 10) add(1, `PIP − PEEP ${vmFmt(s.ppico - pr.peep)}: sem doença pulmonar, < 10 (PEMVECC)`);
    }
    if (s.autoPeep >= 1) add(2, `PEEP intrínseca ${vmFmt(s.autoPeep, 1)} cmH₂O: o ar não sai todo (aumentar Te)`);
    if (cfg.teMin && s.Te < cfg.teMin) add(1, `Te ${vmFmt(s.Te, 2)} s: abaixo de ${vmFmt(cfg.teMin, 1)} s`);
    vmTeclas().forEach(t => {
        if (!t.par) return;
        let v = t.id === "pinsp" ? pr.pinsp + pr.peep : pr[t.id];
        let msg = t.id === "pinsp" ? (t.par.alertaPip ? t.par.alertaPip(v, pr) : null) : (t.par.alerta ? t.par.alerta(v, pr) : null);
        if (msg && !al.some(a => a.txt === msg)) add(1, msg);
    });
    return al.sort((x, y) => y.nivel - x.nivel);
}

// ===== Desenho =====
function vmRenderTela() { let el = document.getElementById('vmx-tela'); if (el) el.innerHTML = vmHtmlStandby(); }
function vmRender(topo) {
    let el = document.getElementById('vm-sim');
    if (!el) return;
    el.innerHTML = vmHtml();
    vmAnim.buf = null; vmAnim.escala = null;
    if (vmEstado.tela === "vent") { vmAtualizarPartes(); vmIniciarAnimacao(); }
    if (topo) { let r = el.getBoundingClientRect(), alt = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--altura-topo')) || 0; if (r.top < alt + 10 || r.top > innerHeight * 0.6) window.scrollBy(0, r.top - alt - 10); }
}

// Função chamada pela conduta (ferramentaTopo).
function htmlSimuladorVentilador() { setTimeout(() => { if (vmEstado.tela === "vent") { vmAtualizarPartes(); vmIniciarAnimacao(); } }, 0); return `<div id="vm-sim" class="vm-sim">${vmHtml()}</div>`; }

function vmHtml() {
    let e = vmEstado;
    let h = `<div class="vmx">
        <div class="vmx-top" id="vmx-top">${vmHtmlTopo()}</div>`;
    if (e.tela === "standby") h += `<div class="vmx-tela" id="vmx-tela">${vmHtmlStandby()}</div>`;
    else h += `<div class="vmx-meio"><div class="vmx-curvas"><canvas id="vm-canvas"></canvas><div class="vmx-pausa" id="vmx-pausa"></div></div>
            <div class="vmx-mon" id="vmx-mon"></div></div>
        <div class="vmx-ajuste" id="vmx-ajuste"></div>
        <div class="vmx-teclas" id="vmx-teclas"></div>
        <div class="vmx-funcoes" id="vmx-funcoes"></div>
        <div class="vmx-menu" id="vmx-menu"></div>`;
    h += `</div>`;
    if (e.tela === "vent") h += `<div class="vm-guia" id="vm-guia">${vmHtmlGuia()}</div>`;
    else h += `<div class="vm-nota vm-dica">Treino de programação: o pulmão é simulado. Os valores sugeridos e as metas seguem as fontes da conduta (lista no fim).</div>`;
    return h;
}

function vmHtmlTopo(al) {
    let e = vmEstado, hora = new Date().toTimeString().slice(0, 5);
    let pac = e.tipo === "rn" ? "👶 Neonato" : e.tipo === "crianca" ? "🧒 Pediátrico" : "—";
    let modo = e.tela === "vent" ? VM_ROTULO[e.modo] : "STANDBY";
    let alarme = "";
    if (e.tela === "vent" && al) {
        alarme = al.length ? `<button type="button" class="vmx-alarme n${al[0].nivel}" onclick="vmMenu('alarmes')">${al[0].nivel === 3 ? "!!! " : al[0].nivel === 2 ? "!! " : "! "}${al[0].txt}${al.length > 1 ? ` <b>+${al.length - 1}</b>` : ""}</button>`
            : `<span class="vmx-alarme ok">Sem alarmes</span>`;
    }
    let cheia = !!(document.getElementById('vm-sim') || { classList: { contains: () => false } }).classList.contains('vm-cheia');
    return `<span class="vmx-pac">${pac}${e.peso ? ` · ${vmFmt(vmNum(e.peso), 1).replace(",0", "")} kg` : ""}</span><span class="vmx-modo">${modo}</span>${alarme}<span class="vmx-hora">${hora}</span>
        <button type="button" class="vmx-cheia-bt" onclick="vmTelaCheia()" title="${cheia ? "Sair da tela cheia" : "Tela cheia"}">${cheia ? "✕ Sair" : "⛶ Tela cheia"}</button>`;
}

function vmHtmlStandby() {
    let e = vmEstado, cfg = e.tipo && e.motivo ? vmConfig() : null;
    let pesoApp = (document.getElementById('pesoInput') || {}).value || "", idadeApp = (document.getElementById('idadeInput') || {}).value || "";
    if (!e.peso && pesoApp) e.peso = pesoApp.replace(",", ".");
    if (e.idade === "" && idadeApp) e.idade = idadeApp.replace(",", ".");
    let h = `<div class="vmx-sb-titulo">Novo paciente</div>
        <div class="vmx-sb-rot">Tipo de paciente</div>
        <div class="vmx-sb-tipos">
            <button type="button" class="${e.tipo === "rn" ? "on" : ""}" onclick="vmTipo('rn')">👶<span>Neonato</span></button>
            <button type="button" class="${e.tipo === "crianca" ? "on" : ""}" onclick="vmTipo('crianca')">🧒<span>Pediátrico</span></button>
            <button type="button" class="off" disabled>🧑<span>Adulto</span></button>
        </div>`;
    if (e.tipo) {
        h += `<div class="vmx-sb-campos">${e.tipo === "crianca" ? `<label>Idade (anos)<input type="text" inputmode="decimal" value="${escCond(String(e.idade).replace(".", ","))}" oninput="vmCampo('idade',this.value)" placeholder="ex.: 3 ou 0,5"></label>` : ""}
            <label>Peso (kg)<input type="text" inputmode="decimal" value="${escCond(String(e.peso).replace(".", ","))}" oninput="vmCampo('peso',this.value)" placeholder="${e.tipo === "rn" ? "ex.: 1,2" : "ex.: 15"}"></label></div>
            <div class="vmx-sb-rot">Motivo da ventilação</div>
            <div class="vmx-sb-motivos">${VM_MOTIVOS[e.tipo].map(x => `<button type="button" class="${e.motivo === x.id ? "on" : ""}" onclick="vmMotivo('${x.id}')"><b>${x.icone} ${x.nome}</b><small>${x.sub}</small></button>`).join("")}</div>`;
    }
    if (cfg) {
        h += `<div class="vmx-sb-rot">Modo</div><div class="vmx-sb-modos">${cfg.modos.map(m => `<button type="button" class="${e.modo === m.id ? "on" : ""}" onclick="vmModoStandby('${m.id}')">${VM_ROTULO[m.id]}${m.sug ? " ★" : ""}<small>${VM_MODOS[m.id].longo}</small></button>`).join("")}</div>
            <div class="vmx-sb-sug">💡 ${cfg.sugestao}</div>`;
    }
    h += `<div class="vm-erro" id="vm-erro"></div><button type="button" class="vmx-iniciar" onclick="vmIniciar()">▶ Iniciar ventilação</button>`;
    return h;
}

// Atualiza topo, monitor, teclas, ajuste e menus (o canvas continua, com a curva correndo).
function vmAtualizarPartes() {
    let e = vmEstado; if (e.tela !== "vent" || !document.getElementById('vmx-mon')) return;
    let s = vmSimular(), al = vmAlarmes(s), pr = e.prog, p = vmNum(e.peso) || 1;
    document.getElementById('vmx-top').innerHTML = vmHtmlTopo(al);
    let mon = [
        ["Ppico", vmFmt(s.ppico), "cmH₂O", "p"], ["Pplat", vmFmt(s.pplat), "cmH₂O", "p"], ["Pmédia", vmFmt(s.pmedia), "cmH₂O", "p"], ["PEEP", vmFmt(pr.peep), "cmH₂O", "p"],
        ["VTe", vmFmt(s.VT), `mL · ${vmFmt(s.VT / p, 1)}/kg`, "v"], ["VM", vmFmt(s.mv, 2), "L/min", "v"], ["ftot", vmFmt(pr.fr), "/min", "v"],
        ["I:E", `1:${vmFmt(s.Te / s.Ti, 1)}`, `Te ${vmFmt(s.Te, 2)} s`, "o"], ["O₂", vmFmt(pr.fio2), "%", "o"]
    ];
    document.getElementById('vmx-mon').innerHTML = mon.map(([n, v, u, c]) => `<div class="vmx-m ${c}"><span>${n}</span><b>${v}</b><small>${u}</small></div>`).join("");
    let teclas = vmTeclas();
    document.getElementById('vmx-teclas').innerHTML = `<button type="button" class="vmx-k vmx-k-modo" onclick="vmMenu('modos')"><span>Modos</span><b>${VM_ROTULO[e.modo]}</b></button>` +
        teclas.map(t => { let v = e.sel === t.id ? e.pend : pr[t.id];
            return `<button type="button" class="vmx-k${e.sel === t.id ? " sel" : ""}" onclick="vmSel('${t.id}')"><span>${t.nome}</span><b>${vmFmt(v, t.id === "ti" ? 2 : 0)}</b><small>${t.un}</small></button>`; }).join("");
    document.getElementById('vmx-funcoes').innerHTML = `<button type="button" onclick="vmStandby()">⏸ Standby</button><button type="button" onclick="vmMenu('alarmes')">🔔 Alarmes</button>
        <button type="button" onclick="vmPausa('insp')">Pausa insp.</button><button type="button" onclick="vmPausa('exp')">Pausa exp.</button>
        <button type="button" class="${e.congelado ? "on" : ""}" onclick="vmCongelar()">${e.congelado ? "▶ Descongelar" : "❄ Congelar"}</button>`;
    // Painel de ajuste (o "botão giratório")
    let aj = "";
    if (e.sel) {
        let t = teclas.find(x => x.id === e.sel), par = t.par || {}, v = e.pend;
        let faixa = par.faixa;
        if (par.faixaPeloFio2) { let tb = vmPeepDaFio2(pr.fio2); faixa = tb ? [tb.min, tb.max] : null; }
        if (par.faixaPelaFr) faixa = [60 / pr.fr / 5, 60 / pr.fr / 4];
        let alerta = null, simul = Object.assign({}, pr, { [e.sel]: v });
        if (e.sel === "pinsp") alerta = par.alertaPip ? par.alertaPip(v + pr.peep, simul) : null;
        else if (par.alerta) alerta = par.alerta(v, simul);
        let extra = e.sel === "pinsp" ? `PIP = Pinsp + PEEP = ${vmFmt(v + pr.peep)} cmH₂O${par.pipFaixa ? ` · PIP sugerida ${vmFaixaTxt(par.pipFaixa)}` : ""}` :
            e.sel === "vc" ? `${vmFmt(v / p, 1)} mL/kg` : "";
        let ajuda = { pinsp: VM_AJUDA.pip, vc: VM_AJUDA.vc, fr: VM_AJUDA.fr, ti: VM_AJUDA.ti, peep: VM_AJUDA.peep, fio2: VM_AJUDA.fio2 }[e.sel] || "";
        aj = `<div class="vmx-aj-linha"><button type="button" class="vmx-giro" onclick="vmGirar(-1)">−</button>
                <div class="vmx-aj-val"><span>${t.nome}</span><b class="${v !== pr[e.sel] ? "mudou" : ""}">${vmFmt(v, e.sel === "ti" ? 2 : 0)}</b><small>${t.un}</small></div>
                <button type="button" class="vmx-giro" onclick="vmGirar(1)">+</button></div>
            <div class="vmx-aj-info">${[extra, faixa ? `faixa sugerida ${vmFaixaTxt(faixa, par.dec, t.un)}` : "", par.nota || "", par.ajudaExtra || ""].filter(Boolean).join(" · ")}</div>
            ${alerta ? `<div class="vmx-aj-al">⚠️ ${alerta}</div>` : ""}
            ${e.sel === "ti" && vmConfig().params.some(x => x.id === "ti" && x.semFonte) && typeof MODO_TESTE !== 'undefined' && MODO_TESTE ? `<div class="vmx-aj-al">⚠️ Tinsp inicial sem fonte para esta situação (aguardando o Whitebook): valor estimado pelo pulmão simulado.</div>` : ""}
            <div class="vmx-aj-ajuda">${ajuda}</div>
            <div class="vmx-aj-bt"><button type="button" onclick="vmCancelar()">Cancelar</button><button type="button" class="ok" onclick="vmConfirmar()">✓ Confirmar</button></div>`;
    }
    let ajEl = document.getElementById('vmx-ajuste'); ajEl.innerHTML = aj; ajEl.style.display = aj ? "" : "none";
    // Menus: modos e alarmes
    let mn = "";
    if (e.menu === "modos") {
        let cfg = vmConfig();
        mn = `<div class="vmx-menu-tit">Modos <button type="button" onclick="vmMenu('')">✕</button></div>
            ${cfg.modos.map(m => `<button type="button" class="vmx-menu-op${e.modo === m.id ? " on" : ""}" onclick="vmTrocarModo('${m.id}')"><b>${VM_ROTULO[m.id]}${m.sug ? " ★" : ""}</b><small>${VM_MODOS[m.id].longo} — ${VM_MODOS[m.id].desc}</small></button>`).join("")}
            <div class="vmx-menu-nota">💡 ${cfg.sugestao}</div>`;
    } else if (e.menu === "alarmes") {
        mn = `<div class="vmx-menu-tit">Alarmes <button type="button" onclick="vmMenu('')">✕</button></div>
            <div class="vmx-plim"><span>Limite de pressão (Paw alta)</span><button type="button" onclick="vmPlim(-1)">−</button><b>${pr.plim}</b><button type="button" onclick="vmPlim(1)">+</button></div>
            ${al.length ? `<ul class="vmx-al-lista">${al.map(a => `<li class="n${a.nivel}">${a.txt}</li>`).join("")}</ul>` : `<div class="vmx-menu-nota">Sem alarmes ativos.</div>`}
            <div class="vmx-menu-nota">Vermelho = prioridade alta; amarelo = média; azul = baixa. As faixas seguem as fontes da conduta.</div>`;
    }
    let mnEl = document.getElementById('vmx-menu'); mnEl.innerHTML = mn; mnEl.style.display = mn ? "" : "none";
    // Pausas
    let pz = document.getElementById('vmx-pausa');
    pz.innerHTML = e.pausa === "insp" ? `Pausa inspiratória<br><b>Pplat ${vmFmt(s.pplat)} cmH₂O</b><br>Driving pressure ${vmFmt(s.dP)} · Cst ${vmFmt(s.VT / Math.max(0.1, s.dP), 1)} mL/cmH₂O`
        : e.pausa === "exp" ? `Pausa expiratória<br><b>PEEP total ${vmFmt(s.peepTot, 1)} cmH₂O</b><br>PEEP intrínseca ${vmFmt(s.autoPeep, 1)} cmH₂O` : "";
    pz.style.display = e.pausa ? "" : "none";
    let g = document.getElementById('vm-guia'); if (g) { let gr = document.getElementById('vm-gaso-res'); if (gr) gr.innerHTML = vmGasoHtml(); }
}

function vmHtmlGuia() {
    let e = vmEstado, cfg = vmConfig();
    return `<div class="vm-porque"><b>📌 Por que assim</b><ul>${cfg.porque.map(x => `<li>${x}</li>`).join("")}</ul></div>
        <h4>🎯 Metas</h4><ul class="vm-lista">${cfg.metas.map(x => `<li>${x}</li>`).join("")}</ul>
        <h4>🩸 Gasometria: o que mexer</h4>
        <div class="vm-campos vm-gaso">${[["ph", "pH"], ["paco2", "PaCO₂"], ["pao2", "PaO₂"], ["spo2", "SpO₂ %"]].map(([k, n]) =>
            `<label>${n}<input type="text" inputmode="decimal" value="${escCond(e.gaso[k] || "")}" oninput="vmEstado.gaso.${k}=this.value;vmGasoAtualizar()"></label>`).join("")}</div>
        <div id="vm-gaso-res">${vmGasoHtml()}</div>
        <div class="vm-dope"><b>🚨 Piorou de repente?</b> Tirar do ventilador e ventilar com bolsa e O₂ 100%. Pensar em <b>DOPE</b>: <b>D</b>eslocamento da cânula, <b>O</b>bstrução (secreção), <b>P</b>neumotórax, <b>E</b>quipamento (vazamento, circuito, gases).</div>
        <div class="vm-nota">As curvas e os valores medidos vêm de um pulmão simulado (complacência e resistência ilustrativas da doença escolhida), para treinar a programação. Não substituem o monitor do aparelho.</div>
        <button type="button" class="vm-btn" onclick="vmNovoPaciente()">↺ Novo paciente</button>`;
}

// ===== Tela cheia (pedido do Dr. Jonas): só o ventilador ocupa a tela. Usa o modo tela cheia do navegador;
// onde ele não existe (iPhone), a classe vm-cheia faz o mesmo efeito por CSS. No celular, tenta virar para paisagem.
function vmTelaCheia() {
    let el = document.getElementById('vm-sim'); if (!el) return;
    let ativo = document.fullscreenElement || document.webkitFullscreenElement;
    if (el.classList.contains('vm-cheia')) {
        if (ativo) { try { (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (err) { } }
        vmSairCheia();
        return;
    }
    el.classList.add('vm-cheia'); document.body.classList.add('vm-cheia-on');
    let req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) {
        try {
            let pr = req.call(el);
            if (pr && pr.then) pr.then(() => { try { screen.orientation.lock('landscape').catch(() => { }); } catch (err) { } }).catch(() => { });
        } catch (err) { }
    }
    vmAposCheia();
}
function vmSairCheia() {
    let el = document.getElementById('vm-sim');
    if (el) el.classList.remove('vm-cheia');
    document.body.classList.remove('vm-cheia-on');
    try { screen.orientation.unlock(); } catch (err) { }
    vmAposCheia();
}
function vmAposCheia() {
    let top = document.getElementById('vmx-top');
    if (vmEstado.tela === "vent") vmAtualizarPartes(); else if (top) top.innerHTML = vmHtmlTopo();
    vmAnim.buf = null;
}
["fullscreenchange", "webkitfullscreenchange"].forEach(ev => document.addEventListener(ev, () => {
    let el = document.getElementById('vm-sim');
    if (el && el.classList.contains('vm-cheia') && !(document.fullscreenElement || document.webkitFullscreenElement)) vmSairCheia();
}));

// ===== Curvas animadas (varredura da esquerda para a direita, como no monitor) =====
function vmIniciarAnimacao() {
    cancelAnimationFrame(vmAnim.raf);
    vmAnim.t0 = performance.now(); vmAnim.ultimo = 0; vmAnim.x = 0; vmAnim.buf = null;
    let passo = (agora) => {
        let cv = document.getElementById('vm-canvas');
        if (!cv || !document.body.contains(cv) || vmEstado.tela !== "vent") return;
        vmDesenhar(cv, agora);
        vmAnim.raf = requestAnimationFrame(passo);
    };
    vmAnim.raf = requestAnimationFrame(passo);
}
function vmDesenhar(cv, agora) {
    let dpr = window.devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); vmAnim.buf = null; }
    let s = vmSimular(); if (!s) return;
    let janela = Math.max(6, Math.min(12, s.Tt * 3)); /* segundos visíveis */
    if (!vmAnim.buf || vmAnim.buf.length !== Math.round(w)) { vmAnim.buf = new Array(Math.round(w)).fill(null); vmAnim.x = 0; vmAnim.t0 = agora; }
    if (!vmAnim.escala) { /* escala fixa por programação */
        let mx = a => Math.max(...a.map(Math.abs));
        vmAnim.escala = { p: Math.max(10, Math.ceil(Math.max(...s.P, vmEstado.prog.plim) / 5) * 5), f: Math.max(2, mx(s.F) * 1.15), v: Math.max(10, Math.max(...s.V) * 1.25) };
    }
    if (!vmEstado.congelado) {
        let alvoX = Math.floor(((agora - vmAnim.t0) / 1000 % janela) / janela * w);
        let x = vmAnim.x, guarda = 0;
        while (x !== alvoX && guarda++ < w) {
            x = (x + 1) % Math.round(w);
            let tempo = (agora - vmAnim.t0) / 1000 - ((alvoX - x + w) % w) / w * janela;
            let fase = ((tempo % s.Tt) + s.Tt) % s.Tt, k = Math.floor(fase / s.Tt * s.P.length) % s.P.length;
            vmAnim.buf[x] = [s.P[k], s.F[k], s.V[k]];
        }
        vmAnim.x = alvoX;
    }
    let c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, h);
    let faixas = [["Paw", "cmH₂O", "#ffd23f", 0, vmAnim.escala.p, false], ["Fluxo", "L/min", "#3ee07a", 1, vmAnim.escala.f, true], ["Volume", "mL", "#5fc8ff", 2, vmAnim.escala.v, false]];
    let hh = h / 3;
    faixas.forEach(([nome, un, cor, i, esc, simetrico], j) => {
        let topo = j * hh + 4, alt = hh - 8, zero = simetrico ? topo + alt / 2 : topo + alt;
        c.strokeStyle = "rgba(148,163,184,.18)"; c.lineWidth = 1; c.beginPath(); c.moveTo(0, zero); c.lineTo(w, zero); c.stroke();
        c.fillStyle = cor; c.font = "600 10px system-ui, sans-serif"; c.fillText(`${nome} (${un})  ${vmFmt(esc, esc < 10 ? 1 : 0)}`, 4, topo + 10);
        c.strokeStyle = cor; c.lineWidth = 1.6; c.beginPath(); let des = false;
        for (let x = 0; x < vmAnim.buf.length; x++) {
            let d = vmAnim.buf[x], vazio = !d || (!vmEstado.congelado && ((x - vmAnim.x + w) % w) > 0 && ((x - vmAnim.x + w) % w) < 12);
            if (vazio) { des = false; continue; }
            let y = simetrico ? zero - d[i] / esc * (alt / 2) : zero - d[i] / esc * alt;
            if (!des) { c.moveTo(x, y); des = true; } else c.lineTo(x, y);
        }
        c.stroke();
    });
    if (!vmEstado.congelado) { c.fillStyle = "rgba(255,255,255,.35)"; c.fillRect(vmAnim.x, 0, 1, h); }
}

// ===== Gasometria: o que mexer =====
function vmGasoAtualizar() { let el = document.getElementById('vm-gaso-res'); if (el) el.innerHTML = vmGasoHtml(); }
function vmGasoHtml() {
    let e = vmEstado, g = e.gaso, cfg = vmConfig(), a = cfg.alvo, prog = e.prog || {};
    let ph = vmNum(g.ph), co2 = vmNum(g.paco2), pao2 = vmNum(g.pao2), sat = vmNum(g.spo2);
    if (ph == null && co2 == null && pao2 == null && sat == null) return `<div class="vm-nota">Digite o que tiver da gasometria (e a saturação) para ver a sugestão.</div>`;
    let msg = [];
    let m = e.motivo;

    if (e.tipo === "rn") {
        if (co2 != null && co2 > a.co2max) msg.push(["al", "<b>PaCO₂ > 65:</b> ver a cânula (posição, secreção); afastar PCA, enfisema intersticial e pneumotórax; subir a PIP até boa expansão e VC 4–6 mL/kg; se o pulmão passa de 9 costelas no RX, baixar a PEEP 1–2; por último, subir a FR respeitando Ti e Te (MS 2014)."]);
        else if (co2 != null && co2 < a.co2[0]) msg.push(["ok", "<b>PaCO₂ < 40 (hiperventilação):</b> conferir expansão, volume pulmonar e VC; reduzir a PIP e depois a FR (MS 2014)."]);
        else if (co2 != null) msg.push(["ok", "<b>PaCO₂ na meta (40–60).</b>"]);
        let hipox = (sat != null && sat < a.spo2[0]) || (pao2 != null && pao2 < a.pao2[0]);
        let hiperox = (sat != null && sat > a.spo2[1]) || (pao2 != null && pao2 > a.pao2[1]);
        if (hipox) msg.push(["al", "<b>Hipoxemia (SatO₂ < 86% ou PaO₂ < 50):</b> se o pulmão tem menos de 8 costelas no RX, subir a PEEP 1–2 por vez; depois a FiO₂; ajustar a PIP até VC 4–6 mL/kg; considerar surfactante; persistindo, pensar em hipertensão pulmonar, PCA, pneumotórax (MS 2014)."]);
        else if (hiperox) msg.push(["ok", `<b>Hiperóxia (SatO₂ > 93% ou PaO₂ > 70):</b> ${prog.fio2 > 60 ? "baixar a FiO₂ primeiro." : "com FiO₂ < 60%, baixar a PIP/PEEP e a FiO₂ conforme o CO₂ (MS 2014)."}`]);
        if (ph != null && ph < 7.20) msg.push(["al", "<b>pH < 7,20:</b> abaixo da meta (> 7,20 nas primeiras 6 h; depois > 7,25)."]);
        return vmGasoLista(msg);
    }

    // Criança
    if (co2 != null) {
        if (a.asma) {
            if (ph != null && ph > a.ph) msg.push(["ok", `<b>CO₂ alto com pH > 7,1:</b> tolerar (hipercapnia permissiva). Não subir a FR: menos tempo de expiração = mais ar preso (Consenso SBP/AMIB).`]);
            else msg.push(["al", "<b>pH ≤ 7,1:</b> subir o volume corrente dentro de 5–8 mL/kg, sem passar do pico/platô; FR só se o Te continuar suficiente para esvaziar (curva de fluxo zera antes do próximo ciclo)."]);
        } else if (a.permissiva) {
            if (ph != null && ph >= a.ph) msg.push(["ok", "<b>CO₂ alto com pH ≥ 7,20:</b> tolerar (hipercapnia permissiva) para não passar de VC 8 mL/kg, platô 28 e driving pressure 15 (PALICC-2)."]);
            else if (ph != null) msg.push(["al", "<b>pH < 7,20:</b> subir a FR (pode ser acima do normal para a idade, PEMVECC) sem passar dos limites de pressão e volume."]);
            else msg.push(["ok", "Digite o pH: na SDRA, CO₂ alto é tolerado se pH ≥ 7,20."]);
        } else if (a.co2 && co2 > a.co2[1]) {
            msg.push(["al", `<b>PaCO₂ acima de ${a.co2[1]}:</b> subir a FR ou o volume corrente (até 8 mL/kg). ${a.tce ? "No TCE, corrigir logo: CO₂ alto sobe a pressão intracraniana." : ""}`]);
        } else if (a.co2 && co2 < a.co2[0]) {
            msg.push([a.tce && co2 < 35 ? "al" : "ok", `<b>PaCO₂ abaixo de ${a.co2[0]}:</b> baixar a FR (ou o volume). ${a.tce ? "No TCE, PaCO₂ < 30 só na herniação aguda." : ""}`]);
        } else if (a.co2) msg.push(["ok", `<b>PaCO₂ na meta (${a.co2[0]}–${a.co2[1]}).</b>`]);
        else if (m === "bronq" && co2 > 45) msg.push(["al", "<b>CO₂ alto:</b> conferir se a PIP (25–32) é suficiente para vencer a resistência e se o Te (1,3–2,0 s) deixa o pulmão esvaziar (Consenso AMIB)."]);
    }
    let spo2Meta = a.spo2Alta && prog.peep >= 10 ? a.spo2Alta : a.spo2;
    let baixo = (sat != null && spo2Meta && sat < spo2Meta[0]) || (pao2 != null && a.pao2 && pao2 < a.pao2[0]);
    let alto = (sat != null && spo2Meta && sat > spo2Meta[1] && prog.fio2 > 21) || (pao2 != null && a.pao2 && pao2 > a.pao2[1] && prog.fio2 > 21);
    if (baixo) {
        if (m === "sdra") { let t = vmPeepDaFio2(prog.fio2); msg.push(["al", `<b>Oxigenação abaixo da meta:</b> subir FiO₂ e PEEP juntos pela tabela PEEP/FiO₂${t ? ` (agora: FiO₂ ${prog.fio2}% → PEEP ${t.min}${t.max > t.min ? "–" + t.max : ""})` : ""}, sem passar do platô 28 e driving pressure 15 (PALICC-2).`]); }
        else if (m === "bronq") msg.push(["al", "<b>Hipoxemia:</b> na bronquiolite depende do volume corrente: garantir PIP suficiente (25–32). PEEP ajuda pouco, salvo se virou SDRA (Consenso AMIB)."]);
        else msg.push(["al", "<b>Oxigenação abaixo da meta:</b> subir a FiO₂; se passar de 60%, subir a PEEP e pensar em SDRA, atelectasia ou pneumotórax."]);
    } else if (alto) msg.push(["ok", "<b>Oxigênio acima da meta:</b> baixar a FiO₂ primeiro (evitar SpO₂ > 97% com O₂ por tempo prolongado, PALICC-2)."]);
    else if (a.cardio && (sat != null || pao2 != null)) msg.push(["ok", "<b>Saturação:</b> na criança cardiopata, o alvo depende da lesão (ex.: ventrículo único); titular o O₂ com o cardiologista (PEMVECC)."]);
    else if (sat != null || pao2 != null) msg.push(["ok", "<b>Oxigenação na meta.</b>"]);
    return vmGasoLista(msg);
}
function vmGasoLista(msg) {
    return msg.length ? `<ul class="vm-gaso-res">${msg.map(([t, x]) => `<li class="${t}">${x}</li>`).join("")}</ul>` : "";
}

// No site oficial só aparece quando VENTILACAO_LIBERADA = true (medicamentos/menu.js).
if (VENTILACAO_LIBERADA || (typeof MODO_TESTE !== 'undefined' && MODO_TESTE)) registrarConduta({
    id: "ventilacao",
    nome: "Ventilação mecânica",
    destaque: true, // pedido do Dr. Jonas: a 1ª da lista de Condutas
    categoria: "UTI e emergência",
    cor: "#0e7490",
    kw: "ventilacao mecanica ventilador respirador simulador programacao parametros iniciais modo pcv vcv prvc imv peep fio2 volume corrente frequencia tempo inspiratorio sdra asma bronquiolite tce rn recem nascido intubacao iot gasometria dope",
    resumo: "Simulador: tipo de paciente, motivo da intubação, modo sugerido e programação inicial do ventilador, com metas e o que mexer pela gasometria.",
    legenda: "Simulador conforme PALICC-2 (2023), PEMVECC (2017), I Consenso Brasileiro de Ventilação Mecânica em Pediatria e Neonatologia (SBP/AMIB) e Ministério da Saúde (RN, 2014). Faixas para começar: ajustar sempre pela clínica, pelas curvas e pela gasometria.",
    padraoTexto: true,
    ferramentaTopo: "htmlSimuladorVentilador",
    secoes: [
        {
            titulo: "Os modos ventilatórios",
            icone: "🔀",
            resumo: "PCV, VCV, PRVC, SIMV e PSV: o que cada um garante e o que vigiar.",
            tabela: {
                colunas: ["Modo", "O que o aparelho garante", "O que varia / vigiar", "Quando lembrar"],
                linhas: [
                    ["PCV (pressão controlada)", "Pressão inspiratória e Ti", "Volume corrente (cai se a resistência sobe ou a complacência cai)", "Asma e bronquiolite (Consensos SBP/AMIB); mais usado em pediatria"],
                    ["VCV (volume controlado)", "Volume corrente", "Pico e platô de pressão", "Quando o volume-minuto precisa ser estável; vigiar platô"],
                    ["PRVC (pressão regulada a volume)", "Volume alvo com a menor pressão", "Pressão, ciclo a ciclo", "Alternativa na asma (Consenso SBP/AMIB)"],
                    ["SIMV (+ PS)", "Ciclos mandatórios sincronizados; o paciente respira entre eles", "Volume dos ciclos espontâneos", "Desmame; RN que não melhora na IMV (MS 2014)"],
                    ["PSV (pressão de suporte)", "Pressão em cada respiração que o paciente dispara", "FR e volume dependem do paciente", "Desmame; exige drive respiratório"],
                    ["IMV neonatal", "PIP, PEEP, Ti e FR, com fluxo contínuo", "Volume corrente", "Ventilação convencional do RN (MS 2014)"]
                ],
                nota: "Nenhum modo mostrou ser melhor que outro em desfecho (PEMVECC): o modo segue a experiência da equipe e a fisiopatologia da doença."
            }
        },
        {
            titulo: "Limites de proteção pulmonar",
            icone: "🛡️",
            resumo: "Volume corrente, platô, driving pressure, PEEP e oxigênio: os números que não devem ser passados.",
            itens: [
                "<strong>Volume corrente:</strong> fisiológico, 6–8 mL/kg; evitar acima de 10 mL/kg (PEMVECC). Na SDRA, menos de 6 mL/kg se preciso para respeitar as pressões; abaixo de 4 mL/kg com cuidado (PALICC-2).",
                "<strong>Platô:</strong> ≤ 28 cmH₂O; 29–32 se a parede torácica for rígida (PALICC-2). Na asma, ≤ 30 (PEMVECC).",
                "<strong>Driving pressure (platô − PEEP):</strong> ≤ 15 cmH₂O na SDRA (PALICC-2); sem doença pulmonar, PIP − PEEP < 10 (PEMVECC).",
                "<strong>PEEP:</strong> 3–5 cmH₂O no pulmão sem lesão; na SDRA, pela tabela PEEP/FiO₂ (PALICC-2).",
                "<strong>Oxigênio:</strong> FiO₂ abaixo de 60% sempre que possível (Consenso SBP/AMIB); evitar SpO₂ < 88% ou > 97% por tempo prolongado (PALICC-2).",
                "<strong>RN:</strong> menor PIP possível, VC 4–6 mL/kg, FiO₂ > 60% pelo menor tempo (MS 2014)."
            ]
        },
        {
            titulo: "Tabela PEEP × FiO₂ (SDRA)",
            icone: "📊",
            resumo: "Na SDRA, a PEEP mínima para cada FiO₂ (tabela do ARDS Network, indicada pelo PALICC-2).",
            tabela: {
                colunas: ["FiO₂", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"],
                linhas: [["PEEP (cmH₂O)", "5", "5–8", "8–10", "10", "10–14", "14", "14–18", "18–24"]],
                nota: "PALICC-2: manter a PEEP no nível desta tabela (PEEP baixa / FiO₂ alta do ARDS Network) ou acima, sem passar dos limites de platô e driving pressure."
            }
        },
        {
            titulo: "Piora súbita no ventilador (DOPE)",
            icone: "🚨",
            alerta: true,
            resumo: "Tirar do ventilador, ventilar com bolsa e O₂ 100% e procurar a causa.",
            itens: [
                "<strong>Primeiro:</strong> desconectar e ventilar com bolsa autoinflável e O₂ 100% (MS 2014).",
                { texto: "<strong>DOPE:</strong>", sub: ["Deslocamento da cânula (extubação ou intubação seletiva).", "Obstrução da cânula (secreção, dobra).", "Pneumotórax (e enfisema intersticial no RN).", "Equipamento: vazamento no circuito ou no umidificador, válvula exalatória, rede de gases, energia."] },
                "<strong>Afastar também:</strong> hipoventilação, sepse, choque e, no RN, hemorragia peri-intraventricular (MS 2014).",
                "<strong>Testar o aparelho:</strong> ocluir a saída no Y do circuito e ver se a pressão sobe até o limite (MS 2014)."
            ]
        }
    ],
    citacoes: { "PALICC-2": 0, "PEMVECC": 1, "Consenso SBP/AMIB": [2, 3], "Consensos SBP/AMIB": [2, 3, 4], "Consenso AMIB": 4, "MS 2014": 5, "PALS": 6, "ARDS Network": 7, "SBP 2017": 8, "Einstein 2025": 9 },
    fontes: [
        "Emeriaud G et al. Executive Summary of the Second International Guidelines for the Diagnosis and Management of Pediatric Acute Respiratory Distress Syndrome (PALICC-2). Pediatr Crit Care Med. 2023;24(2):143-68.",
        "Kneyber MCJ et al. Recommendations for mechanical ventilation of critically ill children from the Paediatric Mechanical Ventilation Consensus Conference (PEMVECC). Intensive Care Med. 2017;43(12):1764-80.",
        "I Consenso Brasileiro de Ventilação Mecânica em Pediatria e Neonatologia (SBP/AMIB). Ventilação mecânica na lesão pulmonar aguda / SDRA (Fioretto JR et al.).",
        "I Consenso Brasileiro de Ventilação Mecânica em Pediatria e Neonatologia (SBP/AMIB). Ventilação mecânica na crise de asma aguda.",
        "Piva JP, Bueno F, Garcia PCR, Lago P. Ventilação mecânica na bronquiolite viral aguda: qual seria o consenso? (Consenso AMIB, 2008; publicado pela SBP).",
        "Brasil. Ministério da Saúde. Atenção à Saúde do Recém-Nascido: Guia para os Profissionais de Saúde, vol. 3, 2ª ed. (cap. 22, Suporte ventilatório). Brasília, 2014.",
        "American Heart Association. Pediatric Advanced Life Support (PALS) Provider Manual, 2020: frequência respiratória normal por idade.",
        "ARDS Network. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and the acute respiratory distress syndrome. N Engl J Med. 2000;342:1301-8 (tabela PEEP/FiO₂).",
        "Sociedade Brasileira de Pediatria — Departamento Científico de Terapia Intensiva. Guia Prático de Atualização nº 1: Trauma Cranioencefálico (abril de 2017).",
        "Hospital Israelita Albert Einstein. Guia do Episódio de Cuidado: Traumatismo Cranioencefálico em Crianças e Adolescentes (CPTW430.1, aprovado em 22/01/2025)."
    ],
    revisao: "outubro de 2026"
});
