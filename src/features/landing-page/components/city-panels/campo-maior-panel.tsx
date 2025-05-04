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

export function CampoMaiorPanel({ className }: CityPanelProps) {
  return (
    <CityPanelRoot className={className}>
      <CityPanelHeaderRoot>
        <CityPanelHeaderBadge isCurrent={true} />
        <CityPanelHeaderTitle territory="Carnaubais" />
        <CityPanelHeaderDate date="16 e 17 de Maio, 2025" />
      </CityPanelHeaderRoot>
      <CityPanelContent>
        <p>
          <span className="font-semibold">Campo Maior</span> é o coração do
          Carnaubais!
        </p>
        <p>
          Venha participar de um evento único, que traz o governo mais perto de
          você. Aproveite para se engajar nas discussões, fazer novas conexões e
          contribuir para o futuro da nossa região.
        </p>
      </CityPanelContent>
      <CityPanelActions>
        <Button component={Link} href="/inscrever-se" color="lime.5">
          Quero garantir minha vaga
        </Button>
      </CityPanelActions>
    </CityPanelRoot>
  )
}
