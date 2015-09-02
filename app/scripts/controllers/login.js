'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('LoginCtrl', function ($scope, $translate, authService, $mdToast, $state, Restangular, userService) {
    $scope.user = {email: 'test@hwr-berlin.de', password: '1234'};

    $scope.login = function () {
      Restangular.all('accounts').customPOST($scope.user, 'login').then(function (user) {
        userService.login(user);
        $mdToast.showSimple('Login erfolgreich');
        $state.go('layout_2screens.contacts');
      }, function() {
        $mdToast.showSimple('Fehler!');
      });
    };
  });
