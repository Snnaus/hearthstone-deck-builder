'use strict';

angular.module('workspaceApp')
  .controller('DeckViewerCtrl', function ($scope, $http) {
    $scope.status = {
        isopen: false,
        building: false,
        hero: 'Neutral',
        mana: 'All',
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
      }).sort(function(a,b){ return a.cost - b.cost});
      
      $scope.cards = $scope.rawCards.filter(function(card){ return card.playerClass == 'Neutral'; });
      
    });
    var rawHeroes = ['Warrior', 'Shaman', 'Hunter', 'Druid', 'Rogue', 'Mage', 'Priest', 'Warlock', 'Paladin', 'Neutral'];
    $scope.heroes = rawHeroes;
    $scope.searchClass = function(hero){
      updateCards($scope.status.mana, hero);
      $scope.status.hero = hero;
    };
    
    $scope.deck = [];
    $scope.cardCount = 0;
    $scope.addCard = function(card, deck){
      if(deck.length == 0 || deck.reduce(function(agg, curr){ return agg + curr.qty; }, 0) < 30){
        var inDeck = deck.map(function(car){ return car.id; });
        inDeck = inDeck.indexOf(card.id);
        if(inDeck == -1){
          card.qty = 1;
          deck.push(card);
        }else if(card.qty < 2 && card.rarity != 'Legendary'){
          card.qty = card.qty + 1;
        }
      }
    
      deck = deck.sort(function(a, b){ return a.cost - b.cost; });
      $scope.cardCount = deck.reduce(function(agg, curr){ return agg + curr.qty; }, 0);
    };
    
    $scope.removeCard = function(card, deck){
      if(card.qty > 1){
        card.qty = card.qty - 1;
      }else{
        var garbage = deck.splice(deck.map(function(car){ return car.id; }).indexOf(card.id), 1);
      }
      $scope.cardCount = deck.reduce(function(agg, curr){ return agg + curr.qty; }, 0);
    };
    
    $scope.selectHero = function(hero){
      $scope.status.building = true;
      updateCards($scope.status.mana, hero);
      $scope.heroes = [hero, 'Neutral'];
      $scope.status.hero = hero;
    };
    
    var updateCards = function(cost, hero){
      if(cost == 'All'){
        $scope.cards = $scope.rawCards.filter(function(card){ return card.playerClass == hero; });
      }else if(cost != '7+'){
        $scope.cards = $scope.rawCards.filter(function(card){ return card.playerClass == hero && card.cost == cost; });
      }else{
        $scope.cards = $scope.rawCards.filter(function(card){ return card.playerClass == hero && card.cost >= 7; });
      }
    };
    
    $scope.searchMana = function(mana){
      if(mana != $scope.status.mana){
        $scope.status.mana = mana;
      }else{
        $scope.status.mana = 'All';
      }
      
      updateCards($scope.status.mana, $scope.status.hero);
    };
  });
