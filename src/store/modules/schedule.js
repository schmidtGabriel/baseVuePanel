import api from '../../api'
import {
  GET_SCHEDULE_LIST_SUCCESS,
  GET_SCHEDULE_LIST_FAILURE,
  GET_SCHEDULE_FAILURE,
  GET_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getScheduleList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getScheduleList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
        commit(GET_SCHEDULE_LIST_FAILURE)
        return reject(response.body.$error)

      }
      commit(GET_SCHEDULE_LIST_SUCCESS, {
        scheduleList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)

    }, response => {
      api.stopLoader()
      commit(GET_SCHEDULE_LIST_FAILURE)
      return reject(response.body.$error)

    })
  })
  },
 
  cleanScheduleList({commit}) {
    return commit(GET_SCHEDULE_LIST_FAILURE)
  },
  
  getSchedule({commit}, ud) {
    return new Promise((resolve, reject) => {

      api.getSchedule(ud)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_SCHEDULE_FAILURE);
            reject();
          }
          commit(GET_SCHEDULE_SUCCESS, {
            schedule: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_SCHEDULE_FAILURE);
          reject();
        })
    })
  },
 
  
  updateSchedule({commit}, data) {
    return new Promise((resolve, reject) => {

      api.startLoader()
      let avaliables = [
        "id",
        "AreaId",
        "dateSchedule",
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updateSchedule(obj)
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
  createSchedule({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createSchedule(data)
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
  
  
 
  deleteSchedule({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteSchedule(data)
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

  approveSchedule({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.approveSchedule(data)
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

  rejectSchedule({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.rejectSchedule(data)
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

  [UPDATE_SCHEDULE_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.schedule));
  },
  [GET_SCHEDULE_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_SCHEDULE_LIST_SUCCESS](state, action) {
    state.list = action.scheduleList;
    state.listUpdated = new Date();
  },
  [GET_SCHEDULE_FAILURE](state) {
    state.selected = null
  },
  [GET_SCHEDULE_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.schedule));
  },
};

export default {
  state,
  actions,
  mutations
}
