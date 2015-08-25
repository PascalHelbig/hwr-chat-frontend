'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ForgotPasswordCtrl
 * @description
 * # ForgotPasswordCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ForgotPasswordCtrl', function ($scope) {
    $scope.user = {email: ""};

    /**
     * Funktion kann nicht geprüft werden da aktuell keine Email vom Backend aus gesendet werden kann
     */
    $scope.sendResetPasswordMail = function () {
      httpService('resetPassword', {email: $scope.user.email})
    };
  });
