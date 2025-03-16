// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath, URL } from 'url'
import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
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
    '@nuxt/image',
    "@nuxtjs/tailwindcss",
    '@nuxtjs/color-mode',
    'nuxt-echarts',
    'nuxt-simple-sitemap',
    'nuxt-quasar-ui',
    '@vite-pwa/nuxt',
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
  },
  image: {
    quality: 80,
    screens: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
      xxxl: 1920,
    },
    domains: ['http://localhost:3000'],
    densities: [1, 2, 3, 4],
  },
  pwa: {
    includeAssets: ['favicon.ico'],
    injectRegister: 'auto',
    manifest: {
      name: 'ClientFrontend-Base-App', // 應用程式名稱
      short_name: 'ClientFrontend-Base', // 應用程式簡稱
      start_url: '/',
      display: 'standalone', // 顯示模式
      background_color: '#ffffff', // 背景顏色
      theme_color: '#000000', // 主題顏色
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    registerType: 'autoUpdate',
    workbox: {
      cleanupOutdatedCaches: true, // 清理舊的快取
      skipWaiting: true, // 當新 Service Worker 可用時立即接管
      clientsClaim: true, // 立即控制所有打開的客戶端
      sourcemap: true, // 生成 sourcemap
      runtimeCaching: [
        {
          urlPattern: /(.*?)\.(js|css|ts)/, // js /css /ts靜態資源保存
          handler: 'CacheFirst',
          options: {
            cacheName: 'js-css-cache',
          },
        },
        {
          urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 圖片存檔
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
          },
        },
      ],
    },
  },
  devServer: {
    port: 3000,
  },
  nitro: {
    publicAssets: [
      {
        dir: resolve(__dirname, 'public'),
        baseURL: '/',  
      },
    ],
  },
})
