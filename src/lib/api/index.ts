import { clientEnv } from '@/config/client-env'
import {
  nextAuthInterceptor,
  requestLoggingInterceptor,
  responseLoggingInterceptor
} from './interceptors'
import { createApiClient } from './client'

const isDevelopment = process.env.NODE_ENV === 'development'

export const api = createApiClient({
  baseUrl: clientEnv.CLIENT_API_URL,
  interceptors: {
    request: [
      nextAuthInterceptor,
      ...(isDevelopment ? [requestLoggingInterceptor] : [])
    ],
    response: [...(isDevelopment ? [responseLoggingInterceptor] : [])]
  }
})

export const siafeApi = createApiClient({
  baseUrl: clientEnv.CLIENT_API_URL,
  interceptors: {
    request: [...(isDevelopment ? [requestLoggingInterceptor] : [])],
    response: [...(isDevelopment ? [responseLoggingInterceptor] : [])]
  }
})

export {
  createApiClient,
  type ApiClient,
  type ApiResponse,
  type ServerResult
} from './client'
export { ApiError, type DjangoError } from './errors'
export {
  nextAuthInterceptor,
  requestLoggingInterceptor,
  responseLoggingInterceptor
} from './interceptors'
export { asQuery } from './query'
export { buildParams, type ParamsRecord } from './params'
export { buildEventScopedParams } from '@/utils/api/params'
