<template>
  <div class="horizontal__item">
    <slot></slot>
  </div>  
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .horizontal__item {
    margin-right: 1em;

    &:first-child {
      padding-left: 1em;
    }
  }
</style>