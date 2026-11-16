---
name: auditoria
description: Revisa ou audita o JR MED sem alterar nada - comparar a versão de teste com a oficial, revisar o código, levantar riscos, conferir se algo está protegido de verdade, dizer o que muda se liberar. Use SEMPRE que o pedido for auditar, revisar, comparar versões, "ver se está tudo certo", listar riscos, ou quando o pedido disser para não alterar nada, só entregar relatório ou aguardar autorização.
---

# Auditoria e revisão

O Dr. Jonas decide com base no relatório, sem ler o código. Então o relatório precisa ser verdadeiro
linha por linha: o que não foi conferido é dito como não conferido.

## Regras da auditoria

- **Só leitura.** Sem commit, sem pedido de mudança, sem publicar, sem tocar no Firebase, a menos
  que ele autorize. Arquivos de análise ficam na pasta de rascunho da sessão.
- Achou erro grave: avisar e propor. Não corrigir no meio da auditoria.
- Terminar com as decisões que dependem dele, e esperar.

## Método

1. **Dizer o que foi olhado:** branches e commits (`git fetch origin`; `git log --oneline -1 origin/main origin/teste`).
   Se houver commits que não são desta sessão, ler o que mudaram.
2. **Rodar as duas conferências:** `node testes/verificar.js` e `node testes/conferir-padroes.js --tudo`.
3. **Evidência no código, com arquivo e linha.** "Não aparece na tela" não é "está protegido":
   procurar a condição que prende (`MODO_TESTE`, constante `*_LIBERAD*`, regra do banco). Comentário
   e mensagem de commit dizendo "só no teste" não são prova.
4. **Comportamento se testa, não se supõe.** Rodar as funções de verdade (carregar os arquivos como
   o `testes/verificar.js` faz) ou abrir a tela (skill `testar-tela`). Exemplo: o cabeçalho errado da
   receita só apareceu rodando a função real com dois itens.
5. **Separar três coisas** no texto: fato conferido, conclusão tirada do código, e o que não deu para conferir.

## Comparar teste e oficial

```bash
git log --oneline origin/main..origin/teste     # o que o teste tem a mais
git log --oneline origin/teste..origin/main     # o que o oficial tem e o teste não (deveria ser só junções)
git diff --stat origin/main origin/teste
git grep -n -E "MODO_TESTE|_LIBERAD" origin/teste -- js condutas medicamentos index.html
```

Para cada mudança, responder:

| Pergunta | Opções |
|---|---|
| Que tipo é? | visual · funcionamento · clínica (dose, cálculo, conduta, receita) · dados e texto legal · técnica |
| Quem vê se liberar? | todos · só administrador · continua só no teste (dizer a trava e a linha) |
| Foi testada pelo Dr. Jonas? | só "sim" com registro: pedido dele, ou resultado que ele informou |
| O que testar antes? | o teste concreto |

Mudança clínica sem trava vai para todos, mesmo que o commit diga "só no teste".

## Revisar o código

Além das conferências automáticas, olhar o que elas não pegam:

- **Clínico:** idade em branco em remédio com idade mínima; dose sem teto; via errada no cabeçalho
  da receita; passo de conduta fora de ordem; card citado com dose diferente da fonte da conduta.
- **Dados em HTML:** texto do banco ou do usuário entrando em `innerHTML` sem `escaparHtml()`.
- **Publicação:** teste e oficial divergindo; arquivo fora do `sw.js`; versão dos Termos.
- **Organização:** nome global repetido, código que ninguém usa, comentário que não vale mais,
  regra de CSS na camada errada.

Não julgar dose pelo "parece alto": comparar com a fonte, ou listar para o Dr. Jonas conferir.

## O relatório

Em português simples, sem dado pessoal. Estrutura:

1. **Resumo:** o que foi olhado e as três ou quatro coisas que importam.
2. **O que foi comparado** (versões e commits) e **como** (leitura, conferência automática, teste real).
3. **Achados por prioridade.** Para cada um: o que é, onde (arquivo e linha), um exemplo que o
   médico entende, quem é afetado, e a correção sugerida.
4. **O que está bom** (para ele saber o que não precisa mexer).
5. **Testes recomendados** antes de publicar.
6. **Decisões que dependem do Dr. Jonas**, numeradas, cada uma com a recomendação.
7. **Limites:** o que não foi possível conferir (site no ar, console do Firebase, fonte clínica).

Prioridade: **alta** = pode levar a prescrição errada ou expor dado; **média** = erro que o médico
percebe, ou risco que depende de outra falha; **baixa** = organização.

Relatório de segurança ou com falhas vai como arquivo, fora do repositório (skill `seguranca`).
