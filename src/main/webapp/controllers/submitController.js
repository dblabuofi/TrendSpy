angular.module("myApp").controller('submitController', function ($scope, $timeout, $uibModal, $interval, $http, $location, url, locationservice, $uibModal) {
        var baseurl = url.url + "/FacebookCrawlerWS";
        var timezone = url.timezone;
//        console.log(timezone);
        $scope.filterKeywords = "";
        $scope.storedKeys = [];

//        var now = new Date();
//        console.log(now);


        var nowmoment = moment();
//        $scope.fromDate = nowmoment.add(20, 'seconds').format("MM-DD-YYYY HH:mm:ss");
//        $scope.toDate = nowmoment.add(600, 'seconds').format("MM-DD-YYYY HH:mm:ss");
        $scope.fromDate = nowmoment.add(10, 'minutes').format("MM-DD-YYYY HH:mm:ss");
        $scope.toDate = nowmoment.add(60, 'minutes').format("MM-DD-YYYY HH:mm:ss");


        $scope.location = "";

        //history
        $scope.totalContent = {
                data: [],
                titles: []
        };
        $scope.itemPerPage = 20;
        $scope.curPage = 1;
        $scope.full = {
                data: [],
                titles: []
        };
        $scope.content = {
                data: [],
                titles: []
        };
        function usOnly(item) {
                console.log(item);
                return String(item).indexOf('USA') >= 0 || String(item) === "United States";
        }

        $scope.getLocation = function (val) {
                return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                        params: {
                                address: val,
                                sensor: false
                        }
                }).then(function (response) {
                        console.log(response.data);
                        return response.data.results.map(function (item) {
                                return item.formatted_address;
                        }).filter(usOnly);
                });
        };
        
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
                var splited = split($scope.totalContent.data, $scope.itemPerPage);
                console.log(splited);
                $scope.content.data = splited[this.curPage - 1];
                console.log('Page changed to: ' + this.curPage);
        };
//        $scope.history();

        //current 
        $scope.curtotalContent = {
                data: [],
                titles: []
        };
        $scope.curitemPerPage = 20;
        $scope.curcurPage = 1;
        $scope.curfull = {
                data: [],
                titles: []
        };
        $scope.curcontent = {
                data: [],
                titles: []
        };
        
        $scope.runCurrent = false;
        $scope.currentRunning = function () {
                   $scope.runCurrent = true;
                var url = baseurl + '/sql/twitterrunning';
//                console.log(url);
                $http({
                        method: 'GET',
                        url: url
                }).then(function successCallback(response) {
                           
                         console.log("curentrunning");
                        console.log(response.data);
                        $scope.curtotalContent = angular.copy(response.data);
                        $scope.changeDateFormat($scope.curtotalContent.data);
                        $scope.curfull.data = split($scope.curtotalContent.data, $scope.itemPerPage)[0];
                        $scope.curfull.titles = response.data.titles;
                        if ($scope.curfull.titles !== undefined)
                                 $scope.curfull.titles.splice(6, 1);
//                        $scope.full.titles = ['id', 'key', 'from', 'to', 'country', 'state', 'city', 'time', 'total', 'valid', 'inloc', 'unknown', 'outloc'];

                        $scope.curcontent.data = $scope.curfull.data;
                        $scope.curcontent.titles = $scope.curfull.titles;
                        $scope.runCurrent = false;
                }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                });
        };

        $scope.curpageChanged = function () {
                var splited = split($scope.curtotalContent.data, $scope.curitemPerPage);
                console.log(splited);
                $scope.curcontent.data = splited[this.curcurPage - 1];
                console.log('Page changed to: ' + this.curcurPage);
        };
