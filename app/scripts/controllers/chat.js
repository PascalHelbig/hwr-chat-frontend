'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ChatCtrl', function ($scope, screenService, $stateParams, $mdDialog, $mdToast, $filter, $state, Restangular, userService, socket) {
    socket.then(function (socket) {
      socket.on('NewMessages', function (data) {
        $scope.messages.push(data.data);
        $scope.$apply();
      });
    });

    var lastMessageId = 0;
    $scope.messages = [];
    $scope.accounts = [];
    $scope.isMobile = screenService.isMobileView();

    userService.isLoaded().then(function () {
      $scope.userID = userService.me().id;
    });

    Restangular.one('chats', $stateParams.id).get().then(function (chat) {
      $scope.chat = chat;
      $scope.chat.getList('messages').then(function (messages) {
        $scope.messages = messages;
        lastMessageId = $scope.messages[$scope.messages.length - 1].id;
      });

      // Lade alle ChatMembers, um Namen anzeigen zukönnen
      $scope.chat.getList('accounts').then(function(accounts) {
        $scope.accounts = {};
        accounts.forEach(function(account) {
          $scope.accounts[account.id] = account;
        });
      });

    });

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
      }).then(function () {

      }, function () {
        $mdToast.showSimple($filter('translate')('AlertMsgError'));
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
        if (response.err === true) {
          $mdToast.showSimple($filter('translate')('AlertError'));
        }
      });
    };
    /**
     *Chat verlassen und wenn erfolgreich navigation zu contacts view
     */
    $scope.leaveChat = function () {
      userService.isLoaded().then(function () {
        userService.me().one('chats/rel', $scope.chat.id).remove().then(function () {
          $scope.chat.all('messages').post({content: userService.me().firstname + ' hat den Chat verlassen.'});
          $mdToast.showSimple($filter('translate')('AlertLeaveChat'));
          $state.go('layout_2screens.contacts');
        }, function () {
          $mdToast.showSimple($filter('translate')('AlertLeaveChatError'));
        });
      });
    };

    $scope.showEmojis = function () {
      console.log($scope.messages);
    };

  });

