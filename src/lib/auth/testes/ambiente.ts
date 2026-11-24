import { vi } from "vitest"

// Variáveis de ambiente fixas para os testes de autenticação: o módulo real
// valida process.env com zod e falharia fora do Next.
export const ISSUER = "https://keycloak.teste/realms/pi"

vi.mock("@/config/env", () => ({
  env: {
    AUTH_KEYCLOAK_ISSUER: ISSUER,
    AUTH_KEYCLOAK_ID: "boilerplate",
    AUTH_KEYCLOAK_SECRET: "segredo-de-teste",
  },
}))

// Sem poluir a saída dos testes com os logs de erro esperados.
vi.mock("@/lib/logger", () => ({
  logger: { error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}))

export function respostaJson(corpo: unknown, status = 200) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}
