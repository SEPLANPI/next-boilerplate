import { EventGroup } from '@/types/events'

export const generateGroupIdentifier = (group: EventGroup): string => {
  return `${group.nome}`.toLowerCase().replace(/\s+/g, '-')
}
