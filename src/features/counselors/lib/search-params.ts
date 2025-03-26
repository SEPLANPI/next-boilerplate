import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const propostaSearchParams = createSearchParamsCache({
    search: parseAsString.withDefault(''),
})