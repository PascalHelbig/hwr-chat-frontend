'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:DeleteaccountCtrl
 * @description
 * # DeleteaccountCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('DeleteaccountCtrl', function ($scope, userService, $mdToast, $state) {

    $scope.user = {pw: ''};

    $scope.confirmDeleteAccount = function () {
      userService.validatePassword($scope.user.pw).then(function (data) {
        if (data.result === true) {
          userService.me().remove().then(function () {
            $mdToast.showSimple('Account erfolgreich gelöscht!');
            $state.go('layout_small.login');
          }, function () {
            $mdToast.showSimple('Fehler!');
          });
        } else {
          $mdToast.showSimple('Passwort falsch!');
        }
      });
    };
  });
