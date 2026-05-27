# Relatório Geral — `next-boilerplate`

Guia de entrada para criar um novo sistema com o `next-boilerplate`: stack, estrutura de pastas, autenticação (Keycloak + NextAuth), variáveis de ambiente e modo de execução (local/Docker).

## Contexto: para que este boilerplate existe?

O `next-boilerplate` é um ponto de partida para **aplicações web** (portais, sistemas internos e painéis administrativos) com:

- **Next.js (App Router)** + **TypeScript** com modo `strict`.
- **Biblioteca de UI Mantine** (componentes e layout) + **Tailwind CSS** (utilitários e consistência visual).
- **Autenticação padronizada** via **Keycloak** (GovPI) integrada ao **NextAuth**.
- **Padrões de organização** inspirados em Bulletproof React (separação de responsabilidades e escalabilidade).
- **Ferramentas de qualidade** (lint/format) e **Storybook** para design system/componentização.

O objetivo é padronizar “como fazemos frontend” e minimizar decisões repetitivas em cada projeto.

## Stack (o que roda aqui)

### Linguagem e framework

- **TypeScript** (`strict: true`)
- **React**
- **Next.js 15**

### UI e estilos

- **Mantine** (core + hooks + form + notifications + dates, etc.)
- **Tailwind CSS**
- Configs compartilhadas internas:
  - `@ui/mantine-config` (github: `SEPLANPI/ui-mantine-config`)
  - `@ui/tailwind-config` (github: `SEPLANPI/ui-tailwind-config`)

### Autenticação / sessão

- **NextAuth v5 (beta)** para sessão e callbacks
- **Keycloak** como provedor de identidade (SSO)
- **Middleware do Next.js** para proteção automática de rotas
- **Permission Gates** (client/server) para controle por componente

> A documentação completa do “boilerplate de auth” fica em `docs/auth/`.

### Dados, integrações e utilitários

- **Axios** (requisições)
- **@tanstack/react-query** (cache, revalidação e controle de estado server)
- **Zod** (validação/parse, incluindo env vars)
- **Zustand** (estado global quando faz sentido)
- **nuqs** (estado em querystring, quando necessário)
- **PostHog** (telemetria/analytics, opcional conforme projeto)

### Qualidade e DX (developer experience)

- **ESLint** e **Prettier**
- **Biome** (config no repo — pode coexistir com ESLint/Prettier conforme a política do projeto)
- **Storybook** (documentar e desenvolver componentes isolados)
- **Vitest** (config no repo)
- **Docker** (modo de execução simples com `docker-compose`)

## Como o projeto está organizado (entenda a “dinâmica”)

O boilerplate usa `src/` como raiz e separa responsabilidades por camadas:

- **`src/app/`**: rotas (Next App Router), layouts e pages.
- **`src/components/`**: componentes reutilizáveis (UI + layouts + públicos).
- **`src/lib/`**: infraestrutura e “cola” (ex.: auth, api client/server, retry, search params).
- **`src/config/`**: configuração tipada (ex.: rotas, sidebar, env).
- **`src/services/`**: integrações específicas (ex.: serviços externos).
- **`src/utils/`**: utilitários (formatting, validações, helpers).
- **`src/types/`**: tipos compartilhados e contratos internos.

O padrão é:

- UI bem componentizada (componentes pequenos, reusáveis).
- Regras de acesso centralizadas (middleware + gates).
- Integração com API via camada dedicada (`src/lib/api`, `src/utils/api/*`), evitando espalhar `fetch/axios` por toda UI.

## Variáveis de ambiente (por que existe validação)

As variáveis são tipadas e validadas com **Zod**. Se algo estiver faltando, o app falha cedo com uma mensagem clara.

Arquivos comuns:

- `.env` / `.env.local` (depende do modo de execução)
- `.env-example` como guia

Exemplos de variáveis importantes (resumo):

- **URLs**:
  - `NEXT_PUBLIC_APP_URL`: URL do frontend
  - `SERVER_API_URL`: URL da API para SSR / rede interna (com Docker)
  - `NEXT_PUBLIC_CLIENT_API_URL`: URL pública da API (browser)
- **Auth**:
  - `AUTH_SECRET`
  - `AUTH_URL`
  - `AUTH_KEYCLOAK_ISSUER`, `AUTH_KEYCLOAK_ID`, `AUTH_KEYCLOAK_SECRET`

## Autenticação (visão de alto nível)

O fluxo “padrão empresa” é:

1. Usuário acessa rota protegida.
2. Middleware verifica sessão.
3. Se não autenticado, redireciona para login (NextAuth/Keycloak).
4. Após login, a sessão é estabelecida e os tokens são gerenciados (incluindo refresh conforme configuração).
5. Na UI, componentes podem ser protegidos por **Permission Gates** (evita renderizar ações/rotas sem permissão).

Leitura recomendada:

- `docs/auth/README.md`
- `docs/auth/06-protecao-rotas.md`
- `docs/auth/07-protecao-componentes.md`

## Como rodar (do zero até “rodando”)

### Opção 1 — Docker

- `docker-compose up --build`
- A aplicação sobe em `http://localhost:3000`

### Opção 2 — Local

- Instale dependências com `pnpm install`
- Rode `pnpm dev`

## Integração com backend (o que alguém de fora precisa saber)

Este boilerplate assume que existe uma API (frequentemente Django/DRF) atrás. O que costuma variar por projeto:

- **URL da API** (SSR vs browser) — por isso existem `SERVER_API_URL` e `NEXT_PUBLIC_CLIENT_API_URL`.
- **Autenticação na API**:
  - quando a API usa JWT próprio, o frontend precisa mapear o token da sessão (Keycloak/NextAuth) para o header esperado;
  - quando a API confia no Keycloak, o token de acesso pode ser repassado como Bearer.

> A regra geral do boilerplate é: **centralizar esse comportamento** na camada de API (`src/lib/api`, `src/utils/api/*`) para não espalhar regra de auth por componentes.

## Padrões e convenções (para manter o código escalável)

- **Componentização**: prefira componentes pequenos e compostos.
- **Tipagem estrita**: tipos em `src/types/` e validação com `zod` nos pontos de borda (env, payloads).
- **Reutilização**: UI em `src/components/ui` e padrões de layout em `src/components/layouts`.
- **Rotas e permissões**: configuração centralizada em `src/config/routing.ts` e gates.
- **Evitar duplicação**: utilitários e adapters (API/formatters) em `src/lib` e `src/utils`.

## Leitura recomendada dentro do repositório

- [`README.md`](../README.md): setup e tecnologias
- [`docs/auth/README.md`](./auth/README.md): guia completo de autenticação/autorização
- [`docs/guias/api.md`](./guias/api.md) e [`docs/guias/api-legado.md`](./guias/api-legado.md): padrões de integração com API

