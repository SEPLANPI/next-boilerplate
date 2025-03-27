'use client'
import { CounselorInfo } from '@/features/counselors/types'

import { Download, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function DownloadButtons(doc: CounselorInfo['documentos'][0]) {
  return (
    <div className="flex gap-2">
      <Link href={doc.arquivo.url} target="_blank">
        <ExternalLink size={18} className="cursor-pointer stroke-1" />
      </Link>
      <Link href={`${doc.arquivo.url}`} download={'alou'}>
        <Download size={18} className="cursor-pointer stroke-1" />
      </Link>
    </div>
  )
}
