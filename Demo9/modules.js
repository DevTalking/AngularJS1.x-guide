var mainModule = angular.module("mainModule", []);

mainModule.constant("clientId", "qazxsw123456");

mainModule.service("currentDate", Date);

mainModule.factory("clientIdAndCurrentDate", function(clientId, currentDate) {
  return clientId + "-" + currentDate;
});

mainModule.provider("clientIdAndCurrentDateByFormat", function() {
  this.formatFunc = function(str) {
    var clientId = str.substring(0, str.indexOf("-"));
    var dateStr = str.substring(str.indexOf("-"), str.length);
    var dateObj = new Date(dateStr);
    var year = dateObj.getFullYear().toString();
    var month = (dateObj.getMonth() + 1).toString();
    var day = dateObj.getDate().toString();
    var hour = dateObj.getHours().toString();
    var minute = dateObj.getMinutes().toString();
    var second = dateObj.getSeconds().toString();
    return clientId + "-" + [year, (month >= 10 ? month : 0 + month), (day > 10 ? day : 0 + day), hour, minute, second].join("");
  };
  this.$get = function(clientIdAndCurrentDate) {
    return this.formatFunc(clientIdAndCurrentDate);
  };
});

mainModule.controller("FirstController", function(clientIdAndCurrentDateByFormat) {
  this.clientId = clientIdAndCurrentDateByFormat;
});

// mainModule.controller("SecondController", function(clientId) {
//   this.clientId = clientId;
// });
