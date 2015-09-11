'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:NewchatCtrl
 * @description
 * # NewChatCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('NewChatCtrl', function ($scope, screenService, $mdSidenav,Restangular, localStorageService, $stateParams, chatBuildRefactorService) {
    $scope.isMobile = screenService.isMobileView();

    $scope.selectedUser = {id : ''};
    $scope.openSideNav = function () {
      $mdSidenav('left').toggle();
    };

    /**
     * Alte Nachgehaltene userIDs für Gruppenchat löschen
     */
    $scope.resetGroupIDs = function(){
      chatBuildRefactorService.setArrayNull();
    };
    $scope.setUserId = function(userIdPartner){
      $scope.selectedUser.id = userIdPartner;
      console.log($scope.selectedUser.id);
    };

    $scope.newChat = function () {

    };

      $scope.contacts = Restangular.all('accounts').getList().$object;
      console.log($scope.contacts);
  });
