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
            { nome: "Orientações de Alta", remedios: ["orientacoes_gerais", "orientacoes_geca", "orientacoes_bva", "orientacoes_dengue"] }
        ]
    },
    { 
        id: "cat-sintomaticos", titulo: "Sintomáticos", dotClass: "dot-sintomaticos", cor: "tarja-sintomaticos", nome: "Sintomáticos", icone: "💊 Sintom.",
        patologias: [
            { nome: "Febre e Dor (Vias Orais)", conduta: "fssl", condutaNome: "Febre sem sinais localizatórios", remedios: ["dip_gts", "dip_xpe", "pct_gts", "pct_bebe", "ibu_gts", "ibu_50", "ceto_oral", "dip_cp", "pct_cp", "nimesulida_gts"] },
            { nome: "Cólicas e Distensão Abdominal", remedios: ["buscopan", "buscopan_composto", "simet", "colikids"] },
            { nome: "Dor Moderada a Intensa (Via Oral)", remedios: ["tramadol_gts"] },
            { nome: "Analgesia e Antitérmico Hospitalar", remedios: ["dip_inj", "buscopan_composto_ev", "tramadol_ev"] }
        ]
    },
    { 
        id: "cat-vomitos", titulo: "Vômitos", dotClass: "dot-diarreia", cor: "tarja-diarreia", nome: "Vômitos", icone: "🤮 Vômitos",
        patologias: [
            { nome: "Náuseas e Vômitos (Ambulatorial)", remedios: ["ondif_cp", "ondan_vo", "broma_vo", "dramin_vo", "dramin_sol"] },
            { nome: "Náuseas e Vômitos (Hospitalar)", remedios: ["ondan_ev", "broma_ev", "dramin_im"] }
        ]
    },
    { 
        id: "cat-antialergicos", titulo: "Antialérgicos", dotClass: "dot-alergias", cor: "tarja-alergias", nome: "Antialérgicos", icone: "🤧 Alerg.",
        patologias: [
            { nome: "Prurido e Rinite (Vias Orais)", remedios: ["hixizine", "dexclor", "deslo", "loratadina", "dexa_elixir"] },
            { nome: "Anafilaxia (Emergência)", remedios: ["adrenalina_im"] },
            { nome: "Urticária / Reação Alérgica (Hospitalar)", remedios: ["prometa"] }
        ]
    },
    { 
        id: "cat-respiratorio", titulo: "Respiratório", dotClass: "dot-respiratorio", cor: "tarja-respiratorio", nome: "Respiratório", icone: "🫁 Resp",
        patologias: [
            { nome: "Lavagem Nasal", conduta: "bronquiolite", condutaNome: "Bronquiolite", remedios: ["soro_nasal", "rinosoro_inf", "rinosoro_3", "neb_sf"] },
            { 
                nome: "Asma", conduta: "asma",
                remedios: [
                    // Prescrição Ambulatorial
                    "clenil_hfa", "pred_sol", "predsin_cp", "salb_spray",
                    // Prescrição para Emergência
                    "metil", "magnesio_ev",
                    // Adicionados (manual HIAS)
                    "fenoterol_spray", "fenoterol_gts"
                ] 
            },
            { 
                nome: "Pneumonia", conduta: "pneumonia",
                remedios: [
                    // Prescrição Ambulatorial
                    "amox", "amox400", "clav", "azi_oral", "claritro_pac", "eritro_pac",
                    // Prescrição Hospitalar
                    "ampicilina", "pen_cristalina_pac", "cef_resp_ev", "cef_resp_im", "cefotax_pac", "amoxclav_ev", "ampisulb_ev", "azi_ev", "levoflox_ev", "genta", "linezolida_ev"
                ] 
            },
            { nome: "Tosse (Antitussígenos e Expectorantes)", remedios: ["koid_d", "torante", "acebrofilina", "antux_xpe", "antux_gts", "percoff"] },
            { nome: "Laringite Viral Aguda (Crupe)", remedios: ["dexa_crupe", "adrenalina_neb"] },
            { nome: "Manejo Avançado e Outros Respiratórios", remedios: ["pulmicort", "hidro_ev", "ipra"] }
        ]
    },
    { 
        id: "cat-antibioticos", titulo: "Antibióticos", dotClass: "dot-antibioticos", cor: "tarja-antibioticos", nome: "Antibióticos", icone: "🦠 ATB",
        patologias: [
            { nome: "Infecções de Vias Aéreas e Partes Moles", remedios: ["amox", "amox400", "clav"] },
            { nome: "Faringite / Amigdalite (Dose Única)", remedios: ["benza"] },
            { nome: "Febre sem Sinais Localizatórios (Bacteremia Oculta)", conduta: "fssl", condutaNome: "Febre sem sinais localizatórios", remedios: ["cef_fssl"] },
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
            { nome: "Infecção do Trato Urinário (ITU) e Cistite", remedios: ["urina_clav", "urina_cefa", "urina_ceft", "monuril"] },
            { nome: "Síndrome Nefrítica / Edema (GNPE)", remedios: ["urina_furo"] }
        ]
    },
    { 
        id: "cat-diarreia", titulo: "TGI", dotClass: "dot-diarreia", cor: "tarja-diarreia", nome: "TGI", icone: "💧 TGI",
        patologias: [
            { nome: "Gastroenterite e Reidratação Oral", conduta: "diarreia", condutaNome: "Diarreia aguda", remedios: ["tgi_sro", "tgi_zinco", "tgi_provance_mini", "tiorfan", "tgi_provance_gg", "tgi_flora", "tgi_azitro", "cipro_disenteria", "vit_a_diarreia", "florax", "floralyte", "rehidrat"] },
            { nome: "Parasitoses Intestinais (Verminoses)", conduta: "parasitoses", condutaNome: "Parasitoses intestinais", remedios: ["tgi_alben", "tgi_meben", "nitazoxanida", "metro_parasitas", "pele_iver", "smx_tmp"] },
            { nome: "Constipação, Refluxo e Mucosite", remedios: ["lactulose", "oleo_mineral", "domperidona", "omeprazol", "solucao_mucosite", "omeprazol_ev", "leite_magnesia", "muvinlax", "fleet"] },
            { nome: "Tratamento Hospitalar: Hidratação (Plano B, Expansão e Manutenção)", remedios: ["tgi_planob", "tgi_planoc", "tgi_manut_planoc", "tgi_manutencao", "vig_4", "vig_5"] },
            { nome: "Disenteria: Antibiótico Hospitalar", remedios: ["cef_disenteria", "cefotax_pac"] },
            { nome: "Correção de Potássio e Sódio", remedios: ["kcl_ev", "kcl_xarope", "nacl3_hiponatremia"] }
        ]
    },
    { 
        id: "cat-pele", titulo: "Pele", dotClass: "dot-pele", cor: "tarja-pele", nome: "Pele", icone: "🩺 Pele",
        patologias: [
            { nome: "Parasitoses, Infecções e Lesões Cutâneas", remedios: ["pele_larva", "pele_delta", "pele_perme_shampoo", "pele_perme", "pele_iver", "pele_escabiose_orient", "pele_mupi", "pele_nista", "pele_acicl", "pele_trokg","pele_trok", "trok_n", "quadriderm", "cetoconazol_cr", "nistatina_zinco", "penvir", "fluconazol"] }
        ]
    },
    { 
        id: "cat-cad", titulo: "CAD (Cetoacidose Diabética)", dotClass: "dot-cad", cor: "tarja-cad", nome: "CAD", icone: "🩸 CAD", conduta: "cetoacidose",
        patologias: [
            { nome: "Expansão, Hidratação e Potássio", remedios: ["cad_expansao", "cad_hidratacao", "kcl_ev"] },
            { nome: "Insulina EV e Transição para SC", remedios: ["insulina_cad", "cad_insulina_sc"] },
            { nome: "Complicações: Edema Cerebral, Acidose Grave e Hipoglicemia", remedios: ["cad_manitol", "cad_nacl3", "cad_bicarbonato", "glicose_pals"] }
        ]
    },
    { 
        id: "cat-especialidades", titulo: "Especialidades", dotClass: "dot-especialidades", cor: "tarja-especialidades", nome: "Especialidades", icone: "👁️‍🗨️ Espec.",
        patologias: [
            { nome: "Otologia e Oftalmologia", remedios: ["espec_otociriax", "espec_cerumin", "espec_tobra", "espec_tobra_dexa", "espec_lacribell", "otosporin", "lacrifilm", "tobracort", "compressa_morna"] },
            { nome: "Orofaringe (Dor de Garganta)", remedios: ["hexomedine", "bismujet"] },
            { nome: "Genital (Sinéquia, Fimose, Vulvovaginite)", remedios: ["premarin", "postec", "flogo_rosa"] },
            { nome: "Toxicologia (Intoxicações)", remedios: ["carvao"] },
            { nome: "Hematologia (Ferro e Hemoderivados)", remedios: ["sulfato_ferroso", "sulfato_ferroso_prof", "hemacias", "plaquetas", "plasma"] }
        ]
    }
];
