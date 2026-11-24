import { getSession } from "next-auth/react"
import { criarCacheDeToken } from "@/lib/auth/sessao"

const apiUrl = process.env.NEXT_PUBLIC_CLIENT_API_URL

// Token reaproveitado até perto de expirar, em vez de um getSession()
// (GET /api/auth/session + callback jwt) por chamada.
const tokenDoNavegador = criarCacheDeToken(getSession)

interface ClientApiOptions extends Omit<RequestInit, "body"> {
  contentType?: "form-data" | "json"
  body?: unknown
}

async function clientRequest(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  { body, contentType, ...options }: ClientApiOptions = {},
): Promise<Response> {
  const accessToken = await tokenDoNavegador.obter()
  const headers: HeadersInit = {
    ...(!contentType && { "Content-Type": "application/json" }),
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers,
  }
  // JSON por padrão; com contentType "form-data" o body vai como veio.
  const corpo =
    body && (!contentType || contentType === "json")
      ? JSON.stringify(body)
      : (body as BodyInit | undefined)
  return fetch(`${apiUrl}${url}`, {
    method,
    body: corpo,

    headers,
    ...options,
  })
}

/**
 * @deprecated Use a API do arquivo @/lib/api ao invés desta.
 */
export const clientApi = {
  get: (url: string, options?: ClientApiOptions) =>
    clientRequest(url, "GET", options),
  post: (url: string, options?: ClientApiOptions) =>
    clientRequest(url, "POST", options),
  put: (url: string, options?: ClientApiOptions) =>
    clientRequest(url, "PUT", options),
  delete: (url: string, options?: ClientApiOptions) =>
    clientRequest(url, "DELETE", options),
  patch: (url: string, options?: ClientApiOptions) =>
    clientRequest(url, "PATCH", options),
}
