// =====================================================
// ⚡ ATALHOS POR CIMA DO PRONTUÁRIO (só no teste, por enquanto)
// Uma janelinha que fica na frente de qualquer programa (prontuário do hospital), com:
//  - Prontuário: exame físico normal (♂/♀) com FC/FR/SpO2 já preenchidos, orientações de alta
//    e "atalhos meus" (texto livre, salvo só neste computador);
//  - Calculadora: peso + busca → dose e receita do card, prontas para colar.
// Clique no botão → o texto vai para a área de transferência → Ctrl+V no prontuário.
// Usa a "janela flutuante" do Chrome/Edge no computador (Document Picture-in-Picture).
// Sem ela (Firefox, Safari, celular), abre uma janela comum.
// Todo o texto clínico vem dos próprios cards (farmaciaJR): nada é escrito aqui.
// =====================================================
const ATALHOS_LIBERADOS = false; /* trocar para true quando o Dr. Jonas liberar para todos */

const ATALHOS_ORIENTACOES = [
    ["orientacoes_gerais", "Alarme respiratório"],
    ["orientacoes_geca", "Alarme GECA"],
    ["orientacoes_bva", "Alarme bronquiolite"],
    ["orientacoes_dengue", "Alarme dengue"],
    ["orientacoes_tce", "Alarme TCE"]
];
const ATALHOS_CHAVE_MEUS = "jrmed_atalhos_meus";

let janelaAtalhos = null;
let atalhosEstado = { sexo: "m", minimizado: false };

function atalhosDisponivel() {
    return ATALHOS_LIBERADOS || (typeof MODO_TESTE !== "undefined" && MODO_TESTE);
}

function lerAtalhosMeus() {
    try { return JSON.parse(localStorage.getItem(ATALHOS_CHAVE_MEUS) || "[]").filter(a => a && a.nome && a.texto); }
    catch (e) { return []; }
}
function gravarAtalhosMeus(lista) {
    try { localStorage.setItem(ATALHOS_CHAVE_MEUS, JSON.stringify(lista)); } catch (e) {}
}

// Texto do exame físico do card, com FC, FR e SpO2 preenchidos (se digitados).
function textoExameAtalho(sexo, fc, fr, sat) {
    let med = buscarMed(sexo === "f" ? "exame_feminino" : "exame_masculino");
    if (!med) return "";
    let t = med.calc().r;
    if (fc) t = t.replace(/FC: ?/, "FC: " + fc + " BPM");
    if (fr) t = t.replace(/FR: +/, "FR: " + fr + " IRPM ");
    if (sat) t = t.replace(/SpO2: +AA/, "SpO2: " + sat + "% EM AA");
    return t;
}

