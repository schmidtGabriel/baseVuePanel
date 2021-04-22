import api from '../../api'

import {
 
  UPDATE_PASSWORD_SUCCESS,

} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  toValidateListUpdated: (new Date()),
  selected: null,
  udSelected: null,
  selectedUpdated: (new Date())
};


const actions = {
  
  
  
  updatePassword({commit}, data) {
    return new Promise((resolve, reject) => {
      console.log("teste")
      let avaliables = [
        "id",
        "password",
        "oldPassword",
        "confirmPass"
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updatePassword(obj)
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
  
  [UPDATE_PASSWORD_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.Password));
  },
  
};

export default {
  state,
  actions,
  mutations
}
