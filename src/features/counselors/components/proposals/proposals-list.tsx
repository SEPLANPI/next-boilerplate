'use client'
import { Badge, Box, Modal, Table, Text } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
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
        <Badge variant="light" size="sm" color="green" radius="xs">
          Aprovada
        </Badge>
      )
    case 'PENDENTE':
      return (
        <Badge variant="light" size="sm" color="amber" radius="xs">
          Pendente
        </Badge>
      )
    case 'REPROVADA':
      return (
        <Badge variant="light" size="sm" color="red" radius="xs">
          Reprovada
        </Badge>
      )
  }
}

export default function ProposalsList({ propostas }: PropostasListProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
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
      {isMobile ? (
        <ProposalMobileList
          propostas={propostas}
          handleRowClick={handleRowClick}
        />
      ) : (
        <ProposalTable propostas={propostas} handleRowClick={handleRowClick} />
      )}

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

function ProposalMobileList({
  propostas,
  handleRowClick
}: {
  propostas: PropostasData[]
  handleRowClick: (proposta: PropostasData) => void
}) {
  return (
    <>
      <div className="mt-6 flex flex-col gap-6">
        {propostas.map((proposta, index) => (
          <Box
            className="flex w-full flex-col gap-[7px] rounded-md border p-4"
            key={index}
            onClick={() => handleRowClick(proposta)}
          >
            <Text size="sm" w={600}>
              {getStatusBadge(proposta.status)}
            </Text>
            <Text
              size="sm"
              fw={800}
              lineClamp={1}
              truncate
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {proposta.titulo}
            </Text>
            <Text
              size="sm"
              c="gray"
              lineClamp={1}
              truncate
              style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {proposta.conteudo}
            </Text>
          </Box>
        ))}
      </div>
    </>
  )
}

function ProposalTable({
  propostas,
  handleRowClick
}: {
  propostas: PropostasData[]
  handleRowClick: (proposta: PropostasData) => void
}) {
  return (
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
            <Table.Td w="50%" className="w-full overflow-hidden text-ellipsis">
              <Text size="sm" truncate style={{ maxWidth: '400px' }}>
                {proposta.titulo}
              </Text>
            </Table.Td>
            <Table.Td w="40%">
              <Text
                size="sm"
                truncate
                style={{
                  maxWidth: '400px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {proposta.conteudo}
              </Text>
            </Table.Td>
            <Table.Td w="10%">{getStatusBadge(proposta.status)}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
