# Atualização: Next 15 → 16.4 e React 19.3

Este guia mostra o que foi feito no boilerplate e o que cada projeto precisa conferir ao repetir a atualização. Ele supõe o projeto já no Next 15, com `params`/`searchParams` assíncronos, e no Mantine 8 ([guia anterior](./atualizacao-mantine-8.md)).

Guia oficial: https://nextjs.org/docs/app/guides/upgrading/version-16

## Passo a passo

1. **Atualizar as dependências.** Os tipos do React precisam ir para a 19 junto com o React.

   ```bash
   pnpm add next@16.4.6 react@19.3.1 react-dom@19.3.1
   pnpm add -D eslint-config-next@16.4.6 @next/eslint-plugin-next@16.4.6 \
     @types/react@^19.3 @types/react-dom@^19
   ```

   Requisitos: Node 20.9+ e TypeScript 5.1+.

   Não precisam de nova versão: Storybook 9.1 (`@storybook/nextjs-vite`), next-auth 5.0.0-beta.32 e nuqs 2.x, que já aceitam o Next 16.

2. **`JSX` global → `React.JSX`.** Os tipos do React 19 não têm mais o namespace `JSX` global.

   ```bash
   git grep -n "JSX\.Element" -- src | grep -v "React\.JSX"
   ```

3. **`middleware.ts` → `proxy.ts`.** Renomear o arquivo e o export:

   ```bash
   git mv src/middleware.ts src/proxy.ts
   ```

   ```ts
   // antes
   export default auth((req) => { … })
   // depois
   export const proxy = auth((req) => { … })
   ```

   - O `config.matcher` continua igual.
   - O proxy roda **só em Node**; não há opção de Edge.
   - Com o `auth()` do next-auth beta.32, funcionam tanto `export default auth(…)` quanto `export const proxy = auth(…)`: testado no build de produção com uma rota protegida, que redirecionou para o login. A documentação do Next recomenda o nome `proxy`.
   - O codemod `npx @next/codemod@16.4.6 middleware-to-proxy .` **não alterou** o boilerplate, porque o export é `default`. Fazer à mão.
   - `middleware.ts` ainda funciona no 16, como recurso obsoleto, mas será removido.

4. **`next lint` foi removido.**
   - Nos scripts `lint` e `lint:fix` do `package.json`, usar `eslint src` e `eslint src --fix`, e conferir se o CI chama `pnpm lint`.
   - Tirar a chave `eslint` do `next.config`, que o 16 não aceita mais. O `next build` também não roda mais o lint.
   - **Atenção:** `eslint .` lê também arquivos da raiz e de testes que o `next lint` nunca leu (`next-env.d.ts`, `tailwind.config.ts`, `*.cjs`, scripts `.mjs`) e aponta erros novos. Para manter o mesmo escopo, use `eslint src`, ou ajuste os `ignores` do `eslint.config.js` antes de ampliar.

5. **`tsconfig.json`.** O primeiro `next build` muda sozinho `jsx` para `react-jsx` e inclui `.next/dev/types/**/*.ts`. Commite essa mudança.

6. **Tipos de rota (`PageProps`, `LayoutProps`).**
   - Trocar as interfaces feitas à mão por `PageProps<"/rota">`. Assim a rota é conferida contra as que existem: uma rota que não existe dá erro de tipo.
   - O `typecheck` precisa gerar os tipos antes, senão o `tsc` de uma cópia limpa, como a do CI, não os encontra:

     ```json
     "typecheck": "next typegen && tsc --noEmit"
     ```

   - Em `PageProps`, cada `searchParams` é `string | string[] | undefined`. Um parâmetro repetido na URL (`?a=1&a=2`) chega como lista. Trate esse caso, por exemplo `typeof v === "string" ? v : padrão`.

