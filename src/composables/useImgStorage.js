
export default function useImgStorage() {
  const fileBaseUrl = process.env.FILE_SERVER_HOST
  const getImageSrc = ({ filename, size = '100x' }) => {
    if (!filename) return ''
    const url = `${fileBaseUrl}/display/resize/${size}/${filename}`
    return url
  }

  return {
    getImageSrc,
  }
}
