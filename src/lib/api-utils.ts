type ParamsRecord = Record<
  string,
  | string
  | number
  | boolean
  | null
  | undefined
  | (string | number | boolean | null | undefined)[]
>

/**
 * Builds URLSearchParams from a record of key-value pairs
 * @param params - Record of parameters
 * @returns URLSearchParams
 *
 * @example
 * ```ts
 * const params = buildParams({
 *   page: 1,
 *   page_size: 10,
 *   search: 'test',
 *   sort: '-name',
 *   tags: ['foo', 'bar']
 * })
 * ```
 */
export function buildParams(params: ParamsRecord): URLSearchParams {
  const urlParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item != null && item !== '') {
          urlParams.append(key, item.toString())
        }
      })
    } else if (value != null && value !== '') {
      urlParams.append(key, value.toString())
    }
  })

  return urlParams
}
