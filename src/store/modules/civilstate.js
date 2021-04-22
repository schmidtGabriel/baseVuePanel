import api from '../../api'
import {
  GET_CIVILSTATE_LIST_SUCCESS,
  GET_CIVILSTATE_LIST_FAILURE,
  GET_CIVILSTATE_FAILURE,
  GET_CIVILSTATE_SUCCESS,
  UPDATE_CIVILSTATE_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getCivilStateList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getCivilStateList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
         commit(GET_CIVILSTATE_LIST_FAILURE)
         return reject(response.body.$error)
      }
      commit(GET_CIVILSTATE_LIST_SUCCESS, {
        civilstateList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)

    }, response => {
      api.stopLoader()
      commit(GET_CIVILSTATE_LIST_FAILURE)
      return reject(response.body.$error)

    })
  })
  },
 
  cleanCivilStateList({commit}) {
    return commit(GET_CIVILSTATE_LIST_FAILURE)
  },
  
  getCivilState({commit}, ud) {
    return new Promise((resolve, reject) => {

      api.getCivilState(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_CIVILSTATE_FAILURE);
            reject();
          }
          commit(GET_CIVILSTATE_SUCCESS, {
            civilstate: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_CIVILSTATE_FAILURE);
          reject();
        })
    })
  },
 
  
  updateCivilState({commit}, data) {
    return new Promise((resolve, reject) => {

      api.startLoader()
      let avaliables = [
        "id",
        "name",
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updateCivilState(obj)
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
  createCivilState({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createCivilState(data)
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
  
  
 
  deleteCivilState({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteCivilState(data)
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

  [UPDATE_CIVILSTATE_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.civilstate));
  },
  [GET_CIVILSTATE_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_CIVILSTATE_LIST_SUCCESS](state, action) {
    state.list = action.civilstateList;
    state.listUpdated = new Date();
  },
  [GET_CIVILSTATE_FAILURE](state) {
    state.selected = null
  },
  [GET_CIVILSTATE_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.civilstate));
  },
};

export default {
  state,
  actions,
  mutations
}
