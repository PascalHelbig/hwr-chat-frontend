'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the hwrChatApp
 */

//ToDo: NOCH FEHLERHAFT
angular.module('hwrChatApp')
  .controller('RegisterCtrl', function ($scope, Restangular) {
    $scope.user = {lastname :"", firstName : "", password : "", confirmPw : "", email: ""};
    $scope.signUP = function () {
      Restangular.all('accounts').post($scope.user).then(function (user) {
        $mdToast.showSimple('Registrierung erfolgreich');
        $state.go('login');
      }, function () {
        $mdToast.showSimple('Fehler!');
      });
    }
  });
