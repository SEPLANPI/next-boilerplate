export const logger = {
  error: (error: Error | string, context?: Record<string, unknown>) => {
    // In production we could send this to a logging service
    console.error({
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      ...context,
    })
  },
  info: (message: string, context?: Record<string, unknown>) => {
    console.info({
      timestamp: new Date().toISOString(),
      message,
      ...context,
    })
  },
}
