var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// ================= search schema =================
var SearchSchema   = new Schema({
    query: String,
    users: [{ type:Schema.ObjectId, ref:"User", childPath:"searches" }]

});

module.exports = mongoose.model('Search', SearchSchema);