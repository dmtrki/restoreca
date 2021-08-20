export const state = () => ({
  version: 0.1,
  items: [],
  count: 0 ,
  delivery: {
    type: '',
    address_uuid: ''
  },
  payment: {
    type: ''
  },
  addresses: [],
  added: false
})
export const mutations = {
  ADD_PRODUCT (state, uuid) {
    if (!state.items.find(p => uuid === p.uuid)) {
      state.items = [...state.items, { uuid: uuid, qty: 1 }]
    }
  },
  REMOVE_PRODUCT (state, uuid) {
    state.items = Array.from(state.items.filter(prod => prod.uuid !== uuid))
  },
  SET_PRODUCT_QTY (state, { uuid, qty }) {
    state.items = [
      ...state.items.filter(prod => prod.uuid !== uuid),
      { ...state.items.find(prod => prod.uuid === uuid), qty }
    ]
  },
  CALC_ITEMS_QUANTITY (state) {
    let counter = 0
    state.items.forEach(item => {
      counter = counter + item.qty
    });
    state.count = counter
  },  
  SET_DELIVERY (state, payload) {
    state.delivery = payload.deliveryType
  },
  SET_DELIVERY_DATA (state, payload) {
    state.deliveryData = payload.deliveryData
  },
  SET_PAYMENT (state, payload) {
    state.payment = payload.paymentType
  },
}
export const getters = {
}
export const actions = {
  async add ({ commit }, uuid) {
    await commit('ADD_PRODUCT', uuid)
    await commit('CALC_ITEMS_QUANTITY')
  },
  async remove ({ commit }, uuid) {
    await commit('REMOVE_PRODUCT', uuid)
  },
  async setQuantity ({ commit }, { uuid, qty }) {
    await commit('SET_PRODUCT_QTY', { uuid, qty })
  },
  async setDelivery ({ commit }, deliveryType) {
    await commit('SET_DELIVERY', deliveryType)
  },
  async setDeliveryData ({ commit }, data) {
    await commit('SET_DELIVERY_DATA', data)
  },
  async setPayment ({ commit }, paymentType) {
    await commit('SET_PAYMENT', paymentType)
  },
}