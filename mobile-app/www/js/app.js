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
    matches: [
      {
        id: '1',
        title: 'Game 1',
        table: 'Table 1'
      },
      {
        id: '2',
        title: 'Game 2',
        table: 'Table 2'
      },
      {
        id: '3',
        title: 'Game 3',
        table: 'Table 3'
      },
      {
        id: '4',
        title: 'Game 4',
        table: 'Table 4'
      },
      {
        id: '5',
        title: 'Game 5',
        table: 'Table 5'
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
              return MatchesService.getMatches();
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
