import api from '../../api'
import {
  GET_PAYMENT_LIST_SUCCESS,
  GET_PAYMENT_LIST_FAILURE,
  GET_PAYMENT_FAILURE,
  GET_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getPaymentList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getPaymentList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
        commit(GET_PAYMENT_LIST_FAILURE)
        return reject(response.body.$error)

      }
      commit(GET_PAYMENT_LIST_SUCCESS, {
        paymentList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)

    }, response => {
      api.stopLoader()
      commit(GET_PAYMENT_LIST_FAILURE)
      return reject(response.body.$error)

    })
  })
  },
 
  cleanPaymentList({commit}) {
    return commit(GET_PAYMENT_LIST_FAILURE)
  },
  
  getPayment({commit}, ud) {
    return new Promise((resolve, reject) => {

      api.getPayment(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_PAYMENT_FAILURE);
            reject();
          }
          commit(GET_PAYMENT_SUCCESS, {
            payment: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_PAYMENT_FAILURE);
          reject();
        })
    })
  },
 
  
  updatePayment({commit}, data) {
    return new Promise((resolve, reject) => {

      api.startLoader()
      let avaliables = [
        "id",
        "description",
        "discount",
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updatePayment(obj)
            .then(response => {
              if (!response.ok) {
                api.stopLoader()
                return reject(response.body.$error);
              } else {
                api.stopLoader()
                return resolve(response.body.$success);
              }
            }, response => {
              api.stopLoader()
              return reject(response.body.$error);
            })
      
    })
  },
  createPayment({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createPayment(data)
        .then(response => {
          if (!response.ok) {
            api.stopLoader()
            return reject(response.body.$error);
          } else {
            api.stopLoader()
            return resolve(response.body.$success);
          }
        }, response => {
          api.stopLoader()
          return reject(response.body.$error);
        })
    })
  },
  
  
 
  deletePayment({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deletePayment(data)
        .then(response => {
          if (!response.ok) {
            api.stopLoader()
            return reject(response.body.$error);
          } else {
            api.stopLoader()
            return resolve(response.body.$success);
          }
        }, response => {
          api.stopLoader()
          return reject(response.body.$error);
        })
    })
  },

  
  
};

const mutations = {

  [UPDATE_PAYMENT_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.payment));
  },
  [GET_PAYMENT_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_PAYMENT_LIST_SUCCESS](state, action) {
    state.list = action.paymentList;
    state.listUpdated = new Date();
  },
  [GET_PAYMENT_FAILURE](state) {
    state.selected = null
  },
  [GET_PAYMENT_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.payment));
  },
};

export default {
  state,
  actions,
  mutations
}
