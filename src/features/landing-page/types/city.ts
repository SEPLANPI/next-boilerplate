export type CityValue = 'campo-maior' | 'picos' | 'piripiri'

export interface City {
  name: string
  coordinates: {
    x: number
    y: number
  }
  position: 'top' | 'bottom' | 'left' | 'right'
  territory: string
  value: CityValue
}

export interface CityPanelProps {
  className?: string
}
