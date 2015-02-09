var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// ================= search schema =================
var SearchSchema   = new Schema({
    query: String
});

module.exports = mongoose.model('Search', SearchSchema);