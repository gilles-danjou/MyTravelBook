/**
 * Main application routes
 */

'use strict';


module.exports = function(app) {

  app.use('/api/things', require('./api/thing'));
  app.use('/api1/searches', require('./api/search'));

};
