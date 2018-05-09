angular.module("myApp").controller('searchController', function ($scope, $timeout, $http, $window, url, $filter) {
        var baseurl = url.url + '/FacebookCrawlerWS';
          var timezone = url.timezone;
        $scope.tabs = [
                {title: 'posts', loading: true, content: {}, totalContent: [], maxSize: 5, totalItems: 0, curPage: 1, itemPerPage: 10, pageChanged: function () {
//                                var splited = split(this.totalContent, this.itemPerPage);
//                                console.log(splited);
//                                this.content.data = splited[this.curPage - 1];
                                $scope.orderByF();
                                console.log('Page changed to: ' + this.curPage);
                        }}
        ];
        
        $scope.isCollapsed = "true";
        
        $scope.items = [];
        $scope.selectedTask = undefined;
        $scope.selectedServer = undefined;
        $scope.history = function () {
                var url = baseurl + '/sql/twitterhistory';
                console.log(url);
                $http({
                        method: 'GET',
                        url: url
                }).then(function successCallback(response) {
                        console.log(response.data);
                        var collection = response.data;
                        $scope.selectedTask = collection.data[0][0];
                        $scope.selectedServer = collection.data[0][6];
                        console.log($scope.selectedTask);
                        console.log($scope.selectedServer);
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
                        //filterTweets
                        $scope.selctionChanged();
                        $scope.filterTweets();
                }, function errorCallback(response) {
                });
        };
    

        $scope.selctionChanged = function () {
                var index = indexofItems($scope.items, $scope.selectedTask);
                $scope.fromDate = $scope.items[index].startDate.substring(0, 19);
                $scope.toDate = $scope.items[index].endDate.substring(0, 19);
                $scope.filterKeywords = $scope.items[index].keywords;
                $scope.location = $scope.items[index].location;
                $scope.selectedServer  = $scope.items[index].servername;
                console.log($scope.items[index]);
        }

        function indexofItems(items, id) {
                for (var i = 0; i < items.length; ++i) {
                        if (items[i].id == id) {
                                return i;
                        }
                }
                return -1;
        }





//        var countUrl = baseurl + '/run/totalcountTwitter';
//        console.log(countUrl);
//        $http({
//                method: 'GET',
//                url: countUrl
//        }).then(function successCallback(response) {
//                // this callback will be called asynchronously
//                // when the response is available
//                $scope.tweetsCount = response.data;
//        }, function errorCallback(response) {
//        });
        
        

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


        $scope.updateTable = function () {
                if ($scope.search !== undefined) {
//                        console.log($scope.search);
                        $scope.tabs[0].totalContent2 = $filter('filter')($scope.tabs[0].totalContent, $scope.search);
//                        console.log($scope.tabs[0].totalContent2);

                        $scope.tabs[0].content.data = split($scope.tabs[0].totalContent2, $scope.tabs[0].itemPerPage)[0];
//                        console.log(split($scope.tabs[0].totalContent2, $scope.tabs[0].itemPerPage));
                        $scope.tabs[0].displayedCollection = [].concat($scope.tabs[0].content);
                        if ($scope.tabs[0].totalContent2 !== undefined)
                                $scope.tabs[0].totalItems = $scope.tabs[0].totalContent2.length;

                }
        };

        var oldVal = "";
        $scope.generateOrder = function (val) {
                var index = oldVal.indexOf(val);
                if (index === -1) {
//                        oldVal = "+" + val + oldVal;
                        oldVal += "+" + val;
                } else {
                        if (oldVal[index - 1] === "+") {
                                oldVal = oldVal.split("");
                                oldVal[index - 1] = "-";
                                oldVal = oldVal.join("");
                        } else {
                                oldVal = oldVal.split("");
                                oldVal.splice(index - 1, val.length + 1);
                                oldVal = oldVal.join("");
                        }
                }
                return oldVal;
        }

        $scope.orderByF = function (val) {
                if (val !== undefined) {
                        oldVal = $scope.generateOrder(val);
                        console.log(oldVal);
                }

                $scope.tabs[0].content.data = split($filter('orderBy')($scope.tabs[0].totalContent2, oldVal), $scope.tabs[0].itemPerPage)[$scope.tabs[0].curPage - 1];
        }
        $scope.keywords = 0;
        $scope.created_at = 0;
        $scope.text = 0;
        $scope.username = 0;
        $scope.userscreen_name = 0;
        $scope.userLocation = 0;
        $scope.place  = 0;
        $scope.orderBy = function (val) {
                if (val === 'keywords') {
                        $scope.keywords = ($scope.keywords + 1) % 3;
                }
                if (val === 'created_at') {
                        $scope.created_at = ($scope.created_at + 1) % 3;
                }
                if (val === 'text') {
                        $scope.text = ($scope.text + 1) % 3;
                }
                if (val === 'user.name') {
                        $scope.username = ($scope.username + 1) % 3;
                }
                if (val === 'user.screen_name') {
                        $scope.userscreen_name = ($scope.userscreen_name + 1) % 3;
                }
                if (val === 'user.location') {
                        $scope.userLocation = ($scope.userLocation + 1) % 3;
                }
                if (val === 'place.full_name') {
                        $scope.place = ($scope.place + 1) % 3;
                }

                $scope.orderByF(val);
        }

        $scope.limit = "1000";

        $scope.filterKeywords = "";
        $scope.fromDate = "";
        $scope.toDate = "";
        $scope.location = "";
        $scope.tweetsReturnCount = 0;

        $scope.alertMessage = [];
        $scope.closeAlert = function (index) {
                $scope.alertMessage.splice(index, 1);
        }
        
        $scope.filterTweets = function () {
                if ($scope.selectedTask === undefined) {//please select a task
                        $scope.alertMessage.push("Please select a task");
                } else {
                        oldVal = "";
                        $scope.keywords = 0;
                        $scope.created_at = 0;
                        $scope.text = 0;
                        $scope.username = 0;
                        $scope.userscreen_name = 0;
                        $scope.userLocation = 0;
                        $scope.place = 0;
                        $scope.tabs[0].loading = true;
                        $scope.tabs[0].totalContent = $scope.tabs[0].totalContent2 = [];
                        $scope.tabs[0].content.data = [];

                        var filterTweetsUrl = baseurl + '/run/filterTweets?';

                        var from = moment($scope.fromDate, "MM-DD-YYYY HH:mm:ss").clone().tz(timezone);
                        var to = moment($scope.toDate, "MM-DD-YYYY HH:mm:ss").clone().tz(timezone);

                        var params = 'fiterKeywords='
                                + $scope.filterKeywords + "&fromDate="
                                + from.format("MM-DD-YYYY HH:mm:ss").toString() + "&toDate="
                                + to.format("MM-DD-YYYY HH:mm:ss").toString() + "&location="
                                + $scope.location + "&id="
                                + $scope.selectedTask + "&server="
                                + $scope.selectedServer + "&limit="
                                + $scope.limit;
//                        filterTweetsUrl += JSON.stringify(params);
                        filterTweetsUrl += params;
                        console.log(filterTweetsUrl);

                        $http({
                                method: 'GET',
                                url: filterTweetsUrl
                        }).then(function successCallback(response) {
                                // this callback will be called asynchronously
                                // when the response is available
                        console.log(response.data);
                                $scope.tabs[0].totalContent = angular.copy(response.data);
                                $scope.changeDateFormat($scope.tabs[0].totalContent);
                                $scope.tabs[0].totalContent2 = $scope.tabs[0].totalContent;
                                $scope.tabs[0].content.data = split($scope.tabs[0].totalContent, 10)[0];
        //                console.log(split($scope.tabs[0].totalContent, 10));
                                $scope.tabs[0].displayedCollection = [].concat($scope.tabs[0].content);
                                if ($scope.tabs[0].totalContent !== undefined)
                                        $scope.tabs[0].totalItems = $scope.tabs[0].totalContent.length;
                                $scope.tabs[0].loading = false;
                                $scope.tweetsReturnCount = $scope.tabs[0].totalContent.length;
                        }, function errorCallback(response) {
                        });
                }
                
        }
        
         $scope.history();
        
        //3,4
        $scope.changeDateFormat = function(items) {
                if (items === undefined)
                        return;
                console.log(items);
                for (var i = 0; i < items.length; ++i) {
                                var date = moment(items[i].created_at.toString(), 'MM-DD-YYYY HH:mm:ssZ');
                                items[i].created_at = date.local().format('MM-DD-YYYY HH:mm:ss');
                }
        }
        
        
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
});
String.prototype.replaceAt = function (index, character) {
        return this.substr(0, index) + character + this.substr(index + character.length);
}
