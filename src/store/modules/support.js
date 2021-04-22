import api from '../../api'
import {
  GET_SUPPORT_LIST_SUCCESS,
  GET_SUPPORT_LIST_FAILURE,
  GET_SUPPORT_FAILURE,
  GET_SUPPORT_SUCCESS,
  UPDATE_SUPPORT_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {
  getSupportList({commit}, query) {
    return new Promise((resolve, reject) => {
    api.startLoader()
    api.getSupportList(query).then(response => {
      if (!response.ok) {
         commit(GET_SUPPORT_LIST_FAILURE)
         api.stopLoader()
         return reject()
      }
      commit(GET_SUPPORT_LIST_SUCCESS, {
        supportList: response.body.data
      })
      api.stopLoader()
      return resolve()

    }, response => {
      commit(GET_SUPPORT_LIST_FAILURE)
      api.stopLoader()
      return reject()

    })
  })
  },
 
  cleanSupportList({commit}) {
    return commit(GET_SUPPORT_LIST_FAILURE)
  },
  getSupport({commit}, ud) {
    return new Promise((resolve, reject) => {
      console.log(ud);
      if (!ud) return reject();

      api.getSupport(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_SUPPORT_FAILURE);
            reject();
          }
          commit(GET_SUPPORT_SUCCESS, {
            support: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_SUPPORT_FAILURE);
          reject();
        })
    })
  },
 
  
  updateSupport({commit}, data) {
    return new Promise((resolve, reject) => {

      
      let avaliables = [
        "id",
        "name",
        "InstallmentMax",
        "valueCentavos",
        "isActive",
        "isAttended"
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updateSupport(obj)
            .then(response => {
              if (!response.ok) {
                return reject();
              } else {
                return resolve();
              }
            }, response => {
              return reject();
            })
      
    })
  },
  createSupport({commit}, data) {
    return new Promise((resolve, reject) => {
      
      api.createSupport(data)
        .then(response => {
          if (!response.ok) {
            return reject();
          } else {
            return resolve();
          }
        }, response => {
          return reject();
        })
    })
  },
  
  
 
  deleteSupport({commit}, data) {
    return new Promise((resolve, reject) => {

      api.deleteSupport(data)
        .then(response => {
          if (!response.ok) {
            return reject();
          } else {
            return resolve();
          }
        }, response => {
          return reject();
        })
    })
  },

  updateSupport({commit}, data) {
    return new Promise((resolve, reject) => {

      
      let avaliables = [
        "id",
        "isAttended",
        "msg"
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updateSupport(obj)
            .then(response => {
              if (!response.ok) {
                return reject();
              } else {
                return resolve();
              }
            }, response => {
              return reject();
            })
      
    })
  },
  createSupport({commit}, data) {
    return new Promise((resolve, reject) => {
      
      api.createSupport(data)
        .then(response => {
          if (!response.ok) {
            return reject();
          } else {
            return resolve();
          }
        }, response => {
          return reject();
        })
    })
  },
  
  
};

const mutations = {

  [UPDATE_SUPPORT_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.support));
  },
  [GET_SUPPORT_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_SUPPORT_LIST_SUCCESS](state, action) {
    state.list = action.supportList;
    state.listUpdated = new Date();
  },
  [GET_SUPPORT_FAILURE](state) {
    state.selected = null
  },
  [GET_SUPPORT_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.support));
  },
};

export default {
  state,
  actions,
  mutations
}
