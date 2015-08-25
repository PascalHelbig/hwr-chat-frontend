'use strict';

describe('Controller: NewChatCtrl', function () {

  // load the controller's module
  beforeEach(module('hwrChatApp'));

  var NewChatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewChatCtrl = $controller('NewChatCtrl', {
      $scope: scope
    });
  }));

});
