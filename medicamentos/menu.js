// =====================================================
// MENU: categorias → seções → remédios (ids dos cards), na ordem em que aparecem.
// Um mesmo remédio pode aparecer em mais de uma seção.
// =====================================================
// ÁRVORE DE CATEGORIAS ORGANIZADA POR PATOLOGIAS (DIAGNÓSTICOS)
const categorias = [
    { 
        id: "cat-exame-fisico", titulo: "Exame Físico e Orientações", dotClass: "dot-exame", cor: "tarja-exame", nome: "Exame Físico", icone: "📋 Exame Físico",
        patologias: [
            { nome: "Avaliação Geral", remedios: ["exame_masculino", "exame_feminino"] },
            { nome: "Orientações de Alta", remedios: ["orientacoes_gerais", "orientacoes_geca", "orientacoes_bva"] }
        ]
    },
    { 
        id: "cat-sintomaticos", titulo: "Sintomáticos", dotClass: "dot-sintomaticos", cor: "tarja-sintomaticos", nome: "Sintomáticos", icone: "💊 Sintom.",
        patologias: [
            { nome: "Febre e Dor (Vias Orais)", remedios: ["dip_gts", "dip_xpe", "pct_gts", "pct_bebe", "ibu_gts", "ibu_50", "ceto_oral"] },
            { nome: "Cólicas e Distensão Abdominal", remedios: ["buscopan", "buscopan_composto", "simet", "colikids"] },
            { nome: "Dor Moderada a Intensa (Via Oral)", remedios: ["tramadol_gts"] },
            { nome: "Analgesia e Antitérmico Hospitalar", remedios: ["dip_inj", "buscopan_composto_ev"] }
        ]
    },
    { 
        id: "cat-vomitos", titulo: "Vômitos", dotClass: "dot-diarreia", cor: "tarja-diarreia", nome: "Vômitos", icone: "🤮 Vômitos",
        patologias: [
            { nome: "Náuseas e Vômitos (Ambulatorial)", remedios: ["ondif_cp", "ondan_vo", "broma_vo", "dramin_vo"] },
            { nome: "Náuseas e Vômitos (Hospitalar)", remedios: ["ondan_ev", "broma_ev"] }
        ]
    },
    { 
        id: "cat-antialergicos", titulo: "Antialérgicos", dotClass: "dot-alergias", cor: "tarja-alergias", nome: "Antialérgicos", icone: "🤧 Alerg.",
        patologias: [
            { nome: "Prurido e Rinite (Vias Orais)", remedios: ["hixizine", "dexclor", "deslo", "loratadina"] },
            { nome: "Anafilaxia (Emergência)", remedios: ["adrenalina_im"] },
            { nome: "Urticária / Reação Alérgica (Hospitalar)", remedios: ["prometa"] }
        ]
    },
    { 
        id: "cat-respiratorio", titulo: "Respiratório", dotClass: "dot-respiratorio", cor: "tarja-respiratorio", nome: "Respiratório", icone: "🫁 Resp",
        patologias: [
            { nome: "Lavagem Nasal", remedios: ["soro_nasal"] },
            { 
                nome: "Asma", 
                remedios: [
                    // Prescrição Ambulatorial
                    "clenil_hfa", "pred_sol", "salb_spray",
                    // Prescrição para Emergência
                    "salb_spray", "pred_sol", "metil", "magnesio_ev",
                    // Adicionados (manual HIAS)
                    "fenoterol_spray", "fenoterol_gts"
                ] 
            },
            { 
                nome: "Pneumonia", 
                remedios: [
                    // Prescrição Ambulatorial
                    "amox", "amox400", "clav", "azi_oral",
                    // Prescrição Hospitalar
                    "ampicilina", "pen_cristalina_pac", "cef_resp_ev", "cef_resp_im", "azi_ev", "genta"
                ] 
            },
            { nome: "Tosse (Antitussígenos e Expectorantes)", remedios: ["koid_d", "torante", "acebrofilina"] },
            { nome: "Laringite Viral Aguda (Crupe)", remedios: ["dexa_crupe", "adrenalina_neb"] },
            { nome: "Manejo Avançado e Outros Respiratórios", remedios: ["pulmicort", "hidro_ev", "ipra"] }
        ]
    },
    { 
        id: "cat-antibioticos", titulo: "Antibióticos", dotClass: "dot-antibioticos", cor: "tarja-antibioticos", nome: "Antibióticos", icone: "🦠 ATB",
        patologias: [
            { nome: "Infecções de Vias Aéreas e Partes Moles", remedios: ["amox", "amox400", "clav"] },
            { nome: "Faringite / Amigdalite (Dose Única)", remedios: ["benza"] },
            { nome: "Outros Antibióticos Orais", remedios: ["cefadroxila", "pen_v", "smx_tmp", "metronidazol_vo", "cipro_vo"] },
            { nome: "Antibióticos Hospitalares (EV)", remedios: ["amicacina", "cefalotina", "cefepime", "ceftazidima", "cipro_ev", "clindamicina", "meropenem", "metronidazol_ev", "oxacilina", "pen_cristalina", "vancomicina"] }
        ]
    },
    { 
        id: "cat-rsi", titulo: "RSI", dotClass: "dot-rsi", cor: "tarja-rsi", nome: "RSI", icone: "💉 RSI",
        patologias: [
            { nome: "Escolha de Material e Dispositivos", remedios: ["rsi_tubo"] },
            { nome: "Pré-medicação e Indução em Bólus", remedios: ["atropina", "rsi_lido", "rsi_fent", "rsi_ceta", "rsi_midaz", "rsi_roc", "rsi_succi"] },
            { nome: "Manutenção por Infusão Contínua", remedios: ["rsi_cont_morfina", "rsi_cont_cetamina", "rsi_cont_clonidina", "rsi_cont_precedex", "rsi_cont_rocuronio", "rsi_cont_pancuronio", "rsi_cont_lidocaina", "rsi_cont_propofol"] }
        ]
    },
    { 
        id: "cat-pals", titulo: "Urgência PALS", dotClass: "dot-sintomaticos", cor: "tarja-sintomaticos", nome: "PALS", icone: "🚨 PALS",
        patologias: [
            { nome: "Parada e Arritmias", remedios: ["atropina", "adenosina_pals", "amiodarona_pals", "epinefrina_pals", "glicose_pals", "lidocaina_pals", "magnesio_pals", "milrinone_pals", "naloxona_pals", "procainamida_pals", "bicarbonato_pals"] }
        ]
    },
    { 
        id: "cat-neuro", titulo: "Neuro", dotClass: "dot-neuro", cor: "tarja-neuro", nome: "Neuro", icone: "🧠 Neuro",
        patologias: [
            { nome: "Crise Convulsiva Aguda", remedios: ["neuro_diaz", "neuro_midaz", "neuro_fenitoina", "fenobarbital"] },
            { nome: "Anticonvulsivantes de Manutenção", remedios: ["fenobarbital_gts"] },
            { nome: "Sedação para Exames", remedios: ["hidrato_cloral"] }
        ]
    },
    { 
        id: "cat-urinario", titulo: "Urinário", dotClass: "dot-urinario", cor: "tarja-urinario", nome: "Urinário", icone: "🧬 Urina",
        patologias: [
            { nome: "Infecção do Trato Urinário (ITU) e Cistite", remedios: ["urina_clav", "urina_cefa", "urina_ceft"] },
            { nome: "Síndrome Nefrítica / Edema (GNPE)", remedios: ["urina_furo"] }
        ]
    },
    { 
        id: "cat-diarreia", titulo: "TGI", dotClass: "dot-diarreia", cor: "tarja-diarreia", nome: "TGI", icone: "💧 TGI",
        patologias: [
            { nome: "Gastroenterite e Reidratação Oral", remedios: ["tgi_sro", "tgi_zinco", "tgi_provance_mini", "tiorfan", "ondif_cp", "tgi_provance_gg", "tgi_flora", "tgi_azitro", "tgi_alben", "tgi_meben", "nitazoxanida"] },
            { nome: "Constipação, Refluxo e Mucosite", remedios: ["lactulose", "oleo_mineral", "domperidona", "solucao_mucosite"] },
            { nome: "Hidratação IV e Hidroeletrolíticos (Choque/Manutenção)", remedios: ["tgi_planoc", "tgi_manutencao", "vig_4", "vig_5"] },
            { nome: "Correção de Potássio e Sódio", remedios: ["kcl_ev", "kcl_xarope", "nacl3_hiponatremia"] }
        ]
    },
    { 
        id: "cat-pele", titulo: "Pele", dotClass: "dot-pele", cor: "tarja-pele", nome: "Pele", icone: "🩺 Pele",
        patologias: [
            { nome: "Parasitoses, Infecções e Lesões Cutâneas", remedios: ["pele_larva", "pele_delta", "pele_perme_shampoo", "pele_perme", "pele_iver", "pele_escabiose_orient", "pele_mupi", "pele_nista", "pele_acicl", "pele_trokg","pele_trok"] }
        ]
    },
    { 
        id: "cat-especialidades", titulo: "Especialidades", dotClass: "dot-especialidades", cor: "tarja-especialidades", nome: "Especialidades", icone: "👁️‍🗨️ Espec.",
        patologias: [
            { nome: "Otologia e Oftalmologia", remedios: ["espec_otociriax", "espec_cerumin", "espec_tobra", "espec_tobra_dexa", "espec_lacribell"] },
            { nome: "Hematologia (Ferro e Hemoderivados)", remedios: ["sulfato_ferroso", "sulfato_ferroso_prof", "hemacias", "plaquetas", "plasma"] },
            { nome: "Endócrino (Cetoacidose Diabética)", remedios: ["insulina_cad"] }
        ]
    }
];
