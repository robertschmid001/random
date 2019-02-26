import Vue from 'vue'
import App from './App.vue'
import axios from "axios"

import router from './router'
import { store } from './store/Store'

import Vuelidate from 'vuelidate'
import VueI18n from 'vue-i18n'
import frLocale from 'element-ui/lib/locale/lang/fr'

import './plugins/element.js'
import ElementUI from 'element-ui'

import './element-variables.scss'
import Lodash from 'lodash'
import JsonExcel from 'vue-json-excel'

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
  faPaperclip,
  faPhoneSquare,
  faFolderOpen,
  faSquare
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import _ from 'lodash'


Vue.use(VueI18n)
Vue.config.lang = 'fr'
Vue.locale('fr', frLocale)
// Vue.config.lang = 'fr'
// Object.keys(locales).forEach(function (lang) {
//   Vue.locale(lang, locales[lang])
// })

library.add(faSquare, faFolderOpen, faPhoneSquare, faPaperclip, faBars, faInfoCircle, faUserCircle, faChartPie, faSearch, faCheck, faDownload, faTimes, faUserPlus, faUser, faPen, faHome, faEuroSign, faUserFriends, faNewspaper, faEnvelope, faFileAlt, faFileExport, faLandmark, faHistory)
Vue.use(ElementUI);
//  Vue.use(_);
Vue.use(Lodash);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('downloadExcel', JsonExcel)
Vue.use(Vuelidate)


Vue.config.productionTip = false

Vue.mixin({
  methods: {
    getCabinets: function () {
      axios.post('https://courtier.cpms.fr/getCourtier')
        .then(response => {
          this.$store.state.holdings = response.data.holding
          this.$store.state.cabinet = response.data.cabinet
          this.$store.state.coCourtiers = response.data.coCourtiers
        })
    },
    getCabinetInfo: function () {
      axios.post('https://courtier.cpms.fr/getCourtier')
        .then(response => {
          this.$store.state.cabinet = response.data.cabinet
          this.$store.state.coCourtiers = response.data.coCourtiers
        })
    },
    getCotisation: function () {
      axios.post('https://courtier.cpms.fr/getCotisation')
        .then(response => {
          this.$store.state.cotisations = response.data
        })
    },
    getAssure: function () {
      axios.post('https://courtier.cpms.fr/getAssure')
        .then(response => {
          this.$store.state.assure = response.data
        })
    },
    getCourtierDocs: function () {
      axios.post('https://courtier.cpms.fr/getCourtierDocs')
        .then(response => {
          this.$store.state.docs = response.data

        })
    },
    getInfoAccueil: function () {
      axios.post('https://courtier.cpms.fr/getMainInfo')
        .then(response => {
          this.$store.state.Main = response.data
        })
    },
    getTranslation: function () {
      axios.post('https://courtier.cpms.fr/getTranslation')
        .then(response => {
          this.$store.state.translation = response.data
        })
    },
    getAppel: function () {
      axios.post('https://courtier.cpms.fr/getAppel')
        .then(response => {
          this.$store.state.appel = response.data
        })
    },
    getDocs: function () {
      axios.post('https://courtier.cpms.fr/getDocs')
        .then(response => {
          this.$store.state.tableDocs = response.data
        })
    }
  }
})

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

