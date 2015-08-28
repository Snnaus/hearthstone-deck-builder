'use strict';

angular.module('workspaceApp')
  .controller('DeckViewerCtrl', function ($scope, $http) {
    $scope.status = {
        isopen: false
      };
    
    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
    
    $http.get('/api/Cardss/').success(function(data){
      
      $scope.rawCards = Object.keys(data[0].cards).filter(function(key){ return ['Credits', 'Debug', 'Hero Skins', 'Missions', 'Tavern Brawl'].indexOf(key) == -1; }).map(function(key){ return data[0].cards[key]; }).reduce(function(agg, curr){
        return agg.concat(curr);
      }).filter(function(card){ return card.collectible && card.type != 'Hero'; }).map(function(card){
        card.img = 'https://wow.zamimg.com/images/hearthstone/cards/enus/original/' + card.id + '.png';
        if(!card.playerClass){
          card.playerClass = 'Neutral';
        }
        return card;
      });
      
      $scope.cards = $scope.rawCards;
      
    });
    
    $scope.heroes = ['Warrior', 'Shaman', 'Hunter', 'Druid', 'Rogue', 'Mage', 'Priest', 'Warlock', 'Paladin', 'Neutral', 'All'];
    $scope.searchClass = function(hero){
      if(hero != 'All'){
        $scope.cards = $scope.rawCards.filter(function(card){ return card.playerClass == hero; });
      }else{
        $scope.cards = $scope.rawCards;
      }
    }
    
    $scope.deck = [];
    $scope.cardCount = 0;
    $scope.addCard = function(card, deck){
      if(deck.length == 0 || deck.reduce(function(agg, curr){ return agg + curr.qty; }, 0) < 30){
        var inDeck = deck.map(function(car){ return car.id; });
        inDeck = inDeck.indexOf(card.id);
        if(inDeck == -1){
          card.qty = 1;
          deck.push(card);
        }else if(card.qty < 2){
          card.qty = card.qty + 1;
        }
      }
    
      $scope.cardCount = deck.reduce(function(agg, curr){ return agg + curr.qty; }, 0);
    };
    
    $scope.removeCard = function(card, deck){
      if(card.qty > 1){
        card.qty = card.qty - 1;
      }else{
        var garbage = deck.splice(deck.map(function(car){ return car.id; }).indexOf(card.id), 1);
        $scope.cardCount = deck.reduce(function(agg, curr){ return agg + curr.qty; }, 0);
      }
    };
  });
