<template>
  <div class="homeHeader">
    <VanCell>
      <template #title>
        <nuxt-link to="/" class="logo logo--header" />
      </template>
      <template>
        <div class="homeHeader__phone">
          +7 (123) 123-12-34
          <!-- {{commonData.company.common_phone}} -->
        </div>
        <VanButton 
          size="small"
          icon="phone-o"
          type="primary"
        >
          Заказать звонок
        </VanButton>
      </template>      
    </VanCell>
  </div>
</template>
<script>
export default {
  props: {
    headerData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss">
@media screen and (max-width: $breakpoint-to-fluid - 1px) {
  //@import "~assets/scss/common/forms";
  @include block(m_homeHeader) {
    width: 100%;
    @include vmin(padding, 21px);
    
    display: flex;
    flex-wrap: wrap;
    background-color: $bg-light-accent;
    background: $bg-light-accent-g;
    width: 100%;
    
    @include element(logo) {
      width: 34%;
      flex-shrink: 0;
    }
    @include element(actions) {
      width: 66%;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    @include element(phone) {
      @include mfs(21px);
      color: $c-prime;
    }

    @include element(callback) {
      margin-top: 2vmin;
    }

    @include element(search) {
      width: 100%;
      @include vmin(margin-top, 21px);

      input {
        @include vmin(padding-top, 13px);
        @include vmin(padding-right, 21px);
        @include vmin(padding-bottom, 13px);
        @include vmin(padding-left, 55px);
      }
    }


    .logo {
      display: flex;
      align-items: center;
      background-image: url(~~assets/images/logo.svg);
      background-repeat: no-repeat;
      min-height: 34px;
      height: 100%;
      width: auto;
      text-decoration: none;
    }
  }

  @include block(search) {

    @include element(ri) {
      color: $c-light;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      @include vmin(left, 21px);
    }
  }

  @include block(m_homeProjectsPromo) {

  }

  @include block(m_card) {
    @include vmin(padding, 13px);
    border-radius: 21px;
    background: #e4e5ff;
    box-shadow:  8px 8px 34px #c6c7de,
                -8px -8px 34px #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include font-vmin(16px);
    width: min-content;
    @include vmin(max-width, 223px);
    text-decoration: none;

    @include element(icon) {
      @include vmin(width, 55px);
      @include vmin(height, 55px);
      @include vmin(margin-bottom, 13px);
    }

    @include modifier(accent) {
      background: $bg-dark-accent-g;
      color: $c-light!important;
    }
    @include modifier(accent2) {
      background: linear-gradient(104.34deg, #0F4C81 -3.95%, #0B9B9B 101.28%);
      color: $c-light!important;
    }
    @include modifier(accent3) {
      background: linear-gradient(137deg, rgba(38,171,154,1) 0%, rgba(64,95,214,1) 100%);
      color: $c-light!important;
    }

    @include modifier(xsmall) {
      @include vmin(padding-bottom, 12px);
      @include vmin(padding-top, 12px);
      @include vmin(padding-left, 21px);
      @include vmin(padding-right, 21px);
      font-weight: 600;
      @include mfs(12px);
      width: min-content;
    }
  }

  @include block(m_slider) {
    @include vmin(margin-top, 21px);
    max-widtH: 100%;

    @include element(item) {
      @include vmin(margin-right, 13px);
    }

     @include element(next) {
      transform: translateY(-223%);
       position: relative;
       @include vmin(width, 34px);
        @include vmin(height, 34px);
        border-radius: 13px;
        background: rgba(255,255,255,.34);
        box-shadow:  34px 34px 54px #dedede,
                    -34px -34px 54px #ffffff;

      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        border-top: 3px solid $c-prime;
        border-right: 3px solid $c-prime;
        @include vmin(width, 13px);
        @include vmin(height, 13px);
        transform: rotate(45deg);
        transform: translate(-68%,-50%) rotate(45deg);
      }
    }

    @include element(prev) {
      transform: translateY(-223%);
       position: relative;
       @include vmin(width, 34px);
        @include vmin(height, 34px);
        border-radius: 13px;
        background: rgba(255,255,255,.34);
        box-shadow:  34px 34px 54px #dedede,
                    -34px -34px 54px #ffffff;

      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        border-top: 3px solid $c-prime;
        border-right: 3px solid $c-prime;
        @include vmin(width, 13px);
        @include vmin(height, 13px);
        transform: translate(-50%,-50%) rotate(-135deg);
      }
    }

    @include modifier(roots) {
    
    }
  }

  @include block(m_featured) {
    cursor: pointer;
    position: relative;
    width: min-content;
    width: 55vmin;
    @include vmin(padding-bottom, 13px);
    @include vmin(padding-top, 55px);
    @include vmin(padding-left, 21px);
    @include vmin(padding-right, 21px);
    border-radius: 21px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: $c-light;
    text-decoration: none;

    @include element(pic) {
      @include vmin(min-height, 55px);
      @include vmin(max-height, 89px);
      @include vmin(max-width, 89px);
      position: absolute;
      @include vmin(top, -34px);
      @include vmin(left, -34px);
      
    }

    @include element(title) { 
      @include vmin(min-height, 55px);
      @include font-vmin(18px);
      display: flex;
      align-items: flex-end;
    }

    @include element(details) {
      @include vmin(padding-top, 8px);
      @include font-vmin(10px);
      font-weight: 600;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-align: right;
    }
  }
   

  @include block(title) {
    @include mfs(21px);
    font-weight: 300;
    max-width: 100%;
  }

  @include block(m_homeProjectsPromo) {    
    max-width: 100%;
    @include vmin(margin-top, 34px);
    
    @include vmin(margin-bottom, 89px);
  }
}
</style>

<style scoped>
div.m_slider >>> .v-hl-container {
  clip-path: none;
  padding-top: 34px;
  padding-bottom: 34px;
  margin-bottom: 0;
}

div.m_slider >>> .v-hl-btn.v-hl-btn-between {
  transform: none;
}
</style>