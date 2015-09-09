'use strict';

/**
 * @ngdoc service
 * @name hwrChatApp.contactService
 * @description
 * # contactService
 * Factory in the hwrChatApp.
 */
angular.module('hwrChatApp')
  .factory('contactService', function (Restangular) {

   return Restangular.all('accounts').getList().$object;

  });

