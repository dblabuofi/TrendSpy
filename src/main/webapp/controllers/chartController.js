angular.module("myApp").controller('chartController', function ($scope, $http, $interval, $window, $location, $timeout, url, chartFactory) {
        var baseurl = url.url + '/FacebookCrawlerWS';
        var timezone = url.timezone;
        $scope.content = {};
        $scope.full = {};
        $scope.collapsed = {};

        $scope.canvasStyle = {width: '1000px'};
        
        $scope.locationType = "inLocUnknown";
        
        $scope.isCollapsed = "true";
        
        $scope.items = [];
        
        $scope.datasource = chartFactory.datasource;

        $scope.labels = $scope.datasource.labels;
        $scope.series = $scope.datasource.series;
        $scope.data = $scope.datasource.data;
        
        if ($scope.data.length > 0) {
                $scope.showtypeshow = true;
        } else {
                $scope.showtypeshow = false;
        }
        
        $scope.chartType = chartFactory.chartType;
        $scope.chartTypeChange = function() {
                chartFactory.chartType = $scope.chartType;
        }
        $scope.showtype = chartFactory.showType;
        
        $scope.datahouse = chartFactory.datahouse;
        var url = baseurl + '/chart/twitterfilterchart?';
        $scope.selectedID = null;


        $scope.pieData = [];
        $scope.pieLabel = ['total', 'inLoc', 'unknown'];
        $scope.canvasType = 'Pie';


          $scope.filterKeywords = "";
        $scope.fromDate = "";
        $scope.toDate = "";
        $scope.location = "";

        $scope.loading = false;
        $scope.clientTimezone = moment.tz.guess();
        
        console.log(chartFactory);
        $scope.selectedTask = chartFactory.selectedTask;
        $scope.selectedServer = undefined;

        $scope.fromDate = chartFactory.fromDate;
        $scope.toDate = chartFactory.toDate;
        $scope.filterKeywords = chartFactory.filterKeywords;
        $scope.location = chartFactory.location;
        $scope.selectedServer = chartFactory.selectedServer;
         $scope.tweetsReturnCount = chartFactory.tweetsReturnCount;
        console.log(chartFactory);
        
        $scope.history = function () {
                var url = baseurl + '/sql/twitterhistory';
                console.log(url);
                $http({
                        method: 'GET',
                        url: url
                }).then(function successCallback(response) {
                        console.log(response.data);
                        var collection = response.data;
                        $scope.selectedServer = collection.data[0][6];
                        console.log($scope.selectedTask);
                        $scope.items = [];
                        for (var i = 0; i < collection.data.length; ++i) {
                                var item = {};
                                for (var j = 0; j < collection.titles.length; ++j) {
                                        if (j >= 3 && j < 5) {
                                                var date = moment(collection.data[i][j].toString(), 'MM-DD-YYYY HH:mm:ssZ');
                                                item[collection.titles[j]] = date.local().format('MM-DD-YYYY HH:mm:ssZ');
                                        } else {
                                                item[collection.titles[j]] = collection.data[i][j];
                                        }
                                }
                                item.text = "ID:" + item.id +
                                        " Keywords:" + item.keywords +
                                        " Numofposts:" + item.numofposts +
                                        " StartDate:" + item.startDate.substring(0, 19) +
                                        " EndDate:" + item.endDate.substring(0, 19) +
                                        " Location:" + item.location;
                                $scope.items.push(item);
                        }
                        if (chartFactory.selectedTask == -1) {
                                $scope.selectedTask = collection.data[0][0];
                                chartFactory.selectedTask = $scope.selectedTask;
                                $scope.selctionChanged();
                                chartFactory.fromDate = $scope.fromDate;
                                chartFactory.toDate = $scope.toDate;
                                chartFactory.filterKeywords = $scope.filterKeywords;
                                chartFactory.location = $scope.location;
                                chartFactory.selectedServer = $scope.selectedServer;
                        }
                        
                                //filterTweets
                        }, function errorCallback(response) {
                });
        };
         $scope.history(); 
        
         
        $scope.selctionChanged = function () {
                chartFactory.selectedTask = $scope.selectedTask;
                var index = indexofItems($scope.items, $scope.selectedTask);
                $scope.fromDate = $scope.items[index].startDate.substring(0, 19);
                $scope.toDate = $scope.items[index].endDate.substring(0, 19);
                $scope.filterKeywords = $scope.items[index].keywords;
                $scope.location = $scope.items[index].location;
                $scope.selectedServer = $scope.items[index].servername;
        }

        function indexofItems(items, id) {
                for (var i = 0; i < items.length; ++i) {
                        if (items[i].id == id) {
                                return i;
                        }
                }
                return -1;
        }

        
        
        
        $scope.generateGraph = function () {
                
                chartFactory.fromDate = $scope.fromDate;
                chartFactory.toDate = $scope.toDate;
                chartFactory.filterKeywords = $scope.filterKeywords;
                chartFactory.location = $scope.location;
                chartFactory.selectedServer = $scope.selectedServer;
                
                
                
                $scope.loading = true;
                $scope.datahouse = [];
                $scope.datasource.series.length = 0;
                $scope.datasource.labels.length = 0;
                $scope.datasource.data.length = 0;

              var from = moment($scope.fromDate, "MM-DD-YYYY HH:mm:ss").clone().tz(timezone);
                var to = moment($scope.toDate, "MM-DD-YYYY HH:mm:ss").clone().tz(timezone);

                var filterTweetsUrl = url + 'fiterKeywords='
                        + $scope.filterKeywords + "&fromDate=" 
                        + from.format("MM-DD-YYYY HH:mm:ss").toString() +"&toDate=" 
                        + to.format("MM-DD-YYYY HH:mm:ss").toString() + "&location=" 
                        + $scope.location + '&server='
                        + $scope.selectedServer + "&id=" 
                        + $scope.selectedTask + "&timezone="
                        + $scope.clientTimezone; 
                console.log(filterTweetsUrl);
                $http({
                        method: 'GET',
                        url: filterTweetsUrl
                }).then(function successCallback(response) {
                        $scope.showtypeshow = true;
                        console.log(response.data);
                        $scope.datahouse = response.data;
                          chartFactory.datahouse = $scope.datahouse;
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
                          chartFactory.tweetsReturnCount = $scope.tweetsReturnCount;
                         chartFactory.datasource = $scope.datasource;
//            
//            var inLoc = $scope.full.data[id][10];
//            var unknown = $scope.full.data[id][11];
//            var outLoc = $scope.full.data[id][12];
//            var totalP = $scope.full.data[id][9];

                }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        console.log(response);
                });
        };

        $scope.typeChanged = function () {
                chartFactory.showType = $scope.showtype; 
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
                
                chartFactory.datasource = $scope.datasource;

        };

        $scope.show = true;
        $scope.buttonClick = function () {
                $scope.show = !$scope.show;
                if ($scope.show) {
                        var old = $scope.showtype;
                        if (old === 'week')
                                $scope.showtype = 'month';
                        else if (old == 'month')
                                $scope.showtype = 'year';
                        else
                                $scope.showtype = 'week';
                        $scope.typeChanged();
                        $timeout(function () {
                                $scope.showtype = old;
                                $scope.typeChanged();
                        }, 0);
                        $scope.canvasStyle = {width: '100%'};
                } else {
                        var old = $scope.showtype;
                        if (old === 'week')
                                $scope.showtype = 'month';
                        else if (old == 'month')
                                $scope.showtype = 'year';
                        else
                                $scope.showtype = 'week';
                        $scope.typeChanged();
                        $timeout(function () {
                                $scope.showtype = old;
                                $scope.typeChanged();
                        }, 0);
                        $scope.canvasStyle = {width: '110%'};
                }
        };

        $scope.showCanvas = true;

        $scope.colunmClick = function () {
                $scope.showColumn = !$scope.showColumn;
                $scope.showCanvas = !$scope.showCanvas;
                if ($scope.showColumn) {
                        $scope.content.data = $scope.full.data;
                        $scope.content.titles = $scope.full.titles;
                } else {
                        $scope.content.data = $scope.collapsed.data;
                        $scope.content.titles = $scope.collapsed.titles;
                }
        };

        $scope.save = function () {
                var canvas = document.querySelector('#canvas');
                var ctx = canvas.getContext('2d');
                console.log(canvas);
                var width = canvas.getAttribute("width");
                var height = canvas.getAttribute("height");
                var imgData = canvas.toDataURL(
                        'image/png', 1.0);
                var doc = new jsPDF('landscape');
                doc.addImage(imgData, 'PNG', 10, 10, 270, 190);
                var filename = $scope.datasource.series.toString();
                filename.replace(":", " ");
                doc.save(filename + ".pdf");
//                canvas.setAttribute("width", width);
//                canvas.setAttribute("height", height);
                
        };
        
        
        
             $scope.myFromDateValidator = function (date) {
                return moment(date, 'MM-DD-YYYY HH:mm:ss', true).isValid();
        }
        
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
        
        
        console.log($scope.filterKeywords);
});
