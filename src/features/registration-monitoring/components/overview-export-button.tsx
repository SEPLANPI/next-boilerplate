'use client'
import { clientApi } from '@/lib/client-api'
import { Button, Menu, Text } from '@mantine/core'
import { Download } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

type FileType = {
  tipo: 'plenaria' | 'oficinas' | 'geral'
}

export default function ExportButton() {
  const { eventId } = useParams<{ eventId: string }>()
  const [opened, setOpened] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleExport({ tipo }: FileType) {
    try {
      setLoading(true)

      const response = await clientApi.get(
        `/exportar/${tipo}/excel/?evento_id=${eventId}`
      )

      const today = new Date().toISOString().split('T')[0]
      const fileName = `dados-${tipo}-${today}.xlsx`
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
      setOpened(false)
    }
  }

  return (
    <div className="mb-6 flex w-full items-center justify-end">
      <Menu
        opened={opened}
        onChange={setOpened}
        shadow="md"
        width={200}
        position="bottom-end"
      >
        <Menu.Target>
          <Button
            leftSection={<Download className="size-4" />}
            onClick={() => setOpened((o) => !o)}
            loading={loading}
          >
            Baixar Planilha
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => handleExport({ tipo: 'geral' })}>
            <Text size="sm">Todas as Inscrições</Text>
          </Menu.Item>
          <Menu.Item onClick={() => handleExport({ tipo: 'oficinas' })}>
            <Text size="sm">Oficinas</Text>
          </Menu.Item>
          <Menu.Item onClick={() => handleExport({ tipo: 'plenaria' })}>
            <Text size="sm">Apenas Plenária</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}
