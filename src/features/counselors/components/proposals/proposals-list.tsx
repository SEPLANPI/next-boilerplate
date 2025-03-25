'use client'
import { Propostas } from '@/app/(conselheiros)/conselheiros/(dashboard)/propostas/page'
import { Badge, Table } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Info } from 'lucide-react'

interface PropostasListProps {
  propostas: Propostas[]
}

function getStatusBadge(value: string) {
  switch (value) {
    case 'Aprovada':
      return <Badge variant='light' size='sm' color="green">Aprovada</Badge>
    case 'Pendente':
      return <Badge variant='light' size='sm' color="orange">Pendente</Badge>
    case 'Reprovada':
      return <Badge variant='light' size='sm' color="red">Reprovada</Badge>
  }
}

export default function ProposalsList({ propostas }: PropostasListProps) {
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
      <Table.Tbody >
        {propostas.map((proposta, index) => (
          <Table.Tr key={index}>
            <Table.Td w='50%'>{proposta.titulo}</Table.Td>
            <Table.Td w='40%'>{proposta.descricao}</Table.Td>
            <Table.Td w='10%'>{getStatusBadge(proposta.status)}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
