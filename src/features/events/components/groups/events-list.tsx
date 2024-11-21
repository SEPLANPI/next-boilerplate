'use client'

import { DefaultFetchError } from '@/components/errors/default-fetch-error'
import { EventsEmptyState } from '../events-empty-state'
import { EventsTable } from '../events-table'
import { EventGroup } from '@/types/events'
import { generateGroupIdentifier } from '../../utils/generate-group-identifier'
import { useQueryStates } from 'nuqs'
import { eventsSearchParamsParsers } from '../../lib/search-params'
import { useQuery } from '@tanstack/react-query'
import { clientGetEvents } from '../../lib/fetchers/client-get-events'

interface EventsListProps {
  group: EventGroup
}

export function EventsList({ group }: EventsListProps) {
  const groupId = generateGroupIdentifier(group)
  const [params] = useQueryStates(eventsSearchParamsParsers)

  const { data, error, isFetching } = useQuery({
    queryKey: [`group-events-table-${groupId}`],
    queryFn: () =>
      clientGetEvents({
        ...params,
        groupId,
        perPage: 10
      }),
    staleTime: 30 * 60 * 1000 // 30m
  })

  if (isFetching) {
    return <>Carregando ...</>
  }

  if (error || !data) {
    return <DefaultFetchError />
  }

  if (data.results.length === 0) {
    return <EventsEmptyState />
  }

  return (
    <EventsTable
      events={data.results}
      count={data.count}
      perPage={10}
      instanceId={groupId}
    />
  )
}
