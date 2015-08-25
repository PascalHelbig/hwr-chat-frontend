'use strict';

/**
 * @ngdoc service
 * @name hwrChatApp.httpService
 * @description
 * # httpService
 * Factory in the hwrChatApp.
 */
angular.module('hwrChatApp')
  .factory('httpService', function ($http, $q) {
    return function (action, params) {
      var defferd = $q.defer();
      params.action = action;
      var link = 'http://localhost:5000/php/index.php/?' + $.param(params);
      $http.post(link, null)
        .success(function (data) {
          // Wenn in HTTP-Response keine error message ist, dann resolve, ansonsten reject:
          if (angular.isUndefined(data.error)) {
            defferd.resolve(data);
            return;
          }
          defferd.reject(data);
        })
        .error(function () {
          console.log('http error gefunden');
          defferd.reject();
        });
      return defferd.promise;
    };
  });
