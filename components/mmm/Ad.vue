<template>
  <LazyNuxtDynamic :component="componentDeviceTyped" :hydration="hydration" />
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
    }
  },
  computed: {
    componentDeviceTyped() {
      return this.componentName + 'Mobile'
      // return this.$device.isDesktopOrTablet ? this.componentName + 'Desktop' : this.componentName + 'Mobile'
    }
  }
}
</script>
