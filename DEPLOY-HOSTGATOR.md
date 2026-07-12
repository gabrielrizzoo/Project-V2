# Deploy no HostGator — Guia Prático

Passo a passo para publicar o site em `https://incentivart.com.br` (hospedagem compartilhada HostGator, Apache + PHP). O projeto não tem build step: os arquivos são enviados como estão.

## 1. Pré-deploy (checklist local)

- [ ] **Cache busting atualizado**: todo CSS/JS alterado teve o `?v=AAAAMMDD-N` atualizado nos `<link>`/`<script>` das páginas que o usam (ver [css/READMEcss.md](css/READMEcss.md)).
- [ ] **Sem `console.log` de debug** nos arquivos JS (o único `console.error` legítimo é o do tratamento de erro do formulário em `script.js`).
- [ ] **Nenhuma credencial no código**: `enviar.php` não usa senha/API key; confirme que nada foi adicionado.
- [ ] **Formulário testado localmente**: com PHP local (`php -S localhost:8000`), o `mail()` geralmente falha — o teste local válido é ver as validações e o rate limiting respondendo JSON corretamente; o envio real só é testável em produção.
- [ ] **`sitemap.xml` com `lastmod` atualizado** se páginas mudaram.
- [ ] Backup da versão atual do servidor feito (ver seção 9).

## 2. Acesso ao servidor

O projeto não guarda credenciais nem config de FTP — use uma das duas opções:

- **Gerenciador de Arquivos do cPanel** (mais simples): login no cPanel do HostGator → "Gerenciador de Arquivos" → `public_html`. Bom para atualizações pontuais; aceita upload de .zip com "Extrair".
- **FTP/SFTP** (melhor para o site inteiro): crie/obtenha uma conta FTP no cPanel ("Contas de FTP") e use FileZilla/WinSCP. Host: `ftp.incentivart.com.br` (ou o IP do servidor), porta 21 (FTP) — verifique no painel do HostGator se SFTP (porta 22) está disponível no seu plano.

## 3. Upload — o que sobe e o que não sobe

Destino: **`public_html/`** (raiz do domínio principal).

**Subir:**

```
index.html  sobre.html  servicos.html  contato.html
politica-de-privacidade.html  404.html  404.css
script.js  portfolio.js  portfolio-data.js  hero-carousel.js
enviar.php  .htaccess  robots.txt  sitemap.xml
apple-touch-icon.png
css/  assets/  Incentivart/  logs/  (incluindo logs/.htaccess)
```

**NÃO subir:**

- `.git/`, `.vscode/`
- `*.md` (READMEs, AUDITORIA.md, este guia) — se subirem por engano, o `.htaccess` já bloqueia o acesso web a eles, mas o ideal é nem enviar
- Arquivos de prompt/trabalho (`melhoria-*.md` etc.)

**Atenção:** `.htaccess` e `logs/.htaccess` são arquivos ocultos — habilite "mostrar arquivos ocultos" no FileZilla/Gerenciador de Arquivos para confirmar que subiram. Sem o `logs/.htaccess`, os arquivos de rate limiting ficariam acessíveis publicamente.

## 4. PHP e a função mail()

- O `mail()` funciona por padrão no HostGator compartilhado, mas a **entregabilidade** depende de SPF/DKIM do domínio: no cPanel, abra **"Email Deliverability"** e confirme que `incentivart.com.br` aparece como "Valid" (SPF e DKIM). Se não, use o botão "Repair" ou copie os registros DNS indicados.
- O `From` do e-mail é `no-reply@incentivart.com.br` (mesmo domínio) justamente para passar no SPF — não altere para o e-mail do visitante.
- **Versão do PHP**: o código usa `??` (null coalescing), exigindo **PHP ≥ 7.0**. Confirme no cPanel → "Select PHP Version" (recomendado: 8.1+). *Limites de envio de e-mail por hora variam por plano — verificar no painel do HostGator.*
- **Teste**: após o deploy, envie o formulário de verdade e confira se o e-mail chega em `contato@incentivart.com.br` (olhe também a caixa de spam). Envie 6 vezes seguidas para ver o `429` do rate limiting.

