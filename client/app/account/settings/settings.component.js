'use strict'

import uiRouter from 'angular-ui-router'
import routing from './settings.routes'

export class SettingsComponent {
  /*@ngInject*/

  constructor (Auth, $cookies) {
    this.Auth = Auth
    this.$cookies = $cookies

  }

  $onInit () {
    this.saveSuccess = false
    this.saveFailure = false
  }

  changePassword (form) {
    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          form.$setPristine()
          form.$setUntouched()

          this.saveSuccess = true
          this.saveFailure = false
          this.user = {}
        })
        .catch(() => {
          this.saveFailure = true
          this.saveSuccess = false
        })
    }
  }

  closeNotification () {
    this.saveSuccess = false
    this.saveFailure = false
  }
}

export default angular.module('seedSqlApp.settings', [uiRouter])
  .config(routing)
  .component('settings', {
    template: require('./settings.html'),
    controller: SettingsComponent
  })
  .name