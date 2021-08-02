<template>
  <div class="productCard productCard--large">
    <nuxt-link :to="to" class="productCard__thumb" :style="'background-image: url('+thumb+');'">
      <div class="productCard__labels"></div>
    </nuxt-link>
    <nuxt-link :to="to" class="productCard__info">
      <div class="productCard__title">
        {{ title }}
      </div>
      <div class="productCard__description">
        {{ description }}
      </div>
      <div :to="to" class="productCard__attributes">
        {{ attributes }}
      </div>
    </nuxt-link>
    <div class="productCard__actions">
      <div class="productCard__price">
        <CardPrice />
      </div>
      <div class="productCard__like">

      </div>      
      <div class="productCard__cart" :class="{'is-added': isAdded}" @click="addToCart">
        <AddToCartButton
          :product_id="id"
        />
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'ProductCardLarge',
  props: {
    to: String,
    id: Number,
    title: String,
    thumb: String,
    attributes: Array,
    price: String,
    description: String
  },
  data() {
    return {
      isAdded: false
    }
  },
  methods: {
    addToCart() {
      this.isAdded = true
    }
  },
}
</script>

<style lang="scss">
@import '~assets/scss/pages/catalog/productCard';


@include block(productCard) {
  @include modifier(large) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    @include padding-vw(21px);
    @include margin-vw(34px, 0);
    background: linear-gradient(145deg, #ffffff, #f9f9f9);
    box-shadow: 16px 16px 54px #ececec, -16px -16px 54px #ffffff;
    @include font-vw(17px);

    @include element(thumb) {
      width: 21%;
      flex-shrink: 0;
      min-width: 233px;
      height: auto;
      min-height: 233px;
      @include fluid(margin-right, 21px);
      @include fluid(margin-top, -13px);
      @include fluid(margin-bottom, -13px);
      background-size: contain;
    }

    @include element(info) {
      width: 55%;
      flex-shrink: 0;
    }

    @include element(description) {
      @include fluid(margin-top, 21px);
    }

    @include element(action) {
      min-width: 55px;
    }
  }  
}


</style>