import { AxisCard } from '@/components/ui/axis-card'
import {
  BookOpen,
  HeartPulse,
  Landmark,
  Leaf,
  ShieldCheck,
  TrendingUp,
  Users
} from 'lucide-react'
import { Badge } from '@mantine/core'

const cardMetrics = {
  total: '5',
  pendentes: '1',
  aprovadas: '3',
  indisponiveis: '1'
}

export function AxisCards() {
  return (
    <>
      <AxisCard className="col-span-3">
        <AxisCard.Header>
          <span className="flex size-7 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <BookOpen className="size-4" />
          </span>
          <AxisCard.Title>Educação</AxisCard.Title>
        </AxisCard.Header>
        <AxisCard.Body>
          <AxisCard.Metric
            label="Total de Cadastros"
            value={cardMetrics.total}
          />
          <AxisCard.BadgeGroup label="Ajuda de Custo">
            <Badge variant="light" color="orange">
              {cardMetrics.pendentes} Pendentes
            </Badge>
            <Badge variant="light" color="green">
              {cardMetrics.aprovadas} Aprovadas
            </Badge>
            <Badge variant="light" color="red">
              {cardMetrics.indisponiveis} Indisponíveis
            </Badge>
          </AxisCard.BadgeGroup>
        </AxisCard.Body>
      </AxisCard>

      <AxisCard className="col-span-3">
        <AxisCard.Header>
          <span className="flex size-7 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <Users className="size-4" />
          </span>
          <AxisCard.Title>Desigualdades</AxisCard.Title>
        </AxisCard.Header>
        <AxisCard.Body>
          <AxisCard.Metric
            label="Total de Cadastros"
            value={cardMetrics.total}
          />
          <AxisCard.BadgeGroup label="Ajuda de Custo">
            <Badge variant="light" color="orange">
              {cardMetrics.pendentes} Pendentes
            </Badge>
            <Badge variant="light" color="green">
              {cardMetrics.aprovadas} Aprovadas
            </Badge>
            <Badge variant="light" color="red">
              {cardMetrics.indisponiveis} Indisponíveis
            </Badge>
          </AxisCard.BadgeGroup>
        </AxisCard.Body>
      </AxisCard>

      <AxisCard className="col-span-3">
        <AxisCard.Header>
          <span className="bg-emerald-50 text-emerald-600 flex size-7 items-center justify-center rounded-full">
            <HeartPulse className="size-4" />
          </span>
          <AxisCard.Title>Saúde</AxisCard.Title>
        </AxisCard.Header>
        <AxisCard.Body>
          <AxisCard.Metric
            label="Total de Cadastros"
            value={cardMetrics.total}
          />
          <AxisCard.BadgeGroup label="Ajuda de Custo">
            <Badge variant="light" color="orange">
              {cardMetrics.pendentes} Pendentes
            </Badge>
            <Badge variant="light" color="green">
              {cardMetrics.aprovadas} Aprovadas
            </Badge>
            <Badge variant="light" color="red">
              {cardMetrics.indisponiveis} Indisponíveis
            </Badge>
          </AxisCard.BadgeGroup>
        </AxisCard.Body>
      </AxisCard>

      <AxisCard className="col-span-3">
        <AxisCard.Header>
          <span className="flex size-7 items-center justify-center rounded-full bg-red-50 text-red-600">
            <ShieldCheck className="size-4" />
          </span>
          <AxisCard.Title>Justiça</AxisCard.Title>
        </AxisCard.Header>
        <AxisCard.Body>
          <AxisCard.Metric
            label="Total de Cadastros"
            value={cardMetrics.total}
          />
          <AxisCard.BadgeGroup label="Ajuda de Custo">
            <Badge variant="light" color="orange">
              {cardMetrics.pendentes} Pendentes
            </Badge>
            <Badge variant="light" color="green">
              {cardMetrics.aprovadas} Aprovadas
            </Badge>
            <Badge variant="light" color="red">
              {cardMetrics.indisponiveis} Indisponíveis
            </Badge>
          </AxisCard.BadgeGroup>
        </AxisCard.Body>
      </AxisCard>

      <AxisCard className="col-span-4">
        <AxisCard.Header>
          <span className="flex size-7 items-center justify-center rounded-full bg-green-50 text-green-600">
            <Leaf className="size-4" />
          </span>
          <AxisCard.Title>Meio Ambiente</AxisCard.Title>
        </AxisCard.Header>
        <AxisCard.Body>
          <AxisCard.Metric
            label="Total de Cadastros"
            value={cardMetrics.total}
          />
          <AxisCard.BadgeGroup label="Ajuda de Custo">
            <Badge variant="light" color="orange">
              {cardMetrics.pendentes} Pendentes
            </Badge>
            <Badge variant="light" color="green">
              {cardMetrics.aprovadas} Aprovadas
            </Badge>
            <Badge variant="light" color="red">
              {cardMetrics.indisponiveis} Indisponíveis
            </Badge>
          </AxisCard.BadgeGroup>
        </AxisCard.Body>
      </AxisCard>

      <AxisCard className="col-span-4">
        <AxisCard.Header>
          <span className="flex size-7 items-center justify-center rounded-full bg-gray-50 text-gray-600">
            <Landmark className="size-4" />
          </span>
          <AxisCard.Title>Infraestrutura</AxisCard.Title>
        </AxisCard.Header>
        <AxisCard.Body>
          <AxisCard.Metric
            label="Total de Cadastros"
            value={cardMetrics.total}
          />
          <AxisCard.BadgeGroup label="Ajuda de Custo">
            <Badge variant="light" color="orange">
              {cardMetrics.pendentes} Pendentes
            </Badge>
            <Badge variant="light" color="green">
              {cardMetrics.aprovadas} Aprovadas
            </Badge>
            <Badge variant="light" color="red">
              {cardMetrics.indisponiveis} Indisponíveis
            </Badge>
          </AxisCard.BadgeGroup>
        </AxisCard.Body>
      </AxisCard>

      <AxisCard className="col-span-4">
        <AxisCard.Header>
          <span className="flex size-7 items-center justify-center rounded-full bg-yellow-50 text-yellow-600">
            <TrendingUp className="size-4" />
          </span>
          <AxisCard.Title>Economia</AxisCard.Title>
        </AxisCard.Header>
        <AxisCard.Body>
          <AxisCard.Metric
            label="Total de Cadastros"
            value={cardMetrics.total}
          />
          <AxisCard.BadgeGroup label="Ajuda de Custo">
            <Badge variant="light" color="orange">
              {cardMetrics.pendentes} Pendentes
            </Badge>
            <Badge variant="light" color="green">
              {cardMetrics.aprovadas} Aprovadas
            </Badge>
            <Badge variant="light" color="red">
              {cardMetrics.indisponiveis} Indisponíveis
            </Badge>
          </AxisCard.BadgeGroup>
        </AxisCard.Body>
      </AxisCard>
    </>
  )
}
