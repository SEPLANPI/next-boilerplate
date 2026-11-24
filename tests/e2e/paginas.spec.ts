import { expect, test } from "@playwright/test"
import {
  USUARIO,
  chamadasAoKeycloak,
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

test("idioma pt-BR e uma única meta viewport", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR")
  await expect(page.locator('meta[name="viewport"]')).toHaveCount(1)
})

test("barra no fim da URL redireciona para a página sem barra", async ({
  page,
}) => {
  await page.goto("/about/")
  await expect(page).toHaveURL(/\/about$/)
})

test.describe("chamadas ao Keycloak por página (linha de base)", () => {
  // Hoje o callback jwt faz um introspect a cada auth()/getSession(). O
  // número fica registrado no relatório; a reforma de sessão (F1–F4) vai
  // trocar este registro por um limite.
  test("introspects ao abrir / com sessão", async ({ page, context }) => {
    await entrarComo(context)
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    const { introspect = 0 } = await chamadasAoKeycloak()
    test.info().annotations.push({
      type: "introspect por página",
      description: String(introspect),
    })
    console.log(`introspects ao abrir / com sessão: ${introspect}`)
    expect(introspect).toBeGreaterThan(0)
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
