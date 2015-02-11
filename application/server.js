// BASE SETUP

// ================= CALL THE PACKAGES ==================
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
var morgan     = require('morgan'); 		// used to see requests
var mongoose   = require('mongoose');
var config 	   = require('./config');
var path 	   = require('path');

require('require-dir');

// ================= APP CONFIGURATION ==================
app.use(bodyParser.urlencoded({ extended: true }));                                                                     // use body parser so we can grab information from POST requests
app.use(bodyParser.json());
app.use(function(req, res, next) {                                                                                      // configure our app to handle CORS requests
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});
app.use(morgan('dev'));                                                                                                 // log all requests to the console
mongoose.connect(config.database);                                                                                      // connect to our database (hosted on modulus.io)
app.use(express.static(__dirname + '/public'));                                                                         // set static files location used for requests that our frontend will make

// ================= ROUTES FOR OUR API =================

require('./routes')(app, express);

var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);
app.get('*', function(req, res) { res.sendFile(path.join(__dirname + '/public/app/views/index.html')); });              // MAIN CATCHALL ROUTE - SEND USERS TO FRONTEND - has to be registered after API ROUTES

// ================= START THE SERVER =================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);

