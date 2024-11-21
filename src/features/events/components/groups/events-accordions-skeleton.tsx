import { Skeleton } from '@mantine/core'

export function EventsAccordionsSkeleton() {
  const skeletonRows = Array.from({ length: 15 })

  const rowHeight = 48.8

  return (
    <div className="space-y-4">
      {skeletonRows.map((_, index) => (
        <Skeleton height={rowHeight} key={index} />
      ))}
    </div>
  )
}
