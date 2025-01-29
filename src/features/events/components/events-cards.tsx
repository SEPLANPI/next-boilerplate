import { getEvents } from '../api/get-events'

export async function EventsCards() {
  const { data, error } = await getEvents()

  if (!data || error || data.results.length === 0) {
    return null
  }

  const { totals, percentages } = data

  return (
    <div className="my-6 flex items-stretch space-x-4">
      <div className="flex min-w-64 flex-col rounded border p-4 shadow-sm">
        <span className="mb-2 text-sm font-medium text-secondary-foreground">
          Eventos
        </span>
        <span className="text-2xl font-bold">{data.count}</span>

        <span className="text-sm font-medium text-muted-foreground">
          {percentages.eventos_percentage}% dos eventos
        </span>
      </div>
      <div className="flex min-w-64 flex-col rounded border p-4 shadow-sm">
        <span className="mb-2 text-sm font-medium text-secondary-foreground">
          Valor dos Contratos
        </span>
        <span className="text-2xl font-bold">
          R${' '}
          {parseFloat(totals.total_valor.toString()).toLocaleString('pt-BR', {
            minimumFractionDigits: 2
          })}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {percentages.valor_percentage}% do investimento
        </span>
      </div>
      <div className="flex min-w-64 flex-col rounded border p-4 shadow-sm">
        <span className="mb-2 text-sm font-medium text-secondary-foreground">
          Municipios beneficiados
        </span>
        <span className="text-2xl font-bold">{totals.total_municipios}</span>
        <span className="text-sm font-medium text-muted-foreground">
          {percentages.municipios_percentage}% dos municípios
        </span>
      </div>
      <div className="flex min-w-64 flex-col rounded border p-4 shadow-sm">
        <span className="mb-2 text-sm font-medium text-secondary-foreground">
          Empresas contratadas
        </span>
        <span className="text-2xl font-bold">{totals.total_empresas}</span>
        <span className="text-sm font-medium text-muted-foreground">
          {percentages.empresas_percentage}% das empresas
        </span>
      </div>
    </div>
  )
}
