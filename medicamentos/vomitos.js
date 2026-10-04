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
        info: "<strong>Posologia:</strong> <2 anos: Contraindicado | 2-11 anos: 4mg (1 filme) | >11 anos: 8mg (2 filmes).", badge: "", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => {
            let id = i !== "" ? parseFloat(i) : null;
            
            // Fallback de segurança: se o médico colocar só o peso e esquecer a idade (2 anos ≈ 12kg, 11 anos ≈ 35kg)
            if (id === null && p) {
                if (p < 12) id = 1;
                else if (p <= 35) id = 5;
                else id = 12;
            }

            if (id === null) return { v: "—", r: "Insira a idade acima para calcular a dose." };

            if (id < 2) return { v: "Contraind.", r: "ATENÇÃO: Uso de Ondif contraindicado para menores de 2 anos segundo protocolo selecionado." };

            let doseMg = id > 11 ? "8 mg" : "4 mg";
            let qtdFilme = id > 11 ? "2 FILMES" : "1 FILME";

            return {
                v: doseMg,
                r: `${recHead}1) ONDIF 4 MG (FILME ORODISPERSÍVEL) ------- 1 CX\nCOLOCAR ${qtdFilme} NA LÍNGUA, DE 8/8H, SE NÁUSEAS OU VÔMITOS.`
            };
        },
        detalhes: {
            indicacao: "Náuseas e vômitos (ex.: gastroenterite).",
            dose: "2-11 anos: 4 mg (1 filme) | >11 anos: 8 mg (2 filmes). De 8/8h, se náuseas ou vômitos.",
            atencao: "Contraindicado em menores de 2 anos (protocolo do app). Cautela em QT longo."
        }
    },
    "ondan_vo": {
        cat: "cat-vomitos", sub: "🏠 Uso Ambulatorial (Vias Orais)", 
        kw: "ondansetrona solucao xarope vomito nausea antiemetico oral ambulatorial", nome: "Ondansetrona Solução Oral", apres: "4 mg / 5 mL",
        info: "<strong>Posologia:</strong> 10-11kg: 2ml | 12-14kg: 2.5ml | 15-18kg: 3.5ml | 19-23kg: 4.3ml | 24-29kg: 5ml (8/8h).", badge: "Solução 4mg/5mL", recLabel: "Texto para selecionar e copiar:",
        calc: (p, i) => {
            if (i !== "" && parseFloat(i) < 0.5) return { v: "Contraind.", r: "ATENÇÃO: Uso não recomendado para menores de 6 meses." };
            let pNum = parseFloat(p);
            let mlVal = "2.0 mL";
            if (pNum >= 24) mlVal = "5.0 mL";
            else if (pNum >= 19) mlVal = "4.3 mL";
            else if (pNum >= 15) mlVal = "3.5 mL";
            else if (pNum >= 12) mlVal = "2.5 mL";
            else mlVal = "2.0 mL";

            return { v: mlVal, r: `${recHead}1) ONDANSETRONA SOLUÇÃO ORAL 4 MG/5ML ------ 1 FR\nOFERECER ${mlVal}, VIA ORAL, DE 8/8 HORAS SE NÁUSEAS E VÔMITOS.` };
        },
        detalhes: {
            indicacao: "Náuseas e vômitos (ex.: gastroenterite).",
            dose: "10-11kg: 2 mL | 12-14kg: 2,5 mL | 15-18kg: 3,5 mL | 19-23kg: 4,3 mL | ≥24kg: 5 mL. De 8/8h.",
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
    }
});
