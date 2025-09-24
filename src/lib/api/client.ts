import { ApiError } from "./errors"
import type { RequestInterceptor, ResponseInterceptor } from "./interceptors"

import { buildParams, type ParamsRecord } from "./params"

export interface ApiClientOptions {
  baseUrl: string
  interceptors?: {
    request?: RequestInterceptor[]
    response?: ResponseInterceptor[]
  }
}

export type ApiResponse<T> =
  | {
      data: T
      error?: undefined
    }
  | {
      data?: undefined
      error: ApiError
    }

// Backward compatibility type - matches existing ServerResult
export type ServerResult<T> = ApiResponse<T>

type RequestOptions = Omit<RequestInit, "body"> & {
  contentType?: "form-data" | "json"
  params?: ParamsRecord
  body?: unknown
  raw?: boolean // When true, returns raw Response instead of processed data
}

export interface ApiClient {
  get<T>(
    url: string,
    options?: RequestOptions & { raw?: false },
  ): Promise<ApiResponse<T>>
  get(url: string, options: RequestOptions & { raw: true }): Promise<Response>
  get<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T> | Response>

  post<T>(
    url: string,
    options?: RequestOptions & { raw?: false },
  ): Promise<ApiResponse<T>>
  post(url: string, options: RequestOptions & { raw: true }): Promise<Response>
  post<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T> | Response>

  put<T>(
    url: string,
    options?: RequestOptions & { raw?: false },
  ): Promise<ApiResponse<T>>
  put(url: string, options: RequestOptions & { raw: true }): Promise<Response>
  put<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T> | Response>

  patch<T>(
    url: string,
    options?: RequestOptions & { raw?: false },
  ): Promise<ApiResponse<T>>
  patch(url: string, options: RequestOptions & { raw: true }): Promise<Response>
  patch<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T> | Response>

  delete<T>(
    url: string,
    options?: RequestOptions & { raw?: false },
  ): Promise<ApiResponse<T>>
  delete(
    url: string,
    options: RequestOptions & { raw: true },
  ): Promise<Response>
  delete<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T> | Response>
}

class ApiClientImpl implements ApiClient {
  private baseUrl: string
  private requestInterceptors: RequestInterceptor[]
  private responseInterceptors: ResponseInterceptor[]

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl
    this.requestInterceptors = options.interceptors?.request || []
    this.responseInterceptors = options.interceptors?.response || []
  }

  private async applyRequestInterceptors(
    url: string,
    options: RequestInit,
  ): Promise<RequestInit> {
    let finalOptions = { ...options }
    for (const interceptor of this.requestInterceptors) {
      finalOptions = await interceptor(url, finalOptions)
    }
    return finalOptions
  }

  private async applyResponseInterceptors(
    response: Response,
    url: string,
    options: RequestInit,
  ): Promise<Response> {
    let finalResponse = response
    for (const interceptor of this.responseInterceptors) {
      finalResponse = await interceptor(response, url, options)
    }
    return finalResponse
  }

  private async request<T = unknown>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    options: RequestOptions = {},
  ): Promise<ApiResponse<T> | Response> {
    const {
      body,
      contentType,
      headers: optionHeaders,
      params,
      raw,
      ...restOptions
    } = options

    const headers = new Headers(optionHeaders)

    let processedBody: BodyInit | undefined = body as BodyInit | undefined
    if (body && contentType !== "form-data") {
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json")
      }
      processedBody = JSON.stringify(body)
    }

    let requestOptions: RequestInit = {
      method,
      headers,
      body: processedBody,
      ...restOptions,
    }

    let fullUrl = `${this.baseUrl}${url}`

    if (params) {
      const queryParams = buildParams(params)
      if (queryParams.toString()) {
        fullUrl += `?${queryParams.toString()}`
      }
    }

    try {
      // Apply request interceptors
      requestOptions = await this.applyRequestInterceptors(
        fullUrl,
        requestOptions,
      )

      let response = await fetch(fullUrl, requestOptions)

      // Apply response interceptors
      response = await this.applyResponseInterceptors(
        response,
        fullUrl,
        requestOptions,
      )

      if (!response.ok) {
        if (raw) {
          // For raw responses, return the response as-is even if not ok
          // The calling code can handle the error response
          return response
        }

        let errorBody: unknown
        try {
          errorBody = await response.json()
        } catch {
          errorBody = { detail: "Failed to parse error response." }
        }
        return { error: new ApiError(response, errorBody) }
      }

      // If raw response is requested, return the response as-is
      if (raw) {
        return response
      }

      if (response.status === 204 /* No Content */) {
        return { data: undefined as T }
      }

      const responseContentType = response.headers.get("content-type")
      if (
        responseContentType &&
        responseContentType.includes("application/json")
      ) {
        const data = await response.json()
        return { data: data as T }
      }

      const data = await response.text()
      return { data: data as T }
    } catch (error) {
      if (error instanceof ApiError) {
        return { error }
      }
      const message =
        error instanceof Error
          ? error.message
          : "Ocorreu um erro de conexão. Por favor, verifique sua internet e tente novamente."
      const apiError = new ApiError(new Response(null, { status: 500 }), {
        detail: message,
      })
      return { error: apiError }
    }
  }

  public get<T>(
    url: string,
    options?: RequestOptions & { raw?: false },
  ): Promise<ApiResponse<T>>
  public get(
    url: string,
    options: RequestOptions & { raw: true },
  ): Promise<Response>
  public get<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T> | Response> {
    return this.request<T>(url, "GET", options)
  }

  public post<T>(
    url: string,
    options?: RequestOptions & { raw?: false },
  ): Promise<ApiResponse<T>>
  public post(
    url: string,
    options: RequestOptions & { raw: true },
  ): Promise<Response>
  public post<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T> | Response> {
    return this.request<T>(url, "POST", options)
  }

  public put<T>(
    url: string,
    options?: RequestOptions & { raw?: false },
  ): Promise<ApiResponse<T>>
  public put(
    url: string,
    options: RequestOptions & { raw: true },
  ): Promise<Response>
  public put<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T> | Response> {
    return this.request<T>(url, "PUT", options)
  }

  public patch<T>(
    url: string,
    options?: RequestOptions & { raw?: false },
  ): Promise<ApiResponse<T>>
  public patch(
    url: string,
    options: RequestOptions & { raw: true },
  ): Promise<Response>
  public patch<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T> | Response> {
    return this.request<T>(url, "PATCH", options)
  }

  public delete<T>(
    url: string,
    options?: RequestOptions & { raw?: false },
  ): Promise<ApiResponse<T>>
  public delete(
    url: string,
    options: RequestOptions & { raw: true },
  ): Promise<Response>
  public delete<T>(
    url: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T> | Response> {
    return this.request<T>(url, "DELETE", options)
  }
}

export function createApiClient(options: ApiClientOptions): ApiClient {
  return new ApiClientImpl(options)
}
