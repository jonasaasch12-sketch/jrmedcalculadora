const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const R = path.join(process.env.S, 'video', 'render');
const BASE = `*{box-sizing:border-box}html,body{margin:0;padding:0}`;
const LUZ = `.luz{position:absolute;left:0;top:0;right:0;bottom:0;background:radial-gradient(900px 760px at 50% 0%,rgba(255,255,255,.18),rgba(255,255,255,0) 70%)}`;
const LOGO = `.logo{position:absolute;left:50%;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0f766e,#14b8a6);color:#fff;font-weight:800;box-shadow:0 18px 40px rgba(0,0,0,.25)}`;
const pagina = (css, corpo) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>${BASE}${css}</style></head><body>${corpo}</body></html>`;

const INTRO = pagina(`
body{width:720px;height:1280px;background:#005eb8;font-family:Inter,sans-serif;color:#fff;position:relative;overflow:hidden}
${LUZ}${LOGO}
.logo{top:104px;width:128px;height:128px;border-radius:34px;font-size:56px}
.marca{position:absolute;top:260px;left:0;right:0;text-align:center;font-weight:800;font-size:84px;letter-spacing:-1px}
.sub{position:absolute;top:366px;left:0;right:0;text-align:center;font-weight:600;font-size:30px;opacity:.92}
.titulo{position:absolute;top:452px;left:60px;right:60px;text-align:center;font-weight:800;font-size:60px;line-height:1.08;letter-spacing:-.5px}
.pilula{position:absolute;top:606px;left:50%;transform:translateX(-50%);background:#fff;color:#005eb8;font-weight:800;font-size:28px;padding:16px 32px;border-radius:999px;white-space:nowrap}
.tel{position:absolute;left:170px;top:708px;width:380px;height:820px;border:12px solid #212b32;border-radius:56px;overflow:hidden;background:#f2f4f7;box-shadow:0 30px 70px rgba(0,0,0,.35)}
.tel img{display:block;width:100%;height:auto}`,
`<div class="luz"></div><div class="logo">JR</div><div class="marca">JR MED</div><div class="sub">Prescrição e condutas médicas</div><div class="titulo">Dose pediátrica calculada na hora</div><div class="pilula">Veja em 1 minuto como usar</div><div class="tel"><img src="../qa/2-dose.png"></div>`);

const OUTRO = pagina(`
body{width:720px;height:1280px;background:#005eb8;font-family:Inter,sans-serif;color:#fff;position:relative;overflow:hidden}
${LUZ}${LOGO}
.logo{top:250px;width:110px;height:110px;border-radius:29px;font-size:48px}
.marca{position:absolute;top:392px;left:0;right:0;text-align:center;font-weight:800;font-size:64px;letter-spacing:-.5px}
.sub{position:absolute;top:478px;left:0;right:0;text-align:center;font-weight:600;font-size:28px;opacity:.92}
.acesso{position:absolute;top:580px;left:90px;right:90px;text-align:center;font-weight:700;font-size:38px;line-height:1.25}
.botao{position:absolute;top:720px;left:50%;transform:translateX(-50%);background:#fff;color:#005eb8;font-weight:800;font-size:40px;padding:26px 60px;border-radius:22px;white-space:nowrap;box-shadow:0 18px 40px rgba(0,0,0,.22)}
.site{position:absolute;top:880px;left:0;right:0;text-align:center;font-weight:700;font-size:32px}
.fase{position:absolute;top:934px;left:0;right:0;text-align:center;font-weight:600;font-size:26px;opacity:.9}
.aviso{position:absolute;top:1020px;left:50%;transform:translateX(-50%);width:580px;text-align:center;font-size:26px;line-height:1.35;padding:26px 30px;border:2px solid rgba(255,255,255,.4);border-radius:22px}
.rodape{position:absolute;bottom:52px;left:0;right:0;text-align:center;font-size:22px;opacity:.75}`,
`<div class="luz"></div><div class="logo">JR</div><div class="marca">JR MED</div><div class="sub">Prescrição e condutas médicas</div><div class="acesso">Acesso restrito a profissionais de saúde</div><div class="botao">Entrar no JR MED</div><div class="site">jrmedprescricao.com.br</div><div class="fase">Pediatria disponível agora · Adulto em breve</div><div class="aviso">Ferramenta de apoio à decisão. Confira sempre a dose antes de prescrever.</div><div class="rodape">© 2026 JR MED</div>`);

const TITULOS = [
  ['PASSO 1 DE 5', 'Busque o remédio ou a doença', 'Ex.: dipirona'],
  ['PASSO 2 DE 5', 'Digite a idade e o peso', 'Exemplo: 4 anos e 16 kg'],
  ['PASSO 3 DE 5', 'Adicione à receita e copie', 'Cole no prontuário'],
  ['PASSO 4 DE 5', 'Condutas passo a passo', 'Diagnóstico, emergência e internação'],
  ['PASSO 5 DE 5', 'Informe as alergias', 'O app avisa o remédio compatível'],
];
const tituloHtml = ([p, t, s]) => pagina(`
body{width:720px;height:300px;position:relative;font-family:Inter,sans-serif;color:#fff;overflow:hidden}
.p{position:absolute;left:56px;top:40px;font-size:24px;font-weight:700;letter-spacing:.16em;opacity:.82}
.t{position:absolute;left:56px;top:78px;width:610px;font-size:58px;font-weight:800;line-height:1.06;letter-spacing:-.6px}
.s{position:absolute;left:56px;top:228px;width:610px;font-size:30px;font-weight:600;opacity:.92}`,
`<div class="p">${p}</div><div class="t">${t}</div><div class="s">${s}</div>`);

const MOLDURA = pagina(`
body{width:578px;height:1084px;background:transparent;position:relative}
.m{position:absolute;left:60px;top:60px;width:458px;height:964px;border:12px solid #212b32;border-radius:52px;box-shadow:0 28px 60px rgba(16,24,40,.45)}`,
`<div class="m"></div>`);

(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 720, height: 1280 }, deviceScaleFactor: 1 });
  const abre = async (nome, html, vp) => {
    fs.writeFileSync(path.join(R, nome + '.html'), html);
    await pg.setViewportSize(vp);
    await pg.goto('file://' + path.join(R, nome + '.html'), { waitUntil: 'load' });
    await pg.evaluate(() => document.fonts.ready);
    await pg.waitForTimeout(150);
  };
  await abre('intro', INTRO, { width: 720, height: 1280 });
  await pg.screenshot({ path: path.join(R, 'intro.png') });
  await pg.screenshot({ path: path.join(R, 'capa.jpg'), type: 'jpeg', quality: 90 });
  await abre('outro', OUTRO, { width: 720, height: 1280 });
  await pg.screenshot({ path: path.join(R, 'outro.png') });
  for (let i = 0; i < TITULOS.length; i++) {
    await abre('titulo' + (i + 1), tituloHtml(TITULOS[i]), { width: 720, height: 300 });
    await pg.screenshot({ path: path.join(R, 'titulo' + (i + 1) + '.png'), omitBackground: true });
  }
  await abre('moldura', MOLDURA, { width: 578, height: 1084 });
  await pg.screenshot({ path: path.join(R, 'moldura.png'), omitBackground: true });
  await b.close();
  console.log('render ok:', fs.readdirSync(R).filter((f) => f.endsWith('.png') || f.endsWith('.jpg')).join(' '));
})().catch((e) => { console.error('FALHA render: ' + e.message.split('\n')[0]); process.exit(1); });
