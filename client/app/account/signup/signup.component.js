'use strict'

import uiRouter from 'angular-ui-router'
import routes from './signup.routes'

export class SignupController {
  constructor(Auth, $state) {
    'ngInject'

    this.Auth = Auth
    this.$state = $state
  }

  $onInit() {
    this.user = {
      name: '',
      email: '',
      password: ''
    }

    this.saveFailure = false
  }


  register(form) {
    if(form.$valid) {
      this.saveFailure = false

      return this.Auth.createUser(this.user)
        .then(() => {
          this.$state.go('admin')
        })
        .catch(err => {
          this.saveFailure = true
        })
    }
  }
}

export default angular.module('seedSqlApp.signup', [uiRouter])
  .config(routes)
  .component('signup', {
    template: require('./signup.html'),
    controller: SignupController
  })
  .name