'use strict';

describe('Controller: DeleteaccountCtrl', function () {

  // load the controller's module
  beforeEach(module('hwrChatApp'));

  var DeleteaccountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeleteaccountCtrl = $controller('DeleteaccountCtrl', {
      $scope: scope
    });
  }));

});
