import { useQuery } from '@tanstack/react-query'
import { getZipCodeInfo } from '../../../services/zip-code'

export function useZipCode(zipCode: string | undefined) {
  return useQuery({
    queryKey: ['zipCode', zipCode],
    queryFn: () => getZipCodeInfo(zipCode!),
    enabled: zipCode?.length === 8,
    retry: false
  })
}
