import { dayjs } from '@/lib/dayjs'

/**
 * Formata uma string de data de DD-MM-YYYY para DD/MM/YYYY
 * @param date String de data no formato DD-MM-YYYY
 * @returns String de data formatada no padrão DD/MM/YYYY
 */
export function formatDate(date: string | null | undefined): string {
  if (!date) return 'Não informado'

  return dayjs(date, 'DD-MM-YYYY').format('DD/MM/YYYY')
}
