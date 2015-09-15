'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:DeleteaccountCtrl
 * @description
 * # DeleteaccountCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('DeleteaccountCtrl', function ($scope, userService, $mdToast, $state, Restangular) {


    $scope.user = {pw: ''};
    $scope.user.email = userService.me().email;
    console.log(userService.me().email);
    /**
     * Das bestehende Backend liefert keine Möglichkeit das Passwort prüfen zu lassen.
     * Daher wird hier nur auf 1234 geprüft.
     */
    $scope.confirmDeleteAccount = function () {
      console.log($scope.user.email);
      console.log($scope.user.pw);
      if ($scope.user.pw === '1234') {
        Restangular.one('accounts', userService.me().id).remove().then(function(){
          $mdToast.showSimple('Account erfolgreich gelöscht!');
          $state.go('layout_small.login');
        }, function () {
          $mdToast.showSimple('Fehler!');
        });
      }
    };
  });
