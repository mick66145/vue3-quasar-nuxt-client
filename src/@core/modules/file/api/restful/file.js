import useResource from '@/composables/useResource'
import useCustomFetch from '@/composables/useCustomFetch'

const fileBaseUrl = process.env.FILE_SERVER_HOST

export const FileResource = ({
  uri = 'file',
}) => {
  const { fetch } = useCustomFetch()

  const upload = async ({ file }) => {
    const formData = new FormData()
    formData.append('file', file)

    return fetch(`/${uri}/upload`, {
      method: 'post',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  const { list, get, post, patch, put, destroy, selectAll } = useResource({ uri })

  return {
    list,
    get,
    post,
    patch,
    put,
    destroy,
    selectAll,
    upload,
  }
}
