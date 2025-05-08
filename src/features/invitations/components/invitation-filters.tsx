'use client'

import { StaticFilter } from '@/components/ui/filters/static'
import { SearchInput } from '@/components/ui/search-input'

type InvitationStatus = 'true' | 'false'

const statusColors: Record<InvitationStatus, string> = {
  true: 'bg-blue-500',
  false: 'bg-orange-500'
}

export function InvitationFilters() {
  return (
    <div className="flex flex-1 items-center space-x-4">
      <SearchInput  />
      <StaticFilter
        showSearch={false}
        showSelectedOnTop={false}
        searchParamKey="usado"
        options={[
          {
            id: 'true',
            label: 'Usado'
          },
          {
            id: 'false',
            label: 'Pendente'
          }
        ]}
        renderOption={(option) => (
          <div className="flex items-center gap-2">
            <div
              className={`size-3 rounded-sm ${statusColors[option.id as InvitationStatus]}`}
            />
            <span className="flex-grow font-medium">{option.label}</span>
          </div>
        )}
      >
        Status
      </StaticFilter>
    </div>
  )
}
