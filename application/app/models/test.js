var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

// ================= One-To-Many =================

var ParentSchema = new Schema({
    children:[{ type:Schema.ObjectId, ref:"Child" }]
});
//var Parent = mongoose.models("Parent", ParentSchema);

var ChildSchema = new Schema({
    parent: { type:Schema.ObjectId, ref:"Parent", childPath:"children" }
});
ChildSchema.plugin(relationship, { relationshipPathName:'parent' });
//var Child = mongoose.models("Child", ChildSchema)

module.exports = mongoose.model('Parent', ParentSchema);
module.exports = mongoose.model('Child', ChildSchema);