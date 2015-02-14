var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

// ================= search schema =================

var SearchSchema   = new Schema({
    query   : String,
    users   : [{ type:Schema.ObjectId, ref:"User", childPath:"searches" }],
    snipets : [String]
});

SearchSchema.pre('save', function(next) {
    console.log('A new search "%s" was inserted', this.query);
    next();
});

SearchSchema.plugin(relationship, { relationshipPathName:'users' });
module.exports = mongoose.model('Search', SearchSchema);
