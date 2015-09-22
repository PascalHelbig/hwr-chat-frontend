'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('SettingsCtrl', function ($scope, userService, $mdToast, $filter) {
    $scope.user = userService.me();
    console.log($scope.user);

    $scope.confirmPwPopup = false;

    $scope.save = function () {
      if ($scope.confirmPwPopup === true) {
        userService.validatePassword($scope.user.passwordConfirm).then(function (data) {
          if (data.result === true) {
            console.log(data);
            $scope.user.put().then(function () {
              // Update erfolgreich:
              $scope.user.passwordConfirm = '';
              $scope.confirmPwPopup = false;
              $mdToast.showSimple($filter('translate')('AlertChange'));
            }, function () {
              // $scope.user reseten:
              userService.loadData().then(function (user) {
                $scope.user = user;
              });
              $scope.confirmPwPopup = false;
            });
          }
          else {
            userService.loadData().then(function (user) {
              $scope.user = user;
            });
            $scope.confirmPwPopup = false;
            $mdToast.showSimple($filter('translate')('AlertPwWrong'));
          }
        });
      } else {
        $scope.confirmPwPopup = true;
      }
    };
  }
)
;
