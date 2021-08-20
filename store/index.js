import { gql } from 'nuxt-graphql-request'

export const state = () => ({
  appbar: {
    title: '',
    subtitle: '',
    previous: null,
    action: null,
    show: true,
    loading: false
  },
  commonData: {},
  layoutCatalog: [],
  // callbackModal: false,
  modal: {
    call: false,

  }
})

export const mutations = {
  SET_COMMON_DATA (state, data) {
    state.commonData = data
  },  
  SET_LAYOUT_CATALOG_DATA (state, data) {
    state.layoutCatalog = data
  },
  // *** Appbar  
  SHOW_APPBAR (state, data) {
    state.appbar.show = true
  },
  HIDE_APPBAR (state, data) {
    state.appbar.show = false
  },
  TOGGLE_APPBAR_LOADING (state, data) {
    state.appbar.loading = !state.appbar.loading
  },
  SET_APPBAR_TITLE (state, data) {
    state.appbar.title = data
  },
  SET_APPBAR_SUBTITLE (state, data) {
    state.appbar.subtitle = data
  },
  SET_APPBAR_PREVIOUS (state, data) {
    state.appbar.previous = data
  },
  SET_APPBAR_ACTION (state, data) {
    state.appbar.action = data
  },
  // SHOW_CALLBACK_MODAL (state) {
  //   state.callbackModal = true
  // },
  // HIDE_CALLBACK_MODAL (state) {
  //   state.callbackModal = false
  // },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    try {      
      const query = gql`
        query commonData {
          page(slug: "common") {
            extras
          }
        }
      `
      const response = await this.$graphql.default.request(query)
      commit('SET_COMMON_DATA', response.page.extras)
    } catch (err) {
      console.log(err)
      // throw new Error('Внутреняя ошибка сервера, сообщите администратору')
    }
  },
}