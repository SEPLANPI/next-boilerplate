import { Button } from '@mantine/core'
import Link from 'next/link'
import {
  CityPanelActions,
  CityPanelContent,
  CityPanelHeaderBadge,
  CityPanelHeaderDate,
  CityPanelHeaderRoot,
  CityPanelHeaderTitle,
  CityPanelProps,
  CityPanelRoot
} from './city-panel'

export function PicosPanel({ className }: CityPanelProps) {
  return (
    <CityPanelRoot className={className}>
      <CityPanelHeaderRoot>
        <CityPanelHeaderBadge isCurrent={false} />
        <CityPanelHeaderTitle territory="Vale do Rio Guaribas" />
        <CityPanelHeaderDate date="11 e 12 de Abril, 2025" />
      </CityPanelHeaderRoot>
      <CityPanelContent>
        <p>
          O evento em Picos reuniu centenas de participantes e gerou propostas
          importantes para o desenvolvimento do Vale do Rio Guaribas.
        </p>
        <p>
          <span className="font-semibold">Confira os resultados</span> dessa
          etapa do Diálogos pelo Piauí.
        </p>
      </CityPanelContent>
      <CityPanelActions>
        <Button
          component={Link}
          target="_blank"
          href="https://www.pi.gov.br/category/dialogos-pelo-piaui/?s=picos"
          color="lime.5"
        >
          Ver como foi o evento
        </Button>
      </CityPanelActions>
    </CityPanelRoot>
  )
}
