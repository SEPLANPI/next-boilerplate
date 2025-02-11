
import { createParser } from 'nuqs/server'

export const citiesSearchParams = createParser({
  page: { type: 'number', default: 1 },
  search: { type: 'string' },
  sort: { type: 'string' }
})