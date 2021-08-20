<template>
  <div class="catalog">
    <div class="catalogHeader">
      <div class="catalogHeader__found">
        {{ totalCount }}
      </div>
      <div class="catalogHeader__actions">
        <MmmButton :offset-x="1" primary outline @click="showSortingSheet">
          <MmmCssIcon type="sort" />
        </MmmButton>
        <MmmButton primary outline>
          <MmmCssIcon type="filters" />
        </MmmButton>
      </div>
    </div>
    <MmmSection>
      <List
        ref="productsList"
        v-if="total"
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="Произошла ошибка. Нажмите здесь, чтобы перезагрузить."
        @load="load"
      >
        <ReCardProduct 
          v-for="product in products" 
          :key="product.id"
          horizontal
          v-bind="product" 
        />

        <template #loading>
          <MmmLoading />
        </template>
        <template #finished>
          Все подходящие товары были загружены.
          <MmmToTop />
        </template>
      </List>
      
      <div v-else class="catalog__notFound">
        Не найдено товаров по вашему запросу
      </div>
    </MmmSection>
    <ActionSheet 
      v-model="state.sortingSheet" 
      :actions="sortingOptionsAsActions" 
      @select="onSortingSelect"
      close-on-click-action
      title="Сортировка"
    />
    <ActionSheet 
      v-model="state.filtersSheet" 
      title="Аттрибуты товаров"
    >
      <ReCatalogFilters
        :category-uuid="category.uuid"
      />
    </ActionSheet>
  </div>
</template>

<script>
import {List, Card, ActionSheet} from 'vant'
import { gql } from 'nuxt-graphql-request'

export default {
  components: {
    List, Card, ActionSheet
  },
  async asyncData({$gqlr, params, store}) {
    const query = gql`
      query catalogCategory($slug: String) {
        productCategory(slug: $slug) {
          id
          uuid
          slug
          title
          parent {
            slug,
            title
          }
        }
      }
    `,
          request = await $gqlr(query, {slug: params.child_slug ?? params.slug})
    await store.commit('SET_APPBAR_TITLE', request.productCategory.title)
    await store.commit('SET_APPBAR_PREVIOUS', request.productCategory.parent)
    return {
      category: request.productCategory,
      parent: request.productCategory.parent
    }
  },
  data() {
    return {
      products: [],
      total: null,
      error: false,
      loading: false,
      finished: false,
      gqlRequestSending: false,
      page: 0,
      perPage: 12,
      sorting: 'VIEWS',
      filters: {},
      options: {
        sorting: [
          {
            value: 'VIEWS',
            text: 'сначала популярные'
          },
          {
            value: 'PRICE-ASC',
            text: 'сначала дешевле'
          },
          {
            value: 'PRICE-DESC',
            text: 'сначала дороже'
          },
        ]
      },
      sortingColumns: {
        'VIEWS': {column: 'VIEWS', order: 'DESC'},
        'PRICE-ASC': {column: 'PRICE', order: 'ASC'},
        'PRICE-DESC': {column: 'PRICE', order: 'DESC'},
      },
      state: {
        sortingSheet: false,
        filtersSheet: false
      }
    }
  },
  head() {
      return {
        title: this.parent ? this.parent.title + ' ' + this.category.title : this.category.title,
      }
  },
  fetchOnServer: false,
  async fetch() {
    const query = gql`
      query count($category_id: Int) {
        productsCount(
          category_id: $category_id
        )
      }
    `
    const response = await this.$gqlr(query, {category_id: this.category.id})
    this.$log(response)
    this.total = response.productsCount
  },
  computed: {
    totalCount(){
      return (this.total && this.total !== null) ? this.total + ' ' + this.$rusEndings(this.total, ['товар', 'товара', 'товаров']) : ''
    },
    sortingActivatorTitle(){
      const sorting = this.options.sorting.find(item => item.value === this.sorting)
      return (sorting) ? sorting.text : null
    },
    sortingOptionsAsActions(){
      const sorting = this.sorting
      return this.options.sorting.map(item => {
        return {name: item.text, value: item.value, disabled: item.value === sorting}
      })
    }
  },
  methods: {
    reload() {
      this.products = []
      this.page = 0
      this.load()
    },
    load() {
      if (this.gqlRequestSending || this.finished) return
      this.page = this.page + 1
      const query = gql`
        query catalogProducts (
          $category_id: Int, 
          $page: Int, 
          $per_page: Int, 
          $sorting: [QueryProductsLazySortingOrderByClause!]
        ) {
          productsLazy (
            category_id: $category_id, 
            first: $per_page, 
            page: $page, 
            sorting: $sorting
          ) {
            paginatorInfo {
              count
              currentPage
              lastItem
            }
            data {
              id
              uuid
              title
              slug
              price
              price_formatted
              thumb
              description_cutted
            }
          }
        }
      `
      const variables = {
        category_id: this.category.id,
        page: this.page,
        per_page: this.perPage,
        sorting: [this.sortingColumns[this.sorting]]
      }
      this.gqlRequestSending = true
      this.$gqlr(query, variables)
            .then(response => {
              this.$log(response)
              if (response.productsLazy.paginatorInfo.lastItem === null) {
                this.finished = true
                this.$log('finished')
              } else {
                this.products = [...this.products, ...response.productsLazy.data]
              }
            })
            .catch(e => {
              console.log(e)
              this.error = true
            })
            .finally(() => {
              this.loading = false
              this.gqlRequestSending = false
              this.$log('finally')
            })

    },
    showSortingSheet() {
      this.state.sortingSheet = true
    },
    showFiltersSheet() {
      this.state.filtersSheet = true
    },
    onSortingSelect(item) {
      if (item.disabled) return
      this.sorting = item.value
      this.reload()
    }
  },
  mounted() {
    
  }
}
</script>

<style lang="scss">
.van-action-sheet__item--disabled {
  color: $disabled;
  margin-left: -0.8em;

  &::before {
    content: '';
    display: inline-block;
    transform: rotate(45deg);
    height: 13px;
    width: 8px;
    border-bottom: 3px solid $disabled;
    border-right: 3px solid $disabled;
    margin-right: 1em;
  }
}

  @include block(catalogHeader) {
    display: flex;
    justify-content: space-between;
    @include vmin(padding-left, 21px);
    @include vmin(padding-right, 21px);

    @include element(found) {
      color: $info;
    }
    
    @include element(actions) {
      display: flex;
      flex-shrink: 0;
    }

    @include element(action) {
      @include vmin(margin-right, 21px);
    }
  }
</style>
