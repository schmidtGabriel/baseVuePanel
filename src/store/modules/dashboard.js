import api from '../../api'
import {
  GET_DASHBOARD_LIST_SUCCESS,
  GET_DASHBOARD_LIST_FAILURE,
  GET_DASHBOARD_FAILURE,
  GET_DASHBOARD_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  toValidateListUpdated: (new Date()),
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {
  getDashboardList({commit}) {
    return new Promise((resolve, reject) => {
    api.startLoader()
    api.getDashboardList().then(response => {
      if (!response.ok) {
        api.stopLoader()
         commit(GET_DASHBOARD_FAILURE)
         return reject(response.body.$error)
      }
      commit(GET_DASHBOARD_SUCCESS, {
        dashboard: response.body
        })
        api.stopLoader()
        resolve(response.body.data);
      }, response => {
        commit(GET_DASHBOARD_FAILURE)
        api.stopLoader()
        return reject(response.body.$error)
      })
    })
    },
    
   
  getDashboard({commit}, ud) {
    return new Promise((resolve, reject) => {

      api.getDashboard(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_DASHBOARD_FAILURE);
            reject();
          }
          commit(GET_DASHBOARD_SUCCESS, {
            dashboard: response.body
          });
          resolve();
        }, response => {
          commit(GET_DASHBOARD_FAILURE);
          reject();
        })
    })
  },
 
 
  updateDashboard({commit}, data) {
    return new Promise((resolve, reject) => {

      
      let avaliables = [
        
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updateDashboard(obj)
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

 
  deleteDashboard({commit}, data) {
    return new Promise((resolve, reject) => {

      api.deleteDashboard(data)
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
  [GET_DASHBOARD_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_DASHBOARD_LIST_SUCCESS](state, action) {
    state.list = action.dashboardList;
    state.listUpdated = new Date();
  },
  [GET_DASHBOARD_FAILURE](state) {
    state.selected = null
  },
  [GET_DASHBOARD_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.dashboard));
  }
};

export default {
  state,
  actions,
  mutations
}
