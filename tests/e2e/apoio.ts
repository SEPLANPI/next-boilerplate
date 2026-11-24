import { type BrowserContext, type Page, expect } from "@playwright/test"
import { encode } from "next-auth/jwt"
import { AMBIENTE, PORTA_KEYCLOAK, URL_APP } from "./ambiente.mjs"

// Nome do cookie de sessão do Auth.js em HTTP (sem o prefixo __Secure-).
const COOKIE_SESSAO = "authjs.session-token"
const KEYCLOAK = `http://127.0.0.1:${PORTA_KEYCLOAK}`

export const USUARIO = {
  name: "Fulana de Tal Teste",
  cpf: "52998224725",
  email: "fulana@teste.gov.br",
  roles: ["admin"],
}

/**
 * Abre uma sessão sem passar pelo login do Keycloak: gera o mesmo cookie que
 * o next-auth gravaria depois do login, assinado com o AUTH_SECRET de teste.
 */
export async function entrarComo(
  contexto: BrowserContext,
  usuario: Partial<typeof USUARIO> = {},
) {
  const agora = Date.now()
  const valor = await encode({
    salt: COOKIE_SESSAO,
    secret: AMBIENTE.AUTH_SECRET,
    token: {
      sub: "0190f3c2-7b1a-7c3e-9a55-3c2b1f0e9d11",
      user: { ...USUARIO, ...usuario },
      accessToken: "access-token-de-teste",
      refreshToken: "refresh-token-de-teste",
      accessTokenExpires: agora + 60 * 60 * 1000,
      refreshTokenExpires: agora + 2 * 60 * 60 * 1000,
    },
  })
  await contexto.addCookies([
    { name: COOKIE_SESSAO, value: valor, url: URL_APP, httpOnly: true },
  ])
}

/** Contadores do Keycloak falso (quantas vezes o app foi a cada endpoint). */
export async function chamadasAoKeycloak(): Promise<Record<string, number>> {
  return (await fetch(`${KEYCLOAK}/__chamadas`)).json()
}

export async function zerarKeycloak() {
  await fetch(`${KEYCLOAK}/__zerar`, { method: "POST" })
}

/**
 * Coleta erros de console e de página. O PostHog (só em produção) envia para
 * /ingest, que o boilerplate não tem: a rota é respondida vazia.
 */
export async function vigiarErros(pagina: Page) {
  const erros: string[] = []
  await pagina.route("**/ingest/**", (rota) =>
    rota.fulfill({ status: 200, body: "{}" }),
  )
  pagina.on("console", (msg) => {
    if (msg.type() === "error") erros.push(msg.text())
  })
  pagina.on("pageerror", (erro) => erros.push(erro.message))
  return {
    semErros: () => expect(erros, erros.join("\n")).toEqual([]),
  }
}
