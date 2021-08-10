<template>
  <div :class="classList">
    
  </div>
</template>
<script>
export default {
  props: {
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
    closeIcon: {
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
    },
    padding: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      classPrefix: 'mmm',
      classBase: 'Panel',
      modifiers: {
        theme: ['primary', 'secondary', 'accent', 'info', 'promo'],
        icon: [''],
        offset: ['offY_1', 'offY_2', 'offY_3', 'offX_1', 'offX_2', 'offX_3'],
      },
      cssIcons: []
    }
  },
  computed: {
    classList() {
      const t = this,
            b = t.classPrefix + t.classBase
      let classList = [b]

      if (t.theme && t.modifiers.theme.includes(t.theme)) classList.push(`${b}--${t.theme}`)

      if (!t.theme && (t.primary || t.secondary || t.accent || t.link)) {
        let theme = 'info'
        if (t.primary) theme = 'primary'
        if (t.secondary) theme = 'secondary'
        if (t.accent) theme = 'accent'
        if (t.link) theme = 'link'
        classList.push(`${b}--${theme}`)
      }

      return classList.join(' ')
    }
  }

}
</script>

<style lang="scss">
  .mmmPanel {
    display: flex;
    
  }
</style>