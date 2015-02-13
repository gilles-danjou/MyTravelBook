
'use strict';

var wscraper = require('wscraper');
var fs = require('fs');


module.exports = function(app, express) {

    exports.result = function(req, res) {

    // load the scraping script from a file
    var script = fs.readFileSync(__dirname + '/scrape-weather.js');

    var pages = ['wheretogoinjanuary.php'];

    // create a web scraper agent instance
    var agent = wscraper.createAgent();

    agent.on('start', function (n) {
        console.log('[wscraper.js] agent has started; ' + n + ' path(s) to visit');
    });

    agent.on('done', function (url, result) {
        console.log('[wscraper.js] data from ' + url);
        // display the results
        console.log(result);
        // next item to process if any

        res.header("Content-Type", "text/html; charset=utf-8");
        res.json(result);

        agent.next();
    });

    agent.on('stop', function (n) {
        console.log('[wscraper.js] agent has ended; ' + n + ' path(s) remained to visit');
    });

    agent.on('abort', function (e) {
        console.log('[wscraper.js] getting a FATAL ERROR [' + e + ']');
        console.log('[wscraper.js] agent has aborted');
        process.exit();
    });

    // run the web scraper agent
    agent.start('www.thebesttimetovisit.com/weather/', pages, script);


    };
};