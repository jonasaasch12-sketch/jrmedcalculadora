// =====================================================
// CONFERÊNCIA DE PADRÕES DO JR MED — rodar junto com o verificar.js, antes de publicar:
//     node testes/conferir-padroes.js              → confere e mostra só o que é NOVO
//     node testes/conferir-padroes.js --tudo       → mostra também os desvios já conhecidos
//     node testes/conferir-padroes.js --atualizar  → aceita os desvios atuais como conhecidos
//
// O verificar.js confere as DOSES. Este arquivo confere a ORGANIZAÇÃO: se cada card, cada
// conduta e cada arquivo segue as regras do CLAUDE.md e das skills (.claude/skills/).
//
// Desvio que já existia fica guardado em testes/padroes-conhecidos.json e não falha.
// Desvio NOVO falha (código de saída 1): corrigir, ou rodar com --atualizar se foi de propósito
// (e explicar o motivo na mensagem do commit).
// Não bloqueia a publicação automática: quem bloqueia é o verificar.js.
// Não precisa instalar nada: só Node.js.
// =====================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RAIZ = path.join(__dirname, '..');
const ARQ_CONHECIDOS = path.join(__dirname, 'padroes-conhecidos.json');
const atualizar = process.argv.includes('--atualizar');
const mostrarTudo = process.argv.includes('--tudo');
const ler = arq => fs.readFileSync(path.join(RAIZ, arq), 'utf8');

// ---------- as regras (id → o que é e como corrigir) ----------
const REGRAS = {
    'card-campos': ['Card sem um campo obrigatório', 'Completar cat, sub, kw, nome, apres, info, recLabel e calc (skill "remedio").'],
    'card-categoria': ['Card com "cat" diferente do arquivo', 'cat deve ser "cat-<nome do arquivo>".'],
    'card-id': ['Id de card fora do formato', 'Só minúsculas, números e sublinhado, começando por letra.'],
    'card-via': ['Receita que nunca começa pela via', 'A 1ª linha da receita deve ser a via (USO ORAL, VIA ENDOVENOSA...), sem emoji nem título antes. Sem ela, a receita completa põe o item em "USO ORAL".'],
    'card-selo-fixo': ['Selo fixo (badgeSt) em card cuja receita muda com o peso', 'badgeSt é só para dose fixa.'],
    'card-sem-peso': ['Card com ignoraPeso que dá erro sem peso', 'Com ignoraPeso, o cálculo roda com o peso vazio: tratar esse caso no calc.'],
    'card-fonte': ['Card sem fonte da dose', 'Registrar a fonte em medicamentos/fontes.js (FONTES_CARDS). Não inventar: perguntar ao Dr. Jonas.'],
    'card-teto-teste': ['Card com teto no cálculo, fora da lista TETOS', 'Acrescentar o teto em TETOS (testes/verificar.js).'],
    'card-menu-repetido': ['Card em mais de uma seção do menu', 'Cada card numa seção só. Repetir só quando serve para outra finalidade.'],
    'card-comentario': ['Comentário // dentro de calc de uma linha', 'Usar /* */.'],
    'cond-campos': ['Conduta sem um campo obrigatório', 'Completar id, nome, categoria, cor, kw, resumo, legenda, fontes, citacoes e padraoTexto: true (skill "conduta").'],
    'cond-blocos': ['Conduta fora da estrutura de blocos', 'Diagnóstico → Condução na emergência → Ambulatório. Várias doenças: um bloco por doença.'],
    'cond-resumo': ['Seção de conduta sem resumo', 'Toda seção tem "resumo" de uma linha.'],
    'cond-linha-do-tempo': ['Emergência com passos, sem a "Linha do tempo" na 1ª seção', 'A 1ª seção do bloco de emergência é a "Linha do tempo (resumo)".'],
    'cond-passos': ['Passos fora da ordem 1, 2, 3...', 'Renumerar os passos, sem pular nem repetir.'],
    'cond-internacao': ['Conduta sem "Critérios de internação" clicáveis', 'Seção "Critérios de internação" com escore e checklist: true (modelo: condutas/otite.js).'],
    'cond-escrita': ['Texto fora do padrão de escrita', 'Negrito só no rótulo do início do item; nada de "•" digitado; no máximo 2 alertas por seção, em minúscula.'],
    'cond-remedio': ['Conduta cita um card que não existe', 'Usar o id de um card de medicamentos/.'],
    'cond-escore': ['Escore sem id ou com id repetido', 'Cada escore tem um id único no app inteiro.'],
    'cond-ferramenta': ['Conduta cita uma ferramenta que não existe', 'A "ferramenta" é o nome de uma função global do arquivo da conduta.'],
    'cond-citacao': ['Citação aponta para uma fonte que não existe', 'O número em "citacoes" é a posição da fonte em "fontes" (começa em 0).'],
    'geral-global': ['Mesmo nome global em dois arquivos', 'Os scripts dividem as variáveis: o segundo arquivo apaga o primeiro. Trocar um dos nomes.'],
    'geral-armazenamento': ['Chave de armazenamento sem o prefixo jrmed_', 'Toda chave de localStorage começa com "jrmed_".'],
    'geral-caminho': ['Caminho absoluto', 'Usar caminho relativo (js/app.js, nunca /js/app.js), para funcionar também em /teste/.'],
    'geral-termos': ['Versão dos Termos diferente entre o código e as páginas', 'VERSAO_TERMOS (js/cadastro.js) e a versão escrita em termos.html e privacidade.html têm de ser iguais.'],
    'geral-fora-do-index': ['Arquivo .js ou .css que o index.html não carrega', 'Acrescentar no index.html e no sw.js, ou apagar o arquivo.'],
    'geral-sw': ['sw.js lista um arquivo que não existe', 'Tirar da lista ARQUIVOS_ESSENCIAIS: um arquivo faltando impede o modo offline de instalar.'],
    'geral-console': ['console.log ou debugger esquecido', 'Apagar (console.warn pode ficar).'],
};

