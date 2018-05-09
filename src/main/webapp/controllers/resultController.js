  angular.module("myApp").controller('resultController', function ($scope, $timeout, $uibModal, $interval, $http, $location, url, locationservice, $uibModal) {
        var baseurl = url.url + "/FacebookCrawlerWS";
        var timezone = url.timezone;
        $scope.eventStartDate = "";
        $scope.lagTime = "";
        $scope.itemPerPage = 20;
        $scope.curPage = 1;
        $scope.responsedEventDate = "";
        
        $scope.calculateFunc = function () {
                console.log("submitted");
                $scope.eventStartDate = document.getElementById("eventStartDate").value;
                console.log($scope.eventStartDate);

                var finurl = url.url + '/GoogleTrendWS/result/lagtime?';
                finurl += "id=" +  $scope.selectedID;
                finurl += "&eventStartDate=" +  $scope.eventStartDate;
                
                console.log(finurl);
                $http({
                        method: 'GET',
                        url: finurl
                }).then(function successCallback(response) {
                        console.log("Lag Time");
                        console.log(response.data);

                        $scope.lagTime = response.data.daysBetween;
                        $scope.responsedEventDate = response.data.responsedEventDate;
                }, function errorCallback(response) {
                });

        };
        
         //history
        $scope.totalContent = {
                data: [],
                titles: []
        };
     
        $scope.full = {
                data: [],
                titles: []
        };
        $scope.content = {
                data: [],
                titles: []
        };
        $scope.runHistory = false;
        $scope.history = function () {
                 $scope.runHistory = true;
                var url = baseurl + '/sql/twitterhistory';
//                console.log(url);
                $http({
                        method: 'GET',
                        url: url
                }).then(function successCallback(response) {
                         
//                        console.log(response.data);
                         console.log("history");
                        console.log(response.data);
                        $scope.totalContent = angular.copy(response.data);
                        $scope.changeDateFormat($scope.totalContent.data);
                        $scope.full.data = split($scope.totalContent.data, $scope.itemPerPage)[0];
                        $scope.full.titles = response.data.titles;
                        if ($scope.full.titles !== undefined)
                                $scope.full.titles.splice(6, 1);
//                        $scope.full.titles = ['id', 'key', 'from', 'to', 'country', 'state', 'city', 'time', 'total', 'valid', 'inloc', 'unknown', 'outloc'];
                        $scope.content.data = $scope.full.data;
                        $scope.content.titles = $scope.full.titles;
                        $scope.runHistory = false;
                }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                });
        };

        $scope.pageChanged = function () {
                console.log("page changed");
                $scope.itemPerPage = $("#itemPerPage").val();
                console.log($scope.itemPerPage);
                var splited = split($scope.totalContent.data, $scope.itemPerPage);
                console.log(splited);
                $scope.content.data = splited[this.curPage - 1];
                console.log('Page changed to: ' + this.curPage);
        };
        
        
        $scope.history();
        
           //3,4
        $scope.changeDateFormat = function (items) {
                if (items === undefined) return ;
                for (var i = 0; i < items.length; ++i) {
                        for (var j = 3; j < 5; ++j) {
                                var date = moment(items[i][j].toString(), 'MM-DD-YYYY HH:mm:ssZ');
                                items[i][j] = date.local().format('MM-DD-YYYY HH:mm:ss');
                        }
                        items[i].splice(6, 1);
                }
        }
        
        function split(arr, n) {
                if (arr === undefined)
                        return [];
                var len = arr.length, out = [], i = 0;
                var quotient = parseInt(len / n);
                var remainder = len % n;
                var size = parseInt(n);
                while (i <= quotient * n) {
                        out.push(arr.slice(i, i += size));
                }
                out.push(arr.slice(i, i += remainder));
                return out;
        }



//      $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
//  $scope.series = ['Series A', 'Series B'];
//  $scope.data = [
//    [65, 59, 80, 81, 56, 55, 40],
//    [28, 48, 40, 19, 86, 27, 90]
//  ];
      $scope.labels = [];
  $scope.series = [];
  $scope.data = [];
  
  
  
        
        $scope.selectedID = null;
        $scope.tableclick = function(content) {
                $scope.selectedID = content[0];
                $scope.selectedStartDate = content[3];
                $scope.selectedEndDate = content[4];
                $scope.selectedLocation = content[5];
                $scope.selectedSourceFrom = content[6];
                console.log(content);
                
                if (content[6] == 'GoogleTrend') {
                        var finurl = url.url + "/GoogleTrendWS/result/googleTrend?id=" + content[0];
                        $http({
                                method: 'GET',
//            url: escape(finurl)
                                url: finurl
                        }).then(function successCallback(response) {
                                console.log(response);
                                var data = response.data;
                                $timeout(function () {

                                        if (data.labels.length === 0) {
                                                $scope.loading = 0;

                                                $scope.infoShow = true;

//                                        $timeout(function () {
//                                                $scope.infoShow = false;
//                                        }, 10000);

                                        } else {
                                                $scope.data = data.data;
                                                $scope.labels = data.labels;
                                                $scope.series = data.series;
                                        }
                                }, 0);

                        }, function errorCallback(response) {
                        });
                        
                } else {//twitter 
                        var clientTimezone = moment.tz.guess();
                        var finurl = url.url + "/GoogleTrendWS/result/twitterCrawler?";
                        finurl +="id=" + content[0];
//                        finurl +="&clientTimezone=" + encodeURIComponent(clientTimezone);
                        finurl +="&clientTimezone=" + clientTimezone;
                        console.log(finurl)
                        $http({
                                method: 'GET',
                                url: finurl
                        }).then(function successCallback(response) {
                                console.log(response);
                                var data = response.data;
                                $timeout(function () {

                                        if (data.labels.length === 0) {
                                                $scope.loading = 0;
                                                $scope.infoShow = true;
                                        } else {
                                                $scope.data = data.data;
                                                $scope.labels = data.labels;
                                                $scope.series = data.series;
                                        }
                                }, 0);

                        }, function errorCallback(response) {
                        });
                        
                }
                
        };
        
});
