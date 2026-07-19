# JavaScript — Estrutura Atual

Quatro arquivos JS na raiz, carregados como scripts clássicos com `defer` (sem build, sem módulos). CSS relacionado em [css/READMEcss.md](css/READMEcss.md); back-end do formulário em [README-backend.md](README-backend.md).

## Arquivos

- `script.js`: script principal, carregado em **todas** as páginas — navegação/menu mobile, animações de scroll, renderização dinâmica de serviços/parceiros/clientes, formulário de contato, lightbox da galeria de fotos, modal de privacidade, ano do footer.
- `portfolio-data.js`: dados do portfólio (`window.PORTFOLIO_DATA`). Carregado junto com `portfolio.js`.
- `portfolio.js`: renderização do portfólio de [servicos.html](servicos.html) (cards, filtros, modal de visualização). Consome `PORTFOLIO_DATA` e expõe `window.initPortfolio`.
- `hero-carousel.js`: card stack carousel do hero da Home (somente [index.html](index.html)).

## Carregamento por página

Todos os scripts usam `defer`, logo executam em ordem de declaração após o parse do HTML. Cache busting por querystring manual `?v=AAAAMMDD-N` — atualize ao alterar o arquivo referenciado.

| Página | Scripts (em ordem) |
|---|---|
| `index.html` | `portfolio-data.js` → `portfolio.js` → `script.js` → `hero-carousel.js` |
| `sobre.html` | `portfolio-data.js` → `portfolio.js` → `script.js` |
| `servicos.html` | `portfolio-data.js` → `portfolio.js` → `script.js` |
| `contato.html` | `script.js` |
| `404.html` | `script.js` |
| `politica-de-privacidade.html` | `script.js` |

Observações:

- **Ordem obrigatória**: `portfolio-data.js` antes de `portfolio.js` (o segundo lê `window.PORTFOLIO_DATA` na carga) e `portfolio.js` antes de `script.js` (que chama `window.initPortfolio()` no `DOMContentLoaded`).
- `portfolio-data.js`/`portfolio.js` são carregados também em `index.html` e `sobre.html`, embora só `servicos.html` tenha `#portfolio-container` — nessas páginas `initPortfolio()` retorna cedo sem renderizar nada (guarda `isPortfolioInitialized` também impede execução dupla).
- O lightbox do portfólio depende de markup **estático** em `servicos.html` (`#pf-image-modal`, ~linha 454); sem ele, `initLightbox()` não faz nada.
- `hero-carousel.js` é IIFE autoexecutável (não depende de `script.js`) e só funciona onde existe `#hero-stack` (index).

## Dados de configuração em script.js

No topo de [script.js](script.js), três arrays editáveis diretamente (sem rebuild):

### `SERVICOS_DATA` (linha ~14)

Renderiza os cards de serviço em `#servicos-container` (servicos.html). Cada entrada:

```js
{
  titulo: "...",          // obrigatório
  descricao: "...",       // obrigatório
  inclui: ["...", ...],   // checklist "Inclui"
  beneficios: ["...", ...], // checklist "Benefícios para você"
  cta: "...",             // texto do botão
  ctaHref: "...",         // opcional — destino do botão (default: contato.html)
  indicadoPara: "...",    // opcional — bloco extra "Indicado para"
  novo: true              // opcional — exibe badge "Novo"
}
```

O ícone e a cor de destaque de cada card vêm do array paralelo `SERVICOS_META` (linha ~513), **por posição** — ao adicionar/reordenar serviços, ajuste `SERVICOS_META` na mesma ordem (entradas além do fim do array caem num fallback genérico).

### `PARCEIROS_DATA` (linha ~142)

Carrossel de logos em `#parceiros-container` (servicos.html):

```js
{ nome: "...", logo: "Incentivart/Logos/X_logo.webp", link: "https://...", semFiltro: true }
```

- `link` vazio (`""`) → chip vira `div` estática (sem clique); com link, vira âncora `target="_blank" rel="noopener noreferrer"`.
- `semFiltro: true` → logo sempre colorida (pula o grayscale padrão do carrossel). Opcional.

### `CLIENTES_DATA` (linha ~164)

Carrossel foto + nome em `#clientes-container` (servicos.html):

