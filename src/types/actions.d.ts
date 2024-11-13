export type ActionState<TOutput> =
  | { data: TOutput; error?: never }
  | { error: string; data?: never }
