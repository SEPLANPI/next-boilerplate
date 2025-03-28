import { clientApi } from '@/lib/client-api'
import { Button, Group, Select, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Axis, Proposal } from '../types'

interface ProposalsFormValues {
  id?: string
  eixo_id?: number
  status?:
    | 'PENDENTE'
    | 'APROVADA'
    | 'REPROVADO'
    | 'REJEITADA'
    | 'EM_VOTACAO'
    | 'CANCELADA'
  titulo: string
  conteudo: string
}

interface ProposalsFormProps {
  onClose: () => void
  edit?: boolean
  items?: Proposal
}

export default function ProposalsForm({
  onClose,
  edit,
  items
}: ProposalsFormProps) {
  const router = useRouter()
  const [eixos, setEixos] = useState<Axis[]>([])
  const [loading, setLoading] = useState(false)
  const form = useForm<ProposalsFormValues>({
    initialValues: {
      id: items?.id || '',
      titulo: items?.titulo || '',
      conteudo: items?.conteudo || '',
      eixo_id: edit ? items?.eixo.id : 0, 
      status: items?.status || 'PENDENTE'
    },
    validate: {
      eixo_id: (value) => {
        if (!edit && (!value || value === 0)) {
          return 'Selecione um eixo'
        }
        return null
      },
      titulo: (value) => {
        return value.length < 5 ? 'Título deve ter no mínimo 5 caracteres' : null
      },
      conteudo: (value) => {
        return value.length < 5 ? 'Descrição deve ter no mínimo 5 caracteres' : null
      }
    }
  })

  const handleSubmit = async (values: ProposalsFormValues) => {
    setLoading(true)
    let response = null
    if (edit) {
      response = await clientApi.put(
        `/propostas/${values.id}/atualizar-admin/`,
        {
          body: values
        }
      )
    } else {
      response = await clientApi.post('/criar-proposta-admin/', {
        body: values
      })
    }
    if (response.ok) {
      notifications.show({
        title: 'Proposta enviada',
        message: `Sua proposta foi ${edit ? 'editada' : 'enviada'} com sucesso`
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clientApi.get('/eixos/')
        if (response.ok) {
          const data = await response.json()
          setEixos(data)
        } else {
          notifications.show({
            title: 'Erro',
            message: 'Não foi possível carregar os eixos'
          })
        }
      } catch (error) {
        console.error('Erro na requisição:', error)
        notifications.show({
          title: 'Erro',
          message: 'Ocorreu um erro ao buscar eixos'
        })
      }
    }

    fetchData()
  }, [])

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col gap-4"
    >
      {!edit && (
        <Select
          withAsterisk
          allowDeselect={false}
          label="Eixo"
          data={eixos.map((eixo) => ({
            value: String(eixo.id),
            label: eixo.nome
          }))}
          placeholder="Selecione o Eixo referente à Proposta"
          key={form.key('eixo_id')}
          {...form.getInputProps('eixo_id')}
        />
      )}
      <TextInput
        withAsterisk
        label="Título"
        placeholder="Dê um titulo a sua proposta"
        key={form.key('titulo')}
        {...form.getInputProps('titulo')}
      />
      {edit && (
        <Select
          label="Status"
          allowDeselect={false}
          data={[
            { value: 'APROVADA', label: 'Aprovada' },
            { value: 'REJEITADA', label: 'Rejeitada' },
            { value: 'EM_VOTACAO', label: 'Em votação' },
            { value: 'CANCELADA', label: 'Cancelada' },
            { value: 'PENDENTE', label: 'Pendente' }
          ]}
          key={form.key('status')}
          {...form.getInputProps('status')}
        />
      )}

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
      <Group className="justify-end pt-3">
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
