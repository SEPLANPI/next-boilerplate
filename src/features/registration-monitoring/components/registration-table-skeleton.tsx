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
    <Table verticalSpacing="xs" className="w-full table-fixed">
      <TableThead>
        <TableTr>
          <TableTh className="w-full">Usuário</TableTh>
          <TableTh className="w-48">Eixo</TableTh>
          <TableTh className="w-48">Situação</TableTh>
          <TableTh className="w-28">Responsável</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {skeletonRows.map((_, index) => (
          <TableTr key={index}>
            <TableTd className="w-full">
              <div className="flex items-center gap-2">
                <Skeleton circle height={26} width={26} />
                <Skeleton height={rowContentHeight} width='50%  ' />
              </div>
            </TableTd>
            <TableTd>
              <Skeleton height={rowContentHeight} />
            </TableTd>
            <TableTd>
              <Skeleton height={rowContentHeight} />
            </TableTd>
            <TableTd>
              <Skeleton circle height={26} width={26} />
            </TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  )
}
