export type ServerResult<TOutput> =
  | { data: TOutput; error?: never }
  | { error: string; data?: never }
