'use strict';

import {
  UtilService
} from './util.service';

export default angular.module('seedSqlApp.util', [])
  .factory('Util', UtilService)
  .name;
