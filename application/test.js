
//var mongoose = require("mongoose"),
//    Schema = mongoose.Schema,
//    relationship = require("mongoose-relationship");
//
//var User       = require('./app/models/user');
//var Search     = require('./app/models/search');
//var Parent     = require('./app/models/Parent');
//var Child      = require('./app/models/Child');
//
//mongoose.connect('mongodb://localhost:27017/mytravelbook');                                                                                      // connect to our database (hosted on modulus.io)


// example of many-to many

/*
var parent = new Parent({'name' : 'p1'});
parent.save();

var parentTwo = new Parent({'name' : 'p2'});;
parentTwo.save();

var child1 = new Child({'name' : 'c1'});;
child1.parents.push(parent);
child1.parents.push(parentTwo);
child1.save()
parent.children.push(child1);
parent.save();

var child2 = new Child({'name' : 'c2'});;
child2.parents.push(parent);
child2.parents.push(parentTwo);
child2.save()
parent.children.push(child2);
parentTwo.children.push(child2);
parent.save();
parentTwo.save();

var child3 = new Child({'name' : 'c3'});;
child3.parents.push(parent);
child3.save()
parent.children.push(child3);
parent.save();
*/

//Parent
//    .findOne({'name' : 'p1'})
//    .populate('children', 'name')
//    .exec(function (err, result) {
//        console.log(result.children)
//        process.exit(0);
//    });


//Child
//  .findOne({'name' : 'c1'})
//  .populate('parents', 'name')
//  .exec(function (err, result) {
//      console.log(result.parents)
//      process.exit(0);
//  });

//mongoose.connection.close(function () {
//    console.log('Mongoose disconnected on app termination');
//    process.exit(0);
//});

var osmosis = require('osmosis');

osmosis
    .get('http://www.thebesttimetovisit.com/weather/wheretogoinjanuary.php')
    .find('#middle')
    .set('q')
    .data(function(listing) {
        //console.log(JSON.stringify(listing));
    }).
    then(function(next) {
        console.log(this.text())
    })