## 5. .htaccess no Apache do HostGator

As diretivas usadas (`mod_headers`, `mod_deflate`, `mod_expires`, `mod_rewrite`) são todas suportadas no Apache do HostGator, e cada bloco está protegido por `<IfModule>` — se um módulo faltar, o bloco é ignorado sem derrubar o site.

Depois de subir, verifique:

- `https://incentivart.com.br/sobre` abre (URL limpa sem `.html`) e `https://incentivart.com.br/sobre.html` redireciona para `/sobre`;
- Uma URL inexistente mostra a página 404 customizada;
- Os headers de segurança estão presentes (aba Network do navegador ou `curl -I https://incentivart.com.br`).
- A **CSP** está preparada porém **comentada** no `.htaccess` — só descomente depois de testar todas as páginas (em especial o portfólio, que carrega imagens e vídeos de domínios externos). Se algo quebrar, o console do navegador mostra qual origem precisa ser adicionada à política.

## 6. DNS / domínio

Se o domínio já aponta para o HostGator, nada a fazer. Caso contrário:

- **Opção A (recomendada)**: apontar os **nameservers** do registro do domínio (ex.: Registro.br) para os do HostGator (informados no e-mail de boas-vindas do plano — *verificar no painel do HostGator*).
- **Opção B**: manter o DNS atual e criar registro **A** de `incentivart.com.br` → IP do servidor HostGator, e **CNAME** de `www` → `incentivart.com.br`.
- Propagação leva de minutos a 24h.

## 7. HTTPS / SSL

1. No cPanel do HostGator, abra **SSL/TLS Status** e ative o certificado gratuito (Let's Encrypt/AutoSSL) para `incentivart.com.br` e `www`.
2. O redirecionamento HTTP→HTTPS **já está no `.htaccess`** (força HTTPS exceto em localhost) — não é preciso ativar redirecionamento no painel.
3. O header **HSTS** também já está configurado; ele só passa a valer quando o site responde em HTTPS.
4. Teste: `http://incentivart.com.br` deve redirecionar com 301 para `https://` e o cadeado deve aparecer sem aviso de conteúdo misto.

## 8. Pós-deploy (checklist de produção)

- [ ] As 6 páginas carregam sem erro no console (F12): Home, Sobre, Serviços, Contato, Política de Privacidade e uma URL inválida (404).
- [ ] CSS/JS carregam com as versões novas (aba Network: status 200, não 304 de versão antiga; confira o `?v=` nos links).
- [ ] Formulário de contato envia de verdade e o e-mail chega (teste também um envio inválido para ver a mensagem de erro).
- [ ] Rate limiting responde `429` após 5 envios em 5 minutos.
- [ ] `https://incentivart.com.br/robots.txt` e `/sitemap.xml` acessíveis.
- [ ] `https://incentivart.com.br/logs/` retorna **403/404** (nunca listagem de arquivos).
- [ ] `https://incentivart.com.br/READMEproject.md` retorna **403** (bloqueio de `.md` funcionando).
- [ ] Portfólio abre vídeos (YouTube) e projetos (imagens) no lightbox; carrossel do hero e galeria de fotos funcionam.
- [ ] Menu mobile abre e fecha em todas as páginas (incluindo a de política de privacidade).
- [ ] Favicon aparece na aba do navegador.

## 9. Rollback

Antes de cada deploy:

1. No Gerenciador de Arquivos do cPanel, selecione o conteúdo de `public_html` → **Compress** → gere `backup-AAAAMMDD.zip` e baixe (ou guarde fora de `public_html`).
2. Se algo quebrar após o deploy: apague os arquivos novos e extraia o backup de volta — o site volta ao estado anterior em minutos.
3. Como o projeto está no Git, o rollback de código também pode ser feito localmente (`git checkout` da versão anterior) e re-upload.
4. Se o problema for só de cache (página antiga aparecendo), confira se o `?v=` foi atualizado antes de suspeitar do servidor.
