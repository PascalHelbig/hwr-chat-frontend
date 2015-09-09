'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('LoginCtrl', function ($scope, $mdToast, $state, Restangular, userService) {
    $scope.user = {email: 'test@hwr-berlin.de', password: '1234'};

    $scope.login = function () {
      userService.login($scope.user).then(function () {
        $mdToast.showSimple('Login erfolgreich');
        $state.go('layout_2screens.contacts');
      }, function() {
        $mdToast.showSimple('Fehler!');
      });
    };
  });
