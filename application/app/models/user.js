var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');


// ================= user schema =================

var UserSchema   = new Schema({
	name    : String,
    email   : { type: String, required: true, index: { unique: true }},
    username: { type: String },
	password: { type: String, required: true, select: false },
    searches:[{ type:Schema.ObjectId, ref:"Search" }]

});

UserSchema.pre('save', function(next) {                                                                                 // hash the password before the user is saved
    var user = this;
	if (!user.isModified('password')) return next();                                                                    // hash the password only if the password has been changed or user is new
	bcrypt.hash(user.password, null, null, function(err, hash) {                                                        // generate the hash
		if (err) return next(err);
		user.password = hash;		                                                                                    // change the password to the hashed version
        next();
	});
});

UserSchema.methods.comparePassword = function(password) {                                                               // method to compare a given password with the database hash
    var user = this;
	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
