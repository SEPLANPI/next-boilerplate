import { Card } from '@/features/landing-page/components/card'
import { Header } from '@/features/landing-page/components/header'
import { Section } from '@/features/landing-page/components/section'
import { Anchor } from '@mantine/core'
import {
  BookOpen,
  Check,
  FileText,
  HeartPulse,
  Instagram,
  Landmark,
  Leaf,
  ListChecks,
  Mail,
  Presentation,
  School,
  Settings,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Youtube
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

function CheckListItem({ children }: PropsWithChildren) {
  return (
    <li className="flex gap-2">
      <span className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-700">
        <Check className="size-4 text-white" />
      </span>
      <span>{children}</span>
    </li>
  )
}

export default function LandingPage() {
  return (
    <div className="font-montserrat">
      <section className="relative flex h-[320px] flex-col p-8 sm:h-[420px] md:h-[660px] md:py-0">
        <Header />
        <main className="relative z-10 mx-auto flex w-full max-w-[1120px] flex-1 flex-col justify-center gap-2.5 text-white">
          <h1 className="max-w-xs text-2xl font-bold md:max-w-md md:text-4xl">
            Planejando um futuro sustentável e inclusivo
          </h1>
          <p className="max-w-xs text-sm md:max-w-md md:text-lg">
            Aproximando a gestão pública da sociedade para construir um futuro
            mais justo e sustentável.
          </p>
        </main>
        <Image
          className="absolute left-0 top-0 z-0 hidden h-full object-cover sm:block"
          src="/lp/banner.png"
          sizes={'200vw'}
          quality={100}
          fill
          alt="uma senhora e um senhor em um gradiente azul claro e escuro com as listras do piauí"
        />
        <Image
          className="absolute left-0 top-0 z-0 block h-full object-cover sm:hidden"
          src="/lp/banner-mobile.png"
          sizes={'200vw'}
          quality={100}
          fill
          alt="gradiente azul claro e escuro com as listras do piauí"
        />
      </section>

      <div className="flex h-3 items-stretch sm:h-4">
        <span className="flex-1 bg-govYellow-400" />
        <span className="flex-1 bg-[#EF4123]" />
        <span className="flex-1 bg-blue-700" />
      </div>

      <Section id="sobre">
        <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-8 md:col-span-2">
            <h3 className="font-sans text-sm font-extrabold tracking-widest text-green-900">
              O QUE É?
            </h3>
            <h2 className="text-xl font-bold md:text-4xl">
              <span className="block">Diálogos pelo Piauí:</span>
              <span>O Governo mais perto de você</span>
            </h2>
            <p className="text-sm sm:text-base">
              O <span className="font-bold">Diálogos pelo Piauí</span> é uma
              iniciativa do Governo do Estado que promove a escuta ativa da
              sociedade para garantir que o planejamento governamental esteja
              alinhado com as reais necessidades da população. O evento percorre
              os 12 Territórios de Desenvolvimento (TDs) do estado, criando um
              espaço de participação cidadã na revisão do Plano Plurianual (PPA)
              2024-2027. Através de oficinas temáticas e plenárias, a população
              pode contribuir com propostas para as políticas públicas,
              fortalecendo a transparência e a governança participativa.
            </p>
          </div>
          <Image
            className="h-full rounded-md object-cover"
            src="/lp/mulher-fundo-verde.png"
            width={900}
            height={900}
            quality={100}
            alt="Mulher jovem com cabelo cacheado sorrindo em fundo verde"
          />
        </div>
      </Section>

      <Section
        id="ppa"
        className="bg-gradient-to-r from-[#389CF8] to-[#0352AA] text-white"
      >
        <div className="flex flex-col items-center">
          <h3 className="mb-8 font-sans text-sm font-extrabold tracking-widest">
            PLANO PLURIANUAL
          </h3>
          <div className="flex flex-col space-y-4">
            <p className="text-center">
              O Plano Plurianual (PPA) é um instrumento de planejamento
              estratégico do governo, que define as diretrizes, objetivos, ações
              e metas para um período de quatro anos. Ele estabelece a visão de
              futuro e os investimentos prioritários do estado, garantindo o
              desenvolvimento sustentável e a inclusão social.
            </p>
            <p className="text-center">
              Para o período 2024-2027, o PPA está estruturado em três
              dimensões:
            </p>
            <div className="flex flex-col gap-5 sm:flex-row">
              <Card.Root className="bg-white/15">
                <Card.Icon className="bg-white/20">
                  <Target className="size-4" />
                </Card.Icon>
                <Card.Title>Dimensão Estratégica</Card.Title>
                <Card.Subtitle>
                  Define a visão de futuro e os eixos estratégicos do governo.
                </Card.Subtitle>
              </Card.Root>
              <Card.Root className="bg-white/15">
                <Card.Icon className="bg-white/20">
                  <ListChecks className="size-4" />
                </Card.Icon>
                <Card.Title>Dimensão Tática</Card.Title>
                <Card.Subtitle>
                  Estabelece objetivos e diretrizes para os programas, com metas
                  e indicadores.
                </Card.Subtitle>
              </Card.Root>
              <Card.Root className="bg-white/15">
                <Card.Icon className="bg-white/20">
                  <Settings className="size-4" />
                </Card.Icon>
                <Card.Title>Dimensão Operacional</Card.Title>
                <Card.Subtitle>
                  Detalha ações, produtos e metas físicas e financeiras.
                </Card.Subtitle>
              </Card.Root>
            </div>
          </div>
        </div>
      </Section>

      <Section id="eixos" containerClassName="flex flex-col items-center">
        <h3 className="mb-8 text-center font-sans text-sm font-extrabold tracking-widest text-blue-900">
          EIXOS ESTRATÉGICOS
        </h3>
        <p className="text-center text-sm xs:text-base">
          O planejamento está estruturado em sete eixos estratégicos, cada um
          focado em um aspecto essencial do desenvolvimento do estado.
        </p>
        <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-12">
          <Card.Root className="bg-green-800 text-white sm:col-span-6 md:col-span-4">
            <Card.Icon className="bg-white/20">
              <Leaf className="size-4" />
            </Card.Icon>
            <Card.Title>
              Mudanças Climáticas, Meio Ambiente e Recursos Hídricos
            </Card.Title>
            <Card.Subtitle>Piauí Verde</Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-gray-100 sm:col-span-6 md:col-span-4">
            <Card.Icon className="bg-gray-200">
              <Landmark className="size-4 text-gray-700" />
            </Card.Icon>
            <Card.Title>
              Infraestrutura, Inclusão Produtiva e Transição Energética
            </Card.Title>
            <Card.Subtitle>Piauí Integrado</Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-govYellow-400 sm:col-span-4">
            <Card.Icon className="bg-white/20">
              <TrendingUp className="size-4" />
            </Card.Icon>
            <Card.Title>Desenvolvimento Socioeconômico</Card.Title>
            <Card.Subtitle>
              <span className="block">Piauí Produtivo</span>
              <span className="block">Avança Piauí</span>
            </Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-blue-700 text-white sm:col-span-4 md:col-span-3">
            <Card.Icon className="bg-white/20">
              <BookOpen className="size-4" />
            </Card.Icon>
            <Card.Title>Educação Inclusiva e de Qualidade</Card.Title>
            <Card.Subtitle>Piauí Educação</Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-orange-50 sm:col-span-4 md:col-span-3">
            <Card.Icon className="bg-orange-100">
              <Users className="size-4 text-orange-500" />
            </Card.Icon>
            <Card.Title>Redução das Desigualdades</Card.Title>
            <Card.Subtitle>Piauí Inclusivo</Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-green-50 sm:col-span-6 md:col-span-3">
            <Card.Icon className="bg-green-100">
              <HeartPulse className="size-4 text-green-600" />
            </Card.Icon>
            <Card.Title>Saúde e Bem-Estar</Card.Title>
            <Card.Subtitle>
              <span className="block">Piauí Saudável</span>
              <span className="block">
                Piauí com mais Cultura, Esporte e Lazer
              </span>
            </Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-red-600 text-white sm:col-span-6 md:col-span-3">
            <Card.Icon className="bg-white/20">
              <ShieldCheck className="size-4" />
            </Card.Icon>
            <Card.Title>Justiça e Segurança</Card.Title>
            <Card.Subtitle>Piauí Seguro</Card.Subtitle>
          </Card.Root>
        </div>
      </Section>

      <Section
        containerClassName="flex flex-col items-center"
        className="!pt-0"
      >
        <h3 className="mb-8 text-center font-sans text-sm font-extrabold tracking-widest">
          CRONOGRAMA
        </h3>
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex h-full flex-col">
            <div className="rounded-t-md bg-govYellow-400 px-3 py-1.5">
              <h4 className="font-bold">Abril</h4>
            </div>
            <div className="flex-1 divide-y rounded-b-md border border-t-0 px-4">
              <div className="flex flex-col space-y-2 py-4">
                <span className="text-sm font-semibold">
                  11 - 12 VALE DO RIO GUARIBAS
                </span>
                <span className="text-sm">Picos</span>
              </div>
              <div className="flex flex-col space-y-2 py-4">
                <span className="text-sm font-semibold">25 - 26 COCAIS</span>
                <span className="text-sm">Piripiri</span>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col">
            <div className="rounded-t-md bg-govYellow-400 px-3 py-1.5">
              <h4 className="font-bold">Maio</h4>
            </div>
            <div className="flex-1 divide-y rounded-b-md border border-t-0 px-4">
              <div className="flex flex-col space-y-2 py-4">
                <span className="text-sm font-semibold">
                  16 - 17 VALE DOS RIOS E PIAUÍ E ITAUEIRAS
                </span>
                <span className="text-sm">Floriano</span>
              </div>
              <div className="flex flex-col space-y-2 py-4">
                <span className="text-sm font-semibold">30 -31 CARNAUBAIS</span>
                <span className="text-sm">Campo Maior</span>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col">
            <div className="rounded-t-md bg-govYellow-400 px-3 py-1.5">
              <h4 className="font-bold">Junho</h4>
            </div>
            <div className="flex-1 divide-y rounded-b-md border border-t-0 px-4">
              <div className="flex flex-col space-y-2 py-4">
                <span className="text-sm font-semibold">
                  13 - 14 TABULEIROS DO ALTO PARNAÍBA
                </span>
                <span className="text-sm">Uruçuí</span>
              </div>
              <div className="flex flex-col space-y-2 py-4">
                <span className="text-sm font-semibold">
                  27 - 28 CHAPADA DAS MANGABEIRAS
                </span>
                <span className="text-sm">Bom Jesus</span>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col">
            <div className="rounded-t-md bg-govYellow-400 px-3 py-1.5">
              <h4 className="font-bold">Julho</h4>
            </div>
            <div className="flex-1 divide-y rounded-b-md border border-t-0 px-4">
              <div className="flex flex-col space-y-2 py-4">
                <span className="text-sm font-semibold">
                  11 - 12 PLANÍCIE LITORÂNEA
                </span>
                <span className="text-sm">Parnaíba</span>
              </div>
              <div className="flex flex-col space-y-2 py-4">
                <span className="text-sm font-semibold">
                  25 - 26 SERRA DA CAPIVARA
                </span>
                <span className="text-sm">São Raimundo Nonato</span>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col">
            <div className="rounded-t-md bg-govYellow-400 px-3 py-1.5">
              <h4 className="font-bold">Agosto</h4>
            </div>
            <div className="flex-1 divide-y rounded-b-md border border-t-0 px-4">
              <div className="flex flex-col space-y-2 py-4">
                <span className="text-sm font-semibold">
                  08 - 09 VALE DO CANINDÉ
                </span>
                <span className="text-sm">Oeiras</span>
              </div>
              <div className="flex flex-col space-y-2 py-4">
                <span className="text-sm font-semibold">
                  22 - 23 CHAPADA DO VALE ITAIM
                </span>
                <span className="text-sm">Paulistana</span>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col">
            <div className="rounded-t-md bg-govYellow-400 px-3 py-1.5">
              <h4 className="font-bold">Setembro</h4>
            </div>
            <div className="flex-1 divide-y rounded-b-md border border-t-0 px-4">
              <div className="flex flex-col space-y-2 py-4">
                <span className="text-sm font-semibold">
                  05 - 06 VALE DO SAMBITO
                </span>
                <span className="text-sm">Valença</span>
              </div>
              <div className="flex flex-col space-y-2 py-4">
                <span className="text-sm font-semibold">
                  19 - 20 ENTRE RIOS
                </span>
                <span className="text-sm">Teresina</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="como-funciona"
        className="bg-green-800 text-white"
        containerClassName="flex flex-col items-center"
      >
        <h3 className="mb-8 text-center font-sans text-sm font-extrabold tracking-widest">
          COMO FUNCIONA?
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <Card.Root className="bg-white/10 text-white">
            <Card.Icon className="bg-white/20">
              <School className="size-4" />
            </Card.Icon>
            <Card.Title>Construção das propostas territoriais</Card.Title>
            <Card.Subtitle>
              <ul className="list-disc pl-6">
                <li>Capacitação dos conselheiros territoriais.</li>
                <li>
                  Elaboração de propostas baseadas nas necessidades locais.
                </li>
              </ul>
            </Card.Subtitle>
          </Card.Root>
          <Image
            className="row-span-2 hidden h-full rounded-md object-cover md:block"
            alt="Senhor dando jóia com fundo verde"
            src="/lp/senhor-fundo-verde.png"
            width={704}
            height={1064}
            quality={100}
          />
          <Card.Root className="bg-white/10 text-white">
            <Card.Icon className="bg-white/20">
              <Presentation className="size-4" />
            </Card.Icon>
            <Card.Title>Apresentação ao Governador</Card.Title>
            <Card.Subtitle>
              <ul className="list-disc pl-6">
                <li>
                  Plenária final onde as propostas priorizadas são apresentadas
                  ao governador.
                </li>
                <li>Discussão e possível incorporação ao PPA revisado.</li>
              </ul>
            </Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-white/10 text-white">
            <Card.Icon className="bg-white/20">
              <ListChecks className="size-4" />
            </Card.Icon>
            <Card.Title>Priorização das propostas</Card.Title>
            <Card.Subtitle>
              <ul className="list-disc pl-6">
                <li>
                  Oficinas presenciais nos 12 Territórios de Desenvolvimento.
                </li>
                <li>
                  Discussão e priorização das propostas com a participação da
                  sociedade civil.
                </li>
              </ul>
            </Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-white/10 text-white">
            <Card.Icon className="bg-white/20">
              <FileText className="size-4" />
            </Card.Icon>
            <Card.Title>Compilação e ajustes finais</Card.Title>
            <Card.Subtitle>
              <ul className="list-disc pl-6">
                <li>
                  Síntese das propostas e integração ao documento revisado do
                  PPA.
                </li>
              </ul>
            </Card.Subtitle>
          </Card.Root>
        </div>
      </Section>
      <Section id="como-participar">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-8 md:col-span-2">
            <h3 className="font-sans text-sm font-extrabold tracking-widest text-blue-700">
              COMO PARTICIPAR?
            </h3>
            <h2 className="text-xl font-bold md:text-4xl">
              Juntos, podemos construir um Piauí mais{' '}
              <span className="text-blue-700">inclusivo</span>,{' '}
              <span className="text-blue-700">sustentável</span> e{' '}
              <span className="text-blue-700">inovador</span>
            </h2>
            <p className="text-sm sm:text-base">
              A participação no{' '}
              <span className="font-bold">Diálogos pelo Piauí</span> é aberta a
              toda a sociedade. Veja como você pode contribuir:
            </p>
            <ul className="space-y-4">
              <CheckListItem>
                Participe das oficinas presenciais no seu território.
              </CheckListItem>
              <CheckListItem>Envie suas propostas online.</CheckListItem>
              <CheckListItem>
                Acompanhe as plenárias e as decisões do governo.
              </CheckListItem>
            </ul>
          </div>
          <Image
            className="hidden h-full rounded-md object-cover md:block"
            src="/lp/senhor-fundo-verde.png"
            width={900}
            height={900}
            quality={100}
            alt="Mulher jovem com cabelo cacheado sorrindo em fundo vermelho"
          />
        </div>
      </Section>
      <footer className="bg-gray-900 px-8 py-5 text-white">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href="https://www.seplan.pi.gov.br/" target="_blank">
            <Image
              src="/seplan-logo.png"
              className="h-16 w-auto"
              width={350}
              height={120}
              alt="Logo SEPLAN"
            />
          </Link>
          <div className="flex gap-10">
            <Anchor
              className="text-white"
              href="mailto:gabinete@seplan.pi.gov.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="size-5" />
            </Anchor>
            <Anchor
              className="text-white"
              href="https://www.instagram.com/seplan_pi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="size-5" />
            </Anchor>
            <Anchor
              className="text-white"
              href="https://www.youtube.com/channel/UCImPGFdsVo3oGX_eIhwIMlA
"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="size-5" />
            </Anchor>
          </div>
        </div>
      </footer>
    </div>
  )
}
