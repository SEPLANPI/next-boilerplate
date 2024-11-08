import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Skeleton
} from '@mantine/core'

export function EventsContentSkeleton() {
  const skeletonRows = Array.from({ length: 15 })
  const skeletonCards = Array.from({ length: 4 })

  return (
    <>
      <div className="my-6 flex space-x-4">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="flex h-[122.56px] min-w-64 flex-col justify-between rounded border p-4 shadow-sm"
          >
            <Skeleton height={16} className="mb-2" />
            <Skeleton height={24} />
            <Skeleton height={14} />
          </div>
        ))}
      </div>
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
