import { useState } from 'react'
import { City, CityValue } from '../types/city'

interface UseCityNavigationProps {
  initialCity: City
  cityOrder: CityValue[]
  cityData: Record<string, City>
}

export function useCityNavigation({
  initialCity,
  cityOrder,
  cityData
}: UseCityNavigationProps) {
  const [selectedCity, setSelectedCity] = useState<City>(initialCity)

  const activeCity = selectedCity.value
  const currentIndex = cityOrder.indexOf(activeCity)
  const isFirst = currentIndex === 0
  const isLast = currentIndex === cityOrder.length - 1
  const progress = ((currentIndex + 1) / cityOrder.length) * 100

  const handleNextCity = () => {
    if (!isLast) {
      setSelectedCity(cityData[cityOrder[currentIndex + 1]])
    }
  }

  const handlePrevCity = () => {
    if (!isFirst) {
      setSelectedCity(cityData[cityOrder[currentIndex - 1]])
    }
  }

  return {
    selectedCity,
    setSelectedCity,
    activeCity,
    handleNextCity,
    handlePrevCity,
    progress,
    isFirst,
    isLast
  }
}
