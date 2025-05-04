'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { MapPin } from 'lucide-react'
import { cityData, useCityContext } from '../contexts/city-context'
import { City } from '../types/city'

const piauiCities = Object.values(cityData)

export function Map() {
  const ref = useRef(null)
  const { selectedCity, setSelectedCity } = useCityContext()

  const imageProps = {
    alt: 'Mapa do Piauí com destaque para o Vale do Rio Guaribas',
    fill: true,
    quality: 100,
    className: 'object-contain',
    src: '/lp/mapa.svg'
  } as const

  const getSlideAnimation = (position: City['position']) => {
    switch (position) {
      case 'top':
        return { y: [20, 0] }
      case 'bottom':
        return { y: [-20, 0] }
      case 'left':
        return { x: [20, 0] }
      case 'right':
        return { x: [-20, 0] }
      default:
        return { y: [20, 0] }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      className="relative mx-auto aspect-[434/611] max-h-[50vh] overflow-visible sm:absolute sm:top-1/2 sm:max-h-none sm:w-[90%] sm:-translate-y-1/2"
    >
      <Image {...imageProps} />
      {piauiCities.map((city, index) => (
        <div
          key={city.value}
          className="absolute"
          style={{
            left: `${city.coordinates.x}%`,
            top: `${city.coordinates.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <motion.div
            className={`h-2.5 w-2.5 cursor-pointer rounded-full transition-all duration-300 ${
              selectedCity?.value === city.value
                ? 'bg-lime-700 shadow-[0_0_0_2px_rgba(255,255,255,0.7),0_0_0_5px_rgba(255,255,255,0.4)]'
                : 'bg-lime-700'
            }`}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.3,
                  delay: index * 0.1
                }
              }
            }}
          />
          <div className="relative">
            <motion.span
              layoutId={`city-label-${city.value}`}
              className={`'text-stone-600 absolute block cursor-pointer whitespace-nowrap rounded-md py-1 pl-1 pr-2 text-sm font-semibold shadow transition-shadow ${
                selectedCity?.value === city.value
                  ? 'bg-green-900 text-white'
                  : 'bg-white hover:bg-white hover:shadow-sm'
              } ${
                city.position === 'top'
                  ? 'bottom-full left-1/2 mb-5 -translate-x-1/2'
                  : city.position === 'bottom'
                    ? 'left-1/2 top-full mt-5 -translate-x-1/2'
                    : city.position === 'left'
                      ? 'bottom-0 right-full mr-3 translate-y-2.5'
                      : 'bottom-0 left-full ml-3 translate-y-2.5'
              }`}
              variants={{
                hidden: {
                  opacity: 0,
                  ...getSlideAnimation(city.position)
                },
                visible: {
                  opacity: 1,
                  ...getSlideAnimation(city.position),
                  transition: {
                    duration: 0.6,
                    delay: index * 0.2 + 0.2,
                    ease: 'easeOut'
                  }
                }
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCity?.(city)}
            >
              <span className="flex items-center gap-1.5">
                {index === piauiCities.length - 1 ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-lime-600 p-0.5">
                    <MapPin className="size-3 text-white" />
                  </span>
                ) : (
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-lime-600 text-xs font-medium text-white">
                    {index + 1}
                  </span>
                )}
                {city.name}
              </span>
            </motion.span>
          </div>
        </div>
      ))}
    </motion.div>
  )
}
