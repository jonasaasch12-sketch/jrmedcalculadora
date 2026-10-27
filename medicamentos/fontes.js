// =====================================================
// FONTE DA DOSE DE CADA CARD (pedido do Dr. Jonas, 10/2026)
// =====================================================
// Abaixo do nome, cada card mostra o quadro "📚 Dose preconizada" com a fonte, para quem
// prescreve conferir de onde veio a dose. Esse quadro NÃO entra no texto da receita.
//
// De onde vem a fonte (nesta ordem): FONTES_CARDS abaixo → ficha.fonteRevisao do card
// (ou a ficha da equipe) → sigla do "info" (ex.: "Posologia (Whitebook)").
// Sem nenhuma delas, o quadro avisa "Fonte ainda não registrada no app".
// Só colocar aqui a referência de onde a dose do card foi tirada (a mesma das condutas). Não inventar.

const REF = {
    oma: "AAP 2013 — Lieberthal AS et al. The diagnosis and management of acute otitis media. Pediatrics 2013;131(3):e964-99.",
    sinusite: "AAP 2013 — Wald ER et al. Clinical practice guideline for the diagnosis and management of acute bacterial sinusitis in children aged 1 to 18 years. Pediatrics 2013;132(1):e262-80. IDSA 2012 — Chow AW et al. Clin Infect Dis 2012;54(8):e72-e112.",
    faringo: "IDSA 2012 — Shulman ST et al. Clinical Practice Guideline for the Diagnosis and Management of Group A Streptococcal Pharyngitis. Clin Infect Dis 2012;55(10):e86-102.",
    meningo: "Ministério da Saúde. Guia de Vigilância em Saúde, 6ª ed., 2023 — Doença meningocócica (tratamento e quimioprofilaxia).",
    diarreia: "Ministério da Saúde. Manejo do paciente com diarreia, 2023 (reproduzido no Guia Prático de Atualização nº 74 — Diarreia Aguda Infecciosa, SBP, 2023).",
    pac: "SBP — Departamentos Científicos de Pneumologia e Infectologia. Documento Científico nº 151: Pneumonias Adquiridas na Comunidade Complicadas, atualização 2024 (e DC nº 8, PAC não complicada, 2022).",
    fssl: "SBP — Tratado de Pediatria, 4ª ed., 2017: Febre sem sinais localizatórios (protocolo HU-USP); Documento Científico nº 206 — Febre Aguda em Pediatria (2025).",
    itu_sbp: "SBP — Departamento Científico de Nefrologia. Documento Científico nº 101: Infecção do Trato Urinário (2023)."
};

const FONTES_CARDS = {
    amox_oma: REF.oma, clav_oma: REF.oma, cef_oma: REF.oma,
    amox_sinusite: REF.sinusite, clav_sinusite: REF.sinusite, cef_sinusite: REF.sinusite,
    amox_faringo: REF.faringo, amox_faringo400: REF.faringo, azitro_faringo: REF.faringo, benza: REF.faringo,
    cef_meningo: REF.meningo, rifampicina_profilaxia: REF.meningo, cef_profilaxia_meningo: REF.meningo, rifampicina_hib: REF.meningo,
    tgi_sro: REF.diarreia, tgi_planob: REF.diarreia, tgi_manut_planoc: REF.diarreia, tgi_planoc: REF.diarreia,
    cef_disenteria: REF.diarreia, cipro_disenteria: REF.diarreia,
    pen_cristalina_pac: REF.pac, claritro_pac: REF.pac, eritro_pac: REF.pac, cefotax_pac: REF.pac, amoxclav_ev: REF.pac,
    ampisulb_ev: REF.pac, linezolida_ev: REF.pac, levoflox_ev: REF.pac, cef_resp_ev: REF.pac,
    cef_fssl: REF.fssl,
    urina_clav: REF.itu_sbp
};

// Siglas do "info" escritas por extenso
const SIGLAS_FONTE = {
    "Whitebook": "Whitebook (Afya)",
    "MS": "Ministério da Saúde",
    "SBP": "Sociedade Brasileira de Pediatria (SBP)",
    "GINA": "GINA — Global Initiative for Asthma",
    "SBP/MS": "Sociedade Brasileira de Pediatria (SBP) e Ministério da Saúde"
};
