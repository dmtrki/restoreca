<template>
  <div class="productCardHorizontal">
    <div class="productCardHorizontal__thumb" :style="`background-image: url(${thumb});`">
      <ul class="productCardHorizontal__labels">
        <li class="productCardHorizontal__label"></li>
      </ul>
    </div>
    <div class="productCardHorizontal__info">
      <div class="productCardHorizontal__main">
        <div class="productCardHorizontal__title">
          {{ title }}
        </div>
        <ul class="productCardHorizontal__tags">

        </ul>
      </div>
      <div class="productCardHorizontal__side">
        <div v-if="!discounted" class="productCardHorizontal__price">
          {{ price_formatted }}
        </div>
        <div v-else class="productCardHorizontal__price_discounted">
          <div class="productCardHorizontal__price_discount"></div>
          <div class="productCardHorizontal__price_actual"></div>
          <div class="productCardHorizontal__price_origin"></div>
        </div>
        <div class="productCardHorizontal__actions">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thumb: {
      type: String,
      default: '/images/pp.png'
    },
    labels: {
      type: Array,
      default: () => []
    },
    id: {
      type: String | Number,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      default: () => []
    },
    description: {
      type: String,
      required: false
    },
    price: {
      type: String,
      required: false
    },
    price_formatted: {
      type: String,
      default: ''
    },
    discounted: {
      type: Boolean,
      default: false
    },
    priceDiscounted: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
  @include block(productCardHorizontal) {
    @include padding-vmin(13px);
    display: flex;
    justify-content: space-between;
    cursor: pointer;


    @include element(thumb) {
      @include thumb-bg;
      flex-shrink: 0;
      @include vmin(width, 89px);
      @include vmin(height, 89px);
    }

    @include element(info) {
      @include padding-vw(13px, 13px, 8px, 21px);
      @include flex-centered;
      flex-direction: column;
    }

    @include element(side) {
      @include flex-centered-between;
    }
  }
</style>