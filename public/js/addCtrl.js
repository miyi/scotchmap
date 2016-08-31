var addCtrl = angular.module('addCtrl', ['geolocation','gservice']);

addCtrl.controller('addCtrl', function($scope, $http, geolocation, gservice){

    //init variables
    //
    $scope.formData = {};
    var coords = {};

    geolocation.getLocation().then(function(data){

        // Set the latitude and longitude equal to the HTML5 coordinates
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

        // Display coordinates in location textboxes rounded to three decimal points
        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

        // Display message confirming that the coordinates verified.
        $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";

        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

    });

    var lat = 0;
    var long = 0;

    //set initial lat long
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;


    //creates the user from information available in the textfields
    $scope.createUser = function (){
        var userData = {
            username: $scope.formData.username,
            gender: $scope.formData.gender,
            age: $scope.formData.age,
            favlang: $scope.formData.favlang,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        //saves the data to db
        $http.post('/users', userData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                $scope.formData.username = "";
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favlang = "";


            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
    };

});