const ATALHOS_CSS = `
*{box-sizing:border-box}
body{margin:0;font:14px/1.35 Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;background:var(--fundo);color:var(--texto)}
:root{--fundo:#f4f6f9;--card:#fff;--texto:#1b2430;--suave:#5b6675;--borda:#dfe4ea;--azul:#0b3d6b;--acento:#1565c0;--ok:#2e7d32}
:root.escuro{--fundo:#11161d;--card:#1a2129;--texto:#e6ebf1;--suave:#9aa6b4;--borda:#2c3540;--azul:#0d2a47;--acento:#64a8f0;--ok:#66bb6a}
.topo{display:flex;align-items:center;gap:8px;background:var(--azul);color:#fff;padding:8px 10px;position:sticky;top:0;z-index:2}
.logo{font-weight:800;letter-spacing:.3px;white-space:nowrap}
.logo span{opacity:.75;font-weight:600}
.dica{font-size:11.5px;opacity:.85;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.topo button{background:rgba(255,255,255,.15);color:#fff;border:0;border-radius:6px;padding:5px 9px;font:inherit;font-size:12px;cursor:pointer}
.topo button:hover{background:rgba(255,255,255,.28)}
.corpo{padding:10px;display:grid;gap:10px}
.sec{background:var(--card);border:1px solid var(--borda);border-radius:10px;padding:10px}
.sec h2{margin:0 0 8px;font-size:11px;letter-spacing:1px;color:var(--suave);display:flex;align-items:center;justify-content:space-between}
.alterna{display:inline-flex;border:1px solid var(--borda);border-radius:7px;overflow:hidden}
.alterna button{border:0;background:transparent;color:var(--suave);padding:3px 9px;font:inherit;font-size:12px;cursor:pointer}
.alterna button.on{background:var(--acento);color:#fff}
.btns{display:flex;flex-wrap:wrap;gap:6px}
.b{border:1px solid var(--borda);background:var(--fundo);color:var(--texto);border-radius:8px;padding:7px 10px;font:inherit;font-size:13px;cursor:pointer;text-align:left}
.b:hover{border-color:var(--acento);color:var(--acento)}
.b.forte{background:var(--acento);border-color:var(--acento);color:#fff;font-weight:600}
.b.forte:hover{filter:brightness(1.08);color:#fff}
.b.copiado,.b.forte.copiado{background:var(--ok);border-color:var(--ok);color:#fff}
.vitais{display:flex;gap:6px;margin:8px 0}
.vitais label{flex:1;font-size:11px;color:var(--suave)}
input{width:100%;border:1px solid var(--borda);background:var(--card);color:var(--texto);border-radius:7px;padding:6px 8px;font:inherit;font-size:13px}
input:focus{outline:2px solid var(--acento);outline-offset:-1px}
.sub{font-size:11px;color:var(--suave);margin:8px 0 4px}
.meu{display:inline-flex}
.meu .x{border-left:0;border-radius:0 8px 8px 0;padding:7px 7px;color:var(--suave)}
.meu .b:first-child{border-radius:8px 0 0 8px}
.novo{display:none;gap:6px;flex-direction:column;margin-top:6px}
.novo.on{display:flex}
textarea{width:100%;min-height:70px;border:1px solid var(--borda);background:var(--card);color:var(--texto);border-radius:7px;padding:6px 8px;font:inherit;font-size:12.5px;resize:vertical}
.linha2{display:flex;gap:6px}
.linha2 .peso{width:90px;flex:none}
.res{display:grid;gap:6px;margin-top:8px}
.item{border:1px solid var(--borda);border-radius:8px;padding:7px 9px;background:var(--fundo)}
.item .n{font-weight:600;font-size:13px}
.item .a{font-size:11.5px;color:var(--suave)}
.item .d{margin:4px 0 6px;font-size:13px;color:var(--acento);font-weight:600;white-space:pre-line}
.vazio{font-size:12.5px;color:var(--suave);padding:6px 2px}
.mini{display:none}
body.min .corpo{display:none}
body.min .dica{display:none}
.rod{font-size:10.5px;color:var(--suave);text-align:center;padding:0 10px 10px}
`;

function htmlAtalhos() {
    let e = escaparHtml;
    let ori = ATALHOS_ORIENTACOES.filter(([id]) => buscarMed(id))
        .map(([id, nome]) => `<button class="b" data-copiar-card="${id}">${e(nome)}</button>`).join("");
    return `
<div class="topo">
  <div class="logo">JR MED <span>⚡ Atalhos</span></div>
  <div class="dica">Clique, depois Ctrl+V</div>
  <button id="at-min" title="Diminuir / aumentar a janela">Diminuir</button>
</div>
<div class="corpo">
  <div class="sec">
    <h2>PRONTUÁRIO
      <span class="alterna" role="group" aria-label="Sexo">
        <button data-sexo="m" class="on">♂ Masc.</button><button data-sexo="f">♀ Fem.</button>
      </span>
    </h2>
    <div class="vitais">
      <label>FC<input id="at-fc" inputmode="numeric" placeholder="bpm"></label>
      <label>FR<input id="at-fr" inputmode="numeric" placeholder="irpm"></label>
      <label>Sat %<input id="at-sat" inputmode="numeric" placeholder="%"></label>
    </div>
    <div class="btns"><button class="b forte" id="at-exame">📋 Exame físico normal</button></div>
    <div class="sub">Orientações de alta</div>
    <div class="btns">${ori}</div>
    <div class="sub">Meus atalhos <span style="opacity:.7">(ficam só neste computador)</span></div>
    <div class="btns" id="at-meus"></div>
    <div class="btns" style="margin-top:6px"><button class="b" id="at-novo-btn">+ Criar meu atalho</button></div>
    <div class="novo" id="at-novo">
      <input id="at-novo-nome" placeholder="Nome do botão (ex.: Reavaliação)" maxlength="40">
      <textarea id="at-novo-texto" placeholder="Texto que vai ser colado no prontuário"></textarea>
      <div class="linha2"><button class="b forte" id="at-novo-salvar">Salvar</button><button class="b" id="at-novo-cancelar">Cancelar</button></div>
    </div>
  </div>
  <div class="sec">
    <h2>CALCULADORA</h2>
    <div class="linha2">
      <input class="peso" id="at-peso" type="number" min="0" step="0.1" inputmode="decimal" placeholder="Peso kg">
      <input id="at-busca" placeholder="Droga ou indicação (ex.: amoxicilina, otite)">
    </div>
    <div class="res" id="at-res"><div class="vazio">Digite o peso e o nome do remédio ou da doença.</div></div>
  </div>
</div>
<div class="rod">Doses calculadas pelos cards do JR MED: confira antes de prescrever.</div>`;
}

