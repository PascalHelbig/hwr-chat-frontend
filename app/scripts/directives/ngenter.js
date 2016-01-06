'use strict';

/**
 * @ngdoc directive
 * @name hwrChatApp.directive:ngEnter
 * @description
 * # ngEnter
 */
angular.module('hwrChatApp')
  .directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        // Wenn Ctrl oder Shift gedrück ist, dann ignoriere Tastendruck
        if (event.ctrlKey || event.shiftKey) {
          return;
        }

        // Wenn Enter (13) gedrückt wird, dann führe Aktion aus
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      });
    };
  });
