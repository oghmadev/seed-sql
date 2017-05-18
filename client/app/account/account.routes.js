'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('logout', {
      url: '/logout?referrer',
      referrer: 'main',
      template: '',
      controller: function($state, Auth) {
        'ngInject';

        var referrer = $state.params.referrer || $state.current.referrer || 'main';
        Auth.logout();
        $state.go(referrer);
      }
    })
}
