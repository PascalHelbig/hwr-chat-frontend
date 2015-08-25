'use strict';

describe('Controller: ForgotPasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('hwrChatApp'));

  var ForgotPasswordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ForgotPasswordCtrl = $controller('ForgotPasswordCtrl', {
      $scope: scope
    });
  }));

});
