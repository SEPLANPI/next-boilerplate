import "server-only"

import { sessaoDoServidor } from "@/lib/auth/sessao-servidor"
import { RequestInit } from "next/dist/server/web/spec-extension/request"
import { env } from "@/config/env"

const apiUrl = env.SERVER_API_URL

interface ApiOptions extends Omit<RequestInit, "body"> {
  contentType?: "form-data" | "json"
  body?: unknown
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

async function request(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  { body, contentType, next, ...options }: ApiOptions = {},
): Promise<Response> {
  // Uma sessão por renderização (ver `sessaoDoServidor`).
  const session = await sessaoDoServidor()
  const accessToken = session?.accessToken

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
    next,
    ...options,
    ...(next && { next }),
  })
}
/**
 * @deprecated Use a API do arquivo @/lib/api ao invés desta.
 */
export const api = {
  get: (url: string, options?: ApiOptions) => request(url, "GET", options),
  post: (url: string, options?: ApiOptions) => request(url, "POST", options),
  put: (url: string, options?: ApiOptions) => request(url, "PUT", options),
  delete: (url: string, options?: ApiOptions) =>
    request(url, "DELETE", options),
  patch: (url: string, options?: ApiOptions) => request(url, "PATCH", options),
}
