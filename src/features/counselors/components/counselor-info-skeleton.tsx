import { Grid, GridCol, Skeleton } from '@mantine/core'

export function CounselorInfoSkeleton() {
  return (
    <Grid>
      <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
        <SectionSkeleton title="Dados Pessoais" lines={6} />
      </GridCol>
      <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
        <SectionSkeleton title="Localização" lines={6} />
      </GridCol>
      <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
        <SectionSkeleton title="Conselho" lines={3} twoColumns={false} />
      </GridCol>
      <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
        <SectionSkeleton title="Evento" lines={3} twoColumns={false} />
      </GridCol>
      <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
        <SectionSkeleton title="Dados Bancários" lines={6} />
      </GridCol>
      <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
        <SectionSkeleton title="Documentos" lines={4} twoColumns={false} />
      </GridCol>
    </Grid>
  )
}

function SectionSkeleton({
  title,
  lines,
  twoColumns = true
}: {
  title: string
  lines: number
  twoColumns?: boolean
}) {
  return (
    <>
      <div className="mb-4 flex flex-row items-center justify-between gap-2 rounded-sm bg-gray-100 px-3 py-2">
        <div>
          <h2 className="text-sm font-bold">{title}</h2>
        </div>
      </div>
      <div className="grid grid-cols-12 px-2">
        {Array(lines)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`${twoColumns ? 'col-span-6' : 'col-span-12'} p-2`}
            >
              <Skeleton height={14} className="mb-1" width="60%" />
              <Skeleton height={14} />
            </div>
          ))}
      </div>
    </>
  )
}

export default CounselorInfoSkeleton
