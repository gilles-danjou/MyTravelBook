var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

// ================= scraper schema =================

var ScraperSchema   = new Schema({
    url     : String,
    pages   : [String],
    script  : String
});

module.exports = mongoose.model('Scraper', ScraperSchema);
