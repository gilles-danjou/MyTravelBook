'use strict';
var express = require('express');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');
var controller = require('./search.controller');
// var User       = require('../../app/models/user');
 
var router = express.Router();

//router.use(function(req, res, next) {                                                                        	// route middleware to verify a token
//    console.log('Somebody just came to our app!');                                                                  // do logging
//    var token = req.body.token || req.param('token') || req.headers['x-access-token'];                                // check header or url parameters or post parameters for token
//
//    if (token) {                                                                                                      // decode token
//        jwt.verify(token, config.secret, function(err, decoded) {
//            if (err) { res.status(403).send({ success: false,  message: 'Failed to authenticate token1.' });
//            } else {
//                req.decoded = decoded;
//                User.findOne({ name: decoded.name }, function(err, user) {
//                    req.user = user;
//                });	                                                                                       // if everything is good, save to request for use in other routes
//                next();                                                                                                     // make sure we go to the next routes and don't stop here
//            }
//        });
//    } else {
//        res.status(403).send({ success: false, message: 'No token provided.' });                                        // if there is no token return an HTTP response of 403 (access forbidden) and an error message
//    }
//});

router.get      ('/'        , controller.index);
router.get      ('/:query'  , controller.show);
router.post     ('/'        , controller.create);
router.put      ('/:query'  , controller.update);
router.patch    ('/:query'  , controller.update);
router.delete   ('/:query'  , controller.destroy);

module.exports = router;
