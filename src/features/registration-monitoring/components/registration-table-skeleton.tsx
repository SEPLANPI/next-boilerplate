import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Skeleton
} from '@mantine/core'
import { PAGINATION } from '@/constants/pagination'

export function RegistrationTableSkeleton() {
  const skeletonRows = Array.from({ length: PAGINATION.DEFAULT_PAGE_SIZE })
  const rowContentHeight = 21.688

  return (
    <Table verticalSpacing="xs">
      <TableThead>
        <TableTr>
          <TableTh>Conselheiro</TableTh>
          <TableTh>Status</TableTh>
          <TableTh>Eixo</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {skeletonRows.map((_, index) => (
          <TableTr key={index}>
            <TableTd>
              <div className="flex w-full items-center gap-3">
                <Skeleton circle height={32} width={32} />
                <div className="flex flex-1 flex-col">
                  <Skeleton height={rowContentHeight} width="75%" />
                  <Skeleton height={rowContentHeight} width="40%" />
                </div>
              </div>
            </TableTd>
            <TableTd>
              <Skeleton height={rowContentHeight} width="60%" />
            </TableTd>
            <TableTd>
              <Skeleton height={rowContentHeight} width="80%" />
            </TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  )
}
