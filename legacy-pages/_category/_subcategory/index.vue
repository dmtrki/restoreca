<template>
  <section class="page page--catalog">
    <div class="page__grid page__grid--catalog">
      <div class="page__main">
        <div class="catalogHeader">
          <nuxt-link v-if="parent !== undefined && parent.length !== 0" :to="'/' + parent.slug + '/'" class="catalogHeader__parent">
            <i class="ri-chevron-left"></i>
            {{ parent.title }}
          </nuxt-link>
          <div class="catalogHeader__title">
            <h1 class="title">{{ title }}</h1>
            <div class="catalogHeader__total">
              {{ productsTotal }}
            </div>
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
        <div class="products infiniteWrapper">
          <div class="products__item"
            v-for="product in products" 
            :key="product.id"
          >
            <ProductCardLarge 
              :id="product.id"
              :title="product.title"
              :to="$route.fullPath + product.slug"
              :thumb="product.thumb"
              :description="product.description"
              :price="product.price"
            />
          </div>
          <infinite-loading v-if="isLazing" @infinite="infiniteHandler"></infinite-loading>
        </div>
        <div class="catalogFooter">
          <div class="catalogFooter__toggler">
            <v-switch
            v-model="isLazing"
            :label="'Автоподгрузка'"
          ></v-switch>
          </div>          
          <paginate
            v-model="page"
            :page-count="last_page"
            :click-handler="setPage"
            :prev-text="'<'"
            :next-text="'>'"
            :container-class="'pagination'"
            :page-class="'pagination__item'"
            :page-link-class="'pagination__link'"
            :prev-class="'pagination__prev'"
            :next-class="'pagination__next'"
            :active-class="'is-active'"
            :disabled-class="'is-disabled'"
            :hide-prev-next="true"
          >
          </paginate>
        </div>
        
      </div>
      <div class="page__side">
        <div class="filtersBox" v-if="filters">
          <div class="filtersBox__filter">
            <div class="filter">
              <v-checkbox
                v-model="filters.hasPhoto"
                label="Только с фото"
              ></v-checkbox>
            </div>
            <div v-if="filters.priceRange && priceRange !== undefined" class="filter">
              <div class="filter__header">
                <div class="filter__title">
                  Ценовой диапазон
                </div>
                <div class="filter__actions">
                  <div class="filter__status">
                    {{ filters.priceRange[0]}} ₽ — {{filters.priceRange[1]}} ₽
                  </div>
                </div>
              </div>
              <div class="filter__main">
                <v-range-slider
                  v-model="filters.priceRange"
                  :min="parseInt(фpriceRange[0])" 
                  :max="parseInt(priceRange[1])"
                  :step="100"
                  :track-fill-color="'track-fill-color'"
                  :rules="priceRangeRules"
                ></v-range-slider>
              </div>
            </div>
            <div class="filter" v-if="manufacturers">
              <div class="filter__header">
                <div class="filter__title">
                  Производители
                </div>
                <div class="filter__actions">
                  <div class="filter__bulk button button--xsmall button--transparent" v-ripple>
                    <span v-if="filters.manufacturers.length !== 0">Сбросить</span>
                  </div>
                </div>
              </div>
              <div class="filter__list filter__list--inset">
                <v-list>
                  <v-list-item-group
                    v-model="filters.manufacturers"
                    multiple
                    active-class=""
                  >
                    <v-list-item v-for="manufacturer in manufacturers" :value="manufacturer.id" :key="manufacturer.id">
                      <template v-slot:default="{ active }">
                        <v-list-item-content>
                          <v-list-item-title>
                            {{manufacturer.title}}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-checkbox :input-value="active"></v-checkbox>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </div>
            </div>
          </div>
          <div class="filtersBox__submit">
            <div v-if="changed" @click="setQuery" class="button button--primary button--middle" >Показать</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  transition: 'fade',
  scrollToTop: true,
  key(route) {
    return route.fullPath
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
  watchQuery: true,
  async asyncData({ error, params, query, $axios }) {
    const slug = params.subcategory

    try {
      const response = (
        await $axios.$get('/catalog/list/' + slug, {
          params: {
            page: query.page ?? null,
            sorting: query.sorting ?? null,
            filters: query.filters ?? null,
            price: query.price ?? null,
            manufacturers: query.manufacturers ?? null,
            hasPhoto: query.hasPhoto ?? null,
          }
        })
      )
      console.log(response)
      return response
    } catch (e) {
      error({ statsCode: 404, message: e })
    }
  },
  data() {
    return {
      isLazing: false,
      slug: this.$route.params.subcategory,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      sortingTypes: {
        popularity: {
          type: "popularity",
          title: "популярности"
        },
        priceUp : {
          type: "priceUp",
          title: "возрастанию цены"
        },
        priceDown : {
          type: "priceDown",
          title: "убыванию цены"
        }
      },
      activeSorting: this.$route.query.sorting ?? "popularity",
      stickyOptions: {
        topSpacing:34,
        bottomSpacing: 21,
      },
      priceRangeRules: [
        (value) => {
          let min = value[0], max = value[1]
          if (min >= max) return false
          return true
        }
      ],
      changed: false,
      filters: {
        hasPhoto: false,
        priceRange: [],
        manufacturers: [],
      },
    }
  },
  watch: {
    filters: {
      handler: function() {
        if (!this.changed) this.changed = true
      },
      deep: true
    }
  },
  computed: {
    productsTotal() {
      if ( this.total !== null ) {
        return 'Найдено ' + this.total + ' ' + this.$rusEndings(this.total, ['товар', 'товара', 'товаров'])
      }
      return 0;
    },
    filtersQuery() {
      let query = {}, filters = this.filters

      if (filters.priceRange !== this.priceRange) query.price = filters.priceRange.join(',')
      if (filters.hasPhoto === true) query.hasPhoto = true
      if (filters.manufacturers.length !== 0) query.manufacturers = filters.manufacturers.join(',')

      return query
    }
  },
  methods: {
    setQuery () {
      let query = {}

      if (this.page !== 1) query.page = this.page

      if (this.changed) {
        query.filters = true
        query = {...query, ...this.filtersQuery}
      }

      if (this.activeSorting !== 'popularity') query.sorting = this.activeSorting

      this.$router.push({path: this.$route.path, query: query})
    },
    setActiveSorting (type) {
      this.activeSorting = type
      this.setQuery()
    },
    setPage (page) {
      this.page = page
      this.setQuery()
    },
    infiniteHandler($state) {
      const t = this
      this.$axios.get('/catalog/list/' + t.slug, {
        params: {
          page: t.page + 1,
          sorting: t.$router.query.sorting ?? null,
          filters: t.$router.query.filters ?? null
        }
      }).then(({ data }) => {
        if (data.products.length) {
          t.page += 1
          t.products.push(...data.products)
          $state.loaded()
        } else {
          $state.complete();
        }
      })
    },
  },
  mounted() {
    let query = this.$route.query, price = [...this.priceRange]
    console.log(query)
    if (query.length !== 0) {
      if (query.price) {
        let priceArray = query.price.split(',')
        price = [
          parseInt(priceArray[0]),
          parseInt(priceArray[1]),
        ]

        this.filters.priceRange = price
      }

      if (query.hasPhoto) {
        this.filters.hasPhoto = true
      }

      if (query.manufacturers) {
        let manufacturersArray = query.manufacturers.split(',')
        this.filters.manufacturers = manufacturersArray.map((value) => {
          return parseInt(value)
        })
      }
    }
  },
}
</script>

