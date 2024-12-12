import {
  FormLayoutContent,
  FormLayoutHeader,
  FormLayoutTitle
} from '@/components/layouts/form-layout'
import { EventForm } from '@/features/events/components/event-form'
import { Button } from '@mantine/core'

export default function EditEvent({
  params: { id }
}: {
  params: { id: string }
}) {
  return (
    <>
      <FormLayoutHeader>
        <FormLayoutTitle>Editar Evento</FormLayoutTitle>
        <Button>Salvar</Button>
      </FormLayoutHeader>
      <FormLayoutContent>
        <EventForm />
      </FormLayoutContent>
    </>
  )
}
