var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");
var deepPopulate = require('mongoose-deep-populate');

// ================= article schema =================

var ArticleSchema   = new Schema({
    //searches   : [{ type:Schema.ObjectId, ref:"Search", childPath:"articles" }],
    "info": {

        "image": String,
        "imageTitle": String,
        "bubble": String,
        "link1": {
        "label": String,
            "uri": String
    },
    "comment": String,
        "title": String,
        "summary": String
    }
});

ArticleSchema.plugin(deepPopulate);

module.exports = mongoose.model('Article', ArticleSchema);
