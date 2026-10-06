// =====================================================
// VERIFICAÇÃO AUTOMÁTICA DO JR MED — rodar antes de publicar:
//     node testes/verificar.js              → confere tudo
//     node testes/verificar.js --atualizar  → aceita as doses atuais como nova referência
//
// O que confere:
//  1. Todo remédio calcula sem erro, para vários pesos e idades, sem "NaN"/"undefined".
//  2. Nenhuma dose passa do teto definido em TETOS (abaixo).
//  3. Todo id do menu existe; todo remédio aparece no menu.
//  4. Todo arquivo .js/.css usado pelo index.html existe e está no sw.js (modo offline).
//  5. Fotografia das doses: compara o texto da receita de TODOS os remédios com
//     testes/referencia-doses.json e mostra exatamente o que mudou.
//     Mudança intencional? Rode com --atualizar e confira o diff no git.
// Não precisa instalar nada: só Node.js.
// =====================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RAIZ = path.join(__dirname, '..');
const ARQ_REFERENCIA = path.join(__dirname, 'referencia-doses.json');
const atualizar = process.argv.includes('--atualizar');

// Tetos por dose: o 1º número do resultado (quadro azul do card) nunca pode passar disso.
const TETOS = {
    dip_gts: 40,          // gotas (1 g)
    dip_xpe: 20,          // mL (1 g)
    dip_inj: 2,           // mL (1 g)
    azi_oral: 12.5,       // mL (500 mg)
    azi_ev: 5,            // mL (500 mg)
    ondan_ev: 4,          // mL (8 mg)
    neuro_fenitoina: 20,  // mL (1 g)
    neuro_midaz: 2,       // mL (10 mg)
    cef_resp_ev: 20,      // mL 24/24h (2 g)
    metil: 0.96,          // mL (60 mg)
    ipra: 40,             // gotas
    genta: 3,             // mL por dose 12/12h (120 mg)
    pen_cristalina_pac: 12, // mL (6 milhões UI/dose)
    claritro_pac: 10,     // mL de 250 mg/5 mL (500 mg)
    eritro_pac: 10,       // mL de 250 mg/5 mL (500 mg)
    amoxclav_ev: 20,      // mL (1 g de amoxicilina)
    linezolida_ev: 300,   // mL (600 mg)
    cef_disenteria: 20,   // mL (2 g; EV 100 mg/mL, IM 7 mL)
    metro_parasitas: 6.25, // mL de 40 mg/mL na giardíase (250 mg/dose)
    insulina_cad: 10,     // mL/h de 1 U/mL (10 U/h, IMIP)
    kcl_ev: 530,          // mL/h na periférica (40 mEq em 2h)
    kcl_xarope: 50,       // mL por dose (40 mEq)
};

const PESOS = [2.5, 4, 7, 10, 15, 22, 30, 45, 70];
const IDADES = ["", "0.1", "0.5", "1", "3", "7", "11", "14"];
// Combinações guardadas na fotografia (menos, para o arquivo não ficar enorme)
const PESOS_REF = [3, 10, 25, 70];
const IDADES_REF = ["", "0.5", "4", "13"];

let falhas = 0, avisos = 0;
const falha = msg => { falhas++; console.log('  ❌ ' + msg); };
const aviso = msg => { avisos++; console.log('  ⚠️  ' + msg); };

// ---------- carrega os arquivos na mesma ordem do index.html ----------
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
const locais = [...html.matchAll(/<(?:script[^>]*\bsrc|link[^>]*\bhref)="([^"]+)"/g)].map(m => m[1]).filter(u => !/^(https?:)?\/\//.test(u));
const scriptsDados = locais.filter(u => u === 'js/base.js' || u.startsWith('medicamentos/'));
const ctx = vm.createContext({ console });
for (const arq of scriptsDados) vm.runInContext(fs.readFileSync(path.join(RAIZ, arq), 'utf8'), ctx, { filename: arq });
const { farmaciaJR, categorias } = vm.runInContext('({ farmaciaJR, categorias })', ctx);
const ids = Object.keys(farmaciaJR).sort();
console.log(`JR MED — ${ids.length} remédios carregados de ${scriptsDados.length} arquivos\n`);

