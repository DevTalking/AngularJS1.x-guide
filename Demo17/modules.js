var mainModule = angular.module("mainModule", []);

mainModule.directive("myTabs", function() {
  return {
    restrict: "E",
    transclude: true,
    controller: function($scope) {
      $scope.panes = [];
      var panes = $scope.panes;
      this.addPane = function(pane) {
        if(panes.length == 0) {
          $scope.select(pane);
        };
        panes.push(pane);
      };
      $scope.select = function(pane) {
        angular.forEach(panes, function(pane) {
          pane.selected = false;
        });
        pane.selected = true;
      };
    },
    templateUrl: "myTabs.html"
  };
});

mainModule.directive("myPane", function() {
  return {
    restrict: "E",
    require: "^^myTabs",
    scope: {
      name: "@",
      job: "@"
    },
    link: function(scope, element, attrs, controller) {
      controller.addPane(scope);
    },
    templateUrl: "myPane.html"
  };
})
