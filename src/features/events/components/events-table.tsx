'use client'

import {
  Table,
  TableTr,
  TableTh,
  TableTd,
  TableThead,
  TableTbody,
  Tooltip,
  Badge
} from '@mantine/core'
import type { Event } from './events-content'

type EventsTableProps = {
  events: Event[]
}

export async function EventsTable({ events }: EventsTableProps) {
  return (
    <>
      <Table verticalSpacing="xs">
        <TableThead>
          <TableTr>
            <TableTh>Nome</TableTh>
            <TableTh>Município</TableTh>
            <TableTh>Data</TableTh>
            <TableTh className="w-1 whitespace-nowrap">
              Unidades Gestoras
            </TableTh>
            <TableTh>Contratos</TableTh>
            <TableTh>Valor</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {events.map((event) => (
            <TableTr key={event.nome}>
              <TableTd className="max-w-[500px] truncate">{event.nome}</TableTd>
              <TableTd>{event.municipio || 'Não informado'}</TableTd>
              <TableTd>{event.data || 'Não informado'}</TableTd>
              <TableTd className="w-1 whitespace-nowrap">
                {event.ugs.map(({ name, sigla }) => (
                  <Tooltip
                    key={sigla}
                    label={name}
                    openDelay={200}
                    w={300}
                    multiline
                  >
                    <div className="flex cursor-pointer items-center justify-between space-x-2">
                      <span>{sigla}</span>
                      <Badge circle className="bg-muted text-muted-foreground">
                        ?
                      </Badge>
                    </div>
                  </Tooltip>
                ))}
              </TableTd>
              <TableTd>{event.contratos.length} contratos</TableTd>
              <TableTd className="font-semibold">
                R${' '}
                {parseFloat(event.valor).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </>
  )
}
