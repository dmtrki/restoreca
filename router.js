import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./pages/index.vue' /* webpackChunkName: "pages/index" */)
// const Cart = () => import('../pages/cart.vue' /* webpackChunkName: "pages/cart" */)
// const InfoHome = () => import('../pages/info/index.vue' /* webpackChunkName: "pages/info/index" */)
// const Info = () => import('../pages/info/_slug.vue' /* webpackChunkName: "pages/info/_slug" */)
// const CatalogHome = () => import('../pages/catalog.vue' /* webpackChunkName: "pages/catalog" */)
// const CatalogCategory = () => import('../pages/_category/index.vue' /* webpackChunkName: "pages/_category/index" */)
// const CatalogSubcategory = () => import('../pages/_category/_subcategory/index.vue' /* webpackChunkName: "pages/_category/_subcategory/index" */)
// const Product = () => import('../pages/_category/_subcategory/product.vue' /* webpackChunkName: "pages/_category/_subcategory/product" */)

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'link--active',
  linkExactActiveClass: 'nuxt-link-exact-active',
   routes: [
     {
       path: "/",
       component: Home,
       name: "home"
     },
   ],

  // routes: [{
  //   path: "/",
  //   component: Home,
  //   name: "home"
  // }, {
  //   path: "/cart",
  //   component: Cart,
  //   name: "cart"
  // }, {
  //   path: "/info",
  //   component: InfoHome,
  //   name: "info"
  // }, {
  //   path: "/info/:slug",
  //   component: Info,
  //   name: "info-slug"
  // }, {
  //   path: "/catalog",
  //   component: CatalogHome,
  //   name: "catalog"
  // }, {
  //   path: "/:category",
  //   component: CatalogCategory,
  //   name: "catalog-category"
  // }, {
  //   path: "/:category/:subcategory",
  //   component: CatalogSubcategory,
  //   name: "catalog-subcategory"
  // }, {
  //   path: "/:category/:subcategory/page",
  //   name: "catalog-subcategory-paged"
  // }, {
  //   path: "/:category/:subcategory/product",
  //   component: Product,
  //   name: "product"
  // }],

  fallback: false
}


export function createRouter() {
  return new Router(routerOptions)
}