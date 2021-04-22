import api from '../../api'
import {
  GET_SEX_LIST_SUCCESS,
  GET_SEX_LIST_FAILURE,
  GET_SEX_FAILURE,
  GET_SEX_SUCCESS,
  UPDATE_SEX_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getSexList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getSexList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
        commit(GET_SEX_LIST_FAILURE)
        return reject(response.body.$error)

      }
      commit(GET_SEX_LIST_SUCCESS, {
        sexList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)

    }, response => {
      api.stopLoader()
      commit(GET_SEX_LIST_FAILURE)
      return reject(response.body.$error)

    })
  })
  },
 
  cleanSexList({commit}) {
    return commit(GET_SEX_LIST_FAILURE)
  },
  
  getSex({commit}, ud) {
    return new Promise((resolve, reject) => {

      api.getSex(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_SEX_FAILURE);
            reject();
          }
          commit(GET_SEX_SUCCESS, {
            sex: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_SEX_FAILURE);
          reject();
        })
    })
  },
 
  
  updateSex({commit}, data) {
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

          api.updateSex(obj)
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
  createSex({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createSex(data)
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
  
  
 
  deleteSex({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteSex(data)
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

  [UPDATE_SEX_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.sex));
  },
  [GET_SEX_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_SEX_LIST_SUCCESS](state, action) {
    state.list = action.sexList;
    state.listUpdated = new Date();
  },
  [GET_SEX_FAILURE](state) {
    state.selected = null
  },
  [GET_SEX_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.sex));
  },
};

export default {
  state,
  actions,
  mutations
}
