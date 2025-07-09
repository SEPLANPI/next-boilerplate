import { useState } from 'react'
import { api } from '@/lib/api'

interface UseDownloadBlobOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

interface UseDownloadBlobReturn {
  downloadBlob: (
    url: string,
    filename: string,
    params?: Record<string, string | number | boolean | string[] | undefined>
  ) => Promise<void>
  isLoading: boolean
  error: Error | null
}

/**
 * Custom hook for downloading blobs from API endpoints
 * @param options - Optional callbacks for success and error handling
 * @returns Object with downloadBlob function, loading state, and error state
 */
export function useDownloadBlob(
  options: UseDownloadBlobOptions = {}
): UseDownloadBlobReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const downloadBlob = async (
    url: string,
    filename: string,
    params?: Record<string, string | number | boolean | string[] | undefined>
  ): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      const response = (await api.get(url, {
        raw: true,
        params
      })) as Response

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`)
      }

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', filename)

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(downloadUrl)

      options.onSuccess?.()
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Download failed')
      setError(error)
      options.onError?.(error)
      console.error('Error downloading file:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    downloadBlob,
    isLoading,
    error
  }
}
