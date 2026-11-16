---
name: seguranca
description: Segurança e dados do JR MED - regras do banco (Firebase/Firestore), login, administrador, dados pessoais e LGPD, Termos de Uso e Política de Privacidade, e o que pode ou não ir para o repositório público. Use SEMPRE que o pedido envolver Firebase, regras do banco, login, cadastro, usuários, administrador, permissão, dados pessoais, exportação de dados, Termos, Privacidade, senha, chave, auditoria de segurança ou qualquer coleção do banco.
---

# Segurança e dados

## Os três fatos que decidem tudo

1. **O banco é um só** para a versão de teste e para a oficial. Uma regra publicada vale na hora
   para todos os médicos, mesmo que o código novo ainda esteja só no teste.
2. **O site é estático e o repositório é público.** Qualquer pessoa lê o código e pode chamar o
   banco direto, sem passar pela tela. Esconder um botão ou conferir no JavaScript organiza a tela,
   mas não protege: **a proteção de verdade são as regras do banco.**
3. **Commit enviado não se apaga.** O que foi para o GitHub continua acessível pelo número do commit.

## Quem faz o quê

- **Só o Dr. Jonas publica regras**, no console do Firebase. A IA prepara o texto, testa e entrega o
  arquivo pronto para colar, com o passo a passo.
- A IA **não** publica no Firebase, não roda `firebase deploy`, não lê nem altera dados reais.
- As regras em vigor e o documento de segurança ficam **fora do repositório**, com o Dr. Jonas.
  Antes de propor mudança, pedir o texto atual colado do console, e perguntar se o console mostra
  alterações ainda não publicadas.

## Mudar uma regra do banco

1. Ler no código **das duas versões** o que o app grava e lê naquela coleção
   (`git show origin/main:js/firebase.js` e `origin/teste`). A regra tem de aceitar o que o oficial faz hoje.
2. Escrever a regra pedindo o mínimo: cada pessoa mexe só no que é dela, só nos campos esperados,
   com tipo e tamanho conferidos. O que só o administrador faz é conferido na regra, não na tela.
3. Testar no emulador do Firebase, numa pasta de rascunho, com projeto e e-mails fictícios:
   - uso normal: cada tela do app que toca a coleção (criar, entrar, corrigir, baixar, excluir);
   - o que tem de ser recusado: outra pessoa, visitante sem login, campo a mais, valor forjado;
   - casos de borda do formulário: campo apagado, troca de tipo de cadastro, texto com ponto, barra ou acento.
   Uma regra rígida demais impede o médico de salvar o cadastro: isso já aconteceu num teste, com o telefone.
4. Entregar o arquivo completo das regras (não um trecho), fora do repositório, e dizer em uma frase
   o que muda para quem usa.
5. Depois que ele publicar, pedir um teste simples no oficial: entrar e salvar "Meus dados".

## Dados na tela e nos arquivos

- Todo dado do banco ou do usuário é escapado antes de entrar em HTML (skill `padroes`).
- Planilha exportada (CSV): texto que começa com `=`, `+`, `-` ou `@` leva apóstrofo antes, para o
  Excel não executar como fórmula.
- O administrador é reconhecido no código por `EMAILS_ADMIN` (js/firebase.js). Trocar o
  administrador é mudar o código **e** as regras, juntos.
- Origem externa nova (script, fonte, imagem de outro site) precisa entrar na política de segurança
  do `index.html` (a tag `Content-Security-Policy`). Evitar: cada origem a mais é um risco a mais.

## Dados pessoais (LGPD)

- **Nenhum dado de paciente** entra no app, no banco, em teste, em foto ou em conversa.
- O banco guarda o cadastro profissional de cada pessoa. Recurso novo que guarda um dado a mais:
  citar nos Termos e na Política de Privacidade antes de liberar.
- Mudou o texto de `termos.html` ou `privacidade.html`: subir `VERSAO_TERMOS` (js/cadastro.js) e a
  versão escrita no topo das duas páginas. Assim todos aceitam de novo. A conferência de padrões
  acusa se as três não baterem.
- Não pôr nome, e-mail ou dado do Dr. Jonas nem da equipe em pedido a serviço externo, em relatório
  para outra ferramenta ou em mensagem de commit.

## O que não vai para o repositório

Auditoria de segurança, lista de falhas, texto completo das regras, relatório com achados e dados
de teste de segurança. Tudo isso é entregue como arquivo ao Dr. Jonas, fora do repositório.
No commit e no pedido de mudança, descrever a correção sem ensinar a explorar a falha.

## Achou uma falha

Não corrigir em silêncio e não publicar por conta própria. Contar ao Dr. Jonas: o que é, quem
consegue explorar, o que está em risco, e a correção proposta (regra, código ou os dois). Ordem
recomendada quando são os dois: primeiro a regra do banco, que protege as duas versões de uma vez;
depois o código, pelo caminho da skill `publicar`.

Auditoria completa: skill `auditoria`.
