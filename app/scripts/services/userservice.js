'use strict';

/**
 * @ngdoc service
 * @name hwrChatApp.userService
 * @description
 * # userService
 * Factory in the hwrChatApp.
 */
angular.module('hwrChatApp')
  .factory('userService', function (httpService, localStorageService) {
    var userID = localStorageService.get('hwr-app-id');
    var userService = {};

    userService.loadOwnDetails = function(){
      return httpService('loadOwnDetails', {userID: userID});
    };


    return userService.loadOwnDetails();
  });
