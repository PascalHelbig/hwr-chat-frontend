'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ChatCtrl', function ($scope, screenService, $stateParams, $mdDialog, $mdToast, $state, $interval, Restangular, userService) {
    var lastMessageId = 0;
    $scope.messages = [];
    $scope.isMobile = screenService.isMobileView();

    Restangular.one('chats', $stateParams.id).get().then(function(chat) {
      $scope.chat = chat;
      $scope.chat.getList('messages').then(function (messages) {
        $scope.messages = messages;
        lastMessageId = $scope.messages[$scope.messages.length-1].id;
        $interval(loadMessages, 5000);
      });
    });


    /**
     * Nachrichten werden per Polling geladen
     * dazu wird $interval genutzt
     */
    function loadMessages() {
      $scope.chat.getList('messages', {filter: {where: {id: {gt: lastMessageId}}}}).then(function (messages) {
        for (var i = 0; i < messages.length; i++) {
          $scope.messages.push(messages[i]);
        }
        lastMessageId = $scope.messages[$scope.messages.length-1].id;
      });
    }

    /**
     * Senden der Nachricht aus dem Nachrichtenfeld an Backend
     * und visualisieren in Chat
     */
    $scope.send = function() {
      if($scope.messageText === '') {
        return;
      }
      $scope.messages.post({
        content: $scope.messageText,
        accountId: userService.me().id
      }).then(function() {
        // Wenn die Nachricht erfolgreich gesendet, dann lade sofort die Nachrichten nach:
        loadMessages();
      }, function() {
        $mdToast.showSimple('Nachricht konnte nicht gesendet werden.');
      });
      $scope.messageText = '';
    };


    /**
     *Chat verlassen und wenn erfolgreich navigation zu contacts view
     */
    /*$scope.leaveChat = function() {
      httpService('sendeNachricht', {
        userID: $scope.userID,
        unterhaltung: $stateParams.id,
        inhalt: $scope.userID + ' hat den Chat verlassen.'
      }).then(httpService('leaveUnterhaltung', {userID: $scope.userID, unterhaltung: $stateParams.id}).then(function () {
        $mdToast.showSimple('Erfolgreich Chat verlassen!');
        $state.go('layout_2screens.contacts');
      }, function () {
        $mdToast.showSimple('Fehler!');
      }));
    };
    /**
     *Nachhalten der id für die RenameChat View und deren Controller
     */
    /*$scope.renameChat = function(){
      chatBuildRefactorService.addChatNameAndId($stateParams.id);
    };
     */
  });

