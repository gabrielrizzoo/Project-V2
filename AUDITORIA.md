# AUDITORIA.md — Auditoria Geral (12/07/2026)

Changelog da auditoria de defeitos, limpeza de código, segurança e documentação. Nenhuma alteração muda o resultado visual do site, exceto as correções de bugs explicitamente marcadas como **[bug visual]**.

Arquivos alterados nesta auditoria e novas versões de cache busting:

| Arquivo | Versão nova | Onde atualizar |
|---|---|---|
| `css/global.css` | `?v=20260712-1` | todas as 6 páginas (feito) |
| `css/servicos.css` | `?v=20260712-1` | servicos.html (feito) |
| `script.js` | `?v=20260712-1` | todas as 6 páginas (feito) |

Demais CSS/JS não mudaram e mantêm as versões anteriores.

---

## Fase 1 — Defeitos encontrados e corrigidos

| # | Arquivo(s) | Problema | Correção |
|---|---|---|---|
| 1 | 6 páginas HTML | `<link rel="icon" href="favicon.ico">` apontava para a raiz, mas o arquivo está em `assets/` → 404 em todas as páginas | Corrigido para `assets/favicon.ico` |
| 2 | politica-de-privacidade.html | **[bug visual/mobile]** Página sem o botão hamburger: no mobile o CSS esconde a nav fora da tela e não havia como abri-la → navegação inutilizável | Adicionado o `.mobile-menu-toggle` padrão das outras páginas; adicionado `aria-label` na nav |
| 3 | index, sobre, servicos, contato | Sem JavaScript, os elementos `[data-animate]` ficam com `opacity:0` para sempre (`.in-view` nunca é aplicada) → conteúdo invisível | Adicionado `<noscript><style>[data-animate]{opacity:1;transform:none}</style></noscript>` no `<head>` |
| 4 | script.js + contatos.css | **[bug visual]** Ao enviar o formulário, o botão ficava **em branco**: o JS injetava `<span class="btn-loading">Enviando...</span>`, mas o CSS esconde `.btn-loading` a menos que o botão tenha a classe `.loading` — que nunca era adicionada | O submit agora adiciona/remove `btn.classList` `loading` junto com o estado de envio |
| 5 | script.js | Função `initPortfolioWhenVisible()` (~60 linhas) declarada e nunca chamada (o portfólio passou a renderizar imediatamente no `DOMContentLoaded`) | Código morto removido |
| 6 | sobre.html / servicos.html × global.css | Classes `delay-400` e `delay-500` usadas no HTML (e listadas em `REVEAL_DELAY_CLASSES` no script.js) mas nunca definidas no CSS | Classes adicionadas ao global.css (sem efeito visual: com JS o stagger inline as sobrepõe) |
| 7 | global.css | Seletores órfãos `.rotate-360`/`.card:hover .rotate-360` e `.btn-contact`/`.btn-contact:hover` — nenhum uso em HTML/JS | Removidos |
| 8 | servicos.css × global.css | Bloco `body[data-page="servicos"] .section-tag` (+ `::before`) duplicava regra idêntica do global.css | Duplicata removida (rendering idêntico via global) |
| 9 | sitemap.xml | Listava `/politica-de-privacidade`, que tem `meta robots noindex` (sinais contraditórios para o Google); `lastmod` parado em 2026-04-22 | URL removida do sitemap; `lastmod` atualizado para 2026-07-12 |
| 10 | READMEproject.md | Links de documentação apontavam para `css/README.md`, mas o arquivo real é `css/READMEcss.md` (link quebrado) | Corrigido em todas as ocorrências |

**Verificado e OK (sem correção necessária):** ordem de carregamento `portfolio-data.js → portfolio.js → script.js` (defer) correta em todas as páginas; nenhum ID duplicado por página; todas as imagens com `alt`; links internos entre páginas e para `enviar.php` válidos; robots.txt válido e apontando para o sitemap; cache busting dos arquivos não alterados condizente com as datas de modificação.

### Pendências da Fase 1 (decisão humana)

- **`assets/og-image.jpg` não existe**, mas é referenciado nos metadados Open Graph/Twitter das páginas — compartilhamentos em redes sociais ficam sem imagem. Criar uma imagem 1200×630 e subir em `assets/`.
- **Footer: LinkedIn e Instagram com `href="#"`** (placeholder) em todas as páginas. Inserir as URLs reais ou remover os ícones.
- **Hierarquia de headings com saltos** (ex.: `h1→h4` em contato.html, `h2→h4` nas seções de equipe em sobre.html). Corrigir exige trocar tags e compensar no CSS para não mudar o visual — fica para decisão de design/acessibilidade.
- **Seletores órfãos mantidos** (baixo risco, candidatos a remoção futura): `.flex-center`, `.flex-column`, `.numbered-list`, `.pf-item figcaption`/`.pf-caption`, `.services-grid .card` (global.css) e `.btn-text`/`.btn.full` (contatos.css).
- **`escapeHtml` duplicada** em script.js e portfolio.js (implementações idênticas; inofensivo — unificação exigiria decidir o ponto único de definição).

---

## Fase 2 — Comentários

