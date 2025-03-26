import { clientApi } from '@/lib/client-api'
import { Box, Button, Group, Text, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PropostasData } from '../../api/get-minhasPropostas'

interface ProposalsFormValues {
  id?: string
  titulo: string
  conteudo: string
}

interface ProposalsFormProps {
  onClose: () => void
  edit?: boolean
  items?: PropostasData
}

export default function ProposalsForm({
  onClose,
  edit,
  items
}: ProposalsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const form = useForm<ProposalsFormValues>({
    initialValues: {
      id: items?.id || '',
      titulo: items?.titulo || '',
      conteudo: items?.conteudo || ''
    },
    validate: {
      titulo: (value) =>
        value.length < 5 && 'Título deve ter no mínimo 5 caracteres',
      conteudo: (value) =>
        value.length < 5 && 'Descrição deve ter no mínimo 5 caracteres'
    }
  })

  const handleSubmit = async (values: ProposalsFormValues) => {
    setLoading(true)
    let response = null
    if (edit) {
      response = await clientApi.put(`/propostas/${values.id}/atualizar_conselheiro/`, {
        body: values
      })
    } else {
      response = await clientApi.post('/criar-proposta-conselheiro/', {
        body: values
      })
    }
    if (response.ok) {
      notifications.show({
        title: 'Proposta enviada',
        message: 'Sua proposta foi enviada com sucesso'
      })
      router.refresh()
      onClose()
    } else {
      setLoading(false)
      notifications.show({
        title: 'Erro ao enviar proposta',
        message: `Houve um erro ao enviar a proposta, tente novamente`
      })
    }
  }

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
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
        autosize
        minRows={3}
        maxRows={6}
        placeholder="Conte-nos um pouco sobre a sua proposta"
        key={form.key('conteudo')}
        {...form.getInputProps('conteudo')}
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
        <Button type="submit" loading={loading}>Salvar</Button>
      </Group>
    </form>
  )
}
