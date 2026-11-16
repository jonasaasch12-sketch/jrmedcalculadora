---
name: remedio
description: Cria, altera ou revisa um card de remédio do JR MED (arquivos em medicamentos/). Use SEMPRE que o pedido falar em remédio, medicamento, dose, posologia, teto ou dose máxima, receita de um card, apresentação, idade mínima, fonte da dose, ficha completa, menu de remédios ou card agrupado, mesmo que pareça só uma troca pequena de texto. Dose errada chega ao paciente.
---

# Card de remédio

Cada card calcula uma dose que um médico vai copiar para a receita de uma criança. Por isso a regra
mais importante vem antes do código.

## 1. Antes de escrever: a fonte

- A dose vem do **Whitebook** (prioridade) ou da **SBP**. O Manual HIAS (2017) é a referência mais antiga.
- **Não inventar dose, teto, intervalo, duração nem idade mínima.** Faltou um desses dados? Perguntar
  ao Dr. Jonas antes de escrever o card.
- Material enviado que trata de adulto: ignorar a parte de adulto.
- Uma conduta ou diretriz diverge de um card que já existe: não mudar o card sem perguntar.
- Remédio cadastrado pela equipe dentro do app (Firebase) não fica nestes arquivos: é outra coisa.

## 2. Onde o card fica

- Um arquivo por categoria: `medicamentos/<categoria>.js`, e o card leva `cat: "cat-<categoria>"`.
- Id só com minúsculas, números e sublinhado: `amox_oma`, `dip_gts`.
- Doença com dose ou tempo de tratamento próprio ganha **card próprio**, com o nome da doença
  (`amox_faringo`, `amox_oma`), no arquivo do sistema. Assim um card nunca muda por causa de outra doença.
- Sintomáticos (antitérmico, antiemético) ficam só em Sintomáticos.

## 3. O modelo

```js
"amox_oma": {
    cat: "cat-respiratorio", sub: "🏠 Uso Ambulatorial (Vias Orais)",
    kw: "amoxicilina dose alta otite media aguda oma ouvido 90 mg 12/12h",   // busca: minúsculas, sem acento
    nome: "Amoxicilina: Otite Média Aguda (dose alta)", apres: "400 mg / 5 mL",
    info: "<strong>Posologia (AAP 2013):</strong> 90 mg/kg/dia de 12/12h (45 mg/kg/dose). Máx. 2 g/dose (4 g/dia).",
    badge: "Máx: 2 g/dose", recLabel: "Texto para selecionar e copiar:",
    calc: (p, i) => {
        let v = Math.min(parseFloat(round05(p * 45 * 5 / 400)), 25), t = String(v).replace('.', ',');
        /* duração AAP: < 2 anos (ou idade não informada) 10 dias; >= 2 anos 7 dias */
        let id = parseFloat(String(i).replace(',', '.')), d = (isNaN(id) || id < 2) ? 10 : 7, tot = Math.ceil(v * 2 * d);
        return { v: v + " mL", r: `${recHead}1) AMOXICILINA SUSPENSÃO 400 MG/5ML ---------- ${tot} ML\nDAR ${t} ML, VIA ORAL, DE 12/12 HORAS POR ${d} DIAS.` };
    },
    detalhes: {
        indicacao: "Otite média aguda (1ª escolha).",
        dose: "90 mg/kg/dia VO de 12/12h (máx. 2 g/dose). < 2 anos: 10 dias; ≥ 2 anos: 7 dias (AAP 2013).",
        atencao: "Idade em branco: a receita sai com 10 dias. Perguntar sobre alergia a penicilina."
    }
}
```

O campo `ficha` (ficha completa) é opcional: `apresentacoes, indicacoes, dose, doseMaxima, via, intervalo,
reconstituicao, diluicao, infusao, alertasPediatricos, contraindicacoes, efeitosAdversos, interacoes,
ajusteRenal, ajusteHepatico, conservacao, fonteRevisao`. A ordem de exibição é fixa e a fonte vem por último.

## 4. O cálculo (`calc`)

- `calc(p, i)`: `p` é o peso em kg (número) e `i` é a idade em anos, **como texto**, que pode vir vazio (`""`).
  Para comparar: `parseFloat(String(i).replace(',', '.'))`, lembrando que vazio vira `NaN`.
- Devolve `{ v, r }`. O `v` é o quadro azul: curto, com o número logo seguido da unidade (`"11.5 mL"`).
  É esse primeiro número que o teste de teto lê.
- **Teto com `Math.min(...)` depois do arredondamento.** Arredondar depois do teto pode passar dele.
- `round05()` arredonda para 0,5 e devolve texto: usar `parseFloat(round05(...))`.
- Comentário dentro do `calc`: `/* */`. Um `//` em função de uma linha apaga o resto da linha.
- **Idade em branco.** Se a dose, a duração ou a indicação dependem da idade, decidir o que o card
  faz quando a idade não foi digitada, e escrever isso em `detalhes.atencao` (como no modelo). Remédio
  com **idade mínima ou contraindicação por idade**: perguntar ao Dr. Jonas qual deve ser o
  comportamento com a idade em branco. Hoje vários cards antigos prescrevem normalmente nesse caso.
