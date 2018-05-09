angular.module("myApp").controller('progressController', function ($scope, $http, $interval, $window, $location, url) {
        var baseurl = url.url + "/FacebookCrawlerWS";
        var charturl = baseurl + '/chart/twitterfilterchart?';
        var timezone = url.timezone;

        $scope.filterKeywords = "";
        $scope.fromDate = "";
        $scope.toDate = moment().format("MM-DD-YYYY HH:mm:ss");
        $scope.location = "";
        $scope.selectedServer = "master";
        $scope.selectedTask = "";
        $scope.clientTimezone = moment.tz.guess();
        $scope.locationType = "inLocUnknown";

        $scope.datasource = {
                labels: [],
                series: [],
                data: []
        };

        $scope.labels = $scope.datasource.labels;
        $scope.series = $scope.datasource.series;
        $scope.data = $scope.datasource.data;

        if ($scope.data.length > 0) {
                $scope.showtypeshow = true;
        } else {
                $scope.showtypeshow = false;
        }

        $scope.chartType = "Line";
        $scope.showtype = "week";


        $scope.currentRunning = function () {
                var url = baseurl + '/sql/twitterrunning';
//                console.log(url);
                $http({
                        method: 'GET',
                        url: url
                }).then(function successCallback(response) {
                        $scope.curtotalContent = angular.copy(response.data);
                        $scope.changeDateFormat($scope.curtotalContent.data);

                        console.log($scope.curtotalContent.data);

                        $scope.selectedTask = $scope.curtotalContent.data[0][0];
                        $scope.filterKeywords = $scope.curtotalContent.data[0][1];
                        $scope.fromDate = $scope.curtotalContent.data[0][3];
                        $scope.location = $scope.curtotalContent.data[0][5];

                }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                });
        };

        $scope.currentRunning();


        $scope.generateGraph = function () {

                $scope.loading = true;
                $scope.datahouse = [];
                $scope.datasource.series.length = 0;
                $scope.datasource.labels.length = 0;
                $scope.datasource.data.length = 0;

                var from = moment($scope.fromDate, "MM-DD-YYYY HH:mm:ss").clone().tz(timezone);
                var to = moment($scope.toDate, "MM-DD-YYYY HH:mm:ss").clone().tz(timezone);

                var filterTweetsUrl = charturl + 'fiterKeywords='
                        + $scope.filterKeywords + "&fromDate="
                        + from.format("MM-DD-YYYY HH:mm:ss").toString() + "&toDate="
                        + to.format("MM-DD-YYYY HH:mm:ss").toString() + "&location="
                        + $scope.location + '&server='
                        + $scope.selectedServer + "&id="
                        + $scope.selectedTask + "&timezone="
                        + $scope.clientTimezone;
                
//                var filterTweetsUrl = charturl + 'fiterKeywords='
//                        + $scope.filterKeywords + "&fromDate="
//                        + from.format("MM-DD-YYYY HH:mm:ss").toString() + "&toDate="
//                        + to.format("MM-DD-YYYY HH:mm:ss").toString() + "&location="
//                        + $scope.location + '&server='
//                        + $scope.selectedServer + "&id="
//                        + 18 + "&timezone="
//                        + $scope.clientTimezone;


                console.log(filterTweetsUrl);
                $http({
                        method: 'GET',
                        url: filterTweetsUrl
                }).then(function successCallback(response) {
                        $scope.showtypeshow = true;
                        console.log(response.data);
                        $scope.datahouse = response.data;
                        $scope.datasource.series.length = 0;
                        $scope.datasource.labels.length = 0;
                        $scope.datasource.data.length = 0;
                        var data = $scope.datahouse;
                        $scope.datasource.series.push(data.series);

                        if ($scope.showtype === 'hour') {
                                if ($scope.locationType === 'inLocUnknown') {
                                        for (i = 0; i < data.hour.labels.length; ++i)
                                                $scope.datasource.labels.push(data.hour.labels[i]);
                                        $scope.datasource.data.push(data.hour.data);
                                }
                        }
                        if ($scope.showtype === 'day') {
                                if ($scope.locationType === 'inLocUnknown') {
                                        for (i = 0; i < data.day.labels.length; ++i)
                                                $scope.datasource.labels.push(data.day.labels[i]);
                                        $scope.datasource.data.push(data.day.data);
                                }
                        }
                        if ($scope.showtype === 'week') {
                                if ($scope.locationType === 'inLocUnknown') {
                                        for (i = 0; i < data.week.labels.length; ++i)
                                                $scope.datasource.labels.push(data.week.labels[i]);
                                        $scope.datasource.data.push(data.week.data);
                                }
                                if ($scope.locationType === 'inLoc') {
                                        for (i = 0; i < data.inLocationWeek.labels.length; ++i)
                                                $scope.datasource.labels.push(data.inLocationWeek.labels[i]);
                                        $scope.datasource.data.push(data.inLocationWeek.data);
                                }
                                if ($scope.locationType === 'unknown') {
                                        for (i = 0; i < data.unKnownWeek.labels.length; ++i)
                                                $scope.datasource.labels.push(data.unKnownWeek.labels[i]);
                                        $scope.datasource.data.push(data.unKnownWeek.data);
                                }
                        } else if ($scope.showtype === 'month') {
                                if ($scope.locationType === 'inLocUnknown') {
                                        for (i = 0; i < data.month.labels.length; ++i)
                                                $scope.datasource.labels.push(data.month.labels[i]);
                                        $scope.datasource.data.push(data.month.data);
                                }
                                if ($scope.locationType === 'inLoc') {
                                        for (i = 0; i < data.inLocationMonth.labels.length; ++i)
                                                $scope.datasource.labels.push(data.inLocationMonth.labels[i]);
                                        $scope.datasource.data.push(data.inLocationMonth.data);
                                }
                                if ($scope.locationType === 'unknown') {
                                        for (i = 0; i < data.unKnownMonth.labels.length; ++i)
                                                $scope.datasource.labels.push(data.unKnownMonth.labels[i]);
                                        $scope.datasource.data.push(data.unKnownMonth.data);
                                }
                        } else if ($scope.showtype === 'year') {
                                if ($scope.locationType === 'inLocUnknown') {
                                        for (i = 0; i < data.year.labels.length; ++i)
                                                $scope.datasource.labels.push(data.year.labels[i]);
                                        $scope.datasource.data.push(data.year.data);
                                }
                                if ($scope.locationType === 'inLoc') {
                                        for (i = 0; i < data.inLocationYear.labels.length; ++i)
                                                $scope.datasource.labels.push(data.inLocationYear.labels[i]);
                                        $scope.datasource.data.push(data.inLocationYear.data);
                                }
                                if ($scope.locationType === 'unknown') {
                                        for (i = 0; i < data.unKnownYear.labels.length; ++i)
                                                $scope.datasource.labels.push(data.unKnownYear.labels[i]);
                                        $scope.datasource.data.push(data.unKnownYear.data);
                                }
                        }
                        $scope.loading = false;
                        $scope.tweetsReturnCount = 0;
                        for (var i = 0; i < $scope.datahouse.year.data.length; ++i) {
                                $scope.tweetsReturnCount += $scope.datahouse.year.data[i];
                        }

                }, function errorCallback(response) {
                        console.log(response);
                });
        };




        $scope.typeChanged = function () {
                if ($scope.datasource.series.length == 0)
                        return;

                $scope.datasource.series.length = 0;
                $scope.datasource.labels.length = 0;
                $scope.datasource.data.length = 0;
                var data = $scope.datahouse;
                $scope.datasource.series.push(data.series);
                if ($scope.showtype === 'hour') {
                        if ($scope.locationType === 'inLocUnknown') {
                                for (i = 0; i < data.hour.labels.length; ++i)
                                        $scope.datasource.labels.push(data.hour.labels[i]);
                                $scope.datasource.data.push(data.hour.data);
                        }
                }
                if ($scope.showtype === 'day') {
                        if ($scope.locationType === 'inLocUnknown') {
                                for (i = 0; i < data.day.labels.length; ++i)
                                        $scope.datasource.labels.push(data.day.labels[i]);
                                $scope.datasource.data.push(data.day.data);
                        }
                }
                if ($scope.showtype === 'week') {
                        if ($scope.locationType === 'inLocUnknown') {
                                for (i = 0; i < data.week.labels.length; ++i)
                                        $scope.datasource.labels.push(data.week.labels[i]);
                                $scope.datasource.data.push(data.week.data);
                        }
                        if ($scope.locationType === 'inLoc') {
                                for (i = 0; i < data.inLocationWeek.labels.length; ++i)
                                        $scope.datasource.labels.push(data.inLocationWeek.labels[i]);
                                $scope.datasource.data.push(data.inLocationWeek.data);
                        }
                        if ($scope.locationType === 'unknown') {
                                for (i = 0; i < data.unKnownWeek.labels.length; ++i)
                                        $scope.datasource.labels.push(data.unKnownWeek.labels[i]);
                                $scope.datasource.data.push(data.unKnownWeek.data);
                        }
                } else if ($scope.showtype === 'month') {
                        if ($scope.locationType === 'inLocUnknown') {
                                for (i = 0; i < data.month.labels.length; ++i)
                                        $scope.datasource.labels.push(data.month.labels[i]);
                                $scope.datasource.data.push(data.month.data);
                        }
                        if ($scope.locationType === 'inLoc') {
                                for (i = 0; i < data.inLocationMonth.labels.length; ++i)
                                        $scope.datasource.labels.push(data.inLocationMonth.labels[i]);
                                $scope.datasource.data.push(data.inLocationMonth.data);
                        }
                        if ($scope.locationType === 'unknown') {
                                for (i = 0; i < data.unKnownMonth.labels.length; ++i)
                                        $scope.datasource.labels.push(data.unKnownMonth.labels[i]);
                                $scope.datasource.data.push(data.unKnownMonth.data);
                        }
                } else if ($scope.showtype === 'year') {
                        if ($scope.locationType === 'inLocUnknown') {
                                for (i = 0; i < data.year.labels.length; ++i)
                                        $scope.datasource.labels.push(data.year.labels[i]);
                                $scope.datasource.data.push(data.year.data);
                        }
                        if ($scope.locationType === 'inLoc') {
                                for (i = 0; i < data.inLocationYear.labels.length; ++i)
                                        $scope.datasource.labels.push(data.inLocationYear.labels[i]);
                                $scope.datasource.data.push(data.inLocationYear.data);
                        }
                        if ($scope.locationType === 'unknown') {
                                for (i = 0; i < data.unKnownYear.labels.length; ++i)
                                        $scope.datasource.labels.push(data.unKnownYear.labels[i]);
                                $scope.datasource.data.push(data.unKnownYear.data);
                        }
                }


        };

















        $scope.changeDateFormat = function (items) {
                if (items === undefined)
                        return;
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

        $scope.myFromDateValidator = function (date) {
                if (date === undefined)
                        return false;
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

});
