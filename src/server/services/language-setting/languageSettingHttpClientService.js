import { fetch } from '@/server/utils/fetch'

const uri = 'language_setting'

export const languageSettingHttpClientService = {
  async list({ query }) {
    const { data } = await fetch({
      url: `${uri}`,
      method: 'GET',
      params: query
    })

    return { data }
  }
}