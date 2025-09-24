/**
 * Simple retry configuration
 */
export interface RetryOptions {
  /** Maximum number of retry attempts (default: 3) */
  maxRetries?: number
  /** Delay between retries in milliseconds (default: 1000) */
  delay?: number
  /** Whether to use exponential backoff (default: true) */
  exponentialBackoff?: boolean
}

/**
 * Default retry options
 */
const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  delay: 1000,
  exponentialBackoff: false,
}

/**
 * Simple retry function for async operations
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const { maxRetries, delay, exponentialBackoff } = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  let lastError: unknown

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error

      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break
      }

      // Check if we should retry this error
      if (!shouldRetryError(error)) {
        break
      }

      // Calculate delay with optional exponential backoff
      const currentDelay = exponentialBackoff
        ? delay * Math.pow(2, attempt)
        : delay

      // Wait before retry (max 10 seconds)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.min(currentDelay, 10000)),
      )
    }
  }

  throw lastError
}

/**
 * Determines if an error should be retried
 */
function shouldRetryError(error: unknown): boolean {
  // Network errors
  if (error instanceof TypeError) {
    return true
  }

  // Timeout/abort errors
  if (
    error instanceof Error &&
    (error.name === "AbortError" || error.name === "TimeoutError")
  ) {
    return true
  }

  // HTTP errors with status codes
  const status = getErrorStatus(error)
  if (status) {
    // Always retry rate limiting and request timeout
    if (status === 429 || status === 408) {
      return true
    }
    // Retry 5xx server errors
    if (status >= 500 && status < 600) {
      return true
    }
  }

  return false
}

/**
 * Extract status code from various error formats
 */
function getErrorStatus(error: unknown): number | null {
  if (!error || typeof error !== "object") {
    return null
  }

  // Error with response.status
  if (
    "response" in error &&
    typeof error.response === "object" &&
    error.response
  ) {
    const response = error.response as Record<string, unknown>
    const status = response.status
    return typeof status === "number" ? status : null
  }

  // Error with status directly
  if ("status" in error) {
    const errorWithStatus = error as Record<string, unknown>
    const status = errorWithStatus.status
    return typeof status === "number" ? status : null
  }

  return null
}

/**
 * Fetch with automatic retry on network/server errors
 */
export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  options?: RetryOptions,
): Promise<Response> {
  return withRetry(async () => {
    const response = await fetch(input, init)

    // Throw on 5xx errors so retry logic handles them
    if (response.status >= 500 && response.status < 600) {
      const error = new Error(
        `HTTP ${response.status}: ${response.statusText}`,
      ) as Error & {
        status: number
        response: Response
      }
      error.status = response.status
      error.response = response
      throw error
    }

    return response
  }, options)
}
