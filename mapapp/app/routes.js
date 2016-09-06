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
        console.log(req.body)

        newuser.save(function(err){
            if(err)
                res.send(err);
            res.json(req.body);
        });
    });
}