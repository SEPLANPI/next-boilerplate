import { Card } from '@/features/landing-page/components/card'
import { Header } from '@/features/landing-page/components/header'
import { Section } from '@/features/landing-page/components/section'
import { Button, Anchor } from '@mantine/core'
import {
  BookOpen,
  Calendar,
  Check,
  FileText,
  HeartPulse,
  Instagram,
  Landmark,
  Leaf,
  ListChecks,
  Mail,
  MapPin,
  Presentation,
  School,
  ShieldCheck,
  TrendingUp,
  Users,
  Youtube
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Carousel, CarouselSlide } from '@mantine/carousel'
import { TitleBadge } from '@/features/landing-page/components/title-badge'

function CheckListItem({ children }: PropsWithChildren) {
  return (
    <li className="flex gap-2">
      <span className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-lime-600">
        <Check className="size-4 text-white" />
      </span>
      <span>{children}</span>
    </li>
  )
}



export default function LandingPage() {
  return (
    <div className="overflow-x-clip text-sm text-stone-600 sm:text-lg">
      <section className="relative flex h-[360px] flex-col p-8 sm:h-[420px] md:h-[660px] md:py-0">
        <Header />
        <main className="relative z-10 mx-auto mt-10 flex w-full max-w-[1120px] flex-1 flex-col justify-center gap-4 text-white">
          <h1 className="max-w-xs text-2xl font-bold md:max-w-md md:text-4xl">
            O futuro do Piauí começa onde você está
          </h1>
          <p className="max-w-xs text-sm md:max-w-md md:text-lg">
            Estamos no território{' '}
            <span className="font-semibold">Carnaubais</span> para ouvir você e
            construir juntos os próximos passos do nosso estado.
          </p>
          <Button
            component={Link}
            href="/inscrever-se"
            color="#C5D300"
            className="w-fit font-sans text-gray-900"
          >
            Quero Participar do Evento
          </Button>
        </main>
        <Image
          className="absolute left-0 top-0 z-0 hidden h-full object-cover sm:block"
          src="/lp/banner.png"
          quality={100}
          priority
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
      {/* <Section
        id="onde-estamos"
        spacing="lg"
        containerClassName="bg-lime-50 p-6 sm:p-12 rounded-xl grid grid-cols-1 gap-8 sm:grid-cols-2"
      >
        <div className="flex flex-col items-start space-y-4 sm:space-y-8">
          <TitleBadge className="hidden sm:block">
            ONDE ESTAMOS AGORA
          </TitleBadge>
          <div className="flex flex-col space-y-3">
            <h2 className="text-[22px] font-semibold text-lime-700 sm:text-[29px]">
              Cocais
            </h2>
            <div className="flex flex-col space-y-2">
              <p>Piripiri é o coração do Cocais!</p>
              <p>
                <span className="font-semibold">Venha participar</span> de um{' '}
                <span className="font-semibold">evento único</span> , que traz o
                governo mais perto de você. Aproveite para se engajar nas
                discussões, fazer novas conexões e contribuir para o futuro da
                nossa região.
              </p>
              <p>
                Não perca a chance de ter acesso a serviços gratuitos,
                participar das oficinas de planejamento e enviar propostas que
                moldarão o futuro do Piauí.
              </p>
            </div>
          </div>
          <Button
            component={Link}
            href="/inscrever-se"
            color="#C5D300"
            className="w-fit font-sans text-gray-900"
          >
            Quero garantir minha vaga
          </Button>
        </div>
        <div className="relative col-start-1 row-start-1 sm:col-start-2">
          <TitleBadge className="block sm:hidden">
            ONDE ESTAMOS AGORA
          </TitleBadge>

          <Image
            src="/lp/mapa.svg"
            alt="Mapa do Piauí com destaque para o Vale do Rio Guaribas"
            width={434}
            height={611}
            quality={100}
            className="mx-auto w-3/5 sm:absolute sm:right-0 sm:top-1/2 sm:w-full sm:-translate-y-1/2"
          />
        </div>
      </Section>
      <Section className="relative">
        <Image
          src="/lp/bg-servicos.png"
          fill
          alt="Fundo com icones"
          className="absolute -z-10 object-cover"
        />
        <div className="flex flex-col gap-8 md:col-span-2">
          <h2 className="mx-auto text-center text-[22px] font-bold leading-[32px] xs:text-[34px] xs:leading-[46px] sm:text-[46px] sm:leading-[56px]">
            <span className="block">Veja o que preparamos para</span>
            <span className="block">
              você em{' '}
              <span className="relative italic">
                Piripiri
                <Image
                  src="/lp/city-highlight.svg"
                  className="absolute right-0 top-4 -z-10 w-[calc(100%+16px)]"
                  alt="Linha"
                  width={260}
                  height={76}
                />
              </span>
            </span>
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-6 rounded-lg border border-stone-100 bg-white p-8">
              <h3 className="flex items-start gap-2">
                <span className="text-6xl font-bold text-lime-600">25</span>
                <span className="mt-2 text-4xl font-bold">abr</span>
              </h3>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-semibold">Feira de Seviços</h4>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="size-4 flex-shrink-0 text-lime-600" />
                  <span>8h às 12h e 16h às 20h</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <MapPin className="size-4 flex-shrink-0 text-lime-600" />
                  <span>
                    Praça da Bandeira, em frente à Igreja Matriz Nossa Senhora
                    dos Remédios
                  </span>
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-semibold">Capacitações Setoriais</h4>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="size-4 flex-shrink-0 text-lime-600" />
                  <span>8h às 12h e 14h às 18h</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <MapPin className="size-4 flex-shrink-0 text-lime-600" />
                  <span>Faculdade Chrisfapi</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-6 rounded-lg border border-stone-100 bg-white p-8">
              <h3 className="flex items-start gap-2">
                <span className="text-6xl font-bold text-lime-600">26</span>
                <span className="mt-2 text-4xl font-bold">abr</span>
              </h3>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-semibold">Feira de Seviços</h4>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="size-4 flex-shrink-0 text-lime-600" />
                  <span>8h às 12h e 16h às 20h</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <MapPin className="size-4 flex-shrink-0 text-lime-600" />
                  <span>
                    Praça da Bandeira, em frente à Igreja Matriz Nossa Senhora
                    dos Remédios
                  </span>
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-semibold">
                  Oficinas de Planejamento Participativo
                </h4>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="size-4 flex-shrink-0 text-lime-600" />
                  <span>8h às 13h</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <MapPin className="size-4 flex-shrink-0 text-lime-600" />
                  <span>Faculdade Chrisfapi</span>
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-semibold">Plenária com o Governador</h4>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="size-4 flex-shrink-0 text-lime-600" />
                  <span>15h às 17h</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <MapPin className="size-4 flex-shrink-0 text-lime-600" />
                  <span>AABB de Piripiri</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section
        className="relative bg-green-900 !py-6"
        containerClassName="flex justify-between items-center gap-5 sm:flex-row flex-col "
      >
        <Image
          src="/lp/cta-servicos-bg.png"
          fill
          alt="Fundo com icones"
          className="object-cover"
        />
        <h4 className="text-lg font-semibold text-white sm:text-xl">
          Conheça os serviços disponíveis no evento.
        </h4>
        <Button
          variant="outline"
          color="lime.1"
          component={Link}
          href="/lp/feira_de_servicos.pdf"
          target="_blank"
        >
          Ver tudo que me espera
        </Button>
      </Section> */}
      <Section
        className="bg-stone-50"
        containerClassName="text-center flex flex-col items-center"
      >
        <h2 className="md:16 mx-auto mb-8 text-center text-[22px] font-semibold leading-[32px] xs:text-[34px] xs:leading-[46px] sm:text-[46px] sm:leading-[56px]">
          <span className="text-lime-600">Por que</span> participar do Diálogos
          pelo Piauí?
        </h2>
        <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-4">
          <div className="flex flex-col items-center space-y-5 rounded-lg bg-white px-6 py-8">
            <Image
              src="/lp/icons/hand-coins.svg"
              alt="Icone mão com moedas"
              width={48}
              height={48}
            />
            <p>Acesso a serviços gratuitos</p>
          </div>
          <div className="flex flex-1 flex-col items-center space-y-5 rounded-lg bg-white px-6 py-8">
            <Image
              src="/lp/icons/megaphone.svg"
              alt="Icone megafone"
              width={48}
              height={48}
            />
            <p>Envio de propostas para o futuro do seu território</p>
          </div>
          <div className="flex flex-1 flex-col items-center space-y-5 rounded-lg bg-white px-6 py-8">
            <Image
              src="/lp/icons/book-open-check.svg"
              alt="Icone livro"
              width={48}
              height={48}
            />
            <p>Participação nas decisões do governo</p>
          </div>
          <div className="flex flex-1 flex-col items-center space-y-5 rounded-lg bg-white px-6 py-8">
            <Image
              src="/lp/icons/users.svg"
              alt="Icone usuários"
              width={48}
              height={48}
            />
            <p>Conheça outras lideranças e cidadãos</p>
          </div>
        </div>
      </Section>
      <Section className="relative !py-0">
        <div className="absolute left-0 top-0 -z-10 h-1/2 w-full bg-stone-50"></div>
        <div className="relative flex flex-col items-center space-y-8 rounded-xl bg-lime-700 px-6 py-20 text-center sm:px-8">
          <Image
            src="/lp/cta-inscricao-bg.png"
            fill
            alt="Fundo com icones"
            className="object-cover"
          />
          <div className="max-w-[718px]">
            <h2 className="mb-5 text-[22px] font-semibold text-white sm:text-[29px]">
              Inscreva-se agora e faça parte dessa transformação!
            </h2>
            <p className="text-white">
              Não perca a chance de contribuir para o futuro do nosso estado!
              Inscreva-se para participar das oficinas, feiras de serviços e
              muito mais.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Button
              color="lime.2"
              className="text-stone-950"
              component={Link}
              href="/inscrever-se"
            >
              Quero me inscrever agora
            </Button>
          </div>
        </div>
      </Section>

      <Section id="sobre">
        <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 md:grid-cols-3">
          <Image
            className="h-full rounded-md object-cover"
            src="/lp/senhor-fundo-verde.png"
            width={900}
            height={900}
            quality={100}
            alt="Senhor com paisagem verde ao fundo com caixas verdes ao lado"
          />
          <div className="flex flex-col gap-8 md:col-span-2">
            <TitleBadge>O QUE É?</TitleBadge>
            <h2 className="text-xl font-semibold md:text-4xl">
              <span className="block">Diálogos pelo Piauí:</span>
              <span>O Governo mais perto de você</span>
            </h2>
            <p className="text-sm sm:text-base">
              O <span className="font-semibold">Diálogos pelo Piauí</span> é uma
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
        </div>
      </Section>
      <Section
        id="como-funciona"
        className="bg-green-900 text-white"
        containerClassName="flex flex-col items-center"
      >
        <h2 className="mx-auto mb-8 text-center text-[22px] font-semibold leading-[32px] xs:text-[34px] xs:leading-[46px] sm:text-[46px] sm:leading-[56px] md:mb-16">
          Como Funciona o Evento
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <Card.Root className="border border-white/20 bg-white/15 text-white">
            <Card.Icon className="bg-white/15">
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
            className="row-span-2 hidden h-full rounded-md object-cover object-right md:block"
            alt="Imagens do evento"
            src="/lp/como-funciona.jpg"
            width={704}
            height={1064}
            quality={100}
          />
          <Card.Root className="border border-white/20 bg-white/15 text-white">
            <Card.Icon className="bg-white/15">
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
          <Card.Root className="border border-white/20 bg-white/15 text-white">
            <Card.Icon className="bg-white/15">
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
          <Card.Root className="border border-white/20 bg-white/15 text-white">
            <Card.Icon className="bg-white/15">
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
      <Section className="!pb-0" spacing="lg">
        <h2 className="mb-8 text-[22px] font-semibold leading-[32px] xs:text-[34px] xs:leading-[46px] sm:text-[46px] sm:leading-[56px] md:mb-16">
          Cronograma
        </h2>
      </Section>
      <div className="mb-32 w-screen sm:mb-36 md:mb-[200px]">
        <div>
          <Carousel
            initialSlide={2}
            height={260}
            slideSize="260px"
            slideGap="md"
            align="start"
            dragFree
            withControls={false}
            classNames={{
              root: 'overflow-visible',
              viewport:
                'overflow-visible px-[max(2rem,calc((100vw-1120px)/2))]',
              container: 'overflow-visible'
            }}
          >
            <CarouselSlide>
              <div className="flex h-[260px] w-full flex-col justify-between rounded-md bg-stone-50 p-6">
                <div>
                  <div className="space-x-2 font-bold leading-tight">
                    <span className="text-[64px]">11</span>
                    <span className="text-[40px]">e</span>
                    <span className="text-[64px]">12</span>
                  </div>
                  <span className="text-sm font-bold uppercase">ABRIL</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-bold uppercase">
                    VALE DO RIO GUARIBAS
                  </span>
                  <span className="text-sm">Picos</span>
                </div>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex h-[260px] w-full flex-col justify-between rounded-md bg-stone-50 p-6">
                <div>
                  <div className="space-x-2 font-bold leading-tight">
                    <span className="text-[64px]">25</span>
                    <span className="text-[40px]">e</span>
                    <span className="text-[64px]">26</span>
                  </div>
                  <span className="text-sm font-bold uppercase">ABRIL</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-bold uppercase">COCAIS</span>
                  <span className="text-sm">Piripiri</span>
                </div>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex h-[260px] w-full flex-col justify-between rounded-md bg-lime-600 p-6 text-white">
                <div>
                  <div className="space-x-2 font-bold leading-tight">
                    <span className="text-[64px]">16</span>
                    <span className="text-[40px]">e</span>
                    <span className="text-[64px]">17</span>
                  </div>
                  <span className="text-sm font-bold uppercase">MAIO</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-bold uppercase">CARNAUBAIS</span>
                  <span className="text-sm">Campo Maior</span>
                </div>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex h-[260px] w-full flex-col justify-between rounded-md bg-stone-50 p-6">
                <div>
                  <div className="space-x-2 font-bold leading-tight">
                    <span className="text-[64px]">30</span>
                    <span className="text-[40px]">e</span>
                    <span className="text-[64px]">31</span>
                  </div>
                  <span className="text-sm font-bold uppercase">MAIO</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-bold uppercase">
                    VALE DOS RIOS PIAUÍ E ITAUEIRAS
                  </span>
                  <span className="text-sm">Floriano</span>
                </div>
              </div>
            </CarouselSlide>

            <CarouselSlide>
              <div className="flex h-[260px] w-full flex-col justify-between rounded-md bg-stone-50 p-6">
                <div>
                  <div className="space-x-2 font-bold leading-tight">
                    <span className="text-[64px]">13</span>
                    <span className="text-[40px]">e</span>
                    <span className="text-[64px]">14</span>
                  </div>
                  <span className="text-sm font-bold uppercase">JUNHO</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-bold uppercase">
                    TABULEIROS DO ALTO PARNAÍBA
                  </span>
                  <span className="text-sm">Uruçuí</span>
                </div>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex h-[260px] w-full flex-col justify-between rounded-md bg-stone-50 p-6">
                <div>
                  <div className="space-x-2 font-bold leading-tight">
                    <span className="text-[64px]">27</span>
                    <span className="text-[40px]">e</span>
                    <span className="text-[64px]">28</span>
                  </div>
                  <span className="text-sm font-bold uppercase">JUNHO</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-bold uppercase">
                    CHAPADA DAS MANGABEIRAS
                  </span>
                  <span className="text-sm">Bom Jesus</span>
                </div>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex h-[260px] w-full flex-col justify-between rounded-md bg-stone-50 p-6">
                <div>
                  <div className="space-x-2 font-bold leading-tight">
                    <span className="text-[64px]">11</span>
                    <span className="text-[40px]">e</span>
                    <span className="text-[64px]">12</span>
                  </div>
                  <span className="text-sm font-bold uppercase">JULHO</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-bold uppercase">
                    PLANÍCIE LITORÂNEA
                  </span>
                  <span className="text-sm">Parnaíba</span>
                </div>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex h-[260px] w-full flex-col justify-between rounded-md bg-stone-50 p-6">
                <div>
                  <div className="space-x-2 font-bold leading-tight">
                    <span className="text-[64px]">25</span>
                    <span className="text-[40px]">e</span>
                    <span className="text-[64px]">26</span>
                  </div>
                  <span className="text-sm font-bold uppercase">JULHO</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-bold uppercase">SERRA DA CAPIVARA</span>
                  <span className="text-sm">São Raimundo Nonato</span>
                </div>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex h-[260px] w-full flex-col justify-between rounded-md bg-stone-50 p-6">
                <div>
                  <div className="space-x-2 font-bold leading-tight">
                    <span className="text-[64px]">08</span>
                    <span className="text-[40px]">e</span>
                    <span className="text-[64px]">09</span>
                  </div>
                  <span className="text-sm font-bold uppercase">AGOSTO</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-bold uppercase">VALE DO CANINDÉ</span>
                  <span className="text-sm">Oeiras</span>
                </div>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex h-[260px] w-full flex-col justify-between rounded-md bg-stone-50 p-6">
                <div>
                  <div className="space-x-2 font-bold leading-tight">
                    <span className="text-[64px]">22</span>
                    <span className="text-[40px]">e</span>
                    <span className="text-[64px]">23</span>
                  </div>
                  <span className="text-sm font-bold uppercase">AGOSTO</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-bold uppercase">
                    CHAPADA DO VALE ITAIM
                  </span>
                  <span className="text-sm">Paulistana</span>
                </div>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex h-[260px] w-full flex-col justify-between rounded-md bg-stone-50 p-6">
                <div>
                  <div className="space-x-2 font-bold leading-tight">
                    <span className="text-[64px]">05</span>
                    <span className="text-[40px]">e</span>
                    <span className="text-[64px]">06</span>
                  </div>
                  <span className="text-sm font-bold uppercase">SETEMBRO</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-bold uppercase">VALE DO SAMBITO</span>
                  <span className="text-sm">Valença</span>
                </div>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex h-[260px] w-full flex-col justify-between rounded-md bg-stone-50 p-6">
                <div>
                  <div className="space-x-2 font-bold leading-tight">
                    <span className="text-[64px]">19</span>
                    <span className="text-[40px]">e</span>
                    <span className="text-[64px]">20</span>
                  </div>
                  <span className="text-sm font-bold uppercase">SETEMBRO</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-bold uppercase">ENTRE RIOS</span>
                  <span className="text-sm">Teresina</span>
                </div>
              </div>
            </CarouselSlide>
          </Carousel>
        </div>
      </div>

      <Section id="como-participa" className="bg-lime-50">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-8 md:col-span-2">
            <TitleBadge>COMO PARTICIPAR?</TitleBadge>
            <h2 className="text-[22px] font-semibold sm:text-[29px]">
              Juntos, podemos construir um Piauí mais{' '}
              <span className="text-lime-600">inclusivo</span>,{' '}
              <span className="text-lime-600">sustentável</span> e{' '}
              <span className="text-lime-600">inovador</span>!
            </h2>
            <p className="text-sm sm:text-base">
              A participação no{' '}
              <span className="font-semibold">Diálogos pelo Piauí</span> é
              aberta a toda a sociedade. Veja como você pode contribuir:
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
            src="/lp/como-participar.png"
            width={900}
            height={900}
            quality={100}
            alt="Dentista com criança"
          />
        </div>
      </Section>

      <Section id="ppa" className="bg-lime-700 text-white">
        <div className="grid grid-cols-1 items-center gap-x-8 md:grid-cols-3">
          <h2 className="mx-auto mb-8 text-[22px] font-semibold leading-[32px] xs:text-[34px] xs:leading-[46px] sm:text-[46px] sm:leading-[56px] md:col-span-3 md:mb-16">
            Plano Plurianual
          </h2>
          <Image
            className="col-span-1 hidden h-full rounded-md object-cover md:block"
            src="/lp/ppa.png"
            width={900}
            height={900}
            quality={100}
            alt="Mulher com criança"
          />
          <div className="flex flex-col items-center gap-8 text-center md:col-span-2 md:items-start md:text-left">
            <div className="flex flex-col space-y-4">
              <p>
                O Plano Plurianual (PPA) é um instrumento de planejamento
                estratégico do governo, que define as diretrizes, objetivos,
                ações e metas para um período de quatro anos. Ele estabelece a
                visão de futuro e os investimentos prioritários do estado,
                garantindo o desenvolvimento sustentável e a inclusão social.
              </p>
              <p>
                Para o período 2024-2027, o PPA está estruturado em três
                dimensões:
              </p>
              <div className="flex flex-col gap-5">
                <Card.Root className="gap-2 border border-white/20 bg-white/15 px-4 py-3">
                  <Card.Title>Dimensão Estratégica</Card.Title>
                  <Card.Subtitle className="text-sm sm:text-lg">
                    Define a visão de futuro e os eixos estratégicos do governo.
                  </Card.Subtitle>
                </Card.Root>
                <Card.Root className="gap-2 border border-white/20 bg-white/15 px-4 py-3">
                  <Card.Title>Dimensão Tática</Card.Title>
                  <Card.Subtitle className="text-sm sm:text-lg">
                    Estabelece objetivos e diretrizes para os programas, com
                    metas e indicadores.
                  </Card.Subtitle>
                </Card.Root>
                <Card.Root className="gap-2 border border-white/20 bg-white/15 px-4 py-3">
                  <Card.Title>Dimensão Operacional</Card.Title>
                  <Card.Subtitle className="text-sm sm:text-lg">
                    Detalha ações, produtos e metas físicas e financeiras.
                  </Card.Subtitle>
                </Card.Root>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section id="eixos" containerClassName="flex flex-col items-center">
        <h2 className="mx-auto mb-8 text-center text-[22px] font-semibold leading-[32px] xs:text-[34px] xs:leading-[46px] sm:text-[46px] sm:leading-[56px] md:mb-16">
          Eixos Estratégicos
        </h2>
        <p className="max-w-3xl text-center text-sm xs:text-base">
          O planejamento está estruturado em sete eixos estratégicos, cada um
          focado em um aspecto essencial do desenvolvimento do estado.
        </p>
        <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-12">
          <Card.Root className="bg-white shadow-light sm:col-span-6 md:col-span-4">
            <Card.Icon className="bg-green-100">
              <Leaf className="size-4 text-green-800" />
            </Card.Icon>
            <Card.Title>Meio Ambiente</Card.Title>
            <Card.Subtitle>
              Eixo Mudanças Climáticas, Meio Ambiente e Recursos Hídricos
            </Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-white shadow-light sm:col-span-6 md:col-span-4">
            <Card.Icon className="bg-stone-100">
              <Landmark className="size-4 text-stone-800" />
            </Card.Icon>
            <Card.Title>Infraestrutura</Card.Title>
            <Card.Subtitle>
              Eixo Infraestrutura, Inclusão Produtiva e Transição Energética
            </Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-white shadow-light sm:col-span-4">
            <Card.Icon className="bg-yellow-100">
              <TrendingUp className="size-4 text-yellow-800" />
            </Card.Icon>
            <Card.Title>Desenvolvimento Econômico e Produtivo</Card.Title>
            <Card.Subtitle>Eixo Desenvolvimento Socioeconômico</Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-white shadow-light sm:col-span-4 md:col-span-3">
            <Card.Icon className="bg-blue-100">
              <BookOpen className="size-4 text-blue-800" />
            </Card.Icon>
            <Card.Title>Educação</Card.Title>
            <Card.Subtitle>
              Eixo Educação Inclusiva e de Qualidade
            </Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-white shadow-light sm:col-span-4 md:col-span-3">
            <Card.Icon className="bg-orange-100">
              <Users className="size-4 text-orange-800" />
            </Card.Icon>
            <Card.Title>Inclusão Social, Raça e Gênero</Card.Title>
            <Card.Subtitle>Eixo Redução das Desigualdades</Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-white shadow-light sm:col-span-6 md:col-span-3">
            <Card.Icon className="bg-emerald-100">
              <HeartPulse className="size-4 text-emerald-800" />
            </Card.Icon>
            <Card.Title>Saúde, Esporte, Cultura e Lazer</Card.Title>
            <Card.Subtitle>Eixo Saúde e Bem-Estar</Card.Subtitle>
          </Card.Root>
          <Card.Root className="bg-white shadow-light sm:col-span-6 md:col-span-3">
            <Card.Icon className="bg-red-100">
              <ShieldCheck className="size-4 text-red-800" />
            </Card.Icon>
            <Card.Title>Segurança Pública</Card.Title>
            <Card.Subtitle>Eixo Justiça e Segurança</Card.Subtitle>
          </Card.Root>
        </div>
      </Section>

      <Section
        id="participe"
        className="!pt-0"
        containerClassName="p-0 rounded-xl border border-stone-200 relative overflow-hidden"
      >
        <div className="flex items-center justify-between gap-8">
          <div className="flex max-w-2xl flex-col gap-4 p-8 md:col-span-2">
            <h2 className="text-[22px] font-semibold sm:text-[29px]">
              Participe do Diálogos pelo Piauí!
            </h2>
            <p className="text-sm sm:text-base">
              Inscreva-se agora e garanta sua vaga nas oficinas de Saúde, Meio
              Ambiente, Educação e muito mais. Vamos juntos debater e criar
              soluções para o Piauí!
            </p>
            <Button component={Link} href="/inscrever-se" className="w-fit">
              Quero participar
            </Button>
          </div>
          <Image
            className="absolute right-0 top-0 -z-10 h-full w-full object-cover"
            src="/lp/participar.png"
            width={900}
            height={900}
            quality={100}
            alt="Pessoas no evento do diálogos"
          />
        </div>
      </Section>
      <footer className="bg-stone-900 px-8 py-5 text-white">
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
