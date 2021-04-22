import api from '../../api'
import {
  GET_PROMOTION_LIST_SUCCESS,
  GET_PROMOTION_LIST_FAILURE,
  GET_PROMOTION_FAILURE,
  GET_PROMOTION_SUCCESS,
  UPDATE_PROMOTION_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getPromotionList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getPromotionList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
        return commit(GET_PROMOTION_LIST_FAILURE)
        return reject(response.body.$error)

      }
      commit(GET_PROMOTION_LIST_SUCCESS, {
        promotionList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)

    }, response => {
      api.stopLoader()
      commit(GET_PROMOTION_LIST_FAILURE)
      return reject(response.body.$error)

    })
  })
  },
 
  cleanPromotionList({commit}) {
    return commit(GET_PROMOTION_LIST_FAILURE)
  },
  
  getPromotion({commit}, ud) {
    return new Promise((resolve, reject) => {

      api.getPromotion(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_PROMOTION_FAILURE);
            reject();
          }
          commit(GET_PROMOTION_SUCCESS, {
            promotion: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_PROMOTION_FAILURE);
          reject();
        })
    })
  },
 
  
  updatePromotion({commit}, data) {
    return new Promise((resolve, reject) => {

      api.startLoader()
      let avaliables = [
        "id",
        "title",
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updatePromotion(obj)
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
  createPromotion({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createPromotion(data)
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
  
  
 
  deletePromotion({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deletePromotion(data)
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

  [UPDATE_PROMOTION_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.promotion));
  },
  [GET_PROMOTION_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_PROMOTION_LIST_SUCCESS](state, action) {
    state.list = action.promotionList;
    state.listUpdated = new Date();
  },
  [GET_PROMOTION_FAILURE](state) {
    state.selected = null
  },
  [GET_PROMOTION_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.promotion));
  },
};

export default {
  state,
  actions,
  mutations
}
