import { ref, computed } from 'vue-demi'

const { VITE_LINE_CLIENT_ID, VITE_LINE_CLIENT_SECRET, VITE_LINE_REDIRECT_URI, } = useEnv()

export default function useLine({
  channelId = VITE_LINE_CLIENT_ID,
  channelSecret = VITE_LINE_CLIENT_SECRET,
  redirectUri = VITE_LINE_REDIRECT_URI,
  scope = 'profile openid email',
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
    const loginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${redirectUri}&state=123&scope=${scope}`
    location.href = loginUrl
  }
  const oauth2Token = async () => {
    const code = urlParams.value.get('code')
    const { fetch } = useCustomFetch()

    if (code) {
      try {
        const response = await fetch('https://api.line.me/oauth2/v2.1/token', {
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
    window.open('line://msg/text/' + encodeURIComponent(window.location.href))
  }
  return {
    isRedirect,
    oauth2,
    oauth2Token,
    share,
  }
}
