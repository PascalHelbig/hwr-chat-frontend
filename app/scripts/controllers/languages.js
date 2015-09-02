'use strict';

angular.module('hwrChatApp')

  .controller('langCtrl', function ($scope, $translate) {

  $scope.changeLang = function (key) {
    $translate.use(key).then(function (key) {
      console.log('Sprache zu ' + key + ' gewechselt.');
    }, function () {
      console.log('Irgendwas lief schief.');
    });
  };
});
