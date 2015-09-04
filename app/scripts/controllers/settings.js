'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('SettingsCtrl', function ($scope, userService, chatBuildRefactorService, Restangular) {
    $scope.user = userService;
    console.log($scope.user);

    //ToDo: Benutzerdaten ändern mit Restangular.
    /**
     * Nachhalten der Userdaten per chatBuildRefactorService.setChangeUserData
     * für die Backendabfrage in confirm.html
     */
    $scope.gotoConfirm = function () {
      console.log($scope.user);
      chatBuildRefactorService.setChangeUserData($scope.user);
    };
  });
