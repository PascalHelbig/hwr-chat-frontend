'use strict';

describe('Controller: RenamechatCtrl', function () {

  // load the controller's module
  beforeEach(module('hwrChatApp'));

  var RenamechatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RenamechatCtrl = $controller('RenamechatCtrl', {
      $scope: scope
    });
  }));

});
