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
  .controller('UserDataCtrl', function ($scope,userService, Restangular) {
    Restangular.all('accounts').get(userService.id).then(function (user) {
      $scope.user = user;
      console.log($scope.user);
    });
  });


