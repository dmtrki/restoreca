import { basename } from 'path';
import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'restoreca',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/common.scss',
    'vant/lib/index.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/rusEndings',
    '~/plugins/horizontal',
    '~/plugins/gqlr',
    // '~/plugins/persistedState.client.js',
    '~/plugins/touch.client.js',
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components/', pathPrefix: false, prefix: 're' },
    { path: '~/components/mmm/', pathPrefix: false, prefix: 'mmm'},
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // https://github.com/stephenkr/nuxt-feature-toggle
  // https://github.com/nuxt-community/svg-module
  // https://github.com/Developmint/nuxt-svg-loader
  // https://github.com/nuxt-community/svg-sprite-module
  // https://github.com/nuxt-community/component-cache-module
  // https://github.com/Developmint/nuxt-purgecss
  // https://github.com/schlunsen/nuxt-leaflet
  // https://github.com/lewyuburi/nuxt-validate
  // https://nuxt-socket-io.netlify.app/
  // https://github.com/nuxt-community/laravel-echo-module
  // https://luxdamore.github.io/nuxt-prune-html/
  // https://xhr-cache.dewib.com/
  // https://github.com/AlekseyPleshkov/nuxt-social-meta
  // https://github.com/PivaleCo/nuxt-image-loader-module ***
  // https://github.com/nuxt-community/imagemin-module
  // https://github.com/sugoidesune/nuxt-scss-to-js
  // https://github.com/Tahul/nuxt-use-motion
  // https://github.com/nuxt-community/universal-storage-module ***
  // https://github.com/paulgv/nuxt-webpackdashboard
  // https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://github.com/nuxt-community/device-module
    // $device.isDesktopOrTablet $device.userAgent
   '@nuxtjs/device',
    // https://github.com/gomah/nuxt-graphql-request
    'nuxt-graphql-request',
    // https://github.com/harlan-zw/nuxt-build-optimisations
    'nuxt-build-optimisations',
    // https://github.com/nuxt-community/router-module
    '@nuxtjs/router',
    // https://tailwindcss.nuxtjs.org/setup
    // '@nuxtjs/tailwindcss' ::: решил убрать за ненадобностью, вместо нее вьютифи
    // https://github.com/nuxt-community/vuetify-module
    '@nuxtjs/vuetify',
  ],

  styleResources: {
    scss: [
      'watson-scss',
      '@/assets/scss/global.scss',
    ],
    less: [],
    hoistUseStatements: true  // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  },

  graphql: {
    clients: {
      default: {
        endpoint: 'https://api.restoreca.ru/graphql',
      },
    },
  },


  routerModule: {
    path: './services/'
  },

  // vuetify: {
  //   customVariables: ['~/assets/vendor/vuetify.scss'],
  //   defaultAssets: {
  //     font: {
  //       family: 'Montserrat'
  //     },
  //     icons: {
  //       iconfont: 'mdiSvg',
  //     },
  //   },
  //   treeShake: true,
  // },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/blokwise/dynamic
    '@blokwise/dynamic',
    'nuxt-blurhash'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.restoreca.ru/api/',
    debug: false
  },

  loading: {
    color: '#8a02ee',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: [/vant.*?less/],
    transpile: [
      'horizontal',
      'vee-validate/dist/rules',
      'touch',
      // 'persistedState'
    ],
    babel: {
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        // [
        //   'import',
        //   {
        //     libraryName: 'vant',
        //     libraryDirectory: 'es',
        //     style: false
        //     // style: (name) => true,
        //     // style: (name) => `${name}/style/less`,
        //   },
        //   'vant'
        // ]
      ]
    },
    loaders: {
      // less: {
      //   javascriptEnabled: true, // Enable Less inline JavaScript support
      //   modifyVars: {
      //     hack: `true; @import "./assets/vendor/vant.less";`
      //   }
      // }
    },
    extend: (config, ctx) => {
      // touch ssr
      // if (ctx.isServer) {
      //   config.resolve.alias['hammerjs$'] = this.options.rootDir + 'node_modules/vue-touch/dist/hammer-ssr.js'
      // }

      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'vue-svg-loader',
            options: {
              svgo: {
                plugins: [
                  {
                    prefixIds: {
                      prefix: (node, { path }) => basename(path, '.svg'),
                      delim: '-',
                    },
                  },
                ],
              },
            },
          },
        ],
      });
    },
  }
})
