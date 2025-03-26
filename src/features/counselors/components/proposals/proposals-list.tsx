'use client'
import { Badge, Modal, Table } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { Info } from 'lucide-react'
import { useState } from 'react'
import { PropostasData } from '../../api/get-minhasPropostas'
import ProposalsForm from './proposals-form'

interface PropostasListProps {
  propostas: PropostasData[]
}

function getStatusBadge(value: string) {
  switch (value) {
    case 'APROVADA':
      return (
        <Badge variant="light" size="sm" color="green">
          Aprovada
        </Badge>
      )
    case 'PENDENTE':
      return (
        <Badge variant="light" size="sm" color="orange">
          Pendente
        </Badge>
      )
    case 'REPROVADA':
      return (
        <Badge variant="light" size="sm" color="red">
          Reprovada
        </Badge>
      )
  }
}

export default function ProposalsList({ propostas }: PropostasListProps) {
  const [opened, { open, close }] = useDisclosure(false)
  const [items, setItems] = useState<PropostasData>()

  const handleRowClick = (proposta: PropostasData) => {
    if (proposta.status !== 'APROVADA' || 'REJEITADA') {
      setItems(proposta)
      open()
    } else {
      notifications.show({
        title: 'Não é possível editar',
        message: 'Você não pode editar uma proposta que já foi aprovada'
      })
    }
  }

  return (
    <>
      <Table highlightOnHover mt={24} className="rounded-md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Título</Table.Th>
            <Table.Th>Descrição</Table.Th>
            <Table.Th className="flex items-center gap-1">
              Status <Info size={12} />
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {propostas.map((proposta, index) => (
            <Table.Tr
              key={index}
              onClick={() => handleRowClick(proposta)}
              className="cursor-pointer"
            >
              <Table.Td w="50%">{proposta.titulo}</Table.Td>
              <Table.Td w="40%">{proposta.conteudo}</Table.Td>
              <Table.Td w="10%">{getStatusBadge(proposta.status)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Modal
        title="Editar proposta"
        size="md"
        onClose={close}
        opened={opened}
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
          body: {
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingBottom: '24px'
          }
        }}
      >
        <ProposalsForm onClose={close} edit={true} items={items} />
      </Modal>
    </>
  )
}
