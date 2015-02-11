/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /searches              ->  index
 * POST    /searches              ->  create
 * GET     /searches/:id          ->  show
 * PUT     /searches/:id          ->  update
 * DELETE  /searches/:id          ->  destroy
 */

'use strict';

//var Search = require('./search.model');
var User   = require('../user/user.model');

// ================= /searches =================
exports.index = function(req, res) {

    var snipets = {snipet: 'snipet'};

    res.json(snipets);

};

/*
exports.create = function(req, res) {
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
*/

