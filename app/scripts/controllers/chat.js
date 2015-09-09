'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ChatCtrl', function ($scope, screenService, $stateParams, httpService, localStorageService, $mdDialog, $mdToast, $state, chatBuildRefactorService, $interval) {
    $scope.userID = localStorageService.get('hwr-app-id');
    /**
     * Nachgehaltenen Chatnamen aus contacts.html per chatBuildRefactorService.getChatName bereitstellen
     */
    var chatName = chatBuildRefactorService.getChatName();
    $scope.getName = {name: chatName};


    $scope.isMobile = screenService.isMobileView();



    $scope.emojiToMessage = function(data){
      $scope.messageText += data;
    };

    /**
     *Senden der Nachricht aus dem Nachrichtenfeld an Backend
     * und visualisieren in Chat
     */
    $scope.send = function() {
      if($scope.messageText === '') {
        return null;
      }
      httpService('sendeNachricht', {
        userID: $scope.userID,
        unterhaltung: $stateParams.id,
        inhalt: $scope.messageText});

      $scope.chat.push({
        inhalt: $scope.messageText,
        senderID: $scope.userID,
        timestamp: new Date()
      });
      $scope.messageText = '';
    };

    /**
     *Initiale Abfrage zu neuen Nachrichten, danach werden sie per Intervall neu geladen
     * leider bietet Backend keine andere Möglichkeit(wie zb websockets)
     */
    httpService('getNachrichtenAusUnterhaltung', {userID: $scope.userID, unterhaltung: $stateParams.id})
      .then(function (response) {
        $scope.chat = response.response;
        angular.forEach($scope.chat, function (value) {
          value.timestamp = new Date(value.timestamp);
        });
      });

    /**
     * Nachrichten werden per Polling geladen
     * dazu wird ng interval genutzt
     * ist aktuell auf einen sehr hohen Wert gesetzt, da es sonst beim Debugen stört
     */
    function callAtInterval() {
      httpService('getNachrichtenAusUnterhaltung', {userID: $scope.userID, unterhaltung: $stateParams.id})
        .then(function (response) {
          $scope.chat = response.response;
          angular.forEach($scope.chat, function (value) {
            value.timestamp = new Date(value.timestamp);
          });
        });
    }
    $interval(callAtInterval, 300000000);
    /**
     *Chat verlassen und wenn erfolgreich navigation zu contacts view
     */
    $scope.leaveChat = function() {
      httpService('sendeNachricht', {
        userID: $scope.userID,
        unterhaltung: $stateParams.id,
        inhalt: $scope.userID + ' hat den Chat verlassen.'
      }).then(httpService('leaveUnterhaltung', {userID: $scope.userID, unterhaltung: $stateParams.id}).then(function () {
        $mdToast.showSimple('Erfolgreich Chat verlassen!');
        $state.go('layout_2screens.contacts');
      }, function () {
        $mdToast.showSimple('Fehler!');
      }));
    };
    /**
     *Nachhalten der id für die RenameChat View und deren Controller
     */
    $scope.renameChat = function(){
      chatBuildRefactorService.addChatNameAndId($stateParams.id);
    };
  });

