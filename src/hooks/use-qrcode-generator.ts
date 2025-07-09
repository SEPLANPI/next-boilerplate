import { useState } from 'react'
import QRCode from 'qrcode'
import { jsPDF } from 'jspdf'
import { notifications } from '@mantine/notifications'

interface QRCodeOptions {
  url: string
  backgroundImagePath?: string
  orientation?: 'portrait' | 'landscape'
  qrSize?: number
  qrPositionX?: number
  qrPositionY?: number
  title?: string
  fileName?: string
}

export function useQRCodeGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateAndDownloadPDF = async ({
    url,
    backgroundImagePath,
    orientation = 'portrait',
    qrSize = 1070,
    qrPositionX,
    qrPositionY = 2080,
    title,
    fileName = 'Diálogos - QR code'
  }: QRCodeOptions) => {
    setIsGenerating(true)

    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 1344,
        margin: 2
      })

      const pdf = new jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: 'a4'
      })

      if (backgroundImagePath) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const bgImage = new Image()
        bgImage.src = backgroundImagePath

        await new Promise<void>((resolve) => {
          bgImage.onload = async () => {
            // Set canvas dimensions based on orientation
            if (orientation === 'landscape') {
              canvas.width = 3508 // A4 landscape width
              canvas.height = 2480 // A4 landscape height
            } else {
              canvas.width = 2480 // A4 portrait width
              canvas.height = 3508 // A4 portrait height
            }

            ctx?.drawImage(bgImage, 0, 0, canvas.width, canvas.height)

            const qrImage = new Image()
            qrImage.src = qrDataUrl

            await new Promise<void>((qrResolve) => {
              qrImage.onload = () => {
                const actualQrPositionX =
                  qrPositionX ?? (canvas.width - qrSize) / 2

                // Adjust QR position for landscape if not explicitly set
                const actualQrPositionY =
                  orientation === 'landscape' && qrPositionY === 2080
                    ? (canvas.height - qrSize) / 2 // Center vertically for landscape
                    : qrPositionY

                ctx?.drawImage(
                  qrImage,
                  actualQrPositionX,
                  actualQrPositionY,
                  qrSize,
                  qrSize
                )
                qrResolve()
              }
            })

            // Generate final image and add to PDF
            const finalImage = canvas.toDataURL('image/png')
            // Adjust PDF dimensions based on orientation
            if (orientation === 'landscape') {
              pdf.addImage(finalImage, 'PNG', 0, 0, 297, 210) // A4 landscape: 297x210mm
            } else {
              pdf.addImage(finalImage, 'PNG', 0, 0, 210, 297) // A4 portrait: 210x297mm
            }

            resolve()
          }
        })
      }
      // If no background, create a simple PDF with the QR code
      else {
        // Add title if provided
        if (title) {
          pdf.setFontSize(24)
          pdf.text(title, 105, 30, { align: 'center' })
        }

        // Add QR code
        const simpleQrSize = 150
        pdf.addImage(
          qrDataUrl,
          'PNG',
          (210 - simpleQrSize) / 2,
          60,
          simpleQrSize,
          simpleQrSize
        )

        // Add instructions
        pdf.setFontSize(14)
        pdf.text('Escaneie o QR Code', 105, 230, { align: 'center' })
        pdf.text(`URL: ${url}`, 105, 245, { align: 'center' })
      }

      pdf.save(`${fileName}.pdf`)

      notifications.show({
        id: 'qr-success',
        title: 'QR Code gerado com sucesso',
        message: 'O QR Code foi gerado e baixado',
        color: 'green'
      })
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

  return {
    isGenerating,
    generateAndDownloadPDF
  }
}
