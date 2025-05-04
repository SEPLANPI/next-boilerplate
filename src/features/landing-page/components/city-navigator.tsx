'use client'

import { ActionIcon } from '@mantine/core'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCityContext } from '../contexts/city-context'
import { CampoMaiorPanel } from './city-panels/campo-maior-panel'
import { PicosPanel } from './city-panels/picos-panel'
import { PiripiriPanel } from './city-panels/piripiri-panel'

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0
  })
}

interface ProgressBarProps {
  progress: number
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

function ProgressBar({
  progress,
  onNext,
  onPrev,
  isFirst,
  isLast
}: ProgressBarProps) {
  return (
    <div className="mb-6 flex w-full items-center gap-3">
      <div className="flex-grow-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-lime-600 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex gap-2">
        <ActionIcon
          onClick={onPrev}
          disabled={isFirst}
          color="lime"
          aria-label="Cidade anterior"
        >
          <ArrowLeft className="size-4" />
        </ActionIcon>
        <ActionIcon
          onClick={onNext}
          disabled={isLast}
          color="lime"
          aria-label="Próxima cidade"
        >
          <ArrowRight className="size-4" />
        </ActionIcon>
      </div>
    </div>
  )
}

const CITY_PANELS = {
  'campo-maior': CampoMaiorPanel,
  picos: PicosPanel,
  piripiri: PiripiriPanel
} as const

export function CityNavigator() {
  const {
    activeCity,
    handleNextCity,
    handlePrevCity,
    progress,
    isFirst,
    isLast,
    slideDirection
  } = useCityContext()

  const ActivePanel = CITY_PANELS[activeCity]

  return (
    <div className="sm:col-span-7 flex flex-col items-start overflow-hidden rounded-lg bg-white p-5 shadow-xl sm:p-8">
      <ProgressBar
        progress={progress}
        onNext={handleNextCity}
        onPrev={handlePrevCity}
        isFirst={isFirst}
        isLast={isLast}
      />
      <div className="relative w-full">
        <AnimatePresence initial={false} mode="wait" custom={slideDirection}>
          <motion.div
            key={activeCity}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.3 }}
            className="flex h-[300px] flex-col items-start xs:h-[280px] sm:h-[360px] md:h-[320px]"
          >
            <ActivePanel />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
