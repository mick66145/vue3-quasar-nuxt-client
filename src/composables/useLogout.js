import { useRouter } from 'vue-router'
import { useUser } from '@/stores/user'
import useNotify from './useNotify'

export default function useLogout() {
  const { notify } = useNotify()
  const storeUser = useUser()
  const router = useRouter()

  const resetStore = async () => {
    await storeUser.logout()
    notify({ message: '登出成功', type: 'positive' })
    router.push('/entry')
  }

  return {
    resetStore,
  }
}
