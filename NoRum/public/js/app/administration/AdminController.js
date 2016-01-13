(function () {
  'use strict';

  function AdminController($http) {
    var vm = this;
    vm.deleteUser = function(userName){
      $http.post('/deleteUser', {username: userName});
      return true;
    };
    return vm;
  }

  angular
    .module('app.controllers')
    .controller('AdminController', ['$http', AdminController]);
}());
