'use strict';

angular.module('workspaceApp')
  .controller('DeckViewerCtrl', function ($scope, $http) {
    $http.get('/api/Cardss/').success(function(data){
      
      $scope.cards = Object.keys(data[0].cards).filter(function(key){ return ['Credits', 'Debug', 'Hero Skins', 'Missions', 'Tavern Brawl'].indexOf(key) == -1; }).map(function(key){ return data[0].cards[key]; }).reduce(function(agg, curr){
        return agg.concat(curr);
      }).filter(function(card){ return card.collectible && card.type != 'Hero'; }).map(function(card){
        card.img = 'https://wow.zamimg.com/images/hearthstone/cards/enus/original/' + card.id + '.png';
        return card;
      });
      
    });
  });
