import { EventGroup } from '../types'

export const generateGroupIdentifier = (group: EventGroup): string => {
  return `${group.nome}`.toLowerCase().replace(/\s+/g, '-')
}
