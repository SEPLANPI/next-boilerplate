import type { Session } from "next-auth"
import type { JWT } from "next-auth/jwt"

/**
 * De quanto em quanto tempo o callback `jwt` confere no Keycloak
 * (introspect) se a sessão continua ativa — logout em outro lugar,
 * sessão derrubada pelo admin. Antes era a cada `auth()`/`getSession()`,
 * ou seja, várias vezes por tela. A renovação do access token (a cada ~5
 * min) também prova que a sessão está ativa e reinicia este relógio.
 */
export const INTERVALO_VERIFICACAO_SESSAO_MS = 5 * 60 * 1000

export function precisaVerificarSessao(
  token: Pick<JWT, "sessaoVerificadaEm">,
  agora = Date.now(),
): boolean {
  return (
    agora - (token.sessaoVerificadaEm ?? 0) >= INTERVALO_VERIFICACAO_SESSAO_MS
  )
}

/** Margem antes da expiração do access token para buscar a sessão de novo
 * (o servidor renova o token nessa busca). */
export const MARGEM_EXPIRACAO_MS = 30 * 1000

type BuscarSessao = () => Promise<Pick<
  Session,
  "accessToken" | "accessTokenExpires"
> | null>

/**
 * Access token no navegador, reaproveitado entre chamadas à API até perto
 * de expirar — em vez de um `getSession()` (= `GET /api/auth/session` + o
 * callback `jwt` no servidor) por chamada. Chamadas simultâneas esperam a
 * mesma busca.
 */
export function criarCacheDeToken(buscar: BuscarSessao, relogio = Date.now) {
  let token: string | null = null
  let validoAte = 0
  let emAndamento: Promise<string | null> | null = null

  async function obter(): Promise<string | null> {
    if (token && relogio() < validoAte) return token
    if (!emAndamento) {
      emAndamento = buscar()
        .then((sessao) => {
          token = sessao?.accessToken ?? null
          // Sem a expiração na sessão, não guarda: busca de novo na próxima.
          validoAte = sessao?.accessTokenExpires
            ? sessao.accessTokenExpires - MARGEM_EXPIRACAO_MS
            : 0
          return token
        })
        .finally(() => {
          emAndamento = null
        })
    }
    return emAndamento
  }

  function invalidar() {
    token = null
    validoAte = 0
  }

  return { obter, invalidar }
}
