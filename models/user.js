var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var SALT_FACTOR = 10;
// var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
// var userSchema = mongoose.Schema({
    name: {
		type: String
		// required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	bio: {
		type: String
	},
	rol: {
		type: String
	},
	state: {
		type: Boolean,
		required: true,
		default: true
	},
    projects_ids: [{
        project_id: Schema.Types.ObjectId
        // name: String
    }],
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}

});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

