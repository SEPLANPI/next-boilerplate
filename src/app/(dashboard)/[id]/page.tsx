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
  AccordionPanel,
  Alert,
  Avatar
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
import { Contract, EventDetail } from '@/features/events/types'
import { EventDetailEditDrawer } from '@/features/events/components/event-detail-edit-drawer'
import { formatCurrency } from '@/lib/utils'
import { Deputy } from '@/features/deputies/types'
import { formatCNPJ } from '@/utils/format-cnpj'
import { PropsWithChildren } from 'react'

type EventDetailProps = {
  params: {
    id: number
  }
}

function ContractAccordionLabel({ numero, titulo, empresa }: any) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-1">
        <div className="whitespace-nowrap font-medium">{numero} - </div>
        <div className="truncate text-sm text-muted-foreground">{titulo}</div>
      </div>
      <div className="flex items-center space-x-1 text-sm">
        <div className="font-medium">{formatCNPJ(empresa.cnpj)} - </div>
        <div className="truncate text-muted-foreground">{empresa.nome}</div>
      </div>
    </div>
  )
}

function DeputyCard({ deputy }: { deputy: Deputy }) {
  return (
    <div className="flex items-center space-x-2">
      <Avatar src={deputy.foto} alt={deputy.nome} />
      <span>{deputy.nome}</span>
      <span>{deputy.partido}</span>
    </div>
  )
}

function Subtitle({ children }: PropsWithChildren) {
  return (
    <h2 className="mb-4 border-b pb-2 text-lg font-semibold">{children}</h2>
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

  const hasFonteGoverno = new Set(
    event.contratos.flatMap(({ execucoes }) =>
      execucoes.map(({ fonte }) => fonte)
    )
  ).has('GOVERNO')

  function getSituacaoText(situacao: Contract['situacao']): string {
    switch (situacao) {
      case 'EM_VIGOR':
        return 'Em Vigor'
      case 'ENCERRADO':
        return 'Encerrado'
      case 'LICITADO':
        return 'Licitado'
      default:
        return ''
    }
  }

  function contractHasFonteGoverno(execucoes: Contract['execucoes']) {
    return new Set(execucoes.map(({ fonte }) => fonte)).has('GOVERNO')
  }
  return (
    <>
      <div className="container mx-auto">
        <header className="mb-8">
          {!event.editado && (
            <Alert
              variant="light"
              color="orange"
              title="Evento aguardando revisão"
              className="mb-2"
            >
              Este evento ainda não foi revisado e pode conter informações
              incompletas ou incorretas.
            </Alert>
          )}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h1 className="text-xl font-semibold">{event.nome}</h1>
              <EditEventButton event={event} />
            </div>
            <p className="text-sm leading-normal text-secondary-foreground">
              {event.descricao}
            </p>
          </section>
        </header>
        <main className="grid grid-cols-12 gap-8">
          <div className="col-span-8 space-y-8">
            <section>
              <Subtitle>Patrocinadores</Subtitle>
              <DataListRoot>
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
                    {event.deputados.map((deputy) => (
                      <DeputyCard key={deputy.id} deputy={deputy} />
                    ))}
                    {hasFonteGoverno && <span>Governo do Estado</span>}
                  </DataListValue>
                </DataListItem>
              </DataListRoot>
            </section>
            <section>
              <Subtitle>Valores</Subtitle>
              <DataListRoot>
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
            </section>
            <section>
              <Subtitle>Contratos</Subtitle>
              <Paper>
                <Accordion chevronPosition="right" variant="separated">
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
                          <DataListRoot>
                            <DataListItem>
                              <DataListLabel>Status</DataListLabel>
                              <DataListValue>
                                <Badge
                                  variant="light"
                                  color={
                                    contract.status === 'ASSINADO'
                                      ? 'teal'
                                      : 'gray'
                                  }
                                >
                                  {contract.status === 'ASSINADO'
                                    ? 'Assinado'
                                    : 'Cadastrado'}
                                </Badge>
                              </DataListValue>
                            </DataListItem>
                            <DataListItem>
                              <DataListLabel>Situacao</DataListLabel>
                              <DataListValue>
                                {getSituacaoText(contract.situacao)}
                              </DataListValue>
                            </DataListItem>
                            <DataListItem>
                              <DataListLabel>Valor do Contrato</DataListLabel>
                              <DataListValue>
                                {formatCurrency(contract.valor)}
                              </DataListValue>
                            </DataListItem>
                            <DataListItem>
                              <DataListLabel>Unidade Gestora</DataListLabel>
                              <DataListValue>{contract.ug_nome}</DataListValue>
                            </DataListItem>
                            <DataListItem>
                              <DataListLabel>Autores</DataListLabel>
                              <DataListValue>
                                {event.deputados.map((deputy) => (
                                  <DeputyCard key={deputy.id} deputy={deputy} />
                                ))}
                                {contractHasFonteGoverno(
                                  contract.execucoes
                                ) && <span>Governo do Estado</span>}
                              </DataListValue>
                            </DataListItem>
                          </DataListRoot>

                          {contract.execucoes?.length > 0 && (
                            <div>
                              <h3 className="mb-2 text-sm font-semibold">
                                Execuções
                              </h3>
                              <Table verticalSpacing="xs">
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
          <div className="col-span-4">
            <section>
              <Subtitle>Detalhes</Subtitle>
              <DataListRoot orientation="vertical">
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
            </section>
          </div>
        </main>
      </div>
      <EventDetailEditDrawer />
    </>
  )
}
