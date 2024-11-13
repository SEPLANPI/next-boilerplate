import { Button, Divider } from '@mantine/core'
import Link from 'next/link'
import { eventsSearchParams } from '../lib/search-params'

export function EventsResetFilters() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page, ...params } = eventsSearchParams.all()

  const hasActiveFilters =
    params &&
    Object.values(params).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0
      }

      return Boolean(value)
    })

  if (hasActiveFilters) {
    return (
      <>
        <Divider orientation="vertical" />
        <Link href=".">
          <Button variant="subtle">Limpar Filtros</Button>
        </Link>
      </>
    )
  }
}
