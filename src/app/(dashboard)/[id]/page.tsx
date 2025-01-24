import { api } from '@/lib/server-api'

import {
  Table,
  TableTr,
  TableTh,
  TableTd,
  TableThead,
  TableTbody,
  Paper,
  Badge,
  Accordion,
  AccordionItem,
  AccordionControl,
  AccordionPanel
} from '@mantine/core'
import {
  DataListRoot,
  DataListItem,
  DataListLabel,
  DataListValue
} from '@/components/ui/data-list'
import { FetchError } from '@/components/errors/fetch-error'
import { formatDate } from '@/utils/format-date'
import { EditEventButton } from '@/features/events/components/edit-event-button'
import { EventDetail } from '@/features/events/types'
import { EventDetailEditDrawer } from '@/features/events/components/event-detail-edit-drawer'
import { formatCurrency } from '@/lib/utils'

type EventDetailProps = {
  params: {
    id: number
  }
}

function ContractAccordionLabel({ numero, titulo, empresa }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <div className="font-medium">{numero}</div>
        <div className="text-sm text-muted-foreground">{titulo}</div>
      </div>
      <div className="text-sm">
        <div>
          <div>{empresa.nome}</div>
          <div className="text-muted-foreground">{empresa.cnpj}</div>
        </div>
      </div>
    </div>
  )
}

export default async function EventDetails({
  params: { id }
}: EventDetailProps) {
  const response = await api.get(`/eventos/${id}`)

  if (!response.ok) {
    const error = await response.json()
    return <FetchError error={error.detail} title="Erro ao carregar evento" />
  }

  const event: EventDetail = await response.json()
  const ug = event.ugs[0]

  return (
    <>
      <div className="container mx-auto space-y-8">
        <section>
          <div className="flex justify-between">
            <div className="mb-2 flex items-end space-x-2">
              <h1 className="text-2xl font-semibold">{event.nome}</h1>
              <Badge
                radius="sm"
                variant="light"
                color={event.editado ? 'blue' : 'yellow'}
                className="mb-2"
              >
                {event.editado ? 'Revisado' : 'Pendente'}
              </Badge>
            </div>
            <EditEventButton event={event} />
          </div>
          <p className="max-w-[75ch] text-sm text-secondary-foreground">
            {event.objetivo}
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <h2 className="text-md mb-4 font-semibold">Informações</h2>
              <DataListRoot size="lg" layout="column">
                <DataListItem>
                  <DataListLabel>Data</DataListLabel>
                  <DataListValue>
                    {event.data ? formatDate(event.data) : 'Não informado'}
                  </DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Município</DataListLabel>
                  <DataListValue>
                    {event.municipio || 'Não informado'}
                  </DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Endereço</DataListLabel>
                  <DataListValue>
                    {event.local || 'Não informado'}
                  </DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Categoria</DataListLabel>
                  <DataListValue>
                    {event.categoria_nome || 'Não informado'}
                  </DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Natureza do Gasto</DataListLabel>
                  <DataListValue>
                    {event.natureza_gasto_nomes?.join(', ') || 'Não informado'}
                  </DataListValue>
                </DataListItem>
              </DataListRoot>
            </div>

            <div>
              <h2 className="text-md mb-4 font-semibold">Patrocinadores</h2>
              <DataListRoot size="lg" layout="column">
                <DataListItem>
                  <DataListLabel>Unidades Gestoras</DataListLabel>
                  <DataListValue>
                    {event.ugs.map(({ nome, sigla }) => (
                      <span key={sigla}>{sigla}</span>
                    ))}
                  </DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Autores</DataListLabel>
                  <DataListValue>
                    {event.deputados.map(({ nome }) => nome).join(', ')}
                  </DataListValue>
                </DataListItem>
              </DataListRoot>
            </div>
            <div>
              <h2 className="text-md mb-4 font-semibold">Valores</h2>
              <DataListRoot layout="column" size="lg">
                <DataListItem>
                  <DataListLabel>Valor do Contrato</DataListLabel>
                  <DataListValue className="font-semibold">
                    {formatCurrency(event.valor)}
                  </DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Empenhado</DataListLabel>
                  <DataListValue className="font-semibold">
                    {formatCurrency(event.valor_empenhado)}
                  </DataListValue>
                </DataListItem>
                <DataListItem className="font-semibold">
                  <DataListLabel>Liquidado</DataListLabel>
                  <DataListValue>
                    {formatCurrency(event.valor_liquidado)}
                  </DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Pago</DataListLabel>
                  <DataListValue className="font-semibold">
                    {formatCurrency(event.valor_pago)}
                  </DataListValue>
                </DataListItem>
              </DataListRoot>
            </div>
          </div>
        </section>
        <section>
          <h2 className="mb-4 text-lg font-semibold">Contratos</h2>
          <Paper withBorder>
            <Accordion chevronPosition="right" variant="outlined">
              {event.contratos.map((contract) => (
                <AccordionItem
                  key={contract.numero}
                  value={contract.numero.toString()}
                >
                  <AccordionControl>
                    <ContractAccordionLabel
                      numero={contract.numero}
                      titulo={contract.titulo}
                      empresa={contract.empresa}
                    />
                  </AccordionControl>
                  <AccordionPanel>
                    <div className="space-y-4">
                      <DataListRoot size="sm">
                        <DataListItem>
                          <DataListLabel>Situação</DataListLabel>
                          <DataListValue>
                            <Badge
                              radius="sm"
                              variant="light"
                              color={
                                contract.status === 'ASSINADO' ? 'teal' : 'gray'
                              }
                            >
                              {contract.status === 'ASSINADO'
                                ? 'Assinado'
                                : 'Cadastrado'}
                            </Badge>{' '}
                            {contract.situacao}
                          </DataListValue>
                        </DataListItem>
                        <DataListItem>
                          <DataListLabel>Valor do Contrato</DataListLabel>
                          <DataListValue>
                            {formatCurrency(contract.valor)}
                          </DataListValue>
                        </DataListItem>
                      </DataListRoot>
                      {contract.execucoes?.length > 0 && (
                        <div>
                          <h3 className="mb-2 text-sm font-semibold">
                            Execuções
                          </h3>
                          <Table verticalSpacing="xs" striped>
                            <TableThead>
                              <TableTr>
                                <TableTh>Mês/Ano</TableTh>
                                <TableTh>Empenhado</TableTh>
                                <TableTh>Liquidado</TableTh>
                                <TableTh>Pago</TableTh>
                              </TableTr>
                            </TableThead>
                            <TableTbody>
                              {contract.execucoes.map((exec) => (
                                <TableTr key={exec.id}>
                                  <TableTd>
                                    {exec.mes}/{exec.ano}
                                  </TableTd>
                                  <TableTd>
                                    {formatCurrency(exec.valor_empenhado)}
                                  </TableTd>
                                  <TableTd>
                                    {formatCurrency(exec.valor_liquidado)}
                                  </TableTd>
                                  <TableTd>
                                    {formatCurrency(exec.valor_pago)}
                                  </TableTd>
                                </TableTr>
                              ))}
                            </TableTbody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Paper>
        </section>
      </div>
      <EventDetailEditDrawer />
    </>
  )
}
