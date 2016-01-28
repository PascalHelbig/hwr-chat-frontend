'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ContactsCtrl', function ($scope, screenService, $mdSidenav, userService, $state, $mdToast, $filter, socket) {
    function getChats() {
      userService.me().getList('chats').then(function (chats) {
        $scope.chats = chats;
      });
    }

    socket.then(function (socket) {
      socket.on('NewChat', function () {
        getChats();
      });
      socket.on('NewMessages', function (message) {
        // Neue Message -> finde den dazugehörigen Chat:
        for (var i = 0; i < $scope.chats.length; i++) {
          if ($scope.chats[i].id === message.data.chatId) {
            // Wenn Chat gefunden, update lastMessage:
            $scope.chats[i].lastMessage = message.data.createdAt;
            return;
          }
        }
      });
    });

    $scope.chats = [];
    var login = null;
    userService.isLoaded().then(function() {
      $scope.user = userService.me();
      login = true;
      getChats();
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
        login = false;
      });
      $mdToast.showSimple($filter('translate')('AlertLogout'));
      $state.go('layout_small.login');
    };
  });
