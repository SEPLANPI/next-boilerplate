'use client'

import { Section } from './section'
import { Map } from './map'
import { CityContextProvider } from '../contexts/city-context'
import { CityNavigator } from './city-navigator'

export function TerritorialContextSection() {
  return (
    <CityContextProvider>
        <Section
          id="onde-estamos"
          spacing="lg"
          className="bg-lime-100 !py-12"
          containerClassName="rounded-xl grid grid-cols-1 gap-8 sm:grid-cols-12"
        >
          <CityNavigator />
          <div className="relative col-start-1 row-start-1  sm:col-start-8 sm:col-span-5">
            <Map />
          </div>
        </Section>
    </CityContextProvider>
  )
}
