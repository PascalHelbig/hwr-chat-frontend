'use strict';

/**
 * @ngdoc service
 * @name hwrChatApp.userService
 * @description
 * # userService
 * Factory in the hwrChatApp.
 */
angular.module('hwrChatApp')
  .factory('userService', function (Restangular, $q) {
    var userService = {
      token: null,
      id: null,
      data: {}
    };

    userService.loadData = function () {
      var defer = $q.defer();
      var id = localStorage.getItem('id');
      if (id === null) {
        defer.reject();
      } else {
        Restangular.one('accounts', id).get().then(function (user) {
          userService.data = user;
          defer.resolve();
        });
      }
      return defer.promise;
    };

    userService.login = function (credentials) {
      var defer = $q.defer();
      Restangular.all('accounts').customPOST(credentials, 'login').then(function (loginResponse) {
        userService.token = loginResponse.id;
        localStorage.setItem('token', userService.token);
        localStorage.setItem('id', loginResponse.userId);
        userService.setHeader();
        userService.loadData().then(function () {
          defer.resolve();
        }, function () {
          defer.reject();
        });
      }, function () {
        defer.reject();
      });
      return defer.promise;
    };

    userService.me = function () {
      if (angular.equals(userService.data, {})) {
        userService.loadData().then(function () {
          console.log('geladen');
          return userService.data;
        }, function () {
          return;
        });
      } else {
        return userService.data;
      }
    };

    userService.setHeader = function () {
      if (userService.token === null) {
        userService.token = localStorage.getItem('token');
      }
      Restangular.setDefaultHeaders({Authorization: userService.token});
    };

    userService.logout = function () {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      userService.token = null;
      userService.id = null;
      userService.data = {};
      Restangular.setDefaultHeaders();
    };
    return userService;
  });
