
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Base state control
import actions from './actions'
import getters from './getters'

// Modules
import auth from './modules/auth';
import user from './modules/user';
import password from './modules/password';
import dashboard from './modules/dashboard';
import support from './modules/support';
import notification from './modules/notification';
import payment from './modules/payment';
import area from './modules/area';
import civilstate from './modules/civilstate';
import commonquestion from './modules/commonquestion';
import complaint from './modules/complaint';
import nationality from './modules/nationality';
import news from './modules/news';
import organ from './modules/organ';
import promotion from './modules/promotion';
import schedule from './modules/schedule';
import sex from './modules/sex';
import subject from './modules/subject';


export default new Vuex.Store({
  actions,
  getters,
  modules: {
    auth,
    user,
    password,
    dashboard,
    support,
    notification,
    payment,
    area,
    civilstate,
    commonquestion,
    complaint,
    nationality,
    news,
    organ,
    promotion,
    schedule,
    sex,
    subject
  }
})
