// BASE SETUP

// ================= CALL THE PACKAGES ==================
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
var morgan     = require('morgan'); 		// used to see requests
var mongoose   = require('mongoose');
var config 	   = require('./config');
var path 	   = require('path');
var jwt        = require('jsonwebtoken');
var User       = require('./api/user/user.model');
var server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

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

app.use('/authenticate', function(req, res, next) {
	User.findOne({ username: req.body.username }).select('name username password').exec(function(err, user) {         // find the user
		if (err) throw err;                                                                                             // no user with that username was found
		if (!user) { res.json({ success: false,  message: 'Authentication failed. User not found.' });
		} else if (user) {
			var validPassword = user.comparePassword(req.body.password);                                                  // check if password matches
			if (!validPassword) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {
				var token = jwt.sign({ name: user.name, username: user.username }, config.secret, { expiresInMinutes: 14400 });// if user is found and password is right create a token - // expires in 24 hours
				res.json({ success: true, message: 'Enjoy your token!', token: token });
			}
		}
	});
});

var apiRoutes = require('./routes')(app, express);
app.use('/api', apiRoutes);

app.get('*', function(req, res) { res.sendFile(path.join(__dirname + '/public/index.html')); });



// ================= START THE SERVER =================
//app.listen(config.port);
server.listen(config.port);

console.log('Magic happens on port ' + config.port);

var votes = [
    { choice: 1, label: 'VanillaJS', votes: 0 },
    { choice: 2, label: 'AngularJS', votes: 0 },
    { choice: 3, label: 'BackboneJS', votes: 0 },
    { choice: 4, label: 'EmberJS', votes: 0 }
];

io.sockets.on('connection', function (socket) {
    socket.emit('votes', { votes: votes });
    socket.on('vote', function(msg){
        console.log(msg);
        votes[msg.vote-1].votes++;
        io.sockets.emit('votes', { votes: votes });
    })
});