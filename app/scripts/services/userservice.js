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
    userService.firstname = null;
    userService.lastname = null;
    userService.phone = null;
    userService.course = null;

    userService.login = function (loginresponse) {
      userService.token = loginresponse.id;
      userService.id = loginresponse.userId;
      Restangular.all('accounts').get(loginresponse.userId).then(function (user) {
        userService.email = user.email;
        userService.firstname = user.firstname;
        userService.lastname = user.lastname;
        userService.phone = user.phone;
        userService.course = user.courseId;
        console.log(user);
      });
      localStorage.setItem('token', userService.token);
      localStorage.setItem('id', userService.id);
      localStorage.setItem('email', userService.email);
      localStorage.setItem('firstname', userService.firstname);
      localStorage.setItem('lastname', userService.lastname);
      localStorage.setItem('phone', userService.phone);
      localStorage.setItem('course', userService.course);
      userService.setHeader();
    };

    userService.logout = function() {
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      userService.id = null;
      userService.token = null;
      Restangular.setDefaultHeaders();
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
      userService.firstname = localStorage.getItem('firstname');
      userService.lastname = localStorage.getItem('lastname');
      userService.phone = localStorage.getItem('phone');
      userService.course = localStorage.getItem('course');
    }

    return userService;
  });
