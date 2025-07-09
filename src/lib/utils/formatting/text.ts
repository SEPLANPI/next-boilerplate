export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Normalizes text for search by removing accents and converting to lowercase
 */
export function normalizeForSearch(str: string): string {
  return removeAccents(str.toLowerCase())
}
