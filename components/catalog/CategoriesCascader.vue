<template>
  <div class="categoriesCascader" id="categories">
    <Transition name="slide-fade" appear>
      <Cell
        v-if="parent"
        :value="parent.title"
        @click="levelBack"
        icon="arrow-left"
        clickable
      />
    </Transition>
    <Transition appear name="slide-fade" mode="out-in">
      <MmmLoading v-if="isLoading" list />
      <div v-else class="categoriesCascader__items">
        <template v-for="(category, index) in categories">
          <Cell
            v-if="category.children_count !== 0 || category.products_count !== 0"
            v-bind:key="category.id"
            :title="category.title"
            is-link
            clickable
            :to="formulateUrl(category)"
            @click="select(category)"
          />
        </template>
      </div>
    </Transition>
  </div>
</template>
<script>
import { gql } from 'nuxt-graphql-request'
import { Cell } from 'vant'

const queryRoots = gql`
      query {
        productCategories(
          parent_id: null
        ) {
          id
          uuid
          slug
          title
          thumb
          parent_id
        }
      }
    `,
    queryCats = gql `
      query productCategories($parent_id: Int) {
        productCategories(
          parent_id: $parent_id
        ) {
          id
          uuid
          slug
          title
          parent_id
          thumb
          products_count
          children_count
        }
      }
    `

export default {
  components: {Cell},
  props: {
    
  },
  data() {
    return {
      parent: false,
      categories: [],
      flat: [],
      rootsCache: [],
    }
  },
  computed: {
    isLoading() {
      return (this.categories.length === 0 || this.rootsCache.length === 0) ? true : false
    }
  },
  methods: {
    async select (category) {
      this.categories = []
      const cats = await this.getCategories(category.id)
      setTimeout(() => this.categories = cats, 200)
      setTimeout(() => this.parent = category, 200)
    },
    async levelBack() {
      this.categories = []
      const hasParent = this.getParentOf(this.parent)

      if (!hasParent) return this.goToRoots()

      this.parent = hasParent
      let children = this.getChildrenOf(hasParent)
      if (!children) children = await this.getCategories(hasParent.id)
      setTimeout(() => this.categories = children, 200)
      return
    },
    addToFlat(cats) {
      let flat = this.flat
      cats.forEach(cat => {
        if (parseInt(cat.children_count) !== 0 && !flat.find(it => parseInt(it.id) === parseInt(cat.id))) flat.push({...cat, ...{children: []}})
        let parent = flat.find(it => parseInt(it.id) === parseInt(cat.parent_id))
        
        if (!parent) {
          flat.push({...cat, ...{children: []}})
        } else {
          if (!parent.children) parent = {...parent, ...{children: []}}
          if (
            parent.children.length === 0 
            || !parent.children.find(it => parseInt(it.id) === parseInt(cat.id))
          ) parent.children.push(cat)
          flat.map(it => {
            if (it.id == parent.id) return parent
            return it
          })
        }
      })
      this.flat = flat
    },
    getParentOf(item) {
      return item.parent_id === null ? false : this.flat.find(it => parseInt(it.id) === parseInt(item.parent_id))
    },
    getChildrenOf(item) {
      const fromFlat = this.flat.find(it => parseInt(it.id) === parseInt(item.id))
      return (fromFlat && fromFlat.children && fromFlat.children.length) ? fromFlat.children : false
    },
    goToRoots () {
      this.categories = []
      setTimeout(() => this.categories = this.rootsCache, 200)
      this.parent = false
    },
    async getCategories (parent_id = null) {
      this.categories = []
      const request = await this.$gqlr(queryCats, {parent_id: (parent_id === null) ? null : parseInt(parent_id)}),
            cats = await request.productCategories

      this.addToFlat(cats)
      return await cats
    },
    setCategories(cats) {
      setTimeout(function() {
        console.log(this.categories)
        console.log(this.categories)
      }, 200);

    },
    formulateUrl(category) {
      if (!category.products_count) return '#categories'

      // const root = this.rootsCache.find(it => parseInt(it.id) === parseInt(parent.parent_id))
      
      // if (!root || root.parent_id !== null) {
      //   const preroot = this.flat.find(it => parseInt(it.id) === parseInt(parent.parent_id))
      //   console.log(preroot)
      //   if (preroot) {
      //     root = this.rootsCache.find(it => parseInt(it.id) === parseInt(preroot.parent_id))
      //     return `/${root.slug}/${this.parent.slug}/${category.slug}`
      //   }
      // }
      let rootSlug = false
      if (this.parent.parent_id != null) {
        let root = this.flat.find(it => it.id == this.parent.parent_id)
        if (root && root.parent_id != null) root = this.flat.find(it => it.id == root.parent_id)
        rootSlug = root.slug
      }

      const url = rootSlug ? '/'+rootSlug : ''

      return `${url}/${this.parent.slug}/${category.slug}`
    }
  },
  async mounted() {
    const cats = await this.getCategories()
    this.categories = cats
    if (this.rootsCache.length === 0) this.rootsCache = cats
    if (this.flat.length === 0) this.flat = cats
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