import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Skeleton
} from '@mantine/core'

type EventsTableProps = {
  rows?: number
}

export function EventsTableSkeleton({ rows = 15 }: EventsTableProps) {
  const skeletonRows = Array.from({ length: rows })

  const rowContentHeight = 21.688
  return (
    <>
      <Table verticalSpacing="xs">
        <TableThead>
          <TableTr>
            <TableTh>Nome</TableTh>
            <TableTh>Município</TableTh>
            <TableTh>Data</TableTh>
            <TableTh>Unidades Gestoras</TableTh>
            <TableTh>Valor</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {skeletonRows.map((_, index) => (
            <TableTr key={index}>
              <TableTd className="w-[500px] truncate">
                <Skeleton height={rowContentHeight} />
              </TableTd>
              <TableTd>
                <Skeleton height={rowContentHeight} />
              </TableTd>
              <TableTd>
                <Skeleton height={rowContentHeight} />
              </TableTd>
              <TableTd>
                <Skeleton height={rowContentHeight} />
              </TableTd>
              <TableTd>
                <Skeleton height={rowContentHeight} />
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </>
  )
}
