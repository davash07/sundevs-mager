var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectSchema = new Schema({
	client_id: {
        type: Schema.Types.ObjectId,
		ref: 'Client'
	},
	name: {
		type: String,
		required: true
	},
	activities: [String],
	estimated_hours: {
		type: Number
	},
	start_date: {
		type: String,
		required: true
	},
	estimated_end_date: {
		type: String,
		required: true
	},
	real_end_date: {
		type: String
	},
	trello_board_id: {
		type: String
	},
	challenging_date: {
		type: String
	},
	challenging_bugs: {
		type: Number
	},
	status: {
		type: Boolean,
		default: true
	},
	image: {
		type: String
	},
	time_records: [{
        time_record_id: Schema.Types.ObjectId
    }],
	// users_ids: [{
	// 	user_id : Schema.Types.ObjectId
	// }],
	users_id: [String],
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

//------ Project Methods ------\\

var Project = mongoose.model('Project', projectSchema);
module.exports = Project;

