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

export function DeputiesTableSkeleton() {
  const skeletonRows = Array.from({ length: PAGINATION.DEFAULT_PAGE_SIZE })
  const rowContentHeight = 21.688

  return (
    <Table verticalSpacing="xs">
      <TableThead>
        <TableTr>
          <TableTh>Nome</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {skeletonRows.map((_, index) => (
          <TableTr key={index}>
            <TableTd>
              <Skeleton height={rowContentHeight} />
            </TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  )
}
