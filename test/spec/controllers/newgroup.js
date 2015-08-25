'use strict';

describe('Controller: NewGroupCtrl', function () {

  // load the controller's module
  beforeEach(module('hwrChatApp'));

  var NewGroupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewGroupCtrl = $controller('NewGroupCtrl', {
      $scope: scope
    });
  }));

});
