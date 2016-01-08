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
      socket.on('NewMessages', function (message) {
        if (message.data.chatId === parseInt($stateParams.id)) {
          $scope.messages.push(message.data);
          $scope.$apply();
        }
      });
    });

    var lastMessageId = 0;
    $scope.messages = [];
    $scope.accounts = [];
    $scope.isMobile = screenService.isMobileView();

    userService.isLoaded().then(function () {
      $scope.userID = userService.me().id;
    });

    function loadAccounts() {
      $scope.chat.getList('accounts').then(function (accounts) {
        $scope.accounts = {};
        accounts.forEach(function (account) {
          $scope.accounts[account.id] = account;
        });
      });
    }

    Restangular.one('chats', $stateParams.id).get().then(function (chat) {
      $scope.chat = chat;
      $scope.chat.getList('messages').then(function (messages) {
        $scope.messages = messages;
        lastMessageId = $scope.messages[$scope.messages.length - 1].id;
      });

      // Lade alle ChatMembers, um Namen anzeigen zukönnen
      loadAccounts();
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
          $scope.chat.all('messages').post({content: userService.me().firstname + $filter('translate')('AlertLeaveChat')});
          $mdToast.showSimple($filter('translate')('AlertLeaveChat'));
          $state.go('layout_2screens.contacts');
        }, function () {
          $mdToast.showSimple($filter('translate')('LeftTheChat'));
        });
      });
    };

    $scope.showEmojis = function () {
      //ToDo Emojis-Logik
    };

    $scope.openSettings = function () {
      $state.go('layout_small.settings');
    };

    $scope.addUser = function () {
      function AddUserCtrl($scope,  messages, chat, $mdDialog, Restangular, accounts) {
        $scope.contacts = Restangular.all('accounts').getList().$object;
        $scope.confirmScreen = false;
        $scope.selectedAccount = {};
        $scope.chat = chat;

        $scope.filterAlreadyAdded = function (account) {
          return !(account.id.toString() in accounts);
        };

        $scope.add = function (account) {
          $scope.confirmScreen = true;
          $scope.selectedAccount = account;
        };

        $scope.confirm = function (account) {
          Restangular.one('chats', chat.id).one('accounts/rel', account.id).customPUT({}).then(function () {
            messages.post({
              content: account.firstname + ' ' + account.lastname + ' wurde hinzugefügt.'
            });
            $mdDialog.hide();
          });
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };
      }

      $mdDialog.show({
        controller: AddUserCtrl,
        templateUrl: 'views/addUser.html',
        locals: {
          chat: $scope.chat,
          messages: $scope.messages,
          accounts: $scope.accounts
        },
        clickOutsideToClose: true
      }).then(function () {
        loadAccounts();
      }, function () {

      });
    };
  });

