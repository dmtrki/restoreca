<template>
    <Button
      icon="filter-o" 
      size="normal"
      type="default" 
    >
      <slot>

      </slot>
    </Button>
</template>

<script>
import { Button } from 'vant'

export default {
  components: {
    Button
  }

}
</script>

<style lang="scss" scoped>
  .van-button {
    @apply btn; 
    
    &--normal {
      @apply btn-sm
    }

    &--default {
      @apply btn-outline; 
      @apply btn-primary;
    }
  }
</style>
