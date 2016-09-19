var mainModule = angular.module("mainModule", []);

mainModule.controller("MyController", function() {
  this.name = "Jason";
  this.job = "Developer";
});

mainModule.directive("myDirective", function() {
  return {
    templateUrl: function(elem, attr) {
      return "myTemplate-" + attr.type + ".html";
    }
  };
});
