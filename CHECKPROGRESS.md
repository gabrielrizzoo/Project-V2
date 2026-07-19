# CHECKPROGRESS.md — Progresso até a Produção (19/07/2026)

Checklist do que falta para colocar o site em produção (`https://incentivart.com.br`), atualizado após revisão completa do repositório nesta data (documentação verificada linha a linha contra o código; deploy em [DEPLOY-HOSTGATOR.md](DEPLOY-HOSTGATOR.md)).

## 1. Pronto (verificado nesta revisão)

- [x] **`assets/og-image.jpg` criado** — JPEG 1200×630 (~95 KB), referenciado com URL absoluta nas tags `og:image`/`twitter:image` das 4 páginas indexáveis. Política (`noindex`) e 404 sem OG é intencional.
- [x] **Cache busting coerente** — todos os `?v=AAAAMMDD-N` das 6 páginas conferem com os arquivos modificados (`global.css` em `20260719-2`; demais CSS/JS sem alteração desde suas versões).
- [x] **Footer social consistente** — X (`x.com/incentivart_`) e Instagram real (`instagram.com/incentivart_projetos/`) nas 5 páginas com footer social (era pendência: 4 páginas estavam com `href="#"`).
- [x] **CSP ativada** (era pendência) — política do `.htaccess` agora ativa; todas as origens externas do site foram enumeradas e estão cobertas: Font Awesome (`cdnjs`), Google Fonts, thumbnails (`img.youtube.com`, `i.ytimg.com`, `acsta.net`, `cafecomfilme.com.br`) e embeds (`youtube-nocookie.com`, `drive.google.com`). **Verificar o console no pós-deploy** (item 3).
- [x] **Ícones regenerados nos tamanhos declarados** — `icon-192x192.png`, `icon-512x512.png` e `apple-touch-icon.png` eram PNGs 1161×1004 (não quadrados) declarados como 192/512/180; agora são quadrados nos tamanhos reais (apple-touch-icon com fundo `#050505`, pois iOS não aceita transparência).
- [x] **Segurança do back-end validada** — `enviar.php` confere com [README-backend.md](README-backend.md): honeypot, rate limiting por `REMOTE_ADDR` com `flock` (5/5min), sanitização anti header injection no `Reply-To`, `htmlspecialchars` no corpo, respostas JSON sem vazar detalhes.
- [x] **Bloqueios de exposição no `.htaccess`** — `.git/`, `.vscode/`, dotfiles e `*.md` bloqueados; `logs/` com `.htaccess` próprio (Apache 2.2 e 2.4).
- [x] **Sem links quebrados** — todos os assets referenciados existem no disco (imagens do portfólio, 13 logos de parceiros, 8 fotos de clientes, fotos da galeria/hero, ícones, favicon).
- [x] **SEO coerente** — `sitemap.xml` com `lastmod` atualizado e sem a página de política (que é `noindex`); `robots.txt` apontando o sitemap; canonical nas 4 páginas indexáveis; `lang="pt-BR"` em todas.
- [x] **Documentação alinhada com o código** — READMEs revisados contra os fontes; referências ao `AUDITORIA.md` (arquivo removido do projeto) eliminadas de todos os documentos.

## 2. Bloqueios de produção (antes do go-live)

- [ ] **Trabalho não commitado no Git** — 11 arquivos modificados + 3 novos (`CHECKPROGRESS.md`, `READMEjs.md`, `assets/og-image.jpg`) + `AUDITORIA.md` deletado. O deploy deve partir de um estado versionado: revisar o diff, commitar e só então subir.
- [ ] **Formulário nunca testado em produção real** — o `mail()` só é testável no servidor HostGator. **Fazer o tutorial da seção 4 logo após o deploy** — o go-live só se confirma quando o e-mail chegar em `contato@incentivart.com.br` e o `429` do rate limiting responder.
- [ ] **`og-image.jpg` sem validação social** — confirmar que a arte está correta e, após o deploy, validar com o [Sharing Debugger do Meta](https://developers.facebook.com/tools/debug/) e o Card Validator do X (as redes fazem cache agressivo da primeira leitura — valide antes de divulgar o link).

## 3. Pós-deploy (verificações em produção)

- [ ] Checklist completo da seção 8 do [DEPLOY-HOSTGATOR.md](DEPLOY-HOSTGATOR.md) (6 páginas, URL limpa, 404 customizada, headers, `/logs/` → 403, `.md` → 403).
- [ ] **CSP**: abrir as 6 páginas com F12 e confirmar que não há erros de `Content-Security-Policy` no console; abrir um vídeo e um projeto do portfólio no modal. Se algo for bloqueado, o console indica a origem faltante (ou comente a linha da CSP no `.htaccess` para reverter).
- [ ] Tutorial do formulário (seção 4 abaixo).

## 4. Tutorial — testar o formulário no HostGator (fazer DEPOIS do deploy)

O `mail()` não funciona em ambiente local — estes testes só valem em `https://incentivart.com.br`.

**Pré-requisito:** no cPanel → **Email Deliverability**, `incentivart.com.br` deve estar "Valid" (SPF e DKIM). Sem isso o e-mail cai em spam ou nem sai.

1. **Envio válido:** abra `/contato`, preencha e envie. Esperado: mensagem verde de sucesso em `#msgOk`. Confira a chegada em `contato@incentivart.com.br` (olhe o spam) e verifique que o `Reply-To` do e-mail é o endereço do visitante.
2. **Envio inválido:** envie com e-mail malformado ou mensagem vazia. Esperado: mensagem de erro em `#msgErro` (HTTP 400), sem quebra da página.
3. **Rate limiting:** envie o formulário válido 6 vezes seguidas. Esperado: as 5 primeiras passam, a 6ª retorna **429** com a mensagem de "muitas tentativas". No cPanel (Gerenciador de Arquivos), confira que `logs/rate_limit_<ip>.log` foi criado — pela web, `/logs/` deve continuar dando 403.
4. **Método errado (opcional, via terminal):** `curl -I https://incentivart.com.br/enviar.php` → esperado **405**.
5. **Honeypot (opcional, via terminal):** `curl -X POST https://incentivart.com.br/enviar.php -d "website=preenchido"` → esperado **400** (bots caem aqui antes de qualquer validação).

**Se o e-mail não chegar:** (a) confirme SPF/DKIM no Email Deliverability; (b) verifique o limite de envios/hora do plano no painel; (c) veja o log de erros do PHP no cPanel; (d) teste com outra caixa de destino editando `$destinatario` no topo de `enviar.php`.

## 5. Pendências de decisão humana (não bloqueiam o go-live)

- [ ] **Hierarquia de headings com saltos** — `h1`→`h4` em contato.html (:108→:113); `h2`→`h4` nas fichas de equipe de sobre.html (:173→:174 e :316→:317) e sequência invertida `h3`→`h2` em sobre.html (:299→:316). Corrigir exige trocar as tags e compensar no CSS sem mudar o visual — decisão de design/acessibilidade.
- [ ] **Seletores órfãos e `escapeHtml` duplicada** — a função existe idêntica em script.js:197 e portfolio.js:21 (a de `script.js` prevalece, sem efeito prático). Remoção/unificação fica para decisão futura.
- [ ] **CSRF token no formulário** — risco baixo aceito (honeypot + rate limiting + consentimento); implementar exigiria sessão PHP. Decidir se vale o custo.
- [ ] **`politica-de-privacidade.html` sem canonical** — mitigado pelo `noindex`; adicionar é opcional, por consistência.
