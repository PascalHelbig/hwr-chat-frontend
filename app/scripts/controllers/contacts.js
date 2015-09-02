'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ContactsCtrl
 * @description
 * # ContactsCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ContactsCtrl', function ($scope, screenService, $mdSidenav, chatBuildRefactorService, $mdDialog, httpService, $state, localStorageService, authService, $interval) {
    $scope.userID = localStorageService.get('hwr-app-id');


    httpService('getNachrichtenSender', {userID: $scope.userID})
      .then(function (data) {
        $scope.contacts = data.response;
        console.log($scope.contacts);
      });
    function callAtInterval() {
      httpService('getNachrichtenSender', {userID: $scope.userID})
        .then(function (data) {
          $scope.contacts = data.response;
          console.log($scope.contacts);
        });
    }
    $interval(callAtInterval, 300000);

    $scope.isMobile = screenService.isMobileView();

    $scope.openSideNav = function() {
      $mdSidenav('left').toggle();
    };

    /**
     * Chatnamen nachhalten per chatBuildRefactorService.setChatName für chat.html
     */
    $scope.setChatName = function(data){
      var chatName = data;
      chatBuildRefactorService.setChatName(chatName);
    };


    $scope.logout = function() {
      authService.logout();
    };

  });
