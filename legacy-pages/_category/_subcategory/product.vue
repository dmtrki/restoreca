<template>
  <div class="productLayout" :class="{media: 'productLayout--expanded'}">
    <div class="productLayout__cell productLayout__gallery">
      <product-gallery
        v-if="media"
        :model="id"
      />
      <div 
        v-else-if="image" 
        class="productImage"
        @mouseenter="zoomIn"
        @mouseleave="zoomOut"
      >
        <div class="productImage__pic" ref="productImage" :style="'background-image: url(' + image.src + ');'"></div>
      </div>
    </div>
    <div class="productLayout__cell productLayout__short">
      <div class="productShort">
        <div v-if="manufacturer" class="productShort__manufacturer">
          {{ manufacturer.title }}
        </div>
        <h1 class="productShort__title">
          {{ title }}
        </h1>
        <div class="productShort__stars">

        </div>
        <div class="tags">
          <div v-if="quantity > 0" class="tag tag--large tag--primary_light">Есть на складе</div>
          <div v-else class="tag tag--medium tag--secondary">Под заказ</div>
          <div v-if="deliveryDays" class="tag tag--medium tag--primary_light">
            Поставим за {{ deliveryDaysString }}
          </div>
        </div>
      </div>
    </div>
    <div class="productLayout__cell productLayout__offer">
      <div class="productOffer">
        <div class="productOffer__price productPrice">
          <div class="productPrice__usual">
            {{ price }}
          </div>          
        </div>
        <div 
          class="productOffer__toCart button button--medium button--g_accent"
          @click.prevent="buyClickHandler"
          :class="{'is-added': isProductAdded}"
        >
          <span class="ri-cart-add">
            <span><span></span></span>
          </span>
          <span>
            В корзину
          </span>          
        </div>
        <div class="productOffer__fast button button--xsmall button--transparent" v-ripple>Быстрый заказ</div>
      </div>
    </div>
    <div class="productLayout__cell productLayout__profits" :class="[hasNotDetails ? 'productLayout__profits--wider' : '']">
      <div v-if="garanty" class="profitCard">
        <div class="profitCard__pic" style="background-image: url('/assets/images/garanty.svg');"></div>
        <div class="profitCard__title">
          {{ garantyString }} гарантии
        </div>
        <div class="profitCard__content">
          от производителя
        </div>
      </div>
      <div class="profitCard" style="background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);">
        <div class="profitCard__pic" style="background-image: url('/map.svg');"></div>
        <div class="profitCard__title">
          Доставка по России
        </div>
        <div class="profitCard__content">
          Только надежными транспортными компаниями
        </div>
      </div>
      <div class="profitCard" style="background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);">
        <div class="profitCard__pic" style="background-image: url('/assets/images/garanty.svg');"></div>
        <div class="profitCard__title">
          Сертифицированная продукция
        </div>
        <div class="profitCard__content">
          Все товары, представленные на Рестореке имеют сертификаты соответствия
        </div>
      </div>
    </div>
    <div class="productLayout__cell">
      <div v-if="description" class="productDescription">
        {{ description }}
      </div>
      <div v-if="attributes" class="productAttributes">
        <template v-for="attr in attributes">
          <div v-if="attr.value" :key="attr.attribute_id" class="attribute">
            <div class="attribute__type">
              {{ attr.title }}
            </div>
            <div class="attribute__value">
              {{ attr.value }} {{ attr.unit }}
            </div>
          </div>
        </template>        
      </div>
    </div>
  </div>  
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  scrollToTop: true,
  key(route) {
    return route.fullPath
  },
  watchQuery: true,
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
  async asyncData({ error, params, query, $axios }) {
    const product = params.product
    try {
      const response = (
        await $axios.$get('/catalog/product/show/' + product)
      );
      console.log(response)
      return response
    } catch (e) {
      error({ statsCode: 404, message: e });
    }
  },
  data() {
    return {
      imageBase: 233
    }
  },
  computed: {
    ...mapState({
      products: state => state.cart.products
    }),
    isProductAdded () {
      return this.products.find(p => p.productId === this.product_id)
    },
    deliveryDaysString() {
      if ( this.deliveryDays !== false ) {
        return this.deliveryDays + ' ' + this.$rusEndings(this.deliveryDays, ['день', 'дня', 'дней'])
      }
      return 0;
    },
    garantyString() {
      if ( this.garanty !== false ) {
        return this.garanty + ' ' + this.$rusEndings(this.garanty, ['месяц', 'месяца', 'месяцев'])
      }
      return 0;
    },
    hasNotDetails() {
      if (this.attributes.length != 0 || this.description.length != 0) return false
      return true
    }
  },
  methods: {
    ...mapActions({
      addProduct: 'cart/addProduct',
      toggleAddedSnackbar: 'cart/toggleAddedSnackbar'
    }),
    zoomIn() {
      if (process.client && this.image && this.image.width && this.image.width > this.imageBase) {
        this.$refs.productImage.style.width = this.image.width + 'px';
        this.$refs.productImage.style.height = this.image.width + 'px';
      }
    },
    zoomOut() {
      if (process.client && this.image && this.image.width && this.image.width > this.imageBase) {
        this.$refs.productImage.style.width = this.imageBase + 'px';
        this.$refs.productImage.style.height = this.imageBase + 'px';
      }
    },
    buyClickHandler () {
      if (!this.isProductAdded) {
        this.addProduct(this.product_id)
        this.toggleAddedSnackbar()
      }
    },
  },
  mounted() {
    let imageBase = this.imageBase
    if (this.image && this.image.width < imageBase) imageBase = this.image.width
    this.$refs.productImage.style.width = imageBase + 'px';
    this.$refs.productImage.style.height = imageBase + 'px';
  },
}
</script>

