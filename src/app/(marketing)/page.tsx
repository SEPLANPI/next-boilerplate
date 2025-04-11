import { Card } from '@/features/landing-page/components/card'
import { Header } from '@/features/landing-page/components/header'
import { Section } from '@/features/landing-page/components/section'
import { AccordionControl, AccordionPanel, Divider } from '@mantine/core'
import { Accordion, AccordionItem, Anchor, Button } from '@mantine/core'
import {
  ArrowUpRight,
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
    <div className="text-stone-600 text-sm sm:text-lg">
      <section className="relative flex h-[360px] flex-col p-8 sm:h-[420px] md:h-[660px] md:py-0">
        <Header />
        <main className="relative z-10 mx-auto mt-10 flex w-full max-w-[1120px] flex-1 flex-col justify-center gap-4 text-white">
          <h1 className="max-w-xs text-2xl font-bold md:max-w-md md:text-4xl">
            O futuro do Piauí começa onde você está
          </h1>
          <p className="max-w-xs text-sm md:max-w-md md:text-lg">
            Estamos no território Vale do Guaribas para ouvir você e construir
            juntos os próximos passos do nosso estado.
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
      <div className="h-[144px]"></div>
      <Section containerClassName="bg-lime-50 p-6 sm:p-12 rounded-xl grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="flex flex-col items-start space-y-4 sm:space-y-8">
          <span className="hidden rounded-full border border-lime-600 bg-lime-100 px-2.5 py-1.5 text-[10px] font-bold text-lime-600 sm:block">
            ONDE ESTAMOS AGORA
          </span>
          <div className="flex flex-col space-y-3">
            <h2 className="text-[22px] font-bold text-lime-700 sm:text-[29px]">
              Vale dos Guaribas
            </h2>
            <div className="flex flex-col space-y-2">
              <p>Picos é o coração do Vale do Guaribas!</p>
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
          <span className="w-fit rounded-full border border-lime-600 bg-lime-100 px-2.5 py-1.5 text-[10px] font-bold text-lime-600 sm:hidden">
            ONDE ESTAMOS AGORA
          </span>
          <Image
            src="/lp/mapa.svg"
            alt="Mapa do Piauí com destaque para o Vale do Guaribas"
            width={434}
            height={611}
            quality={100}
            className="mx-auto w-3/5 sm:absolute sm:right-0 sm:top-1/2 sm:w-full sm:-translate-y-1/2"
          />
        </div>
      </Section>
      <div className="h-[144px]"></div>
      <Section>
        <div className="flex flex-col gap-8 md:col-span-2">
          <h2 className="mx-auto text-center text-[22px] font-bold leading-[32px] xs:text-[34px] xs:leading-[46px] sm:text-[46px] sm:leading-[56px]">
            <span className="block">Veja o que preparamos para</span>
            <span className="block">
              você em{' '}
              <span className="relative italic">
                Picos
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
          <Accordion
            unstyled
            multiple
            defaultValue={['feira']}
            classNames={{
              root: 'space-y-5',
              item: 'shadow-md p-6 sm:p-8 rounded-lg border border-gray-50',
              control:
                'flex items-center justify-between flex-row-reverse w-full text-[18px] sm:text-[29px]',
              panel: 'pt-6 text-sm sm:text-lg',
              content: 'space-y-6'
            }}
          >
            <AccordionItem value="feira">
              <AccordionControl>
                <div className="flex space-x-3">
                  <Image
                    src="/lp/icons/boxes.svg"
                    alt="Icone caixas"
                    width={32}
                    height={32}
                  />
                  <h3 className="text-left font-bold">Feira de Serviços</h3>
                </div>
              </AccordionControl>
              <AccordionPanel>
                Feira de serviços gratuitos para a população:
                <ul className="list-disc pl-8">
                  <li>
                    Emissão de documentos, vacinação, carreta da saúde, cursos
                    profissionalizantes, linha de crédito e muito mais
                  </li>
                </ul>
                <Divider />
                <div className="flex flex-col space-y-1.5">
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="size-4 text-lime-600" />
                    <span>Complexo Esportivo da COHAB</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="size-4 text-lime-600" />
                    <span>
                      <span className="font-semibold">11/04</span> das 8h às 17h
                    </span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="size-4 text-lime-600" />
                    <span>
                      <span className="font-semibold">12/04</span> das 8h às 17h
                    </span>
                  </span>
                </div>
                <Divider />
                <Link
                  className="flex items-center space-x-2 italic"
                  href="/lp/feira_de_servicos.pdf"
                  target="_blank"
                >
                  <span>Conheça os serviços</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="plenaria">
              <AccordionControl>
                <div className="flex space-x-3">
                  <Image
                    src="/lp/icons/presentation.svg"
                    alt="Icone apresentação"
                    width={32}
                    height={32}
                  />
                  <h3 className="text-left font-bold">
                    Plenária com o Governador
                  </h3>
                </div>
              </AccordionControl>
              <AccordionPanel>
                <p className="block">
                  Um momento de transparência e participação ativa entre governo
                  e população.
                </p>
                <Divider />
                <div className="flex flex-col space-y-1.5">
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="size-4 text-lime-600" />
                    <span>
                      <span className="font-semibold">Espaço Versalhes:</span>{' '}
                      Rua Projetada, 278, Bairro Aroeriras do Matadouro
                    </span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="size-4 text-lime-600" />
                    <span>
                      <span className="font-semibold">12/04</span> das 14h às
                      17h
                    </span>
                  </span>
                </div>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="oficinas">
              <AccordionControl>
                <div className="flex space-x-3">
                  <Image
                    src="/lp/icons/lightbulb.svg"
                    alt="Icone caixas"
                    width={32}
                    height={32}
                  />
                  <h3 className="text-left font-bold">Oficinas PPA</h3>
                </div>
              </AccordionControl>
              <AccordionPanel>
                <p className="block">
                  Educação, saúde, meio ambiente, socioeconômico,
                  infraestrutura, tecnologia, segurança e outros temas
                  fundamentais para o futuro do Vale do Guaribas e do Piauí,
                  discutidos com seriedade e compromisso por técnicos, gestores
                  e pelo povo.
                </p>
                <Divider />
                <div className="flex flex-col space-y-1.5">
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="size-4 text-lime-600" />
                    <span>UFPI</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="size-4 text-lime-600" />
                    <span>
                      <span className="font-semibold">12/04</span> das 8h às
                      12h30
                    </span>
                  </span>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>
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
        className="!py-0"
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
      <Section id="sobre" className="relative">
        <Image
          className="absolute left-0 top-0 z-0 h-full object-cover"
          src="/lp/bg-participar.png"
          sizes={'100vw'}
          quality={100}
          fill
          alt="uma senhora e um senhor em um gradiente azul claro e escuro com as listras do piauí"
        />
        <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 md:grid-cols-3">
          <Image
            className="h-full rounded-md object-cover"
            src="/lp/senhora-bola-verde.png"
            width={900}
            height={900}
            quality={100}
            alt="Senhora sorrindo em fundo verde e logo do diálogos ao lado"
          />
          <div className="flex flex-col gap-4 md:col-span-2">
            <h2 className="text-xl font-bold md:text-4xl">
              Participe do Diálogos pelo Piauí!
            </h2>
            <p className="text-sm sm:text-base">
              Inscreva-se agora e garanta sua vaga nas oficinas de Saúde, Meio
              Ambiente, Educação e muito mais. Vamos juntos debater e criar
              soluções para o Piauí!
            </p>
            <Button
              component={Link}
              href="/inscrever-se"
              className="w-fit font-sans"
            >
              Quero participar
            </Button>
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
