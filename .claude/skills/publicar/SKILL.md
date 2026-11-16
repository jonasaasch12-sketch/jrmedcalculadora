---
name: publicar
description: Leva uma mudança do JR MED para a versão de teste (/teste/) e libera para a versão oficial, pelo caminho combinado com o Dr. Jonas. Use SEMPRE que for fazer commit, abrir pedido de mudança (PR), juntar (merge), "mandar para o teste", "pode liberar", "liberar para todos", "subir para o oficial", desfazer uma publicação, ou quando o teste e o oficial estiverem diferentes. Use também antes de afirmar que algo "está no ar".
---

# Publicar no JR MED

## Por que existe um caminho só

O que está no repositório é o site: não há etapa de montagem. Uma junção na `main` chega a todos os
médicos em um ou dois minutos. Como o app calcula dose, erro publicado é erro na prescrição.

Já aconteceu de mudanças entrarem no oficial por um pedido direto para a `main`: o conteúdo ficou
igual, mas as duas versões passaram a ter históricos diferentes. Um caminho só evita isso.

## O mapa

| Onde | Branch | Endereço | Quem vê |
|---|---|---|---|
| Trabalho | a branch da sessão | não é publicada | ninguém |
| Teste | `teste` | jrmedprescricao.com.br/teste/ | só administradores (faixa vermelha) |
| Oficial | `main` | jrmedprescricao.com.br | toda a equipe |

- Publicação automática: junção na `teste` roda `avisar-teste.yml`, que dispara `publicar.yml`;
  junção na `main` roda `publicar.yml` direto. Ele publica as duas versões juntas e **não publica
  nada se `node testes/verificar.js` falhar na `main`**.
- O banco de dados (Firebase) é o mesmo nas duas versões. Regras e dados não passam por aqui: skill `seguranca`.

## As quatro regras

1. **Tudo entra pelo teste.** Nunca abrir pedido de uma branch de trabalho direto para a `main`.
2. **Oficial só com "pode liberar"** do Dr. Jonas, nesta conversa, para esta mudança. Autorização
   antiga não vale para mudança nova, e "deu certo" não é "pode liberar".
3. **Trabalho → teste: squash. Teste → oficial: merge commit**, com base `main` e origem `teste`.
   O squash cria um commit novo; se fosse usado na liberação, a `main` deixaria de conter a `teste`
   e as duas divergiriam.
4. **Nunca enviar direto, nem reescrever, a `teste` ou a `main`.** Reescrever só a própria branch
   de trabalho, com `--force-with-lease`.

## Levar para o teste

1. **Começar do teste atual.** `git fetch origin` e `git log --oneline -3 origin/teste`. Se o pedido
   anterior foi juntado por squash, a branch de trabalho ficou para trás: `git checkout -B <branch> origin/teste`.
   Se houver commits que não são desta sessão, ler o que mudaram antes de continuar.
2. **Fazer a mudança** pela skill da área: `remedio`, `conduta`, `padroes` ou `seguranca`.
3. **Conferir, nesta ordem:**
   - `node testes/verificar.js` tem de terminar em "✅ Tudo certo". Dose mudou de propósito: rodar com
     `--atualizar` e mostrar ao Dr. Jonas o diff de `testes/referencia-doses.json`, que é a lista
     exata das receitas que mudaram.
   - `node testes/conferir-padroes.js` tem de terminar em "Nenhum desvio novo".
   - Mexeu em tela: skill `testar-tela`.
4. **Commit em português:** `Área: o que mudou` (ex.: `Prescrição: idade sem arredondar`). Se vale só
   no teste: `Área (teste): ...`. No corpo, o porquê. Um assunto por pedido: não misturar dose com visual.
5. **Enviar a branch e abrir o pedido com base `teste`.** Corpo: "O que muda", "Como conferir no /teste/"
   (os passos que o Dr. Jonas faz no celular) e "Testes".
6. **Antes de juntar,** ler o pedido: arquivos e número de linhas esperados, sem conflito. Juntar por
   squash, travando no commit conferido.
7. **Confirmar a publicação:** a junção dispara "Atualizar versão de teste" (para esse commit), que
   pede uma execução nova de "Publicar site" (ela aparece logo depois, como pedido manual a partir
   da `main`). Esperar as duas terminarem com sucesso. Só então dizer que está no /teste/.
8. **Realinhar** a branch de trabalho com `origin/teste`.
9. **Contar ao Dr. Jonas** (modelo no fim).

## Liberar para o oficial

Só depois do "pode liberar".

1. **Mostrar o que vai junto.** Liberar leva tudo o que está no teste e ainda não está no oficial,
   não só a última mudança:
   ```bash
   git log --oneline origin/main..origin/teste
   git diff --stat origin/main origin/teste
   ```
   Dizer em linguagem simples o que passa a aparecer para todos e o que continua preso ao teste.
   Se a lista tiver algo que ele talvez não espere (dose, conduta, cálculo, texto legal), perguntar antes.
2. **Conferir as travas no código, não no comentário.** `git grep -n -E "MODO_TESTE|_LIBERAD"`.
   O que deve continuar só no teste precisa estar preso por `MODO_TESTE` ou por uma constante
   `*_LIBERADO = false`. Esconder só com CSS não é trava. Mensagem de commit que diz "só no teste"
   também não é: já houve mudança clínica com esse rótulo e sem trava nenhuma.
3. **Tirar o que é temporário** (diagnósticos, avisos de teste). Se `termos.html` ou
   `privacidade.html` mudaram, subir `VERSAO_TERMOS` (js/cadastro.js) e a versão escrita nas duas páginas.
4. **Ver se junta sem conflito:** `git merge-tree --write-tree origin/main origin/teste`.
5. **Pedido com base `main` e origem `teste`; juntar com merge commit.**
6. **Confirmar:** workflow "Publicar site" do commit da junção, com a etapa "Verificar doses da
   versão oficial" concluída.
7. **Contar ao Dr. Jonas** o que conferir no oficial. Se aparecer a tela antiga: fechar e abrir o site.

## Se algo sair errado

- **A verificação falhou:** não publicar. Corrigir, ou perguntar.
- **Publicou e está errado:** desfazer com um pedido novo que reverte (`git revert`), pelo mesmo
  caminho. Não reescrever o histórico da `teste` nem da `main`.
- **Oficial e teste diferentes do esperado** (alguém juntou direto na `main`, outra ferramenta
  mexeu): parar. Mostrar `git log --oneline origin/teste..origin/main` e o inverso, explicar a
  diferença e propor como igualar. Não consertar por conta própria.
- **Não deu para abrir o site daqui:** dizer. A confirmação é o registro do workflow mais o teste
  do Dr. Jonas no celular.

## Como contar ao Dr. Jonas

Ele é médico, não programador. Português simples e curto, nesta ordem: o que mudou, onde está
(teste ou oficial), o que conferir (passos), o que falta decidir. "Pedido de mudança" em vez de PR,
"junção" em vez de merge. Dizer "está no ar" só depois de ver a publicação concluída.

## Ferramentas

- Na nuvem não há `gh`: usar as ferramentas de GitHub da sessão para abrir, ler e juntar pedidos e
  para listar as execuções dos workflows.
- Mensagens de commit e pedidos de mudança não levam nome de modelo de IA.
