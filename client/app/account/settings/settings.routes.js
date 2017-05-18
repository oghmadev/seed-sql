'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('settings', {
      url: '/settings',
      template: '<settings></settings>',
      authenticate: true
    })
};
