/**
 * Service Worker do site Incentivart
 * Funcionalidades: cache de recursos, funcionamento offline
 */

const NOME_CACHE = 'incentivart-v1.0.0';
const RECURSOS_ESTATICOS = [
  './',
  './index.html',
  './sobre.html',
  './contato.html',
  './servicos.html',
  './404.html',
  './style.css',
  './script.js',
  './manifest.json',
  './assets/icon-192x192.png',
  './assets/icon-512x512.png'
];

// Evento de instalação - armazena recursos estáticos em cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(NOME_CACHE)
      .then((cache) => {
        console.log('Armazenando recursos estáticos em cache');
        return cache.addAll(RECURSOS_ESTATICOS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Evento de ativação - limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((nomesCaches) => {
        return Promise.all(
          nomesCaches.map((nomeCache) => {
            if (nomeCache !== NOME_CACHE) {
              console.log('Deletando cache antigo:', nomeCache);
              return caches.delete(nomeCache);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Evento de busca - serve conteúdo em cache quando offline
self.addEventListener('fetch', (event) => {
  // Ignora requisições que não são GET
  if (event.request.method !== 'GET') return;
  
  // Ignora requisições externas para domínios não confiáveis
  if (!event.request.url.startsWith(self.location.origin)) return;
  
  // Lista de recursos que devem ser validados
  const recursosValidados = [
    './style.css',
    './script.js',
    './index.html',
    './sobre.html',
    './contato.html',
    './servicos.html',
    './404.html'
  ];
  
  event.respondWith(
    caches.match(event.request)
      .then((respostaCacheada) => {
        // Retorna versão em cache se disponível
        if (respostaCacheada) {
          return respostaCacheada;
        }
        
        // Caso contrário, busca da rede
        return fetch(event.request)
          .then((resposta) => {
            // Não armazena se resposta não é válida
            if (!resposta || resposta.status !== 200 || resposta.type !== 'basic') {
              return resposta;
            }
            
            // Validação adicional para recursos críticos
            const urlRelativa = event.request.url.replace(self.location.origin, '.');
            if (recursosValidados.includes(urlRelativa)) {
              // Verifica se o Content-Type é apropriado
              const contentType = resposta.headers.get('content-type');
              if (!contentType || (!contentType.includes('text/') && !contentType.includes('application/javascript'))) {
                console.warn('Tipo de conteúdo suspeito para recurso:', urlRelativa);
                return resposta; // Não armazena em cache
              }
            }
            
            // Clona resposta para armazenamento
            const respostaParaCache = resposta.clone();
            
            caches.open(NOME_CACHE)
              .then((cache) => {
                cache.put(event.request, respostaParaCache);
              })
              .catch((erro) => {
                console.error('Erro ao armazenar no cache:', erro);
              });
            
            return resposta;
          })
          .catch(() => {
            // Se offline e sem cache, retorna página de erro
            if (event.request.destination === 'document') {
              return caches.match('./404.html');
            }
          });
      })
  );
});

// Sincronização em segundo plano para envios de formulário (se suportado)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sincronizar-formulario-contato') {
    event.waitUntil(
      // Processa sincronização do formulário de contato
      sincronizarFormularioContato()
    );
  }
});

/**
 * Sincroniza dados do formulário de contato quando volta online
 */
async function sincronizarFormularioContato() {
  // Implementação para sincronizar formulário quando voltar online
  // Seria usado para envios de formulário offline
  console.log('Sincronizando dados do formulário de contato...');
}
