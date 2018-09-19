import Vue from 'vue'
import App from './App.vue'

import router from './router'
import { store } from './store/Store'

import Vuelidate from 'vuelidate'

import './plugins/element.js'
import ElementUI from 'element-ui'
import './element-variables.scss'

import './styles/_global.scss';

Vue.use(Vuelidate)
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
