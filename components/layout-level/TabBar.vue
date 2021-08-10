<template>
  <div class="tapbar">
    <div class="tapbarItem">
      <div class="tapbarItem__icon">
        <MmmCssIcon type="catalog" />
      </div>
      <div class="tapbarItem__title">
        Каталог
      </div>
    </div>
    <div class="tapbarItem">
      <div class="tapbarItem__icon">
        <MmmCssIcon type="search" />
      </div>
      <div class="tapbarItem__title">
        Поиск
      </div>
    </div>
    <div class="tapbarItem">
      <div class="tapbarItem__icon">
        <MmmCssIcon type="cart" />
      </div>
      <div class="tapbarItem__title">
        Корзина
      </div>
    </div>
    <div class="tapbarItem is-highlighted">
      <div class="tapbarItem__icon">
        <MmmCssIcon type="menu" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'home',
    };
  },
};
</script>

<style lang="scss">
  @include block(tapbar) {
    position: fixed;
    z-index: 12;
    bottom: 3vmax;
    left: 5vw;
    width: 90vw;
    background: rgba( 214, 224, 240, 0.68 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    -webkit-backdrop-filter: blur( 21.0px );
    backdrop-filter: blur( 21.0px );
    border-radius: 13px;
    display: flex;
    justify-content: space-between;
    @include vmin(padding, 8px);

    
  }

  @include block(tapbarItem) {
    @include vmin(min-width, 42px);
    @include vmin(min-height, 42px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 8px;
    @include vmin(margin-bottom, -5px);

    @include element(icon) {
      @include vmin(height, 21px);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @include element(title) {
      @include vmin(margin-top, 5px);
      text-transform: uppercase;
      font-weight: 500;
      font-size: .55rem;
    }

    &:hover, &:focus {
      box-shadow: inset 8px 8px 13px #ebedf0,
                  inset -8px -8px 13px #ffffff;
    }

    @include when(highlighted) {
      background: #fafcff;
      box-shadow:  8px 8px 13px #ebedf0,
                -8px -8px 13px #ffffff;
    }
  }

  @include block(sideOut) {
    position: fixed;
    z-index: 13;
    top: 0;
    left: -89vw;
    width: 89vw;
    height: 100vh;
    border-radius: 0 21px 21px 0;
    background: rgba( 214, 224, 240, 0.55 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    -webkit-backdrop-filter: blur( 13.0px );
    backdrop-filter: blur( 13.0px );
    transition: all .34s ease-in;

    @include when(active) {
      left: 0;
      transition: all .21s ease-out;
    }
  }
</style>