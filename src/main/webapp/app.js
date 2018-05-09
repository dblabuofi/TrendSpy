/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('myApp', ['ui.bootstrap', 'ngRoute', 'chart.js', 'ngAnimate', 'angularValidator', 'ui.slider', 'ngMaterial', 
        'ngMessages', 'material.svgAssetsCache', 'mdRangeSlider']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
//      when('/google', {
//	templateUrl: 'templates/googleTrend.html',
//	controller: 'googleTrendControler'
//      }).
//      when('/home', {
//	templateUrl: 'templates/home.html',
//	controller: 'homeController'
//      }).
//      when('/submit', {
//	templateUrl: 'templates/submit.html',
//	controller: 'submitController'
//      }).
//      when('/progress', {
//	templateUrl: 'templates/progress.html',
//	controller: 'progressController'
//      }).
//      when('/search', {
//	templateUrl: 'templates/search.html',
//	controller: 'searchController'
//      }).
//      when('/chart', {
//	templateUrl: 'templates/chart.html',
//	controller: 'chartController'
//      }).
//      when('/friend', {
//	templateUrl: 'templates/friends.html',
//	controller: 'friendController'
//      }).
//      when('/result', {
//	templateUrl: 'templates/result.html',
//	controller: 'resultController'
//      }).
      when('/query', {
	templateUrl: 'templates/query.html',
	controller: 'queryController'
      }).
      when('/querySimulate', {
	templateUrl: 'templates/queryMock.html',
	controller: 'queryMockController'
      }).
      otherwise({
	redirectTo: '/query'
      });
}]);

app.controller('appController', function ($scope, $uibModal) {
    $scope.Readme = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContentReadme.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
            }
        });
        modalInstance.result.then(function () {
        }, function () {
        });
    };
  
    $scope.modalOpen = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContentAbout.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
            }
        });
        modalInstance.result.then(function () {
        }, function () {
        });
    };
});

app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
//      chartColors: ['#97BBCD', '#FDB45C','#FF5252', '#FF8A80'],
      chartColors: ['#DCDCDC', '#FDB45C','#FF5252', '#FF8A80'],
      responsive: true
    });
  }]);
  


app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {
  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
app.controller('ModalInstanceCtrlSubmit', function ($scope, $uibModalInstance, $interval) {
  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.second = 3;
  
  $interval(function() {
      if (--$scope.second == 0) 
          $scope.ok();
  }, 1000);
});