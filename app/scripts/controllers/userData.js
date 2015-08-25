/**
 * Created by ewaldt on 05.05.2015.
 */
'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:UserDataCtrl
 * @description
 * # UserDataCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('UserDataCtrl', function ($scope,userService) {
    userService.then(function(data) {
      //wird so eigentlich nicht benötigt, habe die funktionen jetzt in settings.js gelegt....ich glaube ich hatte diesen controller damals per hand angelegt(?) könnte eigentlich gelöscht werden
        $scope.user = data.response;
        console.log($scope.user);
      });

  });


