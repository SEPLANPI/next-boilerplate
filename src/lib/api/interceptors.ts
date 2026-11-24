import { criarCacheDeToken } from "@/lib/auth/sessao"

export type RequestInterceptor = (
  url: string,
  options: RequestInit,
) => Promise<RequestInit> | RequestInit

export type ResponseInterceptor = (
  response: Response,
  url: string,
  options: RequestInit,
) => Promise<Response> | Response

let cacheTokenNavegador: ReturnType<typeof criarCacheDeToken> | null = null

function tokenDoNavegador() {
  cacheTokenNavegador ??= criarCacheDeToken(async () => {
    const { getSession } = await import("next-auth/react")
    return getSession()
  })
  return cacheTokenNavegador
}

/**
 * NextAuth interceptor that adds Bearer token to requests
 * Handles both server-side and client-side authentication
 */
export const nextAuthInterceptor: RequestInterceptor = async (
  url: string,
  options: RequestInit,
) => {
  let token: string | null = null

  try {
    if (typeof window === "undefined") {
      // Server-side: uma sessão por renderização (ver `sessaoDoServidor`).
      const { sessaoDoServidor } = await import("@/lib/auth/sessao-servidor")
      const session = await sessaoDoServidor()
      token = session?.accessToken || null
    } else {
      // Client-side: token reaproveitado até perto de expirar.
      token = await tokenDoNavegador().obter()
    }
  } catch (error) {
    console.warn("🔐 Auth token fetch failed:", error)
    return options
  }

  if (!token) {
    return options
  }

  const headers = new Headers(options.headers)
  headers.set("Authorization", `Bearer ${token}`)

  return {
    ...options,
    headers,
  }
}

export const requestLoggingInterceptor: RequestInterceptor = (
  url: string,
  options: RequestInit,
) => {
  const method = options.method || "GET"
  console.log(`🚀 ${method} ${url}`)
  return options
}

export const responseLoggingInterceptor: ResponseInterceptor = async (
  response: Response,
  url: string,
) => {
  const status = response.status

  if (status >= 400) {
    try {
      const responseClone = response.clone()
      const errorBody = await responseClone.json()
      console.error(`❌ ${status} ${response.statusText} - ${url}`, errorBody)
    } catch {
      console.error(`❌ ${status} ${response.statusText} - ${url}`)
    }
  }

  return response
}
