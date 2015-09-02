'use strict';

/**
 * @ngdoc service
 * @name hwrChatApp.chatBuildRefactorService
 * @description
 * # chatBuildRefactorService
 * Service in the hwrChatApp.
 */
angular.module('hwrChatApp')
  .factory('chatBuildRefactorService', function () {
    var chatBuildRefactorService = {};
    var contactArray = [];
    var userDataArray = [];
    var parameterArray = [];

    var unique = function (origArr) {
      var newArr = [],
        origLen = origArr.length,
        found,
        x, y;

      for (x = 0; x < origLen; x++) {
        found = undefined;
        for (y = 0; y < newArr.length; y++) {
          if (origArr[x] === newArr[y]) {
            found = true;
            break;
          }
        }
        if (!found) {
          newArr.push(origArr[x]);
        }
      }
      return newArr;
    };


    /**
     * Nachgehaltene Daten für Gruppenchat in groupname.html bereitstellen
     */
    chatBuildRefactorService.getContactArrayForGroupChat = function(){
      var contactString = contactArray[0];
      for (var index = 1; index < contactArray.length; ++index)
      {
        contactString += ',' + contactArray[index];
      }
      return contactString;
    };

    /**
     * Nachgehaltene Daten für newgroup.html label model bereitstellen
     */
    chatBuildRefactorService.getContactArraySelectedUser = function(){
      var contactString = userDataArray[0];
      for (var index = 1; index < userDataArray.length; ++index)
      {
        if(index% 2 === 0) {
          contactString += ';' + userDataArray[index];
        } else {
          contactString += ' ' + userDataArray[index];
        }
      }
      return contactString;
    };

    chatBuildRefactorService.setArrayNull = function(){
      contactArray = [];
      userDataArray = [];
    };

    /**
     * Nachhalten der User für neuen Gruppenchat contactArray für Backendabfrage
     * und userDataArray für Label Model in newgroup.htlm
     */
    chatBuildRefactorService.addContactToGroup = function(data){
      contactArray.push(data.userID);
      contactArray = unique(contactArray);
      userDataArray.push(data.vorname, data.nachname);
      userDataArray = unique(userDataArray);
      console.log(userDataArray);
      console.log(contactArray);
    };

    /**
     * Nachgehaltene Daten für Chat umbenennen
     */
    chatBuildRefactorService.getChatNameAndId = function(){
      return parameterArray;
    };

    /**
     * Nachhalten Daten für Chat umbenennen
     */
    chatBuildRefactorService.addChatNameAndId = function(data){
      parameterArray.push(data);
    };

    /**
     * Nachhalten des Chatnamens für chat.html aus contacts.html
     */
    var getChatName;
    chatBuildRefactorService.setChatName = function(setChatName){
      getChatName = setChatName;
      console.log(setChatName);
    };

    /**
     * Nachgehaltener Chatnamen für chat.html
     */
    chatBuildRefactorService.getChatName = function(){
      console.log(getChatName);
      return getChatName;
    };

    /**
     * Nachhalten der Userdaten für confirm.html aus settings.html
     */
    var userData;
    chatBuildRefactorService.setChangeUserData = function(data){
      console.log(data);
      userData = data;
      console.log(userData);
    };

    /**
     * Nachgehaltene Userdaten für confirm.html
     */
    chatBuildRefactorService.getChangeUserData = function(){
      console.log(userData);
      return userData;
    };

    return chatBuildRefactorService;
  });


