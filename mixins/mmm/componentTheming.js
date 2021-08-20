export default {
  props: {
    // *** SIZING *** 
    size: {
      type: String | Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    xsmall: {
      type: Boolean,
      default: false
    },
    smallest: {
      type: Boolean,
      default: false
    },
    xlarge: {
      type: Boolean,
      default: false
    },
    // *** THEMING *** 
    theme: {
      type: String | Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    accent: {
      type: Boolean,
      default: false
    },
    link: {
      type: Boolean,
      default: false
    },
    info: {
      type: Boolean,
      default: false
    },
      // state based
    success: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    // *** POSITIONING *** 
    offsetY: {
      type: Number,
      default: 0
    },
    offsetX: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      classPrefix: 'mmm',
      classBase: '',
      modifiers: {
        size: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
        theme: ['primary', 'secondary', 'accent', 'info', 'link', 'success', 'error', 'warning'],
        offset: ['offsetY_1', 'offsetY_2', 'offsetY_3', 'offsetX_1', 'offsetX_2', 'offsetX_3'],
      },
    }
  },
  computed: {
    classRoot() {
      return this.classPrefix + this.classBase
    },
    themed() {
      if (this.theme && this.modifiers.theme.includes(this.theme)) return this.theme
      
      if (!this.theme && (this.primary || this.secondary || this.accent || this.info || this.link)) {
        if (this.primary) return 'primary'
        if (this.secondary) return 'secondary'
        if (this.accent) return 'accent'
        if (this.info) return 'info'
        if (this.link) return 'link'
      }

      return 'default'
    },
    sized() {
      if (this.size && this.modifiers.size.includes(this.size)) return this.size

      if (!this.size && (this.smallest || this.xsmall || this.small || this.medium || this.large || this.xlarge)) {
        if (this.small) return 'small'
        if (this.xsmall) return 'xsmall'
        if (this.smallest) return 'smallest'
        if (this.large) return 'large'
        if (this.xlarge) return 'xlarge'
      }

      return 'medium'
    },
    stated() {
      if (this.success) return 'success'
      if (this.warning) return 'warning'
      if (this.error) return 'error'
    },
    classListBase() {
      let classList = [this.classRoot]
      classList.push(`${this.classRoot}--${this.themed}`)
      classList.push(`${this.classRoot}--${this.sized}`)
      if (this.stated) classList.push(`${this.classRoot}--${this.stated}`)
      if (this.offsetX !== 0) classList.push(`${this.classRoot}--offsetX_${this.offsetX}`)
      if (this.offsetY !== 0) classList.push(`${this.classRoot}--offsetY_${this.offsetY}`)
      return classList
    },
  }
}