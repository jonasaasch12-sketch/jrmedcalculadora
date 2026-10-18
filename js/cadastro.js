// Cadastro profissional (perfil do usuário), usado em "Criar conta" e na tela
// "Complete seu cadastro" (contas antigas, dados faltando ou acadêmico que já passou da formatura).
// O perfil fica em Firestore usuarios/{uid}.perfil (gravado por js/firebase.js).

const ATIVIDADES_PERFIL = {
    medico: { nome: "Médico(a)", conselho: "CRM" },
    enfermeiro: { nome: "Enfermeiro(a)", conselho: "COREN" },
    farmaceutico: { nome: "Farmacêutico(a)", conselho: "CRF" },
    academico: { nome: "Acadêmico(a) de Medicina", conselho: null }
};
const UFS_PERFIL = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
const MESES_PERFIL = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const TEXTO_ACEITE_PERFIL = "Declaro que as informações são verdadeiras, que sou profissional ou estudante da área da saúde e que entendo que o JR MED é ferramenta de apoio: doses e condutas devem ser conferidas pelo prescritor.";
// Versão dos Termos de Uso e da Política de Privacidade (termos.html / privacidade.html).
// Mudou a versão = todos aceitam de novo no próximo acesso.
const VERSAO_TERMOS = "2026-10";
const TEXTO_ACEITE_TERMOS = 'Li e concordo com os <a href="termos.html" target="_blank" rel="noopener">Termos de Uso</a> e a <a href="privacidade.html" target="_blank" rel="noopener">Política de Privacidade</a>.';

function escPerfil(t) { return String(t ?? "").replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch])); }

// px = prefixo dos ids (dois formulários podem existir na página); d = perfil já salvo (para completar/editar).
function htmlFormPerfil(px, d) {
    d = d || {};
    let opcAtiv = Object.entries(ATIVIDADES_PERFIL).map(([k, a]) => `<option value="${k}"${d.atividade === k ? ' selected' : ''}>${a.nome}</option>`).join('');
    let opcUf = UFS_PERFIL.map(u => `<option${d.uf === u ? ' selected' : ''}>${u}</option>`).join('');
    let opcMes = MESES_PERFIL.map((m, i) => `<option value="${i + 1}"${+d.formaturaMes === i + 1 ? ' selected' : ''}>${m}</option>`).join('');
    let anoAtual = new Date().getFullYear();
    let opcAno = Array.from({ length: 9 }, (_, i) => anoAtual + i).map(a => `<option${+d.formaturaAno === a ? ' selected' : ''}>${a}</option>`).join('');
    setTimeout(() => perfilTrocarAtividade(px), 0);
    return `<div class="perfil-form">
        <label class="login-label" for="${px}Nome">Nome completo</label>
        <div class="login-input-group"><input type="text" id="${px}Nome" class="login-input" autocomplete="name" placeholder="Nome e sobrenome" value="${escPerfil(d.nome)}"></div>

        <label class="login-label" for="${px}Ativ">Atividade</label>
        <div class="login-input-group"><select id="${px}Ativ" class="login-input" onchange="perfilTrocarAtividade('${px}')"><option value="">Selecione…</option>${opcAtiv}</select></div>

        <div id="${px}GrupoProf" style="display:none;">
            <div class="perfil-linha">
                <div><label class="login-label" for="${px}Reg" id="${px}RegLabel">Registro no conselho</label>
                    <div class="login-input-group"><input type="text" id="${px}Reg" class="login-input" inputmode="numeric" placeholder="Número" value="${escPerfil(d.registro)}"></div></div>
                <div class="perfil-uf"><label class="login-label" for="${px}Uf">UF</label>
                    <div class="login-input-group"><select id="${px}Uf" class="login-input"><option value="">UF</option>${opcUf}</select></div></div>
            </div>
            <div id="${px}GrupoEsp">
                <label class="login-label" for="${px}Esp">Especialidade <span class="perfil-opc">(opcional)</span></label>
                <div class="login-input-group"><input type="text" id="${px}Esp" class="login-input" placeholder="Ex.: Pediatria" value="${escPerfil(d.especialidade)}"></div>
            </div>
        </div>

        <div id="${px}GrupoAcad" style="display:none;">
            <label class="login-label" for="${px}Inst">Faculdade</label>
            <div class="login-input-group"><input type="text" id="${px}Inst" class="login-input" placeholder="Nome da faculdade" value="${escPerfil(d.instituicao)}"></div>
            <label class="login-label">Previsão de formatura</label>
            <div class="perfil-linha">
                <div class="login-input-group"><select id="${px}FMes" class="login-input"><option value="">Mês</option>${opcMes}</select></div>
                <div class="login-input-group"><select id="${px}FAno" class="login-input"><option value="">Ano</option>${opcAno}</select></div>
            </div>
            <p class="perfil-dica">Depois dessa data, o app vai pedir o seu CRM.</p>
        </div>

        <label class="login-label" for="${px}Cel">Celular / WhatsApp <span class="perfil-opc">(opcional)</span></label>
        <div class="login-input-group"><input type="tel" id="${px}Cel" class="login-input" inputmode="tel" autocomplete="tel" placeholder="(DDD) 9 0000-0000" value="${escPerfil(d.celular)}"></div>

        <label class="perfil-aceite"><input type="checkbox" id="${px}Aceite"${d.aceiteEm ? ' checked' : ''}> <span>${TEXTO_ACEITE_PERFIL}</span></label>
        <label class="perfil-aceite"><input type="checkbox" id="${px}Termos"${d.aceiteVersao === VERSAO_TERMOS ? ' checked' : ''}> <span>${TEXTO_ACEITE_TERMOS}</span></label>
    </div>`;
}

