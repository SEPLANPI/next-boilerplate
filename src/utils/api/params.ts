import { buildParams, type ParamsRecord } from '@/lib/api/params'

/**
 * Build parameters with automatic event scoping
 * Handles the common pattern of adding evento_id when not null or 'global'
 */
export function buildEventScopedParams({
  evento_id,
  ...params
}: ParamsRecord & { evento_id: string | null }) {
  const baseParams = buildParams(params)

  if (evento_id && evento_id !== 'global') {
    baseParams.set('evento_id', evento_id)
  }

  return baseParams
}
