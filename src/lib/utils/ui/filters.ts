import { OptionsFilter, ComboboxItem } from '@mantine/core'
import { removeAccents } from '../formatting/text'

/**
 * Função de filtro para o componente Select do Mantine que ignora acentos.
 *
 * @example
 * <Select
 *   searchable
 *   data={options}
 *   filter={filterOptions}
 * />
 */
export const filterOptions: OptionsFilter = ({ options, search }) => {
  if (!search) {
    return options
  }

  const normalizedSearch = removeAccents(search.toLowerCase())

  return (options as ComboboxItem[]).filter((option) => {
    const normalizedLabel = removeAccents(option.label.toLowerCase())
    return normalizedLabel.includes(normalizedSearch)
  })
}
