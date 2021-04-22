import api from '../../api'
import {
  GET_SUBJECT_LIST_SUCCESS,
  GET_SUBJECT_LIST_FAILURE,
  GET_SUBJECT_FAILURE,
  GET_SUBJECT_SUCCESS,
  UPDATE_SUBJECT_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getSubjectList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getSubjectList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
        commit(GET_SUBJECT_LIST_FAILURE)
        return reject(response.body.$error)

      }
      commit(GET_SUBJECT_LIST_SUCCESS, {
        subjectList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)

    }, response => {
      api.stopLoader()
      commit(GET_SUBJECT_LIST_FAILURE)
      return reject(response.body.$error)

    })
  })
  },
 
  cleanSubjectList({commit}) {
    return commit(GET_SUBJECT_LIST_FAILURE)
  },
  
  getSubject({commit}, ud) {
    return new Promise((resolve, reject) => {

      api.getSubject(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_SUBJECT_FAILURE);
            reject();
          }
          commit(GET_SUBJECT_SUCCESS, {
            subject: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_SUBJECT_FAILURE);
          reject();
        })
    })
  },
 
  
  updateSubject({commit}, data) {
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

          api.updateSubject(obj)
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
  createSubject({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createSubject(data)
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
  
  
 
  deleteSubject({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteSubject(data)
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

  [UPDATE_SUBJECT_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.subject));
  },
  [GET_SUBJECT_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_SUBJECT_LIST_SUCCESS](state, action) {
    state.list = action.subjectList;
    state.listUpdated = new Date();
  },
  [GET_SUBJECT_FAILURE](state) {
    state.selected = null
  },
  [GET_SUBJECT_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.subject));
  },
};

export default {
  state,
  actions,
  mutations
}