```js
{ nome: "...", foto: "Incentivart/Logos/Clientes/X_foto.webp", link: "https://..." }
```

Mesma regra do `link` dos parceiros.

### Funcionamento dos carrosséis

`buildCarouselTrack()` duplica o conteúdo (loop infinito via `translateX(-50%)` no CSS); as cópias de chips **com link** (âncoras) recebem `aria-hidden="true" tabindex="-1"` para não duplicar links na árvore de acessibilidade — cópias de chips sem link (`div`) recebem só `aria-hidden="true"`, pois não são focáveis. O de clientes repete o conjunto 2× por metade para cobrir telas largas.

## `portfolio-data.js`

`window.PORTFOLIO_DATA` — array de itens do portfólio de servicos.html. Campos:

```js
{
  tipo: "ellen" | "ellen-mundo" | "longa" | "video" | "projetos",
  titulo: "...", descricao: "...", imagem: "...", link: "...",
  videoId: "...",    // YouTube: ativa thumbnail webp + fallback jpg
  site: "...", instagram: "...",   // opcionais — botões no modal (itens "projetos")
  // overrides opcionais de apresentação:
  filterType, typeLabel, contextLabel, actionLabel, kicker
}
```

- `tipo` define a apresentação padrão via `getPortfolioPresentation()` em `portfolio.js` (rótulo, contexto, texto do botão, filtro); os campos de override permitem ajustes por item (ex.: teaser vs. trailer).
- `link`: para vídeos, URL de embed (`youtube-nocookie.com/embed/...` ou Google Drive — embeds do Drive ganham um aviso `drive-shield` no modal, pois pedem login em alguns navegadores); para projetos, caminho da imagem ampliada (`assets/projetos/*.jpg`).
- Filtros (`.pf-btn` em servicos.html), na ordem da UI: `all`, `video`, `trailer`, `projetos`. Ordenação automática da grade: projetos → trailers → vídeos, estável por posição no array.
- Cards: descrição é cortada em excerpt automático (~120 caracteres, em fim de frase), entrada escalonada por `animation-delay` (60ms × índice) e imagens com `fetchpriority="low"` (480×270).
- Filtros têm navegação por setas ← → entre os botões (roving tabindex); ao trocar de filtro, os cards saem com a animação `is-filtered-out` (220ms) antes de receber `hidden`.
- Modal: navegação circular entre os itens **visíveis do filtro ativo** (botões `.pf-prev`/`.pf-next` e setas ← → do teclado); o container recebe `data-modal-type="video|project"`. Os botões `site`/`instagram` (`buildModalLinks`) valem para os dois layouts, não só para itens "projetos".

## Componentes criados dinamicamente (script.js)

### `ImageLightbox` (~linha 649)

Lightbox da galeria `#fotos` de servicos.html. O modal (`#img-lightbox`) só é inserido no DOM na primeira abertura. Delegação de clique em `.fotos-grid`: cada foto está num botão `.foto-zoom`; abre com fade+scale, `alt` vira legenda, fecha por X, clique no backdrop ou ESC. Trava o scroll do body, foca o botão de fechar e devolve o foco ao gatilho ao fechar.

### `PrivacyModal` (~linha 746)

Modal "Política de Privacidade" com o texto embutido na propriedade `content`. Dois gatilhos:

- Links com `data-open-privacy-modal="true"` (rodapé do formulário em contato.html) — abrem o modal em vez de navegar.
- Checkbox `input[name="consentimento"]`: o clique **não marca direto** — abre o modal e só marca se o usuário confirmar em "Entendi" (fluxo LGPD). Fechar por X, backdrop ou ESC = não confirmado.

Existe também a página estática [politica-de-privacidade.html](politica-de-privacidade.html); o modal é o atalho inline.

## Formulário de contato (fetch → enviar.php)

`initForm()` (~linha 400) intercepta o submit de `#contatoForm` (contato.html) e envia `FormData` via `fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' } })` para [enviar.php](enviar.php).

