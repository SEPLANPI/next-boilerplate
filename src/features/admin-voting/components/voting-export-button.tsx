'use client'
import { buildParams } from '@/lib/api-utils'
import { clientApi } from '@/lib/client-api'
import { Button } from '@mantine/core'
import { Download } from 'lucide-react'
import { useParams } from 'next/navigation'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { useState } from 'react'

export default function VotingExportButton() {
  const { eventId } = useParams<{ eventId: string }>()
  const [loading, setLoading] = useState(false)
  const [axis] = useQueryState('eixo', parseAsArrayOf(parseAsString))

  async function handleExport() {
    try {
      setLoading(true)

      const params = buildParams({
        eixo: axis,
        evento_id: eventId
      })

      const response = await clientApi.get(
        `/exportar-votacao/resultados/excel/?${params.toString()}`
      )

      const today = new Date().toISOString().split('T')[0]
      const fileName = `dados-votacao-${today}.xlsx`
      if (!response.ok) {
        throw new Error(`Erro ao baixar arquivo: ${response.statusText}`)
      }

      const blob = await response.blob()

      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', fileName)

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Erro ao exportar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      size="xs"
      leftSection={<Download className="size-3" />}
      onClick={handleExport}
      loading={loading}
    >
      Baixar Planilha
    </Button>
  )
}
