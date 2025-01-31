import {
  FormLayoutContent,
  FormLayoutHeader,
  FormLayoutTitle
} from '@/components/layouts/form-layout'
import { getEvent } from '@/features/events/api/get-event'
import { mergeEventsSearchParams } from '@/features/events/lib/search-params'
import { SearchParams } from 'nuqs/server'
import { MergeEventForm } from '@/features/events/components/merge-event-form'
import { Button } from '@mantine/core'
import { EventDetail } from '@/features/events/types'
import { redirect } from 'next/navigation'

export default async function MergeEvents({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await mergeEventsSearchParams.parse(searchParams)

  const events = params?.ids
    ? await Promise.all(params.ids.map((id) => getEvent(id.toString())))
    : []

  const failedEvents = events.filter((result) => result.error)
  if (failedEvents.length > 0) {
    redirect('/')
  }

  const validEvents = events
    .filter((result) => !result.error)
    .map((result) => result.data)
    .filter((event): event is EventDetail => Boolean(event))

  return (
    <>
      <FormLayoutHeader>
        <FormLayoutTitle>Mesclar eventos</FormLayoutTitle>
        <Button type="submit" form="merge-form">
          Finalizar mesclagem
        </Button>
      </FormLayoutHeader>
      <FormLayoutContent spacing={false} size="full">
        <MergeEventForm events={validEvents} />
      </FormLayoutContent>
    </>
  )
}
