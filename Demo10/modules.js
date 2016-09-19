var mainModule = angular.module("mainModule", []);

mainModule.directive("myDirective", function() {
  return {
    restrict: "A"
  };
});

mainModule.directive("myDirective1", function() {
  return {
    restrict: "E"
  };
});

mainModule.directive("myDirective2", function() {
  return {
    restrict: "AE"
  };
});
