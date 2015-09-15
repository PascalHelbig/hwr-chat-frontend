'use strict';

describe('Controller: ConfirmCtrl', function () {

  // load the controller's module
  beforeEach(module('hwrChatApp'));

  var ConfirmCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfirmCtrl = $controller('ConfirmCtrl', {
      $scope: scope
    });
  }));

});
