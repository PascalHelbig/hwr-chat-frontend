'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ConfirmCtrl
 * @description
 * # ConfirmCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ConfirmCtrl', function ($scope, chatBuildRefactorService, userService, $mdToast, $state, Restangular) {

    $scope.deleteAccount = {pw: ''};


    /**
     * Nachgehaltene Daten aus settings.html per chatBuildRefactorService.getChangeUserData bereitstellen
     * und für Backendabfragen nutzen
     * ACHTUNG wenn Weiterleitung zeigt Fehler an sobald ein Wert nicht geändert wird
     * Die geänderten Daten werden aber Trotzdem geändert
     * Leider mit dem bestehenden backend nicht anders möglich
     */
    $scope.confirm = function () {
      $scope.user = {email: userService.email, password: $scope.deleteAccount.pw};
      Restangular.all('accounts').customPOST($scope.user, 'login').then(function () {
        Restangular.all('accounts').customPUT(userService.id, chatBuildRefactorService.getChangeUserData).then(function (user) {
          $scope.user = user;
          console.log($scope.user);
          $mdToast.showSimple('Änderung erfolgreich');
        })
      }, function() {
        $mdToast.showSimple('Fehler!');
      });
    };
  });

