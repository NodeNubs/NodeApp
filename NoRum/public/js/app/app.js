(function () {
  'use strict';


  angular.module('app.services', []);
  angular.module('app.directives', []);
  angular.module('app.filters', []);
  angular.module('app.controllers', ['app.services']);
  angular.module('app', ['app.services', 'app.directives', 'app.filters', 'app.controllers'])
}());
