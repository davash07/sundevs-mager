/**
 * Created by devios on 17/02/17.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var okrSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    objective: {
        type: String,
        required : true
    },
    result: [String]
});

module.exports = mongoose.model('Okr', okrSchema);
