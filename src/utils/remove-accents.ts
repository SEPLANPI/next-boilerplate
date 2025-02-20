/**
 * Remove todos os acentos de uma string.
 * Útil para busca e seleção de texto em português no lado do cliente.
 *
 * @example
 * ```typescript
 * removeAccents('José') // retorna 'Jose'
 * removeAccents('Água') // retorna 'Agua'
 * ```
 *
 * @param str - String com acentos para ser normalizada
 * @returns String sem acentos
 */
export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
