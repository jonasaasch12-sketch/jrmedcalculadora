---
name: padroes
description: Padrões de organização do código do JR MED - onde cada coisa fica, nomes, ordem dos scripts, arquivo novo, dados que entram em HTML, CSS e padrão visual, recurso "só no teste" e a conferência automática de padrões. Use SEMPRE antes de criar, mover ou apagar arquivo, criar função ou variável global, mexer em index.html, sw.js, CSS, cores ou layout, criar um recurso preso ao teste, ou quando o pedido for organizar, padronizar, limpar ou refatorar o código.
---

# Padrões do código

O JR MED é HTML, CSS e JavaScript puros, **sem etapa de montagem e sem frameworks**: o arquivo do
repositório é o arquivo que o médico recebe. Isso deixa o projeto simples de publicar, e traz três
consequências que explicam quase todas as regras abaixo:

1. Os scripts são clássicos e **dividem as mesmas variáveis globais**. Dois arquivos com o mesmo
   nome de função: o segundo apaga o primeiro, sem aviso.
2. **A ordem dos `<script>` no `index.html` importa.**
3. O mesmo código roda em `/` (oficial) e em `/teste/`. Caminho absoluto quebra uma das duas.

## Mapa do projeto

| Onde | O que tem |
|---|---|
| `index.html` | Telas (página pública, login, início, app, modais) e a lista de `<script>` |
| `js/base.js` | Auxiliares dos cálculos (`recHead`, `round05`, ceftriaxona): carrega antes de tudo |
| `js/modo-teste.js` | `MODO_TESTE` (endereço com `/teste/`), faixa vermelha e escolha de visual |
| `medicamentos/` | Um arquivo por categoria, mais `registro.js`, `menu.js`, `grupos.js`, `fontes.js` |
| `js/app.js` | Cards, busca, cálculo, alergias, receita, tema e tamanho da letra |
| `js/formularios.js` | Modais da equipe (remédio, categorias, ficha) e a inicialização |
| `js/cadastro.js`, `js/digital.js` | Cadastro profissional e desbloqueio por digital |
| `js/atalhos.js`, `js/inicio.js` | Atalhos ⚡ e tela inicial |
| `js/firebase.js` | Login e banco. É **módulo**: não divide variáveis com os outros |
| `condutas/` | `condutas.js` e `condutas.css` (motor) e um arquivo por doença |
| `css/` | `estilo` → (`condutas/condutas.css`) → `visual` → `layout-b` → `inicio` → `temas-teste` (nesta ordem; o último vence) |
| `sw.js` | Modo offline (rede primeiro) |
| `testes/` | `verificar.js` (doses) e `conferir-padroes.js` (organização). Não vai para o site |

Ordem dos scripts: `base` → `modo-teste` → `registro` → categorias de remédio → `menu` → `grupos` →
`fontes` → `cadastro` → `digital` → `app` → `formularios` → `atalhos` → `condutas.js` → condutas →
`inicio` → `firebase` (módulo).

## Arquivo novo

- `.js` ou `.css` novo entra em **três lugares**: `index.html`, `ARQUIVOS_ESSENCIAIS` do `sw.js`, e
  o número de `CACHE_NOME` sobe. Arquivo apagado sai dos três.
- Caminhos sempre relativos: `js/app.js`, nunca `/js/app.js`.
- Um arquivo por categoria de remédio e um por doença. Não criar pasta nova sem combinar.
- Arquivo de rascunho, relatório ou teste solto não entra no repositório (ele é público).

## Nomes

- Em português, sem acento nos identificadores: `calcularTudo`, `filtrarMedicas`.
- Antes de criar função, constante ou variável no topo de um arquivo, procurar se o nome já existe:
  `git grep -n -w "nomeNovo"`.
- Constantes de configuração em MAIÚSCULAS: `MAX_BOTOES_GRUPO`, `VERSAO_TERMOS`.
- Ids de card e de conduta: minúsculas com sublinhado.
- Chaves de armazenamento no aparelho: sempre com o prefixo `jrmed_` (`jrmed_tema`, `jrmed_perfil`).

## Dados que entram em HTML

Todo texto que vem **do banco, do usuário ou do armazenamento do aparelho** passa por
`escaparHtml()` antes de entrar em `innerHTML`. Um cadastro com código no lugar do nome já foi um
risco real na tela de usuários.

- Preferir `innerText` ou `textContent` quando não precisa de HTML (é assim que o resultado do cálculo entra na tela).
- Usar `escaparHtml()` (js/app.js). Não criar outra função de escape: já existem quatro com o mesmo
  papel (`escaparHtml`, `escPerfil`, `escCond` e uma local no `firebase.js`).
