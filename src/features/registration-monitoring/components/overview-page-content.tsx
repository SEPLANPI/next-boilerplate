import { FetchError } from '@/components/errors/fetch-error'
import { getRegistrationOverview } from '../api/get-registration-overview'
import { BarChart } from '@mantine/charts'
import { ScrollArea } from '@mantine/core'

export async function OverviewPageContent() {
  const { data, error } = await getRegistrationOverview()

  if (error || !data) {
    return <FetchError error={error} />
  }

  const eixosChartData = data.inscritos_por_eixo.map((eixo) => ({
    name: eixo.descricao,
    total: eixo.total
  }))

  const municipiosChartData = data.inscritos_por_municipio.map((municipio) => ({
    name: municipio.nome,
    total: municipio.total
  }))

  return (
    <>
      <div className="mb-6 flex w-full space-x-6">
        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-md border bg-white p-6 shadow">
          <span className="text-4xl font-semibold">{data.total_inscritos}</span>
          <span className="text-sm text-secondary-foreground">
            Total de Inscritos
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-md border bg-white p-6 shadow">
          <span className="text-4xl font-semibold">{data.total_votantes}</span>
          <span className="text-sm text-secondary-foreground">
            Inscritos em Oficinas
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-md border bg-white p-6 shadow">
          <span className="text-4xl font-semibold">{data.ouvintes}</span>
          <span className="text-sm text-secondary-foreground">
            Inscritos na Plenária
          </span>
        </div>
      </div>

      <div className="mb-6 rounded-md border bg-white p-6 shadow">
        <h2 className="text-md mb-6 font-semibold">Inscritos por Eixo</h2>
        <BarChart
          h={200}
          data={eixosChartData}
          tooltipAnimationDuration={200}
          withBarValueLabel
          dataKey="name"
          yAxisProps={{ width: 50 }}
          barProps={{ radius: 6 }}
          series={[{ name: 'total', color: 'govGreen.6' }]}
        />
      </div>

      <div className="rounded-md border bg-white p-6 shadow">
        <h2 className="text-md mb-6 font-semibold">Inscritos por Municipio</h2>
        <ScrollArea h={400}>
          <BarChart
            h={1800}
            data={municipiosChartData}
            tooltipAnimationDuration={200}
            withBarValueLabel
            valueLabelProps={{
              position: 'left',
              fontWeight: 600
            }}
            orientation="vertical"
            dataKey="name"
            yAxisProps={{ width: 200 }}
            barProps={{ radius: 6 }}
            series={[{ name: 'total', color: 'govGreen.6' }]}
          />
        </ScrollArea>
      </div>
    </>
  )
}