<style lang="scss">
.track-fill-color {
  background-color: rgba(0, 79, 223, .89)!important;
}
.thumb-color {
  background-color: rgba(26, 133, 225, .21)!important;
}
@import '~assets/scss/pages/catalog.scss';
@include block(page) { 
  @include element(grid) {
    @include modifier(catalog) {
      display: flex;
      flex-wrap: wrap;

      @include element(side) {
        width: 34%;
        @include padding-vw(55px, 21px, 21px, 21px);
      }

      @include element(main) {
        width: 66%;
        @include padding-vw(0, 13px, 21px, 21px);
      }
    }
  }
}

@include block(filtersBox) {
  @include make-card;
  background: #eef0f7;
  box-shadow:  21px 21px 34px #e0e2e8,
             -21px -21px 34px #fcfeff;
  @include padding-vw(8px, 13px);
}

@include block(filter) {
  @include margin-vw(21px, 0, 13px, 0);
  @include padding-vw(13px, 21px);

  @include element(header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include up-vw(margin-bottom, 13px);
  }

  @include element(title) {
    @include font-vw(12px);
    opacity: .55;
  }

  @include element(status) {
    @include font-vw(13px);
    color: lighten($c-prime, 21);
    font-weight: 500;
  }

  @include element(bulk) {
    @include font-vw(8px);
    border-radius: 3px;
  }

  @include element(list) {
    @include padding-vw(13px);
    max-height: 55vh;
    overflow: auto;

    @include modifier(inset) {
      border-radius: 21px;
      background: #f5f5f5;
      box-shadow: inset 6px 6px 23px #e9e9e9,
                  inset -6px -6px 23px #ffffff;
    }
  }
}

@include block(catalogFooter) {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@include block(pagination) {
  display: flex;
  @include padding-vw(8px);
  list-style: none;

  @include element(prev) {
    display: none;
  }

  @include element(next) {
    display: none;
  }

  @include element(item) {
    @include when(active) {
      border-radius: 8px;
      background: #efefef;
      box-shadow: inset 5px 5px 7px #e8e8e8,
            inset -5px -5px 7px #f6f6f6;
      opacity: .89;

      @include element(link) {
        color: $c-main;
      }
    }
  }

  @include element(link) {
    display: block;
    @include padding-vw(8px, 13px);
    @include font-vw(21px);

    &:hover {
      text-decoration: none;
    }
  }
}

</style>