import { afterEach, describe, expect, it, vi } from "vitest"
import { fetchWithRetry, withRetry } from "./retry"

const semEspera = { delay: 0 }

describe("withRetry", () => {
  it("devolve na primeira tentativa que der certo", async () => {
    const operacao = vi
      .fn()
      .mockRejectedValueOnce(new TypeError("rede"))
      .mockResolvedValue("ok")
    await expect(withRetry(operacao, semEspera)).resolves.toBe("ok")
    expect(operacao).toHaveBeenCalledTimes(2)
  })

  it("tenta de novo em erro de rede, timeout, 429, 408 e 5xx", async () => {
    for (const erro of [
      new TypeError("rede"),
      Object.assign(new Error("t"), { name: "TimeoutError" }),
      Object.assign(new Error("x"), { status: 429 }),
      Object.assign(new Error("x"), { status: 408 }),
      Object.assign(new Error("x"), { response: { status: 503 } }),
    ]) {
      const operacao = vi.fn().mockRejectedValueOnce(erro).mockResolvedValue(1)
      await withRetry(operacao, semEspera)
      expect(operacao).toHaveBeenCalledTimes(2)
    }
  })

  it("não repete erro 4xx", async () => {
    const erro = Object.assign(new Error("x"), { status: 400 })
    const operacao = vi.fn().mockRejectedValue(erro)
    await expect(withRetry(operacao, semEspera)).rejects.toBe(erro)
    expect(operacao).toHaveBeenCalledTimes(1)
  })

  it("para em maxRetries e lança o último erro", async () => {
    const operacao = vi.fn().mockRejectedValue(new TypeError("rede"))
    await expect(
      withRetry(operacao, { ...semEspera, maxRetries: 2 }),
    ).rejects.toThrow("rede")
    expect(operacao).toHaveBeenCalledTimes(3)
  })
})

describe("fetchWithRetry", () => {
  afterEach(() => vi.unstubAllGlobals())

  it("repete em 5xx e devolve a resposta seguinte", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 502 }))
      .mockResolvedValue(new Response("ok", { status: 200 }))
    vi.stubGlobal("fetch", fetch)

    const resposta = await fetchWithRetry("https://x", undefined, semEspera)
    expect(resposta.status).toBe(200)
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it("devolve 4xx sem repetir (quem chama decide)", async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(null, { status: 401 }))
    vi.stubGlobal("fetch", fetch)

    const resposta = await fetchWithRetry("https://x", undefined, semEspera)
    expect(resposta.status).toBe(401)
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
