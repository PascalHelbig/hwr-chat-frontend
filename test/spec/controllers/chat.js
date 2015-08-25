'use strict';

describe('Controller: ChatCtrl', function () {

  // load the controller's module
  beforeEach(module('hwrChatApp'));

  var ChatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChatCtrl = $controller('ChatCtrl', {
      $scope: scope
    });
  }));

  it('should increase the chat array on send', function () {
    var oldLength = scope.chat.length;
    scope.messageText = 'Text';
    scope.send();
    expect(scope.chat.length).toBe(oldLength + 1);
  });

  it('should not increase the chat array if input is empty', function () {
    var oldLength = scope.chat.length;
    scope.messageText = '';
    scope.send();
    expect(scope.chat.length).toBe(oldLength);
  });
});
