import useResource from '@/composables/useResource'
import { FrontendMenuViewModel } from '@core/modules/frontend-menu/models'

export const FrontendMenuResource = ({
  uri = 'frontend_menu',
}) => {

  const { list, get } = useResource({ uri, listModel: FrontendMenuViewModel, getModel: FrontendMenuViewModel })

  return {
    list,
    get,
  }
}