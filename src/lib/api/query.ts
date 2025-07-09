import { ApiResponse } from './client'

export const asQuery =
  <T>(apiCall: () => Promise<ApiResponse<T>>) =>
  async (): Promise<T | null> => {
    const { data, error } = await apiCall()

    if (error) {
      throw error
    }

    return data
  }