<style lang="scss">
@mixin make-cell {
  @include padding-vw(13px,21px);
}
  @include block(productLayout) {
    @include up-vw(margin-top,34px);
    display: flex;
    flex-wrap: wrap;
    display: grid;
    grid-template-columns: 3fr 5fr 3fr;
    grid-template-rows: repeat(2, min-content);
    gap: 2em 1em;

    @include element(cell) {
      @include make-cell;
    }

    @include element(gallery) {
      display: flex;
      justify-content: center; 
      flex-wrap: wrap;
      @include fluid(min-width, 233px);
      min-height: max-content;
      position: relative;
    }
    @include element(short) {
      
    }

    @include element(offer) {
      position: sticky;
      top: 3vh;
    }

    @include element(profits) {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
      flex-direction: column;      
      @include fluid(padding-top, 13px);
      position: relative;
      z-index: 2;

      @include modifier(wider) {
        flex-direction: row;
        grid-area: 2 / 1 / 3 / 3;
      }
    }
  }

  @include block(productImage) {
    position: absolute;
    top: 0;
    @include fluid(left, 21px);
    @include fluid(padding, 21px);
    transform: translateX(21%);
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow:  21px 21px 34px #e8e8e8,
                -21px -21px 34px #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s ease-out;
    z-index: 1;

    &:hover {
      box-shadow:  34px 34px 55px #e8e8e8,
                -34px -34px 55px #ffffff;
    }

    @include element(pic) {
      @include fluid(width, 233px);
      @include fluid(height, 233px);
      max-width: 55vw;
      max-height: 55vw;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      transition: all .3s ease-in;
    }
  }

  @include block(productShort) {
    @include element(title) {
      @include font-vw(34px);
      font-weight: 400;
    }
  }

  @include block(productAttributes) {
    @include up-vw(margin-top, 21px);
  }

  @include block(productOffer) {
    @include fluid(padding, 21px);
    border-radius: 34px;
    background: linear-gradient(225deg, #fffdff, #d6d4e0);
    box-shadow:  -34px 34px 55px #d9d7e3,
                34px -34px 55px #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @include element(price) {
      width: 100%;
    }

    @include element(toCart) {
      @include fluid(margin-top, 13px);
      display: flex;
      align-items: center;

      span.ri-cart-add {
        @include fluid(margin-right, 21px);
      }
    }

    @include element(fast) {
      width: auto;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      border-radius: 13px;
      @include fluid(margin-top, 21px); 
    }
  }

  @include block(productPrice) {
    @include element(usual) {
      @include ff(34px);
    }
  }

  @include block(tags) {
    display: flex;
    flex-wrap: wrap;
  }

  @include block(tag) {
    @include fluid(margin-right, 13px);

    @include modifier(large) {
      font-size: 1em;
      @include fluid(padding-top, 5px);
      @include fluid(padding-bottom, 5px);
      @include fluid(padding-left, 8px);
      @include fluid(padding-right, 8px);
      border-radius: 8px;
    }
    @include modifier(medium) {
      font-size: .8em;
      @include fluid(padding-top, 3px);
      @include fluid(padding-bottom, 3px);
      @include fluid(padding-left, 5px);
      @include fluid(padding-right, 5px);
      border-radius: 13px;
    }
    @include modifier(primary_light) {
      background-color: lighten($c-prime, 34%);
      color: $c-light;
    }
    @include modifier(secondary) {
      background-color: lighten($c-second, 55%);
      color: lighten($c-main, 34%);
    }
  }

  @include block(attribute) {
    @include up-vw(padding-right, 34px);
    margin-top: .5em;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #fefefe;
    
    @include element(type) {
      color: lighten($c-main, 34);
      font-size: .9em;
    }

    @include element(value) {
      position: relative;
    }
  }

  @include block(profitCard) {
    @include fluid(padding-top, 13px);
    @include fluid(padding-right, 34px);
    @include fluid(padding-bottom, 13px);
    @include fluid(padding-left, 13px);
    @include fluid(margin-bottom, 13px);
    @include fluid(margin-right, 21px);
    @include ff(12px);
    width: min-content;
    @include fluid(width, 223px);
    border-radius: 13px;
    background-image: linear-gradient(120deg, rgba(132, 250, 175, 0.5) 0%, rgba(143, 210, 244, 0.5) 100%);
    display: flex;
    flex-direction: column;
    position: relative;
    backdrop-filter: blur(8px);
    
    @include element(pic) {
      position: absolute;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      @include fluid(width, 34px); 
      @include fluid(height, 34px);
      @include fluid(top, 8px);
      @include fluid(right, -8px);
    }

    @include element(title) {
      font-weight: 600;
      font-size: 1.3em;
    }

    @include element(content) {
      font-size: 1em;
      @include fluid(margin-top, 8px);
      
    }
  }
</style>