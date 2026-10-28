// =====================================================
// VÔMITOS — cards com cat: "cat-vomitos"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    "ondif_cp": {
        cat: "cat-vomitos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "ondif ondansetrona filme orodispersivel vomito nausea antiemetico oral ambulatorial", nome: "Ondif Filme (Ondansetrona 4mg)", apres: "4 mg",
        info: "<strong>Posologia (SBP/MS):</strong> 6 meses a 2 anos: 2 mg (usar a solução oral) | > 2 a 10 anos (até 30 kg): 4 mg (1 filme) | > 10 anos ou > 30 kg: 8 mg (2 filmes).", badge: "", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => {
            /* SBP (Diarreia Aguda Infecciosa 2023, Quadro 5) / MS 2023: 6 m-2 anos 2 mg; > 2-10 anos (até 30 kg) 4 mg; > 10 anos (> 30 kg) 8 mg. */
            let id = i !== "" ? parseFloat(i) : null;
            if (id === null && !(p > 30)) return { v: "—", r: "Insira a idade acima para calcular a dose." };
            if (id !== null && id < 0.5) return { v: "Contraind.", r: "ATENÇÃO: Ondansetrona não recomendada em menores de 6 meses." };
            if (id !== null && id <= 2) return { v: "2 mg", r: "6 MESES A 2 ANOS: DOSE DE 2 MG. O FILME TEM 4 MG: USAR A ONDANSETRONA SOLUÇÃO ORAL 4 MG/5 ML (2,5 ML)." };
            let oito = (id !== null && id > 10) || p > 30;
            return {
                v: oito ? "8 mg" : "4 mg",
                r: `${recHead}1) ONDIF 4 MG (FILME ORODISPERSÍVEL) ------- 1 CX\nCOLOCAR ${oito ? "2 FILMES" : "1 FILME"} NA LÍNGUA, DE 8/8H, SE NÁUSEAS OU VÔMITOS.`
            };
        },
        detalhes: {
            indicacao: "Náuseas e vômitos (ex.: gastroenterite).",
            dose: "6 meses a 2 anos: 2 mg (solução oral) | > 2 a 10 anos (até 30 kg): 4 mg (1 filme) | > 10 anos ou > 30 kg: 8 mg (2 filmes). De 8/8h, se náuseas ou vômitos (SBP/MS 2023).",
            atencao: "Não recomendada em menores de 6 meses. Cautela em QT longo."
        }
    },
    "ondan_vo": {
        cat: "cat-vomitos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "ondansetrona solucao xarope vomito nausea antiemetico oral ambulatorial", nome: "Ondansetrona Solução Oral", apres: "4 mg / 5 mL",
        info: "<strong>Posologia (SBP/MS):</strong> 6 meses a 2 anos: 2 mg (2,5 mL) | > 2 a 10 anos (até 30 kg): 4 mg (5 mL) | > 10 anos ou > 30 kg: 8 mg (10 mL). De 8/8h.", badge: "Solução 4mg/5mL", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            /* SBP (Diarreia Aguda Infecciosa 2023, Quadro 5) / MS 2023: 6 m-2 anos 2 mg; > 2-10 anos (até 30 kg) 4 mg; > 10 anos (> 30 kg) 8 mg. 4 mg/5 mL. */
            let id = i !== "" ? parseFloat(i) : null;
            if (id !== null && id < 0.5) return { v: "Contraind.", r: "ATENÇÃO: Uso não recomendado para menores de 6 meses." };
            if (id === null && !(p > 30)) return { v: "—", r: "Insira a idade acima para calcular a dose (6 meses a 2 anos: 2 mg; > 2 a 10 anos: 4 mg)." };
            let mlVal = (id !== null && id > 10) || p > 30 ? "10 mL" : (id <= 2 ? "2,5 mL" : "5 mL");
            return { v: mlVal, r: `${recHead}1) ONDANSETRONA SOLUÇÃO ORAL 4 MG/5ML ------ 1 FR\nOFERECER ${mlVal.toUpperCase()}, VIA ORAL, DE 8/8 HORAS SE NÁUSEAS E VÔMITOS.` };
        },
        detalhes: {
            indicacao: "Náuseas e vômitos (ex.: gastroenterite).",
            dose: "6 meses a 2 anos: 2 mg (2,5 mL) | > 2 a 10 anos (até 30 kg): 4 mg (5 mL) | > 10 anos ou > 30 kg: 8 mg (10 mL). De 8/8h (SBP/MS 2023).",
            atencao: "Não recomendada em menores de 6 meses. Cautela em QT longo."
        }
    },

    "broma_vo": {
        cat: "cat-vomitos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "bromoprida gotas vomito nausea antiemetico oral ambulatorial", nome: "Bromoprida Gotas", apres: "4 mg / mL",
        info: "<strong>Posologia:</strong> 1 gota por kg de peso até de 8/8h.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = Math.min(Math.round(p), 40); return { v: v + " gts", r: `${recHead}1) BROMOPRIDA GOTAS 4 MG/ML --------------- 1 FR\nDAR ${v} GOTAS VIA ORAL ATÉ DE 8/8 HORAS SE NÁUSEAS E VÔMITOS.` }; },
        detalhes: {
            indicacao: "Náuseas e vômitos.",
            dose: "1 gota/kg/dose VO até de 8/8h.",
            atencao: "Máximo 40 gotas por dose. Risco de reação extrapiramidal (distonia), principalmente em crianças pequenas."
        }
    },
    "dramin_vo": {
        cat: "cat-vomitos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "dramin dimenidrinato gotas vomito nausea antiemetico oral ambulatorial", nome: "Dimenidrinato Gotas (Dramin)", apres: "25 mg / mL",
        info: "<strong>Posologia:</strong> A partir de 2 anos. 1 gota por kg de peso de 6/6h.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = Math.min(Math.round(p), 40); return { v: v + " gts", r: `${recHead}1) DIMENIDRINATO GOTAS 25 MG/ML (DRAMIN) -- 1 FR\nDAR ${v} GOTAS VIA ORAL DE 6/6 HORAS SE NÁUSEAS E VÔMITOS.` }; },
        detalhes: {
            indicacao: "Náuseas, vômitos e cinetose.",
            dose: "1 gota/kg/dose VO de 6/6h.",
            atencao: "Liberado a partir de 2 anos. Máximo 40 gotas por dose. Causa sonolência."
        }
    },
    "ondan_ev": {
        cat: "cat-vomitos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "ondansetrona ev vomito nausea hospitalar injetavel", nome: "Ondansetrona EV", apres: "Ampola 2 mg / mL",
        info: "<strong>Conduta:</strong> 0,075 x Peso em mL. Diluir em 50 mL de SF 0,9% EV lento.", badge: "Teto Máx: 8 mg (4 mL)", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = Math.min(p * 0.075, 4).toFixed(2); /* 0,15 mg/kg/dose, teto de 8 mg (4 mL a 2 mg/mL) */ return { v: v + " mL", r: `VIA ENDOVENOSA (ANTIEMÉTICO)\n\n Aspirar ${v} mL de Ondansetrona (2 mg/mL). Diluir em 50 mL de SF 0,9% e infundir por via EV lenta agora.` }; },
        detalhes: {
            indicacao: "Náuseas e vômitos em ambiente hospitalar.",
            dose: "0,15 mg/kg/dose (Peso x 0,075 mL) EV.",
            atencao: "Máximo 8 mg (4 mL) por dose. Cautela em QT longo e distúrbios eletrolíticos."
        }
    },
    "broma_ev": {
        cat: "cat-vomitos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)", 
        kw: "bromoprida ev vomito nausea hospitalar injetavel", nome: "Bromoprida EV", apres: "Ampola 5 mg / mL",
        info: "<strong>Conduta:</strong> 0,03 x Peso em mL + 20 mL de Água Destilada EV.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => { let v = (p * 0.03).toFixed(2); return { v: v + " mL", r: `VIA ENDOVENOSA (ANTIEMÉTICO)\n\n Aspirar ${v} mL de Bromoprida (5 mg/mL). Diluir em 20 mL de AD e infundir por via EV lenta agora.` }; },
        detalhes: {
            indicacao: "Náuseas e vômitos em ambiente hospitalar.",
            dose: "Peso x 0,03 mL (0,15 mg/kg) EV.",
            atencao: "Risco de reação extrapiramidal (distonia)."
        }
    },
    "dramin_sol": {
        cat: "cat-vomitos", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "dramin dimenidrinato solucao oral 2,5 mg/ml vomito nausea antiemetico", nome: "Dimenidrinato Solução Oral (Dramin)", apres: "2,5 mg / mL",
        info: "<strong>Posologia:</strong> 2-6 anos: 5-10 mL; 6-12 anos: 10-20 mL; > 12 anos: 20-40 mL, de 6/6h.", badge: "≥ 2 anos", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => {
            let id = parseFloat(i);
            if (isNaN(id)) return { v: "Digite a idade", r: "Digite a idade: 2-6 anos: 5 a 10 mL; 6-12 anos: 10 a 20 mL; > 12 anos: 20 a 40 mL, de 6/6 horas." };
            if (id < 2) return { v: "< 2 anos", r: "ATENÇÃO: dimenidrinato liberado a partir de 2 anos." };
            let f = id < 6 ? "5 A 10" : id <= 12 ? "10 A 20" : "20 A 40";
            return { v: f.replace(' A ', '-') + " mL", r: `${recHead}1) DIMENIDRINATO SOLUÇÃO ORAL 2,5 MG/ML (DRAMIN) --- 1 FR\nTOMAR ${f} ML DE 6/6 HORAS SE NÁUSEAS OU VÔMITOS.` };
        },
        detalhes: {
            indicacao: "Náuseas, vômitos e cinetose.",
            dose: "2-6 anos: 5-10 mL; 6-12 anos: 10-20 mL; > 12 anos: 20-40 mL, de 6/6h.",
            atencao: "A partir de 2 anos. Causa sonolência."
        }
    },
    "dramin_im": {
        cat: "cat-vomitos", sub: "🏥 Uso Hospitalar (Vias Injetáveis)",
        kw: "dramin dimenidrinato injetavel intramuscular im vomito nausea", nome: "Dimenidrinato IM (Dramin)", apres: "Ampola 50 mg / mL",
        info: "<strong>Conduta:</strong> 0,02 a 0,03 mL/kg (1 a 1,5 mg/kg) IM de 8/8h.", badge: "Máx: 50 mg/dose", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let a = Math.min(p * 0.02, 1), b = Math.min(p * 0.03, 1);
            return { v: `${a.toFixed(2)}-${b.toFixed(2)} mL`, r: `VIA INTRAMUSCULAR\n\n1) DIMENIDRINATO 50 MG/ML: aplicar ${a.toFixed(2)} a ${b.toFixed(2)} mL (${(a * 50).toFixed(0)} a ${(b * 50).toFixed(0)} mg) IM, de 8/8 horas, se náuseas ou vômitos.` };
        },
        detalhes: {
            indicacao: "Náuseas e vômitos (uso hospitalar).",
            dose: "0,02 a 0,03 mL/kg (1 a 1,5 mg/kg) IM de 8/8h.",
            atencao: "Teto do app: 50 mg (1 mL) por dose. Causa sonolência."
        }
    }
});
