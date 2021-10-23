<template>
  <MmmAd component-name="HomeHeader" :component-data="headerData" />
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      headerData: {

      }
    }
  },
  computed: {
    // ...mapState(['commonData','catalogDropdownData']),
  },
  methods: {

  }
}
</script>


<style lang="scss">
.logo {
  display: flex;
  align-items: center;
  background-image: url(~/assets/images/logo.svg);
  background-repeat: no-repeat;
  @include vmin(width, 44px);
  // @include vmin(height, 66px);
  min-height: 34px;
  height: 100%;
  text-decoration: none;
}

</style>
