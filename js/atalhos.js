// =====================================================
// ⚡ ATALHOS POR CIMA DO PRONTUÁRIO (só no teste, por enquanto)
// Uma janelinha que fica na frente de qualquer programa (prontuário do hospital), com:
//  - Prontuário: exame físico masculino/feminino e orientações de alta (um clique = copiado)
//    e "meus atalhos" (texto livre, salvo só neste computador);
//  - Calculadora: peso + busca → dose do card e "+ Receita" (a mesma receita do app: carrinhoPrescricao).
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
let atalhosEstado = { minimizado: false };

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

const ATALHOS_CSS = `
*{box-sizing:border-box}
body{margin:0;font:15px/1.4 Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;background:var(--fundo);color:var(--texto)}
:root{--fundo:#eef2f6;--card:#fff;--texto:#0b1220;--suave:#2f3b4a;--borda:#9aa7b5;--azul:#0b3d6b;--acento:#0d47a1;--ok:#1b5e20}
:root.escuro{--fundo:#0b0f14;--card:#161c24;--texto:#ffffff;--suave:#d5dde6;--borda:#56616e;--azul:#0d2a47;--acento:#8cc4ff;--ok:#81c784}
:root.escuro .b.forte{color:#0b1220}
.topo{display:flex;align-items:center;gap:8px;background:var(--azul);color:#fff;padding:8px 10px;position:sticky;top:0;z-index:2}
.logo{font-weight:800;letter-spacing:.3px;white-space:nowrap}
.logo span{opacity:.9;font-weight:700}
.esp{flex:1}
.dica{background:#fff8d6;color:#3d2e00;font-size:13px;font-weight:700;text-align:center;padding:5px 10px;border-bottom:1px solid #e3cf7a}
:root.escuro .dica{background:#3a3110;color:#ffe9a0;border-color:#5c4d17}
.topo #at-novo-pac{background:#fff;color:var(--azul);font-weight:800;white-space:nowrap}
.topo #at-novo-pac:hover{background:#e3f0ff}
body.min .topo #at-novo-pac{display:none}
.topo button{background:rgba(255,255,255,.18);color:#fff;border:0;border-radius:6px;padding:6px 10px;font:inherit;font-size:13px;font-weight:700;cursor:pointer}
.topo button:hover{background:rgba(255,255,255,.28)}
.corpo{padding:10px;display:grid;gap:10px}
.sec{background:var(--card);border:1px solid var(--borda);border-radius:10px;padding:10px}
.sec h2{margin:0 0 8px;font-size:12.5px;font-weight:800;letter-spacing:1px;color:var(--texto);display:flex;align-items:center;justify-content:space-between}
.btns{display:flex;flex-wrap:wrap;gap:6px}
.b{border:1px solid var(--borda);background:var(--fundo);color:var(--texto);border-radius:8px;padding:8px 11px;font:inherit;font-size:14px;font-weight:600;cursor:pointer;text-align:left}
.b:hover{border-color:var(--acento);color:var(--acento)}
.b.forte{background:var(--acento);border-color:var(--acento);color:#fff;font-weight:600}
.b.forte:hover{filter:brightness(1.08);color:#fff}
.b.copiado,.b.forte.copiado{background:var(--ok);border-color:var(--ok);color:#fff}
input{width:100%;border:1px solid var(--borda);background:var(--card);color:var(--texto);border-radius:7px;padding:7px 9px;font:inherit;font-size:15px;font-weight:600;border-width:1.5px}
input::placeholder,textarea::placeholder{color:#55606e;font-weight:500;opacity:1}
:root.escuro input::placeholder,:root.escuro textarea::placeholder{color:#aab4bf}
label.campo{display:block;font-size:12.5px;font-weight:700;color:var(--texto)}
label.campo input{margin-top:3px}
input:focus{outline:2px solid var(--acento);outline-offset:-1px}
.sub{font-size:12.5px;font-weight:700;color:var(--suave);margin:8px 0 4px}
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
.item .n{font-weight:700;font-size:14.5px}
.item .a{font-size:13px;color:var(--suave);font-weight:500}
.item .d{margin:4px 0 6px;font-size:16px;color:var(--acento);font-weight:600;white-space:pre-line}
.vazio{font-size:13.5px;color:var(--suave);padding:6px 2px}
.cab{display:flex;justify-content:space-between;align-items:center;gap:6px}
.cab .x{padding:2px 7px;font-size:12px;color:var(--suave)}
.txt{font:600 13px/1.45 ui-monospace,Consolas,monospace;white-space:pre-wrap;margin-top:4px;color:var(--texto)}
.forte.b{flex:1;text-align:center}
body.min .corpo{display:none}
body.min .dica{display:none}
.rod{font-size:12px;font-weight:600;color:var(--suave);text-align:center;padding:0 10px 10px}
`;

