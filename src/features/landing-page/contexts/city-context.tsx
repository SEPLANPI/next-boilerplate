'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { City, CityValue } from '../types/city'

export const cityOrder: CityValue[] = ['picos', 'piripiri', 'campo-maior']

const cityByValue: Record<CityValue, City> = {
  picos: {
    name: 'Picos',
    coordinates: { x: 78, y: 52 },
    position: 'right',
    territory: 'Vale do Rio Guaribas',
    value: 'picos'
  },
  piripiri: {
    name: 'Piripiri',
    coordinates: { x: 77, y: 17 },
    position: 'top',
    territory: 'Cocais',
    value: 'piripiri'
  },
  'campo-maior': {
    name: 'Campo Maior',
    coordinates: { x: 70, y: 26 },
    position: 'left',
    territory: 'Carnaubais',
    value: 'campo-maior'
  }
}

export const cityData = {
  Picos: cityByValue.picos,
  Piripiri: cityByValue.piripiri,
  'Campo Maior': cityByValue['campo-maior']
}

type CityContextType = {
  selectedCity: City | null
  setSelectedCity: (city: City | null) => void
  activeCity: CityValue
  handleNextCity: () => void
  handlePrevCity: () => void
  progress: number
  isFirst: boolean
  isLast: boolean
  slideDirection: number
  setSlideDirection: (direction: number) => void
}

const CityContext = createContext<CityContextType | undefined>(undefined)

export function CityContextProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<City | null>(
    cityByValue['campo-maior']
  )
  const [slideDirection, setSlideDirection] = useState(0)

  const activeCity = selectedCity?.value || 'campo-maior'
  const currentIndex = cityOrder.indexOf(activeCity)
  const isFirst = currentIndex === 0
  const isLast = currentIndex === cityOrder.length - 1
  const progress = ((currentIndex + 1) / cityOrder.length) * 100

  const handleNextCity = () => {
    if (currentIndex < cityOrder.length - 1) {
      setSlideDirection(1)
      const nextValue = cityOrder[currentIndex + 1]
      setSelectedCity(cityByValue[nextValue])
    }
  }

  const handlePrevCity = () => {
    if (currentIndex > 0) {
      setSlideDirection(-1)
      const prevValue = cityOrder[currentIndex - 1]
      setSelectedCity(cityByValue[prevValue])
    }
  }

  const handleSetSelectedCity = (city: City | null) => {
    if (city) {
      const newIndex = cityOrder.indexOf(city.value)
      setSlideDirection(newIndex > currentIndex ? 1 : -1)
    }
    setSelectedCity(city)
  }

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        setSelectedCity: handleSetSelectedCity,
        activeCity,
        handleNextCity,
        handlePrevCity,
        progress,
        isFirst,
        isLast,
        slideDirection,
        setSlideDirection
      }}
    >
      {children}
    </CityContext.Provider>
  )
}

export function useCityContext() {
  const context = useContext(CityContext)

  if (context === undefined) {
    throw new Error('useCityContext must be used within a CityContextProvider')
  }

  return context
}
