module.exports = {
  mode: 'jit',
  // prefix: 'tw-',
  darkMode: false,
  theme: {
    padding: {
      sm: '8px',
      md: '21px',
      lg: '34px',
      xl: '55px',
    }
  },
  configViewer: {
    typographyExample: 'The quick brown fox jumped over the lazy dog.'
  },
  purge: [
     './components/**/**/**/*.{js,jsx,ts,tsx,vue}',
     './components/**/**/*.{js,vue}',
     './components/**/*.{js,vue}',
     './components/*.{js,vue}',
     './layouts/**/*.{js,jsx,ts,tsx,vue}',
     './layouts/*.{js,jsx,ts,tsx,vue}',
     './components/**/*.{vue,js}',
     './layouts/**/*.vue',
     './pages/**/*.vue',
     './views/**/*.vue',
     './plugins/**/*.{js,ts}',
     './nuxt.config.{js,ts}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
        {
          'restoreca': {
            'primary': '#5216ef',
            'primary-focus': '#1410c0',
            'primary-content': '#ffffff',
            'secondary': '#1fd1c4',
            'secondary-focus': '#1da0a0',
            'secondary-content': '#ffffff',
            'accent': '#8223e0',
            'accent-focus': '#5a319f',
            'accent-content': '#ffffff',
            'neutral': '#3d4451',
            'neutral-focus': '#2a2e37',
            'neutral-content': '#ffffff',
            'base-100': '#ffffff',
            'base-200': '#f9fafb',
            'base-300': '#d1d5db',
            'base-content': '#1f2937',
            'info': '#2094f3',
            'success': '#15d07c',
            'warning': '#ff9900',
            'error': '#e63e42',
          }
      },
       'light',
    ],
  },
  corePlugins: {
    float: false,
    objectFit: false,
    objectPosition: false,
  }
}
