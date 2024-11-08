import { Skeleton } from '@mantine/core'
import { EventsTableSkeleton } from './events-table-skeleton'

export function EventsContentSkeleton() {
  const skeletonCards = Array.from({ length: 4 })

  return (
    <>
      <EventsTableSkeleton />
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
    </>
  )
}
