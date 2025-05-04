import { Calendar } from 'lucide-react'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { CityPanelProps } from '../../types/city'

export function PiripiriPanel({ className }: CityPanelProps) {
  return (
    <div className={className}>
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="mr-1 size-4" />
          <span>25 e 26 de Abril, 2025</span>
        </div>
        <h2 className="truncate text-[22px] font-semibold text-lime-700 sm:text-[29px]">
          Cocais
        </h2>
      </div>
      <div className="flex flex-col space-y-2">
        <p>
          Em Piripiri, o Diálogos pelo Piauí fortaleceu a participação popular e
          trouxe importantes contribuições para o desenvolvimento do território.
        </p>
        <p>
          <span className="font-semibold">Descubra</span> como essa etapa
          impactou a região dos <span className="font-semibold">Cocais</span>.
        </p>
      </div>
      <Button
        component={Link}
        target="_blank"
        href="https://www.pi.gov.br/category/dialogos-pelo-piaui/?s=piripiri"
        className="mt-4"
        color="lime.5"
      >
        Ver como foi o evento
      </Button>
    </div>
  )
}