function perfilTrocarAtividade(px) {
    let ativ = document.getElementById(px + 'Ativ')?.value;
    let a = ATIVIDADES_PERFIL[ativ];
    let prof = document.getElementById(px + 'GrupoProf'), acad = document.getElementById(px + 'GrupoAcad');
    if (!prof || !acad) return;
    prof.style.display = a && a.conselho ? 'block' : 'none';
    acad.style.display = ativ === 'academico' ? 'block' : 'none';
    if (a && a.conselho) document.getElementById(px + 'RegLabel').innerText = `Número do ${a.conselho}`;
    document.getElementById(px + 'GrupoEsp').style.display = ativ === 'medico' ? 'block' : 'none';
}

// Último dia do mês previsto da formatura (23:59).
function fimDaFormatura(mes, ano) { return new Date(+ano, +mes, 0, 23, 59, 59); }

// Lê e valida o formulário. Devolve { perfil } ou { erro, campo }.
function lerFormPerfil(px) {
    let v = id => (document.getElementById(px + id)?.value || "").trim();
    let nome = v('Nome').replace(/\s+/g, ' ');
    if (nome.split(' ').filter(p => p.length >= 2).length < 2) return { erro: "Informe o nome completo (nome e sobrenome).", campo: 'Nome' };
    let atividade = v('Ativ');
    if (!ATIVIDADES_PERFIL[atividade]) return { erro: "Selecione a sua atividade.", campo: 'Ativ' };
    let perfil = { nome, atividade };
    let a = ATIVIDADES_PERFIL[atividade];
    if (a.conselho) {
        let registro = v('Reg').toUpperCase();
        if (!/^[0-9A-Z.\-\/ ]{3,20}$/.test(registro) || (registro.match(/\d/g) || []).length < 3) return { erro: `Informe o número do ${a.conselho}.`, campo: 'Reg' };
        if (!v('Uf')) return { erro: `Informe a UF do ${a.conselho}.`, campo: 'Uf' };
        Object.assign(perfil, { conselho: a.conselho, registro, uf: v('Uf') });
        if (atividade === 'medico' && v('Esp')) perfil.especialidade = v('Esp');
    } else {
        if (v('Inst').length < 3) return { erro: "Informe o nome da faculdade.", campo: 'Inst' };
        let mes = +v('FMes'), ano = +v('FAno');
        if (!mes || !ano) return { erro: "Informe o mês e o ano previstos da formatura.", campo: 'FMes' };
        if (fimDaFormatura(mes, ano) < new Date()) return { erro: "Essa data de formatura já passou. Se você já se formou, escolha Médico(a) e informe o CRM.", campo: 'FMes' };
        Object.assign(perfil, { instituicao: v('Inst'), formaturaMes: mes, formaturaAno: ano });
    }
    let cel = v('Cel').replace(/\D/g, '');
    if (cel) {
        if (cel.length < 10 || cel.length > 13) return { erro: "Celular inválido: use DDD + número.", campo: 'Cel' };
        perfil.celular = v('Cel');
    }
    if (!document.getElementById(px + 'Aceite')?.checked) return { erro: "Para continuar, marque a declaração no final do formulário.", campo: 'Aceite' };
    if (!document.getElementById(px + 'Termos')?.checked) return { erro: "Para continuar, leia e aceite os Termos de Uso e a Política de Privacidade.", campo: 'Termos' };
    perfil.aceiteEm = new Date().toISOString();
    perfil.aceiteVersao = VERSAO_TERMOS;
    return { perfil };
}

// null = perfil completo. Senão, o motivo (texto) para pedir que complete.
function pendenciaPerfil(p) {
    if (!p || !p.nome || !ATIVIDADES_PERFIL[p.atividade] || !p.aceiteEm) return "Para continuar usando o JR MED, complete o seu cadastro profissional.";
    if (p.aceiteVersao !== VERSAO_TERMOS) return "Publicamos os Termos de Uso e a Política de Privacidade do JR MED (LGPD). Confira os seus dados, leia os documentos e marque o aceite no final.";
    if (ATIVIDADES_PERFIL[p.atividade].conselho && (!p.registro || !p.uf)) return `Falta informar o seu ${ATIVIDADES_PERFIL[p.atividade].conselho} e a UF.`;
    if (p.atividade === 'academico') {
        if (!p.formaturaMes || !p.formaturaAno || !p.instituicao) return "Falta informar a faculdade e a previsão de formatura.";
        if (fimDaFormatura(p.formaturaMes, p.formaturaAno) < new Date())
            return `A sua previsão de formatura (${MESES_PERFIL[p.formaturaMes - 1].toLowerCase()} de ${p.formaturaAno}) já passou. Se já se formou, escolha Médico(a) e informe o CRM; se não, atualize a previsão.`;
    }
    return null;
}

// Uma linha curta para a lista de usuários: "Médico(a) · CRM 12345/SC · Pediatria".
function resumoPerfil(p) {
    if (!p || !ATIVIDADES_PERFIL[p.atividade]) return "";
    let a = ATIVIDADES_PERFIL[p.atividade];
    if (a.conselho) return [a.nome, `${p.conselho || a.conselho} ${p.registro || '?'}/${p.uf || '?'}`, p.especialidade].filter(Boolean).join(' · ');
    return [a.nome, p.instituicao, p.formaturaMes ? `formatura ${String(p.formaturaMes).padStart(2, '0')}/${p.formaturaAno}` : ''].filter(Boolean).join(' · ');
}
