import { expect, test } from "@playwright/test"
import {
  USUARIO,
  chamadasAoKeycloak,
  encerrarSessaoNoKeycloak,
  entrarComo,
  vigiarErros,
  zerarKeycloak,
} from "./apoio"

// Fumaça: cada página do boilerplate abre, mostra o que deve e não gera erro
// no console. Com a configuração padrão todas as rotas são públicas; a
// proteção por rota/role é coberta em src/lib/routes/matcher.test.ts.

const PAGINAS = [
  { caminho: "/", texto: "Página Inicial" },
  { caminho: "/about", texto: null },
  { caminho: "/erro", texto: null },
  { caminho: "/acesso-negado", texto: null },
  { caminho: "/sessao-expirada", texto: "Sessão Expirada" },
  { caminho: "/erro-autenticacao", texto: null },
]

test.beforeEach(async () => {
  await zerarKeycloak()
})

for (const { caminho, texto } of PAGINAS) {
  test(`${caminho} abre sem sessão e sem erro no console`, async ({ page }) => {
    const { semErros } = await vigiarErros(page)
    const resposta = await page.goto(caminho)
    expect(resposta?.status()).toBe(200)
    if (texto) await expect(page.getByText(texto).first()).toBeVisible()
    await page.waitForLoadState("networkidle")
    semErros()
  })
}

test("sem sessão o app não vai ao Keycloak", async ({ page }) => {
  await page.goto("/")
  await page.waitForLoadState("networkidle")
  expect((await chamadasAoKeycloak()).introspect ?? 0).toBe(0)
})

test("com sessão mostra o usuário no menu", async ({ page, context }) => {
  await entrarComo(context)
  const { semErros } = await vigiarErros(page)

  await page.goto("/")

  // Nome curto (primeiro + último) e CPF formatado, no botão do menu.
  await expect(
    page.getByRole("button", { name: /Fulana Teste.*529\.982\.247-25/ }),
  ).toBeVisible()
  await page.waitForLoadState("networkidle")
  semErros()
})

test("barra no fim da URL redireciona para a página sem barra", async ({
  page,
}) => {
  await page.goto("/about/")
  await expect(page).toHaveURL(/\/about$/)
})

test.describe("chamadas ao Keycloak por página", () => {
  // O callback jwt confere a sessão no Keycloak (introspect) no máximo a cada
  // 5 min (src/lib/auth/sessao.ts). Antes eram 4 introspects por página.
  const SEIS_MINUTOS = 6 * 60 * 1000

  test("sessão verificada há pouco: nenhum introspect", async ({
    page,
    context,
  }) => {
    await entrarComo(context)
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    await page.goto("/about")
    await page.waitForLoadState("networkidle")

    expect((await chamadasAoKeycloak()).introspect ?? 0).toBe(0)
  })

  test("verificação vencida: confere uma vez e grava a hora", async ({
    page,
    context,
  }) => {
    await entrarComo(context, {}, Date.now() - SEIS_MINUTOS)
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    // Middleware e renderização da página rodam na mesma requisição e os
    // dois leem o cookie antigo: até 2 na primeira página.
    const naPrimeira = (await chamadasAoKeycloak()).introspect ?? 0
    expect(naPrimeira).toBeGreaterThanOrEqual(1)
    expect(naPrimeira).toBeLessThanOrEqual(2)

    // A hora da verificação foi gravada no cookie: a próxima tela não repete.
    await page.goto("/about")
    await page.waitForLoadState("networkidle")
    expect((await chamadasAoKeycloak()).introspect).toBe(naPrimeira)
  })

  test("sessão encerrada no Keycloak: a sessão sai com erro", async ({
    page,
    context,
  }) => {
    await encerrarSessaoNoKeycloak()
    await entrarComo(context, {}, Date.now() - SEIS_MINUTOS)
    await page.goto("/")

    const sessao = await (await page.request.get("/api/auth/session")).json()
    expect(sessao.error).toBe("TokenInvalidError")
  })
})

// Viewport 1366×768 (playwright.config.ts). Nomes em ASCII: viram nome de arquivo.
test.describe("visual", () => {
  for (const { caminho } of PAGINAS) {
    test(`pagina ${caminho}`, async ({ page }) => {
      await vigiarErros(page)
      await page.goto(caminho)
      await page.waitForLoadState("networkidle")
      await expect(page).toHaveScreenshot({ fullPage: true })
    })
  }

  test("pagina / com sessao", async ({ page, context }) => {
    await entrarComo(context, { name: USUARIO.name })
    await vigiarErros(page)
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