- **script.js**: comentários em inglês do `PrivacyModal` traduzidos/reescritos focando o *porquê* (por que o checkbox de consentimento abre o modal antes de marcar; por que há atraso ao limpar `triggerCheckbox`); comentários óbvios removidos; código morto removido (item 5 da Fase 1). Comentários existentes de stagger/animação já estavam bons e foram mantidos.
- **enviar.php**: removidos comentários desatualizados ("Substitua pelo seu e-mail real", "Use um e-mail do seu domínio"); adicionados comentários explicando **por quê**: uso de `REMOTE_ADDR` em vez de `X-Forwarded-For`, honeypot, `flock` contra corrida, sanitização no output (e não na entrada), whitelist de segmentos, dupla barreira contra header injection e por que o `From` precisa ser do próprio domínio (SPF/DKIM). Nenhuma mudança de lógica.
- **.htaccess**: cada bloco agora explica seu motivo (por que `-MultiViews`, o que cada header protege, por que CSS/JS podem ter cache de 1 mês com `?v=`, o que cada grupo de rewrites faz).
- **CSS**: os comentários existentes (valores mágicos, hacks de `-webkit-text-fill-color`, variantes) já seguiam o padrão e foram mantidos.

---

## Fase 3 — Segurança

| Severidade | Achado | Status |
|---|---|---|
| **Médio** | Falta de `Strict-Transport-Security` (HSTS) — site já força HTTPS mas o navegador podia tentar HTTP primeiro | **Corrigido no código** (.htaccess): `max-age=31536000; includeSubDomains`. Só surte efeito com SSL ativo |
| **Médio** | Falta de `Content-Security-Policy` | **Parcial**: política completa preparada e **comentada** no .htaccess (o portfólio consome imagens/vídeos de vários domínios externos — ativar sem testar poderia quebrar o site). Ativar após testar todas as páginas |
| **Baixo** | `X-XSS-Protection "1; mode=block"` — header obsoleto; o filtro que ele controlava foi removido dos navegadores e em versões antigas podia até introduzir vulnerabilidade | **Corrigido**: removido do .htaccess |
| **Baixo** | Formulário sem token CSRF | **Pendência (aceito)**: para formulário público de contato o risco é baixo e já há honeypot + rate limiting + consentimento obrigatório. Implementar exigiria sessão PHP |
| **Baixo** | Arquivos `logs/rate_limit_*.log` acumulam indefinidamente (um por IP) | **Pendência**: impacto mínimo (bytes); podem ser apagados manualmente. Documentado em README-backend.md |
| **Info** | Bloqueio de `logs/` depende do Apache processar `.htaccess` | **Pendência de servidor**: teste de caminho direto (`/logs/`) incluído no checklist pós-deploy do DEPLOY-HOSTGATOR.md |

**Verificado e OK:**

- **Header injection em enviar.php**: `Reply-To` protegido por dupla barreira (`FILTER_VALIDATE_EMAIL` rejeita quebras de linha + `str_replace` de `\r\n`); `From` fixo do próprio domínio.
- **Rate limiting resistente a bypass simples**: usa `REMOTE_ADDR` (do socket TCP, não forjável), não headers do cliente; IP higienizado antes de virar nome de arquivo (anti path traversal); `flock` contra corrida. Comportamento confere com o documentado (5 envios/5 min).
- **XSS**: todos os pontos de `innerHTML` com dados dinâmicos (serviços, clientes, portfólio, lightbox) passam por `escapeHtml`; a mensagem de erro do formulário usa `textContent`; o conteúdo do modal de privacidade é estático. Nenhum dado de query string é inserido no DOM.
- **Validação server-side completa**: toda regra do client-side (required/maxlength/pattern) é reaplicada no enviar.php — o client-side não é a única camada.
- **Exposição de arquivos**: sem `.env`, credenciais ou chaves no código; `.git/`, `.vscode/`, dotfiles e `*.md` bloqueados por rewrite no .htaccess; `logs/` bloqueado por `.htaccess` próprio (Apache 2.2 e 2.4).
- **HTTPS**: redirecionamento 301 forçado no .htaccess (exceto localhost); site não usa cookies; formulário posta para o mesmo domínio (sem CORS).
- **Mensagens de erro** do enviar.php são genéricas e não vazam informação do servidor.

---

## Fase 4 — Documentação

- **READMEproject.md** atualizado: links corrigidos para `css/READMEcss.md`, hierarquia com os novos arquivos, seção de infra refletindo o .htaccess atual (HSTS, CSP comentada, URLs limpas), nota do fallback `<noscript>` e "Documentação Interna" com os 4 documentos.
- **css/READMEcss.md** atualizado: versões de cache busting novas; seção de animações agora cobre `delay-100…delay-500` e o fallback `<noscript>`.
- **README-backend.md** (novo): documenta o enviar.php — fluxo, tabela de campos/validações, formato de resposta, decisões de segurança e manutenção.

## Fase 5 — Deploy

- **DEPLOY-HOSTGATOR.md** (novo): pré-deploy, acesso (cPanel/FTP), o que subir e o que não subir, `mail()` + SPF/DKIM, compatibilidade do .htaccess, DNS, SSL/HTTPS, checklist pós-deploy e rollback. Particularidades incertas do HostGator (limite de e-mails/hora, nameservers) estão marcadas como "verificar no painel do HostGator".

---

## Checklist final

- [x] Nenhuma alteração mudou o resultado visual (exceções: bugs corrigidos — botão "Enviando..." em branco e menu mobile ausente na página de política, listados acima)
- [x] Cache busting atualizado em todos os CSS/JS alterados (global.css, servicos.css, script.js → `20260712-1`)
- [x] Comentários inúteis/desatualizados removidos; comentários de "porquê" adicionados em enviar.php, script.js e .htaccess
- [x] `css/READMEcss.md` e `READMEproject.md` consistentes com o código real
- [x] `README-backend.md` criado e referenciado no READMEproject.md
- [x] `DEPLOY-HOSTGATOR.md` criado
- [x] Achados de segurança documentados com severidade (tabela da Fase 3)
- [x] Sintaxe do script.js validada (`node --check`); alterações no enviar.php foram apenas comentários
