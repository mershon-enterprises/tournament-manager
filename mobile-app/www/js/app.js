// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.service('MatchesService',function($q){
  return {
    players:[
      {
        id: '1',
        name: 'Gomez',
        rank: '1'
      },
      {
        id: '2',
        name: 'Dot',
        rank: '2'
      },
      {
        id: '3',
        name: 'David',
        rank: '3'
      },
      {
        id: '4',
        name: 'Huey',
        rank: '4'
      },
      {
        id: '5',
        name: 'Rhys',
        rank: '5'
      },
      {
        id: '6',
        name: 'Sasha',
        rank: '6'
      },
      {
        id: '7',
        name: 'Max',
        rank: '7'
      },
      {
        id: '8',
        name: 'Chloe',
        rank: '8'
      },
      {
        id: '9',
        name: 'Sam',
        rank: '9'
      },
      {
        id: '10',
        name: 'Smith',
        rank: '10'
      }
    ],
    matches: [
      {
        id: '1',
        title: 'Game 1',
        table: 'Table 1',
        player1: {name: 'Gomez'},
        player2: {name: 'Dot'}
      },
      {
        id: '2',
        title: 'Game 2',
        table: 'Table 2',
        player1: {name: 'Max'},
        player2: {name: 'Chloe'}
      },
      {
        id: '3',
        title: 'Game 3',
        table: 'Table 3',
        player1: {name: 'David'},
        player2: {name: 'Huey'}
      },
      {
        id: '4',
        title: 'Game 4',
        table: 'Table 4',
        player1: {name: 'Rhys'},
        player2: {name: 'Sasha'}
      },
      {
        id: '5',
        title: 'Game 5',
        table: 'Table 5',
        player1: {name: 'Smith'},
        player2: {name: 'Samantha'}
      }
    ],
    getMatches: function() {
      return this.matches;
    },
    getMatch: function(matchId) {
      var dfd = $q.defer();
      this.matches.forEach(function(match) {
        if (match.id === matchId) dfd.resolve(match);
      });

      return dfd.promise;
    },
    getPlayers: function() {
      return this.players;
    },
    getPlayer: function(playerId) {
      var dfd = $q.defer();
      this.players.forEach(function(player) {
        if (player.id === playerId) dfd.resolve(player);
      });

      return dfd.promise;
    }
  };
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })


    .state('app.matches', {
      url: '/matches',
      views: {
        'menuContent': {
          templateUrl: 'templates/matches.html',
          controller: 'MatchesCtrl',
          resolve: {
            matches: function(MatchesService) {
              return MatchesService.getMatches();
            }
          }
        }
      }
    })

    .state('app.matches.pairings', {
      url: '/pairings',
      views: {
        'pairings': {
          templateUrl: 'templates/pairings.html',
          controller: 'MatchesCtrl',
          resolve: {
            matches: function(MatchesService) {
              return MatchesService.getMatches();
            }
          }
        }
      }
    })

    .state('app.matches.standings', {
      url: '/standings',
      views: {
        'standings': {
          templateUrl: 'templates/standings.html',
          controller: 'MatchesCtrl',
          resolve: {
            matches: function(MatchesService) {
              return MatchesService.getPlayers();
            }
          }
        }
      }
    })

  .state('app.single', {
    url: '/matches/:match',
    views: {
      'menuContent': {
        templateUrl: 'templates/match.html',
        controller: 'MatchCtrl',
        resolve: {
          match: function($stateParams, MatchesService) {
            return MatchesService.getMatch($stateParams.match);
          }
        }
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/matches');
});
