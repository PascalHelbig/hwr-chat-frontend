'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ContactsCtrl', function ($scope, screenService, $mdSidenav, $interval, userService, $state, $mdToast, $filter, PubSub, Chat) {
    Chat.find({}, function(chatList,  httpHeader){
        //Success callback
        //Subscribe to chat methods here..
        PubSub.subscribe({
          collectionName: 'Chat',
          method : 'POST'
        }, onChatCreate);

        for(var i=0; i<chatList.length; i++){
          PubSub.subscribe({
            collectionName: 'Chat',
            method : 'PUT',
            modelId : chatList[i].id
          }, onChatUpdate);

          PubSub.subscribe({
            collectionName: 'Chat',
            method : 'DELETE',
            modelId : chatList[i].id
          }, onChatDelete);
        }

      }, //Error
      function(httpResp){
        console.log(httpResp);
      });

    var onChatCreate = function(){
      //Logic for callback function on new chats
    }

    var onChatUpdate = function(){
      //Logic for callback function on updated chats
    }

    var onChatDelete = function(){
      //Logic for callback function on delete chats
    }

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

    $scope.logout = function() {
      userService.isLoaded().then(function() {
        userService.logout();
        login = false;
      });
      $mdToast.showSimple($filter('translate')('AlertLogout'));
      $state.go('layout_small.login');
    };
  });
