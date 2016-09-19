var mainModule = angular.module("mainModule", []);

mainModule.controller("GreetingController", ["$scope", function($scope) {
  $scope.personName = "Everyone";

  $scope.welcomeJason = function() {
    $scope.personName = "Jason";
  };

  $scope.welcomeGreen = function() {
    $scope.personName = "Green";
  }
}]);
