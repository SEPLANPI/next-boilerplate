import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Skeleton
} from '@mantine/core'

export function EventsTableSkeleton() {
  const skeletonRows = Array.from({ length: 10 })

  return (
    <>
      <Table verticalSpacing="xs">
        <TableThead>
          <TableTr>
            <TableTh>Nome</TableTh>
            <TableTh>Município</TableTh>
            <TableTh>Data</TableTh>
            <TableTh>Unidades Gestoras</TableTh>

            <TableTh>Contratos</TableTh>
            <TableTh>Valor</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {skeletonRows.map((_, index) => (
            <TableTr key={index}>
              <TableTd className="w-[500px] truncate">
                <Skeleton height={22} />
              </TableTd>
              <TableTd>
                <Skeleton height={22} />
              </TableTd>
              <TableTd>
                <Skeleton height={22} />
              </TableTd>
              <TableTd>
                <Skeleton height={22} />
              </TableTd>

              <TableTd>
                <Skeleton height={22} />
              </TableTd>
              <TableTd>
                <Skeleton height={22} />
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
      <div className="mt-6 flex items-center justify-between">
        <Skeleton height={20} width={160} />
        <div className="flex space-x-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton height={26} width={26} key={index} />
          ))}
        </div>
      </div>
    </>
  )
}
