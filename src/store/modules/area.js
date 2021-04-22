import api from '../../api'
import {
  GET_AREA_LIST_SUCCESS,
  GET_AREA_LIST_FAILURE,
  GET_AREA_FAILURE,
  GET_AREA_SUCCESS,
  UPDATE_AREA_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getAreaList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getAreaList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
         commit(GET_AREA_LIST_FAILURE)
         return reject(response.body.$error)
      }
      commit(GET_AREA_LIST_SUCCESS, {
        areaList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)
    }, response => {
      api.stopLoader()
      commit(GET_AREA_LIST_FAILURE)
      return reject(response.body.$error)
    })
  })
  },
 
  cleanAreaList({commit}) {
    return commit(GET_AREA_LIST_FAILURE)
  },
  
  getArea({commit}, ud) {
    return new Promise((resolve, reject) => {

      api.getArea(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_AREA_FAILURE);
            reject();
          }
          commit(GET_AREA_SUCCESS, {
            area: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_AREA_FAILURE);
          reject();
        })
    })
  },
 
  
  updateArea({commit}, data) {
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

          api.updateArea(obj)
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
  createArea({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createArea(data)
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
  
  
 
  deleteArea({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteArea(data)
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

  [UPDATE_AREA_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.area));
  },
  [GET_AREA_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_AREA_LIST_SUCCESS](state, action) {
    state.list = action.areaList;
    state.listUpdated = new Date();
  },
  [GET_AREA_FAILURE](state) {
    state.selected = null
  },
  [GET_AREA_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.area));
  },
};

export default {
  state,
  actions,
  mutations
}
