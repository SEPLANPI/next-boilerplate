import { Skeleton } from '@mantine/core'

export function OverviewPageSkeleton() {
  return (
    <>
      <div className="mb-6 flex w-full space-x-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-md border bg-white p-6 shadow"
          >
            <Skeleton height={40} width={60} className="mb-2" />
            <Skeleton height={14} width={120} />
          </div>
        ))}
      </div>
      <div className="mb-6 rounded-md border bg-white p-6 shadow">
        <Skeleton height={18} width={150} className="mb-6" />
        <Skeleton height={200} width="100%" />
      </div>
      <div className="rounded-md border bg-white p-6 shadow">
        <Skeleton height={18} width={180} className="mb-6" />
        <Skeleton height={400} width="100%" />
      </div>
    </>
  )
}
