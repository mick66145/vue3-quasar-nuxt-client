import { useUser } from '@/stores/user'
import { getToken } from '@core/utils/auth'
import useEnv from '@/composables/useEnv'
import useNotify from '@/composables/useNotify'
import useLogout from '@/composables/useLogout'

export default function useCustomFetch() {
  const createFetchOptions = (options = {}) => {
    const { VITE_BACKEND_HOST } = useEnv()
    const storeUser = useUser()
    // 基本配置
    const defaultOptions = {
      baseURL: VITE_BACKEND_HOST,
      credentials: 'include',
      timeout: 600000,
      headers: {}
    }

    // 添加認證信息
    if (storeUser.token && !options.headers?.['Skip-Token']) {
      defaultOptions.headers['X-Token'] = getToken()
      defaultOptions.headers.Authorization = `Bearer ${getToken()}`
    }

    // 處理 GET 請求參數
    if (options.params) {
      const cleanParams = Object.fromEntries(
        Object.entries(options.params).filter(([_, value]) =>
          value !== undefined && value !== null
        )
      )
      options.params = cleanParams
    }

    return {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    }
  }

  const handleError = (error) => {
    const { notifyAPIError } = useNotify()

    if (error.statusCode) {
      return Promise.reject(error)
    }

    if (!window.navigator.onLine) {
      notifyAPIError({ message: '網絡有些問題。請重新加載' })
    }

    return Promise.reject(error)
  }

  const handleAuthError = (error) => {
    if (error.statusCode !== 401) return Promise.reject(error)

    if (error.data?.code === 4010000) {
      const { resetStore } = useLogout()
      resetStore()
    }
    return Promise.reject(error)
  }

  const handleResponse = (response) => {
    if (process.server) {
      return Promise.resolve(response.data.value);
    } else {
      return Promise.resolve(response)
    }
  }

  const fetchData = async (url, options = {}) => {
    try {
      let response = null
      if (process.server) {
        response = await useFetch(url, createFetchOptions(options))
      } else {
        response = await $fetch(url, createFetchOptions(options))
      }
      return handleResponse(response)
    } catch (error) {
      handleAuthError(error)
      handleError(error)
      throw error
    }
  }

  return {
    fetch: fetchData
  }
}