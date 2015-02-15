var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");
var deepPopulate = require('mongoose-deep-populate');

// ================= search schema =================

var SearchSchema   = new Schema({
    query   : String,
    users   : [{ type:Schema.ObjectId, ref:"User", childPath:"searches" }],
    snipets : [String],
    articles: [{ type:Schema.ObjectId, ref:"Article", childPath:"searches" }]
});

SearchSchema.pre('save', function(next) {
    console.log('A new search "%s" was inserted', this.query);
    next();
});

SearchSchema.plugin(relationship, { relationshipPathName:'articles' });
SearchSchema.plugin(relationship, { relationshipPathName:'users' });
SearchSchema.plugin(deepPopulate);
module.exports = mongoose.model('Search', SearchSchema);

