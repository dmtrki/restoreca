<template>
  <div class="price">
    {{price}}
  </div>
</template>

<script>
export default {
  name: 'ProductCardPrice',
  props: {
    price: String
  }
}
</script>

<style lang="scss">
@include block(price) {
  background: $bg-light;
  &__usual {
    @include font-vw(16px);
    color: $c-prime;
    font-weight: 600;
  }

  @include element(old) {
    font-size: .8em;
    text-decoration-line: line-through;
    color: #818181;
  }

  @include element(sale) {
    @include font-vw(17px);
    display: inline-block;
    position: relative;
    background: linear-gradient(138.88deg, #882BD0 5.12%, #4926AD 96.21%);
    border-radius: 8px;
    padding: 5px 8px;
    color: $c-light;

    &:hover {
      @include element(date) {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }

  @include element(date) {
    font-size: .8em;
    top: -89%;
    left: 0; 
    position: absolute;
    opacity: 0;
    transform: translateX(-100%);
    transition: all .13s ease-in;
    background: $bg-light;
    color: $c-accent;
  }
}
</style>