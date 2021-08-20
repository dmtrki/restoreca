<template>
  <div 
    v-bind="$attrs"
    v-on="$listeners"
    :class="classList"
  >
    <div v-if="icon && !iconRight" :class="iconClass">
      <MmmCssIcon v-if="cssIcon" :type="icon" />
    </div>
    <slot></slot>
    <div v-if="icon && iconRight" :class="iconClass">
      <MmmCssIcon v-if="cssIcon" :type="icon" :size="sized" />
    </div>
  </div>
</template>

<script>
import themingMixing from "@/mixins/mmm/componentTheming.js"

export default {
  mixins: [themingMixing],
  props: {
    outline: {
      type: Boolean,
      defailt: false
    },
    gradient: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    onDark: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean | String,
      default: false
    },
    cssIcon: {
      type: Boolean,
      default: false
    },
    iconRight: {
      type: Boolean,
      default: false
    },
    offsetX: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      classBase: 'Button',
      cssIcons: []
    }
  },
  computed: {
    classList() {
      let classList = this.classListBase ?? []

      if (this.outline) classList.push(`${this.classRoot}--${this.themed}_outline`)
      if (this.gradient) classList.push(`${this.classRoot}--${this.themed}_gradient`)
      if (this.rounded) classList.push(`${this.classRoot}--rounded`)
      if (this.onDark) classList.push('is-onDark')

      return classList.join(' ')
    },
    iconClass() {
      const t = this,
            m = t.iconRight ? 'right' : 'left',
            b = t.classPrefix + t.classBase + '__icon'
      let classList = [b, `${b}--${m}`]

      return classList.join(' ')
    },
    
  }

}
</script>

<style lang="scss">
  .mmmButton {
    @include titled;
    @include flex-centered;
    @include padding-vmin(13px, 21px);
    cursor: pointer;
    border-radius: 13px;
    border: 1px solid transparent;
    transition: all .3s;    

    $this: '.mmmButton';

    &__icon {
      display: inline-block;
    }

    /* *** MODIFIERS *** */

    //#  size

    &--smallest {
      @include vmin(padding-top, 5px);
      @include vmin(padding-bottom, 5px);
      @include vmin(padding-left, 8px);
      @include vmin(padding-right, 8px);
      @include mfs(8px);
      border-radius: 5px;

      #{$this}__icon {
        &--left {
          margin-right: 3px;
        }
        &--right {
          margin-left: 3px;
        }
      }
    }

    &--xsmall {
      @include vmin(padding-top, 5px);
      @include vmin(padding-bottom, 5px);
      @include vmin(padding-left, 8px);
      @include vmin(padding-right, 8px);
      @include mfs(12px);
      font-weight: 500;
      border-radius: 8px;

      #{$this}__icon {
        &--left {
          margin-right: 8px;
        }
        &--right {
          margin-left: 8px;
        }
      }
    }

    &--small {
      
      @include vmin(padding-top, 8px);
      @include vmin(padding-bottom, 8px);
      @include vmin(padding-left, 13px);
      @include vmin(padding-right, 13px);

      #{$this}__icon {
        &--left {
          @include vmin(margin-right, 13px);
        }
        &--right {
          @include vmin(margin-left, 13px);
        }
      }
    }

    //#  theme
    &--primary {
      background-color: $primary;
      color: $light;

      &:hover {
        background-color: $light;
        color: $primary;
      }

      &_outline {
        background-color: transparent;
        border-color: $primary;
        color: $primary;

        &:hover {
          background-color: $primary;
          color: $light;
        }
      }
    }

    &--secondary {
      background-color: $primary;
      color: $light;
    }

    &--accent {
      background-color: $accent;
      color: $light;

      &:hover {
        background-color: $light;
        color: $primary;
      }

      &_outline {
        background-color: transparent;
        border-color: $primary;
        color: $primary;

        &:hover {
          background-color: $primary;
          color: $light;
        }
      }

      &_gradient {
        background: linear-gradient(264.23deg, #FF8744 -1.51%, #4F038A 80.62%);
        color: $light;
      }
    }

    &--link {
      font-weight: 600;
      color: $link;

      &.is-onDark {
        color: $light;
      }
    }

    // layout
    &--offsetX {
      &_1 {
        @include vmin(margin-right, 13px);
        @include vmin(margin-left, 13px);
      }
    }
  }
</style>