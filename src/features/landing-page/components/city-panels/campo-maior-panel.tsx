import { Calendar } from 'lucide-react'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { CityPanelProps } from '../../types/city'

export function CampoMaiorPanel({ className }: CityPanelProps) {
  return (
    <div className={className}>
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="mr-1 size-4" />
          <span>16 e 17 de Maio, 2025</span>
        </div>
        <h2 className="truncate text-[22px] font-semibold text-lime-700 sm:text-[29px]">
          Carnaubais
        </h2>
      </div>
      <div className="flex flex-col space-y-2">
        <p>
          <span className="font-semibold">Campo Maior</span> é o coração do
          Carnaubais!
        </p>
        <p>
          Venha participar de um evento único, que traz o governo mais perto de
          você. Aproveite para se engajar nas discussões, fazer novas conexões e
          contribuir para o futuro da nossa região.
        </p>
      </div>
      <Button
        component={Link}
        href="/inscrever-se"
        className="mt-4"
        color="lime.5"
      >
        Quero garantir minha vaga
      </Button>
    </div>
  )
}
