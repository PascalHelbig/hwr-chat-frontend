'use strict';

describe('Controller: GroupnameCtrl', function () {

  // load the controller's module
  beforeEach(module('hwrChatApp'));

  var GroupnameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupnameCtrl = $controller('GroupnameCtrl', {
      $scope: scope
    });
  }));

});