// Copia o texto pela própria janela (o foco está nela quando o médico clica).
function atalhosCopiar(doc, texto, botao) {
    let win = doc.defaultView;
    let ok = () => {
        if (!botao) return;
        let antes = botao.textContent;
        botao.classList.add("copiado"); botao.textContent = "✓ Copiado";
        setTimeout(() => { botao.classList.remove("copiado"); botao.textContent = antes; }, 1100);
    };
    let reserva = () => {
        let ta = doc.createElement("textarea");
        ta.value = texto; ta.style.position = "fixed"; ta.style.opacity = "0";
        doc.body.appendChild(ta); ta.select();
        try { doc.execCommand("copy"); ok(); } catch (e) {}
        ta.remove();
    };
    try { win.navigator.clipboard.writeText(texto).then(ok, reserva); } catch (e) { reserva(); }
}

function atalhosResultados(doc) {
    let caixa = doc.getElementById("at-res");
    let p = parseFloat(doc.getElementById("at-peso").value);
    let q = normalizar(doc.getElementById("at-busca").value.trim());
    if (!q) { caixa.innerHTML = `<div class="vazio">Digite o peso e o nome do remédio ou da doença.</div>`; return; }
    let idade = (document.getElementById("idadeInput") || {}).value || "";
    let ids = Object.keys(farmaciaJR).concat(Object.keys(typeof medsCustomizados !== "undefined" ? medsCustomizados : {}));
    let achados = ids.filter((id) => {
        let m = buscarMed(id);
        if (!m || m.cat === "cat-exame-fisico") return false;
        return cardCorrespondeABusca(normalizar([m.nome, m.kw, m.apres, m.sub].join(" ")), q);
    }).slice(0, 12);
    if (!achados.length) { caixa.innerHTML = `<div class="vazio">Nada encontrado para "${escaparHtml(q)}".</div>`; return; }
    let semPeso = isNaN(p) || p <= 0;
    caixa.innerHTML = achados.map((id) => {
        let m = buscarMed(id), d = "", pode = true;
        if (semPeso && !m.ignoraPeso) { d = "Digite o peso"; pode = false; }
        else { try { d = m.calc(p, idade).v; } catch (e) { d = "Erro no cálculo"; pode = false; } }
        return `<div class="item"><div class="n">${escaparHtml(m.nome)}</div><div class="a">${escaparHtml(m.apres || "")}</div>
<div class="d">${escaparHtml(String(d))}</div>${pode ? `<button class="b" data-receita="${escaparHtml(id)}">Copiar receita</button>` : ""}</div>`;
    }).join("");
}

function atalhosMeusHtml(doc) {
    let lista = lerAtalhosMeus();
    doc.getElementById("at-meus").innerHTML = lista.length ? lista.map((a, i) =>
        `<span class="meu"><button class="b" data-meu="${i}">${escaparHtml(a.nome)}</button><button class="b x" data-apagar="${i}" title="Apagar este atalho">✕</button></span>`).join("")
        : `<span class="vazio">Nenhum ainda. Ex.: texto de reavaliação, anamnese padrão.</span>`;
}

