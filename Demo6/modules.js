var mainModule = angular.module("mainModule", []);

mainModule.value("clientId", "qazxsw123456");

// mainModule.config(function($provide, $compileProvider, $filterProvider) {
//     $provide.value("clientId", "qazxsw123456");
//     $provide.factory('a', function() { return 123; });
//     $compileProvider.directive('directiveName', ...);
//     $filterProvider.register('filterName', ...);
// });

// mainModule.controller("FirstController", ["clientId", function(clientId) {
//   this.clientId = clientId;
// }]);
//
// mainModule.controller("SecondController", ["clientId", function(clientId) {
//   this.clientId = clientId;
// }]);

// mainModule.controller("FirstController", ["$scope", "clientId", function($scope, clientId) {
//   $scope.clientId = clientId;
// }]);
//
// mainModule.controller("SecondController", ["$scope", "clientId", function($scope, clientId) {
//   $scope.clientId = clientId;
// }]);

// mainModule.controller("FirstController", function($scope, clientId) {
//   $scope.clientId = clientId;
// });
//
// mainModule.controller("SecondController", function($scope, clientId) {
//   $scope.clientId = clientId;
// });

// 或者
mainModule.controller("FirstController", function(clientId) {
  this.clientId = clientId;
});

mainModule.controller("SecondController", function(clientId) {
  this.clientId = clientId;
});
