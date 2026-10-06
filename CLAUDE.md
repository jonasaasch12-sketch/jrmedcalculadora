# JR MED — Manual & Calculadora de Bolso (pediatria)

App de prescrição pediátrica do Dr. Jonas Raasch, publicado em jrmedprescricao.com.br
(GitHub Pages, branch `main`). HTML/CSS/JS puro, **sem build e sem frameworks**: o que
está no repositório é exatamente o que vai para o ar. Login e dados da equipe via Firebase.

## Regras de trabalho (combinadas com o Dr. Jonas)

- **Duas versões do site:**
  - `main` → jrmedprescricao.com.br (oficial, toda a equipe)
  - `teste` → jrmedprescricao.com.br/teste/ (versão de teste: faixa vermelha, só administradores)
- **Toda mudança vai primeiro para o teste**: commit no branch de trabalho → PR para `teste` →
  merge (squash). O Dr. Jonas testa no celular dele.
- **Liberar para todos** só quando ele pedir ("pode liberar"): PR `teste` → `main`, merge com
  **merge commit** (não squash, para as duas branches não divergirem).
- Publicação automática: `.github/workflows/publicar.yml` (GitHub Actions) monta os dois
  endereços a cada push na `main` ou na `teste`, e não publica se `testes/verificar.js` falhar na `main`.
- O banco de dados (Firebase) é o **mesmo** nas duas versões: remédios da equipe e fichas
  editados no teste valem no oficial. Só o código fica separado.
- **Sempre rodar `node testes/verificar.js` antes de publicar.** Se a mudança de dose foi
  intencional, rodar `node testes/verificar.js --atualizar` e conferir o diff de
  `testes/referencia-doses.json`: ele mostra exatamente quais receitas mudaram.
- Doses: seguir o **Whitebook** (prioridade) e as diretrizes da **SBP**. Não inventar dose.
  Na dúvida, perguntar. Conteúdo do Manual HIAS (2017) é a referência mais antiga.
- Texto técnico, igual à fonte. Ignorar a parte de adultos dos materiais enviados.
- Respostas ao usuário em português, linguagem simples (ele é médico, não programador).

## Estrutura

```
index.html                 telas (login, cabeçalho, painel, modais) + lista de <script>
css/estilo.css             toda a aparência (inclui tema escuro: html[data-theme="dark"])
js/base.js                 auxiliares usados nos cálculos (recHead, round05, ceftriaxona)
js/modo-teste.js           versão de teste: faixa, selo e bloqueio de quem não é admin
medicamentos/registro.js   registrarMedicamentos(): cria farmaciaJR, detalhesMedicacoes, fichasPadrao
medicamentos/<categoria>.js um arquivo por categoria (cat: "cat-<categoria>")
medicamentos/menu.js       árvore do menu: categoria → seções → ids dos remédios (ordem de exibição)
js/app.js                  renderização, busca, cálculo, alergias, carrinho/receita, tema, fonte
js/formularios.js          modais (cadastro da equipe, categorias, ficha) + inicialização (no final)
js/firebase.js             login e Firestore (módulo)
sw.js                      modo offline (rede primeiro)
testes/verificar.js        verificação automática (só precisa de Node)
condutas/condutas.js       área 📖 Condutas (aba ao lado de 💊 Prescrição)
condutas/<doenca>.js       uma doença por arquivo: registrarConduta({...}); as medicações
                           são ids de cards (farmaciaJR), a dose nunca é repetida na conduta
```

## Padrão das condutas (definido pelo Dr. Jonas)

- 3 blocos, nesta ordem: **🔎 Diagnóstico e apresentação clínica** (azul) → **🚨 Condução na
  emergência / hospitalar** (vermelho) → **🏠 Ambulatório: casa e manutenção** (verde).
- **O diagnóstico vem SEMPRE primeiro** (1ª seção do 1º bloco). Depois: diferencial, fatores de
  risco, sinais vitais e, por último no bloco, a gravidade/escore.
- Seções são sanfona (fechadas). `aberta: true` só no essencial do plantão: gravidade/escore,
  conduta da emergência e prescrição para casa. Cada seção tem `resumo` de uma linha.
