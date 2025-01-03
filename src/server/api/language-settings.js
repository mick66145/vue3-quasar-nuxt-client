import { languageSettingService } from '@/server/services/language-setting/languageSettingService'

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const { data } = await languageSettingService.getList({ query })
        return {
            status: true,
            data,
            message: '操作成功'
        }
    } catch (error) {
        console.error('Failed to fetch language settings:', error)
        return {
            success: false,
            data: [],
            message: '操作失敗'
        }
    }
}) 