7. **`<Button component={Link}>` em Server Component quebra (erro 500).**
   - No Next 16, `next/link` importado num Server Component é uma função do servidor e não pode ir como propriedade para um componente de cliente. O erro é `Functions cannot be passed directly to Client Components`.
   - Em Server Components, usar `LinkCliente` (`src/components/ui/link-cliente.tsx`, um `"use client"` que reexporta o `Link`).
   - Em arquivos `"use client"`, nada muda.

   ```bash
   # arquivos com component={Link} que NÃO são "use client"
   git grep -l "component={Link}" -- src | xargs grep -L '"use client"'
   ```

   O mesmo vale para outros `component={X}` com componentes do Next passados a partir de um Server Component.

8. **`pnpm start`** deve ser `next start`. O boilerplate chamava um `server.js` que não existia.

## O que conferir no projeto

| Mudança do Next 16 | Como achar | O que fazer |
|---|---|---|
| Turbopack é o padrão no `dev` e no `build` | `git grep -n "webpack" next.config.*` | com config `webpack` própria, o build falha: migrar ou usar `next build --webpack` |
| `next/image`: `qualities` padrão `[75]`, `imageSizes` sem `16`, cache mínimo de 4 h | `git grep -n "quality=" -- src`; `git grep -n "next/image" -- src` | incluir no `images.qualities` as qualidades usadas; `images.localPatterns` para `src` local com query string |
| `images.domains` obsoleto | `git grep -n "domains" next.config.*` | trocar por `remotePatterns` |
| `revalidateTag(tag)` com um argumento | `git grep -n revalidateTag` | `revalidateTag(tag, "max")`, ou `updateTag` em Server Action |
| Rotas paralelas sem `default.tsx` | pastas `@slot` | criar `default.tsx` (o build falha sem ele) |
| `unstable_cacheLife`/`unstable_cacheTag`, `experimental.ppr`, `experimental.dynamicIO` | `git grep -n "unstable_\|experimental" -- src next.config.*` | nomes sem `unstable_`; `cacheComponents` no lugar de `ppr`/`dynamicIO` |
| `skipMiddlewareUrlNormalize` | `next.config` | `skipProxyUrlNormalize` |
| `scroll-behavior: smooth` global | CSS global | `data-scroll-behavior="smooth"` no `<html>` para manter o comportamento antigo |
| `process.argv` sem `dev` no `next.config` | `git grep -n argv next.config.*` | usar `NODE_ENV` |
| Classes de CSS Modules mais curtas em produção (16.4) | seletores por nome de classe gerada | não depender do nome gerado |
| `next build` não mostra mais o tamanho das páginas | — | só informativo |

## Resultado no boilerplate

- Capturas de tela: **nenhuma diferença** nas 7 páginas. O `next/image` com imagens locais de `public/` não mudou nada.
- Quebras encontradas: o `JSX` global (14 pontos, em tipos de filtros) e o `component={Link}` em 2 Server Components (`/acesso-negado` e `/erro-autenticacao` davam 500). As duas foram pegas pelos testes: a primeira pelo `typecheck`, a segunda pelo ponta a ponta.
- Novo teste: `tests/e2e/proxy.spec.ts` confere que o build registrou o proxy em Node com o matcher de `src/proxy.ts`. Sem ele, um proxy com nome ou lugar errado simplesmente não rodaria, sem erro. Checagem de mutação: renomeando o arquivo, o teste falha.

## Recursos novos (não usados nesta etapa)

Esta etapa só troca a versão, sem mudar comportamento. Onde vale experimentar depois:

- **Cache Components** (`cacheComponents: true` + `"use cache"`): listas de domínio que mudam pouco (órgãos, programas). Vai ser o padrão no Next 17.
- **`<Activity>`** (React 19.2+): manter abas e filtros montados sem re-render, por exemplo nas abas de painel.
- **`useEffectEvent`**: efeitos que leem o estado mais recente sem entrar nas dependências, como o `useEffect` de `navigation-tabs.tsx`, que hoje gera um aviso de `exhaustive-deps`.
- **React Compiler** (`reactCompiler: true`, estável e desligado por padrão): avaliar à parte, com as capturas de tela e o ponta a ponta.
