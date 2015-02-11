var bodyParser = require('body-parser'); 	// get body-parser
var User       = require('../models/user');
var Search     = require('../models/search');
var Parent     = require('../models/test').parent;
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

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

   apiRouter.route('/test')

        .get(function(req, res) {
            User.findOne({name: req.decoded.name}, function (err, user) {
                res.json(user.searches);
            });
        })

        .post(function(req, res) {
            var search = new Search();
            search.query = req.body.query;

            search.save(function(err) {
                if (err) {
                    if (err.code == 11000) return res.json({ success: false, message: 'A search with that query already exists. '});
                    else return res.send(err);
                }
                res.json({ message: 'Search created!' });
            });
        });

   return apiRouter;
};















