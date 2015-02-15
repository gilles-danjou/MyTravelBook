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
var Scraper = require('../scraper/scraper.model');
var Article = require('../article/article.model');

var wscraper = require('wscraper');
var fs = require('fs');

// ================= /searches =================
exports.index = function(req, res) {
    Search
        .find({})
        .deepPopulate('query articles')
        .exec( function(err, searches) {
            if (err) res.send(err);
            res.json(searches);
        });
};


var scraping = function (options){
    request(options, function (error, response, body) {

        if (error && response.statusCode !== 200) console.log('Error when contacting google.com');
        jsdom.env({
            html: body,
            scripts: [path.resolve(__dirname, 'lib/jquery-1.5.min.js'), path.resolve(__dirname, 'lib/jquery.xpath.js')],
            done : function (err, window) {
                var $ = window.jQuery;
                result = $(window.document).xpath(options.xpath);
                result = $(result.html()).xpath('//a');

                var links = [];
                result.each(function() {
                    links.push({'title' : $(this).text(),  'link' : $(this).attr('href')});
                });
                console.log(links);
            }
        });
    });
}

exports.create = function(req, res) {
    Search.findOne(req.body ,function (err, search) {
        if (!search) {
            var newSearch = new Search({ query : req.body.query});
            newSearch.users.push(req.user);
            newSearch.save();
            req.user.searches.push(newSearch);

            Scraper.find({}, function (err, scrapers) {
                scrapers.forEach (function (scraper, index, array){
                    console.log(index);
                    scraper.agent = wscraper.createAgent();
                    scraper.agent.on('done', function (url, result) {
                        console.log('save snipet from url:' + url);
                        newSearch.snipets.push(result);
                        newSearch.save();
                    });
                    scraper.agent.start(scraper.url, scraper.pages, scraper.script);
                });
            })

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

