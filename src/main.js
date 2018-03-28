import Vue from 'vue'

import './library'

/* Компоненты { */
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)

import MaskedInput from 'vue-masked-input' 
Vue.component('masked-input', MaskedInput)
/* } */

import App from './App'

import router from './router'
import store from './store'

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
