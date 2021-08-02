module.exports = {
  mode: 'jit',
  purge: [
     './components/**/*.{js,jsx,ts,tsx,vue}',
     './pages/**/*.{js,jsx,ts,tsx,vue}',
  ],
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    styled: true,
    themes: false,
    rtl: false,
  },
  theme: {
    extend: {
      colors: require('daisyui/colors'),
    },
    colors: {
      'primary': '#430ef8',
      'primary-focus': '#4506cb',
      'primary-content': '#ffffff',
      'secondary': '#8a02ee',
      'secondary-focus': '#6c009b',
      'secondary-content': '#ffffff',
      'accent': '#36c9cd',
      'accent-focus': '#28a8a8',
      'accent-content': '#ffffff',
      'neutral': '#3d4451',
      'neutral-focus': '#2a2e37',
      'neutral-content': '#ffffff',
      'base-100': '#ffffff',
      'base-200': '#f9fafb',
      'base-300': '#d1d5db',
      'base-content': '#1f2937',
      'info': '#2094f3',
      'success': '#009485',
      'warning': '#ff9900',
      'error': '#ff5724',
    },
    // spacing: {
    //   '1': '5px',
    //   '2': '8px',
    //   '3': '13px',
    //   '4': '21px',
    //   '5': '34px',
    //   '6': '55px',
    // }
  }
}
