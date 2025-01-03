import { useFrontendMenu } from '@/stores/frontendMenu'
import { useLanguageSetting } from '@/stores/languageSetting'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const frontendmenuStore = useFrontendMenu()
    const languageSettingStore = useLanguageSetting()

    try {
        if (process.server) {
            await frontendmenuStore.getFrontendMenuList();
            await languageSettingStore.getLanguageSetting();
        }
    } catch (error) {
        console.error('init error:', error);
    }
});
