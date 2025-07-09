export function formatDate(
  date: Date | string,
  locale: string = 'pt-BR',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, options).format(dateObj)
}

export function formatDateTime(
  date: Date | string,
  locale: string = 'pt-BR'
): string {
  return formatDate(date, locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
