'use strict'

import angular from 'angular'

export default angular.module('validation.match', [])
  .directive('match', ['$parse', function match($parse) {
    return {
      require: '?ngModel',
      restrict: 'A',
      link: (scope, elem, attrs, ctrl) => {

        if (!ctrl || !attrs.match) return

        const matchGetter = $parse(attrs.match)
        const caselessGetter = $parse(attrs.matchCaseless)
        const noMatchGetter = $parse(attrs.notMatch)
        const matchIgnoreEmptyGetter = $parse(attrs.matchIgnoreEmpty)

        scope.$watch(getMatchValue, () => {
          ctrl.$$parseAndValidate()
        })

        ctrl.$validators.match = (modelValue, viewValue) => {
          const matcher = modelValue || viewValue
          const match = getMatchValue()
          const notMatch = noMatchGetter(scope)
          let value

          if (matchIgnoreEmptyGetter(scope) && !viewValue) {
            return true
          }

          if (caselessGetter(scope)) {
            value = angular.lowercase(matcher) === angular.lowercase(match)
          } else {
            value = matcher === match
          }
          /*jslint bitwise: true */
          value ^= notMatch
          /*jslint bitwise: false */
          return !!value
        }

        function getMatchValue () {
          let match = matchGetter(scope)
          if (angular.isObject(match) && match.hasOwnProperty('$viewValue')) {
            match = match.$viewValue
          }
          return match
        }
      }
    }
  }])
  .name
