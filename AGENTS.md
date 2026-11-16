# Regras para qualquer ferramenta de IA que mexa neste repositório

Este é o JR MED, um app de prescrição pediátrica usado por médicos no plantão. O que está na branch
`main` é o que eles usam, e uma dose errada chega ao paciente. Antes de alterar qualquer coisa, leia:

1. **`CLAUDE.md`**: as regras combinadas com o Dr. Jonas e o mapa do projeto.
2. **A skill da tarefa**, em `.claude/skills/<nome>/SKILL.md`. São textos comuns, com o passo a passo,
   e servem para qualquer ferramenta:

| Tarefa | Ler |
|---|---|
| Commit, pedido de mudança, levar para o teste, liberar para o oficial | `.claude/skills/publicar/SKILL.md` |
| Card de remédio, dose, teto, receita, fonte, menu | `.claude/skills/remedio/SKILL.md` |
| Conduta, passos, critérios de internação, escores | `.claude/skills/conduta/SKILL.md` |
| Arquivo novo, nomes, CSS, padrão visual, recurso só no teste | `.claude/skills/padroes/SKILL.md` |
| Firebase, login, dados pessoais, Termos e Privacidade | `.claude/skills/seguranca/SKILL.md` |
| Revisar ou auditar sem alterar | `.claude/skills/auditoria/SKILL.md` |
| Testar a tela no navegador | `.claude/skills/testar-tela/SKILL.md` |

## As regras que não têm exceção

1. **Toda mudança entra pela branch `teste`**: pedido de mudança com base `teste`, junção por squash.
   Nunca abrir pedido de uma branch de trabalho direto para a `main`.
2. **A `main` só recebe a `teste`**, por merge commit, e só depois de o Dr. Jonas dizer "pode liberar"
   para aquela mudança. Melhoria pequena, de texto ou de SEO segue o mesmo caminho.
3. **Antes de publicar**, as duas conferências têm de passar:
   `node testes/verificar.js` (doses) e `node testes/conferir-padroes.js` (organização).
4. **Não inventar** dose, teto, idade mínima nem fonte. Na dúvida, perguntar.
5. **Nada no Firebase a partir daqui.** As regras do banco são publicadas só pelo Dr. Jonas, no console.
6. **Sem dados de pacientes e sem dados pessoais** em código, commits, pedidos de mudança ou
   relatórios. O repositório é público, e commit enviado não se apaga.
7. HTML, CSS e JavaScript puros: sem frameworks, sem etapa de montagem, caminhos sempre relativos.
8. Responder ao Dr. Jonas em português simples. Ele é médico, não programador.

## Se algo estiver diferente do esperado

Se a `teste` e a `main` não baterem com o que estas regras descrevem, ou se houver mudanças que você
não reconhece, pare e avise o Dr. Jonas antes de continuar. Não tente igualar as versões por conta própria.
