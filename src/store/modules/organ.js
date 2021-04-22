import api from '../../api'
import {
  GET_ORGAN_LIST_SUCCESS,
  GET_ORGAN_LIST_FAILURE,
  GET_ORGAN_FAILURE,
  GET_ORGAN_SUCCESS,
  UPDATE_ORGAN_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getOrganList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getOrganList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
         commit(GET_ORGAN_LIST_FAILURE)
         return reject(response.body.$error)

      }
      commit(GET_ORGAN_LIST_SUCCESS, {
        organList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)

    }, response => {
      api.stopLoader()
      commit(GET_ORGAN_LIST_FAILURE)
      return reject(response.body.$error)

    })
  })
  },
 
  cleanOrganList({commit}) {
    return commit(GET_ORGAN_LIST_FAILURE)
  },
  
  getOrgan({commit}, ud) {
    return new Promise((resolve, reject) => {

      api.getOrgan(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_ORGAN_FAILURE);
            reject();
          }
          commit(GET_ORGAN_SUCCESS, {
            organ: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_ORGAN_FAILURE);
          reject();
        })
    })
  },
 
  
  updateOrgan({commit}, data) {
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

          api.updateOrgan(obj)
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
  createOrgan({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createOrgan(data)
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
  
  
 
  deleteOrgan({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteOrgan(data)
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

  [UPDATE_ORGAN_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.organ));
  },
  [GET_ORGAN_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_ORGAN_LIST_SUCCESS](state, action) {
    state.list = action.organList;
    state.listUpdated = new Date();
  },
  [GET_ORGAN_FAILURE](state) {
    state.selected = null
  },
  [GET_ORGAN_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.organ));
  },
};

export default {
  state,
  actions,
  mutations
}
