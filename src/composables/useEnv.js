
export default function useEnv() {

  const {
    MODE,
    VITE_BACKEND_HOST,
    VITE_FILE_SERVER_HOST,
    VITE_LINE_CLIENT_ID,
    VITE_LINE_CLIENT_SECRET,
    VITE_LINE_REDIRECT_URI,
    VITE_GOOGLE_CLIENT_ID,
    VITE_GOOGLE_CLIENT_SECRET,
    VITE_GOOGLE_REDIRECT_URI,
    VITE_FACEBOOK_CLIENT_ID,
    VITE_FACEBOOK_CLIENT_SECRET,
    VITE_FACEBOOK_REDIRECT_URI,
  } = import.meta.env

  return {
    MODE,
    VITE_BACKEND_HOST,
    VITE_FILE_SERVER_HOST,
    VITE_LINE_CLIENT_ID,
    VITE_LINE_CLIENT_SECRET,
    VITE_LINE_REDIRECT_URI,
    VITE_GOOGLE_CLIENT_ID,
    VITE_GOOGLE_CLIENT_SECRET,
    VITE_GOOGLE_REDIRECT_URI,
    VITE_FACEBOOK_CLIENT_ID,
    VITE_FACEBOOK_CLIENT_SECRET,
    VITE_FACEBOOK_REDIRECT_URI,
  }
}
