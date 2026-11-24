import { afterEach, describe, expect, it, vi } from "vitest"
import { ISSUER, respostaJson } from "./testes/ambiente"
import { verifySessionActivity } from "./verify-session"

describe("verifySessionActivity", () => {
  afterEach(() => vi.unstubAllGlobals())

  it("faz o introspect no Keycloak com as credenciais do client", async () => {
    const fetch = vi.fn().mockResolvedValue(respostaJson({ active: true }))
    vi.stubGlobal("fetch", fetch)

    await expect(verifySessionActivity("token-a")).resolves.toBe(true)

    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe(`${ISSUER}/protocol/openid-connect/token/introspect`)
    const corpo = new URLSearchParams(init.body)
    expect(corpo.get("token")).toBe("token-a")
    expect(corpo.get("client_id")).toBe("boilerplate")
  })

  it("sessão encerrada no Keycloak → false", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(respostaJson({ active: false })),
    )
    await expect(verifySessionActivity("t")).resolves.toBe(false)
  })

  it("resposta de erro → false", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(respostaJson({ error: "invalid_client" }, 401)),
    )
    await expect(verifySessionActivity("t")).resolves.toBe(false)
  })

  it("Keycloak fora do ar → false, sem lançar", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("rede")))
    vi.useFakeTimers()
    const resultado = verifySessionActivity("t")
    await vi.runAllTimersAsync()
    await expect(resultado).resolves.toBe(false)
    vi.useRealTimers()
  })
})
