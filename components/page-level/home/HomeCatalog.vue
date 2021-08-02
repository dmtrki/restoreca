<template>

</template>
<script>
export default {
  methods: {
    horizontalWheel (event) {
      if (!event.shiftKey) this.$refs.homeTopSlider.slideWheel(event)      
    },
  }
}
</script>

<style lang="scss">

</style>
