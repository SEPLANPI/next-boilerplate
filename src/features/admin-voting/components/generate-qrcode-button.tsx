'use client'

import React from 'react'
import QRCode from 'qrcode'
import { jsPDF } from 'jspdf'

const QRCodeButton = ({ buttonText = 'Download QR Code' }) => {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/votacao/23132131`
  const generateAndDownloadPDF = async () => {
    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 1344,
        margin: 2
      })

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const qrImage = new Image()
      qrImage.src = qrDataUrl

      await new Promise((resolve) => {
        qrImage.onload = () => {
          canvas.width = qrImage.width
          canvas.height = qrImage.height

          ctx.drawImage(qrImage, 0, 0, canvas.width, canvas.height)
          resolve()
        }

        qrImage.onerror = () => {
          console.error('Error loading QR code')
          resolve()
        }
      })

      const modifiedQrDataUrl = canvas.toDataURL('image/png')

      // Step 3: Create the PD
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      // Add title
      pdf.setFontSize(16)
      pdf.text('QR Code', 105, 20, { align: 'center' })

      // Add URL text
      pdf.setFontSize(12)
      pdf.text(`URL: ${url}`, 105, 30, { align: 'center' })

      const imgWidth = 210
      const imgHeight = 210
      const xPos = 0
      const yPos = 0

      pdf.addImage(modifiedQrDataUrl, 'PNG', xPos, yPos, imgWidth, imgHeight)

      pdf.save('qrcode.pdf')
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  return (
    <button
      onClick={generateAndDownloadPDF}
      className="rounded bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700"
    >
      {buttonText}
    </button>
  )
}

export default QRCodeButton
