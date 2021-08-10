<template>
  <MmmAd component-name="HomeCatalog" :component-data="{...catalogData, manufacturersMore: manufacturersMore}" />
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    catalogData: {
      type: Object | Array,
      default: () => {}
    }
  },
  computed: {
    manufacturersMore() {
      if ( this.catalogData.manufacturersCount && this.catalogData.manufacturersCount !== null ) {
        return this.catalogData.manufacturersCount + ' ' + this.$rusEndings(this.catalogData.manufacturersCount, ['производитель', 'производителя', 'производителей'])
      }
      return 0;
    }
  },
  methods: {
    // horizontalWheel (event) {
    //   if (!event.shiftKey) this.$refs.homeTopSlider.slideWheel(event)      
    // },
  }
}
</script>


<style lang="scss">


</style>
