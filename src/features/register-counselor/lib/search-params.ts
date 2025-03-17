import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const registerCounselorSearchParams = createSearchParamsCache({
  code: parseAsString
})
