export const state = () => ({
  commonData: {},
  catalogDropdownData: [],
  callbackModal: false
})

export const mutations = {
  SET_COMMON_DATA (state, data) {
    state.commonData = data
  },  
  SET_CATALOG_DROPDOWN_DATA (state, data) {
    state.catalogDropdownData = data
  },
  SHOW_CALLBACK_MODAL (state) {
    state.callbackModal = true
  },
  HIDE_CALLBACK_MODAL (state) {
    state.callbackModal = false
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    try {
      await this.$axios.$get('/pages/common').then(function(response) {
        commit('SET_COMMON_DATA', response)
      })
    } catch (err) {
      console.log(err)
      // throw new Error('Внутреняя ошибка сервера, сообщите администратору')
    }
  },
}