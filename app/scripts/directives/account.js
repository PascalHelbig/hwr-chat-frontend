'use strict';

/**
 * @ngdoc directive
 * @name hwrChatApp.directive:account
 * @description
 * # account
 */
angular.module('hwrChatApp')
  .directive('account', function () {
    return {
      template: '<div>{{account.firstname}} {{account.lastname}}</div>',
      restrict: 'E',
      scope: {
        account: '=account'
      }
    };
  });
