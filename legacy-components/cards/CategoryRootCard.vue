<template>
  <div :class="classList">
    <BlockNav
      :title="category.title"
      :details="navDetails"
      :url="'/' + category.slug"
      :modifiers='navClass'
    />
    <div class="catRootCard__children">
      <CategoryCard
        v-for="child in category.last_children"
        :key="child.id"
        :category="child"
        :parent="category.slug"
        :modifiers="['inline','small']"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryRootCard',
  props: {
    category: {
      type: Object,
      required: true
    },
  },
  computed: {
    categoriesMore() {
      if ( this.category.children_count !== null ) {
        return this.category.children_count + ' ' + this.$rusEndings(this.category.children_count, ['подкатегория', 'подкатегории', 'подкатегорий'])
      }
      return 0;
    },
    navClass() {
      if (this.category.last_children.length < 4) return ['small', 'collapsed']
      return ['small']
    },
    navDetails() {
      if (this.category.last_children.length < 4) return ''
      return this.categoriesMore
    },
    classList() {
      let classes = 'catRootCard'
      if (this.category.last_children.length === 0) return classes + ' catRootCard--empty'
      return classes
    }
  },
}
</script>

<style lang="scss">
@mixin rootCardGrid ($type:'double') {
  display: flex;
  flex-wrap: wrap;
  display: grid;

  @if $type == 'double' {
    grid-auto-rows: minmax(55px,1fr);
    grid-template-columns: 1fr 1fr;
  }
}

@include block(catRootCard) {
  background: rgba( 255, 255, 255, 0.81 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.34 );
  backdrop-filter: blur( 8.0px );
  -webkit-backdrop-filter: blur(8.0px);
  border-radius: 21px;
  @include padding-vw(13px, 21px);

  @include element(children) {
    @include rootCardGrid;
  }
}

@include block(rootsGrid) {
  @include element(item) {
    &:nth-child(1) {
      .catRootCard__children {
        grid-template-columns: 1fr;
        .catCard:nth-child(1) {
          grid-area: 1 / 1 / 2 / 3;
        }
      }
    }
    &:nth-child(7) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>