# TechEvents - Plataforma de Descoberta de Eventos de Tecnologia

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Um site moderno e responsivo para descobrir e gerenciar eventos de tecnologia no Brasil.

## Características

- Design moderno e responsivo
- Paleta de cores profissional com gradientes
- Totalmente mobile-friendly
- Construído com Vite + React + TypeScript
- Componentes reutilizáveis
- Animações suaves

## Pré-requisitos

- Node.js 18+ ou superior
- pnpm (recomendado) ou npm

## Instalação

1. Instale as dependências:
```bash
pnpm install
# ou
npm install
```

## Como Usar

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
pnpm dev
# ou
npm run dev
```

O servidor estará disponível em `http://localhost:5173`

### Build para Produção

Para criar uma build otimizada:

```bash
pnpm build
# ou
npm run build
```

### Preview da Build

Para visualizar a build de produção localmente:

```bash
pnpm preview
# ou
npm run preview
```

## Estrutura do Projeto

```
techevents/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Header.css
│   │   ├── Hero.tsx
│   │   ├── Hero.css
│   │   ├── Events.tsx
│   │   ├── Events.css
│   │   ├── Footer.tsx
│   │   └── Footer.css
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Componentes

### Header
Barra de navegação fixa com logo e menu de navegação.

### Hero
Seção inicial com chamada para ação e imagem de destaque.

### Events
Grade de eventos com cards interativos mostrando informações de cada evento.

### Footer
Rodapé com links, redes sociais e newsletter.

## Cores Principais

- Primária: #6366f1 (Indigo)
- Secundária: #ec4899 (Pink)
- Dark: #0f172a (Azul escuro)
- Light: #f8fafc (Cinza claro)

## Fontes

- Sans: Sora (Google Fonts)
- Display: Playfair Display (Google Fonts)

## Tecnologias

- Vite - Build tool ultrarrápido
- React ^19.2.6 - Biblioteca UI
- TypeScript - Tipagem estática
- CSS3 - Estilos modernos com variáveis CSS

## Responsividade

O projeto é totalmente responsivo com breakpoints em:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## Deploy

Para fazer deploy, você pode usar:

- Vercel (recomendado)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Licença

Este projeto é de código aberto e está disponível sob a licença MIT. Veja [LICENSE](LICENSE) para detalhes.

## Autor

Criado com amor por Manus AI
