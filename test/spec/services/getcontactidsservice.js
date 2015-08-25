'use strict';

describe('Service: getContactIDsService', function () {

  // load the service's module
  beforeEach(module('hwrChatApp'));

  // instantiate service
  var getContactIDsService;
  beforeEach(inject(function (_getContactIDsService_) {
    getContactIDsService = _getContactIDsService_;
  }));

  it('should do something', function () {
    expect(!!getContactIDsService).toBe(true);
  });

});
