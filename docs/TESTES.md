# Testes

Quatro camadas, da mais barata para a mais cara. O CI (`.github/workflows/verificar.yml`) roda todas em todo PR.

| Comando | O quê | Onde |
|---|---|---|
| `pnpm typecheck` | `next typegen` (tipos de rota) + `tsc --noEmit` | — |
| `pnpm lint` | ESLint + Prettier em `src` | — |
| `pnpm test` | unitários (Vitest, Node) | `src/**/*.test.ts` |
| `pnpm test:storybook` | cada story renderiza; `play()` testa interação | `src/**/*.stories.tsx` |
| `pnpm test:e2e` | ponta a ponta + capturas de tela (Playwright) | `tests/e2e/` |

## Unitários

Lógica pura: controle de acesso por rota (`lib/routes`), renovação do token e verificação de sessão (`lib/auth`, com o Keycloak simulado por `fetch`), nova tentativa de chamadas HTTP (`lib/retry`), utilitários e a compatibilidade visual do tema com o Mantine 8 (`lib/mantine`).

O boilerplate vem com **todas as rotas públicas**. A proteção por rota e role é testada em `src/lib/routes/matcher.test.ts` com uma configuração simulada; ao definir rotas protegidas no projeto, acrescente casos lá. Que o proxy (`src/proxy.ts`) entrou no build, em Node e com o matcher do arquivo, é conferido em `tests/e2e/proxy.spec.ts`.

## Stories

Toda story vira um teste de renderização. Para testar comportamento, use `play()` (exemplo: `FiltroEstatico` em `filters.stories.tsx`). O dropdown do Mantine abre num portal: busque com `within(canvasElement.ownerDocument.body)`.

## Ponta a ponta (Playwright)

Roda contra o **build de produção**:

```bash
# variáveis de teste (fictícias) para o build
eval "$(node --input-type=module -e "import('./tests/e2e/ambiente.mjs').then(m => console.log(Object.entries(m.AMBIENTE).map(([k, v]) => 'export ' + k + '=' + JSON.stringify(v)).join('\n')))")"
pnpm build
pnpm test:e2e
```

O Playwright sobe sozinho:

- **Keycloak falso, só de teste** (`tests/e2e/keycloak-falso.mjs`): responde o introspect e conta as chamadas recebidas (`GET /__chamadas`), para os testes medirem quantas vezes o app vai ao Keycloak.
- **`next start`** com o ambiente de `tests/e2e/ambiente.mjs`.

A **sessão** não passa pelo login: `entrarComo(context)` (`tests/e2e/apoio.ts`) grava o mesmo cookie que o next-auth gravaria, assinado com o `AUTH_SECRET` de teste. Nada disso muda o comportamento do app.

`vigiarErros(page)` falha o teste se houver erro no console.

## Capturas de tela

As referências ficam em `tests/e2e/paginas.spec.ts-snapshots/` (1366×768, tolerância de 50 pixels). Fonte e navegador mudam a imagem, então elas são **geradas na imagem oficial do Playwright**, a mesma do CI:

```bash
docker run --rm --user $(id -u):$(id -g) -e HOME=/tmp -v "$PWD":/app -w /app --ipc=host \
  mcr.microsoft.com/playwright:v1.54.1-noble \
  npx playwright test --grep visual --update-snapshots
```

Mudou a tela de propósito? Gere de novo, **olhe as imagens** e commite junto com a mudança. O mesmo comando sem `--update-snapshots` roda os testes localmente quando a máquina não tem as bibliotecas do Chromium (caso do WSL).

Ao atualizar o `@playwright/test`, atualize também a tag da imagem aqui e no workflow.
