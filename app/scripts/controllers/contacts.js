'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ContactsCtrl', function ($scope, screenService, $mdSidenav, $interval, userService, $state) {
    $scope.user = userService.me();
    $scope.chats = [];
    function getChats() {
      $scope.chats = userService.me().getList('chats').$object;
    }
    getChats();
    $interval(getChats, 5000);

    $scope.isMobile = screenService.isMobileView();

    $scope.openSideNav = function() {
      $mdSidenav('left').toggle();
    };

    $scope.openChat = function(data){
      $state.go('layout_2screens.chat', {id: data});
    };

    $scope.logout = function() {
      userService.logout();
    };
  });
