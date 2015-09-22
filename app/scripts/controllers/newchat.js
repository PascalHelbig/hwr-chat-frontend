'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:NewchatCtrl
 * @description
 * # NewChatCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('NewChatCtrl', function ($scope, screenService, $mdSidenav, Restangular, $mdToast, $filter, userService, $state, $mdDialog) {
    $scope.isMobile = screenService.isMobileView();
    $scope.openSideNav = function () {
      $mdSidenav('left').toggle();
    };

    $scope.contacts = Restangular.all('accounts').getList().$object;
    $scope.selectedAccounts = [];

    $scope.addUser = function (account) {
      $scope.selectedAccounts.push(account);
    };

    $scope.removeUser = function (account) {
      var index = $scope.selectedAccounts.indexOf(account);
      $scope.selectedAccounts.splice(index, 1);
    };

    $scope.createChat = function () {
      var length = $scope.selectedAccounts.length;

      function NameDialogCtrl($scope, accounts, $mdDialog) {
        $scope.createChat = function() {
          userService.me().all('chats').post({name: $scope.name}).then(function (chat) {
            angular.forEach(accounts, function (account) {
              Restangular.one('chats', chat.id).one('accounts/rel', account.id).customPUT({});
            });
            Restangular.one('chats', chat.id).all('messages').post({
              accountId: userService.me().id,
              content: userService.me().firstname + ' hat den Gruppenchat ' + chat.name + ' angelegt.'
            }).then(function () {
              $mdDialog.hide(chat);
            }, function () {
              $mdDialog.cancel();
            });
          }, function () {
            $mdDialog.cancel();
          });
        };
        $scope.closeDialog = function () {
          $mdDialog.cancel();
        };
      }

      switch(length) {
        case 0:
          $mdToast.showSimple($filter('translate')('AlertContactError'));
          break;
        case 1:
          // ToDo: Chats brauchen immer einen Namen. Wie ist das bei einem Chat mit nur zwei Personen. Vlt Backend anpassen.
          userService.me().all('chats').post({name: 'ohne name'}).then(function (chat) {
            Restangular.one('chats', chat.id).one('accounts/rel', $scope.selectedAccounts[0].id).customPUT({});
            $state.go('layout_2screens.chat', {id: chat.id});
          }, function () {
            $mdToast.showSimple($filter('translate')('AlertNetworkError'));
          });
          break;
        default:
          $mdDialog.show({
            controller: NameDialogCtrl,
            templateUrl: 'views/newchatDialog.html',
            locals: {accounts: $scope.selectedAccounts},
            clickOutsideToClose: true
          }).then(function (chat) {
            $state.go('layout_2screens.chat', {id: chat.id});
          }, function() {
            $mdToast.showSimple($filter('translate')('AlertError'));
          });
          break;
      }
    };

    $scope.filterAlreadyAdded = function (account) {
      return ($scope.selectedAccounts.indexOf(account) < 0);
    };
  });