//        $scope.currentRunning();


        //Future
        $scope.futotalContent = {
                data: [],
                titles: []
        };
        $scope.fuitemPerPage = 20;
        $scope.fucurPage = 1;
        $scope.fufull = {
                data: [],
                titles: []
        };
        $scope.fucontent = {
                data: [],
                titles: []
        };

        $scope.runFuture = false;
        $scope.getfufure = function () {
                  $scope.runFuture = true;
                var url = baseurl + '/sql/twitterfuture';
//                console.log(url);
                $http({
                        method: 'GET',
                        url: url
                }).then(function successCallback(response) {
                          
                        $scope.futotalContent = angular.copy(response.data);
                        console.log("future");
                        console.log(response.data);
                        $scope.changeDateFormat($scope.futotalContent.data);
                        $scope.fufull.data = split($scope.futotalContent.data, $scope.fuitemPerPage)[0];
                        $scope.fufull.titles = response.data.titles;
                        if ($scope.fufull.titles !== undefined)
                                 $scope.fufull.titles.splice(6, 1);
//                        $scope.full.titles = ['id', 'key', 'from', 'to', 'country', 'state', 'city', 'time', 'total', 'valid', 'inloc', 'unknown', 'outloc'];

                        $scope.fucontent.data = $scope.fufull.data;
                        $scope.fucontent.titles = $scope.fufull.titles;
                        $scope.runFuture = false;
                }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                });
        };

        $scope.fupageChanged = function () {
                var splited = split($scope.futotalContent.data, $scope.fuitemPerPage);
                console.log(splited);
                $scope.fucontent.data = splited[this.fucurPage - 1];
                console.log('Page changed to: ' + this.fucurPage);
        };
