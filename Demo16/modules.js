var mainModule = angular.module("mainModule", []);

mainModule.directive("myDirective", function($interval) {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      $interval(function() {
        element.text(new Date());
      }, 1000);
    }
  };
});
