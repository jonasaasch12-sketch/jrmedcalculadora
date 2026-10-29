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

// ===== Navegação =====
function vmIr(passo) { vmEstado.passo = passo; vmEstado.ajuda = ""; vmRender(true); }
function vmTipo(t) { if (vmEstado.tipo !== t) { vmEstado.motivo = ""; vmEstado.modo = ""; vmEstado.prog = null; } vmEstado.tipo = t; vmIr(2); }
function vmMotivo(m) { if (vmEstado.motivo !== m) { vmEstado.modo = ""; vmEstado.prog = null; } vmEstado.motivo = m; vmIr(4); }
function vmModo(m) { if (vmEstado.modo !== m) vmEstado.prog = null; vmEstado.modo = m; vmIr(5); }
function vmRecomecar() { vmEstado = { passo: 1, tipo: "", peso: "", idade: "", motivo: "", modo: "", prog: null, ajuda: "", gaso: {} }; vmRender(true); }
function vmDados() {
    let p = vmNum(document.getElementById('vm-peso').value), idEl = document.getElementById('vm-idade');
    let i = idEl ? vmNum(idEl.value) : null, erro = "";
    if (!p || p <= 0) erro = "Digite o peso.";
    else if (vmEstado.tipo === "rn" && p > 6) erro = "Peso alto para RN: confira (ou escolha Criança).";
    else if (vmEstado.tipo === "crianca" && (i == null || i < 0)) erro = "Digite a idade em anos (6 meses = 0,5).";
    if (erro) { document.getElementById('vm-erro').textContent = erro; return; }
    if (vmEstado.peso !== String(p) || vmEstado.idade !== String(i)) vmEstado.prog = null;
    vmEstado.peso = String(p); vmEstado.idade = i == null ? "" : String(i);
    vmIr(3);
}
function vmAjuda(id) { vmEstado.ajuda = vmEstado.ajuda === id ? "" : id; vmRender(); }
function vmMexer(id, sinal) {
    let cfg = vmConfig(), par = cfg.params.find(x => x.id === id);
    if (!par) return;
    let v = vmEstado.prog[id] + sinal * par.passo;
    if (id === "fio2") v = Math.min(100, Math.max(21, v));
    v = Math.max(par.passo, Number(v.toFixed(2)));
    vmEstado.prog[id] = v;
    vmRender();
}
function vmRender(topo) {
    let el = document.getElementById('vm-sim');
    if (!el) return;
    el.innerHTML = vmHtml();
    if (topo) { let r = el.getBoundingClientRect(), alt = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--altura-topo')) || 0; if (r.top < alt + 40) window.scrollBy(0, r.top - alt - 40); }
}

// Função chamada pela conduta (ferramentaTopo).
function htmlSimuladorVentilador() { return `<div id="vm-sim" class="vm-sim">${vmHtml()}</div>`; }

function vmHtml() {
    let e = vmEstado, passos = ["Paciente", "Dados", "Motivo", "Modo", "Programação", "Metas"];
    let resumo = [e.tipo === "rn" ? "RN" : (e.tipo ? "Criança" : ""), e.peso ? vmFmt(vmNum(e.peso), 1).replace(",0", "") + " kg" : "",
        e.tipo === "crianca" && e.idade !== "" ? vmFmt(vmNum(e.idade), 1).replace(",0", "") + " a" : "",
        e.motivo ? (VM_MOTIVOS[e.tipo] || []).find(x => x.id === e.motivo).nome : "", e.modo ? VM_MODOS[e.modo].nome : ""].filter(Boolean).join(" · ");
    let h = `<div class="vm-topo"><div><small>🫁 Simulador de ventilador</small><b>${passos[e.passo - 1]}</b>${resumo ? `<span class="vm-resumo">${resumo}</span>` : ""}</div>
        ${e.passo > 1 ? `<button type="button" class="vm-recomecar" onclick="vmRecomecar()">↺ Recomeçar</button>` : ""}</div>
        <div class="vm-prog">${passos.map((n, i) => `<button type="button" class="${i < e.passo ? "on" : ""}" ${i + 1 < e.passo ? `onclick="vmIr(${i + 1})"` : "disabled"} title="${n}"><i></i><span>${n}</span></button>`).join("")}</div>
        <div class="vm-corpo">`;

    if (e.passo === 1) {
        h += `<h4>Qual o tipo de paciente?</h4>
            ${vmOpcao("vmTipo('rn')", "👶", "Recém-nascido", "período neonatal (fonte: Ministério da Saúde 2014)", e.tipo === "rn")}
            ${vmOpcao("vmTipo('crianca')", "🧒", "Criança", "lactente a adolescente", e.tipo === "crianca")}
            <div class="vm-balao"><b>Por que o ventilador pergunta isso?</b> Muda o circuito, o sensor de fluxo e as faixas de volume, pressão e tempo.</div>`;
    } else if (e.passo === 2) {
        let pesoApp = (document.getElementById('pesoInput') || {}).value || "", idadeApp = (document.getElementById('idadeInput') || {}).value || "";
        let peso = e.peso || pesoApp, idade = e.idade !== "" ? e.idade : idadeApp;
        h += `<h4>${e.tipo === "rn" ? "Peso do RN" : "Idade e peso"}</h4><div class="vm-campos">
            ${e.tipo === "crianca" ? `<label>Idade (anos)<input id="vm-idade" type="text" inputmode="decimal" value="${escCond(String(idade).replace(".", ","))}" placeholder="ex.: 3 ou 0,5"></label>` : ""}
            <label>Peso (kg)<input id="vm-peso" type="text" inputmode="decimal" value="${escCond(String(peso).replace(".", ","))}" placeholder="${e.tipo === "rn" ? "ex.: 1,2" : "ex.: 15"}"></label></div>
            <div class="vm-erro" id="vm-erro"></div>
            <div class="vm-balao">${e.tipo === "rn" ? "No RN, o volume corrente é calculado pelo peso atual." : "O volume corrente é calculado pelo peso. No obeso, usar o peso ideal (PEMVECC: volume por kg de peso ideal)."}</div>
            <div class="vm-rodape"><button type="button" class="vm-btn" onclick="vmIr(1)">← Voltar</button><button type="button" class="vm-btn vm-btn-p" onclick="vmDados()">Avançar →</button></div>`;
    } else if (e.passo === 3) {
        h += `<h4>Por que intubou?</h4>${VM_MOTIVOS[e.tipo].map(x => vmOpcao(`vmMotivo('${x.id}')`, x.icone, x.nome, x.sub, e.motivo === x.id)).join("")}
            <div class="vm-rodape"><button type="button" class="vm-btn" onclick="vmIr(2)">← Voltar</button></div>`;
    } else if (e.passo === 4) {
        let cfg = vmConfig();
        h += `<div class="vm-sug"><b>💡 Sugestão:</b> ${cfg.sugestao}</div>
            ${cfg.modos.map(md => { let M = VM_MODOS[md.id]; return `<button type="button" class="vm-modo${e.modo === md.id ? " on" : ""}${md.sug ? " sug" : ""}" onclick="vmModo('${md.id}')">
                <span class="vm-modo-nome">${M.nome} <small>${M.longo}</small>${md.sug ? `<em>★ sugerido</em>` : ""}</span><span class="vm-modo-desc">${M.desc}</span></button>`; }).join("")}
            <div class="vm-balao"><b>O que é o modo?</b> ${e.tipo === "rn" ? "É como o ventilador entrega cada respiração. Na IMV neonatal, a pressão é limitada pela PIP e o ciclo termina pelo tempo (Ti); o volume depende do pulmão." : "É o que o ventilador garante a cada respiração: a pressão (PCV) ou o volume (VCV, PRVC). PSV (só pressão de suporte, a criança dispara) e SIMV entram no desmame."}</div>
            <div class="vm-rodape"><button type="button" class="vm-btn" onclick="vmIr(3)">← Voltar</button></div>`;
    } else if (e.passo === 5) {
        h += vmHtmlPainel();
        h += `<div class="vm-rodape"><button type="button" class="vm-btn" onclick="vmIr(4)">← Voltar</button><button type="button" class="vm-btn vm-btn-p" onclick="vmIr(6)">Metas e gasometria →</button></div>`;
    } else {
        let cfg = vmConfig();
        h += `<h4>🎯 Metas</h4><ul class="vm-lista">${cfg.metas.map(x => `<li>${x}</li>`).join("")}</ul>
            <h4>🩸 Gasometria: o que mexer</h4>
            <div class="vm-campos vm-gaso">${[["ph", "pH"], ["paco2", "PaCO₂"], ["pao2", "PaO₂"], ["spo2", "SpO₂ %"]].map(([k, n]) =>
                `<label>${n}<input type="text" inputmode="decimal" value="${escCond(e.gaso[k] || "")}" oninput="vmEstado.gaso.${k}=this.value;vmGasoAtualizar()"></label>`).join("")}</div>
            <div id="vm-gaso-res">${vmGasoHtml()}</div>
            <div class="vm-dope"><b>🚨 Piorou de repente?</b> Tirar do ventilador e ventilar com bolsa e O₂ 100%. Pensar em <b>DOPE</b>: <b>D</b>eslocamento da cânula, <b>O</b>bstrução (secreção), <b>P</b>neumotórax, <b>E</b>quipamento (vazamento, circuito, gases).</div>
            <div class="vm-rodape"><button type="button" class="vm-btn" onclick="vmIr(5)">← Programação</button><button type="button" class="vm-btn" onclick="vmRecomecar()">↺ Novo paciente</button></div>`;
    }
    return h + `</div>`;
}

function vmOpcao(acao, icone, nome, sub, on) {
    return `<button type="button" class="vm-op${on ? " on" : ""}" onclick="${acao}"><span class="vm-op-ic">${icone}</span><span><b>${nome}</b><small>${sub}</small></span></button>`;
}

// ===== Painel do ventilador =====
function vmHtmlPainel() {
    let e = vmEstado, cfg = vmConfig(), p = vmNum(e.peso);
    if (!e.prog) { e.prog = {}; cfg.params.forEach(x => { if (x.ini != null) e.prog[x.id] = x.ini; }); }
    let prog = e.prog;
    // PEEP da SDRA começa pela tabela, conforme a FiO2 inicial.
    let tabela = cfg.params.some(x => x.faixaPeloFio2) ? vmPeepDaFio2(prog.fio2) : null;
    if (tabela && prog._peepIni == null) { prog.peep = tabela.min; prog._peepIni = true; }

    let tiles = cfg.params.map(par => {
        let v = prog[par.id], faixa = par.faixa, extra = "";
        if (par.faixaPeloFio2) faixa = tabela ? [tabela.min, tabela.max] : null;
        if (par.faixaPelaFr && prog.fr) faixa = [60 / prog.fr / 5, 60 / prog.fr / 4];
        if (par.porKg && v != null) extra = `${vmFmt(v / p, 1)} mL/kg`;
        let alerta = (v != null && par.alerta) ? par.alerta(v, prog) : null;
        if (!alerta && v != null && faixa && !par.livre && !par.faixaPeloFio2 && (v < faixa[0] - 1e-9 || v > faixa[1] + 1e-9) && !(par.id === "fr" && e.motivo === "sdra" && v > faixa[1]))
            alerta = "Fora da faixa sugerida.";
        let faixaTxt = faixa ? `faixa ${vmFaixaTxt(faixa, par.dec, par.un)}${par.faixaPeloFio2 ? ` (FiO₂ ${prog.fio2}%)` : ""}${par.faixaPelaFr ? " (I:E 1:3–1:4)" : ""}` : "";
        if (par.texto) {
            return `<div class="vm-k vm-k-texto${par.semFonte && typeof MODO_TESTE !== 'undefined' && MODO_TESTE ? " vm-k-semfonte" : ""}"><button type="button" class="vm-q" onclick="vmAjuda('${par.id}')">?</button>
                <div class="vm-k-n">${par.nome}</div><div class="vm-k-txt">${par.texto}</div>
                ${par.semFonte && typeof MODO_TESTE !== 'undefined' && MODO_TESTE ? `<div class="vm-k-aviso">⚠️ Valor inicial em segundos ainda sem fonte (aguardando o Whitebook).</div>` : ""}</div>`;
        }
        return `<div class="vm-k${alerta ? " al" : ""}"><button type="button" class="vm-q" onclick="vmAjuda('${par.id}')">?</button>
            <div class="vm-k-n">${par.nome}</div>
            <div class="vm-k-v"><button type="button" class="vm-mm" onclick="vmMexer('${par.id}',-1)" aria-label="diminuir">−</button><span>${vmFmt(v, par.dec)}<small>${par.un}</small></span><button type="button" class="vm-mm" onclick="vmMexer('${par.id}',1)" aria-label="aumentar">+</button></div>
            <div class="vm-k-f">${[extra, faixaTxt, par.nota].filter(Boolean).join(" · ")}</div>
            ${alerta ? `<div class="vm-k-al">⚠️ ${alerta}</div>` : ""}</div>`;
    }).join("");

    // Valores derivados: Te, relação I:E, volume-minuto.
    let deriv = [];
    if (prog.fr && prog.ti) {
        let te = 60 / prog.fr - prog.ti;
        deriv.push(`Te ${vmFmt(te, 2)} s`, `I:E 1:${vmFmt(te / prog.ti, 1)}`);
        if (cfg.teMin && te < cfg.teMin) deriv.push(`<span class="vm-d-al">⚠️ Te abaixo de ${vmFmt(cfg.teMin, 1)} s: risco de ar preso</span>`);
    }
    if (prog.vc && prog.fr) deriv.push(`Volume-minuto ${vmFmt(prog.vc * prog.fr / 1000, 2)} L/min`);
    if (prog.pip && prog.peep) deriv.push(`PIP − PEEP ${prog.pip - prog.peep} cmH₂O`);

    let ajuda = e.ajuda && VM_AJUDA[e.ajuda] ? `<div class="vm-balao vm-balao-ajuda">${VM_AJUDA[e.ajuda]}</div>` : "";
    return `<div class="vm-vent"><div class="vm-vent-topo"><span class="vm-md">${VM_MODOS[e.modo].nome}</span><span>programação inicial · toque em − e + para simular</span></div>
        <div class="vm-grade">${tiles}</div>${deriv.length ? `<div class="vm-deriv">${deriv.join(" · ")}</div>` : ""}</div>${ajuda}
        <div class="vm-porque"><b>📌 Por que assim</b><ul>${cfg.porque.map(x => `<li>${x}</li>`).join("")}</ul></div>`;
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

registrarConduta({
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
