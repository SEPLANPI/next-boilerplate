import { Paper, Skeleton } from '@mantine/core'
import {
  FormLayoutContent,
  FormLayoutHeader,
  FormLayoutTitle
} from '@/components/layouts/form-layout'

function FormSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col space-y-6 [&:not(:last-child)]:mb-12 [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-10">
      {children}
    </section>
  )
}

export default function MergeEventsLoading() {
  return (
    <>
      <FormLayoutHeader>
        <FormLayoutTitle>Mesclar eventos</FormLayoutTitle>
        <Skeleton height={36} width={140} />
      </FormLayoutHeader>
      <FormLayoutContent spacing={false} size="full">
        <div className="grid grid-cols-[350px_1fr_1fr] divide-x">
          {/* Event list column */}
          <div className="bg-gray-50 p-5">
            <div className="flex flex-col gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} height={100} className="rounded" />
              ))}
            </div>
          </div>

          {/* Event details column */}
          <div className="space-y-6 p-5">
            <Skeleton height={36} width={280} />
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="grid grid-cols-3 gap-4">
                  <Skeleton height={21} width={100} />
                  <Skeleton height={65} className="col-span-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Form column */}
          <div className="p-5">
            <div className="space-y-12">
              {/* General Information Section */}
              <FormSection>
                <Skeleton height={24} width={150} />
                <Skeleton height={60} /> {/* Name */}
                <Skeleton height={100} /> {/* Description */}
                <Skeleton height={100} /> {/* Objective */}
                <Skeleton height={60} width={120} /> {/* Date */}
                <Skeleton height={60} width={200} /> {/* Category */}
              </FormSection>

              {/* Location Section */}
              <FormSection>
                <Skeleton height={24} width={150} />
                <Skeleton height={60} width={200} /> {/* City */}
                <Skeleton height={60} /> {/* Address */}
              </FormSection>

              {/* Contracts Section */}
              <FormSection>
                <Skeleton height={24} width={150} />
                {Array.from({ length: 2 }).map((_, i) => (
                  <Paper key={i} className="space-y-4 p-4">
                    <Skeleton height={21} width={200} />
                    <div className="space-y-2">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="grid grid-cols-3 gap-4">
                          <Skeleton height={21} />
                          <Skeleton height={21} className="col-span-2" />
                        </div>
                      ))}
                    </div>
                    <Skeleton height={60} />
                  </Paper>
                ))}
              </FormSection>

              {/* Review Section */}
              <FormSection>
                <Skeleton height={24} width={150} />
                <Skeleton height={24} width={100} />
              </FormSection>
            </div>
          </div>
        </div>
      </FormLayoutContent>
    </>
  )
}
