'use client'

import { AsyncFilter } from '@/components/ui/async-filter'
import { SearchInput } from '@/components/ui/search-input'
export function InvitationFilters() {
  return (
    <div className="flex items-center space-x-4">
      <SearchInput />
      <AsyncFilter>Situação</AsyncFilter>
    </div>
  )
}
