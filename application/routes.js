/**
 * Main application routes
 */

'use strict';
var jwt        = require('jsonwebtoken');
var config     = require('./config');
var User       = require('./api/user/user.model');


module.exports = function(app, express) {

    var api1Router = express.Router();

    api1Router.use(function(req, res, next) {                                                                        	// route middleware to verify a token
        console.log('Somebody just came to our app!');                                                                  // do logging
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];                                // check header or url parameters or post parameters for token

        if (token) {                                                                                                      // decode token
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) { res.status(403).send({ success: false,  message: 'Failed to authenticate token1.' });
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

    api1Router.use('/searches'      , require('./api/search'));
    api1Router.use('/users'         , require('./api/user'));

    return api1Router;

};
