import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString
} from 'nuqs/server'

export const eventsSearchParams = createSearchParamsCache({
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  ugs: parseAsArrayOf(parseAsInteger),
  fromDate: parseAsIsoDateTime,
  toDate: parseAsIsoDateTime,
  fromValue: parseAsInteger,
  toValue: parseAsInteger,
  group: parseAsString,
  groupSort: parseAsString
})
