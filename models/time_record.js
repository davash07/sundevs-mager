/**
 * Created by devios on 23/01/17.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var timeRecordSchema = new Schema({
    project_id: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    activity: {
        type: String,
        required : true
    },
    date: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        min: 0,
        required: true
    },
    minutes: {
        type: Number,
        min: 0,
        max: 60,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Time_Record', timeRecordSchema);