- **Recusa.** Quando o card não deve prescrever (idade ou peso fora da faixa):
  `return { v: "Contraind.", r: "ATENÇÃO: ... (motivo e o que usar no lugar)." }`.
- **Sem peso.** O app só chama o `calc` sem peso se o card tiver `ignoraPeso: true`. Nesse caso o
  peso chega como `NaN`, e o cálculo tem de tratar isso. Usar só em card de dose fixa.
- `badgeSt` (selo fixo no lugar do quadro azul): só em card de dose fixa. Com ele o quadro azul não é recalculado.

## 5. A receita (`r`)

**A primeira linha é a via, e nada vem antes dela:** nem emoji, nem título, nem o nome do remédio.
A receita completa agrupa os itens por essa linha. Quando o app não reconhece a via, põe o item
debaixo de "USO ORAL". Isso já aconteceu com injetáveis cuja primeira linha começava com 🚨.
O app reconhece linha que começa com `USO` ou `VIA`, ou que contém `NEBULIZAÇÃO`, `VENÓCLISE`,
`DISPOSITIVOS` ou `ORIENTAÇÕES`.

Receita de casa (ambulatorial): tudo em maiúsculas, item numerado, quantidade no fim da linha.

```
USO ORAL

1) DIPIRONA 500 MG/ML --------------------- 1 FR
DAR 12 GOTAS, VIA ORAL, DE 6/6 HORAS, SE DOR OU FEBRE (TEMPERATURA MAIOR QUE 37,5°C).
```

Prescrição hospitalar: a via na primeira linha (o contexto pode ir entre parênteses) e depois o
preparo em frases, na ordem em que a enfermagem faz.

```
VIA ENDOVENOSA (USO HOSPITALAR - RESPIRATÓRIO)

OPÇÃO 24/24H (100 MG/KG EM DOSE ÚNICA DIÁRIA):
 Reconstituir 1 FA de Ceftriaxona 1 g em 10 mL de AD. Aspirar 10.0 mL, diluir em 25 mL de SF 0,9% e infundir em 30 min, de 24/24h.
```

Em card novo, decimal com vírgula na receita (`String(v).replace('.', ',')`). Muitos cards antigos
ainda usam ponto; não converter os antigos sem o Dr. Jonas pedir, porque muda o texto de muitas receitas.

O `info` segue `<strong>Posologia (FONTE):</strong> ...`. Se o app usa a média de uma faixa, terminar
com `<em>App: dose média de 18,75 mg/kg/dose.</em>`: o card mostra "O app usa a média".

## 6. Depois do card

1. **Menu:** pôr o id em `medicamentos/menu.js`, numa seção só. Repetir em outra seção só quando lá
   ele serve para outra coisa (ivermectina em Pele = sarna; em Parasitoses = verme).
2. **Fonte:** registrar em `medicamentos/fontes.js` (`FONTES_CARDS`), reaproveitando as entradas de
   `REF`. É a mesma referência de onde a dose saiu. Sem fonte, o card não mostra de onde veio a dose.
3. **Teto:** se o card tem dose máxima, acrescentar em `TETOS`, em `testes/verificar.js`, com o
   comentário da conta (`amox_oma: 25, // mL de 400 mg/5 mL = 2 g/dose (AAP)`).
4. **Card agrupado:** o mesmo remédio em várias doenças vira um card só em `medicamentos/grupos.js`
   (`GRUPOS_CARDS`). Injetável leva a linha `DOSE:`; via oral não leva.
5. **Categoria nova (arquivo novo):** `index.html`, `ARQUIVOS_ESSENCIAIS` do `sw.js` e subir `CACHE_NOME`.

## 7. Conferir

```bash
node testes/verificar.js          # card novo aparece como "+ novo": rodar com --atualizar
node testes/conferir-padroes.js   # não pode aparecer desvio novo
```

- Depois do `--atualizar`, ler o diff de `testes/referencia-doses.json`: só o card mexido pode aparecer.
- Mostrar ao Dr. Jonas a receita em três pesos (por exemplo 5, 20 e 50 kg) e, se a idade importa,
  dos dois lados do limite e em branco. **Ele confere a dose antes de publicar.**
- Olhar o card na tela: skill `testar-tela` (`--card ID --peso N --idade N`).
- Publicar: skill `publicar`.

## Alterar um card que já existe

Mostrar o antes e o depois (o diff da referência), dizer a fonte da mudança e esperar a confirmação
do Dr. Jonas. Se o card é usado por uma conduta, avisar: a conduta passa a mostrar a dose nova.
