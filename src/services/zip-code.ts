export interface ZipCodeInfo {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export const getZipCodeInfo = async (zipCode: string): Promise<ZipCodeInfo> => {
  const cleanedZip = zipCode.replace(/\D/g, '')

  if (cleanedZip.length !== 8) {
    throw new Error('zipcode inválido')
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanedZip}/json/`)

    if (!response.ok) throw new Error('cep não encontrado')

    const data = await response.json()

    if (data.erro) throw new Error('cep não encontrado')

    return {
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
      ibge: data.ibge,
      gia: data.gia,
      ddd: data.ddd,
      siafi: data.siafi
    }
  } catch (error) {
    throw new Error(
      `Erro no serviço de cep: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    )
  }
}
