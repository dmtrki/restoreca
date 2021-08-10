<template>
  <div class="categoriesCascader">
    <Transition name="slide-fade" appear>
      <Cell
        v-if="parent"
        :value="parent.title"
        @click="goToRoots"
        icon="arrow-left"
        clickable
      />
    </Transition>
    <Transition appear name="slide-fade" mode="out-in">
      <MmmLoading v-if="isLoading" list />
      <div v-else class="categoriesCascader__items">
        <Cell 
          v-for="(category, index) in categories"
          v-bind:key="category.id"
          :title="category.title"
          is-link
          clickable
          :to="parent ? `/${parent.slug}/${category.slug}/` : '#'"
          @click="selectParent(category)"
        />
      </div>
    </Transition>
  </div>
</template>
<script>
import { gql } from 'nuxt-graphql-request'
import { Cell } from 'vant'

export default {
  components: {Cell},
  props: {
    roots: {
      type: Object | Array,
      default: () => []
    }
  },
  data() {
    return {
      parent: false,
      categories: [],
      rootsCache: [],
    }
  },
  computed: {
    isLoading() {
      return (this.categories.length === 0 || this.rootsCache.length === 0) ? true : false
    }
  },
  methods: {
    selectParent (category) {
      this.parent = category
      this.getCategories(category.id)
    },
    goToRoots () {
      this.categories = []
      this.categories = this.rootsCache
      this.parent = false
    },
    async getCategories (parent_id = null) {
      this.categories = []
      const query = gql`
        query productCategories($parent_id: Int) {
          productCategories(parent_id: $parent_id) {
            id
            uuid
            slug
            title
            parent_id
            thumb
          }
        }
      `

      const request = await this.$gqlr(query, {parent_id: parseInt(parent_id)})

      if (parent_id === null) this.rootsCache = request.productCategories
      setTimeout(() => {
        this.categories = request.productCategories
      }, 200);
    }
  },
  mounted() {
    if (this.roots.length === 0) this.getCategories(null)
  }
}
</script>

<style lang="scss">
.slide-fade-enter-active {
  transition: all .3s ease-out;
}
.slide-fade-leave-active {
  transition: all .5s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(21px);
  opacity: 0;
}

.slide-fade-move {
  opacity: 1;
}

</style>