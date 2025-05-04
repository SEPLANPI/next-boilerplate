'use client'

import { Section } from './section'
import { Map } from './map'
import { CityContextProvider } from '../contexts/city-context'
import { CityNavigator } from './city-navigator'

export function TerritorialContextSection() {
  return (
    <CityContextProvider>
      <div className="w-full bg-stone-50 py-[144px]">
        <Section
          id="onde-estamos"
          spacing="lg"
          className="bg-lime-100 !py-12"
          containerClassName="rounded-xl grid grid-cols-1 gap-8 sm:gap-16 sm:grid-cols-2"
        >
          <div className="relative col-start-1 row-start-1">
            <Map />
          </div>
          <CityNavigator />
        </Section>
      </div>
    </CityContextProvider>
  )
}
