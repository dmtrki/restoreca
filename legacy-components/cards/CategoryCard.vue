<template>
  <NuxtLink v-if="category" :to="category.url" :class="classList">
    <div v-if="category.thumb" class="catCard__pic" :style="'background-image: url(' + category.thumb.thumb + ');'"></div>
    <div class="catCard__title">
      {{category.title}}
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      required: true
    },
    parent: {
      type: String
    },
    modifiers: {
      type: Array
    }
  },
  computed: {
    classList() {
      let classes = 'catCard';
      if (this.modifiers) {
        this.modifiers.forEach(element => {
          classes += ' catCard--'+element
        });
      }
      return classes
    },
  },
}
</script>

<style lang="scss" scoped>
  @include block(catCard) {
    display: block;
    width: auto;
    max-width: 100%;
    background: $c-light;
    box-shadow: -5px 5px 10px rgba(234, 234, 234, 0.2), 5px -5px 10px rgba(234, 234, 234, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 13px rgba(234, 234, 234, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(234, 234, 234, 0.5);
    border-radius: 21px;
    @include font-vw(16px);
    @include perfect-transition;  
    text-decoration: none;
    @media screen and (min-width: $breakpoint-desktop) {
      @include vw(min-width,155px);
      @include vw(padding, 13px);
    }
    @media screen and (max-width: $breakpoint-desktop - 1) {
      @include vmin(min-width,155px);
      @include vmin(padding,13px);
    }

    @include element(pic) {
      width: 100%;
      
      max-height: 144px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      @media screen and (min-width: $breakpoint-desktop) {
        @include vw(height,89px);
      }
      @media screen and (max-width: $breakpoint-desktop - 1) {
        @include vmin(height,89px);
      }
    }

    @include element(title) {
      @include up-vw(margin-top,13px);
    }

    &:hover {
      transform: scale(.99);
      box-shadow: -2px 2px 5px rgba(234, 234, 234, 0.2), 2px -2px 5px rgba(234, 234, 234, 0.2), -2px -2px 5px rgba(255, 255, 255, 0.9), 2px 2px 8px rgba(234, 234, 234, 0.9), inset 1px 1px 1px rgba(255, 255, 255, 0.3), inset -1px -1px 1px rgba(234, 234, 234, 0.5);
    }

    @include modifier(byType) {
      background: linear-gradient(135deg, #FFFFFF 0%, #F2F2F2 100%);
      border: 2px solid #F7F7F7;
      box-shadow: -8px 8px 16px rgba(214, 214, 214, 0.2), 8px -8px 16px rgba(214, 214, 214, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.9), 8px 8px 20px rgba(214, 214, 214, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(214, 214, 214, 0.5);
      color: $c-second;
      text-decoration: none;
      text-transform: uppercase;
      text-align: center;
      font-weight: 500;
      width: auto;
      max-width: 100%;
      min-width: 108px;
      @include font-vw(16rem);
    }

    @include modifier(glass) {
      background: rgba( 255, 255, 255, 0.89 );
      box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
      backdrop-filter: blur( 8.0px );
      -webkit-backdrop-filter: blur( 8.0px );
    }

    @include modifier(small) {
      @include font-vw(13px);
      font-weight: 600;

      @include element(pic) {
        width: 100%;
        @include up-vw(height,55px);
        max-height: 144px;
        background-position: center;
        //background-size: contain;
        background-repeat: no-repeat;
      }
    }
    
    @include modifier(inline) {
      display: flex;
      align-items: center;
      width: auto;
      margin: 1em;
      background: #f0f6ff;
      box-shadow:  -13px 13px 34px #dde2eb,13px -13px 34px #ffffff;

      @include element(pic) {
        @include up-vw(height,34px);
        @include up-vw(width,34px);
        margin-right: 1em;
      }

      @include element(title) {
        margin-top: 0;
      }
    }

    @include modifier(equal_small) {
      @media screen and (min-width: $breakpoint-desktop) {
        @include vw(width,155px);
        @include vw(height,155px);
      }
      @media screen and (max-width: $breakpoint-desktop - 1) {
        @include font-vmin(13px);
        @include vmin(padding,13px);
        @include vmin(width,89px);
      }
    }

  }
</style>