function htmlAtalhos() {
    let e = escaparHtml;
    let ori = ATALHOS_ORIENTACOES.filter(([id]) => buscarMed(id))
        .map(([id, nome]) => `<button class="b" data-copiar-card="${id}">${e(nome)}</button>`).join("");
    return `
<div class="topo">
  <div class="logo">JR MED <span>⚡ Atalhos</span></div>
  <div class="esp"></div>
  <button id="at-novo-pac" title="Limpa peso, idade, busca e a receita">↺ Novo paciente</button>
  <button id="at-min" title="Diminuir / aumentar a janela">Diminuir</button>
</div>
<div class="dica">Clique no botão, depois Ctrl+V no prontuário</div>
<div class="corpo">
  <div class="sec">
    <h2>PRONTUÁRIO</h2>
    <div class="btns">
      <button class="b forte" data-copiar-card="exame_masculino">♂ Exame físico masculino</button>
      <button class="b forte" data-copiar-card="exame_feminino">♀ Exame físico feminino</button>
    </div>
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
      <label class="campo" style="flex:1">Peso (kg)<input id="at-peso" type="number" min="0" step="0.1" inputmode="decimal" placeholder="ex.: 15"></label>
      <label class="campo" style="flex:1">Idade (anos)<input id="at-idade" type="number" min="0" step="0.1" inputmode="decimal" placeholder="ex.: 4"></label>
    </div>
    <label class="campo" style="margin-top:6px">Remédio ou doença<input id="at-busca" placeholder="ex.: amoxicilina, otite"></label>
    <div class="res" id="at-res"><div class="vazio">Digite o peso, a idade e o nome do remédio ou da doença.</div></div>
  </div>
  <div class="sec" id="at-receita"></div>
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
    if (!q) { caixa.innerHTML = `<div class="vazio">Digite o peso, a idade e o nome do remédio ou da doença.</div>`; return; }
    let idade = doc.getElementById("at-idade").value.trim();
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
<div class="d">${escaparHtml(String(d))}</div>${pode ? `<div class="btns"><button class="b forte" data-add="${escaparHtml(id)}">+ Receita</button><button class="b" data-receita="${escaparHtml(id)}">Copiar só este</button></div>` : ""}</div>`;
    }).join("");
}

// Receita: a mesma do app (carrinhoPrescricao). Atualiza sozinha quando muda no app ou aqui.
function atalhosReceitaHtml(doc) {
    let caixa = doc.getElementById("at-receita"); if (!caixa) return;
    let n = carrinhoPrescricao.length;
    if (!n) { caixa.innerHTML = `<h2>RECEITA</h2><div class="vazio">Vazia. Use "+ Receita" nos remédios acima.</div>`; return; }
    caixa.innerHTML = `<h2>RECEITA (${n})</h2><div class="res">` + carrinhoPrescricao.map((it, i) =>
        `<div class="item"><div class="cab"><span class="n">${i + 1}. ${escaparHtml(it.nome)}</span><button class="b x" data-tirar="${i}" title="Tirar da receita">✕</button></div>
<div class="txt">${escaparHtml(it.texto)}</div></div>`).join("") +
        `</div><div class="btns" style="margin-top:8px"><button class="b forte" id="at-copiar-receita">📋 Copiar receita completa</button><button class="b" id="at-limpar">Limpar</button></div>`;
}
function atalhosAtualizarReceita() {
    if (janelaAtalhos && !janelaAtalhos.closed) atalhosReceitaHtml(janelaAtalhos.document);
}
function atalhosAdicionar(id, p, idade) {
    let med = buscarMed(id); if (!med) return false;
    let texto = String(med.calc(p, idade).r || "").trim();
    if (!texto) return false;
    carrinhoPrescricao.push({ nome: med.nome, apres: med.apres, texto, via: viaDaReceita(texto, med) });
    atualizarCarrinhoUI();
    return true;
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
    let idadeApp = (document.getElementById("idadeInput") || {}).value;
    if (idadeApp) $("at-idade").value = idadeApp;
    let idadeJanela = () => $("at-idade").value.trim();
    atalhosMeusHtml(doc);
    atalhosReceitaHtml(doc);

    doc.addEventListener("click", (ev) => {
        let b = ev.target.closest("button"); if (!b) return;
        if (b.dataset.copiarCard) {
            let m = buscarMed(b.dataset.copiarCard); if (m) atalhosCopiar(doc, m.calc().r, b);
        } else if (b.dataset.receita) {
            let m = buscarMed(b.dataset.receita), p = parseFloat($("at-peso").value);
            try { atalhosCopiar(doc, m.calc(p, idadeJanela()).r, b); } catch (e) {}
        } else if (b.dataset.add) {
            try {
                if (atalhosAdicionar(b.dataset.add, parseFloat($("at-peso").value), idadeJanela())) {
                    b.classList.add("copiado"); b.textContent = "✓ Na receita";
                    setTimeout(() => { b.classList.remove("copiado"); b.textContent = "+ Receita"; }, 1100);
                }
            } catch (e) {}
        } else if (b.dataset.tirar) {
            carrinhoPrescricao.splice(+b.dataset.tirar, 1); atualizarCarrinhoUI();
        } else if (b.id === "at-copiar-receita") {
            atalhosCopiar(doc, textoReceitaCompleta(), b);
        } else if (b.id === "at-limpar") {
            if (win.confirm("Limpar a receita?")) { carrinhoPrescricao = []; atualizarCarrinhoUI(); }
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
        } else if (b.id === "at-novo-pac") {
            /* mesmo "Novo paciente" do app (limpa peso, idade, alergias e receita) + os campos da janela */
            if (typeof novoPaciente === "function") novoPaciente(); else { carrinhoPrescricao = []; atualizarCarrinhoUI(); }
            ["at-peso", "at-idade", "at-busca"].forEach(id => { $(id).value = ""; });
            atalhosResultados(doc); atalhosReceitaHtml(doc);
            b.textContent = "✓ Limpo"; setTimeout(() => { b.textContent = "↺ Novo paciente"; }, 1000);
            $("at-peso").focus();
        } else if (b.id === "at-min") {
            atalhosEstado.minimizado = !atalhosEstado.minimizado;
            doc.body.classList.toggle("min", atalhosEstado.minimizado);
            b.textContent = atalhosEstado.minimizado ? "Aumentar" : "Diminuir";
            try { atalhosEstado.minimizado ? win.resizeTo(260, 90) : win.resizeTo(380, 640); } catch (e) {}
        }
    });
    $("at-peso").addEventListener("input", () => atalhosResultados(doc));
    $("at-idade").addEventListener("input", () => atalhosResultados(doc));
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
