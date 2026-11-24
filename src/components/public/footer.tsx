import Image from "next/image"
import Link from "next/link"
import { Instagram, Mail, Youtube } from "lucide-react"
import { Anchor, Container } from "@mantine/core"

export function Footer() {
  return (
    <footer className="bg-stone-900 px-8 py-5 text-white">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Link href="https://www.seplan.pi.gov.br/" target="_blank">
          <Image
            src="/logo-seplan-white.svg"
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
      </Container>
    </footer>
  )
}
