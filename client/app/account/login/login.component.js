'use strict'

import angular from 'angular'
import uiRouter from 'angular-ui-router'
import routing from './login.routes'

export class LoginComponent {
  constructor (Auth, $state) {
    'ngInject'

    this.Auth = Auth
    this.$state = $state
  }

  $onInit () {
    this.errEmail = false
    this.errPassword = false
  }

  login (form) {
    this.submitted = true
    this.errEmail = false
    this.errPassword = false

    const user = {
      email: this.user.email,
      password: this.user.password
    }

    if (form.$valid) {
      this.Auth.login(user)
        .then(() => {
          // Logged in, redirect to home
          this.$state.go('main')
        })
        .catch(err => {
          if (err.message === 'This email is not registered.') this.errEmail = true
          if (err.message === 'This password is not correct.') this.errPassword = true
        })
    }
  }

  close () {
    this.submitted = false
    this.errEmail = false
    this.errPassword = false
  }
}

export default angular.module('seedSqlApp.login', [uiRouter])
  .config(routing)
  .component('login', {
    template: require('./login.html'),
    controller: LoginComponent
  })
  .name
