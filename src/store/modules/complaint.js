import api from '../../api'
import {
  GET_COMPLAINT_LIST_SUCCESS,
  GET_COMPLAINT_LIST_FAILURE,
  GET_COMPLAINT_FAILURE,
  GET_COMPLAINT_SUCCESS,
  UPDATE_COMPLAINT_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getComplaintList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getComplaintList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
         commit(GET_COMPLAINT_LIST_FAILURE)
         return reject(response.body.$error)

      }
      commit(GET_COMPLAINT_LIST_SUCCESS, {
        complaintList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)

    }, response => {
      api.stopLoader()
      commit(GET_COMPLAINT_LIST_FAILURE)
      return reject(response.body.$error)

    })
  })
  },
 
  cleanComplaintList({commit}) {
    return commit(GET_COMPLAINT_LIST_FAILURE)
  },
  
  getComplaint({commit}, ud) {
    return new Promise((resolve, reject) => {

      api.getComplaint(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_COMPLAINT_FAILURE);
            reject();
          }
          commit(GET_COMPLAINT_SUCCESS, {
            complaint: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_COMPLAINT_FAILURE);
          reject();
        })
    })
  },
 
  
  updateComplaint({commit}, data) {
    return new Promise((resolve, reject) => {

      api.startLoader()
      let avaliables = [
        "id",
        "msg",
        "isAttented",
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updateComplaint(obj)
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
  createComplaint({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createComplaint(data)
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
  
  
 
  deleteComplaint({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteComplaint(data)
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

  [UPDATE_COMPLAINT_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.complaint));
  },
  [GET_COMPLAINT_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_COMPLAINT_LIST_SUCCESS](state, action) {
    state.list = action.complaintList;
    state.listUpdated = new Date();
  },
  [GET_COMPLAINT_FAILURE](state) {
    state.selected = null
  },
  [GET_COMPLAINT_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.complaint));
  },
};

export default {
  state,
  actions,
  mutations
}
