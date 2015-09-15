'use strict';

describe('Service: userService', function () {

  // load the service's module
  beforeEach(module('hwrChatApp'));

  // instantiate service
  var userService;
  beforeEach(inject(function (_userService_) {
    userService = _userService_;
  }));

  it('should do something', function () {
    expect(!!userService).toBe(true);
  });

  it('isLoggedIn should return false if token is not set', function () {
    userService.token = null;
    expect(userService.isLoggedIn()).toBe(false);
  });

  it('isLoggedIn should return true if token set', function () {
    userService.token = 'xyz';
    expect(userService.isLoggedIn()).toBe(true);
  });

});
