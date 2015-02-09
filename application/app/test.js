/**
 * Created by GDanjou on 09/02/15.
 */


var User       = require('./models/user');
var Search       = require('./models/search');
var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mytravelbook');                                                                                      // connect to our database (hosted on modulus.io)

var user = User.findOne({'name': 'suzie'}, function(err, user) {
 console.log(user.searches);	                                                                        			// return the users
});

