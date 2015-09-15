'use strict';

describe('Controller: ChangepwCtrl', function () {

  // load the controller's module
  beforeEach(module('hwrChatApp'));

  var ChangepwCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChangepwCtrl = $controller('ChangepwCtrl', {
      $scope: scope
    });
  }));

});
