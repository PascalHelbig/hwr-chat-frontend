'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:NewchatCtrl
 * @description
 * # NewChatCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('NewChatCtrl', function ($scope, screenService, $mdSidenav, contactService, localStorageService, httpService, $stateParams, chatBuildRefactorService, $mdToast, $state) {
    $scope.isMobile = screenService.isMobileView();
    var userID = localStorageService.get('hwr-app-id');
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
      var chatID = null;
      console.log($scope.selectedUser.id);
      console.log(userID);


      /**
       * Chat wird angelget, sollte ein Chat bereits bestehen zwischen zwei Usern wird die Nachricht "...hat den Chat angelegt"
       * erneut gesendet. Backend lässt leider keine andere Möglichkeit zu, da bei der initialen Erstellung einen Chats eine Nachricht gesendet werden muss,
       * weil er sonst nicht angezeigt wird in der App (auf dem Backend ist er aber vorhanden)
       */
      httpService('getUnterhaltungMitPartner', {userID: userID, partnerID: $scope.selectedUser.id})
        .then(function (data) {
          chatID = data.response.unterhaltungsID;

          //httpService('getLetztenTimestamp', {userID: userID})
          //  .then(function (response) {
          //    emptyQuery = response.response.timestamp;

           //   if (emptyQuery == null) {
                httpService('sendeNachricht', {
                  userID: userID,
                  unterhaltung: chatID,
                  inhalt: '... hat den Chat angelegt.'
                }).then(function(){
                  $mdToast.showSimple('Chatanlegen erfolgreich');
                  $state.go('layout_2screens.contacts');
                }, function () {
                  $mdToast.showSimple('Fehler!');
                });
           //   }
           // })
        });
    };

    contactService.then(function (data) {
      $scope.contacts = data.response;
      console.log($scope.contacts);
    });
    /*    $scope.contacts = [
     {id: 1, name: 'Niklas Casper'},
     {id: 2, name: 'Tommy Ewald'},
     {id: 3, name: 'Pascal Helbig'}
     ];*/
  });
