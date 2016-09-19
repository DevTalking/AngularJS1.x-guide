var mainModule = angular.module("mainModule", []);

mainModule.constant("clientId", "qazxsw123456");

mainModule.service("currentDate", Date);

// mainModule.factory("clientIdAndCurrentDate", function(clientId) {
//   return clientId + "-" + new Date();
// });

mainModule.factory("clientIdAndCurrentDate", function(clientId, currentDate) {
  this.date = currentDate;
  return clientId + "-" + this.date;
});

mainModule.controller("FirstController", function(clientIdAndCurrentDate) {
  this.clientId = clientIdAndCurrentDate;
});
