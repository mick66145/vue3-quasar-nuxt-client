
export default function useFileStorage() {
  const fileBaseUrl = process.env.FILE_SERVER_HOST

  const getFileSrc = ({ id, showType = 'd' }) => {
    if (!id) return ''
    const url = `${fileBaseUrl}/file/${showType}/${id}`
    return url
  }

  return {
    getFileSrc,
  }
}
