'use client'

import React from 'react'
import QRCode from 'qrcode'
import { jsPDF } from 'jspdf'
import { Button } from '@mantine/core'
import { QrCode } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getActiveEvent } from '@/api/client/get-active-event'
import { notifications } from '@mantine/notifications'

export function QRCodeButton() {
  const [isGenerating, setIsGenerating] = React.useState(false)
  const { data: event, error } = useQuery({
    queryKey: ['active-event'],
    queryFn: getActiveEvent,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000
  })

  if (error) {
    notifications.show({
      id: 'event-error',
      title: 'Erro ao buscar evento',
      message: 'Não foi possível carregar o evento ativo',
      color: 'red'
    })
  }

  const url = event
    ? `${process.env.NEXT_PUBLIC_APP_URL}/votacao/evento/${event.id}`
    : ''
  const imageUrl = '/votacao/folder.png'

  const generateAndDownloadPDF = async () => {
    if (!event) {
      notifications.show({
        id: 'no-event',
        title: 'Nenhum evento ativo',
        message: 'É necessário ter um evento ativo para gerar o QR Code',
        color: 'red'
      })
      return
    }

    setIsGenerating(true)
    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 1344,
        margin: 2
      })

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = 2480
      canvas.height = 3508

      const bgImage = new Image()
      bgImage.src = imageUrl

      await new Promise<void>((resolve) => {
        bgImage.onload = async () => {
          ctx?.drawImage(bgImage, 0, 0, canvas.width, canvas.height)

          const qrImage = new Image()
          qrImage.src = qrDataUrl

          await new Promise<void>((qrResolve) => {
            qrImage.onload = () => {
              const qrSize = 1070
              const qrX = (canvas.width - qrSize) / 2
              const qrY = 2080

              ctx?.drawImage(qrImage, qrX, qrY, qrSize, qrSize)
              qrResolve()
            }
          })
          resolve()
        }
      })

      const finalImage = canvas.toDataURL('image/png')

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      pdf.addImage(finalImage, 'PNG', 0, 0, 210, 297)

      pdf.save(`${event.nome} - QR code votação.pdf`)
    } catch (error) {
      console.error('Error generating QR code:', error)
      notifications.show({
        id: 'qr-error',
        title: 'Erro ao gerar QR Code',
        message: 'Ocorreu um erro ao gerar o QR Code',
        color: 'red'
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      onClick={generateAndDownloadPDF}
      variant="default"
      size="xs"
      leftSection={<QrCode className="size-4" />}
      disabled={!event}
      loading={isGenerating}
    >
      Gerar QR Code
    </Button>
  )
}
