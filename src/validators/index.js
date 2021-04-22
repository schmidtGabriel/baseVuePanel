import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate'

Validator.extend('fullName', {
  getMessage: field => 'Insira o nome completo (Exemplo: Robim Uudi',
  validate: value => /\b([A-Z]{1}[a-z]{1,30}[- ]{0,1}|[A-Z]{1}[- \']{1}[A-Z]{0,1} [a-z]{1,30}[- ]{0,1}|[a-z]{1,2}[ -\']{1}[A-Z]{1}[a-z]{1,30}){2,5}/.test(value)
});
/*Validator.extend('currence', {
  getMessage: field => 'Insira o nome completo (Exemplo: Robin Uudi',
  validate: value => /\b([A-Z]{1}[a-z]{1,30}[- ]{0,1}|[A-Z]{1}[- \']{1}[A-Z]{0,1} [a-z]{1,30}[- ]{0,1}|[a-z]{1,2}[ -\']{1}[A-Z]{1}[a-z]{1,30}){2,5}/.test(value)
});*/

const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields', 
  delay: 0, 
  locale: 'pt-BR',
  dictionary: null, 
  strict: true, 
  enableAutoClasses: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'ng-valid', // model is valid
    invalid: 'ng-invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'ng-dirty' // control has been interacted with
  },
  events: 'input|blur',
  inject: true  
};
Vue.use(VeeValidate,config);