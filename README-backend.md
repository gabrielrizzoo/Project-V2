# Backend — enviar.php

Único ponto de back-end do site: recebe o POST do formulário de [contato.html](contato.html) (via `fetch` em [script.js](script.js)) e envia o e-mail com PHP `mail()`. Responde sempre em JSON.

## Fluxo da requisição

1. Rejeita qualquer método que não seja POST (`405`).
2. **Honeypot**: se o campo oculto `website` vier preenchido, é bot → `400`.
3. **Rate limiting**: máximo de **5 envios por 5 minutos por IP** → `429` se exceder.
4. **Validação** de todos os campos (ver tabela abaixo) → `400` se falhar.
5. Monta o corpo HTML do e-mail com todos os valores escapados (`htmlspecialchars`).
6. Envia via `mail()` para `contato@incentivart.com.br` → `200` ou `500`.

## Campos aceitos

| Campo | Obrigatório | Validação server-side |
|---|---|---|
| `nome` | Sim | Não vazio, máx. 80 caracteres |
| `sobrenome` | Sim | Não vazio, máx. 120 caracteres |
| `email` | Sim | `FILTER_VALIDATE_EMAIL`, máx. 254 caracteres |
| `telefone` | Sim | Só `0-9 + ( ) espaço -`, 10–13 dígitos, máx. 30 caracteres |
| `mensagem` | Sim | Não vazia, máx. 800 caracteres |
| `consentimento` | Sim | Precisa vir marcado (LGPD) |
| `segmento[]` | Não | Whitelist: `teatro`, `musica`, `audiovisual`, `outros` |
| `website` | — | Honeypot: precisa vir **vazio** |

A validação client-side (atributos `required`/`maxlength`/`pattern` em contato.html) é só usabilidade; toda regra crítica é reaplicada aqui no servidor. Nuance conhecida: o `pattern` do telefone no cliente conta **caracteres** (10–30), enquanto o servidor exige **10–13 dígitos** — um telefone com 14+ dígitos passa no cliente e é rejeitado aqui (comportamento intencional, o servidor é a autoridade).

## Formato da resposta

```json
{ "status": "success" | "error", "message": "texto exibido ao usuário" }
```

HTTP: `200` sucesso · `400` validação · `405` método · `429` rate limit · `500` falha interna/mail.

## Decisões de segurança

- **Rate limiting usa `REMOTE_ADDR`** (IP do socket), nunca `X-Forwarded-For`, que é forjável pelo cliente. Os timestamps ficam em `logs/rate_limit_<ip>.log`; o diretório `logs/` é bloqueado para acesso web por [logs/.htaccess](logs/.htaccess) e o IP é higienizado antes de virar nome de arquivo (anti path traversal). `flock` evita corrida entre requisições simultâneas.
- **Header injection**: o e-mail do visitante vai no header `Reply-To` protegido por duas barreiras — `FILTER_VALIDATE_EMAIL` (rejeita quebras de linha) e `str_replace` de `\r`/`\n`.
- **XSS/HTML no e-mail**: todos os valores passam por `htmlspecialchars` antes de entrar no corpo HTML.
- **From do próprio domínio** (`no-reply@incentivart.com.br`): e-mail de terceiros no From falharia SPF/DKIM e cairia em spam. Requer SPF/DKIM configurados no painel do HostGator (ver [DEPLOY-HOSTGATOR.md](DEPLOY-HOSTGATOR.md)).
- **Erros não vazam detalhes do servidor**: mensagens genéricas em português para o usuário.

## Manutenção

- Os arquivos `logs/rate_limit_*.log` não são apagados automaticamente (um por IP, poucos bytes cada). Se acumularem, podem ser removidos em massa sem efeito colateral — o pior caso é um IP ganhar uma janela nova.
- Para trocar o destinatário ou os limites, edite as variáveis no topo de [enviar.php](enviar.php).