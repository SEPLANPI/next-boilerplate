import { Box, Card, Grid, GridCol, Text } from '@mantine/core'
import { Pencil } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dados'
}

interface PersonalData {
  name: string
  birthdate: string
  rg: string
  cpf: string
  email: string
  phone: string
}

interface AddressData {
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  zipCode: string
}

interface CouncilData {
  representing: string
  representation: string
  composition: string
}

interface EventData {
  axis: string
  date: string
  localization: string
}

interface BankData {
  bank: string
  number: string
  agency: string
  account: string
  cpf: string
  name: string
}

interface DocsData {
  type:
    | 'Foto do RG'
    | 'Foto do CPF'
    | 'Comprovante de Residência'
    | 'Comprovante que comprove participação no Conselho'
    | 'Comprovante bancário'
  title: string
  date: string
}

export default function Dados() {
  const personalData: PersonalData = {
    name: 'Neemias Calebe',
    birthdate: '01/01/2000',
    rg: '000.000.000.1',
    cpf: '000.000.000.-00',
    email: 'mail@mail.com',
    phone: '(86) 4002-8922'
  }

  const addressData: AddressData = {
    street: 'Rua 15',
    number: '3162',
    complement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    neighborhood: 'Bairro 1',
    city: 'Teresina',
    zipCode: '00000-000'
  }

  const councilData: CouncilData = {
    representing: 'Vale do Sambito',
    representation: 'Sociedade civil',
    composition: 'Member'
  }

  const eventData: EventData = {
    axis: 'Infraestrutura',
    date: '01/01/2022',
    localization: 'Teresina'
  }

  const bankData: BankData = {
    bank: 'Banco do Brasil',
    number: '0000-0',
    agency: '0000-0',
    account: '000000-0',
    cpf: '00000000000',
    name: 'Neemias Calebe'
  }

  const docsData: DocsData[] = [
    {
      type: 'Foto do RG',
      title: 'rg.pdf',
      date: '01/01/2022'
    },
    {
      type: 'Foto do CPF',
      title: 'cpf.jpg',
      date: '01/01/2022'
    },
    {
      type: 'Comprovante de Residência',
      title: 'comp-res.jpg',
      date: '01/01/2022'
    },
    {
      type: 'Comprovante que comprove participação no Conselho',
      title: 'conselho-comp.jpg',
      date: '01/01/2022'
    },
    {
      type: 'Comprovante bancário',
      title: 'extrato.jpg',
      date: '01/01/2022'
    }
  ]

  return (
    <Card className="p-5" withBorder radius={24} shadow='sm'>
      <Grid>
        <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
          {personalSection(personalData)}
        </GridCol>
        <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
          {adressSection(addressData)}
        </GridCol>
        <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
          {councilSection(councilData)}
        </GridCol>
        <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
          {eventSection(eventData)}
        </GridCol>
        <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
          {bankInfoSection(bankData)}
        </GridCol>
        <GridCol span={{ lg: 4, sm: 12 }} className="p-3">
          {docsSection(docsData)}
        </GridCol>
      </Grid>
    </Card>
  )
}

function docsSection(docsData: DocsData[]) {
  return (
    <>
      <SectionHeader title="Documentos" />
      <Grid className="px-4">
        {docsData.map((doc) => (
          <>
            <GridCol className="p-2" span={12}>
              <Text
                fw={600}
                size="sm"
                className="pb-1 text-gray-600"
                key={doc.type}
              >
                {doc.type}
              </Text>
              <div className="flex gap-2">
                <Box className="h-12 w-16 rounded-sm bg-gray-100" />
                <div className="pt-1 items-center">
                  <Text size="sm">{doc.title}</Text>
                  <Text size="xs" className="text-gray-500">
                    {doc.date}
                  </Text>
                </div>
              </div>
            </GridCol>
          </>
        ))}
      </Grid>
    </>
  )
}

function bankInfoSection(bankData: BankData) {
  return (
    <>
      <SectionHeader title="Dados Bancários" />
      <div className="px-4">
        <Grid className="flex">
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">Banco</span>
              <Text size="sm" truncate lineClamp={2}>
                {bankData.bank}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Número
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {bankData.number}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Agência
              </span>
              <Text size="sm" truncate>
                {bankData.agency}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Conta Corrente
              </span>
              <Text size="sm" truncate>
                {bankData.account}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                CPF do Titular da Conta
              </span>
              <Text size="sm" truncate>
                {bankData.cpf}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Nome do titular
              </span>
              <Text size="sm" truncate>
                {bankData.name}
              </Text>
            </div>
          </GridCol>
        </Grid>
      </div>
    </>
  )
}

function eventSection(eventData: EventData) {
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
                {eventData.axis}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Data do evento
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {eventData.date}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Localização
              </span>
              <Text size="sm" truncate>
                {eventData.localization}
              </Text>
            </div>
          </GridCol>
        </Grid>
      </div>
    </>
  )
}

function councilSection(councilData: CouncilData) {
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
                {councilData.representing}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Representação no conselho
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {councilData.representation}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Composição no conselho
              </span>
              <Text size="sm" truncate>
                {councilData.composition}
              </Text>
            </div>
          </GridCol>
        </Grid>
      </div>
    </>
  )
}

function adressSection(adressData: AddressData) {
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
                {adressData.street}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Número
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {adressData.number}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Bairro
              </span>
              <Text size="sm" truncate>
                {adressData.neighborhood}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <span className="text-sm font-semibold text-gray-600">CEP</span>
            <Text size="sm" truncate lineClamp={2}>
              {adressData.zipCode}
            </Text>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Cidade
              </span>
              <Text size="sm" truncate>
                {adressData.city}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <span className="text-sm font-semibold text-gray-600">
              Complemento
            </span>
            <Text size="sm" truncate lineClamp={2}>
              {adressData.complement}
            </Text>
          </GridCol>
        </Grid>
      </div>
    </>
  )
}

function personalSection(personalData: PersonalData) {
  return (
    <>
      <SectionHeader title="Dados Pessoais" />
      <div className="px-4">
        <Grid className="flex">
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">Nome</span>
              <Text size="sm" truncate lineClamp={2}>
                {personalData.name}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-600">
                Data de Nascimento
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {personalData.birthdate}
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
              {personalData.cpf}
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
              {personalData.phone}
            </Text>
          </GridCol>
        </Grid>
      </div>
    </>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 flex flex-row items-center justify-between gap-2 rounded-sm bg-gray-100 px-3 py-2">
      <div>
        <h2 className="text-sm font-bold text-gray-600">{title}</h2>
      </div>
      <div>
        <Pencil size={16} />
      </div>
    </div>
  )
}
