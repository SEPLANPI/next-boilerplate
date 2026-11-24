import { defineConfig, devices } from "@playwright/test"
import { AMBIENTE, PORTA_KEYCLOAK, URL_APP } from "./tests/e2e/ambiente.mjs"

// Testes de ponta a ponta contra o build de produção (`pnpm build` antes).
// Sobem juntos o Keycloak falso de teste e o `next start`.
// Capturas de tela: geradas na imagem oficial do Playwright (ver docs/TESTES.md),
// para baterem com o CI.
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: URL_APP,
    trace: "retain-on-failure",
    viewport: { width: 1366, height: 768 },
    locale: "pt-BR",
    timezoneId: "America/Fortaleza",
  },
  expect: {
    // Limite absoluto: uma proporção (ex. 1%) deixaria passar um botão inteiro mudando de cor.
    toHaveScreenshot: { maxDiffPixels: 50, animations: "disabled" },
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1366, height: 768 },
      },
    },
  ],
  webServer: [
    {
      command: "node tests/e2e/keycloak-falso.mjs",
      url: `http://127.0.0.1:${PORTA_KEYCLOAK}/__chamadas`,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: `npx next start -p ${new URL(URL_APP).port}`,
      url: URL_APP,
      env: AMBIENTE,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
})
