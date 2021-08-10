<template>
  <div class="category">
  </div>
</template>

<script>
import {List, Cell} from 'vant'
import { gql } from 'nuxt-graphql-request'

export default {
  components: {
    List, Cell
  },
  async asyncData({$log, $gqlr, params}) {
    // const query = gql`
    //   query catalogCategory($slug: String) {
    //     productCategory(slug: $slug) {
    //       slug,
    //       uuid,
    //       title
    //     }
    //   }
    // `,
    //       request = $gqlr(query, {slug: params.slug})

    $log(params)

  },
  data() {
    return {

    }
  },
  methods: {
  },

}
</script>

<style lang="scss">

</style>
