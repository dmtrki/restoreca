<template>
  <MmmAd component="homeHeader" :component-data="headerData" />
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
    ...mapState(['commonData','catalogDropdownData']),
    manufacturersMore() {
      if ( this.home.manufacturers.count !== null ) {
        return this.home.manufacturers.count + ' ' + this.$rusEndings(this.home.manufacturers.count, ['производитель', 'производителя', 'производителей'])
      }
      return 0;
    }
  },
  methods: {
    
  }
}
</script>


<style lang="scss">


</style>
