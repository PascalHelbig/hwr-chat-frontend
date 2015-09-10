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

    Restangular.one('chats', $stateParams.id).get().then(function (chat) {
      $scope.chat = chat;
      $scope.chat.getList('messages').then(function (messages) {
        $scope.messages = messages;
        lastMessageId = $scope.messages[$scope.messages.length - 1].id;
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
        lastMessageId = $scope.messages[$scope.messages.length - 1].id;
      });
    }

    /**
     * Senden der Nachricht aus dem Nachrichtenfeld an Backend
     * und visualisieren in Chat
     */
    $scope.send = function () {
      if ($scope.messageText === '') {
        return;
      }
      $scope.messages.post({
        content: $scope.messageText,
        accountId: userService.me().id
      }).then(function () {
        // Wenn die Nachricht erfolgreich gesendet, dann lade sofort die Nachrichten nach:
        loadMessages();
      }, function () {
        $mdToast.showSimple('Nachricht konnte nicht gesendet werden.');
      });
      $scope.messageText = '';
    };

    $scope.renameChat = function () {
      function RenameChatCtrl($scope, chat, $mdDialog, Restangular) {
        $scope.chat = Restangular.copy(chat);
        $scope.rename = function () {
          $scope.chat.save().then(function () {
            $mdDialog.hide($scope.chat);
          }, function () {
            $mdDialog.cancel({err: true});
          });
        };
        $scope.cancel = function () {
          $mdDialog.cancel();
        };
      }

      $mdDialog.show({
        controller: RenameChatCtrl,
        templateUrl: 'views/renamechat.html',
        locals: {chat: $scope.chat},
        clickOutsideToClose: true
      }).then(function (chat) {
        $scope.chat = chat;
      }, function (response) {
        if(response.err === true) {
          $mdToast.showSimple('Fehler beim umbennen');
        }
      });
    };
    /**
     *Chat verlassen und wenn erfolgreich navigation zu contacts view
     */
    $scope.leaveChat = function () {
      console.log(userService.me().id);
      //Restangular.one('Chats', $scope.chat.id).remove('Accounts', userService.me().id);

      userService.me().one('chats/rel', $scope.chat.id).remove().then(function () {
        $scope.chat.all('messages').post({content: userService.me().firstname + ' hat den Chat verlassen.'});
        $mdToast.showSimple('Chat verlassen');
        $state.go('layout_2screens.contacts');
      }, function () {
        $mdToast.showSimple('Chat nicht verlassen');
      });
    };
  });

