import { Calendar } from 'lucide-react'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { CityPanelProps } from '../../types/city'

export function PicosPanel({ className }: CityPanelProps) {
  return (
    <div className={className}>
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="mr-1 size-4" />
          <span>11 e 12 de Abril, 2025</span>
        </div>
        <h2 className="truncate text-[22px] font-semibold text-lime-700 sm:text-[29px]">
          Vale do Rio Guaribas
        </h2>
      </div>
      <div className="flex flex-col space-y-2">
        <p>
          O evento em Picos reuniu centenas de participantes e gerou propostas
          importantes para o desenvolvimento do Vale do Rio Guaribas.
        </p>
        <p>
          <span className="font-semibold">Confira os resultados</span> dessa
          etapa do Diálogos pelo Piauí.
        </p>
      </div>
      <Button
        component={Link}
        target="_blank"
        href="https://www.pi.gov.br/category/dialogos-pelo-piaui/?s=picos"
        className="mt-4"
        color="lime.5"
      >
        Ver como foi o evento
      </Button>
    </div>
  )
}
