export type ParamsRecord = Record<
  string,
  | string
  | number
  | boolean
  | Array<string | number | boolean>
  | null
  | undefined
>

/**
 * Builds URLSearchParams from a key-value object
 * Handles arrays, null/undefined values, and proper encoding
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
