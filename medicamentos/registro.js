// =====================================================
// REGISTRO DOS MEDICAMENTOS
// Cada arquivo de medicamentos/ chama registrarMedicamentos({...}).
// Os campos "detalhes" e "ficha" de cada card são separados aqui nos
// objetos que o resto do app usa (detalhesMedicacoes e fichasPadrao).
// =====================================================
const farmaciaJR = {};
const detalhesMedicacoes = {};
const fichasPadrao = {};

function registrarMedicamentos(lista) {
    for (const [id, med] of Object.entries(lista)) {
        if (farmaciaJR[id]) throw new Error("Medicamento repetido: " + id);
        if (med.detalhes) detalhesMedicacoes[id] = med.detalhes;
        if (med.ficha) fichasPadrao[id] = med.ficha;
        delete med.detalhes;
        delete med.ficha;
        farmaciaJR[id] = med;
    }
}
