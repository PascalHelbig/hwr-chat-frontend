'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ForgotPasswordCtrl
 * @description
 * # ForgotPasswordCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ForgotPasswordCtrl', function ($scope, $state, $mdToast, $filter, Restangular) {
    $scope.user = {email: ''};
    $scope.sendResetPasswordMail = function () {
      Restangular.all('accounts').customPOST($scope.user, 'reset').then(function () {
        $mdToast.showSimple($filter('translate')('AlertEmailSent'));
        $state.go('layout_small.login');
      }, function() {
        $mdToast.showSimple($filter('translate')('AlertEmailError'));
      });
    };
  });
