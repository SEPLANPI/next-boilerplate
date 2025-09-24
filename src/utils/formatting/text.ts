export function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/**
 * Normalizes text for search by removing accents and converting to lowercase
 */
export function normalizeForSearch(str: string): string {
  return removeAccents(str.toLowerCase())
}

export function getUserShortName(fullName?: string) {
  if (!fullName) return ""
  const names = fullName.split(" ")
  return names.length > 1 ? `${names[0]} ${names[names.length - 1]}` : names[0]
}
