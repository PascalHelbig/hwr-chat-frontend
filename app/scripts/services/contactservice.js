'use strict';

/**
 * @ngdoc service
 * @name hwrChatApp.contactService
 * @description
 * # contactService
 * Factory in the hwrChatApp.
 */
angular.module('hwrChatApp')
  .factory('contactService', function (httpService, localStorageService) {
    var userID = localStorageService.get('hwr-app-id');

    return httpService('loadAllContacts', {userID: userID});

  });

