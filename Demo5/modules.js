var mainModule = angular.module("mainModule", []);

mainModule.controller("GreetingController", ["$scope", function($scope) {
  $scope.person = {
    name: "Jason",
    job: "Developer"
  };
}]);
