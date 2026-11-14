const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const V = path.join(process.env.S, 'video');
const DUR = JSON.parse(fs.readFileSync(path.join(V, 'duracoes.json'), 'utf8'));
const PRE = 0.4, POS = 0.6;
const d = (k) => DUR[k] + PRE + POS;
const T = {};
T.busca = d('01_busca');
T.dose = T.busca + d('02_dose');
T.receita = T.dose + d('03_receita');
T.condutas = T.receita + d('04_condutas') + 1.0;
T.alergia = T.condutas + d('05_alergia');
const URL = 'http://localhost:8799/teste/index.html';
const ORIGEM = 'http://localhost:8799';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = { T };

const CSS = `
.jrv-tap{position:fixed;z-index:999999;width:54px;height:54px;margin:-27px 0 0 -27px;border-radius:50%;background:rgba(0,94,184,.28);border:3px solid rgba(0,94,184,.85);pointer-events:none;animation:jrvTap .75s ease-out forwards}
@keyframes jrvTap{0%{transform:scale(.4);opacity:1}100%{transform:scale(1.5);opacity:0}}
.jrv-box{position:fixed;z-index:999998;pointer-events:none;border:3px solid #005eb8;border-radius:14px;box-shadow:0 0 0 5px rgba(0,94,184,.18);animation:jrvBox 1.2s ease-in-out infinite}
@keyframes jrvBox{0%,100%{box-shadow:0 0 0 3px rgba(0,94,184,.15)}50%{box-shadow:0 0 0 9px rgba(0,94,184,.28)}}
`;

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true,
    recordVideo: { dir: path.join(V, 'bruto'), size: { width: 390, height: 844 } }
  });
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: ORIGEM });
  const page = await ctx.newPage();
  const erros = [];
  page.on('pageerror', (e) => erros.push('JS: ' + e.message));
  log.criada = Date.now();
  await page.goto(URL, { waitUntil: 'load' });
  await page.evaluate((css) => {
    document.getElementById('tela-login').style.display = 'none';
    document.getElementById('aplicativo-principal').style.display = 'block';
    window.__usuarioAtual = { uid: 'demo', email: 'demo@exemplo.com', nome: 'Demo' };
    window.__perfilAtual = { nome: 'Demo', atividade: 'medico' };
    if (window.aoEntrarNoApp) aoEntrarNoApp();
    if (window.mostrarAppDoInicio) mostrarAppDoInicio();
    document.querySelectorAll('.faixa-teste, .selo-teste').forEach((e) => e.remove());
    document.documentElement.classList.remove('pagina-publica-ativa', 'verificando-acesso', 'login-aberto');
    document.documentElement.classList.add('com-sessao');
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    window.jrvTap = (x, y) => { const e = document.createElement('div'); e.className = 'jrv-tap'; e.style.left = x + 'px'; e.style.top = y + 'px'; document.body.appendChild(e); setTimeout(() => e.remove(), 900); };
    window.jrvBox2 = (x, y, w, h, ms) => { const e = document.createElement('div'); e.className = 'jrv-box'; e.style.cssText = `left:${x - 6}px;top:${y - 6}px;width:${w + 12}px;height:${h + 12}px`; document.body.appendChild(e); setTimeout(() => e.remove(), ms); };
  }, CSS);
  await page.waitForSelector('#searchInput', { state: 'visible' });
  await sleep(400);
  log.pronto = Date.now();

  const tocar = async (sel) => {
    const loc = page.locator(sel).first();
    await loc.waitFor({ state: 'visible', timeout: 8000 });
    const b = await loc.boundingBox();
    await page.evaluate(([x, y]) => window.jrvTap(x, y), [b.x + b.width / 2, b.y + b.height / 2]);
    await loc.click({ timeout: 8000 });
  };
  const digitar = async (sel, texto, delay) => { await tocar(sel); await page.locator(sel).first().type(texto, { delay }); };
  const destacar = async (sel, ms) => {
    const b = await page.locator(sel).first().boundingBox();
    await page.evaluate(([x, y, w, h, ms]) => window.jrvBox2(x, y, w, h, ms), [b.x, b.y, b.width, b.height, ms]);
  };
  const rolar = async (sel) => { await page.locator(sel).first().evaluate((el) => el.scrollIntoView({ behavior: 'smooth', block: 'center' })); await sleep(700); };
  const foto = async (nome) => { await page.screenshot({ path: path.join(V, 'qa', nome + '.png'), scale: 'css' }); };

  const ini = Date.now();
  log.inicioCenas = ini;
  const ate = async (seg) => { const falta = ini + seg * 1000 - Date.now(); if (falta > 0) await sleep(falta); };
  const passo = async (nome, fn) => { try { await fn(); } catch (e) { erros.push(nome + ': ' + e.message.split('\n')[0]); } };

  // Cena 1 · busca
  await passo('busca', async () => {
    await sleep(400);
    await digitar('#searchInput', 'dipirona', 140);
    await sleep(600);
    await destacar('.med-card:visible .med-header', 1600);
    await sleep(900);
    await foto('1-busca');
  });
  await ate(T.busca);
  // Cena 2 · idade e peso
  await passo('dose', async () => {
    await digitar('#idadeInput', '4', 200);
    await sleep(300);
    await digitar('#pesoInput', '16', 200);
    await sleep(500);
    await rolar('.med-card:visible');
    await destacar('.med-card:visible .med-header', 1600);
    await sleep(900);
    await foto('2-dose');
  });
  await ate(T.dose);
  // Cena 3 · receita
  await passo('receita', async () => {
    await tocar('.med-card:visible button.btn-add-carrinho');
    await sleep(700);
    await tocar('#btnAbrirCarrinho');
    await sleep(1200);
    await tocar('#listaCarrinho .btn-copiar-receita-completa');
    await sleep(900);
    await foto('3-receita');
    await sleep(500);
    await tocar('#modalCarrinho .btn-fechar-modal');
    await sleep(400);
  });
  await ate(T.receita);
  // Cena 4 · condutas
  await passo('condutas', async () => {
    await page.fill('#searchInput', '');
    await sleep(300);
    await tocar('[data-modo="condutas"]:visible');
    await sleep(900);
    await tocar('text=Bronquiolite Viral Aguda >> visible=true');
    await sleep(1000);
    await rolar('details.cond-secao summary:has-text("Critérios")');
    await tocar('details.cond-secao summary:has-text("Critérios")');
    await sleep(1400);
    await foto('4-condutas');
  });
  await ate(T.condutas);
  // Cena 5 · alergias
  await passo('alergia', async () => {
    await tocar('[data-modo="prescricao"]:visible');
    await sleep(700);
    await page.fill('#searchInput', '');
    await sleep(300);
    await tocar('text=Sintom. >> visible=true');
    await sleep(900);
    await digitar('#alergiaInput', 'dipirona', 150);
    await sleep(600);
    await rolar('.tarja-alergia:visible');
    await destacar('.tarja-alergia:visible', 2000);
    await sleep(1000);
    await foto('5-alergia');
  });
  await ate(T.alergia);
  log.fimCenas = Date.now();
  await ctx.close();
  await browser.close();
  log.video = await page.video().path();
  log.erros = erros;
  fs.writeFileSync(path.join(V, 'marcas.json'), JSON.stringify(log, null, 1));
  console.log(JSON.stringify({ video: log.video, erros, decorrido_s: ((log.fimCenas - ini) / 1000).toFixed(1), planejado_s: T.alergia.toFixed(1), offset_pronto_s: ((log.pronto - log.criada) / 1000).toFixed(2) }, null, 1));
})().catch((e) => { console.error('FALHA ' + e.message.split('\n')[0]); process.exit(1); });
