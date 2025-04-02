import { Modal, Text } from '@mantine/core'
import dayjs from 'dayjs'
import { Log } from '../types'

interface ProposalDetailsModalProps {
  opened: boolean
  onClose: () => void
  log: Log
}

export default function ProposalDetailsModal({
  opened,
  onClose,
  log
}: ProposalDetailsModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={() => onClose()}
      title="Registro de alteração"
      size={'xl'}
      styles={{
        header: {
          paddingLeft: '24px',
          paddingRight: '24px'
        },
        title: {
          fontWeight: 600,
          fontSize: '14px',
          fontStyle: 'normal'
        },
        body: { paddingLeft: '24px', paddingRight: '24px' }
      }}
    >
      <div className="flex flex-col gap-4">
        <div>
          <Text variant="h1" fw={800} size="xl">
            {log.dados_antigos.titulo}
          </Text>
          <Text variant="h2" size="xs" className="text-gray-400">
            Alterado em {dayjs(log.criado_em).format(`DD/MM/YYYY [às] HH:mm`)}{' '}
            por {log.alterado_por === 'admin' ? 'Administrador' : 'Conselheiro'}
          </Text>
        </div>
        <Text
          size="md"
          className="block w-full whitespace-break-spaces font-sans text-gray-500"
          component="pre"
        >
          {log.dados_antigos.conteudo || 'Sem conteúdo'}
        </Text>
      </div>
    </Modal>
  )
}
