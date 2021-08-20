<template>
  <div class="product">
    <div class="product__main">
      <div class="product__photo" ref="productPhoto" :style="singlePhotoStyle" />
      <h1 class="product__title">{{ title }}</h1>
      <div class="product__header">
        <div class="product__rating">
          <Rate 
            v-model="rating" 
            readonly
            color="#FF7C32" 
          />
        </div>
        <div class="product__fav">
          <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.08447 13L6.05722 12.0649C2.40872 8.7564 0 6.57439 0 3.89646C0 1.71444 1.71444 0 3.89646 0C5.12916 0 6.31226 0.573842 7.08447 1.48065C7.85668 0.573842 9.03978 0 10.2725 0C12.4545 0 14.1689 1.71444 14.1689 3.89646C14.1689 6.57439 11.7602 8.7564 8.11172 12.0719L7.08447 13Z" fill="url(#paint0_linear)"/>
            <defs>
              <linearGradient id="paint0_linear" x1="0.453406" y1="-0.640152" x2="2.87004" y2="12.5164" gradientUnits="userSpaceOnUse">
                <stop stop-color="#068CA9"/>
                <stop offset="1" stop-color="#441A87"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div class="product__target">
        <div class="product__price">
          {{ price_formatted }}
        </div>
        <div class="product__call">
          <MmmButton accent rounded gradient small>Купить в 1 клик</MmmButton>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="state.floatingButton" @click="addToCart" class="addToCartFloating">
        <SvgToCart v-if="!isInCart" />
        <CssIcon v-else type="check" />
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {Rate} from 'vant'
import { gql } from 'nuxt-graphql-request'
import CssIcon from '~/components/mmm/CssIcon.vue'

export default {
  components: {
    SvgHeart: () => import('~~/assets/images/heart.svg'),
    SvgToCart: () => import('~~/assets/images/toCartG.svg'),
    Rate: Rate,
    CssIcon
  },
  async asyncData({$log, $gqlr, params, store}) {
    const query = gql`
      query product($uuid: UUID) {
        product(uuid: $uuid) {
          uuid
          slug
          title
          price
          price_formatted
          thumbnail
          photos {
            url(conversion: "medium")
            dimensions
          }
          attributes {
            id
            title
            pivot {
              value
            }
          }
          description_cutted
        }
      }
    `
    const response = await $gqlr(query, {uuid: params.uuid})
    const product = response.product
    const result = await {
      uuid: product.uuid ?? '',
      slug: product.slug ?? '',
      title: product.title ?? '',
      price: product.price ?? '',
      price_formatted: product.price_formatted ?? '',
      thumbnail: product.thumbnail ?? '',
      photos: product.photos,
      attributes: product.attributes ?? '',
      description: product.description_cutted ?? '',
    }
    store.commit('SET_APPBAR_TITLE', '')
    store.commit('SET_APPBAR_SUBTITLE', result.title)
    store.commit('SET_APPBAR_PREVIOUS', null)
    return result
  },
  data() {
    return {
      rating: 5,
      state: {
        floatingButton: false
      }
    }
  },
  computed: {
    ...mapState({
      items: state => state.cart.items
    }),
    hasSinglePhoto() {
      if (this.photos.length > 1) return false
      return true
    },
    singlePhotoStyle() {
      if (!this.hasSinglePhoto && !this.photos[0]) return false
      const height = this.photos[0]?.dimensions.height,
            width = this.photos[0]?.dimensions.width,
            ratio = width / height,
            rationedHeight = (process.client) ? window.innerWidth / ratio : height;
      
      console.log(this.$refs)

      return `background-image: url(${this.photos[0]?.url}), url(${this?.thumbnail});
              height: 100vw;
              height: ${rationedHeight}px;
              max-height: ${height}px;
              max-width: ${width}px;`
    },
    isInCart() {
      return this.items.find(it => it.uuid === this.uuid)
    }
  },
  head() {
      return {
        title: this.title ?? ''
      }
  },
  methods: {
    ...mapActions({
      addToStore: 'cart/add'
    }),
    addToCart() {
      if (this.isAdded) return
      this.addToStore(this.uuid)
      setTimeout(() => this.state.floatingButton = false, 2100)
    },
    hideFloatingButton() {
      this.state.floatingButton = false
    }
  },
  mounted() {
    if (!this.isInCart) this.state.floatingButton = true
  }

}
</script>

<style lang="scss" scoped>
  @include block(product) {

    @include element(main) {
      background: linear-gradient(122.09deg, #E3E6F0 3.57%, #EFF2FF 3.58%, #D7D7F3 104.48%);
      border: 2px solid #D9D9FF;
      border-radius: 0 0 34px 34px;

      @include vmin(padding-left, 21px);
      @include vmin(padding-right, 21px);
      @include vmin(padding-bottom, 34px);
      @include vmin(padding-top, 89px);
      @include vmin(margin-top, -89px);
    }

    @include element(photo) {
      @include vmin(height, 233px);
      width: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 21px;
    }

    @include element(title) {
      @include titled;
      @include mfs(18px);
      @include vmin(margin-top, size("4"));        
      font-weight: 500;
      line-height: 24px;
    }

    @include element(header) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include vmin(margin-top, 13px);
    }

      @include element(rating) {
        color: $info;
        width: 50%;
        flex-shrink: 0;
      }

      @include element(fav) {
        color: $info;
        width: 50%;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
      }

    @include element(target) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include vmin(margin-top, size("4"));
    }
    
    @include element(price) {
      @include mfs(21px);
      color: $primary;
    }
  }

  .addToCartFloating {
    // width: 55px;
    // height: 55px;
    position: fixed;
    z-index: 13;
    bottom: 34px;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #F3F3F3;
    background: linear-gradient(135deg, #FFFFFF 0%, #E6E6E6 100%);
    box-shadow: -13px 13px 26px rgba(25, 48, 234, 0.47), 13px -13px 26px rgba(103, 0, 255, 0.2), -13px -13px 26px rgba(255, 255, 255, 0.9), 13px 13px 33px rgba(110, 192, 196, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(74, 242, 242, 0.5);    @include vmin(padding, 13px);
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .21s;
  }

@include v-transition;

</style>
