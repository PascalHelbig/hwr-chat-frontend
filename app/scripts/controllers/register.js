'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the hwrChatApp
 */

//ToDo: Weiterleitung Login; Email-Bestätigung; Nur @hwr-berlin.de zulassen
angular.module('hwrChatApp')
  .controller('RegisterCtrl', function ($scope, $state, $mdToast, Restangular) {
    $scope.user = {lastname: '', firstname$state: '', password: '', email: ''};
    $scope.confirm = {password: ''};
    $scope.signUP = function () {
      if($scope.confirm.password === $scope.user.password && $scope.confirm.agree) {
        Restangular.all('accounts').post($scope.user).then(function () {
          $mdToast.showSimple('Registrierung erfolgreich');
          $state.go('layout_small.login');
        }, function () {
          $mdToast.showSimple('Fehler!');
        });
      }
      else {
        if(!$scope.confirm.agree) {$mdToast.showSimple('Nutzungsbestimmungen akzeptieren!');}
        else{$mdToast.showSimple('Passwort ungleich!');}
      }
    };
  });
