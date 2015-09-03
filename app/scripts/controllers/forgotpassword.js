'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ForgotPasswordCtrl
 * @description
 * # ForgotPasswordCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ForgotPasswordCtrl', function ($scope, $state, $mdToast, Restangular) {
    $scope.user = {email: ''};
    $scope.sendResetPasswordMail = function () {
      Restangular.all('accounts').customPOST($scope.user, 'reset').then(function () {
        $mdToast.showSimple('E-Mail zur Wiederherstellung gesendet!');
        $state.go('layout_small.login');
      }, function() {
        $mdToast.showSimple('Fehler! E-Mail Adresse nicht gefunden.');
      });
    };
  });
