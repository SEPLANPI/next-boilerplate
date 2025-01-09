import { api } from '@/lib/server-api'

import {
  Table,
  TableTr,
  TableTh,
  TableTd,
  TableThead,
  TableTbody,
  Paper,
  Divider,
  Badge,
  Tooltip
} from '@mantine/core'
import { Info } from 'lucide-react'
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
      <div className="container mx-auto">
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
        <DataListRoot layout="column" size="lg" className="mt-6">
          <DataListItem>
            <DataListLabel>Valor</DataListLabel>
            <DataListValue className="font-bold">
              {formatCurrency(event.valor)}
            </DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Data</DataListLabel>
            <DataListValue>
              {event.data ? formatDate(event.data) : 'Não informado'}
            </DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Município</DataListLabel>
            <DataListValue>{event.municipio || 'Não informado'}</DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Endereço</DataListLabel>
            <DataListValue>{event.local || 'Não informado'}</DataListValue>
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
        <Divider className="my-6" />
        <h2 className="mb-4 text-lg font-semibold">Contratos</h2>
        <Paper withBorder>
          <Table verticalSpacing="xs">
            <TableThead>
              <TableTr>
                <TableTh>N° do Contrato</TableTh>
                <TableTh>Empresa</TableTh>
                <TableTh>Valor</TableTh>
                <TableTh>Autor</TableTh>
                <TableTh>Situação</TableTh>
                <TableTh>Unidade Gestora</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {event.contratos.map((contract) => (
                <TableTr key={contract.numero_contrato}>
                  <TableTd>{contract.numero_contrato}</TableTd>
                  {contract.contratados?.length ? (
                    contract.contratados.map((contractor) => (
                      <TableTd key={contractor.cnpj} className="max-w-lg">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">
                              {contractor.nome}
                            </span>
                            <Badge
                              radius="sm"
                              variant="light"
                              color={
                                contract.status === 'STATUS_ASSINADO'
                                  ? 'teal'
                                  : 'gray'
                              }
                            >
                              {contract.status === 'STATUS_ASSINADO'
                                ? 'Assinado'
                                : 'Cadastrado'}
                            </Badge>
                          </div>
                        </div>
                      </TableTd>
                    ))
                  ) : (
                    <TableTd className="max-w-lg">
                      <div className="font-semibold">
                        O contrato não possui contratados
                      </div>
                    </TableTd>
                  )}
                  <TableTd className="font-bold">
                    {formatCurrency(contract.valor)}
                  </TableTd>
                  <TableTd>
                    {contract.autor_emenda === 'SEM AUTOR'
                      ? 'Governo do Estado'
                      : contract.autor_emenda}
                  </TableTd>
                  <TableTd>{contract.situacao}</TableTd>
                  <TableTd>
                    <Tooltip
                      key={ug.sigla}
                      label={ug.name}
                      openDelay={200}
                      w={300}
                      multiline
                    >
                      <div className="flex cursor-pointer items-center space-x-2">
                        <Info className="size-4 text-muted-foreground" />
                        <span>{ug.sigla}</span>
                      </div>
                    </Tooltip>
                  </TableTd>
                </TableTr>
              ))}
            </TableTbody>
          </Table>
        </Paper>
      </div>
      <EventDetailEditDrawer />
    </>
  )
}
