'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ContactsCtrl', function ($scope, screenService, $mdSidenav, $interval, userService, $state, $mdToast, $filter, PubSub) {

    $scope.chats = [];
    var login = null;
    userService.isLoaded().then(function() {
      $scope.user = userService.me();
      login = true;
      function getChats() {
        $scope.chats = userService.me().getList('chats').$object;
      }
      getChats();
    }, function () {
      $state.go('layout_small.login');
    });
    if(login){
      $interval(getChats, 500);
    }
    $scope.isMobile = screenService.isMobileView();

    $scope.openSideNav = function() {
      $mdSidenav('left').toggle();
    };

    $scope.openChat = function(data){
      $state.go('layout_2screens.chat', {id: data});
    };

    PubSub.subscribe({
      collectionName: 'Chat',
      method : 'POST'
    }, function(data){
      //Logic for callback function on new chats
      $scope.chats.push(data);
      $scope.$apply();
    });

    PubSub.subscribe({
      collectionName: 'Chats',
      method : 'PUT'
      //modelId : chatList[i].id
    }, function(data){
      //Logic for callback function on updated chats
      console.log(data);
    });

    PubSub.subscribe({
      collectionName: 'Chats',
      method : 'DELETE'
      //modelId : chatList[i].id
    }, function(data){
      //Logic for callback function on delete chats
      console.log(data);
    });

    $scope.logout = function() {
      userService.isLoaded().then(function() {
        userService.logout();
        login = false;
      });
      $mdToast.showSimple($filter('translate')('AlertLogout'));
      $state.go('layout_small.login');
    };
  });
