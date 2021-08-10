export default {
  props: {
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
    xlarge: {
      type: Boolean,
      default: false
    },
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
        theme: ['primary', 'secondary', 'accent', 'info', 'link'],
        offset: ['offY_1', 'offY_2', 'offY_3', 'offX_1', 'offX_2', 'offX_3'],
      },
    }
  },
  computed: {
    classRoot() {
      return this.classPrefix + this.classBase
    },
    themed() {
      if (this.theme && this.modifiers.theme.includes(this.theme)) classList.push(`${b}--${this.theme}`)
      
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

      if (!this.size && (this.xsmall || this.small || this.medium || this.large || this.xlarge)) {
        if (this.small) return 'small'
        if (this.xsmall) return 'xsmall'
        if (this.large) return 'large'
        if (this.xlarge) return 'xlarge'
      }

      return 'medium'
    },
    classListBase() {
      let classList = [this.classRoot]
      classList.push(`${this.classRoot}--${this.themed}`)
      classList.push(`${this.classRoot}--${this.sized}`)
      return classList
    },
  }
}