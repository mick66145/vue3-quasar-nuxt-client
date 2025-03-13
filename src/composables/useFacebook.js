import { ref, computed } from 'vue-demi'

const { VITE_FACEBOOK_CLIENT_ID, VITE_FACEBOOK_CLIENT_SECRET, VITE_FACEBOOK_REDIRECT_URI, } = useEnv()

export default function useFacebook({
  channelId = VITE_FACEBOOK_CLIENT_ID,
  channelSecret = VITE_FACEBOOK_CLIENT_SECRET,
  redirectUri = VITE_FACEBOOK_REDIRECT_URI,
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
    const oauth2Url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${channelId}&redirect_uri=${redirectUri}`
    location.href = oauth2Url
  }

  const oauth2Token = async () => {
    const code = urlParams.value.get('code')
    const { fetch } = useCustomFetch()

    if (code) {
      try {
        const response = await fetch('https://graph.facebook.com/v19.0/oauth/access_token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          credentials: 'omit',
          body: new URLSearchParams({
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
      'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href),
      'facebook-share-dialog',
      'width=626,height=436',
    )
  }
  return {
    isRedirect,
    oauth2,
    oauth2Token,
    share,
  }
}