//        $scope.getfufure();

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

        var myTimeout = null;

     

        $scope.isSubmitting = false;
        $scope.submitFutureTask = function () {
                var filterTweetsUrl = baseurl + '/run/submitTwitter?';
                //change fromDate to boise
                var from = moment($scope.fromDate, "MM-DD-YYYY HH:mm:ss").clone().tz(timezone);
                var to = moment($scope.toDate, "MM-DD-YYYY HH:mm:ss").clone().tz(timezone);

                var now = moment().tz(timezone);

                if (now > from) {
                        $scope.alertMessage.push(" start day should in the future");
                        return;
                }
                if (from >= to) {
                        $scope.alertMessage.push(" start day should before end date");
                        return;
                }
                if (to.diff(from, 'days') > 30) {
                        $scope.alertMessage.push(" maximum day range 30");
                        return;
                }

                function waitforReady(func) {
                        if (locationStr === "") {
                                $timeout(function () {
                                        waitforReady(func);
                                }, 100);
                                return;
                        }
                        func();
                }
                if ($scope.location.length > 0) {
                        var locationPromise = $scope.queryLocation($scope.location);
                        locationPromise.then(function (data) {
                                var location = "";
                                for (var i = 0; i < data.results.length; ++i) {
                                        var place = data.results[i];
                                        if (place.formatted_address == $scope.location) {
                                                location = place.geometry.bounds.southwest.lng +
                                                        "," + place.geometry.bounds.southwest.lat +
                                                        "," + place.geometry.bounds.northeast.lng +
                                                        "," + place.geometry.bounds.northeast.lat;
                                                break;
                                        }
                                }
                                filterTweetsUrl += 'fiterKeywords='
                                        + $scope.filterKeywords + "&fromDate="
                                        + from.format("MM-DD-YYYY HH:mm:ss") + "&toDate="
                                        + to.format("MM-DD-YYYY HH:mm:ss") + "&location="
                                        + $scope.location + "&locationCoordinats=" 
                                        + location;
                                console.log(filterTweetsUrl);
                                if (myTimeout !== null) {
                                        $timeout.cancel(myTimeout);
                                }
//                                myTimeout = $timeout(function () {
//                                        $scope.history();
//                                        $scope.currentRunning();
//                                        $scope.getfufure();
//                                        $scope.isSubmitting = false;
//                                }, 5000);
                                $scope.isSubmitting = true;
                                        $http({
                                                method: 'GET',
                                                url: filterTweetsUrl
                                        }).then(function successCallback(response) {
                                                console.log(response);
                                                if (response.status === 201) {
                                                        $scope.alertMessage.push(response.data);
                                                } else if (response.status === 202) {
                                                        $scope.alertMessage.push(response.data);
                                                }
                                                $scope.myRefresh();
                                                $scope.isSubmitting = false;
                                        }, function errorCallback(response) {
                                        });
                        });
                } else {
                         filterTweetsUrl += 'fiterKeywords='
                                        + $scope.filterKeywords + "&fromDate="
                                        + from.format("MM-DD-YYYY HH:mm:ss") + "&toDate="
                                        + to.format("MM-DD-YYYY HH:mm:ss") + "&location=";
                                console.log(filterTweetsUrl);
                                if (myTimeout !== null) {
                                        $timeout.cancel(myTimeout);
                                }
//                                myTimeout = $timeout(function () {
//                                        $scope.history();
//                                        $scope.currentRunning();
//                                        $scope.getfufure();
//                                        $scope.isSubmitting = false;
//                                }, 5000);
                                $scope.isSubmitting = true;
                                $http({
                                        method: 'GET',
                                        url: filterTweetsUrl
                                }).then(function successCallback(response) {
                                        console.log(response);
                                        if (response.status === 201) {
                                                $scope.alertMessage.push(response.data);
                                        } else if (response.status === 202) {
                                                $scope.alertMessage.push(response.data);
                                        }
                                        $scope.myRefresh();
                                        $scope.isSubmitting = false;
                                }, function errorCallback(response) {
                                });
                }
        }




        $scope.curStatus = "";


        $scope.alertMessage = [];
        $scope.closeAlert = function (index) {
                $scope.alertMessage.splice(index, 1);
        }

        $scope.getStatus = function () {
                var statusUrl = baseurl + '/status/twitterstatus'; 
                $http({
                        method: 'GET',
                        url: statusUrl
                }).then(function successCallback(response) {
                        $scope.curStatus = response.data;
                        console.log(response.data);
                        
                        if ($scope.curStatus.lastIndexOf('Tweets:') != -1) {
                                var index_start = $scope.curStatus.lastIndexOf('Tweets:') + 7;
                                var index_end = $scope.curStatus.lastIndexOf('Time:') - 1;
                                var num = parseInt($scope.curStatus.substring(index_start, index_end));
                                $scope.curStatus = $scope.curStatus.substring(0, index_start) + num + $scope.curStatus.substring(index_end);
                        }
                        if ($scope.curStatus.lastIndexOf('Time:') != -1) {
                                var date = $scope.curStatus.substring($scope.curStatus.lastIndexOf('Time:') + 5);
                                console.log(date);
                                $scope.curStatus = $scope.curStatus.substring(0, $scope.curStatus.lastIndexOf('Time:') + 5) + moment(date).format("MM-DD-YYYY HH:mm:ss");
                        }
                }, function errorCallback(response) {
                });
        };
        
        $scope.myRefresh = function () {
                $timeout(function() {
                        $scope.history();
                }, 10);
                $timeout(function() {
                        $scope.currentRunning();
                }, 100);
                $timeout(function() {
                        $scope.getfufure();
                }, 300);
                $timeout(function() {
                        $scope.getStatus();
                }, 400);
        };

         $scope.myRefresh();
        
        $scope.$on(
                "$destroy",
                function (event) {
                        if (myTimeout !== null)
                                $timeout.cancel(myTimeout);
                }
        );


        $scope.myFromDateValidator = function (date) {
                if (date === undefined) return false;
                return moment(date, 'MM-DD-YYYY HH:mm:ss', true).isValid();
        }

        $scope.myToDateValidator = function (fromDate, toDate) {


                if (fromDate != undefined && fromDate.length > 0) {
                        if (moment($scope.fromDate, "MM-DD-YYYY HH:mm:ss", true).isValid() == false) {
                                return 'Please fix fromDate format first!';
                        } else if (moment($scope.fromDate, "MM-DD-YYYY HH:mm:ss", true).isValid()) {
                                var from = moment($scope.fromDate, "MM-DD-YYYY HH:mm:ss");
                                var to = moment($scope.toDate, "MM-DD-YYYY HH:mm:ss");
                                if (from >= to) {
                                        return 'toDate need be after fromdate';
                                }
                                if (to.diff(from, 'days') > 30) {
                                        return 'maximum date range is 30 days';
                                }
                        }
                }
                if (moment(toDate, 'MM-DD-YYYY HH:mm:ss', true).isValid()) {
//                if (moment(toDate, moment.ISO_8601).isValid()) {
                        return true;
                } else {

                        return 'date like 07-01-2016 08:03:04';
                }
        }

        $scope.isCollapsed = false;



        $scope.removeFutureTask = function (index) {
                console.log($scope.futotalContent.data[index]);
                var id = $scope.fufull.data[index][0];
                var from = moment($scope.fufull.data[index][3].toString(), 'MM-DD-YYYY HH:mm:ss').tz(timezone) ;
                var to = moment($scope.fufull.data[index][4].toString(), 'MM-DD-YYYY HH:mm:ss').tz(timezone) ; 

                var url = baseurl + '/run/removeFutureTask' + '?id=' + id 
                        + "&fromDate=" + from.format('MM-DD-YYYY HH:mm:ss') 
                        + "&toDate=" + to.format('MM-DD-YYYY HH:mm:ss'); 
                console.log(url);
                $http({
                        method: 'GET',
                        url: url
                }).then(function successCallback(response) {
                        $timeout(function() {
                                $scope.getfufure();
                        }, 10);
                }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                });
        }
        $scope.loading = false;
        $scope.removeCurTask = function (index) {
                $scope.loading = true;
              var id = $scope.curfull.data[index][0];
                var from = moment($scope.curfull.data[index][3].toString(), 'MM-DD-YYYY HH:mm:ss').tz(timezone) ;
                var to = moment($scope.curfull.data[index][4].toString(), 'MM-DD-YYYY HH:mm:ss').tz(timezone) ; 

                var url = baseurl + '/run/removeCurrentTask' + '?id=' + id 
                        + "&fromDate=" + from.format('MM-DD-YYYY HH:mm:ss')
                        + "&toDate=" + to.format('MM-DD-YYYY HH:mm:ss'); 
                console.log(url);
                $http({
                        method: 'GET',
                        url: url
                }).then(function successCallback(response) { 
                        
                        $timeout(function() {
                                $scope.currentRunning();
                                $scope.loading = false;
                        }, 10);
                }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                });
        }



        $scope.queryLocation = function (val) {
                return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                        params: {
                                address: val,
                                sensor: false
                        }
                }).then(function (response) {
                        return response.data;
                });
                
        };
        
      
        
        
        
        
        
        
        

        function checkEnter(e) {
                e = e || event;
                var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
                return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
        }
        document.querySelector('#myForm').onkeypress = checkEnter;
        
        
        
        $scope.downloadData = function(content) {
                console.log(content);
                var url = baseurl + '/download/asZip' 
                        + '?id=' + content[0]
                        + '&keywords=' + content[1]
                        + '&startDate=' + content[3]
                        + '&endDate=' + content[4]
                        + '&location=' + content[5];
                console.log(url);
                
//                  $http({
//                        method: 'GET',
//                        url: url
//                }).then(function successCallback(response) {
//                        console.log(response);
//                }, function errorCallback(response) {
//                });
                
                  window.open(url, '_blank');
                
                
                
        };
        
        
        

});


angular.module('myApp')
        .directive('awLimitLength', function () {
                return {
                        restrict: "A",
                        require: 'ngModel',
                        link: function (scope, element, attrs, ngModel) {
                                attrs.$set("ngTrim", "false");
                                var limitLength = parseInt(attrs.awLimitLength, 10);// console.log(attrs);
                                scope.$watch(attrs.ngModel, function (newValue) {
                                        if (ngModel.$viewValue.length > limitLength) {
                                                ngModel.$setViewValue(ngModel.$viewValue.substring(0, limitLength));
                                                ngModel.$render();
                                        }
                                });
                        }
                };
        });