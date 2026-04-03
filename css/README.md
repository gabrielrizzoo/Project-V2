# CSS - Estrutura Atual

Este diretório contém os arquivos CSS utilizados atualmente no site.

## Arquivos

- `global.css`: estilos globais, layout base, componentes compartilhados, seções de páginas e responsividade.
- `contatos.css`: ajustes específicos da página de contato e formulário.

## Importação Recomendada

Use sempre `global.css` em todas as páginas e adicione `contatos.css` apenas quando necessário.

```html
<!-- Base do site -->
<link rel="stylesheet" href="css/global.css" />

<!-- Somente para contato -->
<link rel="stylesheet" href="css/contatos.css" />
```

## Mapeamento por Página

- `index.html`: `global.css`
- `sobre.html`: `global.css`
- `servicos.html`: `global.css`
- `contato.html`: `global.css` + `contatos.css`
- `404.html`: `global.css` + `404.css` (na raiz do projeto)
- `politica-de-privacidade.html`: `global.css`

## Observação

Se novos arquivos CSS específicos forem criados no futuro, atualize este README para manter a documentação consistente com o código.
