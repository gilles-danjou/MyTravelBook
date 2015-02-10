var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

// ================= One-To-Many =================

var ParentSchema = new Schema({
    'name' : String,
    children:[{ type:Schema.ObjectId, ref:"Child" }]
});

module.exports = mongoose.model('Parent', ParentSchema);
