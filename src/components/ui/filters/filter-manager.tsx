import { ReactNode, Children, isValidElement, useMemo } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { FiltersProvider } from './providers/filters-provider'
import { FiltersButton } from './components/filters-button'
import { FiltersModal } from './components/filters-modal'
import { FilterGroup } from './components/filter-group'
import { FilterManagerProps } from './types'

export function FilterManager({
  children,
  onApply,
  buttonText
}: FilterManagerProps) {
  const [opened, { open, close }] = useDisclosure(false)

  const handleApply = () => {
    onApply?.()
  }

  // Extract groupKeys from FilterGroup children
  const groupKeys = useMemo(() => {
    const keys: string[] = []

    const extractGroupKeys = (children: ReactNode) => {
      Children.forEach(children, (child) => {
        if (isValidElement(child)) {
          // Check if it's a FilterGroup component by comparing with the actual component
          if (child.type === FilterGroup) {
            const searchParamKey = child.props?.searchParamKey
            if (searchParamKey && !keys.includes(searchParamKey)) {
              keys.push(searchParamKey)
            }
          }
          // Recursively check nested children
          if (child.props?.children) {
            extractGroupKeys(child.props.children)
          }
        }
      })
    }

    extractGroupKeys(children)
    return keys
  }, [children])

  return (
    <FiltersProvider groupKeys={groupKeys}>
      <FiltersButton onClick={open}>{buttonText}</FiltersButton>
      <FiltersModal opened={opened} onClose={close} onApply={handleApply}>
        {children}
      </FiltersModal>
    </FiltersProvider>
  )
}
