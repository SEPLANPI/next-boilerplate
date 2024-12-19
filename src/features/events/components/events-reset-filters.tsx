import { Button, Divider } from '@mantine/core'
import Link from 'next/link'
import { eventsSearchParams } from '../lib/search-params'

export function EventsResetFilters() {
  const {
    group,
    groupSort,
    ugs,
    deputados,
    municipios,
    fromDate,
    toDate,
    search
  } = eventsSearchParams.all()

  const hasActiveFilters = Boolean(
    (group && group.length > 0) ||
      (groupSort && groupSort.length > 0) ||
      (ugs && ugs.length > 0) ||
      (deputados && deputados.length > 0) ||
      (municipios && municipios.length > 0) ||
      search ||
      fromDate ||
      toDate
  )

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
