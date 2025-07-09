export function formatCurrency(value: number | string) {
  return (
    'R$ ' +
    parseFloat(value.toString()).toLocaleString('pt-BR', {
      minimumFractionDigits: 2
    })
  )
}
