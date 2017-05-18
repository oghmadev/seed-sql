'use strict';

import uiRouter from 'angular-ui-router'
import routing from './admin.routes'

export class AdminComponent {

  constructor($http, Auth, User) {
    'ngInject'

    this.$http = $http
    this.Auth = Auth
    this.users = User.query()
  }

  $onInit () {
    this.Auth.getCurrentUser()
      .then(user => {
        this.currentUser = user._id
      })
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

export default angular.module('seedSqlApp.admin', [uiRouter])
  .config(routing)
  .component('admin', {
    template: require('./admin.html'),
    controller: AdminComponent
  })
  .name