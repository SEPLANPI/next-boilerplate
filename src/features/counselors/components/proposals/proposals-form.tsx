import { Box, Button, Group, Text, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Info } from 'lucide-react'

export default function ProposalsForm() {
  const form = useForm({
    initialValues: {
      titulo: '',
      descricao: ''
    },
    validate: {
      titulo: (value) =>
        value.length < 3 && 'Título deve ter no mínimo 5 caracteres',
      descricao: (value) =>
        value.length < 5 && 'Descrição deve ter no mínimo 5 caracteres'
    }
  })

  return (
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
      className="flex flex-col gap-4"
    >
      <TextInput
        withAsterisk
        label="Título"
        placeholder="Dê um titulo a sua proposta"
        key={form.key('titulo')}
        {...form.getInputProps('titulo')}
      />
      <Textarea
        withAsterisk
        label="Descrição"
        placeholder="Conte-nos um pouco sobre a sua proposta"
        key={form.key('descricao')}
        {...form.getInputProps('descricao')}
      />
      <Box className="flex gap-[6px] rounded-sm bg-yellow-200 px-4 py-3">
        <div>
          <Info size={16} />
        </div>
        <Text size="xs">
          As propostas serão avaliadas, apenas as propostas aprovadas estarão
          disponíveis para votação
        </Text>
      </Box>
      <Group className="justify-end">
        <Button type="submit">Salvar</Button>
      </Group>
    </form>
  )
}
