import webpack from 'webpack'

const colorUtil = require('./tailwind.color-util')

export default {
  mode: 'spa',
  env: {
    esHost: process.env.esHost || 'https://kibanapublic.bigdata4tourism.davinci.bz.it/elasticsearch/',
    esIndex: process.env.esIndex || 'tourism-nifi_2020'
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
    ],
    script: [
      {
        src: '/matomo/matomo-analytics.js',
        type: 'text/plain',
        "data-cookiecategory": "targeting"
      },
      {
        src: '/cookieconsent/cookieconsent.js',
        defer: true,
        body: true
      },
      {
        src: '/cookieconsent/cookieconsent-init.js',
        defer: true,
        body: true
      }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '~/css/main.css',
    '~/assets/css/vue2-leaflet-markercluster.css',
    '~/static/cookieconsent/cookieconsent.css'
  ],
  plugins: [
    '~/plugins/axios',
    '~/plugins/es-client',
    '~/plugins/portal',
    '~/plugins/register-metrics',
    '~/plugins/vue2-leaflet-chloropleth.js',
    '~/plugins/vue2-leaflet-markercluster.js',
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-leaflet',
  ],
  axios: {
    baseURL: process.env.esHost || 'https://kibanapublic.bigdata4tourism.davinci.bz.it/elasticsearch/'
  },
  purgeCSS: {
    whitelistPatterns: [/leaflet/],
    whitelist: [
      'text-metric0-500',
      'text-metric1-500',
      'text-metric2-500',
      'text-metric3-500',
      'text-metric4-500',
      'text-metric5-500',
      'text-metric6-500',
      'text-metric7-500',
      'text-filterActive-500',
      'hover:text-metric0-500',
      'hover:text-metric1-500',
      'hover:text-metric2-500',
      'hover:text-metric3-500',
      'hover:text-metric4-500',
      'hover:text-metric5-500',
      'hover:text-metric6-500',
      'hover:text-metric7-500',
      'hover:text-filterActive-500',
      'bg-metric0-500',
      'bg-metric1-500',
      'bg-metric2-500',
      'bg-metric3-500',
      'bg-metric4-500',
      'bg-metric5-500',
      'bg-metric6-500',
      'bg-metric7-500',
      'bg-filterActive-500',
      'border-metric0-500',
      'border-metric1-500',
      'border-metric2-500',
      'border-metric3-500',
      'border-metric4-500',
      'border-metric5-500',
      'border-metric6-500',
      'border-metric7-500',
      'border-filterActive-500',
      'hover:border-metric0-500',
      'hover:border-metric1-500',
      'hover:border-metric2-500',
      'hover:border-metric3-500',
      'hover:border-metric4-500',
      'hover:border-metric5-500',
      'hover:border-metric6-500',
      'hover:border-metric7-500',
      'hover:border-filterActive-500',
      ...colorUtil.postCss
    ],
  },
  build: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
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
