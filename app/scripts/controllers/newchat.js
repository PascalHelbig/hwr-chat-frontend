'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:NewchatCtrl
 * @description
 * # NewChatCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('NewChatCtrl', function ($scope, screenService, $mdSidenav, Restangular, $mdToast) {
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
      switch(length) {
        case 0:
          $mdToast.showSimple('kein User ausgewählt');
          break;
        case 1:
          $mdToast.showSimple('einfachen Chat erstellen');
          break;
        default:
          $mdToast.showSimple('GruppenChat erstellen');
          break;
      }
    };

    $scope.filterAlreadyAdded = function (account) {
      return ($scope.selectedAccounts.indexOf(account) < 0);
    };
  });
