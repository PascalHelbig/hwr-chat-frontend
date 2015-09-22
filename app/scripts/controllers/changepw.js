'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ChangepwCtrl
 * @description
 * # ChangepwCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ChangepwCtrl', function ($scope, userService, $mdToast, $filter) {

    $scope.user = {oldPW: '', newPW: '', confirmNewPW: ''};

    $scope.confirm = function () {
      userService.validatePassword($scope.user.oldPW).then(function (data) {
        if (data.result === true && $scope.user.newPW === $scope.user.confirmNewPW) {
          userService.me().password = $scope.user.newPW;
          userService.me().put().then(function (data) {
            console.log(data);
            $mdToast.showSimple($filter('translate')('AlertPwChange'));
          }, function () {
            $mdToast.showSimple($filter('translate')('AlertServerRequest'));
          });
        } else {
          $mdToast.showSimple($filter('translate')('AlertInputError'));
        }
      });
    };
  });
