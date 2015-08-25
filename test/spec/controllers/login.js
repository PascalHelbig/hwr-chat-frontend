'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('hwrChatApp'));

  var LoginCtrl,
    scope,
    auth;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, authService) {
    scope = $rootScope.$new();
    auth = authService;
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      authService: authService
    });
  }));


});