- **Resposta esperada**: JSON `{ "status": "success" | "error", "message": "..." }` (contrato completo em [README-backend.md](README-backend.md)). Sucesso = `response.ok` (qualquer 2xx; na prática o `enviar.php` responde 200); qualquer outro status exibe `responseData.message` (ou mensagem genérica) em `#msgErro` — se `#msgErro` não existir na página, o erro cai num `alert()`.
- Sucesso: `form.reset()`, limpa a classe `.selected` dos choice chips (o reset não limpa o visual), exibe `#msgOk` por 5s. `#msgOk`/`#msgErro` fazem `scrollIntoView()` ao aparecer.
- Estados do botão via classe `.loading` + conteúdo `.btn-loading` (ver contatos.css).
- Extras: contador de caracteres de `#mensagem` (`#mensagem-count`, aviso visual acima de 750) e lógica visual dos `.choice-chip`.

Sem JavaScript, o form faz POST nativo para `enviar.php` (que responde JSON — fallback degradado, não há página de confirmação).

## Navegação, animações e fallbacks

- **Menu mobile** (`initHeader`, ~linha 320): toggle `.mobile-menu-toggle` abre/fecha `.nav.active`, trava scroll do body (`overflow: hidden` + classe `.menu-open`), `aria-expanded`, fecha ao clicar em link ou com ESC (devolvendo o foco ao toggle). Header ganha `.scrolled` após 50px de scroll (debounce de 10ms).
- **Link ativo**: casado com `body[data-page]` (ex.: `data-page="servicos"`); fallback por `location.pathname` para a home.
- **Animações `[data-animate]`** (`initScrollAnimations`, ~linha 288): IntersectionObserver adiciona `.in-view` uma única vez por elemento, com `rootMargin` de 180px de pré-carga; elementos já próximos da viewport na carga recebem `in-view` imediatamente, sem passar pelo observer (`isElementNearViewport`). **Stagger automático**: irmãos `[data-animate]` no mesmo contêiner recebem `transition-delay` em cascata (80ms/item, teto 480ms); delays inline definidos na renderização (ex.: cards de serviço) são respeitados. Após a entrada, o delay inline e as classes `delay-100`…`delay-500` são removidos para não atrasar hovers. Sem `IntersectionObserver`, todos entram direto com `in-view`.
- **Fallback noscript**: páginas com `[data-animate]` incluem `<noscript><style>[data-animate]{opacity:1;transform:none}</style></noscript>` no `<head>` (index, sobre, servicos, contato) — sem JS, o conteúdo aparece estático em vez de invisível. `404.html` e `politica-de-privacidade.html` não usam `[data-animate]`, portanto não precisam do bloco.

## Hero carousel (hero-carousel.js)

Card stack carousel do hero de index.html (`#hero-stack`), IIFE independente. Fotos fixas no array `HERO_FOTOS` (mesmas `.webp` otimizadas de `Incentivart/fotos-site/` usadas na galeria de servicos.html), com `w`/`h` opcionais (default 1024×684); os 3 primeiros cards carregam eager, o resto `loading="lazy"`.

- **Navegação**: setas `[data-dir="-1"|"1"]`, teclado ← → (listener no container, que tem `tabindex="0"`), dots gerados dinamicamente em `.hero-stack-dots`, e swipe/arraste via Pointer Events (touch e mouse; limiar de 40px; `setPointerCapture` garante o `pointerup`).
- **Render**: classes `is-front` / `is-behind-1` / `is-behind-2` / `is-hidden` por offset circular; apenas o card frontal sai de `aria-hidden`.
- **Autoplay**: 5s; pausa em hover (`mouseenter`/`mouseleave`) e em `focusin`; qualquer interação manual reinicia o cronômetro (não desativa). Não há handler de `focusout` — uma pausa por `focusin` só é retomada no `mouseleave` (comportamento assimétrico intencional: foco via teclado não retoma o autoplay sozinho). Desativado com `prefers-reduced-motion: reduce`. Transições só com `transform`/`opacity`.

## Duplicações e dívidas conhecidas

- **`escapeHtml` duplicada**: definida em `script.js` (~linha 197) e `portfolio.js` (~linha 21). Como ambos são scripts clássicos, as duas declarações disputam o mesmo binding global — hoje são idênticas e a de `script.js` (carregado depois) prevalece, sem efeito prático. Ao alterar uma, altere a outra (ou extraia para um util compartilhado).
