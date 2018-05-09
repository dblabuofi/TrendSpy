angular.module("myApp").factory('url', function ($http) {
//        var url = 'http://localhost:8084'; 
//        var url = 'http://xin.nkn.uidaho.edu:8084';
        var url = '';
        var timezone = "America/Los_Angeles";
//        var timezone = "America/Boise";
//
//        var timezone = "";
//        $http({
//                method: 'GET',
//                url: url + "/FacebookCrawlerWS/run/timezone"
//        }).then(function successCallback(response) {
//                console.log(response.data);
//                timezone = response.data;
//        }, function errorCallback(response) {
//        });

//        var res = {
//                url: url,
//                timezone: timezone
//        };
        var res = {
                url: url, 
                timezone: timezone
        };
        return res;
});
