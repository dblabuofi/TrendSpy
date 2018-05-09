angular.module("myApp").controller('queryController', function ($scope, $timeout, $filter, $uibModal, $interval, $http, $location, url, locationservice, $uibModal, $mdDialog) {
    $scope.querySelect = {
        value: ""
    };
    var timezone = url.timezone;
    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    $http.get('factories/Locations.json').success(function (data) {
        $scope.locationsbak = data;
        $scope.locations = generateTypeaheadLocation(data.children, 'Worldwide', "");
    });
    $scope.trendResources = "";

    $scope.template = {
        keywords: "",
        position: "",
        positionTwo: "",
        fromDate: "",
        toDate: "",
        eventStartDate: "",
        eventEndDate: "",
        trendResources: ""
    };

    $scope.lagTimeQuery = {
        keywords: "",
        position: "",
        positionTwo: "",
        fromDate: "",
        toDate: "",
        eventStartDate: "",
        eventEndDate: "",
        trendResources: ""
    };

    $scope.difCityQuery = {
        keywords: "",
        position: "",
        positionTwo: "",
        fromDate: "",
        toDate: "",
        eventStartDate: "",
        eventEndDate: "",
        trendResources: ""
    };


    $scope.google = {
        keywords: "",
        position: "",
        positionTwo: "",
        fromDate: "",
        toDate: "",
        eventStartDate: "",
        eventEndDate: "",
        trendResources: ""
    };

    $scope.twitter = {
        keywords: "",
        position: "",
        positionTwo: "",
        fromDate: "",
        toDate: "",
        eventStartDate: "",
        eventEndDate: "",
        trendResources: ""
    };

    $scope.compareQuery = {
        keywords: "",
        position: "",
        positionTwo: "",
        fromDate: "",
        toDate: "",
        eventStartDate: "",
        eventEndDate: "",
        trendResources: ""
    };

    $scope.updateQuery = function (newValue, oldValue) {
        console.log(newValue);
        console.log(oldValue);
        if (newValue === 'lagTime' && oldValue === 'ContrastImpact') {
            $scope.lagTimeQuery.keywords = $scope.difCityQuery.keywords;
            $scope.lagTimeQuery.position = $scope.difCityQuery.position;
            $scope.lagTimeQuery.positionTwo = $scope.difCityQuery.positionTwo;
            $scope.lagTimeQuery.fromDate = $scope.difCityQuery.fromDate;
            $scope.lagTimeQuery.toDate = $scope.difCityQuery.toDate;
            $scope.lagTimeQuery.eventStartDate = $scope.difCityQuery.eventStartDate;
            $scope.lagTimeQuery.eventEndDate = $scope.difCityQuery.eventEndDate;
        } else if (newValue === 'lagTime' && oldValue === 'contrastDifferentCity') {
            if ($scope.similiarOption.value === 'google') {
                $scope.lagTimeQuery.keywords = $scope.google.keywords;
                $scope.lagTimeQuery.position = $scope.google.position;
                $scope.lagTimeQuery.positionTwo = $scope.google.positionTwo;
                $scope.lagTimeQuery.fromDate = $scope.google.fromDate;
                $scope.lagTimeQuery.toDate = $scope.google.toDate;
                $scope.lagTimeQuery.eventStartDate = $scope.google.eventStartDate;
                $scope.lagTimeQuery.eventEndDate = $scope.google.eventEndDate;
            } else {
                $scope.lagTimeQuery.keywords = $scope.twitter.keywords;
                $scope.lagTimeQuery.position = $scope.twitter.position;
                $scope.lagTimeQuery.positionTwo = $scope.twitter.positionTwo;
                $scope.lagTimeQuery.fromDate = $scope.twitter.fromDate.substring(0, 11);
                $scope.lagTimeQuery.toDate = $scope.twitter.toDate.substring(0, 11);
                $scope.lagTimeQuery.eventStartDate = $scope.twitter.eventStartDate;
                $scope.lagTimeQuery.eventEndDate = $scope.twitter.eventEndDate;
            }
        } else if (newValue === 'ContrastImpact' && oldValue === 'lagTime') {
            $scope.difCityQuery.keywords = $scope.lagTimeQuery.keywords;
            $scope.difCityQuery.position = $scope.lagTimeQuery.position;
            $scope.difCityQuery.positionTwo = $scope.lagTimeQuery.positionTwo;
            $scope.difCityQuery.fromDate = $scope.lagTimeQuery.fromDate;
            $scope.difCityQuery.toDate = $scope.lagTimeQuery.toDate;
            $scope.difCityQuery.eventStartDate = $scope.lagTimeQuery.eventStartDate;
            $scope.difCityQuery.eventEndDate = $scope.lagTimeQuery.eventEndDate;
        } else if (newValue === 'ContrastImpact' && oldValue === 'contrastDifferentCity') {
            if ($scope.similiarOption.value === 'google') {
                $scope.difCityQuery.keywords = $scope.google.keywords;
                $scope.difCityQuery.position = $scope.google.position;
                $scope.difCityQuery.positionTwo = $scope.google.positionTwo;
                $scope.difCityQuery.fromDate = $scope.google.fromDate;
                $scope.difCityQuery.toDate = $scope.google.toDate;
                $scope.difCityQuery.eventStartDate = $scope.google.eventStartDate;
                $scope.difCityQuery.eventEndDate = $scope.google.eventEndDate;
            } else {
                $scope.difCityQuery.keywords = $scope.twitter.keywords;
                $scope.difCityQuery.position = $scope.twitter.position;
                $scope.difCityQuery.positionTwo = $scope.twitter.positionTwo;
                $scope.difCityQuery.fromDate = $scope.twitter.fromDate.substring(0, 11);
                $scope.difCityQuery.toDate = $scope.twitter.toDate.substring(0, 11);
                $scope.difCityQuery.eventStartDate = $scope.twitter.eventStartDate;
                $scope.difCityQuery.eventEndDate = $scope.twitter.eventEndDate;
            }
        } else if (newValue === 'contrastDifferentCity' && oldValue === 'lagTime') {
            if ($scope.similiarOption.value === 'google') {
                $scope.google.keywords = $scope.lagTimeQuery.keywords;
                $scope.google.position = $scope.lagTimeQuery.position;
                $scope.google.positionTwo = $scope.lagTimeQuery.positionTwo;
                $scope.google.fromDate = $scope.lagTimeQuery.fromDate;
                $scope.google.toDate = $scope.lagTimeQuery.toDate;
                $scope.google.eventStartDate = $scope.lagTimeQuery.eventStartDate;
                $scope.google.eventEndDate = $scope.lagTimeQuery.eventEndDate;
            } else {
                $scope.twitter.keywords = $scope.lagTimeQuery.keywords;
                $scope.twitter.position = $scope.lagTimeQuery.position;
                $scope.twitter.positionTwo = $scope.lagTimeQuery.positionTwo;
                $scope.twitter.fromDate = moment().add(1, 'minutes').format("MM-DD-YYYY HH:mm:ss");
                ;
                $scope.twitter.toDate = moment().add(1, 'minutes').format("MM-DD-YYYY HH:mm:ss");
                ;
                $scope.twitter.eventStartDate = $scope.lagTimeQuery.eventStartDate;
                $scope.twitter.eventEndDate = $scope.lagTimeQuery.eventEndDate;
            }
        } else if (newValue === 'contrastDifferentCity' && oldValue === 'ContrastImpact') {
            if ($scope.similiarOption.value === 'google') {
                $scope.google.keywords = $scope.difCityQuery.keywords;
                $scope.google.position = $scope.difCityQuery.position;
                $scope.google.positionTwo = $scope.difCityQuery.positionTwo;
                $scope.google.fromDate = $scope.difCityQuery.fromDate;
                $scope.google.toDate = $scope.difCityQuery.toDate;
                $scope.google.eventStartDate = $scope.difCityQuery.eventStartDate;
                $scope.google.eventEndDate = $scope.difCityQuery.eventEndDate;
            } else {
                $scope.twitter.keywords = $scope.difCityQuery.keywords;
                $scope.twitter.position = $scope.difCityQuery.position;
                $scope.twitter.positionTwo = $scope.difCityQuery.positionTwo;
                $scope.twitter.fromDate = moment().add(1, 'minutes').format("MM-DD-YYYY HH:mm:ss");
                ;
                $scope.twitter.toDate = moment().add(1, 'minutes').format("MM-DD-YYYY HH:mm:ss");
                ;
                $scope.twitter.eventStartDate = $scope.difCityQuery.eventStartDate;
                $scope.twitter.eventEndDate = $scope.difCityQuery.eventEndDate;
            }
        }





    }

    $scope.loadTemplate = function () {
        if ($scope.querySelect.value === 'lagTime') {
            $scope.lagTimeQuery.keywords = $scope.template.keywords;
            $scope.lagTimeQuery.position = $scope.template.position;
            $scope.lagTimeQuery.positionTwo = $scope.template.positionTwo;
            $scope.lagTimeQuery.fromDate = $scope.template.fromDate;
            $scope.lagTimeQuery.toDate = $scope.template.toDate;
            $scope.lagTimeQuery.eventStartDate = $scope.template.eventStartDate;
            $scope.lagTimeQuery.eventEndDate = $scope.template.eventEndDate;
        } else if ($scope.querySelect.value === 'ContrastImpact') {
            $scope.difCityQuery.keywords = $scope.template.keywords;
            $scope.difCityQuery.position = $scope.template.position;
            $scope.difCityQuery.positionTwo = $scope.template.positionTwo;
            $scope.difCityQuery.fromDate = $scope.template.fromDate;
            $scope.difCityQuery.toDate = $scope.template.toDate;
            $scope.difCityQuery.eventStartDate = $scope.template.eventStartDate;
            $scope.difCityQuery.eventEndDate = $scope.template.eventEndDate;
        } else if ($scope.querySelect.value === 'contrastDifferentCity') {
            if ($scope.similiarOption.value === 'google') {
                $scope.google.keywords = $scope.template.keywords;
                $scope.google.position = $scope.template.position;
                $scope.google.positionTwo = $scope.template.positionTwo;
                $scope.google.fromDate = $scope.template.fromDate;
                $scope.google.toDate = $scope.template.toDate;
                $scope.google.eventStartDate = $scope.template.eventStartDate;
                $scope.google.eventEndDate = $scope.template.eventEndDate;
            } else if ($scope.similiarOption.value === 'twitter') {
                $scope.twitter.keywords = $scope.template.keywords;
                $scope.twitter.position = $scope.template.position;
                $scope.twitter.positionTwo = $scope.template.positionTwo;
                $scope.twitter.fromDate = "";
                $scope.twitter.toDate = "";
                $scope.twitter.eventStartDate = $scope.template.eventStartDate;
                $scope.twitter.eventEndDate = $scope.template.eventEndDate;
            }

        }
    }

    $scope.ClearQuery = function () {
        console.log($scope.querySelect);
        if ($scope.querySelect.value === 'lagTime') {
            $scope.lagTimeQuery.keywords = "";
            $scope.lagTimeQuery.position = "";
            $scope.lagTimeQuery.positionTwo = "";
            $scope.lagTimeQuery.fromDate = "";
            $scope.lagTimeQuery.toDate = "";
            $scope.lagTimeQuery.eventStartDate = "";
            $scope.lagTimeQuery.eventEndDate = "";
        } else if ($scope.querySelect.value === 'ContrastImpact') {
            $scope.difCityQuery.keywords = "";
            $scope.difCityQuery.position = "";
            $scope.difCityQuery.positionTwo = "";
            $scope.difCityQuery.fromDate = "";
            $scope.difCityQuery.toDate = "";
            $scope.difCityQuery.eventStartDate = ";"
            $scope.difCityQuery.eventEndDate = "";
        } else if ($scope.querySelect.value === 'contrastDifferentCity') {
            if ($scope.similiarOption.value === 'google') {
                $scope.google.keywords = "";
                $scope.google.position = "";
                $scope.google.positionTwo = "";
                $scope.google.fromDate = "";
                $scope.google.toDate = "";
                $scope.google.eventStartDate = "";
                $scope.google.eventEndDate = "";
            } else if ($scope.similiarOption.value === 'twitter') {
                $scope.twitter.keywords = "";
                $scope.twitter.position = "";
                $scope.twitter.positionTwo = "";
                $scope.twitter.fromDate = "";
                $scope.twitter.toDate = "";
                $scope.twitter.eventStartDate = "";
                $scope.twitter.eventEndDate = "";
            }

        }

    }

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
    $scope.myFromDateValidator = function (fromDate, toDate, eventType) {
        if (fromDate === undefined)
            return "Date like 07-01-2016";
        if (moment(fromDate, 'MM-DD-YYYY', true).isValid() === false) {
            return "Please fix Start Date format";
        }
        if (toDate !== null && toDate !== "") {
            if (moment(toDate, 'MM-DD-YYYY', true).isValid() === false) {
                return "Please fix End Date format";
            }
            var from = moment(fromDate, "MM-DD-YYYY");
            var to = moment(toDate, "MM-DD-YYYY");
            if (from >= to) {
                return 'toDate need be after fromdate';
            }
            if (eventType === 'pointEvent') {
                if (to.diff(from, 'days') > 120) {
                    return 'maximum date range is 120 days';
                }
            } else {
                if (to.diff(from, 'days') > 365) {
                    return 'maximum date range is 365 days';
                }
            }
        }
        return true;
    }
    $scope.myFromDateValidator2 = function (date) {
//                console.log('myFromDateValidator2');
//                console.log(date);
        if (date === undefined)
            return false;
        return moment(date, 'MM-DD-YYYY HH:ss:mm', true).isValid();
    }
    $scope.myToDateValidator = function (fromDate, toDate, eventType) {
//                console.log(fromDate);
//                console.log(toDate);
//        console.log(eventType);
        if (fromDate != undefined && fromDate.length > 0) {
//                        console.log('fromDate');
            if (moment(fromDate, "MM-DD-YYYY", true).isValid() == false) {
                return 'Please fix fromDate format first!';
            } else if (moment(fromDate, "MM-DD-YYYY", true).isValid()) {
                var from = moment(fromDate, "MM-DD-YYYY");
                var to = moment(toDate, "MM-DD-YYYY");
                if (from >= to) {
                    return 'toDate need be after fromdate';
                }
                if (eventType === 'pointEvent') {
                    if (to.diff(from, 'days') > 120) {
                        return 'maximum date range is 120 days';
                    }
                } else {
                    if (to.diff(from, 'days') > 365) {
                        return 'maximum date range is 365 days';
                    }
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
    $scope.myToDateValidator2 = function (fromDate, toDate) {
//                console.log('myToDateValidator2');
//                console.log(fromDate);
//                console.log(toDate);
        if (fromDate != undefined && fromDate.length > 0) {
//                        console.log('fromDate');
            if (moment(fromDate, "MM-DD-YYYY HH:ss:mm", true).isValid() == false) {
//                                console.log('fromDate1');
                return 'Please fix fromDate format first!';
            } else if (moment(fromDate, "MM-DD-YYYY HH:ss:mm", true).isValid()) {
//                                console.log('fromDate2');
                var from = moment(fromDate, "MM-DD-YYYY HH:ss:mm");
                var to = moment(toDate, "MM-DD-YYYY HH:ss:mm");
                if (from >= to) {
//                                        console.log('fromDate3');
                    return 'toDate need be after fromdate';
                }
                if (to.diff(from, 'days') > 120) {
//                                        console.log('fromDate4');
                    return 'maximum date range is 120 days';
                }
            }
        }
        if (moment(toDate, 'MM-DD-YYYY HH:ss:mm', true).isValid()) {
//                if (moment(toDate, moment.ISO_8601).isValid()) {
            return true;
        } else {
            return 'date like 07-01-2016 08:03:04';
        }

    }

    $scope.options = {
        legend: {display: true, datasetFill: false},
        scales: {
            xAxes: [{
                    color: 'blue',
                    ticks: {
                        fontColor: "black"
                    }
                }]
        }


    };

    $scope.chartType = "line";
    $scope.data = [];
    $scope.labels = [];
    $scope.series = [];
    $scope.scaleValue = 10;

    $scope.totalData = [];
    $scope.hideData = [];
    $scope.totalLabels = [];

    $scope.totalColors = ['#01579b',
        {// blue
            backgroundColor: "rgba(159,204,0, 0)",
            pointBackgroundColor: "rgba(233, 30, 99, 1)",
            pointHoverBackgroundColor: "rgba(233, 30, 99, 1)",
            borderColor: "rgba(233, 30, 99, 1)",
            pointBorderColor: '#fff',
            pointHoverBorderColor: "rgba(233, 30, 99, 1)"
        },
        '#009688',
        {// blue
            backgroundColor: "rgba(159,204,0, 0)",
            pointBackgroundColor: "rgba(0,0,0, 1)",
            pointHoverBackgroundColor: "rgba(0,0,0, 0.8)",
            borderColor: "rgba(0,0,0, 1)",
            pointBorderColor: '#fff',
            pointHoverBorderColor: "rgba(0,0,0, 1)"
        }];
    $scope.hideColors = ['#01579b', '#009688'];
    $scope.colors = $scope.totalColors;
    $scope.datasetOverride = [
        {
            type: 'line',
        },
        {
            type: 'line',
        },
        {
            type: 'line',
        },
        {
            type: 'line',
        }
    ];

    //testing
    $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $scope.data = [
        [65, -59, 80, 81, -56, 55, -40],
        [28, 48, -40, 19, 86, 27, 90],
        [48, 48, -40, 48, 28, 48, 9],
        [90, 90, 90, 90, 90, 90, 90]
    ];

    $scope.googleTrendChanged = function (chartType) {
        console.log(chartType);
//                var showTrendLine = document.getElementById('showTrendType').value;
        $scope.chartType = chartType;
        var showTrendLine = $scope.showTrendTime.value;
        console.log(showTrendLine);
        if (chartType === 'line' && showTrendLine === false) {
            $scope.datasetOverride = [
                {
                    type: 'line'
                },
                {
                    type: 'line'
                },
                {
                    type: 'line'
                },
                {
                    type: 'line'
                }
            ];
        } else if (chartType === 'bar' && showTrendLine === false) {
            $scope.datasetOverride = [
                {
                    type: 'bar',
                },
                {
                    type: 'line',
                },
                {
                    type: 'bar',
                },
                {
                    type: 'line',
                }
            ];
        } else if (chartType === 'line' && showTrendLine === true) {
            $scope.datasetOverride = [
                {
                    type: 'line',
                },
                {
                    type: 'line',
                },
                {
                    type: 'line',
                },
                {
                    type: 'line',
                }
            ];
        } else if (chartType === 'bar' && showTrendLine === true) {
            $scope.datasetOverride = [
                {
                    type: 'bar',
                },
                {
                    type: 'line',
                },
                {
                    type: 'bar',
                },
                {
                    type: 'line',
                }
            ];
        }


//                console.log($scope.chartType);
//                document.getElementById('lagTimeCanvas').setAttribute('chart-type', 'bar');

    }

    //lagtime 
    $scope.lagTime = "0";
    $scope.responsedEventDate = "00-00-0000";
    $scope.loading = 0;
    $scope.infoShow = false;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;
//    console.log(isChrome);
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
//    console.log(isFirefox);

    $scope.hasEvent = true;
    $scope.submitLagTime = function () {
        console.log('submitLagTime');
        if (isChrome && document.getElementsByName('lagTimeForm')[0].getAttribute('class').includes('ng-invalid') == true) {
            console.log('return');
            return;
        }
        if (isFirefox && document.getElementsByName('lagTimeForm')[0].getAttribute('class').indexOf('ng-invalid') > -1) {
            console.log('return');
            return;
        }

        $scope.lagTimeKeywords = $scope.lagTimeQuery.keywords;
        $scope.lagTimePosition = $scope.lagTimeQuery.position;
        $scope.lagTimeFromDate = $scope.lagTimeQuery.fromDate;
        $scope.lagTimeToDate = $scope.lagTimeQuery.toDate;
        $scope.eventStartDate = $scope.lagTimeQuery.eventStartDate;
        console.log($scope.lagTimeKeywords);
        console.log($scope.lagTimePosition);
        console.log($scope.lagTimeFromDate);
        console.log($scope.lagTimeToDate);
        console.log($scope.eventStartDate);

        //update options
        $scope.options.scales.xAxes[0].ticks.startDate = $scope.lagTimeQuery.eventStartDate;
        if ($scope.eventType.value === 'rangeEvent') {
            $scope.options.scales.xAxes[0].ticks.endDate = $scope.lagTimeQuery.eventEndDate;
        } else {
            $scope.options.scales.xAxes[0].ticks.endDate = null;

        }

        var location = $filter('filter')($scope.locations, {name: $scope.lagTimePosition})[0].name;
        var id = $filter('filter')($scope.locations, {name: $scope.lagTimePosition})[0].id;
        $scope.scaleValue = 10;

        var keywords = generateKeywords($scope.lagTimeKeywords);
        var finurl = url.url + "/GoogleTrendWS/google?";
        var param = "q=" + encodeURIComponent(keywords);
        param += "&position=" + id;
        param += "&date=" + encodeURIComponent(moment($scope.lagTimeFromDate, "MM-DD-YYYY").format("YYYY-MM-DD") + " " + moment($scope.lagTimeToDate, "MM-DD-YYYY").format("YYYY-MM-DD"));
        param += "&grop=" + $scope.trendResources;
        param += "&location=" + location;
        param += "&queryCatlog=" + 'lagTime';
        finurl += encodeURI(param);
        finurl += param;
        console.log(finurl);

        $scope.loading = 1;
//                //testing
//                $scope.loading = 2;
//                
//                var dataString = '{"labels":["07-31-2016","08-01-2016","08-02-2016","08-03-2016","08-04-2016","08-05-2016","08-06-2016","08-07-2016","08-08-2016","08-09-2016","08-10-2016","08-11-2016","08-12-2016","08-13-2016","08-14-2016","08-15-2016","08-16-2016","08-17-2016","08-18-2016","08-19-2016","08-20-2016","08-21-2016","08-22-2016","08-23-2016","08-24-2016","08-25-2016","08-26-2016","08-27-2016","08-28-2016","08-29-2016","08-30-2016"],"series":["mind + birds: (Portland OR)","smoothed"],"data":[[86,71,69,63,81,71,61,62,70,85,88,73,66,67,72,65,72,89,75,69,73,83,98,61,72,71,75,100,71,75,79],[70.92338168621063,71.16934943199158,71.41531717777252,71.66128492355347,71.90725266933441,72.15322041511536,72.3991881608963,72.64515590667725,72.89112365245819,73.13709139823914,73.38305914402008,73.62902688980103,73.87499463558197,74.12096238136292,74.36693012714386,74.6128978729248,74.85886561870575,75.1048333644867,75.35080111026764,75.59676885604858,75.84273660182953,76.08870434761047,76.33467209339142,76.58063983917236,76.82660758495331,77.07257533073425,77.3185430765152,77.56451082229614,77.81047856807709,78.05644631385803,78.30241405963898]]}';
//                var data = JSON.parse(dataString);
//                console.log(data);
//                $scope.data = data.data;
//                $scope.totalData = $scope.data;
//                $scope.hideData = [];
//                for (var i = 0; i < $scope.data.length; i += 2) {
//                    $scope.hideData.push($scope.data[i]);
//                }
//                $scope.labels = data.labels;
//                $scope.totalLabels = $scope.labels;
//                $scope.series = data.series;
//                
//                $scope.silder.min = 0;
//                $scope.silder.max = $scope.data[0].length - 1;
//                $scope.silder.lower = 0;
//                $scope.silder.upper = $scope.silder.max;

        $http({
            method: 'GET',
            url: finurl
        }).then(function successCallback(response) {
            console.log(response);
            var data = response.data;
            console.log(JSON.stringify(response.data));
            $timeout(function () {

                if (data.labels.length === 0) {
                    $scope.loading = 0;
                    $scope.infoShow = true;
                } else if ($scope.loading === 0) {
                    $scope.loading = 0;
                } else {
                    $scope.loading = 2;
                    $scope.data = data.data;
                    $scope.labels = data.labels;
                    $scope.totalLabels = $scope.labels;
                    $scope.series = data.series.map(function (obj) {
                        return obj.replace(/\"/g, '').replace(/\+/g, ',')
                    });
                    $scope.totalData = $scope.data;
                    $scope.hideData = [];
                    for (var i = 0; i < $scope.data.length; i += 2) {
                        $scope.hideData.push($scope.data[i]);
                    }

                    $scope.silder.min = 0;
                    $scope.silder.max = $scope.data[0].length - 1;
                    $scope.silder.lower = 0;
                    $scope.silder.upper = $scope.silder.max;

                    $timeout(function () {
                        --$scope.silder.upper;
                    }, 100);
                    $timeout(function () {
                        ++$scope.silder.upper;
                    }, 100);

                    //submit to get the lag time
                    console.log("submitted");
                    console.log($scope.eventStartDate);

                    var finurl = url.url + '/GoogleTrendWS/result/lagtimeWithoutId?';
                    finurl += "eventStartDate=" + $scope.eventStartDate;

                    console.log(finurl);
                    $http({
                        method: 'GET',
                        url: finurl
                    }).then(function successCallback(response) {
                        console.log("Lag Time");
                        console.log(response.data);

                        $scope.lagTime = response.data.daysBetween;
                        $scope.responsedEventDate = response.data.responsedEventDate;
                        console.log($scope.options);
                    }, function errorCallback(response) {
                        console.log("no event detected");
                        $scope.hasEvent = false;
                    });
                }
            }, 0);
        }, function errorCallback(response) {
            $scope.loading = 0;
            console.log(response);
            $scope.infoShow = true;

            $timeout(function () {
                $scope.infoShow = false;
            }, 10000);

        });

    }
    $scope.closeNoAlert = function () {
//        console.log('close');
        $scope.infoShow = false;
    }
    $scope.closeNoAlertTable = function () {
        console.log('close');
        $scope.infoShowTable = false;
    }

    $scope.closeAlertDone = function () {
        $scope.infoShowDone = false;
    }


    function generateKeywords(keywordsString) {
        var res = "";
        var keywordsArr = keywordsString.split(",");

        for (var i = 0; i < keywordsArr.length - 1; ++i) {
            res += "\"" + keywordsArr[i].trim() + "\"+"
        }
        res += "\"" + keywordsArr[keywordsArr.length - 1].trim() + "\"";
        return res;
    }


    //submit google trend    
    $scope.queryGoogleTrendFormKeywords = "";
    $scope.queryGoogleTrendFormPosition = "";
    $scope.queryGoogleTrendFormFromDate = "";
    $scope.queryGoogleTrendFormToDate = "";
    $scope.submitGoogleTrend = function () {
        if (document.getElementsByName('queryGoogleTrendForm')[0].getAttribute('class').indexOf('ng-invalid') > -1) {
            console.log('return');
            return;
        }

        $scope.trendResources = "";
        $scope.queryGoogleTrendFormKeywords = $scope.google.keywords;
        $scope.queryGoogleTrendFormPosition = $scope.google.position;
        $scope.queryGoogleTrendFormFromDate = $scope.google.fromDate;
        $scope.queryGoogleTrendFormToDate = $scope.google.toDate;

        console.log($scope.queryGoogleTrendFormKeywords);
        console.log($scope.queryGoogleTrendFormPosition);
        console.log($scope.queryGoogleTrendFormFromDate);
        console.log($scope.queryGoogleTrendFormToDate);
        console.log($scope.trendResources);

        var from = moment($scope.queryGoogleTrendFormFromDate, "MM-DD-YYYY").clone().tz(timezone);
        var to = moment($scope.queryGoogleTrendFormToDate, "MM-DD-YYYY").clone().tz(timezone);

        if (to.diff(from, 'days') > 365) {
            $scope.alertMessage.push(" maximum day range 365");
            return;
        }


        var location = $filter('filter')($scope.locations, {name: $scope.queryGoogleTrendFormPosition})[0].name;
        var id = $filter('filter')($scope.locations, {name: $scope.queryGoogleTrendFormPosition})[0].id;
        $scope.scaleValue = 10;

//        var keywords = $scope.queryGoogleTrendFormKeywords.replaceAll(",", "+");
        var keywords = generateKeywords($scope.queryGoogleTrendFormKeywords);
        var finurl = url.url + "/GoogleTrendWS/google?";
        var param = "q=" + encodeURIComponent(keywords);
        param += "&position=" + id;
        param += "&date=" + encodeURIComponent(moment($scope.queryGoogleTrendFormFromDate, "MM-DD-YYYY").format("YYYY-MM-DD") + " " + moment($scope.queryGoogleTrendFormToDate, "MM-DD-YYYY").format("YYYY-MM-DD"));
        param += "&grop=" + $scope.trendResources;
        param += "&location=" + location;
        param += "&queryCatlog=" + 'Similar Events';
        finurl += encodeURI(param);
        console.log(finurl);

        $scope.loading = 1;
//                //testing
//                $scope.loading = 2;
        $http({
            method: 'GET',
            url: finurl
        }).then(function successCallback(response) {
            $scope.loading = 2;
            console.log(response);
            var data = response.data;

            $timeout(function () {

                if (data.labels.length === 0) {
                    $scope.loading = 0;
                    $scope.infoShow = true;
                } else {
                    $scope.data = data.data;
                    $scope.labels = data.labels;
                    $scope.totalLabels = $scope.labels;
                    $scope.series = data.series.map(function (obj) {
                        return obj.replace(/\"/g, '').replace(/\+/g, ',')
                    });
                    $scope.totalData = $scope.data;
                    $scope.hideData = [];
                    for (var i = 0; i < $scope.data.length; i += 2) {
                        $scope.hideData.push($scope.data[i]);
                    }

                    $scope.silder.min = 0;
                    $scope.silder.max = $scope.data[0].length - 1;
                    $scope.silder.lower = 0;
                    $scope.silder.upper = $scope.silder.max;

                    $timeout(function () {
                        --$scope.silder.upper;
                    }, 100);
                    $timeout(function () {
                        ++$scope.silder.upper;
                    }, 100);

                }
            }, 0);

            $scope.history();
        }, function errorCallback(response) {
            $scope.loading = 0;
            console.log(response);
            $scope.infoShow = true;

            $timeout(function () {
                $scope.infoShow = false;
            }, 10000);

        });

    }

    $scope.setquerySelect = function (value) {
        console.log(value)
        //clean
        if ($scope.querySelect.value != value) {

            $scope.data = [];
            $scope.labels = [];
            $scope.series = [];
            $scope.loading = 0;

            $scope.history();
            $scope.updateQuery(value, $scope.querySelect.value);
            $scope.querySelect.value = value;
            if (value === 'lagTime') {

            } else if (value === 'ContrastImpact') {

            } else if (value === 'contrastDifferentCity') {
//                $scope.history();
            }
        }
    }

    $scope.alertMessage = [];
    $scope.closeAlert = function (index) {
        $scope.alertMessage.splice(index, 1);
    }

    //Contrast Page one
    $scope.constrastKeywords = "";
    $scope.constrastPositionOne = "";
    $scope.constrastPositionTwo = "";
    $scope.constrastFromDate = "";
    $scope.constrastToDate = "";
    $scope.submitContrastImpact = function () {

        if (document.getElementsByName('constrastForm')[0].getAttribute('class').indexOf('ng-invalid') > -1) {
            return;
        }



//        $scope.constrastKeywords = document.getElementById("ckeywords").value;
//        $scope.constrastPositionOne = document.getElementById("cpositionOne").value;
//        $scope.constrastPositionTwo = document.getElementById("cpositionTwo").value;
//        $scope.constrastFromDate = document.getElementById("cfromDate").value;
//        $scope.constrastToDate = document.getElementById("ctoDate").value;
        $scope.trendResources = "";
        $scope.constrastKeywords = $scope.difCityQuery.keywords;
        $scope.constrastPositionOne = $scope.difCityQuery.position;
        $scope.constrastPositionTwo = $scope.difCityQuery.positionTwo;
        $scope.constrastFromDate = $scope.difCityQuery.fromDate;
        $scope.constrastToDate = $scope.difCityQuery.toDate;
        $scope.difCityQuery.eventStartDate;
        $scope.difCityQuery.eventEndDate;

        console.log($scope.constrastKeywords);
        console.log($scope.constrastPositionOne);
        console.log($scope.constrastPositionTwo);
        console.log($scope.constrastFromDate);
        console.log($scope.constrastToDate);

        $scope.options.scales.xAxes[0].ticks.startDate = $scope.difCityQuery.eventStartDate;
        if ($scope.const.eventType === 'rangeEvent') {
            $scope.options.scales.xAxes[0].ticks.endDate = $scope.difCityQuery.eventEndDate;
        } else {
            $scope.options.scales.xAxes[0].ticks.endDate = null;

        }


        var from = moment($scope.constrastFromDate, "MM-DD-YYYY").clone().tz(timezone);
        var to = moment($scope.constrastToDate, "MM-DD-YYYY").clone().tz(timezone);

        if (to.diff(from, 'days') > 365) {
            $scope.alertMessage.push(" maximum day range 365");
            return;
        }
        var locationOne = $filter('filter')($scope.locations, {name: $scope.constrastPositionOne})[0].name;
        var locationTwo = $filter('filter')($scope.locations, {name: $scope.constrastPositionTwo})[0].name;
        var locationOneID = $filter('filter')($scope.locations, {name: $scope.constrastPositionOne})[0].id;
        var locationTwoID = $filter('filter')($scope.locations, {name: $scope.constrastPositionTwo})[0].id;
        console.log(locationOneID);
        console.log(locationTwoID);
        var keywords = generateKeywords($scope.constrastKeywords);
        var finurl = url.url + "/GoogleTrendWS/google/contrast?";
        var param = "q=" + encodeURIComponent(keywords);
        param += "&date=" + encodeURIComponent(moment($scope.constrastFromDate, "MM-DD-YYYY").format("YYYY-MM-DD") + " " + moment($scope.constrastToDate, "MM-DD-YYYY").format("YYYY-MM-DD"));
        param += "&grop=" + $scope.trendResources;
        param += "&locationOne=" + locationOne;
        param += "&locationOneID=" + locationOneID;
        param += "&locationTwo=" + locationTwo;
        param += "&locationTwoID=" + locationTwoID;
        param += "&resource=" + $scope.trendResources;
        param += "&queryCatlog=" + 'two Cities';
        finurl += encodeURI(param);
        console.log(finurl);

        $scope.loading = 1;
        //test
//                 $scope.loading = 2;
//                var dataString = '{"labels":["07-31-2016","08-01-2016","08-02-2016","08-03-2016","08-04-2016","08-05-2016","08-06-2016","08-07-2016","08-08-2016","08-09-2016","08-10-2016","08-11-2016","08-12-2016","08-13-2016","08-14-2016","08-15-2016","08-16-2016","08-17-2016","08-18-2016","08-19-2016","08-20-2016","08-21-2016","08-22-2016","08-23-2016","08-24-2016","08-25-2016","08-26-2016","08-27-2016","08-28-2016","08-29-2016","08-30-2016"],"series":["mind + birds: (Portland OR)","smoothed"],"data":[[86,71,69,63,81,71,61,62,70,85,88,73,66,67,72,65,72,89,75,69,73,83,98,61,72,71,75,100,71,75,79],[70.92338168621063,71.16934943199158,71.41531717777252,71.66128492355347,71.90725266933441,72.15322041511536,72.3991881608963,72.64515590667725,72.89112365245819,73.13709139823914,73.38305914402008,73.62902688980103,73.87499463558197,74.12096238136292,74.36693012714386,74.6128978729248,74.85886561870575,75.1048333644867,75.35080111026764,75.59676885604858,75.84273660182953,76.08870434761047,76.33467209339142,76.58063983917236,76.82660758495331,77.07257533073425,77.3185430765152,77.56451082229614,77.81047856807709,78.05644631385803,78.30241405963898]]}';
//                var data = JSON.parse(dataString);
//                console.log(data);
//                $scope.data = data.data;
//                $scope.totalData = $scope.data;
//                $scope.hideData = [];
//                for (var i = 0; i < $scope.data.length; i += 2) {
//                    $scope.hideData.push($scope.data[i]);
//                }
//                $scope.labels = data.labels;
//                $scope.totalLabels = $scope.labels;
//                $scope.series = data.series;
//                
//                $scope.silder.min = 0;
//                $scope.silder.max = $scope.data[0].length - 1;
//                $scope.silder.lower = 0;
//                $scope.silder.upper = $scope.silder.max;

//                



        $http({
            method: 'GET',
            url: finurl
        }).then(function successCallback(response) {
            $scope.loading = 2;
            console.log(response);
            var data = response.data;
            $timeout(function () {

                if (data.labels.length === 0) {
                    $scope.loading = 0;
                    $scope.infoShow = true;
                } else {
                    $scope.data = data.data;
                    $scope.labels = data.labels;
                    $scope.totalLabels = $scope.labels;
                    $scope.series = data.series.map(function (obj) {
                        return obj.replace(/\"/g, '').replace(/\+/g, ',')
                    });
                    $scope.totalData = $scope.data;
                    $scope.hideData = [];
                    for (var i = 0; i < $scope.data.length; i += 2) {
                        $scope.hideData.push($scope.data[i]);
                    }

                    $scope.silder.min = 0;
                    $scope.silder.max = $scope.data[0].length - 1;
                    $scope.silder.lower = 0;
                    $scope.silder.upper = $scope.silder.max;

                    $timeout(function () {
                        --$scope.silder.upper;
                    }, 100);
                    $timeout(function () {
                        ++$scope.silder.upper;
                    }, 100);


                }
            }, 0);
        }, function errorCallback(response) {
            $scope.loading = 0;
            console.log(response);
            if ($scope.data.length === 0) {
                $scope.infoShow = true;

                $timeout(function () {
                    $scope.infoShow = false;
                }, 10000);

            }
        });

    }

    $scope.showResourceType = {
        value: "GoogleTrend"
    }

    $scope.showResourceTypeChange = function () {
        if ($scope.showResourceType.value === 'GoogleTrend') {
            $scope.full.data = $scope.googleTrendData;
        } else {
            $scope.full.data = $scope.TwitterData;
        }
        $scope.pageChanged();
        $scope.selectedID = null;
        $scope.selectedIDPre = null;
    };

    //Contrast page two
    $scope.similiarOption = {
        value: "google"
    };
    //history
    $scope.queryItemPerPage = 10;
    $scope.curPage = 1;
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

    $scope.googleTrendData = [];
    $scope.TwitterData = [];

    $scope.runHistory = false;
    var baseurl = url.url + "/FacebookCrawlerWS";
    $scope.history = function () {
        $scope.runHistory = true;

        var url = baseurl + '/sql/twitterhistory';
//                console.log(url);
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            console.log("history");
//            console.log(response.data);
            $scope.totalContent = angular.copy(response.data);
            $scope.changeDateFormat($scope.totalContent.data);
//                        $scope.full.data = split($scope.totalContent.data, $scope.queryItemPerPage)[0];
            $scope.full.data = $scope.totalContent.data;
            $scope.full.titles = response.data.titles;
//            if ($scope.full.titles !== undefined)
//                $scope.full.titles.splice(6, 1);
//                        $scope.full.titles = ['id', 'key', 'from', 'to', 'country', 'state', 'city', 'time', 'total', 'valid', 'inloc', 'unknown', 'outloc'];
            $scope.full.titles[0] = 'Serial ID';
            //split data, google trend and twitter crawler
            $scope.googleTrendData = $filter('filter')($scope.full.data, "GoogleTrend");
            $scope.TwitterData = $filter('filter')($scope.full.data, "Twitter Stream");
            if ($scope.showResourceType.value === 'GoogleTrend') {
                $scope.full.data = $scope.googleTrendData;
            } else {
                $scope.full.data = $scope.TwitterData;
            }
            $scope.content.data = split($scope.full.data, $scope.queryItemPerPage)[0];
            $scope.content.titles = $scope.full.titles;
            console.log($scope.content);
            $scope.runHistory = false;
        }, function errorCallback(response) {
        });
    };

//        $scope.history();
    $scope.pageChanged = function () {
//                $scope.queryItemPerPage = document.getElementById("queryItemPerPageID").value.replace(/^\D/g,'');
        $scope.queryItemPerPage = parseInt(document.getElementById("queryItemPerPageID").value.replace(/^\D+/g, ''));
        var splited = split($scope.full.data, $scope.queryItemPerPage);
//                console.log($scope.queryItemPerPage);
        $scope.content.data = splited[this.curPage - 1];
        console.log('Page changed to: ' + this.curPage);
    };
    $scope.changeDateFormat = function (items) {
        if (items === undefined)
            return;
        for (var i = 0; i < items.length; ++i) {
            for (var j = 4; j < 6; ++j) {
                var date = moment(items[i][j].toString(), 'MM-DD-YYYY HH:mm:ssZ');
                items[i][j] = date.local().format('MM-DD-YYYY HH:mm:ss');
            }
//            items[i].splice(6, 1);
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

    $scope.selectedID = null;
    $scope.selectedIDPre = null;
    $scope.tableclick = function (content) {

        //we clean the date
        $scope.options.scales.xAxes[0].ticks.startDate = null;
        $scope.options.scales.xAxes[0].ticks.endDate = null;
        $scope.infoShow = false;
        $scope.infoShowTable = false;


        $scope.selectedIDPre = $scope.selectedID;
        $scope.selectedID = content[0];
        $scope.selectedStartDate = content[3];
        $scope.selectedEndDate = content[4];
        $scope.selectedLocation = content[5];
        $scope.selectedSourceFrom = content[6];
        console.log(content);
        $scope.loading = 1;
        //show the result
        if ($scope.selectedID != null && $scope.selectedIDPre != null) {
            var finurl = url.url + "/GoogleTrendWS/result/CompareSimilarEvent?idOne=" + $scope.selectedID;
            finurl += "&idTwo=" + $scope.selectedIDPre;
            $http({
                method: 'GET',
                url: finurl
            }).then(function successCallback(response) {
                $scope.loading = 2;
                console.log(response);
                var data = response.data;
                $timeout(function () {

                    if (data.labels.length === 0) {
                        $scope.infoShow = true;
                    } else {
                        $scope.data = data.data;
                        $scope.labels = data.labels;
                        $scope.totalLabels = $scope.labels;
                        $scope.series = data.series.map(function (obj) {
                            return obj.replace(/\"/g, '').replace(/\+/g, ',')
                        });
                        $scope.totalData = $scope.data;
                        $scope.hideData = [];
                        for (var i = 0; i < $scope.data.length; i += 2) {
                            $scope.hideData.push($scope.data[i]);
                        }

                        $scope.silder.min = 0;
                        $scope.silder.max = $scope.data[0].length - 1;
                        $scope.silder.lower = 0;
                        $scope.silder.upper = $scope.silder.max;

                        $timeout(function () {
                            --$scope.silder.upper;
                        }, 100);
                        $timeout(function () {
                            ++$scope.silder.upper;
                        }, 100);




                    }
                }, 0);

            }, function errorCallback(response) {
                $scope.loading = 0;
                console.log(response);
                $scope.infoShowTable = true;

                $timeout(function () {
                    $scope.infoShowTable = false;
                }, 10000);

            });
        } else {
            $scope.loading = 0;
        }

    };
    $scope.selectedIDLog = null;
    $scope.tableclickShow = function (content) {

        //we clean the date
        $scope.options.scales.xAxes[0].ticks.startDate = null;
        $scope.options.scales.xAxes[0].ticks.endDate = null;
        $scope.infoShow = false;
        $scope.infoShowTable = false;

        $scope.selectedIDLog = content[0];
        $scope.selectedStartDate = content[3];
        $scope.selectedEndDate = content[4];
        $scope.selectedLocation = content[5];
        $scope.selectedSourceFrom = content[6];
        var sourceFrom = content[8];
//        console.log(content);
        $scope.loading = 1;
        //show the result
        if (sourceFrom != 'Twitter Stream') {
            var finurl = url.url + "/GoogleTrendWS/result/googleTrend?id=" + $scope.selectedIDLog;
            $http({
                method: 'GET',
                url: finurl
            }).then(function successCallback(response) {
                $scope.loading = 2;
                console.log(response);
                var data = response.data;
                $timeout(function () {

                    if (data.labels.length === 0) {
                        $scope.infoShow = true;
                        $scope.loading = 0;
                    } else {
                        $scope.data = data.data;
                        $scope.labels = data.labels;
                        $scope.totalLabels = $scope.labels;
                        $scope.series = data.series.map(function (obj) {
                            return obj.replace(/\"/g, '').replace(/\+/g, ',')
                        });
                        $scope.totalData = $scope.data;
                        $scope.hideData = [];
                        for (var i = 0; i < $scope.data.length; i += 2) {
                            $scope.hideData.push($scope.data[i]);
                        }

                        $scope.silder.min = 0;
                        $scope.silder.max = $scope.data[0].length - 1;
                        $scope.silder.lower = 0;
                        $scope.silder.upper = $scope.silder.max;

                        $timeout(function () {
                            --$scope.silder.upper;
                        }, 100);
                        $timeout(function () {
                            ++$scope.silder.upper;
                        }, 100);
                    }
                }, 0);

            }, function errorCallback(response) {
                $scope.loading = 0;
                console.log(response);
                $scope.infoShowTable = true;

                $timeout(function () {
                    $scope.infoShowTable = false;
                }, 10000);

            });
        } else {
            var clientTimezone = moment.tz.guess();
            var finurl = url.url + "/GoogleTrendWS/result/twitterCrawler?";
            finurl += "id=" + $scope.selectedIDLog;
//                        finurl +="&clientTimezone=" + encodeURIComponent(clientTimezone);
            finurl += "&clientTimezone=" + clientTimezone;
            console.log(finurl)
            $http({
                method: 'GET',
                url: finurl
            }).then(function successCallback(response) {
                $scope.loading = 2;
                console.log(response);
                var data = response.data;
                $timeout(function () {

                    if (data.labels.length === 0) {
                        $scope.infoShow = true;
                        $scope.loading = 0;
                    } else {
                        $scope.data = data.data;
                        $scope.labels = data.labels;
                        $scope.totalLabels = $scope.labels;
                        $scope.series = data.series.map(function (obj) {
                            return obj.replace(/\"/g, '').replace(/\+/g, ',')
                        });
                        $scope.totalData = $scope.data;
                        $scope.hideData = [];
                        for (var i = 0; i < $scope.data.length; i += 2) {
                            $scope.hideData.push($scope.data[i]);
                        }

                        $scope.silder.min = 0;
                        $scope.silder.max = $scope.data[0].length - 1;
                        $scope.silder.lower = 0;
                        $scope.silder.upper = $scope.silder.max;

                        $timeout(function () {
                            --$scope.silder.upper;
                        }, 100);
                        $timeout(function () {
                            ++$scope.silder.upper;
                        }, 100);
                    }
                }, 0);

            }, function errorCallback(response) {
                $scope.loading = 0;
                console.log(response);
                $scope.infoShowTable = true;

                $timeout(function () {
                    $scope.infoShowTable = false;
                }, 10000);

            });




        }
    };
    $scope.infoShowTable = false;

    $scope.splitData = function (data) {
        data.pop();
        console.log(data);
        return data;
    };

    $scope.downloadData = function (content) {
        console.log(content);
        var url = baseurl + '/download/asZip'
                + '?id=' + content[0]
                + '&keywords=' + content[1]
                + '&startDate=' + content[3]
                + '&endDate=' + content[4]
                + '&location=' + content[5];
        console.log(url);
        window.open(url, '_blank');
    };

    var myTimeout = null;

    $scope.clientTimezone = moment.tz.guess();
    $scope.isSubmitting = false;

    //Twitter submit
    $scope.filterKeywordsTwitter = "";
    $scope.fromDateTwitter = "";
    $scope.toDateTwitter = "";
    $scope.positionTwitter = "";
    $scope.submitFutureTask = function () {
        console.log('submitFutureTask');
//        console.log(document.getElementsByName('twitterSubmitForm')[0].getAttribute('class'));
//        if (document.getElementsByName('twitterSubmitForm')[0].getAttribute('class').indexOf('ng-invalid') > -1) {
//            console.log('return');
//            return;
//        }

        $scope.filterKeywordsTwitter = document.getElementById('filterKeywordsTwitter').value;
        $scope.fromDateTwitter = document.getElementById('fromDateTwitter').value;
        $scope.toDateTwitter = document.getElementById('toDateTwitter').value;
        $scope.positionTwitter = document.getElementById('positionTwitter').value;

        var filterTweetsUrl = baseurl + '/run/submitTwitter?';
        //change fromDate to boise
        var from = moment($scope.fromDateTwitter, "MM-DD-YYYY HH:mm:ss").clone().tz(timezone);
        var to = moment($scope.toDateTwitter, "MM-DD-YYYY HH:mm:ss").clone().tz(timezone);

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

        $scope.loading = 1;


        if ($scope.positionTwitter.length > 0) {
            var locationPromise = $scope.queryLocation($scope.positionTwitter);
            locationPromise.then(function (data) {
                var location = "";
                for (var i = 0; i < data.results.length; ++i) {
                    var place = data.results[i];
                    if (place.formatted_address == $scope.positionTwitter) {
                        location = place.geometry.bounds.southwest.lng +
                                "," + place.geometry.bounds.southwest.lat +
                                "," + place.geometry.bounds.northeast.lng +
                                "," + place.geometry.bounds.northeast.lat;
                        break;
                    }
                }
                filterTweetsUrl += 'fiterKeywords='
                        + $scope.filterKeywordsTwitter + "&fromDate="
                        + from.format("MM-DD-YYYY HH:mm:ss") + "&toDate="
                        + to.format("MM-DD-YYYY HH:mm:ss") + "&location="
                        + $scope.positionTwitter + "&locationCoordinats="
                        + location + "&timezone=" + $scope.clientTimezone;
                +location + "&queryCatlog=" + "Similar Events";
                console.log(filterTweetsUrl);
                if (myTimeout !== null) {
                    $timeout.cancel(myTimeout);
                }
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
                    $scope.loading = 0;
                    $scope.infoShowDone = true;
                    $timeout(function () {
                        $scope.infoShowDone = false;
                    }, 3000);

                }, function errorCallback(response) {
                    $scope.loading = 0;
                    console.log(response);
                    $scope.infoShow = true;

                    $timeout(function () {
                        $scope.infoShow = false;
                    }, 10000);
                    $scope.isSubmitting = false;


                });
            });
//                } else {
//                         filterTweetsUrl += 'fiterKeywords='
//                                        + $scope.filterKeywordsTwitter + "&fromDate="
//                                        + from.format("MM-DD-YYYY HH:mm:ss") + "&toDate="
//                                        + to.format("MM-DD-YYYY HH:mm:ss") + "&location=" + + "&timezone=" + $scope.clientTimezone;
//                                console.log(filterTweetsUrl);
//                                if (myTimeout !== null) {
//                                        $timeout.cancel(myTimeout);
//                                }
//                                $scope.isSubmitting = true;
//                                $http({
//                                        method: 'GET',
//                                        url: filterTweetsUrl
//                                }).then(function successCallback(response) {
//                                        console.log(response);
//                                        if (response.status === 201) {
//                                                $scope.alertMessage.push(response.data);
//                                        } else if (response.status === 202) {
//                                                $scope.alertMessage.push(response.data);
//                                        }
//                                        $scope.myRefresh();
//                                        $scope.isSubmitting = false;
//                                }, function errorCallback(response) {
//                                });
        }
    }

    $scope.myRefresh = function () {
        $timeout(function () {
            $scope.history();
        }, 10);
    };

    var refresh = function () {
        $scope.myRefresh();
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

    $scope.circuleButtonOpen = true;

    //weired stuff
    $timeout(function () {
//        console.log('click');
        document.getElementById("mdButton").click();
        document.getElementById("mdButton").click();
    }, 100);

    $scope.showAlert = function (ev, template) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: template,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
                .then(function (answer) {
                }, function () {
                });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };

        console.log('controole');
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
                $scope.changeDateFormat2($scope.futotalContent.data);
                $scope.fufull.data = split($scope.futotalContent.data, $scope.fuitemPerPage)[0];
                $scope.fufull.titles = response.data.titles;
                $scope.fufull.titles[0] = 'Serial ID';
//                if ($scope.fufull.titles !== undefined)
//                    $scope.fufull.titles.splice(6, 1);
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
        $scope.removeFutureTask = function (index) {
            console.log($scope.futotalContent.data[index]);
            var id = $scope.fufull.data[index][0];
            var from = moment($scope.fufull.data[index][3].toString(), 'MM-DD-YYYY HH:mm:ss').tz(timezone);
            var to = moment($scope.fufull.data[index][4].toString(), 'MM-DD-YYYY HH:mm:ss').tz(timezone);

            var url = baseurl + '/run/removeFutureTask' + '?id=' + id
                    + "&fromDate=" + from.format('MM-DD-YYYY HH:mm:ss')
                    + "&toDate=" + to.format('MM-DD-YYYY HH:mm:ss');
            console.log(url);
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                $timeout(function () {
                    $scope.getfufure();
                }, 10);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
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
        $scope.changeDateFormat2 = function (items) {
            if (items === undefined)
                return;
            for (var i = 0; i < items.length; ++i) {
                for (var j = 4; j <= 5; ++j) {
                    var date = moment(items[i][j].toString(), 'MM-DD-YYYY HH:mm:ssZ');
                    items[i][j] = date.local().format('MM-DD-YYYY HH:mm:ss');
                }
//                items[i].splice(6, 1);
            }
        }
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
                $scope.changeDateFormat2($scope.curtotalContent.data);
                $scope.curfull.data = split($scope.curtotalContent.data, $scope.curitemPerPage)[0];
                $scope.curfull.titles = response.data.titles;
                $scope.curfull.titles[0] = 'Serial ID';
//                if ($scope.curfull.titles !== undefined)
//                    $scope.curfull.titles.splice(6, 1);
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
        $scope.removeCurTask = function (index) {
            $scope.loading = true;
            var id = $scope.curfull.data[index][0];
            var from = moment($scope.curfull.data[index][3].toString(), 'MM-DD-YYYY HH:mm:ss').tz(timezone);
            var to = moment($scope.curfull.data[index][4].toString(), 'MM-DD-YYYY HH:mm:ss').tz(timezone);

            var url = baseurl + '/run/removeCurrentTask' + '?id=' + id
                    + "&fromDate=" + from.format('MM-DD-YYYY HH:mm:ss')
                    + "&toDate=" + to.format('MM-DD-YYYY HH:mm:ss');
            console.log(url);
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {

                $timeout(function () {
                    $scope.currentRunning();
                    $scope.loading = false;
                }, 10);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }



        $scope.currentRunning();
        $scope.getfufure();
    }

    $scope.save = function (canvasID) {
//                var canvas = document.querySelector('#canvas');
//                var canvas = document.getElementById('canvas');
        var canvas = document.getElementById(canvasID);
        var ctx = canvas.getContext('2d');
        console.log(canvas);
        var width = canvas.getAttribute("width");
        var height = canvas.getAttribute("height");
        var imgData = canvas.toDataURL(
                'image/png', 1.0);
        var doc = new jsPDF('landscape');
        doc.addImage(imgData, 'PNG', 10, 10, 270, 190);
//                var filename = $scope.datasource.series.toString();
        var filename = "data";
        filename.replace(":", " ");
        doc.save(filename + ".pdf");

    };

    $scope.loadExample = function (value) {
//        console.log(value);
        if (value == 'lagTime') {
            $scope.lagTimeQuery.eventStartDate = "08-07-2016";
            $scope.lagTimeQuery.eventEndDate = "08-11-2016";
            $scope.lagTimeQuery.keywords = "mind, birds";
            $scope.lagTimeQuery.position = "Portland OR, Oregon, United States";
            $scope.lagTimeQuery.fromDate = "07-31-2016";
            $scope.lagTimeQuery.toDate = "08-30-2016";
        } else if (value === 'ContrastImpact') {
            $scope.difCityQuery.keywords = "mind, birds";
            $scope.difCityQuery.position = "Portland OR, Oregon, United States";
            $scope.difCityQuery.positionTwo = "Los Angeles CA, California, United States";
            $scope.difCityQuery.fromDate = "07-31-2016";
            $scope.difCityQuery.toDate = "08-30-2016";
            $scope.difCityQuery.eventStartDate = "08-07-2016";
            $scope.difCityQuery.eventEndDate = "08-11-2016";
        } else if (value === 'google') {
            $scope.google.keywords = "mind, birds";
            $scope.google.position = "Portland OR, Oregon, United States";
            $scope.google.fromDate = "07-31-2016";
            $scope.google.toDate = "08-30-2016";
        } else if (value === 'twitter') {
            var nowmoment = moment();
            $scope.twitter.keywords = "mind, birds";
            $scope.twitter.position = "Portland OR, Oregon, United States";
            $scope.twitter.fromDate = nowmoment.add(1, 'minutes').format("MM-DD-YYYY HH:mm:ss");
            $scope.twitter.toDate = nowmoment.add(3, 'minutes').format("MM-DD-YYYY HH:mm:ss");
        } else if (value === 'template') {
            $scope.template.keywords = "minds , birds";
            $scope.template.position = "Portland OR, Oregon, United States";
            $scope.template.positionTwo = "Los Angeles CA, California, United States";
            $scope.template.fromDate = "07-31-2016";
            $scope.template.toDate = "08-30-2016";
            $scope.template.eventStartDate = "08-07-2016";
            $scope.template.eventEndDate = "08-11-2016";
            $scope.template.trendResources = "";
        }
    }

//        $scope.showTrendTime = false;
    $scope.showTrendTime = {
        value: false
    };

    $scope.hideTrendLine = function (showTrendTime) {
        console.log(showTrendTime);
        //generate 
        var chartType = $scope.chartType;
        console.log($scope.totalData.length);
        console.log($scope.hideData.length);
        if (showTrendTime === true && chartType == 'line') {
            $scope.data = $scope.totalData;
            $scope.colors = $scope.totalColors;
            $scope.datasetOverride = [
                {
                    type: 'line'
                },
                {
                    type: 'line'
                },
                {
                    type: 'line'
                },
                {
                    type: 'line'
                }
            ];
        } else if (showTrendTime === false && chartType == 'line') {
            $scope.data = $scope.hideData;
            $scope.colors = $scope.hideColors;
            $scope.datasetOverride = [
                {
                    type: 'line'
                },
                {
                    type: 'line'
                },
                {
                    type: 'line'
                },
                {
                    type: 'line'
                }
            ];
        } else if (showTrendTime === true && chartType == 'bar') {
            $scope.data = $scope.totalData;
            $scope.colors = $scope.totalColors;
            $scope.datasetOverride = [
                {
                    type: 'bar'
                },
                {
                    type: 'line'
                },
                {
                    type: 'bar'
                },
                {
                    type: 'line'
                }
            ];
        } else if (showTrendTime === false && chartType == 'bar') {
            $scope.data = $scope.hideData;
            $scope.colors = $scope.hideColors;
            $scope.datasetOverride = [
                {
                    type: 'bar'
                },
                {
                    type: 'bar'
                },
                {
                    type: 'bar'
                },
                {
                    type: 'bar'
                }
            ];
        }


    }

    $scope.querySelect.value = 'lagTime';
//        $scope.querySelect.value = 'ContrastImpact';
//        $scope.querySelect.value = 'contrastDifferentCity';
    $scope.temp = {
        eventType: 'pointEvent'
    };

    $scope.eventType = {
        value: 'pointEvent'
    };

    $scope.googleTrend = {
        eventType: 'pointEvent'
    };

    $scope.const = {
        eventType: 'pointEvent'
    };

    $scope.silder = {
        min: 0,
        max: 100,
        lower: 20,
        upper: 80
    };
    $scope.silder.min = 0;
    $scope.silder.max = 100;
    $scope.silder.lower = 20;
    $scope.silder.upper = 80;

    $scope.$watch('silder', function (newVal, oldVal) {
//        console.log('changed');
        $scope.data = [];
        var data = null;
        if ($scope.showTrendTime.value === false) {
            data = $scope.totalData;
        } else {
            data = $scope.hideData;
        }
        $scope.labels = $scope.totalLabels.slice($scope.silder.lower, $scope.silder.upper + 1);

        for (var i = 0; i < data.length; ++i) {
            $scope.data.push(data[i].slice($scope.silder.lower, $scope.silder.upper + 1));
        }

        var dataParam = [];

        for (var i = 0; i < data.length; i += 2) {
            dataParam.push($scope.data[i]);
        }

        var finalURL = url.url + "/GoogleTrendWS/result/regressionLines";
//        console.log(dataParam);
        $http({
            method: 'POST',
            url: finalURL,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(dataParam)
        }).then(function successCallback(response) {
//            console.log(response.data);
            $scope.data = response.data;
        }, function errorCallback(response) {
        });





    }, true);


    $scope.logicalName = '';
    $scope.$watch('lagTimeQuery.keywords', function (newVal, oldVal) {
//        console.log('input');
//        var keywordsString = $scope.lagTimeQuery.keywords;
        var keywordsString = newVal;

        var keywords = keywordsString.split(",");
        $scope.logicalName = "";
        for (var i = 0; i < keywords.length - 1; ++i) {
            $scope.logicalName += "\"" + keywords[i].trim() + "\" or ";
        }

        $scope.logicalName += "\"" + keywords[keywords.length - 1].trim() + "\"";
    }, true);

    $scope.difCityName = '';
    $scope.$watch('difCityQuery.keywords', function (newVal, oldVal) {
//        console.log('input');
//        var keywordsString = $scope.lagTimeQuery.keywords;
        var keywordsString = newVal;

        var keywords = keywordsString.split(",");
        $scope.difCityName = "";
        for (var i = 0; i < keywords.length - 1; ++i) {
            $scope.difCityName += "\"" + keywords[i].trim() + "\" and ";
        }

        $scope.difCityName += "\"" + keywords[keywords.length - 1].trim() + "\"";
    }, true);

    $scope.googleName = '';
    $scope.$watch('google.keywords', function (newVal, oldVal) {
//        console.log('input');
//        var keywordsString = $scope.lagTimeQuery.keywords;
        var keywordsString = newVal;
//        console.log(newVal);
//        console.log(keywordsString);

        var keywords = keywordsString.split(",");
//        console.log(keywords);
        $scope.googleName = "";
        for (var i = 0; i < keywords.length - 1; ++i) {
            $scope.googleName += "\"" + keywords[i].trim() + "\" and ";
        }

        $scope.googleName += "\"" + keywords[keywords.length - 1].trim() + "\"";
//        console.log($scope.googleName);
    }, true);

    $scope.twitterName = '';
    $scope.$watch('twitter.keywords', function (newVal, oldVal) {
//        console.log('input');
//        var keywordsString = $scope.lagTimeQuery.keywords;
        var keywordsString = newVal;

        var keywords = keywordsString.split(",");
        $scope.twitterName = "";
        for (var i = 0; i < keywords.length - 1; ++i) {
            $scope.twitterName += "\"" + keywords[i].trim() + "\" and ";
        }

        $scope.twitterName += "\"" + keywords[keywords.length - 1].trim() + "\"";
    }, true);

    $scope.$watch('similiarOption.value', function (newVal, oldVal) {
        if (newVal === 'google') {
            $scope.google.keywords = $scope.twitter.keywords;
            $scope.google.position = $scope.twitter.position;
            $scope.google.positionTwo = $scope.twitter.positionTwo;
            $scope.google.fromDate = $scope.twitter.fromDate.substring(0, 11);
            $scope.google.toDate = $scope.twitter.toDate.substring(0, 11);
            $scope.google.eventStartDate = $scope.twitter.eventStartDate;
            $scope.google.eventEndDate = $scope.twitter.eventEndDate;
        } else {
            $scope.twitter.keywords = $scope.google.keywords;
            $scope.twitter.position = $scope.google.position;
            $scope.twitter.positionTwo = $scope.google.positionTwo;
            if ($scope.google.fromDate !== "")
                $scope.twitter.fromDate = moment().add(1, 'minutes').format("MM-DD-YYYY HH:mm:ss");
            ;
            if ($scope.google.toDate !== "")
                $scope.twitter.toDate = moment().add(1, 'minutes').format("MM-DD-YYYY HH:mm:ss");
            ;
            $scope.twitter.eventStartDate = $scope.google.eventStartDate;
            $scope.twitter.eventEndDate = $scope.google.eventEndDate;
        }
    }, true);

    $scope.cancelLagTimeSubmitting = function () {
        console.log("cancelLagTimeSubmitting");
        $scope.loading = 0;
    }

    $scope.gotoMock = function () {
        $location.path("/querySimulate");
    }
});