<template>
  <section>
    <div class="page">
      <div class="page__main">
        <div class="page__title">
          {{ cartTitle }}
        </div>
        <div v-if="cart.products" class="cart">
          <div v-for="product in cart.products" :key="product.id" class="cart__item">
            <div class="cartCard">
              <div class="cartCard__pic">
                <div class="cartCard__thumb" :style="'background-image: url('+product.thumb+');'"></div>
              </div>              
              <div class="cartCard__title">
                {{ product.title }}
              </div>
              <div class="cartCard__qty">
                <VueNumberInput
                  controls
                  center
                  inline
                  size="small"
                  :value="parseInt(product.qty)"
                />
              </div>
              <div class="cartCard__price">
                {{ product.total }}
              </div>
              <div class="cartCard__actions">

              </div>
            </div>
          </div>
        </div>
        <div class="page__header" id="delivery" ref="delivery">
          <div class="page__title">
            Настройка доставки
          </div>
          <v-select
            v-model="delivery"
            :items="deliveryTypes"
            solo
            label="Выберите способ доставки"
          ></v-select>
        </div>
        <div class="formBox" v-if="showAddressForm">
          <div class="formBox__title">
            Адрес доставки
          </div>
          <div class="formBox__grid formBox__grid--address">
            <div class="formBox__field">
              <v-autocomplete
                v-model="addressForm.city"
                :items="cities"
                dense
                solo
                label="Город"
              ></v-autocomplete>
            </div>
            <div class="formBox__field">
              <v-combobox
                v-model="addressForm.street"
                :items="streets"
                dense
                solo
                :disabled="!addressForm.city"
                label="Улица"

              ></v-combobox>
            </div>
            <div class="formBox__field">
              <v-text-field
                v-model="addressForm.building"
                label="Дом"
                prefix="д. "
                solo
                dense
                hint="Номер дома"
              ></v-text-field>
            </div>
            <div class="formBox__field">
              <v-text-field
                v-model="addressForm.room"
                label="оф.\кв."
                solo
                dense
                hint="Номер офиса или квартиры"
              ></v-text-field>
            </div>
            <div class="formBox__field">
              <v-textarea
                v-model="addressForm.message"
                solo
                label="Дополнительная информация"
                rows="1"
              ></v-textarea>
            </div>
            <div></div>
            <div class="formBox__field">
              <div class="button button--transparent button--middle" v-ripple @click="addressSubmit">Сохранить</div>
            </div>            
          </div>
        </div>
        <div class="formBox" v-if="showStoragesForm">
          <div class="formBox__title">
            Выберите склад
          </div>
          <div class="formBox__grid">

          </div>
        </div>
      </div>
      <div class="page__side">
        <div v-if="cart.products" class="checkout">
          <div v-if="cart.total" class="total">
            <div class="total__header">
              <div class="total__title">Итого:</div> 
              <div class="total__sum">{{cart.total}}</div>
            </div>              
          </div>
          <div class="checkout__header">
            <div class="checkout__title">
              Доставка
            </div>
            <div class="checkout__change">
              <div                     
                @click="$refs.delivery.scrollIntoView({block: 'center', behavior: 'smooth'})"
                class="button button--xsmall button--transparent"
              >
                <span v-if="delivery">
                  Изменить
                </span>
                <span v-else>
                  Выбрать способ доставки
                </span>
              </div>
            </div>
          </div>
          <div v-if="delivery" class="checkout__info">
            {{ delivery.text }}
          </div>
          <div class="checkout__header">
            <div class="checkout__title">
              Оплата
            </div>
            <div class="checkout__change">
              <v-menu 
                offset-y
                :close-on-click="true"
                :close-on-content-click="true"
              >
                <template v-slot:activator="{ on, attrs }">
                  <div                     
                    v-bind="attrs"
                    v-on="on"
                    class="button button--xsmall button--transparent"
                  >
                    <span v-if="payment">
                      Изменить
                    </span>
                    <span v-else>
                      Выбрать способ оплаты
                    </span>
                  </div>
                </template>
                <v-list>
                  <template
                    v-for="(paymentType,index) in paymentTypes"
                  >
                    <v-list-item
                      :key="index"
                      v-if="paymentType.value !== payment.value" 
                      @click="setPayment(paymentType)"
                    >
                      <v-list-item-title>
                        {{paymentType.text}}
                      </v-list-item-title>
                    </v-list-item>                    
                  </template>
                </v-list>
              </v-menu>
            </div>
          </div>
          <div v-if="payment" class="checkout__info">
            {{ payment.text }}
          </div>
          <div class="alert alert--info alert--small">
            Чтобы оформить заказ, пожалуйста, выберите способы доставки и оплаты.
          </div>
          <div class="checkout__submit">
            Оформить заказ
          </div>
        </div>
      </div>      
    </div>
  </section>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import { mapState, mapActions } from 'vuex'
