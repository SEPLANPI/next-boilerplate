import { Button } from '@mantine/core'
import Link from 'next/link'
import {
  CityPanelRoot,
  CityPanelContent,
  CityPanelHeaderRoot,
  CityPanelHeaderBadge,
  CityPanelHeaderTitle,
  CityPanelHeaderDate,
  CityPanelActions,
  CityPanelProps
} from './city-panel'

export function PiripiriPanel({ className }: CityPanelProps) {
  return (
    <CityPanelRoot className={className}>
      <CityPanelHeaderRoot>
        <CityPanelHeaderBadge isCurrent={false} />
        <CityPanelHeaderTitle territory="Cocais" />
        <CityPanelHeaderDate date="25 e 26 de Abril, 2025" />
      </CityPanelHeaderRoot>
      <CityPanelContent>
        <p>
          Em Piripiri, o Diálogos pelo Piauí fortaleceu a participação popular e
          trouxe importantes contribuições para o desenvolvimento do território.
        </p>
        <p>
          <span className="font-semibold">Descubra</span> como essa etapa
          impactou a região dos <span className="font-semibold">Cocais</span>.
        </p>
      </CityPanelContent>
      <CityPanelActions>
        <Button
          component={Link}
          target="_blank"
          href="https://www.pi.gov.br/category/dialogos-pelo-piaui/?s=piripiri"
          color="lime.5"
        >
          Ver como foi o evento
        </Button>
      </CityPanelActions>
    </CityPanelRoot>
  )
}
