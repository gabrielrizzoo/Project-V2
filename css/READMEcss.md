# CSS - Estrutura Atual

Este diretório contém os arquivos CSS utilizados atualmente no site.

## Arquivos

- `global.css`: estilos globais, layout base, componentes compartilhados, seções de páginas e responsividade.
- `index.css`: estilos específicos da Home (card stack carousel do hero, sobreposto ao `.hero-glow`).
- `contatos.css`: ajustes específicos da página de contato e formulário.
- `servicos.css`: ajustes específicos da página de serviços (inclui a galeria de fotos `#fotos`).

## Importação Recomendada

Use sempre `global.css` em todas as páginas e adicione o CSS específico da página apenas quando necessário. Todos os links de estilo usam um parâmetro de versão (`?v=AAAAMMDD-N`) para cache busting; atualize esse valor sempre que o arquivo referenciado for alterado.

```html
<!-- Base do site -->
<link rel="stylesheet" href="css/global.css?v=20260712-1" />

<!-- Somente para a Home -->
<link rel="stylesheet" href="css/index.css?v=20260711-2" />

<!-- Somente para contato -->
<link rel="stylesheet" href="css/contatos.css?v=20260710-2" />

<!-- Somente para serviços -->
<link rel="stylesheet" href="css/servicos.css?v=20260712-1" />
```

## Mapeamento por Página

- `index.html`: `global.css` + `index.css`
- `sobre.html`: `global.css`
- `servicos.html`: `global.css` + `servicos.css`
- `contato.html`: `global.css` + `contatos.css`
- `404.html`: `global.css` + `404.css` (na raiz do projeto)
- `politica-de-privacidade.html`: `global.css`

## Escala de Espaçamento (spacing rhythm)

O espaçamento vertical entre seções usa uma escala de três níveis definida em `:root` no `global.css`. Não use valores fixos de padding em novas seções — escolha um nível da escala:

| Variável | Uso | Classe |
|---|---|---|
| `--space-section-sm` | Seções de transição/divisores (ex.: divisor "Nossa Equipe") | `.section--compact` |
| `--space-section-md` | Padrão de todas as seções | `.section` (default) |
| `--space-section-lg` | Seções-chave que devem respirar mais (ex.: blocos de CTA) | `.section--spacious` |

Os valores usam `clamp()`, então escalam sozinhos no mobile — não crie overrides de padding de seção em media queries.

## Variantes de Componentes

- `.card--static`: para cards de conteúdo **não clicável** (textos, stats, valores). Remove a elevação e a barra laranja de hover, que ficam reservadas a cards interativos.
- `.card--feature`: destaque sutil (borda/gradiente na cor primária) para **um** item por grid. Não use em mais de um card do mesmo grupo.
- `.card--feature-cycle`: variante animada do destaque — o realce circula entre os cards do grid em sequência (1→2→3→4→1...), um por vez. Aplique a **todos** os cards do grid (até 4); o delay é derivado de `:nth-child`. Usada no grid "Por que a Incentivart" em `servicos.html`.
- `.section-heading--left`: alinha o cabeçalho de seção à esquerda, para alternar o eixo entre seções consecutivas (evitar tudo centralizado).
- `.founder-grid--flip`: espelha o layout foto/texto (usado na segunda integrante da equipe em `sobre.html`).
- `.cta-block` + `.cta-actions`: bloco de CTA centralizado; use **um** botão primário (`btn-whatsapp` ou `btn-primary`) e o secundário como `btn-outline`.

## Animações

As entradas (`[data-animate]`) recebem stagger automático via `script.js`: irmãos animados no mesmo contêiner entram em cascata (80ms por item). As classes `delay-100`…`delay-500` continuam existindo como fallback, mas não são mais necessárias em novos elementos (o stagger inline do JS as sobrepõe). Cada página com `[data-animate]` também inclui um `<noscript>` no `<head>` que força `opacity:1` — sem JS a classe `.in-view` nunca é aplicada e o conteúdo ficaria invisível.

## Observação

Se novos arquivos CSS específicos forem criados no futuro, atualize este README para manter a documentação consistente com o código.
