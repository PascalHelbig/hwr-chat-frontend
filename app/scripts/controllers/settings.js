'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('SettingsCtrl', function ($scope, userService, chatBuildRefactorService) {

      userService.then(function (data) {
        $scope.user = data.response;
        console.log($scope.user);
      });

    /**
     * Nachhalten der Userdaten per chatBuildRefactorService.setChangeUserData
     * für die Backendabfrage in confirm.html
     */
    $scope.gotoConfirm = function () {
      console.log($scope.user);
      chatBuildRefactorService.setChangeUserData($scope.user);
    };

    //$scope.gotoConfirm = function () {
    //  httpService("edit", {
    //    what:"nachname",
    //    new: $scope.user.nachname
    //  });
    //  httpService("edit", {
    //    what:"vorname",
    //    new: $scope.user.vorname
    //  });
    //  httpService("edit", {
    //    what:"telefon",
    //    new: $scope.user.telefon
    //  });
    //  httpService("edit", {
    //    what:"verhaeltnis",
    //    new: $scope.user.verhaeltnis
    //  })
    //}
  });
