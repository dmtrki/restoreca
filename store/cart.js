export const state = () => ({
  version: 0.2,
  products: [], // product { qty, productId }
  count: 0 ,
  delivery: '',
  deliveryData: '',
  payment: '',
  addresses: [],
  addedSnackbar: false
})
export const mutations = {
  ADD_PRODUCT (state, productId) {
    if (!state.products.find(p => productId === p.productId)) {
      state.products = [...state.products, { productId: productId, qty: 1 }]
    }
  },
  SHOW_ADDED_SNACKBAR (state) {
    state.addedSnackbar = true
  },
  HIDE_ADDED_SNACKBAR (state) {
    state.addedSnackbar = false
  },
  REMOVE_PRODUCT (state, productId) {
    state.products = Array.from(state.products.filter(prod => prod.productId !== productId))
  },
  SET_PRODUCT_QTY (state, { productId, qty }) {
    state.products = [
      ...state.products.filter(prod => prod.productId !== productId),
      { ...state.products.find(prod => prod.productId === productId), qty }
    ]
  },
  CALC_PRODUCTS_QUANTITY (state) {
    let counter = 0
    state.products.forEach(item => {
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
  products: (state) => state.products,
  delivery: (state) => state.delivery,
  deliveryData: (state) => state.deliveryData,
  payment: (state) => state.payment,  
  addedSnackbar: (state) => state.addedSnackbar,
}
export const actions = {
  async addProduct ({ commit }, productId) {
    await commit('ADD_PRODUCT', productId)
    await commit('CALC_PRODUCTS_QUANTITY')
  },  
  async toggleAddedSnackbar ({ commit }) {
    await commit('HIDE_ADDED_SNACKBAR')
    await commit('SHOW_ADDED_SNACKBAR')
  },
  async removeProduct ({ commit }, productId) {
    await commit('REMOVE_PRODUCT', productId)
  },
  async setProductQuantity ({ commit }, { productId, qty }) {
    await commit('SET_PRODUCT_QTY', { productId, qty })
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