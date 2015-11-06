angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/confirm-drop-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('MatchesCtrl', function($scope, matches, $ionicModal) {
  $scope.matches = matches;
  $scope.listCanSwipe = true;
  $scope.sortMethods = ['id','player1.name','player2.name'];
  $scope.methodNo = 0;
  $scope.predicate = $scope.sortMethods[$scope.methodNo];
  $scope.reverse = false;

  $scope.flipReverse = function(){
    $scope.reverse = !$scope.reverse;
  };
  $scope.changeSortMethod = function(){
    $scope.methodNo += 1;
    if ($scope.methodNo >=3)
    {$scope.methodNo = 0;}
    $scope.predicate = $scope.sortMethods[$scope.methodNo];
  };

  $scope.contact = {
    name: 'Mittens Cat',
    info: 'Tap anywhere on the card to open the modal'
  };

  $ionicModal.fromTemplateUrl('contact-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

})

.controller('MatchCtrl', function($scope, match) {
  $scope.match = match;
});
