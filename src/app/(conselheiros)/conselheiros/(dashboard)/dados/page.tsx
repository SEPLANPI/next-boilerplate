import { Card, Grid, GridCol, Text } from '@mantine/core'
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

  return (
    <Card className="p-6" withBorder radius={24}>
      <Grid className="gap-6">
        <GridCol span={{ lg: 4, sm: 12 }}>
          {personalSection(personalData)}
        </GridCol>
        <GridCol span={{ lg: 4, sm: 12 }}>{adressSection(addressData)}</GridCol>
        <GridCol span={{ lg: 4, sm: 12 }}>
          {councilSection(councilData)}
        </GridCol>
      </Grid>
    </Card>
  )
}

function councilSection(councilData: CouncilData) {
  return (
    <>
      <div className="mb-4 flex flex-row items-center justify-between gap-2 rounded-md bg-gray-100 px-3 py-2">
        <div>
          <h2 className="text-sm font-bold text-secondary-foreground">
            Conselho
          </h2>
        </div>
        <div>
          <Pencil size={16} />
        </div>
      </div>
      <div className="px-4">
        <Grid className="flex">
          <GridCol span={12}>
            <div className="mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-secondary-foreground">
                Representante de qual Conselho?
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {councilData.representing}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-secondary-foreground">
                Representação no conselho
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {councilData.representation}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-secondary-foreground">
                Composição no conselho
              </span>
              <Text size="sm" className="mb-4" truncate>
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
      <div className="mb-4 flex flex-row items-center justify-between gap-2 rounded-md bg-gray-100 px-3 py-2">
        <div>
          <h2 className="text-sm font-bold text-secondary-foreground">
            Localização
          </h2>
        </div>
        <div>
          <Pencil size={16} />
        </div>
      </div>
      <div className="px-4">
        <Grid className="flex">
          <GridCol span={6}>
            <div className="mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-secondary-foreground">
                Rua/Avenida
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {adressData.street}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-secondary-foreground">
                Número
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {adressData.number}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-secondary-foreground">
                Bairro
              </span>
              <Text size="sm" className="mb-4" truncate>
                {adressData.neighborhood}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <span className="text-sm font-semibold text-secondary-foreground">
              CEP
            </span>
            <Text size="sm" className="mb-4" truncate lineClamp={2}>
              {adressData.zipCode}
            </Text>
          </GridCol>
          <GridCol span={12}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-secondary-foreground">
                Cidade
              </span>
              <Text size="sm" className="mb-4" truncate>
                {adressData.city}
              </Text>
            </div>
          </GridCol>
          <GridCol span={12}>
            <span className="text-sm font-semibold text-secondary-foreground">
              Complemento
            </span>
            <Text size="sm" className="mb-4" truncate lineClamp={2}>
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
      <div className="mb-4 flex flex-row items-center justify-between gap-2 rounded-md bg-gray-100 px-3 py-2">
        <div>
          <h2 className="text-sm font-bold text-secondary-foreground">
            Dados Pessoais
          </h2>
        </div>
        <div>
          <Pencil size={16} />
        </div>
      </div>
      <div className="px-4">
        <Grid className="flex">
          <GridCol span={6}>
            <div className="mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-secondary-foreground">
                Nome
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {personalData.name}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-secondary-foreground">
                Data de Nascimento
              </span>
              <Text size="sm" truncate lineClamp={2}>
                {personalData.birthdate}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-secondary-foreground">
                R.G (Registro Geral)
              </span>
              <Text size="sm" className="mb-4" truncate>
                {personalData.rg}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <span className="text-sm font-semibold text-secondary-foreground">
              CPF
            </span>
            <Text size="sm" className="mb-4" truncate lineClamp={2}>
              {personalData.cpf}
            </Text>
          </GridCol>
          <GridCol span={6}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm font-semibold text-secondary-foreground">
                Email
              </span>
              <Text size="sm" className="mb-4" truncate>
                {personalData.email}
              </Text>
            </div>
          </GridCol>
          <GridCol span={6}>
            <span className="text-sm font-semibold text-secondary-foreground">
              Telefone
            </span>
            <Text size="sm" className="mb-4" truncate lineClamp={2}>
              {personalData.phone}
            </Text>
          </GridCol>
        </Grid>
      </div>
    </>
  )
}
