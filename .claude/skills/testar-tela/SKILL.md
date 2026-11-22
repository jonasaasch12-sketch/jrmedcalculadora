---
name: testar-tela
description: Abre o JR MED num navegador desta máquina para testar a tela e tirar fotos (celular, tablet e computador; claro e escuro; versão oficial e /teste/), sem internet e sem login. Use SEMPRE que mexer em tela, CSS, layout, texto visível, receita exibida, cálculo mostrado no card ou fluxo de clique, e antes de dizer que uma mudança de tela "funciona" ou "ficou boa". Use também quando o Dr. Jonas pedir uma foto, um print ou para "ver como ficou".
---

# Testar a tela do JR MED

O Dr. Jonas confere no celular dele, mas só depois da publicação. Este teste vem antes: pega o erro
enquanto ele ainda não chegou a ninguém. Ler o código não basta para tela: o CSS deste projeto tem
várias camadas que se sobrepõem, e o que parece certo no arquivo pode sair diferente no navegador.

## A ferramenta

```bash
node .claude/skills/testar-tela/scripts/tela.js --ajuda
```

Ela sobe um servidor local, abre o Chromium (Playwright), simula a entrada no app e faz o que for pedido.
Nada sai para a internet: os pedidos ao Firebase e às fontes do Google são bloqueados (por isso o login
de verdade não funciona aqui, e a ferramenta simula a entrada do mesmo jeito que `mostrarApp()` faz).

Exemplos:

```bash
# Prescrição no computador, com peso e idade, olhando um card
node .claude/skills/testar-tela/scripts/tela.js --peso 20 --idade 5 --card dip_gts --foto /caminho/pc.png

# A mesma tela no celular, modo escuro, na versão de teste
node .claude/skills/testar-tela/scripts/tela.js --teste --celular --escuro --peso 20 --foto /caminho/cel.png

# Uma conduta
node .claude/skills/testar-tela/scripts/tela.js --celular --conduta otite_media --peso 12 --foto /caminho/conduta.png

# A receita completa, como o app copia
node .claude/skills/testar-tela/scripts/tela.js --peso 20 --idade 5 --receita dip_gts,amox

# Página de apresentação e login (sem simular a entrada)
node .claude/skills/testar-tela/scripts/tela.js --publica --celular --foto /caminho/publica.png

# Outro tamanho de tela do computador (ex.: notebook 1280 px ou zoom do navegador)
node .claude/skills/testar-tela/scripts/tela.js --largura 1280 --peso 20 --idade 1 --foto /caminho/1280.png

# Conferir qualquer coisa na página
node .claude/skills/testar-tela/scripts/tela.js --js "document.querySelectorAll('.med-card').length"
```

Guardar as fotos na pasta de rascunho da sessão, nunca dentro do repositório.

## O que conferir

Escolher pelo que mudou. Mudança de CSS ou de layout pede a grade inteira; mudança num card pede só o card.

| Mudou | Conferir |
|---|---|
| CSS, layout, cores | Celular e computador, claro e escuro, oficial (`/`) e `--teste` |
| Card de remédio | `--card ID` com 3 pesos e, se a idade importa, idades dos dois lados do limite e idade em branco |
| Texto de receita | `--receita` com o card e mais um de outra via: ver o cabeçalho de cada grupo |
| Conduta | `--conduta ID` no celular e no computador; os cards da conduta mostram dose com `--peso` |
| Página pública ou login | `--publica` |
| Recurso preso ao teste | Abrir sem e com `--teste`: tem de aparecer só onde deve |
| Atalhos no tablet | `--tablet` |

Sinais de erro que a ferramenta mostra: "Erros de JavaScript na página" (sai com código 1) e
"A página está mais larga que a tela" (rolagem lateral, erro comum no celular).

As seções das condutas começam fechadas, e texto escondido não aparece na foto nem em `innerText`.
Para conferir o conteúdo, abrir tudo antes: `--js "abrirTodasSecoes(true)"` (com `--pagina-inteira` na foto).
O `--js` roda depois de abrir a tela e antes da foto.

Olhar a foto de verdade, com a ferramenta de leitura de imagem. Procurar texto cortado, botão fora da
tela, sobreposição, contraste ruim no escuro e elemento de teste aparecendo no oficial.

## Limites: dizer ao relatar

- Não é o site publicado: é a cópia desta máquina. Para saber o que está no ar, vale o registro da
  publicação (skill `publicar`) e o teste do Dr. Jonas no celular.
- Sem login de verdade: telas que dependem do banco (remédios da equipe, lista de usuários, atalhos
  salvos na conta) aparecem vazias. `--admin` só mostra os botões de administração.
- A foto mostra dados de exemplo. Nunca usar dado de paciente real em teste nem em foto.
- Foto para o Dr. Jonas ver: acrescentar `--nitido`.
- Mudança de CSS publicada pode demorar alguns minutos para chegar: o navegador guarda o arquivo antigo
  (cerca de 10 min no GitHub Pages). Se o Dr. Jonas disser que "não mudou", conferir aqui em várias larguras
  (`--largura`) e pedir para recarregar a página com Ctrl+Shift+R (no celular: fechar e abrir o site).

## Depois do teste

Contar o que foi testado e o que não foi, em português simples. "Testei no celular e no computador,
no claro e no escuro" só vale se as quatro fotos foram tiradas e olhadas.
