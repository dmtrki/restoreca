<template>
  <div>
    <NuxtLink 
      v-if="isLink"
      v-bind="$attrs"
      v-on="$listeners"
      :to="to"
      :class="classList"
    >
      <div :class="classRoot + '__main'">
        <template v-if="!($slots.default || [])[0]">
          <h4 :class="classRoot + '__title'">{{ title }}</h4>
          <span :class="classRoot + '__subtitle' + ' text-xs text-gray-500 leading-none'">{{ subtitle }}</span>
        </template>
        <slot />
      </div>
      <div :class="classRoot + '__action'">
        <MmmCssIcon v-if="!($slots.action || [])[0]" type="next" />
        <slot name="action" />
      </div>
    </NuxtLink>
    <div 
      v-else       
      v-bind="$attrs"
      v-on="$listeners"
      :class="classList"
    >
      <div :class="classRoot + '__main'">
        <template v-if="!($slots.default || [])[0]">
          <h4 :class="classRoot + '__title'">{{ title }}</h4>
          <span :class="classRoot + '__subtitle' + ' text-xs text-gray-500 leading-none'">{{ subtitle }}</span>
        </template>
        <slot />
      </div>
      <div :class="classRoot + '__action'">
        <MmmCssIcon v-if="!($slots.action || [])[0]" type="next" />
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script>
import themingMixing from "@/mixins/mmm/componentTheming";

export default {
  mixins: [themingMixing],
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: ''
    },
    background: {
      type: String | Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: '#'
    }
  },
  data() {
    return {
      classBase: 'Cell',
    }
  },
  computed: {
    classList() {
      let classList = this.classListBase

      return classList.join(' ')
    },
    isLink() {
      return (this.to && this.to !== '#') ? true : false
    }
  },
  created() {

  }
}
</script>

<style lang="scss">
.mmmCell {
  @include vmin(margin-top, 21px);
  @include vmin(margin-bottom, 13px);
  @include vmin(padding, 13px);

  color: #333;

  display: flex;
  justify-content: space-between;
  align-items: center;


  &__title {
    font-size: 1.1rem;
    font-weight: 500;
  }

  &__action {
    display: flex;
  }
}
</style>
