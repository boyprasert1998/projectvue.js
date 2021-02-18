import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueYouTubeEmbed from 'vue-youtube-embed'
import filters from './Filters'
import VueSweetalert2 from 'vue-sweetalert2'
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VCalendar from 'v-calendar'
import firebase from 'firebase'
import Vuex from 'vuex'
import vuetify from './plugins/vuetify'
import VueMoment from 'vue-moment'

Vue.component('pagination', require('laravel-vue-pagination'))
Vue.use(VCalendar, {
  componentPrefix: 'v'
})

Vue.use(BootstrapVue)
Vue.use(VueYouTubeEmbed)
Vue.use(VueSweetalert2)
Vue.use(Vuex)

axios.defaults.baseURL = 'http://127.0.0.1:8000'

Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: 'AIzaSyBDfeWbmNRlsQbX5eHQGx4cyib7Nwz9NlI',
  authDomain: 'beneat-62203.firebaseapp.com',
  databaseURL: 'https://beneat-62203-default-rtdb.firebaseio.com',
  projectId: 'beneat-62203',
  storageBucket: 'beneat-62203.appspot.com',
  messagingSenderId: '224622732656',
  appId: '1:224622732656:web:20773ab0b4b2d2b3219bb5',
  measurementId: 'G-T2616P2QN1'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const moment = require('moment')
require('moment/locale/th')
Vue.use(VueMoment, {
  moment
})

new Vue({
  router,
  filters,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
