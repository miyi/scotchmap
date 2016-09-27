// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.
var addCtrl = angular.module('addCtrl', ['geolocation','gservice']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation, gservice){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Set initial coordinates to the center of the US
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;

    geolocation.getLocation().then(function(data){

        // set the latitude and logitude equal to the HTML5 coordinates
        coords = {lat: data.coords.latitude,
            long: data.coords.longitude };

        // Display coordinates in location textboxes rounded to three decimal points
        $scope.formData.longitude = parseFloat(coords.long);
        $scope.formData.latitude = parseFloat(coords.lat);

        // Display message confirming that the coordinates verified
        $scope.formData.htmlverified = 'Yep (thanks for giving us real data!)';

        gservice.refresh($scope.formData.latitude, $scope.formData.longitude, false);

    });

    // Functions
    // ----------------------------------------------------------------------------
    // Creates a new user based on the form fields
    $scope.createUser = function() {

        // Grabs all of the text box fields
        var userData = {
            username: $scope.formData.username,
            gender: $scope.formData.gender,
            age: $scope.formData.age,
            favclass: $scope.formData.favclass,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        // Saves the user data to the db
        $http.post('/users', userData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                $scope.formData.username = "";
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favclass = "";

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});