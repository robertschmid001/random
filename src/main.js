import Vue from 'vue'
import App from './App.vue'

import router from './router'
import { store } from './store/Store'

import Vuelidate from 'vuelidate'
import VueI18n from 'vue-i18n'
import frLocale from 'element-ui/lib/locale/lang/fr'

import './plugins/element.js'
import ElementUI from 'element-ui'

import './element-variables.scss'
import Lodash from 'lodash'

import './styles/_global.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faInfoCircle,
  faUserCircle,
  faUser,
  faSearch,
  faChartPie,
  faCheck,
  faTimes,
  faUserPlus,
  faPen,
  faHome,
  faEuroSign,
  faUserFriends,
  faNewspaper,
  faEnvelope,
  faFileAlt,
  faFileExport,
  faLandmark,
  faHistory,
  faDownload,
  faPaperclip
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.use(VueI18n)
Vue.config.lang = 'fr'
Vue.locale('fr', frLocale)
// Vue.config.lang = 'fr'
// Object.keys(locales).forEach(function (lang) {
//   Vue.locale(lang, locales[lang])
// })

library.add(faPaperclip,faBars, faInfoCircle, faUserCircle, faChartPie, faSearch, faCheck, faDownload, faTimes, faUserPlus, faUser, faPen, faHome, faEuroSign, faUserFriends, faNewspaper, faEnvelope, faFileAlt, faFileExport, faLandmark, faHistory)
Vue.use(ElementUI);
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
    document.body.addEventListener('click', el.clickOutsideEvent, {
          passive: true
        })
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
