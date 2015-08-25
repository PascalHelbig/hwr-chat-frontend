'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:RenamechatCtrl
 * @description
 * # RenamechatCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('RenamechatCtrl', function ($scope, chatBuildRefactorService, httpService, localStorageService, $state) {
    var userID = localStorageService.get('hwr-app-id');
    $scope.user = {chatName: ""};
    var parameterArray = new Array();

    /**
     * Nachgehaltenen Daten aus Chat per chatBuildRefactosService.getChatNameAndId bereitstellen
     * und für renameUnterhaltung Anfrage an Backend nutzen
     */
    $scope.submitRenameChat = function(){
      parameterArray = chatBuildRefactorService.getChatNameAndId();
      httpService('renameUnterhaltung', {userID: userID, unterhaltung: parameterArray[0], neuerName: $scope.user.chatName}).then(function(){
        $state.go('layout_2screens.contacts');
      });
    };
  });
