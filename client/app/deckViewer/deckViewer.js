'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/deckViewer', {
        templateUrl: 'app/deckViewer/deckViewer.html',
        controller: 'DeckViewerCtrl'
      });
  });
