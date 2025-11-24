# CSS Modular - Estrutura de Arquivos

Este diretório contém os arquivos CSS modulares criados a partir da divisão do `style.css` original.

## Estrutura dos Arquivos

### 📁 Arquivos CSS Modulares

- **`global.css`** - Estilos globais, variáveis CSS, reset, layout base, header, footer, animações e portfólio
- **`sobre.css`** - Estilos específicos da seção "sobre", spotlight da fundadora e experiências
- **`contatos.css`** - Estilos específicos da seção "contatos" e formulários
- **`servico.css`** - Estilos específicos da seção "serviços", cards e clientes

## Como Importar nos Arquivos HTML

### Opção 1: Importação Modular (Recomendado)

Substitua a linha atual:
```html
<link rel="stylesheet" href="style.css" />
```

Por essas linhas na ordem correta:
```html
<!-- CSS Global (sempre necessário) -->
<link rel="stylesheet" href="css/global.css" />

<!-- CSS específico da página (adicione conforme necessário) -->
<!-- Para página inicial: adicione sobre.css -->
<link rel="stylesheet" href="css/sobre.css" />

<!-- Para página de serviços: adicione servico.css -->
<link rel="stylesheet" href="css/servico.css" />

<!-- Para página de contato: adicione contatos.css -->
<link rel="stylesheet" href="css/contatos.css" />
```

### Opção 2: Importação Completa

Se preferir carregar todos os estilos em todas as páginas:
```html
<!-- CSS Modular Completo -->
<link rel="stylesheet" href="css/global.css" />
<link rel="stylesheet" href="css/sobre.css" />
<link rel="stylesheet" href="css/contatos.css" />
<link rel="stylesheet" href="css/servico.css" />
```

## Exemplos Específicos por Página

### 📄 index.html (Página Inicial)
```html
<link rel="stylesheet" href="css/global.css" />
<link rel="stylesheet" href="css/sobre.css" />
```

### 📄 sobre.html
```html
<link rel="stylesheet" href="css/global.css" />
<link rel="stylesheet" href="css/sobre.css" />
```

### 📄 servicos.html
```html
<link rel="stylesheet" href="css/global.css" />
<link rel="stylesheet" href="css/servico.css" />
```

### 📄 contato.html
```html
<link rel="stylesheet" href="css/global.css" />
<link rel="stylesheet" href="css/contatos.css" />
```

### 📄 404.html
```html
<link rel="stylesheet" href="css/global.css" />
```

## Vantagens da Modularização

✅ **Manutenção mais fácil** - Cada arquivo tem responsabilidades específicas
✅ **Carregamento otimizado** - Apenas os estilos necessários por página
✅ **Organização melhor** - Código mais limpo e estruturado
✅ **Colaboração eficiente** - Diferentes desenvolvedores podem trabalhar em seções específicas
✅ **Cache otimizado** - Browsers podem cachear arquivos que não mudam

## Observações Importantes

⚠️ **Ordem de importação**: Sempre importe `global.css` primeiro, pois contém as variáveis CSS e estilos base
⚠️ **Dependências**: Alguns estilos em arquivos específicos podem depender de variáveis definidas em `global.css`
⚠️ **Compatibilidade**: Todos os estilos e animações originais foram preservados integralmente

## Conteúdo de Cada Arquivo

### global.css
- Variáveis CSS (:root)
- Reset CSS e estilos base
- Layout principal e navegação
- Header (topbar, brand, logo)
- Hero section horizontal
- Footer
- Animações globais
- Portfólio
- Modais e elementos compartilhados
- Responsividade global

### sobre.css
- Seção welcome
- Spotlight da fundadora
- Cards de experiência
- Cartões de perfil
- Seção sobre na home
- Botões outline
- CTAs específicas da seção sobre

### contatos.css
- Formulários de contato
- Campos de input e textarea
- Validação de formulários
- Botões de envio
- Métodos de contato
- Responsividade do formulário

### servico.css
- Banner de serviços
- Cards de serviços
- Badges e CTAs dos cards
- Seção de clientes
- Logos dos clientes
- Animações específicas dos serviços
