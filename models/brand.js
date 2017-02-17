/**
 * Created by devios on 14/02/17.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var brandSchema = new Schema({
    brand: {
        type: String,
        required : true
    },
    type: [String]

});

module.exports = mongoose.model('Brand', brandSchema);
