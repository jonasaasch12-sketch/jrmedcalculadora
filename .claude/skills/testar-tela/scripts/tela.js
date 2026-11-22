#!/usr/bin/env node
// =====================================================
// TESTE DE TELA DO JR MED (sem internet e sem login)
// Abre o app num navegador desta máquina (Chromium, pelo Playwright), simula a entrada,
// preenche peso/idade, tira foto e mostra os erros da página.
// Como usar: .claude/skills/testar-tela/SKILL.md   ·   Ajuda rápida: node tela.js --ajuda
// Nada sai para a internet: pedidos para fora (Firebase, fontes do Google) são bloqueados.
// =====================================================
const fs = require('fs');
const path = require('path');
const http = require('http');

const AJUDA = `Uso: node .claude/skills/testar-tela/scripts/tela.js [opções]

Onde abrir
  --teste              abre como versão de teste (/teste/); sem isso, abre como oficial (/)
  --celular            celular (390 x 844)   ·   --tablet: tablet (820 x 1180)   ·   sem nada: computador (1366 x 850)
  --escuro             modo escuro
  --publica            não simula a entrada: mostra a página de apresentação e o login
  --admin              simula o administrador (botões de administração)
  --raiz PASTA         usa outra cópia do projeto (padrão: este repositório)

O que mostrar
  --tela NOME          inicio | prescricao | condutas   (padrão: prescricao)
  --conduta ID         abre a conduta (ex.: otite_media)
  --categoria ID       rola até a categoria (ex.: cat-pals)
  --busca TEXTO        digita na busca
  --peso N  --idade N  --unidade anos|meses|dias  --alergia TEXTO

O que conferir
  --card ID            mostra o quadro azul e a receita do card, como aparecem na tela
  --receita ID,ID      põe os cards na receita e mostra a receita completa (só cards simples)
  --js "CÓDIGO"        roda o código na página e mostra o resultado
  --foto ARQ.png       tira a foto   (--pagina-inteira: a página toda; --nitido: 2x, para mostrar a alguém)
  --esperar MS         espera antes de conferir (padrão: 600)

Sai com código 1 se a página tiver erro de JavaScript.`;

// ---------- opções ----------
const args = process.argv.slice(2);
const tem = nome => args.includes('--' + nome);
const valor = (nome, padrao) => { const i = args.indexOf('--' + nome); return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : padrao; };
if (tem('ajuda') || tem('help')) { console.log(AJUDA); process.exit(0); }

const RAIZ = path.resolve(valor('raiz', path.join(__dirname, '..', '..', '..', '..')));
if (!fs.existsSync(path.join(RAIZ, 'index.html'))) { console.error(`Não achei o index.html em ${RAIZ}. Use --raiz PASTA.`); process.exit(2); }

let playwright;
try { playwright = require('playwright'); } catch (e) {
    console.error('O Playwright não está instalado nesta máquina. Sem ele não dá para abrir o navegador.\nNa nuvem do Claude Code ele já vem instalado; em outro computador: npm install playwright && npx playwright install chromium');
    process.exit(2);
}

