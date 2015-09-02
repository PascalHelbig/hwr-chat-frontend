'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:DeleteaccountCtrl
 * @description
 * # DeleteaccountCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('DeleteaccountCtrl', function ($scope, userService, httpService, localStorageService, $mdToast, $state, authService) {
    var userID = localStorageService.get('hwr-app-id');

    $scope.deleteAccount = {pw: ''};

    userService.then(function (data) {
      $scope.user = data.response;
      console.log($scope.user);
    });

    /**
     * Das bestehende Backend liefert keine Möglichkeit das Passwort prüfen zu lassen.
     * Daher wird hier nur auf 1234 geprüft.
     */
    $scope.confirmDeleteAccount = function () {
      console.log($scope.user.email);
      console.log($scope.deleteAccount.pw);
      if ($scope.deleteAccount.pw === '1234') {
        httpService('deleteUser', {
          userID: userID,
          email: $scope.user.email,
          pw: $scope.deleteAccount.pw
        }).then(function(){
          authService.logout();
          $mdToast.showSimple('Accountlöschen erfolgreich');
          $state.go('layout_2screens.login');
        }, function () {
          $mdToast.showSimple('Fehler!');
        });
      }
    };
  });
