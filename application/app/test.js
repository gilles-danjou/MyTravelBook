/**
 * Created by GDanjou on 09/02/15.
 */


/*var User       = require('./models/user');
var Search       = require('./models/search');
var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mytravelbook');                                                                                      // connect to our database (hosted on modulus.io)

var user = User.findOne({'name': 'suzie'}, function(err, user) {
 console.log(user.searches);	                                                                        			// return the users
});*/


var databaseUrl = "mydb"; // "mongodb://localhost:27017/mytravelbook"
var collections = ["users", "searches"]
var db = require("mongojs").connect(databaseUrl, collections);


db.users.find({name: "gilles"}, function(err, users) {
    if( err || !users) console.log("No female users found");
    else users.forEach( function(femaleUser) {
        console.log(femaleUser);
    } );
});