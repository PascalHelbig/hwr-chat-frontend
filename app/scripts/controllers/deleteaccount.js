'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:DeleteaccountCtrl
 * @description
 * # DeleteaccountCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('DeleteaccountCtrl', function ($scope, userService, $mdToast, $filter, $state) {

    $scope.user = {pw: ''};

    $scope.confirmDeleteAccount = function () {
      userService.validatePassword($scope.user.pw).then(function (data) {
        if (data.result === true) {
          userService.me().remove().then(function () {
            $mdToast.showSimple($filter('translate')('AlertAccDeleted'));
            $state.go('layout_small.login');
          }, function () {
            $mdToast.showSimple($filter('translate')('AlertError'));
          });
        } else {
          $mdToast.showSimple($filter('translate')('AlertPwWrong'));
        }
      });
    };
  });
