import type { JWT } from "next-auth/jwt"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { ISSUER, respostaJson } from "./testes/ambiente"

vi.mock("./get-user-info", () => ({
  getUserInfo: vi.fn().mockResolvedValue({
    preferred_username: "12345678901",
    name: "Fulana",
    nomeCompleto: "Fulana de Tal",
    email: "fulana@exemplo.gov.br",
    dataNascimento: "01/01/1990",
  }),
}))

const { refreshAccessToken } = await import("./refresh-access-token")

// Access token só com o que o código lê (roles do client).
const accessTokenNovo = [
  "e30",
  btoa(
    JSON.stringify({
      resource_access: { boilerplate: { roles: ["admin"] } },
    }),
  ).replace(/=+$/, ""),
  "assinatura",
].join(".")

function tokenAtual(extra: Partial<JWT> = {}): JWT {
  return {
    accessToken: "velho",
    refreshToken: "refresh-velho",
    accessTokenExpires: Date.now() - 1000,
    refreshTokenExpires: Date.now() + 60_000,
    user: { id: "u1" },
    ...extra,
  } as JWT
}

describe("refreshAccessToken", () => {
  beforeEach(() => vi.useFakeTimers({ now: new Date("2026-11-24T12:00:00Z") }))
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it("refresh token vencido → TokenExpiredError, sem ir ao Keycloak", async () => {
    const fetch = vi.fn()
    vi.stubGlobal("fetch", fetch)

    const resultado = await refreshAccessToken(
      tokenAtual({ refreshTokenExpires: Date.now() - 1 }),
    )
    expect(resultado.error).toBe("TokenExpiredError")
    expect(fetch).not.toHaveBeenCalled()
  })

  it("renova: tokens novos, validade com folga de 30 s e roles do access token", async () => {
    const fetch = vi.fn().mockResolvedValue(
      respostaJson({
        access_token: accessTokenNovo,
        refresh_token: "refresh-novo",
        id_token: "id-novo",
        expires_in: 300,
        refresh_expires_in: 1800,
      }),
    )
    vi.stubGlobal("fetch", fetch)

    const resultado = await refreshAccessToken(tokenAtual())

    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe(`${ISSUER}/protocol/openid-connect/token`)
    expect(new URLSearchParams(init.body).get("grant_type")).toBe(
      "refresh_token",
    )
    expect(resultado).toMatchObject({
      accessToken: accessTokenNovo,
      refreshToken: "refresh-novo",
      idToken: "id-novo",
      accessTokenExpires: Date.now() + 270_000,
      refreshTokenExpires: Date.now() + 1_770_000,
      user: { cpf: "12345678901", name: "Fulana", roles: ["admin"] },
    })
    expect(resultado.error).toBeUndefined()
  })

  it("Keycloak recusa (sessão encerrada) → RefreshAccessTokenError", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(respostaJson({ error: "invalid_grant" }, 400)),
    )
    const resultado = await refreshAccessToken(tokenAtual())
    expect(resultado.error).toBe("RefreshAccessTokenError")
  })

  it("falha de rede → RefreshAccessTokenError, sem lançar", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("rede")))
    const resultado = refreshAccessToken(tokenAtual())
    await vi.runAllTimersAsync()
    expect((await resultado).error).toBe("RefreshAccessTokenError")
  })
})
