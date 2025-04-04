import { baseSearchParamsParsers } from '@/lib/search-params'
import {
    createSearchParamsCache,
    parseAsArrayOf,
    parseAsString
} from 'nuqs/server'

export const generalRegistrationSearchParams = createSearchParamsCache({
    ...baseSearchParamsParsers,
    tipo_membro: parseAsArrayOf(parseAsString),
    tipo_inscricao: parseAsArrayOf(parseAsString),
    cadastrado_presencialmente: parseAsArrayOf(parseAsString),
    eixos: parseAsArrayOf(parseAsString)
})
