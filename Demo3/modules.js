var mainModule = angular.module("mainModule", []);

mainModule.controller("GreetingController", ["$scope", function($scope) {
  $scope.greeting = "Hello";
  $scope.person = {
    name: "Jason"
  }
}]);
