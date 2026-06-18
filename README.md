# LoL Quiz

Quiz visual de League of Legends. Uma imagem de campeão aparece por frações de segundo e você precisa identificar quem é antes do tempo acabar.

## Como funciona

1. Escolha a quantidade de rodadas (10, 30, 50, 75 ou 100)
2. A imagem do campeão aparece por 50ms
3. A imagem some e você tem 3 segundos para escolher entre 4 opções
4. No final, veja seu resultado com histórico de acertos e erros

## Tech Stack

- **React 19** com TypeScript
- **Vite 8** para build e dev server
- **React Query** (@tanstack/react-query) para fetch de dados
- **SCSS** para estilização
- **Riot Data Dragon API** para dados e imagens dos campeões

## Estrutura do projeto

```
src/
├── types.ts              — Interfaces e tipos
├── constants.ts          — URLs da API e configurações
├── utils.ts              — Funções utilitárias
├── hooks/
│   └── useChampions.ts   — Hook de dados com React Query
├── components/
│   ├── HomeScreen.tsx    — Tela inicial
│   ├── GameScreen.tsx    — Tela do jogo
│   ├── ResultScreen.tsx  — Tela de resultado final
│   ├── ChampionDisplay.tsx
│   ├── TimerBar.tsx
│   ├── OptionButton.tsx
│   └── StatsRow.tsx
├── App.tsx
├── App.scss
├── index.scss
└── main.tsx
```

## Rodando localmente

```bash
npm install
npm run dev
```

> Requer Node.js 20.19+ ou 22.12+

## Build

```bash
npm run build
npm run preview
```

## Autor

Developed by [CaioMassola](https://github.com/CaioMassola)
