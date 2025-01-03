import { languageSettingHttpClientService } from '@/server/services/language-setting/languageSettingHttpClientService'

export const languageSettingService = {
  async getList({ query }) {
    const { data } = await languageSettingHttpClientService.list({ query })
    return { data }
  }
}