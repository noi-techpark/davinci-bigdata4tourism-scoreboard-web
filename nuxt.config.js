export default {
  mode: 'spa',
  env: {
    esHost: process.env.esHost || 'https://bigdata4tourism.davinci.bz.it/elasticsearch/'
  },
  head: {
    title: 'Tourism Scoreboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700&display=swap' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '~/css/main.css'
  ],
  plugins: [
    '~/plugins/axios',
    '~/plugins/filters',
    '~/plugins/portal',
  ],
  devModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  axios: {
    baseURL: process.env.esHost || 'https://bigdata4tourism.davinci.bz.it/elasticsearch/'
  },
  purgeCSS: {
    whitelist: [
      'text-metric0-500',
      'text-metric1-500',
      'text-metric2-500',
      'text-metric3-500',
      'text-metric4-500',
      'text-metric5-500',
      'hover:text-metric0-500',
      'hover:text-metric1-500',
      'hover:text-metric2-500',
      'hover:text-metric3-500',
      'hover:text-metric4-500',
      'hover:text-metric5-500',
      'bg-metric0-500',
      'bg-metric1-500',
      'bg-metric2-500',
      'bg-metric3-500',
      'bg-metric4-500',
      'bg-metric5-500',
      'border-metric0-500',
      'border-metric1-500',
      'border-metric2-500',
      'border-metric3-500',
      'border-metric4-500',
      'border-metric5-500',
      'hover:border-metric0-500',
      'hover:border-metric1-500',
      'hover:border-metric2-500',
      'hover:border-metric3-500',
      'hover:border-metric4-500',
      'hover:border-metric5-500',
    ],
  },
  build: {
    extend(config, ctx) {
        if (ctx.isDev && ctx.isClient) {
          config.module.rules.push({
            enforce: "pre",
            test: /\.(js|vue)$/,
            loader: "eslint-loader",
            exclude: /(node_modules)/,
            options: {
              fix: true
            }
          })
        }
      }
  }
}
