import { useState } from 'react'
import { notifications } from '@mantine/notifications'

export function useClipboard(timeout = 500) {
  const [copied, setCopied] = useState(false)

  async function copy(text: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), timeout)
        return
      }

      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.top = '0'
      textArea.style.left = '0'
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'

      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        const successful = document.execCommand('copy')
        if (!successful) throw new Error('Copy command failed')
        setCopied(true)
        setTimeout(() => setCopied(false), timeout)
      } finally {
        document.body.removeChild(textArea)
      }
    } catch (err) {
      console.error('Failed to copy:', err)
      notifications.show({
        message: 'Não foi possível copiar o texto',
        color: 'red'
      })
    }
  }

  return { copied, copy }
}
