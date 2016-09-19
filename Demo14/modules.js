var mainModule = angular.module("mainModule", []);

mainModule.controller("MyController", function() {
  this.jason = { name: "Jason", job: "Developer" };
  this.green = { name: "Green", job: "Doctor" };
});

mainModule.directive("myDirective", function() {
  return {
    restrict: "E",
    scope: {
      personInfo: "=person"
    },
    templateUrl: "myTemplate.html"
  };
});
