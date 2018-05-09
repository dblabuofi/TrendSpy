angular.module("myApp").controller('friendController', function ($scope, $http, $interval, $window, $location, url) {
      var baseurl = url.url;
      
    $scope.numOfFriends = "";
    
    $scope.submit = function() {
        var url = baseurl + "/FacebookCrawlerWS/run/friend/";
        console.log(url);
        $http({
            method: 'GET',
            url: url + $scope.userIDs
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response.data);
            $scope.content.data = response.data;
            $scope.numOfFriends = response.data.length;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

     $scope.tabs = [
        {title: 'parsed friend', content: ''},
        {title: 'friend list', content: ''},
    ];
    
    var url = baseurl + '/FacebookCrawlerWS/sql';
    
    var postsUrl = url + '/parsedfriend';
    console.log(postsUrl);
    $http({
        method: 'GET',
        url: postsUrl
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response.data);
        $scope.tabs[0].content = response.data;
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
    
    var url = baseurl + '/FacebookCrawlerWS/sql';
    
    var postsUrl = url + '/friendlist';
    console.log(postsUrl);
    $http({
        method: 'GET',
        url: postsUrl
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response.data);
        $scope.tabs[1].content = response.data;
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
    
    $scope.userIDs = "kat.whipple,eric.waggoner.90,anne.munch.90,tami.mcgill.1,brett.gieselman.5,sandy.boyer.1614,janel.boyer";
    
    
});
 
