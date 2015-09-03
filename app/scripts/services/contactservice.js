'use strict';

/**
 * @ngdoc service
 * @name hwrChatApp.contactService
 * @description
 * # contactService
 * Factory in the hwrChatApp.
 */
angular.module('hwrChatApp')
  .factory('contactService', function (httpService, localStorageService, Restangular) {
    var userID = localStorageService.get('hwr-app-id');

   // return Restangular.all('accounts').get();

    return httpService('loadAllContacts', {userID: userID});

  });

