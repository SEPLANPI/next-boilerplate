import { API } from '@/constants/messages'
import { DjangoError } from '@/types/actions'

interface FormattedError {
  type: 'global' | 'field'
  message: string
  field?: string
}

export function formatDjangoErrors(error: DjangoError): FormattedError[] {
  const formattedErrors: FormattedError[] = []

  if (typeof error === 'string') {
    formattedErrors.push({
      type: 'global',
      message: error
    })
    return formattedErrors
  }

  if (Array.isArray(error)) {
    error.forEach((errorMsg) => {
      formattedErrors.push({
        type: 'global',
        message: errorMsg
      })
    })
    return formattedErrors
  }

  if (error.detail) {
    formattedErrors.push({
      type: 'global',
      message: error.detail
    })
  }

  if (error.non_field_errors && error.non_field_errors.length > 0) {
    error.non_field_errors.forEach((errorMsg) => {
      formattedErrors.push({
        type: 'global',
        message: errorMsg
      })
    })
  }

  if (error.field_errors) {
    const fieldErrors = error.field_errors

    Object.keys(fieldErrors).forEach((field) => {
      const errors = Array.isArray(fieldErrors[field])
        ? fieldErrors[field]
        : [fieldErrors[field]]

      errors.forEach((errorMsg) => {
        const message =
          typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg

        formattedErrors.push({
          type: 'field',
          field: field,
          message: message
        })
      })
    })
  }

  if (formattedErrors.length === 0) {
    formattedErrors.push({
      type: 'global',
      message: API.UNEXPECTED_FETCH_ERROR
    })
  }

  return formattedErrors
}

interface ErrorSummary {
  globalErrors: string[]
  fieldErrors: Record<string, string[]>
}

export function displayDjangoErrors(error: DjangoError): ErrorSummary {
  const globalErrors: string[] = []
  const fieldErrors: Record<string, string[]> = {}

  const formattedErrors = formatDjangoErrors(error)

  formattedErrors
    .filter((err) => err.type === 'global')
    .forEach((err) => globalErrors.push(err.message))

  formattedErrors
    .filter((err) => err.type === 'field')
    .forEach((err) => {
      if (err.field) {
        if (!fieldErrors[err.field]) {
          fieldErrors[err.field] = []
        }
        fieldErrors[err.field].push(err.message)
      }
    })

  return {
    globalErrors,
    fieldErrors
  }
}

export function buildErrorMessage(error: DjangoError): string {
  const { globalErrors, fieldErrors } = displayDjangoErrors(error)

  return [
    ...globalErrors,
    ...Object.entries(fieldErrors).map(
      ([field, errors]) => `${field}: ${errors.join(', ')}`
    )
  ].join('\n')
}
