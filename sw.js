// Service Worker do JR MED
// Objetivo: deixar a calculadora funcionando mesmo com internet instável/ausente
// no plantão, SEM nunca esconder uma versão nova do app enquanto você estiver
// online (rede primeiro, cache só como reforço quando faltar internet).
//
// IMPORTANTE: isso só funciona quando o app é aberto por um endereço https://
// (ex: hospedado no Netlify/Firebase Hosting). Não funciona abrindo o arquivo
// direto do computador (file://) — navegadores bloqueiam Service Worker nesse caso.

const CACHE_NOME = "jrmed-cache-v2"; // troque o número (v3, v4...) sempre que quiser forçar a limpeza do cache antigo

const ARQUIVOS_ESSENCIAIS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg"
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
      Promise.all(nomes.filter((n) => n !== CACHE_NOME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // REDE PRIMEIRO: sempre tenta buscar a versão mais nova primeiro.
  // Só usa o que está salvo localmente se a internet falhar de verdade.
  event.respondWith(
    fetch(event.request)
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
