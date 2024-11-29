import { api } from '@/lib/server-api'

import {
  Alert,
  Anchor,
  Breadcrumbs,
  Table,
  TableTr,
  TableTh,
  TableTd,
  TableThead,
  TableTbody,
  Paper,
  Divider,
  Badge,
  Tooltip,
  Rating,
  ActionIcon
} from '@mantine/core'
import { ArrowLeft, ChevronRight, Info } from 'lucide-react'
import Link from 'next/link'
import {
  DataListRoot,
  DataListItem,
  DataListLabel,
  DataListValue
} from '@/components/ui/data-list'
import BackButton from '@/components/ui/back-button'

type EventDetailProps = {
  params: {
    id: number
  }
}

type Event = {
  id: number
  nome: string
  data: string
  local: string | null
  valor: number
  descricao: string | null
  objetivo: string | null
  municipio: string | null
  avalia: string | null
  publico: string | null
  contratos: Contract[]
  ugs: AdministrativeUnit[]
}

type Contract = {
  numero_contrato: number
  contratados: Contractor[]
  eventos: string[]
  titulo: string
  valor: number
  valor_total: number
  status: 'STATUS_ASSINADO' | 'STATUS_CADASTRADO'
  situacao: 'A_CONTRATAR' | 'EM_VIGOR' | 'ENCERRADO' | 'LICITADO' | 'LICITADO_E'
  autor_emenda: string | null
  ug: number
}

type Contractor = {
  cnpj: string
  descricao_servico: string
  nome_da_empresa: string
}

type AdministrativeUnit = {
  name: string
  sigla: string
}

export default async function EventDetail({
  params: { id }
}: EventDetailProps) {
  const response = await api.get(`/eventos/${id}`)

  if (!response.ok) {
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

  const event: Event = await response.json()
  const ug = event.ugs[0]
  return (
    <div className="container mx-auto">
      <div className="mb-4 flex items-center space-x-3">
        <BackButton />
        <Breadcrumbs>
          <Anchor component={Link} href="/">
            Eventos
          </Anchor>
        </Breadcrumbs>
      </div>
      <h1 className="mb-2 text-2xl font-semibold">{event.nome}</h1>
      <p className="max-w-[75ch] text-sm text-secondary-foreground">
        {event.objetivo}
      </p>
      <div className="mt-4 flex space-x-32">
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Data</DataListLabel>
            <DataListValue>{event.data || ''}</DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Município</DataListLabel>
            <DataListValue>{event.municipio || 'Não informado'}</DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Valor</DataListLabel>
            <DataListValue className="font-bold">
              R${' '}
              {parseFloat(event.valor.toString()).toLocaleString('pt-BR', {
                minimumFractionDigits: 2
              })}
            </DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Endereço</DataListLabel>
            <DataListValue>{event.local || 'Não informado'}</DataListValue>
          </DataListItem>
        </DataListRoot>
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Público</DataListLabel>
            <DataListValue>Não informado</DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Avaliação</DataListLabel>
            <DataListValue>
              <Rating value={5} readOnly />
            </DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Categoria</DataListLabel>
            <DataListValue>Não informado</DataListValue>
          </DataListItem>
        </DataListRoot>
      </div>
      <Divider className="my-4" />
      <h2 className="mb-4 mt-6 text-lg font-semibold">Contratos</h2>
      <Paper withBorder>
        <Table verticalSpacing="xs">
          <TableThead>
            <TableTr>
              <TableTh>Contratado</TableTh>
              <TableTh>Valor</TableTh>
              <TableTh>Autor</TableTh>
              <TableTh>Situação</TableTh>
              <TableTh>Unidade Gestora</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            {event.contratos.map((contract) => (
              <TableTr key={contract.numero_contrato}>
                {contract.contratados.map((contractor) => (
                  <TableTd key={contractor.cnpj} className="max-w-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">
                          {contractor.nome_da_empresa}
                        </span>
                        <Badge
                          radius="sm"
                          variant="light"
                          color={
                            contract.status === 'STATUS_ASSINADO'
                              ? 'teal'
                              : 'gray'
                          }
                        >
                          {contract.status === 'STATUS_ASSINADO'
                            ? 'Assinado'
                            : 'Cadastrado'}
                        </Badge>
                      </div>
                      <div className="text-sm text-secondary-foreground">
                        {contract.titulo}
                      </div>
                    </div>
                  </TableTd>
                ))}
                <TableTd className="font-bold">
                  R${' '}
                  {parseFloat(contract.valor_total.toString()).toLocaleString(
                    'pt-BR',
                    { minimumFractionDigits: 2 }
                  )}
                </TableTd>
                <TableTd>
                  {contract.autor_emenda === 'SEM AUTOR'
                    ? 'Governo do Estado'
                    : contract.autor_emenda}
                </TableTd>
                <TableTd>{contract.situacao}</TableTd>
                <TableTd>
                  <Tooltip
                    key={ug.sigla}
                    label={ug.name}
                    openDelay={200}
                    w={300}
                    multiline
                  >
                    <div className="flex cursor-pointer items-center space-x-2">
                      <Info className="size-4 text-muted-foreground" />
                      <span>{ug.sigla}</span>
                    </div>
                  </Tooltip>
                </TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </Table>
      </Paper>
    </div>
  )
}
