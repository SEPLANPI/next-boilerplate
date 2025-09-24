import { ApiError } from "@/lib/api/errors"

export type DjangoError =
  | string[]
  | string
  | (Record<string, string | string[]> & {})

export function buildDjangoErrorMessage(error: DjangoError): string {
  if (typeof error === "string") {
    return error
  }

  if (Array.isArray(error)) {
    return error.join("\n")
  }
  const commonKeys = ["non_field_errors", "detail", "error", "message"]
  const messages: string[] = []
  Object.entries(error).forEach(([key, value]) => {
    const errorMessages = Array.isArray(value) ? value : [value]
    if (commonKeys.includes(key)) {
      messages.push(errorMessages.join(", "))
    } else {
      messages.push(`${key}: ${errorMessages.join(", ")}`)
    }
  })

  return messages.length > 0 ? messages.join("\n") : "Unexpected error occurred"
}

export function getDjangoErrorMessage(error: ApiError): string {
  const genericMessage = error.getErrorMessage()

  if (genericMessage === error.message && error.body) {
    try {
      return buildDjangoErrorMessage(error.body as DjangoError)
    } catch {
      return genericMessage
    }
  }

  return genericMessage
}

export function isDjangoValidationError(error: unknown): error is DjangoError {
  if (!error || typeof error !== "object") return false

  if (Array.isArray(error)) return true
  if (typeof error === "string") return true

  return Object.values(error as Record<string, unknown>).every(
    (value) => typeof value === "string" || Array.isArray(value),
  )
}

/**
 * Formats Django validation errors into user-friendly messages
 * Legacy function - prefer getDjangoErrorMessage for new code
 */
export function formatDjangoErrors(errors: DjangoError): string {
  return buildDjangoErrorMessage(errors)
}

/**
 * Legacy alias for formatDjangoErrors
 * @deprecated Use formatDjangoErrors or getDjangoErrorMessage instead
 */
export const buildErrorMessage = formatDjangoErrors
