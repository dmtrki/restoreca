<template>
  <div class="cart">
    <div v-if="loading.items" class="cart__loading">
      Загрузка...
    </div>
    
    <MmmSection v-else transparent>
      <div v-if="!isEmpty" class="cart__items">
        <div class="cart__header">
          <MmmCell 
            :title="totalLabel" 
            :subtitle="countLabel"
            equal
            action-on-top
          >
            <template #action>
              <MmmButton disabled link smallest @click="$router.back()">Продолжить покупки</MmmButton>
            </template>
          </MmmCell>
          <MmmButton accent>Заказать</MmmButton>
        </div>
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
      <div v-else class="cart__empty">
        Корзина пуста
        <MmmButton 
          secondary
          outline
          :offset-y="3"
          @click="$router.back()"
        >
          Назад к покупкам
        </MmmButton>
      </div>
    </MmmSection>
    <Observer
      v-if="!isEmpty"
      rootMargin="-34px 0% 0% 0%" 
      @on-change="toggleTail" 
    />
    <div
      v-if="!isEmpty"
      class="tailyForm"
      v-touch:tap="scrollBottom"
    >
      <div @click="scrollBottom" :class="['tailyForm__tail', {'is-hidden': !showTail}]">Оформление заказа</div>
      <div class="tailyForm__title">
        Оформление заказа
      </div>
      <div ref="checkout" class="tailyForm__content">
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
                @click="showDeliveryTypeSheet"
              >
                <span>{{ deliveryActionLabel }}</span>
              </MmmButton>
            </template>
          </MmmCell>
          <div v-if="isDeliverySelected" class="formSection__value">
            <Transition>
              <MmmPanel
                v-if="!isAddressSelected && isHasNotAddresses"
              >
                <MmmFormSchema
                  name="newAddress"
                  :schema="newAddressFormSchema"
                  v-model="newAddressForm"
                  @submit.prevent="onNewAddressFormSubmit"
                  title="Добавить адрес доставки"
                  submit-text="Добавить"
                />
              </MmmPanel>
            </Transition>
          </div>
          <ActionSheet
            v-model="state.showDeliveryTypeSheet" 
            :actions="deliveryTypesAsActions"
            @select="onDeliveryTypeSelect"
            close-on-click-action
            title="Выберите способ получения"
          />
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
    </div>
  </div>
</template>

