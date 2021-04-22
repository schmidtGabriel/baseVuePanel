import api from '../../api'
import {
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
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

  getUserList({commit}, query) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.getUserList(query).then(response => {
      if (!response.ok) {
         commit(GET_USER_LIST_FAILURE)
         api.stopLoader()
         return reject(response.body.$error)
      }
      commit(GET_USER_LIST_SUCCESS, {
        userList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)
    }, response => {
      commit(GET_USER_LIST_FAILURE)
      api.stopLoader()
      return reject(esponse.body.$error)
    })
  })
  },

  getUser({commit}, id) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.getUser(id)
        .then(response => {
          if (!response.ok) {
            commit(GET_USER_FAILURE);
            api.stopLoader()
            return reject(response.body.$error);
          }
          commit(GET_USER_SUCCESS, {
            user: response.body
          });
          api.stopLoader()
          return resolve(response.body.data);
        }, response => {
          commit(GET_USER_FAILURE);
          api.stopLoader()
          return reject(response.body.$error);
        })
    })
  },

  updateUser({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      if (data.formattedPhone != undefined) {
        // data.phone = data.formattedPhone.replace("(","").replace(")", "").replace("-", "").replace(" ", "");
        data.phone = data.formattedPhone.replace(/[^0-9]/g, '');

      
      }

      if (data.birthday != undefined) {
        data.birthday = data.birthday.replace(/[^0-9]/g, '');
      }

  
      
      let avaliables = [
        "id",
        "name",
        "email",
        "phone",
        "birthday",
        "password",
        "oldPassword",
        "isAdmin",
        "isActive",
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updateUser(obj)
            .then(response => {
              if (!response.ok) {
                api.stopLoader()

                return reject(response.body.$error);
              } else {
                api.stopLoader()

                return resolve(response.body);
              }
            }, response => {
              api.stopLoader()

              return reject(response.body.$error);
            })
      
    })
  },
  createUser({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      if (data.formattedPhone != undefined) {
        data.phone = data.formattedPhone.replace(/[^0-9]/g, '');
      }

      if (data.birthday != undefined) {
        data.birthday = data.birthday.replace(/[^0-9]/g, '');
      }

  
      
      api.createUser(data)
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


  deleteUser({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteUser(data)
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

  createAddress({commit}, data) {
    return new Promise((resolve, reject) => {
    
      api.createAddress(data)
        .then(response => {
          if (!response.ok) {
            return reject(response.body.$error);
          } else {
            return resolve(response.body.$success);
          }
        }, response => {
          return reject(response.body.$error);
        })
    })
  },
  updateAddress({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()

      let avaliables = [
          "id",
          "name",
          "street",
          "number",
          "district",
          "city",
          "state",
          "abbreviation",
          "complement",
          "cep"
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }


          api.updateAddress(obj)
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
  deleteAddress({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteAddress(data)
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

  

  getCep({commit}, id) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.getCep(id)
        .then(response => {
          if (!response.ok) {
            commit();
            api.stopLoader()
            return reject(response.body.$error);
          }
          commit("", {
            user: response.body
          });
          api.stopLoader()
          return resolve(response.body.data);
        }, response => {
          commit();
          api.stopLoader()
          return reject(response.body.$error);
        })
    })
  },
 
  changeUserStatus({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.changeUserStatus(data)
        .then(response => {
          if (!response.ok) {
            api.stopLoader()
            return reject(response.body.$error);
          }

          /*commit(CHANGE_USER_STATUS_SUCCESS, {
            status: data.active
          });*/
          api.stopLoader()
          return resolve(response.body.$success);

        }, response => {
          api.stopLoader()
          return reject(response.body.$error);
        })
    })
  },
  
  validateUser({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.validateUser(data)
        .then(response => {
          if (!response.ok) {
            api.stopLoader()
            return reject(response.body.$error);
          }
          api.stopLoader()
          return resolve(response.body.$success);

        }, response => {
          api.stopLoader()
          return reject(response.body.$error);
        })
    })
  },
  rejectUser({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.rejectUser(data)
        .then(response => {
          if (!response.ok) {
            api.stopLoader()
            return reject(response.body.$error);
          }
          api.stopLoader()
          return resolve(response.body.$success);

        }, response => {
          api.stopLoader()
          return reject(response.body.$error);
        })
    })
  },
};

const mutations = {

  [UPDATE_USER_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.user));
  },
  [GET_USER_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_USER_LIST_SUCCESS](state, action) {
    state.list = action.userList;
    state.listUpdated = new Date();
  },
  [GET_USER_FAILURE](state) {
    state.selected = null
  },
  [GET_USER_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.user));
  },
};

export default {
  state,
  actions,
  mutations
}
