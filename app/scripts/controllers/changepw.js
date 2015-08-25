'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ChangepwCtrl
 * @description
 * # ChangepwCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ChangepwCtrl', function ($scope, httpService, localStorageService, userService) {
    var userID = localStorageService.get('hwr-app-id');

    userService.then(function (data) {
      $scope.user.email = data.response.email;
      console.log($scope.user);
    });

    $scope.user = {oldPW: "", newPW: "", confirmNewPW: "", email: ""};
    $scope.confirm = function () {
      /**
       * Das bestehende Backend liefert keine Möglichkeit das Passwort prüfen zu lassen.
       * Daher wird hier nur auf 1234 geprüft.
       */
      console.log($scope.user.oldPW);
      console.log($scope.user.newPW);
      console.log($scope.user.confirmNewPW);
      if ($scope.user.newPW == $scope.user.confirmNewPW && $scope.user.oldPW == "1234") {
        httpService("edit", {what: "passwort", new: $scope.user.newPW}).then(function(){
          $mdToast.showSimple('Passwortänderung erfolgreich');
          $state.go('layout_2screens.settings');
        }, function () {
          $mdToast.showSimple('Fehler!');
        });
      }
    };
  });