<script>
import Observer from 'vue-intersection-observer'
import { gql } from 'nuxt-graphql-request'
import {mapState, mapActions} from 'vuex'
import { Stepper, ActionSheet } from 'vant'
import newAddressFormSchema from '~/schema/newAddressForm'

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
  components: {
    Stepper,
    ActionSheet,
    Observer,
  },
  async asyncData({store, $rusEndings, $gqlr}) {
    store.commit('HIDE_APPBAR')
    const title = 'Корзина',
          cartCount = store.state.cart.count,
          subtitle =  (cartCount === 0) ? ' пуста' : ''
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
      showTail: true,
      loading: {
        items: true
      },
      labels: {
        firstAction: 'Выбрать',
      },
      state: {
        showDeliveryTypeSheet: false,
        paymentTypeSelect: false,
        addressSelect: false,
        addressForm: false,
      },
      options: {
        deliveryTypes: [
          {
            value: 'self',
            text: 'Получение на складе',
            cost: 0,
            fields: 'storages'
          },
          {
            value: 'sdak',
            text: 'СДЭК',
            cost: 1200,
            fields: 'address'
          },
          {
            value: 'dax',
            text: 'ДЭКС',
            cost: 1100,
            fields: 'address'
          },
        ],
        paymentTypes: [
          {
            value: 'cash-on-delivery',
            text: 'Наличными при получении',
          },
          {
            value: 'bank-payment',
            text: 'Перевод на счет',
          },
          {
            value: 'credit-card',
            text: 'Перевод на карту',
          },
        ],
      },
      newAddressFormSchema: newAddressFormSchema,
      newAddressForm: {}
    }
  },
  computed: {
    ...mapState({
      items: state => state.cart.items,
      itemsCount: state => state.cart.count,
      deliveryType: state => state.cart.deliveryType,
      deliveryAddress: state => state.cart.deliveryAddress,
      deliveryStorage: state => state.cart.deliveryStorage,
      addresses: state => state.cart.addresses,
    }),
    isEmpty() {
      return (this.itemsCount === 0) ? true : false
    },
    countLabel() {
      return (this.itemsCount > 0) 
              ? this.itemsCount + ' ' + this.$rusEndings(this.itemsCount, ['товар', 'товара', 'товаров']) 
              : ''
    },
    total() {
      if (Object.keys(this.itemsSynced).length === 0) return false
      let total = 0
      Object.values(this.itemsSynced).forEach(it => total += parseInt(it.price))
      return total
    },
    totalLabel() {
      return (this.total > 0) ? this.total + ' ₽' : ''
    },
    isDeliverySelected() {
      return this.deliveryType !== false ? true : false
    },
    deliveryActionLabel() {
      if (this.isDeliverySelected) {
        const selectedDelivery = this.options.deliveryTypes.find(it => it.value === this.deliveryType)
        return selectedDelivery.text ?? false
      }
      return this.labels.firstAction
    },
    isAddressSelected() {
      return this.deliveryAddress !== false ? true : false
    },
    isHasNotAddresses() {
      return this.addresses.length === 0 ? true : false
    },
    deliveryValue() {
      return 'Данные доставки не указаны'
    },
    deliveryTypesAsActions() {
      const selected = this.deliveryType
      return this.options.deliveryTypes.map(item => {
        return {name: item.text, value: item.value, disabled: item.value === selected}
      })
    },
    paymentActionLabel() {
      return this.labels.firstAction
    },
    paymentValue() {
      return 'Данные оплаты не указаны'
    },
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
    ...mapActions({
      setDeliveryType: 'cart/setDeliveryType', 
      setDeliveryAddress: 'cart/setDeliveryAddress', 
      setDeliveryStorage: 'cart/setDeliveryStorage'
    }),
    scrollBottom() {
      this.$refs.checkout.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth'
      })
    },
    calculateSubtotal (uuid) {
      if (!this.itemsSynced[uuid]) return false
      this.itemsSynced[uuid].subtotal = parseInt(this.itemsSynced[uuid].price) * parseInt(this.itemsSynced[uuid].qty)
    },
    toggleTail(entry){
      this.showTail = !entry.isIntersecting        
    },
    showDeliveryTypeSheet(){
      this.state.showDeliveryTypeSheet = true
    },
    onDeliveryTypeSelect(it){
      this.setDeliveryType(it.value)
    },
    onNewAddressFormSubmit(data){
      console.log(data)
    }
  },
  created() {
  },
  mounted() {
  },
  head() {
    return {
      title: this.title
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('SHOW_APPBAR')
    this.$store.commit('SET_APPBAR_TITLE', null)
    this.$store.commit('SET_APPBAR_SUBTITLE', null)
    this.$store.commit('SET_APPBAR_PREVIOUS', null)
    next()
  }
}
</script>

<style lang="scss">
  .cart {
    @include vmin(margin-top, 34px);
  }

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
      @include mfs(15px);
    }
  }

  
  @include block(tailyForm) {
    @include vmin(padding, 21px);
    @include vmin(margin-top, 34px);
    @include vmin(margin-bottom, -55px);
    position: relative;
    width: 100%;
    border-radius: 34px 34px 0 0;
    background: linear-gradient(132.41deg, rgba(244, 246, 251, 0.89) 0%, #E1E8FF 97.92%);
    border: 2px solid #E1E8FF;
    box-shadow: 0 -5px 0 #E8EBFF;

    @include element(tail) {
      @include vmin(padding, 21px);
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      border-radius: 34px 34px 0 0;
      background-color: rgba(247, 248, 255, 0.95);
      box-shadow: 0 -5px 0 #E8EBFF;
      @include mfs(13px);
      text-transform: uppercase;
      color: $disabled;
      text-align: center;
      transition: all .3s;
      z-index: 0;
      cursor: pointer;

      &::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 55px;
        height: 2px;
        background-color: #0F4C8130;
        border-radius: 2px;
        cursor: pointer;
        transition: all .3s;
      }

      @include when(hidden) {
        bottom: -89px;
        font-size: 8px;
      }
    }

    @include element(title) {
      @include titled;
      @include mfs(8px);
      color: $disabled;
      text-align: center;
      transform: font-size, opacity .34s;
    }

    @include element(content) {
      width: 100%;
      transition: height .55s;
    }

    @include modifier(relative) {
      position: relative;
      @include vmin(margin-top, 34px);
    }
  }
</style>