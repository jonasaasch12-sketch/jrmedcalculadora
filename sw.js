// Service Worker do JR MED
// Objetivo: deixar a calculadora funcionando mesmo com internet instável/ausente
// no plantão, SEM nunca esconder uma versão nova do app enquanto você estiver
// online (rede primeiro, cache só como reforço quando faltar internet).
//
// IMPORTANTE: isso só funciona quando o app é aberto por um endereço https://
// (ex: hospedado no Netlify/Firebase Hosting). Não funciona abrindo o arquivo
// direto do computador (file://) — navegadores bloqueiam Service Worker nesse caso.

// A versão de teste (/teste/) usa um cache separado, para uma não apagar o da outra.
const PREFIXO_CACHE = self.registration.scope.includes("/teste/") ? "jrmed-teste-cache-" : "jrmed-cache-";
const CACHE_NOME = PREFIXO_CACHE + "v22"; // troque o número (v5, v6...) sempre que quiser forçar a limpeza do cache antigo

// Todo arquivo .js/.css carregado pelo index.html PRECISA estar aqui
// (o teste "node testes/verificar.js" avisa se faltar algum).
const ARQUIVOS_ESSENCIAIS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./css/estilo.css",
  "./js/base.js",
  "./js/modo-teste.js",
  "./medicamentos/registro.js",
  "./medicamentos/exame-fisico.js",
  "./medicamentos/sintomaticos.js",
  "./medicamentos/vomitos.js",
  "./medicamentos/antialergicos.js",
  "./medicamentos/respiratorio.js",
  "./medicamentos/antibioticos.js",
  "./medicamentos/rsi.js",
  "./medicamentos/pals.js",
  "./medicamentos/neuro.js",
  "./medicamentos/urinario.js",
  "./medicamentos/diarreia.js",
  "./medicamentos/pele.js",
  "./medicamentos/especialidades.js",
  "./medicamentos/cad.js",
  "./medicamentos/menu.js",
  "./js/app.js",
  "./js/formularios.js",
  "./js/firebase.js",
  "./condutas/condutas.css",
  "./condutas/condutas.js",
  "./condutas/bronquiolite.js",
  "./condutas/asma.js",
  "./condutas/pneumonia.js",
  "./condutas/diarreia.js",
  "./condutas/cetoacidose.js",
  "./condutas/fssl.js",
  "./condutas/parasitoses.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NOME).then((cache) => cache.addAll(ARQUIVOS_ESSENCIAIS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(nomes.filter((n) => n.startsWith(PREFIXO_CACHE) && n !== CACHE_NOME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // REDE PRIMEIRO: sempre tenta buscar a versão mais nova primeiro.
  // Só usa o que está salvo localmente se a internet falhar de verdade.
  // Arquivos do próprio site: "no-cache" faz o navegador confirmar com o servidor
  // se há versão nova (evita misturar um index.html novo com um .js antigo).
  let mesmoSite = new URL(event.request.url).origin === self.location.origin;
  event.respondWith(
    fetch(event.request, mesmoSite ? { cache: "no-cache" } : undefined)
      .then((respostaRede) => {
        let copia = respostaRede.clone();
        caches.open(CACHE_NOME).then((cache) => cache.put(event.request, copia));
        return respostaRede;
      })
      .catch(() => {
        return caches.match(event.request).then((respostaCache) => {
          return respostaCache || new Response("Sem conexão e este item ainda não foi salvo offline.", { status: 503 });
        });
      })
  );
});
