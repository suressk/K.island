export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'K.island',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'Author', content: 'K.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/initial.scss',
    '~/assets/css/common.scss',
    '~/assets/css/media.scss'
  ],

  // Loading 加载动画
  loading: '~/components/Loading.vue',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/router.ts', ssr: true },
    { src: '@/plugins/common.ts', ssr: true },
    { src: '@/plugins/axios.ts', ssr: true }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Run development port Configuration
  server: {
    port: '8888'
  }
}
