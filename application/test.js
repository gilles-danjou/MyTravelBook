/**
 * Created by GDanjou on 09/02/15.
 */


/*var User       = require('./models/user');
var Search       = require('./models/search');


var user = User.findOne({'name': 'suzie'}, function(err, user) {
 console.log(user.searches);	                                                                        			// return the users
});*/
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

var User       = require('./app/models/user');
var Search     = require('./app/models/search');
var Parent     = require('./app/models/Parent');
var Child      = require('./app/models/Child');

mongoose.connect('mongodb://localhost:27017/mytravelbook');                                                                                      // connect to our database (hosted on modulus.io)


//var parent = new Parent({'name' : 'hyacinthe'});
//parent.save();
//var child = new Child({parent:parent._id, 'name' : 'Gilles'});
//child.save();

Parent.findOne({'name':'hyacinthe'}).populate('children').exec(function(err,data){
        console.log(data.children);
        process.exit();

});




/*            var party = { _id: "chessparty"
 , name: "Chess Party!"
 , attendees: ["seanhess", "bob"] }
 var user = { _id: "seanhess", name: "Sean Hess", events: ["chessparty"]}
 db.events.save(party)
 db.users.save(user)

 db.events.find({_id: {$in: user.events}}) // events for user
 db.users.find({_id: {$in: party.attendees}}) // users for event
 */


