import { Skeleton, Paper } from '@mantine/core'

export default function EventDetailsLoading() {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <section>
          <div className="mb-2 flex items-center justify-between">
            <Skeleton height={32} width={300} />
          </div>
          <div className="space-y-1">
            <Skeleton height={21} width="100%" />
            <Skeleton height={21} width="75%" />
          </div>
        </section>
      </header>

      <main className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-8">
          <section>
            <Skeleton height={36} width={150} className="mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} height={21} width="75%" />
              ))}
            </div>
          </section>

          <section>
            <Skeleton height={36} width={150} className="mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} height={21} width="75%" />
              ))}
            </div>
          </section>

          <section>
            <Skeleton height={36} width={150} className="mb-6" />
            <Paper>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} height={80} />
                ))}
              </div>
            </Paper>
          </section>
        </div>

        <div className="col-span-4">
          <section>
            <Skeleton height={36} width={150} className="mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} height={50} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
