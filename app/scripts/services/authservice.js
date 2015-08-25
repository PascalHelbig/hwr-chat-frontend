'use strict';

/**
 * @ngdoc service
 * @name hwrChatApp.authService
 * @description
 * # authService
 * Factory in the hwrChatApp.
 */
angular.module('hwrChatApp')
  .factory('authService', function (localStorageService, httpService, $state) {
    var authService = {};

    authService.login = function (credentials) {
      var httpPromise = httpService('anmelden', credentials);
      httpPromise.then(function (data) {
        localStorageService.set('hwr-app-id', parseInt(data.response.userID));
        if ('autologinKey' in data.response) {
          localStorageService.set('hwr-app-autologin', data.response.autologinKey);
        }
      });

      return httpPromise;
    };

    authService.logout = function () {
      var autoLogin = localStorageService.get('hwr-app-autologin');
      localStorageService.clearAll();

      // HTTP-Anfrage los schicken:
      var logoutPromise = httpService('logout', {autologin: autoLogin});

      // Wenn HTTP-Anfrage erfolgreich auf die Loginseite weiterleiten:
      logoutPromise.then(function () {
        $state.go('layout_small.login');
      });
      return logoutPromise;
    };

    return authService;
  });
