'use strict';

/**
 * @ngdoc service
 * @name hwrChatApp.userService
 * @description
 * # userService
 * Factory in the hwrChatApp.
 */
angular.module('hwrChatApp')
  .factory('userService', function (Restangular) {
    var userService = {};
    userService.token = null;
    userService.id = null;

    userService.login = function (user) {
      userService.token = user.id;
      userService.id = user.userId;
      localStorage.setItem('token', userService.token);
      localStorage.setItem('id', userService.id);
      userService.setHeader();
    };

    userService.setHeader = function () {
      if (userService.token === null) {
        loadFromLocalStorage();
        if (userService.token === null) {
          return;
        }
      }
      Restangular.setDefaultHeaders({Authorization: userService.token});
    };

    function loadFromLocalStorage() {
      userService.id = localStorage.getItem('id');
      userService.token = localStorage.getItem('token');
    }

    return userService;
  });
