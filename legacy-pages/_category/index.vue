<template>
  <section>
    <section v-if="$device.isDesktopOrTablet" class="page page--category">
      <div class="catalogHeader">
        <nuxt-link :to="'/'" class="catalogHeader__parent">
          <i class="ri-chevron-left"></i>
          Каталог оборудования для HORECA
        </nuxt-link>
        <div class="catalogHeader__title">
          <h1 class="page__title">{{ title }}</h1>
        </div>          
        <div class="catalogHeader__actions">
          <div class="catalogHeader__sorting">
            Сортировать по 
            <v-menu 
              offset-y
              :close-on-click="true"
              :close-on-content-click="true"
            >
              <template v-slot:activator="{ on, attrs }">
                <div                     
                  v-bind="attrs"
                  v-on="on"
                  class="button button--xsmall button--transparent"
                >
                  {{ sortingTypes[activeSorting].title }}
                </div>
              </template>
              <v-list>
                <template
                  v-for="sortingType in sortingTypes"
                >
                  <v-list-item
                    :key="sortingType.type"
                    v-if="sortingType.type !== activeSorting" 
                    @click="setActiveSorting(sortingType.type)"
                  >
                    <v-list-item-title>
                      {{sortingType.title}}
                    </v-list-item-title>
                  </v-list-item>                    
                </template>
              </v-list>
            </v-menu>
          </div>
        </div>
      </div>
      <div class="page__grid page__grid--category">
        <div class="page__side">
          <input type="text" v-model="search" placeholder="Быстрый поиск категории" class="input input--primary"/>
          <ul class="list">
            <li v-for="subcat in filteredCats" :key="subcat.id">
              <nuxt-link :to="subcat.url">
                {{ subcat.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="page__main">
          <LazyLastProducts 
            v-for="subcat in futured"
            :key="subcat.id"
            :path="'/' + slug + '/' + subcat.slug + '/'"
            :category="subcat.id"
            :title="subcat.title"
            :count="subcat.products_count"
          />
          <LazyCategoriesGrid
            v-if="subcats"
            :categories="subcats"
            :modifiers="['category']"
            :cardModifiers="['medium']"
          />
        </div>
      </div>
    </section>
    <!--MOBILE START HERE-->
    <section v-else>
      <AppBar
        :title="title"
      />
      <RHorizontal>
        <RHorizontalItem 
          v-for="subcat in subcats" 
          :key="subcat.id"
        >
          <nuxt-link
            :to="subcat.url" 
          >
            {{ subcat.title }}
          </nuxt-link>
        </RHorizontalItem>          
      </RHorizontal>
      <div class="container">
        <LazyLastProducts 
          v-for="subcat in futured"
          :key="subcat.id"
          :path="'/' + slug + '/' + subcat.slug + '/'"
          :category="subcat.id"
          :title="subcat.title"
          :count="subcat.products_count"
        />
      </div>
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
  async asyncData({ params, $axios }) {
    const slug = params.category
    const category = await $axios.$get('/categories/show/' + slug)
    return category
  },
  data() {
    return {
      title: '',
      sortingTypes: {
        popularity: {
          type: "popularity",
          title: "популярности"
        },
        alphabet : {
          type: "alphabet",
          title: "алфавиту"
        },
        productsCount : {
          type: "productsCount",
          title: "количеству товаров"
        }
      },
      activeSorting: this.$route.query.sorting ?? "popularity",
      search: '',
    }
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
  methods: {
    
  },
  computed: {
    sortedCats() {
    },
    filteredCats() {
      let s = this.search.toLowerCase()
      return this.subcats.filter(n => {
        return Object.values(n).some(m => m.toString().toLowerCase().includes(s))
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/catalog.scss';

@include block(list) {
  @include font-vw(12px);

  li {
    @include up-vw(padding,5px);
  }
}

@include block(page) { 
  @include up-vw(margin-top, 34px);
  @include element(grid) {
    @include modifier(category) {
      display: flex;
      flex-wrap: wrap;

      @include element(side) {
        width: 21%; 
      }

      @include element(main) {
        width: 77%;
        margin-left: 2%;
        @include up-vw(padding-left,21px);
      }
    }
  }
}

@include block(catsGrid) {
  @include modifier(category) {
    @include up-vw(margin-top,34px);
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-flow: dense;
  }
}


@include block(m_slider) {
  @include modifier(subcategories) {
    @include fluid(margin-top, 21px);

    @include element(item) {
      @include fluid(margin-left, 13px);
      @include fluid(margin-right, 13px);
    }
  }
}
@include block(m_subcategoryButton) {

}
</style>