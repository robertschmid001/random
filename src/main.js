import Vue from 'vue'
import App from './App.vue'

import router from './router'
import { store } from './store/Store'

import Vuelidate from 'vuelidate'

import './plugins/element.js'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/fr'

import './element-variables.scss'
import Lodash from 'lodash'

import './styles/_global.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faCheck,faTimes,faUserPlus,faUser,faPen,faHome,faEuroSign,faUserFriends, faNewspaper, faEnvelope, faFileAlt, faFileExport, faLandmark, faHistory, faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



library.add( faSearch, faCheck, faDownload, faTimes, faUserPlus, faUser, faPen, faHome, faEuroSign, faUserFriends, faNewspaper, faEnvelope, faFileAlt, faFileExport, faLandmark, faHistory)
Vue.use(ElementUI, { locale });
Vue.use(Lodash)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuelidate)


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
  stopProp(event) {
    event.stopPropagation()
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