import VueNumberInput from '@chenfengyuan/vue-number-input'

export default {
  components: {
    LazyHydrate,
    VueNumberInput
  },
  async asyncData({store, $axios}) {
    console.log(store.state.cart.products)
    const cart = await $axios.$post('/cart', {cart: store.state.cart.products})
    console.log(cart)
    return { cart }
  },
  data() {
    return {
      deliveryTypes: [
        {
          value: '1',
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
          value: 'Наличными при получении',
          text: 'Наличными при получении',
        },
        {
          value: 'Перевод на счет',
          text: 'Перевод на счет',
        },
        {
          value: 'Перевод на карту',
          text: 'Перевод на карту',
        },
      ],
      cities: [
        {
          text: 'Москва',
          value: 1
        },
        {
          text: 'Саратов',
          value: 2
        }
      ],
      streets: [],
      addressForm: {
        city: '',
        street: '',
        building: '',
        room: '',
        message: ''
      }
    }
  },
  computed: {
    ...mapState({
        cartCount: state => state.cart.count,
        cartProducts: state => state.cart.products,
        deliveryData: state => state.cart.deliveryData,
        payment: state => state.cart.payment,
    }),
    delivery: {
      get() {
        return this.$store.state.cart.delivery
      },
      set (value) {
        let deliveryType = this.deliveryTypes.find(type => type.value === value)
        this.$store.dispatch('cart/setDelivery', {deliveryType: deliveryType})
      }
    },
    cartTitle () {
      if (this.cartCount === 0) return 'Корзина пуста'
      return this.cartCount + ' ' + this.$rusEndings(this.cartCount, ['товар', 'товара', 'товаров'])
    },
    showAddressForm() {
      if (this.delivery && this.delivery.fields) {
        if (this.delivery.fields === 'address') return true
      }
      return false;
    },
    showStoragesForm() {
      if (this.delivery && this.delivery.fields) {
        if (this.delivery.fields === 'storages') return true
      }
      return false;
    },
  },
  methods: {    
    ...mapActions ({
      removeProduct: 'cart/removeProduct',
      setProductQuantity: 'cart/setProductQuantity',
    }),
    setPayment (type) {
      this.$store.dispatch('cart/setPayment', {paymentType: type})
    },
    addressSubmit () {
      const aF = this.addressForm
      if (aF.city.length === 0 || aF.city.length === 0 || aF.city.length === 0) {
        return false;
      }
      this.$store.dispatch('cart/setDeliveryData', {data: aF})
    }
  },
  mounted() {    
  },
}
</script>

