import { ref, onMounted } from 'vue'
import useSessionStorage from './useSessionStorage'
import mapKeys from 'lodash-es/mapKeys'

export default function useServerDataTable({
  searchParames = {},
  sortParames = [], // [{field:string,order:true|false}]
  unSessionStorageParames = [], // [{field:string}]
  sessionStorageKey = 'dashboardServerDataTable',
  usePageSize = true,
  callback = () => { },
}) {
  const { setSessionStorage, getSessionStorage } = useSessionStorage()
  const search = useState(() => ({
    ...searchParames,
    page: 1,
    page_size: usePageSize ? 10 : null,
    orderby: sortParames.length > 0 ? sortParames.map((item) => `${item.field}:${item.order}`).join(',') : null,
  }))
  const data = useState(() => [])
  const total = useState(() => 0)
  const sort = ref(sortParames)

  if (process.client) {
    const sessionStorage = getSessionStorage(sessionStorageKey)
    const unSessionStorageParamesField = unSessionStorageParames.map((item) => item.field)

    onMounted(() => {
      if (!sessionStorage) {
        const sessionStorageObj = {
          search: { ...search.value, },
          sort: sortParames,
        }
        setSessionStorage(sessionStorageKey, sessionStorageObj)
      } else {
        const storedSearch = sessionStorage.search || {}
        Object.assign({ ...search.value, }, storedSearch)
      }
      setCallback()
    })
  }

  const onChangePage = (page) => {
    if (process.client) {
      search.value.page = page
      setSessionStorage(sessionStorageKey, { ...search.value, })
      setCallback()
    }
  }

  const onChangePageSize = (pageSize) => {
    if (process.client) {
      search.value.page_size = pageSize
      setSessionStorage(sessionStorageKey, { ...search.value, })
      setCallback()
    }
  }

  const onChangeFilter = () => {
    if (process.client) {
      search.value.page = 1
      setSessionStorage(sessionStorageKey, { ...search.value, })
      setCallback()
    }
  }

  const onReset = () => {
    if (process.client) {
      for (const [key, value] of Object.entries(searchParames)) {
        search.value[key] = value
      }
      search.value.page = 1
      usePageSize && (search.value.page_size = 10)
      search.value.orderby = sortParames.length > 0 ? sortParames.map((item) => `${item.field}:${item.order}`).join(',') : null
      sort.value = sortParames
      setSessionStorage(sessionStorageKey, { ...search.value, })
      setCallback()
    }
  }

  const onRefresh = () => {
    if (process.client) {
      setCallback()
    }
  }

  const setCallback = async () => {
    if (callback && callback instanceof Function) {
      const callObj = await callback({ search: { ...search.value } })
      if (callObj && Array.isArray(callObj)) {
        const [res] = callObj
        if (res) {
          data.value = []
          data.value = res.list || []
          total.value = res.total || 0
        }
      }
    }
  }

  if (process.server) {
    setCallback()
  }

  return {
    search,
    data,
    total,
    onChangePage,
    onChangePageSize,
    onChangeFilter,
    onReset,
    onRefresh,
  }
}
