export function formatCurrency(value: number | string, prefix: boolean = true) {
  return (
    (prefix ? "R$ " : "") +
    parseFloat(value.toString()).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })
  )
}
