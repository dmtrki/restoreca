<template>
  <section>
    <MmmSection first-section accent light>
      <ReHomeHeader />
      <ReHomePromo :promo-data="promoData" />
    </MmmSection>
      <ReHomeCatalog :catalog-data="catalogData" />
      <ReHomeInfo />
  </section>
</template>

<script>
import { gql } from 'nuxt-graphql-request'

export default {
  // layout: (ctx) => ctx.$device.isMobile ? 'default' : 'desktop',
  name: 'HomePage',  
  async asyncData({store, $graphql}) {
    const query = gql`
      query homepage {
        page(slug: "home") {
          title
          extras
        }
        manufacturers (limit: 6) {
          uuid
          title
          slug
          thumb
        },
        manufacturersCount
      }
    `;

    const response = await $graphql.default.request(query),
          extras = response.page.extras

    return {
      title: extras.meta_title ?? extras.title,
      promoData: {
        featured: JSON.parse(extras.home_featured)
      },
      catalogData: {
        manufacturers: response.manufacturers,
        manufacturersCount: response.manufacturersCount
      }
    }    
  },
  head() {
      return {
        title: this.title,
      }
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="scss">

</style>