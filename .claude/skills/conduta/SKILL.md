---
name: conduta
description: Cria, altera ou revisa uma conduta do JR MED (arquivos em condutas/). Use SEMPRE que o pedido falar em conduta, protocolo, diretriz, passo a passo de uma doença, critérios de internação, escore clicável, linha do tempo, fontes ou citações de uma conduta, inclusive para ajustes pequenos de texto ou de ordem dos passos.
---

# Conduta

Uma conduta é o passo a passo de uma doença, lido no plantão. O formato é sempre o mesmo para que o
médico ache a informação no mesmo lugar em qualquer doença. As 30 condutas atuais seguem este padrão.

## 1. Antes de escrever

- **Fonte primeiro:** diretriz da SBP, AAP, IDSA, Ministério da Saúde. Doses pelo Whitebook e pela SBP.
  Texto técnico, igual à fonte. Não inventar critério, ponto de corte nem dose. Na dúvida, perguntar.
- Material enviado com parte de adulto: ignorar a parte de adulto.
- **A dose nunca é escrita na conduta.** As medicações são ids de cards (`remedios: ["amox_oma"]`), e o
  app calcula com o peso e a idade digitados. Card que falta: skill `remedio`.
- A fonte da conduta diverge de um card que existe: **não mudar o card sem perguntar.** Quando o
  Dr. Jonas escolhe a dose do card, a conduta passa a usar o card.

## 2. O arquivo

- Uma doença por arquivo: `condutas/<id>.js`, com `registrarConduta({...})`. O id é igual ao nome do arquivo.
- Começar pelo esqueleto: `.claude/skills/conduta/assets/esqueleto-conduta.js`.
  Modelos reais: `condutas/otite.js` (estrutura), `condutas/sinusite.js` (escrita),
  `condutas/pele_bacteriana.js` (várias doenças na mesma conduta).
- Arquivo novo entra em três lugares: `index.html` (depois de `condutas/condutas.js`),
  `ARQUIVOS_ESSENCIAIS` do `sw.js`, e subir `CACHE_NOME`.
- **Conduta nova fica só no teste até o Dr. Jonas conferir:** constante `<NOME>_LIBERADA = false` e
  o `if` do esqueleto. Para liberar, trocar a constante (skill `publicar`).

## 3. Os três blocos, nesta ordem

| Bloco | Título | Ícone | Cor |
|---|---|---|---|
| 1 | Diagnóstico e apresentação clínica | 🔎 | `#0284c7` |
| 2 | Condução na emergência / hospitalar (passo a passo) | 🚨 | `#dc2626` |
| 3 | Ambulatório: casa e manutenção | 🏠 | `#16a34a` |

**Bloco 🔎.** O diagnóstico vem sempre primeiro (1ª seção). Depois: diferencial, fatores de risco,
sinais vitais e, por último, a gravidade ou o escore.

**Bloco 🚨.** Passo a passo cronológico, na ordem em que se faz:

1. 1ª seção: "Linha do tempo (resumo)", com `lista: "passos"` e um item por passo
   (`<span class="cond-passo">1</span> <strong>Rótulo:</strong> ...`).
2. `passo: 1`: "🏥 Critérios de internação", clicáveis (`escore` com `checklist: true`): 🔴 UTI vale 2,
   🟠 enfermaria vale 1, 🟢 "Nenhum critério" vale 0, e `classificar` decide pelo maior valor.
   Sinais de complicação entram neste passo. Se a diretriz não traz lista formal, dizer na `nota` de onde vieram os critérios.
3. Passos seguintes, um por seção (`passo: 2`, `3`...), sem pular número: chegada e exames,
   hidratação, medicação... Cada passo diz o que fazer, em frases curtas e imperativas, com o card da etapa.
4. Complicações "a qualquer momento" no fim.

Emergência (anafilaxia, TCE, queimados): o resumo dos critérios avisa que eles não atrasam o
tratamento imediato. Conduta sem passos numerados: os critérios de internação são a 1ª seção do bloco.

