interface ErrorResponse {
  detail?: string
  non_field_errors?: string[]
  field_errors?: Record<string, string[]>
}

export type DjangoError = ErrorResponse | string[] | string | Record<string, string[]>

export type ActionState<TOutput> =
  | { data: TOutput; error?: never }
  | { error: DjangoError; data?: never }
