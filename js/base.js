// Funções auxiliares usadas dentro dos cálculos dos cards (carregar antes de medicamentos/).

const recHead = "USO ORAL\n\n";

// CEFTRIAXONA: monta as duas opções de esquema (24/24h e 12/12h) usadas nos cards.
// Dose do dia de 100 mg/kg: em dose única (24/24h) ou dividida em 2 (50 mg/kg de 12/12h).
// Teto de 2 g/dia: até 2 g de 24/24h ou até 1 g de 12/12h. Cada FA tem 1 g, então acima de 1 g pede 2 FA.
function opcaoCeftriaxona(p, intervalo, via, diluicaoSF) {
    let mgDose = Math.min(p * (intervalo === 24 ? 100 : 50), intervalo === 24 ? 2000 : 1000);
    let nFA = mgDose > 1000 ? 2 : 1;
    let titulo = intervalo === 24 ? "OPÇÃO 24/24H (100 MG/KG EM DOSE ÚNICA DIÁRIA)" : "OPÇÃO 12/12H (100 MG/KG/DIA DIVIDIDO: 50 MG/KG/DOSE)";
    if (via === "IM") {
        let ml = mgDose / 285.7; // 1 g + 3,5 mL de lidocaína 1%
        let fa = nFA === 2 ? "2 FA de Ceftriaxona 1 g, cada um com 3,5 mL" : "1 FA de Ceftriaxona 1 g com 3,5 mL";
        return { ml, texto: `${titulo}:\n Reconstituir ${fa} de Lidocaína 1%. Aspirar ${ml.toFixed(1)} mL e aplicar por via IM profunda, de ${intervalo}/${intervalo}h.` };
    }
    let ml = mgDose / 100; // 1 g em 10 mL de AD
    let fa = nFA === 2 ? "2 FA de Ceftriaxona 1 g, cada um em 10 mL de AD" : "1 FA de Ceftriaxona 1 g em 10 mL de AD";
    return { ml, texto: `${titulo}:\n Reconstituir ${fa}. Aspirar ${ml.toFixed(1)} mL, diluir em ${Math.ceil(diluicaoSF(ml))} mL de SF 0,9% e infundir em 30 min, de ${intervalo}/${intervalo}h.` };
}

function calcCeftriaxona(p, cabecalho, via, primeiro, diluicaoSF) {
    let a = opcaoCeftriaxona(p, primeiro, via, diluicaoSF);
    let b = opcaoCeftriaxona(p, primeiro === 24 ? 12 : 24, via, diluicaoSF);
    return {
        v: `${primeiro}/${primeiro}h: ${a.ml.toFixed(1)} mL\n${primeiro === 24 ? 12 : 24}/${primeiro === 24 ? 12 : 24}h: ${b.ml.toFixed(1)} mL`,
        r: `${cabecalho}\n\n${a.texto}\n\n${b.texto}`
    };
}
const round05 = (val) => (Math.round(val * 2) / 2).toFixed(1);

function toggleSenha() {
    const senhaInput = document.getElementById('senhaInput');
    senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
}

function copiarTexto(idBtn, idBox) {
    const caixaTexto = document.getElementById('rec-' + idBox);
    const textoParaCopiar = caixaTexto.innerText;
    const botao = document.getElementById(idBtn);

    navigator.clipboard.writeText(textoParaCopiar).then(() => {
        let textoOriginal = botao.innerHTML;
        botao.innerHTML = "✓ Copiar";
        botao.classList.add("copiado");

        setTimeout(() => {
            botao.innerHTML = textoOriginal;
            botao.classList.remove("copiado");
        }, 1500);
    }).catch(err => {
        alert("Erro ao tentar copiar o texto.");
    });
}