- Em `onclick="funcao('${x}')"`, o `x` só pode ser um id gerado pelo app.
- Nunca executar texto vindo do banco como código (`eval`, `new Function`). O remédio da equipe é
  calculado por uma regra simples (fator × peso, arredondamento, teto) exatamente por isso.

## Recurso só no teste

- A trava fica **no código**: uma constante `ALGO_LIBERADO = false` combinada com `MODO_TESTE`, como em
  `VENTILACAO_LIBERADA` (medicamentos/menu.js). Esconder só com CSS não protege nada.
- Dado clínico (card, texto de conduta, cálculo) não tem trava automática: escrever "só no teste" no
  commit não prende nada. Se precisa ficar só no teste, precisa de `if`.
- Ao liberar: trocar a constante, corrigir os comentários que diziam "só no teste" e atualizar o `CLAUDE.md`.
- Constantes de hoje: `CONDUTAS_LIBERADAS`, `INICIO_LIBERADO` e `ATALHOS_LIBERADOS` (ligadas);
  `VENTILACAO_LIBERADA` (desligada até a conferência com a fisioterapia).

## CSS e padrão visual

- São seis arquivos em camadas, e o mais novo vence o mais antigo. Antes de mexer, descobrir em qual
  camada a regra está: `git grep -n "seletor" -- "*.css"`. Mudar na camada errada parece não fazer efeito.
- Tema escuro: `html[data-theme="dark"]`. Toda cor nova precisa do par escuro.
- Evitar `!important` novo: só `css/inicio.css` e `css/temas-teste.css` já têm cerca de 300. Preferir um seletor mais específico.
- Cores combinadas com o Dr. Jonas (não inventar cor nova):

| Uso | Valor |
|---|---|
| Tarja do topo e botão principal | `#005eb8` (hover `#0a6fd6`), cantos 10px, sem degradê |
| Logo "JR" | degradê de `#0f766e` a `#14b8a6` (não muda) |
| Fundo das telas | `#f2f4f7`; blocos e cartões brancos |
| Cartões | borda `#e3e7ec`, cantos 12 a 14px, sombra `0 10px 30px rgba(16,24,40,.08)` |
| Campos | borda `#cfd6de`, cantos 10px, foco com contorno azul fino |
| Texto | `#212b32` (título e corpo), `#5b6670` (legenda), fonte Inter |

- Toda mudança de tela é testada no celular e no computador, no claro e no escuro: skill `testar-tela`.

## Comentários

- Explicar o **porquê**, e registrar o pedido com a data: `(pedido do Dr. Jonas, 10/2026)`.
- Comentário errado é pior que nenhum: mudou o comportamento, mudar o comentário junto.
- Dentro de função de uma linha (os `calc`), só `/* */`.
- Sem `console.log` nem `debugger` esquecidos (`console.warn` de falha pode ficar).

## A conferência automática

```bash
node testes/verificar.js          # doses, tetos, menu, arquivos, fotografia das receitas
node testes/conferir-padroes.js   # organização: cards, condutas, nomes, caminhos, versões
```

- As duas rodam antes de qualquer publicação. A primeira bloqueia a publicação automática; a segunda não.
- `conferir-padroes.js` separa desvio **novo** (falha) de desvio **conhecido** (a fila de arrumação,
  em `testes/padroes-conhecidos.json`). `--tudo` mostra a fila inteira.
- Apareceu desvio novo: corrigir. Só aceitar com `--atualizar` quando for de propósito, e dizer o
  motivo no commit.
- **Não arrumar desvio conhecido "de passagem".** Vários mudam texto de receita ou dependem de
  decisão clínica (fonte, teto, via). Perguntar ao Dr. Jonas e fazer num pedido só para isso.
- Regra nova combinada com ele: escrever aqui ou na skill da área e, se der para conferir por
  programa, acrescentar em `testes/conferir-padroes.js`.

## Organizar, limpar, refatorar

- Só a pedido. Um assunto por pedido de mudança.
- Nunca junto com mudança de dose ou de conduta: se a fotografia das receitas mudar numa limpeza, algo saiu errado.
- Antes de apagar código "morto", confirmar que nada usa: `git grep -n -w "nome"`.
- Mudou a estrutura (arquivo, pasta, constante de liberação): atualizar o `CLAUDE.md` no mesmo pedido.
  Se o `CLAUDE.md` e o código discordarem, vale o código, e o `CLAUDE.md` é corrigido.
