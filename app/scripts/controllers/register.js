'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('RegisterCtrl', function ($scope, httpService) {
    $scope.user = {name :"", firstName : "", pw : "", confirmPw : "", email: ""};
    $scope.signUP = function(){
    console.log($scope.user);
      /**
       * Emailfunktion kann Backend aktuell nicht, daher kann die Funktionalität nicht getestet werden
       */
      httpService('register', {email: $scope.user.email, passwort: $scope.user.pw, nachname: $scope.user.name, vorname: $scope.user.firstName})
    };
  });
