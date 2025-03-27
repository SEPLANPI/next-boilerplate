import { clientApi } from '@/lib/client-api'
import { Button, Group, Select, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Proposal } from '../types'

interface ProposalsFormValues {
  id?: string
  titulo: string
  conteudo: string
}

interface ProposalsFormProps {
  onClose: () => void
  edit?: boolean
  items?: Proposal
}

type Axis = {
    id: number
    nome: string
    descricao: string
    criado_em: string
    limite_inscricoes: number
    total_inscricoes: number
    vagas_restantes: number
    vagas_disponiveis: true
}

export default function ProposalsForm({
  onClose,
  edit,
  items
}: ProposalsFormProps) {
  const router = useRouter()
  const [eixos, setEixos] = useState<Axis[]>()
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clientApi.get('/api/v1/eixos/')
        if (response.ok) {
          const data = await response.json()
          setEixos(data) // Salva os dados no estado
        } else {
          console.error('Erro ao buscar os dados')
        }
      } catch (error) {
        console.error('Erro na requisição:', error)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (values: ProposalsFormValues) => {
    setLoading(true)
    let response = null
    if (edit) {
      response = await clientApi.put(
        `/propostas/${values.id}/atualizar_conselheiro/`,
        {
          body: values
        }
      )
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
      <Select
        withAsterisk
        label="Eixo"
        data={eixos.map((eixo) => ({
          value: eixo.id,
          label: eixo.nome
        }))}
        placeholder="Selecione o Eixo referente à Proposta"
      />
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
      <Group className="justify-end">
        <Button onClick={onClose} variant="light">
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>
          Salvar
        </Button>
      </Group>
    </form>
  )
}
