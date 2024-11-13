import { Button } from '@mantine/core'
import Link from 'next/link'

export function EventsEmptyState() {
  return (
    <div className="flex flex-col items-center p-10">
      <h2 className="mb-6 text-center text-lg font-semibold">
        Não encontramos eventos correspondentes
      </h2>
      <Link href="/" shallow={false}>
        <Button size="sm" variant="subtle">
          Limpar Filtros
        </Button>
      </Link>
    </div>
  )
}
