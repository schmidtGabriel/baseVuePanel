import api from '../../api'
import {
  GET_NEWS_LIST_SUCCESS,
  GET_NEWS_LIST_FAILURE,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
  UPDATE_NEWS_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getNewsList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getNewsList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
         commit(GET_NEWS_LIST_FAILURE)
        return reject(response.body.$error)

      }
      commit(GET_NEWS_LIST_SUCCESS, {
        newsList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)

    }, response => {
      api.stopLoader()
      commit(GET_NEWS_LIST_FAILURE)
      return reject(response.body.$error)

    })
  })
  },
 
  cleanNewsList({commit}) {
    return commit(GET_NEWS_LIST_FAILURE)
  },
  
  getNews({commit}, ud) {
    return new Promise((resolve, reject) => {

      api.getNews(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_NEWS_FAILURE);
            reject();
          }
          commit(GET_NEWS_SUCCESS, {
            news: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_NEWS_FAILURE);
          reject();
        })
    })
  },
 
  
  updateNews({commit}, data) {
    return new Promise((resolve, reject) => {

      api.startLoader()
      let avaliables = [
        "id",
        "title",
        "description",
        "isFeatured"
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updateNews(obj)
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
  createNews({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createNews(data)
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
  
  
 
  deleteNews({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteNews(data)
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

  [UPDATE_NEWS_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.news));
  },
  [GET_NEWS_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_NEWS_LIST_SUCCESS](state, action) {
    state.list = action.newsList;
    state.listUpdated = new Date();
  },
  [GET_NEWS_FAILURE](state) {
    state.selected = null
  },
  [GET_NEWS_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.news));
  },
};

export default {
  state,
  actions,
  mutations
}
