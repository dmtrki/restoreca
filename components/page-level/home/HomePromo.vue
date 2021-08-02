<template>
  <div class="homePromo">
    <MmmHorizontal class="m_slider m_slider--featured" :button="false">
      <MmmHorizontalItem v-for="(featuredItem,index) in home.featured" :key="index">
        <ReCardFeatured
          :to="featuredItem.link"
          :image="featuredItem.image"
          :title="featuredItem.title"
          :details="featuredItem.details"
          :backgroundColor="featuredItem.backgroundColor"
          :backgroundGradient="{start: featuredItem.bg_start, finish: featuredItem.bg_finish }"
        /> 
      </MmmHorizontalItem>
    </MmmHorizontal>
    <MmmHorizontal class="m_slider m_slider--roots" :button="false">
      <MmmHorizontalItem v-for="(category,index) in home.cats" :key="index">
        <ReCardCategory
          :category="category"
          :modifiers="['equal_small'] "
        />
      </MmmHorizontalItem>
    </MmmHorizontal>
    <div class="homeProjectsPromo">
      <h2 class="title">
        Готовые проекты
      </h2>
      <div class="homeProjectsPromo__list">
        <vue-horizontal class="m_slider m_slider--projects">
          <nuxt-link :to="'#'"  class="m_slider__item m_card m_card--xsmall m_card--accent">
            <svg class="m_card__icon">
              
            </svg>
            Рестораны
          </nuxt-link>
          <nuxt-link :to="'#'"  class="m_slider__item m_card m_card--xsmall m_card--accent2">
            <svg class="m_card__icon">
              
            </svg>
            Магазины
          </nuxt-link>
          <nuxt-link :to="'#'"  class="m_slider__item m_card m_card--xsmall m_card--accent2">
            <svg class="m_card__icon">
              
            </svg>
            Холодильные камеры
          </nuxt-link>
        </vue-horizontal>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>

<style lang="scss">

</style>
