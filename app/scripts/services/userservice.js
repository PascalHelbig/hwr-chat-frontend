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
    userService.email = null;

    userService.login = function (user, email) {
      userService.token = user.id;
      userService.id = user.userId;
      userService.email = email;
      localStorage.setItem('token', userService.token);
      localStorage.setItem('id', userService.id);
      localStorage.setItem('email', userService.email);
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
      userService.email = localStorage.getItem('email');
    }

    return userService;
  });