<style lang="scss" scoped>
@include block(alert) {
  margin: auto;
  border-radius: 5px;
  
  @include modifier(info) {
    background-color: $bg-light;
  }
  @include modifier(small) {
    margin-left: auto;
    margin-right: auto;
    @include fluid(margin-top, 13px);
    @include fluid(margin-bottom, 13px);
    @include fluid(padding, 5px);
    @include ff(12px);
  }
}
  @include block(cart) {
    
    @include element(item) {
      @include fluid(margin-bottom, 21px);
    }
  }

  @include block(cartCard) {
    display: flex;
    width: 100%;
    @include fluid(padding, 21px);
    background: linear-gradient(126.16deg, #FFFFFF 44.71%, #F4F4F4 87.95%);
    border: 1px solid #F5F5F5;
    box-sizing: border-box;
    box-shadow: -5px 5px 10px rgba(222, 222, 222, 0.13), 5px -5px 10px rgba(222, 222, 222, 0.13), -5px -5px 10px rgba(255, 255, 255, 0.55), 5px 5px 13px rgba(222, 222, 222, 0.55), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(222, 222, 222, 0.5);
    border-radius: 13px;

    @include element(pic) {
      width: 21%;
      flex-shrink: 0;
    }

    @include element(thumb) {
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      max-width: 100%;
      @include fluid(height, 55px);
    }

    @include element(title) {
      @include font-vw(16px);
      @include fluid(padding-left, 21px);
      @include fluid(padding-right, 21px);
      width: 54%;
      flex-shrink: 0;

    }

    @include element(qty) {
      width: 12%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }

    @include element(price) {
      @include fluid(padding-left, 13px);
      width: 22%;      
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }
  }

  @include block(checkout) {
    @include fluid(padding, 34px);
    background: linear-gradient(132.41deg, rgba(244, 246, 251, 0.89) 0%, #E1E8FF 97.92%);
    border: 2px solid #E1E8FF;
    box-shadow: 13px -13px 26px rgba(224, 225, 229, 0.2), -13px 13px 26px rgba(224, 225, 229, 0.2), 13px 13px 26px rgba(255, 255, 255, 0.55), -13px -13px 33px rgba(224, 225, 229, 0.55), inset -1px -1px 2px rgba(255, 255, 255, 0.3), inset 1px 1px 2px rgba(224, 225, 229, 0.5);
    border-radius: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include element(header) {
      @include fluid(margin-top, 21px);
      width: 100%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    @include element(title) {
      @include font-vw(13px);
      color: lighten($main, 34%);
      text-transform: uppercase;
    }

    @include element(change) {
      @include font-vw(12px);
      color: $link;
      font-weight: 600;
      text-transform: uppercase;
      cursor: pointer;
    }

    @include element(info) {
      width: 100%;
    }

    @include element(submit) {
      @include fluid(margin-top, 34px);
      display: inline-block;
      cursor: default;
      background: linear-gradient(138.88deg, #6a637e 5.12%, #796983 96.21%);
      opacity: .55;
      border-radius: 21px;
      @include padding-vw(21px, 55px);
      color: $light;
      @include font-vw(21px);
      text-align: center;
      text-transform: uppercase;


      @include when(active) {
        background: linear-gradient(138.88deg, #882BD0 5.12%, #4926AD 96.21%);
        opacity: 1;
        cursor: pointer;
      }
    }   
  }

  @include block(total) {
    width: 100%;
    @include element(header) {
      @include fluid(margin-top, 21px);
      width: 100%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    @include element(title) {
      @include font-vw(34px);
    }
    @include element(sum) {
      @include font-vw(21px);
    }
  }

  @include block(formBox) {
    @include fluid(padding, 21px);
    background: linear-gradient(132.41deg, rgba(244, 246, 251, 0.89) 0%, #E1E8FF 97.92%);
    border: 2px solid #E1E8FF;
    box-shadow: 13px -13px 26px rgba(224, 225, 229, 0.2), -13px 13px 26px rgba(224, 225, 229, 0.2), 13px 13px 26px rgba(255, 255, 255, 0.55), -13px -13px 33px rgba(224, 225, 229, 0.55), inset -1px -1px 2px rgba(255, 255, 255, 0.3), inset 1px 1px 2px rgba(224, 225, 229, 0.5);
    border-radius: 13px;

    @include element(title) {
      @include font-vw(13px);
      color: lighten($main, 34%);
      text-transform: uppercase;
    }

    @include element(grid) {
      @include fluid(margin-top, 13px);
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      @include modifier(address) {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(2, min-content);
        gap: 1em 1em;

        @include element(field) {
          display: flex;
          &:nth-child(1) {
            grid-area: 1 / 1 / 2 / 3; 
          }
          &:nth-child(2) {
            grid-area: 1 / 3 / 2 / 6;
          }
          &:nth-child(3) {
            grid-area: 1 / 6 / 2 / 7;
          }
          &:nth-child(4) {
            grid-area: 1 / 7 / 2 / 8;
          }
          &:nth-child(5) {
            grid-area: 2 / 1 / 3 / 6;
          }
          &:nth-child(6) {
            
          }

          
        }
        
        
      }

    }
  }
</style>