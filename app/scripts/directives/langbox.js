'use strict';

/**
 * @ngdoc directive
 * @name hwrChatApp.directive:langBox
 * @description
 * # langBox
 */
angular.module('hwrChatApp')
  .directive('langBox', function ($translate) {
    return {
      templateUrl: 'views/directives/langbox.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // aktuelle Sprache:
        scope.languageSelect = $translate.use();
        scope.languages = [
          {name: 'Deutsch', id: 'de_DE'},
          {name: 'English', id: 'en_US'}
        ];

        scope.changeLang = function (key) {
          $translate.use(key).then(function (key) {
            console.log("Sprache zu " + key + " gewechselt.");
          }, function (key) {
            console.log("Irgendwas lief schief.");
          });
        };

      }
    };
  });
