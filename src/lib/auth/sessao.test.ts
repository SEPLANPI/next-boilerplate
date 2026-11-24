import { describe, expect, it, vi } from "vitest"
import {
  INTERVALO_VERIFICACAO_SESSAO_MS,
  MARGEM_EXPIRACAO_MS,
  criarCacheDeToken,
  precisaVerificarSessao,
} from "./sessao"

describe("precisaVerificarSessao", () => {
  const agora = 1_000_000_000

  it("verifica quando nunca foi verificada", () => {
    expect(precisaVerificarSessao({}, agora)).toBe(true)
  })

  it("não verifica dentro do intervalo", () => {
    const sessaoVerificadaEm = agora - INTERVALO_VERIFICACAO_SESSAO_MS + 1
    expect(precisaVerificarSessao({ sessaoVerificadaEm }, agora)).toBe(false)
  })

  it("verifica de novo depois do intervalo", () => {
    const sessaoVerificadaEm = agora - INTERVALO_VERIFICACAO_SESSAO_MS
    expect(precisaVerificarSessao({ sessaoVerificadaEm }, agora)).toBe(true)
  })
})

describe("criarCacheDeToken", () => {
  function relogio(inicio = 0) {
    let agora = inicio
    return {
      agora: () => agora,
      avancar: (ms: number) => {
        agora += ms
      },
    }
  }

  it("busca a sessão uma vez e reaproveita o token até perto de expirar", async () => {
    const r = relogio()
    const buscar = vi.fn().mockResolvedValue({
      accessToken: "t1",
      accessTokenExpires: 300_000,
    })
    const cache = criarCacheDeToken(buscar, r.agora)

    expect(await cache.obter()).toBe("t1")
    r.avancar(300_000 - MARGEM_EXPIRACAO_MS - 1)
    expect(await cache.obter()).toBe("t1")
    expect(buscar).toHaveBeenCalledTimes(1)

    buscar.mockResolvedValue({ accessToken: "t2", accessTokenExpires: 900_000 })
    r.avancar(1)
    expect(await cache.obter()).toBe("t2")
    expect(buscar).toHaveBeenCalledTimes(2)
  })

  it("chamadas simultâneas esperam a mesma busca", async () => {
    const buscar = vi
      .fn()
      .mockResolvedValue({ accessToken: "t1", accessTokenExpires: 300_000 })
    const cache = criarCacheDeToken(buscar, () => 0)

    const tokens = await Promise.all([
      cache.obter(),
      cache.obter(),
      cache.obter(),
    ])
    expect(tokens).toEqual(["t1", "t1", "t1"])
    expect(buscar).toHaveBeenCalledTimes(1)
  })

  it("sem expiração na sessão, não guarda o token", async () => {
    const buscar = vi.fn().mockResolvedValue({ accessToken: "t1" })
    const cache = criarCacheDeToken(buscar, () => 0)
    await cache.obter()
    await cache.obter()
    expect(buscar).toHaveBeenCalledTimes(2)
  })

  it("sem sessão devolve null e tenta de novo na próxima", async () => {
    const buscar = vi.fn().mockResolvedValue(null)
    const cache = criarCacheDeToken(buscar, () => 0)
    expect(await cache.obter()).toBeNull()
    await cache.obter()
    expect(buscar).toHaveBeenCalledTimes(2)
  })

  it("invalidar força buscar de novo", async () => {
    const buscar = vi
      .fn()
      .mockResolvedValue({ accessToken: "t1", accessTokenExpires: 300_000 })
    const cache = criarCacheDeToken(buscar, () => 0)
    await cache.obter()
    cache.invalidar()
    await cache.obter()
    expect(buscar).toHaveBeenCalledTimes(2)
  })
})
