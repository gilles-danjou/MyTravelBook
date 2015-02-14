/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /searches              ->  index
 * POST    /searches              ->  create
 * GET     /searches/:id          ->  show
 * PUT     /searches/:id          ->  update
 * DELETE  /searches/:id          ->  destroy
 */

'use strict';

var Search  = require('./search.model');
var User    = require('../user/user.model');
var wscraper = require('wscraper');
var fs = require('fs');

// ================= /searches =================
exports.index = function(req, res) {
    Search.find({}, function(err, searches) {
        if (err) res.send(err);
        res.json(searches);	                                                                        			// return the users
    });
};

exports.create = function(req, res) {
    Search.findOne(req.body, function (err, search) {
        if (!search) {
            var newSearch = new Search({ query : req.body.query});
            newSearch.save();
            req.user.searches.push(newSearch);
            newSearch.users.push(req.user);

            var script = fs.readFileSync(__dirname + '/scrape-weather.js');
            var agent = wscraper.createAgent();
            agent.on('done', function (url, result) {
                console.log(result);
                newSearch.snipets.push(result);
                newSearch.save();
                agent.next();
            });

            agent.start('www.thebesttimetovisit.com/weather',
                ['wheretogoinjanuary.php'],
                script);

            res.json(newSearch);



        } else {
            search.users.push(req.user);
            req.user.searches.push(search);
            res.json(search);
        }
    });
};

exports.show = function(req, res) {
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
};
exports.update = function(req, res) {
    Search.findById(req.params.query, function(err, search) {
        if (err) res.send(err);
        if (req.body.query) search.query = req.body.query;
        search.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'Search updated!' });
        });
    });
};

exports.destroy = function(req, res) {
    Search.remove({ _id: req.params.query }, function(err, search) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
};

