import Base from '@core/models/modules/Base'
import { FrontendMenuModel } from './FrontendMenuModel'

const FrontendMenu = () => ({
  ...Base(),

  // map欄位
  parentId: null,
  title: null,
  to: "",
  target: null,
})

export const FrontendMenuViewModel = (item) => {
  const viewModel = (item) => {
    const frontendMenuObj = {
      ...FrontendMenuModel(item),
      ...FrontendMenu(),
    }
    frontendMenuObj.parentId = frontendMenuObj.parent?.id || null
    frontendMenuObj.title = frontendMenuObj.name || null
    frontendMenuObj.target = frontendMenuObj.is_link_blank ? '_blank' : null
    return frontendMenuObj
  }

  return viewModel(item)
}
