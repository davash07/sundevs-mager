var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var clientSchema = new Schema({
	company_name: {
		type: String,
		required: true
	},
	contact_name: {
		type: String
	},
	phone_number: {
		type: String
	},
	email: {
		type: String,
		unique: true
	},
	website: {
		type: String
	},
	status: {
        type: Boolean,
        default: true
    },
	projects: [{
		project_id: Schema.Types.ObjectId,
		name: String
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


//------ Client Methods ------\\


var Client = mongoose.model('Client', clientSchema);
module.exports = Client;