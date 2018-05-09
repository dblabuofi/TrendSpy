angular.module("myApp").factory('chartFactory', function ($http) {
        var chart = {};
        
        chart.selectedTask = -1;
        chart.datasource = {
                labels: [],
                series: [],
                data: []
        };
        chart.chartType = "Line";
        chart.showType = "week";
        chart.datahouse = [];
        chart.fromDate = "";
        chart.toDate = "";
        chart.filterKeywords = "";
        chart.location = "";
        chart.selectedServer = "";
        chart.tweetsReturnCount = 0;
        return chart;
});

