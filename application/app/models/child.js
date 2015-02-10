var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

// ================= One-To-Many =================

var ChildSchema = new Schema({
    'name' : String,
    parents: [{ type:Schema.ObjectId, ref:"Parent", childPath:"children" }]
});
ChildSchema.plugin(relationship, { relationshipPathName:'parents' });
module.exports = mongoose.model('Child', ChildSchema);