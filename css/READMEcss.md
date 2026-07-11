# CSS - Estrutura Atual

Este diretório contém os arquivos CSS utilizados atualmente no site.

## Arquivos

- `global.css`: estilos globais, layout base, componentes compartilhados, seções de páginas e responsividade.
- `contatos.css`: ajustes específicos da página de contato e formulário.
- `servicos.css`: ajustes específicos da página de serviços.

## Importação Recomendada

Use sempre `global.css` em todas as páginas e adicione o CSS específico da página apenas quando necessário. Todos os links de estilo usam um parâmetro de versão (`?v=AAAAMMDD-N`) para cache busting; atualize esse valor sempre que o arquivo referenciado for alterado.

```html
<!-- Base do site -->
<link rel="stylesheet" href="css/global.css?v=20260710-1" />

<!-- Somente para contato -->
<link rel="stylesheet" href="css/contatos.css?v=20260523-1" />

<!-- Somente para serviços -->
<link rel="stylesheet" href="css/servicos.css?v=20260523-1" />
```

## Mapeamento por Página

- `index.html`: `global.css`
- `sobre.html`: `global.css`
- `servicos.html`: `global.css` + `servicos.css`
- `contato.html`: `global.css` + `contatos.css`
- `404.html`: `global.css` + `404.css` (na raiz do projeto)
- `politica-de-privacidade.html`: `global.css`

## Observação

Se novos arquivos CSS específicos forem criados no futuro, atualize este README para manter a documentação consistente com o código.