const achados = []; // { regra, alvo, detalhe }
const achar = (regra, alvo, detalhe) => { if (!achados.some(a => a.regra === regra && a.alvo === alvo)) achados.push({ regra, alvo, detalhe: detalhe || '' }); };

// ---------- carrega os dados como o app (mesma ordem do index.html) ----------
const html = ler('index.html');
const locais = [...html.matchAll(/<(?:script[^>]*\bsrc|link[^>]*\bhref)="([^"]+)"/g)].map(m => m[1]).filter(u => !/^(https?:)?\/\//.test(u));
const scripts = locais.filter(u => u.endsWith('.js'));
// Objeto "de mentira" para o que só existe no navegador (document, window...): aceita qualquer uso.
const falso = () => new Proxy(function () { }, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : falso()), apply: () => falso() });
const condutas = [], arquivoDaConduta = {}, arquivoDoCard = {};
let carregando = '';
const ctx = vm.createContext({
    console, MODO_TESTE: true, document: falso(), window: falso(), history: falso(), navigator: falso(), localStorage: falso(),
    location: { pathname: '/', href: '' }, setTimeout: () => 0,
    registrarConduta: c => { condutas.push(c); arquivoDaConduta[c.id] = carregando; }
});
const idsAgora = () => vm.runInContext('typeof farmaciaJR === "undefined" ? [] : Object.keys(farmaciaJR)', ctx);
for (const arq of scripts.filter(u => u === 'js/base.js' || u.startsWith('medicamentos/'))) {
    const antes = new Set(idsAgora());
    vm.runInContext(ler(arq), ctx, { filename: arq });
    idsAgora().forEach(id => { if (!antes.has(id)) arquivoDoCard[id] = arq; });
}
for (const arq of scripts.filter(u => u.startsWith('condutas/') && u !== 'condutas/condutas.js')) {
    carregando = arq;
    vm.runInContext(ler(arq), ctx, { filename: arq });
}
const global_ = nome => vm.runInContext(`typeof ${nome} === "undefined" ? undefined : ${nome}`, ctx);
const farmaciaJR = global_('farmaciaJR'), categorias = global_('categorias'), fichasPadrao = global_('fichasPadrao') || {};
const FONTES = global_('FONTES_CARDS') || {}, SIGLAS = global_('SIGLAS_FONTE') || {};
const ids = Object.keys(farmaciaJR);
const calc = (id, p, i) => { try { const r = farmaciaJR[id].calc(p, i); return { v: String(r.v), r: String(r.r) }; } catch (e) { return { v: 'ERRO', r: 'ERRO: ' + e.message }; } };
console.log(`JR MED — ${ids.length} remédios e ${condutas.length} condutas carregados\n`);

