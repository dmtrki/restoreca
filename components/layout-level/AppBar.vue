<template>
  <div 
    :class="[
      'appbar',
      {
        'is-hidden': !show
      }
    ]" 
    ref="appbar"
  >
   <div class="appbar__back" @click="back">
     <MmmCssIcon type="prev" />
    </div>  
    <div class="appbar__title" ref="appbarTitle">
      <div v-if="previous" class="appbar__previous"> {{previous.title}}</div>
      {{ title }}
      <span v-if="subtitle" class="appbar__subtitle">{{ subtitle }}</span>
    </div>
    <div class="appbar__action">
      
    </div>
  </div>  
</template>

<script>
import {NavBar} from 'vant'
import {mapState} from 'vuex'

export default {
  components: {
    NavBar
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      title: state => state.appbar.title,
      subtitle: state => state.appbar.subtitle,
      previous: state => state.appbar.previous,
      show: state => state.appbar.show
    })
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  mounted() {
    if (this.$refs.appbarTitle) {
      let appbarTitleWidth = this.$refs.appbarTitle.offsetWidth,
          appbarWidth = this.$refs.appbar.offsetWidth,
          allowedWidth = appbarWidth - 136

      if (appbarTitleWidth > allowedWidth) {
        const titleFontSize =  allowedWidth * 0.08
        this.$refs.appbarTitle.style.fontSize = titleFontSize + 'px'
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@include block(appbar) {
  @include vmin(padding-top, 13px);
  @include vmin(padding-bottom, 13px);
  @include vmin(padding-left, 13px);
  @include vmin(padding-right, 13px);
  @include vmin(margin-bottom, 21px);
  position: relative;
  background: #F5F7FF;
  box-shadow: 0 5px 0 #E8EBFF;
  border-radius: 0 0 21px 21px;
  display: flex;
  align-items:center;
  transition: all .34s ease-out;
  @include element(back) {
    @include flex-centered;
    @include fluid(width, 42px);
    @include fluid(height, 42px);
    flex-shrink: 0;
  }

  @include element(previous) {
    @include ff(13px);
    color: $disabled;
  }
  @include element(title) {
    @include ff(16px);
    @include vmin(padding-left, 13px);
    @include vmin(padding-right, 13px);
  }

  @include element(action) {
    @include fluid(width, 42px);
    @include fluid(height, 42px);
    flex-shrink: 0;
  }

  @include when(hidden) {
    margin-top: -110px;
  }
}

</style>