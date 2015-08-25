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

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
