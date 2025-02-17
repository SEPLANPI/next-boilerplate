import { Button, Divider } from '@mantine/core'
import Link from 'next/link'
import { deputiesSearchParams } from '../lib/search-params'

export function DeputiesResetFilters() {
  const { search, mandatos, partidos } = deputiesSearchParams.all()

  const hasActiveFilters = Boolean(search || mandatos || partidos)

  if (hasActiveFilters) {
    return (
      <>
        <Divider orientation="vertical" />
        <Link href="/deputados">
          <Button variant="subtle">Limpar Filtros</Button>
        </Link>
      </>
    )
  }
}
