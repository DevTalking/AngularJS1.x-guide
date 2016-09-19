var mainModule = angular.module("mainModule", []);

mainModule.controller("MyController", function($scope) {
  $scope.green = { name: "Green", job: "Doctor" };
});

mainModule.directive("myDirective", function() {
  return {
    restrict: "E",
    scope: {
      person: "="
    },
    controller: function($scope) {
      $scope.jason = { name: "Jason", job: "Developer" };
    },
    templateUrl: "myTemplate.html"
  };
});