// ---------- 1 e 2: cálculo e tetos ----------
console.log('1-2. Cálculo em ' + PESOS.length * IDADES.length + ' combinações de peso/idade e tetos');
const ruim = /\b(NaN|undefined|Infinity|null)\b|\[object/;
for (const id of ids) {
    const med = farmaciaJR[id];
    const falhasAntes = falhas;
    for (const p of PESOS) for (const i of IDADES) {
        if (falhas > falhasAntes) break; // um erro por remédio basta
        let r;
        try { r = med.calc(p, i); } catch (e) { falha(`${id} (${p} kg, ${i || 'sem'} idade): erro "${e.message}"`); continue; }
        if (!r || typeof r.v === 'undefined' || typeof r.r !== 'string') { falha(`${id} (${p} kg): resultado sem {v, r}`); continue; }
        if (ruim.test(String(r.v)) || ruim.test(r.r)) falha(`${id} (${p} kg, ${i || 'sem'} idade): texto com valor inválido → ${String(r.v).slice(0, 40)}`);
        if (TETOS[id] !== undefined) {
            // 1º número seguido de unidade (ex.: "24/24h: 20.0 mL" → 20)
            const m = String(r.v).match(/(\d+(?:[.,]\d+)?)\s*(mL|ml|gts|gotas|mg)\b/);
            const n = m ? parseFloat(m[1].replace(',', '.')) : NaN;
            if (!isNaN(n) && n > TETOS[id] + 1e-9) falha(`${id} (${p} kg): "${r.v.replace(/\n/g, ' / ')}" passa do teto de ${TETOS[id]}`);
        }
    }
}
Object.keys(TETOS).forEach(id => { if (!farmaciaJR[id]) falha(`TETOS cita "${id}", que não existe`); });

// ---------- 3: menu ----------
console.log('3. Menu');
const noMenu = new Set();
categorias.forEach(c => (c.patologias || []).forEach(pat => (pat.remedios || []).forEach(id => {
    noMenu.add(id);
    if (!farmaciaJR[id]) falha(`menu "${c.titulo || c.id} > ${pat.nome}" cita "${id}", que não existe`);
})));
ids.filter(id => !noMenu.has(id)).forEach(id => aviso(`"${id}" não aparece em nenhuma seção do menu`));

// ---------- 4: arquivos e modo offline ----------
console.log('4. Arquivos e modo offline (sw.js)');
const sw = fs.readFileSync(path.join(RAIZ, 'sw.js'), 'utf8');
for (const u of locais) {
    if (!fs.existsSync(path.join(RAIZ, u))) falha(`index.html usa "${u}", que não existe`);
    if (/\.(js|css)$/.test(u) && !sw.includes(`"./${u}"`)) falha(`"${u}" não está em ARQUIVOS_ESSENCIAIS do sw.js (ficaria fora do modo offline)`);
}

// ---------- 5: fotografia das doses ----------
console.log('5. Fotografia das doses');
const atual = {};
for (const id of ids) {
    atual[id] = {};
    for (const p of PESOS_REF) for (const i of IDADES_REF) {
        try { const r = farmaciaJR[id].calc(p, i); atual[id][`${p} kg | idade ${i || '-'}`] = `[${r.v}] ${r.r}`; } catch (e) { atual[id][`${p} kg | idade ${i || '-'}`] = 'ERRO'; }
    }
}
if (atualizar || !fs.existsSync(ARQ_REFERENCIA)) {
    fs.writeFileSync(ARQ_REFERENCIA, JSON.stringify(atual, null, 1) + '\n');
    console.log('  📸 Referência salva em testes/referencia-doses.json');
} else {
    const ref = JSON.parse(fs.readFileSync(ARQ_REFERENCIA, 'utf8'));
    const mudou = [];
    for (const id of new Set([...Object.keys(ref), ...ids])) {
        if (!ref[id]) { mudou.push(`+ novo: ${id}`); continue; }
        if (!atual[id]) { mudou.push(`- removido: ${id}`); continue; }
        for (const k of Object.keys(ref[id])) if (ref[id][k] !== atual[id][k]) {
            mudou.push(`~ ${id} (${k}):\n      antes:  ${ref[id][k].replace(/\n/g, ' / ')}\n      agora:  ${String(atual[id][k]).replace(/\n/g, ' / ')}`);
            break;
        }
    }
    if (mudou.length) {
        falha(`${mudou.length} remédio(s) com receita diferente da referência:`);
        mudou.forEach(m => console.log('    ' + m));
        console.log('    → Se a mudança foi intencional: node testes/verificar.js --atualizar');
    }
}

console.log(`\n${falhas ? '❌ ' + falhas + ' falha(s)' : '✅ Tudo certo'}${avisos ? ' · ' + avisos + ' aviso(s)' : ''}`);
process.exit(falhas ? 1 : 0);
