var mongoose = require('mongoose');
var User = require('./model.js');

module.exports = function(app){
    //only two routes to make this as simple as possible
    //--- get to retrieve locations of other users
    //--- post to add new users

    //GET retrieves the records of all other users
    app.get('/users', function(req, res) {
        var query = User.find({});
        query.exec(function(err, users) {
            if(err)
                res.send(err);
                //if no error is found send json of all users
            res.json(users);
        });
    });

    //POST method provides a way to save new users to the db
    app.post('/users', function(req, res){
        // Creates a new User based on the Mongoose schema and the post body
        var newuser = new User(req.body);
        console.log(req.body);

        newuser.save(function(err){
            if(err)
                res.send(err);
            res.json(req.body);
        });
    });

    app.post('/query/', function(req, res){

        // Grab all of the query parameters from the body.
        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        var distance        = req.body.distance;

        // Opens a generic Mongoose Query. Depending on the post body we will...
        var query = User.find({});

        // ...include filter by Max Distance (converting miles to meters)
        if(distance){

            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

                // Converting meters to miles. Specifying spherical geometry (for globe)
                maxDistance: distance * 1609.34, spherical: true});
        }

        // ... Other queries will go here ...

        // Execute Query and Return the Query Results
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors, respond with a JSON of all users that meet the criteria
            res.json(users);
        });
    });
}