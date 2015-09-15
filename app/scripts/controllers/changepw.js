'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ChangepwCtrl
 * @description
 * # ChangepwCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ChangepwCtrl', function ($scope, userService, $mdToast, $state) {

    $scope.user = {oldPW: '', newPW: '', confirmNewPW: ''};
    $scope.user.email = userService.me().email;

    $scope.confirm = function () {
      /**
       * Das bestehende Backend liefert keine Möglichkeit das Passwort prüfen zu lassen.
       * Daher wird hier nur auf 1234 geprüft.
       */
      console.log($scope.user.oldPW);
      console.log($scope.user.newPW);
      console.log($scope.user.confirmNewPW);
      if ($scope.user.newPW === $scope.user.confirmNewPW && $scope.user.oldPW === '1234') {
        /*
        Restangualr Anfrage eifügen
         .then(function(){
          $mdToast.showSimple('Passwortänderung erfolgreich');
          $state.go('layout_2screens.settings');
        }, function () {
          $mdToast.showSimple('Fehler!');
        });
        */
        $mdToast.showSimple('TODO!');
      }
    };
  });
