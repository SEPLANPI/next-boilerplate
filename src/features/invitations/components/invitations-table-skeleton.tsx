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

export function InvitationsTableSkeleton() {
  const skeletonRows = Array.from({ length: PAGINATION.DEFAULT_PAGE_SIZE })
  const rowContentHeight = 21.688

  return (
    <Table verticalSpacing="xs" className="w-full table-fixed">
      <TableThead>
        <TableTr>
          <TableTh className="w-full">Identificador</TableTh>
          <TableTh className="w-28">Conselheiro</TableTh>
          <TableTh className="w-32">Status</TableTh>
          <TableTh className="w-48">Criado em</TableTh>
          <TableTh className="w-28">Admin</TableTh>
          <TableTh className="w-16"></TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {skeletonRows.map((_, index) => (
          <TableTr key={index}>
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
  )
}
