'use strict'

export default function routes($stateProvider) {
  'ngInject'

  $stateProvider
    .state('signup', {
      url: '/signup',
      template: '<signup></signup>',
      authenticate: false
    })
}
