import Vue from 'vue'
import App from './App.vue'

import router from './router'
import { store } from './store/Store'

import Vuelidate from 'vuelidate'

import './plugins/element.js'
import ElementUI from 'element-ui'
import './element-variables.scss'

import './styles/_global.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faCheck,faTimes,faUserPlus,faUser,faPen,faHome,faEuroSign,faUserFriends,
        faNewspaper, faEnvelope, faFileAlt, faFileExport, faLandmark, faHistory, faDownload
        }
        from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheck, faDownload, faTimes, faUserPlus, faUser, faPen, faHome, faEuroSign, faUserFriends, faNewspaper, faEnvelope, faFileAlt, faFileExport, faLandmark, faHistory)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuelidate)
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
