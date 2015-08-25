'use strict';

describe('Service: screenService', function () {

  // load the service's module
  beforeEach(module('hwrChatApp'));

  var screenService, $rootScope;
  beforeEach(inject(function (_screenService_, _$rootScope_) {
    screenService = _screenService_;
    $rootScope = _$rootScope_;
  }));

  it('should return the width', function () {
    $rootScope.innerWidth = 200;
    expect(screenService.width()).toBe(200);
  });

  it('should set and get isMobileView', function () {
    screenService.setMobileView(true);
    expect(screenService.isMobileView()).toBeTruthy();
    screenService.setMobileView(false);
    expect(screenService.isMobileView()).toBeFalsy();
  });

  it('should decide between desktop and mobile view', function () {
    $rootScope.innerWidth = 599;
    expect(screenService.shouldMobileView()).toBeTruthy();
    $rootScope.innerWidth = 600;
    expect(screenService.shouldMobileView()).toBeFalsy();
  });

  it('should decide between desktop and mobile view by manual width', function () {
    expect(screenService.shouldMobileViewByWidth(599)).toBeTruthy();
    expect(screenService.shouldMobileViewByWidth(600)).toBeFalsy();
  });

});
