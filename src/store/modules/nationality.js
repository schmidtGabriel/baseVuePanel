import api from '../../api'
import {
  GET_NATIONALITY_LIST_SUCCESS,
  GET_NATIONALITY_LIST_FAILURE,
  GET_NATIONALITY_FAILURE,
  GET_NATIONALITY_SUCCESS,
  UPDATE_NATIONALITY_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getNationalityList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getNationalityList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
         commit(GET_NATIONALITY_LIST_FAILURE)
         return reject(response.body.$error)

      }
      commit(GET_NATIONALITY_LIST_SUCCESS, {
        nationalityList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)

    }, response => {
      api.stopLoader()
      commit(GET_NATIONALITY_LIST_FAILURE)
      return reject(response.body.$error)

    })
  })
  },
 
  cleanNationalityList({commit}) {
    return commit(GET_NATIONALITY_LIST_FAILURE)
  },
  
  getNationality({commit}, ud) {
    return new Promise((resolve, reject) => {

      api.getNationality(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_NATIONALITY_FAILURE);
            reject();
          }
          commit(GET_NATIONALITY_SUCCESS, {
            nationality: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_NATIONALITY_FAILURE);
          reject();
        })
    })
  },
 
  
  updateNationality({commit}, data) {
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

          api.updateNationality(obj)
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
  createNationality({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createNationality(data)
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
  
  
 
  deleteNationality({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteNationality(data)
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

  [UPDATE_NATIONALITY_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.nationality));
  },
  [GET_NATIONALITY_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_NATIONALITY_LIST_SUCCESS](state, action) {
    state.list = action.nationalityList;
    state.listUpdated = new Date();
  },
  [GET_NATIONALITY_FAILURE](state) {
    state.selected = null
  },
  [GET_NATIONALITY_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.nationality));
  },
};

export default {
  state,
  actions,
  mutations
}
