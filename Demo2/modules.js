// 互相独立的模块
var mainModule = angular.module("mainModule", []);
var anotherModule = angular.module("anotherModule", []);

angular.element(document).ready(function() {
  var myDiv1 = document.getElementById("myDiv1");
  angular.bootstrap(myDiv1, ["mainModule"]);

  var myDiv2 = document.getElementById("myDiv2");
  angular.bootstrap(myDiv2, ["anotherModule"]);
});
