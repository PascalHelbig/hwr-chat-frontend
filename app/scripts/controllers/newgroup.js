'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:NewgroupCtrl
 * @description
 * # NewGroupCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('NewGroupCtrl', function ($scope, screenService, $mdSidenav, contactService, chatBuildRefactorService) {

    $scope.isMobile = screenService.isMobileView();
    $scope.selectedUser = {name : ''};

    $scope.openSideNav = function () {
      $mdSidenav('left').toggle();
    };

    /**
     * Nachhalten der gewählten User für Gruppenchat per chatBuildRefactorService.addContactToGroup(data)
     * und nachgehaltenen User zum Model für label in newgroup.html bereitstellen
     */
    $scope.addContactToGroup = function (data) {
      chatBuildRefactorService.addContactToGroup(data);
      $scope.selectedUser = {name : chatBuildRefactorService.getContactArraySelectedUser()};
    };

    $scope.contacts = contactService;
    console.log($scope.contacts);

  });
