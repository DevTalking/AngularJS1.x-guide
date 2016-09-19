var mainModule = angular.module("mainModule", []);

mainModule.controller("MyController", function() {
  this.person = {
    name: "Jason"
  }
})

mainModule.component("myComponent", {
  templateUrl: "myTemplate.html",
  controller: function() {

  },
  bindings: {
    person: "="
  }
});
