import { DjangoError } from './actions'

export type ServerResult<TOutput> =
  | { data: TOutput; error?: never }
  | { error: DjangoError; data?: never }