function montarAtalhos(win) {
    let doc = win.document;
    doc.title = "JR MED · Atalhos";
    let st = doc.createElement("style"); st.textContent = ATALHOS_CSS; doc.head.appendChild(st);
    doc.documentElement.classList.toggle("escuro", document.documentElement.getAttribute("data-theme") === "dark");
    doc.body.innerHTML = htmlAtalhos();
    let $ = (id) => doc.getElementById(id);
    let pesoApp = (document.getElementById("pesoInput") || {}).value;
    if (pesoApp) $("at-peso").value = pesoApp;
    atalhosMeusHtml(doc);
    doc.querySelectorAll("[data-sexo]").forEach(b => b.classList.toggle("on", b.dataset.sexo === atalhosEstado.sexo));

    doc.addEventListener("click", (ev) => {
        let b = ev.target.closest("button"); if (!b) return;
        if (b.dataset.sexo) {
            atalhosEstado.sexo = b.dataset.sexo;
            doc.querySelectorAll("[data-sexo]").forEach(x => x.classList.toggle("on", x === b));
        } else if (b.id === "at-exame") {
            atalhosCopiar(doc, textoExameAtalho(atalhosEstado.sexo, $("at-fc").value.trim(), $("at-fr").value.trim(), $("at-sat").value.trim()), b);
        } else if (b.dataset.copiarCard) {
            let m = buscarMed(b.dataset.copiarCard); if (m) atalhosCopiar(doc, m.calc().r, b);
        } else if (b.dataset.receita) {
            let m = buscarMed(b.dataset.receita), p = parseFloat($("at-peso").value);
            try { atalhosCopiar(doc, m.calc(p, (document.getElementById("idadeInput") || {}).value || "").r, b); } catch (e) {}
        } else if (b.dataset.meu) {
            let a = lerAtalhosMeus()[+b.dataset.meu]; if (a) atalhosCopiar(doc, a.texto, b);
        } else if (b.dataset.apagar) {
            let lista = lerAtalhosMeus(), a = lista[+b.dataset.apagar];
            if (a && win.confirm(`Apagar o atalho "${a.nome}"?`)) { lista.splice(+b.dataset.apagar, 1); gravarAtalhosMeus(lista); atalhosMeusHtml(doc); }
        } else if (b.id === "at-novo-btn") {
            $("at-novo").classList.add("on"); $("at-novo-nome").focus();
        } else if (b.id === "at-novo-cancelar") {
            $("at-novo").classList.remove("on");
        } else if (b.id === "at-novo-salvar") {
            let nome = $("at-novo-nome").value.trim(), texto = $("at-novo-texto").value.trim();
            if (!nome || !texto) { (nome ? $("at-novo-texto") : $("at-novo-nome")).focus(); return; }
            let lista = lerAtalhosMeus(); lista.push({ nome, texto }); gravarAtalhosMeus(lista);
            $("at-novo-nome").value = ""; $("at-novo-texto").value = ""; $("at-novo").classList.remove("on");
            atalhosMeusHtml(doc);
        } else if (b.id === "at-min") {
            atalhosEstado.minimizado = !atalhosEstado.minimizado;
            doc.body.classList.toggle("min", atalhosEstado.minimizado);
            b.textContent = atalhosEstado.minimizado ? "Aumentar" : "Diminuir";
            try { atalhosEstado.minimizado ? win.resizeTo(260, 90) : win.resizeTo(380, 640); } catch (e) {}
        }
    });
    $("at-peso").addEventListener("input", () => atalhosResultados(doc));
    $("at-busca").addEventListener("input", () => atalhosResultados(doc));
    atalhosResultados(doc);
}

async function abrirAtalhos() {
    if (typeof fecharConfig === "function") fecharConfig();
    if (janelaAtalhos && !janelaAtalhos.closed) { try { janelaAtalhos.focus(); } catch (e) {} return; }
    atalhosEstado.minimizado = false;
    let win = null;
    if ("documentPictureInPicture" in window) {
        try { win = await documentPictureInPicture.requestWindow({ width: 380, height: 640 }); } catch (e) { win = null; }
    }
    if (!win) {
        win = window.open("", "jrmed_atalhos", "popup,width=380,height=640");
        if (!win) { alert("O navegador bloqueou a janela. Permita pop-ups para este site e tente de novo."); return; }
        if (!("documentPictureInPicture" in window)) {
            setTimeout(() => alert("Neste navegador a janela de atalhos não fica por cima dos outros programas. Para isso, use o Google Chrome ou o Microsoft Edge no computador."), 300);
        }
    }
    janelaAtalhos = win;
    montarAtalhos(win);
}

// Botão no Menu (seção "Ferramentas") e no cabeçalho do computador.
function instalarBotaoAtalhos() {
    if (!atalhosDisponivel()) return;
    let celular = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (celular) return; /* no celular não existe janela por cima de outro programa */
    let drawer = document.querySelector("#painelConfig .config-rodape");
    if (drawer && !document.getElementById("btnAtalhosCfg")) {
        let sec = document.createElement("div");
        sec.className = "config-secao";
        sec.innerHTML = `<div class="config-secao-titulo">Ferramentas</div>
<button type="button" id="btnAtalhosCfg" class="config-acao" title="Janela que fica por cima do prontuário do hospital"><span>⚡</span> Atalhos por cima do prontuário</button>`;
        drawer.parentNode.insertBefore(sec, drawer);
        sec.querySelector("button").addEventListener("click", abrirAtalhos);
    }
    let cfg = document.getElementById("btnAbrirConfig");
    if (cfg && !document.getElementById("btnAtalhosTopo")) {
        let b = document.createElement("button");
        b.type = "button"; b.id = "btnAtalhosTopo"; b.className = "btn-config btn-atalhos-topo";
        b.title = "Atalhos por cima do prontuário: exame físico e doses para colar com Ctrl+V";
        b.innerHTML = `<span aria-hidden="true">⚡</span><span class="btn-config-texto">Atalhos</span>`;
        b.addEventListener("click", abrirAtalhos);
        cfg.parentNode.insertBefore(b, cfg);
    }
}
if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", instalarBotaoAtalhos);
    else instalarBotaoAtalhos();
}
