// =====================================================
// ESPECIALIDADES — cards com cat: "cat-especialidades"
// Cada remédio é um bloco só: card (nome, apresentação, cálculo e texto
// da receita) + "detalhes" (Indicação/Dose/Atenção abaixo do nome) +
// "ficha" (📋 Ficha completa padrão). Onde ele aparece no menu fica em
// medicamentos/menu.js.
// =====================================================
registrarMedicamentos({
    "espec_otociriax": {
        cat: "cat-especialidades", sub: "🏠 Tópicos Otológicos", 
        kw: "otociriax ciprofloxacino ouvido otite", nome: "Otociriax Gotas", apres: "Uso Otológico",
        info: "<strong>Conduta:</strong> 3 gotas no ouvido de 12/12h por 7 dias.", badgeSt: "static-blue", badge: "3 Gotas", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "3 Gotas", r: `USO OTOLÓGICO\n\n1) OTOCIRIAX GOTAS --------------------------------- 1 FR\nAPLICAR 03 GOTAS NO OUVIDO, DE 12 EM 12 HORAS, DURANTE 7 DIAS.` }),
        detalhes: {
            indicacao: "Otite externa.",
            dose: "3 gotas no ouvido afetado de 12/12h por 7 dias.",
            atencao: "Não usar se houver suspeita de perfuração da membrana timpânica."
        }
    },
    "espec_cerumin": {
        cat: "cat-especialidades", sub: "🏠 Tópicos Otológicos", 
        kw: "cerumin ouvido cera lavagem", nome: "Cerumin Gotas", apres: "Uso Otológico",
        info: "<strong>Conduta:</strong> 3 gotas de 8/8h por 7 dias.", badgeSt: "static-blue", badge: "3 Gotas", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "3 Gotas", r: `USO OTOLÓGICO\n\n1) CERUMIN GOTAS --------------------------------- 1 FR\nAPLICAR 03 GOTAS NO OUVIDO, DE 8 EM 8 HORAS, POR 7 DIAS (ANTES DA LAVAGEM).` }),
        detalhes: {
            indicacao: "Cerume impactado (amolecer antes da lavagem).",
            dose: "3 gotas no ouvido de 8/8h por 7 dias.",
            atencao: "Não usar se houver perfuração timpânica ou otite."
        }
    },
    "espec_tobra": {
        cat: "cat-especialidades", sub: "🏠 Tópicos Oftalmológicos", 
        kw: "tobramicina colirio olho conjuntivite", nome: "Tobramicina Colírio", apres: "Uso Oftalmológico",
        info: "<strong>Conduta:</strong> 1 gota de 6/6h por 7 dias.", badgeSt: "static-blue", badge: "1 Gota", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "1 Gota", r: `USO OFTALMOLÓGICO\n\n1) TOBRAMICINA COLÍRIO --------------------------------- 1 FR\nAPLICAR 1 GOTA EM CADA OLHO, DE 6/6 HORAS, POR 7 DIAS.` }),
        detalhes: {
            indicacao: "Conjuntivite bacteriana.",
            dose: "1 gota em cada olho de 6/6h por 7 dias.",
            atencao: "Lavar as mãos antes e depois. Reavaliar se não melhorar em 48 a 72h."
        }
    },
    "espec_tobra_dexa": {
        cat: "cat-especialidades", sub: "🏠 Tópicos Oftalmológicos", 
        kw: "tobramicina dexametasona tobradex colirio olho conjuntivite alergia", nome: "Tobramicina + Dexametasona", apres: "Colírio",
        info: "<strong>Conduta:</strong> 1 gota de 6/6h por 7 dias.", badgeSt: "static-blue", badge: "1 Gota", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "1 Gota", r: `USO OFTALMOLÓGICO\n\n1) TOBRAMICINA + DEXAMETASONA COLÍRIO ------------------ 1 FR\nAPLICAR 1 GOTA EM CADA OLHO, DE 6/6 HORAS, POR 7 DIAS.` }),
        detalhes: {
            indicacao: "Conjuntivite bacteriana com inflamação importante.",
            dose: "1 gota em cada olho de 6/6h por 7 dias.",
            atencao: "Contém corticoide: evitar se houver suspeita de herpes ocular. Não prolongar o uso."
        }
    },
    "espec_lacribell": {
        cat: "cat-especialidades", sub: "🏠 Tópicos Oftalmológicos", 
        kw: "lacribell colirio olho lubrificante lagrima", nome: "Lacribell Colírio", apres: "Uso Oftalmológico",
        info: "<strong>Conduta:</strong> 1 gota de 4/4h por 10 dias.", badgeSt: "static-blue", badge: "1 Gota", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: () => ({ v: "1 Gota", r: `USO OFTALMOLÓGICO\n\n1) LACRIBELL COLÍRIO --------------------------------- 1 FR\nAPLICAR 1 GOTA EM CADA OLHO, DE 4/4 HORAS, POR 10 DIAS.` }),
        detalhes: {
            indicacao: "Olho seco e irritação ocular (lubrificante).",
            dose: "1 gota em cada olho de 4/4h por 10 dias.",
            atencao: "Sem contraindicação importante."
        }
    },
    "sulfato_ferroso": {
        cat: "cat-especialidades", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "sulfato ferroso ferro anemia ferropriva gotas antianemico tratamento", nome: "Sulfato Ferroso Gotas (Tratamento)", apres: "124,45 mg/mL = 25 mg/mL de ferro elementar (1 gota = 1 mg)",
        info: "<strong>Posologia:</strong> 3-6 mg de ferro elementar/kg/dia de 12/12 ou 24/24h, por 6 meses. Máx. 80 gotas/dia.", badge: "Máx: 80 gotas/dia", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            // Whitebook - tratamento da anemia ferropriva: 3-6 mg de ferro elementar/kg/dia VO de 12/12 ou 24/24h, por 6 meses
            // ou até reposição dos estoques. Gotas 124,45 mg/mL (1 gota = 1 mg de ferro elementar). Dose máxima na pediatria: 80 gotas/dia.
            let min = Math.min(Math.round(p * 3), 80), max = Math.min(Math.round(p * 6), 80);
            return { v: `${min}-${max} gts/dia`, r: `${recHead}1) SULFATO FERROSO GOTAS 25 MG/ML (FERRO ELEMENTAR) -- 1 FR\nDAR ${min} A ${max} GOTAS POR DIA, VIA ORAL, EM DOSE ÚNICA (24/24 HORAS) OU DIVIDIDO DE 12/12 HORAS, POR 6 MESES.\nTOMAR COM O ESTÔMAGO VAZIO, COM ÁGUA OU SUCO CÍTRICO. NÃO DAR COM LEITE OU DERIVADOS.` };
        },
        detalhes: {
            indicacao: "Tratamento de anemia ferropriva.",
            dose: "3-6 mg de ferro elementar/kg/dia VO de 12/12 ou 24/24h, por 6 meses ou até reposição dos estoques corporais. 1 gota = 1 mg de ferro elementar.",
            atencao: "Dose máxima na pediatria: 80 gotas/dia (80 mg/dia). Tomar com estômago vazio, com água ou sucos cítricos. Não administrar com leite ou produtos lácteos."
        },
        ficha: {
            indicacoes: "Reposição de ferro: tratamento de anemia ferropriva.",
            dose: "Tratamento de anemia ferropriva: 3-6 mg de ferro elementar/kg/dia VO de 12/12 ou 24/24 horas, por 6 meses ou até reposição dos estoques corporais",
            doseMaxima: "Dose máxima na pediatria: 80 gotas/dia (80 mg/dia).",
            apresentacoes: "Comprimido revestido 121,72 mg, 121,75 mg, 124,4 mg e 125,545 mg (= 40 mg de ferro elementar), 152,19 mg (= 50 mg) e 190 mg (= 60 mg); drágea 190 mg (= 60 mg); solução oral 124,45 mg/mL e 125 mg/mL (= 25 mg/mL de ferro elementar) e 68 mg/mL (= 13,668 mg/mL); xarope 25 mg/mL (= 5 mg/mL e 5,025 mg/mL de ferro elementar) e 50 mg/mL (= 10 mg/mL).",
            via: "Oral.",
            intervalo: "12/12 ou 24/24 horas.",
            alertasPediatricos: "Tomar com estômago vazio, com água ou sucos cítricos para melhor absorção. Não administrar com leite ou produtos lácteos.",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Sulfato Ferroso, atualizado em 14/08/2025."
        }
    },
    "sulfato_ferroso_prof": {
        cat: "cat-especialidades", sub: "🏠 Uso Ambulatorial (Vias Orais)",
        kw: "sulfato ferroso ferro profilaxia anemia ferropriva sbp prematuro baixo peso suplementacao gotas", nome: "Sulfato Ferroso Gotas (Profilaxia - SBP 2021)", apres: "124,45 mg/mL = 25 mg/mL de ferro elementar (1 gota = 1 mg)",
        info: "<strong>Profilaxia (SBP 2021):</strong> 1 mg/kg/dia no termo AIG; 2-4 mg/kg/dia no baixo peso e prematuro (1-12 meses).", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            // Whitebook - profilaxia da anemia ferropriva (SBP 2021), VO de 24/24h:
            // termo AIG: 1 mg/kg/dia (6-24 meses sem fatores de risco; 3-24 meses com fatores de risco);
            // termo < 2.500 g ou prematuro > 1.500 g: 2 mg/kg/dia; prematuro 1.000-1.500 g: 3 mg/kg/dia; prematuro < 1.000 g: 4 mg/kg/dia (1-12 meses); depois 1 mg/kg/dia (12-24 meses).
            let g = n => Math.min(Math.round(p * n), 80);
            return { v: `${g(1)} gts/dia`, r: `${recHead}1) SULFATO FERROSO GOTAS 25 MG/ML (FERRO ELEMENTAR) -- 1 FR\nDAR ${g(1)} GOTAS (1 MG/KG/DIA), VIA ORAL, 1 VEZ AO DIA.\nTOMAR COM O ESTÔMAGO VAZIO, COM ÁGUA OU SUCO CÍTRICO. NÃO DAR COM LEITE OU DERIVADOS.\n\n* Outras doses de profilaxia (SBP 2021), de 1 a 12 meses: 2 mg/kg/dia = ${g(2)} gotas (termo < 2.500 g ou prematuro > 1.500 g); 3 mg/kg/dia = ${g(3)} gotas (prematuro 1.000-1.500 g); 4 mg/kg/dia = ${g(4)} gotas (prematuro < 1.000 g). De 12 a 24 meses: 1 mg/kg/dia.` };
        },
        detalhes: {
            indicacao: "Profilaxia da anemia ferropriva (protocolo da Sociedade Brasileira de Pediatria - 2021).",
            dose: "Termo AIG: 1 mg/kg/dia de 6 a 24 meses (sem fatores de risco) ou de 3 a 24 meses (com fatores de risco). Termo < 2.500 g ou prematuro > 1.500 g: 2 mg/kg/dia; prematuro 1.000-1.500 g: 3 mg/kg/dia; prematuro < 1.000 g: 4 mg/kg/dia, de 1 a 12 meses; depois 1 mg/kg/dia de 12 a 24 meses. VO de 24/24h.",
            atencao: "Dose máxima na pediatria: 80 gotas/dia. Tomar com estômago vazio, com água ou sucos cítricos. Não administrar com leite ou produtos lácteos."
        },
        ficha: {
            indicacoes: "Profilaxia da anemia ferropriva (protocolo da Sociedade Brasileira de Pediatria - 2021).",
            dose: "Termo AIG, aleitamento exclusivo até o 6º mês, sem fatores de risco: 1 mg/kg/dia VO de 24/24 horas, dos 6 aos 24 meses\nTermo AIG com fatores de risco (qualquer alimentação): 1 mg/kg/dia, dos 3 aos 24 meses\nTermo < 2.500 g: 2 mg/kg/dia de 1-12 meses; depois 1 mg/kg/dia de 12-24 meses\nPrematuro > 1.500 g: 2 mg/kg/dia de 1-12 meses; depois 1 mg/kg/dia de 12-24 meses\nPrematuro 1.000-1.500 g: 3 mg/kg/dia de 1-12 meses; depois 1 mg/kg/dia de 12-24 meses\nPrematuro < 1.000 g: 4 mg/kg/dia de 1-12 meses; depois 1 mg/kg/dia de 12-24 meses",
            doseMaxima: "Dose máxima na pediatria: 80 gotas/dia (80 mg/dia).",
            apresentacoes: "Gotas 124,45 mg/mL (= 25 mg/mL de ferro elementar; 1 gota = 1 mg).",
            via: "Oral.",
            intervalo: "24/24 horas.",
            alertasPediatricos: "Tomar com estômago vazio, com água ou sucos cítricos para melhor absorção. Não administrar com leite ou produtos lácteos.",
            fonteRevisao: "Whitebook (Afya) - Drogas Pediátricas: Sulfato Ferroso, atualizado em 14/08/2025."
        }
    },
    "hexomedine": {
        cat: "cat-especialidades", sub: "🏠 Tópicos Orais (Orofaringe)",
        kw: "hexomedine colutorio spray garganta dor de garganta orofaringe faringite hexamidina tetracaina antisseptico anestesico local",
        nome: "Hexomedine Colutório Spray", apres: "Hexamidina 1 mg/mL + Tetracaína 0,5 mg/mL",
        info: "<strong>Conduta:</strong> 3 jatos do spray na orofaringe de 4/4h, por no máximo 5 dias. Contraindicado < 3 anos.", badgeSt: "static-blue", badge: "3 Jatos", recLabel: "Texto para selecionar e copiar:", ignoraPeso: true,
        calc: (p, i) => {
            let alerta = (i !== "" && parseFloat(i) < 3) ? "ATENÇÃO: MEDICAMENTO CONTRAINDICADO PARA MENORES DE 3 ANOS.\n\n" : "";
            return { v: "3 Jatos", r: `${alerta}USO TÓPICO ORAL\n\n1) HEXOMEDINE COLUTÓRIO SPRAY ----------------------- 1 FR\nAPLICAR 3 JATOS NA CAVIDADE BUCAL, DIRECIONANDO O APLICADOR PARA A OROFARINGE, DE 4/4 HORAS, POR ATÉ 5 DIAS. NÃO USAR ANTES DE SE ALIMENTAR OU DE INGERIR BEBIDAS.` };
        },
        detalhes: {
            indicacao: "Antisséptico e anestésico local da orofaringe.",
            dose: "Ver 📋 Ficha completa, abaixo.",
            atencao: "Contraindicado para menores de 3 anos. Máximo 5 dias. Não usar antes de comer ou beber."
        },
        ficha: {
            apresentacoes: "Colutório: isetionato de hexamidina 1 mg/mL + cloridrato de tetracaína 0,5 mg/mL, frasco-spray com 50 mL (Hexomedine®).",
            indicacoes: "Antisséptico (hexamidina, grupo das diaminas) e anestésico local (tetracaína) de uso na orofaringe.",
            dose: "Dose usual: 3 jatos (aplicações do spray) de 4/4 horas, na cavidade bucal, direcionando o aplicador para a orofaringe.",
            via: "Tópica oral (spray na orofaringe).",
            intervalo: "4/4 horas, por no máximo 5 dias.",
            alertasPediatricos: "Contraindicado para menores de 3 anos. Não administrar antes da alimentação ou da ingestão de bebidas. Monitorar sinais de hipersensibilidade e reações adversas sistêmicas (neurológicas e cardiovasculares).",
            contraindicacoes: "Menores de 3 anos.",
            efeitosAdversos: "Hipersensibilidade; reações adversas sistêmicas (neurológicas e cardiovasculares).",
            fonteRevisao: "Whitebook (Afya) - Medicamentos/Bulário: Isetionato de Hexamidina + Cloridrato de Tetracaína, atualizado em 30/10/2025. No Whitebook a dose aparece como \"3 nebulizações\"; trata-se de 3 jatos do spray (correção do Dr. Jonas)."
        }
    },
    "hemacias": {
        cat: "cat-especialidades", sub: "🏥 Uso Hospitalar (Hemoderivados)",
        kw: "concentrado de hemacias transfusao anemia hemoderivado sangue", nome: "Concentrado de Hemácias", apres: "1 unidade = 250 a 300 mL",
        info: "<strong>Conduta:</strong> 10-15 mL/kg em 1 a 2 horas (máx. 4h).", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let a = Math.round(p * 10), b = Math.round(p * 15);
            return { v: `${a}-${b} mL`, r: `HEMOTRANSFUSÃO\n\n Transfundir ${a} a ${b} mL de Concentrado de Hemácias (10 a 15 mL/kg) EV, em 1 a 2 horas (não ultrapassar 4 horas).\n Não exceder 20 a 30 mL/kg/hora.\n Dosar Hb/Ht 1 a 2 horas após a transfusão.` };
        },
        detalhes: {
            indicacao: "Anemia com indicação de transfusão.",
            dose: "10-15 mL/kg EV em 1 a 2 horas.",
            atencao: "Não ultrapassar 4 horas nem 20-30 mL/kg/hora. Dosar Hb/Ht 1 a 2 horas depois."
        }
    },
    "plaquetas": {
        cat: "cat-especialidades", sub: "🏥 Uso Hospitalar (Hemoderivados)",
        kw: "concentrado de plaquetas transfusao plaquetopenia hemoderivado", nome: "Concentrado de Plaquetas", apres: "1 unidade = 50 a 70 mL",
        info: "<strong>Conduta:</strong> 1 unidade a cada 7-10 kg. Menores de 15 kg: 5-10 mL/kg. Em 30 min.", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            if (p < 15) { let a = Math.round(p * 5), b = Math.round(p * 10); return { v: `${a}-${b} mL`, r: `HEMOTRANSFUSÃO\n\n Transfundir ${a} a ${b} mL de Concentrado de Plaquetas (5 a 10 mL/kg) EV, em 30 minutos.\n Não exceder 20 a 30 mL/kg/hora.\n Dosar plaquetas 1 hora após a transfusão.` }; }
            let u = Math.max(1, Math.round(p / 10)), u2 = Math.max(1, Math.round(p / 7));
            return { v: `${u}-${u2} unid.`, r: `HEMOTRANSFUSÃO\n\n Transfundir ${u} a ${u2} unidades de Concentrado de Plaquetas (1 unidade a cada 7 a 10 kg) EV, em 30 minutos.\n Não exceder 20 a 30 mL/kg/hora.\n Dosar plaquetas 1 hora após a transfusão.` };
        },
        detalhes: {
            indicacao: "Plaquetopenia com indicação de transfusão (falência medular, procedimentos).",
            dose: "1 unidade a cada 7-10 kg. Menores de 15 kg: 5-10 mL/kg. Em 30 minutos.",
            atencao: "Não transfundir em plaquetopenia imune (PTI, dengue) sem sangramento grave."
        }
    },
    "plasma": {
        cat: "cat-especialidades", sub: "🏥 Uso Hospitalar (Hemoderivados)",
        kw: "plasma fresco congelado pfc transfusao coagulopatia hemoderivado", nome: "Plasma Fresco Congelado", apres: "Bolsa",
        info: "<strong>Conduta:</strong> 10-20 mL/kg, correr aberto (máx. 1 hora).", badge: "", recLabel: "Texto para selecionar e copiar:",
        calc: (p) => {
            let a = Math.round(p * 10), b = Math.round(p * 20);
            return { v: `${a}-${b} mL`, r: `HEMOTRANSFUSÃO\n\n Transfundir ${a} a ${b} mL de Plasma Fresco Congelado (10 a 20 mL/kg) EV, correndo aberto, em no máximo 1 hora.` };
        },
        detalhes: {
            indicacao: "Coagulopatia com sangramento ou antes de procedimento.",
            dose: "10-20 mL/kg EV, correndo aberto.",
            atencao: "Tempo máximo de 1 hora."
        }
    }
});
