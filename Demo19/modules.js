var mainModule = angular.module("mainModule", []);

mainModule.component("myComponent", {
  templateUrl: "myTemplate.html",
  controller: function() {
    this.name = "jason";
  }
});

// 将初始化数据的逻辑放在onInit方法中

mainModule.component("myComponent", {
  templateUrl: "myTemplate.html",
  controller: function() {
    this.$onInit = function() {
      this.name = "jason";
    }
  }
});

mainModule.component("myComponent", {
  templateUrl: "myTemplate.html",
  controller: function() {
    this.$onChanges = function(changesObj) {
      if(changesObj.name) {
        // name当前的值
        var nameCurrentValue = changesObj.name.currentValue;
        // name修改前的值
        var namePreviousValue = changesObj.name.previousValue;
        // 是否是第一次修改
        var isFirstChange = changesObj.name.isFirstChange();
      }
    }
  },
  bindings: {
    name: "<"
  }
});

mainModule.component("myComponent", {
  templateUrl: "myTemplate.html",
  controller: function() {
    // 当name在指令内修改时
    this.name = "Green";
    this.$doCheck = function() {
      // doCheck方法会被调用
    }
  },
  bindings: {
    name: "<"
  }
});
