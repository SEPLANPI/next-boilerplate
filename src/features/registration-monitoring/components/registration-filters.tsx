'use client'

import { SearchInput } from '@/components/ui/search-input'

export function RegistrationFilters() {
  return (
    <div className="flex items-center space-x-4">
      <SearchInput className="max-w-full flex-1" />
    </div>
  )
}
