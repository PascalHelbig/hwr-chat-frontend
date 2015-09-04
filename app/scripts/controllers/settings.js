'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('SettingsCtrl', function ($scope, userService, Restangular) {
    function loadAccount() {
      Restangular.one('accounts', userService.id).get().then(function (account) {
        $scope.user = account;
      });
    }

    $scope.confirmPw = false;
    loadAccount();

    $scope.save = function () {
      if ($scope.confirmPw === true) {
        // ToDo: passwordConfirm im Backend kontrollieren.
        $scope.user.put().then(function () {
          // Update erfolgreich:
          $scope.user.passwordConfirm = '';
          $scope.confirmPw = false;
        }, function() {
          // $scope.user reseten:
          loadAccount();
          $scope.confirmPw = false;
        });
      } else {
        $scope.confirmPw = true;
      }
    };

  });
