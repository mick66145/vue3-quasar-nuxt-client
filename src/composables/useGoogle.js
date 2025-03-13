import { ref, computed } from 'vue-demi'

const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET, VITE_GOOGLE_REDIRECT_URI, } = useEnv()
console.log(VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET, VITE_GOOGLE_REDIRECT_URI)
export default function useGoogle({
  channelId = VITE_GOOGLE_CLIENT_ID,
  channelSecret = VITE_GOOGLE_CLIENT_SECRET,
  redirectUri = VITE_GOOGLE_REDIRECT_URI,
  scope = 'profile+email',
}) {
  // data
  const urlParams = ref(new URLSearchParams(window.location.search))

  // computed
  const isRedirect = computed(() => {
    const code = urlParams.value.get('code')
    return code !== null
  })

  // methods
  const oauth2 = () => {
    const oauth2Url = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${channelId}&redirect_uri=${redirectUri}&state=123&scope=${scope}`
    location.href = oauth2Url
  }

  const oauth2Token = async () => {
    const code = urlParams.value.get('code')
    const { fetch } = useCustomFetch()

    if (code) {
      try {
        const response = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          credentials: 'omit',
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            client_id: channelId,
            client_secret: channelSecret,
            redirect_uri: redirectUri,
          })
        })
        const { access_token: accessToken, id_token: idToken } = response
        return { accessToken, idToken }
      } catch (error) { }
    }
  }

  const share = () => {
    window.open(
      'https://plus.google.com/share?url=' + encodeURIComponent(window.location.href),
      'googleplus-share-dialog',
      'width=500,height=500',
    )
  }
  return {
    isRedirect,
    oauth2,
    oauth2Token,
    share,
  }
}
