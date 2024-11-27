'use client'

import { DefaultFetchError } from '@/components/errors/default-fetch-error'
import { EventsEmptyState } from '../events-empty-state'
import { EventsTable } from '../events-table'
import { EventGroup } from '@/types/events'
import { generateGroupIdentifier } from '../../utils/generate-group-identifier'
import { useQueryStates } from 'nuqs'
import { eventsSearchParamsParsers } from '../../lib/search-params'
import { useQuery } from '@tanstack/react-query'
import { clientGetEvents } from '../../api/client/client-get-events'
import { ControlledPaginationFooter } from '@/components/ui/pagination-footer/controlled-pagination-footer'
import { useState } from 'react'
import { EventsTableSkeleton } from '../events-table-skeleton'

interface EventsListProps {
  group: EventGroup
}

export function EventsList({ group }: EventsListProps) {
  const groupId = generateGroupIdentifier(group)
  const [params] = useQueryStates(eventsSearchParamsParsers)
  const [page, setPage] = useState(1)

  const { data, error, isFetching } = useQuery({
    queryKey: [groupId, page, params.sort],
    queryFn: () =>
      clientGetEvents(group.eventos_url, {
        ...params,
        page,
        perPage: 10
      }),
    staleTime: 30 * 60 * 1000, // 30m
    placeholderData: (previousData) => previousData
  })

  if (error) {
    return <DefaultFetchError />
  }

  if (data && data.results.length === 0) {
    return <EventsEmptyState />
  }

  return (
    <>
      {isFetching ? (
        <EventsTableSkeleton />
      ) : (
        <EventsTable events={data?.results || []} shallowSort={true} />
      )}
      <ControlledPaginationFooter
        totalItems={data?.count || 1}
        itemsPerPage={10}
        page={page}
        onPageChange={setPage}
      />
    </>
  )
}
