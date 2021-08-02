export default {
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
    'vant/lib/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '@/plugins/vant',
    '@/plugins/rusEndings',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components/', pathPrefix: false, prefix: 're' },
    { path: '~/components/mmm/', pathPrefix: false, prefix: 'mmm'}
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
    '@nuxtjs/eslint-module',
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
    '@nuxtjs/tailwindcss'
  ],

  styleResources: {
    scss: [
      'watson-scss',
      '@/assets/legacy-scss/global.scss',
      '@/assets/scss/global.scss',
    ],
    less: [],
  },

  graphql: {
    clients: {
      default: {
        endpoint: 'https://api.restoreca.ru/graphql',
      },
    },
  },

  tailwindcss: {
    // cssPath: '~/assets/vendor/tailwind.scss'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/blokwise/dynamic
    '@blokwise/dynamic'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.restoreca.ru/api/',
    debug: false
  },

  loading: { 
    color: '#8a02ee', 
  },

  globalName: 'rstrc',

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/vant.*?less/],
    babel: {
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        [
          'import',
          {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: (name) => `${name}/style/less`,
          },
          'vant'
        ]
      ]
    },
    loaders: {
      less: {
        javascriptEnabled: true, // Enable Less inline JavaScript support
        modifyVars: {
          hack: `true; @import "./assets/vendor/vant.less";`
        }
      }
    },
    /*
    postcss: {
      plugins: {
        'postcss-px-to-viewport': {
          unitToConvert: 'px',
          viewportWidth: 375,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'rem',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: undefined,
          include: undefined,
          landscape: false,
          landscapeUnit: 'vw',
          landscapeWidth: 568
        },
        'postcss-pxtorem': {
          rootValue: 16,
          unitPrecision: 5,
          propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 1,
          exclude: /node_modules/i
        },
      }
    }
    */
  }
}
