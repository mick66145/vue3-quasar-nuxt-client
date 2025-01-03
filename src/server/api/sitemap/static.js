const statics = [
    '/'
]

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const { data } = await $fetch('/api/language-settings')
        const { list } = data
        const urls = list.reduce((acc, lang) => {
            return [
                ...acc,
                ...statics.map(path => `/${lang.locale}${path}`)
            ]
        }, [...statics])
        console.log('Generated sitemap URLs:', urls)
        return urls
    } catch (error) {
        console.error('Error generating sitemap:', error)
        return statics
    }
})