**Trocar a ordem dos passos muda a conduta para todos.** Texto de conduta não tem trava de teste:
confirmar com o Dr. Jonas e atualizar toda referência a "passo N" no arquivo.

**Várias doenças na mesma conduta:** um bloco por doença, com tudo da doença dentro, nesta ordem de
seções: Apresentação clínica (com foto) → Critérios diagnósticos → Tratamento ambulatorial →
Tratamento hospitalar (critérios de internação clicáveis e depois os cards EV) → Complicações.
Repetir o mesmo card em várias doenças quando a dose é a mesma; dose diferente pede card próprio.

## 4. Seções

- Toda seção tem `titulo`, `icone` e `resumo` de uma linha.
- Todas começam fechadas. O campo `aberta` é ignorado: não usar em seção nova.
- Outros campos: `itens`, `remedios`, `escore`, `tabela` (`{ colunas, linhas, nota }`),
  `grupos` (`[{ nome, itens, remedios, escore }]`), `nota`, `ferramenta`.

## 5. Padrão de escrita

- **Negrito só no rótulo do início do item**, uma vez, terminando em dois-pontos:
  `<strong>Exame de imagem:</strong> ...`. Nunca negrito no meio da frase. Item sem rótulo, sem negrito.
- **Lista dentro de um item:** `{ texto: "<strong>Rótulo:</strong> ...", sub: ["...", "..."] }`.
  Nada de "•" digitado. Não numerar subitens: número parece ponto de escore.
- **Ponto de atenção:** `{ alerta: "texto em minúscula..." }`. No máximo 1 ou 2 por seção, só o que muda a conduta.
- Itálico só em nome científico. Fonte entre parênteses no fim da frase: `(AAP 2013)`.
- Para apontar outra parte da conduta: "aba Diagnóstico", "aba Emergência", "aba Ambulatório".
- Texto em português, técnico.

## 6. Escores e ferramentas

- Escore clínico (PRAM, Westley...) é sempre **clicável**, com soma automática:
  `escore: { id, instrucao, itens: [{ nome, opcoes: [[pontos, "texto"]] }], faixas: [{ min, max, rotulo, cor, texto }], nota }`.
- Regra que não é soma: `classificar: (v) => ({ num, rotulo, cor, texto })`, onde `v` é a lista dos valores marcados.
- O `id` do escore é único no app inteiro (`internacao_oma`, `pram`).
- Ferramenta própria (boneco clicável, calculadora): `ferramenta: "nomeDaFuncao"`, uma função global do
  arquivo que devolve o HTML. O nome não pode existir em outro arquivo.

## 7. Fontes e citações

- `fontes`: lista numerada, no final, com a referência completa.
- `citacoes: { "AAP 2013": 0, "AAP": 0, "revisões 2023": [2, 3] }`: a sigla que aparece no texto
  aponta para a posição em `fontes` (começa em 0). Fonte nova: acrescentar a sigla aqui.
- `revisao: "MM/AAAA"`.

## 8. Fotos

Só foto com licença livre e crédito. DermNet (CC BY-NC-ND 4.0): arquivo original, sem corte, com a
marca d'água, crédito "Image sourced from DermNet" e link. Ou Wikimedia/CDC. Sem licença clara, não usar.

## 9. Ligar com a Prescrição

`conduta: "<id>"` (e `condutaNome`, opcional) na categoria ou seção de `medicamentos/menu.js` põe o
botão "📖 Conduta passo a passo" na Prescrição.

## 10. Conferir

```bash
node testes/conferir-padroes.js   # estrutura, passos, internação, escrita, cards citados, fontes
node testes/verificar.js          # arquivo novo no index.html e no sw.js
```

- Abrir na tela, no celular e no computador: skill `testar-tela` (`--teste --conduta ID --peso 12`).
  Conferir que todos os cards da conduta mostram dose e que os escores somam.
- Mostrar ao Dr. Jonas no /teste/ antes de liberar: skill `publicar`.
