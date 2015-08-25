'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:GroupnameCtrl
 * @description
 * # GroupnameCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('GroupnameCtrl', function ($scope, localStorageService, httpService, chatBuildRefactorService, $mdToast, $state) {
    var userID = localStorageService.get('hwr-app-id');
    /**
     * Nachgehaltene userIDs für neuen Gruppenchat aus newgroup.html per chatBuildRefactorService.getContactArrayForGroupChat bereitstellen
     */
    var userIDs_Partner = chatBuildRefactorService.getContactArrayForGroupChat();

    $scope.user = {groupname: ""};

    $scope.newGroupChat = function () {
      var chatID = null;
      console.log(userID);
      console.log($scope.user.groupname);
      console.log(userIDs_Partner);

      httpService('neuenChatStarten', {userID: userID, chatname: $scope.user.groupname, teilnehmer: userIDs_Partner})
        .then(function (data) {
          chatID = data.response.unterhaltungsID;

          httpService('sendeNachricht', {
            userID: userID,
            unterhaltung: chatID,
            inhalt: "... hat den Gruppenchat " + $scope.user.groupname + " angelegt."
          }).then(function(){
            $mdToast.showSimple('Gruppenchatanlegen erfolgreich');
            $state.go('layout_2screens.contacts');
          }, function () {
            $mdToast.showSimple('Fehler!');
          });
        });
    };
  });
