var bodyParser = require('body-parser'); 	// get body-parser
var User       = require('../models/user');
//var Search     = require('../models/search');
var Parent     = require('../models/test').parent;
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

// ================= /authenticate =================
	apiRouter.post('/authenticate', function(req, res) {                                                               	// route to authenticate a user (POST http://localhost:8080/api/authenticate)
	  User.findOne({ username: req.body.username }).select('name username password').exec(function(err, user) {         // find the user
       if (err) throw err;                                                                                             // no user with that username was found
       if (!user) { res.json({ success: false,  message: 'Authentication failed. User not found.' });
	    } else if (user) {
	      var validPassword = user.comparePassword(req.body.password);                                                  // check if password matches
	      if (!validPassword) {
	        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	      } else {
	        var token = jwt.sign({ name: user.name, username: user.username }, superSecret, { expiresInMinutes: 1440 });// if user is found and password is right create a token - // expires in 24 hours
	        res.json({ success: true, message: 'Enjoy your token!', token: token });
	      }
	    }
	  });
	});

	apiRouter.use(function(req, res, next) {                                                                        	// route middleware to verify a token
	  console.log('Somebody just came to our app!');                                                                  // do logging
	  var token = req.body.token || req.param('token') || req.headers['x-access-token'];                                // check header or url parameters or post parameters for token
	  if (token) {                                                                                                      // decode token
	    jwt.verify(token, superSecret, function(err, decoded) {                                                         // verifies secret and checks exp
            if (err) { res.status(403).send({ success: false,  message: 'Failed to authenticate token.' });
	      } else {
	        req.decoded = decoded;
            User.findOne({ name: decoded.name }, function(err, user) {
                req.user = user;
            });	                                                                                       // if everything is good, save to request for use in other routes
	        next();                                                                                                     // make sure we go to the next routes and don't stop here
	      }
	    });
	  } else {
   		res.status(403).send({ success: false, message: 'No token provided.' });                                        // if there is no token return an HTTP response of 403 (access forbidden) and an error message
	  }
	});

	apiRouter.get('/', function(req, res) {	                                                                            // test route to make sure everything is working accessed at GET http://localhost:8080/api
        res.json({ message: 'hooray! welcome to our api!' });
	});

// ================= /users =================
	apiRouter.route('/users')
		.post(function(req, res) {                                                                              		// create a user (accessed at POST http://localhost:8080/users)
            var user = new User(req.body);		                                                                        // create a new instance of the User model
	                                                                                                                    // set the users name (comes from the request)
			//user.username = req.body.username;                                                                        // set the users username (comes from the request)
			//user.password = req.body.password;                                                                        // set the users password (comes from the request)

			user.save(function(err) {
				if (err) {
                    if (err.code == 11000) return res.json({ success: false, message: 'A user with that username already exists. '}); 	// duplicate entry
					else return res.send(err);
				}
				res.json({ message: 'User created!' });
			});
		})

		.get(function(req, res) {                                                                               		// get all the users (accessed at GET http://localhost:8080/api/users)
            User.find({}, function(err, users) {
				if (err) res.send(err);
				res.json(users);	                                                                        			// return the users
            });
		});

// ================= /users/:user_id =================
    apiRouter.route('/users/:user_id')

		.get(function(req, res) {		// get the user with that id
            User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);
				res.json(user);		                                                                            		// return that user
            });
		})

// ================= Update the user
		.put(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);
				if (req.body.name) user.name = req.body.name;	                                            			// set the new user information if it exists in the request
                if (req.body.username) user.username = req.body.username;
				if (req.body.password) user.password = req.body.password;
				user.save(function(err) {	                                                                			// save the user
                    if (err) res.send(err);
					res.json({ message: 'User updated!' });
				});

			});
		})

// ================= Delete the user
		.delete(function(req, res) {
			User.remove({ _id: req.params.user_id }, function(err, user) {
				if (err) res.send(err);
				res.json({ message: 'Successfully deleted' });
			});
		});

    // ================= /me - user information =================

   apiRouter.get('/me', function(req, res) {
        User.findOne({ name: req.decoded.name}, function(err, user) {
            if (err) res.send(err);
            res.json(user);	                                                                        			// return the users
        });
    });

   /*
   // ================= /searches =================
   apiRouter.route('/searches')

        .get(function(req, res) {
           Search.find({}, function(err, searches) {
               if (err) res.send(err);
               res.json(searches);	                                                                        			// return the users
           });
       })

        .post(function(req, res) {
           Search.findOne(req.body, function (err, search) {
               if (!search) {
                   var newSearch = new Search({ query : req.body.query});
                   newSearch.save();
                   req.user.searches.push(newSearch);
                   newSearch.users.push(req.user);
                   res.json({ 'message' : 'Search CREATED: ' + req.body.query });
               } else {
                    search.users.push(req.user);
                    req.user.searches.push(search);
                    res.json({'message': 'Search added to you !'});
               }
           });
        });

   apiRouter.route('/searches/:query')

        .get(function(req, res) {
            if (req.params.query === 'mine'){
                User
                    .findOne({name: req.decoded.name})
                    .populate('searches', 'query')
                    .exec(function (err, user) { res.json(user.searches); });
            } else {
                Search.findById(req.params.query, function (err, search) {
                    if (err) res.send(err);
                    res.json(search);
                });
            }
        })

        .put(function(req, res) {
            Search.findById(req.params.query, function(err, search) {
                if (err) res.send(err);
                if (req.body.query) search.query = req.body.query;
                search.save(function(err) {
                    if (err) res.send(err);
                    res.json({ message: 'Search updated!' });
                });
            });
        })

       .delete(function(req, res) {
           Search.remove({ _id: req.params.query }, function(err, search) {
               if (err) res.send(err);
               res.json({ message: 'Successfully deleted' });
           });
       });
   */

   return apiRouter;
};















