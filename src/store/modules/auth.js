import api from '../../api'
import {
  GET_AUTH_FAILURE,
  GET_AUTH_SUCCESS,
} from '../types'
import {signOut, isLogin, saveCookie, getCookie} from '../../utils/authService'

const state = {
  user: null,
  updatedAt: (new Date()),
};


const actions = {
  authCheck({commit}, data) {
    return new Promise((resolve, reject) => {
      if (!data.email || !data.password) return reject();

      signOut();

      api.login(data)
        .then(response => {
          if (!response.ok || !response.body) {
            commit(GET_AUTH_FAILURE);
            reject(response.body.$error);
          }
          saveCookie('token', response.body.token);

          commit(GET_AUTH_SUCCESS, {user: response.body.user});
          resolve(response.body);
        }, response => {
          commit(GET_AUTH_FAILURE);
          reject(response.body.$error);
        })
    })
  },
  
  authReset({commit}, data) {
    return new Promise((resolve, reject) => {
      if (!data.email) return reject(); 

      api.reset(data)
        .then(response => {
          if (!response.ok || !response.body) {
            commit(GET_AUTH_FAILURE);
            reject();
          }
            commit(GET_AUTH_SUCCESS, {user: {}});
          resolve(response.body.$success);
        }, response => {
          commit(GET_AUTH_FAILURE);
          reject(response.body.$error);
        })
    })
  },
  isLogin({commit}) {
    return new Promise((resolve, reject) => {
      if (isLogin()) {
        if (state.user) {

          return resolve();
        }
        return api.getMe()
          .then(response => {
            if (!response.ok || !response.body) {
              commit(GET_AUTH_FAILURE);
              reject();
            }
            commit(GET_AUTH_SUCCESS, {user: response.body.user});
            resolve(response.body);
          }, response => {
            signOut();
            commit(GET_AUTH_FAILURE);
            reject(response.body.$error);
          });
      }
      signOut();
      return reject()
    })
  },

  updateSettings({commit}, data) {
    return new Promise((resolve, reject) => {
      
      let avaliables = [
        "priceEstablishment",
        "priceProvider",
        "priceSpotlight",
        "isPaymentTicket",
        "isPaymentCredit",
        "isPaymentDebit",
        "chargingRejected",
        "firstNotification",
        "secondNotification",
        "thirdNotification"
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updateSettings(obj)
            .then(response => {
              if (!response.ok) {
                return reject(response.body.$error);
              } else {
                return resolve();
              }
            }, response => {
              return reject(response.body.$error);
            })
      
    })
  },

  Logout() {
    //commit(GET_AUTH_FAILURE);
    signOut();
  },
};

const mutations = {
  [GET_AUTH_FAILURE](state) {
    state.user = null;
    state.updatedAt = new Date();
  },
  [GET_AUTH_SUCCESS](state, action) {
    state.user = JSON.parse(JSON.stringify(action.user));
    state.updatedAt = new Date();
  }
};

export default {
  state,
  actions,
  mutations,
}
