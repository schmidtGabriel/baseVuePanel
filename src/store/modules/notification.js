import api from '../../api'
import {
  GET_NOTIFICATION_LIST_SUCCESS,
  GET_NOTIFICATION_LIST_FAILURE,
  GET_NOTIFICATION_FAILURE,
  GET_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_SUCCESS,
  CHANGE_NOTIFICATION_STATUS_SUCCESS,

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
  
  getNotificationsList({commit}, query) {
    return new Promise((resolve, reject) => {
    api.startLoader()
    api.getNotificationsList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
       commit(GET_NOTIFICATION_LIST_FAILURE)
       return reject()
      }
      commit(GET_NOTIFICATION_LIST_SUCCESS, {
        notificationList: response.body.data
      })
      api.stopLoader()
      return resolve()

    }, response => {
      api.stopLoader()
      commit(GET_NOTIFICATION_LIST_FAILURE)
      return reject()
    })
  })
  },
  
  cleanNotificationList({commit}) {
    return commit(GET_NOTIFICATION_LIST_FAILURE)
  },
  getNotification({commit}, id) {
    return new Promise((resolve, reject) => {
      if (!id) return reject();

      api.getNotification(id)
        .then(response => {
          if (!response.ok) {
            commit(GET_NOTIFICATION_FAILURE);
            reject();
          }else{
            commit(GET_NOTIFICATION_LIST_SUCCESS, {
              notification: response.body.data
            }) 
          resolve(response.body);
          }
        }, response => {
          commit(GET_NOTIFICATION_FAILURE);
          reject();
        })
    })
  },
  
  updateNotification({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      let avaliables = [
        "id",
        "name",
        "about",
        "deliveryFeeCentavos",
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }
          api.updateNotification(obj)
            .then(response => {
              if (!response.ok) {
                api.stopLoader()
                return reject();
              } else {
                api.stopLoader()
                return resolve();
              }
            }, response => {
              api.stopLoader()
              return reject();
            })
       
    })
  },
  createNotification({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createNotification(data)
        .then(response => {
          if (!response.ok) {
            api.stopLoader()
            return reject();
          } else {
            api.stopLoader()
            return resolve();
          }
        }, response => {
          api.stopLoader()
          return reject();
        })
    })
  },
  deleteNotification({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteNotification(data)
        .then(response => {
          if (!response.ok) {
            api.stopLoader()
            return reject();
          } else {
            api.stopLoader()
            return resolve();
          }
        }, response => {
          api.stopLoader()
          return reject();
        })
    })
  },
 
  
};

const mutations = {
  [CHANGE_NOTIFICATION_STATUS_SUCCESS](state, action) {
    state.selected.active = action.status;
  },
  [UPDATE_NOTIFICATION_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.Notification));
  },
  [GET_NOTIFICATION_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_NOTIFICATION_LIST_SUCCESS](state, action) {
    state.list = action.notificationList;
    state.listUpdated = new Date();
  },
  
  [GET_NOTIFICATION_FAILURE](state) {
    state.selected = null
  },
  [GET_NOTIFICATION_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.notification));
  },
};

export default {
  state,
  actions,
  mutations
}