// =====================================================
// 1. CARDS DE REMÉDIO
// =====================================================
const PESOS = [4, 10, 20, 45], IDADES = ['', '0.5', '5', '13'];
// Mesma regra de viaDaReceita() (js/app.js): é pela 1ª linha que a receita completa agrupa os itens.
const ehVia = linha => { const u = linha.trim().toUpperCase(); return u.startsWith('USO') || u.startsWith('VIA') || /NEBULIZAÇÃO|VENÓCLISE|DISPOSITIVOS|ORIENTAÇÕES/.test(u); };
const numero = v => { const m = String(v).match(/(\d+(?:[.,]\d+)?)\s*(mL|ml|gts|gotas|mg)\b/); return m ? parseFloat(m[1].replace(',', '.')) : NaN; };
const invalido = /\b(NaN|undefined|Infinity|null)\b|\[object|ERRO/;
const fonteVerificar = ler('testes/verificar.js');
const ondeNoMenu = {};
categorias.forEach(c => (c.patologias || []).forEach(p => (p.remedios || []).forEach(id => (ondeNoMenu[id] = ondeNoMenu[id] || []).push(`${c.nome} > ${p.nome}`))));

for (const id of ids) {
    const med = farmaciaJR[id];
    ['cat', 'sub', 'kw', 'nome', 'apres', 'info', 'recLabel', 'calc'].forEach(c => { if (med[c] === undefined || med[c] === '') achar('card-campos', id, `falta "${c}"`); });
    const esperado = 'cat-' + path.basename(arquivoDoCard[id], '.js');
    if (med.cat !== esperado) achar('card-categoria', id, `cat "${med.cat}" no arquivo ${arquivoDoCard[id]}`);
    if (!/^[a-z][a-z0-9_]*$/.test(id)) achar('card-id', id);

    const exame = med.cat === 'cat-exame-fisico';
    const receitas = PESOS.flatMap(p => IDADES.map(i => calc(id, p, i).r));
    if (!exame && !receitas.some(r => ehVia(r.split('\n')[0]))) achar('card-via', id, `1ª linha: "${receitas[0].split('\n')[0].slice(0, 60)}"`);

    const mudaComPeso = idade => new Set([3, 10, 25, 70].map(p => calc(id, p, idade).r)).size > 1;
    if (med.badgeSt && (mudaComPeso('5') || mudaComPeso(''))) achar('card-selo-fixo', id);
    if (med.ignoraPeso && IDADES.some(i => { const c = calc(id, NaN, i); return invalido.test(c.v) || invalido.test(c.r); })) achar('card-sem-peso', id);

    if (!exame && !/^\s*ORIENTA/i.test(calc(id, 20, '5').r)) {
        const sigla = String(med.info || '').match(/<strong>[^<(]*\(([^)]+)\)/);
        const fonte = FONTES[id] || (fichasPadrao[id] && fichasPadrao[id].fonteRevisao) || (sigla && (SIGLAS[sigla[1]] || sigla[1]));
        if (!fonte) achar('card-fonte', id);
    }

    // Teto: a dose para de crescer entre 70 e 150 kg, mas o card não está na lista TETOS do verificar.js.
    const n40 = numero(calc(id, 40, '13').v), n70 = numero(calc(id, 70, '13').v), n150 = numero(calc(id, 150, '13').v);
    const variaComPeso = new Set([3, 10, 25, 70].map(p => calc(id, p, '13').v)).size > 1;
    if (variaComPeso && ![n40, n70, n150].some(isNaN) && n150 <= n70 * 1.3 && !new RegExp(`\\n\\s*${id}:`).test(fonteVerificar)) achar('card-teto-teste', id, `${n70} com 70 kg e ${n150} com 150 kg`);

    if ((ondeNoMenu[id] || []).length > 1) achar('card-menu-repetido', id, ondeNoMenu[id].join(' | '));
}
scripts.filter(u => u.startsWith('medicamentos/')).forEach(arq => ler(arq).split('\n').forEach((linha, n) => {
    if (!/calc:\s*\(/.test(linha)) return;
    const semTexto = linha.replace(/https?:\/\//g, '').replace(/`[^`]*`/g, '``').replace(/"[^"]*"/g, '""').replace(/'[^']*'/g, "''");
    if (/\/\//.test(semTexto)) achar('card-comentario', `${arq}:${n + 1}`);
}));

// =====================================================
// 2. CONDUTAS
// =====================================================
const tipoBloco = t => /diagn[óo]stico/i.test(t) ? 'D' : /condu[çc][ãa]o|emerg[êe]ncia|hospitalar/i.test(t) ? 'E' : /ambulat[óo]rio|casa|manuten/i.test(t) ? 'A' : '?';
const secoesDe = c => (c.blocos ? c.blocos.flatMap(b => b.secoes || []) : (c.secoes || []));
// Junta os textos de uma seção (itens, subitens, grupos), para conferir a escrita.
const textosDe = s => {
    const saida = [];
    const andar = x => {
        if (typeof x === 'string') saida.push(x);
        else if (Array.isArray(x)) x.forEach(andar);
        else if (x && typeof x === 'object') ['texto', 'sub', 'itens', 'alerta'].forEach(k => { if (typeof x[k] !== 'boolean') andar(x[k]); });
    };
    andar(s.itens); andar(s.grupos);
    return saida;
};
const idsEscore = {};
for (const c of condutas) {
    const simulador = !!c.ferramentaTopo && !c.blocos; // conduta que é só uma ferramenta (ex.: ventilação)
    ['id', 'nome', 'categoria', 'cor', 'kw', 'resumo', 'legenda', 'fontes', 'citacoes'].forEach(k => { if (c[k] === undefined || c[k] === '' || (Array.isArray(c[k]) && !c[k].length)) achar('cond-campos', c.id, `falta "${k}"`); });
    if (c.padraoTexto !== true) achar('cond-campos', c.id, 'falta padraoTexto: true');

    const ordem = (c.blocos || []).map(b => tipoBloco(b.titulo)).join('');
    const umBlocoPorDoenca = (c.blocos || []).length > 3 && !ordem.includes('D'); // modelo: condutas/pele_bacteriana.js
    if (!simulador && ordem !== 'DEA' && !umBlocoPorDoenca) achar('cond-blocos', c.id, `blocos: ${ordem || 'nenhum'}`);

    for (const s of secoesDe(c)) {
        const nome = `${c.id}: ${String(s.titulo).slice(0, 40)}`;
        if (!s.resumo) achar('cond-resumo', nome);
        if (s.escore) { const eid = s.escore.id || `(sem id em ${c.id})`; (idsEscore[eid] = idsEscore[eid] || []).push(c.id); }
        (s.grupos || []).forEach(g => { if (g.escore) { const eid = g.escore.id || `(sem id em ${c.id})`; (idsEscore[eid] = idsEscore[eid] || []).push(c.id); } });
        if (s.ferramenta && typeof global_(s.ferramenta) !== 'function') achar('cond-ferramenta', `${c.id}: ${s.ferramenta}`);

        for (const t of textosDe(s)) {
            if (/(^|\s|>)•/.test(t)) achar('cond-escrita', nome, '"•" digitado');
            const semPasso = t.replace(/^\s*<span class="cond-passo">[^<]*<\/span>\s*/, '');
            const negritos = [...semPasso.matchAll(/<strong>/g)];
            if (negritos.some(m => m.index > 0)) achar('cond-escrita', nome, 'negrito no meio da frase');
        }
        const alertas = (s.itens || []).filter(i => i && typeof i === 'object' && typeof i.alerta === 'string');
        if (alertas.length > 2) achar('cond-escrita', nome, `${alertas.length} alertas na seção`);
        if (alertas.some(a => /^[A-ZÀ-Ý][a-zà-ÿ]/.test(a.alerta))) achar('cond-escrita', nome, 'alerta começando com maiúscula');
    }

    const emergencia = (c.blocos || []).find(b => tipoBloco(b.titulo) === 'E');
    if (emergencia && ordem === 'DEA') {
        const passos = emergencia.secoes.map(s => s.passo).filter(p => p !== undefined);
        if (passos.length && !/linha do tempo/i.test(String(emergencia.secoes[0].titulo))) achar('cond-linha-do-tempo', c.id);
        if (passos.some((p, i) => p !== i + 1)) achar('cond-passos', c.id, `passos: ${passos.join(', ')}`);
        // "Critérios de internação" ou título equivalente (ex.: "Classificação de risco e internação", na dengue)
        const internacao = secoesDe(c).filter(s => /interna[çc][ãa]o/i.test(String(s.titulo)) || (s.grupos || []).some(g => /interna[çc][ãa]o/i.test(String(g.nome))));
        if (!internacao.length) achar('cond-internacao', c.id, 'sem a seção');
        else if (!internacao.some(s => (s.escore && s.escore.checklist === true) || (s.grupos || []).some(g => g.escore && g.escore.checklist === true))) achar('cond-internacao', c.id, 'sem checklist: true');
    }

    JSON.stringify(c, (k, v) => { if (k === 'remedios' && Array.isArray(v)) v.forEach(id => { if (typeof id === 'string' && !farmaciaJR[id]) achar('cond-remedio', `${c.id}: ${id}`); }); return v; });
    const nFontes = (c.fontes || []).length;
    Object.entries(c.citacoes || {}).forEach(([sigla, pos]) => [].concat(pos).forEach(i => { if (!(i >= 0 && i < nFontes)) achar('cond-citacao', `${c.id}: "${sigla}"`, `posição ${i}, e são ${nFontes} fontes`); }));
}
Object.entries(idsEscore).forEach(([eid, donos]) => { if (eid.startsWith('(sem id') || donos.length > 1) achar('cond-escore', eid, donos.join(' + ')); });

// =====================================================
// 3. GERAL (arquivos, nomes, caminhos, versões)
// =====================================================
const classicos = scripts.filter(u => u !== 'js/firebase.js'); // firebase.js é módulo: não divide variáveis
const donosGlobais = {};
for (const arq of classicos) ler(arq).split('\n').forEach(linha => {
    const m = linha.match(/^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/) || linha.match(/^(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/);
    if (m) (donosGlobais[m[1]] = donosGlobais[m[1]] || new Set()).add(arq);
});
Object.entries(donosGlobais).forEach(([nome, arqs]) => { if (arqs.size > 1) achar('geral-global', nome, [...arqs].join(' e ')); });

const paginas = ['index.html', 'privacidade.html', 'termos.html'];
const estilos = locais.filter(u => u.endsWith('.css'));
for (const arq of [...scripts, ...paginas]) {
    const texto = ler(arq);
    [...texto.matchAll(/localStorage\.(?:getItem|setItem|removeItem)\(\s*['"`]([^'"`]+)['"`]/g)].forEach(m => { if (!m[1].startsWith('jrmed_')) achar('geral-armazenamento', `${arq}: ${m[1]}`); });
    [...texto.matchAll(/(?:const|let)\s+\w*CHAVE\w*\s*=\s*['"`]([^'"`]+)['"`]/g)].forEach(m => { if (!m[1].startsWith('jrmed_')) achar('geral-armazenamento', `${arq}: ${m[1]}`); });
}
for (const arq of [...scripts, ...paginas, ...estilos]) ler(arq).split('\n').forEach(linha => {
    const m = linha.match(/(?:src|href)=["']\/(?!\/)[^"']*["']|url\(\s*["']?\/(?!\/)[^)"']*/);
    if (m) achar('geral-caminho', `${arq}: ${m[0].slice(0, 50)}`);
});
for (const arq of scripts) {
    const texto = ler(arq);
    if (/console\.log\(/.test(texto)) achar('geral-console', `${arq}: console.log`);
    if (/^\s*debugger\b/m.test(texto)) achar('geral-console', `${arq}: debugger`);
}

const versaoTermos = (ler('js/cadastro.js').match(/VERSAO_TERMOS\s*=\s*"([^"]+)"/) || [])[1];
for (const arq of ['termos.html', 'privacidade.html']) {
    const escrita = (ler(arq).match(/vers[ãa]o\s+(\d{4}-\d{2})/i) || [])[1];
    if (!versaoTermos || escrita !== versaoTermos) achar('geral-termos', arq, `página: ${escrita || 'sem versão'}; código: ${versaoTermos || 'sem versão'}`);
}

const noIndex = new Set(locais);
for (const pasta of ['js', 'css', 'medicamentos', 'condutas']) for (const nome of fs.readdirSync(path.join(RAIZ, pasta))) {
    if (/\.(js|css)$/.test(nome) && !noIndex.has(`${pasta}/${nome}`)) achar('geral-fora-do-index', `${pasta}/${nome}`);
}
[...ler('sw.js').matchAll(/"\.\/([^"]+)"/g)].forEach(m => { if (!fs.existsSync(path.join(RAIZ, m[1]))) achar('geral-sw', m[1]); });

// =====================================================
// RESULTADO: o que é novo e o que já era conhecido
// =====================================================
const conhecidos = fs.existsSync(ARQ_CONHECIDOS) ? JSON.parse(fs.readFileSync(ARQ_CONHECIDOS, 'utf8')).regras : {};
if (atualizar) {
    const regras = {};
    Object.keys(REGRAS).forEach(r => { const alvos = achados.filter(a => a.regra === r).map(a => a.alvo).sort(); if (alvos.length) regras[r] = alvos; });
    const aviso = 'Desvios que já existiam quando a regra foi criada. Não é lista de permissões: é a fila de arrumação. Gerado por: node testes/conferir-padroes.js --atualizar';
    fs.writeFileSync(ARQ_CONHECIDOS, JSON.stringify({ _aviso: aviso, regras }, null, 1) + '\n');
    console.log(`📌 Desvios atuais guardados como conhecidos em testes/padroes-conhecidos.json (${achados.length}).`);
    process.exit(0);
}

let novos = 0, antigos = 0, resolvidos = 0;
for (const [regra, [titulo, comoCorrigir]] of Object.entries(REGRAS)) {
    const desta = achados.filter(a => a.regra === regra);
    const lista = conhecidos[regra] || [];
    const novosDesta = desta.filter(a => !lista.includes(a.alvo));
    const sumiram = lista.filter(alvo => !desta.some(a => a.alvo === alvo));
    novos += novosDesta.length; antigos += desta.length - novosDesta.length; resolvidos += sumiram.length;
    if (novosDesta.length) {
        console.log(`❌ ${titulo}: ${novosDesta.length} novo(s)`);
        novosDesta.forEach(a => console.log(`     ${a.alvo}${a.detalhe ? ' — ' + a.detalhe : ''}`));
        console.log(`     → ${comoCorrigir}`);
    } else {
        console.log(`${desta.length ? '⚠️ ' : '✅'} ${titulo}${desta.length ? `: ${desta.length} conhecido(s)` : ''}`);
    }
    if (mostrarTudo) desta.filter(a => lista.includes(a.alvo)).forEach(a => console.log(`     ${a.alvo}${a.detalhe ? ' — ' + a.detalhe : ''}`));
    if (sumiram.length) console.log(`   🎉 ${titulo}: ${sumiram.length} desvio(s) conhecido(s) foram corrigidos (${sumiram.slice(0, 5).join(', ')}${sumiram.length > 5 ? '...' : ''}). Rode com --atualizar para tirar da lista.`);
}
console.log(`\n${novos ? '❌ ' + novos + ' desvio(s) novo(s)' : '✅ Nenhum desvio novo'} · ${antigos} conhecido(s)${resolvidos ? ' · ' + resolvidos + ' corrigido(s)' : ''}${mostrarTudo ? '' : ' (use --tudo para ver a lista)'}`);
process.exit(novos ? 1 : 0);
