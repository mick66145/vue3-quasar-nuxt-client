// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath, URL } from 'url'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src/',
  css: ['./assets/styles/index.scss'],
  components: [
    {
      path: '@core/components',
      extensions: ['vue'],
      pathPrefix: false
    },
    {
      path: '@/components',
      extensions: ['vue'],
      pathPrefix: false
    },
  ],
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    "nuxt-lodash",
    'nuxt-swiper',
    '@nuxtjs/i18n',
    "@nuxtjs/tailwindcss",
    '@nuxtjs/color-mode',
    'nuxt-echarts',
    'nuxt-simple-sitemap',
    'nuxt-quasar-ui'
  ],
  postcss: {
    plugins: {
      'postcss-nested': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
        }
      }
    },
    resolve: {
      alias: {
        '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
      }
    }
  },
  tailwindcss: {
    configPath: "./config/tailwind/tailwind.config.js",
  },
  i18n: {
    vueI18n: './config/i18n/i18n.config.js',
    langDir: 'locales/',
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'zh-TW', name: '繁體中文', iso: 'zh-TW', file: 'zh-TW.json' },
    ],
    defaultLocale: 'zh-TW',
    lazy: true,
    strategy: 'prefix_and_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'language',
      redirectOn: 'root'
    }
  },
  site: {
    url: 'http://localhost:3000'
  },
  sitemap: {
    defaults: {
      changefreq: 'daily',
      priority: 0.8,
    },
    inferStaticPagesAsRoutes: false,
    sitemaps: false,
    xslColumns: [
      { label: 'URL', width: '25%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
      { label: 'Change Frequency', select: 'sitemap:changefreq', width: '25%' },
      { label: 'Priority', select: 'sitemap:priority', width: '12.5%' },
      { label: 'Hreflangs', select: 'count(xhtml:link)', width: '12.5%' }
    ],
  },
  quasar: {
    sassVariables: './src/assets/styles/abstracts/quasar-variables.scss',
  }
})
