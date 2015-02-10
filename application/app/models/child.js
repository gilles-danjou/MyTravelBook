var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

// ================= One-To-Many =================

var ChildSchema = new Schema({
    'name' : String,
    parent: { type:Schema.ObjectId, ref:"Parent", childPath:"children" }
});
ChildSchema.plugin(relationship, { relationshipPathName:'parent' });

module.exports = mongoose.model('Child', ChildSchema);