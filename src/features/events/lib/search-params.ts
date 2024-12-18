import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString
} from 'nuqs/server'

export const pageParameterParser = parseAsInteger.withDefault(1)

export const eventsSearchParamsParsers = {
  search: parseAsString.withDefault(''),
  page: pageParameterParser,
  ugs: parseAsArrayOf(parseAsInteger),
  municipios: parseAsArrayOf(parseAsString),
  deputados: parseAsArrayOf(parseAsString),
  fromDate: parseAsIsoDateTime,
  toDate: parseAsIsoDateTime,
  fromValue: parseAsInteger,
  toValue: parseAsInteger,
  sort: parseAsString,
  group: parseAsString,
  groupSort: parseAsString,
  status: parseAsString.withDefault('reviewed')
}

export const eventsSearchParams = createSearchParamsCache(
  eventsSearchParamsParsers
)
