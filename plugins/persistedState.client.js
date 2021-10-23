
import createPersistedState from 'vuex-persistedstate'
// import SecureLS from "secure-ls"
// var ls = new SecureLS({ isCompression: false })

export default ({store}) => {
  createPersistedState({
    key: 'restoreca',
    paths: [
      'cart'
    ],
    overwrite: true
  })(store)
}