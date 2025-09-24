export interface ApiErrorDetail {
  [key: string]: string[] | string
}

export type DjangoError =
  | string[]
  | string
  | (Record<string, string | string[]> & {})

export class ApiError extends Error {
  response: Response
  status: number
  statusText: string
  body: unknown

  constructor(response: Response, data: unknown) {
    let message = "An API error occurred"

    if (
      data &&
      typeof data === "object" &&
      "detail" in data &&
      typeof (data as { detail: unknown }).detail === "string"
    ) {
      message = (data as { detail: string }).detail
    } else if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof (data as { message: unknown }).message === "string"
    ) {
      message = (data as { message: string }).message
    } else if (response.statusText) {
      message = response.statusText
    }

    super(message)
    this.name = "ApiError"
    this.response = response
    this.status = response.status
    this.statusText = response.statusText
    this.body = data
  }

  /**
   * Get the error message from the response body
   */
  getErrorMessage(): string {
    if (this.body && typeof this.body === "object") {
      // Try common error message fields
      const errorObj = this.body as Record<string, unknown>

      if ("detail" in errorObj && typeof errorObj.detail === "string") {
        return errorObj.detail
      }

      if ("message" in errorObj && typeof errorObj.message === "string") {
        return errorObj.message
      }

      if ("error" in errorObj && typeof errorObj.error === "string") {
        return errorObj.error
      }
    }

    return this.message
  }
}