- Escores clínicos (WDF, PRAM...) sempre **clicáveis** (`escore: {...}`), com soma automática.
- Medicações: linkar os cards; se a fonte diverge do card, **não mudar o card sem perguntar**.
  Quando o Dr. Jonas escolhe a dose do card (ex.: salbutamol peso/2, magnésio do serviço),
  a conduta passa a usar o card.
- Texto em português, técnico; fontes no final.
- **Condutas ficam só no teste** até o Dr. Jonas liberar: `CONDUTAS_LIBERADAS = false` em
  `condutas/condutas.js` esconde a aba no site oficial. "Pode liberar" leva só os cards;
  trocar para `true` apenas quando ele pedir para liberar as condutas.

A **ordem dos `<script>` no index.html importa**: base → registro → categorias → menu → app → formularios.
Os scripts são clássicos (não módulos) e compartilham variáveis globais (`farmaciaJR`, `categorias`...).

**Arquivo novo de .js/.css?** Acrescentar no `index.html` **e** em `ARQUIVOS_ESSENCIAIS` do
`sw.js`, e subir o número de `CACHE_NOME`. O teste acusa se faltar.

Todos os caminhos são **relativos** (`js/app.js`, nunca `/js/app.js`), para o mesmo código
funcionar na raiz e em `/teste/`. `js/modo-teste.js` detecta `/teste/` (constante `MODO_TESTE`).

## Formato de um remédio (tudo num bloco só)

```js
"id_do_remedio": {
    cat: "cat-respiratorio",                 // categoria (= nome do arquivo)
    sub: "🏠 Uso Ambulatorial (Vias Orais)",
    kw: "palavras chave para a busca",
    nome: "Nome Comercial / Genérico", apres: "Concentração",
    info: "...", badge: "...", recLabel: "Texto para selecionar e copiar:",
    calc: (p, i) => ({ v: "dose curta (quadro azul)", r: `${recHead}1) NOME 100 MG/ML ------ 1 FR\nDAR X ML, VIA ORAL, DE 8/8 HORAS.` }),
    detalhes: { indicacao: "...", dose: "...", atencao: "..." },   // texto abaixo do nome
    ficha: { apresentacoes, indicacoes, dose, doseMaxima, via, intervalo, reconstituicao,
             diluicao, infusao, alertasPediatricos, contraindicacoes, efeitosAdversos,
             interacoes, ajusteRenal, ajusteHepatico, conservacao, fonteRevisao }
}
```

- `calc(p, i)`: `p` = peso (kg, número), `i` = idade em anos (**texto**, pode ser `""`).
  Retorna `{ v, r }`. Sempre aplicar o **teto** com `Math.min(...)` *depois* do arredondamento.
- Receita (`r`): 1ª linha = via (`USO ORAL`, `VIA ENDOVENOSA`, `NEBULIZAÇÃO ...`, `ORIENTAÇÕES ...`):
  é por ela que a receita copiada agrupa os itens. Em MAIÚSCULAS, padrão `1) NOME CONC ---- QTD`.
- `badgeSt` (selo fixo): **só em card de dose fixa**. Com ele o quadro azul não é recalculado.
- Comentários dentro de `calc` de uma linha: usar `/* */`, nunca `//`.
- Ficha completa: ordem de exibição fixa (em `renderizarBlocoFicha`), **fonte sempre por último**.
  Se o card tem ficha com dose, o texto abaixo do nome mostra "Ver 📋 Ficha completa".
  Fichas da equipe (Firestore `fichas_medicamentos`) têm prioridade sobre `ficha`.
- Injetáveis ganham a seringa 💉 automaticamente (pelo texto da receita).
  Seções hospitalares ganham 🏥 pelo nome ("hospitalar") ou pela lista `SECOES_HOSPITALARES` (js/app.js).
- Novo remédio: criar o bloco no arquivo da categoria **e** colocar o id em `medicamentos/menu.js`.
  Se tiver teto de dose, acrescentar em `TETOS` (testes/verificar.js).

## Testar a tela

Servir a pasta (`python3 -m http.server`) e abrir no Playwright (Chromium já instalado).
O login do Firebase não carrega no ambiente de teste: mostrar o app com
`tela-login.style.display='none'; aplicativo-principal.style.display='block'`.
