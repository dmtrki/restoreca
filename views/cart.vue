<template>
  <div class="cart">
    <div v-if="products.length === 0 && loading.items" class="cart__loading">
      Загрузка...
    </div>
    <MmmSection v-else transparent>
      <div class="cart__items">
        <div v-for="item in products" :key="item.uuid" class="cartItemCard">
          <div v-if="item.title" class="cartItemCard__title">
            {{ item.title.replace('-', '&#8209;') }}
          </div>
          <div class="cartItemCard__thumbnail" :style="`background-image: url(${item.thumbnail})`" />
          <div class="cartItemCard__qty">
            <Stepper 
              v-model.lazy="itemsSynced[item.uuid].qty"
              integer
              @change="calculateSubtotal(item.uuid)" 
            />
          </div>
          <div v-if="item.price" class="cartItemCard__price">
            {{ itemsSynced[item.uuid].subtotal }} ₽
          </div>
        </div>
      </div>
    </MmmSection>

    <MmmActionSheet
      ref="cartCheckoutSheet"
      tail
      title="Оформление заказа"
    >
      <div class="checkoutForm">
        <div class="formSection">
          <MmmCell small>
            <template>
              <div class="formSection__title">
                Доставка
              </div>
            </template>
            <template #action>
              <MmmButton 
                link
                smallest
                icon="next"
                icon-right
                css-icon
              >
                <span>{{ deliveryActionLabel }}</span>
              </MmmButton>
            </template>
          </MmmCell>
          <div class="formSection__value">
            {{ deliveryValue }}
          </div>
        </div>
        <div class="formSection">
          <MmmCell small>
            <template>
              <div class="formSection__title">
                Оплата
              </div>
            </template>
            <template #action>
              <MmmButton 
                link
                smallest
                icon="next"
                icon-right
                css-icon
              >
                <span>{{ paymentActionLabel }}</span>
              </MmmButton>
            </template>
          </MmmCell>
          <div class="formSection__value">
            {{ paymentValue }}
          </div>
        </div>
      </div>
    </MmmActionSheet>
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import {mapState, mapActions} from 'vuex'
import { Stepper } from 'vant'

const getCartItemsQuery = gql`
  query cartItems($uuids: [UUID]) {
    products(uuids: $uuids, first: 1000) {
      data {
        uuid
        title
        thumbnail
        price
        price_formatted
      }
    }
  }
`

export default {
  components: {Stepper},
  async asyncData({store, $rusEndings, $gqlr}) {
    const title = 'Корзина',
          cartCount = store.state.cart.count,
          subtitle =  (cartCount !== 0) ? ' пуста' : ''
    store.commit('SET_APPBAR_TITLE', title)
    store.commit('SET_APPBAR_SUBTITLE', subtitle)
    store.commit('SET_APPBAR_PREVIOUS', null)

    return {
      title: title + subtitle
    }
  },
  data() {
    return {
      products: [],
      itemsSynced: {},
      total: 0,
      loading: {
        items: true
      },
      labels: {
        firstAction: 'Выбрать',
      }
    }
  },
  computed: {
    ...mapState({
      items: state => state.cart.items,
    }),
    itemsCountLabel() {
      return this.itemsCount + ' ' + $rusEndings(this.itemsCount, ['товар', 'товара', 'товаров'])
    },
    deliveryActionLabel() {
      return this.labels.firstAction
    },
    paymentActionLabel() {
      return this.labels.firstAction
    },
    deliveryValue() {
      return 'Данные доставки не указаны'
    },
    paymentValue() {
      return 'Данные оплаты не указаны'
    }
  },
  fetchOnServer: false,
  async fetch() {
    this.loading.items = true
    const uuids = this.items.map(it => it.uuid)
    const response = await this.$gqlr(getCartItemsQuery, {uuids: uuids})

    const products = response.products.data
    this.products = products

    this.loading.items = false
    
    let itemsSynced = {}
    
    this.items.forEach(it => {
      const syncProduct = products.find(p => p.uuid === it.uuid)
      if (!syncProduct) return

      itemsSynced[it.uuid] = {
        uuid: it.uuid,
        qty: it.qty,
        price: syncProduct.price,
        subtotal: parseInt(syncProduct.price) * parseInt(it.qty)
      }
    })
    this.itemsSynced = itemsSynced
  },
  methods: {
    calculateSubtotal (uuid) {
      if (!this.itemsSynced[uuid]) return false

      this.itemsSynced[uuid].subtotal = parseInt(this.itemsSynced[uuid].price) * parseInt(this.itemsSynced[uuid].qty)

      this.calculateTotal()
    },
    calculateTotal() {
      let total = 0

      Object.values(this.itemsSynced).forEach(it => total += parseInt(it.price))

      this.total = total
    },
    showCheckoutSheet(){
      this.$refs.cartCheckoutSheet.open()
    }
  },
  mounted() {

  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="scss">
  @include block(cartItemCard) {
    @include vmin(padding, 21px);
    @include vmin(margin-top, 21px);
    border-radius: 21px;
    background: #FAFAFA;
    border: 2px solid #F5F5F5;
    box-shadow: 0px 0px 13px rgba(158, 158, 158, 0.21);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    @include element(title) {
      @include vmin(padding-right, 13px);
      @include vmin(width, 200px);
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 1px;
      flex-grow: 1;
      flex-shrink: 1;
    }

    @include element(thumbnail) {
      flex: 0 0 55px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }

    @include element(qty) {
      @include vmin(margin-top, 13px);
      flex: auto;
    }

    @include element(price) {
      flex: auto;
      color: $primary;
      font-size: 1rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .formSection {

    &__title {
      text-transform: uppercase;
      @include mfs(12px);
    }
  }
</style>