<template>
  <div class="default">
    <ReAppBar v-if="$route.name !== 'home'" />
    <Nuxt />
    <ReTabBar />
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
body {
  padding-bottom: 81px;
}
</style>
