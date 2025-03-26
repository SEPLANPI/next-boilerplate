import { FetchError } from '@/components/errors/fetch-error'
import {
  DadosResponse,
  getMeusDados
} from '@/features/counselors/api/get-meusDados'
import DownloadButtons from '@/features/counselors/components/download-buttons'
import { dayjs } from '@/lib/dayjs'
import { Box, Card, Grid, GridCol, Text } from '@mantine/core'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dados'
}

export default async function Dados() {
  const { data: myData, error: error } = await getMeusDados()
  if (error) {
    return <FetchError error={error} />
  }

  if (!myData) {
    return <FetchError error="No data" />
  }

  return (
    <Card
      className="p-5"
      withBorder
      radius={24}
      shadow="sm"
      style={{ borderColor: '#e5e7eb' }} // Alterando a cor da borda para azul
    >
      <Grid>
        <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
          {personalSection(myData)}
        </GridCol>
        <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
          {adressSection(myData)}
        </GridCol>
        <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
          {councilSection(myData)}
        </GridCol>
        <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
          {eventSection(myData)}
        </GridCol>
        {!myData.poder_publico && (
          <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
            {bankInfoSection(myData)}
          </GridCol>
        )}
        {myData.documentos && (
          <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
            {docsSection(myData)}
          </GridCol>
        )}
      </Grid>
    </Card>
  )
}

function docsSection(docsData: DadosResponse) {
  return (
    <>
      <SectionHeader title="Documentos" />
      <Grid className="px-4">
        {docsData.documentos.map((doc) => (
          <>
            <GridCol className="p-2" span={12}>
              <Text
                fw={600}
                size="sm"
                className="pb-1 text-gray-600"
                key={doc.id}
              >
                {getDocType(doc.tipo_documento)}
              </Text>
              <div className="flex gap-2">
                <Box className="min-h-12 min-w-16 rounded-sm bg-gray-100" />
                <div className="w-full items-center overflow-hidden text-ellipsis whitespace-nowrap pt-1">
                  <Text size="sm" truncate>
                    {doc.arquivo.nome}
                  </Text>
                  <Text size="xs" className="text-gray-500">
                    {dayjs(doc.criado_em).format('DD/MM/YYYY')}
                  </Text>
                </div>
                <DownloadButtons {...doc} />
              </div>
            </GridCol>
          </>
        ))}
      </Grid>
    </>
  )
}

function bankInfoSection(bankData: DadosResponse) {
  return (
    <>
      <SectionHeader title="Dados Bancários" />
      <div className="px-4">
        <Grid className="flex">
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">Banco</span>
              <Text size="sm" truncate lineClamp={2}>
                {bankData.dados_bancarios.banco.nome}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Número
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {bankData.dados_bancarios.banco.codigo}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Agência
              </span>
              <Text size="sm" truncate>
                {bankData.dados_bancarios.agencia}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Conta Corrente
              </span>
              <Text size="sm" truncate>
                {bankData.dados_bancarios.conta}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                CPF do Titular da Conta
              </span>
              <Text size="sm" truncate>
                {bankData.dados_bancarios.cpf_titular}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Nome do titular
              </span>
              <Text size="sm" truncate>
                {bankData.dados_bancarios.nome_titular}
              </Text>
            </div>
          </GridCol>
        </Grid>
      </div>
    </>
  )
}

function eventSection(eventData: DadosResponse) {
  return (
    <>
      <SectionHeader title="Evento" />
      <div className="px-4">
        <Grid className="flex">
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Eixo de participação
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {eventData.inscricoes[0].evento.nome || 'Não informado'}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Data do evento
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {eventData.inscricoes[0].evento.data_evento || 'Não informado'}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Localização
              </span>
              <Text size="sm" truncate>
                {eventData.inscricoes[0].evento.municipio.nome ||
                  'Não informado'}
              </Text>
            </div>
          </GridCol>
        </Grid>
      </div>
    </>
  )
}

function councilSection(councilData: DadosResponse) {
  return (
    <>
      <SectionHeader title="Conselho" />
      <div className="px-4">
        <Grid className="flex">
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Representante de qual Conselho?
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {councilData.conselho.nome}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Representação no conselho
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {councilData.poder_publico
                  ? 'Poder Público'
                  : 'Sociedade Civil'}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Composição no conselho
              </span>
              <Text size="sm" truncate>
                {councilData.tipo_membro}
              </Text>
            </div>
          </GridCol>
        </Grid>
      </div>
    </>
  )
}

function adressSection(adressData: DadosResponse) {
  return (
    <>
      <SectionHeader title="Localização" />
      <div className="px-4">
        <Grid className="flex">
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Rua/Avenida
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {adressData.endereco.logradouro}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Número
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {adressData.endereco.numero}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Bairro
              </span>
              <Text size="sm" truncate>
                {adressData.endereco.bairro}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <span className="text-sm font-semibold text-gray-600">CEP</span>
            <Text size="sm" truncate lineClamp={2}>
              {adressData.endereco.cep.replace(/(\d{5})(\d{3})/, '$1-$2')}
            </Text>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Cidade
              </span>
              <Text size="sm" truncate>
                {adressData.endereco.municipio.nome}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <span className="text-sm font-semibold text-gray-600">
              Complemento
            </span>
            <Text size="sm" truncate lineClamp={2}>
              {adressData.endereco.complemento || 'Não informado'}
            </Text>
          </GridCol>
        </Grid>
      </div>
    </>
  )
}

function personalSection(personalData: DadosResponse) {
  return (
    <>
      <SectionHeader title="Dados Pessoais" />
      <div className="px-4">
        <Grid className="flex">
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">Nome</span>
              <Text size="sm" truncate lineClamp={2}>
                {personalData.nome}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Data de Nascimento
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {dayjs(personalData.data_nascimento).format('DD/MM/YYYY')}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                R.G (Registro Geral)
              </span>
              <Text size="sm" truncate>
                {personalData.rg}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <span className="text-sm font-semibold text-gray-600">CPF</span>
            <Text size="sm" truncate lineClamp={2}>
              {personalData.cpf.replace(
                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                '$1.$2.$3-$4'
              )}
            </Text>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">Email</span>
              <Text size="sm" truncate>
                {personalData.email}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <span className="text-sm font-semibold text-gray-600">
              Telefone
            </span>
            <Text size="sm" truncate lineClamp={2}>
              {personalData.telefone.replace(
                /(\d{2})(\d{5})(\d{4})/,
                '($1) $2-$3'
              )}
            </Text>
          </GridCol>
        </Grid>
      </div>
    </>
  )
}

function getDocType(docType: string) {
  switch (docType) {
    case 'COMPROVANTE_CONSELHO':
      return 'Documento que comprove pariticipação no conselho'
    case 'COMPROVANTE_RESIDENCIA':
      return 'Comprovante de Residência'
    case 'RG_VERSO':
      return 'RG - Verso'
    case 'RG_FRENTE':
      return 'RG - Frente'
    default:
      return 'Desconhecido'
  }
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 flex flex-row items-center justify-between gap-2 rounded-sm bg-gray-100 px-3 py-2">
      <div>
        <h2 className="text-sm font-bold text-gray-600">{title}</h2>
      </div>
      {/* <div>
        <Pencil size={16} />
      </div> */}
    </div>
  )
}
