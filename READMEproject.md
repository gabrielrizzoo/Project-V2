# Incentivart — Site Institucional

Site institucional estático (HTML + CSS + JS, com um endpoint PHP para envio do formulário de contato) da Incentivart, consultoria em projetos culturais e audiovisuais.

## Visão Geral

- **Tipo:** site estático multi-página (sem build step / framework).
- **Domínio:** `https://incentivart.com.br`
- **Back-end:** apenas [enviar.php](enviar.php) (processa o formulário de contato via PHP Mail).
- **Hospedagem:** referências a HostGator (ver comentário em [enviar.php](enviar.php)) e regras específicas de Apache em [.htaccess](.htaccess).

## Hierarquia do Projeto

```
Project-V2/
├── index.html                 Página inicial
├── sobre.html                  Página "Sobre"
├── servicos.html                Página "Serviços" (+ portfólio)
├── contato.html                 Página "Contato" (formulário)
├── politica-de-privacidade.html Página de política de privacidade
├── 404.html                     Página de erro 404
├── 404.css                      CSS exclusivo da página 404
├── script.js                    JS principal (navegação, formulários, animações, dados de Serviços)
├── portfolio.js                 Lógica do portfólio/lightbox (usado em index, sobre, servicos)
├── portfolio-data.js            Dados (array) consumidos pelo portfolio.js
├── enviar.php                   Endpoint PHP que envia o e-mail do formulário de contato
├── robots.txt                   Diretivas para crawlers + referência ao sitemap
├── sitemap.xml                  Mapa do site para SEO
├── .htaccess                    Headers de segurança, compressão, cache (Apache)
├── apple-touch-icon.png         Ícone para dispositivos Apple
├── css/
│   ├── global.css                Design system, layout base, componentes e responsividade (usado em todas as páginas)
│   ├── contatos.css               Estilos específicos de contato.html
│   ├── servicos.css                Estilos específicos de servicos.html
│   └── README.md                  Documentação da pasta css/
├── assets/
│   ├── favicon.ico, icon-192x192.png, icon-512x512.png, shield-icon.svg
│   └── projetos/                  Imagens de projetos exibidas no portfólio (Arte de Amar, Ideias Brasil, etc.)
├── Incentivart/
│   └── Foto/                      Fotos da equipe (Lud, Rowena)
├── logs/
│   └── .htaccess                  Bloqueio de acesso ao diretório de logs
└── .vscode/
    └── launch.json                 Configuração de debug/execução no VS Code
```

## Páginas HTML e o que cada uma carrega

| Página | CSS | JS | Observação |
|---|---|---|---|
| [index.html](index.html) | `global.css` | `portfolio-data.js`, `portfolio.js`, `script.js` | Home, exibe portfólio |
| [sobre.html](sobre.html) | `global.css` | `portfolio-data.js`, `portfolio.js`, `script.js` | Institucional |
| [servicos.html](servicos.html) | `global.css`, `servicos.css` | `portfolio-data.js`, `portfolio.js`, `script.js` | Lista de serviços + portfólio |
| [contato.html](contato.html) | `global.css`, `contatos.css` | `script.js` | Formulário envia para `enviar.php` |
| [politica-de-privacidade.html](politica-de-privacidade.html) | `global.css` | `script.js` | Texto institucional |
| [404.html](404.html) | `global.css`, `404.css` | `script.js` | Página de erro |

Todas as páginas também carregam a fonte `Font Awesome` via CDN (`cdnjs.cloudflare.com`). Os links de CSS/JS locais usam parâmetro de versão (`?v=AAAAMMDD-N`) para cache busting — atualize esse valor sempre que o arquivo referenciado mudar (ver [css/README.md](css/README.md)).

## CSS

Ver detalhes completos em [css/README.md](css/README.md). Resumo:

- `global.css`: base do site, usado em todas as páginas.
- `contatos.css`: só em `contato.html`.
- `servicos.css`: só em `servicos.html`.
- `404.css` (na raiz): só em `404.html`.

## JavaScript

- **[script.js](script.js):** script principal — navegação (menu/scroll), envio do formulário de contato (via `fetch` para `enviar.php`), animações/transições e os dados de configuração dos Serviços (`SERVICOS_DATA`) usados em `servicos.html`.
- **[portfolio-data.js](portfolio-data.js):** define `window.PORTFOLIO_DATA`, array com os itens exibidos no portfólio (vídeos/imagens, título, descrição, link).
- **[portfolio.js](portfolio.js):** consome `PORTFOLIO_DATA` para renderizar a grade do portfólio, filtros e o lightbox/modal de visualização.

Ordem de carregamento nas páginas que usam portfólio: `portfolio-data.js` → `portfolio.js` → `script.js` (todos com `defer`).

## PHP

- **[enviar.php](enviar.php):** recebe o POST do formulário de `contato.html`, valida/sanitiza campos (nome, sobrenome, email, telefone, mensagem), aplica rate limiting (5 envios / 5 minutos por IP) e envia e-mail para `contato@incentivart.com.br`, respondendo em JSON.

## Assets e Mídia

- `assets/`: ícones do site (favicon, PWA icons, shield) e `assets/projetos/` com as imagens usadas no portfólio institucional.
- `Incentivart/Foto/`: fotos da equipe usadas nas páginas institucionais.

## SEO e Infraestrutura

- [robots.txt](robots.txt): libera indexação geral e aponta para o `sitemap.xml`.
- [sitemap.xml](sitemap.xml): lista as URLs indexáveis do site.
- [.htaccess](.htaccess) (raiz): define headers de segurança (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`), compressão (mod_deflate) e cache de navegador (mod_expires).
- [logs/.htaccess](logs/.htaccess): bloqueia acesso público ao diretório `logs/`.

## Documentação Interna

- [css/README.md](css/README.md): guia de uso dos arquivos CSS.

## Convenções

- Sem processo de build: arquivos são servidos diretamente (HTML/CSS/JS estáticos + PHP).
- Cache busting manual via querystring `?v=AAAAMMDD-N` nos `<link>`/`<script>` locais — sempre atualizar a versão ao alterar o arquivo referenciado.
- Novas páginas devem seguir o padrão de imports: `global.css` sempre primeiro, CSS específico depois, e scripts com `defer`.
