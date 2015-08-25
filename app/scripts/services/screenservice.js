'use strict';

/**
 * @ngdoc service
 * @name hwrChatApp.screenService
 * @description
 * # screenService
 * Factory in the hwrChatApp.
 */
angular.module('hwrChatApp')
  .factory('screenService', function ($window, $rootScope) {
    $rootScope.innerWidth = $window.innerWidth;

    angular.element($window).bind('resize', function () {
      $rootScope.innerWidth = $window.innerWidth;
      $rootScope.$apply();
    });

    var isMobileView = true;

    return {
      width: function () {
        return $rootScope.innerWidth;
      },
      isMobileView: function () {
        return isMobileView;
      },
      setMobileView: function (boolean) {
        isMobileView = boolean;
      },
      shouldMobileView: function () {
        return $rootScope.innerWidth < 600;
      },
      shouldMobileViewByWidth: function (width) {
        return width < 600;
      }
    };
  });
