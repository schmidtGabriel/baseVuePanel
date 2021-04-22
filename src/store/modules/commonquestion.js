import api from '../../api'
import {
  GET_COMMONQUESTION_LIST_SUCCESS,
  GET_COMMONQUESTION_LIST_FAILURE,
  GET_COMMONQUESTION_FAILURE,
  GET_COMMONQUESTION_SUCCESS,
  UPDATE_COMMONQUESTION_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getCommonQuestionList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getCommonQuestionList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
         commit(GET_COMMONQUESTION_LIST_FAILURE)
         return reject(response.body.$error)

      }
      commit(GET_COMMONQUESTION_LIST_SUCCESS, {
        commonquestionList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)

    }, response => {
      api.stopLoader()
      commit(GET_COMMONQUESTION_LIST_FAILURE)
      return reject(response.body.$error)

    })
  })
  },
 
  cleanCommonQuestionList({commit}) {
    return commit(GET_COMMONQUESTION_LIST_FAILURE)
  },
  
  getCommonQuestion({commit}, ud) {
    return new Promise((resolve, reject) => {

      api.getCommonQuestion(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_COMMONQUESTION_FAILURE);
            reject();
          }
          commit(GET_COMMONQUESTION_SUCCESS, {
            commonquestion: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_COMMONQUESTION_FAILURE);
          reject();
        })
    })
  },
 
  
  updateCommonQuestion({commit}, data) {
    return new Promise((resolve, reject) => {

      api.startLoader()
      let avaliables = [
        "id",
        "question",
        "answer"

      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updateCommonQuestion(obj)
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
  createCommonQuestion({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createCommonQuestion(data)
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
  
  
 
  deleteCommonQuestion({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteCommonQuestion(data)
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

  [UPDATE_COMMONQUESTION_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.commonquestion));
  },
  [GET_COMMONQUESTION_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_COMMONQUESTION_LIST_SUCCESS](state, action) {
    state.list = action.commonquestionList;
    state.listUpdated = new Date();
  },
  [GET_COMMONQUESTION_FAILURE](state) {
    state.selected = null
  },
  [GET_COMMONQUESTION_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.commonquestion));
  },
};

export default {
  state,
  actions,
  mutations
}
