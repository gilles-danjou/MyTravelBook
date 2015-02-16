//* exemple scraping 1 **//

//var httpAgent = require('http-agent'),  
//    jsdom = require('jsdom');

//var agent = httpAgent.create('www.google.com', ['finance', 'news', 'images']);

//agent.addListener('next', function (err, agent) {  
//	jsdom.env({
//	    html: agent.body,
//	    scripts: ['http://code.jquery.com/jquery-1.6.min.js'],
//	    done: function (err, window) {
//		    var $ = window.jQuery;
//		    // jQuery is now loaded on the jsdom window created from 'agent.body'
//		    console.log($('body').html());
//		    agent.next();
//	    }
//	});
//});
//agent.addListener('stop', function (agent) {  
//  console.log('the agent has stopped');
//});

//agent.start(); 

//* exemple scraping 2 **//

//var request = require('request'),  
//    jsdom = require('jsdom');

//request({ uri:'http://www.thebesttimetovisit.com/weather/when-to-go-europe-belgium-idcontinentpayseng-4-54.html' }, function (error, response, body) {  
//  if (error && response.statusCode !== 200) {
//    console.log('Error when contacting google.com')
//  }

//  jsdom.env({
//    html: body,
//    scripts: ['http://code.jquery.com/jquery-1.5.min.js'],
//	done : function (err, window) {
//    			var $ = window.jQuery;
//			    // jQuery is now loaded on the jsdom window created from 'agent.body'
//			    console.log($('body').html());
//		}
//  });
//});

//* exemple scraping 3 **//

var request	= require('request'),  
    jsdom	= require('jsdom');
var path = require("path");

if (!process.argv[2]) { 
	// process.argv[2] = 'http://127.0.0.1:8081/test/index.html'; 
	process.argv[2] = 'http://www.thebesttimetovisit.com/weather/when-to-go-europe-belgium-idcontinentpayseng-4-54.html'; 
}


request({ uri: process.argv[2] }, function (error, response, body) {  
	
	if (error && response.statusCode !== 200) console.log('Error when contacting google.com');

	jsdom.env({
	html: body,
    scripts: [path.resolve(__dirname, 'lib/jquery-1.5.min.js'), path.resolve(__dirname, 'lib/jquery.xpath.js')],
	done : function (err, window) {
				var $ = window.jQuery;
				result = $(window.document).xpath('//*[@id="middle"]/table/tbody/tr/td[5]/div');
				result = $(result.html()).xpath('//a');
				
				var links = [];
				result.each(function() {
					links.push({'title' : $(this).text(),  'link' : $(this).attr('href')});
				});   			
			    console.log(links);
			}
	});
});