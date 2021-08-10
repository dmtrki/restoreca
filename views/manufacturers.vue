<template>
  <section>
    <MmmSection>
      <IndexBar v-if="manufacturers" :index-list="indexList">
        <template
          v-for="(group, letter) in manufacturers"
        >
          <IndexAnchor :index="letter" :key="letter" />
          <Cell 
            v-for="(item, index) in group" 
            :key="index+'-'+letter" 
            :title="item.title" 
            icon="photo-o"
            :value="item.country_code"
          />
        </template>

      </IndexBar>
      <div v-else>Загрузка</div>
    </MmmSection>
  </section>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import { IndexBar, IndexAnchor, Cell } from 'vant'

export default {
  components: {
    IndexBar,
    IndexAnchor,
    Cell
  },
  async asyncData({store}) {
    store.commit('SET_APPBAR_TITLE', 'Список производителей')
  },
  data() {
    return {
      manufacturers: false,
      indexList: []
    }
  },
  head() {
      return {
        title: 'Список производителей товаров интернет-магазина Ресторека',
      }
  },
  async fetch() {
    const query = gql`
      query manufacturersIndex {
        manufacturersAbicaly
      }
    `

    const response = await this.$gqlr(query)
    this.manufacturers = response.manufacturersAbicaly
    this.indexList = Object.keys(this.manufacturers)
  }
}
</script>

<style lang="scss">

</style>
