import useCustomFetch from '@/composables/useCustomFetch'

export default function useResource({
  uri,
  listModel = (item) => item,
  getModel = (item) => item,
  postModel = (item) => item,
  patchModel = (item) => item,
  putModel = (item) => item,
}) {
  const { fetch } = useCustomFetch()

  const list = async ({ query }) => {
    const response = await fetch(`/${uri}`, {
      method: 'GET',
      params: query
    })

    const { list, meta } = response.data
    const modeledList = [...list].map(element => listModel(element))

    if (meta?.pagination) {
      const { count, total } = meta.pagination
      return {
        list: modeledList,
        total,
        count,
      }
    }
    return { list: modeledList }
  }

  const get = async ({ id, query }) => {
    const url = !id ? `/${uri}` : `/${uri}/${id}`
    const params = id ? { ...query, id: +id } : query

    const response = await fetch(url, {
      method: 'GET',
      params
    })

    return getModel({ ...response.data })
  }

  const post = async ({ payload }) => {
    const response = await fetch(`/${uri}`, {
      method: 'POST',
      body: postModel(payload)
    })
    return response.data
  }

  const patch = async ({ id, payload }) => {
    const data = { ...payload, id: +id }
    const response = await fetch(`/${uri}/${id}`, {
      method: 'PATCH',
      body: patchModel(data)
    })
    return response.data
  }

  const put = async ({ id, payload }) => {
    const url = !id ? `/${uri}` : `/${uri}/${id}`
    const data = id ? { ...payload, id: +id } : payload

    const response = await fetch(url, {
      method: 'PUT',
      body: putModel(data)
    })
    return response.data
  }

  const destroy = async ({ id, query }) => {
    const params = { id: +id }
    return await fetch(`/${uri}/${id}`, {
      method: 'DELETE',
      params: query || params
    })
  }

  const selectAll = async ({ query }) => {
    const response = await fetch(`/${uri}/action/select_all`, {
      method: 'GET',
      params: query
    })

    const { list } = response.data
    return { list }
  }

  return {
    list,
    get,
    post,
    patch,
    put,
    destroy,
    selectAll,
  }
}
