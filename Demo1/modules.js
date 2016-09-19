// 互相独立的模块
// var mainModule = angular.module('mainModule', []);
// var anotherModule = angular.module('anotherModule', []);

// 有依赖关系的模块
var mainModule = angular.module('mainModule', ['secondModule']);
var secondModule = angular.module('secondModule', ['thirdModule']);
var thirdModule = angular.module('thirdModule', []);

thirdModule.filter('greet', function() {
  return function(name) {
    return 'Hello, ' + name + '!';
  };
});
