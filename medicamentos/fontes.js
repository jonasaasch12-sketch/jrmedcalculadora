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
    itu_sbp: "SBP — Departamento Científico de Nefrologia. Documento Científico nº 101: Infecção do Trato Urinário (2023).",
    febre: "SBP — Departamentos Científicos de Pediatria Ambulatorial e de Infectologia. Documento Científico: Manejo da Febre Aguda (out/2021): paracetamol 10–15 mg/kg/dose; ibuprofeno 5–10 mg/kg/dose (antitérmico/analgésico); dipirona 10–12 mg/kg/dose.",
    sedacao: "SBP — Bresolin NL, Fernandes VR. Sedação, Analgesia e Bloqueio Neuromuscular (Departamento de Terapia Intensiva).",
    pals: "AHA — Kleinman ME et al. Part 14: Pediatric Advanced Life Support. 2010 AHA Guidelines for CPR and ECC. Circulation 2010;122(18 Suppl 3):S876-908 (tabela de medicações da ressuscitação pediátrica).",
    diarreia_sbp: "SBP — Departamento Científico de Gastroenterologia. Guia Prático de Atualização nº 74: Diarreia Aguda Infecciosa (06/06/2023), com o Manejo do paciente com diarreia (Ministério da Saúde, 2023).",
    parasitoses: "SBP — Departamentos Científicos de Gastroenterologia e de Infectologia. Guia Prático de Atualização nº 7: Parasitoses intestinais — diagnóstico e tratamento (nov/2020).",
    gina: "GINA — Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention, 2026.",
    ispad: "ISPAD Clinical Practice Consensus Guidelines 2022 — Glaser N et al. Diabetic ketoacidosis and hyperglycemic hyperosmolar state. Pediatr Diabetes 2022;23(7):835-856 (edema cerebral: manitol 0,5–1 g/kg ou NaCl 3% 2,5–5 mL/kg em 10–15 min).",
    imip_cad: "UTI Pediátrica — IMIP. Protocolo de Cetoacidose Diabética (2018): fórmula do bicarbonato.",
    cad_sc: "Instituto Fernandes Figueira (IFF/Fiocruz) — Cetoacidose diabética na infância: fase de transição; HC-UFTM / Ebserh — PRT.HC-UFTM-UCA.004 (2026); ISPAD 2022, seção 6.6.",
    crise_wb: "Whitebook (Afya) — Crise Convulsiva em Pediatria (Prescrição Hospitalar), atualizado em 29/04/2025.",
    bula: "Bula do medicamento (texto aprovado pela ANVISA)."
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
    urina_clav: REF.itu_sbp,

    // Conferidos em 10/2026 (a dose do card bate com a fonte)
    pct_gts: REF.febre, pct_bebe: REF.febre, pct_cp: REF.febre, ibu_gts: REF.febre, ibu_50: REF.febre, dip_cp: REF.febre,
    rsi_midaz: REF.sedacao + " Midazolam: 0,1–0,3 mg/kg EV (máx. 5 mg/dose).",
    rsi_ceta: REF.sedacao + " Cetamina: 1–4 mg/kg EV.",
    rsi_cont_cetamina: REF.sedacao + " Cetamina contínua: 10–15 até 60 mcg/kg/min; broncodilatadora 20–40 mcg/kg/min.",
    rsi_succi: REF.sedacao + " Succinilcolina: 1–2 mg/kg EV.",
    rsi_cont_precedex: REF.sedacao + " Dexmedetomidina: 0,2–1,2 mcg/kg/h.",
    adenosina_pals: REF.pals, amiodarona_pals: REF.pals, epinefrina_pals: REF.pals, glicose_pals: REF.pals,
    lidocaina_pals: REF.pals, naloxona_pals: REF.pals, procainamida_pals: REF.pals, bicarbonato_pals: REF.pals,
    amox: REF.pac + " Amoxicilina 50 mg/kg/dia de 8/8h ou 12/12h por 7 dias.",
    amox400: REF.pac + " Amoxicilina 50 mg/kg/dia de 8/8h ou 12/12h por 7 dias.",
    ampicilina: REF.pac + " Ampicilina 50 mg/kg/dose de 6/6h.",
    azi_ev: REF.pac + " Azitromicina 10 mg/kg/dia, 1x ao dia, por 5 dias.",
    pen_cristalina: REF.pac + " Penicilina cristalina 200.000–250.000 UI/kg/dia de 6/6h ou 4/4h.",
    genta: REF.pac + " Só o esquema da pneumonia < 2 meses (7,5 mg/kg/dia de 12/12h); o de 24/24h para outras infecções ainda sem fonte registrada.",
    tgi_azitro: REF.diarreia, tgi_flora: REF.diarreia_sbp + " Saccharomyces boulardii CNCM I-745: 250–750 mg/dia por 5 a 7 dias.",
    tgi_alben: REF.parasitoses + " Enterobíase: albendazol 400 mg VO dose única.",
    tgi_meben: REF.parasitoses + " Enterobíase: mebendazol 100 mg VO dose única.",
    nitazoxanida: REF.parasitoses + " Nitazoxanida 7,5 mg/kg/dose (máx. 500 mg) de 12/12h por 3 dias.",
    pred_sol: REF.gina + " Prednisolona 1–2 mg/kg/dia por 3 a 5 dias.",
    pulmicort: REF.gina + " Budesonida nebulizada: dose baixa diária de 500 mcg (≥ 1 ano).",
    cad_manitol: REF.ispad, cad_nacl3: REF.ispad, cad_bicarbonato: REF.imip_cad, cad_insulina_sc: REF.cad_sc,
    neuro_fenitoina: REF.crise_wb + " Fenitoína 15–20 mg/kg.",
    dexclor: REF.bula + " Polaramine solução oral 2 mg/5 mL: 2–6 anos 1,25 mL; 6–12 anos 2,5 mL; > 12 anos 5 mL, 3x ao dia.",
    salb_spray: "Esquema escolhido pelo Dr. Jonas para o app. A dose da crise (1 jato/2 kg = 50 mcg/kg, máx. 10 jatos) é a do Guia Prático de Atualização nº 6 — Anafilaxia: atualização 2021 (SBP). Esquema da alta: fonte ainda não registrada.",
    magnesio_ev: "Protocolo do IMIP (Instituto de Medicina Integral Prof. Fernando Figueira) — crise de asma: sulfato de magnésio 50 mg/kg/h em infusão contínua por 5 horas (máx. 2 g/h).",
    cef_resp_im: REF.pac + " Ceftriaxona 50–100 mg/kg/dia (PAC complicada).",
    cad_hidratacao: "UTI Pediátrica — IMIP. Protocolo de Cetoacidose Diabética (2018): solução padrão em Y (soluções A e B).",

    // Ajustados às fontes escolhidas pelo Dr. Jonas (10/2026)
    loratadina: REF.bula + " Loratadina xarope 1 mg/mL: 2 a 12 anos até 30 kg 5 mL; acima de 30 kg ou de 12 anos 10 mL, 1x ao dia.",
    hixizine: REF.bula + " Hixizine xarope 2 mg/mL: 0,7 mg/kg 3x ao dia (acima de 6 meses); até 40 kg máx. 2 mg/kg/dia; acima de 40 kg máx. 100 mg/dia.",
    ondif_cp: REF.diarreia_sbp + " Ondansetrona (Quadro 5): 6 meses a 2 anos 2 mg; > 2 a 10 anos (até 30 kg) 4 mg; > 10 anos (> 30 kg) 8 mg.",
    ondan_vo: REF.diarreia_sbp + " Ondansetrona (Quadro 5): 6 meses a 2 anos 2 mg; > 2 a 10 anos (até 30 kg) 4 mg; > 10 anos (> 30 kg) 8 mg.",
    atropina: REF.pals, magnesio_pals: REF.pals,
    prometa: "SBP — Departamento Científico de Alergia. Guia Prático de Atualização nº 6: Anafilaxia, atualização 2021: prometazina crianças 1 mg/kg (máx. 50 mg).",
    rsi_cont_propofol: REF.sedacao + " Propofol: 25 a 250 mcg/kg/min (até 75 reduz o risco de síndrome da infusão).",
    rsi_cont_rocuronio: REF.sedacao + " Rocurônio: 0,3 a 0,6 mg/kg/h.",
    rsi_cont_pancuronio: REF.sedacao + " Pancurônio: 0,05 a 0,1 mg/kg/h."
};

// Siglas do "info" escritas por extenso
const SIGLAS_FONTE = {
    "Whitebook": "Whitebook (Afya)",
    "MS": "Ministério da Saúde",
    "SBP": "Sociedade Brasileira de Pediatria (SBP)",
    "GINA": "GINA — Global Initiative for Asthma",
    "SBP/MS": "Sociedade Brasileira de Pediatria (SBP) e Ministério da Saúde"
};
