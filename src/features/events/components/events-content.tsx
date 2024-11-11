import { EventsEmptyState } from '@/features/events/components/empty-state'
import { EventsTable } from './events-table'
import { Alert } from '@mantine/core'
import { getEvents } from '../actions/get-events'

export async function EventsContent() {
  const { data, error } = await getEvents()
  if (!data || error) {
    return (
      <Alert
        title="Erro inesperado"
        variant="outline"
        color="red"
        className="max-w-xl"
      >
        Ocorreu um erro inesperado ao buscar dados no servidor.
      </Alert>
    )
  }

  if (data.results.length === 0) return <EventsEmptyState />

  return <EventsTable events={data.results} count={data.count} />
}
