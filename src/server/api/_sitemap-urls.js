
export default defineEventHandler(async () => {
    const [
        statics,
    ] = await Promise.all([
        $fetch('/api/sitemap/static'),
    ])
    return [...statics].map((page) => {
        console.log(page)
        return { loc: page, lastmod: new Date() }
    })
})