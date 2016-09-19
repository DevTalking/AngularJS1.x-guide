var mainModule = angular.module("mainModule", []);

mainModule.controller("MyController", function() {
  this.name = "Jason";
  this.job = "Developer";
});

mainModule.directive("myDirective", function() {
  return {
    template: "Name: {{mc.name}}, Job: {{mc.job}}"
  };
});
