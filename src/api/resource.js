import Vue from 'vue'
import VueResource from 'vue-resource'
import {NAMES} from '../config'
import {getCookie, signOut, isLogin} from '../utils/authService'

Vue.use(VueResource);

// HTTP
// Vue.http.options.crossOrigin = true;
// Vue.http.options.credentials = true;

Vue.http.interceptors.push((request, next) => {
  request.headers = request.headers || {};
  if (isLogin()) {
    request.headers.set('security-token', getCookie('token').replace(/(^")|("$)/g, ''))
  }

  request.headers.set("content-type", "application/json");
  next((response) => {
    if (response.status === 401) {
      signOut();
      window.location = window.location.href.split('#')[0] + '#/login'

    }
  })
});


export const UserResource = Vue.resource(NAMES.fullUrl + 'user{/PATH*}{/ID}{?Q*}');
export const AddressResource = Vue.resource(NAMES.fullUrl + 'address{/PATH*}{/ID}{?Q*}');
export const PaymentResource = Vue.resource(NAMES.fullUrl + 'formpayment{/PATH*}{/ID}{?Q*}')
export const SettingsResource = Vue.resource(NAMES.fullUrl + 'config/settings{/PATH*}{/ID}{?Q*}');
export const PasswordResource = Vue.resource(NAMES.fullUrl + 'password{/PATH*}{/ID}{?Q*}');
export const DashboardResource = Vue.resource(NAMES.fullUrl + 'dashboard{/PATH*}{/ID}{?Q*}');
export const SupportResource = Vue.resource(NAMES.fullUrl + 'support{/PATH*}{/ID}{?Q*}');
export const NotificationResource = Vue.resource(NAMES.fullUrl + 'notification{/PATH*}{/ID}{?Q*}');
export const CepResource = Vue.resource(NAMES.fullUrl + 'cep{/PATH*}{/ID}{?Q*}');


export const AreaResource = Vue.resource(NAMES.fullUrl + 'area{/PATH*}{/ID}{?Q*}')
export const CivilStateResource = Vue.resource(NAMES.fullUrl + 'civilstate{/PATH*}{/ID}{?Q*}')
export const CommonQuestionResource = Vue.resource(NAMES.fullUrl + 'commonquestion{/PATH*}{/ID}{?Q*}')
export const ComplaintResource = Vue.resource(NAMES.fullUrl + 'complaint{/PATH*}{/ID}{?Q*}')
export const NationalityResource = Vue.resource(NAMES.fullUrl + 'nationality{/PATH*}{/ID}{?Q*}')
export const NewsResource = Vue.resource(NAMES.fullUrl + 'news{/PATH*}{/ID}{?Q*}')
export const OrganResource = Vue.resource(NAMES.fullUrl + 'organ{/PATH*}{/ID}{?Q*}')
export const PromotionResource = Vue.resource(NAMES.fullUrl + 'promotion{/PATH*}{/ID}{?Q*}')
export const ScheduleResource = Vue.resource(NAMES.fullUrl + 'schedule{/PATH*}{/ID}{?Q*}')
export const SexResource = Vue.resource(NAMES.fullUrl + 'sex{/PATH*}{/ID}{?Q*}')
export const SubjectResource = Vue.resource(NAMES.fullUrl + 'subject{/PATH*}{/ID}{?Q*}')



export const GraphResource = Vue.resource(NAMES.fullUrl + 'graph{/PATH*}{/ID}{?Q*}');
export const GraphUserResource = Vue.resource(NAMES.fullUrl + 'graph/user{/PATH*}{/ID}{?Q*}');
export const GraphOperatorResource = Vue.resource(NAMES.fullUrl + 'graph/operator{/PATH*}{/ID}{?Q*}');
export const GraphTransactionResource = Vue.resource(NAMES.fullUrl + 'graph/transaction{/PATH*}{/ID}{?Q*}');
export const GraphRechargeResource = Vue.resource(NAMES.fullUrl + 'graph/recharge{/PATH*}{/ID}{?Q*}');
export const GraphWalletResource = Vue.resource(NAMES.fullUrl + 'graph/wallet{/PATH*}{/ID}{?Q*}');



