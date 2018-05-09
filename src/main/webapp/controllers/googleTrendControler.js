angular.module("myApp").controller('googleTrendControler', function ($scope, $http, $filter, url, $timeout) {

        String.prototype.replaceAll = function (search, replacement) {
                var target = this;
                return target.replace(new RegExp(search, 'g'), replacement);
        };

        $http.get('factories/Locations.json').success(function (data) {
                $scope.locationsbak = data;
//        console.log(data);
                $scope.locations = generateTypeaheadLocation(data.children, 'Worldwide', "");
//        console.log($scope.locations);
        });



        $scope.keywords = "";
        $scope.position = "";
        $scope.fromDate = "";

        $scope.keywords = "minds , birds";
        $scope.position = "Portland OR, Oregon, United States";
        $scope.fromDate = "07-31-2016";

//        $scope.toDate = moment().format("MM-DD-YYYY");
        $scope.toDate = "08-30-2016";
        $scope.trendResources = "";

        function generateTypeaheadLocation(data, firstName, firstID) {
                var location = [{name: firstName, id: firstID}];

                for (var i = 0; i < data.length; ++i) {
                        if (data[i].children === undefined) {
                                location.push({name: data[i].name, id: data[i].id});
                        } else if (Array.isArray(data[i].children) === true) {
                                location.push({name: data[i].name, id: data[i].id});
                                for (var j = 0; j < data[i].children.length; ++j) {
                                        if (Array.isArray(data[i].children[j].children) === true) {
                                                location.push({name: data[i].children[j].name + ", " + data[i].name, id: data[i].id + "-" + data[i].children[j].id});
                                                for (var k = 0; k < data[i].children[j].children.length; ++k) {
                                                        location.push({name: data[i].children[j].children[k].name + ", " + data[i].children[j].name + ", " + data[i].name,
                                                                id: data[i].id + "-" + data[i].children[j].id + "-" + data[i].children[j].children[k].id});
                                                }
                                        } else {
                                                location.push({name: data[i].children[j].name + ", " + data[i].name,
                                                        id: data[i].id + "-" + data[i].children[j].id});
                                        }
                                }
                        } else if (Array.isArray(data[i].children) === false) {
                                if (data[i].children !== undefined) {
                                        location.push({name: data[i].children.name + ", " + data[i].name, id: data[i].id + "-" + data[i].children.id});
                                }
                                for (var j = 0; j < data[i].children.length; ++j) {
                                        location.push({name: data[i].children[j].name + ", " + data[i].name, id: data[i].id + "-" + data[i].children[j].id});
                                }
                        } else {
                                location.push({name: data[i].name, id: data[i].id});
                        }
                }
                return location;
        }

        $scope.myFDateValidator = function (date) {
                if (moment(date, 'MM-DD-YYYY', true).isValid()) {
                        if (moment(date, 'MM-DD-YYYY', true) < moment("01-01-2008", 'MM-DD-YYYY', true)) {
                                return 'earliest date is 01-01-2008';
                        } else {
                                return true;
                        }
                } else {
                        return 'date like 01-01-2008, earliest date: 01-01-2008';
                }
        }

        $scope.myTDateValidator = function (fromDate, toDate) {

                if (fromDate != undefined && fromDate.length > 0) {
                        if (moment($scope.fromDate, "MM-DD-YYYY", true).isValid() == false) {
                                return 'Please fix fromDate format first!';
                        } else if (moment($scope.fromDate, "MM-DD-YYYY", true).isValid()) {
                                var from = moment($scope.fromDate, "MM-DD-YYYY");
                                var to = moment($scope.toDate, "MM-DD-YYYY");
                                if (from > to) {
                                        return 'from Date need before or equal to Date';
                                }
                        }
                }
                if (moment(toDate, 'MM-DD-YYYY', true).isValid()) {
//                if (moment(toDate, moment.ISO_8601).isValid()) {
                        return true;
                } else {

                        return 'date like 07-01-2016';
                }
        }
        
         $scope.myFromDateValidator = function (date) {
                 console.log(date);
                if (date === undefined) return false;
                return moment(date, 'MM-DD-YYYY', true).isValid();
        }

        $scope.myToDateValidator = function (fromDate, toDate) {

                if (fromDate != undefined && fromDate.length > 0) {
                        if (moment($scope.fromDate, "MM-DD-YYYY", true).isValid() == false) {
                                return 'Please fix fromDate format first!';
                        } else if (moment($scope.fromDate, "MM-DD-YYYY", true).isValid()) {
                                var from = moment($scope.fromDate, "MM-DD-YYYY");
                                var to = moment($scope.toDate, "MM-DD-YYYY");
                                if (from >= to) {
                                        return 'toDate need be after fromdate';
                                }
                                if (to.diff(from, 'days') > 30) {
                                        return 'maximum date range is 30 days';
                                }
                        }
                }
                if (moment(toDate, 'MM-DD-YYYY', true).isValid()) {
//                if (moment(toDate, moment.ISO_8601).isValid()) {
                        return true;
                } else {
                        return 'date like 07-01-2016 08:03:04';
                }
                
        }
        
        
        
        
        
        
        
        

        $scope.options = {legend: {display: true}};
        $scope.chartType = "line";
        $scope.data = [];
        $scope.labels = [];
        $scope.series = [];
        $scope.scaleValue = 10;
        //testing

        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
        ];
//    

        $scope.googleTrendChanged = function () {
                console.log($scope.chartType);
        }

        $scope.loading = 0;
        $scope.infoShow = false;
        $scope.submitGoogleTrend = function () {
                console.log($scope.keywords);
                console.log($scope.position);
                console.log($scope.fromDate);
                console.log($scope.toDate);
                console.log($scope.trendResources);
                $scope.loading = 1;
                
                var location = $filter('filter')($scope.locations, {name: $scope.position})[0].name;
                var id = $filter('filter')($scope.locations, {name: $scope.position})[0].id;
                $scope.scaleValue = 10;

                var keywords = $scope.keywords.replaceAll(",", "+");
//        var keywords = $scope.keywords;

//        var finurl = url.url + "/GoogleTrendWS/google?url=";
                var finurl = url.url + "/GoogleTrendWS/google?";
                var param = "q=" + encodeURIComponent(keywords);
                param += "&position=" + id;
                param += "&date=" + encodeURIComponent(moment($scope.fromDate, "MM-DD-YYYY").format("YYYY-MM-DD") + " " + moment($scope.toDate, "MM-DD-YYYY").format("YYYY-MM-DD"));
                param += "&grop=" + $scope.trendResources;
                param += "&location=" + location;
                finurl += encodeURI(param);
                console.log(finurl);

//        finurl = "http://localhost:8084/GoogleTrendWS/google/csv";

                $http({
                        method: 'GET',
//            url: escape(finurl)
                        url: finurl
                }).then(function successCallback(response) {
                        $scope.loading = 2;
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
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        $scope.loading = 2;
                        console.log(response);
                        if ($scope.data.length === 0) {
                                $scope.infoShow = true;

                                $timeout(function () {
                                        $scope.infoShow = false;
                                }, 3000);

                        }
                });

                $scope.closeAlert = function () {
                        $scope.infoShow = false;
                }


        }


        $scope.slider = {
                options: {
                        orientation: 'horizontal',
                        min: 0,
                        max: 255,
                        range: 'min',
                        stop: function (event, ui) {
                                console.info('Slider stop');
                                console.info($scope.scaleValue);
                                console.log($scope.data);
                                
                                var finurl = url.url + "/GoogleTrendWS/google/updateSmoothData?";
                                var param = "data=" + JSON.stringify($scope.data);
                                param += "&scale=" + $scope.scaleValue;
                                finurl += param;
                                console.log(finurl);
                                $http({
                                        method: 'GET',
                                        url: finurl
                                }).then(function successCallback(response) {
                                        var data = response.data;
                                        console.log(data);
                                        $scope.data = data;
                                }, function errorCallback(response) {
                                });
                        },
                }
        }

});

