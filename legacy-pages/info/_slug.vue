<template>
  <section>
    <section v-if="$device.isDesktopOrTablet" class="page page--info">
      <h1 class="page__title">
        {{ title }}
      </h1>
    </section>
  </section>
</template>

<script>
export default {
  transition: 'fade',
  scrollToTop: true,
  key(route) {
    return route.fullPath
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Restoreca.ru'
        }
      ]
    }
  },
  async asyncData({ params, $axios }) {
    const response = await $axios.$get('/pages/' + params.slug)
    return response
  },

}
</script>

<style>

</style>