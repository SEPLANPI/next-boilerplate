import 'server-only'

import { auth } from '@/auth'
import { RequestInit } from 'next/dist/server/web/spec-extension/request'
import { env } from '@/config/env'

const apiUrl = env.SERVER_API_URL

interface ApiOptions extends Omit<RequestInit, 'body'> {
  contentType?: 'form-data' | 'json'
  body?: any
}

async function request(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  { body, contentType, ...options }: ApiOptions = {}
): Promise<Response> {
  const session = await auth()
  const accessToken = session?.accessToken

  const headers: HeadersInit = {
    ...(!contentType && { 'Content-Type': 'application/json' }),
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers
  }

  if (body && (!contentType || contentType === 'json')) {
    body = JSON.stringify(body)
  }

  return fetch(`${apiUrl}${url}`, {
    method,
    body,
    headers,
    ...options
  })
}

export const api = {
  get: (url: string, options?: ApiOptions) => request(url, 'GET', options),
  post: (url: string, options?: ApiOptions) => request(url, 'POST', options),
  put: (url: string, options?: ApiOptions) => request(url, 'PUT', options),
  delete: (url: string, options?: ApiOptions) =>
    request(url, 'DELETE', options),
  patch: (url: string, options?: ApiOptions) => request(url, 'PATCH', options)
}
