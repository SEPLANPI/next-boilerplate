// Core utilities
export { cn } from "./core/cn"
export { formatCurrency } from "./core/currency"
export { calculateExpiryTime } from "./core/time"

export { formatCPF, isValidCPF } from "./validation/cpf"

import { formatCPF, isValidCPF } from "./validation/cpf"
export const CPF = {
  format: formatCPF,
  isValid: isValidCPF,
}

export {
  formatarProcessoInput,
  formatarValorMonetario,
  formatProcesso,
  limparNumeroProcesso,
} from "./formatting/format-process"

export { formatDate } from "./formatting/date"
export { normalizeForSearch, removeAccents } from "./formatting/text"

export { filterOptions } from "./ui/filters"

export { buildEventScopedParams } from "./api/params"

export { buildParams, type ParamsRecord } from "@/lib/api/params"

export {
  buildDjangoErrorMessage,
  buildErrorMessage,
  formatDjangoErrors,
  getDjangoErrorMessage,
  isDjangoValidationError,
  type DjangoError,
} from "./api/django"
