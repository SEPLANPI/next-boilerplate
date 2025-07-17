// Core utilities
export { cn } from './core/cn'
export { formatCurrency } from './core/currency'
export { calculateExpiryTime } from './core/time'

export { formatCPF, isValidCPF } from './validation/cpf'

import { formatCPF, isValidCPF } from './validation/cpf'
export const CPF = {
  format: formatCPF,
  isValid: isValidCPF
}

export { formatDate, formatDateTime } from './formatting/date'
export { removeAccents, normalizeForSearch } from './formatting/text'

export { filterOptions } from './ui/filters'

export { buildEventScopedParams } from './api/params'

export { buildParams, type ParamsRecord } from '@/lib/api/params'

export {
  buildDjangoErrorMessage,
  getDjangoErrorMessage,
  isDjangoValidationError,
  formatDjangoErrors,
  buildErrorMessage,
  type DjangoError
} from './api/django'
