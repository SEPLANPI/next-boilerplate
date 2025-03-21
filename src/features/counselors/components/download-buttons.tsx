'use client'
import { Download, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { DocumentosData } from '../api/get-meusDados'

export default function DownloadButtons(doc: DocumentosData) {
  return (
    <div className="flex gap-2">
      <Link href={doc.arquivo.url} target="_blank">
        <ExternalLink size={18} className="cursor-pointer stroke-1" />
      </Link>
      <Link href={`${doc.arquivo.url}`} download={'alou'} >
        <Download size={18} className="cursor-pointer stroke-1" />
      </Link>
    </div>
  )
}
