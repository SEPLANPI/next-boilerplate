import { dayjs } from '@/lib/dayjs'

export const DATE_FORMATS = {
  DEFAULT: 'DD/MM/YYYY [às] HH:mm',
  SHORT: 'DD/MM/YYYY',
  TIME: 'HH:mm',
  FULL: 'DD [de] MMMM [de] YYYY [às] HH:mm',
  ISO: 'YYYY-MM-DD'
} as const

type DateFormat = (typeof DATE_FORMATS)[keyof typeof DATE_FORMATS]

/**
 * Formata uma string de data
 * @param date String de data
 * @param format Formato desejado (opcional)
 * @returns String de data formatada
 */
export function formatDate(
  date: string | null | undefined,
  format: DateFormat = DATE_FORMATS.SHORT
): string {
  if (!date) return 'Não informado'

  return dayjs(date).format(format)
}
