'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:NewgroupCtrl
 * @description
 * # NewGroupCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('NewGroupCtrl', function ($scope, screenService, Restangular, userService, $state) {
    $scope.isMobile = screenService.isMobileView();
    $scope.selectedAccounts = [];

    $scope.submit = function () {
      userService.me().all('chats').post({name: $scope.name}).then(function (chat) {
        angular.forEach($scope.selectedAccounts, function(account) {
          Restangular.one('chats', chat.id).one('accounts/rel', account.id).customPUT({});
        });
        Restangular.one('chats', chat.id).all('messages').post({
          accountId: userService.me().id,
          content: userService.me().firstname + ' hat den Gruppenchat ' + chat.name + ' angelegt.'
        });
        $state.go('layout_2screens.chat', {id: chat.id});
      });
    };

    $scope.loadAccounts = function (searchText) {
      var selected = [-1];
      angular.forEach($scope.selectedAccounts, function (value) {
        selected.push(value.id);
      });

      searchText = '%' + searchText + '%';
      return Restangular.all('accounts').getList({
        filter: {
          where: {
            and: [
              {
                or: [
                  {
                    firstname: {
                      like: searchText
                    }
                  }, {
                    lastname: {
                      like: searchText
                    }
                  }
                ]
              },
              {
                id: {
                  nin: selected
                }
              }
            ]
          },
          limit: 20,
          order: [
            'firstname',
            'lastname'
          ]
        }
      }).then(function (accounts) {
        return accounts;
      });
    };
  });
