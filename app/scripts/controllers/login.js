'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('LoginCtrl', function ($scope, $translate, authService, $mdToast, $state) {
    $scope.user = {email: 'test@hwr-berlin.de', pw: '1234'};

    $scope.login = function () {
      authService.login($scope.user).then(function () {
        $mdToast.showSimple('Login erfolgreich');
        $state.go('layout_2screens.contacts');
      }, function () {
        $mdToast.showSimple('Fehler!');
      });
    };
  });
