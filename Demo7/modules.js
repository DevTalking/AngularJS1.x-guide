var mainModule = angular.module("mainModule", []);

mainModule.value("clientId", "qazxsw123456");

mainModule.service("currentDate", Date);

mainModule.controller("FirstController", function(clientId, currentDate) {
  this.clientId = clientId + "-" + currentDate;
});
