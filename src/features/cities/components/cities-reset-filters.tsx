import { Button, Divider } from '@mantine/core'
import Link from 'next/link'
import { citiesSearchParams } from '../lib/search-params'

export function CitiesResetFilters() {
  const { search, territories } = citiesSearchParams.all()

  const hasActiveFilters = Boolean(search || territories)

  if (hasActiveFilters) {
    return (
      <>
        <Divider orientation="vertical" />
        <Link href="/municipios">
          <Button variant="subtle">Limpar Filtros</Button>
        </Link>
      </>
    )
  }
}
