type EventsCardsProps = {
  quantity: number
  quantityPercentage: number
  value: number
  valuePercentage: number
  empresas: number
  empresasPercentage: number
  municipios: number
  municipiosPercentage: number
}

export function EventsCards({
  quantity,
  quantityPercentage,
  value,
  valuePercentage,
  empresas,
  empresasPercentage,
  municipios,
  municipiosPercentage
}: EventsCardsProps) {
  return (
    <div className="my-6 flex items-stretch space-x-4">
      <div className="flex min-w-64 flex-col rounded border p-4 shadow-sm">
        <span className="mb-2 text-sm font-medium text-secondary-foreground">
          Eventos
        </span>
        <span className="text-2xl font-bold">{quantity}</span>

        <span className="text-sm font-medium text-muted-foreground">
          {quantityPercentage}% dos eventos
        </span>
      </div>
      <div className="flex min-w-64 flex-col rounded border p-4 shadow-sm">
        <span className="mb-2 text-sm font-medium text-secondary-foreground">
          Valor investido
        </span>
        <span className="text-2xl font-bold">
          R${' '}
          {parseFloat(value.toString()).toLocaleString('pt-BR', {
            minimumFractionDigits: 2
          })}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {valuePercentage}% do investimento
        </span>
      </div>
      <div className="flex min-w-64 flex-col rounded border p-4 shadow-sm">
        <span className="mb-2 text-sm font-medium text-secondary-foreground">
          Municipios beneficiados
        </span>
        <span className="text-2xl font-bold">{municipios}</span>
        <span className="text-sm font-medium text-muted-foreground">
          {municipiosPercentage}% dos municípios
        </span>
      </div>
      <div className="flex min-w-64 flex-col rounded border p-4 shadow-sm">
        <span className="mb-2 text-sm font-medium text-secondary-foreground">
          Empresas contratadas
        </span>
        <span className="text-2xl font-bold">{empresas}</span>
        <span className="text-sm font-medium text-muted-foreground">
          {empresasPercentage}% das empresas
        </span>
      </div>
    </div>
  )
}
