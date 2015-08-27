'use strict';

describe('Controller: DeckViewerCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var DeckViewerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeckViewerCtrl = $controller('DeckViewerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
