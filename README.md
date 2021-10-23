# restoreca

## прочитай
- https://medium.com/js-dojo/how-to-reduce-your-vue-js-bundle-size-with-webpack-3145bf5019b7
- https://forum.vuejs.org/t/possible-or-advisable-to-have-dynamic-components-in-vue-router/16116/7 ::: Possible or advisable to have dynamic components in vue-router?
- https://learnvue.co/topics/tutorials/
- https://blog.logrocket.com/how-to-make-your-components-dynamic-in-vue-js/
- https://learnvue.co/2020/01/7-simple-vuejs-tips-you-can-use-to-become-a-better-developer/
- https://masteringjs.io/vue
- https://css-tricks.com/tag/vue/page/3/
- https://css-tricks.com/what-i-learned-building-a-word-game-app-with-nuxt-on-google-play/
- https://css-tricks.com/how-to-make-localstorage-reactive-in-vue/
- https://css-tricks.com/how-the-vue-composition-api-replaces-vue-mixins/
- https://css-tricks.com/building-renderless-vue-components/
- https://core-player.github.io/vue-core-video-player/
- https://css-tricks.com/the-power-of-named-transitions-in-vue
- https://docs.unlayer.com/docs/vue-component
- https://codepen.io/whoistobias/pen/yLNgjwy

- оформление закзаа
  - https://koumoul-dev.github.io/vuetify-jsonschema-form/latest/examples#basic
  - https://wotamann.gitbook.io/vuetify-form-base/

- https://github.com/daxter-army/daxUI

## пакеты
- https://github.com/nuxt-community/device-module
- https://github.com/blokwise/dynamic
- https://github.com/maoberlehner/vue-lazy-hydration
- https://github.com/fuxingloh/vue-horizontal
- https://github.com/jerrybendy/vue-touch-events
- https://github.com/filsuck/nuxt-blurhash


### @nuxtjs/device
```bash
  yarn add --dev @nuxtjs/device
```

```js
$device.isDesktop
$device.isMobile
$device.isTablet
$device.isMobileOrTablet
$device.isDesktopOrTablet
$device.isIos
$device.isWindows
$device.isMacOS
$device.isAndroid
$device.isFirefox
$device.isEdge
$device.isChrome
$device.isSamsung
$device.isCrawler

// The user agent is also injected an accessible with 
$device.userAgent
```

### vue-touch-events
```html
<!-- bind a tap event -->
<span v-touch:tap="touchHandler">Tap Me</span>

<!-- tap is the default event, you can omit it -->
<span v-touch="touchHandler">Tap Me</span>

<!-- bind the swipe event, no matter direction -->
<span v-touch:swipe="swipeHandler">Swipe Here</span>

<!-- only when swipe left can trigger the callback -->
<span v-touch:swipe.left="swipeHandler">Swipe Here</span>

<!-- bind a long tap event -->
<span v-touch:longtap="longtapHandler">Long Tap Event</span>

<!-- bind a start and end event -->
<span v-touch:start="startHandler" v-touch:end="endHandler">Down,start/Up,end Event</span>

<!-- bind a move and moving event -->
<span v-touch:moved="movedHandler">Triggered once when starting to move and tapTolerance is exceeded</span>
<span v-touch:moving="movingHandler">Continuously triggering Event</span>

<!-- touch and hold -->
<span v-touch:touchhold="touchHoldHandler">Touch and hold on the screen for a while</span>

<!-- you can even mix multiple events -->
<span v-touch:tap="tapHandler"
    v-touch:longtap="longtapHandler"
    v-touch:swipe.left="swipeLeftHandler"
    v-touch:start="startHandler" 
    v-touch:end="endHandler"
    v-touch:swipe.right="swipeRightHandler">Mix Multiple Events</span>

<!-- using different options for specified element -->
<span v-touch:tap="tapHandler"
    v-touch-options="{touchClass: 'active', swipeTolerance: 80, touchHoldTolerance: 300}">Different options</span>

<!-- customize touch effects by CSS class -->
<span v-touch:tap="tapHandler" v-touch-class="active">Customize touch class</span>
<!-- or -->
<span v-touch:tap="tapHandler" v-touch-options="{touchClass: 'active'}">Customize touch class</span>

<!-- change the directive name to others -->
<span v-kiss:tap="tapHandler">Change namespace to 'kiss'</span>
```

```js
Vue.use(Vue2TouchEvents, {
    disableClick: false,
    touchClass: '',
    tapTolerance: 10,
    touchHoldTolerance: 400,
    swipeTolerance: 30,
    longTapTimeInterval: 400,
    namespace: 'touch'
})
```