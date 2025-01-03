import { $fetch } from 'ofetch'

export const fetch = (config) => {
  const defaultOptions = {
    baseURL: process.env.BACKEND_HOST,
    credentials: 'include',
    timeout: 600000,
    headers: {}
  }

  return $fetch(config.url, {
    ...defaultOptions,
    ...config
  })
} 