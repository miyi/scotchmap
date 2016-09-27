var queryCtrl = angular.module('queryCtrl', ['geolocation', 'gservice']);
queryCtrl.controller('queryCtrl', function($scope, $log, $http, geolocation, gservice) {

    $scope.formData = {};
    var queryBody = {};

    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;

    geolocation.getLocation().then(function(data){
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

        // Set the latitude and longitude equal to the HTML5 coordinates
        $scope.formData.longitude = parseFloat(coords.long);
        $scope.formData.latitude = parseFloat(coords.lat);
    });

    $scope.queryUsers = function() {
        queryBody = {
            longitude: parseFloat($scope.formData.longitude),
            latitude: parseFloat($scope.formData.latitude),
            distance: parseFloat($scope.formData.distance),
        };

        $http.post('/query', queryBody)
            .success(function (queryResults) {



                console.log("QueryBody:");
                console.log(queryBody);
                console.log("QueryResults:");
                console.log(queryResults);
                console.log(queryResults.length);
                // Count the number of records retrieved for the panel-footer
                $scope.queryCount = queryResults.length;
                gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);

            })
            .error(function (queryResults) {
                console.log('Error ' + queryResults);
            });


    };
});