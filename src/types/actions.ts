export type DjangoError =
  | string[]
  | string
  | (Record<string, string | string[]> & {})

export type ActionState<TOutput> =
  | { data: TOutput; error?: never }
  | { error: DjangoError; data?: never }
