(function () {
  'use strict';
  function AdminController($http, jQuery) {
    var vm = this;
    vm.deleteUser = function (userName) {
      $http.post('/deleteUser', {username: userName}).then(function () {
        window.location = '/administration';
      });
    };
    return vm;
  }

  angular
    .module('app.controllers')
    .controller('AdminController', ['$http', 'jQuery', AdminController]);
}());
