'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ContactsCtrl', function ($scope, screenService, $mdSidenav, $interval, userService, $state, $mdToast) {
    $scope.chats = [];
    userService.isLoaded().then(function() {
      $scope.user = userService.me();

      function getChats() {
        $scope.chats = userService.me().getList('chats').$object;
      }
      getChats();
      $interval(getChats, 5000);
    }, function () {
      $state.go('layout_small.login');
    });

    $scope.isMobile = screenService.isMobileView();

    $scope.openSideNav = function() {
      $mdSidenav('left').toggle();
    };

    $scope.openChat = function(data){
      $state.go('layout_2screens.chat', {id: data});
    };

    $scope.logout = function() {
      userService.isLoaded().then(function() {
        userService.logout();
      });
      $mdToast.showSimple('Ausgeloggt!');
      $state.go('layout_small.login');
    };
  });
