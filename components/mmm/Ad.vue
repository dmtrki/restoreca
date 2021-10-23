<template>
  <LazyNuxtDynamic
    :component="componentDeviceTyped"
    :hydration="hydration"
    :component-data="componentData"
    v-bind="$attrs"
    v-on="$listeners"
    enter-active-class="fadeIn"
    move-class="fade-move"
    leave-active-class="fadeOut"
  />
</template>
<script>
export default {
  props: {
    containerClass: {
      type: String,
      default: ''
    },
    componentName: {
      type: String,
      required: true
    },
    hydration: {
      type: String,
      default: 'WhenIdle'
    },
    prefix: {
      type: String,
      default: 'Re'
    },
    componentData: {
      type: Object | Array | String | Boolean | Number,
      default: () => {}
    },
    mobileOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    componentDeviceTyped() {
      if (this.mobileOnly) return this.prefix + this.componentName + 'Mobile'
      return this.$device.isDesktopOrTablet ? this.componentName + 'Desktop' : this.componentName + 'Mobile'

    }
  }
}
</script>

<style lang="scss">
 @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .fadeIn {
    animation-name: fadeIn;
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .fadeOut {
    animation-name: fadeOut;
  }
  .fade-move {
    transition: transform .3s ease-out;
  }
</style>