// ---------- servidor local: a mesma pasta responde em / e em /teste/ ----------
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' };
const servidor = http.createServer((req, res) => {
    let caminho = decodeURIComponent(new URL(req.url, 'http://local').pathname);
    if (caminho === '/teste') caminho = '/teste/';
    if (caminho.startsWith('/teste/')) caminho = caminho.slice('/teste'.length);
    if (caminho.endsWith('/')) caminho += 'index.html';
    const arquivo = path.normalize(path.join(RAIZ, caminho));
    if (!arquivo.startsWith(RAIZ + path.sep)) { res.writeHead(403); res.end(); return; }
    fs.readFile(arquivo, (erro, dados) => {
        if (erro) { res.writeHead(404); res.end('não encontrado'); return; }
        res.writeHead(200, { 'Content-Type': TIPOS[path.extname(arquivo).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
        res.end(dados);
    });
});

(async () => {
    await new Promise(ok => servidor.listen(0, '127.0.0.1', ok));
    const base = `http://127.0.0.1:${servidor.address().port}`;
    const url = base + (tem('teste') ? '/teste/' : '/');
    // O app decide "celular" e "tablet" pelo navegador (ehCelular/ehTablet em js/atalhos.js): por isso a identificação muda junto com o tamanho.
    const celular = tem('celular'), tablet = tem('tablet');
    const aparelho = celular
        ? { viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36' }
        : tablet
            ? { viewport: { width: 820, height: 1180 }, userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' }
            : { viewport: { width: parseInt(valor('largura', '1366'), 10), height: 850 } }; /* --largura N: outro tamanho de tela do computador */
    const navegador = await playwright.chromium.launch();
    const contexto = await navegador.newContext({
        ...aparelho,
        isMobile: celular || tablet, hasTouch: celular || tablet,
        deviceScaleFactor: tem('nitido') ? 2 : 1,
        serviceWorkers: 'block', locale: 'pt-BR'
    });
    if (tem('escuro')) await contexto.addInitScript(() => { try { localStorage.setItem('jrmed_tema', 'escuro'); } catch (e) { } });
    const pagina = await contexto.newPage();
    const erros = [], bloqueados = new Set();
    pagina.on('pageerror', e => erros.push(String(e.message || e)));
    await pagina.route('**/*', rota => {
        const destino = rota.request().url();
        if (destino.startsWith(base) || destino.startsWith('data:') || destino.startsWith('blob:')) return rota.continue();
        bloqueados.add(new URL(destino).host);
        return rota.abort();
    });

    await pagina.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const tela = valor('tela', 'prescricao');
    if (!tem('publica')) {
        // Mesmo efeito de mostrarApp() (js/firebase.js), sem o Firebase.
        await pagina.evaluate(({ admin, tela }) => {
            const raiz = document.documentElement;
            raiz.classList.remove('verificando-acesso', 'login-aberto');
            raiz.classList.add('com-sessao');
            document.getElementById('tela-login').style.display = 'none';
            document.getElementById('aplicativo-principal').style.display = 'block';
            if (admin) { window.usuarioEhAdmin = true; if (typeof inicializarApp === 'function') inicializarApp(); if (typeof atualizarVisibilidadeAdmin === 'function') atualizarVisibilidadeAdmin(); }
            if (typeof aoEntrarNoApp === 'function') aoEntrarNoApp(); // tela inicial, quando está ligada
            const comInicio = typeof inicioAtivo === 'function' && inicioAtivo();
            if (tela === 'inicio') return;
            if (comInicio && typeof irDoInicio === 'function') irDoInicio(tela === 'condutas' ? 'condutas' : 'prescricao');
            else if (tela === 'condutas' && typeof trocarModo === 'function') trocarModo('condutas');
        }, { admin: tem('admin'), tela });

        if (valor('unidade')) await pagina.selectOption('#idadeUnidade', valor('unidade'));
        for (const [opcao, seletor] of [['peso', '#pesoInput'], ['idade', '#idadeInput'], ['alergia', '#alergiaInput'], ['busca', '#searchInput']]) {
            if (valor(opcao) !== undefined) await pagina.fill(seletor, String(valor(opcao)));
        }
        if (valor('conduta')) await pagina.evaluate(id => { if (typeof trocarModo === 'function') trocarModo('condutas'); abrirConduta(id); }, valor('conduta'));
        if (valor('categoria')) await pagina.evaluate(id => irParaCategoria(id), valor('categoria'));
    }
    await pagina.waitForTimeout(parseInt(valor('esperar', '600'), 10));

    const resumo = await pagina.evaluate(() => ({
        versaoDeTeste: typeof MODO_TESTE !== 'undefined' ? MODO_TESTE : null,
        titulo: document.title,
        remedios: typeof farmaciaJR !== 'undefined' ? Object.keys(farmaciaJR).length : null,
        condutas: typeof condutasJR !== 'undefined' ? Object.keys(condutasJR).length : null,
        rolagemLateral: document.documentElement.scrollWidth > window.innerWidth + 1
    }));
    console.log(`Endereço: ${tem('teste') ? '/teste/ (versão de teste)' : '/ (oficial)'} · ${celular ? 'celular' : tablet ? 'tablet' : 'computador'}${tem('escuro') ? ' · escuro' : ''}`);
    console.log(`Página: "${resumo.titulo}" · ${resumo.remedios} remédios · ${resumo.condutas} condutas · versão de teste: ${resumo.versaoDeTeste ? 'sim' : 'não'}`);
    if (resumo.rolagemLateral) console.log('⚠️  A página está mais larga que a tela (rolagem lateral).');

    if (valor('card')) {
        const c = await pagina.evaluate(id => ({ azul: (document.getElementById('res-' + id) || {}).innerText, receita: (document.getElementById('rec-' + id) || {}).innerText }), valor('card'));
        console.log(`\nCard ${valor('card')} — quadro azul: ${c.azul === undefined ? '(card não está na tela)' : c.azul}\n${c.receita || ''}`);
    }
    if (valor('receita')) {
        const texto = await pagina.evaluate(ids => { ids.forEach(id => adicionarAoCarrinho(id, 'btn-cart-' + id)); return textoReceitaCompleta(); }, valor('receita').split(',').map(s => s.trim()).filter(Boolean));
        console.log(`\nReceita completa:\n${texto}`);
    }
    if (valor('js')) {
        const r = await pagina.evaluate(codigo => { try { return JSON.stringify(eval(codigo)); } catch (e) { return 'ERRO: ' + e.message; } }, valor('js'));
        console.log(`\nResultado do --js: ${r}`);
    }
    if (valor('foto')) {
        const arquivo = path.resolve(valor('foto'));
        fs.mkdirSync(path.dirname(arquivo), { recursive: true });
        await pagina.screenshot({ path: arquivo, fullPage: tem('pagina-inteira') });
        console.log(`\nFoto: ${arquivo}`);
    }

    console.log(`\nErros de JavaScript na página: ${erros.length ? erros.length : 'nenhum'}`);
    erros.slice(0, 10).forEach(e => console.log('  ❌ ' + e));
    if (bloqueados.size) console.log(`Pedidos para fora bloqueados (esperado aqui): ${[...bloqueados].join(', ')}`);
    await navegador.close();
    servidor.close();
    process.exit(erros.length ? 1 : 0);
})().catch(e => { console.error('Falha no teste de tela: ' + e.message); servidor.close(); process.exit(2); });
