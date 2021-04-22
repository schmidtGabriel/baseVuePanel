import {
  UserResource,
  DashboardResource,
  PaymentResource,
  SupportResource,
  NotificationResource,
  SettingsResource,
  AreaResource,
  CivilStateResource,
  CommonQuestionResource,
  ComplaintResource,
  NationalityResource,
  NewsResource,
  OrganResource,
  PromotionResource,
  ScheduleResource,
  SexResource,
  SubjectResource,
  CepResource
  
} from './resource';

import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading)

export default {
  startLoader: function(){
    if(this.loader){
      this.loader.hide()
    }
    
    this.loader = Vue.$loading.show({
      // Pass props by their camelCased names
      canCancel: true, // default false
      color: '#000000',
      loader: 'spinner',
      width: 64,
      height: 64,
      backgroundColor: '#ffffff',
      opacity: 0.5,
      zIndex: 999,
    });
  },
  stopLoader: function(){
    this.loader.hide()
  },
  // UTIL
  isExpired: function (oldDate) {
    oldDate = new Date(oldDate);
    let newDate = new Date();
    oldDate.setSeconds(oldDate.getSeconds() + 30); // limit 30 sec
    return oldDate < newDate
  },
  //DASHBOARD
  getDashboardList: function (q) {
    return DashboardResource.get({
      Q: q

    })
  },
    getDashboard: function () {
      return DashboardResource.get({
  
      })
  },

  // USER
  login: function (data) {
    return UserResource.save({
      PATH: 'login'
    }, data)
  },
  reset: function (data) {
    return UserResource.save({
      PATH: 'reset'
    },data)
  },
  getUserList: function (q) {
    return UserResource.get({
      Q: q
    })
  },
  getUser: function (id) {
    return UserResource.get({
      ID: id
    })
  },
  
  getMe: function () {
    return UserResource.get({
      PATH: 'me'
    })
  },
  createUser: function (data) {
    return UserResource.save({
      // PATH: ["app", "register"]
    }, data)
  },
  updateUser: function (data) {
    return UserResource.update({
      PATH: ''
    }, data)
  },
  deleteUser: function (data) {
    return UserResource.delete({
      ID: data.id
    })
  },
  updatePassword: function (data) {
    return  UserResource.update({
      PATH: "password"
    }, data)
  },
  createAddress: function (data) {
    return UserResource.save({
      PATH: 'address',
    }, data)
  },
  updateAddress: function (data) {
    return UserResource.update({
      PATH: 'address',
    }, data)
  },
  deleteAddress: function (data) {
    return UserResource.delete({
      PATH: 'address',
      ID: data.id
    })
  },
  getCep: function (id) {
    return CepResource.get({
      ID: id
    })
  },
  

  //PAYMENT
  getPaymentList: function (q) {
    return PaymentResource.get({
      Q: q
    })
  },
  getPayment: function (id) {
    return PaymentResource.get({
      ID: id
    })
  },
  createPayment: function (data) {
    return PaymentResource.save({
    }, data)
  },
  updatePayment: function (data) {
    return PaymentResource.update({
    }, data)
  },
  deletePayment: function (data) {
    return PaymentResource.delete({
      ID: data.id
    })
  },


  //AREA
  getAreaList: function (q) {
    return AreaResource.get({
      Q: q
    })
  },
  getArea: function (id) {
    return AreaResource.get({
      ID: id
    })
  },
  createArea: function (data) {
    return AreaResource.save({
    }, data)
  },
  updateArea: function (data) {
    return AreaResource.update({
    }, data)
  },
  deleteArea: function (data) {
    return AreaResource.delete({
      ID: data.id
    })
  },

  //CIVIL STATE
  getCivilStateList: function (q) {
    return CivilStateResource.get({
      Q: q
    })
  },
  getCivilState: function (id) {
    return CivilStateResource.get({
      ID: id
    })
  },
  createCivilState: function (data) {
    return CivilStateResource.save({
    }, data)
  },
  updateCivilState: function (data) {
    return CivilStateResource.update({
    }, data)
  },
  deleteCivilState: function (data) {
    return CivilStateResource.delete({
      ID: data.id
    })
  },

   //COMMON QUESTION
   getCommonQuestionList: function (q) {
    return CommonQuestionResource.get({
      Q: q
    })
  },
  getCommonQuestion: function (id) {
    return CommonQuestionResource.get({
      ID: id
    })
  },
  createCommonQuestion: function (data) {
    return CommonQuestionResource.save({
    }, data)
  },
  updateCommonQuestion: function (data) {
    return CommonQuestionResource.update({
    }, data)
  },
  deleteCommonQuestion: function (data) {
    return CommonQuestionResource.delete({
      ID: data.id
    })
  },



  //COMPLAINT
  getComplaintList: function (q) {
    return ComplaintResource.get({
      Q: q
    })
  },
  getComplaint: function (id) {
    return ComplaintResource.get({
      ID: id
    })
  },
  createComplaint: function (data) {
    return ComplaintResource.save({
    }, data)
  },
  updateComplaint: function (data) {
    return ComplaintResource.update({
    }, data)
  },
  deleteComplaint: function (data) {
    return ComplaintResource.delete({
      ID: data.id
    })
  },

  //NATIONALITY
  getNationalityList: function (q) {
    return NationalityResource.get({
      Q: q
    })
  },
  getNationality: function (id) {
    return NationalityResource.get({
      ID: id
    })
  },
  createNationality: function (data) {
    return NationalityResource.save({
    }, data)
  },
  updateNationality: function (data) {
    return NationalityResource.update({
    }, data)
  },
  deleteNationality: function (data) {
    return NationalityResource.delete({
      ID: data.id
    })
  },

  //NEWS
  getNewsList: function (q) {
    return NewsResource.get({
      Q: q
    })
  },
  getNews: function (id) {
    return NewsResource.get({
      ID: id
    })
  },
  createNews: function (data) {
    return NewsResource.save({
    }, data)
  },
  updateNews: function (data) {
    return NewsResource.update({
    }, data)
  },
  deleteNews: function (data) {
    return NewsResource.delete({
      ID: data.id
    })
  },

  //ORGAN
  getOrganList: function (q) {
    return OrganResource.get({
      Q: q
    })
  },
  getOrgan: function (id) {
    return OrganResource.get({
      ID: id
    })
  },
  createOrgan: function (data) {
    return OrganResource.save({
    }, data)
  },
  updateOrgan: function (data) {
    return OrganResource.update({
    }, data)
  },
  deleteOrgan: function (data) {
    return OrganResource.delete({
      ID: data.id
    })
  },

  //PROMOTION
  getPromotionList: function (q) {
    return PromotionResource.get({
      Q: q
    })
  },
  getPromotion: function (id) {
    return PromotionResource.get({
      ID: id
    })
  },
  createPromotion: function (data) {
    return PromotionResource.save({
    }, data)
  },
  updatePromotion: function (data) {
    return PromotionResource.update({
    }, data)
  },
  deletePromotion: function (data) {
    return PromotionResource.delete({
      ID: data.id
    })
  },

  //SCHEDULE
  getScheduleList: function (q) {
    return ScheduleResource.get({
      Q: q
    })
  },
  getSchedule: function (id) {
    return ScheduleResource.get({
      ID: id
    })
  },
  createSchedule: function (data) {
    return ScheduleResource.save({
    }, data)
  },
  updateSchedule: function (data) {
    return ScheduleResource.update({
    }, data)
  },
  deleteSchedule: function (data) {
    return ScheduleResource.delete({
      ID: data.id
    })
  },
  approveSchedule: function (data) {
    return ScheduleResource.save({
      PATH: 'approve',
    }, data)
  },
  rejectSchedule: function (data) {
    return ScheduleResource.save({
      PATH: 'reject',
    }, data)
  },

  //SEX
  getSexList: function (q) {
    return SexResource.get({
      Q: q
    })
  },
  getSex: function (id) {
    return SexResource.get({
      ID: id
    })
  },
  createSex: function (data) {
    return SexResource.save({
    }, data)
  },
  updateSex: function (data) {
    return SexResource.update({
    }, data)
  },
  deleteSex: function (data) {
    return SexResource.delete({
      ID: data.id
    })
  },
  
  //SUBJECT
  getSubjectList: function (q) {
    return SubjectResource.get({
      Q: q
    })
  },
  getSubject: function (id) {
    return SubjectResource.get({
      ID: id
    })
  },
  createSubject: function (data) {
    return SubjectResource.save({
    }, data)
  },
  updateSubject: function (data) {
    return SubjectResource.update({
    }, data)
  },
  deleteSubject: function (data) {
    return SubjectResource.delete({
      ID: data.id
    })
  },
  
  //SUPPORT
    getSupportList: function (q) {
    return SupportResource.get({
      Q: q
    })
  },
  getSupport: function (id) {
    return SupportResource.get({
      ID: id
    })
  },
  createSupport: function (data) {
    return SupportResource.save({
    }, data)
  },
  updateSupport: function (data) {
    return SupportResource.update({
    }, data)
  },
  deleteSupport: function (data) {
    return SupportResource.delete({
      ID: data.id
    })
  },
    
  //NOTIFICATION
  getNotificationsList: function (q) {
    return NotificationResource.get({
      Q: q
    })
  },
  createNotification: function (data) {
    return NotificationResource.save({
    }, data)
  },
  deleteNotification: function (data) {
    return NotificationResource.delete({
      ID: data.id
    })
  },


//SETTINGS
  getSettings: function () {
    return SettingsResource.get({})
  },
  updateSettings: function (data) {
    return SettingsResource.update(data)
  },

 
}
