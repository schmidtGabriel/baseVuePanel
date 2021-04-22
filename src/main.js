import Vue from 'vue'
import VueRouter from 'vue-router'
// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
//import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'
import Notifications from 'vue-notification'
import './validators'


// router setup
import routes from './routes/routes'

// library imports
import Chartist from 'chartist'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'
import VueTheMask from 'vue-the-mask'
import VuePaginate from "vue-paginate";
import VModal from 'vue-js-modal'

import moment from 'moment';
moment.locale('pt-br');
 

// config setup
import store from './store';

// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)
Vue.use(SideBar)
Vue.use(VueTheMask)
Vue.use(VuePaginate)
Vue.use(VModal)


// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})
// global library setup
Object.defineProperty(Vue.prototype, '$moment', {
  get () {
    return this.$root.moment
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist,
    moment: moment,
  }
})
