(function () {
  'use strict';

  function AdminController($http) {
    var vm = this;
    vm.deleteUser = function(userName){
      $http.post('/deleteUser', {username: userName}).then(function(){
        window.location = '/';
      });
    };
    return vm;
  }

  angular
    .module('app.controllers')
    .controller('AdminController', ['$http', AdminController]);
}());
