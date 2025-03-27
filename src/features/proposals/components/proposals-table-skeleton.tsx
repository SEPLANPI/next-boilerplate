import { PAGINATION } from '@/constants/pagination'
import {
  Skeleton,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr
} from '@mantine/core'

export function ProposalsTableSkeleton() {
  const skeletonRows = Array.from({ length: PAGINATION.DEFAULT_PAGE_SIZE })
  const rowContentHeight = 21.688

  return (
    <Table verticalSpacing="xs">
      <TableThead>
        <TableTr>
          <TableTh>Proposta</TableTh>
          <TableTh>Eixo</TableTh>
          <TableTh>Status</TableTh>
          <TableTh>Responsável</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {skeletonRows.map((_, index) => (
          <TableTr key={index}>
            <TableTd w={'50%'}>
              <Skeleton height={rowContentHeight} w={'80%'}/>
            </TableTd>
            <TableTd w={'40%'}>
              <Skeleton height={rowContentHeight} w={'50%'}/>
            </TableTd>
            <TableTd w={'15%'}>
              <Skeleton height={rowContentHeight} />
            </TableTd>
            <TableTd w={'10%'}>
              <div className="flex w-full items-center gap-3">
                <Skeleton circle height={32} width={32} />
              </div>
            </TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  )
}
