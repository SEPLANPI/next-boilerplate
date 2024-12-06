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

export function AdministrativeUnitsTableSkeleton() {
  const skeletonRows = Array.from({ length: PAGINATION.DEFAULT_PAGE_SIZE })
  const rowContentHeight = 21.688

  return (
    <Table verticalSpacing="xs">
      <TableThead>
        <TableTr>
          <TableTh className="w-[10%] min-w-16">Número</TableTh>
          <TableTh className="w-[15%] min-w-24">Sigla</TableTh>
          <TableTh className="w-[80%]">Nome</TableTh>
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
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  )
}
