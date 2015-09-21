'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:InfoCtrl
 * @description
 * # InfoCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('InfoCtrl', function ($scope, userService, $state) {
    $scope.back = function () {
      // Warten bis Daten geladen wurden sind:
      userService.isLoaded().then(function () {
        // Wenn user angemeldet, dann contact view, ansonsten login view
        if (userService.isLoggedIn()) {
          $state.go('layout_2screens.contacts');
        } else {
          $state.go('layout_small.login');
        }
      }, function() {
        $state.go('layout_small.login');
      });
    };
  });
