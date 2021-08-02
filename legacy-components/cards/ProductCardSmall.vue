<template>
  <nuxt-link :to="to" class="productCard productCard--sale productCard--small">
    <div class="productCard__thumb" :style="'background-image: url('+thumb+');'"></div>
    <div :to="to" class="productCard__info">
      <div class="productCard__title">
        {{ title }}
      </div>
      <div class="productCard__description">
        {{ description }}
      </div>
    </div>
    <div class="productCard__price">
      <ProductCardPrice :price="price" />
    </div>
    <div class="productCard__labels">

    </div>
    <div class="productCard__like">

    </div>
    
    <div class="productCard__cart">
      <AddToCartButton
        :product_id="id"
      />
    </div>
  </nuxt-link>
</template>

<script>

export default {
  name: 'ProductCardSmall',
  props: {
    id: Number,
    to: String,
    title: String,
    thumb: String,
    description: String,
    price: String
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
  @import '~assets/scss/pages/catalog/productCard';

  
@include block(productCard) {
  @include modifier(small) {
    @include ff(13px);
    @include vmin(width,185px);
    box-shadow: -5px 5px 10px rgba(222, 222, 222, 0.13), 5px -5px 10px rgba(222, 222, 222, 0.13), -5px -5px 10px rgba(255, 255, 255, 0.55), 5px 5px 13px rgba(222, 222, 222, 0.55), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(222, 222, 222, 0.5);
    border-radius: 13px;
    @media screen and (min-width: $breakpoint-desktop) {
      @include vw(height,300px);
    }
    @media screen and (max-width: $breakpoint-desktop - 1) {
      @include vmin(min-height,300px);
    }

    @include element(thumb) {
      width: 100%;
      max-width: 100%;
      @include vmin(width,159px);
      @include vmin(height, 185px);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }      

    @include element(info) {
      display: block;
      background-color: $bg-light;
      transition: all .21s ease-in;
      border-radius: 8px;
    }

    @include element(price) {
      width: 100%;
      background-color: $bg-light;
      background: linear-gradient(0deg, $bg-light 50%, rgba(255,255,255,.34) 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      @media screen and (min-width: $breakpoint-desktop) {
        @include vw(height, 55px);
        @include vw(padding, $cardPadding);
        position: absolute;
        bottom: 0;
        left: 0;
      }
      @media screen and (max-width: $breakpoint-desktop - 1) {
        @include vmin(padding, $cardPadding);
        position: relative;
      }
    }

    

    @include element(cart) {
      overflow: hidden;
      position: absolute;
      bottom: 0;
      right: 0;
     
      @media screen and (min-width: $breakpoint-desktop) {
        @include vw(padding, 13px);
      }
      @media screen and (max-width: $breakpoint-desktop - 1) {
        @include vmin(padding, 13px);
      }
    }

    &:hover {
      transform: scale(1.1);
      z-index: 2;

      @include element(info) {
        transform: translateY(-50%);
      }

      @include element(title) {
        color: lighten($c-main, 21);
      }      

      .price__date {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}
</style>